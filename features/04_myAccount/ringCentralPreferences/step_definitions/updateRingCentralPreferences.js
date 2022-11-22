const { Given, When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const config = require('../../../../cucumber_config/cucumber_config');
const driver = config.driver;
const ringCentralPreferenceElements = require('../common/ringCentralPreferencesPageElements');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/04_myAccount/ringCentralPreferences/screenshots/';
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const openRingCentralPageObj = require('../common/actions');
const commonActionElementsObj = require('../../../00_common/actions/commonActions');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

Given('the {string} is on ring central preference page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/user/ringcentralPreferences')) {
        console.log('The ring central preference page has been opened successfully...');
    }
    else if(await currentPageURL.includes('app/03_setup/voice/ringcentral')) {
        console.log('The ring central preference page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate') {
        /*  As the user is on the Salesmate 02_login page,
         *  then the process to open access key page page will be started from by performing the Salesmate 02_login */

        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on ring central page');
        await openRingCentralPageObj.openRingCentralPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == '') {
        /*  As the user is not logged in and also not on the Salesmate 02_login page,
         *  then the process to open RingCentral Preferences page will be started from by opening the Salesmate 02_login page  */

        //will open the Salesmate 02_login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on ring central page');
        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on ring central page');
        await openRingCentralPageObj.openRingCentralPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the apps page
        await openRingCentralPageObj.openRingCentralPage(driver,screenshotPath);
    }
});

When('Verify ringCentral tab is displayed only when ringCentral app is installed',async function() {
    try {
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Voice' tab
        const voiceTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Voice ');
        //will set focus on the 'Voice' tab
        await driver.executeScript("arguments[0].scrollIntoView();", voiceTab[0]);
        await driver.wait(until.elementIsVisible(voiceTab[0]));
        //will click on the 'Voice' tab
        await voiceTab[0].click();
        await driver.manage().setTimeouts({implicit: 2000});
        //verify whether slack app installation button found or not
        const ringCentralInstallationButton = await driver.findElements(By.id("ringCentralButtonField"));
        const ringCentralInstallationButtonLength = await ringCentralInstallationButton.length;
        //As if installation button is not found i.e; app is installed so uninstall it
        if (ringCentralInstallationButtonLength === 0) {
            await ringCentralPreferenceElements.removingRingCentralApp(driver);
            await driver.sleep(1000);
            await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
            await driver.manage().setTimeouts({implicit: 1000});
            //After uninstallation of ring central app verify visibility of ring central tab under 04_myAccount
            const ringCentralTab = await driver.findElements(By.xpath('//a[text()="RingCentral Preferences"]'));
            const ringCentralTabLength = await ringCentralTab.length;
            if (ringCentralTabLength === 0) {
                console.log("As ring central app is uninstalled,the ring central tab is not displayed under my account");
            } else {
                await assert.fail("Even ring central app is uninstalled,ring central tab is visible,so test case has been aborted");
            }
            await driver.manage().setTimeouts({implicit: 2000});
            await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
            //will find the 'Voice' tab
            const voiceTabClick = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Voice ');
            //will set focus on the 'Voice' tab
            await driver.executeScript("arguments[0].scrollIntoView();", voiceTabClick[0]);
            await driver.wait(until.elementIsVisible(voiceTabClick[0]));
            //will click on the 'Voice' tab
            await voiceTabClick[0].click();
            await driver.sleep(1000);
            //install ring central app
            await ringCentralPreferenceElements.installRingCentralApp(driver);
            await ringCentralPreferenceElements.reAuthorizeRingCentral(driver);
            await driver.sleep(4000);
            await ringCentralPreferenceElements.authorizationMessage(driver);
            await driver.sleep(5000);
            await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
            await driver.manage().setTimeouts({implicit: 1000});
            //check visibility of ring central tab
            const ringCentralPreferenceTab = await driver.findElements(By.xpath('//a[text()="RingCentral Preferences"]'));
            const ringCentralPreferenceTabLength = await ringCentralPreferenceTab.length;
            try {
                if (ringCentralPreferenceTabLength > 0) {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + 'ringCentralTab.png');
                    console.log("As ring central app is installed,the ring central preference tab is displayed under my account");
                } else {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + 'ringCentralTab_NotFound.png');
                    await assert.fail("As ring central preference tab is not visible under 04_myAccount after its installation,so test case has been aborted");
                }
            } catch (err) {
                await assert.fail(err);
            }
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        } else {
            await assert.fail("As ring central app installation button is not found,test case has been aborted");
        }
        console.log("User able to install ring central app and verified visibility of ring central preference tab under 04_myAccount,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user checks authorization of ring central app',async function() {
    try {
        await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
        await ringCentralPreferenceElements.clickOnRingCentralTab(driver);
        await driver.manage().setTimeouts({implicit: 2000});
        //Verifying whether ring central app is authorized or not
        const removeButton = await driver.findElements(By.xpath('//button[text()=" Remove "]'));
        const removeButtonLength = await removeButton.length;
        //Checking that if remove button not found then app is not authorized,so authorize ring central under 04_myAccount
        if (removeButtonLength === 0) {
            await ringCentralPreferenceElements.reAuthorizeRingCentral(driver);
            await driver.sleep(6000);
        }
        //If remove button is found then app is authorized,so remove it and re-authorize ring central app
        else {
            //Remove authorized ring central app
            await ringCentralPreferenceElements.removeRingCentral(driver);
            //Verification of removed 'RingCentral account removed successfully.' message
            await driver.sleep(3000);
            await ringCentralPreferenceElements.removedRingCentralMessage(driver);
            await driver.sleep(5000);
            //ReAuthorize ring central app under 04_myAccount
            await ringCentralPreferenceElements.reAuthorizeRingCentral(driver);
            await driver.sleep(4000);
            await ringCentralPreferenceElements.authorizationMessage(driver);
            await driver.sleep(3000);
        }
        //Verify ring central app is authorized or not through 'Remove' button visibility
        await driver.manage().setTimeouts({implicit: 2000});
        const removeButtonElement = await driver.findElements(By.xpath("//button[text()=' Remove ']"));
        const removeButtonElementLength = await removeButtonElement.length;
        //Verifying through visibility of 'Remove' elements
        if (removeButtonElementLength > 0) {
            console.log("Ring central app is authorized successfully under 04_myAccount module");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As ring central app is not authorized,test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        //refreshing current page to verify whether 'Authorization' is remained as authorized or not
        await driver.navigate().refresh();
        await driver.sleep(6000);
        //Verifying ring central 'Authorization' after refreshing page
        if (removeButtonElementLength > 0) {
            console.log("Ring central app is remained as authorized under 04_myAccount module after refreshing page");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As ring central app is not remained as authorized after refreshing page,test case has been aborted");
        }
        console.log("Ring central app authorization done successfully,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('{string} verifying ring central tab through {string} there should be no impact',async  function(adminUser,user) {
    try {
        await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
        await ringCentralPreferenceElements.clickOnRingCentralTab(driver);
        await driver.sleep(2000);

        //verification of 'Authorization' in 'User1' before switching to other 'User2'
        await driver.manage().setTimeouts({implicit: 2000});
        const removeButtonBeforeSwitching = await driver.findElements(By.xpath("//button[text()=' Remove ']"));
        const removeButtonLengthBeforeSwitching = await removeButtonBeforeSwitching.length;

        //user2 02_login for ring central tab and remove ring central app
        await commonActionElementsObj.clickOnSignOut();
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on ring central preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        await ringCentralPreferenceElements.clickOnRingCentralTab(driver);
        await driver.sleep(2000);
        await ringCentralPreferenceElements.authorizeRingCentralApp(driver);
        await driver.sleep(3000);
        await ringCentralPreferenceElements.removeRingCentral(driver);
        await driver.sleep(3000);
        await commonActionElementsObj.clickOnSignOut();
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on ring central preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        await ringCentralPreferenceElements.clickOnRingCentralTab(driver);
        await driver.sleep(2000);

        //verification of 'Authorization' in 'User1' remained or not after switching back to 'User1'
        const removeButtonAfterSwitching = await driver.findElements(By.xpath("//button[text()=' Remove ']"));
        const removeButtonLengthAfterSwitching = await removeButtonAfterSwitching.length;

        //Compare remove button before and after switching to other browser
        try {
            if (removeButtonLengthBeforeSwitching === removeButtonLengthAfterSwitching) {
                console.log("As ring central app is remained as removed in user1,so test case has been passed");
            } else {
                await assert.fail("As ring central app is not remained as removed in user1,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail("As remove button is not visible after switching to other browser,so test case has been aborted");
            await assert.fail(err);
        }
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'user1RingCentralTab_Visible.png');
        console.log("Verified ring central app authorization user wise,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Removing ring central app',async function() {
    try {
        await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
        await ringCentralPreferenceElements.clickOnRingCentralTab(driver);
        //Remove 'Ring Central' under 04_myAccount
        await ringCentralPreferenceElements.removeRingCentral(driver);
        await driver.sleep(3000);
        await ringCentralPreferenceElements.removedRingCentralMessage(driver);
        await driver.sleep(3000);
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await driver.manage().setTimeouts({implicit: 2000});
        try {
            //checking that remove button should not be found after removing ring central app and refreshing page
            const removeButtonElement = await driver.findElements(By.id('btnRemove'));
            const removeButtonLength = await removeButtonElement.length;
            if (removeButtonLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'ringAppRemoved.png');
                console.log("As remove button not found after removing ring central under 04_myAccount,ring central is removed under 04_myAccount");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'removeButton_Found.png');
                await assert.fail("As remove button of ring central app is found,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        //Now removing 'Ring Central App'
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Voice' tab
        const voiceTabClick = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Voice ');
        //will set focus on the 'Voice' tab
        await driver.executeScript("arguments[0].scrollIntoView();", voiceTabClick[0]);
        await driver.wait(until.elementIsVisible(voiceTabClick[0]));
        //will click on the 'Voice' tab
        await voiceTabClick[0].click();
        await driver.sleep(1000);
        await ringCentralPreferenceElements.removingRingCentralApp(driver);
        await driver.sleep(2000);
        console.log("As ring central app is removed successfully,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
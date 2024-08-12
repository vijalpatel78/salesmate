const { Given, When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const config = require('../../../../cucumber_config/cucumber_config');
const driver = config.driver;
const slackPreferenceElements = require('../common/slackPreferencesPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const assert = require('assert');
const {strictEqual} = require('assert');
const screenshotPath = './features/04_myAccount/slackPreferences/screenshots/';
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const openSlackPreferencesPageObj = require('../common/actions');
const commonActionElementsObj = require('../../../00_common/actions/commonActions');
const pageNavigationObj = require('../common/actions');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

Given('the {string} is on slack preference page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/user/slackPreferences')) {
        console.log('The slack preference page has been opened successfully...');
    }
    else if(await currentPageURL.includes('app/03_setup/apps/slack')) {
        console.log('The slack preference page has been opened successfully...');
    }
    else if(await currentPageURL.includes('app/user/profile')) {
        console.log('The slack preference page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate') {
        /*  As the user is on the Salesmate 02_login page,
         *  then the process to open slack preference page page will be started from by performing the Salesmate 02_login */

        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on slack Preferences page');
        //await sharedElements.goToMyAccount();
        await openSlackPreferencesPageObj.openSlackPreferencePage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == '') {
        /*  As the user is not logged in and also not on the Salesmate 02_login page,
         *  then the process to open slack preference page will be started from by opening the Salesmate 02_login page  */

        //will open the Salesmate 02_login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on slack preference page');
        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on slack preferences page');
        //await sharedElements.goToMyAccount();
        await openSlackPreferencesPageObj.openSlackPreferencePage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the apps page
        await openSlackPreferencesPageObj.openSlackPreferencePage(driver,screenshotPath);
    }
});

When('the user is able to install slack app then slack preferences tab should be displayed',async function() {
    try {
        /*//will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Apps' tab
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
        //will set focus on the 'Apps' tab
        await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab
        await appsTab[0].click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //verify whether slack app installation button found or not
        const slackAppInstallationButton = await driver.findElements(By.xpath("//h4[text()='Slack Integration']/following-sibling::a[text()='Install ']"));
        const slackAppInstallationButtonLength = await slackAppInstallationButton.length;
        //As if installation button is not found i.e; app is installed so uninstall it
        if (slackAppInstallationButtonLength === 0) {
            await slackPreferenceElements.configureSlackPreference(driver);
            await driver.sleep(1000);
            await driver.findElement(By.id('btnRemove')).click();
            await driver.sleep(2000);
            await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
            await driver.manage().setTimeouts({implicit: 2000});
            //After uninstallation of slack verify visibility of slack preference tab under 04_myAccount
            const slackPreferenceAppTab = await driver.findElements(By.xpath('//a[text()="Slack Preferences"]'));
            const slackPreferenceAppTabLength = await slackPreferenceAppTab.length;
            if (slackPreferenceAppTabLength === 0) {
                console.log("As slack app is uninstalled,the slack preference tab is not displayed under my account");
            } else {
                await assert.fail("Even slack app is uninstalled,slack preferences tab is visible,so test case has been aborted");
            }
            await driver.manage().setTimeouts({implicit: 2000});
            await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
            //will find the 'Apps' tab
            const appsTabClick = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
            //will set focus on the 'Apps' tab
            await driver.executeScript("arguments[0].scrollIntoView();", appsTabClick[0]);
            await driver.wait(until.elementIsVisible(appsTabClick[0]));
            //will click on the 'Apps' tab
            await appsTabClick[0].click();
            await driver.sleep(1000);
            //install slack app
            await slackPreferenceElements.findSlackAppInstallationButton(driver);
            await driver.sleep(1000);
            //authorize slack app
            await slackPreferenceElements.reAuthorizeSlack(driver);
            await driver.sleep(1000);
            
        } else {
            await assert.fail("As slack app installation button is not found,test case has been aborted");
        }*/

        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        await driver.manage().setTimeouts({implicit: 2000});
        
        //check visibility of slack preference tab
        const slackPreferenceTab = await driver.findElements(By.xpath('//a[text()="Slack Preferences"]'));
        const slackPreferenceTabLength = await slackPreferenceTab.length;
        try {
            if (slackPreferenceTabLength > 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'slackPreferencesTab.png');
                console.log("As slack app is installed,the slack preference tab is displayed under my account");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'slackPreferencesTab_NotFound.png');
                await assert.fail("As slack preferences tab is not visible under 04_myAccount after its installation,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        console.log("User able to install slack preference app and verified visibility of slack preference under 04_myAccount,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user checks authorization of slack app',async function() {
    try {
        await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
        await slackPreferenceElements.clickOnSlackPreferenceTab(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const removeButton = await driver.findElements(By.id('btnRemove'));
        const removeButtonLength = await removeButton.length;
        //Checking that if remove button not found then app is not authorized,so authorize slack
        if (removeButtonLength === 0) {
            await slackPreferenceElements.authorizeSlackApp(driver);
            await driver.sleep(2000);
        }
        //If remove button is found then app is authorized,so remove it and re-authorize slack under 04_myAccount
        else {
            //remove authorized slack app
            await slackPreferenceElements.removeSlackPreference(driver);
            //ReAuthorize slack app under 04_myAccount
            await slackPreferenceElements.reAuthorizeSlack(driver);
            await driver.sleep(3000);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        //Verify slack app is authorized or not
        //'Update' button visibility
        const updateButton = await driver.findElements(By.id('btnUpdate'));
        const updateButtonLength = await updateButton.length;

        //'Remove' button visibility
        const removeButtonElement = await driver.findElements(By.id('btnRemove'));
        const removeButtonElementLength = await removeButtonElement.length;

        //'Contact Assigned' notification channel visibility
        const contactAssignedNotificationChannel = await driver.findElements(By.id('contactAssigned'));
        const contactAssignedLength = await contactAssignedNotificationChannel.length;

        //'Deal Assigned' notification channel visibility
        const dealAssignedNotificationChannel = await driver.findElements(By.id('dealAssigned'));
        const dealAssignedLength = await dealAssignedNotificationChannel.length;

        //Verifying through visibility of 'Update','Remove','Notification Channel' elements
        if (updateButtonLength > 0 && removeButtonElementLength > 0 && contactAssignedLength > 0 && dealAssignedLength > 0) {
            console.log("Slack preference app is authorized successfully under 04_myAccount module");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As slack app is not authorized,test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'slackPreferenceAuthorization.png');
        //refreshing current page to verify whether 'Authorization' is remained as authorized or not
        await driver.navigate().refresh();
        await driver.sleep(6000);
        //Verifying slack 'Authorization' after refreshing page
        if (updateButtonLength > 0 && removeButtonElementLength > 0 && contactAssignedLength > 0 && dealAssignedLength > 0) {
            console.log("Slack preference app is remained as authorized under 04_myAccount module after refreshing page");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As slack app is not remained as authorized after refreshing page,test case has been aborted");
        }
        console.log("Verified slack authorization,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is able to enabling all toggle buttons in slack preference',async function () {
    try {
        await driver.sleep(1000);
        await slackPreferenceElements.enableOrDisableToggles(['contactAssigned', 'companyAssigned', 'activityAssigned', 'dealAssigned', 'dealWon', 'dealLost'], 'enable', driver);
        await slackPreferenceElements.clickOnUpdate(driver);
        await driver.sleep(1000);

        //get 06_contact assigned and deal assigned values before navigation
        const actualContactAssigned = await driver.findElement(By.id('contactAssigned')).getAttribute('value');
        const actualCompanyAssigned = await driver.findElement(By.id('companyAssigned')).getAttribute('value');
        const actualActivityAssigned = await driver.findElement(By.id('activityAssigned')).getAttribute('value');
        const actualDealAssigned = await driver.findElement(By.id('dealAssigned')).getAttribute('value');
        const actualDealWon = await driver.findElement(By.id('dealWon')).getAttribute('value');
        const actualDealLost = await driver.findElement(By.id('dealLost')).getAttribute('value');

        //page navigation and come back to slack preferences page
        await pageNavigationObj.comeBackToSlackPreferencesPage(driver, screenshotPath);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'enabledSlackPreferences.png');
        await driver.sleep(1000);

        //get 06_contact assigned and deal assigned values after navigation
        const expectedContactAssigned = await driver.findElement(By.id('contactAssigned')).getAttribute('value');
        const expectedCompanyAssigned = await driver.findElement(By.id('companyAssigned')).getAttribute('value');
        const expectedActivityAssigned = await driver.findElement(By.id('activityAssigned')).getAttribute('value');
        const expectedDealAssigned = await driver.findElement(By.id('dealAssigned')).getAttribute('value');
        const expectedDealWon = await driver.findElement(By.id('dealWon')).getAttribute('value');
        const expectedDealLost = await driver.findElement(By.id('dealLost')).getAttribute('value');

        //comparing actual and expected values of 06_contact and deal assigned values as both remains same or not
        try {
            strictEqual(actualContactAssigned, expectedContactAssigned);
            strictEqual(actualCompanyAssigned, expectedCompanyAssigned);
            strictEqual(actualActivityAssigned, expectedActivityAssigned);
            strictEqual(actualDealAssigned, expectedDealAssigned);
            strictEqual(actualDealWon, expectedDealWon);
            strictEqual(actualDealLost, expectedDealLost);
            console.log("Both actual and expected 06_contact and deal assigned values remains same as enabled after navigation");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'enabledSlackPreferences_Failed.png');
            await assert.fail("As data is not maintained as enabled after navigation,test case has been aborted");
        }
        console.log("Enabling slack preferences successfully done...");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is able to disabling all toggle buttons in slack preference',async function() {
    try {
        await slackPreferenceElements.enableOrDisableToggles(['contactAssigned', 'companyAssigned', 'activityAssigned', 'dealAssigned', 'dealWon', 'dealLost'], 'disable', driver);
        await slackPreferenceElements.clickOnUpdate(driver);
        await driver.sleep(1000);

        //get 06_contact assigned and deal assigned values before navigation
        const actualContactAssigned = await driver.findElement(By.id('contactAssigned')).getAttribute('value');
        const actualCompanyAssigned = await driver.findElement(By.id('companyAssigned')).getAttribute('value');
        const actualActivityAssigned = await driver.findElement(By.id('activityAssigned')).getAttribute('value');
        const actualDealAssigned = await driver.findElement(By.id('dealAssigned')).getAttribute('value');
        const actualDealWon = await driver.findElement(By.id('dealWon')).getAttribute('value');
        const actualDealLost = await driver.findElement(By.id('dealLost')).getAttribute('value');

        //page navigation and come back to slack preference page
        await pageNavigationObj.comeBackToSlackPreferencesPage(driver, screenshotPath);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledSlackPreferences.png');
        await driver.sleep(1000);

        //get 06_contact assigned and deal assigned values after navigation
        const expectedContactAssigned = await driver.findElement(By.id('contactAssigned')).getAttribute('value');
        const expectedCompanyAssigned = await driver.findElement(By.id('companyAssigned')).getAttribute('value');
        const expectedActivityAssigned = await driver.findElement(By.id('activityAssigned')).getAttribute('value');
        const expectedDealAssigned = await driver.findElement(By.id('dealAssigned')).getAttribute('value');
        const expectedDealWon = await driver.findElement(By.id('dealWon')).getAttribute('value');
        const expectedDealLost = await driver.findElement(By.id('dealLost')).getAttribute('value');

        //comparing actual and expected values of 06_contact and deal assigned values as both remains same or not
        try {
            strictEqual(actualContactAssigned, expectedContactAssigned);
            strictEqual(actualCompanyAssigned, expectedCompanyAssigned);
            strictEqual(actualActivityAssigned, expectedActivityAssigned);
            strictEqual(actualDealAssigned, expectedDealAssigned);
            strictEqual(actualDealWon, expectedDealWon);
            strictEqual(actualDealLost, expectedDealLost);
            console.log("Both actual and expected 06_contact and deal assigned values remains same as disabled after navigation")
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledSlackPreferences_Failed.png');
            await assert.fail("As data is not maintained after navigation,test case has been failed");
        }
        console.log("Disabling slack preferences successfully done...");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the {string} verifies through {string} wise there should be no impact on preferences',async function(adminUser,user) {
    try {
        await slackPreferenceElements.enableOrDisableToggles(['contactAssigned', 'companyAssigned', 'activityAssigned', 'dealAssigned'], 'enable', driver);
        await slackPreferenceElements.clickOnUpdate(driver);
        await driver.sleep(2000);

        // will get currently logged-in user slack preferences toggle button values
        const expectedContactAssigned = await driver.findElement(By.id('contactAssigned')).getAttribute('value');
        const expectedCompanyAssigned = await driver.findElement(By.id('companyAssigned')).getAttribute('value');
        const expectedActivityAssigned = await driver.findElement(By.id('activityAssigned')).getAttribute('value');
        const expectedDealAssigned = await driver.findElement(By.id('dealAssigned')).getAttribute('value');
        const expectedDealWon = await driver.findElement(By.id('dealWon')).getAttribute('value');
        const expectedDealLost = await driver.findElement(By.id('dealLost')).getAttribute('value');

        //will verify through 'User2'
        try{
            await commonActionElementsObj.clickOnSignOut();
            await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on slack preference page');
            await driver.sleep(1000);
            await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
            //go to slack preference tab
            await slackPreferenceElements.clickOnSlackPreferenceTab(driver);
            await driver.sleep(2000);
            //authorize slack app
            await slackPreferenceElements.authorizeSlackAppUser2(driver);
            await driver.sleep(5000);
            //enable or disable slack preference notification toggles in user2
            await slackPreferenceElements.enableOrDisableToggles(['contactAssigned', 'companyAssigned', 'dealAssigned'], 'enable', driver);
            await driver.sleep(2000);
            await slackPreferenceElements.clickOnUpdate(driver);
            await driver.sleep(5000);
            //remove slack preference app from user2
            await slackPreferenceElements.removeSlackPreference(driver);
            await driver.sleep(3000);
            await commonActionElementsObj.clickOnSignOut();
        }catch(err){
            await commonActionElementsObj.clickOnSignOut();
            await assert.fail(err);
        }
        
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on slack preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        //go to slack preference tab
        await slackPreferenceElements.clickOnSlackPreferenceTab(driver);
        await driver.sleep(2000);

        // user1 slack preferences toggle button values after navigation from other browser
        const actualContactAssigned = await driver.findElement(By.id('contactAssigned')).getAttribute('value');
        const actualCompanyAssigned = await driver.findElement(By.id('companyAssigned')).getAttribute('value');
        const actualActivityAssigned = await driver.findElement(By.id('activityAssigned')).getAttribute('value');
        const actualDealAssigned = await driver.findElement(By.id('dealAssigned')).getAttribute('value');
        const actualDealWon = await driver.findElement(By.id('dealWon')).getAttribute('value');
        const actualDealLost = await driver.findElement(By.id('dealLost')).getAttribute('value');

        // will verify slack preference toggle button values should remain as same
        try {
            strictEqual(actualContactAssigned, expectedContactAssigned);
            strictEqual(actualCompanyAssigned, expectedCompanyAssigned);
            strictEqual(actualActivityAssigned, expectedActivityAssigned);
            strictEqual(actualDealAssigned, expectedDealAssigned);
            strictEqual(actualDealWon, expectedDealWon);
            strictEqual(actualDealLost, expectedDealLost);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'toggleDataUnchanged.png');
            console.log("As slack notifications in user1 remains same,so test case has been passed");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'toggleDataUpdated.png');
            await driver.navigate().refresh();
            await assert.fail("As slack preferences toggle data is get updated,test case has been aborted");
        }
        console.log("Slack preferences verified through user wise test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is able to remove slack integration',async function () {
    try {
        await slackPreferenceElements.removeSlackPreference(driver);

        //after removing slack,authorize button should be displayed
        const authorizeButtonElements = await driver.findElements(By.id('btnAuthorize'))
        const authorizeButtonLength = await authorizeButtonElements.length;
        if(authorizeButtonLength > 0) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'slackRemoved.png');
            console.log("As authorize button is not found,slack app is removed,so test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit:elementSearchTimeout});
            await screenshotObj.takeScreenshot(driver,screenshotPath+'authorizeButton_NotFound.png');
            await assert.fail("As authorize button is found,test case has been aborted");
        }
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Apps' tab
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
        //will set focus on the 'Apps' tab
        await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab
        await appsTab[0].click();
        await driver.sleep(2000);
        await slackPreferenceElements.removeSlackApp(driver);
        await driver.sleep(3000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'removeButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Removed slack preference app,so test case has been passed");
});
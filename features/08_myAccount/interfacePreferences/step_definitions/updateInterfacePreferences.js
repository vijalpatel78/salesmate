const { Given, When, Then } = require('@cucumber/cucumber');
const { By,until } = require('selenium-webdriver');
const assert = require('assert');
const {strictEqual} = require('assert');
const config = require('../../../../cucumber_config/cucumber_config');
const driver = config.driver;
const interfacePreferenceElementsObj = require('../common/interfacePreferencesPageElements');
const pageNavigationObj = require('../common/actions');
const openInterfacePreferencesPageObj = require('../common/actions');
const formElementsObj = require('../../../00_common/webElements/formElements');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const readUserDetailsObj = require('../../../00_common/actions/readExcelData');
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const screenshotPath = './features/04_myAccount/interfacePreferences/screenshots/';
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

Given('the {string} is on interface preference page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/user/interfacePreferences')) {
        console.log('The interface preferences page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate') {
        /*  As the user is on the Salesmate login page,
         *  then the process to open interface preferences page will be started from by performing the Salesmate login */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on interface preferences page');
        //will open the interface preferences page
        await openInterfacePreferencesPageObj.openInterfacePreferencePage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == '') {
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open interface preferences page will be started from by opening the Salesmate login page  */

        //will open the Salesmate login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on interface preferences page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on interface preferences page');
        //will open interface preferences page
        await openInterfacePreferencesPageObj.openInterfacePreferencePage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the interface preferences page
        await openInterfacePreferencesPageObj.openInterfacePreferencePage(driver,screenshotPath);
    }
});

When('Enable contact,company,deal preference option and click on update button',async function () {
    try {
        //Enable contact,company and deal interface preferences
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['Contact', 'Company', 'Deal'],'disable',driver);
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['Contact', 'Company', 'Deal'], 'enable',driver);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        console.log("Enabled contact,company,deal preference test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('Setting successfully updated message should be displayed and checking values after navigating page',async function () {
    try {
        //get values from contact,company and deal interface preferences before navigation
        const actualContactDefaultValue = await driver.findElement(By.id('Contact')).getAttribute('value');
        const actualCompanyDefaultValue = await driver.findElement(By.id('Company')).getAttribute('value');
        const actualDealDefaultValue = await driver.findElement(By.id('Deal')).getAttribute('value');

        //check 'Settings successfully updated' message
        await interfacePreferenceElementsObj.checkInterfaceUpdateMessage(driver);
        //page navigation and come back to interface preferences page
        await pageNavigationObj.comeBackToInterfacePreferencesPage(driver,screenshotPath);

        //get values from contact,company and deal interface preferences after navigation
        const expectedContactDefaultValue = await driver.findElement(By.id('Contact')).getAttribute("value");
        const expectedCompanyDefaultValue = await driver.findElement(By.id('Company')).getAttribute("value");
        const expectedDealDefaultValue = await driver.findElement(By.id('Deal')).getAttribute("value");
        //compare both actual and expected values of contact,company and deal notification preferences
        if(actualContactDefaultValue === expectedContactDefaultValue && actualCompanyDefaultValue === expectedCompanyDefaultValue && actualDealDefaultValue === expectedDealDefaultValue) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'enabledInterfacePreferences.png');
            console.log("ContactDefault,companyDefault,dealDefault values are maintained as enabled after navigation...");
        }else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'enabledInterfacePreferences_Case_Failed.png');
            await assert.fail("Due to preference options are not maintained as enabled after navigation,the test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Enabled contact,company,deal preference options are maintained after navigation");
});

When('Disable contact,company,deal preference option and click on update button',async function () {
    try {
        await driver.sleep(1000);
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['Contact', 'Company', 'Deal'],'disable',driver);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        console.log("Disabled contact,company,deal preference test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('Setting successfully updated message should be displayed and checking values after navigating to another page',async function() {
    try {
        //get values from contact,company and deal interface preferences before navigation
        const actualContactDefaultValue = await driver.findElement(By.id('Contact')).getAttribute('value');
        const actualCompanyDefaultValue = await driver.findElement(By.id('Company')).getAttribute('value');
        const actualDealDefaultValue = await driver.findElement(By.id('Deal')).getAttribute('value');

        //check 'Settings successfully updated' message
        await interfacePreferenceElementsObj.checkInterfaceUpdateMessage(driver);
        //page navigation and come back to interface preferences page
        await pageNavigationObj.comeBackToInterfacePreferencesPage(driver,screenshotPath);

        //get values from contact,company and deal interface preferences before navigation
        const expectedContactDefaultValue = await driver.findElement(By.id('Contact')).getAttribute("value");
        const expectedCompanyDefaultValue = await driver.findElement(By.id('Contact')).getAttribute("value");
        const expectedDealDefaultValue = await driver.findElement(By.id('Contact')).getAttribute("value");
        if(actualContactDefaultValue === expectedContactDefaultValue && actualCompanyDefaultValue === expectedCompanyDefaultValue && actualDealDefaultValue === expectedDealDefaultValue) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledInterfacePreferences.png');
            console.log("ContactDefault,companyDefault,dealDefault values are maintained as disabled after navigation");
        }else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'disabledInterfacePreferences_Case_Failed.png');
            await assert.fail("Due to preference options are not maintained as disabled after navigation,the test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Disabled contact,company,deal preference options are maintained after navigation");
});

When('Select light theme and verify message and navigate page',async function () {
    try {
        await driver.sleep(1000);
        const selectOption = await interfacePreferenceElementsObj.selectOption(driver);
        await selectOption.click();
        const themeElement = await interfacePreferenceElementsObj.selectTheme(driver,'Light');
        await themeElement.click();
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        await driver.sleep(1000);
        await interfacePreferenceElementsObj.checkInterfaceUpdateMessage(driver);

        //page navigation and come back to interface preferences page
        await pageNavigationObj.comeBackToInterfacePreferencesPage(driver,screenshotPath);
        //check theme verification after navigation
        await interfacePreferenceElementsObj.themeVerification(driver,'Light');
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'lightThemeVerification.png');
        console.log("Light theme selected successfully,so test case has been passed");
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'lightTheme_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As light theme is not maintained after navigation,test case has been aborted");
    }
});

When('Select dark theme and verify message and navigate page',async function () {
    try {
        await driver.sleep(1000);
        const selectOption = await interfacePreferenceElementsObj.selectOption(driver);
        await selectOption.click();
        const themeElement = await interfacePreferenceElementsObj.selectTheme(driver,'Dark');
        await themeElement.click();
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        await driver.sleep(1000);
        await interfacePreferenceElementsObj.checkInterfaceUpdateMessage(driver);

        //page navigation and come back to interface preferences page
        await pageNavigationObj.comeBackToInterfacePreferencesPage(driver,screenshotPath);
        //check theme verification after navigation
        await interfacePreferenceElementsObj.themeVerification(driver,'Dark');
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'darkThemeVerification.png');
        console.log("Dark theme selected successfully,so test case has been passed");
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'darkTheme_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As dark theme is not maintained after navigation,test case has been failed...");
    }
});

When('Verifying changes in {string} interface preferences should not affect {string}',async function(adminUser,user) {
    try {
        await driver.manage().setTimeouts({implicit: 10000});
        //get values of contact,company and deal interface preferences before navigation to other browser
        const actualContactDefaultValue = await driver.findElement(By.id('Contact')).getAttribute('value');
        const actualCompanyDefaultValue = await driver.findElement(By.id('Company')).getAttribute('value');
        const actualDealDefaultValue = await driver.findElement(By.id('Deal')).getAttribute('value');

        /*
        //verification visibility of 'Contact/Company' module
        await openSalesmateLoginPageObj.openSetupPage(driver, screenshotPath);
        const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        //will check the 'Profile Permissions' tab is visible or not
        if (profilePermissionsTab.length > 0) {
            //will set focus on the 'Profile Permissions' tab
            await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
            await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
            //will click on the 'Profile Permissions' tab
            await profilePermissionsTab[0].click();
        } else {
            //As 'Profile Permissions' tab is not visible to the logged-in user, it will do Admin login on the same browser 

            let adminUserNumber = '';

            //will get the Admin user details from the xlsx file
            const adminUserDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx', 'UserDetails');
            for (let i = 0; i < adminUserDetails.user.length; i++) {
                if (adminUserDetails.profile[i].toLowerCase() == 'admin') {
                    adminUserNumber = adminUserDetails.user[i];
                }
            }
            //will check whether the Admin user found or not from the excel file
            if (adminUserNumber == '') {
                await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \'' + userDetails.profile + '\'.');
            }

            //will open the Salesmate login page
            await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on interface preferences page');
            //will do Salesmate login with Admin user's credentials
            await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUserNumber, 'the {string} is on interface preferences page');
            //will open the 'Setup' page
            await openSalesmateLoginPageObj.openSetupPage(driver, screenshotPath);
            //will open profile permissions tab
            await interfacePreferenceElementsObj.clickOnProfilePermissions(driver);
        }
        const editButton = await interfacePreferenceElementsObj.clickOnEdit(driver);
        await editButton.click();
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['switch_Contact_access'], 'enable', driver);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','Save Button');
        await saveButton.click(); */

        //verifying through user2 details
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on interface preference page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on interface preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        const interfacePreferenceTab = await interfacePreferenceElementsObj.clickOnInterfacePreference(driver, screenshotPath);
        await interfacePreferenceTab.click();
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['Company'], 'enable', driver);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        await interfacePreferenceElementsObj.checkInterfaceUpdateMessage(driver);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'User2NotificationPreferencePage.png');
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on interface preference page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on interface preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        const interfaceTab = await interfacePreferenceElementsObj.clickOnInterfacePreference(driver, screenshotPath);
        await interfaceTab.click();

        //get values from contact,company and deal interface preferences after navigation from other browser
        const expectedContactDefaultValue = await driver.findElement(By.id('Contact')).getAttribute('value');
        console.log(expectedContactDefaultValue);
        const expectedCompanyDefaultValue = await driver.findElement(By.id('Company')).getAttribute('value');
        const expectedDealDefaultValue = await driver.findElement(By.id('Deal')).getAttribute('value');
        try {
            //compare both actual and expected values of contact,company and deal interface preferences
            strictEqual(actualContactDefaultValue, expectedContactDefaultValue);
            strictEqual(actualCompanyDefaultValue, expectedCompanyDefaultValue);
            strictEqual(actualDealDefaultValue, expectedDealDefaultValue);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'user2InterfacePreferences_Case_Failed.png');
            await assert.fail("As user2 changes has affected user1,the test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('{string} disabling view rights of company,contact and then contact,company should not be displayed under {string}',async function(adminUser,user) {
    console.log("****************************");
    try {
        console.log("1****************************");
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openSetupPage(driver, screenshotPath);
        const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        //will check the 'Profile Permissions' tab is visible or not
        if (profilePermissionsTab.length > 0) {
            //will set focus on the 'Profile Permissions' tab
            await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
            await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
            //will click on the 'Profile Permissions' tab
            await profilePermissionsTab[0].click();
            console.log("2****************************");
        } else {
            /* As 'Profile Permissions' tab is not visible to the logged-in user, it will do Admin login on the same browser */

            let adminUserNumber = '';

            //will get the Admin user details from the xlsx file
            const adminUserDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx', 'UserDetails');
            for (let i = 0; i < adminUserDetails.user.length; i++) {
                if (adminUserDetails.profile[i].toLowerCase() == 'admin') {
                    adminUserNumber = adminUserDetails.user[i];
                }
            }
            //will check whether the Admin user found or not from the excel file
            if (adminUserNumber == '') {
                await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \'' + userDetails.profile + '\'.');
            }

            //will open the Salesmate login page
            await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on interface preferences page');
            //will do Salesmate login with Admin user's credentials
            await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUserNumber, 'the {string} is on interface preferences page');
            //will open the 'Setup' page
            await openSalesmateLoginPageObj.openSetupPage(driver, screenshotPath);
            //will open profile permissions tab
            await interfacePreferenceElementsObj.clickOnProfilePermissions(driver);
        }
        const editButton = await interfacePreferenceElementsObj.clickOnEdit(driver);
        await editButton.click();
        await driver.sleep(1000);
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['switch_Contact_access'], 'disable', driver);
        await driver.sleep(1000);
        console.log("3****************************");
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
        console.log("4****************************");
        
        //As contact and company view rights are disabled,this block has been executed
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on interface preference page');
        console.log("5****************************");
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on interface preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        const interfacePreferenceTab = await interfacePreferenceElementsObj.clickOnInterfacePreference(driver, screenshotPath);
        await interfacePreferenceTab.click();
        await driver.manage().setTimeouts({implicit: 1000});
        try {
            const contactValue = await driver.findElements(By.id('Contact'));
            const contactLength = await contactValue.length;
            const companyValue = await driver.findElements(By.id('Company'));
            const companyLength = await companyValue.length;
            //checking that as contact and company view rights are disabled,they should not get displayed
            if (contactLength === 0 && companyLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledContactDeal.png');
                console.log("As contact and deal modules are not visible,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await driver.navigate().refresh();
                await driver.sleep(5000);
                await assert.fail("As contact and deal modules are visible,test case has been aborted")
            }
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on interface preference page');
            await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on interface preference page');
            await driver.sleep(1000);
            //will open the 'Setup' page
            await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
            //will find the 'Profile Permissions' tab
            const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
            //will set focus on the 'Profile Permissions' tab
            await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
            await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
            //will click on the 'Profile Permissions' tab
            await profilePermissionsTab[0].click();
            await driver.sleep(1000);
            const editButton = await interfacePreferenceElementsObj.clickOnEdit(driver);
            await editButton.click();
            await driver.sleep(1000);
            await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['switch_Contact_access', 'switch_Deal_access'], 'enable', driver);
            await driver.sleep(3500);
            const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','Save Button');
            await saveButton.click();
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'user1NotificationPreferencePage.png');
            console.log("As changes updated for profile standard user,the test case has been passed...");
        } catch (err) {
            assert.fail(err);
        }
        console.log("Disabled view rights of company,contact or deal test case has been passed");
    }
    catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});
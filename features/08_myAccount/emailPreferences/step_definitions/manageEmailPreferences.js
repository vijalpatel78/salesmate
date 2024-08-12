const {Given,When, Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const commonActionObj = require('../common/actions');
const emailPreferencesPageElementObj = require('../common/emailPreferencesPageElements');
const appsPageElementObj = require('../../../03_setup/apps_voice/apps/common/appsPageElements');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const formElementObj = require('../../../00_common/webElements/formElements');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/04_myAccount/emailPreferences/screenshots/';

let expectedDealEmailSharingValue = 'no', expectedActivityEmailSharingValue = 'no', expectedContactEmailSharingValue = 'no', isLoginUserAdmin = 'no';
let expectedFontFamilyDropdownVal, expectedFontSizeDropdownVal, expectedDealAutoLinkVal, expectedDealManuallyLinkVal, expectedDefaultEmailTrackingVal;

Given('the {string} is on email preferences page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/user/emailSettings/preferences')){
        console.log('The email preferences page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open email preferences page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on email preferences page');
        //will open the email preferences page
        await commonActionObj.openEmailPreferencesPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open email preferences page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on email preferences page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on email preferences page');
        //will open the email preferences page
        await commonActionObj.openEmailPreferencesPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the email preferences page
        await commonActionObj.openEmailPreferencesPage(driver,screenshotPath);  
    }
});

When('the user select {string} email sharing permission for the {string} module', async (value,module) =>{
    const moduleName = module.toLowerCase();

    //will find the email sharing dropdown of the respective module and then select the provided value
    try{
        if(moduleName == 'deal'){
            expectedDealEmailSharingValue = value;
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'dealSpecificEmailConversationField',value,'no');
        }else if(moduleName == 'activity'){
            expectedActivityEmailSharingValue = value;
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'activitySpecificEmailConversationField',value,'no');
        }else if(moduleName == 'contact'){
            expectedContactEmailSharingValue = value;
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'contactSpecificEmailConversationField',value,'no');
        }else{
            assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name ---> \'Contact\', \'Deal\' OR \'Activity\'.');
        }
    } catch(err){
        await commonActionObj.comeBackToEmailPreferencesPage(driver,screenshotPath);
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

When('click on the Save button', async () =>{
    //will find the 'Save' button and click on it
    const saveButton = await emailPreferencesPageElementObj.findSaveButton(driver,screenshotPath);
    await saveButton.click();
    try{
        await driver.wait(until.elementIsEnabled(saveButton),20000,'There seems to be some issue while performing operations.');
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }  
});

When('the user select {string} font {string}', async (value,dropdown) =>{
    //will set the focus on the 'Default Text Style' section
    await emailPreferencesPageElementObj.setFocusOnSection(driver,'Default Text Style');
    await driver.sleep(1000);

    //will find the font family or font size dropdown and then select the provided value
    try{
        if(dropdown.toLowerCase() == 'family'){
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'fontFamily',value,'yes');
        }else if(dropdown.toLowerCase() == 'size'){
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'fontSize',value,'yes');
        }else{
            assert.fail('The provided \''+dropdown+'\' dropdown name is not valid. Expected Dropdown Name ---> \'Family\' OR \'Size\'.');
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

When('the user search {string} from the {string} dropdown', async (value,dropdown) =>{
    try {
        let dropdownNameAttribute;

        //will set the focus on the 'Default Text Style' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Default Text Style');
        await driver.sleep(1000);

        //will check the search chars are provided or not
        if (value != '') {
            //will check the provided dropdown name is valid or not
            if (dropdown.toLowerCase() == 'font family') {
                dropdownNameAttribute = 'fontFamily';
            } else if (dropdown.toLowerCase() == 'font size') {
                dropdownNameAttribute = 'fontSize';
            } else {
                assert.fail('The provided \'' + dropdown + '\' dropdown name is not valid. Expected Dropdown Name ---> \'Font Family\' OR \'Font Size\'.');
            }

            //will find the font family or font size dropdown and click on it
            const dropdownElem = await formElementObj.findDropdown(driver, screenshotPath, dropdownNameAttribute);
            await dropdownElem.click();
            //will find the dropdown search box and pass the search chars in it
            try {
                const dropdownSearchBox = await formElementObj.findDropdownSearchBox(driver, screenshotPath, dropdownNameAttribute);
                await dropdownSearchBox.sendKeys(value);
                await driver.sleep(1000);
            } catch (err) {
                await dropdownElem.click();
                await driver.sleep(1000);
                assert.fail(err);
            }
        } else {
            assert.fail('The search value is not provided for the \'' + dropdown.toLowerCase() + '\' dropdown.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user click on the {string} option of {string} setting', async (value,unused) =>{
    try {
        //will set the focus on the 'Automatic Email Linking' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Automatic Email Linking');
        await driver.sleep(2000);

        //will find the Auto Link or Manual Link radio button and click on it
        if (value.toLowerCase() == 'auto') {
            const autoLinkEmailWithDealRadioButton = await emailPreferencesPageElementObj.findLinkEmailWithDealRadioButton(driver, screenshotPath, 'Automatically link emails with deals');
            await autoLinkEmailWithDealRadioButton.click();
        } else if (value.toLowerCase() == 'manual') {
            const manualLinkEmailWithDealRadioButton = await emailPreferencesPageElementObj.findLinkEmailWithDealRadioButton(driver, screenshotPath, 'Link emails manually only');
            await manualLinkEmailWithDealRadioButton.click();
        } else {
            assert.fail('The provided \'' + value + '\' option is not valid. Expected Options ---> \'Auto\' OR \'Manual\'.');
        }
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user click on the Setup>Apps', async () =>{
    try {
        //will open the 03_setup page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);

        //will check the 'Apps' option is visible or not
        const appsBtn = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, 'Apps');
        if (appsBtn.length > 0) {
            isLoginUserAdmin = 'yes';
            //will click on the 'Apps' option if it is visible
            await driver.executeScript("arguments[0].scrollIntoView();", appsBtn[0]);
            await driver.wait(until.elementIsVisible(appsBtn[0]));
            await appsBtn[0].click();
            await driver.sleep(1000);
        } else {
            /* if the 'Apps' option is not visible then will mark that
             * the logged-in user is not Admin and this flag will be used later
            */
            isLoginUserAdmin = 'no';
            console.log('The logged-in user is not admin');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user marks {string} option of the {string} app as {string}', async (option,appDisplayName,newStateOfEmailTrackingOption) =>{
    try {
        //will check the provided value is valid to execute the test case
        if (appDisplayName.toLowerCase() != 'email open & click tracking') {
            assert.fail('The provided \'' + appDisplayName + '\' app name is not valid. Expected App Name ---> \'Email Open & Click Tracking\'.');
        }
        if (newStateOfEmailTrackingOption.toLowerCase() != 'disabled' && newStateOfEmailTrackingOption.toLowerCase() != 'enabled') {
            assert.fail('The provided \'' + newStateOfEmailTrackingOption + '\' value is not valid. Expected Value ---> \'Enabled\' OR \'Disabled\'.');
        }

        //will check the logged-in user is Admin or not
        if (isLoginUserAdmin == 'yes') {
            //will open the configuration page of 'Email Open & Click Tracking' app
            const emailTrackingAppConfigurationLink = await appsPageElementObj.findAppConfigurationLink(driver, appDisplayName);
            await driver.executeScript("arguments[0].scrollIntoView();", emailTrackingAppConfigurationLink[0]);
            await driver.wait(until.elementIsVisible(emailTrackingAppConfigurationLink[0]));
            await emailTrackingAppConfigurationLink[0].click();
            await driver.sleep(1000);

            //will enable or disable the email tracking option
            const emailTrackOption = await appsPageElementObj.findEmailTrackingAppOption(driver, screenshotPath, 'trackEmail');
            const currentStateOfEmailTrackOption = await emailTrackOption.getAttribute('value');
            if (newStateOfEmailTrackingOption.toLowerCase() == 'disabled' && currentStateOfEmailTrackOption == 'true') {
                await driver.executeScript("arguments[0].click();", emailTrackOption);
            } else if (newStateOfEmailTrackingOption.toLowerCase() == 'enabled' && currentStateOfEmailTrackOption == 'false') {
                await driver.executeScript("arguments[0].click();", emailTrackOption);
            } else {
                console.log('The \'Do you want to track your email?\' option is already ' + newStateOfEmailTrackingOption + '...');
            }
        } else {
            //will enable or disable the email tracking option of the 'Email Open & Click Tracking' app through the Admin login
            await commonActionObj.configureEmailTrackingAppOptions(driver, screenshotPath, 'click on the Apps and mark {string} option of the {string} app as {string}', appDisplayName, newStateOfEmailTrackingOption);
        }
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the {string} option is getting displayed', async (option) =>{
    try {
        //will set the focus on the 'Email Tracking' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Email Tracking');
        await driver.sleep(1000);

        //will check the email tracking option is visible or not
        const defaultEmailTrackingOption = await emailPreferencesPageElementObj.findDefaultEmailTrackingOption(driver, screenshotPath);
        if (defaultEmailTrackingOption.length > 0) {
            console.log('The \'' + option + '\' option is getting displayed....')
        } else {
            /* If the email tracking option is not visible then
             * will make it visible by enabling email tracking option of the tracking app
            */

            //will open the 03_setup page
            await openSalesmatePageObj.openSetupPage(driver, screenshotPath);

            //will check the 'Apps' option is visible or not
            const appsBtn = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, 'Apps');
            if (appsBtn.length > 0) {
                //will click on the 'Apps' option if it is visible
                await driver.executeScript("arguments[0].scrollIntoView();", appsBtn[0]);
                await driver.wait(until.elementIsVisible(appsBtn[0]));
                await appsBtn[0].click();
                await driver.sleep(1000);

                //will open the configuration page of 'Email Open & Click Tracking' app
                const emailTrackingAppConfigurationLink = await appsPageElementObj.findAppConfigurationLink(driver, 'Email Open & Click Tracking');
                await driver.executeScript("arguments[0].scrollIntoView();", emailTrackingAppConfigurationLink[0]);
                await driver.wait(until.elementIsVisible(emailTrackingAppConfigurationLink[0]));
                await emailTrackingAppConfigurationLink[0].click();
                await driver.sleep(1000);

                //will enable email tracking option
                const emailTrackOption = await appsPageElementObj.findEmailTrackingAppOption(driver, screenshotPath, 'trackEmail');
                await driver.executeScript("arguments[0].click();", emailTrackOption);
                await driver.sleep(1000);

                //will go back to the email preferences page
                await commonActionObj.openEmailPreferencesPage(driver, screenshotPath);
            } else {
                /*  If the 'Apps' option is not visible then will enable
                 *  email tracking option of the tracking app through the Admin login
                */
                //will enable or disable the email tracking option of the 'Email Open & Click Tracking' app through the Admin login
                await commonActionObj.configureEmailTrackingAppOptions(driver, screenshotPath, 'the {string} option is getting displayed', 'Email Open & Click Tracking', 'Enabled');
                //will go back to the email preferences page
                await commonActionObj.openEmailPreferencesPage(driver, screenshotPath);
                await driver.navigate().refresh();
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user {string} {string} option', async (value,option) =>{
    try {
        //will check the provided value is valid to execute the test case
        if (value.toLowerCase() != 'enable' && value.toLowerCase() != 'disable') {
            assert.fail('The provided \'' + value + '\' value is not valid. Expected Value ---> \'Enable\' OR \'Disable\'.');
        }

        //will set the focus on the 'Email Tracking' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Email Tracking');
        await driver.sleep(1000);

        //will enable or disable the email tracking option
        const defaultEmailTrackingOption = await emailPreferencesPageElementObj.findDefaultEmailTrackingOption(driver, screenshotPath);
        const getCurrentState = await defaultEmailTrackingOption[0].getAttribute('value');
        if (value.toLowerCase() == 'enable' && getCurrentState == 'false') {
            await driver.executeScript("arguments[0].click();", defaultEmailTrackingOption[0]);
        } else if (value.toLowerCase() == 'disable' && getCurrentState == 'true') {
            await driver.executeScript("arguments[0].click();", defaultEmailTrackingOption[0]);
        } else {
            console.log('The \'' + option + '\' option is already ' + value + 'd...');
        }
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the {string} update email preferences settings from his account', async (user) =>{
    try {
        //will get the email preferences data of the currently logged-in user
        const emailPreferencesSettingsofLoginUser = await commonActionObj.getEmailPreferencesSettings(driver, screenshotPath);
        expectedDealEmailSharingValue = emailPreferencesSettingsofLoginUser.dealEmailSharingVal;
        expectedActivityEmailSharingValue = emailPreferencesSettingsofLoginUser.activityEmailSharingVal;
        expectedContactEmailSharingValue = emailPreferencesSettingsofLoginUser.contactEmailSharingVal;
        expectedFontFamilyDropdownVal = emailPreferencesSettingsofLoginUser.fontFamilyDropdownVal;
        expectedFontSizeDropdownVal = emailPreferencesSettingsofLoginUser.fontSizeDropdownVal;
        expectedDealAutoLinkVal = emailPreferencesSettingsofLoginUser.dealAutoLinkVal;
        expectedDealManuallyLinkVal = emailPreferencesSettingsofLoginUser.dealManuallyLinkVal;
        expectedDefaultEmailTrackingVal = emailPreferencesSettingsofLoginUser.defaultEmailTrackingVal;

        /* To check this case, it is required to do login in another provided Salesmate account */

        //will logout from the current login and open the login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} update email preferences settings from his account');
        //will do Salesmate login with another user's credentials on that browser
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} update email preferences settings from his account');
        //will open the email preferences page on that browser
        await commonActionObj.openEmailPreferencesPage(driver, screenshotPath);
        await driver.sleep(2000);

        //will update email sharing settings
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'dealSpecificEmailConversationField', 'Private', 'no');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'activitySpecificEmailConversationField', 'Private', 'no');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'contactSpecificEmailConversationField', 'Private', 'no');
        const saveButton = await emailPreferencesPageElementObj.findSaveButton(driver, screenshotPath);
        await saveButton.click();
        await driver.wait(until.elementIsEnabled(saveButton), 20000, 'There seems to be some issue while updating email sharing permissions.');

        //will update default text style settings
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fontFamily', 'Verdana', 'yes');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fontFamily', 'Georgia', 'yes');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fontSize', '20', 'yes');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fontSize', '12', 'yes');
        await driver.sleep(1000);

        //will update auto-link emails with deals settings
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Automatic Email Linking');
        const manualLinkEmailWithDealRadioButton = await emailPreferencesPageElementObj.findLinkEmailWithDealRadioButton(driver, screenshotPath, 'Link emails manually only');
        await manualLinkEmailWithDealRadioButton.click();
        const autoLinkEmailWithDealRadioButton = await emailPreferencesPageElementObj.findLinkEmailWithDealRadioButton(driver, screenshotPath, 'Automatically link emails with deals');
        await autoLinkEmailWithDealRadioButton.click();
        await driver.sleep(1000);

        //will update default email tracking settings(if email tracking option is visible)
        const defaultEmailTrackingOption = await emailPreferencesPageElementObj.findDefaultEmailTrackingOption(driver, screenshotPath);
        if (defaultEmailTrackingOption.length > 0) {
            await driver.executeScript("arguments[0].click();", defaultEmailTrackingOption[0]);
        }
        await driver.sleep(3000);

        //will logout from the current login and open the login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} update email preferences settings from his account');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the email sharing permissions should get set for {string} module', async (module) =>{
    try {
        let fieldName;

        //will navigate on another page and come back to the email preferences page after updating data
        await commonActionObj.comeBackToEmailPreferencesPage(driver, screenshotPath);
        await driver.sleep(1000);

        //will check the email sharing data get updated or not
        try {
            if (expectedDealEmailSharingValue != 'no') {
                fieldName = 'DealEmailSharing';
                const dealEmailSharingDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'dealSpecificEmailConversationField');
                const actualDealEmailSharingValue = await dealEmailSharingDropdown.getText();
                assert.strictEqual(actualDealEmailSharingValue, expectedDealEmailSharingValue);
            }
            if (expectedActivityEmailSharingValue != 'no') {
                fieldName = 'ActivityEmailSharing';
                const activityEmailSharingDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'activitySpecificEmailConversationField');
                const actualActivityEmailSharingValue = await activityEmailSharingDropdown.getText();
                assert.strictEqual(actualActivityEmailSharingValue, expectedActivityEmailSharingValue);
            }
            if (expectedContactEmailSharingValue != 'no') {
                fieldName = 'ContactEmailSharing';
                const contactEmailSharingDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'contactSpecificEmailConversationField');
                const actualContactEmailSharingValue = await contactEmailSharingDropdown.getText();
                assert.strictEqual(actualContactEmailSharingValue, expectedContactEmailSharingValue);
            }
        } catch (err) {
            expectedDealEmailSharingValue = 'no', expectedActivityEmailSharingValue = 'no', expectedContactEmailSharingValue = 'no';
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'DropdownData_NotUpdated.png');
            assert.fail('Due to the \'' + fieldName + '\' dropdown data is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'DropdownData_NotUpdated.png\'');
        }
        expectedDealEmailSharingValue = 'no', expectedActivityEmailSharingValue = 'no', expectedContactEmailSharingValue = 'no';

        console.log('\'Set email sharing permissions for ' + module.toLowerCase() + ' module(s)\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should set default {string} font {string} for the email content', async (expectedValue,dropdown) =>{
    try {
        let fieldName;

        await commonElementObj.findNotyMessageInRareCase(driver);

        //will navigate on another page and come back to the email preferences page after updating data
        await commonActionObj.comeBackToEmailPreferencesPage(driver, screenshotPath);
        await driver.sleep(1000);

        //will set focus on the 'Default Text Style' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Default Text Style');
        await driver.sleep(1000);

        //will check the font family or font size data get updated or not
        try {
            if (dropdown.toLowerCase() == 'family') {
                fieldName = 'FontFamily';
                const fontFamilyDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'fontFamily');
                const actualFontFamilyDropdownVal = await fontFamilyDropdown.getText();
                assert.strictEqual(actualFontFamilyDropdownVal, expectedValue);
            } else if (dropdown.toLowerCase() == 'size') {
                fieldName = 'FontSize';
                const fontSizeDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'fontSize');
                const actualFontSizeDropdownVal = await fontSizeDropdown.getText();
                assert.strictEqual(actualFontSizeDropdownVal, expectedValue);
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'DropdownData_NotUpdated.png');
            assert.fail('Due to the \'' + fieldName + '\' dropdown data is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'DropdownData_NotUpdated.png\'');
        }
        console.log('\'Set default ' + expectedValue + ' font ' + dropdown + ' for the email content\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should give {string} {string} for the {string} dropdown', async (unused,expectedSearchChars,dropdown) =>{
    try {
        //will find the font family or font size dropdown list
        const dropdownNameAttribute = dropdown.toLowerCase() == 'font family' ? 'fontFamily' : 'fontSize';
        const dropdownElem = await formElementObj.findDropdown(driver, screenshotPath, dropdownNameAttribute);
        const dropdownListElem = await formElementObj.findDropdownListElement(driver);

        //will check the search result of dropdown contains search chars or not
        try {
            for (let i = 0; i < dropdownListElem.length; i++) {
                searchResult = await dropdownListElem[i].getText();
                searchResult = searchResult.toLowerCase();
                try {
                    assert(searchResult.includes(expectedSearchChars.toLowerCase()));
                } catch (err) {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + dropdownNameAttribute + 'DropdownSearch_NotWorking.png');
                    assert.fail('Due to the \'' + await dropdownListElem[i].getText() + '\' search result of \'' + dropdownNameAttribute + '\' dropdown doesn\'t contain \'' + expectedSearchChars + '\' search char(s), the test case has been failed. Screenshot Name: \'' + screenshotPath + dropdownNameAttribute + 'DropdownSearch_NotWorking.png\'');
                }
            }
        } catch (err) {
            await dropdownElem.click();
            await driver.sleep(1000);
            assert.fail(err);
        }

        //will close the respective dropdown list
        await driver.sleep(1000);
        await dropdownElem.click();
        console.log('\'Search \"' + expectedSearchChars + '\" value from the ' + dropdown.toLowerCase() + ' dropdown\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should select {string} option of {string} setting', async (value,setting) =>{
    try {
        const idAttribute = value.toLowerCase() == 'auto' ? 'automaticLinkDealPreferenceField_true' : 'automaticLinkDealPreferenceField_false';

        await commonElementObj.findNotyMessageInRareCase(driver);

        //will navigate on another page and come back to the email preferences page after updating data
        await commonActionObj.comeBackToEmailPreferencesPage(driver, screenshotPath);
        await driver.sleep(1000);

        //will set the focus on the 'Automatic Email Linking' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Automatic Email Linking');
        await driver.sleep(1000);

        //will check the auto or manual email link option get selected or not
        try {
            assert(await driver.executeScript("return $('input#" + idAttribute + "').prop('checked');"));
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + value + 'LinkEmailWithDealRadioButton_NotSelected.png');
            assert.fail('Because of the \'' + value.toLowerCase() + '\' option of \'' + setting.toLowerCase() + '\' setting is not showing as selected, the test case has been failed. Screenshot Name: \'' + screenshotPath + value + 'LinkEmailWithDealRadioButton_NotSelected.png\'');
        }
        console.log('\'Select \"' + value.toLowerCase() + '\" option of \"' + setting.toLowerCase() + '\" setting\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should {string} {string} option under the My Account>Email Settings>Email Preferences page', async (state,option) =>{
    try {
        //will refresh the email preferences page after updating the 'Email Tracking' app
        await commonActionObj.openEmailPreferencesPage(driver, screenshotPath);
        await driver.navigate().refresh();

        //will set the focus on the 'Email Tracking' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Email Tracking');
        await driver.sleep(1000);

        //will check the default email tracking option is get hide or display according to the 'Email Tracking' app settings
        const defaultEmailTrackingOption = await emailPreferencesPageElementObj.findDefaultEmailTrackingOption(driver, screenshotPath);
        if (state.toLowerCase() == 'not display') {
            if (defaultEmailTrackingOption.length == 0) {
                console.log('\'When the email tracking app is not configured then the \"' + option + '\" option should not be displayed\' case has been passed successfully...');
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'DefaultEmailTrackingOption_Displayed.png');
                assert.fail('Because of the \'' + option + '\' option is getting displayed, the test case has been failed. Screenshot Name: \'' + screenshotPath + 'DefaultEmailTrackingOption_Displayed.png\'.');
            }
        } else if (state.toLowerCase() == 'display') {
            if (defaultEmailTrackingOption.length > 0) {
                console.log('\'When the email tracking app is configured then the \"' + option + '\" option should be displayed\' case has been passed successfully...');
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'DefaultEmailTrackingOption_NotDisplayed.png');
                assert.fail('Because of the \'' + option + '\' option is not getting displayed, the test case has been failed. Screenshot Name: \'' + screenshotPath + 'DefaultEmailTrackingOption_NotDisplayed.png\'.');
            }
        } else {
            assert.fail('The provided \'' + state + '\' value is not valid. Expected Value ---> \'not display\' OR \'display\'.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should show {string} option as {string}', async (option,expectedState) =>{
    try {
        //will check the provided value is valid to execute the test case
        if (expectedState.toLowerCase() != 'disabled' && expectedState.toLowerCase() != 'enabled') {
            assert.fail('The provided \'' + expectedState + '\' value is not valid. Expected Value ---> \'Enabled\' OR \'Disabled\'.');
        }

        await commonElementObj.findNotyMessageInRareCase(driver);

        //will navigate on another page and come back to the email preferences page after updating data
        await commonActionObj.comeBackToEmailPreferencesPage(driver, screenshotPath);
        await driver.sleep(1000);

        //will set the focus on the 'Email Tracking' section
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Email Tracking');
        await driver.sleep(2000);

        //will check the default email tracking settings get updated or not
        const defaultEmailTrackingOption = await emailPreferencesPageElementObj.findDefaultEmailTrackingOption(driver, screenshotPath);
        const getCurrentState = await defaultEmailTrackingOption[0].getAttribute('value');
        try {
            if (expectedState.toLowerCase() == 'enabled') {
                assert(getCurrentState.includes('true'));
            } else if (expectedState.toLowerCase() == 'disabled') {
                assert(getCurrentState.includes('false'));
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'DefaultEmailTrackingOption_Not_' + expectedState + '.png');
            assert.fail('Because of the \'' + option + '\' option is not getting ' + expectedState + ', the test case has been failed. Screenshot Name: \'' + screenshotPath + 'DefaultEmailTrackingOption_Not_' + expectedState + '.png\'.');
        }

        const caseName = expectedState.toLowerCase() == 'enabled' ? 'Enable' : 'Disable';
        console.log('\'' + caseName + ' \"' + option + '\" option\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('it should not create an impact on the email preferences settings of the {string} account', async (user) =>{
    try {
        //will do Salesmate login with another user's credentials on that browser
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'it should not create an impact on the email preferences settings of the {string} account');
        //will open the email preferences page on that browser
        await commonActionObj.openEmailPreferencesPage(driver, screenshotPath);
        await driver.sleep(2000);

        //will get email preferences settings of the currently logged-in user after updating email preferences settings in the other account
        const emailPreferencesSettingsofLoginUser = await commonActionObj.getEmailPreferencesSettings(driver, screenshotPath);
        const actualDealEmailSharingValue = emailPreferencesSettingsofLoginUser.dealEmailSharingVal;
        const actualActivityEmailSharingValue = emailPreferencesSettingsofLoginUser.activityEmailSharingVal;
        const actualContactEmailSharingValue = emailPreferencesSettingsofLoginUser.contactEmailSharingVal;
        const actualFontFamilyDropdownVal = emailPreferencesSettingsofLoginUser.fontFamilyDropdownVal;
        const actualFontSizeDropdownVal = emailPreferencesSettingsofLoginUser.fontSizeDropdownVal;
        const actualDealAutoLinkVal = emailPreferencesSettingsofLoginUser.dealAutoLinkVal;
        const actualDealManuallyLinkVal = emailPreferencesSettingsofLoginUser.dealManuallyLinkVal;
        const actualDefaultEmailTrackingVal = emailPreferencesSettingsofLoginUser.defaultEmailTrackingVal;
        await emailPreferencesPageElementObj.setFocusOnSection(driver, 'Automatic Email Linking');

        //will check the email preferences settings of the currently logged-in user should not get changed
        //after updating email preferences settings in the other account
        try {
            assert.strictEqual(actualDealEmailSharingValue, expectedDealEmailSharingValue);
            assert.strictEqual(actualActivityEmailSharingValue, expectedActivityEmailSharingValue);
            assert.strictEqual(actualContactEmailSharingValue, expectedContactEmailSharingValue);
            assert.strictEqual(actualFontFamilyDropdownVal, expectedFontFamilyDropdownVal);
            assert.strictEqual(actualFontSizeDropdownVal, expectedFontSizeDropdownVal);
            assert.strictEqual(actualDealAutoLinkVal, expectedDealAutoLinkVal);
            assert.strictEqual(actualDealManuallyLinkVal, expectedDealManuallyLinkVal);
            assert.strictEqual(actualDefaultEmailTrackingVal, expectedDefaultEmailTrackingVal);
        } catch (err) {
            assert.fail('After changing email preferences settings from the one account, it is creating an impact on another account. This value get changed ---> \'' + err + '\'');
        }
        console.log('The \'user wise email preferences settings\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
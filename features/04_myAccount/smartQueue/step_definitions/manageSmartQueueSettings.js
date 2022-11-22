const {Given,When,Then} = require('@cucumber/cucumber');
const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const {strictEqual} = require('assert');
const smartQueuePageElementObj = require('../common/smartQueuePageElements');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const commonActionObj = require('../../../00_common/actions/commonActions');
const actionObj = require('../common/actions');
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/04_myAccount/smartQueue/screenshots/';
let expectedTimerFieldData, expectedRingTimeFieldData, expectedAutoDialFieldData;

Given('the {string} is on smart queue page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/user/activitySmartQueue')){
        console.log('The smart queue page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate 02_login page,
         *  then the process to open smart queue page will be started from by performing the Salesmate 02_login
        */

        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on smart queue page');
        //will open the smart queue page
        await actionObj.openSmartQueuePage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate 02_login page,
         *  then the process to open smart queue page will be started from by opening the Salesmate 02_login page
        */

        //will open the Salesmate 02_login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on smart queue page');
        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on smart queue page');
        //will open the smart queue page
        await actionObj.openSmartQueuePage(driver,screenshotPath);
    }
    else{
        //will open the smart queue page
        await actionObj.openSmartQueuePage(driver,screenshotPath);
    }
});

When('the user {string} Do you want to auto-dial number for call activities under smart queues? option', async (newStateVal) =>{
    try {
        //will enable or disable 'Auto-dial' option
        await actionObj.enableOrDisableAutoDial(driver, screenshotPath, newStateVal);
        expectedAutoDialFieldData = newStateVal.toLowerCase();
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('enter {string} in the Wait for X seconds before auto dialing the number field', async (value) =>{
    /* To view timer field, it is required to enable 'Auto-dial' option */

    //will enable 'Auto-dial' option
    try {
        await actionObj.enableOrDisableAutoDial(driver, screenshotPath, 'enable');
        //will enter data in the 'Auto-dial Timer' field
        await actionObj.enterAutoDialTimerData(driver, screenshotPath, value);
        expectedTimerFieldData = value;
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('enter {string} in the Manage ring time field', async (value) =>{
    //will enter data in the 'Manage Ring Time' field
    try {
        await actionObj.enterRingTimeData(driver, screenshotPath, value);
        expectedRingTimeFieldData = value;
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user leave {string} and {string} fields as blank', async (timerFieldName,ringTimefieldName) =>{
    /* To view timer field, it is required to enable 'Auto-dial' option */

    //will get the current value of 'Auto-dial' option
    try {
        const autoDialCheckbox = await smartQueuePageElementObj.findAutoDialCheckbox(driver, screenshotPath);
        expectedAutoDialFieldData = await autoDialCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
        //will enable 'Auto-dial' option
        await actionObj.enableOrDisableAutoDial(driver, screenshotPath, 'enable');

        //will find 'Auto-dial Timer' field and will get the current value of 'Auto-dial Timer' field
        const autoDialTimerField = await smartQueuePageElementObj.findAutoDialTimerField(driver, screenshotPath);
        expectedTimerFieldData = await autoDialTimerField.getAttribute('value');
        //will clear 'Auto-dial Timer' field data
        await clearFieldDataObj.clearFieldData(autoDialTimerField);
        await driver.sleep(1000);

        //will find 'Manage Ring Time' field and will get the current value of 'Manage Ring Time' field
        const manageRingTimeField = await smartQueuePageElementObj.findManageRingTimeField(driver, screenshotPath);
        expectedRingTimeFieldData = await manageRingTimeField.getAttribute('value');
        //will clear 'Manage Ring Time' field data
        await clearFieldDataObj.clearFieldData(manageRingTimeField);
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user enter {string} in the {string} field', async (value,timerFieldName) =>{
    /* To view timer field, it is required to enable 'Auto-dial' option */

    //will find 'Auto-dial' option and will get the current value of 'Auto-dial' option
    try {
        const autoDialCheckbox = await smartQueuePageElementObj.findAutoDialCheckbox(driver, screenshotPath);
        expectedAutoDialFieldData = await autoDialCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
        //will enable 'Auto-dial' option
        await actionObj.enableOrDisableAutoDial(driver, screenshotPath, 'enable');

        //will get the current value of 'Auto-dial Timer' field
        const autoDialTimerField = await smartQueuePageElementObj.findAutoDialTimerField(driver, screenshotPath);
        expectedTimerFieldData = await autoDialTimerField.getAttribute('value');
        //will pass the data in the 'Auto-dial Timer' field
        await actionObj.enterAutoDialTimerData(driver, screenshotPath, value);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('enter {string} in the {string} field', async (value,ringTimefieldName) =>{
    //will get the current value of 'Manage Ring Time' field
    try {
        const manageRingTimeField = await smartQueuePageElementObj.findManageRingTimeField(driver, screenshotPath);
        expectedRingTimeFieldData = await manageRingTimeField.getAttribute('value');
        //will pass the data in the 'Manage Ring Time' field
        await actionObj.enterRingTimeData(driver, screenshotPath, value);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the {string} update smart queue settings from his account', async (user) =>{
    //will get the smart queue settings of the currently logged-in user
    try {
        expectedAutoDialFieldData = await actionObj.getAutoDialData(driver, screenshotPath);
        expectedTimerFieldData = expectedAutoDialFieldData == 'enable' ? await actionObj.getAutoDialTimerData(driver, screenshotPath) : null;
        expectedRingTimeFieldData = await actionObj.getRingTimeData(driver, screenshotPath);

        /* To check this case, it is required to do 02_login in another provided Salesmate account */

        //will logout from the current 02_login and open the 02_login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} update smart queue settings from his account');
        //will do Salesmate 02_login with another user's credentials on that browser
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} update smart queue settings from his account');
        //will open the smart queue page on that browser
        await actionObj.openSmartQueuePage(driver, screenshotPath);
        await driver.sleep(2000);

        //will update smart queue settings in another user account
        await actionObj.enableOrDisableAutoDial(driver, screenshotPath, 'enable');
        await actionObj.enterAutoDialTimerData(driver, screenshotPath, '11');
        await actionObj.enterRingTimeData(driver, screenshotPath, '19');
        const updateBtn = await driver.findElement(By.id('btnUpdate'));
        await updateBtn.click();
        await driver.wait(until.elementIsEnabled(updateBtn));
        await driver.sleep(3000);

        //will logout from the current 02_login and open the 02_login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} update smart queue settings from his account');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the smart queue settings should get updated', async () =>{
    //will check the success message is displayed or not
    try {
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, 'Updated successfully.');
        await driver.sleep(3000);
        //will navigate on the another page and then come back to the smart queue page
        await actionObj.comeBackToSmartQueuePage(driver, screenshotPath);
        await driver.sleep(1000);

        //will check the details of smart queue settings are get updated or not
        try {
            fieldName = 'AutoDial';
            await actionObj.compareAutoDialData(driver, screenshotPath, expectedAutoDialFieldData);
            fieldName = 'AutoDialTimer';
            if (expectedAutoDialFieldData == 'enable') {
                await actionObj.compareAutoDialTimerData(driver, screenshotPath, expectedTimerFieldData);
            }
            fieldName = 'ManageRingTime';
            await actionObj.compareRingTimeData(driver, screenshotPath, expectedRingTimeFieldData);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'FieldData_NotUpdated.png');
            assert.fail('Due to the \'' + fieldName + '\' field data is not updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'FieldData_NotUpdated.png\'.');
        }

        console.log('\'Update smart queue settings\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the Do you want to auto-dial number for call activities under smart queues? option should get {string}', async (expectedStateVal) =>{
    try {
        if (expectedStateVal.toLowerCase() != 'enabled' && expectedStateVal.toLowerCase() != 'disabled') {
            assert.fail('The provided \'' + expectedStateVal + '\' value is not valid. The value should be either \'enabled\' or \'disabled\'.');
        } else {
            expectedStateVal = expectedStateVal.toLowerCase() == 'enabled' ? 'enable' : 'disable';
        }
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, 'Updated successfully.');
        await driver.sleep(3000);

        //will navigate on the another page and then come back to the smart queue page
        await actionObj.comeBackToSmartQueuePage(driver, screenshotPath);
        await driver.sleep(1000);

        //will check 'Auto-dial' option get updated or not
        try {
            await actionObj.compareAutoDialData(driver, screenshotPath, expectedStateVal);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'AutoDialOption_NotUpdated.png');
            assert.fail('Due to the \'Do you want to auto-dial number for call activities under smart queues?\' option is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'AutoDialOption_NotUpdated.png\'.');
        }

        console.log('\'Do ' + expectedStateVal + ' \"Do you want to auto-dial number for call activities under smart queues?\" option\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should give {string} validation for the {string} field and {string} validation for the {string} field in case of {string}', async (expectedAutoDialTimerFieldValidation,autoDialTimerField,expectedManageRingTimeFieldValidation,manageRingTimeField,caseName) =>{
    try {
        let fieldName;

        //will check that the field validation message is as per the expectation or not
        try {
            fieldName = 'AutoDialTimer';
            autoDialTimerField = await smartQueuePageElementObj.findAutoDialTimerField(driver, screenshotPath);
            const autoDialTimerFieldValidation = await smartQueuePageElementObj.findFieldValidationMessage(driver, screenshotPath, autoDialTimerField);
            assert.strictEqual(await autoDialTimerFieldValidation.getText(), expectedAutoDialTimerFieldValidation);

            fieldName = 'ManageRingTime';
            manageRingTimeField = await smartQueuePageElementObj.findManageRingTimeField(driver, screenshotPath);
            const manageRingTimeFieldValidation = await smartQueuePageElementObj.findFieldValidationMessage(driver, screenshotPath, manageRingTimeField);
            assert.strictEqual(await manageRingTimeFieldValidation.getText(), expectedManageRingTimeFieldValidation);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'Field_ValidationMsg_NotValid.png');
            await actionObj.comeBackToSmartQueuePage(driver, screenshotPath);
            assert.fail('Due to the \'' + fieldName + '\' field validation message is not as per the expectation, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'Field_ValidationMsg_NotValid.png\'');
        }

        //will navigate on the another page and then come back to the smart queue page
        await actionObj.comeBackToSmartQueuePage(driver, screenshotPath);
        await driver.sleep(1000);

        if (caseName.toLowerCase() == 'required') {
            console.log('\'Check field required validation\' case has been passed successfully...');
        } else if (caseName.toLowerCase() == 'less than 5') {
            console.log('\'Check less than 5 validation\' case has been passed successfully...');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should give {string} validation message in case of {string}', async (expectedValidationMsg,caseName) =>{
    //will find notification message after updating settings
    try {
        const notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);
        await driver.sleep(1000);
        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();
        //will check that the notification message is as per the expectation or not
        try {
            assert.strictEqual(notyMessageText, expectedValidationMsg);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'ValidationMessage_NotValid.png');
            await actionObj.comeBackToSmartQueuePage(driver, screenshotPath);
            await driver.sleep(1000);
            assert.fail('Due to the validation message is not as per the expectation, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'ValidationMessage_NotValid.png\'.');
        }

        //will navigate on the another page and then come back to the smart queue page
        await actionObj.comeBackToSmartQueuePage(driver, screenshotPath);
        await driver.sleep(1000);

        if (caseName.toLowerCase() == 'invalid data') {
            console.log('\'Check ' + caseName.toLowerCase() + '\' case has been passed successfully...');
        } else if (caseName.toLowerCase() == 'length validation') {
            console.log('\'Check ' + caseName.toLowerCase() + '\' case has been passed successfully...');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the smart queue settings should not get changed', async () =>{
    try {
        let fieldName;

        //will check the details of smart queue settings should not get changed
        try {
            fieldName = 'AutoDial';
            await actionObj.compareAutoDialData(driver, screenshotPath, expectedAutoDialFieldData);
            fieldName = 'AutoDialTimer';
            if (expectedAutoDialFieldData == 'enable') {
                await actionObj.compareAutoDialTimerData(driver, screenshotPath, expectedTimerFieldData);
            }
            fieldName = 'ManageRingTime';
            await actionObj.compareRingTimeData(driver, screenshotPath, expectedRingTimeFieldData);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'FieldData_GetChanged.png');
            assert.fail('Due to the \'' + fieldName + '\' field data is get changed, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'FieldData_GetChanged.png\'.');
        }
        console.log('After checking the negative case, the smart queue settings is not get affected...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('it should not create an impact on the smart queue settings of the {string} account', async (user) =>{
    //will do Salesmate 02_login with another user's credentials on that browser
    try {
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'it should not create an impact on the smart queue settings of the {string} account');
        //will open the smart queue page on that browser
        await actionObj.openSmartQueuePage(driver, screenshotPath);
        await driver.sleep(2000);

        //will compare the actual and expected smart queue settings of the currently logged-in user
        try {
            fieldName = 'AutoDial';
            await actionObj.compareAutoDialData(driver, screenshotPath, expectedAutoDialFieldData);
            fieldName = 'AutoDialTimer';
            if (expectedAutoDialFieldData == 'enable') {
                await actionObj.compareAutoDialTimerData(driver, screenshotPath, expectedTimerFieldData);
            }
            fieldName = 'ManageRingTime';
            await actionObj.compareRingTimeData(driver, screenshotPath, expectedRingTimeFieldData);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'FieldData_Updated.png');
            assert.fail('After updating smart queue settings from the one account, it is creating an impact on another account. This \'' + fieldName + '\' field data get changed ---> \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'FieldData_Updated.png\'.');
        }
        console.log('The \'user wise smart queue settings\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('logout from the Twilio Salesmate link', async () =>{
    try {
        await commonActionObj.clickOnSignOut();
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
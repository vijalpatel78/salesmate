const { Given,When,Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openSequencesPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/sales_automation/sequences/screenshots/';
const sequenceElementsObj = require('../common/sequenceElements');
const commonElementsObj = require('../../../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');

let executeOnWeekdaysState = 'no', enableThreadingState = 'no', deliveryTimeZoneData = 'no',contactTimeZoneState = 'no';
let unSubscribeState = 'no',contactCompletesSequenceState = 'no', accessData = 'no', throttlingState = 'no';
let contactAddingData = 'no', multipleSequencesData = 'no', officeEmailState = 'no', emailReplyState = 'no';
let emailCommunicationState = 'no', stopsOnTextState = 'no', stopsOnDealCloseState = 'no', statusData = 'no';
let contactSequenceData = 'no', emailBouncesData = 'no', contactUnsubscribesData = 'no', activityCompletedData = 'no';
let sequenceEmailData = 'no', contactMarkData = 'no', amountOfTimeData = 'no', durationData = 'no', timeUnitData = 'no';
let timeLimitData = 'no', autoResumeState = 'no', executeOnWeekdays = 'no', enableThreading = 'no';
let deliveryTimeZone = 'no', contactTimeZone = 'no', unSubscribe = 'no', contactCompletesSequenceData = 'no', access = 'no';
let throttling = 'no', contactAdding = 'no', multipleSequences = 'no', officeEmail = 'no', emailReply = 'no';
let emailCommunication = 'no', stopsOnText = 'no', stopsOnDealClose = 'no', status = 'no', contactSequence = 'no';
let emailBounces = 'no', contactUnsubscribes = 'no', emailDelivered = 'no', activityCompleted = 'no';
let sequenceEmail = 'no', contactMark = 'no', amountOfTime = 'no'

Given('the {string} is on sequences page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/sequence/setting')){
        console.log('The sequences page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open sequences page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on sequences page');
        //will open the sequences page
        await openSequencesPageObj.openSequencesPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open contact page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on sequences page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on sequences page');
        //will open the sequences page
        await openSequencesPageObj.openSequencesPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the sequences page
        await openSequencesPageObj.openSequencesPage(driver, screenshotPath);
    }
});

//-----------------------Case 1: Verify, the user is able to update the sequence settings----------------------------------------

When('the user is able to update the sequence settings',async function(dataTable) {
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'execute on weekdays') {
                executeOnWeekdaysState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (executeOnWeekdaysState == 'enable' || executeOnWeekdaysState == 'disable') {
                    //will find 'Execute On Weekdays Checkbox' Toggle Button
                    const executeOnWeekdaysToggle = await sequenceElementsObj.findExecuteOnWeekdaysToggle(driver);
                    await driver.executeScript("arguments[0].focus();", executeOnWeekdaysToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Execute On Weekdays Checkbox'
                    const currentState = await executeOnWeekdaysToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != executeOnWeekdaysState) {
                        await driver.executeScript("arguments[0].click();", executeOnWeekdaysToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'enable threading') {
                enableThreadingState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (enableThreadingState == 'enable' || enableThreadingState == 'disable') {
                    //will find 'Enable Threading Checkbox' Toggle Button
                    const enableThreadingToggle = await sequenceElementsObj.findEnableThreadingToggle(driver);
                    await driver.executeScript("arguments[0].focus();", enableThreadingToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Enable Threading Checkbox'
                    const currentState = await enableThreadingToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Enable Threading Checkbox'
                    if (currentState != enableThreadingState) {
                        await driver.executeScript("arguments[0].click();", enableThreadingToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'delivery timezone') {
                deliveryTimeZoneData = dataTable.rawTable[i][1];

                //will check that the data for the delivery timezone dropdown field is given or not
                if (deliveryTimeZoneData == '') {
                    await assert.fail('Due to the blank value is provided for the delivery timezone dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Delivery TimeZone' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'email_delivery_timezone', deliveryTimeZoneData, 'yes');
            } else if (fieldName == 'contact timezone') {
                contactTimeZoneState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (contactTimeZoneState == 'enable' || contactTimeZoneState == 'disable') {
                    //will find 'Contact TimeZone Checkbox' Toggle Button
                    const contactTimeZoneToggle = await sequenceElementsObj.findContactTimeZoneToggle(driver);
                    await driver.executeScript("arguments[0].focus();", contactTimeZoneToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Contact TimeZone Checkbox'
                    const currentState = await contactTimeZoneToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Contact TimeZone Checkbox'
                    if (currentState != contactTimeZoneState) {
                        await driver.executeScript("arguments[0].click();", contactTimeZoneToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the contact timezone checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'unsubscribe') {
                unSubscribeState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (unSubscribeState == 'enable' || unSubscribeState == 'disable') {
                    //will find 'Unsubscribe Checkbox' Toggle Button
                    const unSubscribeToggle = await sequenceElementsObj.findUnSubscribeToggle(driver);
                    await driver.executeScript("arguments[0].focus();", unSubscribeToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Unsubscribe Checkbox'
                    const currentState = await unSubscribeToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Unsubscribe Checkbox'
                    if (currentState != unSubscribeState) {
                        await driver.executeScript("arguments[0].click();", unSubscribeToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the unsubscribe checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'contact completes sequence') {
                contactCompletesSequenceState = dataTable.rawTable[i][1];

                //will check that the data for the contact completes sequence dropdown field is given or not
                if (contactCompletesSequenceState == '') {
                    await assert.fail('Due to the blank value is provided for the contact completes sequence dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Contact Completes Sequence' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'complete_with_no_reply_after_last_stage', contactCompletesSequenceState, 'no');
            } else if (fieldName == 'access') {
                accessData = dataTable.rawTable[i][1];

                //will check that the data for the access dropdown field is given or not
                if (accessData == '') {
                    await assert.fail('Due to the blank value is provided for the access dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Access' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'access', accessData, 'no');
            } else if (fieldName == 'throttling') {
                throttlingState = dataTable.rawTable[i][1];

                //will check that the data for the throttling dropdown field is given or not
                if (throttlingState == '') {
                    await assert.fail('Due to the blank value is provided for the throttling dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Throttling' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'is_throttling_enabled', throttlingState, 'no');
            } else if (fieldName == 'contact adding') {
                contactAddingData = dataTable.rawTable[i][1];

                //will check that the data for the contact adding dropdown field is given or not
                if (contactAddingData == '') {
                    await assert.fail('Due to the blank value is provided for the contact adding dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Contact Adding' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'enroll_frequency', contactAddingData, 'no');
            } else if (fieldName == 'multiple sequences') {
                multipleSequencesData = dataTable.rawTable[i][1];

                //will check that the data for the multiple sequences dropdown field is given or not
                if (multipleSequencesData == '') {
                    await assert.fail('Due to the blank value is provided for the multiple sequences dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Multiple Sequences' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'can_enroll_in_multiple_sequences', multipleSequencesData, 'no');
            } else if (fieldName == 'office email') {
                officeEmailState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (officeEmailState == 'enable' || officeEmailState == 'disable') {
                    //will find 'Office Email Checkbox' Toggle Button
                    const officeEmailToggle = await sequenceElementsObj.findOfficeEmailToggle(driver);
                    await driver.executeScript("arguments[0].focus();", officeEmailToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Office Email Checkbox'
                    const currentState = await officeEmailToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Office Email Checkbox'
                    if (currentState != officeEmailState) {
                        await driver.executeScript("arguments[0].click();", officeEmailToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the office email checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'email reply') {
                emailReplyState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (emailReplyState == 'enable' || emailReplyState == 'disable') {
                    //will find 'Email Reply Checkbox' Toggle Button
                    const emailReplyToggle = await sequenceElementsObj.findEmailReplyToggle(driver);
                    await driver.executeScript("arguments[0].focus();", emailReplyToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Email Reply Checkbox'
                    const currentState = await emailReplyToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Email Reply Checkbox'
                    if (currentState != emailReplyState) {
                        await driver.executeScript("arguments[0].click();", emailReplyToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the email reply checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'email communication') {
                emailCommunicationState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (emailCommunicationState == 'enable' || emailCommunicationState == 'disable') {
                    //will find 'Email Communication Checkbox' Toggle Button
                    const emailCommunicationToggle = await sequenceElementsObj.findEmailCommunicationToggle(driver);
                    await driver.executeScript("arguments[0].focus();", emailCommunicationToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Email Communication Checkbox'
                    const currentState = await emailCommunicationToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Email Communication Checkbox'
                    if (currentState != emailCommunicationState) {
                        await driver.executeScript("arguments[0].click();", emailCommunicationToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the email communication checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'stops on text') {
                stopsOnTextState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (stopsOnTextState == 'enable' || stopsOnTextState == 'disable') {
                    //will find 'Stops On Text Checkbox' Toggle Button
                    const stopsOnTextToggle = await sequenceElementsObj.findStopsOnTextToggle(driver);
                    await driver.executeScript("arguments[0].focus();", stopsOnTextToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Stops On Text Checkbox'
                    const currentState = await stopsOnTextToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Stops On Text Checkbox'
                    if (currentState != stopsOnTextState) {
                        await driver.executeScript("arguments[0].click();", stopsOnTextToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the stops on text checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'stops on deal close') {
                stopsOnDealCloseState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (stopsOnDealCloseState == 'enable' || stopsOnDealCloseState == 'disable') {
                    //will find 'Stops On Deal Close Checkbox' Toggle Button
                    const stopsOnDealCloseToggle = await sequenceElementsObj.findStopsOnDealCloseToggle(driver);
                    await driver.executeScript("arguments[0].focus();", stopsOnDealCloseToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Stops On Deal Close Checkbox'
                    const currentState = await stopsOnDealCloseToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Stops On Deal Close Checkbox'
                    if (currentState != stopsOnDealCloseState) {
                        await driver.executeScript("arguments[0].click();", stopsOnDealCloseToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the stops on deal close checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'status') {
                statusData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Status' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
                await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
                await driver.sleep(1000);
            } else if (fieldName == 'contact sequence') {
                contactSequenceData = dataTable.rawTable[i][1];

                //will find 'Contact Sequence' field and pass the new data
                const contactSequenceField = await sequenceElementsObj.findAssignTags(driver, 1);
                await clearFieldDataObj.clearFieldData(contactSequenceField);
                await contactSequenceField.sendKeys(contactSequenceData);
                await driver.sleep(500);
            } else if (fieldName == 'email bounces') {
                emailBouncesData = dataTable.rawTable[i][1];

                //will find 'Email Bounces' field and pass the new data
                const emailBouncesField = await sequenceElementsObj.findAssignTags(driver, 2);
                await clearFieldDataObj.clearFieldData(emailBouncesField);
                await emailBouncesField.sendKeys(emailBouncesData);
                await driver.sleep(500);
            } else if (fieldName == 'contact unsubscribes') {
                contactUnsubscribesData = dataTable.rawTable[i][1];

                //will find 'Contact Unsubscribes' field and pass the new data
                const contactUnsubscribesField = await sequenceElementsObj.findAssignTags(driver, 3);
                await clearFieldDataObj.clearFieldData(contactUnsubscribesField);
                await contactUnsubscribesField.sendKeys(contactUnsubscribesData);
                await driver.sleep(500);
            } else if (fieldName == 'activity completed') {
                activityCompletedData = dataTable.rawTable[i][1];

                //will find 'Activity Completed' field and pass the new data
                const activityCompletedField = await sequenceElementsObj.findAssignTags(driver, 4);
                await clearFieldDataObj.clearFieldData(activityCompletedField);
                await activityCompletedField.sendKeys(activityCompletedData);
                await driver.sleep(500);
            } else if (fieldName == 'sequence email') {
                sequenceEmailData = dataTable.rawTable[i][1];

                //will find 'Sequence Email' field and pass the new data
                const sequenceEmailField = await sequenceElementsObj.findAssignTags(driver, 5);
                await clearFieldDataObj.clearFieldData(sequenceEmailField);
                await sequenceEmailField.sendKeys(sequenceEmailData);
                await driver.sleep(500);
            } else if (fieldName == 'contact mark') {
                contactMarkData = dataTable.rawTable[i][1];

                //will find 'Contact Mark' field and pass the new data
                const contactMarkField = await sequenceElementsObj.findAssignTags(driver, 6);
                await clearFieldDataObj.clearFieldData(contactMarkField);
                await contactMarkField.sendKeys(contactMarkData);
                await driver.sleep(500);
            } else if (fieldName == 'amount of time') {
                amountOfTimeData = dataTable.rawTable[i][1];

                //will find 'Amount Of Time' field and pass the new data
                const amountOfTimeField = await sequenceElementsObj.findAssignTags(driver, 7);
                await clearFieldDataObj.clearFieldData(amountOfTimeField);
                await amountOfTimeField.sendKeys(amountOfTimeData);
                await driver.sleep(500);
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dropdownLabelValue_Invalid.png');
        await assert.fail(err);
    }
});

Then('click on update button and verify {string} message',async function(expectedNotification) {
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 0 }, 0);");
    await driver.sleep(2000);
    //get values of 'Sequences' page before navigation
    const executeOnWeekdaysBeforeNavigation = await driver.findElement(By.id('is_execute_on_weekdays_only')).getAttribute('value');
    const threadingBeforeNavigation = await driver.findElement(By.id('is_threading_enabled')).getAttribute('value');
    const contactTimeZoneDropdown = await commonElementsObj.findDropdown(driver, screenshotPath, 'email_delivery_timezone');
    const contactTimeZoneBeforeNavigation = await contactTimeZoneDropdown.getText();
    const unSubscribeBeforeNavigation = await driver.findElement(By.id('add_unsubscribe_link')).getAttribute('value');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
    await driver.sleep(2000);
    const contactCompleteSequence = await commonElementsObj.findDropdown(driver, screenshotPath, 'complete_with_no_reply_after_last_stage');
    const contactCompleteSequenceBeforeNavigation = await contactCompleteSequence.getText();
    const accessDropdown = await commonElementsObj.findDropdown(driver,screenshotPath,'access');
    const accessBeforeNavigation = await accessDropdown.getText();
    const throttlingDropdown = await commonElementsObj.findDropdown(driver,screenshotPath,'is_throttling_enabled');
    const throttlingBeforeNavigation = await throttlingDropdown.getText();
    const contactAdding = await commonElementsObj.findDropdown(driver,screenshotPath,'enroll_frequency');
    const contactAddingBeforeNavigation = await contactAdding.getText();
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1200 }, 0);");
    await driver.sleep(2000);
    const multipleSequence = await commonElementsObj.findDropdown(driver,screenshotPath,'can_enroll_in_multiple_sequences');
    const multipleSequenceBeforeNavigation = await multipleSequence.getText();
    const officeEmailBeforeNavigation = await driver.findElement(By.id('pause_on_out_of_office')).getAttribute('value');
    const autoResumeEmailBeforeNavigation = await driver.findElement(By.id('auto_resume_on_out_of_office')).getAttribute('value');
    const emailReplyBeforeNavigation = await driver.findElement(By.id('exit_on_sequence_mail_reply')).getAttribute('value');
    const emailCommunicationBeforeNavigation = await driver.findElement(By.id('exit_on_sequence_mail_reply')).getAttribute('value');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1800 }, 0);");
    await driver.sleep(2000);
    const stopsOnTextBeforeNavigation = await driver.findElement(By.id('exit_on_text_receive')).getAttribute('value');
    const stopsOnDealCloseBeforeNavigation = await driver.findElement(By.id('exit_on_deal_close')).getAttribute('value');
    const contactSequenceBeforeNavigation = await driver.findElement(By.xpath('//div[5]/div[1]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 2500 }, 0);");
    await driver.sleep(2000);
    const emailBouncesBeforeNavigation = await driver.findElement(By.xpath('//div[5]/div[2]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    console.log(emailBouncesBeforeNavigation);
    const contactUnsubscribesBeforeNavigation = await driver.findElement(By.xpath('//div[5]/div[3]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const activityCompletedBeforeNavigation = await driver.findElement(By.xpath('//div[5]/div[4]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const sequenceEmailBeforeNavigation = await driver.findElement(By.xpath('//div[5]/div[5]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const contactMarkBeforeNavigation = await driver.findElement(By.xpath('//div[5]/div[6]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const amountOfTimeBeforeNavigation = await driver.findElement(By.xpath('//div[5]/div[7]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');

    //click on 'Update' button
    await sequenceElementsObj.findUpdateButton(driver);
    await driver.sleep(2000);
    const notificationElement = await driver.wait(until.elementLocated(By.xpath('//span[@class="noty_text"]')), 10000)
    const actualNotification = await notificationElement.getText();
    strictEqual(actualNotification, expectedNotification);
    await driver.sleep(5000);
    //page navigation and come back to sequences page
    await pageNavigationObj.comeBackToSequencesPage(driver,screenshotPath);
    await driver.sleep(1000);
    //get values of 'Sequences' page after navigation
    const executeOnWeekdaysAfterNavigation = await driver.findElement(By.id('is_execute_on_weekdays_only')).getAttribute('value');
    const threadingAfterNavigation = await driver.findElement(By.id('is_threading_enabled')).getAttribute('value');
    const contactTimeZoneDropdownValue = await commonElementsObj.findDropdown(driver, screenshotPath, 'email_delivery_timezone');
    const contactTimeZoneAfterNavigation = await contactTimeZoneDropdownValue.getText();
    const unSubscribeAfterNavigation = await driver.findElement(By.id('add_unsubscribe_link')).getAttribute('value');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
    await driver.sleep(2000);
    const contactCompleteSequenceValue = await commonElementsObj.findDropdown(driver, screenshotPath, 'complete_with_no_reply_after_last_stage');
    const contactCompleteSequenceAfterNavigation = await contactCompleteSequenceValue.getText();
    const accessDropdownValue = await commonElementsObj.findDropdown(driver,screenshotPath,'access');
    const accessAfterNavigation = await accessDropdownValue.getText();
    const throttlingDropdownValue = await commonElementsObj.findDropdown(driver,screenshotPath,'is_throttling_enabled');
    const throttlingAfterNavigation = await throttlingDropdownValue.getText();
    const contactAddingValue = await commonElementsObj.findDropdown(driver,screenshotPath,'enroll_frequency');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1200 }, 0);");
    await driver.sleep(2000);
    const contactAddingAfterNavigation = await contactAddingValue.getText();
    const multipleSequenceValue = await commonElementsObj.findDropdown(driver,screenshotPath,'can_enroll_in_multiple_sequences');
    const multipleSequenceAfterNavigation = await multipleSequenceValue.getText();
    const officeEmailAfterNavigation = await driver.findElement(By.id('pause_on_out_of_office')).getAttribute('value');
    const autoResumeEmailAfterNavigation = await driver.findElement(By.id('auto_resume_on_out_of_office')).getAttribute('value');
    const emailReplyAfterNavigation = await driver.findElement(By.id('exit_on_sequence_mail_reply')).getAttribute('value');
    const emailCommunicationAfterNavigation = await driver.findElement(By.id('exit_on_sequence_mail_reply')).getAttribute('value');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1800 }, 0);");
    await driver.sleep(2000);
    const stopsOnTextAfterNavigation = await driver.findElement(By.id('exit_on_text_receive')).getAttribute('value');
    const stopsOnDealCloseAfterNavigation = await driver.findElement(By.id('exit_on_deal_close')).getAttribute('value');
    const contactSequenceAfterNavigation = await driver.findElement(By.xpath('//div[5]/div[1]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 2500 }, 0);");
    await driver.sleep(2000);
    const emailBouncesAfterNavigation = await driver.findElement(By.xpath('//div[5]/div[2]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const contactUnsubscribesAfterNavigation = await driver.findElement(By.xpath('//div[5]/div[3]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const activityCompletedAfterNavigation = await driver.findElement(By.xpath('//div[5]/div[4]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    const sequenceEmailAfterNavigation = await driver.findElement(By.xpath('//div[5]/div[5]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const contactMarkAfterNavigation = await driver.findElement(By.xpath('//div[5]/div[6]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    const amountOfTimeAfterNavigation = await driver.findElement(By.xpath('//div[5]/div[7]/div[@class="row"]//sm-tag/sm-element//ro-tag/div/input')).getAttribute('value');
    try {
        strictEqual(executeOnWeekdaysBeforeNavigation, executeOnWeekdaysAfterNavigation);
        strictEqual(threadingBeforeNavigation, threadingAfterNavigation);
        strictEqual(contactTimeZoneBeforeNavigation, contactTimeZoneAfterNavigation);
        strictEqual(unSubscribeBeforeNavigation, unSubscribeAfterNavigation);
        strictEqual(contactCompleteSequenceBeforeNavigation, contactCompleteSequenceAfterNavigation);
        strictEqual(accessBeforeNavigation, accessAfterNavigation);
        strictEqual(throttlingBeforeNavigation, throttlingAfterNavigation);
        strictEqual(contactAddingBeforeNavigation, contactAddingAfterNavigation);
        strictEqual(multipleSequenceBeforeNavigation, multipleSequenceAfterNavigation);
        strictEqual(officeEmailBeforeNavigation, officeEmailAfterNavigation);
        strictEqual(autoResumeEmailBeforeNavigation,autoResumeEmailAfterNavigation);
        strictEqual(emailReplyBeforeNavigation, emailReplyAfterNavigation);
        strictEqual(emailCommunicationBeforeNavigation, emailCommunicationAfterNavigation);
        strictEqual(stopsOnTextBeforeNavigation, stopsOnTextAfterNavigation);
        strictEqual(stopsOnDealCloseBeforeNavigation, stopsOnDealCloseAfterNavigation);
        strictEqual(contactSequenceBeforeNavigation, contactSequenceAfterNavigation);
        strictEqual(emailBouncesBeforeNavigation, emailBouncesAfterNavigation);
        strictEqual(contactUnsubscribesBeforeNavigation, contactUnsubscribesAfterNavigation);
        strictEqual(activityCompletedBeforeNavigation, activityCompletedAfterNavigation);
        strictEqual(sequenceEmailBeforeNavigation, sequenceEmailAfterNavigation);
        strictEqual(contactMarkBeforeNavigation, contactMarkAfterNavigation);
        strictEqual(amountOfTimeBeforeNavigation, amountOfTimeAfterNavigation);
        console.log("As sequences settings page values before and after navigation remains same,so test case has been passed");
    } catch(err) {
        await assert.fail("As sequences settings page values before and after navigation does not remain same,so test case has been aborted");
    }
});

When('the user is able to update the sequence settings with following data:',async function(dataTable) {
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'execute on weekdays') {
                executeOnWeekdays = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (executeOnWeekdays == 'enable' || executeOnWeekdays == 'disable') {
                    //will find 'Execute On Weekdays Checkbox' Toggle Button
                    const executeOnWeekdaysToggle = await sequenceElementsObj.findExecuteOnWeekdaysToggle(driver);
                    await driver.executeScript("arguments[0].focus();", executeOnWeekdaysToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Execute On Weekdays Checkbox'
                    const currentState = await executeOnWeekdaysToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != executeOnWeekdays) {
                        await driver.executeScript("arguments[0].click();", executeOnWeekdaysToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'enable threading') {
                enableThreading = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (enableThreading == 'enable' || enableThreading == 'disable') {
                    //will find 'Enable Threading Checkbox' Toggle Button
                    const enableThreadingToggle = await sequenceElementsObj.findEnableThreadingToggle(driver);
                    await driver.executeScript("arguments[0].focus();", enableThreadingToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Enable Threading Checkbox'
                    const currentState = await enableThreadingToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Enable Threading Checkbox'
                    if (currentState != enableThreading) {
                        await driver.executeScript("arguments[0].click();", enableThreadingToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'delivery timezone') {
                deliveryTimeZone = dataTable.rawTable[i][1];

                //will check that the data for the delivery timezone dropdown field is given or not
                if (deliveryTimeZone == '') {
                    await assert.fail('Due to the blank value is provided for the delivery timezone dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Delivery TimeZone' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath("//div[1]/div[3]/div[@class='row']/div[@class='col-md-10']//span[@role='combobox']/span[@role='textbox']")).click();
                await driver.findElement(By.xpath(`//li[text()='${deliveryTimeZone}']`)).click();
            } else if (fieldName == 'contact timezone') {
                contactTimeZone = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (contactTimeZone == 'enable' || contactTimeZone == 'disable') {
                    //will find 'Contact TimeZone Checkbox' Toggle Button
                    const contactTimeZoneToggle = await sequenceElementsObj.findContactTimeZoneToggle(driver);
                    await driver.executeScript("arguments[0].focus();", contactTimeZoneToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Contact TimeZone Checkbox'
                    const currentState = await contactTimeZoneToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Contact TimeZone Checkbox'
                    if (currentState != contactTimeZone) {
                        await driver.executeScript("arguments[0].click();", contactTimeZoneToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the contact timezone checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'unsubscribe') {
                unSubscribe = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (unSubscribe == 'enable' || unSubscribe == 'disable') {
                    //will find 'Unsubscribe Checkbox' Toggle Button
                    const unSubscribeToggle = await sequenceElementsObj.findUnSubscribeToggle(driver);
                    await driver.executeScript("arguments[0].focus();", unSubscribeToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Unsubscribe Checkbox'
                    const currentState = await unSubscribeToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Unsubscribe Checkbox'
                    if (currentState != unSubscribe) {
                        await driver.executeScript("arguments[0].click();", unSubscribeToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the unsubscribe checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'contact completes sequence') {
                contactCompletesSequenceData = dataTable.rawTable[i][1];

                //will check that the data for the contact completes sequence dropdown field is given or not
                if (contactCompletesSequenceData == '') {
                    await assert.fail('Due to the blank value is provided for the contact completes sequence dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Contact Completes Sequence' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'complete_with_no_reply_after_last_stage', contactCompletesSequenceData, 'no');
            } else if (fieldName == 'access') {
                access = dataTable.rawTable[i][1];

                //will check that the data for the access dropdown field is given or not
                if (access == '') {
                    await assert.fail('Due to the blank value is provided for the access dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Access' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'access', access, 'no');
            } else if (fieldName == 'throttling') {
                throttling = dataTable.rawTable[i][1];

                //will check that the data for the throttling dropdown field is given or not
                if (throttling == '') {
                    await assert.fail('Due to the blank value is provided for the throttling dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Throttling' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'is_throttling_enabled', throttling, 'no');
            } else if (fieldName == 'contact adding') {
                contactAdding = dataTable.rawTable[i][1];

                //will check that the data for the contact adding dropdown field is given or not
                if (contactAdding == '') {
                    await assert.fail('Due to the blank value is provided for the contact adding dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Contact Adding' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'enroll_frequency', contactAdding, 'no');
            } else if (fieldName == 'multiple sequences') {
                multipleSequences = dataTable.rawTable[i][1];

                //will check that the data for the multiple sequences dropdown field is given or not
                if (multipleSequences == '') {
                    await assert.fail('Due to the blank value is provided for the multiple sequences dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Multiple Sequences' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'can_enroll_in_multiple_sequences', multipleSequences, 'no');
            } else if (fieldName == 'office email') {
                officeEmail = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (officeEmail == 'enable' || officeEmail == 'disable') {
                    //will find 'Office Email Checkbox' Toggle Button
                    const officeEmailToggle = await sequenceElementsObj.findOfficeEmailToggle(driver);
                    await driver.executeScript("arguments[0].focus();", officeEmailToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Office Email Checkbox'
                    const currentState = await officeEmailToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Office Email Checkbox'
                    if (currentState != officeEmail) {
                        await driver.executeScript("arguments[0].click();", officeEmailToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the office email checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'email reply') {
                emailReply = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (emailReply == 'enable' || emailReply == 'disable') {
                    //will find 'Email Reply Checkbox' Toggle Button
                    const emailReplyToggle = await sequenceElementsObj.findEmailReplyToggle(driver);
                    await driver.executeScript("arguments[0].focus();", emailReplyToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Email Reply Checkbox'
                    const currentState = await emailReplyToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Email Reply Checkbox'
                    if (currentState != emailReply) {
                        await driver.executeScript("arguments[0].click();", emailReplyToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the email reply checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'email communication') {
                emailCommunication = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (emailCommunication == 'enable' || emailCommunication == 'disable') {
                    //will find 'Email Communication Checkbox' Toggle Button
                    const emailCommunicationToggle = await sequenceElementsObj.findEmailCommunicationToggle(driver);
                    await driver.executeScript("arguments[0].focus();", emailCommunicationToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Email Communication Checkbox'
                    const currentState = await emailCommunicationToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Email Communication Checkbox'
                    if (currentState != emailCommunication) {
                        await driver.executeScript("arguments[0].click();", emailCommunicationToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the email communication checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'stops on text') {
                stopsOnText = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (stopsOnText == 'enable' || stopsOnText == 'disable') {
                    //will find 'Stops On Text Checkbox' Toggle Button
                    const stopsOnTextToggle = await sequenceElementsObj.findStopsOnTextToggle(driver);
                    await driver.executeScript("arguments[0].focus();", stopsOnTextToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Stops On Text Checkbox'
                    const currentState = await stopsOnTextToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Stops On Text Checkbox'
                    if (currentState != stopsOnText) {
                        await driver.executeScript("arguments[0].click();", stopsOnTextToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the stops on text checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'stops on deal close') {
                stopsOnDealClose = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (stopsOnDealClose == 'enable' || stopsOnDealClose == 'disable') {
                    //will find 'Stops On Deal Close Checkbox' Toggle Button
                    const stopsOnDealCloseToggle = await sequenceElementsObj.findStopsOnDealCloseToggle(driver);
                    await driver.executeScript("arguments[0].focus();", stopsOnDealCloseToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Stops On Deal Close Checkbox'
                    const currentState = await stopsOnDealCloseToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Stops On Deal Close Checkbox'
                    if (currentState != stopsOnDealClose) {
                        await driver.executeScript("arguments[0].click();", stopsOnDealCloseToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the stops on deal close checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'status') {
                status = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Status' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
                await driver.findElement(By.xpath(`//li[text()="${status}"]`)).click();
                await driver.findElement(By.xpath('//h6[text()="An email bounces"]')).click();
            } else if (fieldName == 'contact sequence') {
                contactSequence = dataTable.rawTable[i][1];

                //will find 'Contact Sequence' field and pass the new data
                const contactSequenceField = await sequenceElementsObj.findAssignTags(driver, 1);
                await clearFieldDataObj.clearFieldData(contactSequenceField);
                await contactSequenceField.sendKeys(contactSequence);
                await driver.sleep(2000);
                const contactSequencesClick = await sequenceElementsObj.findAssignTags(driver, 1);
                await contactSequencesClick.click();
            } else if (fieldName == 'email bounces') {
                emailBounces = dataTable.rawTable[i][1];

                //will find 'Email Bounces' field and pass the new data
                const emailBouncesField = await sequenceElementsObj.findAssignTags(driver, 2);
                await clearFieldDataObj.clearFieldData(emailBouncesField);
                await emailBouncesField.sendKeys(emailBounces);
                await driver.sleep(2000);
                const emailBouncesClick = await sequenceElementsObj.findAssignTags(driver, 2);
                await emailBouncesClick.click();
            } else if (fieldName == 'contact unsubscribes') {
                contactUnsubscribes = dataTable.rawTable[i][1];

                //will find 'Contact Unsubscribes' field and pass the new data
                const contactUnsubscribesField = await sequenceElementsObj.findAssignTags(driver, 3);
                await clearFieldDataObj.clearFieldData(contactUnsubscribesField);
                await contactUnsubscribesField.sendKeys(contactUnsubscribes);
                await driver.sleep(2000);
                const contactUnsubscribesClick = await sequenceElementsObj.findAssignTags(driver, 3);
                await contactUnsubscribesClick.click();
            } else if (fieldName == 'email') {
                emailDelivered = dataTable.rawTable[i][1];

                //will find 'Email Delivered' field and pass the new data
                const emailDeliveredField = await sequenceElementsObj.findAssignTags(driver, 4);
                await clearFieldDataObj.clearFieldData(emailDeliveredField);
                await emailDeliveredField.sendKeys(emailDelivered);
                await driver.sleep(2000);
                const emailDeliveredClick = await sequenceElementsObj.findAssignTags(driver, 4);
                await emailDeliveredClick.click();
            } else if (fieldName == 'activity') {
                activityCompleted = dataTable.rawTable[i][1];

                //will find 'Activity Completed' field and pass the new data
                const activityCompletedField = await sequenceElementsObj.findAssignTags(driver, 4);
                await clearFieldDataObj.clearFieldData(activityCompletedField);
                await activityCompletedField.sendKeys(activityCompleted);
                await driver.sleep(2000);
                const activityCompletedClick = await sequenceElementsObj.findAssignTags(driver, 4);
                await activityCompletedClick.click();
            } else if (fieldName == 'sequence email') {
                sequenceEmail = dataTable.rawTable[i][1];

                //will find 'Sequence Email' field and pass the new data
                const sequenceEmailField = await sequenceElementsObj.findAssignTags(driver, 5);
                await clearFieldDataObj.clearFieldData(sequenceEmailField);
                await sequenceEmailField.sendKeys(sequenceEmail);
                await driver.sleep(2000);
                const sequenceEmailClick = await sequenceElementsObj.findAssignTags(driver, 5);
                await sequenceEmailClick.click();
            } else if (fieldName == 'contact mark') {
                contactMark = dataTable.rawTable[i][1];

                //will find 'Contact Mark' field and pass the new data
                const contactMarkField = await sequenceElementsObj.findAssignTags(driver, 6);
                await clearFieldDataObj.clearFieldData(contactMarkField);
                await contactMarkField.sendKeys(contactMark);
                await driver.sleep(2000);
                const contactMarkClick = await sequenceElementsObj.findAssignTags(driver, 6);
                await contactMarkClick.click();
            } else if (fieldName == 'amount of time') {
                amountOfTime = dataTable.rawTable[i][1];

                //will find 'Amount Of Time' field and pass the new data
                const amountOfTimeField = await sequenceElementsObj.findAssignTags(driver, 7);
                await clearFieldDataObj.clearFieldData(amountOfTimeField);
                await amountOfTimeField.sendKeys(amountOfTime);
                await driver.sleep(2000);
                const amountOfTimeClick = await sequenceElementsObj.findAssignTags(driver, 7);
                await amountOfTimeClick.click();
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('remove added tags of sequence settings',async function() {
    try {
        await driver.sleep(3000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1800 }, 0);");
        await driver.sleep(2000);
        await sequenceElementsObj.findStatusCloseIcon(driver);
        await sequenceElementsObj.findTagsCloseIcon(driver, 1);
        await sequenceElementsObj.findTagsCloseIcon(driver, 2);
        await sequenceElementsObj.findTagsCloseIcon(driver, 3);
        await sequenceElementsObj.findTagsCloseIcon(driver, 4);
        await sequenceElementsObj.findTagsCloseIcon(driver, 4);
        await sequenceElementsObj.findTagsCloseIcon(driver, 5);
        await sequenceElementsObj.findTagsCloseIcon(driver, 6);
        await sequenceElementsObj.findTagsCloseIcon(driver, 7);
        await driver.sleep(1000);
        await sequenceElementsObj.findUpdateButton(driver);
        await driver.sleep(3000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 2: Verify, the user is able to enable the 'Contact completes sequence, with no reply after in x days' option---------------------------------------

When('the user is able to enable the "Contact completes sequence, with no reply after in x days" option',async function(dataTable) {
    try {
        await driver.sleep(3000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'contact completes sequence') {
                contactCompletesSequenceState = dataTable.rawTable[i][1];

                //will check that the data for the contact completes sequence dropdown field is given or not
                if (contactCompletesSequenceState == '') {
                    await assert.fail('Due to the blank value is provided for the contact completes sequence dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Contact Completes Sequence' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'complete_with_no_reply_after_last_stage', contactCompletesSequenceState, 'no');
            } else if (fieldName == 'duration') {
                durationData = dataTable.rawTable[i][1];

                //will check that the data for the contact completes sequence dropdown field is given or not
                if (durationData == '') {
                    await assert.fail('Due to the blank value is provided for the duration dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Duration' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'days_to_wait_after_last_stage', durationData, 'yes');
            } else if (fieldName == 'time unit') {
                timeUnitData = dataTable.rawTable[i][1];

                //will check that the data for the time unit dropdown field is given or not
                if (timeUnitData == '') {
                    await assert.fail('Due to the blank value is provided for the contact completes sequence dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Time Unit' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'waiting_days_type_after_last_stage', timeUnitData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on update button and verify {string}',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        const contactCompleteSequence = await commonElementsObj.findDropdown(driver,screenshotPath,'complete_with_no_reply_after_last_stage');
        const contactCompleteSequenceBeforeNavigation = await contactCompleteSequence.getText();
        const duration = await commonElementsObj.findDropdown(driver,screenshotPath,'days_to_wait_after_last_stage');
        const durationBeforeNavigation = await duration.getText();
        const timeUnit = await commonElementsObj.findDropdown(driver,screenshotPath,'waiting_days_type_after_last_stage');
        const timeUnitBeforeNavigation = await timeUnit.getText();
        await sequenceElementsObj.findUpdateButton(driver);
        await driver.sleep(1000);
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(5000);
        await pageNavigationObj.comeBackToSequencesPage(driver,screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);
        const contactCompleteSequenceValue = await commonElementsObj.findDropdown(driver,screenshotPath,'complete_with_no_reply_after_last_stage');
        const contactCompleteSequenceAfterNavigation = await contactCompleteSequenceValue.getText();
        const durationValue = await commonElementsObj.findDropdown(driver,screenshotPath,'days_to_wait_after_last_stage');
        const durationAfterNavigation = await durationValue.getText();
        const timeUnitValue = await commonElementsObj.findDropdown(driver,screenshotPath,'waiting_days_type_after_last_stage');
        const timeUnitAfterNavigation = await timeUnitValue.getText();
        try {
            strictEqual(contactCompleteSequenceBeforeNavigation,contactCompleteSequenceAfterNavigation);
            strictEqual(durationBeforeNavigation,durationAfterNavigation);
            strictEqual(timeUnitBeforeNavigation,timeUnitAfterNavigation);
            console.log("As contact complete sequences before and after navigation remains same,so test case has been passed");
        } catch (err) {
            await assert.fail("As contact complete sequences before and after navigation does not remains same,so test case has been aborted");
        }
    }  catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------Case 3: Verify, the user is able to enable the 'Throttling' option-------------------------------------

When('the user is able to enable the "Throttling" option',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'throttling') {
                throttlingState = dataTable.rawTable[i][1];

                //will check that the data for the throttling dropdown field is given or not
                if (throttlingState == '') {
                    await assert.fail('Due to the blank value is provided for the throttling dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Throttling' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'is_throttling_enabled', throttlingState, 'no');
            } else if (fieldName == 'time limit') {
                timeLimitData = dataTable.rawTable[i][1];

                //will check that the data for the time limit dropdown field is given or not
                if (timeLimitData == '') {
                    await assert.fail('Due to the blank value is provided for the time limit dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the '24 hr Limit' dropdown list
                await driver.sleep(1000);
                const timeLimitField = await driver.findElement(By.id('throttling_limit'));
                await clearFieldDataObj.clearFieldData(timeLimitField);
                await timeLimitField.sendKeys(timeLimitData);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on update and verify {string}',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        const throttling = await commonElementsObj.findDropdown(driver, screenshotPath, 'is_throttling_enabled');
        const throttlingBeforeNavigation = await throttling.getText();
        const timeLimitBeforeNavigation = await driver.findElement(By.id('throttling_limit')).getAttribute('value');
        await sequenceElementsObj.findUpdateButton(driver);
        await driver.sleep(1000);
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        await pageNavigationObj.comeBackToSequencesPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);
        const throttlingValue = await commonElementsObj.findDropdown(driver, screenshotPath, 'is_throttling_enabled');
        const throttlingAfterNavigation = await throttlingValue.getText();
        const timeLimitAfterNavigation = await driver.findElement(By.id('throttling_limit')).getAttribute('value');
        try {
            strictEqual(throttlingBeforeNavigation, throttlingAfterNavigation);
            strictEqual(timeLimitBeforeNavigation, timeLimitAfterNavigation);
            console.log("As throttling and time limit before and after navigation remains same,so test case has been passed");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'throttlingValue_NotFound.png');
            await assert.fail("As throttling and time limit before and after navigation does not remains same,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 4: Verify, the user is not able to enter invalid data in the '24 hour limit per user' text box------------------------------

When('the user is not able to enter invalid data in the "24 hour limit per user" text box',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'throttling') {
                throttlingState = dataTable.rawTable[i][1];

                //will check that the data for the throttling dropdown field is given or not
                if (throttlingState == '') {
                    await assert.fail('Due to the blank value is provided for the throttling dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Throttling' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'is_throttling_enabled', throttlingState, 'no');
            } else if (fieldName == 'time limit') {
                timeLimitData = dataTable.rawTable[i][1];

                //will check that the data for the time limit dropdown field is given or not
                if (timeLimitData == '') {
                    await assert.fail('Due to the blank value is provided for the time limit dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the '24 hr Limit' dropdown list
                await driver.sleep(1000);
                const timeLimitField = await driver.findElement(By.id('throttling_limit'));
                await clearFieldDataObj.clearFieldData(timeLimitField);
                await timeLimitField.sendKeys(timeLimitData);
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validation_Failed.png');
        await assert.fail(err);
    }

});

Then('verify validation message {string}',async function(expectedValidation) {
    try {
        await driver.sleep(1000);
        const timeLimitBeforeValidation = await driver.findElement(By.id('throttling_limit')).getAttribute('value');
        await sequenceElementsObj.findUpdateButton(driver);
        await driver.sleep(1000);
        const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        if (actualValidation.includes(expectedValidation)) {
            console.log("As actual and expected validations are equal,so test case has been passed");
        } else {
            await assert.fail("As actual and expected validations are not equal,so test case has been aborted");
        }
        await driver.sleep(1000);
        await pageNavigationObj.comeBackToSequencesPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);
        const timeLimitAfterValidation = await driver.findElement(By.id('throttling_limit')).getAttribute('value');
        if (timeLimitBeforeValidation !== timeLimitAfterValidation) {
            console.log("As time limit value after verifying with invalid data is not equal to actual limit data,so invalid data is not updated,so test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'timeLimitValidation_Failed.png');
            await assert.fail("As time limit value after verifying with invalid data is equal to actual limit data,so invalid data is get updated,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 5: Verify, the user is not able to leave the '24 hour limit per user' field as blank----------------------------

When('the user is not able to leave the "24 hour limit per user" field as blank',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'throttling') {
                throttlingState = dataTable.rawTable[i][1];

                //will check that the data for the throttling dropdown field is given or not
                if (throttlingState == '') {
                    await assert.fail('Due to the blank value is provided for the throttling dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Throttling' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'is_throttling_enabled', throttlingState, 'no');
            } else if (fieldName == 'time limit') {
                timeLimitData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the '24 hr Limit' dropdown list
                await driver.sleep(1000);
                const timeLimitField = await driver.findElement(By.id('throttling_limit'));
                await clearFieldDataObj.clearFieldData(timeLimitField);
                await timeLimitField.sendKeys(timeLimitData);
            }
        }
    }catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'timeLimitField_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
    }
});

//------------------Case 6: Verify, the user is able to enable the 'Out-Of-Office Settings' option----------------------------------------

When('the user is able to enable the "Out-Of-Office Settings" option',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1200 }, 0);");
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'office email') {
                officeEmailState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (officeEmailState == 'enable' || officeEmailState == 'disable') {
                    //will find 'Office Email Checkbox' Toggle Button
                    const officeEmailToggle = await sequenceElementsObj.findOfficeEmailToggle(driver);
                    await driver.executeScript("arguments[0].focus();", officeEmailToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Office Email Checkbox'
                    const currentState = await officeEmailToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Office Email Checkbox'
                    if (currentState != officeEmailState) {
                        await driver.executeScript("arguments[0].click();", officeEmailToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the office email checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'auto resume') {
                autoResumeState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (autoResumeState == 'enable' || autoResumeState == 'disable') {
                    //will find 'Auto Resume Checkbox' Toggle Button
                    const autoResumeToggle = await sequenceElementsObj.findAutoResume(driver);
                    await driver.executeScript("arguments[0].focus();", autoResumeToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Auto Resume Checkbox'
                    const currentState = await autoResumeToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Auto Resume Checkbox'
                    if (currentState != autoResumeState) {
                        await driver.executeScript("arguments[0].click();", autoResumeToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the auto resume checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'duration') {
                durationData = dataTable.rawTable[i][1];

                //will check that the data for the contact completes sequence dropdown field is given or not
                if (durationData == '') {
                    await assert.fail('Due to the blank value is provided for the duration dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Duration' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'days_to_resume_on_out_of_office', durationData, 'yes');
            } else if (fieldName == 'time limit') {
                timeLimitData = dataTable.rawTable[i][1];

                //will check that the data for the time limit dropdown field is given or not
                if (timeLimitData == '') {
                    await assert.fail('Due to the blank value is provided for the time limit dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the '24 hr Limit' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'waiting_days_type_to_resume_on_out_of_office', timeLimitData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on update button and verify {string} notification',async function(expectedNotification) {
    try {
        await driver.sleep(1000);
        const officeEmailBeforeNavigation = await driver.findElement(By.id('pause_on_out_of_office')).getAttribute('value');
        const duration = await commonElementsObj.findDropdown(driver, screenshotPath, 'days_to_resume_on_out_of_office');
        const durationBeforeNavigation = await duration.getText();
        const timeUnit = await commonElementsObj.findDropdown(driver, screenshotPath, 'waiting_days_type_to_resume_on_out_of_office');
        const timeUnitBeforeNavigation = await timeUnit.getText();
        await sequenceElementsObj.findUpdateButton(driver);
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        await pageNavigationObj.comeBackToSequencesPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1200 }, 0);");
        await driver.sleep(2000);
        const officeEmailAfterNavigation = await driver.findElement(By.id('pause_on_out_of_office')).getAttribute('value');
        const durationValue = await commonElementsObj.findDropdown(driver, screenshotPath, 'days_to_resume_on_out_of_office');
        const durationAfterNavigation = await durationValue.getText();
        const timeUnitValue = await commonElementsObj.findDropdown(driver, screenshotPath, 'waiting_days_type_to_resume_on_out_of_office');
        const timeUnitAfterNavigation = await timeUnitValue.getText();
        try {
            strictEqual(officeEmailBeforeNavigation, officeEmailAfterNavigation);
            strictEqual(durationBeforeNavigation, durationAfterNavigation);
            strictEqual(timeUnitBeforeNavigation, timeUnitAfterNavigation);
            console.log("As office email,duration and time unit before and after navigation remains same,so test case has been passed");
        } catch (err) {
            await assert.fail("As office email,duration and time unit before and after navigation does not remains same,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 7: Verify, on click of the links, it should be redirected to the respective support page--------------------------------------

When('user clicks on links,redirect to specified urls {string},{string},{string}',async function(expectedThreadingURL,expectedAccessURL,expectedThrottlingURL) {
    let winHandleBefore, winHandlesBefore, winHandles;
    try {
        //checking with 'Threading Read More' redirection
        winHandleBefore = await driver.getWindowHandle();
        await sequenceElementsObj.findThreadingLink(driver);
        await driver.sleep(6000);
        const lastTab = await driver.getAllWindowHandles();
        const closeLastTab = lastTab[lastTab.length - 1];
        await driver.switchTo().window(closeLastTab);
        const currentURL = await driver.getCurrentUrl();
        console.log("current threading url is:" + currentURL);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'threadingReadMorePage.png');
        if (currentURL === expectedThreadingURL) {
            console.log("As current url and expected url of threading links read more pages are same test case has been passed");
        } else {
            await assert.fail("Due to unmatched URLs of threading link,the test case has been aborted");
        }
        await driver.close();
        await driver.switchTo().window(winHandleBefore);
        await driver.sleep(2000);
    } catch(err) {
        await driver.close();
        await driver.switchTo().window(winHandleBefore);
        await driver.sleep(2000);
    }

    try {
        //checking with 'Access Read More' redirection
        winHandlesBefore = await driver.getWindowHandle();
        await sequenceElementsObj.findAccessLink(driver);
        await driver.sleep(6000);
        const secondTab = await driver.getAllWindowHandles();
        const closeTab = secondTab[secondTab.length - 1];
        await driver.switchTo().window(closeTab);
        const currentUrl = await driver.getCurrentUrl();
        console.log("current access url is:" + currentUrl);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'accessReadMorePage.png');
        if (currentUrl === expectedAccessURL) {
            console.log("As current url and expected url of access links read more pages are same test case has been passed");
        } else {
            await assert.fail("Due to unmatched URLs of access link, the test case has been aborted");
        }
        await driver.close();
        await driver.switchTo().window(winHandlesBefore);
        await driver.sleep(2000);
    } catch(err) {
        await driver.close();
        await driver.switchTo().window(winHandlesBefore);
        await driver.sleep(2000);
    }

    try {
        //checking with 'Throttling Read More' redirection
        winHandles = await driver.getWindowHandle();
        await sequenceElementsObj.findThrottlingLink(driver);
        await driver.sleep(6000);
        const finalTab = await driver.getAllWindowHandles();
        const closeFinalTab = finalTab[finalTab.length - 1];
        await driver.switchTo().window(closeFinalTab);
        const currentURl = await driver.getCurrentUrl();
        console.log("current throttling url is:" + currentURl);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'throttlingReadMorePage.png');
        if (currentURl === expectedThrottlingURL) {
            console.log("As current url and expected url of throttling links read more pages are same test case has been passed");
        } else {
            await assert.fail("Due to unmatched URLs of throttling link, the test case has been aborted");
        }
        await driver.close();
        await driver.switchTo().window(winHandles);
        await driver.sleep(2000);
    } catch(err) {
        await driver.close();
        await driver.switchTo().window(winHandles);
        await driver.sleep(2000);
    }
});
const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const config = require('../../../../cucumber_config/cucumber_config');
const driver = config.driver;
const calenderSyncElements = require('../common/calenderSyncPageElements');
const assert = require('assert');
const { strictEqual } = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/04_myAccount/calenderSync/screenshots/';
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const openCalenderSyncPageObj = require('../common/actions');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const formElementObj = require('../../../00_common/webElements/formElements');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const pageNavigationObj = require('../common/actions');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let newConnectedAccountDrpdwnData = 'no',newCalenderSyncDrpdwnData = 'no',newEventsDrpdwnData = 'no',newEventSubjectFieldData = 'no';
let newCallActivityState = 'no',newTaskActivityState = 'no',newMeetingActivityState = 'no',newDemoActivityState = 'no',newSyncAllEventsState = 'no';
let newNotificationTypeDrpdwnData = 'no',newNotificationTimeFieldData = 'no',newNotificationTimeUnitDrpdwnData = 'no';
let newTaskNotificationTypeDrpdwnData = 'no', newTaskNotificationTimeFieldData = 'no', newTaskNotificationTimeUnitDrpdwnData = 'no';
let newMeetingNotificationTypeDrpdwnData = 'no', newMeetingNotificationTimeFieldData = 'no', newMeetingNotificationTimeUnitDrpdwnData = 'no';
let expectedCallCheckboxValue = 'no', expectedDemoCheckboxValue = 'no';
let isLoginUserAdmin ='no';

Given('the {string} is on calender sync page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();
    
    //will check that the user is on which page
    if(currentPageURL.includes('app/user/calendarSync')) {
        console.log('The calender sync page has been opened successfully...');
    }
    else if(currentPageTitle == 'Calender Sync - My Account' || currentPageTitle == 'Connected Account(s) - My Account') {
        console.log('The calender sync page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate') {
        /*  As the user is on the Salesmate login page,
         *  then the process to open access key page page will be started from by performing the Salesmate login */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on interface preferences page');
        //will open calender sync page
        await openCalenderSyncPageObj.openCalenderSyncPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == '') {
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open calender sync page will be started from by opening the Salesmate login page  */

        //will open the Salesmate login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on calender sync page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on calender sync page');
        //will open calender sync page
        await openCalenderSyncPageObj.openCalenderSyncPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the calender sync page
        await openCalenderSyncPageObj.openCalenderSyncPage(driver,screenshotPath);
    }
});

//----------------------------------Case 1 - Step definition------------------------------------------------

When('Select connected account in calender sync page and verify that accounts with connected account page',async function() {
    try {
        await driver.sleep(2000);
        await calenderSyncElements.selectConnectedAccountDropdown();
        const selectedAccountElements = await driver.findElements(By.xpath("//ul[@class='select2-results__options']//li"));
        const selectedAccountsLength = await selectedAccountElements.length;
        console.log("Connected Accounts list in connected account dropdown from calender sync page");
        for (let i = 0; i < selectedAccountsLength; i++) {
            const selectedAccountsText = await selectedAccountElements[i].getText();
            console.log(selectedAccountsText);
        }
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'openCalenderSyncPage.png');
        await calenderSyncElements.clickOnConnectedAccount();
        await driver.sleep(1000);
        const connectedAccountElements = await driver.findElements(By.xpath("//section[@id='user_form']/table//td[2]"));
        const connectedAccountsLength = await connectedAccountElements.length;
        console.log("Connected Accounts list in connected accounts page:");
        for (let i = 0; i < connectedAccountsLength; i++) {
            const connectedAccountsText = await connectedAccountElements[i].getText();
            console.log(connectedAccountsText);
        }
        try {
            if (selectedAccountsLength === connectedAccountsLength) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'connectedAccountsPage.png');
                console.log("As selected accounts in calender sync page are equal to connected accounts,test case has been passed");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'connectedAccounts_NotFound.png');
                await assert.fail("As connected accounts are not found,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("As accounts in calender sync match with connected accounts,test case has been passed");
});

//----------------------------------Case 2 - Step definition------------------------------------------------

When('Click on events will appear in salesmate dropdown and check with setup>Activity types',async function() {
    try {
        await driver.sleep(2000);
        await calenderSyncElements.clickOnCalenderSync();
        await driver.sleep(2000);
        await calenderSyncElements.eventsAppearDropdown();
        await driver.sleep(1000);
        const eventsAppearDropdownElements = await driver.findElements(By.xpath("//span[@class='select2-results']//ul//li"));
        const eventsAppearDropdownLength = await eventsAppearDropdownElements.length;
        console.log("Events list in Events's Appear Dropdown:");
        for (let i = 0; i < eventsAppearDropdownLength; i++) {
            const eventsText = await eventsAppearDropdownElements[i].getText();
            console.log(eventsText);
        }
        await screenshotObj.takeScreenshot(driver,screenshotPath+'eventsAppearDropdown.png');
        //will open the 03_setup page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);

        //will check the 'Activity Types' option is visible or not
        const activityTypesBtn = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Activity Types ');
        if (activityTypesBtn.length > 0) {
            isLoginUserAdmin = 'yes';
            //will click on the 'Activity Types' option if it is visible
            await driver.executeScript("arguments[0].scrollIntoView();", activityTypesBtn[0]);
            await activityTypesBtn[0].click();
            await driver.sleep(1000);
            const activityTypesElements = await driver.findElements(By.xpath("//span[@class='m-l-xs default-text']"));
            const activityTypesElementsLength = await activityTypesElements.length;
            console.log("Events list in Activity Types page:");
            for (let i = 0; i < activityTypesElementsLength; i++) {
                const activityTypesText = await activityTypesElements[i].getText();
                console.log(activityTypesText);
            }
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'activityTypes.png');
            //compare events appear dropdown elements length and activity type elements length
            if(eventsAppearDropdownLength === activityTypesElementsLength) {
                console.log("As both events appear dropdown elements and activity type elements length are equal,test case has been passed");
            }else {
                await assert.fail("As both events appear dropdown elements and activity type elements length are not equal,test case has been aborted");
            }
        } else {
            /* if the 'Activity Types' option is not visible then will mark that
             * the logged-in user is not Admin and this flag will be used later
            */
            isLoginUserAdmin = 'no';
            let adminUserNumber = '';

            //will get the Admin user details from the xlsx file
            const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
            for(let i=0; i<userDetails.user.length; i++){
                if(userDetails.profile[i].toLowerCase() == 'admin'){
                    adminUserNumber = userDetails.user[i];
                }
            }
            //will check whether the Admin user found or not from the excel file
            if(adminUserNumber == ''){
                await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
            }

            //will open the Salesmate login page
            await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on calender sync policies page');
            //will do Salesmate login with Admin user's credentials
            await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on calender sync policies page');
            //will open the 'Setup' page
            await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
            //will open the 'Activity Types' Page
            const activityTypesBtn = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Activity Types ');
            await driver.executeScript("arguments[0].scrollIntoView();", activityTypesBtn[0]);
            await activityTypesBtn[0].click();
            await driver.sleep(1000);
            const activityTypesElements = await driver.findElements(By.xpath("//span[@class='m-l-xs default-text']"));
            const activityTypesElementsLength = await activityTypesElements.length;
            for (let i = 0; i < activityTypesElementsLength; i++) {
                const activityTypesText = await activityTypesElements[i].getText();
                console.log("Events list in Activity Types page:");
                console.log(activityTypesText);
            }
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'activityTypes.png');
            await driver.sleep(1000);
            //compare events appear dropdown elements length and activity type elements length
            if(eventsAppearDropdownLength === activityTypesElementsLength) {
                console.log("As both events appear dropdown elements and activity type elements length are equal,test case has been passed");
            }else {
                await assert.fail("As both events appear dropdown elements and activity type elements length are not equal,test case has been passed")
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityTypes_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As activity types page is not found,test case has been aborted")
    }
    console.log("As user is admin,the activity types page has been opened successfully");
});

//----------------------------------Case 3 - Step definition------------------------------------------------

When('the user selecting all fields in calender sync page>click on update button>calender sync starts:',async function(dataTable) {
    try {
        await driver.sleep(3000);
        const alertMessage = await driver.findElements(By.xpath('//div[@class="alert alert-info"]'));
        const alertMessageLength = await alertMessage.length;
        if (alertMessageLength < 0) {
            await assert.fail("As alert notification before starting a calender sync is not found,so test case has been aborted");
        } else {

            //will travel provided fields and data list
            for (let i = 0; i < dataTable.rawTable.length; i++) {

                //will check whether the provided field is part of the test case or not
                const fieldName = dataTable.rawTable[i][0].toLowerCase();
                if (fieldName == 'connected account') {
                    newConnectedAccountDrpdwnData = dataTable.rawTable[i][1];

                    //will check that the data for the connected account field is given or not
                    if (newConnectedAccountDrpdwnData == '') {
                        await assert.fail('Due to the blank value is provided for the connected account field, the test case execution has been aborted');
                    }

                    //will select the provided new dropdown value from the 'Connected Account' dropdown list
                    await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'accountSelect', newConnectedAccountDrpdwnData, 'no');
                    await driver.sleep(2000);
                } else if (fieldName == 'sync calender') {
                    newCalenderSyncDrpdwnData = dataTable.rawTable[i][1];

                    //will check that the data for the calender sync field is given or not
                    if (newCalenderSyncDrpdwnData == '') {
                        await assert.fail('Due to the blank value is provided for the calender sync field, the test case execution has been aborted');
                    }

                    //will select the provided new dropdown value from the 'Calender Account' dropdown list
                    await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'calendarSelect', newCalenderSyncDrpdwnData, 'no');
                } else if (fieldName == 'events') {
                    newEventsDrpdwnData = dataTable.rawTable[i][1];

                    //will check that the data for the events field is given or not
                    if (newEventsDrpdwnData == '') {
                        await assert.fail('Due to the blank value is provided for the events field, the test case execution has been aborted');
                    }

                    //will select the provided new dropdown value from the 'Events' dropdown list
                    await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'activityTypeSelect', newEventsDrpdwnData, 'no');
                } else if (fieldName == 'call') {
                    newCallActivityState = dataTable.rawTable[i][1].toLowerCase();

                    //will check that the provided data is valid to execute a test case or not
                    if (newCallActivityState == 'enable' || newCallActivityState == 'disable') {

                        await driver.sleep(2000);
                        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
                        await driver.sleep(2000);
                        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0', 'activity_Task_1', 'activity_Meeting_2', 'activity_Demo_3']);
                        //will find 'Call Activity' checkbox
                        const calActivityCheckbox = await calenderSyncElements.findCallActivityCheckbox();
                        await driver.executeScript("arguments[0].focus();", calActivityCheckbox);
                        await driver.sleep(1000);

                        //will get the current value of 'Call Activity Checkbox'
                        const currentState = await calActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                        //will enable/disable 'Call Activity Checkbox'
                        if (currentState != newCallActivityState) {
                            await driver.executeScript("arguments[0].click();", calActivityCheckbox);
                        }
                    } else {
                        assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the call activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                    }
                } else if (fieldName == 'notification type') {
                    newNotificationTypeDrpdwnData = dataTable.rawTable[i][1];

                    //will check that the data for the notification type is given or not
                    if (newNotificationTypeDrpdwnData == '') {
                        await assert.fail('Due to the blank value is provided for the notification type field, the test case execution has been aborted');
                    }

                    //will click on notification button
                    await calenderSyncElements.clickOnCallNotification();
                    //will select the provided new dropdown value from the 'Notification Type' dropdown list
                    await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationType_Call_0', newNotificationTypeDrpdwnData, 'no');
                } else if (fieldName == 'notification time') {
                    newNotificationTimeFieldData = dataTable.rawTable[i][1];

                    //will check that the data for the notification time field is given or not
                    if (newNotificationTimeFieldData == '') {
                        await assert.fail('Due to the blank value is provided for the notification time field, the test case execution has been aborted');
                    }

                    //will find 'Notification Time' field and pass the new data
                    const notificationTimeField = await calenderSyncElements.findNotificationTime();
                    await clearFieldDataObj.clearFieldData(notificationTimeField);
                    await notificationTimeField.sendKeys(newNotificationTimeFieldData);
                } else if (fieldName == 'notification time unit') {
                    newNotificationTimeUnitDrpdwnData = dataTable.rawTable[i][1];

                    //will check that the data for the notification type is given or not
                    if (newNotificationTimeUnitDrpdwnData == '') {
                        await assert.fail('Due to the blank value is provided for the notification time unit field, the test case execution has been aborted');
                    }

                    //will select the provided new dropdown value from the 'Notification Type' dropdown list
                    await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationTimeUnit_Call_0', newNotificationTimeUnitDrpdwnData, 'no');
                } else if (fieldName == 'task') {
                    newTaskActivityState = dataTable.rawTable[i][1].toLowerCase();

                    //will check that the provided data is valid to execute a test case or not
                    if (newTaskActivityState == 'enable' || newTaskActivityState == 'disable') {
                        //will find 'Task Activity' checkbox
                        const taskActivityCheckbox = await calenderSyncElements.findTaskActivityCheckbox();
                        await driver.executeScript("arguments[0].focus();", taskActivityCheckbox);
                        await driver.sleep(1000);

                        //will get the current value of 'Task Activity Checkbox'
                        const currentState = await taskActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                        //will enable/disable 'Task Activity Checkbox'
                        if (currentState != newTaskActivityState) {
                            await driver.executeScript("arguments[0].click();", taskActivityCheckbox);
                        }
                    } else {
                        assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                    }
                } else if (fieldName == 'meeting') {
                    newMeetingActivityState = dataTable.rawTable[i][1].toLowerCase();

                    //will check that the provided data is valid to execute a test case or not
                    if (newMeetingActivityState == 'enable' || newMeetingActivityState == 'disable') {
                        //will find 'Meeting Activity' checkbox
                        const meetingActivityCheckbox = await calenderSyncElements.findMeetingActivityCheckbox();
                        await driver.executeScript("arguments[0].focus();", meetingActivityCheckbox);
                        await driver.sleep(1000);

                        //will get the current value of 'Meeting Activity Checkbox'
                        const currentState = await meetingActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                        //will enable/disable 'Meeting Activity Checkbox'
                        if (currentState != newMeetingActivityState) {
                            await driver.executeScript("arguments[0].click();", meetingActivityCheckbox);
                        }
                    } else {
                        assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the meeting activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                    }
                } else if (fieldName == 'demo') {
                    newDemoActivityState = dataTable.rawTable[i][1].toLowerCase();

                    //will check that the provided data is valid to execute a test case or not
                    if (newDemoActivityState == 'enable' || newDemoActivityState == 'disable') {
                        //will find 'Demo Activity' checkbox
                        const demoActivityCheckbox = await calenderSyncElements.findDemoActivityCheckbox();
                        await driver.executeScript("arguments[0].focus();", demoActivityCheckbox);
                        await driver.sleep(1000);

                        //will get the current value of 'Task Activity Checkbox'
                        const currentState = await demoActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                        //will enable/disable 'Task Activity Checkbox'
                        if (currentState != newDemoActivityState) {
                            await driver.executeScript("arguments[0].click();", demoActivityCheckbox);
                        }
                    } else {
                        assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                    }
                } else if (fieldName == 'sync all events') {
                    newSyncAllEventsState = dataTable.rawTable[i][1].toLowerCase();

                    //will check that the provided data is valid to execute a test case or not
                    if (newSyncAllEventsState == 'enable' || newSyncAllEventsState == 'disable') {
                        //will find 'Sync All Events' Toggle Button
                        const syncAllEventsToggleButton = await calenderSyncElements.findSyncAllEventsToggleButton();
                        await driver.executeScript("arguments[0].focus();", syncAllEventsToggleButton);
                        await driver.sleep(1000);

                        //will get the current value of 'Task Activity Checkbox'
                        const currentState = await syncAllEventsToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                        //will enable/disable 'Task Activity Checkbox'
                        if (currentState != newSyncAllEventsState) {
                            await driver.executeScript("arguments[0].click();", syncAllEventsToggleButton);
                        }
                    } else {
                        assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the sync all events toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                    }
                }
            }
            // will check whether the test data for all test fields is given or not
            if (newConnectedAccountDrpdwnData == 'no' || newEventsDrpdwnData == 'no' || newCallActivityState == 'no' || newTaskActivityState == 'no' || newMeetingActivityState == 'no' || newDemoActivityState == 'no' || newSyncAllEventsState == 'no') {
                await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Connected Account,Events,Event Subject,Call,Task,Meeting,Demo');
            }
            await driver.sleep(1000);
            await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 0 }, 0);");
            await driver.sleep(1000);
            await calenderSyncElements.updateButton();
            await driver.sleep(1000);
            const alertMessage1 = await driver.findElements(By.xpath('//sm-confirm-prompt'));
            const alertMessageLength1 = await alertMessage1.length;
            if(alertMessageLength1 > 0) {
                const yesButton = await driver.findElement(By.xpath('//button[text()="Yes"]'));
                await yesButton.click();
                await driver.sleep(1000);
            }
            await calenderSyncElements.checkCalenderSyncUpdateMessage();
            await driver.sleep(3000);

            //get actual values of calender sync page before navigation
            const actualConnectedAccountDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'accountSelect');
            const actualConnectedAccountValue = await actualConnectedAccountDropdown.getText();
            const actualCalenderSyncDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'calendarSelect');
            const actualCalenderSyncValue = await actualCalenderSyncDropdown.getText();
            const actualEventDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'activityTypeSelect');
            const actualEventValue = await actualEventDropdown.getText();
            const actualCalActivity = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
            const actualTaskActivity = await driver.findElement(By.id('activity_Task_1')).getAttribute('value');
            const actualMeetingActivity = await driver.findElement(By.id('activity_Meeting_2')).getAttribute('value');
            const actualDemoActivity = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');
            const actualTwoWaySync = await driver.findElement(By.id('syncActivityRadioField_true')).getAttribute('value');
            const actualOneWaySync = await driver.findElement(By.id('syncActivityRadioField_false')).getAttribute('value');

            await pageNavigationObj.comeBackToCalenderSyncPage();
            await driver.sleep(1000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'noNotificationMessage.png');

            //get expected values of calender sync page after navigation
            const expectedConnectedAccountDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'accountSelect');
            const expectedConnectedAccountValue = await expectedConnectedAccountDropdown.getText();
            const expectedCalenderSyncDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'calendarSelect');
            const expectedCalenderSyncValue = await expectedCalenderSyncDropdown.getText();
            const expectedEventDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'activityTypeSelect');
            const expectedEventValue = await expectedEventDropdown.getText();
            const expectedCalActivity = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
            const expectedTaskActivity = await driver.findElement(By.id('activity_Task_1')).getAttribute('value');
            const expectedMeetingActivity = await driver.findElement(By.id('activity_Meeting_2')).getAttribute('value');
            const expectedDemoActivity = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');
            const expectedTwoWaySync = await driver.findElement(By.id('syncActivityRadioField_true')).getAttribute('value');
            const expectedOneWaySync = await driver.findElement(By.id('syncActivityRadioField_false')).getAttribute('value');

            //compare both actual and expected values of calender sync page
            try {
                strictEqual(actualConnectedAccountValue, expectedConnectedAccountValue);
                strictEqual(actualCalenderSyncValue, expectedCalenderSyncValue);
                strictEqual(actualEventValue, expectedEventValue);
                strictEqual(actualCalActivity, expectedCalActivity);
                strictEqual(actualTaskActivity, expectedTaskActivity);
                strictEqual(actualMeetingActivity, expectedMeetingActivity);
                strictEqual(actualDemoActivity, expectedDemoActivity);
                strictEqual(actualTwoWaySync, expectedTwoWaySync);
                strictEqual(actualOneWaySync, expectedOneWaySync);
            } catch (err) {
                await assert.fail("As actual and expected values of calender sync page before and after navigation are unmatched,so test case has been aborted");
                await assert.fail(err);
            }
            await driver.sleep(1000);
            await calenderSyncElements.findNotificationClose(1);
            await calenderSyncElements.updateButton();
            await driver.sleep(5000);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Calender sync all fields are selected and updated successfully done");
});

//----------------------------------Case 4 - Step definition------------------------------------------------

When('the user selecting all fields>click on update button>calender sync starts:',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'connected account') {
                newConnectedAccountDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the connected account field is given or not
                if (newConnectedAccountDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the connected account field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Connected Account' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'accountSelect', newConnectedAccountDrpdwnData, 'no');
            } else if (fieldName == 'sync calender') {
                newCalenderSyncDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the calender sync field is given or not
                if (newCalenderSyncDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the calender sync field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Calender Account' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'calendarSelect', newCalenderSyncDrpdwnData, 'no');
            } else if (fieldName == 'events') {
                newEventsDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the events field is given or not
                if (newEventsDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the events field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Events' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'activityTypeSelect', newEventsDrpdwnData, 'no');
            } else if (fieldName == 'call') {
                newCallActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newCallActivityState == 'enable' || newCallActivityState == 'disable') {

                    await driver.sleep(2000);
                    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
                    await driver.sleep(2000);
                    await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0', 'activity_Task_1', 'activity_Meeting_2', 'activity_Demo_3']);
                    //will find 'Call Activity' checkbox
                    const calActivityCheckbox = await calenderSyncElements.findCallActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", calActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Call Activity Checkbox'
                    const currentState = await calActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Call Activity Checkbox'
                    if (currentState != newCallActivityState) {
                        await driver.executeScript("arguments[0].click();", calActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the call activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'notification type') {
                newNotificationTypeDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the notification type is given or not
                if (newNotificationTypeDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the notification type field, the test case execution has been aborted');
                }

                //will click on notification button
                await calenderSyncElements.clickOnCallNotification();
                //will select the provided new dropdown value from the 'Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationType_Call_0', newNotificationTypeDrpdwnData, 'no');
            } else if (fieldName == 'notification time') {
                newNotificationTimeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the notification time field is given or not
                if (newNotificationTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the notification time field, the test case execution has been aborted');
                }

                //will find 'Notification Time' field and pass the new data
                const notificationTimeField = await calenderSyncElements.findNotificationTime();
                await clearFieldDataObj.clearFieldData(notificationTimeField);
                await notificationTimeField.sendKeys(newNotificationTimeFieldData);
            } else if (fieldName == 'notification time unit') {
                newNotificationTimeUnitDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the notification type is given or not
                if (newNotificationTimeUnitDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the notification time unit field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationTimeUnit_Call_0', newNotificationTimeUnitDrpdwnData, 'no');
            } else if (fieldName == 'task') {
                newTaskActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newTaskActivityState == 'enable' || newTaskActivityState == 'disable') {
                    //will find 'Task Activity' checkbox
                    const taskActivityCheckbox = await calenderSyncElements.findTaskActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", taskActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await taskActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newTaskActivityState) {
                        await driver.executeScript("arguments[0].click();", taskActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'meeting') {
                newMeetingActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMeetingActivityState == 'enable' || newMeetingActivityState == 'disable') {
                    //will find 'Meeting Activity' checkbox
                    const meetingActivityCheckbox = await calenderSyncElements.findMeetingActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", meetingActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Meeting Activity Checkbox'
                    const currentState = await meetingActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Meeting Activity Checkbox'
                    if (currentState != newMeetingActivityState) {
                        await driver.executeScript("arguments[0].click();", meetingActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the meeting activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'demo') {
                newDemoActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDemoActivityState == 'enable' || newDemoActivityState == 'disable') {
                    //will find 'Demo Activity' checkbox
                    const demoActivityCheckbox = await calenderSyncElements.findDemoActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", demoActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await demoActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newDemoActivityState) {
                        await driver.executeScript("arguments[0].click();", demoActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'sync all events') {
                newSyncAllEventsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newSyncAllEventsState == 'enable' || newSyncAllEventsState == 'disable') {
                    //will find 'Sync All Events' Toggle Button
                    const syncAllEventsToggleButton = await calenderSyncElements.findSyncAllEventsToggleButton();
                    await driver.executeScript("arguments[0].focus();", syncAllEventsToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await syncAllEventsToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newSyncAllEventsState) {
                        await driver.executeScript("arguments[0].click();", syncAllEventsToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the sync all events toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        // will check whether the test data for all test fields is given or not
        if (newConnectedAccountDrpdwnData == 'no' || newEventsDrpdwnData == 'no' || newCallActivityState == 'no' || newTaskActivityState == 'no' || newMeetingActivityState == 'no' || newDemoActivityState == 'no' || newSyncAllEventsState == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Connected Account,Events,Event Subject,Call,Task,Meeting,Demo');
        }
        await calenderSyncElements.updateButton();
        await driver.sleep(3000);
        await driver.sleep(1000);
            const alertMessage1 = await driver.findElements(By.xpath('//sm-confirm-prompt'));
            const alertMessageLength1 = await alertMessage1.length;
            if(alertMessageLength1 > 0) {
                const yesButton = await driver.findElement(By.xpath('//button[text()="Yes"]'));
                await yesButton.click();
                await driver.sleep(1000);
            }

        //get actual values of calender sync page before navigation
        const actualConnectedAccountDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'accountSelect');
        const actualConnectedAccountValue = await actualConnectedAccountDropdown.getText();
        const actualCalenderSyncDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'calendarSelect');
        const actualCalenderSyncValue = await actualCalenderSyncDropdown.getText();
        const actualEventDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'activityTypeSelect');
        const actualEventValue = await actualEventDropdown.getText();
        const actualCalActivity = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
        const actualTaskActivity = await driver.findElement(By.id('activity_Task_1')).getAttribute('value');
        const actualMeetingActivity = await driver.findElement(By.id('activity_Meeting_2')).getAttribute('value');
        const actualDemoActivity = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');
        const actualTwoWaySync = await driver.findElement(By.id('syncActivityRadioField_true')).getAttribute('value');
        const actualOneWaySync = await driver.findElement(By.id('syncActivityRadioField_false')).getAttribute('value');

        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'noNotificationMessage.png');

        //get expected values of calender sync page after navigation
        const expectedConnectedAccountDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'accountSelect');
        const expectedConnectedAccountValue = await expectedConnectedAccountDropdown.getText();
        const expectedCalenderSyncDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'calendarSelect');
        const expectedCalenderSyncValue = await expectedCalenderSyncDropdown.getText();
        const expectedEventDropdown = await formElementObj.findDropdown(driver, screenshotPath, 'activityTypeSelect');
        const expectedEventValue = await expectedEventDropdown.getText();
        const expectedCalActivity = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
        const expectedTaskActivity = await driver.findElement(By.id('activity_Task_1')).getAttribute('value');
        const expectedMeetingActivity = await driver.findElement(By.id('activity_Meeting_2')).getAttribute('value');
        const expectedDemoActivity = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');
        const expectedTwoWaySync = await driver.findElement(By.id('syncActivityRadioField_true')).getAttribute('value');
        const expectedOneWaySync = await driver.findElement(By.id('syncActivityRadioField_false')).getAttribute('value');

        //compare both actual and expected values of calender sync page
        try {
            strictEqual(actualConnectedAccountValue, expectedConnectedAccountValue);
            strictEqual(actualCalenderSyncValue, expectedCalenderSyncValue);
            strictEqual(actualEventValue, expectedEventValue);
            strictEqual(actualCalActivity, expectedCalActivity);
            strictEqual(actualTaskActivity, expectedTaskActivity);
            strictEqual(actualMeetingActivity, expectedMeetingActivity);
            strictEqual(actualDemoActivity, expectedDemoActivity);
            strictEqual(actualTwoWaySync, expectedTwoWaySync);
            strictEqual(actualOneWaySync, expectedOneWaySync);
        } catch (err) {
            await assert.fail("As actual and expected values of calender sync page before and after navigation are unmatched while updating a calender sync,so test case has been aborted");
            await assert.fail(err);
        }
        await driver.sleep(1000);
        await calenderSyncElements.findNotificationClose(1);
        await calenderSyncElements.updateButton();
        await driver.sleep(2000);
        console.log("Calender sync all fields are selected and updated successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 9 - Step definition------------------------------------------------

When('User is able to sync all or some activity types',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'call') {
                newCallActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newCallActivityState == 'enable' || newCallActivityState == 'disable') {

                    await driver.sleep(2000);
                    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
                    await driver.sleep(2000);
                    //will find 'Call Activity' checkbox
                    const calActivityCheckbox = await calenderSyncElements.findCallActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", calActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Call Activity Checkbox'
                    const currentState = await calActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Call Activity Checkbox'
                    if (currentState != newCallActivityState) {
                        await driver.executeScript("arguments[0].click();", calActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the call activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'task') {
                newTaskActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newTaskActivityState == 'enable' || newTaskActivityState == 'disable') {
                    //will find 'Task Activity' checkbox
                    const taskActivityCheckbox = await calenderSyncElements.findTaskActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", taskActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await taskActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newTaskActivityState) {
                        await driver.executeScript("arguments[0].click();", taskActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'meeting') {
                newMeetingActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMeetingActivityState == 'enable' || newMeetingActivityState == 'disable') {
                    //will find 'Meeting Activity' checkbox
                    const meetingActivityCheckbox = await calenderSyncElements.findMeetingActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", meetingActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Meeting Activity Checkbox'
                    const currentState = await meetingActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Meeting Activity Checkbox'
                    if (currentState != newMeetingActivityState) {
                        await driver.executeScript("arguments[0].click();", meetingActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the meeting activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'demo') {
                newDemoActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDemoActivityState == 'enable' || newDemoActivityState == 'disable') {
                    //will find 'Demo Activity' checkbox
                    const demoActivityCheckbox = await calenderSyncElements.findDemoActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", demoActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await demoActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newDemoActivityState) {
                        await driver.executeScript("arguments[0].click();", demoActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        // will check whether the test data for all test fields is given or not
        if (newCallActivityState == 'no' || newTaskActivityState == 'no' || newMeetingActivityState == 'no' || newDemoActivityState == 'no' || newTaskActivityState == 'no' || newMeetingActivityState == 'no' || newDemoActivityState == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Connected Account,Events,Event Subject,Call,Task,Meeting,Demo');
        }
        await calenderSyncElements.updateButton();
        await driver.sleep(3000);
        const expectedCallValue = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
        const expectedDemoValue = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'noNotificationMessage.png');

        //will check the details of calender sync are get updated or not
        try {
            if (expectedCallCheckboxValue != 'no') {
                const callActivityCheckbox = await calenderSyncElements.findCallActivityCheckbox();
                const actualCallCheckboxValue = await callActivityCheckbox.getAttribute("value");
                strictEqual(actualCallCheckboxValue, expectedCallValue);
            }
            if (expectedDemoCheckboxValue != 'no') {
                const demoActivityCheckbox = await calenderSyncElements.findDemoActivityCheckbox();
                const actualDemoCheckboxValue = await demoActivityCheckbox.getAttribute("value");
                strictEqual(actualDemoCheckboxValue, expectedDemoValue);
            }
        } catch (err) {
            expectedCallCheckboxValue = 'no', expectedDemoCheckboxValue = 'no';
            await screenshotObj.takeScreenshot(driver, screenshotPath + '/' + 'DropdownData_NotUpdated.png');
            assert.fail('Due to the dropdown data is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'DropdownData_NotUpdated.png\'');
        }
        expectedCallCheckboxValue = 'no', expectedDemoCheckboxValue = 'no';
        console.log("User is able to sync all or some activity types successfully done...");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 10 - Step definition------------------------------------------------

When('Verify default notification settings like {string} {string} and {string} for activity type',async function(notificationType,notificationTime,notificationTimeUnit) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Meeting_2'], 'enable');
        await calenderSyncElements.clickOnMeetingNotification();
        await driver.sleep(1000);
        try {
            const defaultNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Meeting_0');
            const defaultNotificationTypeText = await defaultNotificationType.getText();
            const defaultNotificationTimeText = await driver.findElement(By.id('notificationTime_Meeting_0')).getAttribute('value');
            const defaultNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Meeting_0');
            const defaultNotificationTimeUnitText = await defaultNotificationTimeUnit.getText();

            //compare default notification type,notification time and notification time unit values
            if (defaultNotificationTypeText === notificationType && defaultNotificationTimeText === notificationTime && defaultNotificationTimeUnitText === notificationTimeUnit) {
                console.log("As default notification values are matched as " + notificationType + notificationTime + notificationTimeUnit + ",test case has been passed");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'notificationValues_NotFound.png');
                await assert.fail("As notification values are unmatched,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        await driver.sleep(1000);
        await calenderSyncElements.findNotificationClose(3);
        await calenderSyncElements.updateButton();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'defaultNotificationSettings.png');
        console.log("Verified default notification settings for activity type successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 11 - Step definition------------------------------------------------

When('the user set notifications for synced activities type:',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0', 'activity_Task_1', 'activity_Meeting_2', 'activity_Demo_3']);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();

            if (fieldName == 'call activity') {
                newCallActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newCallActivityState == 'enable' || newCallActivityState == 'disable') {
                    //will find 'Call Activity' checkbox
                    const calActivityCheckbox = await calenderSyncElements.findCallActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", calActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Call Activity Checkbox'
                    const currentState = await calActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Call Activity Checkbox'
                    if (currentState != newCallActivityState) {
                        await driver.executeScript("arguments[0].click();", calActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the call activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'call activity type') {
                newNotificationTypeDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the call activity notification type is given or not
                if (newNotificationTypeDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the call activity notification type dropdown, the test case execution has been aborted');
                }

                //will click on 'Call Activity Notification' button
                await calenderSyncElements.clickOnCallNotification();
                //will select the provided new dropdown value from the 'Call Activity Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationType_Call_0', newNotificationTypeDrpdwnData, 'no');
            } else if (fieldName == 'call activity duration') {
                newNotificationTimeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the call activity notification time field is given or not
                if (newNotificationTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the call activity notification time field, the test case execution has been aborted');
                }

                //will find 'Call Activity Notification Time' field and pass the new data
                const notificationTimeField = await calenderSyncElements.findNotificationTime();
                await clearFieldDataObj.clearFieldData(notificationTimeField);
                await notificationTimeField.sendKeys(newNotificationTimeFieldData);
            } else if (fieldName == 'call activity time type') {
                newNotificationTimeUnitDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the call activity notification time unit is given or not
                if (newNotificationTimeUnitDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the call activity notification time unit dropdown, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Call Activity Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationTimeUnit_Call_0', newNotificationTimeUnitDrpdwnData, 'no');
            } else if (fieldName == 'task activity') {
                newTaskActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newTaskActivityState == 'enable' || newTaskActivityState == 'disable') {
                    //will find 'Task Activity' checkbox
                    const taskActivityCheckbox = await calenderSyncElements.findTaskActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", taskActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await taskActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newTaskActivityState) {
                        await driver.executeScript("arguments[0].click();", taskActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'task activity type') {
                newTaskNotificationTypeDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the task activity notification type is given or not
                if (newTaskNotificationTypeDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the task activity notification type field, the test case execution has been aborted');
                }

                //will click on 'Task Activity Notification' button
                await calenderSyncElements.clickOnTaskNotification();
                //will select the provided new dropdown value from the 'Task Activity Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationType_Task_0', newTaskNotificationTypeDrpdwnData, 'no');
            } else if (fieldName == 'task activity duration') {
                newTaskNotificationTimeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the task activity notification time field is given or not
                if (newTaskNotificationTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the task activity notification time field, the test case execution has been aborted');
                }

                //will find 'Task Activity Notification Time' field and pass the new data
                const taskNotificationTimeField = await calenderSyncElements.findTaskNotificationTime();
                await clearFieldDataObj.clearFieldData(taskNotificationTimeField);
                await taskNotificationTimeField.sendKeys(newTaskNotificationTimeFieldData);
            } else if (fieldName == 'task activity time type') {
                newTaskNotificationTimeUnitDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the task activity notification time type is given or not
                if (newTaskNotificationTimeUnitDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the task activity notification time unit field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Task Activity Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationTimeUnit_Task_0', newTaskNotificationTimeUnitDrpdwnData, 'no');
            } else if (fieldName == 'meeting activity') {
                newMeetingActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMeetingActivityState == 'enable' || newMeetingActivityState == 'disable') {
                    await driver.sleep(2000);
                    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 5000 }, 0);");
                    await driver.sleep(2000);
                    //will find 'Meeting Activity' checkbox
                    const meetingActivityCheckbox = await calenderSyncElements.findMeetingActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", meetingActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Meeting Activity Checkbox'
                    const currentState = await meetingActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Meeting Activity Checkbox'
                    if (currentState != newMeetingActivityState) {
                        await driver.executeScript("arguments[0].click();", meetingActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the meeting activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'meeting activity type') {
                newMeetingNotificationTypeDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the meeting activity notification type is given or not
                if (newMeetingNotificationTypeDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the meeting activity notification type field, the test case execution has been aborted');
                }

                //will click on 'Meeting Activity Notification' button
                await calenderSyncElements.clickOnMeetingNotification();
                //will select the provided new dropdown value from the 'Meeting Activity Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationType_Meeting_0', newMeetingNotificationTypeDrpdwnData, 'no');
            } else if (fieldName == 'meeting activity duration') {
                newMeetingNotificationTimeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the meeting activity notification time field is given or not
                if (newMeetingNotificationTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the meeting activity notification time field, the test case execution has been aborted');
                }

                //will find 'Meeting Activity Notification Time' field and pass the new data
                const meetingNotificationTimeField = await calenderSyncElements.findMeetingNotificationTime();
                await clearFieldDataObj.clearFieldData(meetingNotificationTimeField);
                await meetingNotificationTimeField.sendKeys(newMeetingNotificationTimeFieldData);
            } else if (fieldName == 'meeting activity time type') {
                newMeetingNotificationTimeUnitDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the meeting activity notification time type is given or not
                if (newMeetingNotificationTimeUnitDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the meeting activity notification time unit field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Meeting Activity Notification Type' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'notificationTimeUnit_Meeting_0', newMeetingNotificationTimeUnitDrpdwnData, 'no');
            } else if (fieldName == 'demo activity') {
                newDemoActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDemoActivityState == 'enable' || newDemoActivityState == 'disable') {
                    //will find 'Demo Activity' checkbox
                    const demoActivityCheckbox = await calenderSyncElements.findDemoActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", demoActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await demoActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newDemoActivityState) {
                        await driver.executeScript("arguments[0].click();", demoActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        // will check whether the test data for all test fields is given or not
        if (newCallActivityState == 'no' || newNotificationTypeDrpdwnData == 'no' || newNotificationTimeFieldData == 'no' || newNotificationTimeUnitDrpdwnData == 'no' || newTaskActivityState == 'no' || newTaskNotificationTypeDrpdwnData == 'no' || newTaskNotificationTimeFieldData == 'no' || newTaskNotificationTimeUnitDrpdwnData == 'no' || newMeetingActivityState == 'no' || newMeetingNotificationTypeDrpdwnData == 'no' || newMeetingNotificationTimeFieldData == 'no' || newMeetingNotificationTimeUnitDrpdwnData == 'no' || newDemoActivityState == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Call,Call Activity Type,Call Activity Time,Call Activity Time Unit,Task,Task Activity Type,Task Activity Time,Task Activity Time Unit,Meeting,Meeting Activity Type,Meeting Activity Time,Meeting Activity Time Unit,Demo');
        }
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on update button and navigate to other page and verify saved details',async function() {
    try {
        //actual values of 'Call Activity' checkbox and 'Call Activity Notification' values
        const actualCallActivityValue = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
        const actualCallActivityNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Call_0');
        const actualCallActivityNotificationTypeText = await actualCallActivityNotificationType.getText();
        const actualCallActivityNotificationTimeField = await driver.findElement(By.id('notificationTime_Call_0')).getAttribute('value');
        const actualCallActivityNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Call_0');
        const actualCallActivityNotificationTimeUnitText = await actualCallActivityNotificationTimeUnit.getText();

        //actual values of 'Task Activity' checkbox and 'Task Activity Notification' values
        const actualTaskActivityValue = await driver.findElement(By.id('activity_Task_1')).getAttribute('value');
        const actualTaskActivityNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Task_0');
        const actualTaskActivityNotificationTypeText = await actualTaskActivityNotificationType.getText();
        const actualTaskActivityNotificationTimeField = await driver.findElement(By.id('notificationTime_Task_0')).getAttribute('value');
        const actualTaskActivityNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Task_0');
        const actualTaskActivityNotificationTimeUnitText = await actualTaskActivityNotificationTimeUnit.getText();

        //actual values of 'Meeting Activity' checkbox and 'Meeting Activity Notification' values
        const actualMeetingActivityValue = await driver.findElement(By.id('activity_Meeting_2')).getAttribute('value');
        const actualMeetingActivityNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Meeting_0');
        const actualMeetingActivityNotificationTypeText = await actualMeetingActivityNotificationType.getText();
        const actualMeetingActivityNotificationTimeField = await driver.findElement(By.id('notificationTime_Meeting_0')).getAttribute('value');
        const actualMeetingActivityNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Meeting_0');
        const actualMeetingActivityNotificationTimeUnitText = await actualMeetingActivityNotificationTimeUnit.getText();

        //actual value of 'Demo Activity' checkbox
        const actualDemoActivityValue = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');

        //click on update button
        await calenderSyncElements.updateButton();
        await driver.sleep(3000);
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);

        //expected values of 'Call Activity' checkbox and 'Call Activity Notification' values
        const expectedCallActivityValue = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
        const expectedCallActivityNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Call_0');
        const expectedCallActivityNotificationTypeText = await expectedCallActivityNotificationType.getText();
        const expectedCallActivityNotificationTimeField = await driver.findElement(By.id('notificationTime_Call_0')).getAttribute('value');
        const expectedCallActivityNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Call_0');
        const expectedCallActivityNotificationTimeUnitText = await expectedCallActivityNotificationTimeUnit.getText();

        //expected values of 'Task Activity' checkbox and 'Task Activity Notification' values
        const expectedTaskActivityValue = await driver.findElement(By.id('activity_Task_1')).getAttribute('value');
        const expectedTaskActivityNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Task_0');
        const expectedTaskActivityNotificationTypeText = await expectedTaskActivityNotificationType.getText();
        const expectedTaskActivityNotificationTimeField = await driver.findElement(By.id('notificationTime_Task_0')).getAttribute('value');
        const expectedTaskActivityNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Task_0');
        const expectedTaskActivityNotificationTimeUnitText = await expectedTaskActivityNotificationTimeUnit.getText();

        //expected values of 'Meeting Activity' checkbox and 'Meeting Activity Notification' values
        const expectedMeetingActivityValue = await driver.findElement(By.id('activity_Meeting_2')).getAttribute('value');
        const expectedMeetingActivityNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Meeting_0');
        const expectedMeetingActivityNotificationTypeText = await expectedMeetingActivityNotificationType.getText();
        const expectedMeetingActivityNotificationTimeField = await driver.findElement(By.id('notificationTime_Meeting_0')).getAttribute('value');
        const expectedMeetingActivityNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Meeting_0');
        const expectedMeetingActivityNotificationTimeUnitText = await expectedMeetingActivityNotificationTimeUnit.getText();

        //expected value of 'Demo Activity' checkbox
        const expectedDemoActivityValue = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');

        //compare actual and expected values
        try {
            strictEqual(actualCallActivityValue, expectedCallActivityValue);
            strictEqual(actualCallActivityNotificationTypeText, expectedCallActivityNotificationTypeText);
            strictEqual(actualCallActivityNotificationTimeField, expectedCallActivityNotificationTimeField);
            strictEqual(actualCallActivityNotificationTimeUnitText, expectedCallActivityNotificationTimeUnitText);
            strictEqual(actualTaskActivityValue, expectedTaskActivityValue);
            strictEqual(actualTaskActivityNotificationTypeText, expectedTaskActivityNotificationTypeText);
            strictEqual(actualTaskActivityNotificationTimeField, expectedTaskActivityNotificationTimeField);
            strictEqual(actualTaskActivityNotificationTimeUnitText, expectedTaskActivityNotificationTimeUnitText);
            strictEqual(actualMeetingActivityValue, expectedMeetingActivityValue);
            strictEqual(actualMeetingActivityNotificationTypeText, expectedMeetingActivityNotificationTypeText);
            strictEqual(actualMeetingActivityNotificationTimeField, expectedMeetingActivityNotificationTimeField);
            strictEqual(actualMeetingActivityNotificationTimeUnitText, expectedMeetingActivityNotificationTimeUnitText);
            strictEqual(actualDemoActivityValue, expectedDemoActivityValue);
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        await driver.sleep(1000);
        await calenderSyncElements.findNotificationClose(1);
        await calenderSyncElements.findNotificationClose(2);
        await calenderSyncElements.findNotificationClose(3);
        await calenderSyncElements.updateButton();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 12 - Step definition------------------------------------------------

When('Leave duration field as blank and verify default notification time should be {string}',async function(expectedDefaultNotificationTime) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0']);
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0'],'enable');
        await calenderSyncElements.clickOnCallNotification();
        await driver.sleep(2000);
        await calenderSyncElements.setBlankNotificationDuration();
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        const defaultNotificationTime = await driver.findElement(By.id('notificationTime_Call_0')).getAttribute('value');
        //verify default notification time
        if (defaultNotificationTime === expectedDefaultNotificationTime) {
            console.log("Default notification time set to "+expectedDefaultNotificationTime+",the test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'defaultNotification_Failed.png');
            await assert.fail("As default notification values is not set as "+expectedDefaultNotificationTime+",test case has been aborted");
        }
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'defaultTimeCall.png');
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    await driver.sleep(1000);
    console.log("Verified default notification time as "+expectedDefaultNotificationTime+" successfully done");
});

//----------------------------------Case 13 - Step definition------------------------------------------------

When('User enters {string} and it popups an {string} and verify default notification time {string}',async function(invalidDuration,validationMessage,expectedDefaultNotificationTime) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await calenderSyncElements.invalidDuration(invalidDuration, validationMessage);
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        const defaultNotificationTime = await driver.findElement(By.id('notificationTime_Call_0')).getAttribute('value');
        //verify that invalid duration time should not be updated
        if (defaultNotificationTime === expectedDefaultNotificationTime) {
            console.log("As invalid duration is get notified with validation message and default notification time set to "+expectedDefaultNotificationTime+",the test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver,screenshotObj+'invalidDuration_Case_Failed.png');
            await assert.fail("As invalid duration is not get notified with validation message,test case has been failed");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Verifying duration of notification successfully done");
});

//----------------------------------Case 14 - Step definition------------------------------------------------

When('User able to remove notification for synced activity type',async function() {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0']);
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0'], 'enable');
        await calenderSyncElements.clickOnCallNotification();
        //closing notification of call activity type
        await calenderSyncElements.findNotificationClose(1);
        await calenderSyncElements.updateButton();
        await driver.sleep(3000);
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        try {
            await driver.manage().setTimeouts({implicit: 3000});
            const notificationCloseButton = await driver.findElements(By.id('removeNotificationBtnField'));
            const notificationCloseButtonLength = await notificationCloseButton.length;
            if (notificationCloseButtonLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'NotificationClosed.png');
                console.log("As notification close button is not found,the default notification settings has been closed,so test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'notificationClose_Failed.png');
                await assert.fail("As notification is not closed,test case has been failed");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        console.log("User able to remove notification for synced activity type successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 15 - Step definition------------------------------------------------

When('Check and uncheck activity type and verify default notification settings',async function() {
        try {
            await driver.sleep(2000);
            await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
            await driver.sleep(2000);
            await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0']);
            await driver.sleep(2000);
            await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0'], 'enable');
            await driver.sleep(1000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'notificationButton_Visible.png');
            await calenderSyncElements.clickOnCallNotification();
            await driver.sleep(1000);
            //default notification values before navigation
            const actualDefaultNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Call_0');
            const actualDefaultNotificationTypeText = await actualDefaultNotificationType.getText();
            console.log("Default notification values of call activity before navigation:");
            console.log(actualDefaultNotificationTypeText);
            const actualDefaultNotificationTimeText = await driver.findElement(By.id('notificationTime_Call_0')).getAttribute('value');
            console.log(actualDefaultNotificationTimeText);
            const actualDefaultNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Call_0');
            const actualDefaultNotificationTimeUnitText = await actualDefaultNotificationTimeUnit.getText();
            console.log(actualDefaultNotificationTimeUnitText);
            await calenderSyncElements.updateButton();
            await driver.sleep(3000);
            await pageNavigationObj.comeBackToCalenderSyncPage();
            await driver.sleep(2000);
            try {
                const callActivityValue = !!await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
                console.log(callActivityValue);
                //if call activity is enabled,only then notification button exists and can get values of notification
                if (callActivityValue === true) {
                    //default notification values after navigation
                    console.log("As call activity is enabled,test case has been passed");
                    const expectedDefaultNotificationType = await formElementObj.findDropdown(driver, screenshotPath, 'notificationType_Call_0');
                    const expectedDefaultNotificationTypeText = await expectedDefaultNotificationType.getText();
                    console.log("Default notification values of call activity after navigation:");
                    console.log(expectedDefaultNotificationTypeText);
                    const expectedDefaultNotificationTimeText = await driver.findElement(By.id('notificationTime_Call_0')).getAttribute('value');
                    console.log(expectedDefaultNotificationTimeText);
                    const expectedDefaultNotificationTimeUnit = await formElementObj.findDropdown(driver, screenshotPath, 'notificationTimeUnit_Call_0');
                    const expectedDefaultNotificationTimeUnitText = await expectedDefaultNotificationTimeUnit.getText();
                    console.log(expectedDefaultNotificationTimeUnitText);
                    //comparing both actual and expected default notification values
                    if (actualDefaultNotificationTypeText === expectedDefaultNotificationTypeText && actualDefaultNotificationTimeText === expectedDefaultNotificationTimeText && actualDefaultNotificationTimeUnitText === expectedDefaultNotificationTimeUnitText) {
                        console.log("As default notification values are maintained after navigation,test case has been passed");
                    } else {
                        await screenshotObj.takeScreenshot(driver, screenshotPath + 'defaultNotificationSettings.png');
                        await assert.fail("As default notification settings are unchanged,test case has been aborted");
                    }
                } else {
                    await assert.fail("As call activity is disabled,test case has been aborted");
                }
            } catch (err) {
                await driver.navigate().refresh();
                await assert.fail(err);
            }
            await driver.sleep(1000);
            await calenderSyncElements.findNotificationClose(1);
            await calenderSyncElements.updateButton();
            await driver.sleep(2000);
            console.log("Check and uncheck activity type and verify default notification settings successfully done...");
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
});

//----------------------------------Case 16 - Step definition------------------------------------------------

When('User is able to unsync all or some activity types',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'call') {
                newCallActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newCallActivityState == 'enable' || newCallActivityState == 'disable') {
                    await driver.sleep(2000);
                    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
                    await driver.sleep(2000);
                    await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0', 'activity_Task_1', 'activity_Meeting_2', 'activity_Demo_3']);
                    //will find 'Call Activity' checkbox
                    const calActivityCheckbox = await calenderSyncElements.findCallActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", calActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Call Activity Checkbox'
                    const currentState = await calActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Call Activity Checkbox'
                    if (currentState != newCallActivityState) {
                        await driver.executeScript("arguments[0].click();", calActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the call activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'task') {
                newTaskActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newTaskActivityState == 'enable' || newTaskActivityState == 'disable') {
                    //will find 'Task Activity' checkbox
                    const taskActivityCheckbox = await calenderSyncElements.findTaskActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", taskActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await taskActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newTaskActivityState) {
                        await driver.executeScript("arguments[0].click();", taskActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'meeting') {
                newMeetingActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMeetingActivityState == 'enable' || newMeetingActivityState == 'disable') {
                    //will find 'Meeting Activity' checkbox
                    const meetingActivityCheckbox = await calenderSyncElements.findMeetingActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", meetingActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Meeting Activity Checkbox'
                    const currentState = await meetingActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Meeting Activity Checkbox'
                    if (currentState != newMeetingActivityState) {
                        await driver.executeScript("arguments[0].click();", meetingActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the meeting activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'demo') {
                newDemoActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDemoActivityState == 'enable' || newDemoActivityState == 'disable') {
                    //will find 'Demo Activity' checkbox
                    const demoActivityCheckbox = await calenderSyncElements.findDemoActivityCheckbox();
                    await driver.executeScript("arguments[0].focus();", demoActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Task Activity Checkbox'
                    const currentState = await demoActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Task Activity Checkbox'
                    if (currentState != newDemoActivityState) {
                        await driver.executeScript("arguments[0].click();", demoActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        // will check whether the test data for all test fields is given or not
        if (newCallActivityState == 'no' || newTaskActivityState == 'no' || newMeetingActivityState == 'no' || newDemoActivityState == 'no' || newTaskActivityState == 'no' || newMeetingActivityState == 'no' || newDemoActivityState == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Connected Account,Events,Event Subject,Call,Task,Meeting,Demo');
        }
        await calenderSyncElements.updateButton();
        await driver.sleep(3000);
        const actualCallCheckboxValue = await driver.findElement(By.id('activity_Call_0')).getAttribute('value');
        const actualDemoCheckboxValue = await driver.findElement(By.id('activity_Demo_3')).getAttribute('value');
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'enabledOrDisabledActivities.png');

        //will check the details of calender sync are get updated or not
        try {
            if (expectedCallCheckboxValue != 'no') {
                const callActivityCheckbox = await calenderSyncElements.findCallActivityCheckbox();
                const expectedCallCheckboxValue = await callActivityCheckbox.getAttribute("value");
                strictEqual(actualCallCheckboxValue, expectedCallCheckboxValue);
            }
            if (expectedDemoCheckboxValue != 'no') {
                const demoActivityCheckbox = await calenderSyncElements.findDemoActivityCheckbox();
                const expectedDemoCheckboxValue = await demoActivityCheckbox.getAttribute("value");
                strictEqual(actualDemoCheckboxValue, expectedDemoCheckboxValue);
            }
        } catch (err) {
            expectedCallCheckboxValue = 'no', expectedDemoCheckboxValue = 'no';
            await screenshotObj.takeScreenshot(driver, screenshotPath + '/' + 'DropdownData_NotUpdated.png');
            assert.fail('Due to the dropdown data is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'DropdownData_NotUpdated.png\'');
        }
        expectedCallCheckboxValue = 'no', expectedDemoCheckboxValue = 'no';
        await driver.sleep(1000);
        console.log("User able to unsync all or some activity types successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 17 - Step definition------------------------------------------------

When('Verify user is unable to set notifications for unsynced activities',async function() {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //Enabling call,task,meeting and demo activity types
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Call_0', 'activity_Task_1', 'activity_Meeting_2', 'activity_Demo_3'], 'enable');
        await driver.sleep(2000);
        //Disabling meeting and demo activity types
        await calenderSyncElements.syncAllOrSomeActivityTypes(['activity_Meeting_2', 'activity_Demo_3']);
        try {
            await driver.manage().setTimeouts({implicit: 3000});
            //checking notification button for unsynced meeting activity type
            const meetingNotificationButton = await driver.findElements(By.css('li:nth-of-type(3) > .row > .col-md-9 > .ng-dirty.ng-touched.ng-valid > sm-element  button#addNotification'));
            const meetingNotificationButtonLength = await meetingNotificationButton.length;

            //checking notification button for unsynced demo activity type
            const demoNotificationButton = await driver.findElements(By.css('li:nth-of-type(4) > .row > .col-md-9 > .ng-dirty.ng-touched.ng-valid > sm-element  button#addNotification'));
            const demoNotificationButtonLength = await demoNotificationButton.length;
            if (meetingNotificationButtonLength === 0 && demoNotificationButtonLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'noNotificationForUnsyncedActivity.png');
                console.log("As notification buttons are not found for unsynced meeting and demo activities,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As notification buttons are not found after unsyncing meeting and demo activities,so test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await calenderSyncElements.updateButton();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'unsyncActivityNotification.png');
        console.log("Verified user is unable to set notifications for unsynced activities successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 18 - Step definition------------------------------------------------

When('User able to set two-way calender sync',async function() {
    try {
        await driver.sleep(2000);
        await calenderSyncElements.setTwoWaySync();
        await calenderSyncElements.updateButton();
        await driver.sleep(3000);
        const actualTwoWaySyncValue = await driver.findElement(By.id('syncActivityRadioField_true')).getAttribute('value');
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //comparing actual and expected values of two way sync toggle
        try {
            const expectedTwoWaySyncValue = await driver.findElement(By.id('syncActivityRadioField_true')).getAttribute('value');
            strictEqual(actualTwoWaySyncValue, expectedTwoWaySyncValue);
            console.log("Two-way calender sync is maintained after navigation");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'twoWaySync_Failed.png');
            await assert.fail("As user is unable to set two way sync,test case has been aborted");
            await assert.fail(err);
        }
        console.log("User able to set two-way sync successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 19 - Step definition------------------------------------------------

When('User able to set one-way calender sync',async function() {
    try {
        await driver.sleep(2000);
        await calenderSyncElements.setOneWaySync();
        await calenderSyncElements.updateButton();
        await driver.sleep(3000);
        const actualOneWaySyncValue = await driver.findElement(By.id('syncActivityRadioField_false')).getAttribute('value');
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        try {
            const expectedOneWaySyncValue = await driver.findElement(By.id('syncActivityRadioField_false')).getAttribute('value');
            strictEqual(actualOneWaySyncValue, expectedOneWaySyncValue);
            console.log("One-way calender is maintained after navigation");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'oneWaySync_Failed.png');
            await assert.fail("As user is unable to set one way sync,test case has been aborted");
            await assert.fail(err);
        }
        console.log("User able to set one-way sync successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 20 - Step definition------------------------------------------------

When('User able to stop calender sync',async function() {
    try {
        await driver.sleep(3000);
        await calenderSyncElements.stopCalenderSyncCancelled();
        await driver.sleep(1000);
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        const stopCalenderSyncElements = await driver.findElements(By.id('stopSync'));
        const stopCalenderSyncLength = await stopCalenderSyncElements.length;
        if (stopCalenderSyncLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'calenderSyncCancelled.png');
            console.log("As calender sync is not stopped and stop button is found after cancelling calender,so test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As stop calender sync button is not found,so test case has been aborted");
        }
        await calenderSyncElements.stopCalenderSync();
        await pageNavigationObj.comeBackToCalenderSyncPage();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        try {
            const stopCalenderSyncElements = await driver.findElements(By.id('stopSync'));
            const stopCalenderSyncLength = await stopCalenderSyncElements.length;
            if (stopCalenderSyncLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'stoppedCalenderSync.png');
                console.log("As calender sync is stopped and stop button is not found after stopping calender,so test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As unable to stop calender sync,so test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        console.log("User able to stop calender sync successfully done");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
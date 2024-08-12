const { Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/06_logActivity/screenshots/';
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const addActivityElementsObj = require('../../05_addActivity/common/addActivityElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');

let activityTypeDropdownData = 'no', titleFieldData = 'no', textFieldData = 'no', textAreaFieldData = 'no';
let activityType = 'no', title = 'no', text = 'no', textArea = 'no';
let scheduleCheckboxState = 'no', dateTimeFieldData = 'no';

//--------------------------------Case 1: As a User, Verify the UI of 'Add Activity'------------------------------------

Then('verify UI of "Log Activity" tab',async function(){
    try {
        const logActivityTab = await formElementsObj.findElementById(driver,screenshotPath,'create_deal_link','logActivityTab');
        await logActivityTab.click();
        await driver.sleep(1500);
        //get 'UI' of 'Activity' tab
        const titleField = !!await driver.findElement(By.id('title')).isDisplayed();
        const activityTypeDropdown = !!await driver.findElement(By.name('type')).isDisplayed();
        const outcomeDropdown = !!await driver.findElement(By.name('outcome')).isDisplayed();
        const startDateField = !!await driver.findElement(By.xpath('(//input[@placeholder="Start Date"])[1]')).isDisplayed();
        const endDateField = !!await driver.findElement(By.xpath('(//input[@placeholder="End Date"])[1]')).isDisplayed();
        const startTimeField = !!await driver.findElement(By.xpath('(//input[@placeholder="Start Time"])[1]')).isDisplayed();
        const endTimeField = !!await driver.findElement(By.xpath('(//input[@placeholder="End Time"])[1]')).isDisplayed();
        const noteField = !!await driver.findElement(By.id('note')).isDisplayed();
        const ownerDropdown = !!await driver.findElement(By.name('owner')).isDisplayed();
        const textField = !!await driver.findElement(By.id('textCustomField1')).isDisplayed();
        const textAreaField = !!await driver.findElement(By.id('textAreaCustomField1')).isDisplayed();
        const integerField = !!await driver.findElement(By.id('intCustomField1')).isDisplayed();
        const decimalField = !!await driver.findElement(By.id('decimalCustomField1')).isDisplayed();
        const dateField01 = !!await driver.findElement(By.id('dateCustomField1')).isDisplayed();
        const dateTimeField = !!await driver.findElement(By.id('dateTimeCustomField1')).isDisplayed();
        const emailField = !!await driver.findElement(By.id('textCustomField2')).isDisplayed();
        const phoneField = !!await driver.findElement(By.id('textCustomField3')).isDisplayed();
        const selectField = !!await driver.findElement(By.name('textCustomField4')).isDisplayed();
        const multiSelectField = !!await driver.findElement(By.name('multiSelectCustomField1')).isDisplayed();
        const urlField = !!await driver.findElement(By.id('textCustomField5')).isDisplayed();
        const bigIntegerField = !!await driver.findElement(By.id('bigIntCustomField1')).isDisplayed();
        const percentageField = !!await driver.findElement(By.id('decimalCustomField2')).isDisplayed();
        const booleanCheckbox = await driver.findElements(By.id('checkboxCustomField1'));
        const booleanCheckboxLength = await booleanCheckbox.length;
        const scheduleCheckbox = !!await driver.findElement(By.id('scheduleFollowUp')).isEnabled();
        const saveButton = !!await driver.findElement(By.xpath('//button[.=" Save "]')).isDisplayed();
        const cancelButton = !!await driver.findElement(By.xpath('//button[.=" Cancel "]')).isDisplayed();
        try {
            strictEqual(titleField,true);
            strictEqual(activityTypeDropdown,true);
            strictEqual(outcomeDropdown,true);
            strictEqual(startDateField,true);
            strictEqual(endDateField,true);
            strictEqual(startTimeField,true);
            strictEqual(endTimeField,true);
            strictEqual(noteField,true);
            strictEqual(ownerDropdown,true);
            strictEqual(textField,true);
            strictEqual(textAreaField,true);
            strictEqual(integerField,true);
            strictEqual(decimalField,true);
            strictEqual(dateField01,true);
            strictEqual(dateTimeField,true);
            strictEqual(emailField,true);
            strictEqual(phoneField,true);
            strictEqual(selectField,true);
            strictEqual(multiSelectField,true);
            strictEqual(urlField,true);
            strictEqual(bigIntegerField,true);
            strictEqual(percentageField,true);
            strictEqual(booleanCheckboxLength,1);
            strictEqual(scheduleCheckbox,true);
            strictEqual(saveButton,true);
            strictEqual(cancelButton,true);
        }catch(err) {
            await assert.fail(err);
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",moduleIcon);
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'logActivityTab_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------------Case 2: As a User, Verify that upon clicking on Save button user can add log to Activity-----------------

Then('verify that upon clicking on Save button user can add log to Activity',async function(dataTable){
    try {
        const logActivityTab = await formElementsObj.findElementById(driver,screenshotPath,'create_deal_link','logActivityTab');
        await logActivityTab.click();
        await driver.sleep(1500);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'activity type') {
                activityTypeDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the activity type field dropdown field is given or not
                if (activityTypeDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the activity type field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Activity Type' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'type',activityTypeDropdownData,'no');
            } else if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text') {
                textFieldData = dataTable.rawTable[i][1];

                //will find 'Text' field and pass the new data
                const textField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','textField');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(titleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text area') {
                textAreaFieldData = dataTable.rawTable[i][1];

                //will find 'Text Area' field and pass the new data
                const textAreaField = await formElementsObj.findElementById(driver,screenshotPath,'textAreaCustomField1','textAreaField');
                await clearFieldDataObj.clearFieldData(textAreaField);
                await textAreaField.sendKeys(textAreaFieldData);
                await driver.sleep(1000);
            }
        }
        //get values of 'Activity Fields'
        activityType = await driver.findElement(By.xpath('//span[@class="activityType1"]')).getText();
        console.log("Activity Type: "+activityType);
        title = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Title: "+title);
        text = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        console.log("Text: "+text);
        textArea = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        console.log("Text Area: "+textArea);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
        await saveButton.click();
        await driver.sleep(1000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activityFields_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('verify newly added log activity details on {string} module',async function(companyModule){
    try {
        //go to contact listing page and come back to 'Contact Details Screen Page'
        const contactModule = await moduleElementsObj.findModuleIcon(driver,`${companyModule}`);
        await contactModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const activitiesTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await activitiesTab.click();
        await driver.sleep(1500);
        //get 'Added Activity Timeline Entry' values
        const timelineActivityType = await driver.findElement(By.xpath('//timeline-activity/div/div[1]/div[3]/span/span[@class="font-medium"]')).getText();
        console.log("Timeline Activity Type: "+timelineActivityType);
        const timelineTitle = await driver.findElement(By.css('timeline-activity a > span')).getText();
        console.log("Timeline Title: "+timelineTitle);
        const timelineDateText = await driver.findElement(By.xpath('//timeline-activity//sm-due-date/span[1]')).getText();
        console.log("Timeline Date: "+timelineDateText);
        if(activityType === timelineActivityType) {
            console.log("As added log activity fields are equal to timeline added activities,so test case has been passed");
        } else {
            await assert.fail("As added log activity fields are not equal to timeline added activities,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",moduleIcon);
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'logActivityFields_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----------------------Case 3: As a User, Verify Cancel button functionality for Log Activity--------------------------

Then('enter data in log activity fields',async function(dataTable){
    try {
        const logActivityTab = await formElementsObj.findElementById(driver,screenshotPath,'create_deal_link','logActivityTab');
        await logActivityTab.click();
        await driver.sleep(1500);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text') {
                textFieldData = dataTable.rawTable[i][1];

                //will find 'Text' field and pass the new data
                const textField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','textField');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(500);
            }
        }
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'cancelButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('verify Cancel button functionality for Log Activity',async function(){
    try {
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Cancel ');
        await cancelButton.click();
        await driver.sleep(2000);
        //get 'Activity Reset Values' after Cancelling
        const title = await driver.findElement(By.id('title')).getAttribute('value');
        const text = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        try {
            strictEqual(title,'');
            strictEqual(text,'');
        } catch(err) {
            await assert.fail(err);
        }
        console.log("As cancel button functionality is working fine,so test case has been passed");
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",moduleIcon);
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'timeLineEntry_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 4: As a User, Verify that timeline entry should get updated after adding log activity---------------

Then('verify that timeline entry should get updated after adding log activity',async function(){
    try {
        const activitiesTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await activitiesTab.click();
        await driver.sleep(1500);
        //get 'Added Activity Timeline Entry' values in 'Activities' tab
        const timelineActivityType = await driver.findElement(By.xpath('//timeline-activity/div/div[1]/div[3]/span/span[@class="font-medium"]')).getText();
        console.log("Timeline Activity Type: "+timelineActivityType);
        const timelineActivityTypeVisibility = await driver.findElement(By.xpath('//timeline-activity/div/div[1]/div[3]/span/span[@class="font-medium"]')).isDisplayed();
        const timelineTitle = await driver.findElement(By.css('timeline-activity a > span')).getText();
        console.log("Timeline Title: "+timelineTitle);
        const timelineTitleVisibility = await driver.findElement(By.css('timeline-activity a > span')).isDisplayed();
        const timelineDateText = await driver.findElement(By.xpath('//timeline-activity//sm-due-date/span[1]')).getText();
        console.log("Timeline Date: "+timelineDateText);
        const timelineDateTimeVisibility = await driver.findElement(By.xpath('//timeline-activity//sm-due-date/span[1]')).isDisplayed();
        if((timelineActivityTypeVisibility && timelineTitleVisibility && timelineDateTimeVisibility) === true) {
            console.log("As log added to activity details are visible under 'Activities' tab,so test case has been passed");
        } else {
            await assert.fail("As log added to activity details are not visible under 'Activities' tab,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",moduleIcon);
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'timeLineEntry_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------------Case 5: As a User, Verify validation message for required activity fields------------------------

Then('verify log activity with adding blank data',async function(dataTable){
    try {
        const logActivityTab = await formElementsObj.findElementById(driver,screenshotPath,'create_deal_link','logActivityTab');
        await logActivityTab.click();
        await driver.sleep(1500);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            }
        }
    } catch (err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------------------Case 6: As a User, Verify that it should allow to schedule a follow up activity-------------------

Then('verify that it should allow to schedule a follow up activity',async function(dataTable){
    try {
        const logActivityTab = await formElementsObj.findElementById(driver,screenshotPath,'create_deal_link','logActivityTab');
        await logActivityTab.click();
        await driver.sleep(1500);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'schedule') {
                scheduleCheckboxState = dataTable.rawTable[i][1];

                //will check that the provided data is valid to execute a test case or not
                if (scheduleCheckboxState == 'enable' || scheduleCheckboxState == 'disable') {
                    //will find 'Schedule' checkbox
                    const scheduleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'scheduleFollowUp','scheduleCheckbox');
                    await driver.executeScript("arguments[0].focus();", scheduleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Schedule'
                    const currentState = await scheduleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Schedule'
                    if (currentState != scheduleCheckboxState) {
                        await driver.executeScript("arguments[0].click();", scheduleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the schedule checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'date') {
                dateTimeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the date time field is given or not
                if (dateTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date time field, the test case execution has been aborted');
                }

                //will find 'Date Time' field and pass the new data
                const dateTimeField = await formElementsObj.findElementById(driver,screenshotPath, 'dateRange','dateRangeField');
                await clearFieldDataObj.clearFieldData(dateTimeField);
                await dateTimeField.sendKeys(dateTimeFieldData);
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//div[.="Showing : "]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
                await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
                await driver.executeScript("arguments[0].click();",saveButton);
                await driver.sleep(1000);
            }
        }
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'recurrence_NotSet.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('check scheduled follow-up activity time',async function(){
    try {
        const activitiesTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await activitiesTab.click();
        await driver.sleep(2000);
        //get 'Schedule-follow-up' notification in 'Activity' tab
        const scheduleFollowUpText = await driver.findElement(By.xpath('//timeline-activity[1]//span[contains(text(),"Follow-up")]')).getText();
        console.log("Schedule Follow up activity: "+scheduleFollowUpText);
        await driver.sleep(1000);
        const activityName = await addActivityElementsObj.findActivityName(driver,'Follow-up');
        await activityName.click();
        await driver.sleep(4500);
        //get 'Title' notification in 'Activity Details' page
        const activityQuickViewPageTitle = await driver.findElement(By.xpath('(//activity-quick-view-header/div/div/div[1]/div)[2]')).getText();
        console.log("Activity Quick View Page Title: "+activityQuickViewPageTitle);
        if(scheduleFollowUpText === activityQuickViewPageTitle) {
            console.log("As 'Schedule Follow-up' is added to activity and is equal to 'Activity quick view page title',so test case has been passed");
        } else {
            await assert.fail("As 'Schedule Follow-up' is not added to activity and not equal to 'Activity quick view page title',so test case has been aborted");
        }
        const closeIcon = await addActivityElementsObj.findActivityQuickViewCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",moduleIcon);
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'recurrence_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/05_addActivity/screenshots/';
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const addActivityElementsObj = require('../common/addActivityElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');

let activityTypeDropdownData = 'no', titleFieldData = 'no', textFieldData = 'no', textAreaFieldData = 'no', ownerDropdownData = 'no';
let activityType = 'no', title = 'no', text = 'no', textArea = 'no', repeatData = 'no';

//--------------------------------Case 1: As a User, Verify the UI of 'Add Activity'------------------------------------

Then('verify the UI of {string} tab',async function(tabName){
    try {
        const activityTab = await addActivityElementsObj.findTab(driver,`${tabName}`);
        await activityTab.click();
        await driver.sleep(2500);
        //get 'UI' of 'Activity' tab
        const titleField = !!await driver.findElement(By.id('title')).isDisplayed();
        const activityTypeDropdown = !!await driver.findElement(By.name('type')).isDisplayed();
        const startDateField = !!await driver.findElement(By.xpath('//input[@placeholder="Start Date"]')).isDisplayed();
        const endDateField = !!await driver.findElement(By.xpath('//input[@placeholder="End Date"]')).isDisplayed();
        const startTimeField = !!await driver.findElement(By.xpath('//input[@placeholder="Start Time"]')).isDisplayed();
        const endTimeField = !!await driver.findElement(By.xpath('//input[@placeholder="End Time"]')).isDisplayed();
        const availabilityDropdown = !!await driver.findElement(By.name('visibility')).isDisplayed();
        const noteField = !!await driver.findElement(By.id('note')).isDisplayed();
        const ownerDropdown = !!await driver.findElement(By.name('owner')).isDisplayed();
        const contactField = !!await driver.findElement(By.xpath('//input[@placeholder="Contact"]')).isDisplayed();
        const followersField = !!await driver.findElement(By.xpath('//followers-field/ro-tag/div/input')).isDisplayed();
        const tagsField = !!await driver.findElement(By.xpath('//sm-tag[@class="activity-form-row"]/sm-element//ro-tag/div/input')).isDisplayed();
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
        const saveButton = !!await driver.findElement(By.xpath('//button[@id="btnSubmit"]//span[.=" Save "]')).isDisplayed();
        const cancelButton = !!await driver.findElement(By.xpath('//button[text()=" Cancel "]')).isDisplayed();
        try {
            strictEqual(titleField,true);
            strictEqual(activityTypeDropdown,true);
            strictEqual(startDateField,true);
            strictEqual(endDateField,true);
            strictEqual(startTimeField,true);
            strictEqual(endTimeField,true);
            strictEqual(availabilityDropdown,true);
            strictEqual(noteField,true);
            strictEqual(ownerDropdown,true);
            strictEqual(contactField,true);
            strictEqual(followersField,true);
            strictEqual(tagsField,true);
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
            strictEqual(saveButton,true);
            strictEqual(cancelButton,true);
        }catch(err) {
            await assert.fail(err);
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'addActivityTab_NotFound.png');
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 2: As a User, Verify that upon clicking on Save button user can add new Activity------------------

When('user is on activity tab',async function(){
   try {
       const activityTab = await addActivityElementsObj.findTab(driver,'Add Activity');
       await activityTab.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('verify that upon clicking on Save button user can add new Activity',async function(dataTable){
    try {
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
                await driver.sleep(300);
            } else if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will find 'Title' field and pass the new data
                const titleField = await driver.findElement(By.xpath('//form/div/div[1]/sm-input-txt/sm-element/input[@id="title"]'))
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
        const saveButton = await driver.findElement(By.xpath('//sm-button/sm-element//button[@id="btnSubmit"]//span[.=" Save "]'));
        await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
        await driver.executeScript("arguments[0].click();",saveButton);
        await driver.sleep(1000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activityFields_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} module and check newly added activity details',async function(moduleName){
    try {
        //go to contact listing page and come back to 'Contact Details Screen Page'
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await timelineTab.click();
        await driver.sleep(2000);
        //get 'Added Activity Timeline Entry' values
        const timelineActivityType = await driver.findElement(By.xpath('//div/div[1]/div[3]/span/span[@class="font-medium"]')).getText();
        console.log("Timeline Activity Type: "+timelineActivityType);
        const timelineTitle = await driver.findElement(By.xpath('//div/timeline-activity//a')).getText();
        console.log("Timeline Title: "+timelineTitle);
        if(activityType === timelineActivityType && title === timelineTitle) {
            console.log("As added activity fields are equal to timeline added activities,so test case has been passed");
        } else {
            await assert.fail("As added activity fields are not equal to timeline added activities,so test case has been aborted");
        }
        const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await dealIcon.click();
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activityFields_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------Case 3: As a User, Verify Cancel button functionality for Add Activity--------------------------

Then('enter data in activity fields',async function(dataTable){
    try {
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
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify Cancel button functionality for Add Activity',async function(){
    try {
        await addActivityElementsObj.findActivityCancelButton(driver);
        //get 'Activity Reset Values' after Cancelling
        const title = await driver.findElement(By.id('title')).getAttribute('value');
        const time = await driver.findElement(By.id('dueTime')).getAttribute('value');
        try {
            strictEqual(title,'');
            strictEqual(time,'');
        } catch(err) {
            await assert.fail(err);
        }
        console.log("As cancel button functionality is working fine,so test case has been passed");
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'timeLineEntry_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 4: As a User, Verify that timeline entry should get updated after adding activity-----------------

Then('verify that timeline entry should get updated after adding activity',async function(){
    try {
        const saveButton = await driver.findElement(By.xpath('//sm-button/sm-element//button[@id="btnSubmit"]//span[.=" Save "]'));
        await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
        await driver.executeScript("arguments[0].click();",saveButton);
        await driver.sleep(2000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await timelineTab.click();
        await driver.sleep(2000);
        //get 'Added Activity Timeline Entry' values in 'Activities' tab
        const timelineActivityType = await driver.findElement(By.xpath('//div/div[1]/div[3]/span/span[@class="font-medium"]')).getText();
        console.log("Timeline Activity Type: "+timelineActivityType);
        const timelineActivityTypeVisibility = await driver.findElement(By.xpath('//div/div[1]/div[3]/span/span[@class="font-medium"]')).isDisplayed();
        const timelineTitle = await driver.findElement(By.xpath('//div/timeline-activity//a')).getText();
        console.log("Timeline Title: "+timelineTitle);
        const timelineTitleVisibility = await driver.findElement(By.xpath('//div/timeline-activity//a')).isDisplayed();
        if((timelineActivityTypeVisibility && timelineTitleVisibility) === true) {
            console.log("As added activity details are visible under 'Activities' tab,so test case has been passed");
        } else {
            await assert.fail("As added activity details are not visible under 'Activities' tab,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'timeLineEntry_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 5: As a User, Verify validation message for required activity fields------------------------

Then('verify activity with adding blank data',async function(dataTable){
    try {
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
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check validation message as {string}',async function(expectedValidation){
   try {
       const saveButton = await driver.findElement(By.xpath('//sm-button/sm-element//button[@id="btnSubmit"]//span[.=" Save "] | //sm-log-activity//form//div[@class="pull-right"]/button[1]'));
       await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
       await driver.executeScript("arguments[0].click();",saveButton);
       await driver.sleep(1000);
       //check 'Validation' message
       const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
       strictEqual(actualValidation,expectedValidation);
       console.log("As actual and expected validation is equal,so test case has been passed");
       await driver.sleep(1000);
       const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
       await moduleIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'validationMessage_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//------------Case 6: As a User, Verify that current contact should be display filled in associated contact-------------

Then('verify that current contact should be display filled in associated contact',async function(){
    try {
        //get 'Current Contact Name'
        const currentContactName = await driver.findElement(By.xpath('//sm-deal-detail-header//div[@class="mid-content"]/div/div[1]/div')).getText();
        console.log("Current Contact Name: "+currentContactName);
        //get 'Associated Contact Name'
        const associatedContactName = await driver.findElement(By.xpath('//a[@class="name m-r-xs text-ellipsis"]')).getText();
        console.log("Associated Contact Name: "+associatedContactName);
        if(currentContactName === associatedContactName) {
            console.log("As 'Current Contact' is added to 'Associate Contact' section and are equal,so test case has been passed");
        } else {
            await assert.fail("As 'Current Contact' is not added to 'Associate Contact' section and are not equal,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associateContact_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------Case 7: As a User, Verify that user should be able to set recurrence---------------------------

Then('verify that user should be able to set recurrence',async function(dataTable){
   try {
       //will travel provided fields and data list
       for(let i=0; i<dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'title') {
               titleFieldData = dataTable.rawTable[i][1];

               //will check that the data for the title field dropdown field is given or not
               if (titleFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the title field dropdown field, the test case execution has been aborted');
               }

               //will find 'Title' field and pass the new data
               const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
               await clearFieldDataObj.clearFieldData(titleField);
               await titleField.sendKeys(titleFieldData);
               await driver.sleep(500);
           } else if (fieldName == 'repeat') {
               repeatData = dataTable.rawTable[i][1];

               //will check that the data for the repeat field dropdown field is given or not
               if (repeatData == '') {
                   await assert.fail('Due to the blank value is provided for the repeat field dropdown field, the test case execution has been aborted');
               }

               //will select the provided new dropdown value from the 'Repeat' dropdown list
               await driver.sleep(1000);
               const recurrence = await driver.findElement(By.xpath('//a[text()=", Recurrence"]'));
               await driver.executeScript("arguments[0].scrollIntoView();",recurrence);
               await driver.executeScript("arguments[0].click();",recurrence);
               await driver.sleep(600);
               await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'recurrence',repeatData,'no');
               await driver.sleep(1000);
           }
       }
   } catch (err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'recurrence_NotSet.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('check generated recurrence notification',async function(){
    try {
        const saveButton = await driver.findElement(By.xpath('//sm-button/sm-element//button[@id="btnSubmit"]//span[.=" Save "]'));
        await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
        await driver.executeScript("arguments[0].click();",saveButton);
        await driver.sleep(2000);
        await driver.navigate().refresh();
        await driver.sleep(6000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await timelineTab.click();
        await driver.sleep(2000);
        await addActivityElementsObj.findActivityName(driver,'Bound Call');
        //get 'Recurrence' notification in 'Activity Details' page
        const activityQuickViewPageRecurrence = await driver.findElement(By.xpath('//activity-quick-view-header//div[@class="pull-left"]')).getText();
        console.log("Activity Quick View Page Recurrence Notification: "+activityQuickViewPageRecurrence);
        const closeIcon = await addActivityElementsObj.findActivityQuickViewCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'recurrence_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------Case 7: As a User, Verify user able to change the owner from 'Owner' field--------------------

Then('verify user able to change the owner field',async function(dataTable){
   try {
       //get 'Owner' value before updating
       const ownerElement = await formElementsObj.findDropdown(driver,screenshotPath,'owner');
       const ownerNameBeforeUpdation = await ownerElement.getText();
       console.log("Owner Name Before Updation: "+ownerNameBeforeUpdation);
       //will travel provided fields and data list
       for(let i=0; i<dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'title') {
               titleFieldData = dataTable.rawTable[i][1];

               //will check that the data for the title field dropdown field is given or not
               if (titleFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the title field dropdown field, the test case execution has been aborted');
               }

               //will find 'Title' field and pass the new data
               const titleField = await formElementsObj.findElementById(driver, screenshotPath, 'title', 'titleField');
               await clearFieldDataObj.clearFieldData(titleField);
               await titleField.sendKeys(titleFieldData);
               await driver.sleep(500);
           } else if (fieldName == 'owner') {
               ownerDropdownData = dataTable.rawTable[i][1];

               //will check that the data for the owner dropdown field is given or not
               if (ownerDropdownData == '') {
                   await assert.fail('Due to the blank value is provided for the owner dropdown field, the test case execution has been aborted');
               }

               //will select the provided new dropdown value from the 'Owner' dropdown list
               await driver.sleep(1000);
               await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'owner',ownerDropdownData,'no');
               await driver.sleep(500);
           }
       }
       const saveButton = await driver.findElement(By.xpath('//sm-button/sm-element//button[@id="btnSubmit"]//span[.=" Save "]'));
       await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
       await driver.executeScript("arguments[0].click();",saveButton);
       await driver.sleep(2000);
       await driver.navigate().refresh();
       await driver.sleep(6000);
       const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
       await timelineTab.click();
       await driver.sleep(2000);
       //get 'Owner' value after updating
       const ownerNameAfterUpdation = await driver.findElement(By.xpath('//timeline-activity/div/div[1]/div[3]/span/span[@class="default-text"]')).getText();
       console.log("Owner Name After Updation: "+ownerNameAfterUpdation);
       if (ownerNameBeforeUpdation !== ownerNameAfterUpdation) {
           console.log("As after changing owner is updated,so test case has been passed");
       } else {
           await assert.fail("As even after changing owner is not updated,so test case has been aborted");
       }
       const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
       await driver.executeScript("arguments[0].click();",moduleIcon);
       await driver.executeScript("arguments[0].click();",moduleIcon);
       await driver.sleep(1500);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'ownerDropdown_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//------Case 8: As a User, Verify 'Add Activity' tab should not be visible to user if user don't have rights for activity module------

Then('add activity tab is not visible as {string} is disabled and log in through {string}',async function(activityAddRight,adminUser){
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const activityTab = await driver.findElements(By.xpath('//ul[@class="nav nav-tabs"]//a[text()="Add Activity"]'));
        const activityTabLength = await activityTab.length;
        if (activityTabLength === 0) {
            console.log("As activity tab length is " + activityTabLength + " so it is not displayed after disabling activity module add right,so test case has been passed");
        } else {
            await assert.fail("As activity tab length is " + activityTabLength + " so it is displayed after disabling activity module add right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Profile Permissions' tab
        const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Profile Permissions ');
        //will set focus on the 'Profile Permissions' tab
        await driver.executeScript("arguments[0].scrollIntoView();",profilePermissionsTab[0]);
        await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
        //will click on the 'Profile Permissions' tab
        await profilePermissionsTab[0].click();
        await driver.sleep(1000);
        const editButton = await moduleElementsObj.findEditButton(driver);
        await editButton.click();
        await driver.sleep(2000);
        await moduleElementsObj.enableOrDisableToggleButtons(driver,[activityAddRight],'enable');
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','Save Button');
        await saveButton.click();
        await driver.sleep(3000);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------------------Case 10: As a User, Verify user able to delete the activity from company timeline entry---------------------

Then('verify user able to delete activity from company timeline entry and verify {string} message',async function(expectedNotification) {
    try {
        const deleteIcon = await addActivityElementsObj.findDeleteIcon(driver,1);
        await driver.executeScript("arguments[0].click();",deleteIcon);
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3500);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 11: As a User, Verify user able to add the note to activity in company timeline entry---------------------

Then('verify user able to add note as {string} to activity and check {string} message',async function(noteTextData,expectedNotification) {
    try {
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await timelineTab.click();
        await driver.sleep(2000);
        const noteText = await addActivityElementsObj.findNoteText(driver,1);
        await noteText.click();
        await driver.sleep(1000);
        const noteTextArea = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]/div'));
        await driver.executeScript("arguments[0].focus();",noteTextArea);
        await driver.executeScript("arguments[0].click();",noteTextArea);
        //await driver.executeScript("arguments[0].setAttribute('value', arguments[1])", noteTextArea, "textToEnter");
        await noteTextArea.sendKeys(noteTextData);
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ')
        await driver.executeScript("arguments[0].scrollIntoView();",saveButton);
        await driver.executeScript("arguments[0].click();",saveButton);
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3500);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 12: As a User, Verify user able to close or re-open the activity from timeline entry---------------------

Then('verify user able to close or re-open activity and check {string} and {string} messages',async function(expectedMessage,expectedNotification) {
    try {
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await timelineTab.click();
        await driver.sleep(2000);
        const completeIcon = await addActivityElementsObj.findCompleteOrReOpenIcon(driver,1);
        await completeIcon.click();
        await driver.sleep(1500);
        const outcome = await addActivityElementsObj.findOutcome(driver,2);
        await driver.executeScript("arguments[0].click();",outcome);
        await driver.sleep(1500);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const actualMessageElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualMessageElement));
        const actualMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualMessage, expectedMessage);
        await driver.sleep(3500);
        const reOpenIcon = await addActivityElementsObj.findCompleteOrReOpenIcon(driver,1);
        await reOpenIcon.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3500);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 13: As a User, Verify user able to see the quick view of activity from company timeline entry---------------------

Then('verify user able to see the quick view of activity from company timeline entry',async function() {
    try {
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Activities');
        await timelineTab.click();
        await driver.sleep(2000);
        const activityName = await addActivityElementsObj.findActivityName(driver,'Test Call');
        await activityName.click();
        await driver.sleep(2500);
        const quickView = await driver.findElements(By.xpath('//quick-view-activity//activity-quick-view-header'));
        const quickViewLength = await quickView.length;
        console.log(quickViewLength);
        if (quickViewLength > 0) {
            console.log("As quick view is opened after clicking on the name of activity,so test case has been passed");
        } else {
            await assert.fail("As quick view is not opened even after clicking on the name of activity,so test case has been aborted");
        }
        const closeIcon = await addActivityElementsObj.findActivityQuickViewCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
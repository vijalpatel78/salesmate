const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/05_bulkOperations/04_bulkActivity/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');

let ownerDropdownData = 'no', textFieldData = 'no', textAreaFieldData = 'no', titleFieldData = 'no', typeDropdownData = 'no',
dueDateFieldData = 'no', durationFieldData = 'no', tagsFieldData = 'no', activityCountBeforeAddingLength = 'no';

When('user is on create activity dialog',async function() {
    try {
        await driver.sleep(1000);
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckbox.click();
        await driver.sleep(1000);
        const activityButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Create Activities ');
        await activityButton.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 2: As a user, I will create bulk activities with call type by adding all data-----------------

Then('verify activities count before adding on listing page',async function(){
    try {
        const activityIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_activity');
        await driver.executeScript("arguments[0].click();,",activityIcon);
        await driver.sleep(2000);
        //get 'Activities' count after adding
        const activityCountBeforeAdding = await driver.findElements(By.xpath('//a[@class="text-ellipsis"]'));
        activityCountBeforeAddingLength = await activityCountBeforeAdding.length;
        const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await dealIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user will create bulk activities with call type by adding all data',async function(dataTable){
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the title field is given or not
                if (ownerDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the title field, the test case execution has been aborted');
                }

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver, screenshotPath, 'title', 'titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'type') {
                typeDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the type field dropdown field is given or not
                if (typeDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the type field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Type' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'type', typeDropdownData, 'no');
            } else if (fieldName == 'due date') {
                dueDateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the due date field is given or not
                if (dueDateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the due date field, the test case execution has been aborted');
                }

                //will find 'Due Date' field and pass the new data
                const dueDateField = await driver.findElement(By.xpath('//div[@id="dateAndTimedatePairContainer"]/div[1]/div[1]/input'));
                await clearFieldDataObj.clearFieldData(dueDateField);
                await dueDateField.sendKeys(dueDateFieldData);
                await driver.sleep(500);
                await driver.findElement(By.id('intCustomField1')).click();
                await driver.sleep(500);
            } else if (fieldName == 'duration') {
                durationFieldData = dataTable.rawTable[i][1];

                //will check that the data for the duration field is given or not
                if (durationFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the duration field, the test case execution has been aborted');
                }

                //will find 'Duration' field and pass the new data
                const durationField = await driver.findElement(By.xpath('//div[@id="dateAndTimedatePairContainer"]/div[1]/div[2]/input'));
                await clearFieldDataObj.clearFieldData(durationField);
                await durationField.sendKeys(durationFieldData);
                await driver.sleep(500);
                await driver.findElement(By.id('intCustomField1')).click();
                await driver.sleep(1000);
            } else if (fieldName == 'text area') {
                textAreaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text area field is given or not
                if (textAreaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text area field, the test case execution has been aborted');
                }

                //will find 'Text Area' field and pass the new data
                const textAreaField = await formElementsObj.findElementById(driver,screenshotPath, 'textAreaCustomField1','textAreaField');
                await clearFieldDataObj.clearFieldData(textAreaField);
                await textAreaField.sendKeys(textAreaFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'owner') {
                ownerDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the owner field dropdown field is given or not
                if (ownerDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the owner field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Owner' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerDropdownData, 'no');
            } else if (fieldName == 'tags') {
                tagsFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required tags field is given or not
                if (tagsFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
                }

                //will find 'Tags' field and pass the new data
                const tagsField = await driver.findElement(By.xpath('//sm-tag//ro-tag/div[@class="ro-tag-autocomplete"]/input'));
                await clearFieldDataObj.clearFieldData(tagsField);
                await tagsField.sendKeys(tagsFieldData);
                await driver.sleep(500);
            }
        }
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveBulkSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify added activities on listing page',async function(){
   try {
       const activityIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_activity');
       await activityIcon.click();
       await driver.sleep(2000);
       //get 'Activities' count after adding
       const activityCountAfterAdding = await driver.findElements(By.xpath('//a[@class="text-ellipsis"]'));
       const activityCountAfterAddingLength = await activityCountAfterAdding.length;
       if ((activityCountBeforeAddingLength)+1 === activityCountAfterAddingLength) {
           console.log("As activity count is increased by (X+1),so activity has been added,so test case has been passed");
       } else {
           await assert.fail("As activity count is not increased by (X+1),so activity has not been added,so test case has been aborted");
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------------Case 3: As a user, I able to see some default field value in the activity creation pop up----------------

When('user able to see default field value as {string} in activity creation pop up',async function(defaultValue){
    try {
        const title = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
        const titleText = await title.getAttribute('value');
        console.log("Title Field: "+titleText);
        await driver.sleep(1500);
        try {
            strictEqual(titleText, defaultValue);
        } catch(err) {
            await assert.fail(err);
        }
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveBulkSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(3000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 5: As a user, I should able to see any field of "contact","company" and "deal" using show merge link in the "title" and "description" text box-----

When('user able to see any field of "contact","company" and "deal" using show merge link in the "title" and "description" text box',async function(){
    try {
        await driver.sleep(1000);
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckbox.click();
        await driver.sleep(1000);
        const dealCheckboxElement = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckboxElement.click();
        await driver.sleep(1000);
        const activityButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Create Activities ');
        await activityButton.click();
        await driver.sleep(1500);
        const titleMergeFields = await driver.findElement(By.xpath('//div[@class="activity-form-wrapper p-b-none"]/div[1]/div/a/span'));
        await titleMergeFields.click();
        await driver.sleep(1500);
        const idMergeField = await driver.findElement(By.xpath('//div[1]/div/popper-content/div[@role="popper"]//insert-field-popper//ul/li[1]'));
        await idMergeField.click();
        await driver.sleep(1500);
        const titleMergeField = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("ID Merge Field is :"+titleMergeField);
        const noteMergeFields = await driver.findElement(By.xpath('//div/form//a[@class="m-l-xs m-t-xs"]/span'));
        await noteMergeFields.click();
        await driver.sleep(1500);
        const noteMergeField = await driver.findElement(By.xpath('//div[4]/span/popper-content/div[@role="popper"]//insert-field-popper//ul/li[2]'));
        await noteMergeField.click();
        await driver.sleep(1500);
        const titleMergeFieldValue = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Title Merge Field Value is :"+titleMergeFieldValue);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------Case 6: As a user, I Verify save & cancel button functionality on creating bulk new Activity--------------------------------

When('verify save button functionality on creating bulk new Activity',async function(dataTable){
    try {
        await driver.sleep(1000);
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckbox.click();
        await driver.sleep(1000);
        const dealCheckboxElement = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckboxElement.click();
        await driver.sleep(1000);
        const activityButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Create Activities ');
        await activityButton.click();
        await driver.sleep(1500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'owner') {
                ownerDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the owner field dropdown field is given or not
                if (ownerDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the owner field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Owner' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerDropdownData, 'no');
            } else if (fieldName == 'text field') {
                textFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text field is given or not
                if (textFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
                }

                //will find 'Text' field and pass the new data
                const textField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField1','textField');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text area field') {
                textAreaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text area field is given or not
                if (textAreaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text area field, the test case execution has been aborted');
                }

                //will find 'Text Area' field and pass the new data
                const textAreaField = await formElementsObj.findElementById(driver,screenshotPath, 'textAreaCustomField1','textAreaField');
                await clearFieldDataObj.clearFieldData(textAreaField);
                await textAreaField.sendKeys(textAreaFieldData);
                await driver.sleep(500);
            }
        }
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveBulkSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify cancel button functionality on creating bulk new Activity',async function(){
   try {
       await driver.sleep(1000);
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
       await driver.manage().setTimeouts({implicit: 2000});
       //check visibility of 'Create Activity' dialog
       const createActivityDialogElement = await driver.findElements(By.xpath('//h4[contains(text(),"Create activity")]'));
       const createActivityDialogLength = await createActivityDialogElement.length;
       console.log(createActivityDialogLength);
       if (createActivityDialogLength === 0) {
           console.log("As create activity dialog length is " + createActivityDialogLength + " so create activity dialog is closed,so test case has been passed");
       } else {
           await assert.fail("As create activity length is " + createActivityDialogLength + " so create activity dialog is not closed,so test case has been aborted");
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----Case 8: As a user, I should able to do create activity with company variable using show merge field in the "title" and "description" text box------

When('user able to do create activity with company variable using show merge field in the "title" and "description" text box',async function(){
    try {
        const titleMergeFields = await driver.findElement(By.xpath('//div[@class="activity-form-wrapper p-b-none"]/div[1]/div/a/span'));
        await titleMergeFields.click();
        await driver.sleep(1500);
        const companyModule = await driver.findElement(By.xpath('(//button[text()=" Company "])[1]'));
        await companyModule.click();
        await driver.sleep(1500);
        const companyName = await driver.findElement(By.xpath('//div[1]/div/popper-content/div[@role="popper"]//insert-field-popper//ul/li[2]'));
        await companyName.click();
        await driver.sleep(1500);
        const titleMergeField = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Title Merge Field is :"+titleMergeField);
        const noteMergeFields = await driver.findElement(By.xpath('//div/form//a[@class="m-l-xs m-t-xs"]/span'));
        await noteMergeFields.click();
        await driver.sleep(1500);
        const companyModuleElement = await driver.findElement(By.xpath('(//button[text()=" Company "])[2]'));
        await companyModuleElement.click();
        await driver.sleep(1500);
        const searchField = await driver.findElement(By.xpath('//div[4]/span/popper-content/div[@role="popper"]//insert-field-popper//form//input'));
        await searchField.sendKeys('Zip');
        await driver.sleep(700);
        const companyZipCode = await driver.findElement(By.xpath('//div[4]/span/popper-content/div[@role="popper"]//insert-field-popper//li'));
        await companyZipCode.click();
        await driver.sleep(1500);
        const noteMergeField = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Note Merge Field is :"+noteMergeField);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveBulkSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 9: As a user, I should able to do create activity with contact variable using show merge field in the "title" and "description" text box------

When('user able to do create activity with contact variable using show merge field in the "title" and "description" text box',async function(){
    try {
        const titleMergeFields = await driver.findElement(By.xpath('//div[@class="activity-form-wrapper p-b-none"]/div[1]/div/a/span'));
        await titleMergeFields.click();
        await driver.sleep(1500);
        const contactModule = await driver.findElement(By.xpath('(//button[text()=" Contact "])[1]'));
        await contactModule.click();
        await driver.sleep(1500);
        const contactJobTitle = await driver.findElement(By.xpath('//div[1]/div/popper-content/div[@role="popper"]//insert-field-popper//ul/li[5]'));
        await contactJobTitle.click();
        await driver.sleep(1500);
        const titleMergeField = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Title Merge Field is :"+titleMergeField);
        const noteMergeFields = await driver.findElement(By.xpath('//div/form//a[@class="m-l-xs m-t-xs"]/span'));
        await noteMergeFields.click();
        await driver.sleep(1500);
        const contactModuleElement = await driver.findElement(By.xpath('(//button[text()=" Contact "])[2]'));
        await contactModuleElement.click();
        await driver.sleep(1500);
        const contactMobile = await driver.findElement(By.xpath('//div[4]/span/popper-content/div[@role="popper"]//insert-field-popper//ul/li[3]'));
        await contactMobile.click();
        await driver.sleep(1500);
        const noteMergeField = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Note Merge Field is :"+noteMergeField);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveBulkSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 10: As a user, I should able to do create activity with deal variable using show merge field in the "title" and "description" text box------

When('user able to do create activity with deal variable using show merge field in the "title" and "description" text box',async function(){
    try {
        const titleMergeFields = await driver.findElement(By.xpath('//div[@class="activity-form-wrapper p-b-none"]/div[1]/div/a/span'));
        await titleMergeFields.click();
        await driver.sleep(1500);
        const dealModule = await driver.findElement(By.xpath('(//button[text()=" Deal "])[1]'));
        await dealModule.click();
        await driver.sleep(1500);
        const dealValue = await driver.findElement(By.xpath('//div[1]/div/popper-content/div[@role="popper"]//insert-field-popper//ul/li[6]'));
        await dealValue.click();
        await driver.sleep(1500);
        const titleMergeField = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Title Merge Field is :"+titleMergeField);
        const noteMergeFields = await driver.findElement(By.xpath('//div/form//a[@class="m-l-xs m-t-xs"]/span'));
        await noteMergeFields.click();
        await driver.sleep(1500);
        const dealModuleElement = await driver.findElement(By.xpath('(//button[text()=" Deal "])[2]'));
        await dealModuleElement.click();
        await driver.sleep(1500);
        const dealLostReason = await driver.findElement(By.xpath('//div[4]/span/popper-content/div[@role="popper"]//insert-field-popper//li[4]'));
        await dealLostReason.click();
        await driver.sleep(1500);
        const noteMergeField = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Note Merge Field is :"+noteMergeField);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveBulkSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
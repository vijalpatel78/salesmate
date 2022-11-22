const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/05_bulkOperations/01_bulkUpdate/screenshots/';
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const commonElementsObj = require('../../../../00_common/webElements/formElements');

let selectField01Data = 'no', bigIntegerFieldData = 'no', selectField02Data = 'no', booleanState = 'no', selectField03Data = 'no', currencyFieldData = 'no',
selectField04Data = 'no', dateFieldData = 'no', selectField05Data = 'no', dateAndTimeFieldData = 'no', selectField06Data = 'no', decLabelData = 'no',
selectField07Data = 'no', descriptionFieldData = 'no', selectField08Data = 'no', estimatedCloseDateFieldData = 'no', selectField09Data = 'no',
integerFieldData = 'no', selectField10Data = 'no', multiSelectFieldData = 'no', selectField11Data = 'no', ownerFieldData = 'no', selectField12Data = 'no', percentageFieldData = 'no',
selectField13Data = 'no', pipelineFieldData = 'no', selectField14Data = 'no', priorityFieldData = 'no', selectField15Data = 'no', selectFieldData = 'no',
selectField16Data = 'no', sourceFieldData = 'no', selectField17Data = 'no', statusFieldData = 'no', selectField18Data = 'no', tagsFieldData = 'no',
selectField19Data = 'no', textAreaFieldData = 'no', selectField20Data = 'no', textFieldData = 'no', selectField21Data = 'no', titleFieldData = 'no',
selectField22Data = 'no', urlFieldData = 'no', selectField23Data = 'no', valueFieldData = 'no',

bigIntegerUpdatedValue, booleanUpdatedValue, currencyFieldUpdatedValue, dateUpdatedValue, dateAndTimeUpdatedValue,
decimalUpdatedValue, descriptionUpdatedValue, estimatedCloseDateUpdatedValue = 'no', integerUpdatedValue,
multiSelectUpdatedValue, ownerUpdatedValue, percentageUpdatedValue,  pipelineFieldUpdatedValue, priorityFieldUpdatedValue, selectLabelUpdatedValue,
sourceUpdatedValue, statusUpdatedValue, tagUpdatedValue, textAreaUpdatedValue, textUpdatedValue, titleUpdatedValue, stateUpdatedValue,
urlUpdatedValue, valueUpdatedData;

When('user is on deals listing page',async function() {
    try {
        const dealModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",dealModule);
        await driver.sleep(2500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 3: As a user, I should be able to Bulk update deals from deals listing screen------------------

When('user is able to Bulk update deals from deals listing screen',async function(dataTable) {
    try {
        await driver.sleep(1000);
        let expectedNotification = 'Record(s) updated successfully';
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckbox.click();
        await driver.sleep(1000);
        const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
        await updateButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'select field01') {
                selectField01Data = dataTable.rawTable[i][1];
                bigIntegerFieldData = dataTable.rawTable[i][2];

                //will check that the data for the required big integer field is given or not
                if (bigIntegerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required big integer field, the test case execution has been aborted');
                }
                //select 'Big Integer' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField01Data, 'yes');
                //will find 'Big Integer' field and pass the new data
                const bigIntegerField = await formElementsObj.findElementById(driver,screenshotPath,'bigIntCustomField1','bigIntegerField');
                await clearFieldDataObj.clearFieldData(bigIntegerField);
                await bigIntegerField.sendKeys(bigIntegerFieldData);
                await driver.sleep(500);
                //get updated value of 'Big Integer'
                bigIntegerUpdatedValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
                console.log(bigIntegerUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field02') {
                selectField02Data = dataTable.rawTable[i][1];
                booleanState = dataTable.rawTable[i][2];

                const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(1000);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();
                await driver.sleep(1000);

                //select 'Boolean Label' dropdown to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField02Data, 'yes');
                //select value of 'Boolean Label'
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'checkboxCustomField1', booleanState, 'no');
                //get updated value of 'Boolean Label'
                const booleanStateElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'checkboxCustomField1');
                booleanUpdatedValue = await booleanStateElement.getText();
                console.log(booleanUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field03') {
                selectField03Data = dataTable.rawTable[i][1];
                currencyFieldData = dataTable.rawTable[i][2];

                //will check that the data for the date label field is given or not
                if (currencyFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the currency field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(1000);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();
                await driver.sleep(1000);

                //select 'Currency Field' to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField03Data, 'yes');
                //will find 'Currency' field and pass the new data
                const currencyField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField3','currencyField');
                await clearFieldDataObj.clearFieldData(currencyField);
                await currencyField.sendKeys(currencyFieldData);
                await driver.sleep(500);
                //get updated value of 'Currency'
                currencyFieldUpdatedValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
                console.log(currencyFieldUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            }
            // else if (fieldName == 'select field04') {
            //     selectField04Data = dataTable.rawTable[i][1];
            //     dateFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the date field is given or not
            //     if (dateFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the date field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Date' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField04Data, 'yes');
            //     //will find 'Date' field and pass the new data
            //     const dateField = await formElementsObj.findElementById(driver,screenshotPath, 'dateCustomField1','dateField');
            //     await clearFieldDataObj.clearFieldData(dateField);
            //     await dateField.sendKeys(dateFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Date'
            //     dateUpdatedValue = await driver.findElement(By.id('dateCustomField1')).getAttribute('value');
            //     console.log(dateUpdatedValue);
            //     await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
            //     await driver.sleep(1000);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field05') {
            //     selectField05Data = dataTable.rawTable[i][1];
            //     dateAndTimeFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the date and time label field is given or not
            //     if (dateAndTimeFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the date and time label field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Date And Time Label' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField05Data, 'yes');
            //     //will find 'Date And Time Label' field and pass the new data
            //     const dateAndTimeField = await formElementsObj.findElementById(driver,screenshotPath,'dateTimeCustomField1','dateT');
            //     await clearFieldDataObj.clearFieldData(dateAndTimeField);
            //     await dateAndTimeField.sendKeys(dateAndTimeFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Date And Time Label'
            //     dateAndTimeUpdatedValue = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
            //     console.log(dateAndTimeUpdatedValue);
            //     await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
            //     await driver.sleep(1000);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field06') {
            //     selectField06Data = dataTable.rawTable[i][1];
            //     decLabelData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required decimal field is given or not
            //     if (decLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required decimal field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Decimal' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField06Data, 'yes');
            //     //will find 'Decimal' field and pass the new data
            //     const decLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField1','decimalField');
            //     await clearFieldDataObj.clearFieldData(decLabelField);
            //     await decLabelField.sendKeys(decLabelData);
            //     await driver.sleep(500);
            //     //get updated value of 'Decimal'
            //     decimalUpdatedValue = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
            //     console.log(decimalUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field07') {
            //     selectField07Data = dataTable.rawTable[i][1];
            //     descriptionFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required description field is given or not
            //     if (descriptionFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Description Label' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField07Data, 'yes');
            //     //will find 'Description' field and pass the new data
            //     const descriptionField = await formElementsObj.findElementById(driver,screenshotPath, 'description','descriptionField');
            //     await clearFieldDataObj.clearFieldData(descriptionField);
            //     await descriptionField.sendKeys(descriptionFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Description Label'
            //     descriptionUpdatedValue = await driver.findElement(By.id('description')).getAttribute('value');
            //     console.log(descriptionUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // }
            // else if (fieldName == 'select field08') {
            //     selectField08Data = dataTable.rawTable[i][1];
            //     estimatedCloseDateFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required estimated close date field is given or not
            //     if (estimatedCloseDateFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required estimated close date field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Estimated Close Date' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField08Data, 'yes');
            //     //will find 'Estimated Close Date' field and pass the new data
            //     const estimatedCloseDateField = await formElementsObj.findElementById(driver,screenshotPath, 'estimatedCloseDate','estimatedCloseDateField');
            //     await clearFieldDataObj.clearFieldData(estimatedCloseDateField);
            //     await estimatedCloseDateField.sendKeys(estimatedCloseDateFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Facebook'
            //     estimatedCloseDateUpdatedValue = await driver.findElement(By.id('estimatedCloseDate')).getAttribute('value');
            //     console.log(estimatedCloseDateUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field09') {
            //     selectField09Data = dataTable.rawTable[i][1];
            //     integerFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required integer field is given or not
            //     if (integerFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required integer field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Integer' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField09Data, 'yes');
            //     //will find 'Integer' field and pass the new data
            //     const integerField = await formElementsObj.findElementById(driver,screenshotPath, 'intCustomField1','integerField');
            //     await clearFieldDataObj.clearFieldData(integerField);
            //     await integerField.sendKeys(integerFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Integer'
            //     integerUpdatedValue = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
            //     console.log(integerFieldData);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field10') {
            //     selectField10Data = dataTable.rawTable[i][1];
            //     multiSelectFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the multi select dropdown is given or not
            //     if (multiSelectFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the multi select dropdown, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Multi Select Label' to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField10Data, 'yes');
            //     //will select the provided new dropdown value from the 'Multi Select Label' dropdown list
            //     await driver.sleep(1000);
            //     await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
            //     await driver.findElement(By.xpath(`//li[text()="M2"]`)).click();
            //     await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
            //     await driver.sleep(500);
            //     //get updated value of 'Multi Select Label'
            //     multiSelectUpdatedValue = await driver.findElement(By.xpath('//span[@role="combobox"]/ul/li[1]')).getText();
            //     console.log(multiSelectUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field11') {
            //     selectField11Data = dataTable.rawTable[i][1];
            //     ownerFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required owner field is given or not
            //     if (ownerFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required owner field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Owner' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField11Data, 'yes');
            //     //will find 'Owner' field and pass the new data
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldData, 'no');
            //     //get updated value of 'Owner' Field
            //     ownerUpdatedValue = await driver.findElement(By.id('owner')).getAttribute('value');
            //     console.log(ownerUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field12') {
            //     selectField12Data = dataTable.rawTable[i][1];
            //     percentageFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required percentage field is given or not
            //     if (percentageFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required percentage field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Percentage' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField12Data, 'yes');
            //     //will find 'Percentage Label' field and pass the new data
            //     const percentageField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField2','percentageField');
            //     await clearFieldDataObj.clearFieldData(percentageField);
            //     await percentageField.sendKeys(percentageFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Percentage' Label
            //     percentageUpdatedValue = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
            //     console.log(percentageUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field13') {
            //     selectField13Data = dataTable.rawTable[i][1];
            //     pipelineFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required pipeline field is given or not
            //     if (pipelineFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required pipeline field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Pipeline' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField13Data, 'yes');
            //     //will select the provided new dropdown value from the 'Pipeline' dropdown list
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'pipeline', pipelineFieldData, 'yes');
            //     //get updated value of 'Pipeline'
            //     const selectElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'pipeline');
            //     pipelineFieldUpdatedValue = await selectElement.getText();
            //     console.log(pipelineFieldUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field14') {
            //     selectField14Data = dataTable.rawTable[i][1];
            //     priorityFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required priority field is given or not
            //     if (priorityFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required priority field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Priority' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField14Data, 'no');
            //     //will select the provided new dropdown value from the 'Priority' dropdown list
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'priority', priorityFieldData, 'no');
            //     //get updated value of 'Priority'
            //     const selectElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'priority');
            //     priorityFieldUpdatedValue = await selectElement.getText();
            //     console.log(priorityFieldUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field15') {
            //     selectField15Data = dataTable.rawTable[i][1];
            //     selectFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the select dropdown field is given or not
            //     if (selectFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the select dropdown field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Select' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField15Data, 'yes');
            //     //will select the provided new dropdown value from the 'Select Label' dropdown list
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'textCustomField4', selectFieldData, 'yes');
            //     //get updated value of 'Select Label'
            //     const selectElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'textCustomField4');
            //     selectLabelUpdatedValue = await selectElement.getText();
            //     console.log(selectLabelUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field16') {
            //     selectField16Data = dataTable.rawTable[i][1];
            //     sourceFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the source dropdown field is given or not
            //     if (sourceFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the source dropdown field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Source' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField16Data, 'yes');
            //     //will select the provided new dropdown value from the 'Source' dropdown list
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'source', selectFieldData, 'yes');
            //     //get updated value of 'Source'
            //     const sourceElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'source');
            //     sourceUpdatedValue = await sourceElement.getText();
            //     console.log(sourceUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field17') {
            //     selectField17Data = dataTable.rawTable[i][1];
            //     statusFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the status dropdown field is given or not
            //     if (statusFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the status dropdown field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Status' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField17Data, 'yes');
            //     //will select the provided new dropdown value from the 'Status' dropdown list
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'status', selectFieldData, 'yes');
            //     //get updated value of 'Status'
            //     const statusElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'status');
            //     statusUpdatedValue = await statusElement.getText();
            //     console.log(stateUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field18') {
            //     selectField18Data = dataTable.rawTable[i][1];
            //     tagsFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required tags field is given or not
            //     if (tagsFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Tags' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField18Data, 'yes');
            //     //will find 'Tags' field and pass the new data
            //     const tagsField = await driver.findElement(By.xpath('//sm-element//ro-tag/div[@class="ro-tag-autocomplete"]/input'));
            //     await clearFieldDataObj.clearFieldData(tagsField);
            //     await tagsField.sendKeys(tagsFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Tags'
            //     tagUpdatedValue = await driver.findElement(By.xpath('//sm-element//ro-tag/div[@class="ro-tag-autocomplete"]/input')).getAttribute('value');
            //     console.log(tagUpdatedValue);
            //     await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field19') {
            //     selectField19Data = dataTable.rawTable[i][1];
            //     textAreaFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required text area field is given or not
            //     if (textAreaFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text area field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Text Area' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField19Data, 'yes');
            //     //will find 'Text Area Label' field and pass the new data
            //     const textAreaLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textAreaCustomField1','textAreaField');
            //     await clearFieldDataObj.clearFieldData(textAreaLabelField);
            //     await textAreaLabelField.sendKeys(textAreaFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Text Area Label'
            //     textAreaUpdatedValue = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
            //     console.log(textAreaUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field20') {
            //     selectField20Data = dataTable.rawTable[i][1];
            //     textFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required text field is given or not
            //     if (textFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Text' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField20Data, 'yes');
            //     //will find 'Text' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','textField');
            //     await clearFieldDataObj.clearFieldData(textLabelField);
            //     await textLabelField.sendKeys(textFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Text'
            //     textUpdatedValue = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
            //     console.log(textUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field21') {
            //     selectField21Data = dataTable.rawTable[i][1];
            //     titleFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required title field is given or not
            //     if (titleFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required title field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Title' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField21Data, 'yes');
            //     //will find 'Title' field and pass the new data
            //     const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
            //     await clearFieldDataObj.clearFieldData(titleField);
            //     await titleField.sendKeys(titleFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Title'
            //     titleUpdatedValue = await driver.findElement(By.id('title')).getAttribute('value');
            //     console.log(titleUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field22') {
            //     selectField22Data = dataTable.rawTable[i][1];
            //     urlFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required url field is given or not
            //     if (urlFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required url field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'URL' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField22Data, 'yes');
            //     //will find 'URL' field and pass the new data
            //     const urlField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField5','urlField');
            //     await clearFieldDataObj.clearFieldData(urlField);
            //     await urlField.sendKeys(urlFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'URL'
            //     urlUpdatedValue = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
            //     console.log(urlUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field23') {
            //     selectField23Data = dataTable.rawTable[i][1];
            //     valueFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required value field is given or not
            //     if (valueFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required value field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Value' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField23Data, 'yes');
            //     //will find 'Value' field and pass the new data
            //     const valueField = await formElementsObj.findElementById(driver,screenshotPath, 'dealValue','valueField');
            //     await clearFieldDataObj.clearFieldData(valueField);
            //     await valueField.sendKeys(valueFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Value'
            //     valueUpdatedData = await driver.findElement(By.id('dealValue')).getAttribute('value');
            //     console.log(valueUpdatedData);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // }
        }
        //page navigation and comeback to contact listing page
        // await pageNavigationObj.comeBackToDealListingPage(driver, screenshotPath);
        // await driver.sleep(1000);
        // const checkboxElement = await moduleElementsObj.findContactCheckbox(driver,1);
        // await checkboxElement.click();
        // await driver.sleep(1000);
        // const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        // await previewButton.click();
        // await driver.sleep(2000);
        // console.log("Updated Deal Details after navigation on quick page:");
        // const quickPageTitle = await driver.findElement(By.id('title')).getAttribute('value');
        // console.log(quickPageTitle);
        // const quickPageOwnerText = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
        // const quickPageOwner = await quickPageOwnerText.getText();
        // console.log(quickPageOwner);
        // const quickPageSourceElement =  await commonElementsObj.findDropdown(driver,screenshotPath,'source');
        // const quickPageSource = await quickPageSourceElement.getText();
        // console.log(quickPageSource);
        // const quickPageEstimatedCloseDate = await driver.findElement(By.id('estimatedCloseDate')).getAttribute('value');
        // console.log(quickPageEstimatedCloseDate);
        // const quickPageDealValue = await driver.findElement(By.id('dealValue')).getAttribute('value');
        // console.log(quickPageDealValue);
        // const quickPageCurrencyText = await commonElementsObj.findDropdown(driver,screenshotPath,'currency');
        // const quickPageCurrency = await quickPageCurrencyText.getText();
        // console.log(quickPageCurrency);
        // const quickPagePipelineText = await commonElementsObj.findDropdown(driver,screenshotPath,'pipeline');
        // const quickPagePipeline = await quickPagePipelineText.getText();
        // console.log(quickPagePipeline);
        // const quickPagePriorityText = await commonElementsObj.findDropdown(driver,screenshotPath,'priority');
        // const quickPagePriority = await quickPagePriorityText.getText();
        // console.log(quickPagePriority);
        // const quickPageStatusText = await commonElementsObj.findDropdown(driver,screenshotPath,'status');
        // const quickPageStatus = await quickPageStatusText.getText();
        // console.log(quickPageStatus);
        // const quickPageDescription = await driver.findElement(By.id('description')).getAttribute('value');
        // console.log(quickPageDescription);
        // const quickPageTags = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div/input')).getText();
        // console.log(quickPageTags);
        // const quickPageTextField = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        // console.log(quickPageTextField);
        // const quickPageTextAreaField = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        // console.log(quickPageTextAreaField);
        // const quickPageIntegerField = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        // console.log(quickPageIntegerField);
        // const quickPageDecimalField = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        // console.log(quickPageDecimalField);
        // const quickPageDateField = await driver.findElement(By.id('dateCustomField1')).getAttribute('value');
        // console.log(quickPageDateField);
        // const quickPageDateAndTimeField = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
        // console.log(quickPageDateAndTimeField);
        // const quickPageSelectFieldText = await commonElementsObj.findDropdown(driver, screenshotPath, 'textCustomField4');
        // const quickPageSelectField= await quickPageSelectFieldText.getText();
        // console.log(quickPageSelectField);
        // const quickPageMultiSelectField = await driver.findElement(By.xpath('//span[@role="combobox"]/ul/li[1]')).getText();
        // console.log(quickPageMultiSelectField);
        // const quickPageURLField = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        // console.log(quickPageURLField);
        // const quickPageBigIntField = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        // console.log(quickPageBigIntField);
        // const quickPagePercentageField = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        // console.log(quickPagePercentageField);
        // const quickPageBooleanField = await driver.findElement(By.id('checkboxCustomField1')).getAttribute('value');
        // console.log(quickPageBooleanField);
        // const quickPageCurrencyField = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        // console.log(quickPageCurrencyField);
        // try {
        //     strictEqual(quickPageTitle,titleUpdatedValue);
        //     strictEqual(quickPageOwner, ownerUpdatedValue);
        //     strictEqual(quickPageSource, sourceUpdatedValue);
        //     strictEqual(quickPageEstimatedCloseDate, estimatedCloseDateUpdatedValue);
        //     strictEqual(quickPageDealValue, valueUpdatedData);
        //     strictEqual(quickPagePipeline, pipelineFieldUpdatedValue);
        //     strictEqual(quickPagePriority, priorityFieldUpdatedValue);
        //     strictEqual(quickPageStatus,statusUpdatedValue);
        //     strictEqual(quickPageDescription, descriptionUpdatedValue);
        //     strictEqual(quickPageTags, tagUpdatedValue);
        //     strictEqual(quickPageTextField, textUpdatedValue);
        //     strictEqual(quickPageTextAreaField, textAreaUpdatedValue);
        //     strictEqual(quickPageIntegerField, integerUpdatedValue);
        //     strictEqual(quickPageDecimalField, decimalUpdatedValue);
        //     strictEqual(quickPageDateField, dateUpdatedValue);
        //     strictEqual(quickPageDateAndTimeField, dateAndTimeUpdatedValue);
        //     strictEqual(quickPageSelectField, selectLabelUpdatedValue);
        //     strictEqual(quickPageMultiSelectField, multiSelectUpdatedValue);
        //     strictEqual(quickPageURLField, urlUpdatedValue);
        //     strictEqual(quickPageBigIntField, bigIntegerUpdatedValue);
        //     strictEqual(quickPagePercentageField, percentageUpdatedValue);
        //     strictEqual(quickPageBooleanField, booleanUpdatedValue);
        //     strictEqual(quickPageCurrencyField, currencyFieldUpdatedValue);
        //     console.log("As deal details in update deal page and quick page are equal,so test case has been passed");
        // } catch (err) {
        //     await assert.fail(err);
        // }
        // const preViewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        // await preViewPageCloseIcon.click();
        // await driver.sleep(1500);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deal_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
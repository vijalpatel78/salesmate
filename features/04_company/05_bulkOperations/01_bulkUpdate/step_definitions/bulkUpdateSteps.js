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

let selectField01Data = 'no', addressLine1Data = 'no', selectField02Data = 'no', addressLine2Data = 'no', selectField03Data = 'no', annualRevenueFieldData = 'no',
selectField04Data = 'no', bigIntegerFieldData = 'no', selectField05Data = 'no', booleanState = 'no', selectField06Data = 'no', cityFieldData = 'no',
selectField07Data = 'no', countryFieldData = 'no', selectField08Data = 'no', currencyData = 'no', selectField09Data = 'no', currencyFieldData = 'no',
selectField10Data = 'no', dateFieldData = 'no', selectField11Data = 'no', dateAndTimeFieldData = 'no', selectField12Data = 'no', decLabelData = 'no',
selectField13Data = 'no', descriptionFieldData = 'no', selectField14Data = 'no', facebookFieldData = 'no', selectField15Data = 'no', instagramFieldData = 'no',
selectField16Data = 'no', integerFieldData = 'no', selectField17Data = 'no', linkedInFieldData = 'no', selectField18Data = 'no', multiSelectFieldData = 'no',
selectField19Data = 'no', nameFieldData = 'no', selectField20Data = 'no', numberOfEmployeesData = 'no', selectField21Data = 'no', ownerFieldData = 'no',
selectField22Data = 'no', percentageFieldData = 'no', selectField23Data = 'no', selectFieldData = 'no', selectField24Data = 'no', skypeFieldData = 'no',
selectField25Data = 'no', stateFieldData = 'no', selectField26Data = 'no', tagsFieldData = 'no', selectField27Data = 'no', textAreaFieldData = 'no',
selectField28Data = 'no', textFieldData = 'no', selectField29Data = 'no', twitterFieldData = 'no', selectField30Data = 'no', typeFieldData = 'no', selectField31Data = 'no',
urlFieldData = 'no', selectField32Data = 'no', websiteFieldData = 'no', selectField33Data = 'no', zipCodeFieldData = 'no',
addressLine1UpdatedValue, addressLine2UpdatedValue, annualRevenueUpdatedValue, bigIntegerUpdatedValue, booleanUpdatedValue, cityUpdatedValue, countryUpdatedValue,
currencyUpdatedValue, currencyFieldUpdatedValue, dateUpdatedValue, dateAndTimeUpdatedValue, decimalUpdatedValue, descriptionUpdatedValue,
facebookUpdatedValue, nameUpdatedValue, employeesUpdatedValue, instagramUpdatedValue, integerUpdatedValue,
linkedInUpdatedValue, multiSelectUpdatedValue, ownerUpdatedValue,  percentageUpdatedValue, selectLabelUpdatedValue,
skypeUpdatedValue, stateUpdatedValue, tagUpdatedValue, textAreaUpdatedValue, textUpdatedValue, twitterUpdatedValue, typeUpdatedValue,
urlUpdatedValue, websiteUpdatedValue, zipCodeUpdatedValue;

When('user is on company listing page',async function() {
    try {
        const companyModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await companyModule.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 3: As a user, I should be able to Bulk update companies from companies listing screen---------------

When('user is able to Bulk update companies from companies listing screen',async function(dataTable) {
    try {
        await driver.sleep(1000);
        let expectedNotification = 'Record(s) updated successfully';
        const companyCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await companyCheckbox.click();
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
                addressLine1Data = dataTable.rawTable[i][2];

                //will check that the data for the required address line1 field is given or not
                if (addressLine1Data == '') {
                    await assert.fail('Due to the blank value is provided for the required address line1 field, the test case execution has been aborted');
                }
                //select 'Address Line1' dropdown to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField01Data, 'yes');
                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await formElementsObj.findElementById(driver,screenshotPath, 'billingAddressLine1','addressLine1Field');
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1Data);
                await driver.sleep(500);
                //get updated value of 'Address Line1'
                addressLine1UpdatedValue = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
                console.log(addressLine1UpdatedValue);
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
                addressLine2UpdatedValue = dataTable.rawTable[i][2];

                //will check that the data for the required address line2 field is given or not
                if (addressLine2UpdatedValue == '') {
                    await assert.fail('Due to the blank value is provided for the required address line2 field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(1000);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();
                await driver.sleep(1000);

                //select 'Address Line 2' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField02Data, 'yes');
                //will find 'Address Line 2' field and pass the new data
                const addressLine2Field = await formElementsObj.findElementById(driver,screenshotPath, 'billingAddressLine2','addressLine2Field');
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2Data);
                await driver.sleep(500);
                //get updated value of 'Address Line 2'
                addressLine2UpdatedValue = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
                console.log(addressLine2UpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            }
            // else if (fieldName == 'select field03') {
            //     selectField03Data = dataTable.rawTable[i][1];
            //     annualRevenueFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required annual revenue field is given or not
            //     if (annualRevenueFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required annual revenue field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Annual Revenue' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField02Data, 'yes');
            //     //will find 'Annual Revenue' field and pass the new data
            //     const annualRevenueField = await formElementsObj.findElementById(driver,screenshotPath, 'annualRevenue','addressLine2Field');
            //     await clearFieldDataObj.clearFieldData(annualRevenueField);
            //     await annualRevenueField.sendKeys(annualRevenueFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Annual Revenue'
            //     annualRevenueUpdatedValue = await driver.findElement(By.id('annualRevenue')).getAttribute('value');
            //     console.log(annualRevenueUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field04') {
            //     selectField04Data = dataTable.rawTable[i][1];
            //     bigIntegerFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required big int field is given or not
            //     if (bigIntegerFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required big integer field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Big Integer' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField03Data, 'yes');
            //     //will find 'Big Integer' field and pass the new data
            //     const bigIntegerField = await formElementsObj.findElementById(driver,screenshotPath,'bigIntCustomField1','bigIntegerField');
            //     await clearFieldDataObj.clearFieldData(bigIntegerField);
            //     await bigIntegerField.sendKeys(bigIntegerFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Big Integer'
            //     bigIntegerUpdatedValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
            //     console.log(bigIntegerUpdatedValue);
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
            //     booleanState = dataTable.rawTable[i][2];
            //
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Boolean Label' dropdown to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField04Data, 'yes');
            //     //select value of 'Boolean Label'
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'checkboxCustomField1', booleanState, 'no');
            //     //get updated value of 'Boolean Label'
            //     const booleanStateElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'checkboxCustomField1');
            //     booleanUpdatedValue = await booleanStateElement.getText();
            //     console.log(booleanUpdatedValue);
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
            //     cityFieldData = dataTable.rawTable[i][2];
            //
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'City' field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField05Data, 'yes');
            //     //select value of 'City Field'
            //     const cityField = await formElementsObj.findElementById(driver,screenshotPath, 'billingCity','cityField');
            //     await clearFieldDataObj.clearFieldData(cityField);
            //     await cityField.sendKeys(cityFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'City Field'
            //     const cityElement = await formElementsObj.findElementById(driver,screenshotPath, 'billingCity','cityField');
            //     cityUpdatedValue = await cityElement.getText();
            //     console.log(booleanUpdatedValue);
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
            //     countryFieldData = dataTable.rawTable[i][2];
            //
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Country' field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField07Data, 'yes');
            //     //select value of 'Country'
            //     const countryField = await formElementsObj.findElementById(driver,screenshotPath, 'billingCountry','countryField');
            //     await clearFieldDataObj.clearFieldData(countryField);
            //     await countryField.sendKeys(countryFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Country'
            //     const countryElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'billingCountry');
            //     countryUpdatedValue = await countryElement.getText();
            //     console.log(countryUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field08') {
            //     selectField08Data = dataTable.rawTable[i][1];
            //     currencyData = dataTable.rawTable[i][2];
            //
            //
            //     //will check that the data for the required currency field is given or not
            //     if (currencyData == '') {
            //         await assert.fail('Due to the blank value is provided for the required currency dropdown, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Currency' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField08Data, 'yes');
            //     //will find 'Currency' field and pass the new data
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'currency', currencyFieldData, 'no');
            //     //get updated value of 'Currency'
            //     const currencyElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'currency');
            //     currencyUpdatedValue = await currencyElement.getText();
            //     console.log(currencyUpdatedValue);
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
            //     currencyFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the date label field is given or not
            //     if (dateFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the currency field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Currency Field' to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField09Data, 'yes');
            //     //will find 'Currency' field and pass the new data
            //     const currencyField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField3','currencyField');
            //     await clearFieldDataObj.clearFieldData(currencyField);
            //     await currencyField.sendKeys(currencyFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Currency'
            //     currencyFieldUpdatedValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
            //     console.log(currencyFieldUpdatedValue);
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField10Data, 'yes');
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
            // } else if (fieldName == 'select field11') {
            //     selectField11Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField11Data, 'yes');
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
            // } else if (fieldName == 'select field12') {
            //     selectField12Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField12Data, 'yes');
            //     //will find 'Decimal' field and pass the new data
            //     const decLabelField = await formElementsObj.findElementById(driver, 'decimalCustomField1');
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
            // } else if (fieldName == 'select field13') {
            //     selectField13Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField13Data, 'yes');
            //     //will find 'Description' field and pass the new data
            //     const descriptionField = await formElementsObj.findElementById(driver, 'description');
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
            // } else if (fieldName == 'select field14') {
            //     selectField14Data = dataTable.rawTable[i][1];
            //     facebookFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required facebook field is given or not
            //     if (facebookFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required facebook field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Facebook' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField16Data, 'yes');
            //     //will find 'Facebook' field and pass the new data
            //     const facebookField = await formElementsObj.findElementById(driver, 'facebookHandle');
            //     await clearFieldDataObj.clearFieldData(facebookField);
            //     await facebookField.sendKeys(facebookFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Facebook'
            //     facebookUpdatedValue = await driver.findElement(By.id('facebookHandle')).getAttribute('value');
            //     console.log(facebookUpdatedValue);
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
            //     instagramFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required instagram field is given or not
            //     if (integerFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required instagram field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Instagram' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField19Data, 'yes');
            //     //will find 'Instagram' field and pass the new data
            //     const instagramField = await formElementsObj.findElementById(driver, 'instagramHandle');
            //     await clearFieldDataObj.clearFieldData(instagramField);
            //     await instagramField.sendKeys(instagramFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Instagram'
            //     instagramUpdatedValue = await driver.findElement(By.id('instagramHandle')).getAttribute('value');
            //     console.log(instagramUpdatedValue);
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField20Data, 'yes');
            //     //will find 'Integer' field and pass the new data
            //     const integerField = await formElementsObj.findElementById(driver, 'intCustomField1');
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
            // } else if (fieldName == 'select field17') {
            //     selectField17Data = dataTable.rawTable[i][1];
            //     linkedInFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required linked In field is given or not
            //     if (linkedInFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required linked In field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Linked In' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField23Data, 'yes');
            //     //will find 'Linked In' field and pass the new data
            //     const linkedInField = await formElementsObj.findElementById(driver, 'linkedInHandle');
            //     await clearFieldDataObj.clearFieldData(linkedInField);
            //     await linkedInField.sendKeys(linkedInFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Linked In'
            //     linkedInUpdatedValue = await driver.findElement(By.id('linkedInHandle')).getAttribute('value');
            //     console.log(linkedInUpdatedValue);
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField24Data, 'yes');
            //     //will select the provided new dropdown value from the 'Multi Select Label' dropdown list
            //     await driver.sleep(1000);
            //     await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
            //     await driver.findElement(By.xpath(`//li[text()="${multiSelectLabelDropdownData1}"]`)).click();
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
            // } else if (fieldName == 'select field19') {
            //     selectField19Data = dataTable.rawTable[i][1];
            //     nameFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required name field is given or not
            //     if (nameFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required name field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Name' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField17Data, 'yes');
            //     //will find 'Name' field and pass the new data
            //     const nameField = await formElementsObj.findElementById(driver, 'name');
            //     await clearFieldDataObj.clearFieldData(nameField);
            //     await nameField.sendKeys(nameFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Name'
            //     nameUpdatedValue = await driver.findElement(By.id('name')).getAttribute('value');
            //     console.log(nameUpdatedValue);
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
            //     numberOfEmployeesData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required number of employees field is given or not
            //     if (numberOfEmployeesData == '') {
            //         await assert.fail('Due to the blank value is provided for the required number of employees field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Number of employees' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField18Data, 'yes');
            //     //will find 'Number of employees' field and pass the new data
            //     const numberOfEmployeesField = await formElementsObj.findElementById(driver,screenshotPath, 'numberOfEmployees','');
            //     await clearFieldDataObj.clearFieldData(numberOfEmployeesField);
            //     await numberOfEmployeesField.sendKeys(numberOfEmployeesData);
            //     await driver.sleep(500);
            //     //get updated value of 'Number of employees'
            //     employeesUpdatedValue = await driver.findElement(By.id('numberOfEmployees')).getAttribute('value');
            //     console.log(employeesUpdatedValue);
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField25Data, 'yes');
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
            // } else if (fieldName == 'select field22') {
            //     selectField22Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField26Data, 'yes');
            //     //will find 'Percentage Label' field and pass the new data
            //     const percentageField = await formElementsObj.findElementById(driver, 'decimalCustomField2');
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
            // } else if (fieldName == 'select field23') {
            //     selectField23Data = dataTable.rawTable[i][1];
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
            //     //select 'Big Int Label' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField28Data, 'yes');
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
            // } else if (fieldName == 'select field24') {
            //     selectField24Data = dataTable.rawTable[i][1];
            //     skypeFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required skype field is given or not
            //     if (skypeFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required skypeskypeFieldData field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Skype' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField26Data, 'yes');
            //     //will find 'Skype' field and pass the new data
            //     const percentageField = await formElementsObj.findElementById(driver, 'skypeId');
            //     await clearFieldDataObj.clearFieldData(percentageField);
            //     await percentageField.sendKeys(percentageFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Skype' Label
            //     skypeUpdatedValue = await driver.findElement(By.id('skypeId')).getAttribute('value');
            //     console.log(skypeUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field25') {
            //     selectField25Data = dataTable.rawTable[i][1];
            //     stateFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required state field is given or not
            //     if (stateFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required state field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'State' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField36Data, 'yes');
            //     //will find 'State' field and pass the new data
            //     const stateField = await formElementsObj.findElementById(driver, 'billingState');
            //     await clearFieldDataObj.clearFieldData(stateField);
            //     await stateField.sendKeys(stateFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'State' Label
            //     stateUpdatedValue = await driver.findElement(By.id('billingState')).getAttribute('value');
            //     console.log(stateUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field26') {
            //     selectField26Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField37Data, 'yes');
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
            // } else if (fieldName == 'select field27') {
            //     selectField27Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField38Data, 'yes');
            //     //will find 'Text Area Label' field and pass the new data
            //     const textAreaLabelField = await formElementsObj.findElementById(driver, 'textAreaCustomField1');
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
            // } else if (fieldName == 'select field28') {
            //     selectField28Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField39Data, 'yes');
            //     //will find 'Text' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,'textCustomField1');
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
            // } else if (fieldName == 'select field29') {
            //     selectField29Data = dataTable.rawTable[i][1];
            //     twitterFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required twitter field is given or not
            //     if (twitterFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required twitter field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Twitter' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField41Data, 'yes');
            //     //will find 'Twitter' field and pass the new data
            //     const twitterField = await formElementsObj.findElementById(driver,'twitterHandle');
            //     await clearFieldDataObj.clearFieldData(twitterField);
            //     await twitterField.sendKeys(twitterFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Twitter'
            //     twitterUpdatedValue = await driver.findElement(By.id('twitterHandle')).getAttribute('value');
            //     console.log(twitterUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field30') {
            //     selectField30Data = dataTable.rawTable[i][1];
            //     typeFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required type field is given or not
            //     if (typeFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required type field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Type' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField42Data, 'yes');
            //     //will find 'Type' field and pass the new data
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'type', typeFieldData, 'yes');
            //     //get updated value of 'Type'
            //     const typeElement = await commonElementsObj.findDropdown(driver,screenshotPath,'type');
            //     typeUpdatedValue = await typeElement.getText();
            //     console.log(typeUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field31') {
            //     selectField31Data = dataTable.rawTable[i][1];
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
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField43Data, 'yes');
            //     //will find 'URL' field and pass the new data
            //     const urlField = await formElementsObj.findElementById(driver, 'textCustomField5');
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
            // } else if (fieldName == 'select field32') {
            //     selectField32Data = dataTable.rawTable[i][1];
            //     websiteFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required website field is given or not
            //     if (websiteFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required website field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Website' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField43Data, 'yes');
            //     //will find 'Website' field and pass the new data
            //     const websiteField = await formElementsObj.findElementById(driver, 'website');
            //     await clearFieldDataObj.clearFieldData(websiteField);
            //     await websiteField.sendKeys(websiteFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Website'
            //     websiteUpdatedValue = await driver.findElement(By.id('Website')).getAttribute('value');
            //     console.log(websiteUpdatedValue);
            //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
            //     await saveButton.click();
            //     await driver.sleep(1000);
            //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
            //     await driver.wait(until.elementIsVisible(notificationMsgElement));
            //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
            //     strictEqual(notificationMsg, expectedNotification);
            //     await driver.sleep(3000);
            // } else if (fieldName == 'select field33') {
            //     selectField33Data = dataTable.rawTable[i][1];
            //     zipCodeFieldData = dataTable.rawTable[i][2];
            //
            //     //will check that the data for the required zip code field is given or not
            //     if (zipCodeFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required zip code field, the test case execution has been aborted');
            //     }
            //     const productCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
            //     await productCheckbox.click();
            //     await driver.sleep(1000);
            //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
            //     await updateButton.click();
            //     await driver.sleep(1000);
            //
            //     //select 'Zip Code' Field to be edited
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField45Data, 'yes');
            //     //will find 'Zip Code' field and pass the new data
            //     const zipCodeField = await formElementsObj.findElementById(driver, 'billingZipCode');
            //     await clearFieldDataObj.clearFieldData(zipCodeField);
            //     await zipCodeField.sendKeys(zipCodeFieldData);
            //     await driver.sleep(500);
            //     //get updated value of 'Zip Code'
            //     zipCodeUpdatedValue = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
            //     console.log(zipCodeUpdatedValue);
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
        await pageNavigationObj.comeBackToCompanyListingPage(driver, screenshotPath);
        await driver.sleep(2000);
        const contactCheckboxElement = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckboxElement.click();
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        console.log("Updated Contact Details after navigation on quick page:");
        const quickPageName = await driver.findElement(By.id('name')).getAttribute('value');
        console.log(quickPageName);
        const quickPageOwnerText = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
        const quickPageOwner = await quickPageOwnerText.getText();
        console.log(quickPageOwner);
        // const quickPageTypeText =  await commonElementsObj.findDropdown(driver,screenshotPath,'type');
        // const quickPageType = await quickPageTypeText.getText();
        // console.log(quickPageType);
        // const quickPageCurrencyText = await commonElementsObj.findDropdown(driver,screenshotPath,'currency');
        // const quickPageCurrency = await quickPageCurrencyText.getText();
        // console.log(quickPageCurrency);
        // const quickPageSkype = await driver.findElement(By.id('skypeId')).getAttribute('value');
        // console.log(quickPageSkype);
        // const quickPageWebsite = await driver.findElement(By.id('website')).getAttribute('value');
        // console.log(quickPageWebsite);
        // const quickPageFacebook = await driver.findElement(By.id('facebookHandle')).getAttribute('value');
        // console.log(quickPageFacebook);
        // const quickPageLinkedIn = await driver.findElement(By.id('linkedInHandle')).getAttribute('value');
        // console.log(quickPageLinkedIn);
        // const quickPageTwitter = await driver.findElement(By.id('twitterHandle')).getAttribute('value');
        // console.log(quickPageTwitter);
        // const quickPageInstagram = await driver.findElement(By.id('instagramHandle')).getAttribute('value');
        // console.log(quickPageInstagram);
        // const quickPageDescription = await driver.findElement(By.id('description')).getAttribute('value');
        // console.log(quickPageDescription);
        // const quickPageTags = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div/input')).getText();
        // console.log(quickPageTags);
        const quickPageAddressLine1 = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
        console.log(quickPageAddressLine1);
        const quickPageAddressLine2 = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
        console.log(quickPageAddressLine2);
        // const quickPageCity= await driver.findElement(By.id('billingCity')).getAttribute('value');
        // console.log(quickPageCity);
        // const quickPageZipCode = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
        // console.log(quickPageZipCode);
        // const quickPageState = await driver.findElement(By.id('billingState')).getAttribute('value');
        // console.log(quickPageState);
        // const quickPageCountry = await driver.findElement(By.id('billingCountry')).getAttribute('value');
        // console.log(quickPageCountry);
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
        try {
            // strictEqual(quickPageName,nameUpdatedValue);
            // strictEqual(quickPageOwner, ownerUpdatedValue);
            // strictEqual(quickPageType, typeUpdatedValue);
            // strictEqual(quickPageCurrency, currencyUpdatedValue);
            // strictEqual(quickPageSkype, skypeUpdatedValue);
            // strictEqual(quickPageWebsite, websiteUpdatedValue);
            // strictEqual(quickPageFacebook, facebookUpdatedValue);
            // strictEqual(quickPageLinkedIn, linkedInUpdatedValue);
            // strictEqual(quickPageInstagram, instagramUpdatedValue);
            // strictEqual(quickPageTwitter, twitterUpdatedValue);
            // strictEqual(quickPageDescription, descriptionUpdatedValue);
            // strictEqual(quickPageTags, tagUpdatedValue);
            strictEqual(quickPageAddressLine1, addressLine1UpdatedValue);
            strictEqual(quickPageAddressLine2, addressLine2UpdatedValue);
            // strictEqual(quickPageCity, cityUpdatedValue);
            // strictEqual(quickPageState, stateUpdatedValue);
            // strictEqual(quickPageZipCode, zipCodeUpdatedValue);
            // strictEqual(quickPageCountry, countryUpdatedValue);
            // strictEqual(quickPageTextField, textUpdatedValue);
            // strictEqual(quickPageTextAreaField, textAreaUpdatedValue);
            // strictEqual(quickPageIntegerField, integerUpdatedValue);
            // strictEqual(quickPageDecimalField, decimalUpdatedValue);
            // strictEqual(quickPageDateField, dateUpdatedValue);
            // strictEqual(quickPageDateAndTimeField, dateAndTimeUpdatedValue);
            // strictEqual(quickPageSelectField, selectLabelUpdatedValue);
            // strictEqual(quickPageMultiSelectField, multiSelectUpdatedValue);
            // strictEqual(quickPageURLField, urlUpdatedValue);
            // strictEqual(quickPageBigIntField, bigIntegerUpdatedValue);
            // strictEqual(quickPagePercentageField, percentageUpdatedValue);
            // strictEqual(quickPageBooleanField, booleanUpdatedValue);
            // strictEqual(quickPageCurrencyField, currencyFieldUpdatedValue);
            console.log("As contact details in update contact page and quick page are equal,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const preViewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await preViewPageCloseIcon.click();
        await driver.sleep(1500);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'company_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(6000);
        await assert.fail(err);
    }
});
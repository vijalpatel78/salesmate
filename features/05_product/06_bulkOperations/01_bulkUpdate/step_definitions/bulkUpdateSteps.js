const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/06_bulkOperations/01_bulkUpdate/screenshots/';
const addProductElementsObj = require('../../../02_addProduct/common/addProductElements');
const pageNavigationObj = require('../../../02_addProduct/common/actions');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let selectField01Data = 'no', activeState = 'no', selectField02Data = 'no', bigIntLabelData = 'no', selectField03Data = 'no';
let booleanState = 'no', selectField04Data = 'no', currencyLabelData = 'no', selectField05Data = 'no', dateFieldData = 'no';
let selectField06Data = 'no', dateAndTimeFieldData = 'no', selectField07Data = 'no', decLabelData = 'no', selectField08Data = 'no';
let descriptionFieldData = 'no', selectField09Data = 'no', intLabelData = 'no',selectField10Data = 'no',multiSelectLabelDropdownData1 = 'no';
let selectField11Data = 'no', nameFieldData = 'no', selectField12Data = 'no', percentageLabelData = 'no', selectField13Data = 'no';
let selectLabelDropdownData = 'no', selectField14Data = 'no', tagFieldData = 'no', selectField15Data = 'no',  textAreaLabelData = 'no';
let selectField16Data = 'no', textLabelFieldData = 'no', selectField17Data = 'no', urlLabelData = 'no';
let activeStateUpdatedValue, bigIntLabelUpdatedValue, booleanStateUpdatedValue, currencyLabelUpdatedValue;
let dateAndTimeUpdatedValue, decLabelUpdatedValue, descriptionLabelUpdatedValue,intLabelUpdatedValue, multiSelectUpdatedValue, selectLabelUpdatedValue;
let nameUpdatedValue, percentageLabelUpdatedValue, tagsLabelUpdatedValue, textAreaUpdatedValue, textLabelUpdatedValue, urlLabelUpdatedValue;

//---Case 1: Verify that User can't able to see Update options on bulk operation when user doesn't have a right to Mass Update Products----------------

Then('{string} button is not visible and log in through {string}',async function(updateButton,adminUser) {
    try {
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const allProductsCheckbox = await moduleElementsObj.findAllProductsCheckbox(driver);
        await allProductsCheckbox.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const updateProductButton = await driver.findElements(By.xpath(`//button[text()=" ${updateButton} "]`));
        const updateProductButtonLength = await updateProductButton.length;
        if (updateProductButtonLength === 0) {
            console.log("As update product button length is " + updateProductButtonLength + " so it is not displayed after disabling mass update product right,so test case has been passed");
        } else {
            await assert.fail("As update product button length is " + updateProductButtonLength + " so it is displayed after disabling mass update product right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---Case 2: As a user, I should able to see the 'Update' option while clicking to the checkbox available on grid header------------------

Then('{string} button is visible and log in through {string}',async function(updateButton,adminUser) {
    try {
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const allProductsCheckbox = await moduleElementsObj.findAllProductsCheckbox(driver);
        await allProductsCheckbox.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updateButtonVisibility.png');
        await driver.manage().setTimeouts({implicit: 2000});
        const updateProductButton = await driver.findElements(By.xpath(`//button[text()=" ${updateButton} "]`));
        const updateProductButtonLength = await updateProductButton.length;
        if (updateProductButtonLength > 0) {
            console.log("As update product button length is " + updateProductButtonLength + " so it is displayed after enabling mass update product right,so test case has been passed");
        } else {
            await assert.fail("As update product button length is " + updateProductButtonLength + " so it is not displayed even after enabling mass update product right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----------------Case 3: As a user, I should be able to Bulk update products from products listing screen--------------

When('user is able to Bulk update products from products listing screen',async function(dataTable) {
    try {
        let expectedNotification = 'Record(s) updated successfully';
        const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
        await productCheckbox.click();
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
                activeState = dataTable.rawTable[i][2];

                //select 'Active For Sales' dropdown to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField01Data, 'yes');
                //select value of 'Active For Sales'
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'isActive', activeState, 'no');
                //get updated value of 'Active For Sales'
                const activeStateElement = await formElementsObj.findDropdown(driver, screenshotPath, 'isActive');
                activeStateUpdatedValue = await activeStateElement.getText();
                console.log(activeStateUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field02') {
                selectField02Data = dataTable.rawTable[i][1];
                bigIntLabelData = dataTable.rawTable[i][2];

                //will check that the data for the required big int label field is given or not
                if (bigIntLabelData == '') {
                    await assert.fail('Due to the blank value is provided for the required big int label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Big Int Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField02Data, 'yes');
                //will find 'Big Int Label' field and pass the new data
                const bigIntLabelField = await addProductElementsObj.findAddProductFields(driver, 'bigIntCustomField1');
                await clearFieldDataObj.clearFieldData(bigIntLabelField);
                await bigIntLabelField.sendKeys(bigIntLabelData);
                await driver.sleep(500);
                //get updated value of 'Big Int Label'
                bigIntLabelUpdatedValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
                console.log(bigIntLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field03') {
                selectField03Data = dataTable.rawTable[i][1];
                booleanState = dataTable.rawTable[i][2];

                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Boolean Label' dropdown to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField03Data, 'yes');
                //select value of 'Boolean Label'
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'checkboxCustomField1', booleanState, 'no');
                //get updated value of 'Boolean Label'
                const booleanStateElement = await formElementsObj.findDropdown(driver, screenshotPath, 'checkboxCustomField1');
                booleanStateUpdatedValue = await booleanStateElement.getText();
                console.log(booleanStateUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field04') {
                selectField04Data = dataTable.rawTable[i][1];
                currencyLabelData = dataTable.rawTable[i][2];


                //will check that the data for the required currency label field is given or not
                if (currencyLabelData == '') {
                    await assert.fail('Due to the blank value is provided for the required currency label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Currency Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField04Data, 'yes');
                //will find 'Currency Label' field and pass the new data
                const currencyLabelField = await addProductElementsObj.findAddProductFields(driver, 'decimalCustomField3');
                await clearFieldDataObj.clearFieldData(currencyLabelField);
                await currencyLabelField.sendKeys(currencyLabelData);
                await driver.sleep(500);
                //get updated value of 'Currency Label'
                currencyLabelUpdatedValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
                console.log(currencyLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field05') {
                selectField05Data = dataTable.rawTable[i][1];
                dateFieldData = dataTable.rawTable[i][2];

                //will check that the data for the date label field is given or not
                if (dateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Date Label' to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField05Data, 'yes');
                //will find 'Date Label' field and pass the new data
                const dateField = await driver.findElement(By.xpath('//input[@id="dateCustomField1"] | //input[@id="dateCustomField2"]'));
                await clearFieldDataObj.clearFieldData(dateField);
                await dateField.sendKeys(dateFieldData);
                await driver.sleep(500);
                await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field06') {
                selectField06Data = dataTable.rawTable[i][1];
                dateAndTimeFieldData = dataTable.rawTable[i][2];

                //will check that the data for the date and time label field is given or not
                if (dateAndTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date and time label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Date And Time Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField06Data, 'yes');
                //will find 'Date And Time Label' field and pass the new data
                const dateAndTimeField = await addProductElementsObj.findAddProductFields(driver, 'dateTimeCustomField1');
                await clearFieldDataObj.clearFieldData(dateAndTimeField);
                await dateAndTimeField.sendKeys(dateAndTimeFieldData);
                await driver.sleep(500);
                //get updated value of 'Date And Time Label'
                dateAndTimeUpdatedValue = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
                console.log(dateAndTimeUpdatedValue);
                await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field07') {
                selectField07Data = dataTable.rawTable[i][1];
                decLabelData = dataTable.rawTable[i][2];

                //will check that the data for the required dec label field is given or not
                if (decLabelData == '') {
                    await assert.fail('Due to the blank value is provided for the required dec label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Dec Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField07Data, 'yes');
                //will find 'Dec Label' field and pass the new data
                const decLabelField = await addProductElementsObj.findAddProductFields(driver, 'decimalCustomField1');
                await clearFieldDataObj.clearFieldData(decLabelField);
                await decLabelField.sendKeys(decLabelData);
                await driver.sleep(500);
                //get updated value of 'Dec Label'
                decLabelUpdatedValue = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
                console.log(decLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field08') {
                selectField08Data = dataTable.rawTable[i][1];
                descriptionFieldData = dataTable.rawTable[i][2];

                //will check that the data for the required description field is given or not
                if (descriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Description Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField08Data, 'yes');
                //will find 'Description' field and pass the new data
                const descriptionField = await addProductElementsObj.findAddProductFields(driver, 'description');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(descriptionFieldData);
                await driver.sleep(500);
                //get updated value of 'Description Label'
                descriptionLabelUpdatedValue = await driver.findElement(By.id('description')).getAttribute('value');
                console.log(descriptionLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field09') {
                selectField09Data = dataTable.rawTable[i][1];
                intLabelData = dataTable.rawTable[i][2];

                //will check that the data for the required int label field is given or not
                if (intLabelData == '') {
                    await assert.fail('Due to the blank value is provided for the required int label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Int Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField09Data, 'yes');
                //will find 'Int Label' field and pass the new data
                const intLabelField = await addProductElementsObj.findAddProductFields(driver, 'intCustomField1');
                await clearFieldDataObj.clearFieldData(intLabelField);
                await intLabelField.sendKeys(intLabelData);
                await driver.sleep(500);
                //get updated value of 'Int Label'
                intLabelUpdatedValue = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
                console.log(intLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field10') {
                selectField10Data = dataTable.rawTable[i][1];
                multiSelectLabelDropdownData1 = dataTable.rawTable[i][2];

                //will check that the data for the multi select label dropdown field is given or not
                if (multiSelectLabelDropdownData1 == '') {
                    await assert.fail('Due to the blank value is provided for the multi select label dropdown field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Multi Select Label' to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField10Data, 'yes');
                //will select the provided new dropdown value from the 'Multi Select Label' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
                await driver.findElement(By.xpath(`//li[text()="${multiSelectLabelDropdownData1}"]`)).click();
                await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
                await driver.sleep(1000);
                //get updated value of 'Multi Select Label'
                multiSelectUpdatedValue = await driver.findElement(By.xpath('//span[@role="combobox"]/ul/li[1]')).getText();
                console.log(multiSelectUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field11') {
                selectField11Data = dataTable.rawTable[i][1];
                nameFieldData = dataTable.rawTable[i][2];

                //will check that the data for the required name field is given or not
                if (nameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required name field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Name' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField11Data, 'yes');
                //will find 'Name' field and pass the new data
                const nameField = await formElementsObj.findElementById(driver,screenshotPath,'name','productNameField');
                await clearFieldDataObj.clearFieldData(nameField);
                await nameField.sendKeys(nameFieldData);
                await driver.sleep(500);
                //get updated value of 'Name' Field
                nameUpdatedValue = await driver.findElement(By.id('name')).getAttribute('value');
                console.log(nameUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field12') {
                selectField12Data = dataTable.rawTable[i][1];
                percentageLabelData = dataTable.rawTable[i][2];

                //will check that the data for the required percentage label field is given or not
                if (percentageLabelData == '') {
                    await assert.fail('Due to the blank value is provided for the required percentage label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Big Int Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField12Data, 'yes');
                //will find 'Percentage Label' field and pass the new data
                const percentageLabelField = await addProductElementsObj.findAddProductFields(driver, 'decimalCustomField2');
                await clearFieldDataObj.clearFieldData(percentageLabelField);
                await percentageLabelField.sendKeys(percentageLabelData);
                await driver.sleep(500);
                //get updated value of 'Percentage' Label
                percentageLabelUpdatedValue = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
                console.log(percentageLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field13') {
                selectField13Data = dataTable.rawTable[i][1];
                selectLabelDropdownData = dataTable.rawTable[i][2];

                //will check that the data for the select label dropdown field is given or not
                if (selectLabelDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the select label dropdown field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Big Int Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField13Data, 'yes');
                //will select the provided new dropdown value from the 'Select Label' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'textCustomField4', selectLabelDropdownData, 'yes');
                //get updated value of 'Select Label'
                const selectLabel = await formElementsObj.findDropdown(driver, screenshotPath, 'textCustomField4');
                selectLabelUpdatedValue = await selectLabel.getText();
                console.log(selectLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field14') {
                selectField14Data = dataTable.rawTable[i][1];
                tagFieldData = dataTable.rawTable[i][2];

                //will check that the data for the required tags field is given or not
                if (tagFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Tags' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField14Data, 'yes');
                //will find 'Description' field and pass the new data
                const tagsField = await moduleElementsObj.findTagsField(driver);
                await clearFieldDataObj.clearFieldData(tagsField);
                await tagsField.sendKeys(tagFieldData);
                await driver.sleep(500);
                //get updated value of 'Tags Label'
                tagsLabelUpdatedValue = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div/input[@type="text"]')).getAttribute('value');
                console.log(tagsLabelUpdatedValue);
                await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field15') {
                selectField15Data = dataTable.rawTable[i][1];
                textAreaLabelData = dataTable.rawTable[i][2];

                //will check that the data for the required text area label field is given or not
                if (textAreaLabelData == '') {
                    await assert.fail('Due to the blank value is provided for the required text area label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Text Area' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField15Data, 'yes');
                //will find 'Text Area Label' field and pass the new data
                const textAreaLabelField = await addProductElementsObj.findAddProductFields(driver, 'textAreaCustomField1');
                await clearFieldDataObj.clearFieldData(textAreaLabelField);
                await textAreaLabelField.sendKeys(textAreaLabelData);
                await driver.sleep(500);
                //get updated value of 'Text Area Label'
                textAreaUpdatedValue = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
                console.log(textAreaUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field16') {
                selectField16Data = dataTable.rawTable[i][1];
                textLabelFieldData = dataTable.rawTable[i][2];

                //will check that the data for the required text label field is given or not
                if (textLabelFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Tags' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField16Data, 'yes');
                //will find 'Text Label' field and pass the new data
                const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','textLabel');
                await clearFieldDataObj.clearFieldData(textLabelField);
                await textLabelField.sendKeys(textLabelFieldData);
                await driver.sleep(500);
                //get updated value of 'Text Label'
                textLabelUpdatedValue = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
                console.log(textLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field17') {
                selectField17Data = dataTable.rawTable[i][1];
                urlLabelData = dataTable.rawTable[i][2];

                //will check that the data for the required url label field is given or not
                if (urlLabelData == '') {
                    await assert.fail('Due to the blank value is provided for the required url label field, the test case execution has been aborted');
                }
                const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
                await productCheckbox.click();
                await driver.sleep(500);
                const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Update ');
                await updateButton.click();

                //select 'Big Int Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField17Data, 'yes');
                //will find 'URL Label' field and pass the new data
                const urlLabelField = await addProductElementsObj.findAddProductFields(driver, 'textCustomField5');
                await clearFieldDataObj.clearFieldData(urlLabelField);
                await urlLabelField.sendKeys(urlLabelData);
                await driver.sleep(500);
                //get updated value of 'URL Label'
                urlLabelUpdatedValue = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
                console.log(urlLabelUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave');
                await saveButton.click();
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            }
        }
        //page navigation and comeback to product listing page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productName = await addProductElementsObj.clickOnProductName(driver, 'Ring');
        await productName.click();
        await driver.sleep(2000);
        console.log("Updated Product Details after navigation on quick page:");
        const quickPageProductName = await driver.findElement(By.id('name')).getAttribute('value');
        console.log(quickPageProductName);
        const quickPageDescription = await driver.findElement(By.id('description')).getAttribute('value');
        console.log(quickPageDescription);
        const quickPageActiveState = await driver.findElement(By.id('isActive')).getAttribute('value');
        console.log(quickPageActiveState);
        const quickPageTextLabel = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        console.log(quickPageTextLabel);
        const quickPageTextAreaLabel = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        console.log(quickPageTextAreaLabel);
        const quickPageIntLabel = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        console.log(quickPageIntLabel);
        const quickPageDecLabel = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        console.log(quickPageDecLabel);
        const quickPageDateAndTimeLabel = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
        console.log(quickPageDateAndTimeLabel);
        const quickPageSelectLabel = await formElementsObj.findDropdown(driver, screenshotPath, 'textCustomField4');
        const quickPageSelectLabelText = await quickPageSelectLabel.getText();
        console.log(quickPageSelectLabelText);
        const quickPageMultiSelectLabelText = await driver.findElement(By.xpath('//span[@role="combobox"]/ul/li[1]')).getText();
        console.log(quickPageMultiSelectLabelText);
        const quickPageURLLabel = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        console.log(quickPageURLLabel);
        const quickPageBigIntLabel = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        console.log(quickPageBigIntLabel);
        const quickPagePercentageLabel = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        console.log(quickPagePercentageLabel);
        const quickPageBooleanLabel = await driver.findElement(By.id('checkboxCustomField1')).getAttribute('value');
        console.log(quickPageBooleanLabel);
        const quickPageCurrencyLabel = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        console.log(quickPageCurrencyLabel);
        try {
            strictEqual(nameUpdatedValue, quickPageProductName);
            strictEqual(descriptionLabelUpdatedValue, quickPageDescription);
            //strictEqual(textLabelUpdatedValue, quickPageTextLabel);
            strictEqual(textAreaUpdatedValue, quickPageTextAreaLabel);
            strictEqual(intLabelUpdatedValue, quickPageIntLabel);
            strictEqual(decLabelUpdatedValue, quickPageDecLabel);
            strictEqual(dateAndTimeUpdatedValue, quickPageDateAndTimeLabel);
            strictEqual(bigIntLabelUpdatedValue, quickPageBigIntLabel);
            strictEqual(percentageLabelUpdatedValue, quickPagePercentageLabel);
            strictEqual(currencyLabelUpdatedValue, quickPageCurrencyLabel);
            console.log("As product details in add product page and quick page are equal,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
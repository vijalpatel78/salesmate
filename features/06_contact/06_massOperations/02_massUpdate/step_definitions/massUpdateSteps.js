const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/06_massOperations/02_massUpdate/screenshots/';
const addContactElementsObj = require('../../../02_addContact/common/addContactElements');
const massUpdateProductElementsObj = require('../../../../05_product/07_massOperations/01_massUpdate/common/massUpdateElements');
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const commonElementsObj = require('../../../../00_common/webElements/formElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let selectField01Data = 'no', addressLine1Data = 'no', selectField02Data = 'no', addressLine2Data = 'no', selectField03Data = 'no', bigIntegerFieldData = 'no';
let selectField04Data = 'no', booleanState = 'no', selectField05Data = 'no', cityFieldData = 'no', selectField06Data = 'no';
let companyFieldData = 'no', selectField07Data = 'no', countryFieldData = 'no', selectField08Data = 'no', currencyData = 'no';
let selectField09Data = 'no', currencyFieldData = 'no', selectField10Data = 'no', dateFieldData = 'no', selectField11Data = 'no';
let dateAndTimeFieldData = 'no', selectField12Data = 'no', decLabelData = 'no', selectField13Data = 'no', descriptionFieldData = 'no';
let selectField14Data = 'no', emailOptOutData = 'no', selectField15Data = 'no', emailOptOutReasonData = 'no', selectField16Data = 'no';
let facebookFieldData = 'no', selectField17Data = 'no', firstNameFieldData = 'no', selectField18Data = 'no', googleFieldData = 'no';
let selectField19Data = 'no', instagramFieldData = 'no', selectField20Data = 'no', integerFieldData = 'no', selectField21Data = 'no';
let jobTitleFieldData = 'no', selectField22Data = 'no', lastNameFieldData = 'no', selectField23Data = 'no', linkedInFieldData = 'no';
let selectField24Data = 'no', multiSelectFieldData = 'no', selectField25Data = 'no', ownerFieldData = 'no', selectField26Data = 'no';
let percentageFieldData = 'no', selectField27Data = 'no', smsOptOutFieldData = 'no', selectField28Data = 'no', selectFieldData = 'no';
let selectField29Data = 'no', shippingAddressLine1Data = 'no', selectField30Data = 'no', shippingAddressLine2Data = 'no', selectField31Data = 'no';
let shippingCityFieldData = 'no', selectField32Data = 'no', shippingCountryFieldData = 'no', selectField33Data = 'no', shippingStateFieldData = 'no';
let selectField34Data = 'no', shippingZipCodeFieldData = 'no', selectField35Data = 'no', skypeFieldData = 'no', selectField36Data = 'no';
let stateFieldData = 'no', selectField37Data = 'no', tagsFieldData = 'no', selectField38Data = 'no', textAreaFieldData = 'no',  selectField39Data = 'no';
let textFieldData = 'no', selectField40Data = 'no', timeZoneFieldData = 'no', selectField41Data = 'no', twitterFieldData = 'no';
let selectField42Data = 'no', typeFieldData = 'no',  selectField43Data = 'no', urlFieldData = 'no', selectField44Data = 'no', websiteFieldData = 'no';
let selectField45Data = 'no', zipCodeFieldData = 'no';
let addressLine1UpdatedValue, addressLine2UpdatedValue, bigIntegerUpdatedValue, booleanUpdatedValue, cityUpdatedValue, companyUpdatedValue, countryUpdatedValue;
let currencyUpdatedValue, currencyFieldUpdatedValue, dateUpdatedValue, dateAndTimeUpdatedValue, decimalUpdatedValue, descriptionUpdatedValue,emailOptOutUpdatedValue;
let emailOptOutReasonUpdatedValue, facebookUpdatedValue, firstNameUpdatedValue, googleUpdatedValue, instagramUpdatedValue, integerUpdatedValue, jobTitleUpdatedValue;
let lastNameUpdatedValue, linkedInUpdatedValue, multiSelectUpdatedValue, ownerUpdatedValue,  percentageUpdatedValue, smsOptOutUpdatedValue, selectLabelUpdatedValue;
let shippingAddressLine1UpdatedValue, shippingAddressLine2UpdatedValue, shippingCityUpdatedValue, shippingCountryUpdatedValue, shippingStateUpdatedValue, shippingZipCodeUpdatedValue;
let skypeUpdatedValue, stateUpdatedValue, tagUpdatedValue, textAreaUpdatedValue, textUpdatedValue, timeZoneUpdatedValue, twitterUpdatedValue, typeUpdatedValue;
let urlUpdatedValue, websiteUpdatedValue, zipCodeUpdatedValue;

//----Case 1: As a User, Verify that User can't able to see the Update options on the bulk operation when the user doesn't have a right to Mass Update Contact---------

Then('{string} link is not visible and log in through {string}',async function(massUpdateContact,adminUser) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const massUpdateContactLink = await driver.findElements(By.xpath(`//a[text()="${massUpdateContact}"]`));
        const massUpdateContactLength = await massUpdateContactLink.length;
        if (massUpdateContactLength === 0) {
            console.log("As mass update contact link length is " + massUpdateContactLength + " so it is not displayed under 'Actions' after disabling mass update contact right,so test case has been passed");
        } else {
            await assert.fail("As mass update contact link length is " + massUpdateContactLength + " so it is displayed under 'Actions' even after disabling mass update contact right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massUpdate_Visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------Case 2: As a user, I should able to see the 'Mass Update' option when user has 'Mass Update Contact' right--------

Then('{string} link is visible and log in through {string}',async function(massUpdateContact,adminUser) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const massUpdateContactLink = await driver.findElements(By.xpath(`//a[text()="${massUpdateContact}"]`));
        const massUpdateContactLength = await massUpdateContactLink.length;
        if (massUpdateContactLength > 0) {
            console.log("As mass update contact link length is " + massUpdateContactLength + " so it is displayed under 'Actions' after enabling mass update contact right,so test case has been passed");
        } else {
            await assert.fail("As mass update contact link length is " + massUpdateContactLength + " so it is not displayed under 'Actions' even after enabling mass update contact right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massUpdate_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-----------Case 3: As a user, I should be able to update Contacts in bulk from the mass update Contacts page----------

When('user is able to update Contacts in bulk from the mass update Contacts page',async function(dataTable) {
 try {
     let expectedNotification = 'Record(s) updated successfully';
     const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
     await actionsButton.click();
     await driver.sleep(1000);
     const massUpdateContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Update Contact')
     await massUpdateContact.click();
     await driver.sleep(1000);
     const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
     await addConditionButton.click();
     await driver.sleep(1000);
     const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
     await selectFieldDropdown.click();
     await driver.sleep(1000);
     //select 'Name' Field to be updated
     const listField = await massUpdateProductElementsObj.findListField(driver, 1);
     await listField.click();
     await driver.sleep(1000);
     const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
     await selectCondition.click();
     await driver.sleep(1000);
     //select 'not empty' condition
     const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
     await listCondition.click();
     await driver.sleep(1000);
     //click on 'Search' button
     const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
     await searchButton.click();
     await driver.sleep(1000);
     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
     await contactCheckbox.click();
     await driver.sleep(1000);
     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
             const addressLine1Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine1');
             await clearFieldDataObj.clearFieldData(addressLine1Field);
             await addressLine1Field.sendKeys(addressLine1Data);
             await driver.sleep(500);
             //get updated value of 'Address Line1'
             addressLine1UpdatedValue = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
             console.log(addressLine1UpdatedValue);
             const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
             const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
             await contactCheckbox.click();
             await driver.sleep(1000);
             const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
             await updateButton.click();
             await driver.sleep(1000);

             //select 'Address Line 2' Field to be edited
             await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField02Data, 'yes');
             //will find 'Address Line 2' field and pass the new data
             const addressLine2Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine2');
             await clearFieldDataObj.clearFieldData(addressLine2Field);
             await addressLine2Field.sendKeys(addressLine2Data);
             await driver.sleep(500);
             //get updated value of 'Address Line 2'
             addressLine2UpdatedValue = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
             console.log(addressLine2UpdatedValue);
             const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
             await saveButton.click();
             await driver.sleep(1000);
             const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
             await driver.wait(until.elementIsVisible(notificationMsgElement));
             const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
             strictEqual(notificationMsg, expectedNotification);
             await driver.sleep(3000);
         } else if (fieldName == 'select field03') {
             selectField03Data = dataTable.rawTable[i][1];
             bigIntegerFieldData = dataTable.rawTable[i][2];

             //will check that the data for the required big int field is given or not
             if (bigIntegerFieldData == '') {
                 await assert.fail('Due to the blank value is provided for the required big integer field, the test case execution has been aborted');
             }
             const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
             await contactCheckbox.click();
             await driver.sleep(1000);
             const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
             await updateButton.click();
             await driver.sleep(1000);

             //select 'Big Integer' Field to be edited
             await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField03Data, 'yes');
             //will find 'Big Integer' field and pass the new data
             const bigIntegerField = await addContactElementsObj.findAddContactFields(driver, 'bigIntCustomField1');
             await clearFieldDataObj.clearFieldData(bigIntegerField);
             await bigIntegerField.sendKeys(bigIntegerFieldData);
             await driver.sleep(500);
             //get updated value of 'Big Integer'
             bigIntegerUpdatedValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
             console.log(bigIntegerUpdatedValue);
             const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
         //     booleanState = dataTable.rawTable[i][2];
         //
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field05') {
         //     selectField05Data = dataTable.rawTable[i][1];
         //     cityFieldData = dataTable.rawTable[i][2];
         //
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'City' field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField05Data, 'yes');
         //     //select value of 'City Field'
         //     const cityField = await addContactElementsObj.findAddContactFields(driver, 'billingCity');
         //     await clearFieldDataObj.clearFieldData(cityField);
         //     await cityField.sendKeys(cityFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'City Field'
         //     const cityElement = await addContactElementsObj.findAddContactFields(driver, 'billingCity');
         //     cityUpdatedValue = await cityElement.getText();
         //     console.log(booleanUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field06') {
         //     selectField06Data = dataTable.rawTable[i][1];
         //     companyFieldData = dataTable.rawTable[i][2];
         //
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Company' field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField06Data, 'yes');
         //     //select value of 'Company'
         //     const companyField = await driver.findElement(By.xpath('//ro-tag/div[@class="ro-tag-autocomplete"]/input'));
         //     await clearFieldDataObj.clearFieldData(companyField);
         //     await companyField.sendKeys(companyFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Company'
         //     companyUpdatedValue = await companyField.getText();
         //     console.log(companyUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(5000);
         //     await addContactElementsObj.findCloseIcon(driver);
         //     await driver.sleep(1000);
         // } else if (fieldName == 'select field07') {
         //     selectField07Data = dataTable.rawTable[i][1];
         //     countryFieldData = dataTable.rawTable[i][2];
         //
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Country' field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField07Data, 'yes');
         //     //select value of 'Country'
         //     const countryField = await addContactElementsObj.findAddContactFields(driver, 'billingCountry');
         //     await clearFieldDataObj.clearFieldData(countryField);
         //     await countryField.sendKeys(countryFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Country'
         //     const countryElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'billingCountry');
         //     countryUpdatedValue = await countryElement.getText();
         //     console.log(countryUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
         //     //will check that the data for the required currency field is given or not
         //     if (currencyData == '') {
         //         await assert.fail('Due to the blank value is provided for the required currency dropdown, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Currency Field' to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField09Data, 'yes');
         //     //will find 'Currency' field and pass the new data
         //     const currencyField = await addProductElementsObj.findAddProductFields(driver, 'decimalCustomField3');
         //     await clearFieldDataObj.clearFieldData(currencyField);
         //     await currencyField.sendKeys(currencyFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Currency'
         //     currencyFieldUpdatedValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
         //     console.log(currencyFieldUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Date' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField10Data, 'yes');
         //     //will find 'Date' field and pass the new data
         //     const dateField = await addContactElementsObj.findAddContactFields(driver, 'dateCustomField1');
         //     await clearFieldDataObj.clearFieldData(dateField);
         //     await dateField.sendKeys(dateFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Date'
         //     dateUpdatedValue = await driver.findElement(By.id('dateCustomField1')).getAttribute('value');
         //     console.log(dateUpdatedValue);
         //     await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
         //     await driver.sleep(1000);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Date And Time Label' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField11Data, 'yes');
         //     //will find 'Date And Time Label' field and pass the new data
         //     const dateAndTimeField = await addContactElementsObj.findAddContactFields(driver, 'dateTimeCustomField1');
         //     await clearFieldDataObj.clearFieldData(dateAndTimeField);
         //     await dateAndTimeField.sendKeys(dateAndTimeFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Date And Time Label'
         //     dateAndTimeUpdatedValue = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
         //     console.log(dateAndTimeUpdatedValue);
         //     await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
         //     await driver.sleep(1000);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Decimal' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField12Data, 'yes');
         //     //will find 'Decimal' field and pass the new data
         //     const decLabelField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField1');
         //     await clearFieldDataObj.clearFieldData(decLabelField);
         //     await decLabelField.sendKeys(decLabelData);
         //     await driver.sleep(500);
         //     //get updated value of 'Decimal'
         //     decimalUpdatedValue = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
         //     console.log(decimalUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
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
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Description Label' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField13Data, 'yes');
         //     //will find 'Description' field and pass the new data
         //     const descriptionField = await addContactElementsObj.findAddContactFields(driver, 'description');
         //     await clearFieldDataObj.clearFieldData(descriptionField);
         //     await descriptionField.sendKeys(descriptionFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Description Label'
         //     descriptionUpdatedValue = await driver.findElement(By.id('description')).getAttribute('value');
         //     console.log(descriptionUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field14') {
         //     selectField14Data = dataTable.rawTable[i][1];
         //     emailOptOutData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required email opt out field is given or not
         //     if (emailOptOutData == '') {
         //         await assert.fail('Due to the blank value is provided for the required email opt out field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Email Opt Out' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField14Data, 'yes');
         //     //will find 'Email Opt Out' field and pass the new data
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'emailOptOut', emailOptOutData, 'no');
         //     //get updated value of 'Email Opt Out'
         //     const emailOptOutElement = await commonElementsObj.findDropdown(driver,screenshotPath,'emailOptOut');
         //     emailOptOutUpdatedValue = await emailOptOutElement.getText();
         //     console.log(intLabelUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field15') {
         //     selectField15Data = dataTable.rawTable[i][1];
         //     emailOptOutReasonData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required email opt out reason field is given or not
         //     if (emailOptOutReasonData == '') {
         //         await assert.fail('Due to the blank value is provided for the required email opt out reason field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Email Opt Out Reason' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField14Data, 'yes');
         //     //will find 'Email Opt Out Reason' field and pass the new data
         //     const emailOptOutReasonField = await addContactElementsObj.findAddContactFields(driver, 'emailOptOutReason');
         //     await clearFieldDataObj.clearFieldData(emailOptOutReasonField);
         //     await emailOptOutReasonField.sendKeys(emailOptOutReasonData);
         //     await driver.sleep(500);
         //     //get updated value of 'Decimal'
         //     emailOptOutReasonUpdatedValue = await driver.findElement(By.id('emailOptOutReason')).getAttribute('value');
         //     console.log(emailOptOutReasonUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field16') {
         //     selectField16Data = dataTable.rawTable[i][1];
         //     facebookFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required facebook field is given or not
         //     if (facebookFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required facebook field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Facebook' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField16Data, 'yes');
         //     //will find 'Facebook' field and pass the new data
         //     const facebookField = await addContactElementsObj.findAddContactFields(driver, 'facebookHandle');
         //     await clearFieldDataObj.clearFieldData(facebookField);
         //     await facebookField.sendKeys(facebookFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Facebook'
         //     facebookUpdatedValue = await driver.findElement(By.id('facebookHandle')).getAttribute('value');
         //     console.log(facebookUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field17') {
         //     selectField17Data = dataTable.rawTable[i][1];
         //     firstNameFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required first name field is given or not
         //     if (firstNameFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'First Name' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField17Data, 'yes');
         //     //will find 'First Name' field and pass the new data
         //     const firstNameField = await addContactElementsObj.findAddContactFields(driver, 'firstName');
         //     await clearFieldDataObj.clearFieldData(firstNameField);
         //     await firstNameField.sendKeys(firstNameFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'First Name'
         //     firstNameUpdatedValue = await driver.findElement(By.id('firstName')).getAttribute('value');
         //     console.log(firstNameUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field18') {
         //     selectField18Data = dataTable.rawTable[i][1];
         //     googleFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required google* field is given or not
         //     if (googleFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required google+ field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Google+' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField18Data, 'yes');
         //     //will find 'Google+' field and pass the new data
         //     const googleField = await addProductElementsObj.findAddProductFields(driver, 'googlePlusHandle');
         //     await clearFieldDataObj.clearFieldData(googleField);
         //     await googleField.sendKeys(googleFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Google+'
         //     googleUpdatedValue = await driver.findElement(By.id('googlePlusHandle')).getAttribute('value');
         //     console.log(googleUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field19') {
         //     selectField19Data = dataTable.rawTable[i][1];
         //     instagramFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required instagram field is given or not
         //     if (integerFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required instagram field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Instagram' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField19Data, 'yes');
         //     //will find 'Instagram' field and pass the new data
         //     const instagramField = await addContactElementsObj.findAddContactFields(driver, 'instagramHandle');
         //     await clearFieldDataObj.clearFieldData(instagramField);
         //     await instagramField.sendKeys(instagramFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Instagram'
         //     instagramUpdatedValue = await driver.findElement(By.id('instagramHandle')).getAttribute('value');
         //     console.log(instagramUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field20') {
         //     selectField20Data = dataTable.rawTable[i][1];
         //     integerFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required integer field is given or not
         //     if (integerFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required integer field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Integer' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField20Data, 'yes');
         //     //will find 'Integer' field and pass the new data
         //     const integerField = await addContactElementsObj.findAddContactFields(driver, 'intCustomField1');
         //     await clearFieldDataObj.clearFieldData(integerField);
         //     await integerField.sendKeys(integerFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Integer'
         //     integerUpdatedValue = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
         //     console.log(integerFieldData);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field21') {
         //     selectField21Data = dataTable.rawTable[i][1];
         //     jobTitleFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required job title field is given or not
         //     if (jobTitleFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required job title field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Job Title' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField21Data, 'yes');
         //     //will find 'Job Title' field and pass the new data
         //     const jobTitleField = await addContactElementsObj.findAddContactFields(driver, 'designation');
         //     await clearFieldDataObj.clearFieldData(jobTitleField);
         //     await jobTitleField.sendKeys(jobTitleFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Job Title'
         //     jobTitleUpdatedValue = await driver.findElement(By.id('designation')).getAttribute('value');
         //     console.log(jobTitleUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field22') {
         //     selectField22Data = dataTable.rawTable[i][1];
         //     lastNameFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required last name field is given or not
         //     if (lastNameFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required last name field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Last Name' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField22Data, 'yes');
         //     //will find 'Last Name' field and pass the new data
         //     const lastNameField = await addContactElementsObj.findAddContactFields(driver, 'lastName');
         //     await clearFieldDataObj.clearFieldData(lastNameField);
         //     await lastNameField.sendKeys(lastNameFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Last Name'
         //     lastNameUpdatedValue = await driver.findElement(By.id('lastName')).getAttribute('value');
         //     console.log(lastNameUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field23') {
         //     selectField23Data = dataTable.rawTable[i][1];
         //     linkedInFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required linked In field is given or not
         //     if (linkedInFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required linked In field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Linked In' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField23Data, 'yes');
         //     //will find 'Linked In' field and pass the new data
         //     const linkedInField = await addContactElementsObj.findAddContactFields(driver, 'linkedInHandle');
         //     await clearFieldDataObj.clearFieldData(linkedInField);
         //     await linkedInField.sendKeys(linkedInFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Linked In'
         //     linkedInUpdatedValue = await driver.findElement(By.id('linkedInHandle')).getAttribute('value');
         //     console.log(linkedInUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field24') {
         //     selectField24Data = dataTable.rawTable[i][1];
         //     multiSelectFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the multi select dropdown is given or not
         //     if (multiSelectFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the multi select dropdown, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field25') {
         //     selectField25Data = dataTable.rawTable[i][1];
         //     ownerFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required owner field is given or not
         //     if (ownerFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required owner field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field26') {
         //     selectField26Data = dataTable.rawTable[i][1];
         //     percentageFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required percentage field is given or not
         //     if (percentageFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required percentage field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Percentage' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField26Data, 'yes');
         //     //will find 'Percentage Label' field and pass the new data
         //     const percentageField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField2');
         //     await clearFieldDataObj.clearFieldData(percentageField);
         //     await percentageField.sendKeys(percentageFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Percentage' Label
         //     percentageUpdatedValue = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
         //     console.log(percentageUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field27') {
         //     selectField27Data = dataTable.rawTable[i][1];
         //     smsOptOutFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the sms opt out field is given or not
         //     if (smsOptOutFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the sms opt out field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'SMS Opt Out' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField27Data, 'yes');
         //     //will select the provided new dropdown value from the 'SMS Opt Out' dropdown list
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'smsOptOut', selectLabelDropdownData, 'no');
         //     //get updated value of 'SMS Opt Out'
         //     const selectLabel = await commonElementsObj.findDropdown(driver, screenshotPath, 'smsOptOut');
         //     smsOptOutUpdatedValue = await selectLabel.getText();
         //     console.log(smsOptOutUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field28') {
         //     selectField28Data = dataTable.rawTable[i][1];
         //     selectFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the select dropdown field is given or not
         //     if (selectFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the select dropdown field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field29') {
         //     selectField29Data = dataTable.rawTable[i][1];
         //     shippingAddressLine1Data = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required shipping address line 1 field is given or not
         //     if (shippingAddressLine1Data == '') {
         //         await assert.fail('Due to the blank value is provided for the required shipping address linne 1 field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Shipping Address Line 1' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField29Data, 'yes');
         //     //will find 'Shipping Address Line 1' field and pass the new data
         //     const shippingAddressLine1Field = await addContactElementsObj.findAddContactFields(driver, 'shippingAddressLine1');
         //     await clearFieldDataObj.clearFieldData(shippingAddressLine1Field);
         //     await shippingAddressLine1Field.sendKeys(shippingAddressLine1Data);
         //     await driver.sleep(500);
         //     //get updated value of 'Percentage' Label
         //     shippingAddressLine1UpdatedValue = await driver.findElement(By.id('shippingAddressLine1')).getAttribute('value');
         //     console.log(shippingAddressLine1UpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field30') {
         //     selectField30Data = dataTable.rawTable[i][1];
         //     shippingAddressLine2Data = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required shipping address line 2 field is given or not
         //     if (shippingAddressLine2Data == '') {
         //         await assert.fail('Due to the blank value is provided for the required shipping address line 2  field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Percentage' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField30Data, 'yes');
         //     //will find 'Percentage Label' field and pass the new data
         //     const shippingAddressLine2Field = await addContactElementsObj.findAddContactFields(driver, 'shippingAddressLine2');
         //     await clearFieldDataObj.clearFieldData(shippingAddressLine2Field);
         //     await shippingAddressLine2Field.sendKeys(shippingAddressLine2Data);
         //     await driver.sleep(500);
         //     //get updated value of 'Percentage' Label
         //     shippingAddressLine2UpdatedValue = await driver.findElement(By.id('shippingAddressLine2')).getAttribute('value');
         //     console.log(shippingAddressLine2UpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field31') {
         //     selectField31Data = dataTable.rawTable[i][1];
         //     shippingCityFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required shipping city field is given or not
         //     if (shippingCityFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required shipping city field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Shipping City' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField26Data, 'yes');
         //     //will find 'Shipping City' field and pass the new data
         //     const shippingCityField = await addContactElementsObj.findAddContactFields(driver, 'shippingCity');
         //     await clearFieldDataObj.clearFieldData(shippingCityField);
         //     await shippingCityField.sendKeys(shippingCityFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Shipping City' Label
         //     shippingCityUpdatedValue = await driver.findElement(By.id('shippingCity')).getAttribute('value');
         //     console.log(shippingCityUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field32') {
         //     selectField32Data = dataTable.rawTable[i][1];
         //     shippingCountryFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required shipping country field is given or not
         //     if (shippingCountryFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required shipping country field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Shipping Country' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField32Data, 'yes');
         //     //will find 'Shipping Country' field and pass the new data
         //     const shippingCountryField = await addContactElementsObj.findAddContactFields(driver, 'shippingCountry');
         //     await clearFieldDataObj.clearFieldData(shippingCountryField);
         //     await shippingCountryField.sendKeys(shippingCountryFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Shipping Country' Label
         //     shippingCountryUpdatedValue = await driver.findElement(By.id('shippingCountry')).getAttribute('value');
         //     console.log(shippingCountryUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field33') {
         //     selectField33Data = dataTable.rawTable[i][1];
         //     shippingStateFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required shipping state field is given or not
         //     if (shippingStateFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required shipping state field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Shipping State' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField33Data, 'yes');
         //     //will find 'Shipping State' field and pass the new data
         //     const shippingStateField = await addContactElementsObj.findAddContactFields(driver, 'shippingState');
         //     await clearFieldDataObj.clearFieldData(shippingStateField);
         //     await shippingStateField.sendKeys(shippingStateFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Shipping State' Label
         //     shippingStateUpdatedValue = await driver.findElement(By.id('shippingState')).getAttribute('value');
         //     console.log(shippingStateUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field34') {
         //     selectField34Data = dataTable.rawTable[i][1];
         //     shippingZipCodeFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required shipping zip code field is given or not
         //     if (shippingZipCodeFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required shipping zip code field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Shipping Zip Code' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField34Data, 'yes');
         //     //will find 'Shipping Zip Code' field and pass the new data
         //     const shippingZipCodeField = await addContactElementsObj.findAddContactFields(driver, 'shippingZipCode');
         //     await clearFieldDataObj.clearFieldData(shippingZipCodeField);
         //     await shippingZipCodeField.sendKeys(shippingZipCodeFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Shipping Zip Code' Label
         //     shippingZipCodeUpdatedValue = await driver.findElement(By.id('shippingZipCode')).getAttribute('value');
         //     console.log(shippingZipCodeUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field35') {
         //     selectField35Data = dataTable.rawTable[i][1];
         //     skypeFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required skype field is given or not
         //     if (skypeFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required skypeskypeFieldData field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Skype' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField26Data, 'yes');
         //     //will find 'Skype' field and pass the new data
         //     const percentageField = await addContactElementsObj.findAddContactFields(driver, 'skypeId');
         //     await clearFieldDataObj.clearFieldData(percentageField);
         //     await percentageField.sendKeys(percentageFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Skype' Label
         //     skypeUpdatedValue = await driver.findElement(By.id('skypeId')).getAttribute('value');
         //     console.log(skypeUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field36') {
         //     selectField36Data = dataTable.rawTable[i][1];
         //     stateFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required state field is given or not
         //     if (stateFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required state field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'State' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField36Data, 'yes');
         //     //will find 'State' field and pass the new data
         //     const stateField = await addContactElementsObj.findAddContactFields(driver, 'billingState');
         //     await clearFieldDataObj.clearFieldData(stateField);
         //     await stateField.sendKeys(stateFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'State' Label
         //     stateUpdatedValue = await driver.findElement(By.id('billingState')).getAttribute('value');
         //     console.log(stateUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field37') {
         //     selectField37Data = dataTable.rawTable[i][1];
         //     tagsFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required tags field is given or not
         //     if (tagsFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field38') {
         //     selectField38Data = dataTable.rawTable[i][1];
         //     textAreaFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required text area field is given or not
         //     if (textAreaFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required text area field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Text Area' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField38Data, 'yes');
         //     //will find 'Text Area Label' field and pass the new data
         //     const textAreaLabelField = await addContactElementsObj.findAddContactFields(driver, 'textAreaCustomField1');
         //     await clearFieldDataObj.clearFieldData(textAreaLabelField);
         //     await textAreaLabelField.sendKeys(textAreaLabelData);
         //     await driver.sleep(500);
         //     //get updated value of 'Text Area Label'
         //     textAreaUpdatedValue = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
         //     console.log(textAreaUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field39') {
         //     selectField39Data = dataTable.rawTable[i][1];
         //     textFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required text field is given or not
         //     if (textFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Text' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField39Data, 'yes');
         //     //will find 'Text' field and pass the new data
         //     const textLabelField = await addContactElementsObj.findAddContactFields(driver,'textCustomField1');
         //     await clearFieldDataObj.clearFieldData(textLabelField);
         //     await textLabelField.sendKeys(textFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Text'
         //     textUpdatedValue = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
         //     console.log(textUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field40') {
         //     selectField40Data = dataTable.rawTable[i][1];
         //     timeZoneFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required time zone field is given or not
         //     if (timeZoneFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required time zone field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Time Zone' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField40Data, 'yes');
         //     //will find 'Time Zone' field and pass the new data
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'timezone', timeZoneFieldData, 'yes');
         //     //get updated value of 'Time Zone'
         //     const timeZoneElement = await commonElementsObj.findDropdown(driver,screenshotPath,'timezone');
         //     timeZoneUpdatedValue = await timeZoneElement.getText();
         //     console.log(timeZoneUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field41') {
         //     selectField41Data = dataTable.rawTable[i][1];
         //     twitterFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required twitter field is given or not
         //     if (twitterFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required twitter field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Twitter' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField41Data, 'yes');
         //     //will find 'Twitter' field and pass the new data
         //     const twitterField = await addContactElementsObj.findAddContactFields(driver,'twitterHandle');
         //     await clearFieldDataObj.clearFieldData(twitterField);
         //     await twitterField.sendKeys(twitterFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Twitter'
         //     twitterUpdatedValue = await driver.findElement(By.id('twitterHandle')).getAttribute('value');
         //     console.log(twitterUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field42') {
         //     selectField42Data = dataTable.rawTable[i][1];
         //     typeFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required type field is given or not
         //     if (typeFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required type field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
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
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field43') {
         //     selectField43Data = dataTable.rawTable[i][1];
         //     urlFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required url field is given or not
         //     if (urlFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required url field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'URL' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField43Data, 'yes');
         //     //will find 'URL' field and pass the new data
         //     const urlField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField5');
         //     await clearFieldDataObj.clearFieldData(urlField);
         //     await urlField.sendKeys(urlFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'URL'
         //     urlUpdatedValue = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
         //     console.log(urlUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field44') {
         //     selectField44Data = dataTable.rawTable[i][1];
         //     websiteFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required website field is given or not
         //     if (websiteFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required website field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Website' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField43Data, 'yes');
         //     //will find 'Website' field and pass the new data
         //     const websiteField = await addContactElementsObj.findAddContactFields(driver, 'website');
         //     await clearFieldDataObj.clearFieldData(websiteField);
         //     await websiteField.sendKeys(websiteFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Website'
         //     websiteUpdatedValue = await driver.findElement(By.id('Website')).getAttribute('value');
         //     console.log(websiteUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // } else if (fieldName == 'select field45') {
         //     selectField45Data = dataTable.rawTable[i][1];
         //     zipCodeFieldData = dataTable.rawTable[i][2];
         //
         //     //will check that the data for the required zip code field is given or not
         //     if (zipCodeFieldData == '') {
         //         await assert.fail('Due to the blank value is provided for the required zip code field, the test case execution has been aborted');
         //     }
         //     const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
         //     await contactCheckbox.click();
         //     await driver.sleep(1000);
         //     const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
         //     await updateButton.click();
         //     await driver.sleep(1000);
         //
         //     //select 'Zip Code' Field to be edited
         //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField45Data, 'yes');
         //     //will find 'Zip Code' field and pass the new data
         //     const zipCodeField = await addContactElementsObj.findAddContactFields(driver, 'billingZipCode');
         //     await clearFieldDataObj.clearFieldData(zipCodeField);
         //     await zipCodeField.sendKeys(zipCodeFieldData);
         //     await driver.sleep(500);
         //     //get updated value of 'Zip Code'
         //     zipCodeUpdatedValue = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
         //     console.log(zipCodeUpdatedValue);
         //     const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','SaveButton');
         //     await saveButton.click();
         //     await driver.sleep(1000);
         //     const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
         //     await driver.wait(until.elementIsVisible(notificationMsgElement));
         //     const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
         //     strictEqual(notificationMsg, expectedNotification);
         //     await driver.sleep(3000);
         // }
     }
     //page navigation and comeback to product listing page
     // await pageNavigationObj.comeBackToContactListingPage(driver, screenshotPath);
     // await driver.sleep(2000);
     // const contactCheckboxElement = await moduleElementsObj.findContactCheckbox(driver,1);
     // await contactCheckboxElement.click();
     // await driver.sleep(1000);
     // const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
     // await previewButton.click();
     // await driver.sleep(2000);
     // console.log("Updated Contact Details after navigation on quick page:");
     // const quickPageFirstName = await driver.findElement(By.id('firstName')).getAttribute('value');
     // console.log(quickPageFirstName);
     // const quickPageLastName = await driver.findElement(By.id('lastName')).getAttribute('value');
     // console.log(quickPageLastName);
     // const quickPageJobTitle = await driver.findElement(By.id('designation')).getAttribute('value');
     // console.log(quickPageJobTitle);
     // const quickPageOwnerText = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
     // const quickPageOwner = await quickPageOwnerText.getText();
     // console.log(quickPageOwner);
     // const quickPageTypeText =  await commonElementsObj.findDropdown(driver,screenshotPath,'type');
     // const quickPageType = await quickPageTypeText.getText();
     // console.log(quickPageType);
     // const quickPageEmailOptOut = await driver.findElement(By.id('emailOptOut')).getAttribute('value');
     // console.log(quickPageEmailOptOut);
     // const quickPageEmailOptOutReason = await driver.findElement(By.id('emailOptOutReason')).getAttribute('value');
     // console.log(quickPageEmailOptOutReason);
     // const quickPageSmsOptOut = await driver.findElement(By.id('smaOptOut')).getAttribute('value');
     // console.log(quickPageSmsOptOut);
     // const quickPageCurrencyText = await commonElementsObj.findDropdown(driver,screenshotPath,'currency');
     // const quickPageCurrency = await quickPageCurrencyText.getText();
     // console.log(quickPageCurrency);
     // const quickPageTimeZoneText = await commonElementsObj.findDropdown(driver,screenshotPath,'timezone');
     // const quickPageTimeZone = await quickPageTimeZoneText.getText();
     // console.log(quickPageTimeZone);
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
     // const quickPageGooglePlus = await driver.findElement(By.id('googlePlusHandle')).getAttribute('value');
     // console.log(quickPageGooglePlus);
     // const quickPageDescription = await driver.findElement(By.id('description')).getAttribute('value');
     // console.log(quickPageDescription);
     // const quickPageTags = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div/input')).getText();
     // console.log(quickPageTags);
     // const quickPageAddressLine1 = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
     // console.log(quickPageAddressLine1);
     // const quickPageAddressLine2 = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
     // console.log(quickPageAddressLine2);
     // const quickPageCity= await driver.findElement(By.id('billingCity')).getAttribute('value');
     // console.log(quickPageCity);
     // const quickPageZipCode = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
     // console.log(quickPageZipCode);
     // const quickPageState = await driver.findElement(By.id('billingState')).getAttribute('value');
     // console.log(quickPageState);
     // const quickPageCountry = await driver.findElement(By.id('billingCountry')).getAttribute('value');
     // console.log(quickPageCountry);
     // const quickPageShippingAddressLine1 = await driver.findElement(By.id('shippingAddressLine1')).getAttribute('value');
     // console.log(quickPageShippingAddressLine1);
     // const quickPageShippingAddressLine2 = await driver.findElement(By.id('shippingAddressLine2')).getAttribute('value');
     // console.log(quickPageShippingAddressLine2);
     // const quickPageShippingCity = await driver.findElement(By.id('shippingCity')).getAttribute('value');
     // console.log(quickPageShippingCity);
     // const quickPageShippingState = await driver.findElement(By.id('shippingState')).getAttribute('value');
     // console.log(quickPageShippingState);
     // const quickPageShippingCountry = await driver.findElement(By.id('shippingCountry')).getAttribute('value');
     // console.log(quickPageShippingCountry);
     // const quickPageShippingZipCode = await driver.findElement(By.id('shippingZipCode')).getAttribute('value');
     // console.log(quickPageShippingZipCode);
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
     //try {
         // strictEqual(quickPageFirstName,firstNameUpdatedValue);
         // strictEqual(quickPageLastName, lastNameUpdatedValue);
         // strictEqual(quickPageJobTitle, jobTitleUpdatedValue);
         // strictEqual(quickPageOwner, ownerUpdatedValue);
         // strictEqual(quickPageType, typeUpdatedValue);
         // strictEqual(quickPageEmailOptOut, emailOptOutUpdatedValue);
         // strictEqual(quickPageEmailOptOutReason, emailOptOutReasonUpdatedValue);
         // strictEqual(quickPageSmsOptOut, smsOptOutUpdatedValue);
         // strictEqual(quickPageCurrency, currencyUpdatedValue);
         // strictEqual(quickPageTimeZone, timeZoneUpdatedValue);
         // strictEqual(quickPageSkype, skypeUpdatedValue);
         // strictEqual(quickPageWebsite, websiteUpdatedValue);
         // strictEqual(quickPageFacebook, facebookUpdatedValue);
         // strictEqual(quickPageLinkedIn, linkedInUpdatedValue);
         // strictEqual(quickPageInstagram, instagramUpdatedValue);
         // strictEqual(quickPageTwitter, twitterUpdatedValue);
         // strictEqual(quickPageGooglePlus, googleUpdatedValue);
         // strictEqual(quickPageDescription, descriptionUpdatedValue);
         // strictEqual(quickPageTags, tagUpdatedValue);
         // strictEqual(quickPageAddressLine1, addressLine1UpdatedValue);
         // strictEqual(quickPageAddressLine2, addressLine2UpdatedValue);
         // strictEqual(quickPageCity, cityUpdatedValue);
         // strictEqual(quickPageState, stateUpdatedValue);
         // strictEqual(quickPageZipCode, zipCodeUpdatedValue);
         // strictEqual(quickPageCountry, countryUpdatedValue);
         // strictEqual(quickPageShippingAddressLine1, shippingAddressLine1UpdatedValue);
         // strictEqual(quickPageShippingAddressLine2, shippingAddressLine2UpdatedValue);
         // strictEqual(quickPageShippingCity, shippingCityUpdatedValue);
         // strictEqual(quickPageShippingState, shippingStateUpdatedValue);
         // strictEqual(quickPageShippingCountry, shippingCountryUpdatedValue);
         // strictEqual(quickPageZipCode, shippingZipCodeUpdatedValue);
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
        //  console.log("As contact details in update contact page and quick page are equal,so test case has been passed");
        //  } catch (err) {
        //     await assert.fail(err);
        // }
        // const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        // await previewPageCloseIcon.click();
        // await driver.sleep(1500);
     }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massUpdate_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 4: As a User, Verify I should be able to display update button disable if I haven't checked any checkbox---------

When('user is able to display {string} button disable if I have not checked any checkbox under {string} of {string} module',async function(updateButton,massUpdateButton,moduleElement) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massUpdateContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massUpdateButton}`)
        await massUpdateContact.click();
        await driver.sleep(1000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Name' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit:2000});
        //check disability of 'Update' button
        const updateButtonElement = await driver.findElement(By.xpath(`//button[text()='${updateButton}']`));
        await driver.executeScript("arguments[0].scrollIntoView();", updateButtonElement);
        await driver.sleep(2000);
        const updateButtonDisability = !!await driver.findElement(By.xpath(`//button[text()="${updateButton}"]`)).getAttribute('disabled');
        console.log(updateButtonDisability);
        if(updateButtonDisability === true) {
            console.log("As update button is disabled when no contact is checked,so test case has been passed");
        } else {
            await assert.fail("As update button is not disabled even when no contact is checked,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleElement}`);
        await moduleIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'transferButton_NotDisabled.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 5: As a User, Verify upon clicking on cancel button it should terminate update process----------------

When('user upon clicking on cancel button it should terminate update process under {string}',async function(massUpdateButton) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(2000);
        const massUpdateContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massUpdateButton}`)
        await massUpdateContact.click();
        await driver.sleep(3000);
        const currentUrl = await driver.getCurrentUrl();
        console.log(currentUrl);
        if(currentUrl.includes('app/massoperation/')) {
            console.log("As mass update page redirected to expected url page,so test case has been passed");
        } else {
            await assert.fail("As mass update page is not redirected to expected url page,so test case has been aborted");
        }
        const massUpdateCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await massUpdateCancelButton.click();
        await driver.sleep(3000);
        const currentPageUrl = await driver.getCurrentUrl();
        console.log(currentPageUrl);
        if(currentPageUrl.endsWith('/list')) {
            console.log("As mass update termination redirected to expected contact url page,so test case has been passed");
        } else {
            await assert.fail("As mass update termination is not redirected to expected contact url page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'updateTermination_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 6: As a User, the system should give me a validation message when any criteria are not selected----------

When('system should give validation {string} when any criteria not selected under {string}',async function(expectedNotification,massUpdateButton) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massUpdateContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massUpdateButton}`)
        await massUpdateContact.click();
        await driver.sleep(1000);
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedNotification);
        await driver.sleep(4000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validation_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
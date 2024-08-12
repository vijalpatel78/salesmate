const { Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/08_companyPreviewPageTabs/01_detailsTab/screenshots/';
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const commonElementsObj = require('../../../../00_common/webElements/formElements');

let nameFieldData = 'no', numberOfEmployeesData = 'no', annualRevenueData = 'no', phoneFieldData = 'no', ownerFieldDropdownData = 'no',
nameBeforeNavigation = 'no', employeesBeforeNavigation = 'no', annualRevenueBeforeNavigation = 'no', phoneBeforeNavigation = 'no', ownerBeforeNavigation = 'no';

//----Case 1: As a User, Verify that by default it should display detail view of Company in Edit mode upon Opening quick view of company-----

Then('verify that by default it should display detail view of Company in Edit mode upon Opening quick view of company',async function(){
    try {
        //check 'Editable' fields
        //get 'Updated Contact' values after navigation
        const nameField = await driver.findElement(By.id('name')).isDisplayed();
        const websiteField = await driver.findElement(By.id('website')).isDisplayed();
        const ownerDropdown = await driver.findElement(By.name('owner')).isDisplayed();
        const phoneField = await driver.findElement(By.id('phone')).isDisplayed();
        const otherPhoneField = await driver.findElement(By.id('otherPhone')).isDisplayed();
        const numberOfEmployeesField = await driver.findElement(By.id('numberOfEmployees')).isDisplayed();
        const annualRevenue = await driver.findElement(By.id('annualRevenue')).isDisplayed();
        const currencyDropdown = await driver.findElement(By.name('currency')).isDisplayed();
        const typeDropdown = await driver.findElement(By.name('type')).isDisplayed();
        const skypeField = await driver.findElement(By.id('skypeId')).isDisplayed();
        const facebookField = await driver.findElement(By.id('facebookHandle')).isDisplayed();
        const linkedInField = await driver.findElement(By.id('linkedInHandle')).isDisplayed();
        const twitterField = await driver.findElement(By.id('twitterHandle')).isDisplayed();
        const instagramField = await driver.findElement(By.id('instagramHandle')).isDisplayed();
        const descriptionField = await driver.findElement(By.id('description')).isDisplayed();
        const tagsField = await driver.findElement(By.xpath('//sm-tag//sm-element//ro-tag/div[@class="ro-tag-autocomplete"]/input[@type="text"]')).isDisplayed();
        const addressLine1Field = await driver.findElement(By.id('billingAddressLine1')).isDisplayed();
        const addressLine2Field = await driver.findElement(By.id('billingAddressLine2')).isDisplayed();
        const cityField = await driver.findElement(By.id('billingCity')).isDisplayed();
        const zipCodeField = await driver.findElement(By.id('billingZipCode')).isDisplayed();
        const stateField = await driver.findElement(By.id('billingState')).isDisplayed();
        const countryField = await driver.findElement(By.id('billingCountry')).isDisplayed();
        const textField = await driver.findElement(By.id('textCustomField1')).isDisplayed();
        const textAreaField = await driver.findElement(By.id('textAreaCustomField1')).isDisplayed();
        const integerField = await driver.findElement(By.id('intCustomField1')).isDisplayed();
        const decimalField = await driver.findElement(By.id('decimalCustomField1')).isDisplayed();
        const dateField = await driver.findElement(By.id('dateCustomField1')).isDisplayed();
        const dateAndTimeField = await driver.findElement(By.id('dateTimeCustomField1')).isDisplayed();
        const emailDetailField = await driver.findElement(By.id('textCustomField2')).isDisplayed();
        const phoneDetailField = await driver.findElement(By.id('textCustomField3')).isDisplayed();
        const selectField = await driver.findElement(By.name('textCustomField4')).isDisplayed();
        const multiSelectField = await driver.findElement(By.name('multiSelectCustomField1')).isDisplayed();
        const urlField = await driver.findElement(By.id('textCustomField5')).isDisplayed();
        const bigIntegerField = await driver.findElement(By.id('bigIntCustomField1')).isDisplayed();
        const percentageField = await driver.findElement(By.id('decimalCustomField2')).isDisplayed();
        const booleanField = await driver.findElements(By.id('checkboxCustomField1'));
        const booleanFieldLength = await booleanField.length;
        const currencyField = await driver.findElement(By.id('decimalCustomField3')).isDisplayed();
        try {
            strictEqual(nameField,true);
            strictEqual(websiteField,true);
            strictEqual(ownerDropdown,true);
            strictEqual(phoneField,true);
            strictEqual(otherPhoneField,true);
            strictEqual(numberOfEmployeesField,true);
            strictEqual(annualRevenue,true);
            strictEqual(currencyDropdown,true);
            strictEqual(typeDropdown,true);
            strictEqual(skypeField,true);
            strictEqual(facebookField,true);
            strictEqual(linkedInField,true);
            strictEqual(twitterField,true);
            strictEqual(instagramField,true);
            strictEqual(descriptionField,true);
            strictEqual(tagsField,true);
            strictEqual(addressLine1Field,true);
            strictEqual(addressLine2Field,true);
            strictEqual(cityField,true);
            strictEqual(zipCodeField,true);
            strictEqual(stateField,true);
            strictEqual(countryField,true);
            strictEqual(textField,true);
            strictEqual(textAreaField,true);
            strictEqual(integerField,true);
            strictEqual(decimalField,true);
            strictEqual(dateField,true);
            strictEqual(dateAndTimeField,true);
            strictEqual(emailDetailField,true);
            strictEqual(phoneDetailField,true);
            strictEqual(selectField,true);
            strictEqual(multiSelectField,true);
            strictEqual(urlField,true);
            strictEqual(bigIntegerField,true);
            strictEqual(percentageField,true);
            strictEqual(booleanFieldLength,1);
            strictEqual(currencyField,true);
            console.log("As 'Updated Fields' are displayed under preview edit page,so test case has been passed");
        } catch(err) {
            await assert.fail(err);
        }
        //check visibility of 'Update' and 'Cancel' buttons
        const updateButtonVisibility = await driver.findElement(By.id('btnSubmit')).isDisplayed();
        const cancelButtonVisibility = await driver.findElement(By.xpath('//button[text()=" Cancel "]')).isDisplayed();
        if((updateButtonVisibility && cancelButtonVisibility) === true) {
            console.log("As 'Update' and 'Cancel' buttons are displayed,so test case has been passed");
        } else {
            await assert.fail("As 'Update' and 'Cancel' buttons are displayed,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updateDefaultButtons_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 2: As a User, Verify that it should allow me to change company data from Preview------------------

Then('verify that it should allow me to change company data from Preview',async function(dataTable){
    try {
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'name') {
                nameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required name field is given or not
                if (nameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the name field, the test case execution has been aborted');
                }

                //will find 'Name' field and pass the new data
                const nameField = await formElementsObj.findElementById(driver,screenshotPath, 'name','nameField');
                await clearFieldDataObj.clearFieldData(nameField);
                await nameField.sendKeys(nameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'number of employees') {
                numberOfEmployeesData = dataTable.rawTable[i][1];
                //will check that the data for the number of employees field is given or not
                if (numberOfEmployeesData == '') {
                    await assert.fail('Due to the blank value is provided for the number of employees field, the test case execution has been aborted');
                }

                //will find 'Number Of Employees' field and pass the new data
                const numberOfEmployeesField = await formElementsObj.findElementById(driver,screenshotPath, 'numberOfEmployees','numberOfEmployeesField');
                await clearFieldDataObj.clearFieldData(numberOfEmployeesField);
                await numberOfEmployeesField.sendKeys(numberOfEmployeesData);
                await driver.sleep(500);
            } else if (fieldName == 'annual revenue') {
                annualRevenueData = dataTable.rawTable[i][1];

                //will check that the data for the annual revenue field is given or not
                if (annualRevenueData == '') {
                    await assert.fail('Due to the blank value is provided for the annual revenue field, the test case execution has been aborted');
                }

                //will find 'Annual Revenue' field and pass the new data
                const annualRevenueField = await formElementsObj.findElementById(driver,screenshotPath, 'annualRevenue','annualRevenueField');
                await clearFieldDataObj.clearFieldData(annualRevenueField);
                await annualRevenueField.sendKeys(annualRevenueData);
                await driver.sleep(500);
            } else if (fieldName == 'phone') {
                phoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required phone field is given or not
                if (phoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await formElementsObj.findElementById(driver,screenshotPath, 'phone','phoneField');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'owner') {
                ownerFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the owner field dropdown field is given or not
                if (ownerFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the owner field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Owner' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldDropdownData, 'no');
            }
        }
        //get 'Updated Contact' values before navigation
        nameBeforeNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        employeesBeforeNavigation = await driver.findElement(By.id('numberOfEmployees')).getAttribute('value');
        annualRevenueBeforeNavigation = await driver.findElement(By.id('annualRevenue')).getAttribute('value');
        phoneBeforeNavigation = await driver.findElement(By.id('phone')).getAttribute('value');
        const ownerField = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
        ownerBeforeNavigation = await ownerField.getText();
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Update Button');
        await updateButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contact_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('check updated company details in preview page',async function(){
    try {
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(2000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2000);
        //get 'Updated Contact' values after navigation
        const nameAfterNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        const employeesAfterNavigation = await driver.findElement(By.id('numberOfEmployees')).getAttribute('value');
        const annualRevenueAfterNavigation = await driver.findElement(By.id('annualRevenue')).getAttribute('value');
        const phoneAfterNavigation = await driver.findElement(By.id('phone')).getAttribute('value');
        const ownerField = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
        const ownerAfterNavigation = await ownerField.getText();
        try {
            strictEqual(nameBeforeNavigation, nameAfterNavigation);
            strictEqual(employeesBeforeNavigation, employeesAfterNavigation);
            strictEqual(annualRevenueBeforeNavigation, annualRevenueAfterNavigation);
            strictEqual(phoneBeforeNavigation, phoneAfterNavigation);
            strictEqual(ownerBeforeNavigation, ownerAfterNavigation);
            console.log("As contact details are updated and updated contact details before and after navigation are equal,so test case has been passed");
        } catch(err) {
            await assert.fail(err);
        }
        const closeIconElement = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'companyFields_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
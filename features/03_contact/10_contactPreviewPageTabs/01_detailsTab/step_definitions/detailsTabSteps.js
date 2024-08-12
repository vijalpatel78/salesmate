const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/01_detailsTab/screenshots/';
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const addContactElementsObj = require('../../../02_addContact/common/addContactElements');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const commonElementsObj = require('../../../../00_common/webElements/formElements');

let firstNameFieldData = 'no', lastNameFieldData = 'no', mobileFieldData = 'no', emailFieldData = 'no', jobTitleFieldData = 'no', phoneFieldData = 'no';
let otherPhoneFieldData = 'no', ownerFieldDropdownData = 'no';
let firstNameBeforeNavigation = 'no', lastNameBeforeNavigation = 'no', mobileBeforeNavigation = 'no', emailBeforeNavigation = 'no';
let jobTitleBeforeNavigation = 'no', phoneBeforeNavigation = 'no', otherPhoneBeforeNavigation = 'no', ownerBeforeNavigation = 'no';

When('user is on the contact preview page',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(2000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactPreviewPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 1: As a User, Verify that by default it should display detail view of Contact in Edit mode upon Opening quick view of contact-----

Then('verify that by default it should display detail view of Contact in Edit mode upon Opening quick view of contact',async function(){
    try {
        //check 'Editable' fields
        //get 'Updated Contact' values after navigation
        const firstNameField = await driver.findElement(By.id('firstName')).isDisplayed();
        const lastNameField = await driver.findElement(By.id('lastName')).isDisplayed();
        const mobileField = await driver.findElement(By.id('mobile')).isDisplayed();
        const emailField = await driver.findElement(By.id('email')).isDisplayed();
        const companyField = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div[@class="ro-tag-autocomplete"]/input')).isDisplayed();
        const jobTitleField = await driver.findElement(By.id('designation')).isDisplayed();
        const phoneField = await driver.findElement(By.id('phone')).isDisplayed();
        const otherPhoneField = await driver.findElement(By.id('otherPhone')).isDisplayed();
        const ownerDropdown = await driver.findElement(By.name('owner')).isDisplayed();
        const typeDropdown = await driver.findElement(By.name('type')).isDisplayed();
        const currencyDropdown = await driver.findElement(By.name('currency')).isDisplayed();
        const timeZoneDropdown = await driver.findElement(By.name('timezone')).isDisplayed();
        const skypeField = await driver.findElement(By.id('skypeId')).isDisplayed();
        const websiteField = await driver.findElement(By.id('website')).isDisplayed();
        const facebookField = await driver.findElement(By.id('facebookHandle')).isDisplayed();
        const linkedInField = await driver.findElement(By.id('linkedInHandle')).isDisplayed();
        const twitterField = await driver.findElement(By.id('twitterHandle')).isDisplayed();
        const instagramField = await driver.findElement(By.id('instagramHandle')).isDisplayed();
        const googlePlusField = await driver.findElement(By.id('googlePlusHandle')).isDisplayed();
        const descriptionField = await driver.findElement(By.id('description')).isDisplayed();
        const tagsField = await driver.findElement(By.xpath('//sm-tag//sm-element//ro-tag/div[@class="ro-tag-autocomplete"]/input[@type="text"]')).isDisplayed();
        const addressLine1Field = await driver.findElement(By.id('billingAddressLine1')).isDisplayed();
        const addressLine2Field = await driver.findElement(By.id('billingAddressLine2')).isDisplayed();
        const cityField = await driver.findElement(By.id('billingCity')).isDisplayed();
        const zipCodeField = await driver.findElement(By.id('billingZipCode')).isDisplayed();
        const stateField = await driver.findElement(By.id('billingState')).isDisplayed();
        const countryField = await driver.findElement(By.id('billingCountry')).isDisplayed();
        const shippingAddressLine1Field = await driver.findElement(By.id('shippingAddressLine1')).isDisplayed();
        const shippingAddressLine2Field = await driver.findElement(By.id('shippingAddressLine2')).isDisplayed();
        const shippingCityField = await driver.findElement(By.id('shippingCity')).isDisplayed();
        const shippingStateField = await driver.findElement(By.id('shippingState')).isDisplayed();
        const shippingCountryField = await driver.findElement(By.id('shippingCountry')).isDisplayed();
        const shippingZipCodeField = await driver.findElement(By.id('shippingZipCode')).isDisplayed();
        const textField = await driver.findElement(By.id('textCustomField1')).isDisplayed();
        const textAreaField = await driver.findElement(By.id('textAreaCustomField1')).isDisplayed();
        const integerField = await driver.findElement(By.id('intCustomField1')).isDisplayed();
        const decimalField = await driver.findElement(By.id('decimalCustomField1')).isDisplayed();
        const dateField = await driver.findElement(By.id('dateCustomField1')).isDisplayed();
        const dateAndTimeField = await driver.findElement(By.id('dateTimeCustomField1')).isDisplayed();
        const emailDetailField = await driver.findElement(By.id('textCustomField2')).isDisplayed();
        const phoneDetailField = await driver.findElement(By.id('textCustomField3')).isDisplayed();
        const selectField = await driver.findElement(By.id('textCustomField4')).isDisplayed();
        const multiSelectField = await driver.findElement(By.id('multiSelectCustomField1')).isDisplayed();
        const urlField = await driver.findElement(By.id('textCustomField5')).isDisplayed();
        const bigIntegerField = await driver.findElement(By.id('bigIntCustomField1')).isDisplayed();
        const percentageField = await driver.findElement(By.id('decimalCustomField2')).isDisplayed();
        const booleanField = await driver.findElements(By.id('checkboxCustomField1'));
        const booleanFieldLength = await booleanField.length;
        const currencyField = await driver.findElement(By.id('decimalCustomField3')).isDisplayed();
        try {
            strictEqual(firstNameField,true);
            strictEqual(lastNameField,true);
            strictEqual(mobileField,true);
            strictEqual(emailField,true);
            strictEqual(companyField,true);
            strictEqual(jobTitleField,true);
            strictEqual(phoneField,true);
            strictEqual(otherPhoneField,true);
            strictEqual(ownerDropdown,true);
            strictEqual(typeDropdown,true);
            strictEqual(currencyDropdown,true);
            strictEqual(timeZoneDropdown,true);
            strictEqual(skypeField,true);
            strictEqual(websiteField,true);
            strictEqual(facebookField,true);
            strictEqual(linkedInField,true);
            strictEqual(twitterField,true);
            strictEqual(instagramField,true);
            strictEqual(googlePlusField,true);
            strictEqual(descriptionField,true);
            strictEqual(tagsField,true);
            strictEqual(addressLine1Field,true);
            strictEqual(addressLine2Field,true);
            strictEqual(cityField,true);
            strictEqual(zipCodeField,true);
            strictEqual(stateField,true);
            strictEqual(countryField,true);
            strictEqual(shippingAddressLine1Field,true);
            strictEqual(shippingAddressLine2Field,true);
            strictEqual(shippingCityField,true);
            strictEqual(shippingStateField,true);
            strictEqual(shippingCountryField,true);
            strictEqual(shippingZipCodeField,true);
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
        if(updateButtonVisibility === cancelButtonVisibility) {
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

//---------------Case 2: As a User, Verify that it should allow me to change contact data from Preview------------------

Then('verify that it should allow me to change contact data from Preview',async function(dataTable){
    try {
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await addContactElementsObj.findAddContactFields(driver, 'firstName');
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await addContactElementsObj.findAddContactFields(driver, 'lastName');
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'mobile') {
                mobileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required mobile field is given or not
                if (mobileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required mobile field, the test case execution has been aborted');
                }

                //will find 'Mobile' field and pass the new data
                const mobileField = await addContactElementsObj.findAddContactFields(driver, 'mobile');
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(mobileFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await addContactElementsObj.findAddContactFields(driver, 'email');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'job title') {
                jobTitleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required job title field is given or not
                if (jobTitleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required job title field, the test case execution has been aborted');
                }

                //will find 'Job Title' field and pass the new data
                const jobTitleField = await addContactElementsObj.findAddContactFields(driver, 'designation');
                await clearFieldDataObj.clearFieldData(jobTitleField);
                await jobTitleField.sendKeys(jobTitleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone') {
                phoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required phone field is given or not
                if (phoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await addContactElementsObj.findAddContactFields(driver, 'phone');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'other phone') {
                otherPhoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required other phone field is given or not
                if (otherPhoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required other phone field, the test case execution has been aborted');
                }

                //will find 'Other Phone' field and pass the new data
                const otherPhoneField = await addContactElementsObj.findAddContactFields(driver, 'otherPhone');
                await clearFieldDataObj.clearFieldData(otherPhoneField);
                await otherPhoneField.sendKeys(phoneFieldData);
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
        firstNameBeforeNavigation = await driver.findElement(By.id('firstName')).getAttribute('value');
        lastNameBeforeNavigation = await driver.findElement(By.id('lastName')).getAttribute('value');
        mobileBeforeNavigation = await driver.findElement(By.id('mobile')).getAttribute('value');
        emailBeforeNavigation = await driver.findElement(By.id('email')).getAttribute('value');
        jobTitleBeforeNavigation = await driver.findElement(By.id('designation')).getAttribute('value');
        phoneBeforeNavigation = await driver.findElement(By.id('phone')).getAttribute('value');
        otherPhoneBeforeNavigation = await driver.findElement(By.id('otherPhone')).getAttribute('value');
        const ownerField = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
        ownerBeforeNavigation = await ownerField.getText();
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Update Button');
        await updateButton.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contact_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('check updated contact details in contact preview page',async function(){
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
        const firstNameAfterNavigation = await driver.findElement(By.id('firstName')).getAttribute('value');
        const lastNameAfterNavigation = await driver.findElement(By.id('lastName')).getAttribute('value');
        const mobileAfterNavigation = await driver.findElement(By.id('mobile')).getAttribute('value');
        const emailAfterNavigation = await driver.findElement(By.id('email')).getAttribute('value');
        const jobTitleAfterNavigation = await driver.findElement(By.id('designation')).getAttribute('value');
        const phoneAfterNavigation = await driver.findElement(By.id('phone')).getAttribute('value');
        const otherPhoneAfterNavigation = await driver.findElement(By.id('otherPhone')).getAttribute('value');
        const ownerField = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
        const ownerAfterNavigation = await ownerField.getText();
        try {
            strictEqual(firstNameBeforeNavigation, firstNameAfterNavigation);
            strictEqual(lastNameBeforeNavigation, lastNameAfterNavigation);
            strictEqual(mobileBeforeNavigation, mobileAfterNavigation);
            strictEqual(emailBeforeNavigation, emailAfterNavigation);
            strictEqual(jobTitleBeforeNavigation, jobTitleAfterNavigation);
            strictEqual(phoneBeforeNavigation, phoneAfterNavigation);
            strictEqual(otherPhoneBeforeNavigation, otherPhoneAfterNavigation);
            strictEqual(ownerBeforeNavigation, ownerAfterNavigation);
            console.log("As contact details are updated and updated contact details before and after navigation are equal,so test case has been passed");
        } catch(err) {
            await assert.fail(err);
        }
        const closeIconElement = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactFields_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------Case 3: As a User, Verify Upon clicking on the Update button it should update Contact info with Updated values-------

When('verify Upon clicking on the Update button it should update Contact info with Updated values',async function(){
    try {
        const contact = await moduleElementsObj.clickOnContactName(driver,1);
        await contact.click();
        await driver.sleep(2000);
        const timeLine = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Updates');
        await timeLine.click();
        await driver.sleep(2000);
        //get updated values og 'Updates Tab'
        const updatesTimeLine = await driver.findElements(By.xpath('//div[@class="timeline-head-title"]'));
        const updatesTimeLineLength = await updatesTimeLine.length;
        for(let i = 1; i <= updatesTimeLineLength; i++) {
            console.log("Below are timeline entries:");
            const updatedContactField = await driver.findElement(By.xpath(`(//div[@class="timeline-head-title"])[${i}]`)).getText();
            console.log("Updated Contact Field "+i+": "+updatedContactField);
            const updatedContactFieldDetails = await driver.findElement(By.xpath(`(//div[@class="m-t-xs font-size-sm"])[${i}]`)).getText();
            console.log("Updated Contact Field Details "+i+": "+updatedContactFieldDetails);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 4: Verify, As a User i should not be able to see Update button as disabled if i don't have Edit contact rights------

When('user not able to see edit {string} module and log in through {string}',async function(moduleName,adminUser) {
    try {
        const contactModule = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await contactModule.click();
        await driver.sleep(2000);
        //check invisibility of 'Update' button on 'Contact Preview' page
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(2000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const previewPageUpdateButtonDisability = !!await driver.findElement(By.id('btnSubmit')).getAttribute('disabled');
        if (previewPageUpdateButtonDisability === true) {
            console.log("As preview page update button is not displayed after disabling edit contact rights,so test case has been passed");
        } else {
            await assert.fail("As preview page update button is displayed even after disabling edit contact rights,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editIcon_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----Case 5: verify that if I update from preview without adding Mandatory field it should display validation message----

Then('verify that if I update from preview without adding Mandatory field it should display validation message',async function(dataTable){
    try {
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will find 'Last Name' field and pass the new data
                const lastNameField = await driver.findElement(By.xpath("//input[@id='lastName'] | //input[@id='name']"));
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            }
        }
        const editPageUpdateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit');
        await editPageUpdateButton.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'validationMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('check validation as {string} message',async function(expectedValidation){
    const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
    try {
        strictEqual(actualValidation, expectedValidation);
        console.log("As actual and expected validations are equal,so test case has been passed");
    }catch(err) {
        await assert.fail(err);
    }
    const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
    await closeIcon.click();
    await driver.sleep(2000);
});
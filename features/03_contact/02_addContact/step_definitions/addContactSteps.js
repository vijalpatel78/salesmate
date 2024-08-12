const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/02_addContact/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const addContactElementsObj = require('../common/addContactElements');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const interfacePreferenceElementsObj = require('../../../04_myAccount/interfacePreferences/common/interfacePreferencesPageElements');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

let firstNameFieldData = 'no', lastNameFieldData = 'no', mobileFieldData = 'no', emailFieldData = 'no', jobTitleFieldData = 'no', phoneFieldData = 'no';
let otherPhoneFieldData = 'no', emailOptOutReasonFieldData = 'no', skypeFieldData = 'no', websiteFieldData = 'no';
let faceBookFieldData = 'no', linkedInFieldData = 'no', twitterFieldData = 'no', instagramFieldData = 'no', descriptionFieldData = 'no';
let addressLine1FieldData = 'no', addressLine2FieldData = 'no', cityFieldData = 'no', zipCodeFieldData = 'no', stateFieldData = 'no';
let countryFieldData = 'no', textFieldData = 'no', textAreaFieldData = 'no', integerFieldData = 'no', decimalFieldData = 'no';
let dateFieldData = 'no', dateAndTimeFieldData = 'no', emailDetailsFieldData = 'no', selectFieldData = 'no', multiSelectFieldData = 'no';
let phoneDetailsFieldData = 'no', urlFieldData = 'no', bigIntegerFieldData = 'no', percentageFieldData = 'no', currencyFieldData = 'no';
let contactsCountBeforeAddingExceedLength, contactsCountBeforeAddingInvalidEmail, companyNameFieldData = 'no';
let contactsCountBeforeAddingContact, ownerFieldDropdownData = 'no', typeFieldDropdownData = 'no', emailOptOutCheckboxState = 'no';
let smsOptOutCheckboxState = 'no', currencyDropdownData = 'no', timeZoneDropdownData = 'no', tagFieldData = 'no';

//----------------Case 1: user can see '+ contact' button only if user have create new contact rights-------------------

Then('add contact module is not visible and log in through {string}',async function(adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findContactModule(driver);
        await moduleIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const addContactButtonElement = await driver.findElements(By.xpath('//button[text()="Contact "]'));
        const addContactButtonCount = await addContactButtonElement.length;
        if (addContactButtonCount === 0) {
            console.log("As add contact button length is " + addContactButtonCount + " so it is not displayed after disabling contact module create right,so test case has been passed");
        } else {
            await assert.fail("As add contact button length is " + addContactButtonCount + " so it is displayed after disabling contact module create right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('add contact module is visible and log in through {string}',async function(adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findContactModule(driver);
        await moduleIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const addContactButtonElements = await driver.findElements(By.xpath('//button[text()="Contact "]'));
        const addContactButtonLength = await addContactButtonElements.length;
        if (addContactButtonLength > 0) {
            console.log("As add contact button length is " + addContactButtonLength + " so it is displayed after enabling contact module create right,so test case has been passed");
        } else {
            await assert.fail("As add contact button length is " + addContactButtonLength + " so it is not displayed after enabling contact module create right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------Case 2: Verify, As a User upon clicking on the button i should be able to see Add contact dialog--------------

When('user on clicking Add Contact button should be able to see {string} dialog',async function(expectedDialog) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(2000);
        //verify 'Add New Contact' dialog on clicking 'Add Contact' button
        const currentDialog = await driver.findElement(By.xpath('//h4[@class="modal-title pull-left"]')).getText();
        console.log("Add Contact Page Dialog: " + currentDialog);
        //check visibility of 'Add New Contact' dialog
        const addContactVisibility = !!await driver.findElement(By.xpath(`//h4[text()="${expectedDialog}"]`)).isDisplayed();
        console.log("Is Add New Contact Displayed: " + addContactVisibility);
        if (currentDialog === expectedDialog && addContactVisibility === true) {
            console.log("As contact page dialog and expected dialog are equal,so test case has been passed");
        } else {
            await assert.fail("As contact page dialog and expected dialog are not equal,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------Case 3: Verify, As a User I should be able to see Validation message for Mandatory fields upon focus out--------

When('user does not enter data on mandatory fields',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will find 'First Name' field and pass the new data
                const firstNameField = await addContactElementsObj.findAddContactFields(driver, 'firstName');
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will find 'Last Name' field and pass the new data
                const lastNameField = await addContactElementsObj.findAddContactFields(driver, 'lastName');
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check the validation {string} message',async function(expectedValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
        const actualNameValidation = await driver.findElement(By.xpath('//div[1]//sm-input-txt[1]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualNameValidation, expectedValidation);
        const actualSalePriceValidation = await driver.findElement(By.xpath('//div[1]//sm-input-txt[2]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSalePriceValidation, expectedValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 4: Verify, As a User I should be able to see Validation message for Mandatory fields upon focus out--------

When('user enter exceed length data on all fields',async function(dataTable) {
    try {
        //get contact lists count before adding exceed length contact details
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        contactsCountBeforeAddingExceedLength = await contactLists.length;
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

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
            } else if (fieldName == 'skype') {
                skypeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required skype field is given or not
                if (skypeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required skype field, the test case execution has been aborted');
                }

                //will find 'Skype' field and pass the new data
                const skypeField = await addContactElementsObj.findAddContactFields(driver, 'skypeId');
                await clearFieldDataObj.clearFieldData(skypeField);
                await skypeField.sendKeys(skypeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'website') {
                websiteFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required website field is given or not
                if (websiteFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required website field, the test case execution has been aborted');
                }

                //will find 'Website' field and pass the new data
                const websiteField = await addContactElementsObj.findAddContactFields(driver, 'website');
                await clearFieldDataObj.clearFieldData(websiteField);
                await websiteField.sendKeys(websiteFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'facebook') {
                faceBookFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required facebook field is given or not
                if (faceBookFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required facebook field, the test case execution has been aborted');
                }

                //will find 'Facebook' field and pass the new data
                const facebookField = await addContactElementsObj.findAddContactFields(driver, 'facebookHandle');
                await clearFieldDataObj.clearFieldData(facebookField);
                await facebookField.sendKeys(faceBookFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'linkedin') {
                linkedInFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required linked in field is given or not
                if (linkedInFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required linked in field, the test case execution has been aborted');
                }

                //will find 'Linked In' field and pass the new data
                const linkedInField = await addContactElementsObj.findAddContactFields(driver, 'linkedInHandle');
                await clearFieldDataObj.clearFieldData(linkedInField);
                await linkedInField.sendKeys(linkedInFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'twitter') {
                twitterFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required twitter field is given or not
                if (twitterFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required twitter field, the test case execution has been aborted');
                }

                //will find 'Twitter' field and pass the new data
                const twitterField = await addContactElementsObj.findAddContactFields(driver, 'twitterHandle');
                await clearFieldDataObj.clearFieldData(twitterField);
                await twitterField.sendKeys(twitterFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'instagram') {
                instagramFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required instagram field is given or not
                if (instagramFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required instagram field, the test case execution has been aborted');
                }

                //will find 'Instagram' field and pass the new data
                const instagramField = await addContactElementsObj.findAddContactFields(driver, 'instagramHandle');
                await clearFieldDataObj.clearFieldData(instagramField);
                await instagramField.sendKeys(instagramFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'description') {
                descriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required description field is given or not
                if (descriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const descriptionField = await addContactElementsObj.findAddContactFields(driver, 'description');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(descriptionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line1 field, the test case execution has been aborted');
                }

                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine1');
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line2') {
                addressLine2FieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line2 field is given or not
                if (addressLine2FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const addressLine2Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine2');
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'city') {
                cityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required city field is given or not
                if (cityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required city field, the test case execution has been aborted');
                }

                //will find 'City' field and pass the new data
                const cityField = await addContactElementsObj.findAddContactFields(driver, 'billingCity');
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(cityFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'zipcode') {
                zipCodeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required zip code field is given or not
                if (zipCodeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required zip code field, the test case execution has been aborted');
                }

                //will find 'Zip Code' field and pass the new data
                const zipCodeField = await addContactElementsObj.findAddContactFields(driver, 'billingZipCode');
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(zipCodeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'state') {
                stateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required state field is given or not
                if (stateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required state field, the test case execution has been aborted');
                }

                //will find 'State Field' field and pass the new data
                const stateField = await addContactElementsObj.findAddContactFields(driver, 'billingState');
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(stateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'country') {
                countryFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line2 field is given or not
                if (countryFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const countryField = await addContactElementsObj.findAddContactFields(driver, 'billingCountry');
                await clearFieldDataObj.clearFieldData(countryField);
                await countryField.sendKeys(countryFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text field') {
                textFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text field is given or not
                if (textFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
                }

                //will find 'Text' field and pass the new data
                const textField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField1');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'integer') {
                integerFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required integer field is given or not
                if (integerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required integer field, the test case execution has been aborted');
                }

                //will find 'Integer' field and pass the new data
                const integerField = await addContactElementsObj.findAddContactFields(driver, 'intCustomField1');
                await clearFieldDataObj.clearFieldData(integerField);
                await integerField.sendKeys(integerFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'decimal') {
                decimalFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required decimal field is given or not
                if (decimalFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required decimal field, the test case execution has been aborted');
                }

                //will find 'Decimal' field and pass the new data
                const decimalField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField1');
                await clearFieldDataObj.clearFieldData(decimalField);
                await decimalField.sendKeys(decimalFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email field') {
                emailDetailsFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email details field is given or not
                if (emailDetailsFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email Details Field' field and pass the new data
                const emailField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField2');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailDetailsFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone field') {
                phoneDetailsFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required phone field is given or not
                if (phoneDetailsFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField3');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneDetailsFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'url') {
                urlFieldData = dataTable.rawTable[i][1];

                //will check that the data for the url field is given or not
                if (urlFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the url field, the test case execution has been aborted');
                }

                //will find 'URL' field and pass the new data
                const urlField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField5');
                await clearFieldDataObj.clearFieldData(urlField);
                await urlField.sendKeys(urlFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'big integer') {
                bigIntegerFieldData = dataTable.rawTable[i][1];

                //will check that the data for the big integer field is given or not
                if (bigIntegerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the big integer field, the test case execution has been aborted');
                }

                //will find 'Big Integer' field and pass the new data
                const bigIntegerField = await addContactElementsObj.findAddContactFields(driver, 'bigIntCustomField1');
                await clearFieldDataObj.clearFieldData(bigIntegerField);
                await bigIntegerField.sendKeys(bigIntegerFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'percentage') {
                percentageFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required percentage field is given or not
                if (percentageFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required percentage field, the test case execution has been aborted');
                }

                //will find 'Percentage' field and pass the new data
                const percentageField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField2');
                await clearFieldDataObj.clearFieldData(percentageField);
                await percentageField.sendKeys(percentageFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'currency') {
                currencyFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required currency field is given or not
                if (currencyFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required currency field, the test case execution has been aborted');
                }

                //will find 'Currency Label' field and pass the new data
                const currencyField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField3');
                await clearFieldDataObj.clearFieldData(currencyField);
                await currencyField.sendKeys(currencyFieldData);
                await driver.sleep(2000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check validation messages {string},{string},{string},{string},{string},{string},{string}',async function(expectedLengthValidation,expectedCharValidation,expectedLongCharValidation,expectedZipCodeValidation,expectedNumberValidation,expectedLongIntValidation,expectedPercentageValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
        const actualFirstNameValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[1]//div')).getText();
        strictEqual(actualFirstNameValidation, expectedLengthValidation);
        const actualLastNameValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[2]//div')).getText();
        strictEqual(actualLastNameValidation, expectedLengthValidation);
        const actualMobileValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[3]//div')).getText();
        strictEqual(actualMobileValidation, expectedLengthValidation);
        const actualEmailValidation = await driver.findElement(By.xpath('//div/div[1]/div/sm-input-txt[4]/sm-element/sm-validation-messages/div[2]')).getText();
        strictEqual(actualEmailValidation, expectedLengthValidation);
        const actualJobValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[5]//div')).getText();
        strictEqual(actualJobValidation, expectedLengthValidation);
        const actualPhoneValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[6]//div')).getText();
        strictEqual(actualPhoneValidation, expectedLengthValidation);
        const actualOtherPhoneValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[7]//div')).getText();
        strictEqual(actualOtherPhoneValidation, expectedLengthValidation);
        const actualSkypeValidation = await driver.findElement(By.xpath('//div[2]/div/sm-input-txt[1]//div')).getText();
        strictEqual(actualSkypeValidation, expectedLengthValidation);
        const actualWebsiteValidation = await driver.findElement(By.xpath('//div[2]/div/sm-input-txt[2]//div')).getText();
        strictEqual(actualWebsiteValidation, expectedCharValidation);
        const actualFacebookValidation = await driver.findElement(By.xpath('//div[2]/div/sm-input-txt[3]//div')).getText();
        strictEqual(actualFacebookValidation, expectedCharValidation);
        const actualLinkedInValidation = await driver.findElement(By.xpath('//div[2]/div/sm-input-txt[4]//div')).getText();
        strictEqual(actualLinkedInValidation, expectedCharValidation);
        const actualTwitterValidation = await driver.findElement(By.xpath('//div[2]/div/sm-input-txt[5]//div')).getText();
        strictEqual(actualTwitterValidation, expectedCharValidation);
        const actualInstagramValidation = await driver.findElement(By.xpath('//div[2]/div/sm-input-txt[6]//div')).getText();
        strictEqual(actualInstagramValidation, expectedLengthValidation);
        const actualDescriptionValidation = await driver.findElement(By.xpath('//div[3]/div/sm-textarea-txt/sm-element/sm-validation-messages/div')).getText();
        strictEqual(actualDescriptionValidation, expectedLongCharValidation);
        const actualAddressLine1Validation = await driver.findElement(By.xpath('//div[4]/div/sm-input-txt[1]//div')).getText();
        strictEqual(actualAddressLine1Validation, expectedLengthValidation);
        const actualAddressLine2Validation = await driver.findElement(By.xpath('//div[4]/div/sm-input-txt[2]//div')).getText();
        strictEqual(actualAddressLine2Validation, expectedLengthValidation);
        const actualCityValidation = await driver.findElement(By.xpath('//div[4]/div/sm-input-txt[3]//div')).getText();
        strictEqual(actualCityValidation, expectedLengthValidation);
        const actualZipCodeValidation = await driver.findElement(By.xpath('//div[4]/div/sm-input-txt[4]/sm-element/sm-validation-messages/div')).getText();
        strictEqual(actualZipCodeValidation, expectedZipCodeValidation);
        const actualStateValidation = await driver.findElement(By.xpath('//div[4]/div/sm-input-txt[5]/sm-element/sm-validation-messages/div')).getText();
        strictEqual(actualStateValidation, expectedLengthValidation);
        const actualCountryValidation = await driver.findElement(By.xpath('//div[4]/div/sm-input-txt[6]/sm-element/sm-validation-messages/div')).getText();
        strictEqual(actualCountryValidation, expectedLengthValidation);
        const actualTextFieldValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[1]//div')).getText();
        strictEqual(actualTextFieldValidation, expectedLengthValidation);
        const actualIntegerValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[2]//div')).getText();
        strictEqual(actualIntegerValidation, expectedNumberValidation);
        const actualDecimalValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[3]//div')).getText();
        strictEqual(actualDecimalValidation, expectedLongIntValidation);
        const actualEmailFieldValidation = await driver.findElement(By.xpath('//div/div[5]//sm-input-txt[4]/sm-element/sm-validation-messages/div[2]')).getText();
        strictEqual(actualEmailFieldValidation, expectedLengthValidation);
        const actualPhoneFieldValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[5]//div')).getText();
        strictEqual(actualPhoneFieldValidation, expectedLengthValidation);
        const actualURLValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[6]//div')).getText();
        strictEqual(actualURLValidation, expectedLengthValidation);
        const actualBigIntegerValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[7]//div')).getText();
        strictEqual(actualBigIntegerValidation, expectedLongIntValidation);
        const actualPercentageValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[8]//div')).getText();
        strictEqual(actualPercentageValidation, expectedPercentageValidation);
        const actualCurrencyValidation = await driver.findElement(By.xpath('//div[5]/div/sm-input-txt[9]//div')).getText();
        strictEqual(actualCurrencyValidation, expectedLongIntValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        //get contact lists count after adding exceed length contact details
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountAfterAddingExceedLength = await contactLists.length;
        if (contactsCountBeforeAddingExceedLength === contactsCountAfterAddingExceedLength) {
            console.log("As new contact details are not added due to exceed length of contact details,so test case has been passed");
        } else {
            await assert.fail("As new contact details are added even of exceed length contact details,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 5: Verify, As a User i should be able to see invalid email Validation-----------------------

When('user is able to enter invalid email',async function(dataTable) {
    try {
        //get contact lists count before adding invalid email contact details
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        contactsCountBeforeAddingInvalidEmail = await contactLists.length;
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await addContactElementsObj.findAddContactFields(driver, 'email');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check email validation {string}',async function(expectedEmailValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
        const actualEmailValidation = await driver.findElement(By.xpath('//div/div[1]/div[@class="row"]/sm-input-txt[4]//div[1]')).getText();
        strictEqual(actualEmailValidation, expectedEmailValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
        //get contact lists count after adding invalid email contact details
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountAfterAddingInvalidEmail = await contactLists.length;
        if (contactsCountBeforeAddingInvalidEmail === contactsCountAfterAddingInvalidEmail) {
            console.log("As new contact details are not added due to invalid email contact details,so test case has been passed");
        } else {
            await assert.fail("As new contact details are added even of invalid email contact details,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 6: Verify, As a User i should be able to create a new company using quick view-------------------

When('user is able to create a new company using quick view',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required company is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required company field, the test case execution has been aborted');
                }

                //will find 'Company' field and pass the new data
                const companyNameField = await addContactElementsObj.findCompanyField(driver);
                await clearFieldDataObj.clearFieldData(companyNameField);
                await companyNameField.sendKeys(companyNameFieldData);
                await driver.sleep(500);
                const createCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'div','Create New Company');
                await createCompanyButton.click();
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify quick view default fields',async function() {
    try {
        console.log("Below Are Visibility Of Default Fields Of 'Company':");
        //check 'Name' field visibility
        const nameFieldVisibility = !!await driver.findElement(By.id('name')).isDisplayed();
        console.log("Is Name Field Visible: " + nameFieldVisibility);
        //check 'Website' field visibility
        const websiteFieldVisibility = !!await driver.findElement(By.id('website')).isDisplayed();
        console.log("Is Website Field Visible: " + websiteFieldVisibility);
        //check 'Owner' field visibility
        const ownerFieldVisibility = !!await driver.findElement(By.name('owner')).isDisplayed();
        console.log("Is Owner Field Visible: " + ownerFieldVisibility);
        //check 'Phone' field visibility
        const phoneFieldVisibility = !!await driver.findElement(By.id('phone')).isDisplayed();
        console.log("Is Phone Field Visible: " + phoneFieldVisibility);
        if ((nameFieldVisibility && websiteFieldVisibility && ownerFieldVisibility && phoneFieldVisibility) === true) {
            console.log("As 'Name','Website','Owner' and 'Phone' fields are default fields while creating company,so test case has been passed");
        } else {
            await assert.fail("As 'Name','Website','Owner' and 'Phone' fields are not displayed as default fields while creating company,so test case has been aborted");
        }
        const companyCloseIcon = await moduleElementsObj.findPopupByXpath(driver,'button','class','close','Company Close Icon');
        await companyCloseIcon.click();
        await driver.sleep(1000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 7: Verify, User is able to search a company from company field to associate it in contact-------------

When('user is able to search a company from company field to associate it in contact',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'search company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }
                //searching for 'Company Field' and pass the new data
                const companyField = await addContactElementsObj.findCompanyField(driver);
                await clearFieldDataObj.clearFieldData(companyField);
                await companyField.sendKeys(companyNameFieldData);
                await driver.sleep(2000);

                //getting value of search box
                const companySearchName = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input[@type="text"]')).getAttribute('value');
                console.log("Existing Search Company Value: " + companySearchName);

                //getting value of companies
                const resultValue1 = await driver.findElement(By.xpath('//sm-element//ro-tag/div/div/div[1]/ul/li[1]/div/div')).getText();
                console.log("Search Field Result Value 1: " + resultValue1);
                const resultValue2 = await driver.findElement(By.xpath('//sm-element//ro-tag/div/div/div[1]/ul/li[2]/div/div')).getText();
                console.log("Search Field Result Value 2: " + resultValue2);
                const resultValue3 = await driver.findElement(By.xpath('//sm-element//ro-tag/div/div/div[1]/ul/li[3]/div/div')).getText();
                console.log("Search Field Result Value 3: " + resultValue3);

                //compare 'Company Search Name' and 'Result Value'
                if (resultValue1.includes(companySearchName) && resultValue2.includes(companySearchName) && resultValue3.includes(companySearchName)) {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + 'companyNameSearchRecordFound.png');
                    console.log("As company name which contain searched chars is displayed,so test case has been passed");
                } else {
                    await assert.fail("As company name contain searched chars is not displayed,so test case has been aborted");
                }
            }
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});


//-------Case 8: Verify, As a User It should display No result found if i search a company which is created by another user--------

When('user searches for non-existing company name',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'non-existing company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }
                //searching for 'Company Field' and pass the new data
                const companyField = await addContactElementsObj.findCompanyField(driver);
                await clearFieldDataObj.clearFieldData(companyField);
                await companyField.sendKeys(companyNameFieldData);
                await driver.sleep(3000);

                //getting value of search box
                const companySearchName = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input[@type="text"]')).getAttribute('value');
                console.log("Non-Existing Search Company Value: " + companySearchName);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('system displays record message as {string}',async function(expectedRecordMessage) {
    //verifying 'No Result Found' message
    try {
        const actualRecordMessage = await driver.findElement(By.xpath('//ro-tag/div/div/div[1]/ul/li')).getText();
        console.log("Record Message: " + actualRecordMessage);
        try {
            strictEqual(actualRecordMessage, expectedRecordMessage);
            console.log("As " + actualRecordMessage + " is displayed for non-existing company search name,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 9: Verify, As a User i should be able to perform Save and cancel button functionality of company quick view------

When('user is able to perform Save button functionality of company quick view',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required company is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required company field, the test case execution has been aborted');
                }

                //will find 'Company' field and pass the new data
                const companyNameField = await addContactElementsObj.findCompanyField(driver);
                await clearFieldDataObj.clearFieldData(companyNameField);
                await companyNameField.sendKeys(companyNameFieldData);
                await driver.sleep(2000);
                const createCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'div','Create New Company');
                await createCompanyButton.click();
                await driver.sleep(2000);
                //check company value of quick page
                const quickPageCompanyName = await driver.findElement(By.id('name')).getAttribute('value');
                console.log("Quick Page Company Name: " + quickPageCompanyName);
                const customField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField6','customField');
                await clearFieldDataObj.clearFieldData(customField);
                await customField.sendKeys('std');
                await driver.sleep(500);
                //will find 'Company' field and pass the new data
                const companySaveButton = await moduleElementsObj.findPopupByXpath(driver,'button','id','btnSubmit','Company Save Button');
                await companySaveButton.click();
                await driver.sleep(3500);
                //check company value of add contact page
                const contactPageCompanyName = await driver.findElement(By.xpath('//div[@class="tags-item-block"]//b')).getText();
                console.log("Contact Page Company Name: " + contactPageCompanyName);
                if (quickPageCompanyName === contactPageCompanyName) {
                    console.log("As quick page and contact page company names are equal,so test case has been passed");
                } else {
                    await assert.fail("As quick page and contact page company names are not equal,so test case has been aborted");
                }
            }
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is able to perform Cancel button functionality of company quick view',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required company is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required company field, the test case execution has been aborted');
                }

                //will find 'Company' field and pass the new data
                const companyNameField = await addContactElementsObj.findCompanyField(driver);
                await clearFieldDataObj.clearFieldData(companyNameField);
                await companyNameField.sendKeys(companyNameFieldData);
                await driver.sleep(2000);
                const createCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'div','Create New Company');
                await createCompanyButton.click();
                await driver.sleep(1500);
                const companyCancelButton = await moduleElementsObj.findPopupByVisibleText(driver,'button',' Cancel ');
                await companyCancelButton.click();
                await driver.sleep(1500);
                //check after cancelling create company page verify add contact page
                const addContactPageElements = await driver.findElements(By.xpath('//h4[text()="Add New Contact"]'));
                const addContactPageLength = await addContactPageElements.length;
                if (addContactPageLength > 0) {
                    console.log("As company quick page is terminated and add new contact page is opened,so test case has been passed");
                } else {
                    await assert.fail("As company quick page is not terminated and add new contact page is not opened,so test case has been aborted");
                }
            }
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 10: Verify, user is able to verify Save and cancel button functionality of create new contacts---------

When('user is able to verify Save and cancel button functionality of create new contacts',async function(dataTable) {
    try {
        //get contact lists count before adding contact details
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        contactsCountBeforeAddingContact = await contactLists.length;
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

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
            } else if (fieldName == 'type') {
                typeFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the type field dropdown field is given or not
                if (typeFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the type field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Type' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//div/div[1]/div/sm-select-box[2]/sm-element/div/span//span/span[@role="presentation"]')).click();
                await driver.findElement(By.xpath('//ul/li[4]/span[@class="contact-type purple"]')).click();
                await driver.sleep(1000);
            } else if (fieldName == 'email opt out checkbox') {
                emailOptOutCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (emailOptOutCheckboxState == 'enable' || emailOptOutCheckboxState == 'disable') {
                    //will find 'Email Opt Out' checkbox
                    const emailOptOutCheckbox = await addContactElementsObj.findAddContactFields(driver, 'emailOptOut');
                    await driver.executeScript("arguments[0].focus();", emailOptOutCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Email Opt Out Checkbox'
                    const currentState = await emailOptOutCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Email Opt Out Checkbox'
                    if (currentState != emailOptOutCheckboxState) {
                        await driver.executeScript("arguments[0].click();", emailOptOutCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the email opt out checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'email opt out reason') {
                emailOptOutReasonFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required other email opt out reason field is given or not
                if (emailOptOutReasonFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email opt out reason field, the test case execution has been aborted');
                }

                //will find 'Email Opt Out Reason' field and pass the new data
                const emailOptOutReasonField = await addContactElementsObj.findAddContactFields(driver, 'emailOptOutReason');
                await clearFieldDataObj.clearFieldData(emailOptOutReasonField);
                await emailOptOutReasonField.sendKeys(emailOptOutReasonFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sms opt out') {
                smsOptOutCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (smsOptOutCheckboxState == 'enable' || smsOptOutCheckboxState == 'disable') {
                    //will find 'SMS Opt Out' checkbox
                    const smsOptOutCheckbox = await addContactElementsObj.findAddContactFields(driver, 'smsOptOut');
                    await driver.executeScript("arguments[0].focus();", smsOptOutCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'SMS Opt Out Checkbox'
                    const currentState = await smsOptOutCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'SMS Opt Out Checkbox'
                    if (currentState != smsOptOutCheckboxState) {
                        await driver.executeScript("arguments[0].click();", smsOptOutCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the sms opt out checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'time zone') {
                timeZoneDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the time zone field dropdown field is given or not
                if (timeZoneDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the time zone field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Time Zone' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'timezone', timeZoneDropdownData, 'yes');
            } else if (fieldName == 'skype') {
                skypeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required skype field is given or not
                if (skypeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required skype field, the test case execution has been aborted');
                }

                //will find 'Skype' field and pass the new data
                const skypeField = await addContactElementsObj.findAddContactFields(driver, 'skypeId');
                await clearFieldDataObj.clearFieldData(skypeField);
                await skypeField.sendKeys(skypeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'website') {
                websiteFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required website field is given or not
                if (websiteFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required website field, the test case execution has been aborted');
                }

                //will find 'Website' field and pass the new data
                const websiteField = await addContactElementsObj.findAddContactFields(driver, 'website');
                await clearFieldDataObj.clearFieldData(websiteField);
                await websiteField.sendKeys(websiteFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'facebook') {
                faceBookFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required facebook field is given or not
                if (faceBookFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required facebook field, the test case execution has been aborted');
                }

                //will find 'Facebook' field and pass the new data
                const facebookField = await addContactElementsObj.findAddContactFields(driver, 'facebookHandle');
                await clearFieldDataObj.clearFieldData(facebookField);
                await facebookField.sendKeys(faceBookFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'linkedin') {
                linkedInFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required linked in field is given or not
                if (linkedInFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required linked in field, the test case execution has been aborted');
                }

                //will find 'Linked In' field and pass the new data
                const linkedInField = await addContactElementsObj.findAddContactFields(driver, 'linkedInHandle');
                await clearFieldDataObj.clearFieldData(linkedInField);
                await linkedInField.sendKeys(linkedInFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'twitter') {
                twitterFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required twitter field is given or not
                if (twitterFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required twitter field, the test case execution has been aborted');
                }

                //will find 'Twitter' field and pass the new data
                const twitterField = await addContactElementsObj.findAddContactFields(driver, 'twitterHandle');
                await clearFieldDataObj.clearFieldData(twitterField);
                await twitterField.sendKeys(twitterFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'instagram') {
                instagramFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required instagram field is given or not
                if (instagramFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required instagram field, the test case execution has been aborted');
                }

                //will find 'Instagram' field and pass the new data
                const instagramField = await addContactElementsObj.findAddContactFields(driver, 'instagramHandle');
                await clearFieldDataObj.clearFieldData(instagramField);
                await instagramField.sendKeys(instagramFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'description') {
                descriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required description field is given or not
                if (descriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const descriptionField = await addContactElementsObj.findAddContactFields(driver, 'description');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(descriptionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'tags') {
                tagFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required tags field is given or not
                if (tagFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const tagsField = await addContactElementsObj.findTagsField(driver);
                await clearFieldDataObj.clearFieldData(tagsField);
                await tagsField.sendKeys(tagFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line1 field, the test case execution has been aborted');
                }

                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine1');
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line2') {
                addressLine2FieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line2 field is given or not
                if (addressLine2FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const addressLine2Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine2');
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'city') {
                cityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required city field is given or not
                if (cityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required city field, the test case execution has been aborted');
                }

                //will find 'City' field and pass the new data
                const cityField = await addContactElementsObj.findAddContactFields(driver, 'billingCity');
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(cityFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'zipcode') {
                zipCodeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required zip code field is given or not
                if (zipCodeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required zip code field, the test case execution has been aborted');
                }

                //will find 'Zip Code' field and pass the new data
                const zipCodeField = await addContactElementsObj.findAddContactFields(driver, 'billingZipCode');
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(zipCodeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'state') {
                stateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required state field is given or not
                if (stateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required state field, the test case execution has been aborted');
                }

                //will find 'State Field' field and pass the new data
                const stateField = await addContactElementsObj.findAddContactFields(driver, 'billingState');
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(stateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'country') {
                countryFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line2 field is given or not
                if (countryFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const countryField = await addContactElementsObj.findAddContactFields(driver, 'billingCountry');
                await clearFieldDataObj.clearFieldData(countryField);
                await countryField.sendKeys(countryFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text field') {
                textFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text field is given or not
                if (textFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
                }

                //will find 'Text' field and pass the new data
                const textField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField1');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text area') {
                textAreaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text area field is given or not
                if (textAreaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text area field, the test case execution has been aborted');
                }

                //will find 'Text Area' field and pass the new data
                const textAreaField = await addContactElementsObj.findAddContactFields(driver, 'textAreaCustomField1');
                await clearFieldDataObj.clearFieldData(textAreaField);
                await textAreaField.sendKeys(textAreaFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'integer') {
                integerFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required integer field is given or not
                if (integerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required integer field, the test case execution has been aborted');
                }

                //will find 'Integer' field and pass the new data
                const integerField = await addContactElementsObj.findAddContactFields(driver, 'intCustomField1');
                await clearFieldDataObj.clearFieldData(integerField);
                await integerField.sendKeys(integerFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'decimal') {
                decimalFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required decimal field is given or not
                if (decimalFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required decimal field, the test case execution has been aborted');
                }

                //will find 'Decimal' field and pass the new data
                const decimalField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField1');
                await clearFieldDataObj.clearFieldData(decimalField);
                await decimalField.sendKeys(decimalFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date') {
                dateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required date field is given or not
                if (dateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required date field, the test case execution has been aborted');
                }

                //will find 'Date' field and pass the new data
                const dateField = await addContactElementsObj.findAddContactFields(driver, 'dateCustomField1');
                await clearFieldDataObj.clearFieldData(dateField);
                await dateField.sendKeys(dateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date and time') {
                dateAndTimeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required date and time field is given or not
                if (dateAndTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required date and time field, the test case execution has been aborted');
                }

                //will find 'Date And Time' field and pass the new data
                const dateAndTimeField = await addContactElementsObj.findAddContactFields(driver, 'dateTimeCustomField1');
                await clearFieldDataObj.clearFieldData(dateAndTimeField);
                await dateAndTimeField.sendKeys(dateAndTimeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email field') {
                emailDetailsFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email details field is given or not
                if (emailDetailsFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email Details Field' field and pass the new data
                const emailField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField2');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailDetailsFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone field') {
                phoneDetailsFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required phone field is given or not
                if (phoneDetailsFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField3');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneDetailsFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'select field') {
                selectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the select field dropdown field is given or not
                if (selectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the select field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Select' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'textCustomField4', selectFieldData, 'yes');
            } else if (fieldName == 'multi select field') {
                multiSelectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the multi select field dropdown field is given or not
                if (multiSelectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the multi select field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Multi Select' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//div[5]/div/sm-select-box[2]/sm-element/div/span//span[@role="combobox"]')).click();
                await driver.findElement(By.xpath(`//ul[@role='tree']/li[text()="${multiSelectFieldData}"]`)).click();
                await driver.findElement(By.xpath('//div[5]/div/sm-select-box[2]/sm-element/div/span//span[@role="combobox"]')).click();
            } else if (fieldName == 'url') {
                urlFieldData = dataTable.rawTable[i][1];

                //will check that the data for the url field is given or not
                if (urlFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the url field, the test case execution has been aborted');
                }

                //will find 'URL' field and pass the new data
                const urlField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField5');
                await clearFieldDataObj.clearFieldData(urlField);
                await urlField.sendKeys(urlFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'big integer') {
                bigIntegerFieldData = dataTable.rawTable[i][1];

                //will check that the data for the big integer field is given or not
                if (bigIntegerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the big integer field, the test case execution has been aborted');
                }

                //will find 'Big Integer' field and pass the new data
                const bigIntegerField = await addContactElementsObj.findAddContactFields(driver, 'bigIntCustomField1');
                await clearFieldDataObj.clearFieldData(bigIntegerField);
                await bigIntegerField.sendKeys(bigIntegerFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'percentage') {
                percentageFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required percentage field is given or not
                if (percentageFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required percentage field, the test case execution has been aborted');
                }

                //will find 'Percentage' field and pass the new data
                const percentageField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField2');
                await clearFieldDataObj.clearFieldData(percentageField);
                await percentageField.sendKeys(percentageFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'currency field') {
                currencyFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required currency field is given or not
                if (currencyFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required currency field, the test case execution has been aborted');
                }

                //will find 'Currency Label' field and pass the new data
                const currencyField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField3');
                await clearFieldDataObj.clearFieldData(currencyField);
                await currencyField.sendKeys(currencyFieldData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check {string} message and verify view details',async function(expectedNotification) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(500);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(2500);
        //click on 'View link' on notification message
        const notificationViewButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','View');
        await notificationViewButton.click();
        await driver.sleep(3500);
        //check page redirection to contact details page
        const currentPageURL = await driver.getCurrentUrl();
        console.log("Current Page URL: " + currentPageURL);
        if (currentPageURL.endsWith('/detail')) {
            console.log("As current page url ends with expected url,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As current page url ends with expected url,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findContactModule(driver);
        await moduleIcon.click();
        await driver.sleep(2000);
        //get contact lists count after adding contact details
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountAfterAddingContact = await contactLists.length;
        if ((contactsCountBeforeAddingContact) + 1 === contactsCountAfterAddingContact) {
            console.log("As contacts are increased by (X+1) and newly added contact is added,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As contacts are not increased by (X+1) and newly added contact is not added,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is able to create a contact',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

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
            } else if (fieldName == 'text field') {
                textFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text field is given or not
                if (textFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
                }

                //will find 'Text' field and pass the new data
                const textField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField1');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check {string} message and verify close details',async function(expectedNotification) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //click on 'Close link' on notification message
        const notificationCloseButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Close');
        await notificationCloseButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check closed notification message
        const notificationElement = await driver.findElements(By.xpath('//span[@class="noty_text"]'));
        const notificationElementLength = await notificationElement.length;
        if (notificationElementLength === 0) {
            console.log("As notification message length is " + notificationElementLength + " so,it is closed,test case has been passed");
        } else {
            await assert.fail("As notification message length is " + notificationElementLength + " so,it is closed,test case has been aborted");
        }
        //check page redirection to contact listing page
        const currentPageURL = await driver.getCurrentUrl();
        console.log("Current Page URL: " + currentPageURL);
        if (currentPageURL.endsWith('/app/contacts/list')) {
            console.log("As current page url ends with expected url,so test case has been passed");
        } else {
            await assert.fail("As current page url ends with expected url,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 11: Verify, As a User i should be able to verify Save and Add other button functionality of create new contacts----------

When('user is able to verify Save and Add other button functionality of create new contacts',async function(dataTable) {
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

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
            } else if (fieldName == 'type') {
                typeFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the type field dropdown field is given or not
                if (typeFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the type field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Type' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//div/div[1]/div/sm-select-box[2]/sm-element/div/span//span/span[@role="presentation"]')).click();
                await driver.findElement(By.xpath('//ul/li[4]/span[@class="contact-type purple"]')).click();
                await driver.sleep(1000);
            } else if (fieldName == 'email opt out checkbox') {
                emailOptOutCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (emailOptOutCheckboxState == 'enable' || emailOptOutCheckboxState == 'disable') {
                    //will find 'Email Opt Out' checkbox
                    const emailOptOutCheckbox = await addContactElementsObj.findAddContactFields(driver, 'emailOptOut');
                    await driver.executeScript("arguments[0].focus();", emailOptOutCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Email Opt Out Checkbox'
                    const currentState = await emailOptOutCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Email Opt Out Checkbox'
                    if (currentState != emailOptOutCheckboxState) {
                        await driver.executeScript("arguments[0].click();", emailOptOutCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the email opt out checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'email opt out reason') {
                emailOptOutReasonFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required other email opt out reason field is given or not
                if (emailOptOutReasonFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email opt out reason field, the test case execution has been aborted');
                }

                //will find 'Email Opt Out Reason' field and pass the new data
                const emailOptOutReasonField = await addContactElementsObj.findAddContactFields(driver, 'emailOptOutReason');
                await clearFieldDataObj.clearFieldData(emailOptOutReasonField);
                await emailOptOutReasonField.sendKeys(emailOptOutReasonFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sms opt out') {
                smsOptOutCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (smsOptOutCheckboxState == 'enable' || smsOptOutCheckboxState == 'disable') {
                    //will find 'SMS Opt Out' checkbox
                    const smsOptOutCheckbox = await addContactElementsObj.findAddContactFields(driver, 'smsOptOut');
                    await driver.executeScript("arguments[0].focus();", smsOptOutCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'SMS Opt Out Checkbox'
                    const currentState = await smsOptOutCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'SMS Opt Out Checkbox'
                    if (currentState != smsOptOutCheckboxState) {
                        await driver.executeScript("arguments[0].click();", smsOptOutCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the sms opt out checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'currency') {
                currencyDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the currency field dropdown field is given or not
                if (currencyDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the currency field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Currency' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'currency', currencyDropdownData, 'yes');
            } else if (fieldName == 'time zone') {
                timeZoneDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the time zone field dropdown field is given or not
                if (timeZoneDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the time zone field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Time Zone' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'timezone', timeZoneDropdownData, 'yes');
            } else if (fieldName == 'skype') {
                skypeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required skype field is given or not
                if (skypeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required skype field, the test case execution has been aborted');
                }

                //will find 'Skype' field and pass the new data
                const skypeField = await addContactElementsObj.findAddContactFields(driver, 'skypeId');
                await clearFieldDataObj.clearFieldData(skypeField);
                await skypeField.sendKeys(skypeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'website') {
                websiteFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required website field is given or not
                if (websiteFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required website field, the test case execution has been aborted');
                }

                //will find 'Website' field and pass the new data
                const websiteField = await addContactElementsObj.findAddContactFields(driver, 'website');
                await clearFieldDataObj.clearFieldData(websiteField);
                await websiteField.sendKeys(websiteFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'facebook') {
                faceBookFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required facebook field is given or not
                if (faceBookFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required facebook field, the test case execution has been aborted');
                }

                //will find 'Facebook' field and pass the new data
                const facebookField = await addContactElementsObj.findAddContactFields(driver, 'facebookHandle');
                await clearFieldDataObj.clearFieldData(facebookField);
                await facebookField.sendKeys(faceBookFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'linkedin') {
                linkedInFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required linked in field is given or not
                if (linkedInFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required linked in field, the test case execution has been aborted');
                }

                //will find 'Linked In' field and pass the new data
                const linkedInField = await addContactElementsObj.findAddContactFields(driver, 'linkedInHandle');
                await clearFieldDataObj.clearFieldData(linkedInField);
                await linkedInField.sendKeys(linkedInFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'twitter') {
                twitterFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required twitter field is given or not
                if (twitterFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required twitter field, the test case execution has been aborted');
                }

                //will find 'Twitter' field and pass the new data
                const twitterField = await addContactElementsObj.findAddContactFields(driver, 'twitterHandle');
                await clearFieldDataObj.clearFieldData(twitterField);
                await twitterField.sendKeys(twitterFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'instagram') {
                instagramFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required instagram field is given or not
                if (instagramFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required instagram field, the test case execution has been aborted');
                }

                //will find 'Instagram' field and pass the new data
                const instagramField = await addContactElementsObj.findAddContactFields(driver, 'instagramHandle');
                await clearFieldDataObj.clearFieldData(instagramField);
                await instagramField.sendKeys(instagramFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'description') {
                descriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required description field is given or not
                if (descriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const descriptionField = await addContactElementsObj.findAddContactFields(driver, 'description');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(descriptionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'tags') {
                tagFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required tags field is given or not
                if (tagFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const tagsField = await addContactElementsObj.findTagsField(driver);
                await clearFieldDataObj.clearFieldData(tagsField);
                await tagsField.sendKeys(tagFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line1 field, the test case execution has been aborted');
                }

                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine1');
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line2') {
                addressLine2FieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line2 field is given or not
                if (addressLine2FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const addressLine2Field = await addContactElementsObj.findAddContactFields(driver, 'billingAddressLine2');
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'city') {
                cityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required city field is given or not
                if (cityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required city field, the test case execution has been aborted');
                }

                //will find 'City' field and pass the new data
                const cityField = await addContactElementsObj.findAddContactFields(driver, 'billingCity');
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(cityFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'zipcode') {
                zipCodeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required zip code field is given or not
                if (zipCodeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required zip code field, the test case execution has been aborted');
                }

                //will find 'Zip Code' field and pass the new data
                const zipCodeField = await addContactElementsObj.findAddContactFields(driver, 'billingZipCode');
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(zipCodeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'state') {
                stateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required state field is given or not
                if (stateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required state field, the test case execution has been aborted');
                }

                //will find 'State Field' field and pass the new data
                const stateField = await addContactElementsObj.findAddContactFields(driver, 'billingState');
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(stateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'country') {
                countryFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line2 field is given or not
                if (countryFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const countryField = await addContactElementsObj.findAddContactFields(driver, 'billingCountry');
                await clearFieldDataObj.clearFieldData(countryField);
                await countryField.sendKeys(countryFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text field') {
                textFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text field is given or not
                if (textFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
                }

                //will find 'Text' field and pass the new data
                const textField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField1');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text area') {
                textAreaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text area field is given or not
                if (textAreaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text area field, the test case execution has been aborted');
                }

                //will find 'Text Area' field and pass the new data
                const textAreaField = await addContactElementsObj.findAddContactFields(driver, 'textAreaCustomField1');
                await clearFieldDataObj.clearFieldData(textAreaField);
                await textAreaField.sendKeys(textAreaFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'integer') {
                integerFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required integer field is given or not
                if (integerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required integer field, the test case execution has been aborted');
                }

                //will find 'Integer' field and pass the new data
                const integerField = await addContactElementsObj.findAddContactFields(driver, 'intCustomField1');
                await clearFieldDataObj.clearFieldData(integerField);
                await integerField.sendKeys(integerFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'decimal') {
                decimalFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required decimal field is given or not
                if (decimalFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required decimal field, the test case execution has been aborted');
                }

                //will find 'Decimal' field and pass the new data
                const decimalField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField1');
                await clearFieldDataObj.clearFieldData(decimalField);
                await decimalField.sendKeys(decimalFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date') {
                dateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required date field is given or not
                if (dateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required date field, the test case execution has been aborted');
                }

                //will find 'Date' field and pass the new data
                const dateField = await addContactElementsObj.findAddContactFields(driver, 'dateCustomField1');
                await clearFieldDataObj.clearFieldData(dateField);
                await dateField.sendKeys(dateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date and time') {
                dateAndTimeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required date and time field is given or not
                if (dateAndTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required date and time field, the test case execution has been aborted');
                }

                //will find 'Date And Time' field and pass the new data
                const dateAndTimeField = await addContactElementsObj.findAddContactFields(driver, 'dateTimeCustomField1');
                await clearFieldDataObj.clearFieldData(dateAndTimeField);
                await dateAndTimeField.sendKeys(dateAndTimeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email field') {
                emailDetailsFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email details field is given or not
                if (emailDetailsFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email Details Field' field and pass the new data
                const emailField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField2');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailDetailsFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone field') {
                phoneDetailsFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required phone field is given or not
                if (phoneDetailsFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField3');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneDetailsFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'select field') {
                selectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the select field dropdown field is given or not
                if (selectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the select field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Select' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'textCustomField4', selectFieldData, 'yes');
            } else if (fieldName == 'multi select field') {
                multiSelectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the multi select field dropdown field is given or not
                if (multiSelectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the multi select field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Multi Select' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//div[5]/div/sm-select-box[2]/sm-element/div/span//span[@role="combobox"]')).click();
                await driver.findElement(By.xpath(`//ul[@role='tree']/li[text()="${multiSelectFieldData}"]`)).click();
                await driver.findElement(By.xpath('//div[5]/div/sm-select-box[2]/sm-element/div/span//span[@role="combobox"]')).click();
            } else if (fieldName == 'url') {
                urlFieldData = dataTable.rawTable[i][1];

                //will check that the data for the url field is given or not
                if (urlFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the url field, the test case execution has been aborted');
                }

                //will find 'URL' field and pass the new data
                const urlField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField5');
                await clearFieldDataObj.clearFieldData(urlField);
                await urlField.sendKeys(urlFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'big integer') {
                bigIntegerFieldData = dataTable.rawTable[i][1];

                //will check that the data for the big integer field is given or not
                if (bigIntegerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the big integer field, the test case execution has been aborted');
                }

                //will find 'Big Integer' field and pass the new data
                const bigIntegerField = await addContactElementsObj.findAddContactFields(driver, 'bigIntCustomField1');
                await clearFieldDataObj.clearFieldData(bigIntegerField);
                await bigIntegerField.sendKeys(bigIntegerFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'percentage') {
                percentageFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required percentage field is given or not
                if (percentageFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required percentage field, the test case execution has been aborted');
                }

                //will find 'Percentage' field and pass the new data
                const percentageField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField2');
                await clearFieldDataObj.clearFieldData(percentageField);
                await percentageField.sendKeys(percentageFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'currency field') {
                currencyFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required currency field is given or not
                if (currencyFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required currency field, the test case execution has been aborted');
                }

                //will find 'Currency Label' field and pass the new data
                const currencyField = await addContactElementsObj.findAddContactFields(driver, 'decimalCustomField3');
                await clearFieldDataObj.clearFieldData(currencyField);
                await currencyField.sendKeys(currencyFieldData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check {string} message',async function(expectedNotification) {
    try {
        const saveAndAddOtherButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveAndNewSubmit','Save And Add Other');
        await saveAndAddOtherButton.click();
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check 'Add New Contact' Page Visibility
        const addContactPage = await driver.findElements(By.xpath('//h4[text()="Add New Contact"]'));
        const addContactPageLength = await addContactPage.length;
        //check field values
        const firstNameFieldValue = await driver.findElement(By.id('firstName')).getAttribute('value');
        const lastNameFieldValue = await driver.findElement(By.id('lastName')).getAttribute('value');
        const mobileFieldValue = await driver.findElement(By.id('mobile')).getAttribute('value');
        const emailFieldValue = await driver.findElement(By.id('email')).getAttribute('value');
        const jobTitleFieldValue = await driver.findElement(By.id('designation')).getAttribute('value');
        const phoneFieldValue = await driver.findElement(By.id('phone')).getAttribute('value');
        const otherPhoneFieldValue = await driver.findElement(By.id('otherPhone')).getAttribute('value');
        const emailOptOutReasonFieldValue = await driver.findElement(By.id('emailOptOutReason')).getAttribute('value');
        const skypeFieldValue = await driver.findElement(By.id('skypeId')).getAttribute('value');
        const websiteFieldValue = await driver.findElement(By.id('website')).getAttribute('value');
        const facebookFieldValue = await driver.findElement(By.id('facebookHandle')).getAttribute('value');
        const linkedInFieldValue = await driver.findElement(By.id('linkedInHandle')).getAttribute('value');
        const twitterFieldValue = await driver.findElement(By.id('twitterHandle')).getAttribute('value');
        const instagramFieldValue = await driver.findElement(By.id('instagramHandle')).getAttribute('value');
        const descriptionFieldValue = await driver.findElement(By.id('description')).getAttribute('value');
        const addressLine1FieldValue = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
        const addressLine2FieldValue = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
        const cityFieldValue = await driver.findElement(By.id('billingCity')).getAttribute('value');
        const zipCodeFieldValue = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
        const stateFieldValue = await driver.findElement(By.id('billingState')).getAttribute('value');
        const countryFieldValue = await driver.findElement(By.id('billingCountry')).getAttribute('value');
        const textFieldValue = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        const textAreaFieldValue = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        const integerFieldValue = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        const decimalFieldValue = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        const emailDetailsFieldValue = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const phoneDetailsFieldValue = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const urlFieldValue = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        const bigIntegerFieldValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        const percentageFieldValue = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        const currencyFieldValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        if (addContactPageLength > 0) {
            console.log("As after adding new contact details and after clicking on 'Save and add other' button,the add contact page remains opened,so test case has been passed");
        } else {
            await assert.fail("As after adding new contact details and after clicking on 'Save and add other' button,the add contact page does not remains opened,so test case has been aborted");
        }
        try {
            strictEqual(firstNameFieldValue, '');
            strictEqual(lastNameFieldValue, '');
            strictEqual(mobileFieldValue, '');
            strictEqual(emailFieldValue, '');
            strictEqual(jobTitleFieldValue, '');
            strictEqual(phoneFieldValue, '');
            strictEqual(otherPhoneFieldValue, '');
            strictEqual(emailOptOutReasonFieldValue, '');
            strictEqual(skypeFieldValue, '');
            strictEqual(websiteFieldValue, '');
            strictEqual(facebookFieldValue, '');
            strictEqual(linkedInFieldValue, '');
            strictEqual(twitterFieldValue, '');
            strictEqual(instagramFieldValue, '');
            strictEqual(descriptionFieldValue, '');
            strictEqual(addressLine1FieldValue, '');
            strictEqual(addressLine2FieldValue, '');
            strictEqual(cityFieldValue, '');
            strictEqual(zipCodeFieldValue, '');
            strictEqual(stateFieldValue, '');
            strictEqual(countryFieldValue, '');
            strictEqual(textFieldValue, '');
            strictEqual(textAreaFieldValue, '');
            strictEqual(integerFieldValue, '');
            strictEqual(decimalFieldValue, '');
            strictEqual(emailDetailsFieldValue, '');
            strictEqual(phoneDetailsFieldValue, '');
            strictEqual(urlFieldValue, '');
            strictEqual(bigIntegerFieldValue, '');
            strictEqual(percentageFieldValue, '');
            strictEqual(currencyFieldValue, '');
        } catch (err) {
            await assert.fail("As after adding new contact with 'Save and add other' option,the field values are not reset,so test case has been aborted");
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

//-------Case 12: Verify, As a User It should redirect to contact detail page if interface preference toggle is on-----------

When('user it should redirect to contact detail page if interface preference toggle is on',async function(dataTable) {
    try {
        //will open the 'My Account' page
        await openSalesmatePageObj.openMyAccountPage(driver, screenshotPath);
        const interfacePreference = await interfacePreferenceElementsObj.clickOnInterfacePreference(driver,screenshotPath);
        await interfacePreference.click();
        await driver.sleep(1500);
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['Contact'], 'enable', driver);
        await driver.sleep(1000);
        const updateButtonElement = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButtonElement.click();
        await driver.sleep(2000);
        const moduleIcon = await moduleElementsObj.findContactModule(driver);
        await moduleIcon.click();
        await driver.sleep(2000);
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Contact ');
        await addContactButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

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
            } else if (fieldName == 'text field') {
                textFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required text field is given or not
                if (textFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required text field, the test case execution has been aborted');
                }

                //will find 'Text' field and pass the new data
                const textField = await addContactElementsObj.findAddContactFields(driver, 'textCustomField1');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
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
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(3500);
        //check page redirection to contact details page
        const currentPageURL = await driver.getCurrentUrl();
        console.log("Current Page URL: " + currentPageURL);
        if (currentPageURL.endsWith('/detail')) {
            console.log("As current page url is equal to expected url,so test case has been passed");
        } else {
            await assert.fail("As current page url is not equal to expected url,so test case has been aborted");
        }
        //will open the 'My Account' page
        await openSalesmatePageObj.openMyAccountPage(driver, screenshotPath);
        const interfacePreferenceElement = await interfacePreferenceElementsObj.clickOnInterfacePreference(driver,screenshotPath);
        await interfacePreferenceElement.click();
        await driver.sleep(1500);
        await interfacePreferenceElementsObj.enableOrDisableToggleButtons(['Contact'], 'disable', driver);
        await driver.sleep(1000);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        await driver.sleep(3000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 13: Verify, As a User i should be able to move to contact Layout page upon clicking on Manage fields----------

Then('user is able to move to {string} Layout page and click {string} and log in through {string}',async function(moduleName,iconName,adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const addButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',`${iconName} `);
        await addButton.click();
        await driver.sleep(2500);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of "Manage Fields"
        const manageFieldsLink = await driver.findElements(By.xpath('//a[text()="Manage Fields"]'));
        const manageFieldsLinkLength = await manageFieldsLink.length;
        if (manageFieldsLinkLength > 0) {
            console.log("As manage fields link on add contact form length is " + manageFieldsLinkLength + " so it is displayed after enabling manage layout rights,so test case has been passed");
        } else {
            await assert.fail("As manage fields link on add contact form length is " + manageFieldsLinkLength + " so it is not displayed even after enabling manage layout rights,so test case has been aborted");
        }
        //check page redirection to 'Contact Layout'
        const manageFields = await driver.findElement(By.xpath('//a[text()="Manage Fields"]'));
        await manageFields.click();
        await driver.sleep(4000);
        const currentPageURL = await driver.getCurrentUrl();
        console.log("Current Page URL: " + currentPageURL);
        if (currentPageURL.includes('/app/setup/customization/layouts/')) {
            console.log("As current page url is equal to expected url,so test case has been passed");
        } else {
            await assert.fail("As current page url is not equal to expected url,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------case 14: Verify, As a User It should show me validation message upon clicking on Manage fields when i don't have rights to manage layout------------

Then('system shows validation message upon clicking on "Manage Fields" of {string} under {string} module and log in through {string}',async function(buttonName,moduleName,adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const addButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',`${buttonName} `);
        await addButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of "Manage Fields"
        const manageFieldsLink = await driver.findElements(By.xpath('//a[text()="Manage Fields"]'));
        const manageFieldsLinkLength = await manageFieldsLink.length;
        if (manageFieldsLinkLength === 0) {
            console.log("As manage fields link on add form length is " + manageFieldsLinkLength + " so it is not displayed after disabling manage layout rights,so test case has been passed");
        } else {
            await assert.fail("As manage fields link on add form length is " + manageFieldsLinkLength + " so it is displayed after disabling manage layout rights,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------Case 15: Verify, As a User i should be able to close dialog upon clicking on close button--------

When('user is able to close {string} dialog upon clicking on close button',async function(buttonName) {
    try {
        const addButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',`${buttonName} `);
        await addButton.click();
        await driver.sleep(1500);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Add New' Dialog
        const addNewElement = await driver.findElements(By.xpath('//h4[contains(text(),"Add New")]'));
        const addNewLength = await addNewElement.length;
        if (addNewLength === 0) {
            console.log("As add dialog length is " + addNewLength + " so it is closed and add process is terminated,so test case has been passed");
        } else {
            await assert.fail("As add dialog length is " + addNewLength + " so it is not closed and add process is not terminated,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 16: Verify, As a User I should be able to see Active currencies only in currency dropdown-------

Then('verify active currencies of {string} under {string} module',async function(buttonName,moduleName) {
    try {
        //get 'Active Currencies' List in 'Currencies' Page
        const activeCurrenciesElements = await driver.findElements(By.xpath('//table//td[2]'));
        const activeCurrenciesListLength = await activeCurrenciesElements.length;
        console.log("Currencies Page Active Currencies Length: " + activeCurrenciesListLength);
        for (let i = 1; i <= activeCurrenciesListLength; i++) {
            const activeCurrenciesList = await driver.findElement(By.css(`tr:nth-of-type(${i}) > td:nth-of-type(2)`)).getText();
            console.log(`Active Currencies List on 'Currencies' page ${i}: ` + activeCurrenciesList);
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',`${buttonName} `);
        await addContactButton.click();
        await driver.sleep(1500);
        await driver.findElement(By.xpath('//sm-select-box[2]/sm-element/div/span//span/span[@role="presentation"]')).click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //get 'Active Currencies' Dropdown List in 'Add Contact' Page
        const activeCurrenciesDropdown = await driver.findElements(By.xpath('//ul[@role="tree"]/li'));
        const activeCurrenciesDropdownLength = await activeCurrenciesDropdown.length;
        console.log("Add Contact Page Currencies Dropdown Length: " + activeCurrenciesDropdownLength);
        for (let i = 1; i <= activeCurrenciesDropdownLength; i++) {
            const activeCurrenciesDropdown = await driver.findElement(By.xpath(`//ul[@role="tree"]/li[${i}]`)).getText();
            console.log(`Add Contact Page Currencies Dropdown ${i}: ` + activeCurrenciesDropdown);
        }
        if (activeCurrenciesListLength === activeCurrenciesDropdownLength) {
            console.log("As active currencies list in 'Currencies' page and 'Add Contact' page are equal,so test case has been passed");
        } else {
            await assert.fail("As active currencies list in 'Currencies' page and 'Add Contact' page are not equal,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 17: Verify, As a User I should be able to see timeline entry for contact creation--------------------

When('user is able to see timeline entry for contact creation',async function() {
    try {
        const contactName = await moduleElementsObj.findContactName(driver, 'Contact 2');
        await contactName.click();
        await driver.sleep(2000);
        //click on 'All' timeline
        const allTimeLineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','All');
        await allTimeLineTab.click();
        await driver.sleep(2000);
        //check visibility of 'All' timeline 'Contact Creation'
        const allTimeLineTextElement = await driver.findElement(By.xpath('//div/timeline-record-creation-log/div/div/div[3]')).isDisplayed();
        console.log("Is 'All' TimeLine Text displayed: " + allTimeLineTextElement);
        //print text of 'All' timeline 'Contact Creation'
        const allTimeLineText = await driver.findElement(By.xpath('//div/timeline-record-creation-log/div/div/div[3]')).getText();
        console.log("'All' TimeLine Text :" + allTimeLineText);
        //click on 'Updates' timeline
        const updatesTimeLineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Updates');
        await updatesTimeLineTab.click();
        await driver.sleep(2000);
        //check visibility of 'Updates' timeline 'Contact Creation'
        const updatesTimeLineTextElement = await driver.findElement(By.xpath('//div/timeline-record-creation-log/div/div/div[3]')).isDisplayed();
        console.log("Is 'Updates' TimeLine Text displayed: " + updatesTimeLineTextElement);
        //print text of 'Updates' timeline 'Contact Creation'
        const updatesTimeLineText = await driver.findElement(By.xpath('//div/timeline-record-creation-log/div/div/div[3]')).getText();
        console.log("'Updates' TimeLine Text :" + updatesTimeLineText);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
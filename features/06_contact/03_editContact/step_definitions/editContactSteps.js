const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/03_editContact/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const addContactElementsObj = require('../../02_addContact/common/addContactElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');

let firstNameFieldData = 'no', lastNameFieldData = 'no', mobileFieldData = 'no', emailFieldData = 'no', jobTitleFieldData = 'no', phoneFieldData = 'no';
let otherPhoneFieldData = 'no', emailOptOutReasonFieldData = 'no', skypeFieldData = 'no', websiteFieldData = 'no';
let faceBookFieldData = 'no', linkedInFieldData = 'no', twitterFieldData = 'no', instagramFieldData = 'no', descriptionFieldData = 'no';
let addressLine1FieldData = 'no', addressLine2FieldData = 'no', cityFieldData = 'no', zipCodeFieldData = 'no', stateFieldData = 'no';
let countryFieldData = 'no', textFieldData = 'no', textAreaFieldData = 'no', integerFieldData = 'no', decimalFieldData = 'no';
let dateFieldData = 'no', dateAndTimeFieldData = 'no', emailDetailsFieldData = 'no', selectFieldData = 'no', multiSelectFieldData = 'no';
let phoneDetailsFieldData = 'no', urlFieldData = 'no', bigIntegerFieldData = 'no', percentageFieldData = 'no', currencyFieldData = 'no';
let ownerFieldDropdownData = 'no', typeFieldDropdownData = 'no', emailOptOutCheckboxState = 'no', booleanState = 'no';
let smsOptOutCheckboxState = 'no', timeZoneDropdownData = 'no', tagFieldData = 'no';

//-----------Case 1: Verify, As a User i should be able to see Edit contact option only if i have Edit contact rights------

Then('edit contact module is not visible and log in through {string}',async function(adminUser) {
    try {
        const contactIcon = await moduleElementsObj.findContactModule(driver);
        await contactIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Edit' icon on listing page
        await driver.manage().setTimeouts({implicit: 2000});
        const editIcon = await driver.findElements(By.xpath('//i[@class="icon-pencil2"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editIcon_Invisibility.png');
        const editIconLength = await editIcon.length;
        //check invisibility of 'Update' button on 'Contact Preview' page
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const previewPageUpdateButtonDisability = !!await driver.findElement(By.id('btnSubmit')).getAttribute('disabled');
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Edit Contact' link on 'Contact Details' page
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageEditContactLink = !!await driver.findElement(By.xpath('//a[text()=" Edit Contact"]')).isDisplayed();
        if (editIconLength === 0 && previewPageUpdateButtonDisability === true && detailsPageEditContactLink === false) {
            console.log("As edit icon of listing page,preview page update button and details page edit contact link are not displayed after disabling edit contact rights,so test case has been passed");
        } else {
            await assert.fail("As edit icon of listing page,preview page update button and details page edit contact link are displayed even after disabling edit contact rights,so test case has been aborted");
        }
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

When('edit contact module is visible and log in through {string}',async function(adminUser) {
    try {
        const contactIcon = await moduleElementsObj.findContactModule(driver);
        await contactIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check invisibility of 'Edit' icon on listing page
        const editIcon = await driver.findElements(By.xpath('//i[@class="icon-pencil2"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editIcon_Invisibility.png');
        const editIconLength = await editIcon.length;
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        //check invisibility of 'Update' button on 'Contact Preview' page
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const previewPageUpdateButtonDisability = !!await driver.findElement(By.id('btnSubmit')).getAttribute('disabled');
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Edit Contact' link on 'Contact Details' page
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageEditContactElement = await driver.findElements(By.xpath('//a[text()=" Edit Contact"]'));
        const detailsPageEditContactLength = await detailsPageEditContactElement.length;
        if ((editIconLength && detailsPageEditContactLength) > 0 && previewPageUpdateButtonDisability === false) {
            console.log("As edit icon on listing page,preview page update button and details page edit contact link are displayed after enabling edit contact rights,so test case has been passed");
        } else {
            await assert.fail("As edit icon on listing page,preview page update button and details page edit contact link are not displayed even after enabling edit contact rights,so test case has been aborted");
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

//----------Case 2: Verify, As a User I should be able Access edit contact dialog from icon beside contact name in the listing screen--------

When('user is able to Access {string} dialog from icon beside contact name in the listing screen',async function(editLinkName) {
    try {
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Edit Deal' dialog
        const editLinkVisibility = !!await driver.findElement(By.xpath(`//h4[text()="${editLinkName}"]`)).isDisplayed();
        console.log("Is Edit Deal Displayed: " + editLinkVisibility);
        const editLink = await driver.findElements(By.xpath(`//h4[text()="${editLinkName}"]`));
        const editLinkLength = await editLink.length;
        if (editLinkLength > 0 && editLinkVisibility === true) {
            console.log("As edit deal dialog is displayed after clicking on edit icon beside deal name in listing page,so test case has been passed");
        } else {
            await assert.fail("As edit deal dialog is not displayed even after clicking on edit icon beside deal name in listing page,so test case has been aborted");
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

//----------------------------Case 3: Verify, As a User I should be able to update contact------------------------------

When('user is able to update contact',async function(dataTable) {
    try {
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
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
            } else if (fieldName == 'boolean') {
                booleanState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (booleanState == 'enable' || booleanState == 'disable') {
                    //will find 'Boolean' checkbox
                    const booleanCheckbox = await addContactElementsObj.findAddContactFields(driver, 'checkboxCustomField1');
                    await driver.executeScript("arguments[0].focus();", booleanCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Boolean Checkbox'
                    const currentState = await booleanCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Boolean Checkbox'
                    if (currentState != booleanState) {
                        await driver.executeScript("arguments[0].click();", booleanCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the sms opt out checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
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
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check {string} message and verify updated contact details',async function(expectedNotification) {
    try {
        await driver.sleep(1000);
        const editPageUpdateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Update ');
        await editPageUpdateButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 4: Verify, When User click on the cancel button it should terminate update process---------------------

When('user click on the cancel button it should terminate update process',async function(dataTable) {
    try {
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
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
                await driver.sleep(1000);
            }
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Edit Contact' dialog
        const editContactDialogElements = await driver.findElements(By.xpath('//h4[text()="Edit Contact"]'));
        const editContactDialogLength = await editContactDialogElements.length;
        console.log(editContactDialogLength);
        if (editContactDialogLength === 0) {
            console.log("As edit contact length is " + editContactDialogLength + " so edit dialog is closed,so test case has been passed");
        } else {
            await assert.fail("As edit contact length is " + editContactDialogLength + " so edit dialog is not closed,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 5: Verify, As a User timeline should be updated for that contact after editing contact----------

When('user timeline should be updated for that contact after editing contact',async function() {
    try {
        const contactName = await moduleElementsObj.findContactName(driver, 'Test Contact');
        await contactName.click();
        await driver.sleep(3000);
        //click on 'Updates' timeline
        const updatesTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Updates','Updates Tab');
        await updatesTab.click();
        await driver.sleep(2000);
        //check visibility of 'Updates' timeline
        const updatesTimeLineTextElement = await driver.findElement(By.xpath('//div[@class="timeline-head-title"]')).isDisplayed();
        console.log("Is 'Updates' TimeLine Text displayed: " + updatesTimeLineTextElement);
        //print text of 'Updated Contacts' timeline
        const updatesTimeLine = await driver.findElements(By.xpath('//div[@class="timeline-head-title"]'));
        const updatesTimeLineLength = await updatesTimeLine.length;
        for (let i = 1; i <= updatesTimeLineLength; i++) {
            console.log("Below are timeline entries:");
            const updatedContactField = await driver.findElement(By.xpath(`(//div[@class="timeline-head-title"])[${i}]`)).getText();
            console.log("Updated Contact Field " + i + ": " + updatedContactField);
            const updatedContactFieldDetails = await driver.findElement(By.xpath(`(//div[@class="m-t-xs font-size-sm"])[${i}]`)).getText();
            console.log("Updated Contact Field Details " + i + ": " + updatedContactFieldDetails);
        }
        const contactIcon = await moduleElementsObj.findContactModule(driver);
        await contactIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 6: Verify, As a User It should show me validation message upon clicking on Manage fields when i don't have rights to manage layout-----------

When('"Manage fields" is not visible for {string} module when {string} do not have rights to manage layout',async function(moduleName,adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
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
        await driver.sleep(2000);
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

//-------Case 7: Verify, As a User i should be able to move to contact Layout page upon clicking on Manage fields----------

When('it moves to {string} module Layout page upon clicking on "Manage fields" when {string} have rights to manage layout',async function(moduleName,adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
        await driver.sleep(2000);
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
        await driver.findElement(By.xpath('//a[text()="Manage Fields"]')).click();
        await driver.sleep(4000);
        const currentPageURL = await driver.getCurrentUrl();
        console.log("Current Page URL: " + currentPageURL);
        if (currentPageURL.includes('/app/setup/customization/layouts')) {
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

//--------Case 8: Verify, As a User I should not be able to update contact without adding value in mandatory fields--------

When('user is unable to update contact without adding value in mandatory fields',async function(dataTable) {
    try {
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
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

Then('check validation {string}',async function(expectedValidation) {
    const editPageUpdateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Update ');
    await editPageUpdateButton.click();
    await driver.sleep(2000);
    const actualNameValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
    try {
        strictEqual(actualNameValidation, expectedValidation);
        console.log("As actual and expected validations are equal,so test case has been passed");
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 9: Verify, As a User i should be able to see 255 character Validation message for first name and last name upon focus out while updating a contact----------

When('verifying first and last name with more than 255 characters',async function(dataTable) {
    try {
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
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

Then('check validation messages {string}',async function(expectedLengthValidation) {
    await driver.sleep(1000);
    const editPageUpdateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Update ');
    await editPageUpdateButton.click();
    await driver.sleep(2000);
    try {
        const actualFirstNameValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[1]//div')).getText();
        strictEqual(actualFirstNameValidation, expectedLengthValidation);
        const actualLastNameValidation = await driver.findElement(By.xpath('//div[1]/div/sm-input-txt[2]//div')).getText();
        strictEqual(actualLastNameValidation, expectedLengthValidation);
        console.log("As actual and expected length validations are equal,so test case has been passed");
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 10: Verify, As a User i should be able to see invalid email Validation while updating a contact-------

When('user is able to see invalid email Validation while updating a contact',async function(dataTable) {
    try {
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
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
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check email validation {string} message',async function(expectedEmailValidation) {
    await driver.sleep(1000);
    const editPageUpdateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Update ');
    await editPageUpdateButton.click();
    await driver.sleep(2000);
    try {
        const actualEmailValidation = await driver.findElement(By.xpath('//div/div[1]/div[@class="row"]/sm-input-txt[4]//div[1]')).getText();
        strictEqual(actualEmailValidation, expectedEmailValidation);
        console.log("As actual and expected email validations are equal,so test case has been passed");
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
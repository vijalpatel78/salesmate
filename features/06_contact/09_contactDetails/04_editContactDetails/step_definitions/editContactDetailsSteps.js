const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/04_editContactDetails/screenshots/';
const editContactDetailsElementsObj = require('../common/editContactDetailsElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let existingSearchData, emailFieldData = 'no', otherPhoneFieldData = 'no';

When('user is on contact details page',async function(){
    try {
        await driver.sleep(1000);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(3000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailsPage_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------------Case 1: As a User, Verify UI of 'Contact Details' widget--------------------------------

Then('As a User, Verify UI of "Contact Details" widget',async function(){
    try {
        //check 'Contact Details' widget visibility
        const contactDetailsText = await driver.findElement(By.xpath('//div[@id="leftSideWidgetContainer"]//h4')).getText();
        console.log("Is 'Contact Details' Text is displayed: "+contactDetailsText);
        const contactDetailsVisibility = !!await driver.findElement(By.xpath('//div[@id="leftSideWidgetContainer"]//h4')).isDisplayed();
        console.log("Is Contact Details Visible: "+contactDetailsVisibility);
        strictEqual(contactDetailsVisibility,true);
        //check 'Customize Fields Icon' visibility
        const customizeFieldsIconVisibility = !!await driver.findElement(By.xpath('//sm-detail-widget//h4/span[1]')).isDisplayed();
        console.log("Is Customize Fields Icon Visible: "+customizeFieldsIconVisibility);
        strictEqual(customizeFieldsIconVisibility,true);
        //check 'Selected Fields' visibility
        const selectedEmailField = !!await driver.findElement(By.xpath('//section-body//span[.="Email"]')).isDisplayed();
        console.log("Is Selected Email Field Visible: "+selectedEmailField);
        strictEqual(selectedEmailField,true);
        const selectedPhoneField = !!await driver.findElement(By.xpath('//section-body//span[.="Phone"]')).isDisplayed();
        console.log("Is Selected Phone Field Visible: "+selectedPhoneField);
        strictEqual(selectedPhoneField,true);
        const selectedMobileField = !!await driver.findElement(By.xpath('//section-body//span[.="Mobile"]')).isDisplayed();
        console.log("Is Selected Mobile Field Visible: "+selectedMobileField);
        strictEqual(selectedMobileField,true);
        const selectedOtherPhoneField = !!await driver.findElement(By.xpath('//section-body//span[.="Other Phone"]')).isDisplayed();
        console.log("Is Selected Other Phone Field Visible: "+selectedOtherPhoneField);
        strictEqual(selectedOtherPhoneField,true);
        const selectedWebsiteField = !!await driver.findElement(By.xpath('//section-body//span[.="Website"]')).isDisplayed();
        console.log("Is Selected Website Field Visible: "+selectedWebsiteField);
        strictEqual(selectedWebsiteField,true);
        const selectedAddressLine1Field = !!await driver.findElement(By.xpath('//section-body//span[.="Address Line 1"]')).isDisplayed();
        console.log("Is Selected Address Line 1 Field Visible: "+selectedAddressLine1Field);
        strictEqual(selectedAddressLine1Field,true);
        const selectedAddressLine2Field = !!await driver.findElement(By.xpath('//section-body//span[.="Address Line 2"]')).isDisplayed();
        console.log("Is Selected Address Line 2 Field Visible: "+selectedAddressLine2Field);
        strictEqual(selectedAddressLine2Field,true);
        const selectedCityField = !!await driver.findElement(By.xpath('//section-body//span[.="City"]')).isDisplayed();
        console.log("Is Selected City Field Visible: "+selectedCityField);
        strictEqual(selectedCityField,true);
        const selectedStateField = !!await driver.findElement(By.xpath('//section-body//span[.="State"]')).isDisplayed();
        console.log("Is Selected State Field Visible: "+selectedStateField);
        strictEqual(selectedStateField,true);
        const selectedZipCodeField = !!await driver.findElement(By.xpath('//section-body//span[.="ZipCode"]')).isDisplayed();
        console.log("Is Selected Zip Code Field Visible: "+selectedZipCodeField);
        strictEqual(selectedZipCodeField,true);
        const selectedCountryField = !!await driver.findElement(By.xpath('//section-body//span[.="Country"]')).isDisplayed();
        console.log("Is Selected Country Field Visible: "+selectedCountryField);
        strictEqual(selectedCountryField,true);
        const selectedDescriptionField = !!await driver.findElement(By.xpath('//section-body//span[.="Description"]')).isDisplayed();
        console.log("Is Selected Description Field Visible: "+selectedDescriptionField);
        strictEqual(selectedDescriptionField,true);
        //check 'Edit Link' for 'Selected Fields'
        const emailEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[1]/div//a')).isEnabled();
        console.log("Is Email Edit Link Visible: "+emailEditLink);
        strictEqual(emailEditLink,true);
        const phoneEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[2]/div//a')).isEnabled();
        console.log("Is Phone Edit Link Visible: "+phoneEditLink);
        strictEqual(phoneEditLink,true);
        const mobileEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[3]/div//a')).isEnabled();
        console.log("Is Mobile Edit Link Visible: "+mobileEditLink);
        strictEqual(mobileEditLink,true);
        const otherPhoneEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[4]/div//a')).isEnabled();
        console.log("Is Other Phone Edit Link Visible: "+otherPhoneEditLink);
        strictEqual(otherPhoneEditLink,true);
        const websiteEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[5]/div//a')).isEnabled();
        console.log("Is Website Edit Link Visible: "+websiteEditLink);
        strictEqual(websiteEditLink,true);
        const addressLine1EditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[6]/div//a')).isEnabled();
        console.log("Is Address Line 1 Edit Link Visible: "+addressLine1EditLink);
        strictEqual(addressLine1EditLink,true);
        const addressLine2EditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[7]/div//a')).isEnabled();
        console.log("Is Address Line 2 Edit Link Visible: "+addressLine2EditLink);
        strictEqual(addressLine2EditLink,true);
        const cityEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[8]/div//a')).isEnabled();
        console.log("Is City Edit Link Visible: "+cityEditLink);
        strictEqual(cityEditLink,true);
        const stateEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[9]/div//a')).isEnabled();
        console.log("Is State Edit Link Visible: "+stateEditLink);
        strictEqual(stateEditLink,true);
        const zipCodeEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[10]/div//a')).isEnabled();
        console.log("Is Zip Code Edit Link Visible: "+zipCodeEditLink);
        strictEqual(zipCodeEditLink,true);
        const countryEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[11]/div//a')).isEnabled();
        console.log("Is Country Edit Link Visible: "+countryEditLink);
        strictEqual(countryEditLink,true);
        const descriptionEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[12]/div//a')).isEnabled();
        console.log("Is Description Edit Link Visible: "+descriptionEditLink);
        strictEqual(descriptionEditLink,true);
        const tagsEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[13]/div//a')).isEnabled();
        console.log("Is Tags Edit Link Visible: "+tagsEditLink);
        strictEqual(tagsEditLink,true);
        //check 'System Fields' 'Edit Link'
        await driver.manage().setTimeouts({implicit: 2000});
        const idEditLink = await driver.findElements(By.xpath('//section-body/sm-display-widget-value[14]/div//a'));
        const idEditLinkLength = await idEditLink.length;
        if(idEditLinkLength === 0) {
            console.log("As Id is 'System Field',so it's 'Edit Link' is not visible so length is: "+idEditLinkLength+" ,so test case has been passed");
        } else {
            await assert.fail("As Id is 'System Field',so it's 'Edit Link' is visible so length is: "+idEditLinkLength+" ,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailsWidgetsUI_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 2: As a User, Verify that upon clicking on Customized fields option it should redirect to Manage Contact Fields screen------

Then('on click of Customized fields option it should redirect to Manage Contact Fields screen',async function(){
    try {
        const customizeFieldsIcon = await editContactDetailsElementsObj.findCustomizeFieldsIcon(driver);
        await customizeFieldsIcon.click();
        await driver.sleep(1000);
        //check 'Customize Fields' redirect to 'Manage Contact Fields' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('app/contacts/customisefields')) {
            console.log("As on click of 'Customize Fields' icon it redirects to 'Manage Contact Fields' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Customize Fields' icon it does not redirects to 'Manage Contact Fields' screen page,so test case has been aborted");
        }
        //check visibility of 'Current Fields' Text
        const currentFieldsText = await driver.findElement(By.xpath('//div[1]/aside[1]/div[@class="fieldsBlock"]//h3')).getText();
        console.log("Current Fields Text: "+currentFieldsText);
        const currentFieldsVisibility = !!await driver.findElement(By.xpath('//div[1]/aside[1]/div[@class="fieldsBlock"]//h3')).isDisplayed();
        console.log("Current Fields Visibility: "+currentFieldsVisibility);
        //check visibility of 'Current Fields' Names
        const currentFieldEmailVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[1]')).isDisplayed();
        console.log("Is Current Field 'Email' Visible: "+currentFieldEmailVisibility);
        strictEqual(currentFieldEmailVisibility,true);
        const currentFieldPhoneVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[2]')).isDisplayed();
        console.log("Is Current Field 'Phone' Visible: "+currentFieldPhoneVisibility);
        strictEqual(currentFieldPhoneVisibility,true);
        const currentFieldMobileVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[4]')).isDisplayed();
        console.log("Is Current Field 'Mobile' Visible: "+currentFieldMobileVisibility);
        strictEqual(currentFieldMobileVisibility,true);
        const currentFieldOtherPhoneVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[3]')).isDisplayed();
        console.log("Is Current Field 'Other Phone' Visible: "+currentFieldOtherPhoneVisibility);
        strictEqual(currentFieldOtherPhoneVisibility,true);
        const currentFieldWebsiteVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[5]')).isDisplayed();
        console.log("Is Current Field 'Website' Visible: "+currentFieldWebsiteVisibility);
        strictEqual(currentFieldWebsiteVisibility,true);
        const currentFieldAddressLine1Visibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[6]')).isDisplayed();
        console.log("Is Current Field 'Address Line 1' Visible: "+currentFieldAddressLine1Visibility);
        strictEqual(currentFieldAddressLine1Visibility,true);
        const currentFieldAddressLine2Visibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[7]')).isDisplayed();
        console.log("Is Current Field 'Address Line 2' Visible: "+currentFieldAddressLine2Visibility);
        strictEqual(currentFieldAddressLine2Visibility,true);
        const currentFieldCityVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[8]')).isDisplayed();
        console.log("Is Current Field 'City' Visible: "+currentFieldCityVisibility);
        strictEqual(currentFieldCityVisibility,true);
        const currentFieldStateVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[9]')).isDisplayed();
        console.log("Is Current Field 'State' Visible: "+currentFieldStateVisibility);
        strictEqual(currentFieldStateVisibility,true);
        const currentFieldZipCodeVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[10]')).isDisplayed();
        console.log("Is Current Field 'Zip Code' Visible: "+currentFieldZipCodeVisibility);
        strictEqual(currentFieldZipCodeVisibility,true);
        const currentFieldCountryVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[11]')).isDisplayed();
        console.log("Is Current Field 'Country' Visible: "+currentFieldCountryVisibility);
        strictEqual(currentFieldCountryVisibility,true);
        const currentFieldDescriptionVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[12]')).isDisplayed();
        console.log("Is Current Field 'Description' Visible: "+currentFieldDescriptionVisibility);
        strictEqual(currentFieldDescriptionVisibility,true);
        const currentFieldTagsVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[13]')).isDisplayed();
        console.log("Is Current Field 'Tags' Visible: "+currentFieldTagsVisibility);
        strictEqual(currentFieldTagsVisibility,true);
        //check visibility of 'All Contact Fields' Text
        const allContactFieldsText = await driver.findElement(By.xpath('(//sm-contact-customise-fields//h3)[2]')).getText();
        console.log("All Contact Fields Text: "+allContactFieldsText);
        //check visibility of 'All Contact Fields Sections'
        const systemFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[1]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'System Fields' Visible: "+systemFieldsVisible);
        strictEqual(systemFieldsVisible,true);
        const defaultFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[2]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Default Fields' Visible: "+defaultFieldsVisible);
        strictEqual(defaultFieldsVisible,true);
        const socialFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[3]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Social Fields' Visible: "+socialFieldsVisible);
        strictEqual(socialFieldsVisible,true);
        const detailsFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[4]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Details Fields' Visible: "+detailsFieldsVisible);
        strictEqual(detailsFieldsVisible,true);
        const addressFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[5]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Address Fields' Visible: "+addressFieldsVisible);
        strictEqual(addressFieldsVisible,true);
        const internalFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[6]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Internal Fields' Visible: "+internalFieldsVisible);
        strictEqual(internalFieldsVisible,true);
        const customSectionFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[7]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Custom Section Fields' Visible: "+customSectionFieldsVisible);
        strictEqual(customSectionFieldsVisible,true);
        const analyticsFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[1]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Analytics Fields' Visible: "+analyticsFieldsVisible);
        strictEqual(analyticsFieldsVisible,true);
        //check visibility of 'Add Contact Field' button
        const addContactFieldButtonVisibility = !!await driver.findElement(By.xpath('//a[text()=" Add Contact field"]')).isDisplayed();
        console.log("Is 'Add Contact Field Button' Visible: "+addContactFieldButtonVisibility);
        strictEqual(addContactFieldButtonVisibility,true);
        //check visibility of 'Quick Note' Section
        const quickNoteSectionVisibility = !!await driver.findElement(By.xpath('//h2[text()="Quick Note"]')).isDisplayed();
        console.log("Is 'Quick Note Section' Visible: "+quickNoteSectionVisibility);
        strictEqual(quickNoteSectionVisibility,true);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------Case 3: As a User, Verify that User can Add - remove fields from customized screen to show in contact detail widget-------------------------------

When('user is on contact details page > customize fields screen > manage fields screen',async function(){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(2000);
        const customizeFieldsIcon = await editContactDetailsElementsObj.findCustomizeFieldsIcon(driver);
        await customizeFieldsIcon.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'manageFieldsPage_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('user can add and remove fields from customized screen',async function(){
    try {
        //get 'Tags' field checkbox value before 'Removing'
        const tagsCheckboxValueBeforeRemoving = await driver.findElement(By.id('tags')).getAttribute('value');
        console.log("Tags Field CheckBox Value Before Removing: "+tagsCheckboxValueBeforeRemoving);
        //Removing 'Tags' field from 'Current Fields' Section
        const currentFieldCloseIcon = await editContactDetailsElementsObj.findCurrentFieldCloseIcon(driver,13);
        await currentFieldCloseIcon.click();
        await driver.sleep(1500);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(2000);
        //get 'Tags' field checkbox value after 'Removing'
        await driver.manage().setTimeouts({implicit: 2000});
        const tagsCheckboxValueAfterRemoving = await driver.findElement(By.id('tags')).getAttribute('value');
        console.log("Tags Field CheckBox Value After Removing: "+tagsCheckboxValueAfterRemoving);
        const tagsInCurrentField = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li[text()=" Tags "]'));
        const tagsInCurrentFieldLength = await tagsInCurrentField.length;
        if(tagsInCurrentFieldLength === 0 && tagsCheckboxValueBeforeRemoving !== tagsCheckboxValueAfterRemoving) {
            console.log("As after removing 'Id' field is removed from 'Current Fields' and unchecked from 'All Contact Fields',so test case has been passed");
        } else {
            await assert.fail("As after removing 'Id' field is not removed from 'Current Fields' and checked from 'All Contact Fields',so test case has been aborted");
        }
        //get count of 'Current Fields' before 'Selecting Fields'
        const currentFieldsCountBeforeSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountBeforeSelectingFieldsLength = await currentFieldsCountBeforeSelectingFields.length;
        console.log("Current Field Count Before Selecting Fields: "+currentFieldsCountBeforeSelectingFieldsLength);
        const firstNameCheckboxValueBeforeSelecting = await driver.findElement(By.id('firstName')).getAttribute('value');
        console.log("First Name Checkbox Value Before Selecting: "+firstNameCheckboxValueBeforeSelecting);
        const lastNameCheckboxValueBeforeSelecting = await driver.findElement(By.id('lastName')).getAttribute('value');
        console.log("Last Name Checkbox Value Before Selecting: "+lastNameCheckboxValueBeforeSelecting);
        //Selecting Fields from 'All Contact Fields'
        const firstName = await driver.findElement(By.id('firstName'));
        await driver.executeScript("arguments[0].click();",firstName);
        const lastName = await driver.findElement(By.id('lastName'));
        await driver.executeScript("arguments[0].click();",lastName);
        const saveButtonElement = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButtonElement.click();
        await driver.sleep(2000);
        //get count of 'Current Fields' after 'Selecting Fields'
        const currentFieldsCountAfterSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountAfterSelectingFieldsLength = await currentFieldsCountAfterSelectingFields.length;
        console.log("Current Field Count After Selecting Fields: "+currentFieldsCountAfterSelectingFieldsLength);
        const firstNameCheckboxValueAfterSelecting = await driver.findElement(By.id('firstName')).getAttribute('value');
        console.log("First Name Checkbox Value After Selecting: "+firstNameCheckboxValueAfterSelecting);
        const lastNameCheckboxValueAfterSelecting = await driver.findElement(By.id('lastName')).getAttribute('value');
        console.log("Last Name Checkbox Value After Selecting: "+lastNameCheckboxValueAfterSelecting);
        if((currentFieldsCountBeforeSelectingFieldsLength)+2 === currentFieldsCountAfterSelectingFieldsLength) {
            console.log("As current fields length is increased by (X+2) after selecting two fields from all contact fields and first name and last name are checked after selecting fields,so test case has been passed");
        } else {
            await assert.fail("As current fields length is not increased by (X+2) after selecting two fields from all contact fields and first name and last name remains unchecked even after selecting fields,so test case has been aborted");
        }
        const backButton = await editContactDetailsElementsObj.findManageFieldsBackButton(driver);
        await backButton.click();
        await driver.sleep(2000);
        //get count of 'Contact Details Fields' after moving back to 'Contact Details' page
        const contactDetailsPageFields = await driver.findElements(By.xpath('//span[@class="display-name title primary-text-dark font-bold flex-1"]'));
        const contactDetailsPageFieldsLength = await contactDetailsPageFields.length;
        console.log("Contact Details Page Fields Length: "+contactDetailsPageFieldsLength);
        if(currentFieldsCountAfterSelectingFieldsLength === contactDetailsPageFieldsLength) {
            console.log("As 'Current Fields' length and 'Contact Details Page Fields' length are equal.so test case has been passed");
        } else {
            await assert.fail("As 'Current Fields' length and 'Contact Details Page Fields' length are not equal.so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------Case 4: As a User, Verify that i can search any field from search box--------------------------

Then('user can search any field from search box',async function(dataTable){
   try {
       //will travel provided fields and data list
       for(let i=0; i<dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'search word') {
               existingSearchData = dataTable.rawTable[i][1];

               //will check that the data for the search field is given or not
               if (existingSearchData == '') {
                   await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
               }
               //searching for 'Name Field' and pass the new data
               const searchBoxField = await editContactDetailsElementsObj.findSearchField(driver);
               await clearFieldDataObj.clearFieldData(searchBoxField);
               await searchBoxField.sendKeys(existingSearchData);
               await driver.sleep(1000);

               //getting value of search box
               const searchBoxName = await driver.findElement(By.xpath('//input[@placeholder="Search Fields"]')).getAttribute('value');
               console.log("Existing Search Value: "+searchBoxName);

               //getting value of name
               const resultValue = await driver.findElement(By.xpath('//div/ul[@id="availableFields"]/li/span[@class="m-l"]')).getText();
               console.log("Search Field Result Value: "+resultValue);

               //compare 'Search box Name' and 'Result Value'
               if (resultValue.includes(searchBoxName)) {
                   await screenshotObj.takeScreenshot(driver, screenshotPath + 'nameSearchRecordFound.png');
                   console.log("As name checkbox which contain searched chars is displayed,so test case has been passed");
               } else {
                   await assert.fail("As name checkbox contain searched chars is not displayed,so test case has been aborted");
               }
           }
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------------Case 5: As a User, Verify Save and cancel button functionality of customized fields screen---------------

Then('verify Save and cancel button functionality of customized fields screen',async function(){
    try {
        //Performing 'Save' button functionality
        //get count of 'Current Fields' before 'Selecting Fields'
        const currentFieldsCountBeforeSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountBeforeSelectingFieldsLength = await currentFieldsCountBeforeSelectingFields.length;
        console.log("Current Field Count Before Selecting Fields: "+currentFieldsCountBeforeSelectingFieldsLength);
        //get 'First Name and Last Name' fields checkbox value before 'Removing'
        const firstNameCheckboxValueBeforeRemoving = await driver.findElement(By.id('firstName')).getAttribute('value');
        console.log("First Name Field CheckBox Value Before Removing: "+firstNameCheckboxValueBeforeRemoving);
        const lastNameCheckboxValueBeforeRemoving = await driver.findElement(By.id('lastName')).getAttribute('value');
        console.log("Last Name Field CheckBox Value Before Removing: "+lastNameCheckboxValueBeforeRemoving);
        //Removing 'First Name and Last Name' fields from 'Current Fields' Section
        await editContactDetailsElementsObj.findCurrentFieldCloseIcon(driver,14);
        await editContactDetailsElementsObj.findCurrentFieldCloseIcon(driver,14);
        //'Selecting' 'Id' field from 'All Contact Fields'
        const idCheckboxValueBeforeSelecting = await driver.findElement(By.id('id')).getAttribute('value');
        console.log("Id Checkbox Value Before Selecting: "+idCheckboxValueBeforeSelecting);
        //Selecting Fields from 'All Contact Fields'
        const idCheckbox = await driver.findElement(By.id('id'));
        await driver.executeScript("arguments[0].click();",idCheckbox);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(2000);
        //get 'First Name and Last Name' field checkbox value after 'Removing'
        await driver.manage().setTimeouts({implicit: 2000});
        const firstNameCheckboxValueAfterRemoving = await driver.findElement(By.id('firstName')).getAttribute('value');
        console.log("First Name Field CheckBox Value After Removing: "+firstNameCheckboxValueAfterRemoving);
        const lastNameCheckboxValueAfterRemoving = await driver.findElement(By.id('lastName')).getAttribute('value');
        console.log("Last Name Field CheckBox Value After Removing: "+lastNameCheckboxValueAfterRemoving);
        const firstNameInCurrentField = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li[text()=" First Name "]'));
        const firstNameInCurrentFieldLength = await firstNameInCurrentField.length;
        const lastNameInCurrentField = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li[text()=" Last Name "]'));
        const lastNameInCurrentFieldLength = await lastNameInCurrentField.length;
        //get count of 'Current Fields' after 'Selecting Fields'
        const currentFieldsCountAfterSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountAfterSelectingFieldsLength = await currentFieldsCountAfterSelectingFields.length;
        console.log("Current Field Count After Selecting Fields: "+currentFieldsCountAfterSelectingFieldsLength);
        const idCheckboxValueAfterSelecting = await driver.findElement(By.id('id')).getAttribute('value');
        console.log("Id Checkbox Value After Selecting: "+idCheckboxValueAfterSelecting);
        if(firstNameInCurrentFieldLength === 0 && lastNameInCurrentFieldLength === 0 && firstNameCheckboxValueBeforeRemoving !== firstNameCheckboxValueAfterRemoving && lastNameCheckboxValueBeforeRemoving !== lastNameCheckboxValueAfterRemoving) {
            console.log("As after removing 'First Name and Last Name' fields are removed from 'Current Fields' and unchecked from 'All Contact Fields',so test case has been passed");
        } else {
            await assert.fail("As after removing 'First Name and Last Name' fields are not removed from 'Current Fields' and checked from 'All Contact Fields',so test case has been aborted");
        }
        if((currentFieldsCountBeforeSelectingFieldsLength)-1 === currentFieldsCountAfterSelectingFieldsLength) {
            console.log("As current fields length is decreased by (X-2) after selecting two fields from all contact fields and first name and last name are checked after selecting fields,so test case has been passed");
        } else {
            await assert.fail("As current fields length is not decreased by (X-2) after selecting two fields from all contact fields and first name and last name remains unchecked even after selecting fields,so test case has been aborted");
        }
        //Performing 'Cancel' button functionality
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(3000);
        //check 'Manage Fields Screen' redirects to 'Contact Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Manage Fields Screen' icon it redirects to 'Contact Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Manage Fields Screen' icon it does not redirects to 'Contact Details' screen page,so test case has been aborted");
        }
        //get count of 'Contact Details Fields' after moving back to 'Contact Details' page
        const contactDetailsPageFields = await driver.findElements(By.xpath('//span[@class="display-name title primary-text-dark font-bold flex-1"]'));
        const contactDetailsPageFieldsLength = await contactDetailsPageFields.length;
        console.log("Contact Details Page Fields Length: "+contactDetailsPageFieldsLength);
        if(currentFieldsCountAfterSelectingFieldsLength === contactDetailsPageFieldsLength) {
            console.log("As 'Current Fields' length and 'Contact Details Page Fields' length are equal.so test case has been passed");
        } else {
            await assert.fail("As 'Current Fields' length and 'Contact Details Page Fields' length are not equal.so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 6: As a User, Verify that it should redirect to contact Layout screen upon clicking on Add Contact Field button of Customized field screen-----

Then('on clicking on Add Contact Field button of Customized field screen it should redirect to contact layout screen',async function(){
    try {
        const addContactButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Contact field');
        await addContactButton.click();
        await driver.sleep(3000);
        //check 'Add Contact Field Button' redirect to 'Contact Layout' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('app/setup/customization/layouts/1')) {
            console.log("As on click of 'Add Contact Field Button' it redirects to 'Contact Layout' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Add Contact Field Button' it does not redirects to 'Contact Layout' screen page,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactLayoutPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 7: As a User, Verify that it should allow me to collapse and expand the 'Contact Details' widget---------

Then('verify that it should allow user to collapse and expand Details widget',async function(){
    try {
        //click on 'Collapse' arrow from 'Contact Details Page'
        const expandOrCollapse = await editContactDetailsElementsObj.findExpandOrCollapseArrow(driver);
        await expandOrCollapse.click();
        await driver.sleep(2000);
        //verify whether section 'Table' is hidden or not after collapsing it
        await driver.manage().setTimeouts({implicit: 2000});
        const sectionTable = await driver.findElement(By.xpath('//sm-detail-widget[@class="sm-widget-block"]/section-body')).isDisplayed();
        if(sectionTable === false) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailSectionTableHidden.png');
            console.log("As section table is hidden after collapsing section,so test case has been passed");
        } else {
            await assert.fail("As section table is not hidden even after collapsing section,so test case has been aborted");
        }

        //click on 'Expand' arrow from 'Contact Details Page'
        const expandOrCollapseElement = await editContactDetailsElementsObj.findExpandOrCollapseArrow(driver);
        await expandOrCollapseElement.click();
        await driver.sleep(2000);
        //verify whether section 'Table' is visible or not after expanding it
        await driver.manage().setTimeouts({implicit: 2000});
        const sectionTableElement = await driver.findElement(By.xpath('//sm-detail-widget[@class="sm-widget-block"]/section-body')).isDisplayed();
        if(sectionTableElement === true) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailSectionTableVisibility.png');
            console.log("As section table is visible after expanding section,so test case has been passed");
        } else {
            await assert.fail("As section table is not visible even after expanding section,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailsWidget_NotExpanded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 8: As a User, Verify that it should allow user to update the fields from contact detail widget----------

Then('verify that it should allow user to update the fields from contact detail widget',async function(dataTable){
    try {
        const editLink = await editContactDetailsElementsObj.findEditLink(driver,1);
        await editLink.click();
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
                const emailField = await editContactDetailsElementsObj.findEditContactFields(driver,'email');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
                //get 'Email' field value before updation
                const emailFieldBeforeUpdation = await driver.findElement(By.id('email')).getAttribute('value');
                const editFieldSaveButton = await editContactDetailsElementsObj.findEditFieldSaveButton(driver,3);
                await editFieldSaveButton.click();
                await driver.sleep(1000);
                //get 'Email' field value after updation
                const emailFieldAfterUpdation = await driver.findElement(By.xpath('//sm-display-widget-value[1]/div/div[2]/div/div[1]')).getText();
                if(emailFieldBeforeUpdation === emailFieldAfterUpdation) {
                    console.log("As email field is updated in contact details page,so test case has been passed");
                } else {
                    await assert.fail("As email field is not updated in contact details page,so test case has been aborted");
                }
            } else if (fieldName == 'other phone') {
                otherPhoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required other phone field is given or not
                if (otherPhoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required other phone field, the test case execution has been aborted');
                }

                const editLink = await editContactDetailsElementsObj.findEditLink(driver,4);
                await editLink.click();
                //will find 'Other Phone' field and pass the new data
                const otherPhoneField = await editContactDetailsElementsObj.findEditContactFields(driver,'otherPhone');
                await clearFieldDataObj.clearFieldData(otherPhoneField);
                await otherPhoneField.sendKeys(otherPhoneFieldData);
                await driver.sleep(500);
                //get 'Other Phone' field value before updation
                const otherPhoneFieldBeforeUpdation = await driver.findElement(By.id('otherPhone')).getAttribute('value');
                const editFieldSaveButton = await editContactDetailsElementsObj.findEditFieldSaveButton(driver,4);
                await editFieldSaveButton.click();
                await driver.sleep(1000);
                //get 'Other Phone' field value after updation
                const otherPhoneFieldAfterUpdation = await driver.findElement(By.xpath('//sm-display-widget-value[4]/div/div[2]/div/div[1]')).getText();
                if(otherPhoneFieldBeforeUpdation !== otherPhoneFieldAfterUpdation) {
                    console.log("As other phone field is updated in contact details page,so test case has been passed");
                } else {
                    await assert.fail("As other phone field is not updated in contact details page,so test case has been aborted");
                }
            }
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailsWidget_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 9: As a User, Verify that timeline entries should be updated as per field update------------------

Then('verify that timeline entries should be updated as per field update',async function(){
   try {
        //get 'Updates Tab' timeline entry updated 'Email Field' value
        const tabName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','All');
        await tabName.click();
        await driver.sleep(2000);
        const allTabOwnerText = await driver.findElement(By.xpath('//div[@class="timeline-head-title"]')).getText();
        console.log(allTabOwnerText);
        const allTabEmailTextBeforeUpdation = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log//span)[5]')).getText();
        console.log("All Tab Email Text Before Updation: "+allTabEmailTextBeforeUpdation);
        const updatedEmailText = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log//span)[7]')).getText();
        console.log("All Tab Updated Email Text: "+updatedEmailText);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'allTabTimeLineEntry.png');

        //get 'All Tab' timeline entry updated 'Email Field' value
       const tabNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Updates');
       await tabNameElement.click();
       await driver.sleep(2000);
        const updatesTabOwnerText = await driver.findElement(By.xpath('//div[@class="timeline-head-title"]')).getText();
        console.log(updatesTabOwnerText);
        const updatesTabEmailTextBeforeUpdation = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log//span)[5]')).getText();
        console.log("Updates Tab Email Text Before Updation: "+updatesTabEmailTextBeforeUpdation);
        const updatesTabEmailText = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log//span)[7]')).getText();
        console.log("Updated Tab Updated Email Text: "+updatesTabEmailText);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'updatesTabTimeLineEntry.png');
        console.log("As 'All' tab and 'Updates' tab updated email are displayed,so test case has been passed");
   }catch(err){
       await screenshotObj.takeScreenshot(driver,screenshotPath+'timelineEntry_NotUpdated.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//--------------Case 10: As a User, Verify that validation message for required fields should be display----------------

Then('verify that validation of element {string} of edit link as {string} as {string} should be displayed',async function(idName,editIndex,expectedNotification){
    try {
        await driver.findElement(By.xpath(`//sm-display-widget-value[${editIndex}]/div/div[1]/a`)).click();
        await driver.sleep(1500);
        //will find 'Last Name' field and pass the new data
        const lastNameField = await editContactDetailsElementsObj.findEditContactFields(driver,`${idName}`);
        await clearFieldDataObj.clearFieldData(lastNameField);
        await lastNameField.sendKeys(' ');
        await driver.sleep(500);
        await driver.findElement(By.xpath(`//sm-display-widget-value[${editIndex}]/div/div[1]/a[2]`)).click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validationMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 11: As a User, Verify that If user don't have rights to Update contact then All field of contact detail widget should not display edit icon-----

When('All field of contact detail widget should not display edit icon for {string}',async function(adminUser){
    try {
        const contactModule = await moduleElementsObj.findContactModule(driver,'icon-ic_contacts');
        await contactModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check invisibility of 'Edit' icon for all fields on 'Contact Details Page'
        const emailFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[1]/div/div[1]/a'));
        const emailFieldEditIconLength = await emailFieldEditIcon.length;
        const phoneFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[2]/div/div[1]/a'));
        const phoneFieldEditIconLength = await phoneFieldEditIcon.length;
        const mobileFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[3]/div/div[1]/a'));
        const mobileFieldEditIconLength = await mobileFieldEditIcon.length;
        const otherPhoneFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[4]/div/div[1]/a'));
        const otherPhoneFieldEditIconLength = await otherPhoneFieldEditIcon.length;
        const websiteFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[5]/div/div[1]/a'));
        const websiteFieldEditIconLength = await websiteFieldEditIcon.length;
        const addressLine1FieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[6]/div/div[1]/a'));
        const addressLine1FieldEditIconLength = await addressLine1FieldEditIcon.length;
        const addressLine2FieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[7]/div/div[1]/a'));
        const addressLine2FieldEditIconLength = await addressLine2FieldEditIcon.length;
        const cityFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[8]/div/div[1]/a'));
        const cityFieldEditIconLength = await cityFieldEditIcon.length;
        const stateFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[9]/div/div[1]/a'));
        const stateFieldEditIconLength = await stateFieldEditIcon.length;
        const zipCodeFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[10]/div/div[1]/a'));
        const zipCodeFieldEditIconLength = await zipCodeFieldEditIcon.length;
        const countryFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[11]/div/div[1]/a'));
        const countryFieldEditIconLength = await countryFieldEditIcon.length;
        const descriptionFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[12]/div/div[1]/a'));
        const descriptionFieldEditIconLength = await descriptionFieldEditIcon.length;
        const tagsFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[13]/div/div[1]/a'));
        const tagsFieldEditIconLength = await tagsFieldEditIcon.length;
        const idFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[14]/div/div[1]/a'));
        const idFieldEditIconLength = await idFieldEditIcon.length;
        const lastNameFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[15]/div/div[1]/a'));
        const lastNameFieldEditIconLength = await lastNameFieldEditIcon.length;
        try {
            strictEqual(emailFieldEditIconLength,0);
            strictEqual(phoneFieldEditIconLength,0);
            strictEqual(mobileFieldEditIconLength,0);
            strictEqual(otherPhoneFieldEditIconLength,0);
            strictEqual(websiteFieldEditIconLength,0);
            strictEqual(addressLine1FieldEditIconLength,0);
            strictEqual(addressLine2FieldEditIconLength,0);
            strictEqual(cityFieldEditIconLength,0);
            strictEqual(stateFieldEditIconLength,0);
            strictEqual(zipCodeFieldEditIconLength,0);
            strictEqual(countryFieldEditIconLength,0);
            strictEqual(descriptionFieldEditIconLength,0);
            strictEqual(tagsFieldEditIconLength,0);
            strictEqual(idFieldEditIconLength,0);
            strictEqual(lastNameFieldEditIconLength,0);
            console.log("As 'Edit Icon' is not displayed after disabling right to 'Edit Contact',so test case has been passed");
        }catch(err) {
            await assert.fail(err);
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editContactButton_NotFound.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 12: As a User, Verify that user don't have rights to Manage field then User should not be able to edit customized field------

When('{string} should not be able to edit customized field for {string}',async function(adminUser,moduleName){
    try {
        const contactModule = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await contactModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check invisibility of 'Edit Link'
        const editIcon = await driver.findElements(By.xpath('//sm-display-widget-value[1]/div/div[1]/a'));
        const editIconLength = await editIcon.length;
        strictEqual(editIconLength,0);
        console.log("As 'Edit Fields Icon' is not visible after disabling right to 'Manage Fields',so test case has been passed");
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'manageFieldButton_NotFound.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(6000);
        await assert.fail(err);
    }
});
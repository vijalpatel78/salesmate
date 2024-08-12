const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/04_editCompanyDetails/screenshots/';
const editContactDetailsElementsObj = require('../../../../06_contact/09_contactDetails/04_editContactDetails/common/editContactDetailsElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');

let addressLine1FieldData = 'no', otherPhoneFieldData = 'no';

//------------------------------Case 1: As a User, Verify UI of 'Contact Details' widget--------------------------------

Then('As a User, Verify UI of "Company Details" widget',async function(){
    try {
        //check 'Company Details' widget visibility
        const companyDetailsText = await driver.findElement(By.xpath('//sm-detail-widget[@class="sm-widget-block"]//h4')).getText();
        console.log("Is 'Company Details' Text is displayed: "+companyDetailsText);
        const companyDetailsVisibility = !!await driver.findElement(By.xpath('//sm-detail-widget[@class="sm-widget-block"]//h4')).isDisplayed();
        console.log("Is Contact Details Visible: "+companyDetailsVisibility);
        strictEqual(companyDetailsVisibility,true);
        //check 'Customize Fields Icon' visibility
        const customizeFieldsIconVisibility = !!await driver.findElement(By.xpath('//sm-detail-widget//h4/span[1]')).isDisplayed();
        console.log("Is Customize Fields Icon Visible: "+customizeFieldsIconVisibility);
        strictEqual(customizeFieldsIconVisibility,true);
        //check 'Selected Fields' visibility
        const selectedPhoneField = !!await driver.findElement(By.xpath('//section-body//span[.="Phone"]')).isDisplayed();
        console.log("Is Selected Phone Field Visible: "+selectedPhoneField);
        strictEqual(selectedPhoneField,true);
        const selectedOtherPhoneField = !!await driver.findElement(By.xpath('//section-body//span[.="Other Phone"]')).isDisplayed();
        console.log("Is Selected Other Phone Field Visible: "+selectedOtherPhoneField);
        strictEqual(selectedOtherPhoneField,true);
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
        const phoneEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[1]/div/div[1]/a')).isEnabled();
        console.log("Is Phone Edit Link Visible: "+phoneEditLink);
        strictEqual(phoneEditLink,true);
        const otherPhoneEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[2]/div/div[1]/a')).isEnabled();
        console.log("Is Other Phone Edit Link Visible: "+otherPhoneEditLink);
        strictEqual(otherPhoneEditLink,true);
        const addressLine1EditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[3]/div/div[1]/a')).isEnabled();
        console.log("Is Address Line 1 Edit Link Visible: "+addressLine1EditLink);
        strictEqual(addressLine1EditLink,true);
        const addressLine2EditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[4]/div/div[1]/a')).isEnabled();
        console.log("Is Address Line 2 Edit Link Visible: "+addressLine2EditLink);
        strictEqual(addressLine2EditLink,true);
        const cityEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[5]/div/div[1]/a')).isEnabled();
        console.log("Is City Edit Link Visible: "+cityEditLink);
        strictEqual(cityEditLink,true);
        const stateEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[6]/div/div[1]/a')).isEnabled();
        console.log("Is State Edit Link Visible: "+stateEditLink);
        strictEqual(stateEditLink,true);
        const zipCodeEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[7]/div/div[1]/a')).isEnabled();
        console.log("Is Zip Code Edit Link Visible: "+zipCodeEditLink);
        strictEqual(zipCodeEditLink,true);
        const countryEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[8]/div/div[1]/a')).isEnabled();
        console.log("Is Country Edit Link Visible: "+countryEditLink);
        strictEqual(countryEditLink,true);
        const descriptionEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[9]/div/div[1]/a')).isEnabled();
        console.log("Is Description Edit Link Visible: "+descriptionEditLink);
        strictEqual(descriptionEditLink,true);
        const tagsEditLink = !!await driver.findElement(By.xpath('//sm-display-widget-value[10]/div/div[1]/a')).isEnabled();
        console.log("Is Tags Edit Link Visible: "+tagsEditLink);
        strictEqual(tagsEditLink,true);
        //check 'System Fields' 'Edit Link'
        await driver.manage().setTimeouts({implicit: 2000});
        const idEditLink = await driver.findElements(By.xpath('//sm-display-widget-value[11]/div/div[1]/a'));
        const idEditLinkLength = await idEditLink.length;
        if(idEditLinkLength === 0) {
            console.log("As Id is 'System Field',so it's 'Edit Link' is not visible so length is: "+idEditLinkLength+" ,so test case has been passed");
        } else {
            await assert.fail("As Id is 'System Field',so it's 'Edit Link' is visible so length is: "+idEditLinkLength+" ,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companyDetailsWidgetsUI_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 2: As a User, Verify that upon clicking on Customized fields option it should redirect to Manage Contact Fields screen------

Then('on click of Customized fields option it should redirect to Manage Company Fields screen',async function(){
    try {
        const customizeFieldsIcon = await editContactDetailsElementsObj.findCustomizeFieldsIcon(driver);
        await customizeFieldsIcon.click();
        await driver.sleep(1000);
        //check 'Customize Fields' redirect to 'Manage Company Fields' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('app/companies/customisefields')) {
            console.log("As on click of 'Customize Fields' icon it redirects to 'Manage Company Fields' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Customize Fields' icon it does not redirects to 'Manage Company Fields' screen page,so test case has been aborted");
        }
        //check visibility of 'Current Fields' Text
        const currentFieldsText = await driver.findElement(By.xpath('//div[1]/aside[1]/div[@class="fieldsBlock"]//h3')).getText();
        console.log("Current Fields Text: "+currentFieldsText);
        const currentFieldsVisibility = !!await driver.findElement(By.xpath('//div[1]/aside[1]/div[@class="fieldsBlock"]//h3')).isDisplayed();
        console.log("Current Fields Visibility: "+currentFieldsVisibility);
        //check visibility of 'Current Fields' Names
        const currentFieldPhoneVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[1]')).isDisplayed();
        console.log("Is Current Field 'Phone' Visible: "+currentFieldPhoneVisibility);
        strictEqual(currentFieldPhoneVisibility,true);
        const currentFieldOtherPhoneVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[2]')).isDisplayed();
        console.log("Is Current Field 'Other Phone' Visible: "+currentFieldOtherPhoneVisibility);
        strictEqual(currentFieldOtherPhoneVisibility,true);
        const currentFieldAddressLine1Visibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[3]')).isDisplayed();
        console.log("Is Current Field 'Address Line 1' Visible: "+currentFieldAddressLine1Visibility);
        strictEqual(currentFieldAddressLine1Visibility,true);
        const currentFieldAddressLine2Visibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[4]')).isDisplayed();
        console.log("Is Current Field 'Address Line 2' Visible: "+currentFieldAddressLine2Visibility);
        strictEqual(currentFieldAddressLine2Visibility,true);
        const currentFieldCityVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[5]')).isDisplayed();
        console.log("Is Current Field 'City' Visible: "+currentFieldCityVisibility);
        strictEqual(currentFieldCityVisibility,true);
        const currentFieldStateVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[6]')).isDisplayed();
        console.log("Is Current Field 'State' Visible: "+currentFieldStateVisibility);
        strictEqual(currentFieldStateVisibility,true);
        const currentFieldZipCodeVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[7]')).isDisplayed();
        console.log("Is Current Field 'Zip Code' Visible: "+currentFieldZipCodeVisibility);
        strictEqual(currentFieldZipCodeVisibility,true);
        const currentFieldCountryVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[8]')).isDisplayed();
        console.log("Is Current Field 'Country' Visible: "+currentFieldCountryVisibility);
        strictEqual(currentFieldCountryVisibility,true);
        const currentFieldDescriptionVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[9]')).isDisplayed();
        console.log("Is Current Field 'Description' Visible: "+currentFieldDescriptionVisibility);
        strictEqual(currentFieldDescriptionVisibility,true);
        const currentFieldTagsVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[10]')).isDisplayed();
        console.log("Is Current Field 'Tags' Visible: "+currentFieldTagsVisibility);
        strictEqual(currentFieldTagsVisibility,true);
        //check visibility of 'All Company Fields' Text
        const allCompanyFieldsText = await driver.findElement(By.xpath('(//sm-contact-customise-fields//h3)[2]')).getText();
        console.log("All Company Fields Text: "+allCompanyFieldsText);
        //check visibility of 'All Company Fields Sections'
        const systemFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[1]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'System Fields' Visible: "+systemFieldsVisible);
        strictEqual(systemFieldsVisible,true);
        const defaultFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[2]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Default Fields' Visible: "+defaultFieldsVisible);
        strictEqual(defaultFieldsVisible,true);
        const socialFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[3]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Social Fields' Visible: "+socialFieldsVisible);
        strictEqual(socialFieldsVisible,true);
        const detailsFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[4]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Details Fields' Visible: "+detailsFieldsVisible);
        strictEqual(detailsFieldsVisible,true);
        const addressFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[5]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Address Fields' Visible: "+addressFieldsVisible);
        strictEqual(addressFieldsVisible,true);
        const internalFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[6]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Internal Fields' Visible: "+internalFieldsVisible);
        strictEqual(internalFieldsVisible,true);
        const customSectionFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[7]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Custom Section Fields' Visible: "+customSectionFieldsVisible);
        strictEqual(customSectionFieldsVisible,true);
        const allDetailsFieldsVisible = !!await driver.findElement(By.xpath('//div[2]/div[1]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'All Details Fields' Visible: "+allDetailsFieldsVisible);
        strictEqual(allDetailsFieldsVisible,true);
        //check visibility of 'Add Company Field' button
        const addCompanyFieldButtonVisibility = !!await driver.findElement(By.xpath('//a[text()=" Add Company field"]')).isDisplayed();
        console.log("Is 'Add Company Field Button' Visible: "+addCompanyFieldButtonVisibility);
        strictEqual(addCompanyFieldButtonVisibility,true);
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

//--------Case 4: As a User, Verify that User can Add - remove fields from customized screen to show in company detail widget---------

Then('user can add and remove fields from the customized screen',async function(){
    try {
        //get 'Tags' field checkbox value before 'Removing'
        const tagsCheckboxValueBeforeRemoving = await driver.findElement(By.id('tags')).getAttribute('value');
        console.log("Tags Field CheckBox Value Before Removing: "+tagsCheckboxValueBeforeRemoving);
        //Removing 'Tags' field from 'Current Fields' Section
        const currentFieldsCloseIcon = await editContactDetailsElementsObj.findCurrentFieldCloseIcon(driver,10);
        await currentFieldsCloseIcon.click();
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
        const nameCheckboxValueBeforeSelecting = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Name Checkbox Value Before Selecting: "+nameCheckboxValueBeforeSelecting);
        //Selecting Fields from 'All Contact Fields'
        const name = await driver.findElement(By.id('name'));
        await driver.executeScript("arguments[0].click();",name);
        const saveButtonElement = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButtonElement.click();
        await driver.sleep(2000);
        //get count of 'Current Fields' after 'Selecting Fields'
        const currentFieldsCountAfterSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountAfterSelectingFieldsLength = await currentFieldsCountAfterSelectingFields.length;
        console.log("Current Field Count After Selecting Fields: "+currentFieldsCountAfterSelectingFieldsLength);
        const nameCheckboxValueAfterSelecting = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Name Checkbox Value After Selecting: "+nameCheckboxValueAfterSelecting);
        if((currentFieldsCountBeforeSelectingFieldsLength)+1 === currentFieldsCountAfterSelectingFieldsLength) {
            console.log("As current fields length is increased by (X+1) after selecting two fields from all contact fields and first name and last name are checked after selecting fields,so test case has been passed");
        } else {
            await assert.fail("As current fields length is not increased by (X+1) after selecting two fields from all contact fields and first name and last name remains unchecked even after selecting fields,so test case has been aborted");
        }
        const backButton = await editContactDetailsElementsObj.findManageFieldsBackButton(driver);
        await backButton.click();
        await driver.sleep(2000);
        //get count of 'Contact Details Fields' after moving back to 'Contact Details' page
        const contactDetailsPageFields = await driver.findElements(By.xpath('//span[@class="display-name title primary-text-dark font-bold flex-1"]'));
        const contactDetailsPageFieldsLength = await contactDetailsPageFields.length;
        console.log("Contact Details Page Fields Length: "+contactDetailsPageFieldsLength);
        if(currentFieldsCountAfterSelectingFieldsLength === contactDetailsPageFieldsLength) {
            console.log("As 'Current Fields' length and 'Company Details Page Fields' length are equal.so test case has been passed");
        } else {
            await assert.fail("As 'Current Fields' length and 'Company Details Page Fields' length are not equal.so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 5: As a User, Verify Save and cancel button functionality of customized fields screen---------------

Then('verify Save and Cancel button functionality of customized fields screen',async function(){
    try {
        //Performing 'Save' button functionality
        //get count of 'Current Fields' before 'Selecting Fields'
        const currentFieldsCountBeforeSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountBeforeSelectingFieldsLength = await currentFieldsCountBeforeSelectingFields.length;
        console.log("Current Field Count Before Selecting Fields: "+currentFieldsCountBeforeSelectingFieldsLength);
        //get 'Name' field checkbox value before 'Removing'
        const nameCheckboxValueBeforeRemoving = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Name Field CheckBox Value Before Removing: "+nameCheckboxValueBeforeRemoving);
        //Removing 'Name' fields from 'Current Fields' Section
        const closeIcon = await editContactDetailsElementsObj.findCurrentFieldCloseIcon(driver,10);
        await closeIcon.click();
        await driver.sleep(1500);
        //'Selecting' 'Id' field from 'All Company Fields'
        const idCheckboxValueBeforeSelecting = await driver.findElement(By.id('id')).getAttribute('value');
        console.log("Id Checkbox Value Before Selecting: "+idCheckboxValueBeforeSelecting);
        //Selecting Fields from 'All Contact Fields'
        const idCheckbox = await driver.findElement(By.id('id'));
        await driver.executeScript("arguments[0].click();",idCheckbox);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(2000);
        //get 'Name' field checkbox value after 'Removing'
        await driver.manage().setTimeouts({implicit: 2000});
        const nameCheckboxValueAfterRemoving = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Name Field CheckBox Value After Removing: "+nameCheckboxValueAfterRemoving);
        const nameInCurrentField = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li[text()=" Name "]'));
        const nameInCurrentFieldLength = await nameInCurrentField.length;
        //get count of 'Current Fields' after 'Selecting Fields'
        const currentFieldsCountAfterSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountAfterSelectingFieldsLength = await currentFieldsCountAfterSelectingFields.length;
        console.log("Current Field Count After Selecting Fields: "+currentFieldsCountAfterSelectingFieldsLength);
        const idCheckboxValueAfterSelecting = await driver.findElement(By.id('id')).getAttribute('value');
        console.log("Id Checkbox Value After Selecting: "+idCheckboxValueAfterSelecting);
        if(nameInCurrentFieldLength === 0 && nameCheckboxValueBeforeRemoving !== nameCheckboxValueAfterRemoving) {
            console.log("As after removing 'Name' field removed from 'Current Fields' and unchecked from 'All Company Fields',so test case has been passed");
        } else {
            await assert.fail("As after removing 'Name' field is not removed from 'Current Fields' and checked from 'All Company Fields',so test case has been aborted");
        }
        if((currentFieldsCountBeforeSelectingFieldsLength)-1 === currentFieldsCountAfterSelectingFieldsLength) {
            console.log("As current fields length is decreased by (X-1) after selecting two fields from all company fields and name is checked after selecting fields,so test case has been passed");
        } else {
            await assert.fail("As current fields length is not decreased by (X-1) after selecting two fields from all company fields and name remains unchecked even after selecting fields,so test case has been aborted");
        }
        //Performing 'Cancel' button functionality
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(3000);
        //check 'Manage Fields Screen' redirects to 'Company Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Manage Fields Screen' icon it redirects to 'Company Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Manage Fields Screen' icon it does not redirects to 'Company Details' screen page,so test case has been aborted");
        }
        //get count of 'Company Details Fields' after moving back to 'Company Details' page
        const companyDetailsPageFields = await driver.findElements(By.xpath('//span[@class="display-name title primary-text-dark font-bold flex-1"]'));
        const companyDetailsPageFieldsLength = await companyDetailsPageFields.length;
        console.log("Company Details Page Fields Length: "+companyDetailsPageFieldsLength);
        if(currentFieldsCountAfterSelectingFieldsLength === companyDetailsPageFieldsLength) {
            console.log("As 'Current Fields' length and 'Company Details Page Fields' length are equal.so test case has been passed");
        } else {
            await assert.fail("As 'Current Fields' length and 'Company Details Page Fields' length are not equal.so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 6: As a User, Verify that it should redirect to contact Layout screen upon clicking on Add Contact Field button of Customized field screen-----

Then('on clicking on Add Company Field button of Customized field screen it should redirect to company layout screen',async function(){
    try {
        const addCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Company field');
        await addCompanyButton.click();
        await driver.sleep(3000);
        //check 'Add Company Field Button' redirect to 'Company Layout' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('app/setup/customization/layouts/5')) {
            console.log("As on click of 'Add Company Field Button' it redirects to 'Company Layout' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Add Company Field Button' it does not redirects to 'Company Layout' screen page,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companyLayoutPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 8: As a User, Verify that it should allow user to update the fields from company detail widget----------

Then('verify that it should allow user to update the fields from company detail widget',async function(dataTable){
    try {
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'other phone') {
                otherPhoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required other phone field is given or not
                if (otherPhoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required other phone field, the test case execution has been aborted');
                }

                const editLink = await editContactDetailsElementsObj.findEditLink(driver,2);
                await editLink.click();
                await driver.sleep(1000);
                //will find 'Other Phone' field and pass the new data
                const otherPhoneField = await editContactDetailsElementsObj.findEditContactFields(driver,'otherPhone');
                await clearFieldDataObj.clearFieldData(otherPhoneField);
                await otherPhoneField.sendKeys(otherPhoneFieldData);
                await driver.sleep(500);
                //get 'Other Phone' field value before updation
                const otherPhoneFieldBeforeUpdation = await driver.findElement(By.id('otherPhone')).getAttribute('value');
                const editFieldSaveButton = await editContactDetailsElementsObj.findEditFieldSaveButton(driver,2);
                await editFieldSaveButton.click();
                await driver.sleep(1000);
                //get 'Other Phone' field value after updation
                const otherPhoneFieldAfterUpdation = await driver.findElement(By.xpath('//sm-display-widget-value[4]/div/div[2]/div/div[1]')).getText();
                if(otherPhoneFieldBeforeUpdation !== otherPhoneFieldAfterUpdation) {
                    console.log("As other phone field is updated in contact details page,so test case has been passed");
                } else {
                    await assert.fail("As other phone field is not updated in contact details page,so test case has been aborted");
                }
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the required address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required address line1 field, the test case execution has been aborted');
                }

                const editLink = await editContactDetailsElementsObj.findEditLink(driver,3);
                await editLink.click();
                await driver.sleep(1000);
                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await editContactDetailsElementsObj.findEditContactFields(driver,'billingAddressLine1');
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
                //get 'Address Line1' field value before updation
                const addressLine1FieldBeforeUpdation = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
                const editFieldSaveButton = await editContactDetailsElementsObj.findEditFieldSaveButton(driver,3);
                await editFieldSaveButton.click();
                await driver.sleep(1500);
                //get 'Address Line1' field value after updation
                const addressLine1FieldAfterUpdation = await driver.findElement(By.xpath('//sm-display-widget-value[4]/div/div[2]/div/div[1]')).getText();
                if(addressLine1FieldBeforeUpdation !== addressLine1FieldAfterUpdation) {
                    console.log("As Address Line1 field is updated in contact details page,so test case has been passed");
                } else {
                    await assert.fail("As Address Line1 field is not updated in contact details page,so test case has been aborted");
                }
            }
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companyDetailsWidget_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 9: As a User, Verify that timeline entries should be updated as per field update------------------

Then('verify that the timeline entries should be updated as per field update',async function(){
    try {
        //get 'Updates Tab' timeline entry updated 'Email Field' value
        const tabName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','All');
        await tabName.click();
        await driver.sleep(2000);
        const allTabAddressLine1BeforeUpdation = await driver.findElement(By.xpath('//timeline-field-update-log[1]//span[@class="font-medium"]')).getText();
        console.log("All Tab Address Line1 Before Updation: "+allTabAddressLine1BeforeUpdation);
        const updatedAddressLine1Text = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log//span)[7]')).getText();
        console.log("All Tab Updated Address Line1: "+updatedAddressLine1Text);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'allTabTimeLineEntry.png');

        //get 'All Tab' timeline entry updated 'Email Field' value
        const tabNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Updates');
        await tabNameElement.click();
        await driver.sleep(2000);
        const updatesTabAddressLine1BeforeUpdation = await driver.findElement(By.xpath('//timeline-field-update-log[1]//span[@class="font-medium"]')).getText();
        console.log("Updates Tab Address Line1 Before Updation: "+updatesTabAddressLine1BeforeUpdation);
        const updatesTabAddressLine1Text = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log//span)[7]')).getText();
        console.log("Updated Tab Updated Address Line1 Text: "+updatesTabAddressLine1Text);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'updatesTabTimeLineEntry.png');
        console.log("As 'All' tab and 'Updates' tab updated Address Line1 are displayed,so test case has been passed");
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'timelineEntry_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 10: As a User, Verify that validation message for required fields should be display----------------

Then('verify that validation message {string} for required fields should be display',async function(expectedNotification){
    try {
        const nameElement = await driver.findElement(By.xpath('//section-body//span[.="Name"]'));
        await nameElement.click();
        await driver.sleep(1500);
        //will find 'Name' field and pass the new data
        const nameField = await editContactDetailsElementsObj.findEditContactFields(driver,'name');
        await clearFieldDataObj.clearFieldData(nameField);
        await nameField.sendKeys(' ');
        await driver.sleep(500);
        await driver.findElement(By.xpath('//sm-display-widget-value[12]/div/div[1]/a[2]')).click();
        await driver.sleep(1000);
        const actualNotification = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(2000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validationMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 11: As a User, Verify that If user don't have rights to Update contact then All field of contact detail widget should not display edit icon-----

When('All field of company detail widget should not display edit icon for {string}',async function(adminUser){
    try {
        const companyModule = await moduleElementsObj.findContactModule(driver,'icon-ic_company');
        await companyModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check invisibility of 'Edit' icon for all fields on 'Contact Details Page'
        const phoneFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[2]/div/div[1]/a'));
        const phoneFieldEditIconLength = await phoneFieldEditIcon.length;
        const otherPhoneFieldEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[4]/div/div[1]/a'));
        const otherPhoneFieldEditIconLength = await otherPhoneFieldEditIcon.length;
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
            strictEqual(phoneFieldEditIconLength,0);
            strictEqual(otherPhoneFieldEditIconLength,0);
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
            console.log("As 'Edit Icon' is not displayed after disabling right to 'Edit Company',so test case has been passed");
        }catch(err) {
            await assert.fail(err);
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editContactButton_NotFound.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 12: As a User, Verify that user don't have rights to Manage field then User should not be able to edit customized field------

When('{string} not be able to edit customized field',async function(adminUser){
    try {
        const companyModule = await moduleElementsObj.findContactModule(driver,'icon-ic_company');
        await companyModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check invisibility of 'Customize Fields' icon on 'Contact Details Page'
        const customizeFieldsIcon = await driver.findElements(By.xpath('//sm-detail-widget[1]//h4/span[1]'));
        const customizeFieldsIconLength = await customizeFieldsIcon.length;
        strictEqual(customizeFieldsIconLength,0);
        console.log("As 'Customize Fields Icon' is not visible after disabling right to 'Manage Fields',so test case has been passed");
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'manageFieldButton_NotFound.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
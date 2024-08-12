const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/08_dealDetailsWidget/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const editContactDetailsElementsObj = require('../../../../06_contact/09_contactDetails/04_editContactDetails/common/editContactDetailsElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let descriptionFieldData = 'no';

When('user is on customize fields screen',async function(){
   try {
       const customizeFieldsIcon = await editContactDetailsElementsObj.findCustomizeFieldsIcon(driver);
       await customizeFieldsIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//------------------------------Case 1: As a User, Verify UI of 'Deal Details' widget--------------------------------

Then('As a User, Verify UI of "Deal Details" widget',async function(){
    try {
        //check 'Deal Details' widget visibility
        const dealDetailsText = await driver.findElement(By.xpath('(//div[@id="leftSideWidgetContainer"]//h4)[1]')).getText();
        console.log("Is 'Deal Details' Text is displayed: "+dealDetailsText);
        const dealDetailsVisibility = !!await driver.findElement(By.xpath('(//div[@id="leftSideWidgetContainer"]//h4)[1]')).isDisplayed();
        console.log("Is Contact Details Visible: "+dealDetailsVisibility);
        strictEqual(dealDetailsVisibility,true);
        //check 'Customize Fields Icon' visibility
        const customizeFieldsIconVisibility = !!await driver.findElement(By.xpath('//sm-detail-widget//h4/span[1]')).isDisplayed();
        console.log("Is Customize Fields Icon Visible: "+customizeFieldsIconVisibility);
        strictEqual(customizeFieldsIconVisibility,true);
        //check 'Selected Fields' visibility
        const sourceField = !!await driver.findElement(By.xpath('//section-body//span[.="Source"]')).isDisplayed();
        console.log("Is Source Field Visible: "+sourceField);
        strictEqual(sourceField,true);
        const priorityField = !!await driver.findElement(By.xpath('//section-body//span[.="Priority"]')).isDisplayed();
        console.log("Is Priority Field Visible: "+priorityField);
        strictEqual(priorityField,true);
        const descriptionField = !!await driver.findElement(By.xpath('//section-body//span[.="Description"]')).isDisplayed();
        console.log("Is Description Field Visible: "+descriptionField);
        strictEqual(descriptionField,true);
        const tagsField = !!await driver.findElement(By.xpath('//section-body//span[.="Tags"]')).isDisplayed();
        console.log("Is Tags Field Visible: "+tagsField);
        strictEqual(tagsField,true);
        //check 'Edit Link' for 'Selected Fields'
        const sourceEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[1]/div//a')).isEnabled();
        console.log("Is Source Edit Link Visible: "+sourceEditLink);
        strictEqual(sourceEditLink,true);
        const priorityEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[2]/div//a')).isEnabled();
        console.log("Is Priority Edit Link Visible: "+priorityEditLink);
        strictEqual(priorityEditLink,true);
        const descriptionEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[3]/div//a')).isEnabled();
        console.log("Is Description Edit Link Visible: "+descriptionEditLink);
        strictEqual(descriptionEditLink,true);
        const tagsEditLink = !!await driver.findElement(By.xpath('//section-body/sm-display-widget-value[4]/div//a')).isEnabled();
        console.log("Is Tags Edit Link Visible: "+tagsEditLink);
        strictEqual(tagsEditLink,true);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailsWidgetsUI_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 2: As a User, Verify that upon clicking on Customized fields option it should redirect to Manage Contact Fields screen------

Then('on click of Customized fields option it should redirect to Manage Deal Fields screen',async function(){
    try {
        const customizeFieldsIcon = await editContactDetailsElementsObj.findCustomizeFieldsIcon(driver);
        await customizeFieldsIcon.click();
        await driver.sleep(1000);
        //check 'Customize Fields' redirect to 'Manage Contact Fields' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/customisefields')) {
            console.log("As on click of 'Customize Fields' icon it redirects to 'Manage Fields' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Customize Fields' icon it does not redirects to 'Manage Fields' screen page,so test case has been aborted");
        }
        //check visibility of 'Current Fields' Text
        const currentFieldsText = await driver.findElement(By.xpath('//div[1]/aside[1]/div[@class="fieldsBlock"]//h3')).getText();
        console.log("Current Fields Text: "+currentFieldsText);
        const currentFieldsVisibility = !!await driver.findElement(By.xpath('//div[1]/aside[1]/div[@class="fieldsBlock"]//h3')).isDisplayed();
        console.log("Current Fields Visibility: "+currentFieldsVisibility);
        //check visibility of 'Current Fields' Names
        const currentFieldSourceVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[1]')).isDisplayed();
        console.log("Is Current Field 'Source' Visible: "+currentFieldSourceVisibility);
        strictEqual(currentFieldSourceVisibility,true);
        const currentFieldPriorityVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[2]')).isDisplayed();
        console.log("Is Current Field 'Priority' Visible: "+currentFieldPriorityVisibility);
        strictEqual(currentFieldPriorityVisibility,true);
        const currentFieldDescriptionVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[3]')).isDisplayed();
        console.log("Is Current Field 'Description' Visible: "+currentFieldDescriptionVisibility);
        strictEqual(currentFieldDescriptionVisibility,true);
        const currentFieldTagsVisibility = !!await driver.findElement(By.xpath('//ul[@id="currentFields"]/li[4]')).isDisplayed();
        console.log("Is Current Field 'Tags' Visible: "+currentFieldTagsVisibility);
        strictEqual(currentFieldTagsVisibility,true);
        //check visibility of 'All Deal Fields' Text
        const allDealFieldsText = await driver.findElement(By.xpath('(//h3)[2]')).getText();
        console.log("All Deal Fields Text: "+allDealFieldsText);
        //check visibility of 'All Deal Fields Sections'
        const systemFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[1]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'System Fields' Visible: "+systemFieldsVisible);
        strictEqual(systemFieldsVisible,true);
        const defaultFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[2]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Default Fields' Visible: "+defaultFieldsVisible);
        strictEqual(defaultFieldsVisible,true);
        const detailsFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[3]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Details Fields' Visible: "+detailsFieldsVisible);
        strictEqual(detailsFieldsVisible,true);
        const internalFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[4]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'Internal Fields' Visible: "+internalFieldsVisible);
        strictEqual(internalFieldsVisible,true);
        const allDetailsFieldsVisible = !!await driver.findElement(By.xpath('//div[@class="fieldsBlock"]/div[2]/div[5]/section-title//span[@class="primary-text-dark"]')).isDisplayed();
        console.log("Is 'All Details Fields' Visible: "+allDetailsFieldsVisible);
        strictEqual(allDetailsFieldsVisible,true);
        //check visibility of 'Add Contact Field' button
        const addDealFieldButtonVisibility = !!await driver.findElement(By.xpath('//a[text()=" Add Deal field"]')).isDisplayed();
        console.log("Is 'Add Deal Field Button' Visible: "+addDealFieldButtonVisibility);
        strictEqual(addDealFieldButtonVisibility,true);
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

//-------Case 3: As a User, Verify that User can Add - remove fields from customized screen to show in deal detail widget-------------------------------

Then('user can add and remove fields from customized fields screen',async function(){
    try {
        //get 'Tags' field checkbox value before 'Removing'
        const tagsCheckboxValueBeforeRemoving = await driver.findElement(By.id('tags')).getAttribute('value');
        console.log("Tags Field CheckBox Value Before Removing: "+tagsCheckboxValueBeforeRemoving);
        //Removing 'Tags' field from 'Current Fields' Section
        const currentFieldCloseIcon = await editContactDetailsElementsObj.findCurrentFieldCloseIcon(driver,4);
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
        const ownerCheckboxValueBeforeSelecting = await driver.findElement(By.id('owner')).getAttribute('value');
        console.log("Owner Checkbox Value Before Selecting: "+ownerCheckboxValueBeforeSelecting);
        //Selecting Fields from 'All Contact Fields'
        const owner = await driver.findElement(By.id('owner'));
        await driver.executeScript("arguments[0].click();",owner);
        const saveButtonElement = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButtonElement.click();
        await driver.sleep(2000);
        //get count of 'Current Fields' after 'Selecting Fields'
        const currentFieldsCountAfterSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountAfterSelectingFieldsLength = await currentFieldsCountAfterSelectingFields.length;
        console.log("Current Field Count After Selecting Fields: "+currentFieldsCountAfterSelectingFieldsLength);
        const ownerCheckboxValueAfterSelecting = await driver.findElement(By.id('owner')).getAttribute('value');
        console.log("Owner Checkbox Value After Selecting: "+ownerCheckboxValueAfterSelecting);
        if((currentFieldsCountBeforeSelectingFieldsLength)+1 === currentFieldsCountAfterSelectingFieldsLength) {
            console.log("As current fields length is increased by (X+1) after selecting two fields from all contact fields and first name and last name are checked after selecting fields,so test case has been passed");
        } else {
            await assert.fail("As current fields length is not increased by (X+1) after selecting two fields from all contact fields and first name and last name remains unchecked even after selecting fields,so test case has been aborted");
        }
        const backButton = await editContactDetailsElementsObj.findManageFieldsBackButton(driver);
        await backButton.click();
        await driver.sleep(2000);
        //get count of 'Deal Details Fields' after moving back to 'Deal Details' page
        const dealDetailsPageFields = await driver.findElements(By.xpath('//span[@class="display-name title primary-text-dark font-bold flex-1"]'));
        const dealDetailsPageFieldsLength = await dealDetailsPageFields.length;
        console.log("Deal Details Page Fields Length: "+dealDetailsPageFieldsLength);
        if(currentFieldsCountAfterSelectingFieldsLength === dealDetailsPageFieldsLength) {
            console.log("As 'Current Fields' length and 'Deal Details Page Fields' length are equal,so test case has been passed");
        } else {
            await assert.fail("As 'Current Fields' length and 'Deal Details Page Fields' length are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 5: As a User, Verify Save and cancel button functionality of customized fields screen---------------

Then('verify Save and cancel button functionality of the customized fields screen',async function(){
    try {
        //Performing 'Save' button functionality
        //get count of 'Current Fields' before 'Selecting Fields'
        const currentFieldsCountBeforeSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountBeforeSelectingFieldsLength = await currentFieldsCountBeforeSelectingFields.length;
        console.log("Current Field Count Before Selecting Fields: "+currentFieldsCountBeforeSelectingFieldsLength);
        //get 'Owner' field checkbox value before 'Removing'
        const ownerCheckboxValueBeforeRemoving = await driver.findElement(By.id('owner')).getAttribute('value');
        console.log("Owner Field CheckBox Value Before Removing: "+ownerCheckboxValueBeforeRemoving);
        console.log(ownerCheckboxValueBeforeRemoving);
        await driver.sleep(500);
        //Removing 'Owner' field from 'Current Fields' Section
        const removeIcon = await editContactDetailsElementsObj.findCurrentFieldCloseIcon(driver,5);
        await removeIcon.click();
        await driver.sleep(700);
        //'Selecting' 'Tags' field from 'All Contact Fields'
        const tagsCheckboxValueBeforeSelecting = await driver.findElement(By.id('tags')).getAttribute('value');
        console.log("Tags Checkbox Value Before Selecting: "+tagsCheckboxValueBeforeSelecting);
        await driver.sleep(700);
        //Selecting Fields from 'All Contact Fields'
        const tagsCheckbox = await driver.findElement(By.id('tags'));
        await driver.executeScript("arguments[0].click();",tagsCheckbox);
        await driver.sleep(700);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(2000);
        //get 'Owner' field checkbox value after 'Removing'
        await driver.manage().setTimeouts({implicit: 2000});
        const ownerCheckboxValueAfterRemoving = await driver.findElement(By.id('owner')).getAttribute('value');
        console.log("Owner CheckBox Value After Removing: "+ownerCheckboxValueAfterRemoving);
        const ownerInCurrentField = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li[text()=" Owner "]'));
        const ownerInCurrentFieldLength = await ownerInCurrentField.length;
        //get count of 'Current Fields' after 'Selecting Fields'
        const currentFieldsCountAfterSelectingFields = await driver.findElements(By.xpath('//ul[@id="currentFields"]//li'));
        const currentFieldsCountAfterSelectingFieldsLength = await currentFieldsCountAfterSelectingFields.length;
        console.log("Current Field Count After Selecting Fields: "+currentFieldsCountAfterSelectingFieldsLength);
        const tagsCheckboxValueAfterSelecting = await driver.findElement(By.id('tags')).getAttribute('value');
        console.log("Tags Checkbox Value After Selecting: "+tagsCheckboxValueAfterSelecting);
        if(ownerInCurrentFieldLength === 0 && ownerCheckboxValueBeforeRemoving !== ownerCheckboxValueAfterRemoving) {
            console.log("As after removing 'Owner' field is removed from 'Current Fields' and unchecked from 'All Contact Fields',so test case has been passed");
        } else {
            await assert.fail("As after removing 'Owner' field is not removed from 'Current Fields' and checked from 'All Contact Fields',so test case has been aborted");
        }
        if(currentFieldsCountBeforeSelectingFieldsLength === currentFieldsCountAfterSelectingFieldsLength) {
            console.log("As current fields length is equal after selecting one field from all tags fields and removing one field,so test case has been passed");
        } else {
            await assert.fail("As current fields length is not equal even after selecting one field from all tags fields and removing one field,so test case has been aborted");
        }
        //Performing 'Cancel' button functionality
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(3000);
        //check 'Manage Fields Screen' redirects to 'Deal Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Manage Fields Screen' icon it redirects to 'Deal Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Manage Fields Screen' icon it does not redirects to 'Deal Details' screen page,so test case has been aborted");
        }
        //get count of 'Deal Details Fields' after moving back to 'Deal Details' page
        const dealDetailsPageFields = await driver.findElements(By.xpath('//span[@class="display-name title primary-text-dark font-bold flex-1"]'));
        const dealDetailsPageFieldsLength = await dealDetailsPageFields.length;
        console.log("Deal Details Page Fields Length: "+dealDetailsPageFieldsLength);
        if(currentFieldsCountAfterSelectingFieldsLength === dealDetailsPageFieldsLength) {
            console.log("As 'Current Fields' length and 'Deal Details Page Fields' length are equal,so test case has been passed");
        } else {
            await assert.fail("As 'Current Fields' length and 'Deal Details Page Fields' length are not equal,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 6: As a User, Verify that it should redirect to contact Layout screen upon clicking on Add Contact Field button of Customized field screen-----

Then('on clicking on Add Deal Field button of Customized field screen it should redirect to deal layout screen',async function(){
    try {
        const addDealButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Deal field');
        await addDealButton.click();
        await driver.sleep(3000);
        //check 'Add Deal Field Button' redirect to 'Deal Layout' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('app/setup/customization/layouts/4')) {
            console.log("As on click of 'Add Deal Field Button' it redirects to 'Deal Layout' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Add Deal Field Button' it does not redirects to 'Deal Layout' screen page,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealLayoutPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 8: As a User, Verify that it should allow user to update the fields from contact detail widget----------

Then('verify that it should allow user to update the fields from deal detail widget',async function(dataTable){
    try {
        const editLink = await editContactDetailsElementsObj.findEditLink(driver,3);
        await editLink.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'description') {
                descriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required description field is given or not
                if (descriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const descriptionField = await formElementsObj.findElementById(driver,screenshotPath,'description','desciptionField');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(descriptionFieldData);
                await driver.sleep(500);
                //get 'Description' field value before updation
                const descriptionFieldBeforeUpdation = await driver.findElement(By.id('description')).getAttribute('value');
                console.log(descriptionFieldBeforeUpdation);
                const descriptionFieldSaveButton = await editContactDetailsElementsObj.findEditFieldSaveButton(driver,3);
                await descriptionFieldSaveButton.click();
                await driver.sleep(1000);
                const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(actualNotificationElement));
                const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(actualNotification,'Field Updated');
                await driver.sleep(4000);
                //get 'Description' field value after updation
                const descriptionFieldAfterUpdation = await driver.findElement(By.xpath('//sm-display-widget-value[3]/div/div[2]/div/div[1]')).getText();
                console.log(descriptionFieldAfterUpdation);
                if(descriptionFieldBeforeUpdation === descriptionFieldAfterUpdation) {
                    console.log("As description field is updated in deal details page,so test case has been passed");
                } else {
                    await assert.fail("As description field is not updated in deal details page,so test case has been aborted");
                }
            }
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealDetailsWidget_NotUpdated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 11: As a User, Verify that If user don't have rights to Update deal then All field of deal detail widget should not display edit icon-----

When('All field of deal detail widget should not display edit icon for {string}',async function(adminUser){
    try {
        const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await contactModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check invisibility of 'Edit' icon for all fields on 'Deal Details Page'
        const sourceEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[1]/div/div[1]/a'));
        const sourceEditIconLength = await sourceEditIcon.length;
        const priorityEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[2]/div/div[1]/a'));
        const priorityEditIconLength = await priorityEditIcon.length;
        const descriptionEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[3]/div/div[1]/a'));
        const descriptionEditIconLength = await descriptionEditIcon.length;
        const tagsEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[4]/div/div[1]/a'));
        const tagsEditIconLength = await tagsEditIcon.length;
        const titleEditIcon = await driver.findElements(By.xpath('//sm-display-widget-value[5]/div/div[1]/a'));
        const titleEditIconLength = await titleEditIcon.length;
        try {
            strictEqual(sourceEditIconLength,0);
            strictEqual(priorityEditIconLength,0);
            strictEqual(descriptionEditIconLength,0);
            strictEqual(tagsEditIconLength,0);
            strictEqual(titleEditIconLength,0);
            console.log("As 'Edit Icon' is not displayed after disabling right to 'Edit Deal',so test case has been passed");
        }catch(err) {
            await assert.fail(err);
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editContactButton_NotFound.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
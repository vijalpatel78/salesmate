const { Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/05_listsTab/screenshots/';
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const listElementsObj = require('../common/listElements');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');
const performSalesmateLoginObj = require('../../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');

let addListPageListValue = 'no', listNameFieldData = 'no', listDescriptionFieldData = 'no';

//-------------------------Case 1: Test, add contacts to a list from contact's quick view screen------------------------

Then('check {string} message and add contacts to a list from contacts quick view screen',async function(expectedNotification){
   try {
       const lists = await driver.findElement(By.xpath('//div[6]/div/section-title//i')).getText();
       console.log(lists);
       const listsText = await lists.replace(/[()]/g, '');
       const listsCount = await parseInt(listsText);
       console.log("Files Count: "+listsCount);
       await listElementsObj.findSideArrow(driver);
       if(listsCount === 0) {
           //check 'No Lists found' message
           const actualNotification = await driver.findElement(By.xpath('//sm-list-widget//section-body//p')).getText();
           console.log("Actual List Notification: " + actualNotification);
           try {
               strictEqual(actualNotification, expectedNotification);
               console.log("As no lists are found 'Not added to any list' message is displayed,so test case has been passed");
           } catch (err) {
               await assert.fail(err);
           }
       } else {
           await assert.fail("As no lists are found 'Not added to any list' message is not displayed,so test case has been aborted");
       }
       await listElementsObj.findAddFileIcon(driver);
       await listElementsObj.findListDropDown(driver,1);
       //get 'Added List Value' of 'Add List' page
       const listText = await driver.findElement(By.xpath('//ngb-modal-window[2]//span[@role="combobox"]//li[1]')).getText();
       addListPageListValue = await listText.substr(2);
       console.log("Add List Page List Value: "+addListPageListValue);
       await listElementsObj.findSaveButton(driver);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'listNotification_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('verify added list details',async function(){
    try {
        const previewPageListValue = await driver.findElement(By.xpath('//sm-list-widget//b[@class="font-medium"]')).getText();
        console.log("Preview Page List Value: "+previewPageListValue);
        if(addListPageListValue === previewPageListValue) {
            console.log("As 'Add List Page' list value and 'Preview Page' list value are equal,so test case has been passed");
        } else {
            await assert.fail("As 'Add List Page' list value and 'Preview Page' list value are not equal,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------Case 2: Verify new list creation at the time of selecting the lists from contacts page while adding contacts to a list------

Then('new list creation at the time of selecting the lists from contacts page',async function(dataTable){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(2000);
        await listElementsObj.findAddToListButton(driver);
        await listElementsObj.findListDropDownTextBox(driver);
        const newList = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'div','Create New List');
        await newList.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'list name') {
                listNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required list name field is given or not
                if (listNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the list name field, the test case execution has been aborted');
                }

                //will find 'List Name' field and pass the new data
                const listNameField = await formElementsObj.findElementById(driver,screenshotPath,'listName','listNameField');
                await clearFieldDataObj.clearFieldData(listNameField);
                await listNameField.sendKeys(listNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'list description') {
                listDescriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required list description field is given or not
                if (listDescriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the list description name field, the test case execution has been aborted');
                }

                //will find 'List Description' field and pass the new data
                const listDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'listDescription','listDescriptionField');
                await clearFieldDataObj.clearFieldData(listDescriptionField);
                await listDescriptionField.sendKeys(listDescriptionFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'list_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 3: Verify behavior of add to list window when User clicks on save button without selecting any list from the select drop-down-----

Then('verify behavior of add to list window when User clicks on save button without selecting any list from the select drop-down',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        await listElementsObj.findAddToListButton(driver);
        await listElementsObj.findSaveButton(driver);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check validation {string} message',async function(expectedValidation){
    try {
        const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(2000);
        console.log("As actual and expected validations of list are equal,so test case has been passed");
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listValidation_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 4: Verify the behavior of cancel button and X-mark icon of add to list pop-up window------------------

Then('verify the behavior of cancel button and X-mark icon of add to list pop-up window',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        await listElementsObj.findAddToListButton(driver);
        await listElementsObj.findCancelButton(driver);
        //check invisibility of 'Add To List' popup window
        const addToListPopWindow = await driver.findElements(By.xpath('//h4[text()="Add to List"]'));
        const addToListPopupWindowLength = await addToListPopWindow.length;
        if(addToListPopupWindowLength === 0) {
            console.log("As 'Add List Popup Window' is not displayed so as it is closed after clicking on 'Cancel Button',so test case has been passed");
        } else {
            await assert.fail("As 'Add List Popup Window' is displayed so as it is not closed even after clicking on 'Cancel Button',so test case has been aborted");
        }
        const contactCheckboxElement = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckboxElement.click();
        await driver.sleep(1000);
        await listElementsObj.findAddToListButton(driver);
        await listElementsObj.findAddToListCloseIcon(driver);
        //check invisibility of 'Add To List' popup window
        const addToListPopElement = await driver.findElements(By.xpath('//h4[text()="Add to List"]'));
        const addToListPopupLength = await addToListPopElement.length;
        if(addToListPopupLength === 0) {
            console.log("As 'Add List Popup Window' is not displayed so as it is closed after clicking on 'Close Icon',so test case has been passed");
        } else {
            await assert.fail("As 'Add List Popup Window' is displayed so as it is not closed even after clicking on 'Close Icon',so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listPopup_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 5: Verify creation of new list from Add to list window for User without manage list rights-----------

Then('{string} is not able to create lists when {string} without manage list rights',async function(user,adminUser){
    try {
        //checking 'User' without 'Manage List' rights
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Profile Permissions' tab
        const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        //will set focus on the 'Profile Permissions' tab
        await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
        await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
        //will click on the 'Profile Permissions' tab
        await profilePermissionsTab[0].click();
        await driver.sleep(1000);
        const editButton = await moduleElementsObj.findEditButton(driver);
        await editButton.click();
        await driver.sleep(2000);
        const manageListOption = await driver.findElement(By.id('418'));
        await driver.executeScript("arguments[0].scrollIntoView();",manageListOption);
        await moduleElementsObj.enableOrDisableToggleButtons(driver, ['418'], 'disable');
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','saveButtonField');
        await saveButton.click();
        await driver.sleep(3000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        const contactIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactIcon.click();
        await driver.sleep(2000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        await listElementsObj.findAddToListButton(driver);
        await listElementsObj.findListDropDownTextBox(driver);
        //check visibility of 'Create New List'
        const createNewList = await driver.findElements(By.xpath('//div[text()="Create New List"]'));
        const createNewListLength = await createNewList.length;
        if(createNewListLength === 0) {
            console.log("As 'Create New List' is not displayed after disabling manage list rights,so test case has been passed");
        } else {
            await assert.fail("As 'Create New List' is displayed even after disabling manage list rights,so test case has been aborted");
        }
        await listElementsObj.findAddToListCloseIcon(driver);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------------Case 6: Test removing a list from a contact from Contact's quick view screen---------------------

Then('removing a list from a contact from Contacts quick view screen',async function(){
    try {
        const lists = await driver.findElement(By.xpath('//div[6]/div/section-title//i')).getText();
        const listsText = await lists.replace(/[()]/g, '');
        const listsCountBeforeDeleting = await parseInt(listsText);
        console.log("Files Count Before Deleting: "+listsCountBeforeDeleting);
        await listElementsObj.findSideArrow(driver);
        await listElementsObj.findListRemoveIcon(driver);
        await listElementsObj.findListRemoveConfirmationButton(driver,'Yes');
        const listElements = await driver.findElement(By.xpath('//div[6]/div/section-title//i')).getText();
        const listText = await listElements.replace(/[()]/g, '');
        const listsCountAfterDeleting = await parseInt(listText);
        console.log("Files Count After Deleting: "+listsCountAfterDeleting);
        if((listsCountBeforeDeleting)-1 === listsCountAfterDeleting) {
            console.log("As list is deleted and count is decreased by (X-1),so test case has been passed");
        } else {
            await assert.fail("As list is not deleted and count is not decreased by (X-1),so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'list_NotRemoved.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 7: Test 'NO' option of confirm delete pop-up window for cancelling the operation of removing a list from a contact-----

Then('Test No option of confirm delete pop-up window for cancelling the operation of removing a list from a contact',async function(){
    try {
        await listElementsObj.findSideArrow(driver);
        await listElementsObj.findListRemoveIcon(driver);
        await listElementsObj.findListRemoveConfirmationButton(driver,'No');
        //check invisibility of 'Remove Confirm' popup window
        const removeConfirmPopElement = await driver.findElements(By.xpath('//sm-confirm-prompt//h4'));
        const removeConfirmPopupLength = await removeConfirmPopElement.length;
        if(removeConfirmPopupLength === 0) {
            console.log("As 'Remove Confirm Popup Window' is not displayed so as it is closed after clicking on 'Close Icon',so test case has been passed");
        } else {
            await assert.fail("As 'Remove Confirm Popup Window' is displayed so as it is not closed even after clicking on 'Close Icon',so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listRemoveIcon_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 8: Verify the contact name and list name on 'Confirm Delete' pop-up window---------------------

Then('verify contact name and list name on Confirm Delete pop-up window',async function(){
   try {
       //get 'List Name' that to be removed
       const listNameTobeRemoved = await driver.findElement(By.xpath('//sm-list-widget//b[@class="font-medium"]')).getText();
       console.log("List Name that is to be removed: "+listNameTobeRemoved);
       await listElementsObj.findListRemoveIcon(driver);
       //check 'List Name' on 'Confirm Popup' window
       const confirmPopupListName = await driver.findElement(By.xpath('//ngb-modal-window//sm-confirm-prompt//p')).getText();
       console.log("Confirm Popup List Name: "+confirmPopupListName);
       if(listNameTobeRemoved.includes(confirmPopupListName)){
           console.log("As Confirm popup list name contains list name to be removed,so test case has been passed");
       } else {
           await assert.fail("As Confirm popup list name does not contains list name to be removed,so test case has been aborted");
       }
       await listElementsObj.findListRemoveConfirmationButton(driver,'No');
       await driver.sleep(1000);
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'listRemoveIcon_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----------Case 9: Test page reload on confirm pop-up window at the time of removing a contact from a list------------

Then('Test page reload on confirm pop-up window at the time of removing a contact from a list',async function(){
   try {
       //get count of 'Lists' before reloading page
       const listCount = await driver.findElement(By.xpath('//div[6]/div/section-title//i')).getText();
       const listsText = await listCount.replace(/[()]/g, '');
       const listsCountBeforeDeleting = await parseInt(listsText);
       await listElementsObj.findListRemoveIcon(driver);
       await driver.navigate().refresh();
       await driver.sleep(5000);
       //get count of 'Lists' after reloading page
       const listsElements = await driver.findElement(By.xpath('//div[6]/div/section-title//i')).getText();
       const listText = await listsElements.replace(/[()]/g, '');
       const listsCountAfterDeleting = await parseInt(listText);
       if(listsCountBeforeDeleting === listsCountAfterDeleting) {
           console.log("As List is not removed after reloading page of confirm popup dialog,so test case has been passed");
       } else {
           await assert.fail("As List is removed even after reloading page of confirm popup dialog,so test case has been aborted");
       }
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'listRemoveIcon_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});
const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/08_listWidget/screenshots/';
const listWidgetElementsObj = require('../common/listWidgetElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');

let listCountLengthBeforeRemoving = 'no';

//-------Case 1: Test removing a list from a contact from contact's details page for user with and without manage list rights------

When('{string} is able to remove lists when {string} is with and without manage list rights',async function(user,adminUser){
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
        const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactModule.click();
        await driver.sleep(2000);
        const contact = await moduleElementsObj.clickOnContactName(driver,1);
        await contact.click();
        await driver.sleep(2500);
        //get count of 'Lists' before removing list
        const listCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        listCountLengthBeforeRemoving = await listCount.length;
        await listWidgetElementsObj.findListRemoveIcon(driver,1);
        await listWidgetElementsObj.findRemoveConfirmButton(driver,'Yes');
        await driver.sleep(2000);
        //get count of 'Lists' after removing list
        const listCountElement = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        const listCountLengthAfterRemoving = await listCountElement.length;
        console.log(listCountLengthBeforeRemoving);
        console.log(listCountLengthAfterRemoving);
        if((listCountLengthBeforeRemoving)-1 === listCountLengthAfterRemoving) {
            console.log("As list is removed after performing remove operation without 'Manage List' right,so test case has been passed");
        } else {
            await assert.fail("As list is not removed even after performing remove operation without 'Manage List' right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on contact listing page');
        await driver.sleep(3000);
        //checking 'User' with 'Manage List' rights
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Profile Permissions' tab
        const profilePermissionTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        //will set focus on the 'Profile Permissions' tab
        await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionTab[0]);
        await driver.wait(until.elementIsVisible(profilePermissionTab[0]));
        //will click on the 'Profile Permissions' tab
        await profilePermissionTab[0].click();
        await driver.sleep(1000);
        const editButtonElement = await moduleElementsObj.findEditButton(driver);
        await editButtonElement.click();
        await driver.sleep(2000);
        const manageListsOption = await driver.findElement(By.id('418'));
        await driver.executeScript("arguments[0].scrollIntoView();",manageListsOption);
        await moduleElementsObj.enableOrDisableToggleButtons(driver, ['418'], 'enable');
        const saveButtonElement = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','saveButtonField');
        await saveButtonElement.click();
        await driver.sleep(3000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        const contactIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactIcon.click();
        await driver.sleep(2000);
        const contactElement = await moduleElementsObj.clickOnContactName(driver,1);
        await contactElement.click();
        await driver.sleep(2500);
        //get count of 'Lists' before removing list
        const listsCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        const listCountLengthBeforeRemovingList = await listsCount.length;
        await listWidgetElementsObj.findListRemoveIcon(driver,1);
        await listWidgetElementsObj.findRemoveConfirmButton(driver,'Yes');
        await driver.sleep(2000);
        //get count of 'Lists' after removing list
        const listsCountElement = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        const listCountLengthAfterRemovingList = await listsCountElement.length;
        console.log(listCountLengthBeforeRemovingList);
        console.log(listCountLengthAfterRemovingList);
        if((listCountLengthBeforeRemovingList)-1 === listCountLengthAfterRemovingList) {
            console.log("As list is removed after performing remove operation with 'Manage List' right,so test case has been passed");
        } else {
            await assert.fail("As list is not removed even after performing remove operation with 'Manage List' right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on contact listing page');
        await driver.sleep(3000);
        const contactModuleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactModuleIcon.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'list_NotRemoved.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('removing a list from a contact from contacts details page',async function(){
    try {
        //get count of 'Lists' before removing list
        const listCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        listCountLengthBeforeRemoving = await listCount.length;
        console.log(listCountLengthBeforeRemoving);
        await listWidgetElementsObj.findListRemoveIcon(driver,1);
        await listWidgetElementsObj.findRemoveConfirmButton(driver,'No');
        const listsCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        const listCountAfterCancelling = await listsCount.length;
        if(listCountLengthBeforeRemoving === listCountAfterCancelling) {
            console.log("As list is not removed after terminating remove process,so test case has been passed");
        } else {
            await assert.fail("As list is not removed even after terminating remove process,so test case has been aborted");
        }
        await listWidgetElementsObj.findListRemoveIcon(driver,1);
        await listWidgetElementsObj.findRemoveConfirmButton(driver,'Yes');
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'list_NotRemoved.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('verify removed list should not be displayed',async function(){
    try {
        //get count of 'Lists' after removing list
        const listCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        const listCountLengthAfterRemoving = await listCount.length;
        if((listCountLengthBeforeRemoving)-1 === listCountLengthAfterRemoving) {
            console.log("As list is removed after performing remove operation,so test case has been passed");
        } else {
            await assert.fail("As list is not removed even after performing remove operation,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------Case 2: Test 'NO' option of confirm delete pop-up window for cancelling the operation of removing a list from a contact------

Then('"NO" option of confirm delete pop-up window for cancelling the operation of removing a list from a contact',async function(){
    try {
        //get count of 'Lists' before terminating remove process
        const listCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        listCountLengthBeforeRemoving = await listCount.length;
        await listWidgetElementsObj.findListRemoveIcon(driver,1);
        await listWidgetElementsObj.findRemoveConfirmButton(driver,'No');
        await driver.sleep(1000);
        //check 'Confirm Popup' dialog
        const confirmPopup = await driver.findElements(By.xpath('//sm-confirm-prompt//h4'));
        const confirmPopupLength = await confirmPopup.length;
        const listCountAfterCancelling = await listCount.length;
        if(confirmPopupLength === 0 && listCountLengthBeforeRemoving === listCountAfterCancelling) {
            console.log("As confirm popup dialog is closed and list is not removed after terminating remove process,so test case has been passed");
        } else {
            await assert.fail("As confirm popup dialog is not closed and list is not removed even after terminating remove process,so test case has been aborted");
        }
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'listRemoveCancellation_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------------Case 3: Verify the contact name and list name on 'Confirm Delete' pop-up window---------------------

Then('verify the contact name and list name on "Confirm Delete" pop-up window',async function(){
    try {
        //get 'List Name' that to be removed
        const listNameTobeRemoved = await driver.findElement(By.xpath('//section-body/div/div/div[1]/div/b')).getText();
        console.log("List Name that is to be removed: "+listNameTobeRemoved);
        await listWidgetElementsObj.findListRemoveIcon(driver,1);
        //check 'List Name' on 'Confirm Popup' window
        const confirmPopupListName = await driver.findElement(By.xpath('//ngb-modal-window//sm-confirm-prompt//p')).getText();
        console.log("Confirm Popup List Name: "+confirmPopupListName);
        if(listNameTobeRemoved.includes(confirmPopupListName)){
            console.log("As Confirm popup list name contains list name to be removed,so test case has been passed");
        } else {
            await assert.fail("As Confirm popup list name does not contains list name to be removed,so test case has been aborted");
        }
        await listWidgetElementsObj.findRemoveConfirmButton(driver,'No');
        await driver.sleep(1000);
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'listName_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-----------Case 4: Test page reload on confirm pop-up window at the time of removing a contact from a list------------

Then('page reload on confirm pop-up window at the time of removing a contact from a list',async function(){
    try {
        //get count of 'Lists' before reloading page
        const listCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        const listCountLengthBeforeReloading = await listCount.length;
        await listWidgetElementsObj.findListRemoveIcon(driver,1);
        await driver.navigate().refresh();
        await driver.sleep(5000);
        //get count of 'Lists' after reloading page
        const listsCount = await driver.findElements(By.xpath('//sm-list-widget//section-body/div/div/div'));
        const listCountLengthAfterReloading = await listsCount.length;
        if(listCountLengthBeforeReloading === listCountLengthAfterReloading) {
            console.log("As List is not removed after reloading page of confirm popup dialog,so test case has been passed");
        } else {
            await assert.fail("As List is removed even after reloading page of confirm popup dialog,so test case has been aborted");
        }
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'page_NotReloaded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
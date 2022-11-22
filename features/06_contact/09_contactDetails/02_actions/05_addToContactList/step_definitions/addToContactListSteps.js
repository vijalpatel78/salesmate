const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmateLoginPageObj = require('../../../../../00_common/actions/openSalesmatePage');
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/02_actions/05_addToContactList/screenshots/';
const addToContactListElementsObj = require('../common/addToContactListElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

let addToListPageListValue, addToListPageListValue01, addToListPageListValue02, listNameFieldData = 'no';
let listDescriptionFieldData = 'no', createListPageListName, createListPageListDescription, adminUserCreateNewListLength = 'no';

//---------------Case 1: Verify user can create/edit/delete a 'Contact Type' from contact detail screen-----------------

When('user is on contact details screen page > actions > add to list',async function(){
    try {
        const contact = await moduleElementsObj.clickOnContactName(driver, 1);
        await contact.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const addToListLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add to List');
        await addToListLink.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addToListTab_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the user can add contact to the list',async function(){
    try {
        const listDropdown = await addToContactListElementsObj.findListDropdown(driver);
        await listDropdown.click();
        await driver.sleep(500);
        const list = await addToContactListElementsObj.findList(driver,1);
        await list.click();
        await driver.sleep(500);
        //get 'List Value' of 'Add To List' page
        const addToListPageWholeListValue = await driver.findElement(By.xpath('//sm-select-box/sm-element//span[@role="combobox"]//li[1]')).getText();
        console.log("Add To List Page Whole List Value: "+addToListPageWholeListValue);
        const listValueRemovingLineBreaks = await addToListPageWholeListValue.replace(/\r?\n|\r/g, " ");
        console.log(listValueRemovingLineBreaks);
        addToListPageListValue = await listValueRemovingLineBreaks.replace("× ","");
        console.log("Add To List Page List Value: "+addToListPageListValue);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'list_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify added contact list details',async function(){
    try {
        //get 'Contact Name' of 'Contact Details Page'
        const contactDetailsPageContactName = await driver.findElement(By.xpath('//div[@class="flex-1 w-full"]/div[1]')).getText();
        console.log("Contact Details Page Contact Name: "+contactDetailsPageContactName);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Lists' tab
        const listsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Lists ');
        //will set focus on the 'Lists' tab
        await driver.executeScript("arguments[0].scrollIntoView();", listsTab[0]);
        await driver.wait(until.elementIsVisible(listsTab[0]));
        //will click on the 'Lists' tab
        await listsTab[0].click();
        await driver.sleep(1000);
        //get 'List Value' of 'List Page'
        const listPageListValue = await driver.findElement(By.xpath('(//div[@class="text-primary cursor-pointer"])[1]')).getText();
        console.log("List Page List Value: "+listPageListValue);
        const listElement = await addToContactListElementsObj.findListPageListElement(driver,1);
        await listElement.click();
        await driver.sleep(500);
        //get 'Added Contact Value' in List Page
        const listPageContactName = await driver.findElement(By.xpath('(//a[@class="entity-show-link text-ellipsis"])[1]')).getText();
        console.log("List Page Contact Name: "+listPageContactName);
        if(addToListPageListValue === listPageListValue && contactDetailsPageContactName === listPageContactName) {
            console.log("As add to list page list value and list page list value and contact details page contact name and list page contact name are equal,so test case has been passed");
        }else {
            await assert.fail("As add to list page list value and list page list value and contact details page contact name and list page contact name are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 2: Verify, the user can add contact to the multiple lists simultaneously-----------------------

Then('the user can add contact to the multiple lists simultaneously',async function(){
    try {
        const listDropdown = await addToContactListElementsObj.findListDropdown(driver);
        await listDropdown.click();
        await driver.sleep(500);
        const list = await addToContactListElementsObj.findList(driver,1);
        await list.click();
        await driver.sleep(500);
        const listDropdownElement = await addToContactListElementsObj.findListDropdown(driver);
        await listDropdownElement.click();
        await driver.sleep(500);
        //get 'List Values' of 'Add To List' Page
        addToListPageListValue01 = await driver.findElement(By.xpath('//ul[@role="tree"]/li[1]')).getText();
        console.log("Add To List Page List Value 01: "+addToListPageListValue01);
        addToListPageListValue02 = await driver.findElement(By.xpath('//ul[@role="tree"]/li[2]')).getText();
        console.log("Add To List Page List Value 02: "+addToListPageListValue02);
        await addToContactListElementsObj.findList(driver,2);
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify added contacts for multiple lists',async function(){
    try {
        //get 'Contact Name' of 'Contact Details Page'
        const contactDetailsPageContactName = await driver.findElement(By.xpath('//div[@class="flex-1 w-full"]/div[1]')).getText();
        console.log("Contact Details Page Contact Name: "+contactDetailsPageContactName);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Lists' tab
        const listsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Lists ');
        //will set focus on the 'Lists' tab
        await driver.executeScript("arguments[0].scrollIntoView();", listsTab[0]);
        await driver.wait(until.elementIsVisible(listsTab[0]));
        //will click on the 'Lists' tab
        await listsTab[0].click();
        await driver.sleep(1000);
        //get 'List Value' of 'List Page'
        const listPageListValue01 = await driver.findElement(By.xpath('(//div[@class="text-primary cursor-pointer"])[1]')).getText();
        console.log("List Page List Value 01: "+listPageListValue01);
        const listPageListValue02 = await driver.findElement(By.xpath('(//div[@class="text-primary cursor-pointer"])[2]')).getText();
        console.log("List Page List Value 02: "+listPageListValue02);
        const listElement = await addToContactListElementsObj.findListPageListElement(driver,1);
        await listElement.click();
        await driver.sleep(500);
        //get 'Added Contact Value' in List Value 01 Page
        const listValue01ContactName = await driver.findElement(By.xpath('(//a[@class="entity-show-link text-ellipsis"])[1]')).getText();
        console.log("List Value 01 Contact Name: "+listValue01ContactName);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Lists' tab
        const listTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Lists ');
        //will set focus on the 'Lists' tab
        await driver.executeScript("arguments[0].scrollIntoView();", listTab[0]);
        await driver.wait(until.elementIsVisible(listTab[0]));
        //will click on the 'Lists' tab
        await listTab[0].click();
        await driver.sleep(1000);
        const listPageListElement = await addToContactListElementsObj.findListPageListElement(driver,2);
        await listPageListElement.click();
        await driver.sleep(500);
        //get 'Added Contact Value' in List Value 02 Page
        const listValue02ContactName = await driver.findElement(By.xpath('(//a[@class="entity-show-link text-ellipsis"])[1]')).getText();
        console.log("List Value 02 Contact Name: "+listValue02ContactName);
        if(addToListPageListValue01 === listPageListValue01 && addToListPageListValue02 === listPageListValue02 && contactDetailsPageContactName === listValue01ContactName && contactDetailsPageContactName === listValue02ContactName) {
            console.log("As add to list page list values and list page list values and contact details page contact names and list page contact names are equal,so test case has been passed");
        }else {
            await assert.fail("As add to list page list values and list page list values and contact details page contact names and list page contact names are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 3: Verify new list creation at the time of selecting the lists from contacts page while adding contacts to a list----

Then('user can able to create new',async function(dataTable){
    try {
        const listDropdown = await addToContactListElementsObj.findListDropdown(driver);
        await listDropdown.click();
        await driver.sleep(500);
        const newListLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'div','Create New List');
        await newListLink.click();
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
                const listNameField = await formElementsObj.findElementById(driver,screenshotPath,'listName','List Name');
                await clearFieldDataObj.clearFieldData(listNameField);
                await listNameField.sendKeys(listNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'list description') {
                listDescriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required list description field is given or not
                if (listDescriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the list description field, the test case execution has been aborted');
                }

                //will find 'List Description' field and pass the new data
                const listDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'listDescription','List Description');
                await clearFieldDataObj.clearFieldData(listDescriptionField);
                await listDescriptionField.sendKeys(listDescriptionFieldData);
                await driver.sleep(500);
            }
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check newly added list details and check {string}',async function(expectedNotification){
    try {
        //get values of 'Newly Added List'
        createListPageListName = await driver.findElement(By.id('listName')).getAttribute('value');
        console.log("Create List Page List Name: "+createListPageListName);
        createListPageListDescription = await driver.findElement(By.id('listDescription')).getAttribute('value');
        console.log("Create List Page List Description: "+createListPageListDescription);
        const saveButtonElement = await formElementsObj.findElementById(driver,screenshotPath,'saveButton','Save Button');
        await saveButtonElement.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
     }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify newly created list details',async function(){
    try {
        //get 'Contact Name' of 'Contact Details Page'
        const contactDetailsPageContactName = await driver.findElement(By.xpath('//div[@class="flex-1 w-full"]/div[1]')).getText();
        console.log("Contact Details Page Contact Name: "+contactDetailsPageContactName);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Lists' tab
        const listsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Lists ');
        //will set focus on the 'Lists' tab
        await driver.executeScript("arguments[0].scrollIntoView();", listsTab[0]);
        await driver.wait(until.elementIsVisible(listsTab[0]));
        //will click on the 'Lists' tab
        await listsTab[0].click();
        await driver.sleep(1000);
        //get 'List Name and List Description' of 'List Page'
        const listPageListName = await driver.findElement(By.xpath('(//div[@class="text-primary cursor-pointer"])[3]')).getText();
        console.log("Newly Added List Page List Value: "+listPageListName);
        const listPageListDescription = await driver.findElement(By.xpath('(//span[@class="secondary-text text-ellipsis list-desc text-xs"])[3]')).getText();
        console.log("Newly Added List Page List Description: "+listPageListDescription);
        const listElement = await addToContactListElementsObj.findListPageListElement(driver,3);
        await listElement.click();
        await driver.sleep(500);
        //get 'Added Contact Value' in List 03 Page
        const list03PageContactName = await driver.findElement(By.xpath('(//a[@class="entity-show-link text-ellipsis"])[1]')).getText();
        console.log("List 03 Page Contact Name: "+list03PageContactName);
        if(createListPageListName === listPageListName && createListPageListDescription === listPageListDescription && contactDetailsPageContactName === list03PageContactName) {
            console.log("As create list page list name and list description and list page list name and list description and contact details page contact name and newly added list page contact name are equal,so test case has been passed");
        }else {
            await assert.fail("As create list page list name and list description and list page list name and list description and contact details page contact name and newly added list page contact name are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 4: Verify, create new list link should not be displayed for the standard profile user---------------

Then('verify admin user list link length',async function(){
    try {
        const listDropdown = await addToContactListElementsObj.findListDropdown(driver);
        await listDropdown.click();
        await driver.sleep(500);
        //get 'Admin User Create New List Link'
        const adminUserCreateNewListLink = await driver.findElements(By.xpath('//div[text()="Create New List"]'));
        adminUserCreateNewListLength = await adminUserCreateNewListLink.length;
        console.log(adminUserCreateNewListLength);
        await driver.findElement(By.xpath('//add-contact-to-list/div/button[@type="button"]')).click();
        await driver.sleep(1500);
        const contactModule = await moduleElementsObj.findContactModule(driver);
        await contactModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const addToListLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add to List');
        await addToListLink.click();
        const listDropdownElement = await addToContactListElementsObj.findListDropdown(driver);
        await listDropdownElement.click();
        await driver.sleep(500);
        await driver.findElement(By.xpath('//add-contact-to-list/div/button[@type="button"]')).click();
        await driver.sleep(1500);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('create new list link should not be displayed and log in through {string}',async function(adminUser){
   try {
       await driver.manage().setTimeouts({implicit:2000});
       //get 'Standard User Create New List Link'
       const standardUserCreateNewListLink = await driver.findElements(By.xpath('//div[text()="Create New List"]'));
       const standardUserCreateNewListLength = await standardUserCreateNewListLink.length;
       console.log(standardUserCreateNewListLength);
       if(adminUserCreateNewListLength > 0 && standardUserCreateNewListLength === 0) {
           console.log("As for admin user create new list link displayed and for standard user create new list link is not displayed,so test case has been passed");
       }else {
           await assert.fail("As for admin user create new list link is not displayed and for standard user create new list link is displayed,so test case has been aborted");
       }
       await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
       await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on contact listing page');
       await driver.sleep(2000);
   } catch(err) {
       await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
       await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on contact listing page');
       await driver.sleep(3000);
       await assert.fail(err);
   }
});
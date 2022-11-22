const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/01_contactDetailWidgets/02_contactType/screenshots/';
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');
const contactTypeElementsObj = require('../common/contactTypeElements');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');

let contactTypeBeforeNavigation = 'no', contactDetailsPageContactType = 'no';

//---------------Case 1: Verify user can create/edit/delete a 'Contact Type' from contact detail screen-----------------

When('user is on contact details screen page',async function(){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const contactType = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactType.click();
        await driver.sleep(1500);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailsScreen_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('user can create,edit,delete a "Contact Type" of {string} from contact detail screen',async function(contactTypeName){
    try {
        const createNewType = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Create New Type');
        await createNewType.click();
        await driver.sleep(1000);
        const nameField = await formElementsObj.findElementById(driver,screenshotPath,'type');
        await nameField.sendKeys(contactTypeName);
        const contactTypeColor = await contactTypeElementsObj.findContactTypeColor(driver,1);
        await contactTypeColor.click();
        await driver.sleep(1000);
        //get values before adding 'New Contact Type'
        contactTypeBeforeNavigation = await driver.findElement(By.id('type')).getAttribute('value');
        const createButton = await formElementsObj.findElementById(driver,screenshotPath,'save','createButton');
        await createButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactType_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check notification message as {string}',async function(expectedNotification){
    try {
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'notificationElement_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check details of contact type after navigation',async function(){
    try {
        const contactType = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactType.click();
        await driver.sleep(1000);
        const contactTypeEditButton = await contactTypeElementsObj.findContactTypeEditButton(driver,7);
        await contactTypeEditButton.click();
        await driver.sleep(1000);
        //get values after adding 'New Contact Type'
        const contactTypeAfterNavigation = await driver.findElement(By.id('type')).getAttribute('value');
        if(contactTypeBeforeNavigation === contactTypeAfterNavigation) {
            console.log("As contact type before and after navigation are equal,so test case has been passed");
        } else {
            await assert.fail("As contact type before and after navigation are not equal,so test case has been aborted");
        }
        const cancelButton = await contactTypeElementsObj.findCancelButton(driver);
        await cancelButton.click();
        await driver.sleep(1500);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('edit contact type as {string} and verify updated details',async function(contactTypeName){
    try {
        const contactType = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactType.click();
        await driver.sleep(1000);
        const contactTypeEditButton = await contactTypeElementsObj.findContactTypeEditButton(driver,7);
        await contactTypeEditButton.click();
        await driver.sleep(1000);
        const nameField =  await formElementsObj.findElementById(driver,screenshotPath,'type');
        await clearFieldDataObj.clearFieldData(nameField);
        await nameField.sendKeys(contactTypeName);
        const contactTypeColor = await contactTypeElementsObj.findContactTypeColor(driver,1);
        await contactTypeColor.click();
        await driver.sleep(1000);
        //get values before adding 'New Contact Type'
        contactTypeBeforeNavigation = await driver.findElement(By.id('type')).getAttribute('value');
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'save');
        await saveButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeUpdation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('cancel updating contact type and verify default page url',async function(){
    try {
        const contactType = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactType.click();
        await driver.sleep(1000);
        const contactTypeEditButton = await contactTypeElementsObj.findContactTypeEditButton(driver,7);
        await contactTypeEditButton.click();
        await driver.sleep(1000);
        const cancelButton = await contactTypeElementsObj.findCancelButton(driver);
        await cancelButton.click();
        await driver.sleep(2000);
        const currentPageUrl = await driver.getCurrentUrl();
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As actual and expected urls are matched,so test case has been passed");
        }else {
            await assert.fail("As actual and expected urls are unmatched,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeCancellation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('delete updated contact type',async function(){
    try {
        const contactType = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactType.click();
        await driver.sleep(1000);
        const contactTypeEditButton = await contactTypeElementsObj.findContactTypeEditButton(driver,7);
        await contactTypeEditButton.click();
        await driver.sleep(1000);
        const contactTypeDeleteButton = await contactTypeElementsObj.findContactTypeDeleteButton(driver);
        await contactTypeDeleteButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeDeletion_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check notification message {string}',async function(expectedNotification){
    try {
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'notificationElement_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify non-existence of deleted contact type',async function(){
    try {
        const currentPageUrl = await driver.getCurrentUrl();
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As actual and expected urls are matched,so test case has been passed");
        }else {
            await assert.fail("As actual and expected urls are unmatched,so test case has been aborted");
        }
        const contactType = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactType.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit:2000});
        //check invisibility of deleted contact
        const deletedContactTypeName = await driver.findElements(By.xpath('//contact-type/div[1]//div//ul/li[7]'));
        const deletedContactTypeNameLength = await deletedContactTypeName.length;
        if(deletedContactTypeNameLength === 0) {
            console.log("As deleted contact type name is invisible,so test case has been passed");
        } else {
            await assert.fail("As deleted contact type name is visible,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeDeletion_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 2: Verify the user can not edit change contact type from preview screen-------------------------

When('it displays contact type dropdown',async function(){
    try {
        //check 'Contact Type' Dropdown
        const contactType = await driver.findElements(By.xpath('//contact-type/div[1]/popper-content/div[@role="popper"]//ul/li'));
        const contactTypeLength = await contactType.length;
        console.log("Contact Type Length: "+contactTypeLength);
        if(contactTypeLength > 0){
            console.log("As contact type dropdown is displayed,so test case has been passed");
        } else {
            await assert.fail("As contact type dropdown is displayed,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await moduleIcon.click();
        await driver.sleep(1500);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeDropdown_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('user can not edit contact type dropdown preview page',async function(){
    try {
        //check 'Contact Type' beside contact name
        const previewPageContactTypeName = await driver.findElement(By.xpath('//contact-type-formatted//span[@class="contact-type grey"]')).getText();
        console.log("Preview Page Contact Type Name: "+previewPageContactTypeName);
        //check "Contact Type' is not clickable
        const previewPageContactTypeNameClickable = await driver.findElement(By.xpath('//contact-type-formatted//span[@class="contact-type grey"]')).click();
        console.log("Preview Page Contact Type Name: "+previewPageContactTypeNameClickable);
        //check 'Contact Type' Dropdown should not be displayed
        const contactType = await driver.findElements(By.xpath('//contact-type/div[1]/popper-content/div[@role="popper"]//ul/li'));
        const contactTypeLength = await contactType.length;
        console.log("Contact Type Length: "+contactTypeLength);
        if(previewPageContactTypeNameClickable === null && contactTypeLength === 0){
            console.log("As element is not clickable and contact type dropdown is not opened to edit,so test case has been passed");
        } else {
            await assert.fail("As element is clickable and contact type dropdown is opened to edit,so test case has been aborted");
        }
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeUpdatePreviewPage_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------Case 3: Verify the user can not create the duplicate contact type------------------------------

Then('user can not update a duplicate contact type as {string}',async function(duplicateContactType){
    try {
        const cancelButton = await contactTypeElementsObj.findCancelButton(driver);
        await cancelButton.click();
        await driver.sleep(1000);
        const contactType = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactType.click();
        await driver.sleep(1000);
        const contactTypeEditButton = await contactTypeElementsObj.findContactTypeEditButton(driver,1);
        await contactTypeEditButton.click();
        await driver.sleep(1000);
        const nameField = await formElementsObj.findElementById(driver,screenshotPath,'type');
        await clearFieldDataObj.clearFieldData(nameField);
        await nameField.sendKeys(duplicateContactType);
        const contactTypeColor = await contactTypeElementsObj.findContactTypeColor(driver,1);
        await contactTypeColor.click();
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'save');
        await saveButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeUpdation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 4: Verify name of contact type reflected in all places after update of contact type----------------

When('name of contact type as {string} reflected in all places after update of contact type and check {string}',async function(contactType,expectedNotification){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const contactTypeElement = await contactTypeElementsObj.findContactTypeElement(driver);
        await contactTypeElement.click();
        await driver.sleep(1000);
        const contactTypeEditButton = await contactTypeElementsObj.findContactTypeEditButton(driver,1);
        await contactTypeEditButton.click();
        await driver.sleep(1000);
        const nameField = await formElementsObj.findElementById(driver,screenshotPath,'type');
        await clearFieldDataObj.clearFieldData(nameField);
        await nameField.sendKeys(contactType);
        const contactTypeColor = await contactTypeElementsObj.findContactTypeColor(driver,1);
        await contactTypeColor.click();
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'save');
        await saveButton.click();
        await driver.sleep(1500);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
        //get 'Contact Type' in contact details page
        contactDetailsPageContactType = await driver.findElement(By.xpath('//span[@class="contact-type grey"]')).getText();
        console.log("Contact Details Page Contact Type: "+contactDetailsPageContactType);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTypeUpdation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify updated contact type details',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2000);
        //get 'Contact Type' in edit page
        const editPageContactType = await driver.findElement(By.xpath('//span[@class="contact-type grey"]')).getText();
        console.log("Edit Page Contact Type: "+editPageContactType);
        if(contactDetailsPageContactType === editPageContactType){
            console.log("As contact type of contact details page and edit page are updated and equal,so test case has been passed");
        }else {
            await assert.fail("As contact type of contact details page and edit page are not updated and not equal,so test case has been aborted");
        }
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
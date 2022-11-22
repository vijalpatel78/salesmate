const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const screenshotPath = './features/06_contact/07_contactQuickViewActions/01_addFile/screenshots/';
const path = require('path');

let uploadedFileName;

//-------------------------------Case 1: Verify, the user is able to add a file-----------------------------------------

When('user is on contact details page > file tab',async function(){
    try {
        const contactName = await moduleElementsObj.findContactName(driver,'Test Contact');
        await contactName.click();
        await driver.sleep(3000);
        const tab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','File');
        await tab.click();
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'file_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is able to add a file {string} and verify {string}',async function(fileName,expectedNotification) {
    try {
        const filepath = await path.resolve(__dirname, '../testdata/' + fileName);
        //upload provided file
        const uploadFileElement = await formElementsObj.findUploadFileElement(driver);
        await uploadFileElement.sendKeys(filepath);
        await driver.sleep(3000);
        //get Uploaded 'File Name' and 'File Size'
        uploadedFileName = await driver.findElement(By.xpath('//span[@class="name"]')).getText();
        console.log("Uploaded File Name: " + uploadedFileName);
        const uploadedFileSize = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[1]//span[@class="size"]')).getText();
        console.log("Uploaded File Size: " + uploadedFileSize);
        //click on 'Attach' button
        const attachButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Attach ');
        await attachButton.click();
        await driver.sleep(3000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'file_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check updated files',async function(){
    try {
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Files');
        await timelineTab.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileAdded.png');
        //check uploaded 'File name' and 'File size'
        const addedFileName = await driver.findElement(By.xpath('//a[@class="text-ellipsis file-name"]')).getText();
        const addedFileNameNote = await addedFileName.toLowerCase();
        console.log("Added File Name Note: "+addedFileNameNote);
        const addFileSizeNote = await driver.findElement(By.xpath('//span[@class="file-size"]')).getText();
        console.log("Added File Size Note: "+addFileSizeNote);
        if (uploadedFileName === addedFileNameNote) {
            console.log("As uploaded file name and file size of add file note and size note of notes tab are equal,so test case has been passed");
        } else {
            await assert.fail("As uploaded file name and file size of add file note and size note of notes tab are not equal,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
})

//------------------------------Case 2: Verify, the user is able to add multiple files----------------------------------

When('user is able to add multiple files i.e; {string},{string}',async function(file01Name,file02Name){
    try {
        const filepath = await path.resolve(__dirname, '../testdata/'+file01Name);
        //upload provided file01
        const uploadFileElement = await formElementsObj.findUploadFileElement(driver);
        await uploadFileElement.sendKeys(filepath);
        await driver.sleep(2000);
        //upload provided file02
        const uploadFile02Element = await formElementsObj.findUploadFileElement(driver);
        await uploadFile02Element.sendKeys(await path.resolve(__dirname, '../testdata/'+file02Name));
        await driver.sleep(2000);
        //get Uploaded 'File 01 Name' and 'File 01 Size'
        const uploadedFile01Name = await driver.findElement(By.xpath('(//span[@class="name"])[1]')).getText();
        console.log("Uploaded File 01 Name: "+uploadedFile01Name);
        const uploadedFile01Size = await driver.findElement(By.xpath('(//span[@class="size"])[1]')).getText();
        console.log("Uploaded File 01 Size: "+uploadedFile01Size);
        //get Uploaded 'File 02 Name' and 'File 02 Size'
        const uploadedFile02Name = await driver.findElement(By.xpath('(//span[@class="name"])[2]')).getText();
        console.log("Uploaded File 02 Name: "+uploadedFile02Name);
        const uploadedFile02Size = await driver.findElement(By.xpath('(//span[@class="size"])[2]')).getText();
        console.log("Uploaded File 02 Size: "+uploadedFile02Size);
        //click on 'Attach' button
        const attachButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Attach ');
        await attachButton.click();
        await driver.sleep(5000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Files');
        await timelineTab.click();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'filesAddedNotes.png');
        //check added 'File name' and 'File size'
        const addedFileName01 = await driver.findElement(By.xpath('(//a[@class="text-ellipsis file-name"])[2]')).getText();
        const addedFileNameNote01 = await addedFileName01.toLowerCase();
        console.log("Added File 01 Name Note: "+addedFileNameNote01);
        const addFileSizeNote01 = await driver.findElement(By.xpath('(//span[@class="file-size"])[2]')).getText();
        console.log("Added File Size 01 Note: "+addFileSizeNote01);
        const addedFileName02 = await driver.findElement(By.xpath('(//a[@class="text-ellipsis file-name"])[1]')).getText();
        const addedFileNameNote02 = await addedFileName02.toLowerCase();
        console.log("Added File 02 Name Note: "+addedFileNameNote02);
        const addFileSizeNote02 = await driver.findElement(By.xpath('(//span[@class="file-size"])[1]')).getText();
        console.log("Added File Size 02 Note: "+addFileSizeNote02);
        if (uploadedFile01Name === addedFileNameNote01 && uploadedFile02Name === addedFileNameNote02) {
            console.log("As multiple files are added at once and uploaded file name and file size of add file note and size note of notes tab are equal,so test case has been passed");
        } else {
            await assert.fail("As multiple files are not added at once and uploaded file name and file size of add file note and size note of notes tab are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------Case 3: Verify, the user is able to delete multiple files---------------------------------

When('user is able to delete files {string} and verify {string}',async function(fileName,expectedNotification){
    try {
        const contactName = await moduleElementsObj.findContactName(driver,'Test Contact');
        await contactName.click();
        await driver.sleep(3000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Files');
        await timelineTab.click();
        await driver.sleep(3000);
        //click on 'Delete' icon
        const fileAttached = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','File Attached');
        await fileAttached.click();
        const deleteIcon = await driver.findElement(By.xpath(`(//button/i[@class='icon-trash'])[1]`));
        await deleteIcon.click();
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 4: Verify, the warning message should be displayed when any file is not uploaded------------------

When('warning message {string} should be displayed when no file is not uploaded',async function(expectedNotification){
    try {
        //click on 'Attach' button
        const attachButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Attach ');
        await attachButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        try {
            strictEqual(actualNotification, expectedNotification);
            await driver.sleep(3000);
        }catch(err) {
            await assert.fail(err);
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
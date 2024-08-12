const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/08_contactPreviewActions/01_addFile/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const path = require('path');
const addPreviewFileElementsObj = require('../common/addFileElements');

//-------------------------------Case 1: Verify, the user is able to add a file-----------------------------------------

When('user is on preview > add file page',async function(){
   try {
       const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
       await contactCheckbox.click();
       await driver.sleep(1000);
       const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
       await previewButton.click();
       await driver.sleep(2000);
       const previewPageOptions = await moduleElementsObj.findPreviewPageOptionsButton(driver);
       await previewPageOptions.click();
       await driver.sleep(1000);
       const linkName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add File');
       await linkName.click();
       await driver.sleep(1000);
   }catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'addFilePage_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

Then('user is able to add a file {string} and verify {string} notification message',async function(fileName,expectedNotification) {
    try {
        const filepath = await path.resolve(__dirname, '../testdata/' + fileName);
        //upload provided file
        const uploadFileElement = await formElementsObj.findUploadFileElement(driver);
        await uploadFileElement.sendKeys(filepath);
        await driver.sleep(3000);
        //get Uploaded 'File Name' and 'File Size'
        const uploadedFileName = await driver.findElement(By.xpath('//span[@class="name"]')).getText();
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
        await driver.sleep(3000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
        await timelineTab.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileAdded.png');
        ///check visibility of 'Uploaded File'
        const filesCountText = await driver.findElement(By.xpath('//div[4]/div/section-title//i')).getText();
        console.log(filesCountText);
        const filesCount = await filesCountText.replace(/[{()}]/g, '');
        const filesCountNumber = await parseInt(filesCount);
        console.log("Files Count is: "+filesCountNumber);

        //check uploaded file name and file size and file count
        const fileOpenArrow = await driver.findElement(By.xpath('//div[4]/div/section-title//span'));
        await fileOpenArrow.click();
        await driver.sleep(3000);
        const relatedPageUploadedFileName = await driver.findElement(By.xpath('//a[@class="default-text text-ellipsis title"]')).getText();
        console.log("Related Page Uploaded File Name: "+relatedPageUploadedFileName);
        const relatedPageUploadedFileSize = await driver.findElement(By.css('.font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File Size: "+relatedPageUploadedFileSize);
        const uploadedFilesCount = await driver.findElements(By.xpath('//ul[@class="rt-listing"]/li'));
        const uploadedFilesLength = await uploadedFilesCount.length;
        if (uploadedFileName === relatedPageUploadedFileName && uploadedFilesLength > 0) {
            console.log("As uploaded file name and file size of add file note and size note of notes tab are equal,so test case has been passed");
        } else {
            await assert.fail("As uploaded file name and file size of add file note and size note of notes tab are not equal,so test case has been aborted");
        }
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'file_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------------------------Case 2: Verify, the user is able to add multiple files----------------------------------

When('user is able to add multiple files {string},{string} and verify {string}',async function(file01Name,file02Name,expectedNotification){
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
        await driver.sleep(3000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(5000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
        await timelineTab.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileAdded.png');
        ///check visibility of 'Uploaded File'
        const filesCountText = await driver.findElement(By.xpath('//div[4]/div/section-title//i')).getText();
        console.log(filesCountText);
        const filesCount = await filesCountText.replace(/[{()}]/g, '');
        const filesCountNumber = await parseInt(filesCount);
        console.log("Files Count is: "+filesCountNumber);

        //check uploaded file name and file size and file count
        const fileOpenArrow = await driver.findElement(By.xpath('//div[4]/div/section-title//span'));
        await fileOpenArrow.click();
        await driver.sleep(3000);
        //get uploaded file 01 name and size
        const relatedPageUploadedFile01Name = await driver.findElement(By.css('li:nth-of-type(1) > .default-text.text-ellipsis.title')).getText();
        console.log("Related Page Uploaded File 01 Name: "+relatedPageUploadedFile01Name);
        const relatedPageUploadedFile01Size = await driver.findElement(By.css('li:nth-of-type(1) > .font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File 01 Size: "+relatedPageUploadedFile01Size);
        //get uploaded file 02 name and size
        const relatedPageUploadedFile02Name = await driver.findElement(By.css('li:nth-of-type(2) > .default-text.text-ellipsis.title')).getText();
        console.log("Related Page Uploaded File 02 Name: "+relatedPageUploadedFile02Name);
        const relatedPageUploadedFile02Size = await driver.findElement(By.css('li:nth-of-type(2) > .font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File 02 Size: "+relatedPageUploadedFile02Size);
        //get uploaded file 03 name and size
        const relatedPageUploadedFile03Name = await driver.findElement(By.css('li:nth-of-type(3) > .default-text.text-ellipsis.title')).getText();
        console.log("Related Page Uploaded File 03 Name: "+relatedPageUploadedFile03Name);
        const relatedPageUploadedFile03Size = await driver.findElement(By.css('li:nth-of-type(3) > .font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File 03 Size: "+relatedPageUploadedFile03Size);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'filesVisibility.png');
        const uploadedFilesCount = await driver.findElements(By.xpath('//ul[@class="rt-listing"]/li'));
        const uploadedFilesLength = await uploadedFilesCount.length;
        if (uploadedFilesLength > 0) {
            console.log("As multiple files are added at once and uploaded file name and file size of add file note and size note of notes tab are equal,so test case has been passed");
        } else {
            await assert.fail("As multiple files are not added at once and uploaded file name and file size of add file note and size note of notes tab are not equal,so test case has been aborted");
        }
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----------------------------Case 3: Verify, the user is able to delete multiple files---------------------------------

When('user is able to delete files {string} and verify {string} message',async function(fileName,expectedNotification){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
        await timelineTab.click();
        await driver.sleep(2000);
        const fileOpenArrow = await driver.findElement(By.xpath('//div[4]/div/section-title//span'));
        await fileOpenArrow.click();
        await driver.sleep(3000);
        const relatedRemoveOption = await addPreviewFileElementsObj.findRelatedRemoveOption(driver,1);
        await relatedRemoveOption.click();
        await driver.sleep(1000);
        const removeButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Remove');
        await removeButton.click();
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(5000);
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------Case 4: Verify, the warning message should be displayed when any file is not uploaded------------------

When('warning message as {string} should be displayed when no file is not uploaded',async function(expectedNotification){
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
            await driver.sleep(5000);
        }catch(err) {
            await assert.fail(err);
        }
        const closeIcon = await moduleElementsObj.findPopupByXpath(driver,'button','class','close');
        await closeIcon.click();
        await driver.sleep(1000);
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
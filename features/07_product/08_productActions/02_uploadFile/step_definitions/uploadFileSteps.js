const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/08_productActions/02_uploadFile/screenshots/';
const path = require('path');
const addProductElementsObj = require('../../../02_addProduct/common/addProductElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const pageNavigationObj = require('../../../02_addProduct/common/actions');

//---------------------------------Case 1: Verify, the user is able to add a file---------------------------------------

When('user is able to add a file {string} and verify {string} message',async function(fileName,expectedNotification) {
    try {
        const productName = await addProductElementsObj.clickOnProductName(driver, 'Test');
        await productName.click();
        await driver.sleep(2000);
        const optionsButton = await moduleElementsObj.findOptionsButton(driver);
        await optionsButton.click();
        await driver.sleep(1500);
        const uploadFileOption = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add File');
        await uploadFileOption.click();
        await driver.sleep(1000);
        const filepath = await path.resolve(__dirname, '../testdata/' + fileName);
        //upload provided file
        const uploadFileElement = await formElementsObj.findUploadFileDiv(driver);
        await uploadFileElement.sendKeys(filepath);
        await driver.sleep(3000);
        //get Uploaded 'File Name' and 'File Size'
        const uploadedFileName = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[1]//span[@class="name"]')).getText();
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
        await driver.sleep(5000);
        const closeIconElement = await moduleElementsObj.findCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(2000);
        // page navigation and come back to product listing page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productNameElement = await addProductElementsObj.clickOnProductName(driver, 'Test');
        await productNameElement.click();
        await driver.sleep(2000);
        const relatedTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
        await relatedTab.click();
        await driver.sleep(2000);
        //check visibility of 'Uploaded File'
        const filesCountText = await driver.findElement(By.css('.col-md-12.col-sm-12.no-padder > .fb.h5.info-title-handler  i')).getText();
        console.log(filesCountText);
        const filesCount = await filesCountText.replace(/[\[\]']+/g, "");
        const filesCountNumber = await parseInt(filesCount);
        console.log("Files Count is: " + filesCountNumber);

        //check uploaded file name and file size and file count
        const fileOpenArrow = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'h4','Files ');
        await fileOpenArrow.click();
        await driver.sleep(4000);
        const relatedPageUploadedFileName = await driver.findElement(By.xpath('//a[@class="default-text text-ellipsis title"]')).getText();
        console.log("Related Page Uploaded File Name: " + relatedPageUploadedFileName);
        const relatedPageUploadedFileSize = await driver.findElement(By.css('.font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File Size: " + relatedPageUploadedFileSize);
        const uploadedFilesCount = await driver.findElements(By.xpath('//ul[@class="rt-listing"]/li'));
        const uploadedFilesLength = await uploadedFilesCount.length;
        if (uploadedFileName === relatedPageUploadedFileName && uploadedFilesLength > 0) {
            console.log("As uploaded file name and file size of add file page and related tab are equal,so test case has been passed");
        } else {
            await assert.fail("As uploaded file name and file size of add file page and related tab are not equal,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    }  catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------Case 2: Verify, the user is able to add multiple files------------------------------------

When('user is able to add multiple files i.e; {string},{string} and verify {string} message',async function(file01Name,file02Name,expectedNotification) {
    try {
        const productName = await addProductElementsObj.clickOnProductName(driver, 'Test');
        await productName.click();
        await driver.sleep(2000);
        const optionsButton = await moduleElementsObj.findOptionsButton(driver);
        await optionsButton.click();
        await driver.sleep(1500);
        const uploadFileOption = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add File');
        await uploadFileOption.click();
        await driver.sleep(1000);
        const filepath = await path.resolve(__dirname, '../testdata/' + file01Name);
        //upload provided file01
        const uploadFileElement = await formElementsObj.findUploadFileDiv(driver);
        await uploadFileElement.sendKeys(filepath);
        await driver.sleep(2000);
        //upload provided file02
        const uploadFile02Element = await formElementsObj.findUploadFileDiv(driver);
        await uploadFile02Element.sendKeys(await path.resolve(__dirname, '../testdata/' + file02Name));
        await driver.sleep(3000);
        //get Uploaded 'File 01 Name' and 'File 01 Size'
        const uploadedFile01Name = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[1]//span[@class="name"]')).getText();
        console.log("Uploaded File 01 Name: " + uploadedFile01Name);
        const uploadedFile01Size = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[1]//span[@class="size"]')).getText();
        console.log("Uploaded File 01 Size: " + uploadedFile01Size);
        //get Uploaded 'File 02 Name' and 'File 02 Size'
        const uploadedFile02Name = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[2]//span[@class="name"]')).getText();
        console.log("Uploaded File 02 Name: " + uploadedFile02Name);
        const uploadedFile02Size = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[2]//span[@class="size"]')).getText();
        console.log("Uploaded File 02 Size: " + uploadedFile02Size);
        //click on 'Attach' button
        const attachButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Attach ');
        await attachButton.click();
        await driver.sleep(3000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        // page navigation and come back to product listing page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productNameElement = await addProductElementsObj.clickOnProductName(driver, 'Test');
        await productNameElement.click();
        await driver.sleep(2000);
        const relatedTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
        await relatedTab.click();
        await driver.sleep(2000);
        //check visibility of 'Uploaded File'
        const filesCountText = await driver.findElement(By.css('.col-md-12.col-sm-12.no-padder > .fb.h5.info-title-handler  i')).getText();
        console.log(filesCountText);
        const filesCount = await filesCountText.replace(/[\[\]']+/g, "");
        const filesCountNumber = await parseInt(filesCount);
        console.log("Files Count is: " + filesCountNumber);

        //check uploaded file name and file size and file count
        const fileOpenArrow = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'h4','Files ');
        await fileOpenArrow.click();
        await driver.sleep(4000);
        //get uploaded file 01 name and size
        const relatedPageUploadedFile01Name = await driver.findElement(By.css('li:nth-of-type(1) > .default-text.text-ellipsis.title')).getText();
        console.log("Related Page Uploaded File 01 Name: " + relatedPageUploadedFile01Name);
        const relatedPageUploadedFile01Size = await driver.findElement(By.css('li:nth-of-type(1) > .font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File 01 Size: " + relatedPageUploadedFile01Size);
        //get uploaded file 02 name and size
        const relatedPageUploadedFile02Name = await driver.findElement(By.css('li:nth-of-type(2) > .default-text.text-ellipsis.title')).getText();
        console.log("Related Page Uploaded File 02 Name: " + relatedPageUploadedFile02Name);
        const relatedPageUploadedFile02Size = await driver.findElement(By.css('li:nth-of-type(2) > .font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File 02 Size: " + relatedPageUploadedFile02Size);
        //get uploaded file 03 name and size
        const relatedPageUploadedFile03Name = await driver.findElement(By.css('li:nth-of-type(3) > .default-text.text-ellipsis.title')).getText();
        console.log("Related Page Uploaded File 03 Name: " + relatedPageUploadedFile03Name);
        const relatedPageUploadedFile03Size = await driver.findElement(By.css('li:nth-of-type(3) > .font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Related page Uploaded File 03 Size: " + relatedPageUploadedFile03Size);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'filesVisibility.png');
        const uploadedFilesCount = await driver.findElements(By.xpath('//ul[@class="rt-listing"]/li'));
        const uploadedFilesLength = await uploadedFilesCount.length;
        if (uploadedFilesLength > 0) {
            console.log("As multiple files are added and details are displayed under upload file page and related tab page,so test case has been passed");
        } else {
            await assert.fail("As multiple files are not added and details are not displayed under upload file page and related tab page,so test case has been aborted");
        }
        const closeIconElement = await moduleElementsObj.findCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 3: Verify, the warning message should be displayed when any file is not uploaded-----------------

When('warning message {string} should be displayed when any file is not uploaded',async function(expectedValidation) {
    try {
        const productName = await addProductElementsObj.clickOnProductName(driver, 'Test');
        await productName.click();
        await driver.sleep(2000);
        const optionsButton = await moduleElementsObj.findOptionsButton(driver);
        await optionsButton.click();
        await driver.sleep(1500);
        const uploadFileOption = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add File');
        await uploadFileOption.click();
        await driver.sleep(1000);
        //click on 'Attach' button
        const attachButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Attach ');
        await attachButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        try {
            strictEqual(actualNotification, expectedValidation);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'validationVisibility.png');
            console.log("As " + actualNotification + " message is displayed when at least even one file is not uploaded,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        await driver.sleep(5000);
        const popupCloseIcon = await moduleElementsObj.findPopupByXpath(driver,'button','class','close','Popup Close Icon');
        await popupCloseIcon.click();
        await driver.sleep(1000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
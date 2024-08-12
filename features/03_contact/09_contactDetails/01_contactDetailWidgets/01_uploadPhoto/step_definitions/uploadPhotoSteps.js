const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails//01_contactDetailWidgets/01_uploadPhoto/screenshots/';
const path = require('path');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const pageNavigationObj = require('../../../../01_moduleAccessibility/common/actions');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

When('user is on contact preview page',async function(){
    try {
        const contactName = await moduleElementsObj.findContactName(driver, 'Test Contact');
        await contactName.click();
        await driver.sleep(2500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactPreviewPage_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------------Case 1: Verify, the user is able to upload a photo of the contact--------------------------

When('the user is able to upload a photo {string}',async function(imageFileName) {
    try {
        const filepath = await path.resolve(__dirname, '../testdata/' + imageFileName);
        //upload provided image
        const uploadPhotoElement = await formElementsObj.findUploadFileElement(driver);
        await uploadPhotoElement.sendKeys(filepath);
        await driver.sleep(5000);
        //page navigation and come back to contact listing page
        await pageNavigationObj.comeBackToContactListingPage(driver, screenshotPath);
        await driver.sleep(1000);
        const contactNameElement = await moduleElementsObj.findContactName(driver, 'Test Contact');
        await contactNameElement.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Uploaded Image'
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'uploadedImageIconVisibility.png');
        const uploadedImageElement = await driver.findElements(By.xpath('//img[@ng-style]'));
        const uploadedImageLength = await uploadedImageElement.length;
        if (uploadedImageLength > 0) {
            console.log("As uploaded image element is found on contact quick view page,so test case has been passed");
        } else {
            await assert.fail("As uploaded image element is not found on contact quick view page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'photo_NotUploaded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 2: Verify, the user is not able to upload file other that image file-------------------------

When('the user is not able to upload file other than image file i.e; {string} and verify {string}',async function(invalidFileName,expectedValidation) {
    try {
        //get image 'src' value before uploading invalid format
        const imageSourceBeforeUploadingInvalidFormat = await driver.findElement(By.xpath('//img[@ng-style]')).getAttribute('src');
        console.log("Image source attribute value before uploading invalid file format:\n" + imageSourceBeforeUploadingInvalidFormat);
        const filepath = await path.resolve(__dirname, '../testdata/' + invalidFileName);
        //upload provided invalid image
        const uploadPhotoElement = await formElementsObj.findUploadFileElement(driver);
        await uploadPhotoElement.sendKeys(filepath);
        await driver.sleep(1000);
        const validationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(validationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        //get image 'src' value after uploading invalid format
        const imageSourceAfterUploadingInvalidFormat = await driver.findElement(By.xpath('//img[@ng-style]')).getAttribute('src');
        console.log("Image source attribute value after uploading invalid file format:\n" + imageSourceAfterUploadingInvalidFormat);
        if (imageSourceBeforeUploadingInvalidFormat === imageSourceAfterUploadingInvalidFormat) {
            console.log("As image with invalid file format is not supported and not uploaded and actual and expected validations are equal,so test case has been passed");
        } else {
            await assert.fail("As image with invalid file format is supported and uploaded even file with invalid format,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'nonImageFile_Uploaded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 3: Verify, the user is not able to upload image file more than 1mb size-----------------------

When('the user is not able to upload image file more than 1mb size i.e; {string} and verify {string} message',async function(invalidSizeFile,expectedValidation) {
    try {
        //get image 'src' value before uploading invalid size file
        const imageSourceBeforeUploadingInvalidSize = await driver.findElement(By.xpath('//img[@ng-style]')).getAttribute('src');
        console.log("Image source attribute value before uploading invalid size file:\n" + imageSourceBeforeUploadingInvalidSize);
        const filepath = await path.resolve(__dirname, '../testdata/' + invalidSizeFile);
        //upload provided invalid image
        const uploadPhotoElement = await formElementsObj.findUploadFileElement(driver);
        await uploadPhotoElement.sendKeys(filepath);
        await driver.sleep(1000);
        const validationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(validationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        //get image 'src' value after uploading invalid size file
        const imageSourceAfterUploadingInvalidSize = await driver.findElement(By.xpath('//img[@ng-style]')).getAttribute('src');
        console.log("Image source attribute value after uploading invalid size file:\n" + imageSourceAfterUploadingInvalidSize);
        if (imageSourceBeforeUploadingInvalidSize === imageSourceAfterUploadingInvalidSize) {
            console.log("As image with invalid size is not supported and not uploaded and actual and expected validations are equal,so test case has been passed");
        } else {
            await assert.fail("As image with invalid size is supported and uploaded even file with invalid size,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'invalidFileSize_Uploaded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
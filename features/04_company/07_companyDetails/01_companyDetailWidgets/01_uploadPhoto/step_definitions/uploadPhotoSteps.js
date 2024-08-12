const { When } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/01_companyDetailWidgets/01_uploadPhoto/screenshots/';
const path = require('path');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const pageNavigationObj = require('../../../../01_moduleAccessibility/common/actions');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

When('user is on company details page',async function(){
   try {
       const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
       await contactName.click();
       await driver.sleep(2500);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'companyPreviewPage_NotOpened.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//---------------------------Case 1: Verify, the user is able to upload a photo of the company--------------------------

When('the user is able to upload a photo {string} of company',async function(imageFileName) {
    try {
        const filepath = await path.resolve(__dirname, '../testdata/'+imageFileName);
        //upload provided image
        const uploadPhotoElement = await formElementsObj.findUploadFileElement(driver);
        await uploadPhotoElement.sendKeys(filepath);
        await driver.sleep(5000);
        //page navigation and come back to contact listing page
        await pageNavigationObj.comeBackToCompanyListingPage(driver, screenshotPath);
        await driver.sleep(1000);
        const companyNameElement = await moduleElementsObj.clickOnContactName(driver, 1);
        await companyNameElement.click();
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
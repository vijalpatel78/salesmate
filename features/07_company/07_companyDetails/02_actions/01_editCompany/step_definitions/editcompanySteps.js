const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/02_addCompany/screenshots/';
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

Then('check updated company details on company listing page',async function(){
    try {
        const companyModuleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await companyModuleIcon.click();
        await driver.sleep(2000);
        const listingPageCompanyName = await driver.findElement(By.xpath('(//a[@class="entity-show-link text-ellipsis"])[1]')).getText();
        console.log("Listing Page Company Name: "+listingPageCompanyName);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('verify validations {string} should be displayed for required fields',async function(expectedNameValidation){
    try {
        const companyNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','companyName');
        await clearFieldDataObj.clearFieldData(companyNameField);
        await driver.sleep(500);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','updateButton');
        await driver.executeScript("arguments[0].click();",updateButton);
        await driver.sleep(1000);
        try {
            const actualNameValidation = await driver.findElement(By.xpath('(//div[@class="error-message text-danger"])[1]')).getText();
            strictEqual(actualNameValidation,expectedNameValidation);
        } catch(err) {
            await assert.fail(err);
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify the timeline entry after the user update company',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        //click on 'Timeline' timeline
        const timeLineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Timeline');
        await timeLineTab.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'timeLineUpdatedFields.png');
        //print text of 'Timeline' 'Company Creation'
        const timeLineUpdatedCustomField = await driver.findElement(By.xpath('(//span[@class="font-medium"])[1]')).getText();
        console.log("Timeline Custom Field:" + timeLineUpdatedCustomField);
        const timeLineUpdatedPhone = await driver.findElement(By.xpath('(//span[@class="font-medium"])[2]')).getText();
        console.log("Timeline Phone:" + timeLineUpdatedPhone);
        const timeLineUpdatedEmployees = await driver.findElement(By.xpath('(//span[@class="font-medium"])[3]')).getText();
        console.log("Timeline Employees:" + timeLineUpdatedEmployees);
        const timeLineUpdatedName = await driver.findElement(By.xpath('(//span[@class="font-medium"])[4]')).getText();
        console.log("Timeline Company Name:" + timeLineUpdatedName);
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
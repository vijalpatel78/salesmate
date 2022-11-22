const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/11_associatedCompanyWidget/screenshots/';
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//------------------------------Case 1: As a User, Verify UI of 'Associated Company' widget--------------------------------

Then('verify the UI of "Associated Company" widget',async function(){
    try {
        const companyModule = await driver.findElement(By.xpath('//primarycompanyinfo//h4')).getText();
        console.log("Company Module: "+companyModule);
        const companyName = await driver.findElement(By.xpath('//primarycompanyinfo//a[1]')).getText();
        console.log("Company Name: "+companyName);
        const companyType = await driver.findElement(By.xpath('//primarycompanyinfo//contact-type-formatted//span//span')).getText();
        console.log("Company Type: "+companyType);
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedCompanyWidget_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 2: As a User can able to see name of the contact widget according to the given name of the company module--------------

When('user can able to see name of company widget according to given name of company module',async function() {
    try {
        const companyModuleVisibility = await driver.findElement(By.xpath('//primarycompanyinfo//h4')).isDisplayed();
        console.log("Is Company Module Displayed: "+companyModuleVisibility);
        const companyModule = await driver.findElement(By.xpath('//primarycompanyinfo//h4')).getText();
        console.log("Company Module Text: "+companyModule);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedContactsWidget_NotExpanded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 3: As a User, Verify user able to navigate to details view of Contact------------------------

When('user able to navigate to details view of Company',async function(){
    try{
        const companyIcon = await driver.findElement(By.xpath('//li[@id="mainLi"]/div//thumb'));
        await companyIcon.click();
        await driver.sleep(500);
        const detailView = await driver.findElement(By.xpath('//primarycompanyinfo//i[@class="icon-expand-4 m-l-xs m-r-xs"]'));
        await detailView.click();
        await driver.sleep(3000);
        //check 'Detail View Icon' redirects to 'Deal Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Detail View Icon' icon it redirects to 'Deal Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Detail View Icon' icon it does not redirects to 'Deal Details' screen page,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 4: Verify that Quick view should be open with company all details while user clicking to the company name--------------

When('quick view should be open with company all details while user clicking to the company name',async function(){
    try{
        const companyName = await driver.findElement(By.xpath('//primarycompanyinfo//a[1]'));
        await companyName.click();
        await driver.sleep(3500);
        const quickView = await driver.findElements(By.xpath('//quick-view-company//company-quick-view-header'));
        const quickViewLength = await quickView.length;
        if (quickViewLength > 0) {
            console.log("As on clicking on the company name it opened the quick view page,so test case has been passed");
        } else {
            await assert.fail("As on clicking on the company name it has not opened the quick view page,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'companyAssociation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 5: Verify that the Company widget should not be displayed when the primary company is not found--------------------

When('company widget should not be displayed when the primary company is not found',async function(){
    try {
        const clickOnDeal = await moduleElementsObj.clickOnDealName(driver,3);
        await clickOnDeal.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const companyModule = await driver.findElements(By.xpath('//primarycompanyinfo//h4'));
        const companyModuleLength = await companyModule.length;
        if (companyModuleLength === 0) {
            console.log("As company module is not displayed,so test case has been passed");
        } else {
            await assert.fail("As company module is displayed,so test case has been aborted");
        }
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associateCompaniesCount_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
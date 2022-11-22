const { When } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const editContactDetailElementsObj = require('../../../../../06_contact/09_contactDetails/04_editContactDetails/common/editContactDetailsElements');
const screenshotPath = './features/07_company/07_companyDetails/01_companyDetailWidgets/02_companyType/screenshots/';
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');
const contactTypeElementsObj = require('../../../../../06_contact/09_contactDetails/01_contactDetailWidgets/02_contactType/common/contactTypeElements');


When('user is on company details screen page > company type',async function(){
    try {
        const companyName = await moduleElementsObj.clickOnContactName(driver, 1);
        await companyName.click();
        await driver.sleep(2000);
        const companyType = await contactTypeElementsObj.findContactTypeElement(driver);
        await companyType.click();
        await driver.sleep(1500);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companyDetailsScreen_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is on company preview page',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companyDetailsScreen_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is on company details page > actions > edit company',async function(){
    try {
        const companyName = await moduleElementsObj.clickOnContactName(driver, 1);
        await companyName.click();
        await driver.sleep(2000);
        const actionsElement = await driver.findElement(By.className('default-text dropdown-toggle'));
        await actionsElement.click();
        await driver.sleep(1000);
        const editCompanyLink = await driver.findElement(By.xpath('//a[text()=" Edit Company"]'));
        await editCompanyLink.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editCompanyDetails_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is on company details page > actions > delete company',async function(){
    try {
        const companyName = await moduleElementsObj.clickOnContactName(driver, 1);
        await companyName.click();
        await driver.sleep(2000);
        const actionsElement = await driver.findElement(By.className('default-text dropdown-toggle'));
        await actionsElement.click();
        await driver.sleep(1000);
        const deleteCompanyLink = await driver.findElement(By.xpath('//a[text()=" Delete"]'));
        await deleteCompanyLink.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editCompanyDetails_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is on company details page > customize fields screen > manage fields screen',async function(){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(2000);
        const customizeFieldsIcon = await editContactDetailElementsObj.findCustomizeFieldsIcon(driver);
        await customizeFieldsIcon.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'manageFieldsPage_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
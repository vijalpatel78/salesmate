const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/data_administration/exportCompany/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findCompaniesExportModule(driver) {
    let companiesExportModule;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        companiesExportModule = await driver.findElement(By.xpath('//div[text()=" Companies "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companiesExportModule_NotFound.png');
        await assert.fail("As companies export module is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return companiesExportModule;
}exports.findCompaniesExportModule = findCompaniesExportModule;

async function findCompanyIcon(driver) {
    let companyIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        companyIcon = await driver.findElement(By.xpath('//span[@class="icon-ic_company"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'companyIcon_NotFound.png');
        await assert.fail("As company icon is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return companyIcon;
}exports.findCompanyIcon = findCompanyIcon;

async function findModuleTab(driver,moduleName) {
    let moduleTab;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        moduleTab = await driver.findElement(By.xpath(`//button[text()=" ${moduleName} "]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+moduleTab+'_NotFound.png');
        await assert.fail("As "+moduleName+" is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return moduleTab;
}exports.findModuleTab = findModuleTab;
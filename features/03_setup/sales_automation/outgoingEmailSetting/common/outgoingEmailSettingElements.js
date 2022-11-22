const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/sales_automation/outgoingEmailSetting/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findDomainField(driver) {
    let domainField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        domainField = await driver.findElement(By.id('domainName'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'domainField_NotFound.png');
        await assert.fail("As domain field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return domainField;
}exports.findDomainField = findDomainField;

async function findAddButton(driver) {
    let addButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addButton = await driver.findElement(By.id('addButton')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addButton_NotFound.png');
        await assert.fail("As add button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addButton;
}exports.findAddButton = findAddButton;

async function findUnverifiedButton(driver) {
    let unverifiedButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        unverifiedButton = await driver.findElement(By.xpath('//label[text()="Unverified"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'unverifiedButton_NotFound.png');
        await assert.fail("As unverified button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return unverifiedButton;
}exports.findUnverifiedButton = findUnverifiedButton;

async function findVerifyButton(driver) {
    let verifyButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        verifyButton = await driver.findElement(By.xpath("//span[text()=' Verify ']")).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'verifyButton_NotFound.png');
        await assert.fail("As verify button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return verifyButton;
}exports.findVerifyButton = findVerifyButton;

async function findDeleteButton(driver) {
    let deleteButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteButton = await driver.findElement(By.xpath("//span[text()=' Delete ']")).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteButton_NotFound.png');
        await assert.fail("As delete button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteButton;
}exports.findDeleteButton = findDeleteButton;
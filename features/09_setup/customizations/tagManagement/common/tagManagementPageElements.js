const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/customizations/tagManagement/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findAddNewTagButton(driver) {
    let addNewTagButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addNewTagButton = await driver.findElement(By.xpath('//button[text()=" Add Tag "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNewTagButton_NotFound.png');
        await assert.fail("As add new tag button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addNewTagButton;
}exports.findAddNewTagButton = findAddNewTagButton;

async function findTagNameField(driver) {
    let tagNameField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        tagNameField = await driver.findElement(By.id('tagInput'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'tagNameField_NotFound.png');
        await assert.fail("As tag name field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return tagNameField;
}exports.findTagNameField = findTagNameField;

async function findAddOrUpdateButton(driver) {
    let addButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addButton = await driver.findElement(By.id('btnSubmit')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addButton_NotFound.png');
        await assert.fail("As add button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addButton;
}exports.findAddOrUpdateButton = findAddOrUpdateButton;

async function findEditButton(driver,tagName,actionIndex) {
    let editButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editButton = await driver.findElement(By.xpath(`//span[text()="${tagName}"]/preceding::i[${actionIndex}]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editButton;
}exports.findEditButton = findEditButton;

async function findCancelIcon(driver) {
    let cancelIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelIcon = await driver.findElement(By.xpath('//button[@class="close"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelIcon;
}exports.findCancelIcon = findCancelIcon;

async function findProductAppInstallationButton(driver) {
    const productInstallationButton = await driver.findElement(By.xpath("//h4[text()='Products ']/following-sibling::a[text()='Install ']"));
    await driver.executeScript("arguments[0].scrollIntoView();",productInstallationButton);
    await productInstallationButton.click();
}exports.findProductAppInstallationButton = findProductAppInstallationButton;

async function configureProductApp(driver) {
    const configureProductAppLink = await driver.findElement(By.xpath("//a[text()='Products']"));
    await driver.executeScript("arguments[0].scrollIntoView();",configureProductAppLink);
    await driver.wait(until.elementIsVisible(configureProductAppLink));
    await configureProductAppLink.click();
}exports.configureProductApp = configureProductApp;

async function findProductAppRemoveButton(driver) {
    let productAppRemoveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        productAppRemoveButton = await driver.findElement(By.id('btnRemove')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'removeButton_NotFound.png');
        await assert.fail("As 05_product app remove button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return productAppRemoveButton;
}exports.findProductAppRemoveButton = findProductAppRemoveButton;

async function findModulesEditButton(driver,moduleName) {
    let modulesEditButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        modulesEditButton = await driver.findElement(By.xpath(`//div[contains(text(),"${moduleName}")]/descendant::button[1]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'modulesEditButton_NotFound.png');
        await assert.fail("As modules edit button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return modulesEditButton;
}exports.findModulesEditButton = findModulesEditButton;

async function findModulesCancelButton(driver) {
    let modulesCancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        modulesCancelButton = await driver.findElement(By.xpath('//a[text()=" Cancel "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'modulesCancelButton_NotFound.png');
        await assert.fail("As modules cancel button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return modulesCancelButton;
}exports.findModulesCancelButton = findModulesCancelButton;

async function findModuleLink(driver,moduleName) {
    let moduleLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        moduleLink = await driver.findElement(By.xpath(`//div[@col-id='${moduleName}']//span/a`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'moduleLink_NotFound.png');
        await assert.fail("As module link button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return moduleLink;
}exports.findModuleLink = findModuleLink;

async function findDeleteTagLink(driver,tagName,actionIndex) {
    let deleteTagLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteTagLink = await driver.findElement(By.xpath(`//span[text()="${tagName}"]/preceding::i[${actionIndex}]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteTagLink_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteTagLink;
}exports.findDeleteTagLink = findDeleteTagLink;


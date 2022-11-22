const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/04_filesTab/screenshots/';
const elementSearchTimeout = require('../../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findSideArrow(driver) {
    let sideArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sideArrow = await driver.findElement(By.xpath('//div[4]/div/section-title//span')).click();
        await driver.sleep(5000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileSideArrow_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sideArrow;
}exports.findSideArrow = findSideArrow;

async function findGoogleDriveInstallationButton(driver) {
    const googleDriveInstallationButton = await driver.findElement(By.xpath("//h4[text()='Google Drive ']/following-sibling::a[text()='Install ']"));
    await driver.executeScript("arguments[0].scrollIntoView();",googleDriveInstallationButton);
    await driver.wait(until.elementIsVisible(googleDriveInstallationButton));
    await googleDriveInstallationButton.click();
    await driver.sleep(1000);
}exports.findGoogleDriveInstallationButton = findGoogleDriveInstallationButton;

async function findAttachFileButton(driver) {
    let attachFileButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        attachFileButton = await driver.findElement(By.xpath('//button[text()="Attach File "]')).click();
        await driver.sleep(3000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'attachFileButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return attachFileButton;
}exports.findAttachFileButton = findAttachFileButton;

async function configureGoogleDriveApp(driver) {
    const configureProductAppLink = await driver.findElement(By.xpath("//a[text()='Google Drive']"));
    await driver.executeScript("arguments[0].scrollIntoView();",configureProductAppLink);
    await driver.wait(until.elementIsVisible(configureProductAppLink));
    await configureProductAppLink.click();
    await driver.sleep(2000);
}exports.configureGoogleDriveApp = configureGoogleDriveApp;

async function findGoogleDriveRemoveButton(driver) {
    let googleDriveRemoveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        googleDriveRemoveButton = await driver.findElement(By.id('btnRemove')).click();
        await driver.sleep(3000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'googleDriveRemoveButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return googleDriveRemoveButton;
}exports.findGoogleDriveRemoveButton = findGoogleDriveRemoveButton;

async function findAttachFileCloseIcon(driver) {
    let attachFileCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        attachFileCloseIcon = await driver.findElement(By.xpath('//ngb-modal-window[2]//button[@class="close"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'attachFileCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return attachFileCloseIcon;
}exports.findAttachFileCloseIcon = findAttachFileCloseIcon;

async function findAddFileIcon(driver) {
    let addFileIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addFileIcon = await driver.findElement(By.xpath('//div[4]/div/section-title//a')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addFileIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addFileIcon;
}exports.findAddFileIcon = findAddFileIcon;

async function findFileRemoveButton(driver) {
    let fileRemoveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        await driver.findElement(By.css('.font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).click();
        fileRemoveButton = await driver.findElement(By.xpath('//i[@class="icon-more-squares-vertical-filled"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileRemoveButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return fileRemoveButton;
}exports.findFileRemoveButton = findFileRemoveButton;

async function findCollapsedArrow(driver) {
    let collapsedArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        collapsedArrow = await driver.findElement(By.xpath('//sm-file-list//section/section-title//span')).click();
        await driver.sleep(3000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'collapsedArrow_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return collapsedArrow;
}exports.findCollapsedArrow = findCollapsedArrow;

async function findCancelButton(driver) {
    let cancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelButton = await driver.findElement(By.xpath('//ngb-modal-window[2]//button[text()=" Cancel "]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelButton;
}exports.findCancelButton = findCancelButton;

async function findCancelConfirmButton(driver,confirmationButton) {
    let cancelConfirmButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelConfirmButton = await driver.findElement(By.xpath(`//body/ngb-modal-window[3]//button[text()="${confirmationButton}"]`)).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelConfirmButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelConfirmButton;
}exports.findCancelConfirmButton = findCancelConfirmButton;
const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/03_activitiesTab/screenshots/';
const elementSearchTimeout = require('../../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findSideArrow(driver) {
    let sideArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sideArrow = await driver.findElement(By.xpath('//div[3]/div/section-title//span')).click();
        await driver.sleep(5000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activitySideArrow_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sideArrow;
}exports.findSideArrow = findSideArrow;

async function findCollapsedArrow(driver) {
    let collapsedArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        collapsedArrow = await driver.findElement(By.xpath('//sm-activity-list/section[@class="col-md-12 col-sm-12 no-padder"]/section-title//span')).click();
        await driver.sleep(5000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'collapsedArrow_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return collapsedArrow;
}exports.findCollapsedArrow = findCollapsedArrow;

async function findAddActivityIcon(driver) {
    let addActivityIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addActivityIcon = await driver.findElement(By.xpath('//div[3]/div/section-title//a')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addActivityIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addActivityIcon;
}exports.findAddActivityIcon = findAddActivityIcon;

async function findAddActivityCloseIcon(driver) {
    let addActivityCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addActivityCloseIcon = await driver.findElement(By.xpath('//ngb-modal-window[2]/div//sm-add-edit-activity-dialog//button[@type="button"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addActivityCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addActivityCloseIcon;
}exports.findAddActivityCloseIcon = findAddActivityCloseIcon;

async function findAddActivityFields(driver,Id) {
    let addActivityFields;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addActivityFields = await driver.findElement(By.id(`${Id}`));
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addActivityFields_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addActivityFields;
}exports.findAddActivityFields = findAddActivityFields;

async function findSaveButton(driver) {
    let saveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        saveButton = await driver.findElement(By.xpath('//button[@id="btnSubmit"]//span[.=" Save "]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return saveButton;
}exports.findSaveButton = findSaveButton;

async function findActivityTitle(driver) {
    let activityTitle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        activityTitle = await driver.findElement(By.xpath('//ul//a[@title="Click to view details"]')).click();
        await driver.sleep(5000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityTitle_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return activityTitle;
}exports.findActivityTitle = findActivityTitle;

async function findActivityQuickViewCloseIcon(driver) {
    let activityQuickViewCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        activityQuickViewCloseIcon = await driver.findElement(By.xpath('//ngb-modal-window[2]/div//quick-view-activity/div[2]/div[@class="material-header quickview-header"]/a')).click();
        await driver.sleep(3000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityQuickViewCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return activityQuickViewCloseIcon;
}exports.findActivityQuickViewCloseIcon = findActivityQuickViewCloseIcon;

async function findActivityRemoveButton(driver) {
    let activityRemoveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        await driver.findElement(By.xpath('//ul[@class="rt-listing"]//div[@class="icontype"]')).click();
        await driver.findElement(By.xpath('//i[@class="icon-more-squares-vertical-filled"]')).click();
        await driver.sleep(1000);
        activityRemoveButton = await driver.findElement(By.xpath('//a[text()="Remove"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityRemoveButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return activityRemoveButton;
}exports.findActivityRemoveButton = findActivityRemoveButton;

async function findDeleteConfirmationButton(driver) {
    let deleteConfirmationButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteConfirmationButton = await driver.findElement(By.xpath('//ngb-modal-window[2]/div//sm-confirm-prompt/div/button[1]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteConfirmationButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteConfirmationButton;
}exports.findDeleteConfirmationButton = findDeleteConfirmationButton;
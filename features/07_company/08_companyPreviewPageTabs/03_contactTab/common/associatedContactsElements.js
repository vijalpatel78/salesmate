const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/07_company/08_companyPreviewPageTabs/03_contactTab/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findExpandOrCollapseArrow(driver) {
    let expandOrCollapseArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        expandOrCollapseArrow = await driver.findElement(By.xpath('//sm-associated-contact//h4[@class="d-flex v-center"]/span'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'expandOrCollapseArrow_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return expandOrCollapseArrow;
}exports.findExpandOrCollapseArrow = findExpandOrCollapseArrow;

async function findAddAssociateButton(driver) {
    let addAssociateButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addAssociateButton = await driver.findElement(By.xpath('//section-body//button[@class="btn btn-default"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addAssociateButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addAssociateButton;
}exports.findAddAssociateButton = findAddAssociateButton;

async function findSearchField(driver) {
    let searchField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        searchField = await driver.findElement(By.xpath('//sm-autocomplete//sm-element//ro-tag/div[@class="ro-tag-autocomplete"]/input'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'searchField_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return searchField;
}exports.findSearchField = findSearchField;

async function findDetailViewIcon(driver) {
    let detailViewIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        detailViewIcon = await driver.findElement(By.xpath('//div[1]/ul/li[1]/div[1]/div/div[@class="d-flex v-center"]/a[2]/i'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'detailViewIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return detailViewIcon;
}exports.findDetailViewIcon = findDetailViewIcon;

async function findMobileNumber(driver,mobileIndex) {
    let mobileNumber;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        mobileNumber = await driver.findElement(By.xpath(`//div[1]/ul/li[${mobileIndex}]/div[2]/div/div/dialer/div/div/a[@class="label-data-highlighter"]`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mobileNumber_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return mobileNumber;
}exports.findMobileNumber = findMobileNumber;

async function findBrowserOption(driver) {
    let browserOption;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        browserOption = await driver.findElement(By.xpath(`//ul[@class='custom-list-group']/li[1]/a[@href='javascript:void(0);']`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'browserOption_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return browserOption;
}exports.findBrowserOption = findBrowserOption;

async function findEndCallButton(driver) {
    let endCallButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        endCallButton = await driver.findElement(By.xpath('//twilio-calling-card-list/div[@class="call-popup m-l-lg"]/twilio-calling-card/div/div[3]/div/div[2]/button[2]/span'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'endCallButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return endCallButton;
}exports.findEndCallButton = findEndCallButton;

async function findRemoveIcon(driver,removeIndex) {
    let removeIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        removeIcon = await driver.findElement(By.xpath(`//div[1]/ul/li[${removeIndex}]/div[1]/div/div/a[3]`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'removeIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return removeIcon;
}exports.findRemoveIcon = findRemoveIcon;

async function findDeleteIcon(driver) {
    let deleteIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteIcon = await driver.findElement(By.xpath('//button[2]/i[@class="icon-trash"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteIcon;
}exports.findDeleteIcon = findDeleteIcon;

async function findSendTextOption(driver) {
    let sendTextOption;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sendTextOption = await driver.findElement(By.xpath('//ul[@class="custom-list-group"]/li[3]/a[@href="javascript:void(0);"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'sendTextOption_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sendTextOption;
}exports.findSendTextOption = findSendTextOption;
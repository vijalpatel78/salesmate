const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/09_contactDetails/05_addActivity/screenshots/';

async function findTab(driver,tabName) {
    let tabElement;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        tabElement = await driver.findElement(By.xpath(`//ul[@class='nav nav-tabs']//a[text()="${tabName}"]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+tabName+'Tab_NotFound.png');
        await assert.fail(err);
    }
    return tabElement;
}exports.findTab = findTab;

async function findActivityCancelButton(driver) {
    let activityCancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        activityCancelButton = await driver.findElement(By.xpath('//section/form/div[2]/div[@class="pull-right"]/button[.=" Cancel "]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityCancelButton_NotFound.png');
        await assert.fail(err);
    }
    return activityCancelButton;
}exports.findActivityCancelButton = findActivityCancelButton;

async function findTimelineTab(driver,tabName) {
    let timelineTab;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        timelineTab = await driver.findElement(By.xpath(`//a[.='${tabName}']`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+tabName+'Tab_NotFound.png');
        await assert.fail(err);
    }
    return timelineTab;
}exports.findTimelineTab = findTimelineTab;

async function findSetRecurrence(driver) {
    let setRecurrence;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        setRecurrence = await driver.findElement(By.xpath('//a[text()="Set Recurrance"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'setRecurrence_NotFound.png');
        await assert.fail(err);
    }
    return setRecurrence;
}exports.findSetRecurrence = findSetRecurrence;

async function findEndCheckbox(driver) {
    let endCheckbox;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        endCheckbox = await driver.findElement(By.id('endOn_After'));
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'endCheckbox_NotFound.png');
        await assert.fail(err);
    }
    return endCheckbox;
}exports.findEndCheckbox = findEndCheckbox;

async function findRecurrenceSaveButton(driver) {
    let recurrenceSaveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        recurrenceSaveButton = await driver.findElement(By.xpath('//div[1]/popper-content/div[@role="popper"]//sm-recurrence-activity//form//div[@class="pull-right"]/button[1]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'recurrenceSaveButton_NotFound.png');
        await assert.fail(err);
    }
    return recurrenceSaveButton;
}exports.findRecurrenceSaveButton = findRecurrenceSaveButton;

async function findActivityName(driver,activityName) {
    let activityNameField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        activityNameField = await driver.findElement(By.xpath(`//span[contains(text(),'${activityName}')]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityName_NotFound.png');
        await assert.fail(err);
    }
    return activityNameField;
}exports.findActivityName = findActivityName;

async function findActivityQuickViewCloseIcon(driver) {
    let activityQuickViewCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        activityQuickViewCloseIcon = await driver.findElement(By.xpath('//div[2]/div[@class="material-header quickview-header"]/a'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityQuickViewCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    return activityQuickViewCloseIcon;
}exports.findActivityQuickViewCloseIcon = findActivityQuickViewCloseIcon;

async function findLessFieldsLink(driver) {
    let lessFieldsLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        lessFieldsLink = await driver.findElement(By.xpath('//a[text()=" Less Fields "]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'lessFieldsLink_NotFound.png');
        await assert.fail(err);
    }
    return lessFieldsLink;
}exports.findLessFieldsLink = findLessFieldsLink;

async function findDeleteIcon(driver,noteIndex) {
    let deleteIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteIcon = await driver.findElement(By.xpath(`//timeline-activity[${noteIndex}]//button/i[@class="icon-trash"]`));
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteIcon_NotFound.png');
        await assert.fail(err);
    }
    return deleteIcon;
}exports.findDeleteIcon = findDeleteIcon;

async function findCompleteOrReOpenIcon(driver,iconIndex) {
    let completeOrReOpenIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        completeOrReOpenIcon = await driver.findElement(By.xpath(`(//timeline-activity//activity-close/label/i)[${iconIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'completeOrReOpenIcon_NotFound.png');
        await assert.fail(err);
    }
    return completeOrReOpenIcon;
}exports.findCompleteOrReOpenIcon = findCompleteOrReOpenIcon;

async function findOutcome(driver,outcomeIndex) {
    let outcome;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        outcome = await driver.findElement(By.xpath(`//ngb-modal-window//div[${outcomeIndex}]/label[@class='i-checks']/i`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'outcome_NotFound.png');
        await assert.fail(err);
    }
    return outcome;
}exports.findOutcome = findOutcome;

async function findNoteText(driver,noteIndex) {
    let noteText;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        noteText = await driver.findElement(By.xpath(`(//input[@name="noteTxt"])[${noteIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'noteText_NotFound.png');
        await assert.fail(err);
    }
    return noteText;
}exports.findNoteText = findNoteText;
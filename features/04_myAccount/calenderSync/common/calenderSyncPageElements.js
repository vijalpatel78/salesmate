const { By, until } = require('selenium-webdriver');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const {strictEqual} = require('assert');
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const assert = require('assert');
const screenshotPath = './features/04_myAccount/calenderSync/screenshots/';

async function clickOnCalenderSync() {
    await driver.findElement(By.xpath("//a[text()='Calendar Sync']")).click();
    await driver.sleep(2000);
}

async function selectConnectedAccountDropdown() {
    await driver.findElement(By.xpath("//span[@class='select2-selection__arrow']")).click();
    await driver.sleep(1000);
}

async function clickOnConnectedAccount() {
    await driver.findElement(By.xpath('//a[text()=" Connected Account(s)"]')).click();
}

async function eventsAppearDropdown() {
    await driver.findElement(By.xpath("//div[4]/div[@class='col-md-6']/sm-select-box/sm-element/div/span//span[@role='combobox']/span[@role='presentation']")).click();
}

async  function updateButton() {
    let updateBtn;

    try {
        updateBtn = await driver.findElement(By.name("updateSettings")).click();
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/updateButton_NotFound.png');
        await assert.fail('Due to the update button is not found, the test case has been failed');
    }
    return updateBtn;
}

async  function selectDifferentAccount() {
    let differentAccount;

    try {

        differentAccount = await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/differentAccountButton_NotFound.png');
        await assert.fail('Due to different account button is not found, the test case has been failed');
    }
    return differentAccount;
}

async function checkCalenderSyncUpdateMessage() {
    const notificationMessageElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
    await driver.wait(until.elementIsVisible(notificationMessageElement));
    const notificationMessage = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
    strictEqual(notificationMessage,'Updated successfully.');
}

async function findCallActivityCheckbox() {
    let calActivityCheckbox;
    try {
        calActivityCheckbox = await driver.findElement(By.id('activity_Call_0'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/calActivityCheckbox_NotFound.png');
        await assert.fail('Due to the call activity checkbox is not found, the test case has been failed');
    }
    return calActivityCheckbox;
}

async function findNotificationTime() {
    let notificationTime;
    try {
        notificationTime = await driver.findElement(By.id('notificationTime_Call_0'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/callNotificationTime_NotFound.png');
        await assert.fail('Due to the call activity notification time field is not found, the test case has been failed');
    }
    return notificationTime;
}

async function findTaskNotificationTime() {
    let taskNotificationTime;
    try {
        taskNotificationTime = await driver.findElement(By.id('notificationTime_Task_0'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/taskNotificationTime_NotFound.png');
        await assert.fail('Due to the task activity notification time field is not found, the test case has been failed');
    }
    return taskNotificationTime;
}

async function findMeetingNotificationTime() {
    let meetingNotificationTime;
    try {
        meetingNotificationTime = await driver.findElement(By.id('notificationTime_Meeting_0'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/meetingNotificationTime_NotFound.png');
        await assert.fail('Due to the meeting activity notification time field is not found, the test case has been failed');
    }
    return meetingNotificationTime;
}

async function findTaskActivityCheckbox() {
    let taskActivityCheckbox;
    try {
        taskActivityCheckbox = await driver.findElement(By.id('activity_Task_1'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/taskActivityCheckbox_NotFound.png');
        await assert.fail('Due to the task activity checkbox is not found, the test case has been failed');
    }
    return taskActivityCheckbox;
}

async function findMeetingActivityCheckbox() {
    let meetingActivityCheckbox;
    try {
        meetingActivityCheckbox = await driver.findElement(By.id('activity_Meeting_2'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/meetingActivityCheckbox_NotFound.png');
        await assert.fail('Due to the meeting activity checkbox is not found, the test case has been failed');
    }
    return meetingActivityCheckbox;
}

async function findDemoActivityCheckbox() {
    let demoActivityCheckbox;
    try {
        demoActivityCheckbox = await driver.findElement(By.id('activity_Demo_3'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/demoActivityCheckbox_NotFound.png');
        await assert.fail('Due to the demo activity checkbox is not found, the test case has been failed');
    }
    return demoActivityCheckbox;
}

async function findSyncAllEventsToggleButton() {
    let syncAllEventsToggleButton;
    try {
        syncAllEventsToggleButton = await driver.findElement(By.id('syncActivityRadioField_true'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/syncAllEventsToggleButton_NotFound.png');
        await assert.fail('Due to the sync all events toggle button is not found, the test case has been failed');
    }
    return syncAllEventsToggleButton;
}

async function uploadUnsyncedActivitiesButton(){
    await driver.findElement(By.id("uploadUnSyncActivities")).click();
}

async function syncAllOrSomeActivityTypes(names = [], toggleValue = 'disable') {
    for(let i = 0; i < names.length; i++) {
        const toggleButton = await driver.findElement(By.name(names[i]));
        const currentValue = await toggleButton.getAttribute("value") === 'true' ? 'enable' : 'disable';
        if(currentValue !== toggleValue) {
            await driver.executeScript("arguments[0].click();", toggleButton);
        }
    }
}

async function clickOnCallNotification() {
    await driver.findElement(By.css(".activities-sync-wrapper li:nth-of-type(1) #addNotification")).click();
}

async function clickOnTaskNotification() {
    await driver.findElement(By.css(".activities-sync-wrapper li:nth-of-type(2) #addNotification")).click();
}

async function clickOnMeetingNotification() {
    await driver.findElement(By.css(".activities-sync-wrapper li:nth-of-type(3) #addNotification")).click();
}

async function setBlankNotificationDuration() {
       const notificationTimeCall = await driver.findElement(By.id("notificationTime_Call_0"));
       await clearFieldDataObj.clearFieldData(notificationTimeCall);
       await driver.findElement(By.name("updateSettings")).click();
       await driver.sleep(2000);
}

async function invalidDuration(invalidDuration,validationMessage) {
    let durationNotification = await driver.findElement(By.id('notificationTime_Call_0'));
    await clearFieldDataObj.clearFieldData(durationNotification);
    await durationNotification.sendKeys(invalidDuration);
    await driver.findElement(By.name("updateSettings")).click();
    await driver.sleep(2000);
    const errMsg = await driver.findElement(By.className("error-message text-danger")).getText();
    strictEqual(errMsg,validationMessage);
}

async function findNotificationClose(closeValue) {
    await driver.findElement(By.css(`.activities-sync-wrapper li:nth-of-type(${closeValue}) .icon-close`)).click();
    await driver.sleep(1000);
}

async function setTwoWaySync() {
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    const twoWaySync = await driver.findElement(By.id("syncActivityRadioField_true"));
    await driver.executeScript("arguments[0].click();",twoWaySync);
}

async function setOneWaySync() {
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    const oneWaySync = await driver.findElement(By.id("syncActivityRadioField_false"));
    await driver.executeScript("arguments[0].click();",oneWaySync);
}

async function stopCalenderSyncCancelled() {
    await driver.sleep(1000);
    const stopCalenderButton = await driver.findElement(By.id("stopSync"));
    await driver.wait(until.elementIsVisible(stopCalenderButton));
    await driver.findElement(By.id("stopSync")).click();
    await driver.findElement(By.xpath("//button[text()='No']")).click();
}

async function stopCalenderSync() {
    await driver.sleep(1000);
    const stopCalenderButton = await driver.findElement(By.id("stopSync"));
    await driver.wait(until.elementIsVisible(stopCalenderButton));
    await driver.findElement(By.id("stopSync")).click();
    await driver.sleep(1000);
    await driver.findElement(By.xpath("//button[text()='Yes']")).click();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const notifyMsg = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
    strictEqual(notifyMsg,'Calendar sync stopped successfully');
    await driver.sleep(5000);
}

module.exports = {
    clickOnCalenderSync,
    selectConnectedAccountDropdown,
    clickOnConnectedAccount,
    eventsAppearDropdown,
    updateButton,
    syncAllOrSomeActivityTypes,
    clickOnCallNotification,
    clickOnTaskNotification,
    clickOnMeetingNotification,
    setBlankNotificationDuration,
    invalidDuration,
    findNotificationClose,
    checkCalenderSyncUpdateMessage,
    findCallActivityCheckbox,
    findNotificationTime,
    findTaskNotificationTime,
    findMeetingNotificationTime,
    findTaskActivityCheckbox,
    findMeetingActivityCheckbox,
    findDemoActivityCheckbox,
    findSyncAllEventsToggleButton,
    setTwoWaySync,
    setOneWaySync,
    stopCalenderSyncCancelled,
    stopCalenderSync
}
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/04_myAccount/notificationPreferences/screenshots/';
const assert = require('assert');

async function clickOnNotificationPreference(driver,screenshotPath) {
    let notificationPreferenceTab;
    try {
        notificationPreferenceTab = await driver.findElement(By.xpath("//a[text()='Notification Preferences']"));
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'notificationPreferenceTab_NotFound.png');
        await assert.fail("As notification preference tab is not found,test case has been aborted");
    }
    return notificationPreferenceTab;
}

async function enableOrDisableNotificationPreference(names = [], toggleValue = 'disable', driver) {
    for(let i = 0; i < names.length; i++) {
        const toggleButtons = await driver.findElement(By.name(names[i]));
        const currentValue = await toggleButtons.getAttribute("value") === 'true' ? 'enable' : 'disable';
        if(currentValue !== toggleValue) {
            await driver.executeScript("arguments[0].click();", toggleButtons);
        }
    }
}

async function updateButton(driver) {
    await driver.findElement(By.id('btnUpdate'));
}

async function notificationUpdateMessage(driver) {
    const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(notificationMsg,'Notification preferences successfully updated');
    await driver.sleep(3000);
}

async function emailAlert(driver) {
    let emailReceived,emailOpened,textReceived;
    try {
        emailReceived = await driver.findElement(By.xpath("//tbody/tr[7]/td[2]")).getAttribute("value");
        emailOpened = await driver.findElement(By.xpath("//tbody/tr[8]/td[2]")).getAttribute("value");
        textReceived = await driver.findElement(By.xpath("//tbody/tr[10]/td[2]")).getAttribute("value");
        if(emailReceived === null && emailOpened === null && textReceived === null) {
            console.log("As email alert is not available for email received,email opened and text received the test case has been passed");
            await screenshotObj.takeScreenshot(driver,screenshotPath+'emailAlertUnavailable.png');
        } else {
            console.log("As email alert is available for email received,email opened and text received the test case has been aborted");
        }
    } catch(err) {
        throw err;
    }
}

async function enableDailyDigestEmail(names = [], toggleValue = 'disable',driver) {
    //await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    for(let i = 0; i < names.length; i++) {
        const toggleButtons = await driver.findElement(By.name(names[i]));
        await driver.executeScript("arguments[0].scrollIntoView(true);",toggleButtons);
        const currentValue = await toggleButtons.getAttribute("value") === 'true' ? 'enable' : 'disable';
        if(currentValue !== toggleValue) {
            await driver.executeScript("arguments[0].click();", toggleButtons);
        }
    }
}

async function setDailyDigestDeliveryTime(driver,value) {
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'timeField',value,'yes');
}

module.exports = {
    clickOnNotificationPreference,
    enableOrDisableNotificationPreference,
    updateButton,
    notificationUpdateMessage,
    emailAlert,
    enableDailyDigestEmail,
    setDailyDigestDeliveryTime
}
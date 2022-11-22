const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const {strictEqual} = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotPath = './features/03_setup/users_security/profilePermissions/screenshots/';

async function findEditButton(driver,profileName) {
    let editButtonOfNewProfile;
    try {
        editButtonOfNewProfile = await driver.findElement(By.xpath(`//td[text()='${profileName}']/following-sibling::td/a[text()='Edit']`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editButton_NotFound.png');
        await assert.fail("As edit button is not found,test case has been failed");
    }
    return editButtonOfNewProfile;
}

async function profileNameBlankValidation(driver,profileName,validationMessage) {
    const profileNameField = await driver.findElement(By.id('profileNameField'));
    await clearFieldDataObj.clearFieldData(profileNameField);
    await profileNameField.sendKeys(profileName);
    await driver.findElement(By.id('saveButtonField')).click();
    const validationMsgElem = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]'));
    const validationMsg = await validationMsgElem.getText();
    strictEqual(validationMsg,validationMessage);
}

async function duplicateProfileVerification(driver,duplicateProfileName,validationMessage) {
    const profileNameField = await driver.findElement(By.id('profileNameField'));
    await clearFieldDataObj.clearFieldData(profileNameField);
    await profileNameField.sendKeys(duplicateProfileName);
    await driver.findElement(By.id('saveButtonField')).click();
    await driver.sleep(2000);
    const validationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(validationMsgElement));
    const validationMsgElem = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    const validationMsg = await validationMsgElem.getText();
    strictEqual(validationMsg, validationMessage);
    await driver.sleep(5000);
}

async function checkProfileUpdateMessage(driver) {
    const profileUpdateNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(profileUpdateNotificationElement));
    const profileUpdateNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(profileUpdateNotification,'Updated successfully.');
}

async function findUserPageStandardUser(driver,rowId) {
    let userPageStandardUser;
    try {
        userPageStandardUser = await driver.findElement(By.xpath(`//div[@row-id='${rowId}']//div[@col-id='Profile']`)).getText();
    }catch(err) {
        await assert.fail("As standard profile of users page is not found,test case has been failed");
    }
    return userPageStandardUser;
}

async function deleteProfile(driver,profileName) {
    let deleteProfile;
    try {
        deleteProfile = await driver.findElement(By.xpath(`//td[text()='${profileName}']/following-sibling::td/a[text()='Delete']`));
    }catch(err) {
        await assert.fail("As delete link of custom profile 01 is not found,test case has been failed");
    }
    return deleteProfile;
}

async function profileDeleteNotification(driver) {
    const profileDeleteNotificationElem = await driver.findElement(By.xpath('//span[@class ="noty_text"]'));
    const profileDeleteNotification = await profileDeleteNotificationElem.getText();
    strictEqual(profileDeleteNotification,'Deleted successfully.');
}

module.exports = {
    findEditButton,
    profileNameBlankValidation,
    duplicateProfileVerification,
    checkProfileUpdateMessage,
    findUserPageStandardUser,
    deleteProfile,
    profileDeleteNotification
}
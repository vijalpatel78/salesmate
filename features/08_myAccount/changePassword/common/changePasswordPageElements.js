const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/changePassword/screenshots';

async function clickOnSecurity() {
   let securityTab;
   await driver.manage().setTimeouts({implicit:10000});
   try {
      securityTab = await driver.findElement(By.xpath("//a[text()='Security']"));
   }catch(err) {
      await screenshotObj.takeScreenshot(driver,screenshotPath+'securityTab_NotFound.png');
      await assert.fail(err);
   }
   await driver.wait(until.elementIsVisible(securityTab));
   await driver.sleep(1000);
   return securityTab;
}exports.clickOnSecurity = clickOnSecurity;

async function changePassword(oldPasswordValue, newPasswordValue, confirmPasswordValue) {
   let oldPassword = await driver.findElement(By.id('oldPassword'));
   await clearFieldDataObj.clearFieldData(oldPassword);
   oldPassword.sendKeys(oldPasswordValue);
   await driver.sleep(1000);
   let newPassword = await driver.findElement(By.id('newPassword'));
   await clearFieldDataObj.clearFieldData(newPassword);
   newPassword.sendKeys(newPasswordValue);
   await driver.sleep(1000);
   let confirmPassword = await driver.findElement(By.id('confirmPassword'));
   await clearFieldDataObj.clearFieldData(confirmPassword);
   confirmPassword.sendKeys(confirmPasswordValue);
}exports.changePassword = changePassword;

async function newPasswordFieldChecking(newPasswd) {
   let newPassword = await driver.findElement(By.id('newPassword'));
   await clearFieldDataObj.clearFieldData(newPassword);
   newPassword.sendKeys(newPasswd);
   await driver.sleep(1000);
}exports.newPasswordFieldChecking = newPasswordFieldChecking;

async function newPasswordFieldBlank() {
   const newPassword = await driver.findElement(By.id('newPassword'));
   await clearFieldDataObj.clearFieldData(newPassword);
   newPassword.sendKeys('');
   await driver.sleep(1000);
}exports.newPasswordFieldBlank = newPasswordFieldBlank;

async function resetPassword() {
   let oldPasswordField = await driver.findElement(By.id('oldPassword'));
   await clearFieldDataObj.clearFieldData(oldPasswordField);
   oldPasswordField.sendKeys("12");
   await driver.sleep(1000);
   let newPasswordField = await driver.findElement(By.id('newPassword'));
   await clearFieldDataObj.clearFieldData(newPasswordField);
   newPasswordField.sendKeys("1");
   await driver.sleep(1000);
   let confirmPasswordField = await driver.findElement(By.id('confirmPassword'));
   await clearFieldDataObj.clearFieldData(confirmPasswordField);
   confirmPasswordField.sendKeys("1");
}exports.resetPassword = resetPassword;
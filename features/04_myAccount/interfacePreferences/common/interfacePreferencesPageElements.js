const { By, until } = require('selenium-webdriver');
const {strictEqual} = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const assert = require('assert');
const screenshotPath = './features/04_myAccount/interfacePreferences/screenshots/';

async function clickOnInterfacePreference(driver,screenshotPath) {
   let clickOnInterferencePreferenceTab;
   await driver.manage().setTimeouts({implicit:10000});
   try {
      clickOnInterferencePreferenceTab = await driver.findElement(By.xpath('//a[text()="Interface Preferences"]'));
   }catch(err) {
      await screenshotObj.takeScreenshot(driver,screenshotPath+'interfacePreferenceTab_NotFound.png');
      await assert.fail(err);
   }
   await driver.wait(until.elementIsVisible(clickOnInterferencePreferenceTab));
   return clickOnInterferencePreferenceTab;
}exports.clickOnInterfacePreference = clickOnInterfacePreference;

async function enableOrDisableToggleButtons(names = [], toggleValue = 'disable',driver) {
   for(let i = 0; i < names.length; i++) {
      const toggleButton = await driver.findElement(By.name(names[i]));
      const currentValue = await toggleButton.getAttribute("value") === 'true' ? 'enable' : 'disable';
      if(currentValue !== toggleValue) {
         await driver.executeScript("arguments[0].click();", toggleButton);
      }
   }
}exports.enableOrDisableToggleButtons = enableOrDisableToggleButtons;

async function selectOption(driver) {
   let selectOption;
   await driver.manage().setTimeouts({implicit:10000});
   try {
      selectOption = await driver.findElement(By.xpath('//span[@role="presentation"]'));
   }catch(err) {
      await screenshotObj.takeScreenshot(driver,screenshotPath+'selectOption_NotFound.png');
      await assert.fail(err);
   }
   await driver.wait(until.elementIsVisible(selectOption));
   await driver.sleep(500);
   return selectOption;
}exports.selectOption = selectOption;

async function selectTheme(driver,theme) {
   let selectTheme;
   await driver.manage().setTimeouts({implicit:10000});
   try {
      selectTheme = await driver.findElement(By.xpath(`//span[text()='${theme}']`));
   }catch(err) {
      await screenshotObj.takeScreenshot(driver,screenshotPath+'theme_NotFound.png');
      await assert.fail(err);
   }
   await driver.wait(until.elementIsVisible(selectTheme));
   await driver.sleep(500);
   return selectTheme;
}exports.selectTheme = selectTheme;

async function themeVerification(driver,theme) {
   const lightVerification = await driver.findElement(By.xpath(`//span[@class='${theme.toLowerCase()}-circle-color']`)).getText();
   strictEqual(lightVerification, theme);
}exports.themeVerification = themeVerification;

async function checkInterfaceUpdateMessage(driver) {
   await driver.sleep(1000);
   const msgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
   await driver.wait(until.elementIsVisible(msgElement));
   const msg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
   strictEqual(msg,'Updated successfully.');
   await driver.sleep(3000);
}exports.checkInterfaceUpdateMessage = checkInterfaceUpdateMessage;

async function clickOnProfilePermissions(driver) {
   await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1000 }, 0);");
   await driver.sleep(2000);
   await driver.findElement(By.xpath("//a[text()=' Profile Permissions ']"));
}exports.clickOnProfilePermissions = clickOnProfilePermissions;

async function clickOnEdit(driver) {
   let editButton;
   await driver.manage().setTimeouts({implicit:10000});
   try {
      editButton = await driver.findElement(By.xpath('//td[text()="Standard"]/following::a[1]'));
   }catch(err) {
      await screenshotObj.takeScreenshot(driver,screenshotPath+'editButton_NotFound.png');
      await assert.fail(err);
   }
   await driver.wait(until.elementIsVisible(editButton));
   await driver.sleep(2000);
   return editButton;
}exports.clickOnEdit = clickOnEdit;
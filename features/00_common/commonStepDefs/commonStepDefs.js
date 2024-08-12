const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../config/test_config').driver;
const screenshotPath = './features/00_common/screenshots/';
const clearFieldDataObj = require('../../00_common/actions/fieldActions/clearFieldData');
const moduleElementsObj = require('../webElements/moduleElements');
const commonElementObj = require('../../00_common/webElements/commonElements');
const formElementsObj = require('../../00_common/webElements/formElements');

//--------------------------------------------Disabling Module Rights---------------------------------------------------

When('verifying {string} when rights are disabled for right name of {string} through {string}', async function (user, name, adminUser) {
  try {
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
    //will find the 'Profile Permissions' tab
    const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
    //will set focus on the 'Profile Permissions' tab
    await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
    await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
    //will click on the 'Profile Permissions' tab
    await profilePermissionsTab[0].click();
    await driver.sleep(1000);
    const editButton = await moduleElementsObj.findEditButton(driver);
    await editButton.click();
    await driver.sleep(2000);
    await moduleElementsObj.enableOrDisableToggleButtons(driver, [name], 'disable');
    await driver.sleep(1000);
    const saveButton = await formElementsObj.findElementById(driver, screenshotPath, 'saveButtonField', 'Save Button');
    await saveButton.click();
    await driver.sleep(3000);
    await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
    await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on apps page');
    await driver.sleep(2000);
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + name + 'right_NotFound.png');
    await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
    await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on apps page');
    await driver.sleep(3000);
    await assert.fail(err);
  }
});

//--------------------------------------------Enabling Module Rights----------------------------------------------------

When('verifying {string} when rights are enabled for right name of {string} through {string}', async function (user, name, adminUser) {
  try {
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
    //will find the 'Profile Permissions' tab
    const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
    //will set focus on the 'Profile Permissions' tab
    await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
    await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
    //will click on the 'Profile Permissions' tab
    await profilePermissionsTab[0].click();
    await driver.sleep(1000);
    const editButton = await moduleElementsObj.findEditButton(driver);
    await editButton.click();
    await driver.sleep(2000);
    await moduleElementsObj.enableOrDisableToggleButtons(driver, [name], 'enable');
    await driver.sleep(500);
    const saveButton = await formElementsObj.findElementById(driver, screenshotPath, 'saveButtonField', 'Save Button');
    await saveButton.click();
    await driver.sleep(3000);
    await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
    await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on apps page');
    await driver.sleep(2000);
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + name + 'right_NotFound.png');
    await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
    await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on apps page');
    await driver.sleep(3000);
    await assert.fail(err);
  }
});

//---------------------------------------Verifying Dynamic Module Name--------------------------------------------------

When('dynamic module name {string} of {string} should be displayed as {string}', async function (moduleName, moduleId, expectedName) {
  try {
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
    //will find the 'system Modules' tab
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' System Modules ');
    //will set focus on the 'System Modules' tab
    await driver.executeScript("arguments[0].scrollIntoView();", systemModulesTab[0]);
    await driver.wait(until.elementIsVisible(systemModulesTab[0]));
    //will click on the 'System Modules' tab
    await systemModulesTab[0].click();
    await driver.sleep(3000);
    const editIcon = await moduleElementsObj.findModulesEditButton(driver, `${moduleName}`);
    await editIcon.click();
    await driver.sleep(2000);
    const moduleNameField = await driver.findElement(By.id(`${moduleId}`));
    await clearFieldDataObj.clearFieldData(moduleNameField);
    await moduleNameField.sendKeys(expectedName);
    const saveButton = await formElementsObj.findElementById(driver, screenshotPath, 'saveBtnField', 'Save Button');
    await saveButton.click();
    await driver.sleep(2000);
    await driver.navigate().refresh();
    await driver.sleep(6000);
  } catch (err) {
    await driver.navigate().refresh();
    await driver.sleep(5000);
    await assert.fail(err);
  }
});

//---------------------------------------------Verifying Currency drop down---------------------------------------------

When('user is able to see Active currencies only in currency dropdown', async function () {
  try {
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
    //will find the 'Currencies' tab
    const currenciesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Currencies ');
    //will set focus on the 'Currencies' tab
    await driver.executeScript("arguments[0].scrollIntoView();", currenciesTab[0]);
    await driver.wait(until.elementIsVisible(currenciesTab[0]));
    //will click on the 'Currencies' tab
    await currenciesTab[0].click();
    await driver.sleep(2000);
    await driver.manage().setTimeouts({ implicit: 2000 });
  } catch (err) {
    await driver.navigate().refresh();
    await driver.sleep(5000);
    await assert.fail(err);
  }
});

//-------------------------------------------------Notification Message-------------------------------------------------

Then('verify notification message as {string}', async function (expectedNotification) {
  try {
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, expectedNotification);
    await driver.sleep(3000);
  } catch (err) {
    await driver.navigate().refresh();
    await driver.sleep(5000);
    await assert.fail(err);
  }
});
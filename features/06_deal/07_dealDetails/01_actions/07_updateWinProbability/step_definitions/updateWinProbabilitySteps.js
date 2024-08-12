const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../../00_common/actions/performSalesmateLogin');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = '../features/08_deal/07_dealDetails/01_actions/04_updateValue/screenshots/';

//---------------------Case 1: Verify, the user is able to update win probability when user has update deal rights----------------------

Then('user is able to update win probability and log in through {string} and check {string}',async function(adminUser,expectedNotification){
    try {
        const winProbabilityDropdown = await driver.findElement(By.xpath('//div[2]/form[2]//div[@class="m-t-sm"]/div'));
        await winProbabilityDropdown.click();
        await driver.sleep(700);
        const winProbabilityField = await driver.findElement(By.xpath('//input[@id="winProbability"]'));
        await clearFieldDataObj.clearFieldData(winProbabilityField);
        await winProbabilityField.sendKeys("70");
        await driver.sleep(500);
        await driver.findElement(By.xpath('//button[@id="winProbabilitySaveBtnField"]//span[.=" Update "]')).click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------Case 2: Verify, the user is not able to update win probability when win probability setting of pipeline is OFF-----------

When('user is on setup > deal pipeline screen',async function(){
   try {
       //will open the 'Setup' page
       await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
       //will find the 'Deal Pipeline' tab
       const dealPipelineTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Deal Pipeline ');
       //will set focus on the 'Deal Pipeline' tab
       await driver.executeScript("arguments[0].scrollIntoView();",dealPipelineTab[0]);
       await driver.wait(until.elementIsVisible(dealPipelineTab[0]));
       //will click on the 'Deal Pipeline' tab
       await dealPipelineTab[0].click();
       await driver.sleep(2000);
   } catch (err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('user is not able to update win probability when win probability setting of pipeline is OFF',async function(){
   try {
       await driver.sleep(1000);
       //check 'Win Probability' dropdown is hidden
       const winProbabilityInvisibility = !!await driver.findElement(By.xpath('(//div[@class="ngxp__container ngxp__animation"])[11]')).getAttribute('aria-hidden');
       console.log("Is Win Probability Hidden: "+winProbabilityInvisibility);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//------------------Case 3: Verify, the user is unable to update win probability when user has no update deal rights---------------------

Then('user is unable to update win probability from details screen and log in through {string}',async function(adminUser){
    try {
        await driver.sleep(1000);
        //check 'Win Probability' dropdown is hidden
        const winProbabilityInvisibility = !!await driver.findElement(By.xpath('(//div[@class="ngxp__container ngxp__animation"])[11]')).getAttribute('aria-hidden');
        console.log("Is Win Probability Hidden: "+winProbabilityInvisibility);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'pipeline_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------------Case 4: Verify, the system should give validation message on entering invalid win probability----------------------

Then('system should give validation as {string} on entering invalid data as {string}',async function(expectedValidation,invalidData){
   try {
       const winProbabilityDropdown = await driver.findElement(By.xpath('//div[2]/form[2]//div[@class="m-t-sm"]/div'));
       await winProbabilityDropdown.click();
       await driver.sleep(700);
       const winProbabilityField = await driver.findElement(By.xpath('//input[@id="winProbability"]'));
       await clearFieldDataObj.clearFieldData(winProbabilityField);
       await winProbabilityField.sendKeys(invalidData);
       await driver.findElement(By.xpath('//slabel[text()="Win Probability "]')).click();
       await driver.sleep(1000);
       const actualValidationElement = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]'));
       await driver.wait(until.elementIsVisible(actualValidationElement));
       const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
       strictEqual(actualValidation, expectedValidation);
       await driver.sleep(500);
   } catch (err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});
const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/09_dealSpecificEmailWidget/screenshots/';
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//----------Case 1: As a User i can able to see name of deal specific email widget according to the given name of deal module---------

Then('user able to see name of deal specific email widget according to the given name of deal module',async function(){
    try {
        const dealSpecificEmail = await driver.findElement(By.xpath('//module-specific-email-address/section-body/div[1]')).getText();
        console.log("Deal Specific Email: "+dealSpecificEmail);
        await driver.sleep(1000);
        const dealSpecificEmailVisibility = !!await driver.findElement(By.xpath('//module-specific-email-address/section-body/div[1]')).isDisplayed();
        console.log("Is Deal Specific Email Visible: "+dealSpecificEmailVisibility);
        if (dealSpecificEmailVisibility === true) {
            console.log("As 'Deal Specific Email' is displayed, so test case has been passed");
        } else {
            await assert.fail("As 'Deal Specific Email' is not displayed, so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactDetailsWidgetsUI_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 2: As a User, Verify that user should able to copy the deal specific email address-----------------

Then('user is able to copy the deal specific email address and check message as {string}',async function(expectedNotification){
    try {
        const dealSpecificEmail = await driver.findElement(By.xpath('//module-specific-email-address/section-body/div[1]'));
        await dealSpecificEmail.click();
        await driver.sleep(500);
        const dealSpecificEmailText = await dealSpecificEmail.getText();
        console.log("Pasted value of Deal Specific Email is:" + dealSpecificEmailText);
        await driver.sleep(1000);
        const notifyMessageElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(notifyMessageElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 3: As a user, Verify the deal specific email address should be unique for deal wise---------------

Then('verify the deal specific email address should be unique for deal wise',async function(){
    try {
        const dealSpecificEmail01 = await driver.findElement(By.xpath('//module-specific-email-address/section-body/div[1]')).getText();
        console.log("Deal 01 Specific Email: "+dealSpecificEmail01);
        await driver.sleep(1000);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(1500);
        const clickOnDeal = await moduleElementsObj.clickOnDealName(driver,2);
        await clickOnDeal.click();
        await driver.sleep(3000);
        const dealSpecificEmail02 = await driver.findElement(By.xpath('//module-specific-email-address/section-body/div[1]')).getText();
        console.log("Deal 02 Specific Email: "+dealSpecificEmail02);
        await driver.sleep(500);
        if(dealSpecificEmail01 !== dealSpecificEmail02) {
            console.log("As deal specific emails are unique deal wise, so test case has been passed");
        } else {
            await assert.fail("As deal specific emails are not unique deal wise, so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
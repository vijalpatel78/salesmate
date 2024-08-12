const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/13_teammatesWidget/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//-------------------------------Case 1: As a User, Verify the UI of Deal "Related Tab"----------------------------------

When('verify the UI of "Related Tab"',async function(){
    try {
        const activitiesElement = !!await driver.findElement(By.xpath('//h4[text()=" Activities "]')).isDisplayed();
        strictEqual(activitiesElement,true);
        const filesElement = !!await driver.findElement(By.xpath('//h4[text()="Files "]')).isDisplayed();
        strictEqual(filesElement,true);
        const emailsElement = !!await driver.findElement(By.xpath('//h4[text()=" Emails "]')).isDisplayed();
        strictEqual(emailsElement,true);
        const associateProductElement = !!await driver.findElement(By.xpath('//h4[text()="Associate Products "]')).isDisplayed();
        strictEqual(associateProductElement,true);
        const sequenceElement = !!await driver.findElement(By.xpath('//h4[text()=" Sequences "]')).isDisplayed();
        strictEqual(sequenceElement,true);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'usersTab_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 14: As a User, Verify that No Product is associated with a particular deal It should display a "No Product found" message---------------------------

When('No Product is associated with a particular deal It should display a {string} message',async function(){
    try {

    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 15: As a User, Verify clicking on save button it should add the product to the Associated Product panel on the spot---------------------------

When('clicking on save button it should add the product to the Associated Product panel on the spot',async function(){
    try {

    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of Wufoo page on the browser 
 *  and then return those elements 
*/

async function findWebhookURLElem(driver,screenshotPath){
    let webhookURLElem;
    try{
        webhookURLElem = await driver.findElement(By.xpath('//p[contains(text(),"Your webhook url")]/child::a'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WebhookURLElem_NotFound.png');
        await assert.fail('Due to the webhook URL element is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'WebhookURLElem_NotFound.png\'');
    }
    await driver.wait(until.elementIsVisible(webhookURLElem));
    return webhookURLElem;
}exports.findWebhookURLElem=findWebhookURLElem;

async function findWebhookHandshakeKeyElem(driver,screenshotPath){
    let webhookHandshakeKeyElem;
    try{
        webhookHandshakeKeyElem = await driver.findElement(By.xpath('//p[contains(text(),"Your webhook handshake key")]/child::a'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WebhookHandshakeKeyElem_NotFound.png');
        await assert.fail('Due to the webhook handshake key element is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'WebhookHandshakeKeyElem_NotFound.png\'');
    }
    await driver.wait(until.elementIsVisible(webhookHandshakeKeyElem));
    return webhookHandshakeKeyElem;
}exports.findWebhookHandshakeKeyElem=findWebhookHandshakeKeyElem;

async function findUserEmailsOnWufooPage(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const emails = await driver.findElements(By.xpath('//table/descendant::tr/td[3]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return emails;
}exports.findUserEmailsOnWufooPage=findUserEmailsOnWufooPage;
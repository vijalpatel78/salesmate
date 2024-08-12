const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');

/*  All these following functions will find elements of Zapier page on the browser 
 *  and then return those elements 
*/

async function findZapierConfigurationElem(driver,screenshotPath){
    let zapierConfigurationElem;
    try{
        zapierConfigurationElem = await driver.findElement(By.xpath('//zapier-configuration'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ZapierConfigurationPage_NotFound.png');
        await assert.fail('Due to the zapier configuration page is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ZapierConfigurationPage_NotFound.png\'');
    }
    await driver.wait(until.elementIsVisible(zapierConfigurationElem));
    return zapierConfigurationElem;
}exports.findZapierConfigurationElem=findZapierConfigurationElem;
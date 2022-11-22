const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

/*  All these following functions will find elements of organization details page on the browser 
 *  and then return those elements 
*/

async function findTextboxElem(driver,screenshotPath,idAttribute){
    let textboxElem;

    try{
        textboxElem = await driver.findElement(By.id(idAttribute));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+idAttribute+'_Textbox_NotFound.png');
        await assert.fail('Due to the \''+idAttribute+'\' text box is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+idAttribute+'_Textbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(textboxElem));
    return textboxElem;
}exports.findTextboxElem=findTextboxElem;

async function findDisclaimerTextBox(driver,screenshotPath){
    let disclaimerTextBox;

    try{
        disclaimerTextBox = await driver.findElement(By.css('body.fr-view'));
    }catch(err){
        await driver.switchTo().defaultContent();
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DisclaimerField_NotFound.png');
        await assert.fail('Due to the disclaimer field is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(disclaimerTextBox));
    return disclaimerTextBox;
}exports.findDisclaimerTextBox=findDisclaimerTextBox;

async function findDisclaimeriFrame(driver,screenshotPath){
    let disclaimeriFrame;

    try{
        disclaimeriFrame = await driver.findElement(By.css('iframe.fr-iframe'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Disclaimer_iFrame_NotFound.png');
        await assert.fail('Due to the Disclaimer iFrame is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(disclaimeriFrame));
    return disclaimeriFrame;
}exports.findDisclaimeriFrame=findDisclaimeriFrame;
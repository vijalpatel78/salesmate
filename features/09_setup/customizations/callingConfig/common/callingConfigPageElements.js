const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

/*  All these following functions will find elements of calling configurations page on the browser 
 *  and then return those elements 
*/

async function findProviderTextbox(driver){
    const providerTextbox = await driver.findElements(By.xpath('//input[@placeholder="Ex. Skype"]'));
    return providerTextbox;
}exports.findProviderTextbox=findProviderTextbox;

async function findSyntaxTextbox(driver){
    const syntaxTextbox = await driver.findElements(By.xpath('//input[@placeholder="Ex. Skype://[number]"]'));
    return syntaxTextbox;
}exports.findSyntaxTextbox=findSyntaxTextbox;

async function findRemoveBtn(driver){
    const removeBtn = await driver.findElements(By.xpath('//button[@type="button"][@class="btn btn-default"]'));
    return removeBtn;
}exports.findRemoveBtn=findRemoveBtn;

async function findAddBtn(driver,screenshotPath){
    let addBtn;

    try{
        addBtn = await driver.findElement(By.id('addBtnField'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AddBtn_NotFound.png');
        await assert.fail('Due to the add button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddBtn_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(addBtn));
    return addBtn;
}exports.findAddBtn=findAddBtn;
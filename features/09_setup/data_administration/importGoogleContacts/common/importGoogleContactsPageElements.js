const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of import google contacts page on the browser 
 *  and then return those elements 
*/

async function findHeaderName(driver,screenshotPath){
    let headerName;
    try{
        headerName = await driver.findElement(By.xpath('//div[@class="secondary-header cell shrink"]/descendant::span[2]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'HeaderName_NotFound.png');
        await assert.fail('Due to the header name is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'HeaderName_NotFound.png\'.');
    }
    return headerName;
}exports.findHeaderName=findHeaderName;

async function findNextButton(driver,screenshotPath){
    let nextButton;
    try{
        nextButton = await driver.findElement(By.xpath('//button[@class="btn btn-sm btn-primary ng-binding"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NextBtn_NotFound.png');
        await assert.fail('Due to the next button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'NextBtn_NotFound.png\'.');
    }
    return nextButton;
}exports.findNextButton=findNextButton;

async function findBackButton(driver,screenshotPath){
    let backButton;
    try{
        backButton = await driver.findElement(By.xpath('//button[@class="btn btn-sm btn-default m-r-sm"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'BackBtn_NotFound.png');
        await assert.fail('Due to the back button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'BackBtn_NotFound.png\'.');
    }
    return backButton;
}exports.findBackButton=findBackButton;

async function findTagTextbox(driver){
    await driver.manage().setTimeouts({implicit:7000});
    const tagTextbox = await driver.findElements(By.xpath('//input'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return tagTextbox;
}exports.findTagTextbox=findTagTextbox;

async function findSuccessMsg(driver){
    await driver.manage().setTimeouts({implicit:20000});
    const successMsg = await driver.findElement(By.xpath('//h1'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return successMsg;
}exports.findSuccessMsg=findSuccessMsg;

async function findConnectedAccounts(driver){
    await driver.manage().setTimeouts({implicit:20000});
    const connectedAccounts = await driver.findElements(By.xpath('//tbody/tr/td[3]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return connectedAccounts;
}exports.findConnectedAccounts=findConnectedAccounts;

async function findConnectedAccountsTab(driver,screenshotPath){
    let connectedAccountsTab;
    try{
        connectedAccountsTab = await driver.findElement(By.css('a[href="#/app/user/connectedAccounts"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ConnectedAccountsTab_NotFound.png');
        await assert.fail('Due to the connected accounts tab is not found, the test case has been failed.');
    }
    await driver.wait(until.elementIsVisible(connectedAccountsTab));
    return connectedAccountsTab;
}exports.findConnectedAccountsTab=findConnectedAccountsTab;
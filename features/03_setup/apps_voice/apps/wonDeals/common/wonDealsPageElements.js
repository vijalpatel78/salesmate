const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of Won Deals page on the browser 
 *  and then return those elements 
*/

async function findUserNameLabel(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const userNameLabel = await driver.findElements(By.xpath('//table[@class="goal-manage-table"]/tr/td[3]'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return userNameLabel;
}exports.findUserNameLabel=findUserNameLabel;

async function findSetGoalsPeriod(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const setGoalPeriod = await driver.findElement(By.xpath('//div[@class="col-md-7"]/descendant::button[2]/child::span'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return setGoalPeriod;
}exports.findSetGoalsPeriod=findSetGoalsPeriod;

async function findDealsTextBox(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const dealsTextBox = await driver.findElements(By.xpath('//table[@class="goal-manage-table"]/tr/td[2]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return dealsTextBox;
}exports.findDealsTextBox=findDealsTextBox;

async function findDealsCheckbox(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const dealsCheckbox = await driver.findElements(By.xpath('//table[@class="goal-manage-table"]/tr/td[1]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return dealsCheckbox;
}exports.findDealsCheckbox=findDealsCheckbox;

async function findSpecifiedUserDealsTextBox(driver,username){
    await driver.manage().setTimeouts({implicit:5000});
    const dealsTextBox = await driver.findElement(By.xpath('//table[@class="goal-manage-table"]/tr/td[3][text()=" '+username+' "]/preceding-sibling::td[1]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return dealsTextBox;
}exports.findSpecifiedUserDealsTextBox=findSpecifiedUserDealsTextBox;

async function findSpecifiedUserDealsCheckbox(driver,username){
    await driver.manage().setTimeouts({implicit:5000});
    const dealsCheckbox = await driver.findElement(By.xpath('//table[@class="goal-manage-table"]/tr/td[3][text()=" '+username+' "]/preceding-sibling::td[2]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return dealsCheckbox;
}exports.findSpecifiedUserDealsCheckbox=findSpecifiedUserDealsCheckbox;

async function findValidationMsg(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const validationMsg = await driver.findElements(By.xpath('//div[@class="error-message text-danger"]'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return validationMsg;
}exports.findValidationMsg=findValidationMsg;

async function findWonDealsWidget(driver,screenshotPath){
    let wonDealsWidget;
    try{
        wonDealsWidget = await driver.findElement(By.xpath('//div[@class="widget-title wrapper-md"][contains(text(),"Won")]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WonDealsWidget_NotFound.png');
        await assert.fail('Due to the Won Deals Widget is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'WonDealsWidget_NotFound.png\'');
    }
    await driver.wait(until.elementIsVisible(wonDealsWidget));
    return wonDealsWidget;
}exports.findWonDealsWidget=findWonDealsWidget;

async function findWonDealAppNameLabel(driver,screenshotPath){
    let wonDealAppNameLabel;
    try{
        wonDealAppNameLabel = await driver.findElement(By.xpath('//h4[contains(text(),"Won")]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WonDealAppNameLabel_NotFound.png');
        await assert.fail('Due to the won deal app name label is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'WonDealAppNameLabel_NotFound.png\'.');
    }
    await driver.wait(until.elementIsVisible(wonDealAppNameLabel));
    return wonDealAppNameLabel;
}exports.findWonDealAppNameLabel=findWonDealAppNameLabel;
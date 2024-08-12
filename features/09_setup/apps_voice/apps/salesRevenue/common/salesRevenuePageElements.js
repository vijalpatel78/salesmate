const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of Sales Revenue page on the browser 
 *  and then return those elements 
*/

async function findCurrencyLabel(driver,screenshotPath){
    let currencyLabel;
    try{
        currencyLabel = await driver.findElement(By.xpath('//table[@class="goal-manage-table"]/tr/td[2]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CurrencyLabel_NotFound.png');
        await assert.fail('Due to the currency label is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CurrencyLabel_NotFound.png\'');
    }
    await driver.wait(until.elementIsVisible(currencyLabel));
    return currencyLabel;
}exports.findCurrencyLabel=findCurrencyLabel;

async function findUserNameLabel(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const userNameLabel = await driver.findElements(By.xpath('//table[@class="goal-manage-table"]/tr/td[4]'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return userNameLabel;
}exports.findUserNameLabel=findUserNameLabel;

async function findSetGoalsPeriod(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const setGoalPeriod = await driver.findElement(By.xpath('//div[@class="col-md-7"]/descendant::button[2]/child::span'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return setGoalPeriod;
}exports.findSetGoalsPeriod=findSetGoalsPeriod;

async function findAmountTextBox(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const amountTextBox = await driver.findElements(By.xpath('//table[@class="goal-manage-table"]/tr/td[3]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return amountTextBox;
}exports.findAmountTextBox=findAmountTextBox;

async function findAmountCheckbox(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const amountCheckbox = await driver.findElements(By.xpath('//table[@class="goal-manage-table"]/tr/td[1]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return amountCheckbox;
}exports.findAmountCheckbox=findAmountCheckbox;

async function findSpecifiedUserAmountTextBox(driver,username){
    await driver.manage().setTimeouts({implicit:5000});
    const amountTextBox = await driver.findElement(By.xpath('//table[@class="goal-manage-table"]/tr/td[4][text()=" '+username+' "]/preceding-sibling::td[1]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return amountTextBox;
}exports.findSpecifiedUserAmountTextBox=findSpecifiedUserAmountTextBox;

async function findSpecifiedUserAmountCheckbox(driver,username){
    await driver.manage().setTimeouts({implicit:5000});
    const amountCheckbox = await driver.findElement(By.xpath('//table[@class="goal-manage-table"]/tr/td[4][text()=" '+username+' "]/preceding-sibling::td[3]/descendant::input'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return amountCheckbox;
}exports.findSpecifiedUserAmountCheckbox=findSpecifiedUserAmountCheckbox;

async function findValidationMsg(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const validationMsg = await driver.findElements(By.xpath('//div[@class="error-message text-danger"]'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return validationMsg;
}exports.findValidationMsg=findValidationMsg;

async function findSalesGoalsWidget(driver,screenshotPath){
    let salesGoalsWidget;
    try{
        salesGoalsWidget = await driver.findElement(By.xpath('//div[@class="widget-title wrapper-md"][text()="Sales Goals"]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SalesGoalsWidget_NotFound.png');
        await assert.fail('Due to the Sales Goals Widget is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SalesGoalsWidget_NotFound.png\'');
    }
    await driver.wait(until.elementIsVisible(salesGoalsWidget));
    return salesGoalsWidget;
}exports.findSalesGoalsWidget=findSalesGoalsWidget;
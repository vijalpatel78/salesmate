const { By,until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of currencies page on the browser
 *  and then return those elements
*/

async function findDeactivateAllUnusedCurrenciesBtn(driver,screenshotPath){
    let deactivateAllUnusedCurrenciesBtn;

    try{
        deactivateAllUnusedCurrenciesBtn = await driver.findElement(By.id('currencyButton'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DeactivateAllUnusedCurrenciesBtn_NotFound.png');
        await assert.fail('Due to the deactivate all unused currencies button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DeactivateAllUnusedCurrenciesBtn_NotFound.png\'.');
    }

    await driver.wait(until.elementIsEnabled(deactivateAllUnusedCurrenciesBtn));
    return deactivateAllUnusedCurrenciesBtn;
}exports.findDeactivateAllUnusedCurrenciesBtn=findDeactivateAllUnusedCurrenciesBtn;

async function getCurrencyCodeList(driver){
    let currencyCodeList = [];
    await driver.manage().setTimeouts({implicit:7000});
    //will get the code list of currency
    const currencyCodeElem = await driver.findElements(By.xpath('//tr/td[2]'));
    for(let i=0; i<currencyCodeElem.length; i++){
        currencyCodeList[i] = await currencyCodeElem[i].getText();
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return currencyCodeList;
}exports.getCurrencyCodeList=getCurrencyCodeList;

async function findActivateAllCurrenciesBtn(driver){
    await driver.manage().setTimeouts({implicit:7000});
    const activateAllCurrenciesBtn = await driver.findElements(By.id('currencyButton'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return activateAllCurrenciesBtn;
}exports.findActivateAllCurrenciesBtn=findActivateAllCurrenciesBtn;

async function findNoRecordsFoundText(driver){
    await driver.manage().setTimeouts({implicit:30000});
    const noRecordsFoundText = await driver.findElements(By.xpath('//section/descendant::div[contains(text(),"No records found.")]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return noRecordsFoundText;
}exports.findNoRecordsFoundText=findNoRecordsFoundText;

async function findActivateOrDeactivateBtn(driver,screenshotPath,currencyCode){
    let activateOrDeactivateBtn

    try{
        activateOrDeactivateBtn = await driver.findElement(By.id(currencyCode.toUpperCase()));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+currencyCode+'_ActivateOrDeactivateBtn_NotFound.png');
        await assert.fail('Due to the activate or deactivate button for the '+currencyCode+' is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+currencyCode+'_ActivateOrDeactivateBtn_NotFound.png\'.');
    }

    await driver.wait(until.elementIsEnabled(activateOrDeactivateBtn));
    return activateOrDeactivateBtn;
}exports.findActivateOrDeactivateBtn=findActivateOrDeactivateBtn;
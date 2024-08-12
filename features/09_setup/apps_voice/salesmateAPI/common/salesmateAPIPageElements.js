const {By} = require('selenium-webdriver');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of Salesmate API page on the browser 
 *  and then return those elements 
*/

async function findTabName(driver,tabName){
    await driver.manage().setTimeouts({implicit:10000});
    const tab = await driver.findElements(By.xpath('//ul[@role="tablist"]/li/a[text()="'+tabName+'"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return tab;
}exports.findTabName=findTabName;

async function findAllTabName(driver){
    await driver.manage().setTimeouts({implicit:10000});
    const tabNames = await driver.findElements(By.xpath('//ul[@role="tablist"]/li/a[@data-toggle="tab"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return tabNames;
}exports.findAllTabName = findAllTabName;
const {By} = require('selenium-webdriver');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of export history page on the browser 
 *  and then return those elements 
*/

async function findGird(driver){
    await driver.manage().setTimeouts({implicit:7000});
    const grid = await driver.findElements(By.xpath('//ag-grid-angular'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return grid;
}exports.findGird=findGird;

async function findRecord(driver){
    await driver.manage().setTimeouts({implicit:7000});
    const recordElem = await driver.findElements(By.xpath('//ag-grid-angular/descendant::div[@row-index="0"]/descendant::span/child::span'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return recordElem;
}exports.findRecord=findRecord;

async function findOtherUserFile(driver,user){
    await driver.manage().setTimeouts({implicit:7000});
    const otherUserFile = await driver.findElements(By.xpath('//div[@col-id="exportedBy"]/span/span[contains(text(),"'+user+'")]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return otherUserFile;
}exports.findOtherUserFile=findOtherUserFile;

async function findOtherUserFileDownloadBtn(driver,user){
    await driver.manage().setTimeouts({implicit:20000});
    const otherUserFileDownloadBtn = await driver.findElement(By.xpath('(//span[contains(text(),"'+user+'")]/following::div[@col-id="filePath"][1]/descendant::a)[1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return otherUserFileDownloadBtn;
}exports.findOtherUserFileDownloadBtn=findOtherUserFileDownloadBtn;

async function findViewFileDownloadBtn(driver,viewName){
    await driver.manage().setTimeouts({implicit:20000});
    const viewFileDownloadBtn = await driver.findElements(By.xpath('//div[@col-id="viewName"]/descendant::span[text()="'+viewName+'"]/following::div[@col-id="filePath"][1]/descendant::a'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return viewFileDownloadBtn;
}exports.findViewFileDownloadBtn=findViewFileDownloadBtn;

async function findValidationMsg(driver){
    await driver.manage().setTimeouts({implicit:7000});
    const validationMsg = await driver.findElements(By.xpath('//pre'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return validationMsg;
}exports.findValidationMsg=findValidationMsg;
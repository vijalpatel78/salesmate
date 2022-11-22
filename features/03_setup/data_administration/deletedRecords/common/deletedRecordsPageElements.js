const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of deleted records page on the browser 
 *  and then return those elements 
*/

async function findRecordDeleteButton(driver,screenshotPath){
    let deleteButton;
    try{
        deleteButton = await driver.findElement(By.xpath('//a[text()=" Delete"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RecordDeleteBtn_NotFound.png');
        await assert.fail('Due to the record delete button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RecordDeleteBtn_NotFound.png\'.');
    }
    return deleteButton;
}exports.findRecordDeleteButton=findRecordDeleteButton;

async function findRecord(driver,record){
    await driver.manage().setTimeouts({implicit:7000});
    const recordElem = await driver.findElement(By.xpath('//a[text()="'+record+'"]/ancestor::div[@role="row"][1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return recordElem;
}exports.findRecord=findRecord;

async function findRecordLink(driver,screenshotPath,record){
    let recordElem;
    await driver.manage().setTimeouts({implicit:7000});
    try{
        recordElem = await driver.findElement(By.xpath('//a[text()="'+record+'"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+record.replace(/\s/g,'_')+'RecordLink_NotFound.png');
        await assert.fail('Due to the '+record+' record link is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+record.replace(/\s/g,'_')+'RecordLink_NotFound.png\'.');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return recordElem;
}exports.findRecordLink=findRecordLink;

async function findCheckbox(driver,screenshotPath){
    let checkbox;
    try{
        checkbox = await driver.findElement(By.xpath('(//div[@row-index="0"])[1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RecordCheckbox_NotFound.png');
        await assert.fail('Due to the record checkbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RecordCheckbox_NotFound.png\'.');
    }
    return checkbox;
}exports.findCheckbox=findCheckbox;

async function findCompanyNameField(driver,screenshotPath){
    let companyNameField;
    try{
        companyNameField = await driver.findElement(By.xpath('//span[text()="Name"]/following::input[@type="text"][1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CompanyNameField_NotFound.png');
        await assert.fail('Due to the company name field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CompanyNameField_NotFound.png\'.');
    }
    return companyNameField;
}exports.findCompanyNameField=findCompanyNameField;

async function findCustomField(driver,screenshotPath){
    let customField;
    try{
        customField = await driver.findElement(By.id('textCustomField6'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'customField_NotFound.png');
        await assert.fail('Due to the custom name field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'customField_NotFound.png\'.');
    }
    return customField;
}exports.findCustomField=findCustomField;

async function findRecordEditIcon(driver,screenshotPath){
    let recordEditIcon;
    try{
        recordEditIcon = await driver.findElement(By.xpath('//i[@class="icon-pencil2"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RecordEditIcon_NotFound.png');
        await assert.fail('Due to the record edit icon is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RecordEditIcon_NotFound.png\'.');
    }
    return recordEditIcon;
}exports.findRecordEditIcon=findRecordEditIcon;

async function findAllRecordsDeletedOrRestored(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const allRecordsDeletedOrRestored = await driver.findElements(By.xpath('//div[@row-index="0"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return allRecordsDeletedOrRestored;
}exports.findAllRecordsDeletedOrRestored=findAllRecordsDeletedOrRestored;

async function findDealListButton(driver,screenshotPath){
    let dealListButton;
    try{
        dealListButton = await driver.findElement(By.xpath('//button[@tooltip="List"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DealListButton_NotFound.png');
        await assert.fail('Due to the deal list button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DealListButton_NotFound.png\'.');
    }
    return dealListButton;
}exports.findDealListButton=findDealListButton;

async function findQuickAddBtn(driver,screenshotPath){
    let quickAddBtn;
    try{
        quickAddBtn = await driver.findElement(By.xpath('//span[@class="icon-ic_quick_add top-icon"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'QuickAddBtn_NotFound.png');
        await assert.fail('Due to the quick add button button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'QuickAddBtn_NotFound.png\'.');
    }
    return quickAddBtn;
}exports.findQuickAddBtn=findQuickAddBtn;

async function findQuickAddModuleBtn(driver,screenshotPath,moduleName){
    let quickAddModuleBtn;
    try{
        quickAddModuleBtn = await driver.findElement(By.xpath('//popper-content/descendant::ul[@class="w popperdropmenu"]/descendant::a[contains(text(),"'+moduleName+'")]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+moduleName+'QuickAddBtn_NotFound.png');
        await assert.fail('Due to the '+moduleName+' quick add button button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+moduleName+'QuickAddBtn_NotFound.png\'.');
    }
    return quickAddModuleBtn;
}exports.findQuickAddModuleBtn=findQuickAddModuleBtn;

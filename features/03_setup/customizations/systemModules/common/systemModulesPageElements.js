const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of system modules page on the browser 
 *  and then return those elements 
*/

async function findModuleEditBtn(driver,screenshotPath,systemModuleName){
    let moduleEditBtn;

    try{
        moduleEditBtn = await driver.findElement(By.xpath('//div[contains(text(),"'+systemModuleName+'")]/descendant::button[1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+systemModuleName+'EditBtn_NotFound.png');
        await assert.fail('Due to the edit button of '+systemModuleName+' module is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+systemModuleName+'EditBtn_NotFound.png\'.');
    }

    await driver.wait(until.elementIsEnabled(moduleEditBtn));
    return moduleEditBtn;
}exports.findModuleEditBtn=findModuleEditBtn;

async function findSingularTextbox(driver,screenshotPath){
    let singularTextbox;

    try{
        singularTextbox = await driver.findElement(By.id('singularName'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SingularTextbox_NotFound.png');
        await assert.fail('Due to the singular textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SingularTextbox_NotFound.png\'.');
    }

    await driver.wait(until.elementIsVisible(singularTextbox));
    return singularTextbox;
}exports.findSingularTextbox=findSingularTextbox;

async function findPluralTextbox(driver,screenshotPath){
    let pluralTextbox;

    try{
        pluralTextbox = await driver.findElement(By.id('pluralName'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'PluralTextbox_NotFound.png');
        await assert.fail('Due to the plural textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'PluralTextbox_NotFound.png\'.');
    }

    await driver.wait(until.elementIsVisible(pluralTextbox));
    return pluralTextbox;
}exports.findPluralTextbox=findPluralTextbox;

async function findCancelBtn(driver,screenshotPath){
    let cancelBtn;

    try{
        cancelBtn = await driver.findElement(By.partialLinkText('Cancel'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CancelBtn_NotFound.png');
        await assert.fail('Due to the cancel button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CancelBtn_NotFound.png\'.');
    }

    await driver.wait(until.elementIsEnabled(cancelBtn));
    return cancelBtn;
}exports.findCancelBtn=findCancelBtn;

async function findSaveBtn(driver,screenshotPath){
    let saveBtn;

    try{
        saveBtn = await driver.findElement(By.id('saveBtnField'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SaveBtn_NotFound.png');
        await assert.fail('Due to the save button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SaveBtn_NotFound.png\'.');
    }

    await driver.wait(until.elementIsEnabled(saveBtn));
    return saveBtn;
}exports.findSaveBtn=findSaveBtn;

async function findModuleNamesOnListPage(driver){
    const moduleNamesOnListPage = await driver.findElements(By.xpath('//div[@class="list-group-item cursor-move ui-sortable-handle"]'));
    return moduleNamesOnListPage;
}exports.findModuleNamesOnListPage=findModuleNamesOnListPage;

async function findProfileName(driver,profileName){
    await driver.manage().setTimeouts({implicit:15000});
    const profile = await driver.findElements(By.xpath('//td[text()="'+profileName+'"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return profile;
}exports.findProfileName=findProfileName;

async function findViewToggle(driver,screenshotPath,profileName){
    let viewToggle;

    try{
        viewToggle = await driver.findElement(By.xpath('//td[text()="'+profileName+'"]/following::input[@id="switch_Standard_access"][1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_ViewToggleBtn_NotFound.png');
        await assert.fail('Due to the view toggle button of \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_ViewToggleBtn_NotFound.png\'.');
    }

    return viewToggle;
}exports.findViewToggle=findViewToggle;

async function findCreateToggle(driver,screenshotPath,profileName){
    let createToggle;

    try{
        createToggle = await driver.findElement(By.xpath('//td[text()="'+profileName+'"]/following::input[@id="switch_Standard_add"][1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_CreateToggleBtn_NotFound.png');
        await assert.fail('Due to the create toggle button of \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_CreateToggleBtn_NotFound.png\'.');
    }

    return createToggle;
}exports.findCreateToggle=findCreateToggle;

async function findEditToggle(driver,screenshotPath,profileName){
    let editToggle;

    try{
        editToggle = await driver.findElement(By.xpath('//td[text()="'+profileName+'"]/following::input[@id="switch_Standard_edit"][1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_EditToggleBtn_NotFound.png');
        await assert.fail('Due to the edit toggle button of \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_EditToggleBtn_NotFound.png\'.');
    }

    return editToggle;
}exports.findEditToggle=findEditToggle;

async function findDeleteToggle(driver,screenshotPath,profileName){
    let deleteToggle;

    try{
        deleteToggle = await driver.findElement(By.xpath('//td[text()="'+profileName+'"]/following::input[@id="switch_Standard_delete"][1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_DeleteToggleBtn_NotFound.png');
        await assert.fail('Due to the delete toggle button of \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_DeleteToggleBtn_NotFound.png\'.');
    }

    return deleteToggle;
}exports.findDeleteToggle=findDeleteToggle;

async function findProductInstallBtn(driver){
    await driver.manage().setTimeouts({implicit:15000});
    const productInstallBtn = await driver.findElements(By.xpath('//h4[contains(text(),"Products")]/following::a[contains(text(),"Install")][1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return productInstallBtn;
}exports.findProductInstallBtn=findProductInstallBtn;

async function findProductConfigureBtn(driver){
    await driver.manage().setTimeouts({implicit:15000});
    const productConfigureBtn = await driver.findElements(By.xpath('//a[@class="h4"][contains(text(),"Products")]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return productConfigureBtn;
}exports.findProductConfigureBtn=findProductConfigureBtn;

async function findProductRemoveBtn(driver,screenshotPath){
    let productRemoveBtn;

    try{
        productRemoveBtn = await driver.findElement(By.id('btnRemove'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductRemoveBtn_NotFound.png');
        await assert.fail('Due to the 05_product remove button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ProductRemoveBtn_NotFound.png\'.');
    }

    await driver.wait(until.elementIsEnabled(productRemoveBtn));
    return productRemoveBtn;
}exports.findProductRemoveBtn=findProductRemoveBtn;

async function findModuleNameForDragAndDrop(driver,moduleName){
    await driver.manage().setTimeouts({implicit:15000});
    const moduleNameForDragAndDrop = await driver.findElements(By.xpath('//div[@id="module"]/descendant::div[contains(text(),"'+moduleName+'")]/ancestor::div[@class="list-group-item cursor-move ui-sortable-handle"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return moduleNameForDragAndDrop;
}exports.findModuleNameForDragAndDrop=findModuleNameForDragAndDrop;
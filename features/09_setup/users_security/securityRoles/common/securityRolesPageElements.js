const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of security roles page on the browser 
 *  and then return those elements 
*/

async function findAddRoleBtn(driver,screenshotPath,reportingRoleName){
    let addRoleBtn;

    try{
        addRoleBtn = await driver.findElement(By.xpath(`//span[contains(text(),"${reportingRoleName }")]/descendant::a[1]`));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AddRoleBtn_NotFound.png');
        await assert.fail('Due to the add role button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddRoleBtn_NotFound.png\'.');
    }
    
    return addRoleBtn;
}exports.findAddRoleBtn=findAddRoleBtn;

async function findEditRoleBtn(driver,screenshotPath,roleName){
    let editRoleBtn;

    try{
        editRoleBtn = await driver.findElements(By.xpath(`//span[contains(text(),"${roleName}")]/descendant::a[2]`));

    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EditRoleBtn_NotFound.png');
        await assert.fail('Due to the edit role button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'EditRoleBtn_NotFound.png\'.');
    }
    
    return editRoleBtn;
}exports.findEditRoleBtn=findEditRoleBtn;

async function findDeleteRoleBtn(driver,screenshotPath,roleName){
    let deleteRoleBtn;

    try{
        deleteRoleBtn = await driver.findElements(By.xpath(`//span[contains(text(),"${roleName}")]/descendant::a[3]`));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DeleteRoleBtn_NotFound.png');
        await assert.fail('Due to the delete role button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DeleteRoleBtn_NotFound.png\'.');
    }
    
    return deleteRoleBtn;
}exports.findDeleteRoleBtn=findDeleteRoleBtn;

async function findTransferDeleteBtn(driver,screenshotPath){
    let transferDeleteBtn;

    try{
        transferDeleteBtn = await driver.findElement(By.id('btnSubmit'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'TransferDeleteBtn_NotFound.png');
        await assert.fail('Due to the transfer & delete  button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'TransferDeleteBtn_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsEnabled(transferDeleteBtn));
    return transferDeleteBtn;
}exports.findTransferDeleteBtn=findTransferDeleteBtn;

async function findRoleName(driver,screenshotPath,roleName){
    let roleNames;
    
    await driver.manage().setTimeouts({implicit:7000});
    try{
        roleNames = await driver.findElements(By.xpath('//span[contains(text(),"'+roleName+'")][@class="treeview-label"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+roleName+'Role_NotFound.png');
        await assert.fail('Due to the provided '+roleName+' role is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+roleName+'Role_NotFound.png\'.');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    return roleNames;
}exports.findRoleName=findRoleName;

async function findRoleNameTextbox(driver,screenshotPath){
    let roleNameTextbox;

    try{
        roleNameTextbox = await driver.findElement(By.id('name'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RoleNameTextbox_NotFound.png');
        await assert.fail('Due to the role name text box is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RoleNameTextbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(roleNameTextbox));
    return roleNameTextbox;
}exports.findRoleNameTextbox=findRoleNameTextbox;

async function findRoleDescriptionTextbox(driver,screenshotPath){
    let roleDescriptionTextbox;

    try{
        roleDescriptionTextbox = await driver.findElement(By.id('description'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RoleDescriptionTextbox_NotFound.png');
        await assert.fail('Due to the role description textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RoleDescriptionTextbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(roleDescriptionTextbox));
    return roleDescriptionTextbox;
}exports.findRoleDescriptionTextbox=findRoleDescriptionTextbox;

async function findShareWithPeersCheckbox(driver,screenshotPath){
    let shareWithPeersCheckbox;

    try{
        shareWithPeersCheckbox = await driver.findElement(By.id('shareView'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ShareWithPeersCheckbox_NotFound.png');
        await assert.fail('Due to the share with peers checkbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ShareWithPeersCheckbox_NotFound.png\'.');
    }
    
    return shareWithPeersCheckbox;
}exports.findShareWithPeersCheckbox=findShareWithPeersCheckbox;

async function findCancelBtn(driver,screenshotPath){
    let cancelBtn;

    try{
        cancelBtn = await driver.findElement(By.xpath('//div[@class="modal-footer"]/button'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CancelBtn_NotFound.png');
        await assert.fail('Due to the cancel button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CancelBtn_NotFound.png\'.');
    }

    return cancelBtn;
}exports.findCancelBtn=findCancelBtn;
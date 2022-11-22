const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of activity types page on the browser 
 *  and then return those elements 
*/

async function findPageTitle(driver,screenshotPath){
    let pageTitle;

    try{
        pageTitle = await driver.findElement(By.css('div[class="sub-title pull-left"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'PageTitle_NotFound.png');
        await assert.fail('Due to the page title is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'PageTitle_NotFound.png\'.');
    }
    return pageTitle;
}exports.findPageTitle=findPageTitle;

async function findAddActivityTypeBtn(driver,screenshotPath){
    let addActivityTypeBtn;

    try{
        addActivityTypeBtn = await driver.findElement(By.xpath('//button[text()=" Activity Type "]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AddActivityType_NotFound.png');
        await assert.fail('Due to the add activity type button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddActivityType_NotFound.png\'.');
    }
    return addActivityTypeBtn;
}exports.findAddActivityTypeBtn=findAddActivityTypeBtn;

async function findActivityIcon(driver,screenshotPath){
    let activityIcon;

    try{
        activityIcon = await driver.findElement(By.xpath('//button[@class="btn btn-default"]/child::span[@class="activityType19"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ActivityIcon_NotFound.png');
        await assert.fail('Due to the activity icon is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ActivityIcon_NotFound.png\'.');
    }
    return activityIcon;
}exports.findActivityIcon=findActivityIcon;

async function findSaveBtn(driver,screenshotPath){
    let saveButton;

    try{
        saveButton = await driver.findElement(By.id('saveButtonField'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SaveButton_NotFound.png');
        await assert.fail('Due to the save button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SaveButton_NotFound.png\'.');
    }
    return saveButton;
}exports.findSaveBtn=findSaveBtn;

async function findActivityIconChange(driver,screenshotPath){
    let activityIcon;

    try{
        activityIcon = await driver.findElement(By.xpath('//ngb-modal-window//manage-activity-type-dialog//div[1]/div[2]/button[5]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ActivityIcon_NotFound.png');
        await assert.fail('Due to the activity icon is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ActivityIcon_NotFound.png\'.');
    }
    return activityIcon;
}exports.findActivityIconChange=findActivityIconChange;

async function findNameField(driver,screenshotPath){
    let nameField;

    try{
        nameField = await driver.findElement(By.id('nameField'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NameField_NotFound.png');
        await assert.fail('Due to the name field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'NameField_NotFound.png\'.');
    }
    return nameField;
}exports.findNameField=findNameField;

async function findCommunicationCheckbox(driver,screenshotPath){
    let communicationCheckbox;

    try{
        communicationCheckbox = await driver.findElement(By.id('checkboxField'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CommunicationCheckbox_NotFound.png');
        await assert.fail('Due to the communication checkbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CommunicationCheckbox_NotFound.png\'.');
    }

    return communicationCheckbox;
}exports.findCommunicationCheckbox=findCommunicationCheckbox;

async function findAddOrUpdateTypeBtn(driver,screenshotPath){
    let addOrUpdateTypeBtn;

    try{
        addOrUpdateTypeBtn = await driver.findElement(By.id('saveButtonField'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AddOrUpdateTypeBtn_NotFound.png');
        await assert.fail('Due to the add or update type button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddOrUpdateTypeBtn_NotFound.png\'.');
    }
    return addOrUpdateTypeBtn;
}exports.findAddOrUpdateTypeBtn=findAddOrUpdateTypeBtn;

async function findNamefromListPage(driver,typeName){
    await driver.manage().setTimeouts({implicit:20000});
    const name = await driver.findElements(By.xpath('//span[@class="m-l-xs default-text"][text()="'+typeName+'"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return name;
}exports.findNamefromListPage=findNamefromListPage;

async function findAllNamesfromListPage(driver){
    await driver.manage().setTimeouts({implicit:20000});
    const names = await driver.findElements(By.xpath('//span[@class="m-l-xs default-text"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return names;
}exports.findAllNamesfromListPage=findAllNamesfromListPage;

async function findEditBtn(driver){
    await driver.manage().setTimeouts({implicit:20000});
    const editBtn = await driver.findElement(By.xpath('//span[text()="Activity01"]//following::i'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editBtn;
}exports.findEditBtn=findEditBtn;

async function findEditButton(driver){
    await driver.manage().setTimeouts({implicit:20000});
    const editBtn = await driver.findElement(By.xpath('//span[text()="Presentation Auto"]//following::i'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editBtn;
}exports.findEditButton=findEditButton;


async function findDisabledEditBtn(driver,typeName){
    await driver.manage().setTimeouts({implicit:20000});
    const editBtn = await driver.findElements(By.xpath('//span[@class="m-l-xs default-text"][text()="'+typeName+'"]/following::button[@class="btn btn-default pull-right m-r-sm disabled"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editBtn;
}exports.findDisabledEditBtn=findDisabledEditBtn;

async function findDisabledDeactivateBtn(driver,typeName){
    await driver.manage().setTimeouts({implicit:20000});
    const deactivateBtn = await driver.findElements(By.xpath('//span[@class="m-l-xs default-text"][text()="'+typeName+'"]/following::span[@class="show-tooltip-for-disabled pull-right"][2]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deactivateBtn;
}exports.findDisabledDeactivateBtn=findDisabledDeactivateBtn;

async function findCancelBtn(driver,screenshotPath){
    let cancelBtn;

    try{
        cancelBtn = await driver.findElement(By.xpath('//button[@class="btn btn-default pull-right m-l-sm"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CancelBtn_NotFound.png');
        await assert.fail('Due to the cancel button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CancelBtn_NotFound.png\'.');
    }
    return cancelBtn;
}exports.findCancelBtn=findCancelBtn;

async function findOutcomeCancelBtn(driver,screenshotPath){
    let cancelBtn;

    try{
        cancelBtn = await driver.findElement(By.xpath('//button[@class="close close-dialog-button-test"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CancelBtn_NotFound.png');
        await assert.fail('Due to the cancel button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CancelBtn_NotFound.png\'.');
    }
    return cancelBtn;
}exports.findOutcomeCancelBtn=findOutcomeCancelBtn;

async function findDeactivateBtn(driver,screenshotPath,typeName){
    let deactivateBtn;

    await driver.manage().setTimeouts({implicit:15000});
    try{
        deactivateBtn = await driver.findElement(By.id(typeName));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DeactivateBtn_'+typeName.replace(/\s/g,'_')+'_Type_NotFound.png');
        await assert.fail('Due to the deactivate button of '+typeName+' is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DeactivateBtn_'+typeName.replace(/\s/g,'_')+'_Type_NotFound.png\'.');
    }
    return deactivateBtn;
}exports.findDeactivateBtn=findDeactivateBtn;

async function findActivateBtn(driver,screenshotPath,typeName){
    let activateBtn;

    await driver.manage().setTimeouts({implicit:15000});
    try{
        activateBtn = await driver.findElement(By.id(typeName));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ActivateBtn_'+typeName.replace(/\s/g,'_')+'_Type_NotFound.png');
        await assert.fail('Due to the activate button of '+typeName+' is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ActivateBtn_'+typeName.replace(/\s/g,'_')+'_Type_NotFound.png\'.');
    }
    return activateBtn;
}exports.findActivateBtn=findActivateBtn;

async function findTypeNameForDragAndDrop(driver,typeName){
    await driver.manage().setTimeouts({implicit:15000});
    const typeNameForDragAndDrop = await driver.findElements(By.xpath('//span[@class="m-l-xs default-text"][text()="'+typeName+'"]/ancestor::li[@class="list-group-item cursor-move wrapper ui-sortable-handle"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return typeNameForDragAndDrop;
}exports.findTypeNameForDragAndDrop=findTypeNameForDragAndDrop;

async function findOutcomeForDragAndDrop(driver){
    await driver.manage().setTimeouts({implicit:15000});
    const outcomeForDragAndDrop = await driver.findElements(By.xpath('//li[@class="clearfix pos-rlt"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return outcomeForDragAndDrop;
}exports.findOutcomeForDragAndDrop=findOutcomeForDragAndDrop;

async function findTrashButton(driver){
    await driver.manage().setTimeouts({implicit:15000});
    const trashButton = await driver.findElement(By.xpath('//ul[@id="outcomes"]/li[1]//i'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return trashButton;
}exports.findTrashButton=findTrashButton;

async function findActiveOrInactiveTabName(driver,screenshotPath,tabName){
    let activeOrInactiveTabName;

    try{
        activeOrInactiveTabName = await driver.findElement(By.xpath('//a[text()="'+tabName+'"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+tabName+'_Tab_NotFound.png');
        await assert.fail('Due to the '+tabName+' tab is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+tabName+'_Tab_NotFound.png\'.');
    }
    return activeOrInactiveTabName;
}exports.findActiveOrInactiveTabName=findActiveOrInactiveTabName;

async function findManageOutcomesBtn(driver,screenshotPath,typeName){
    let manageOutcomesBtn;

    await driver.manage().setTimeouts({implicit:15000});
    try{
        manageOutcomesBtn = await driver.findElement(By.xpath('//span[text()="'+typeName+'"]/following::button[@class="btn btn-default pull-right manage-outcomes-button-test"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ManageOutcomesBtn_'+typeName.replace(/\s/g,'_')+'_NotFound.png');
        await assert.fail('Due to the manage outcomes button of '+typeName+' is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ManageOutcomesBtn_'+typeName.replace(/\s/g,'_')+'_NotFound.png\'.');
    }
    return manageOutcomesBtn;
}exports.findManageOutcomesBtn=findManageOutcomesBtn;

async function findAddOutcomeTextbox(driver,screenshotPath){
    let addOutcomeTextbox;

    try{
        addOutcomeTextbox = await driver.findElement(By.name('addNewOutcome'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AddOutcomeTextbox_NotFound.png');
        await assert.fail('Due to the add outcome textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddOutcomeTextbox_NotFound.png\'.');
    }
    return addOutcomeTextbox;
}exports.findAddOutcomeTextbox=findAddOutcomeTextbox;

async function findOutcomes(driver){
    await driver.manage().setTimeouts({implicit:15000});
    const name = await driver.findElements(By.name('name'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return name;
}exports.findOutcomes=findOutcomes;
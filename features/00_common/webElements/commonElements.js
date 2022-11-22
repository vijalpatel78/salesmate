const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../cucumber_config/cucumber_config').elementSearchTimeout;
let count = 0;

/* Note: This file will contain those elements which will be common between the features */

//all these following functions will find an element on the browser and return that element

//----------------------------------- User Profile Menu -----------------------------------

async function findUserProfileThumbview(driver,screenshotPath){
    let userProfileThumbview;

    try{    
        userProfileThumbview = await driver.findElement(By.className('dropdown navi-user-thumb t-f-tr'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'userProfileThumbview_NotFound.png');
        await assert.fail('Due to the user profile thumbview is not found, the test case has been failed'); 
    }
    return userProfileThumbview;
}exports.findUserProfileThumbview=findUserProfileThumbview;

async function findMyAccountMenuBtn(driver,screenshotPath){
    let myAccountMenuBtn;

    try{
       myAccountMenuBtn = await driver.findElement(By.css('a[href="#/app/user/generalSettings"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'MyAccountMenuBtn_NotFound.png');
        await assert.fail('Due to the my account menu button is not found, the test case has been failed'); 
    }
    return myAccountMenuBtn;
}exports.findMyAccountMenuBtn=findMyAccountMenuBtn;

async function findSetupMenuBtn(driver,screenshotPath){
    let setupMenuBtn;

    try{
        setupMenuBtn = await driver.findElement(By.css('a[href="#/app/setup/home"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SetupMenuBtn_NotFound.png');
        await assert.fail('Due to the setup menu button is not found, the test case has been failed');
    }
    return setupMenuBtn;
}exports.findSetupMenuBtn=findSetupMenuBtn;

async function findSubscriptionText(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const subscriptionText = await driver.findElements(By.xpath('//h6[text()="Current Subscription"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return subscriptionText;
}exports.findSubscriptionText=findSubscriptionText;

//----------------------My Account Module Side Navbar Features-------------------------------

async function findMyAccountModuleFeature(driver,screenshotPath,featureName){
    let myAccountModuleFeature;

    try{
        myAccountModuleFeature = await driver.findElement(By.xpath(`a[text()="${featureName}"]`));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'myAccountModuleFeature_NotFound.png');
        await assert.fail('Due to the my account module features are not found, the test case has been failed');
    }
    return myAccountModuleFeature;
}exports.findMyAccountModuleFeature=findMyAccountModuleFeature;

//-------------------------------------- Noty Message ---------------------------------------

async function findNotyMessage(driver,screenshotPath){
    let notyMessage;
    ++count;
    await driver.manage().setTimeouts({implicit:5000});
    try{
        notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NotyMessage_NotFound_'+count+'.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the noty message is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'NotyMessage_NotFound_'+count+'.png\'.');
    }
    return notyMessage;
}exports.findNotyMessage=findNotyMessage;

async function findViewLinkOnNotyMessage(driver,screenshotPath){
    let viewLink;
    ++count;

    await driver.manage().setTimeouts({implicit:40000});
    try{
        viewLink = await driver.findElement(By.xpath('//div[@class="noty_buttons"]/child::button[@id="button-2"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ViewLink_OnNotyMessage_NotFound_'+count+'.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the view link is not found on the noty message, the test case has been failed. Screenshot Name: \''+screenshotPath+'ViewLink_OnNotyMessage_NotFound_'+count+'.png\'.');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return viewLink;
}exports.findViewLinkOnNotyMessage=findViewLinkOnNotyMessage;

async function findNotyMessageInRareCase(driver){
    await driver.manage().setTimeouts({implicit:30000});

    const notyMessageInRareCase = await driver.findElements(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    if(notyMessageInRareCase.length>0){
        await driver.sleep(2000);
    }
    
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return notyMessageInRareCase;
}exports.findNotyMessageInRareCase=findNotyMessageInRareCase;

//--------------------------------- Field Validation Message ---------------------------------

async function findFieldValidationElement(driver,screenshotPath,field){
    let fieldValidationElement;
    ++count;

    try{
        fieldValidationElement = await field.findElement(By.xpath('following::sm-validation-messages[1]/div[1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FieldValidationElement_NotFound_'+count+'.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the field validation element is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'FieldValidationElement_NotFound_'+count+'.png\'');
    }
    return fieldValidationElement;
}exports.findFieldValidationElement=findFieldValidationElement;

//------------------------------------------- Setup ------------------------------------------

async function findSetupSubmenuBtn(driver,screenshotPath,setupSubmenuDisplayName){
    let setupSubmenuBtn;

    await driver.manage().setTimeouts({implicit:7000});
    try{
        setupSubmenuBtn = await driver.findElements(By.partialLinkText(setupSubmenuDisplayName.trim()));    
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+setupSubmenuDisplayName.trim()+'_SetupSubmenuBtn_NotFound.png');
        await assert.fail('Due to the '+setupSubmenuDisplayName.trim()+' submenu button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+setupSubmenuDisplayName.trim()+'_SetupSubmenuBtn_NotFound.png\'');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    return setupSubmenuBtn;
}exports.findSetupSubmenuBtn=findSetupSubmenuBtn;

//-------------------------------------- Link Element ----------------------------------------

async function findLinkElement(driver,screenshotPath,linkName){
    let link;
    
    try{
        link = await driver.findElement(By.linkText(linkName));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+linkName.replace(/\s/g,'_')+'_Link_NotFound.png');
        await assert.fail('Due to the \''+linkName+'\' link is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+linkName.replace(/\s/g,'_')+'_Link_NotFound.png\'');
    }
    
    return link;
}exports.findLinkElement=findLinkElement;

//-------------------------------------- Toggle Button ----------------------------------------

async function findToggleButton(driver,screenshotPath,id){
    let toggleButton;
    
    try{
        toggleButton = await driver.findElement(By.id(id));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+id+'_ToggleBtn_NotFound.png');
        await assert.fail('Due to the \''+id+'\' toggle button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+id+'_ToggleBtn_NotFound.png\'');
    }
    
    return toggleButton;
}exports.findToggleButton=findToggleButton;

//-------------------------------------- Module Menu Button ----------------------------------------

async function findModuleMenu(driver,screenshotPath,classAttributeOfModuleIcon){
    let moduleMenu;
    
    try{
        moduleMenu = await driver.findElement(By.xpath('//span[@class="'+classAttributeOfModuleIcon+'"]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+classAttributeOfModuleIcon+'_MenuBtn_NotFound.png');
        await assert.fail('Due to the \''+classAttributeOfModuleIcon+'\' menu button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+classAttributeOfModuleIcon+'_MenuBtn_NotFound.png\'.');
    }
    
    return moduleMenu;
}exports.findModuleMenu=findModuleMenu;

//---------------------------------------- Custom View  ---------------------------------------------

async function findCustomView(driver,screenshotPath){
    let customView;
    
    try{
        customView = await driver.findElement(By.xpath('//div[@class="custom-view-popover pos-rlt arrow-left-corner t-f-tl"]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CustomView_NotFound.png');
        await assert.fail('Due to the custom view is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CustomView_NotFound.png\'.');
    }
    
    return customView;
}exports.findCustomView=findCustomView;

async function findCustomViewName(driver,screenshotPath,customViewName){
    let customViewNameElem;
    
    try{
        customViewNameElem = await driver.findElement(By.xpath('//a[contains(text(),"'+customViewName+'")]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+customViewName.replace(/\s/g,'_')+'CustomView_NotFound.png');
        await assert.fail('Due to the \''+customViewName+'\' custom view is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+customViewName.replace(/\s/g,'_')+'CustomView_NotFound.png\'.');
    }
    
    return customViewNameElem;
}exports.findCustomViewName=findCustomViewName;

//-------------------------------------- Grid  ----------------------------------------

async function findSelectAllRecordsCheckbox(driver,screenshotPath){
    let selectAllRecordsCheckbox;
    
    try{
        selectAllRecordsCheckbox = await driver.findElement(By.xpath('//div[@class="ag-header ag-pivot-off"]/descendant::input[@type="checkbox"][@class="ng-untouched ng-pristine ng-valid"]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SelectAllRecordsCheckbox_NotFound.png');
        await assert.fail('Due to the select all records checkbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SelectAllRecordsCheckbox_NotFound.png\'.');
    }
    
    return selectAllRecordsCheckbox;
}exports.findSelectAllRecordsCheckbox=findSelectAllRecordsCheckbox;
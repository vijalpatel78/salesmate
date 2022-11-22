const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of Apps page on the browser 
 *  and then return those elements 
*/

async function findAppConfigurationLink(driver,appName){
    await driver.manage().setTimeouts({implicit:10000});
    const appConfigurationLink = await driver.findElements(By.linkText(appName.trim()));    
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return appConfigurationLink;
}exports.findAppConfigurationLink=findAppConfigurationLink;

async function findAppInstallBtn(driver,appName){
    await driver.manage().setTimeouts({implicit:5000});
    const appInstallBtn = await driver.findElements(By.xpath('//h4[contains(text(),"'+appName+'")]/following-sibling::a'));    
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return appInstallBtn;
}exports.findAppInstallBtn=findAppInstallBtn;

async function findAppRemoveBtn(driver,screenshotPath){
    let removeBtn;

    await driver.manage().setTimeouts({implicit:20000});
    try{
        removeBtn = await driver.findElement(By.id('btnRemove'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AppRemoveBtn_NotFound.png');
        await assert.fail('Due to the app remove button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AppRemoveBtn_NotFound.png\'.');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    await driver.wait(until.elementIsEnabled(removeBtn));
    return removeBtn;
}exports.findAppRemoveBtn=findAppRemoveBtn;

async function findAppsTab(driver,screenshotPath){
    let appsTab;
    
    try{
        appsTab = await driver.findElement(By.css('a[href="#/app/setup/apps"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AppsTab_NotFound.png');
        await assert.fail('Due to the apps tab is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AppsTab_NotFound.png\'.');
    }
    
    return appsTab;
}exports.findAppsTab=findAppsTab;

async function findEmailTrackingAppOption(driver,screenshotPath,toggleIdAttribute){
    let emailTrackingAppOption;
    
    try{
        emailTrackingAppOption = await driver.findElement(By.id(toggleIdAttribute));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+toggleIdAttribute+'_EmailTrackingAppOption_NotFound.png');
        await assert.fail('Due to the '+toggleIdAttribute+' email tracking app option is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+toggleIdAttribute+'_EmailTrackingAppOption_NotFound.png\'');
    }
    
    await driver.wait(until.elementIsEnabled(emailTrackingAppOption)); 
    return emailTrackingAppOption;
}exports.findEmailTrackingAppOption=findEmailTrackingAppOption;

async function findInstalledApp(driver,appName){
    await driver.manage().setTimeouts({implicit:7000});
    const installedApp = await driver.findElements(By.xpath('//h3[text()="Installed Apps"]/following-sibling::ul/descendant::a[text()="'+appName+'"]'));    
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return installedApp;
}exports.findInstalledApp=findInstalledApp;
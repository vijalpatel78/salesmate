const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const commonElementObj = require('../../common/appsPageElements');
const googleDrivePageElementObj = require('../common/googleDrivePageElements');
const commonActionObj = require('../../common/actions');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/googleDrive/screenshots/';
let expectedOption;

Given('the Google Drive app is uninstalled', async () =>{
    //will uninstall the Google Drive app
    await commonActionObj.uninstallApp(driver,screenshotPath,'Google Drive');
});

Given('the Google Drive app is installed', async () =>{
    //will install the Google Drive app
    await commonActionObj.installApp(driver,'Google Drive');
});

When('the user clicks on the Install button of Google Drive app', async () =>{
    //will install the Google Drive app
    await commonActionObj.installApp(driver,'Google Drive');
});

When('the user clicks on the Configure button of Google Drive app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Google Drive');
});

When('click on the Remove button', async () =>{
    //will find 'Remove' button and then will click on it
    const appRemoveBtn = await commonElementObj.findAppRemoveBtn(driver,screenshotPath);
    await appRemoveBtn.click();
    await driver.sleep(3000);
});

When('click on the {string} option', async (option) =>{
    let optionElem
    //will find the provided option
    if(option.toLowerCase() == 'read only'){
        expectedOption = 'read only';
        optionElem = await googleDrivePageElementObj.findOption(driver,screenshotPath,'sharingRight_ReadOnly');
    }else if(option.toLowerCase() == 'comment only'){
        expectedOption = 'comment only';
        optionElem = await googleDrivePageElementObj.findOption(driver,screenshotPath,'sharingRight_CommentOnly');
    }else if(option.toLowerCase() == 'allow editing'){
        expectedOption = 'allow editing';
        optionElem = await googleDrivePageElementObj.findOption(driver,screenshotPath,'sharingRight_Edit');
    }else{
        assert.fail('The provided \''+option+'\' option is not valid. The option should be one of these: \'Read Only, Comment Only, or Allow Editing\'.')
    }
    //will click on that option
    await optionElem.click()
    await driver.sleep(1000);
});

When('click on the Google Drive Integration link', async () =>{
    //will find the Drive Integration link and then will click on it
    const driveIntegrationLink = await googleDrivePageElementObj.findDriveIntegrationLink(driver,screenshotPath);
    await driveIntegrationLink.click();
    await driver.sleep(1000);
});

Then('the Google Drive app should get installed', async () =>{
    //will check the app is get installed or not
    try{
        await commonElementObj.findAppRemoveBtn(driver,screenshotPath);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GoogleDriveApp_Not_Installed.png');
        assert.fail('The google drive app is not getting installed. Screenshot Name: \''+screenshotPath+'GoogleDriveApp_Not_Installed.png\'.');
    }

    console.log('The google drive app has been installed successfully...');
    const appsTab = await commonElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Google Drive app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await commonElementObj.findAppInstallBtn(driver,'Google Drive');
    if(installBtn.length > 0){
        console.log('The google drive app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GoogleDriveApp_Not_Uninstalled.png');
        assert.fail('The google drive app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'GoogleDriveApp_Not_Uninstalled.png\'.');
    }
});

Then('the preferences of Google Drive app should get updated', async () =>{
    let actualValue;

    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Google Drive');
    await driver.sleep(2000);

    //will find the updated option and get the value
    if(expectedOption.toLowerCase() == 'read only'){
        actualValue = await driver.executeScript("return $('input#sharingRight_ReadOnly').prop('checked');");
    }else if(expectedOption.toLowerCase() == 'comment only'){
        actualValue = await driver.executeScript("return $('input#sharingRight_CommentOnly').prop('checked');");
    }else if(expectedOption.toLowerCase() == 'allow editing'){
        actualValue = await driver.executeScript("return $('input#sharingRight_Edit').prop('checked');");
    }
    
    //will check the Google Drive app setting is get updated or not
    try{
        assert.strictEqual(actualValue.toString(),'true');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GoogleDriveAppSettings_Not_Updated.png');
        assert.fail('The google drive app setting is not getting updated. Screenshot Name: \''+screenshotPath+'GoogleDriveAppSettings_Not_Updated.png\'.');
    }

    console.log('The google drive app setting is get updated with \''+expectedOption+'\' option...');
    const appsTab = await commonElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the support page', async () =>{
    //will get the current tab id
    const currentTab = await driver.getWindowHandle();
    //will get all tab id
    const numberOfTabs = await driver.getAllWindowHandles();

    //will move on the support page
    const supportURLTab = numberOfTabs[numberOfTabs.length - 1];
    await driver.switchTo().window(supportURLTab);
    //will get the support link URL
    const currentURL = await driver.getCurrentUrl();
    console.log("The current support doc url is: "+currentURL);
    
    //will check the support link URL is correct or not
    if(currentURL === 'https://support.salesmate.io/hc/en-us/articles/214296285-Google-Drive-Integration'){
        console.log("The system is redirected to the support page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SupportPage_NotFound.png');
        //will close the support page
        await driver.close();
        //will move back to the app page
        await driver.switchTo().window(currentTab);
        await driver.sleep(1000);
        await assert.fail('Due to the support page is not opened, the test case has been failed. Expected URL: \'https://support.salesmate.io/hc/en-us/articles/214296285-Google-Drive-Integration\' Screenshot Name: \''+screenshotPath+'SupportPage_NotFound.png\'.');
    }

    //will close the support page
    await driver.close();
    //will move back to the app page
    await driver.switchTo().window(currentTab);
    await driver.sleep(1000);
    const appsTab = await commonElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});
const {When,Then} = require('@cucumber/cucumber');
const assert = require('assert');
const zapierPageElementObj = require('../common/zapierPageElements');
const appsPageElementObj = require('../../common/appsPageElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements')
const commonActionObj = require('../../common/actions');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/zapier/screenshots/';

When('the user clicks on the Configure button of Zapier app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Zapier');
});

When('click on the clicking here link', async () =>{
    //will find the link and then will click on it
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'clicking here');
    await link.click();
    await driver.sleep(1000);
});

Then('the system should open Zapier configuration page', async () =>{
    //will find Zapier Configuration page
    await zapierPageElementObj.findZapierConfigurationElem(driver,screenshotPath);
    await driver.sleep(1000);
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the support page of Zapier app', async () =>{
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
    if(currentURL === 'https://support.salesmate.io/hc/en-us/articles/115000147105-Zapier-Integration'){
        console.log("The system is redirected to the support page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SupportPage_NotFound.png');
        //will close the support page
        await driver.close();
        //will move back to the app page
        await driver.switchTo().window(currentTab);
        await driver.sleep(1000);
        await assert.fail('Due to the support page is not opened, the test case has been failed. Expected URL: \'https://support.salesmate.io/hc/en-us/articles/115000147105-Zapier-Integration\' Screenshot Name: \''+screenshotPath+'SupportPage_NotFound.png\'.');
    }

    //will close the support page
    await driver.close();
    //will move back to the app page
    await driver.switchTo().window(currentTab);
    await driver.sleep(1000);
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});
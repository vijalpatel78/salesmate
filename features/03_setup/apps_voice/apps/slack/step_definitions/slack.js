const {Given,When,Then} = require('@cucumber/cucumber');
const { until } = require('selenium-webdriver');
const assert = require('assert');
const appsPageElementObj = require('../../common/appsPageElements');
const slackActionObj = require('../../../../../04_myAccount/slackPreferences/common/slackPreferencesPageElements');
const selectDropdownValueObj = require('../../../../../00_common/actions/fieldActions/selectDropdownValue')
const formElementObj = require('../../../../../00_common/webElements/formElements');
const commonActionObj = require('../../common/actions');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/slack/screenshots/';

Given('the Slack app is uninstalled', async () =>{
    //will uninstall the Slack app
    await commonActionObj.uninstallApp(driver,screenshotPath,'Slack Integration');
});

Given('the Slack app is installed', async () =>{
    //will install the Slack app
    await commonActionObj.installApp(driver,'Slack Integration');
});

When('the user clicks on the Configure button of Slack app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Slack Integration');
});

When('the user clicks on the Install button of Slack app', async () =>{
    //will install the Slack app
    await commonActionObj.installApp(driver,'Slack Integration');
    //will authorize the Slack app
    await slackActionObj.authorizeSlackApp(driver);
    await driver.sleep(2000);
});

When('update the Slack integration settings', async () =>{
    //will select the value from the respective dropdown
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'addDealSelectedChannelField','team1','yes');
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'wonDealSelectedChannelField','general','yes');
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'lostDealSelectedChannelField','random','yes');
});

Then('the Slack integration settings should get updated', async () =>{
    let fieldName;

    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Slack Integration');
    await driver.sleep(2000);

    //will get the current value of all fields
    const addDeal = await formElementObj.findDropdown(driver,screenshotPath,'addDealSelectedChannelField');
    const addDealValue = await addDeal.getText();
    const wonDeal = await formElementObj.findDropdown(driver,screenshotPath,'wonDealSelectedChannelField');
    const wonDealValue = await wonDeal.getText();
    const lostDeal = await formElementObj.findDropdown(driver,screenshotPath,'lostDealSelectedChannelField');
    const lostDealValue = await lostDeal.getText();

    //will check the settings is get updated or not
    try{
        fieldName = 'AddDeal';
        assert.strictEqual(addDealValue,'team1');
        fieldName = 'WonDeal';
        assert.strictEqual(wonDealValue,'general');
        fieldName = 'LostDeal';
        assert.strictEqual(lostDealValue,'random');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_FieldData_Not_Updated.png');
        assert.fail('The slack app settings is not getting updated. Screenshot Name: \''+screenshotPath+fieldName+'_FieldData_Not_Updated.png\'.');
    }
    
    console.log('The Slack app settings has been updated successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Slack app should get installed', async () =>{
    const authButton = await formElementObj.findButton(driver,screenshotPath,'btnAuthorize');
    await driver.wait(until.stalenessOf(authButton));
    
    //will check the app is get installed or not
    try{
        await formElementObj.findDropdown(driver,screenshotPath,'addDealSelectedChannelField');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SlackApp_Not_Installed.png');
        assert.fail('The Slack app is not getting installed. Screenshot Name: \''+screenshotPath+'SlackApp_Not_Installed.png\'.');
    }

    console.log('The Slack app has been installed successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Slack app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'Slack Integration');
    if(installBtn.length > 0){
        console.log('The Slack app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SlackApp_Not_Uninstalled.png');
        assert.fail('The Slack app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'SlackApp_Not_Uninstalled.png\'.');
    }
});
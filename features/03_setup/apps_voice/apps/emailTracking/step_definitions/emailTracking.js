const {When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const trackingPageObj = require('../common/emailTrackingPageElements');
const commonActionObj = require('../../common/actions');
const commonElementObj = require('../../common/appsPageElements')
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/emailTracking/screenshots/';
let expectedEmailTrackValue, expectedLinkTrackValue;

When('the user clicks on the Configure button of Email Tracking app', async () =>{
    //will find the 'Configure' button
    const configureBtn = await commonElementObj.findAppConfigurationLink(driver,'Email Open & Click Tracking');
    //will set focus on the app
    await driver.executeScript("arguments[0].scrollIntoView();",configureBtn[0]);
    await driver.wait(until.elementIsVisible(configureBtn[0]));
    //will click on the 'Configure' button
    await configureBtn[0].click();
    await driver.sleep(1000);
});

When('Email Tracking: {string}', async (value) =>{
    expectedEmailTrackValue = value.toLowerCase();
    //will find the email tracking option
    const emailTrackOption = await trackingPageObj.findEmailTrackingAppOption(driver,screenshotPath,'trackEmail');
    //will click on the email tracking option only if expected and current stage are different
    const currentStateOfEmailTrackOption = await emailTrackOption.getAttribute('value');
    if(currentStateOfEmailTrackOption.toLowerCase() != value.toLowerCase()){
        await driver.executeScript("arguments[0].click();",emailTrackOption);
    }else{
        console.log('The email tracking option is already \''+value+'\'...');
    }
    await driver.sleep(3000);
});

When('Link Tracking: {string}', async (value) =>{
    expectedLinkTrackValue = value.toLowerCase();
    //will find the link tracking option
    const linkTrackOption = await trackingPageObj.findEmailTrackingAppOption(driver,screenshotPath,'trackLink');
    //will click on the link tracking option only if expected and current stage are different
    const currentStateOfLinkTrackOption = await linkTrackOption.getAttribute('value');
    if(currentStateOfLinkTrackOption.toLowerCase() != value.toLowerCase()){
        await driver.executeScript("arguments[0].click();",linkTrackOption);
    }else{
        console.log('The link tracking option is already \''+value+'\'...');
    }
    await driver.sleep(3000);
});

Then('the email and link tracking preferences should get updated', async () =>{
    let option;

    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will find the 'Configure' button
    const configureBtn = await commonElementObj.findAppConfigurationLink(driver,'Email Open & Click Tracking');
    //will set focus on the app
    await driver.executeScript("arguments[0].scrollIntoView();",configureBtn[0]);
    await driver.wait(until.elementIsVisible(configureBtn[0]));
    //will click on the 'Configure' button
    await configureBtn[0].click();
    await driver.sleep(1000);

    //will find the email tracking option
    const emailTrackOption = await trackingPageObj.findEmailTrackingAppOption(driver,screenshotPath,'trackEmail');
    //will get the current value of email tracking option
    const actualEmailTrackValue = await emailTrackOption.getAttribute('value');
    //will find the link tracking option
    const linkTrackOption = await trackingPageObj.findEmailTrackingAppOption(driver,screenshotPath,'trackLink');
    //will get the current value of link tracking option
    const actualLinkTrackValue = await linkTrackOption.getAttribute('value');
    
    //will check the value of email and link tracking is get updated or not
    try{
        option = 'EmailTracking';
        assert.strictEqual(actualEmailTrackValue,expectedEmailTrackValue);
        option = 'LinkTracking';
        assert.strictEqual(actualLinkTrackValue,expectedLinkTrackValue);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+option+'_Not_Updated.png');
        assert.fail('The \''+option+'\' of email tracking app is not getting updated. Screenshot Name: \''+screenshotPath+option+'_Not_Updated.png\'.');
    }

    console.log('The email and link tracking preferences are get updated with Email tracking: \''+actualEmailTrackValue+'\' and Link tracking: \''+actualLinkTrackValue+'\'...')
    const appsTab = await commonElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the email tracking option should get updated', async () =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will find the 'Configure' button
    const configureBtn = await commonElementObj.findAppConfigurationLink(driver,'Email Open & Click Tracking');
    //will set focus on the app
    await driver.executeScript("arguments[0].scrollIntoView();",configureBtn[0]);
    await driver.wait(until.elementIsVisible(configureBtn[0]));
    //will click on the 'Configure' button
    await configureBtn[0].click();
    await driver.sleep(1000);

    //will find the email tracking option
    const emailTrackOption = await trackingPageObj.findEmailTrackingAppOption(driver,screenshotPath,'trackEmail');
    //will get the current value of email tracking option
    const actualEmailTrackValue = await emailTrackOption.getAttribute('value');

    //will check the value of email tracking is get updated or not
    try{
        assert.strictEqual(actualEmailTrackValue,expectedEmailTrackValue);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailTrackingOption_Not_Updated.png');
        assert.fail('The email tracking option is not getting updated. Screenshot Name: \''+screenshotPath+'EmailTrackingOption_Not_Updated.png\'.');
    }

    console.log('The email tracking option is get updated with \''+actualEmailTrackValue+'\'...')
    const appsTab = await commonElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the link tracking option should get updated', async () =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will find the 'Configure' button
    const configureBtn = await commonElementObj.findAppConfigurationLink(driver,'Email Open & Click Tracking');
    //will set focus on the app
    await driver.executeScript("arguments[0].scrollIntoView();",configureBtn[0]);
    await driver.wait(until.elementIsVisible(configureBtn[0]));
    //will click on the 'Configure' button
    await configureBtn[0].click();
    await driver.sleep(1000);

    //will find the link tracking option
    const linkTrackOption = await trackingPageObj.findEmailTrackingAppOption(driver,screenshotPath,'trackLink');
    //will get the current value of link tracking option
    const actualLinkTrackValue = await linkTrackOption.getAttribute('value');

    //will check the value of link tracking is get updated or not
    try{
        assert.strictEqual(actualLinkTrackValue,expectedLinkTrackValue);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'LinkTrackingOption_Not_Updated.png');
        assert.fail('The link tracking option is not getting updated. Screenshot Name: \''+screenshotPath+'LinkTrackingOption_Not_Updated.png\'.');
    }

    console.log('The link tracking option is get updated with \''+actualLinkTrackValue+'\'...')
    const appsTab = await commonElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});
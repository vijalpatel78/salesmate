const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of email preferences page on the browser 
 *  and then return those elements 
*/

async function findEmailSettingsTab(driver,screenshotPath){
    let emailSettingsTab;

    try{
        emailSettingsTab = await driver.findElement(By.css('a[href="#/app/user/emailSettings"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSettingsTab_NotFound.png');
        await assert.fail('Due to the email settings tab is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'EmailSettingsTab_NotFound.png\''); 
    }

    await driver.wait(until.elementIsVisible(emailSettingsTab));
    return emailSettingsTab;
}exports.findEmailSettingsTab=findEmailSettingsTab;

async function findEmailPreferencesTab(driver,screenshotPath){
    let emailPreferencesTab;

    try{
        emailPreferencesTab = await driver.findElement(By.css('a[href="#/app/user/emailSettings/preferences"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailPreferencesTab_NotFound.png');
        await assert.fail('Due to the email preferences tab is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'EmailPreferencesTab_NotFound.png\''); 
    }

    await driver.wait(until.elementIsVisible(emailPreferencesTab));
    return emailPreferencesTab;
}exports.findEmailPreferencesTab=findEmailPreferencesTab;

async function findSaveButton(driver,screenshotPath){
    let saveButton;

    try{
        saveButton = await driver.findElement(By.id('btnSubmit'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SaveButton_NotFound.png');
        await assert.fail('Due to the save button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SaveButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsEnabled(saveButton));
    return saveButton;
}exports.findSaveButton=findSaveButton;

async function findLinkEmailWithDealRadioButton(driver,screenshotPath,displayName){
    let linkEmailWithDealRadioButton;

    try{
        linkEmailWithDealRadioButton = await driver.findElement(By.xpath('//label[contains(text(),"'+displayName+'")]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'LinkEmailWithDealRadioButton_NotFound.png');
        await assert.fail('Due to the link_email_with_deal radio button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'LinkEmailWithDealRadioButton_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(linkEmailWithDealRadioButton));
    return linkEmailWithDealRadioButton;
}exports.findLinkEmailWithDealRadioButton=findLinkEmailWithDealRadioButton;

async function findDefaultEmailTrackingOption(driver,screenshotPath){
    let defaultEmailTrackingOption;

    await driver.manage().setTimeouts({implicit:5000});
    try{
        defaultEmailTrackingOption = await driver.findElements(By.id('notificationTrackingField'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DefaultEmailTrackingOption_NotFound.png');
        await assert.fail('Due to the default email tracking option is not found, this test case is not possible to execute. Screenshot Name: \''+screenshotPath+'DefaultEmailTrackingOption_NotFound.png\'');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    return defaultEmailTrackingOption;
}exports.findDefaultEmailTrackingOption=findDefaultEmailTrackingOption;

async function setFocusOnSection(driver,sectionName){
    await driver.sleep(1000);
    const setFocus = await driver.findElement(By.xpath('//h3[text()="'+sectionName+'"]'));
    await driver.executeScript("arguments[0].scrollIntoView();",setFocus);
    await driver.sleep(2000);
}exports.setFocusOnSection=setFocusOnSection;




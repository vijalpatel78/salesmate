const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const appsPageElementObj = require('../../common/appsPageElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const readUserDetailsObj = require('../../../../../00_common/actions/readExcelData');
const commonActionObj = require('../../common/actions');
const actionObj = require('../common/actions');
const selectDropdownValueObj = require('../../../../../00_common/actions/fieldActions/selectDropdownValue');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const linkEnvironment = require('../../../../../../cucumber_config/cucumber_config').linkEnvironment;
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/indiaMart/screenshots/';
let expectedMobile, expectedKey, expectedUser, currentUrl;

Given('the IndiaMart app is uninstalled', async () =>{
    //will uninstall the IndiaMart app
    await actionObj.uninstallApp(driver,screenshotPath,'IndiaMart');
});

Given('the IndiaMart app is installed', async () =>{
    //will install the IndiaMart app
    await commonActionObj.installApp(driver,'IndiaMart');
});

When('the user clicks on the Configure button of IndiaMart app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'IndiaMart');
});

When('the user clicks on the Install button of IndiaMart app', async () =>{
    //will install the IndiaMart app
    await commonActionObj.installApp(driver,'IndiaMart');
});

When('Mobile: {string}', async (mobileData) =>{
    //will find the Mobile field
    const mobile = await formElementsObj.findElementById(driver,screenshotPath,'mobile','mobileField');
    await clearFieldDataObj.clearFieldData(mobile);
    //will pass the new data
    await mobile.sendKeys(mobileData);
    expectedMobile = mobileData;
});

When('CRM Key: {string}', async (key) =>{
    //will find the CRM Key field
    const crmKey = await formElementsObj.findElementById(driver,screenshotPath,'crmKey','crmKey');
    await clearFieldDataObj.clearFieldData(crmKey);
    //will pass the new data
    await crmKey.sendKeys(key);
    expectedKey = key;
});

When('Owner: {string}', async (user) =>{
    let username, userDetails;
    //will get the full name of the provided user from the xlsx file 
    if(linkEnvironment.toLocaleLowerCase() === 'dev'){
        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
    }else{
        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx','UserDetails');
    }
    for(let i=0; i<userDetails.user.length; i++){
        if(userDetails.user[i].toLowerCase() == user.toLowerCase()){
            username = userDetails.fullName[i];
        }
    }
    //will select the specified user
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'owner',username,'no');
    expectedUser = username;
});

When('click on the Submit button', async () =>{
    //will find the Submit button
    const submitBtn = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Submit ');
    await submitBtn.click();
    await driver.wait(until.elementIsEnabled(submitBtn));
});

When('click on the IndiaMart help page link', async () =>{
    currentUrl = await driver.getCurrentUrl();
    //will find and click on the link
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'IndiaMart help page');
    await link.click();
    await driver.sleep(1000);
});

When('clicks on the Remove button', async () =>{
    //will find 'Remove' button and then will click on it
    const appRemoveBtn = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Remove ');
    await appRemoveBtn.click();
    await driver.sleep(2000);
    //will find and click on the 'Yes' button
    const yesBtn = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesBtn.click();
    await driver.sleep(1000);
});

Then('the IndiaMart app should get installed with {string} message', async (msg) =>{
    //will check the app is get installed or not
    await actionObj.checkUpdatedData(driver,screenshotPath,msg,expectedMobile,expectedKey,expectedUser);
    console.log('The IndiaMart app has been installed successfully with the \''+expectedMobile+','+expectedKey+','+expectedUser+'\' data...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the IndiaMart app should get updated with {string} message', async (msg) =>{
    //will check the settings is get updated or not
    await actionObj.checkUpdatedData(driver,screenshotPath,msg,expectedMobile,expectedKey,expectedUser);
    console.log('The IndiaMart app settings has been updated successfully with the \''+expectedMobile+','+expectedKey+','+expectedUser+'\' data...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should give the following validation message {string} and {string}', async (mobileValidation,keyValidation) =>{
    let fieldName;

    //will get the actual validation message of mobile and key fields
    const mobile = await formElementsObj.findElementById(driver,screenshotPath,'mobile','mobileField');
    const mobileValidationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,mobile);
    const actualMobileValidationMsg = await mobileValidationElem.getText();
    const crmKey = await formElementsObj.findElementById(driver,screenshotPath,'crmKey','crmKey');
    const keyValidationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,crmKey);
    const actualKeyValidationMsg = await keyValidationElem.getText();

    //will check the validation message is as per the expectation or not
    try{
        fieldName = 'Mobile';
        assert.strictEqual(actualMobileValidationMsg,mobileValidation);
        fieldName = 'Key';
        assert.strictEqual(actualKeyValidationMsg,keyValidation);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_FieldValidation_NotCorrect.png');
        assert.fail('Due to the \''+fieldName+'\' field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'_FieldValidation_NotCorrect.png\'.');
    }
    
    console.log('The \''+mobileValidation+'\' and \''+keyValidation+'\' validation messages are getting displayed...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the support page of IndiaMart app', async () =>{
    //will get the support Url
    const supportUrl = await driver.getCurrentUrl();
    console.log("The current support doc url is: "+supportUrl);

    //will check the support link URL is correct or not
    if(supportUrl === 'https://support.salesmate.io/hc/en-us/articles/115003217112'){
        console.log("The system is redirected to the support page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SupportPage_NotFound.png');
        //will go back to the Salesmate page
        await driver.get(currentUrl);
        await driver.sleep(1000);
        await assert.fail('Due to the support page is not opened, the test case has been failed. Expected URL: \'https://support.salesmate.io/hc/en-us/articles/115003217112\' Screenshot Name: \''+screenshotPath+'SupportPage_NotFound.png\'.');
    }

    //will go back to the Salesmate page
    await driver.get(currentUrl);
    await driver.sleep(2000);
    const submitButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Submit ');
    await submitButton.click();
    const cancelBtn = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Cancel ');
    await cancelBtn.click();
    await driver.sleep(1000);

});

Then('the IndiaMart app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'IndiaMart');
    if(installBtn.length > 0){
        console.log('The IndiaMart app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'IndiaMartApp_Not_Uninstalled.png');
        assert.fail('The IndiaMart app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'IndiaMartApp_Not_Uninstalled.png\'.');
    }
});
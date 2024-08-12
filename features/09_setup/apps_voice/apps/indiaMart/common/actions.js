const assert = require('assert');
const {until} = require('selenium-webdriver');
const appsPageElementObj = require('../../common/appsPageElements');
const commonActionObj = require('../../common/actions');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../../00_common/webElements/formElements');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');

async function checkUpdatedData(driver,screenshotPath,expectedMsg,expectedMobile,expectedKey,expectedUser){
    let fieldName;
    //will find the notification message 
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,expectedMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        assert.fail('Due to the success message is not given, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'');
    }
    console.log('The \''+expectedMsg+'\' message is getting displayed...');

    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'IndiaMart');

    //will find the mobile, key and owner fields
    const mobile = await formElementObj.findTextbox(driver,screenshotPath,'mobile');
    const crmKey = await formElementObj.findTextbox(driver,screenshotPath,'crmKey');
    const owner = await formElementObj.findDropdown(driver,screenshotPath,'owner');
    //will compare the actual and expected value
    try{
        fieldName = 'Mobile';
        assert.strictEqual(await mobile.getAttribute('value'),expectedMobile);
        fieldName = 'CRMKey';
        assert.strictEqual(await crmKey.getAttribute('value'),expectedKey);
        fieldName = 'Owner';
        assert.strictEqual(await owner.getText(),expectedUser);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_FieldData_NotUpdated.png');
        assert.fail('Due to the \''+fieldName+'\' field data is not updated, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'_FieldData_NotUpdated.png\'.');
    }
}exports.checkUpdatedData=checkUpdatedData;

async function uninstallApp(driver,screenshotPath,appName){
    //will check the App Configure button of the provided app is found or not
    const appConfigureBtn = await appsPageElementObj.findAppConfigurationLink(driver,appName);
    if(appConfigureBtn.length > 0){
        //will set focus on the provided app
        await driver.executeScript("arguments[0].scrollIntoView();",appConfigureBtn[0]);
        await driver.wait(until.elementIsVisible(appConfigureBtn[0]));
        //will click on the 'Configure' button
        await appConfigureBtn[0].click();
        await driver.sleep(1000);
        //will find 'Remove' button and then will click on it
        const appRemoveBtn = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button',' Remove ');
        await appRemoveBtn.click();
        await driver.sleep(2000);
        //will find and click on the 'Yes' button
        const yesBtn = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await yesBtn.click();
        await driver.sleep(1000);
    }else{
        console.log('The \''+appName+'\' app is already uninstalled...');
    }
}exports.uninstallApp=uninstallApp;
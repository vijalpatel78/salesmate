const assert = require('assert');
const {until} = require('selenium-webdriver');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const commonActionObj = require('../../../00_common/actions/commonActions');
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const smartQueuePageElementObj = require('./smartQueuePageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

async function openSmartQueuePage(driver,screenshotPath){
    //will open the my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'smart queue' tab and then click on that
    const smartQueueTab = await smartQueuePageElementObj.findSmartQueueTab(driver,screenshotPath);
    await smartQueueTab.click();
    await driver.sleep(2000);
    //will verify whether the smart queue page found or not
    try{
        await driver.wait(until.urlContains('app/user/activitySmartQueue'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SmartQueuePage_NotFound.png');
        await assert.fail('Due to the smart queue page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SmartQueuePage_NotFound.png\'.');
    }

    console.log('The smart queue page has been opened successfully...');
}exports.openSmartQueuePage=openSmartQueuePage;

//will navigate on the security page and then come back to the smart queue page
async function comeBackToSmartQueuePage(driver,screenshotPath){
    await commonActionObj.clickOnSecurity();
    const smartQueueTab = await smartQueuePageElementObj.findSmartQueueTab(driver,screenshotPath);
    await smartQueueTab.click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/user/activitySmartQueue'),10000);
}exports.comeBackToSmartQueuePage=comeBackToSmartQueuePage;

async function enableOrDisableAutoDial(driver,screenshotPath,newStateVal){
    //will check that the provided data is valid to execute a test case or not   
    if(newStateVal.toLowerCase() == 'enable' || newStateVal.toLowerCase() == 'disable'){
        //will find 'Auto-dial' toggle button
        const autoDialCheckbox = await smartQueuePageElementObj.findAutoDialCheckbox(driver,screenshotPath);
        //will get the current value of 'Auto-dial'
        const currentState = await autoDialCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
        
        //will enable/disable 'Auto-dial' toggle button
        if(currentState != newStateVal.toLowerCase()){
            await driver.executeScript("arguments[0].click();",autoDialCheckbox);
        }else{
            console.log('The \'Do you want to auto-dial number for call activities under smart queues?\' option is already '+newStateVal.toLowerCase()+'d...');
        }
    }else{
        assert.fail('The provided \''+newStateVal+'\' value for the Do you want to auto-dial number for call activities under smart queues? option is not valid. The value should be either \'enable\' or \'disable\'.');
    }
    await driver.sleep(1000);
}exports.enableOrDisableAutoDial=enableOrDisableAutoDial;

async function enterAutoDialTimerData(driver,screenshotPath,value){
    //will find 'Auto-dial Timer' field
    const autoDialTimerField = await smartQueuePageElementObj.findAutoDialTimerField(driver,screenshotPath);
    //will clear 'Auto-dial Timer' field data
    await clearFieldDataObj.clearFieldData(autoDialTimerField);
    //will pass the data in the 'Auto-dial Timer' field
    await autoDialTimerField.sendKeys(value);
    await driver.sleep(1000);
}exports.enterAutoDialTimerData=enterAutoDialTimerData;

async function enterRingTimeData(driver,screenshotPath,value){
    //will find 'Manage Ring Time' field
    const manageRingTimeField = await smartQueuePageElementObj.findManageRingTimeField(driver,screenshotPath);
    //will clear 'Manage Ring Time' field data
    await clearFieldDataObj.clearFieldData(manageRingTimeField);
    //will pass the data in the 'Manage Ring Time' field
    await manageRingTimeField.sendKeys(value);
    await driver.sleep(1000);  
}exports.enterRingTimeData=enterRingTimeData;

async function getAutoDialData(driver,screenshotPath){
    //will find 'Auto-dial' option
    const autoDialCheckbox = await smartQueuePageElementObj.findAutoDialCheckbox(driver,screenshotPath);
    //will get the actual value of 'Auto-dial' option
    const actualData = await autoDialCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
    return actualData;
}exports.getAutoDialData=getAutoDialData;

async function getRingTimeData(driver,screenshotPath){
    //will find 'Manage Ring Time' field
    const manageRingTimeField = await smartQueuePageElementObj.findManageRingTimeField(driver,screenshotPath);
    //will get the actual value of 'Manage Ring Time' field
    const actualData = await manageRingTimeField.getAttribute('value');
    return actualData;
}exports.getRingTimeData=getRingTimeData;

async function getAutoDialTimerData(driver,screenshotPath){
    //will find 'Auto-dial Timer' field
    const autoDialTimerField = await smartQueuePageElementObj.findAutoDialTimerField(driver,screenshotPath);
    //will get the actual value of 'Auto-dial Timer' field
    const actualData = await autoDialTimerField.getAttribute('value');
    return actualData;
}exports.getAutoDialTimerData=getAutoDialTimerData

async function compareAutoDialData(driver,screenshotPath,expectedData){
    //will find 'Auto-dial' option
    const autoDialCheckbox = await smartQueuePageElementObj.findAutoDialCheckbox(driver,screenshotPath);
    //will get the actual value of 'Auto-dial' option
    const actualData = await autoDialCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
    //will compare the actual data of 'Auto-dial' against the expected data
    assert.strictEqual(actualData,expectedData);
}exports.compareAutoDialData=compareAutoDialData;

async function compareAutoDialTimerData(driver,screenshotPath,expectedData){
    //will find 'Auto-dial Timer' field
    const autoDialTimerField = await smartQueuePageElementObj.findAutoDialTimerField(driver,screenshotPath);
    //will get the actual value of 'Auto-dial Timer' field
    const actualData = await autoDialTimerField.getAttribute('value');
    //will compare the actual data of 'Auto-dial Timer' against the expected data
    assert.strictEqual(actualData,expectedData);
}exports.compareAutoDialTimerData=compareAutoDialTimerData;

async function compareRingTimeData(driver,screenshotPath,expectedData){
    //will find 'Manage Ring Time' field
    const manageRingTimeField = await smartQueuePageElementObj.findManageRingTimeField(driver,screenshotPath);
    //will get the actual value of 'Manage Ring Time' field
    const actualData = await manageRingTimeField.getAttribute('value');
    //will compare the actual data of 'Manage Ring Time' against the expected data
    assert.strictEqual(actualData,expectedData);
}exports.compareRingTimeData=compareRingTimeData;
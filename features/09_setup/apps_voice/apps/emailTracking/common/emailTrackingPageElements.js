const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');

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
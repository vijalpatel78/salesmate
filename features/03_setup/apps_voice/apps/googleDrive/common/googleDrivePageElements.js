const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');

/*  All these following functions will find elements of Google Drive page on the browser 
 *  and then return those elements 
*/

async function findOption(driver,screenshotPath,idAttribute){
    let optionElem;
    
    try{
        optionElem = await driver.findElement(By.css('label[for="'+idAttribute+'"]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+idAttribute+'_AppOption_NotFound.png');
        await assert.fail('Due to the '+idAttribute+' app option is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+idAttribute+'_AppOption_NotFound.png\'');
    }
    
    return optionElem;
}exports.findOption=findOption;

async function findDriveIntegrationLink(driver,screenshotPath){
    let driveIntegrationLink;
    
    try{
        driveIntegrationLink = await driver.findElement(By.partialLinkText('Google Drive Integration'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DriveIntegrationLink_NotFound.png');
        await assert.fail('Due to the drive integration link is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DriveIntegrationLink_NotFound.png\'');
    }
    
    return driveIntegrationLink;
}exports.findDriveIntegrationLink=findDriveIntegrationLink;
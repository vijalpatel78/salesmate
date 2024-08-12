const assert = require('assert');
const {until} = require('selenium-webdriver');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const systemModulesPageElementObj = require('../../../customizations/systemModules/common/systemModulesPageElements')

async function openImportFilePage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Import File' tab 
    const importFileTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Import or Migrate Data ');

    //will check the 'Import File' tab is visible or not
    if(importFileTab.length > 0){
        //will set focus on the 'Import File' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",importFileTab[0]);
        await driver.wait(until.elementIsVisible(importFileTab[0]));
        //will click on the 'Import File' tab 
        await importFileTab[0].click();
    }else{
        /* As 'Import File' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
        let adminUserNumber = '';

        //will get the Admin user details from the xlsx file 
        const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.profile[i].toLowerCase() == 'admin'){
                adminUserNumber = userDetails.user[i];
            }
        }
        //will check whether the Admin user found or not from the excel file
        if(adminUserNumber == ''){
            assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
        }

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Import File page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on Import File page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Import File' tab 
        const importFileTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Import or Migrate Data ');
        //will set focus on the 'Import File' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",importFileTab[0]);
        await driver.wait(until.elementIsVisible(importFileTab[0]));
        //will click on the 'Import File' tab 
        await importFileTab[0].click();
        await driver.sleep(2000);
    }
    await driver.sleep(2000);

    //will verify whether the Import File page found or not
    try{
        await driver.wait(until.urlContains('app/setup/migrate-data'),30000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportFilePage_NotFound.png');
        await assert.fail('Due to the Import File page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ImportFilePage_NotFound.png\'.');
    }

    console.log('The import file page has been opened successfully...');
}exports.openImportFilePage=openImportFilePage;

async function getDynamicModuleName(driver,screenshotPath,moduleName){
    //will find and click on the module edit button
    const moduleEditBtn = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,moduleName);
    await moduleEditBtn.click();
    await driver.sleep(2500);
    //will get the module singular name
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    const expectedSingularModuleName = await singularTextbox.getAttribute('value');
    //will get the module plural name
    const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
    const expectedPluralModuleName = await pluralTextbox.getAttribute('value');
    //will find and click on the Cancel button
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);
    await cancelBtn.click();
    await driver.sleep(2000);
    //will return the module singular and plural name
    return { singularModuleName:expectedSingularModuleName, pluralModuleName:expectedPluralModuleName };
}exports.getDynamicModuleName=getDynamicModuleName;
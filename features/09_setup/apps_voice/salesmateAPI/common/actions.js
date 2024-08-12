const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const systemModulesPageElementObj = require('../../../customizations/systemModules/common/systemModulesPageElements')
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

async function openSalesmateAPIPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Salesmate API' tab 
    const salesmateAPITab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Salesmate API ');

    //will check the 'Salesmate API' tab is visible or not
    if(salesmateAPITab.length > 0){
        //will set focus on the 'Salesmate API' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",salesmateAPITab[0]);
        await driver.wait(until.elementIsVisible(salesmateAPITab[0]));
        //will click on the 'Salesmate API' tab 
        await salesmateAPITab[0].click();
    }else{
        /* As 'Salesmate API' tab is not visible to the logged-in user, it will do Admin 02_login on the same browser */
        
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

        //will open the Salesmate 02_login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Salesmate API page');
        //will do Salesmate 02_login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on Salesmate API page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Salesmate API' tab 
        const salesmateAPITab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Salesmate API ');
        //will set focus on the 'Salesmate API' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",salesmateAPITab[0]);
        await driver.wait(until.elementIsVisible(salesmateAPITab[0]));
        //will click on the 'Salesmate API' tab 
        await salesmateAPITab[0].click();
        await driver.sleep(2000);
    }
    await driver.sleep(2000);

    //will verify whether the Salesmate API page found or not
    try{
        await driver.wait(until.urlContains('app/setup/fields'),20000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SalesmateAPIPage_NotFound.png');
        await assert.fail('Due to the Salesmate API page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SalesmateAPIPage_NotFound.png\'.');
    }

    console.log('The Salesmate API page has been opened successfully...');
}exports.openSalesmateAPIPage=openSalesmateAPIPage;

async function getSingularModuleName(driver,screenshotPath,moduleName){
    const moduleEditBtn = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,moduleName);
    await moduleEditBtn.click();
    await driver.sleep(1000);
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    const expectedSingularModuleName = await singularTextbox.getAttribute('value');
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);
    await cancelBtn.click();
    await driver.sleep(1000);
    return expectedSingularModuleName
}exports.getSingularModuleName=getSingularModuleName;
const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const systemModulesPageElementObj = require('../../../customizations/systemModules/common/systemModulesPageElements');

async function getSingularModuleName(driver,screenshotPath,moduleName){
    const moduleEditBtn = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,moduleName);
    await moduleEditBtn.click();
    await driver.sleep(1000);
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    const expectedSingularModuleName = await singularTextbox.getAttribute('value');
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);
    await cancelBtn.click();
    await driver.sleep(2000);
    return expectedSingularModuleName
}exports.getSingularModuleName=getSingularModuleName;

//will navigate on the dashboard page and then come back to the global data sharing policies page
async function comeBackToGlobalDataSharingPoliciesPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const globalDataSharingTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Global Data Sharing Policies ');
    await driver.executeScript("arguments[0].scrollIntoView();",globalDataSharingTab[0]);
    await driver.wait(until.elementIsVisible(globalDataSharingTab[0]));
    await globalDataSharingTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/security/datasharing'),10000);
}exports.comeBackToGlobalDataSharingPoliciesPage=comeBackToGlobalDataSharingPoliciesPage;

async function openGlobalDataSharingPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Global Data Sharing' tab 
    const globalDataSharingTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Global Data Sharing Policies ');

    //will check the 'Global Data Sharing' tab is visible or not
    if(globalDataSharingTab.length > 0){
        //will set focus on the 'Global Data Sharing' tab
        await driver.executeScript("arguments[0].scrollIntoView();",globalDataSharingTab[0]);
        await driver.wait(until.elementIsVisible(globalDataSharingTab[0]));
        //will click on the 'Global Data Sharing' tab
        await globalDataSharingTab[0].click();
    }else{
        /* As 'Global Data Sharing' tab is not visible to the logged-in user, it will do Admin 02_login on the same browser */
        
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
            await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
        }

        //will open the Salesmate 02_login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on global data sharing policies page');
        //will do Salesmate 02_login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on global data sharing policies page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Global Data Sharing' tab 
        const globalDataSharingTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Global Data Sharing Policies ');
        //will set focus on the 'Global Data Sharing' tab
        await driver.executeScript("arguments[0].scrollIntoView();",globalDataSharingTab[0]);
        await driver.wait(until.elementIsVisible(globalDataSharingTab[0]));
        //will click on the 'Global Data Sharing' tab
        await globalDataSharingTab[0].click();    
    }
    await driver.sleep(1000);

    //will verify whether the global data sharing page found or not
    try{
        await driver.wait(until.urlContains('app/setup/security/datasharing'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GlobalDataSharingPage_NotFound.png');
        await assert.fail('Due to the global data sharing page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'GlobalDataSharingPage_NotFound.png\'.');
    }

    console.log('The global data sharing page has been opened successfully...');
}exports.openGlobalDataSharingPage=openGlobalDataSharingPage;
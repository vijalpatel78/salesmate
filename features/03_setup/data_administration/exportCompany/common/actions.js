const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const exportCompanyElementsObj = require('../common/exportCompanyElements');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

async function openExportCompanyPage(driver,screenshotPath) {
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Export Data' tab
    const exportDataTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Export Data ');

    //will check the 'Export Data' tab is visible or not
    if(exportDataTab.length > 0){
        //will set focus on the 'Export Data' tab
        await driver.executeScript("arguments[0].scrollIntoView();",exportDataTab[0]);
        await driver.wait(until.elementIsVisible(exportDataTab[0]));
        //will click on the 'Export Data' tab
        await exportDataTab[0].click();
        await driver.sleep(1000);
        //will click on 'Export Company' tab
        await exportCompanyElementsObj.findCompaniesExportModule(driver);
        await driver.sleep(1000);
    }else{
        /* As 'Export Data' tab is not visible to the logged-in user, it will do Admin login on the same browser */

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

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on export data page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on export data page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Export Data' tab
        const exportDataTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Export Data ');
        //will set focus on the 'Export Data' tab
        await driver.executeScript("arguments[0].scrollIntoView();",exportDataTab[0]);
        await driver.wait(until.elementIsVisible(exportDataTab[0]));
        //will click on the 'Export Data' tab
        await exportDataTab[0].click();
        await driver.sleep(1000);
        //will click on the 'Export Company' tab
        await exportCompanyElementsObj.findCompaniesExportModule(driver);
        await driver.sleep(2000);
    }
    await driver.sleep(2000);
    //will verify whether the export company page found or not
    try{
        await driver.wait(until.urlContains('app/setup/export/detail?id=5'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'exportCompanyPage_NotFound.png');
        await assert.fail('Due to the export company page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'exportCompanyPage_NotFound.png\'.');
    }
    console.log('The export company page has been opened successfully...');
}exports.openExportCompanyPage=openExportCompanyPage;
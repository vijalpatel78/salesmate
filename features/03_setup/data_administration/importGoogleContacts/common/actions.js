const assert = require('assert');
const {until} = require('selenium-webdriver');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');

async function openImportGoogleContactsPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Import Google Contacts' tab 
    const importGoogleContactsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Import Google');

    //will check the 'Import Google Contacts' tab is visible or not
    if(importGoogleContactsTab.length > 0){
        //will set focus on the 'Import Google Contacts' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",importGoogleContactsTab[0]);
        await driver.wait(until.elementIsVisible(importGoogleContactsTab[0]));
        //will click on the 'Import Google Contacts' tab 
        await importGoogleContactsTab[0].click();
    }else{
        /* As 'Import Google Contacts' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Import Google Contacts page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on Import Google Contacts page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Import Google Contacts' tab 
        const importGoogleContactsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Import Google');
        //will set focus on the 'Import Google Contacts' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",importGoogleContactsTab[0]);
        await driver.wait(until.elementIsVisible(importGoogleContactsTab[0]));
        //will click on the 'Import Google Contacts' tab 
        await importGoogleContactsTab[0].click();
    }
    await driver.sleep(1000);

    //will verify whether the Import Google Contacts page found or not
    try{
        await driver.wait(until.urlContains('app/setup/import/data?moduleName=contact&isGoogleImport=true'),30000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportGoogleContactsPage_NotFound.png');
        await assert.fail('Due to the Import Google Contacts page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ImportGoogleContactsPage_NotFound.png\'.');
    }

    console.log('The import google contacts page has been opened successfully...');
}exports.openImportGoogleContactsPage=openImportGoogleContactsPage;
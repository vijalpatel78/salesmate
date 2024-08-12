const assert = require('assert');
const {until} = require('selenium-webdriver');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');

async function openExportHistoryPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Export History' tab 
    const exportHistoryTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Export History ');

    //will check the 'Export History' tab is visible or not
    if(exportHistoryTab.length > 0){
        //will set focus on the 'Export History' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",exportHistoryTab[0]);
        await driver.wait(until.elementIsVisible(exportHistoryTab[0]));
        //will click on the 'Export History' tab 
        await exportHistoryTab[0].click();
    }else{
        /* As 'Export History' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Export History page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on Export History page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Export History' tab 
        const exportHistoryTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Export History ');
        //will set focus on the 'Export History' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",exportHistoryTab[0]);
        await driver.wait(until.elementIsVisible(exportHistoryTab[0]));
        //will click on the 'Export History' tab 
        await exportHistoryTab[0].click();
        await driver.sleep(2000);
    }
    await driver.sleep(2000);

    //will verify whether the Export History page found or not
    try{
        await driver.wait(until.urlContains('app/setup/export/history'),30000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ExportHistoryPage_NotFound.png');
        await assert.fail('Due to the Export History page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ExportHistoryPage_NotFound.png\'.');
    }

    console.log('The export history page has been opened successfully...');
}exports.openExportHistoryPage=openExportHistoryPage;
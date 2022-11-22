const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the dashboard page and then come back to the fiscal year page
async function comeBackToFiscalYearPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2500);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const fiscalYearTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Fiscal Year ');
    await driver.executeScript("arguments[0].scrollIntoView();",fiscalYearTab[0]);
    await driver.wait(until.elementIsVisible(fiscalYearTab[0]));
    await fiscalYearTab[0].click();
    await driver.wait(until.urlContains('app/setup/company/fiscalyear'),10000);
}exports.comeBackToFiscalYearPage=comeBackToFiscalYearPage;

async function openFiscalYearPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Fiscal Year' tab 
    const fiscalYearTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Fiscal Year ');

    //will check the 'Fiscal Year' tab is visible or not
    if(fiscalYearTab.length > 0){
        //will set focus on the 'Fiscal Year' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",fiscalYearTab[0]);
        await driver.wait(until.elementIsVisible(fiscalYearTab[0]));
        //will click on the 'Fiscal Year' tab 
        await fiscalYearTab[0].click();
    }else{
        /* As 'Fiscal Year' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on fiscal year page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on fiscal year page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Fiscal Year' tab 
        const fiscalYearTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Fiscal Year ');
        //will set focus on the 'Fiscal Year' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",fiscalYearTab[0]);
        await driver.wait(until.elementIsVisible(fiscalYearTab[0]));
        //will click on the 'Fiscal Year' tab 
        await fiscalYearTab[0].click();
    }
    await driver.sleep(1000);

    //will verify whether the fiscal year page found or not
    try{
        await driver.wait(until.urlContains('app/setup/company/fiscalyear'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FiscalYearPage_NotFound.png');
        await assert.fail('Due to the fiscal year page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'FiscalYearPage_NotFound.png\'.');
    }

    console.log('The fiscal year page has been opened successfully...');
}exports.openFiscalYearPage=openFiscalYearPage;
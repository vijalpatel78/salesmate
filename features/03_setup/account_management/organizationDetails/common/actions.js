const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the dashboard page and then come back to the organization details page
async function comeBackToOrganizationDetailsPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2500);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const organizationDetailsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Organization Details ');
    await driver.executeScript("arguments[0].scrollIntoView();",organizationDetailsTab[0]);
    await driver.wait(until.elementIsVisible(organizationDetailsTab[0]));
    await organizationDetailsTab[0].click();
    await driver.wait(until.urlContains('app/setup/company/profile'),10000);
}exports.comeBackToOrganizationDetailsPage=comeBackToOrganizationDetailsPage;

async function openOrganizationDetailsPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Organization Details' tab 
    const organizationDetailsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Organization Details ');

    //will check the 'Organization Details' tab is visible or not
    if(organizationDetailsTab.length > 0){
        //will set focus on the 'Organization Details' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",organizationDetailsTab[0]);
        await driver.wait(until.elementIsVisible(organizationDetailsTab[0]));
        //will click on the 'Organization Details' tab 
        await organizationDetailsTab[0].click();
    }else{
        /* As 'Organization Details' tab is not visible to the logged-in user, it will do Admin 02_login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on organization details page');
        //will do Salesmate 02_login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on organization details page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Organization Details' tab 
        const organizationDetailsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Organization Details ');
        //will set focus on the 'Organization Details' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",organizationDetailsTab[0]);
        await driver.wait(until.elementIsVisible(organizationDetailsTab[0]));
        //will click on the 'Organization Details' tab 
        await organizationDetailsTab[0].click();
    }
    await driver.sleep(1000);

    //will verify whether the organization details page found or not
    try{
        await driver.wait(until.urlContains('app/setup/company/profile'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'OrganizationDetailsPage_NotFound.png');
        await assert.fail('Due to the organization details page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'OrganizationDetailsPage_NotFound.png\'.');
    }

    console.log('The organization details page has been opened successfully...');
}exports.openOrganizationDetailsPage=openOrganizationDetailsPage;
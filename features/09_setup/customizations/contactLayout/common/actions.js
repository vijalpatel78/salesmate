const assert = require('assert');
const {until} = require('selenium-webdriver');
const dashboardPageElementObj = require('../../../../00_common/dashboard/common/dashboardPageElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the dashboard page and then come back to the 06_contact page
async function comeBackToContactPage(driver,screenshotPath){
    const dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
    await dashboardMenuBtn.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const contactTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Contact ');
    await driver.executeScript("arguments[0].scrollIntoView();",contactTab[0]);
    await driver.wait(until.elementIsVisible(contactTab[0]));
    await contactTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/customization/layouts/1'),10000);
}exports.comeBackToContactPage=comeBackToContactPage;

async function openContactPage(driver,screenshotPath) {
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Contact' tab
    const contactTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Contact ');

    //will check the 'Contact' tab is visible or not
    if(contactTab.length > 0){
        //will set focus on the 'Contact' tab
        await driver.executeScript("arguments[0].scrollIntoView();",contactTab[0]);
        await driver.wait(until.elementIsVisible(contactTab[0]));
        //will click on the 'Contact' tab
        await contactTab[0].click();
    }else{
        /* As 'Contact' tab is not visible to the logged-in user, it will do Admin login on the same browser */

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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on 06_contact layout page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on 06_contact layout page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Contact' tab
        const contactTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Contact ');
        //will set focus on the 'Contact' tab
        await driver.executeScript("arguments[0].scrollIntoView();",contactTab[0]);
        await driver.wait(until.elementIsVisible(contactTab[0]));
        //will click on the 'Contact' tab
        await contactTab[0].click();
        await driver.sleep(2000);
    }
    await driver.sleep(2000);

    //will verify whether the 06_contact page found or not
    try{
        await driver.wait(until.urlContains('app/setup/customization/layouts/1'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/contactPage_NotFound.png');
        await assert.fail('Due to the 06_contact page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/contactPage_NotFound.png\'.');
    }

    console.log('The 06_contact page has been opened successfully...');
}exports.openContactPage=openContactPage;

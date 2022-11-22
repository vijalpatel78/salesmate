const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the dashboard page and then come back to the activity types page
async function comeBackToActivityTypesPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const activityTypesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Types');
    await driver.executeScript("arguments[0].scrollIntoView();",activityTypesTab[0]);
    await driver.wait(until.elementIsVisible(activityTypesTab[0]));
    await activityTypesTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/customization/activity-type'),10000);
}exports.comeBackToActivityTypesPage=comeBackToActivityTypesPage;

async function openActivityTypesPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Activity Types' tab 
    const activityTypesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Types');

    //will check the 'Activity Types' tab is visible or not
    if(activityTypesTab.length > 0){
        //will set focus on the 'Activity Types' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",activityTypesTab[0]);
        await driver.wait(until.elementIsVisible(activityTypesTab[0]));
        //will click on the 'Activity Types' tab 
        await activityTypesTab[0].click();
    }else{
        /* As 'Activity Types' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity types page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on activity types page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Activity Types' tab 
        const activityTypesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Types');
        //will set focus on the 'Activity Types' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",activityTypesTab[0]);
        await driver.wait(until.elementIsVisible(activityTypesTab[0]));
        //will click on the 'Activity Types' tab 
        await activityTypesTab[0].click();
    }
    await driver.sleep(2000);

    //will verify whether the 'Activity Types' page found or not
    try{
        await driver.wait(until.urlContains('app/setup/customization/activity-type'),60000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ActivityTypesPage_NotFound.png');
        await assert.fail('Due to the activity types page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ActivityTypesPage_NotFound.png\'.');
    }

    console.log('The activity types page has been opened successfully...');
}exports.openActivityTypesPage=openActivityTypesPage;
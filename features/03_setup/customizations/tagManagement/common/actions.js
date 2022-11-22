const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the dashboard page and then come back to the tag management page
async function comeBackToTagManagementPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const tagManagementTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Tag Management ');
    await driver.executeScript("arguments[0].scrollIntoView();",tagManagementTab[0]);
    await driver.wait(until.elementIsVisible(tagManagementTab[0]));
    await tagManagementTab[0].click();
    await driver.sleep(3000);
    await driver.wait(until.urlContains('app/setup/customization/tags'),10000);
}exports.comeBackToTagManagementPage=comeBackToTagManagementPage;

async function openTagManagementPage(driver,screenshotPath) {
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Tag Management' tab
    const tagManagementTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Tag Management ');

    //will check the 'Tag Management' tab is visible or not
    if(tagManagementTab.length > 0){
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();",tagManagementTab[0]);
        await driver.wait(until.elementIsVisible(tagManagementTab[0]));
        //will click on the 'Tag Management' tab
        await tagManagementTab[0].click();
    }else{
        /* As 'Tag Management' tab is not visible to the logged-in user, it will do Admin login on the same browser */

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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on global data sharing policies page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on global data sharing policies page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Tag Management' tab
        const tagManagementTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();",tagManagementTab[0]);
        await driver.wait(until.elementIsVisible(tagManagementTab[0]));
        //will click on the 'Tag Management' tab
        await tagManagementTab[0].click();
    }
    await driver.sleep(2000);

    //will verify whether the tag management page found or not
    try{
        await driver.wait(until.urlContains('app/setup/customization/tags'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/tagManagementPage_NotFound.png');
        await assert.fail('Due to the tag management page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/tagManagementPage_NotFound.png\'.');
    }
    console.log('The tag management page has been opened successfully...');
}exports.openTagManagementPage=openTagManagementPage;
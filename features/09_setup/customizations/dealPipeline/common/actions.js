const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

async function openDealPipelinePage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Deal Pipeline' tab 
    const dealPipelineTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Pipeline');

    //will check the 'Deal Pipeline' tab is visible or not
    if(dealPipelineTab.length > 0){
        //will set focus on the 'Deal Pipeline' tab
        await driver.executeScript("arguments[0].scrollIntoView();",dealPipelineTab[0]);
        await driver.wait(until.elementIsVisible(dealPipelineTab[0]));
        //will click on the 'Deal Pipeline' tab 
        await dealPipelineTab[0].click();
    }else{
        /* As 'Deal Pipeline' tab is not visible to the logged-in user, it will do Admin 02_login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on currencies page');
        //will do Salesmate 02_login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on currencies page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Deal Pipeline' tab 
        const dealPipelineTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Pipeline');
        //will set focus on the 'Deal Pipeline' tab
        await driver.executeScript("arguments[0].scrollIntoView();",dealPipelineTab[0]);
        await driver.wait(until.elementIsVisible(dealPipelineTab[0]));
        //will click on the 'Deal Pipeline' tab 
        await dealPipelineTab[0].click();
    }
    await driver.sleep(2000);

    //will verify whether the 'Deal Pipeline' page found or not
    try{
        await driver.wait(until.urlContains('app/setup/customization/dealpipeline'),400000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/DealPipelinePage_NotFound.png');
        await assert.fail('Due to the deal pipeline page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/DealPipelinePage_NotFound.png\'.');
    }

    console.log('The deal pipeline page has been opened successfully...');
}exports.openDealPipelinePage=openDealPipelinePage;

//will navigate on the dashboard page and then come back to the deal pipeline page
async function comeBackToDealPipelinePage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const dealPipelineTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,'Pipeline');
    await driver.executeScript("arguments[0].scrollIntoView();",dealPipelineTab[0]);
    await driver.wait(until.elementIsVisible(dealPipelineTab[0]));
    await dealPipelineTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/customization/dealpipeline'),20000);
}exports.comeBackToDealPipelinePage=comeBackToDealPipelinePage;
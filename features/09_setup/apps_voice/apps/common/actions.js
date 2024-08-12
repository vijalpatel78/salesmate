const assert = require('assert');
const {until} = require('selenium-webdriver');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const appsPageElementObj = require('../common/appsPageElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

async function openAppsPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Apps' tab 
    const appsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Apps ');

    //will check the 'Apps' tab is visible or not
    if(appsTab.length > 0){
        //will set focus on the 'Apps' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab 
        await appsTab[0].click();
    }else{
        /* As 'Apps' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on apps page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on apps page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Apps' tab 
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Apps ');
        //will set focus on the 'Apps' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab 
        await appsTab[0].click();
        await driver.sleep(2000);
    }
    await driver.sleep(2000);

    //will verify whether the apps page found or not
    try{
        await driver.wait(until.urlContains('app/setup/apps'),20000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AppsPage_NotFound.png');
        await assert.fail('Due to the apps page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'AppsPage_NotFound.png\'.');
    }

    console.log('The apps page has been opened successfully...');
}exports.openAppsPage=openAppsPage;

async function installApp(driver,appName){
    //will check the Install button of the provided app is found or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,appName);
    if(installBtn.length > 0){
        //will set focus on the provided app
        await driver.executeScript("arguments[0].scrollIntoView();",installBtn[0]);
        await driver.wait(until.elementIsEnabled(installBtn[0]));
        //will click on the 'Install' button
        await installBtn[0].click();
        await driver.sleep(2000);
    }else{
        console.log('The \''+appName+'\' app is already installed...');
    }
}exports.installApp=installApp;

async function uninstallApp(driver,screenshotPath,appName){
    //will check the App Configure button of the provided app is found or not
    const appConfigureBtn = await appsPageElementObj.findAppConfigurationLink(driver,appName);
    if(appConfigureBtn.length > 0){
        //will set focus on the provided app
        await driver.executeScript("arguments[0].scrollIntoView();",appConfigureBtn[0]);
        await driver.wait(until.elementIsVisible(appConfigureBtn[0]));
        //will click on the 'Configure' button
        await appConfigureBtn[0].click();
        await driver.sleep(1000);
        //will find 'Remove' button and then will click on it
        const appRemoveBtn = await appsPageElementObj.findAppRemoveBtn(driver,screenshotPath);
        await appRemoveBtn.click();
        await driver.sleep(3000);
        return false;
    }else{
        console.log('The \''+appName+'\' app is already uninstalled...');
        return true;
    }
}exports.uninstallApp=uninstallApp;

//will navigate on the dashboard page and then come back to the apps page
async function comeBackToAppsPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(1500);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const appsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Apps ');
    await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
    await driver.wait(until.elementIsVisible(appsTab[0]));
    await appsTab[0].click();
    await driver.wait(until.urlContains('app/setup/apps'),20000);
}exports.comeBackToAppsPage=comeBackToAppsPage;

async function clickConfigureBtn(driver,appName){
    //will find the 'Configure' button
    const configureBtn = await appsPageElementObj.findAppConfigurationLink(driver,appName);
    //will set focus on the app
    await driver.executeScript("arguments[0].scrollIntoView();",configureBtn[0]);
    await driver.wait(until.elementIsVisible(configureBtn[0]));
    //will click on the 'Configure' button
    await configureBtn[0].click();
    await driver.sleep(2000);
}exports.clickConfigureBtn=clickConfigureBtn;
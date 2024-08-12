const {Given,When,Then} = require('@cucumber/cucumber');
const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const APIPageElementObj = require('../common/salesmateAPIPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/03_setup/apps_voice/salesmateAPI/screenshots/';
let expectedContactSingularName, expectedCompanySingularName, expectedDealSingularName, expectedActivitySingularName,
expectedProductSingularName, actualNameList = [];

Given('the {string} is on Salesmate API page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/fields')){
        console.log('The Salesmate API page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open Salesmate API page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Salesmate API page');
        //will open the Salesmate API page
        await actionObj.openSalesmateAPIPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open Salesmate API page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Salesmate API page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Salesmate API page');
        //will open the Salesmate API page
        await actionObj.openSalesmateAPIPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the Salesmate API page
        await actionObj.openSalesmateAPIPage(driver,screenshotPath);  
    }
});

When('the user goes on the Setup> System Modules page and verifies the all singular module name', async () =>{
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'System Modules' tab 
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');

    //will check the 'System Modules' tab is visible or not
    if(systemModulesTab.length > 0){
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
    }else{
        /* As 'System Modules' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the user goes on the Setup> System Modules page and verifies the all singular module name');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the user goes on the Setup> System Modules page and verifies the all singular module name');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'System Modules' tab 
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
    }
    await driver.sleep(1000);
    await driver.wait(until.urlContains('app/setup/customization/modules'),10000);

    //will get the singular name of the 06_contact module
    expectedContactSingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Contact');
    //will get the singular name of the company module
    expectedCompanySingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Company');
    //will get the singular name of the deal module
    expectedDealSingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Deal');
    //will get the singular name of the activity module
    expectedActivitySingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Activity');
    //will get the singular name of the login module
    expectedProductSingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Product');
});

When('the user click on the api docs link', async () =>{
    //will find the link and then will click on it
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'https://apidocs.salesmate.io/');
    await link.click();
    await driver.sleep(1000);
});

When('the user click on the Click here link from the Salesmate API page', async () =>{
    //will find the link and then will click on it
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'Click here');
    await link.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the Salesmate API Doc page', async () =>{
    //will get the current tab id
    const currentTab = await driver.getWindowHandle();
    //will get all tab id
    const numberOfTabs = await driver.getAllWindowHandles();

    //will move on the Salesmate API Doc page
    const supportURLTab = numberOfTabs[numberOfTabs.length - 1];
    await driver.switchTo().window(supportURLTab);
    //will get the Salesmate API Doc URL
    const currentURL = await driver.getCurrentUrl();
    console.log("The current Salesmate API Doc url is: "+currentURL);
    
    //will check the Salesmate API Doc URL is correct or not
    if(currentURL === 'https://apidocs.salesmate.io/'){
        console.log("The system is redirected to the Salesmate API Doc page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SalesmateAPIDocPage_NotFound.png');
        //will close the Salesmate API Doc page
        await driver.close();
        //will move back to the Salesmate page
        await driver.switchTo().window(currentTab);
        await driver.sleep(1000);
        await assert.fail('Due to the Salesmate API Doc page is not opened, the test case has been failed. Expected URL: \'https://apidocs.salesmate.io/\' Screenshot Name: \''+screenshotPath+'SalesmateAPIDocPage_NotFound.png\'.');
    }

    //will close the Salesmate API Doc page
    await driver.close();
    //will move back to the Salesmate page
    await driver.switchTo().window(currentTab);
    await driver.sleep(1000);
});

Then('the product module should not be displayed on the System API page', async () =>{
    //will open the Salesmate API page
    await actionObj.openSalesmateAPIPage(driver,screenshotPath);  
    await driver.navigate().refresh();
    //will find the login tab
    const productTab = await APIPageElementObj.findTabName(driver,'Product');

    //will check the Product tab is getting displayed or not
    if(productTab.length == 0){
        console.log('The login tab is not showing on uninstalling the product app...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductTab_Displayed_AfterUninstalled.png');
        assert.fail('After uninstalling the login app, the login tab is still displayed. Screenshot Name: \''+screenshotPath+'ProductTab_Displayed_AfterUninstalled.png\'.');
    }
});

Then('the product module should be displayed on the System API page', async () =>{
    //will open the Salesmate API page
    await actionObj.openSalesmateAPIPage(driver,screenshotPath);  
    await driver.navigate().refresh();
    //will find the login tab
    const productTab = await APIPageElementObj.findTabName(driver,'Product');

    //will check the Product tab is getting displayed or not
    if(productTab.length > 0){
        console.log('The login tab is showing on installing the login app...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductTab_NotDisplayed_AfterInstalled.png');
        assert.fail('After installing the login app, the login tab is not displayed. Screenshot Name: \''+screenshotPath+'ProductTab_NotDisplayed_AfterInstalled.png\'.');
    }
});

Then('the system should display a singular module name on the System API page', async () =>{
    let name;

    //will open the Salesmate API page
    await actionObj.openSalesmateAPIPage(driver,screenshotPath);  
    await driver.sleep(2000);
    //will find the all tab name
    const tabName = await APIPageElementObj.findAllTabName(driver);
    await driver.wait(until.elementIsVisible(tabName[0]));
    for(let i=0; i<tabName.length; i++){
        //will get actual tab name 
        actualNameList.push(await tabName[i].getText());
        await tabName[i].click();
        await driver.sleep(2000);
    }
    
    //will compare the tab name against the singular module name
    try{
        name = 'Contact';
        assert(actualNameList.includes(expectedContactSingularName.toUpperCase()));
        name = 'Company';
        assert(actualNameList.includes(expectedCompanySingularName.toUpperCase()));
        name = 'Activity';
        assert(actualNameList.includes(expectedActivitySingularName.toUpperCase()));
        name = 'Deal';
        assert(actualNameList.includes(expectedDealSingularName.toUpperCase()));
        name = 'Product';
        assert(actualNameList.includes(expectedProductSingularName.toUpperCase()));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+name+'_SingularModuleName_NotUsed.png'); 
        assert.fail('Due to the singular module name is not used for the \''+name+'\' tab, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+name+'_SingularModuleName_NotUsed.png\'.');
    }

    console.log('The system is showing the dynamic module name...');
}); 

Then('the system should redirect to the accesskey page', async () =>{
    //will get the accesskey page Url
    const accesskeyUrl = await driver.getCurrentUrl();
    console.log("The accesskey page url is: "+accesskeyUrl);

    //will check the accesskey page URL is correct or not
    if(accesskeyUrl.includes('app/user/accesskey')){
        console.log("The system is redirected to the Access Key page...");
        await formElementObj.findTextbox(driver,screenshotPath,'authAccessKey');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AccessKeyPage_NotFound.png');
        await assert.fail('Due to the Access Key page is not opened, the test case has been failed. The URL should end with \'app/user/accesskey\'. Screenshot Name: \''+screenshotPath+'AccessKeyPage_NotFound.png\'.');
    }
});
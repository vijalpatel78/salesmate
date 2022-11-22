const { Given } = require('@cucumber/cucumber');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const commonActionObj = require('./actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/00_common/screenshots/';

Given('the {string} is on apps page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/setup/apps')){
        console.log('The apps page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open apps page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on apps page');
        //will open the apps page
        await commonActionObj.openAppsPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open apps page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on apps page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on apps page');
        //will open the apps page
        await commonActionObj.openAppsPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the apps page
        await commonActionObj.openAppsPage(driver,screenshotPath);  
    }
});
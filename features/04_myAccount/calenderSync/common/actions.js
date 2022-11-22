const {By} = require('selenium-webdriver');
const assert = require('assert');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const calenderSyncElements = require('./calenderSyncPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const commonElementObj = require('../../../00_common/actions/commonActions')
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;
let isConnectedAccountFound = 'no';

async function openCalenderSyncPage(driver,screenshotPath){
    //will open my account page
    await openMyAccountPageObj.openMyAccountPage(driver, screenshotPath);
    
    if(isConnectedAccountFound == 'no'){
        //click on connected accounts tab
        await calenderSyncElements.clickOnConnectedAccount();
        await driver.manage().setTimeouts({implicit:20000});
        const connectedAccountElements = await driver.findElements(By.xpath('//section[@id="user_form"]/table[@class="table table-bordered table-hover table-striped"]'));
        const connectedAccountsLength = connectedAccountElements.length;
        console.log(connectedAccountsLength);

        //To verify whether there is possibility to execute test cases or not
        if(connectedAccountsLength == 0) {
            isConnectedAccountFound = 'no';
            await assert.fail("As there are no accounts found in My Account>Connected Accounts page,there is no possibility to execute any test cases");
        }
        else {
            isConnectedAccountFound = 'yes';
        }
    }

    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    console.log("As connected accounts are found,the test cases can be executed");
    await driver.sleep(1000);
            
    //will find 'Calender Sync Page' tab and then click on that
    await calenderSyncElements.clickOnCalenderSync();
    await driver.sleep(2000);
            
    //will verify whether the Calender Sync page found or not
    const currentPageURL = await driver.getCurrentUrl();
    try{
        await currentPageURL.includes('/app/user/calenderSync');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/calenderSyncPage_NotFound.png');
        await assert.fail('Due to the calender sync page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/calenderSyncPage_NotFound.png\'');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    
}exports.openCalenderSyncPage=openCalenderSyncPage;

async function comeBackToCalenderSyncPage(){
    await commonElementObj.clickOnSecurity();
    await calenderSyncElements.clickOnCalenderSync();
}exports.comeBackToCalenderSyncPage=comeBackToCalenderSyncPage;
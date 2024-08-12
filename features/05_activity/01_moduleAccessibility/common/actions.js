const assert = require('assert');
const { until } = require('selenium-webdriver');
const dashboardPageElementObj = require('../../../00_common/dashboard/common/dashboardPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const formElementsObj = require('../../../00_common/webElements/formElements');

//will navigate on the dashboard page and then come back to the activity module page
async function comeBackToActivityListingPage(driver,screenshotPath){
    const dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
    await dashboardMenuBtn.click();
    await driver.sleep(5000);
    const activityModule =  await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_activity','Activity Icon');
    await activityModule.click();
    await driver.sleep(3000);
}exports.comeBackToActivityListingPage=comeBackToActivityListingPage;

async function openActivityListingPage(driver,screenshotPath) {
    await driver.sleep(2000);
    const activityModule =  await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_activity','Activity Icon');
    await activityModule.click();
    await driver.sleep(3000);
    //will verify whether the activity module page found or not
    try{
        await driver.wait(until.urlContains('app/tasks/list'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/activityModulePage_NotFound.png');
        await assert.fail('Due to the activity listing page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/activityModulePage_NotFound.png\'.');
    }
    console.log('The activity listing page has been opened successfully...');
}exports.openActivityListingPage=openActivityListingPage;
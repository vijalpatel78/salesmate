const assert = require('assert');
const { until } = require('selenium-webdriver');
const dashboardPageElementObj = require('../../../00_common/dashboard/common/dashboardPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const formElementsObj = require('../../../00_common/webElements/formElements');

//will navigate on the dashboard page and then come back to the company module page
async function comeBackToCompanyListingPage(driver,screenshotPath){
    const dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
    await dashboardMenuBtn.click();
    await driver.sleep(5000);
    const companyModule =  await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_company','Company Icon');
    await companyModule.click();
    await driver.sleep(3000);
}exports.comeBackToCompanyListingPage=comeBackToCompanyListingPage;

async function openCompanyListingPage(driver,screenshotPath) {
    await driver.sleep(2000);
    const companyModule =  await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_company','Company Icon');
    await companyModule.click();
    await driver.sleep(3000);
    //will verify whether the company module page found or not
    try{
        await driver.wait(until.urlContains('app/companies/list'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/companyModulePage_NotFound.png');
        await assert.fail('Due to the company listing page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/companyModulePage_NotFound.png\'.');
    }
    console.log('The company listing page has been opened successfully...');
}exports.openCompanyListingPage=openCompanyListingPage;
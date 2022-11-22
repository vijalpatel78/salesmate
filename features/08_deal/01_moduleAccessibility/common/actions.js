const assert = require('assert');
const { until } = require('selenium-webdriver');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const formElementsObj = require('../../../00_common/webElements/formElements');

//will navigate on the dashboard page and then come back to the deal module page
async function comeBackToDealListingPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(5000);
    const dealModule =  await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_deal','Deal Icon');
    await driver.executeScript("arguments[0].click();",dealModule);
    await driver.sleep(3000);
}exports.comeBackToDealListingPage = comeBackToDealListingPage;

async function openDealListingPage(driver,screenshotPath) {
    await driver.sleep(2000);
    const dealModule = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_deal','Deal Icon');
    await driver.executeScript("arguments[0].click();",dealModule);
    await driver.sleep(3000);
    //will verify whether the deal module page found or not
    try{
        await driver.wait(until.urlContains('app/deals/list'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/dealModulePage_NotFound.png');
        await assert.fail('Due to the deal listing page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/dealModulePage_NotFound.png\'.');
    }
    console.log('The deal listing page has been opened successfully...');
}exports.openDealListingPage = openDealListingPage;
const assert = require('assert');
const { until } = require('selenium-webdriver');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

//will navigate on the dashboard page and then come back to the contact module page
async function comeBackToContactListingPage(driver,screenshotPath){
    const companyModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
    await companyModule.click();
    await driver.sleep(2500);
    const contactModule =  await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_contacts','Contact Icon');
    await contactModule.click();
    await driver.sleep(2000);
}exports.comeBackToContactListingPage=comeBackToContactListingPage;

async function openContactListingPage(driver,screenshotPath) {
    await driver.sleep(1000);
    const contactModule =  await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_contacts','Contact Icon');
    await contactModule.click();
    await driver.sleep(3000);
    //will verify whether the contact module page found or not
    try{
        await driver.wait(until.urlContains('app/contacts/list'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/contactModulePage_NotFound.png');
        await assert.fail('Due to the contact listing page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/contactModulePage_NotFound.png\'.');
    }
    console.log('The contact listing page has been opened successfully...');
}exports.openContactListingPage=openContactListingPage;
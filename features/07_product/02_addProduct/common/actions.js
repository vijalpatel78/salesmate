const assert = require('assert');
const { until } = require('selenium-webdriver');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/05_product/screenshots';
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

//will navigate on the dashboard page and then come back to the product module page
async function comeBackToProductListingPage(driver,screenshotPath){
    try {
        const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactModule.click();
        await driver.sleep(2500);
        const productIcon = await moduleElementsObj.findModuleIcon(driver, 'icon-ic_product');
        await productIcon.click();
        await driver.sleep(3000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'productListingPage_NotFound.png');
        await assert.fail(err);
    }
}exports.comeBackToProductListingPage=comeBackToProductListingPage;

async function openProductListingPage(driver) {
    await driver.sleep(1000);
    const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
    await productIcon.click();
    await driver.sleep(3000);
    //will verify whether the product module page found or not
    try{
        await driver.wait(until.urlContains('app/products/list'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/productModulePage_NotFound.png');
        await assert.fail('Due to the product listing page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/productModulePage_NotFound.png\'.');
    }
    console.log('The product listing page has been opened successfully...');
}exports.openProductListingPage=openProductListingPage;
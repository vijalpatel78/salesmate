const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/06_massOperations/04_importExport/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//-----------------Case 3: Verify, on click of the 'Import Deals' option, the system should redirect to the respective import page-------------

When('on click of {string} option, the system should redirect to respective import page',async function(importLink){
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const importFileLinkElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${importLink}`);
        await importFileLinkElement.click();
        await driver.sleep(3000);
        const currentUrl = await driver.getCurrentUrl();
        if(await currentUrl.endsWith('app/setup/migrate-data/from-sheet')) {
            console.log("As Import Deals page redirected to expected url page,so test case has been passed");
        } else {
            await assert.fail("As Import Deals page is not redirected to expected url page,so test case has been aborted");
        }
        const dealModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",dealModule);
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'importFileURL_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/09_activity/06_massOperations/03_massTransfer/screenshots/';
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');

//-----------Case 5: As a User, Verify upon clicking on cancel button it should terminate transfer process--------------

When('user upon clicking on a cancel button it should terminate transfer process under the {string}',async function(massTransferButton) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massTransferButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massTransferButton}`);
        await massTransferButtonElement.click();
        await driver.sleep(2000);
        const transferCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await transferCancelButton.click();
        await driver.sleep(3000);
        const currentPageUrl = await driver.getCurrentUrl();
        if(currentPageUrl.endsWith('app/tasks/list')) {
            console.log("As mass transfer termination redirected to expected contact url page,so test case has been passed");
        } else {
            await assert.fail("As mass transfer termination is not redirected to expected contact url page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'transferTermination_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
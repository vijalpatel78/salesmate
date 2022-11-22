const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const fs = require('fs');
const screenshotPath = './features/08_deal/05_bulkOperations/03_bulkExport/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//-------------Case 3: Verify that it should allow me to export selected deals from the deals listing page--------------

When('Verify that it should allow me to export selected deals from the deals listing page',async function() {
    try {
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckbox.click();
        await driver.sleep(2000);
        //click on 'Export' button
        const exportButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Export ');
        await exportButton.click();
        await driver.sleep(2000);
        //will check the file is get downloaded or not
        const file = './downloadedFile/Deal-export-data.csv';
        try {
            assert(fs.statSync(file).isFile());
            const fileExtension = await file.split('.').pop();
            console.log("File Extension: " + fileExtension);
            if (fileExtension === 'csv') {
                console.log("As downloaded file's extension is " + fileExtension + ",so test case has been passed");
            } else {
                await assert.fail("As downloaded file's extension is not expected " + fileExtension + ",so test case has been aborted");
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealFile_NotDownloaded.png');
            await assert.fail(err);
        }
        console.log('As "Deal-export-data.csv" file is downloaded successfully in the "./downloadedFile" folder,so test case has been passed');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
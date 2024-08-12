const { When } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/06_bulkOperations/02_bulkExport/screenshots/';
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');

//---Case 1: As a user, Verify I is able to see 'Export' option on grid header while clicking on available checkbox on products listing screen---------

When('user is able to see {string} option on grid header while clicking on available checkbox on products listing screen',async function(exportButton) {
    try {
        const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
        await productCheckbox.click();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'exportButtonVisibility.png');
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Export' button
        const exportButtonElement = await driver.findElements(By.xpath(`//button[text()=" ${exportButton} "]`));
        const exportButtonLength = await exportButtonElement.length;
        if (exportButtonLength > 0) {
            console.log("As user is able to see " + exportButton + " after checking product checkbox on products listing page,so test case has been passed");
        } else {
            await assert.fail("As user is unable to see " + exportButton + " after checking product checkbox on products listing page,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 2: Verify, user is able to export selected products from the products listing page-----------------

When('user is able to export selected products from the products listing page',async function() {
    try {
        const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
        await productCheckbox.click();
        await driver.sleep(2000);
        //click on 'Export' button
        const exportButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Export ');
        await exportButton.click();
        //will check the file is get downloaded or not
        const file = './downloadedFile/Product-export-data.csv';
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
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'productFile_NotDownloaded.png');
            await assert.fail('As sample file is not downloaded in the "./downloadedFile" folder, the test case has been aborted');
        }
        console.log('As "Product-export-data.csv" file is downloaded successfully in the "./downloadedFile" folder,so test case has been passed');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
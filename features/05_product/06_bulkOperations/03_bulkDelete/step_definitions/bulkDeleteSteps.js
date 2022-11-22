const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/06_bulkOperations/03_bulkDelete/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//---case 1: Verify, user is not able to see 'Delete' option on bulk operation when user does not have right to Mass Delete Products----------

Then('Bulk {string} button is not visible and log in through {string}',async function(deleteButton,adminUser) {
    try {
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const allProductsCheckbox = await moduleElementsObj.findAllProductsCheckbox(driver);
        await allProductsCheckbox.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const deleteProductButton = await driver.findElements(By.xpath(`//button[text()=" ${deleteButton} "]`));
        const deleteProductButtonLength = await deleteProductButton.length;
        if (deleteProductButtonLength === 0) {
            console.log("As delete product button length is " + deleteProductButtonLength + " so it is not displayed after disabling mass delete product right,so test case has been passed");
        } else {
            await assert.fail("As delete product button length is " + deleteProductButtonLength + " so it is displayed after disabling mass delete product right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---Case 2: As a user, I should able to see the 'Delete' option while clicking to the checkbox available on grid header----------

Then('Bulk {string} button is visible and log in through {string}',async function(deleteButton,adminUser) {
    try {
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const allProductsCheckbox = await moduleElementsObj.findAllProductsCheckbox(driver);
        await allProductsCheckbox.click();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteButtonVisibility.png');
        await driver.manage().setTimeouts({implicit: 2000});
        const deleteProductButton = await driver.findElements(By.xpath(`//button[text()=" ${deleteButton} "]`));
        const deleteProductButtonLength = await deleteProductButton.length;
        if (deleteProductButtonLength > 0) {
            console.log("As delete product button length is " + deleteProductButtonLength + " so it is displayed after enabling mass delete product right,so test case has been passed");
        } else {
            await assert.fail("As delete product button length is " + deleteProductButtonLength + " so it is not displayed even after enabling mass delete product right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----------------Case 3: Verify, user should be able to bulk delete products from product listing screen---------------

When('user should be able to bulk delete products from product listing screen and verify {string}',async function(expectedNotification) {
    try {
        const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
        await productCheckbox.click();
        await driver.sleep(1000);
        //click on bulk 'Delete' button
        const deleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await deleteButton.click();
        await driver.sleep(1000);
        //click on 'No' button
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button', 'No');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        //click on bulk 'Delete' button
        const deleteButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await deleteButtonElement.click();
        await driver.sleep(1000);
        //click on 'Yes' button
        const deleteConfirmationButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button', 'Yes');
        await deleteConfirmationButtonElement.click();
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(4000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
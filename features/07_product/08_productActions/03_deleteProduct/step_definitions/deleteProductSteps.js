const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/08_productActions/03_deleteProduct/screenshots/';
const addProductElementsObj = require('../../../02_addProduct/common/addProductElements');
const pageNavigationObj = require('../../../02_addProduct/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let productListsCountBeforeDeletion = 'no';

//-----Case 1: Verify, the delete product button should not be displayed when the user doesn't have Add Product rights-----

Then('delete option is not visible and log in through {string}',async function(adminUser) {
    try {
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.sleep(2000);
        const productName = await addProductElementsObj.clickOnProductName(driver, 'Test');
        await productName.click();
        await driver.sleep(2000);
        const optionsButton = await moduleElementsObj.findOptionsButton(driver);
        await optionsButton.click();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteOptionInVisibility.png');
        await driver.manage().setTimeouts({implicit: 2000});
        const deleteOption = await driver.findElements(By.xpath('//a[text()="Delete"]'));
        const deleteOptionLength = await deleteOption.length;
        if (deleteOptionLength === 0) {
            console.log("As delete option is disabled due to disabling delete right for standard user,so test case has been passed");
        } else {
            await assert.fail("As delete button is not disabled even after disabling delete right for standard user,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
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

//---------Case 2: Verify, the Delete product option should be displayed only when the user has Delete Product rights----------------

Then('delete option is visible and log in through {string}',async function(adminUser) {
    try {
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.sleep(2000);
        const productName = await addProductElementsObj.clickOnProductName(driver, 'Test');
        await productName.click();
        await driver.sleep(2000);
        const optionsButton = await moduleElementsObj.findOptionsButton(driver);
        await optionsButton.click();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteOptionVisibility.png');
        await driver.manage().setTimeouts({implicit: 2000});
        const deleteOption = await driver.findElements(By.xpath('//a[text()="Delete"]'));
        const deleteOptionLength = await deleteOption.length;
        console.log(deleteOptionLength);
        if (deleteOptionLength > 0) {
            console.log("As delete button is enabled due to enabling delete right for standard user,so test case has been passed");
        } else {
            await assert.fail("As delete button is not enabled even after enabling delete right for standard user,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
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

//-------------------------------Case 3: Verify, the user is able to delete a product-----------------------------------

When('user is able to delete a product {string} and verify {string} message',async function(productName,expectedNotification) {
    try {
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.sleep(2000);
        //get product lists count before deleting product
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        productListsCountBeforeDeletion = await productLists.length;
        const productNmae = await addProductElementsObj.clickOnProductName(driver, `${productName}`);
        await productNmae.click();
        await driver.sleep(2000);
        const optionsButton = await moduleElementsObj.findOptionsButton(driver);
        await optionsButton.click();
        await driver.sleep(1000);
        const deleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Delete');
        await deleteButton.click();
        await driver.sleep(1000);
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        //page navigation and come back to 'Product Listing' Page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        await driver.manage().setTimeouts({implicit: 2000});
        //get product lists count after deleting product
        const productListsElements = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        const productListsCountAfterDeletion = await productListsElements.length;
        await driver.manage().setTimeouts({implicit: 2000});
        //verify deleted product 'Product01' visibility
        const deletedProductElement = await driver.findElements(By.xpath(`//a[text()="${productName}"]`));
        const deletedProductLength = await deletedProductElement.length;
        if ((productListsCountBeforeDeletion) - 1 === productListsCountAfterDeletion && deletedProductLength === 0) {
            console.log("As product list count decreased by 1 i.e,(X-1) and also deleted product is not visible after delete operation,so test case has been passed");
        } else {
            await assert.fail("As product list count is not decreased by 1 i.e,(X-1) and also deleted product is visible after delete operation,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
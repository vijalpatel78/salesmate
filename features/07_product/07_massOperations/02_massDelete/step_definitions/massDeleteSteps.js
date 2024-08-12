const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/07_massOperations/02_massDelete/screenshots/';
const massUpdateProductElementsObj = require('../../01_massUpdate/common/massUpdateElements');
const pageNavigationObj = require('../../../02_addProduct/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//---Case 1: As a user, Verify that Delete button should not be displayed on bulk operation when user doesn't have a right to Mass Delete Products----------------

Then('{string} option is not visible and log in through {string}',async function(massDeleteProductButton,adminUser) {
    try {
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const massDeleteProductLink = await driver.findElements(By.xpath(`//a[text()="${massDeleteProductButton}"]`));
        const massDeleteProductLinkLength = await massDeleteProductLink.length;
        if (massDeleteProductLinkLength === 0) {
            console.log("As mass delete product link length is " + massDeleteProductLinkLength + " so it is not displayed under 'Actions' after disabling mass delete product right,so test case has been passed");
        } else {
            await assert.fail("As mass delete product link length is " + massDeleteProductLinkLength + " so it is displayed under 'Actions' after disabling mass delete product right,so test case has been aborted");
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

//---Case 2: As a user, I should able to see 'Mass Delete' option when user has 'Mass Delete Product' right------------------

Then('{string} option is visible and log in through {string}',async function(massDeleteProductButton,adminUser) {
    try {
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updateButtonVisibility.png');
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const massDeleteProductLink = await driver.findElements(By.xpath(`//a[text()="${massDeleteProductButton}"]`));
        const massDeleteProductLinkLength = await massDeleteProductLink.length;
        if (massDeleteProductLinkLength > 0) {
            console.log("As mass delete product link length is " + massDeleteProductLinkLength + " so it is displayed under 'Actions' after enabling mass delete product right,so test case has been passed");
        } else {
            await assert.fail("As mass delete product link length is " + massDeleteProductLinkLength + " so it is not displayed under 'Actions' even after enabling mass delete product right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----Case 3: As a user, I should be able to delete products in bulk from the mass delete products page

When('user is able to delete products {string} in bulk from the mass delete products page and verify {string}',async function(deletedProductName,expectedNotification) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteProductsLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Products');
        await massDeleteProductsLink.click();
        await driver.sleep(1000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Name' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(1000);
        //get count of 'Products' before deletion
        const productsCountElements = await driver.findElements(By.xpath('//div[@col-id="name"]'));
        const productsCountBeforeDeletion = await productsCountElements.length;
        const productCheckbox = await moduleElementsObj.findProductCheckbox(driver, 1);
        await productCheckbox.click();
        await driver.sleep(500);
        //click on 'Delete' button
        const massDeleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await massDeleteButton.click();
        await driver.sleep(1000);
        const massDeleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await massDeleteConfirmationButton.click();
        await driver.sleep(1000);
        const massDeleteButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await massDeleteButtonElement.click();
        await driver.sleep(1000);
        const massDeleteConfirmationButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await massDeleteConfirmationButtonElement.click();
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(3000);
        //get count of 'Products' after deletion
        const productsCountElement = await driver.findElements(By.xpath('//div[@col-id="name"]'));
        const productsCountAfterDeletion = await productsCountElement.length;
        if ((productsCountBeforeDeletion) - 1 === productsCountAfterDeletion) {
            console.log("As products count is decreased by (X-1) after deletion of mass products,so test case has been passed");
        } else {
            await assert.fail("As products count is not decreased by (X-1) even after deletion of mass products,so test case has been aborted");
        }
        //page navigation and come back to product listing page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Deleted Product'
        const deletedProductElements = await driver.findElements(By.xpath(`//a[text()="${deletedProductName}"]`));
        const deletedProductLength = await deletedProductElements.length;
        if (deletedProductLength === 0) {
            console.log("As " + deletedProductName + " deleted product is not displayed under product listing page after deletion,so test case has been passed");
        } else {
            await assert.fail("As " + deletedProductName + " deleted product is displayed under product listing page even after deletion,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 4: As a User, Verify I should be able to display delete button disable if I haven't checked any checkbox----------

When('system should display {string} button as disabled if user have not checked any product checkbox',async function(massDeleteButton) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteProductsLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Products');
        await massDeleteProductsLink.click();
        await driver.sleep(1000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Name' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(1000);
        //check disability of 'Delete' button due to uncheck of product
        const deleteButton = await driver.findElement(By.xpath(`//button[text()="${massDeleteButton}"]`));
        await driver.executeScript("arguments[0].scrollIntoView();", deleteButton);
        await driver.sleep(2000);
        //screenshot 'disabled delete button'
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledDeleteButton.png');
        const deleteButtonDisability = !!await deleteButton.getAttribute('disabled');
        console.log("As no product is checked,is delete button is disabled: " + deleteButtonDisability);
        if (deleteButtonDisability === true) {
            console.log("As delete button is disabled due to user have not checked any product,so test case has been passed");
        } else {
            await assert.fail("As delete button is displayed even user have not checked any product,so test case has been aborted");
        }
        const massUpdateCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel')
        await massUpdateCancelButton.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 5: As a User, Verify upon clicking on cancel button it should terminate delete process-------------

When('user clicks on cancel button it should terminate delete process',async function() {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteProductsLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Products');
        await massDeleteProductsLink.click();
        await driver.sleep(1000);
        const massCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel')
        await massCancelButton.click();
        await driver.sleep(3000);
        const currentPageURL = await driver.getCurrentUrl();
        console.log("Current page URL: " + currentPageURL);
        if (currentPageURL.endsWith('app/products/list')) {
            console.log("After clicking on 'Cancel' button mass delete process terminated and user redirected to product listing page,so test case has been passed");
        } else {
            await assert.fail("After clicking on 'Cancel' button mass delete process is unterminated and user does not redirected to product listing page,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------Case 6: As a User, the system should give me a validation message when any criteria are not selected-----------

When('system should give a validation message as {string} when any criteria are not selected',async function(expectedValidation) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteProductsLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Products');
        await massDeleteProductsLink.click();
        await driver.sleep(1000);
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(1000);
        const validationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(validationMsgElement));
        const validationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(validationMsg, expectedValidation);
        await driver.sleep(3000);
        const massCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel')
        await massCancelButton.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
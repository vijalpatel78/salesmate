const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotPath = './features/08_deal/07_dealDetails/12_associatedProductWidget/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let associatedProductsCountBeforeOperation, product01FieldData = 'no', product02FieldData = 'no';

When('get count of associate products before operation',async function(){
    try {
        //get count of 'Associated Products'
        const associatedProductsText = await driver.findElement(By.xpath('//i[@class="count"]')).getText();
        console.log("Associated Contacts Text: "+associatedProductsText);
        const associatedProduct = await associatedProductsText.replace(/[\[\]']+/g, '');
        console.log(associatedProduct);
        const associatedProducts = await associatedProduct.replace("ASSOCIATE PRODUCTS ","");
        console.log(associatedProducts);
        associatedProductsCountBeforeOperation = await parseInt(associatedProducts);
        console.log("Associated Products Count: "+associatedProductsCountBeforeOperation);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associateProductsCount_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------------Case 1: As a User, Verify UI of 'Associated Product' widget--------------------------------

Then('verify the UI of "Associated Product" widget',async function(){
    try {
        const productName = await driver.findElement(By.xpath('//associated-product//div/div[1]/div/a')).getText();
        console.log("Product Name: "+productName);
        const productPrice = await driver.findElement(By.xpath('//associated-product-list//span[@class="price"]')).getText();
        console.log("Product Price: "+productPrice);
        const productQuantity = await driver.findElement(By.xpath('(//associated-product//span)[3]')).getText();
        console.log("Product Quantity: "+productQuantity);
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedProductWidget_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---Case 2: As a user, Verify 'No product found' message should be displayed in the associate product widget while if any product does not associate with the deal---

Then('{string} message should be displayed in associate product widget when any product does not associate with deal',async function(expectedNotification){
    try {
        const clickOnDeal = await moduleElementsObj.clickOnDealName(driver,3);
        await clickOnDeal.click();
        await driver.sleep(2500);
        const associatedProductsText = await driver.findElement(By.xpath('//i[@class="count"]')).getText();
        console.log("Associated Products Text: "+associatedProductsText);
        const associatedProduct = await associatedProductsText.replace(/[\[\]']+/g, '');
        console.log(associatedProduct);
        const associatedProducts = await associatedProduct.replace("ASSOCIATE PRODUCTS ","");
        console.log(associatedProducts);
        const associatedProductsCount = await parseInt(associatedProducts);
        console.log("Associated Products Count: "+associatedProductsCount);
        if(associatedProductsCount === 0) {
            //check 'No results found' message
            const actualNotification = await driver.findElement(By.xpath('//div[@class="no-data with-box wrapper"]')).getText();
            console.log("Actual Associated Products Count Notification: " + actualNotification);
            try {
                strictEqual(actualNotification, expectedNotification);
                console.log("As associated products are not found so 'No results found' message is displayed,so test case has been passed");
            } catch (err) {
                await assert.fail(err);
            }
        } else {
            await assert.fail("As associated products are found so 'No results found' message is not displayed,so test case has been aborted");
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 3: As a User, Verify user able to associate the Product by clicking on 'Add associate Product'----------------

Then('verify user able to associate Product as {string} and check {string}',async function(productName,expectedNotification){
    try {
        const addAssociateButton = await driver.findElement(By.xpath('//associated-product-list//section-title//a'));
        await addAssociateButton.click();
        await driver.sleep(1000);
        const searchContactField = await driver.findElement(By.xpath('//ngb-modal-window//ro-tag/div/input'));
        await searchContactField.sendKeys(productName);
        await driver.sleep(2000);
        const selectContact = await driver.findElement(By.xpath('//ul[@class="ro-tag-autocomplete-items"]/li[1]'));
        await selectContact.click();
        await driver.sleep(1500);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Save & Set Deal Value ');
        await saveButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(4000);
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------------Case 4: As a User, Verify that user able to associate multiple products in a deal--------------------------------

Then('verify that user able to associate multiple products in a deal',async function(dataTable){
    try {
        const addAssociateButton = await driver.findElement(By.xpath('//associated-product-list//section-title//a'));
        await addAssociateButton.click();
        await driver.sleep(1000);
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'product 01') {
                product01FieldData = dataTable.rawTable[i][1];

                //will check that the data for the product 01 is given or not
                if (product01FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product 01, the test case execution has been aborted');
                }

                //will select the provided value from the 'Product 01' search field
                await driver.sleep(1000);
                const searchContactField = await driver.findElement(By.xpath('//ngb-modal-window//ro-tag/div/input'));
                await clearFieldDataObj.clearFieldData(searchContactField);
                await searchContactField.sendKeys(product01FieldData);
                await driver.sleep(2000);
                const selectContact = await driver.findElement(By.xpath('//ul[@class="ro-tag-autocomplete-items"]/li[1]'));
                await selectContact.click();
                await driver.sleep(1500);
            } else if (fieldName == 'product 02') {
                product02FieldData = dataTable.rawTable[i][1];

                //will check that the data for the Product 02 field is given or not
                if (product02FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product 02 field, the test case execution has been aborted');
                }

                //will select the provided value from the 'Product 02' search field
                await driver.sleep(1000);
                const searchContactField = await driver.findElement(By.xpath('//ngb-modal-window//ro-tag/div/input'));
                await clearFieldDataObj.clearFieldData(searchContactField);
                await searchContactField.sendKeys(product02FieldData);
                await driver.sleep(2000);
                const selectContact = await driver.findElement(By.xpath('//ul[@class="ro-tag-autocomplete-items"]/li[1]'));
                await selectContact.click();
                await driver.sleep(1500);
                const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Save & Set Deal Value ');
                await saveButton.click();
                await driver.sleep(2000);
            }
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify associated product counts should increase',async function(){
    try{
        //get count of 'Associated Products'
        const associatedProductsText = await driver.findElement(By.xpath('//i[@class="count"]')).getText();
        console.log("Associated Products Text: "+associatedProductsText);
        const associatedProduct = await associatedProductsText.replace(/[\[\]']+/g, '');
        console.log(associatedProduct);
        const associatedProducts = await associatedProduct.replace("ASSOCIATE PRODUCTS ","");
        console.log(associatedProducts);
        const associatedProductsCountAfterOperation = await parseInt(associatedProducts);
        console.log("Associated Products Count: "+associatedProductsCountAfterOperation);
        if ((associatedProductsCountBeforeOperation)+2 === associatedProductsCountAfterOperation) {
            console.log("As after multiple associate products adding the count increased by (X+2),so test case has been passed");
        } else {
            await assert.fail("As after multiple associate products adding the count is not increased by (X+2),so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------------Case 5,6: As a User, Verify user able to remove associated product by clicking on delete icon--------------------------------

When('verify user able to remove the product and check {string}',async function(expectedNotification){
    try{
        //Remove an associated product
        const productQuantity = await driver.findElement(By.xpath('(//associated-product//span)[3]'));
        await productQuantity.click();
        await driver.sleep(1000);
        const productPrice01 = await driver.findElement(By.xpath('//ngb-modal-window//tr[2]/td[8]'));
        await productPrice01.click();
        await driver.sleep(500);
        const deleteIcon01 = await driver.findElement(By.xpath('(//ngb-modal-window//i[@class="icon-trash"])[2]'));
        await deleteIcon01.click();
        await driver.sleep(1000);
        const productPrice02 = await driver.findElement(By.xpath('//ngb-modal-window//tr[2]/td[8]'));
        await productPrice02.click();
        await driver.sleep(500);
        const deleteIcon02 = await driver.findElement(By.xpath('(//ngb-modal-window//i[@class="icon-trash"])[2]'));
        await deleteIcon02.click();
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Save & Set Deal Value ');
        await saveButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(4000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify associated product counts should decrease',async function(){
    try{
        //get count of 'Associated Products'
        const associatedProductsText = await driver.findElement(By.xpath('//i[@class="count"]')).getText();
        console.log("Associated Products Text: "+associatedProductsText);
        const associatedProduct = await associatedProductsText.replace(/[\[\]']+/g, '');
        console.log(associatedProduct);
        const associatedProducts = await associatedProduct.replace("ASSOCIATE PRODUCTS ","");
        console.log(associatedProducts);
        const associatedProductsCountAfterOperation = await parseInt(associatedProducts);
        console.log("Associated Products Count: "+associatedProductsCountAfterOperation);
        if ((associatedProductsCountBeforeOperation)-2 === associatedProductsCountAfterOperation) {
            console.log("As after removing associate products the count decreased by (X-2),so test case has been passed");
        } else {
            await assert.fail("As after removing associate products the count is not decreased by (X-2),so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------Case 7: As a User, Verify that Quick view should be open with product all details while user clicking to the product name--------------------------------

Then('verify that Quick view should be open with product all details while user clicking to the product name',async function(){
    try {
        const productName = await driver.findElement(By.xpath('(//associated-product//div/div[1]/div/a)[1]'));
        await productName.click();
        await driver.sleep(3500);
        const quickView = await driver.findElements(By.xpath('//quick-view-product//product-quick-view-header'));
        const quickViewLength = await quickView.length;
        if (quickViewLength > 0) {
            console.log("As on clicking on the product name it opened the quick view page,so test case has been passed");
        } else {
            await assert.fail("As on clicking on the product name it has not opened the quick view page,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
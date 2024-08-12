const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openProductListingPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/03_editProduct/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');
const pageNavigationObj = require('../common/actions');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const commonElementsObj = require('../../../00_common/webElements/formElements');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let productNameFieldData = 'no', salePriceFieldData = 'no', textLabelFieldData = 'no';
let skuFieldData = 'no', descriptionFieldData = 'no', activeState = 'no', tagFieldData = 'no', textAreaLabelData = 'no';
let intLabelData = 'no', decLabelData = 'no', dateAndTimeFieldData = 'no', dateFieldData = 'no', emailLabelData = 'no';
let phoneLabelData = 'no', selectLabelDropdownData = 'no', multiSelectLabelDropdownData1 = 'no';
let urlLabelData = 'no', bigIntLabelData = 'no', percentageLabelData = 'no', booleanState = 'no', currencyLabelData = 'no';
let productListsCount;

Given('the {string} is on product listing page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/products/list')){
        console.log('The product listing page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open product listing page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on product listing page');
        //will open the product listing page
        await openProductListingPageObj.openProductListingPage(driver);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open product listing page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on product listing page');
        //will open the product listing page
        await openProductListingPageObj.openProductListingPage(driver);
    }
    else {
        //as the user is logged in, it will open the product listing page
        await openProductListingPageObj.openProductListingPage(driver);
    }
});

//-----Case 1: Verify, the add product button should not be displayed when the user doesn't have Add Product rights-----

Then('add {string} button is not displayed and log in through {string}',async function(productButton,adminUser) {
    try {
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.manage().setTimeouts({implicit: 2000});
        const addProductButton = await driver.findElements(By.xpath(`//button[text()="${productButton} "]`));
        if (addProductButton.length === 0) {
            console.log("As add product button is not displayed after disabling add product rights,so test case has been passed");
        } else {
            await assert.fail("As add product button is displayed even after disabling add product rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath);
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath);
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------Case 2: Verify, the add product button should be displayed only when the user has Add Product rights----------------

Then('add {string} button is displayed and log in through {string}',async function(productButton,adminUser) {
    try {
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.manage().setTimeouts({implicit: 2000});
        const addProductButton = await driver.findElements(By.xpath(`//button[text()="${productButton} "]`));
        if (addProductButton.length > 0) {
            console.log("As add product button is displayed after enabling add product rights,so test case has been passed");
        } else {
            await assert.fail("As add product button is not displayed even after enabling add product rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath);
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath);
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------------Case 3: Verify, the dynamic module name should be displayed on the button------------------------

When('verification of updated dynamic module name as {string}',async function(expectedSingularName) {
    try {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedProductModuleName.png');
        const productModuleSingularName = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Product Module Singular Name: " + productModuleSingularName);
        await driver.sleep(1000);
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2500);
        const addProductButtonName = await driver.findElement(By.xpath('//div[@class="pull-right"]/button')).getText();
        console.log("Add Product Button Name: " + addProductButtonName);
        if (productModuleSingularName === expectedSingularName && addProductButtonName === expectedSingularName) {
            console.log("As dynamic module name and after updation,updated product singular name are displayed,so test case has been passed");
        } else {
            await assert.fail("As dynamic module name and after updation,updated product singular name are displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 4: Verify, the user is able to add a product with required details only---------------------

When('user is able to add a product with required details only',async function(dataTable) {
    try {
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'product name') {
                productNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required product name field is given or not
                if (productNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product label name field, the test case execution has been aborted');
                }

                //will find 'Product Name' field and pass the new data
                const productNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Product Name');
                await clearFieldDataObj.clearFieldData(productNameField);
                await productNameField.sendKeys(productNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','Sales Price');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            }
            // else if (fieldName == 'text label') {
            //     textLabelFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text label field is given or not
            //     if (textLabelFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Label' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','Text Label');
            //     await clearFieldDataObj.clearFieldData(textLabelField);
            //     await textLabelField.sendKeys(textLabelFieldData);
            //     await driver.sleep(1000);
            // }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on the save button and verify {string} message',async function(expectedNotification) {
    try {
        console.log("Product details before navigation:");
        const productName = await driver.findElement(By.id('name')).getAttribute('value');
        console.log(productName);
        const currency = await commonElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyName = await currency.getText();
        console.log(currencyName);
        const salePrice = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        console.log(salePrice);
        // const textLabel = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        // console.log(textLabel);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(500);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //page navigation and come back to 'Product Listing' Page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify newly added 'Product Name', 'Currency', 'Sales Price'
        const productNameDisplayed = await driver.findElement(By.xpath(`//a[text()=' ${productNameFieldData} ']`)).isDisplayed();
        console.log("Is Newly Added Product Name Displayed: " + productNameDisplayed);
        const currencyDisplayed = await driver.findElement(By.xpath(`//a[text()=" ${productNameFieldData} "]/following::div[@col-id="currency"][1]`)).isDisplayed();
        console.log("Is Newly Added Currency Displayed: " + currencyDisplayed);
        const salePriceDisplayed = await driver.findElement(By.xpath(`//a[text()=" ${productNameFieldData} "]/following::div[@col-id="unitPrice"][1]`)).isDisplayed();
        console.log("Is Sales Price Displayed: " + salePriceDisplayed);
        const productNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ` ${productNameFieldData} `,'productName');
        await productNameElement.click();
        console.log("Product details after navigation:");
        const quickPageProductName = await driver.findElement(By.id('name')).getAttribute('value');
        console.log(quickPageProductName);
        // const quickPageTextLabel = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        // console.log(quickPageTextLabel);
        const quickPageTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await quickPageTab.click();
        await driver.sleep(2000);
        const quickPageCurrency = await driver.findElement(By.xpath('//table//td[1]')).getText();
        console.log(quickPageCurrency);
        const quickPageSalePrice = await driver.findElement(By.xpath('//table//td[2]')).getText();
        console.log(quickPageSalePrice);
        // if (productName === quickPageProductName && currencyName.includes(quickPageCurrency) && textLabel === quickPageTextLabel) {
        //     console.log("As product details in add product page and quick page are equal,so test case has been passed");
        // } else {
        //     await assert.fail("As product details in add product page and quick page are not equal,so test case has been aborted");
        // }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 5: Verify, the user is able to add a product with all details-------------------------------

When('user is able to add a product with all details',async function(dataTable) {
    try {
        await driver.sleep(1000);
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'product name') {
                productNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required product name field is given or not
                if (productNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product label name field, the test case execution has been aborted');
                }

                //will find 'Product Name' field and pass the new data
                const productNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Product Name');
                await clearFieldDataObj.clearFieldData(productNameField);
                await productNameField.sendKeys(productNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sku/code') {
                skuFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sku/code field is given or not
                if (skuFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the sku/code field, the test case execution has been aborted');
                }

                //will find 'Sku/Code' field and pass the new data
                const skuCodeField = await formElementsObj.findElementById(driver,screenshotPath,'sku','SKU Code');
                await clearFieldDataObj.clearFieldData(skuCodeField);
                await skuCodeField.sendKeys(skuFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','Sales Price');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'description') {
                descriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required description field is given or not
                if (descriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const descriptionField = await formElementsObj.findElementById(driver,screenshotPath, 'description','descriptionField');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(descriptionFieldData);
                await driver.sleep(500);
            }
            // else if (fieldName == 'active state') {
            //     activeState = dataTable.rawTable[i][1].toLowerCase();
            //
            //     //will check that the provided data is valid to execute a test case or not
            //     if (activeState == 'enable' || activeState == 'disable') {
            //         //will find 'Active' checkbox
            //         const activeCheckbox = await formElementsObj.findElementById(driver,screenshotPath, 'isActive','activeCheckbox');
            //         await driver.executeScript("arguments[0].focus();", activeCheckbox);
            //         await driver.sleep(1000);
            //
            //         //will get the current value of 'Active Checkbox'
            //         const currentState = await activeCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
            //
            //         //will enable/disable 'Active Checkbox'
            //         if (currentState != activeState) {
            //             await driver.executeScript("arguments[0].click();", activeCheckbox);
            //         }
            //     } else {
            //         assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task active checkbox is not valid. The value should be either \'enable\' or \'disable\'');
            //     }
            // } else if (fieldName == 'tags') {
            //     tagFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required tags field is given or not
            //     if (tagFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Description' field and pass the new data
            //     const tagsField = await moduleElementsObj.findTagsField(driver);
            //     await clearFieldDataObj.clearFieldData(tagsField);
            //     await tagsField.sendKeys(tagFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'text label') {
            //     textLabelFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text label field is given or not
            //     if (textLabelFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Label' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','Text Label');
            //     await clearFieldDataObj.clearFieldData(textLabelField);
            //     await textLabelField.sendKeys(textLabelFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'text area label') {
            //     textAreaLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text area label field is given or not
            //     if (textAreaLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text area label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Area Label' field and pass the new data
            //     const textAreaLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textAreaCustomField1','textAreaField');
            //     await clearFieldDataObj.clearFieldData(textAreaLabelField);
            //     await textAreaLabelField.sendKeys(textAreaLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'int label') {
            //     intLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required int label field is given or not
            //     if (intLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required int label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Int Label' field and pass the new data
            //     const intLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'intCustomField1','intLabelField');
            //     await clearFieldDataObj.clearFieldData(intLabelField);
            //     await intLabelField.sendKeys(intLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'dec label') {
            //     decLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required dec label field is given or not
            //     if (decLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required dec label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Dec Label' field and pass the new data
            //     const decLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField1','decLabel');
            //     await clearFieldDataObj.clearFieldData(decLabelField);
            //     await decLabelField.sendKeys(decLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'date and time label') {
            //     dateAndTimeFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the date and time label field is given or not
            //     if (dateAndTimeFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the date and time label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Date And Time Label' field and pass the new data
            //     const dateAndTimeField = await formElementsObj.findElementById(driver,screenshotPath, 'dateTimeCustomField1','dateAndTimeField');
            //     await clearFieldDataObj.clearFieldData(dateAndTimeField);
            //     await dateAndTimeField.sendKeys(dateAndTimeFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'date label') {
            //     dateFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the date label field is given or not
            //     if (dateFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the date label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Date Label' field and pass the new data
            //     const dateField = await driver.findElement(By.xpath("//input[@id='dateCustomField2'] | //input[@id='dateCustomField1']"));
            //     await clearFieldDataObj.clearFieldData(dateField);
            //     await dateField.sendKeys(dateFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'email label') {
            //     emailLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required email label field is given or not
            //     if (emailLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required email label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Email Label' field and pass the new data
            //     const emailLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField2','emailLabelField');
            //     await clearFieldDataObj.clearFieldData(emailLabelField);
            //     await emailLabelField.sendKeys(emailLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'phone label') {
            //     phoneLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required phone label field is given or not
            //     if (phoneLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required phone label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Dec Label' field and pass the new data
            //     const phoneLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField3','phoneLabelField');
            //     await clearFieldDataObj.clearFieldData(phoneLabelField);
            //     await phoneLabelField.sendKeys(phoneLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'select label') {
            //     selectLabelDropdownData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the select label dropdown field is given or not
            //     if (selectLabelDropdownData == '') {
            //         await assert.fail('Due to the blank value is provided for the select label dropdown field, the test case execution has been aborted');
            //     }
            //
            //     //will select the provided new dropdown value from the 'Select Label' dropdown list
            //     await driver.sleep(1000);
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'textCustomField4', selectLabelDropdownData, 'yes');
            // } else if (fieldName == 'multi select label') {
            //     multiSelectLabelDropdownData1 = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the multi select label dropdown field is given or not
            //     if (multiSelectLabelDropdownData1 == '') {
            //         await assert.fail('Due to the blank value is provided for the multi select label dropdown field, the test case execution has been aborted');
            //     }
            //
            //     //will select the provided new dropdown value from the 'Multi Select Label' dropdown list
            //     await driver.sleep(1000);
            //     await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
            //     await driver.findElement(By.xpath(`//li[text()="${multiSelectLabelDropdownData1}"]`)).click();
            //     await driver.findElement(By.xpath('//li[text()="M4"]')).click();
            //     await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
            //     await driver.sleep(500);
            // } else if (fieldName == 'url label') {
            //     urlLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required url label field is given or not
            //     if (urlLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required url label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'URL Label' field and pass the new data
            //     const urlLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField5','urlLabelField');
            //     await clearFieldDataObj.clearFieldData(urlLabelField);
            //     await urlLabelField.sendKeys(urlLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'big int label') {
            //     bigIntLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required big int label field is given or not
            //     if (bigIntLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required big int label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Big Int Label' field and pass the new data
            //     const bigIntLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'bigIntCustomField1','bigIntLabelField');
            //     await clearFieldDataObj.clearFieldData(bigIntLabelField);
            //     await bigIntLabelField.sendKeys(bigIntLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'percentage label') {
            //     percentageLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required percentage label field is given or not
            //     if (percentageLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required percentage label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Percentage Label' field and pass the new data
            //     const percentageLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField2','percentageLabelField');
            //     await clearFieldDataObj.clearFieldData(percentageLabelField);
            //     await percentageLabelField.sendKeys(percentageLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'boolean state') {
            //     booleanState = dataTable.rawTable[i][1].toLowerCase();
            //
            //     //will check that the provided data is valid to execute a test case or not
            //     if (booleanState == 'enable' || booleanState == 'disable') {
            //         //will find 'Boolean' checkbox
            //         const booleanCheckbox = await formElementsObj.findElementById(driver,screenshotPath, 'checkboxCustomField1','booleanCheckbox');
            //         await driver.executeScript("arguments[0].focus();", booleanCheckbox);
            //         await driver.sleep(1000);
            //
            //         //will get the current value of 'Boolean Checkbox'
            //         const currentState = await booleanCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
            //
            //         //will enable/disable 'Boolean Checkbox'
            //         if (currentState != booleanState) {
            //             await driver.executeScript("arguments[0].click();", booleanCheckbox);
            //         }
            //     } else {
            //         assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the boolean checkbox is not valid. The value should be either \'enable\' or \'disable\'');
            //     }
            // } else if (fieldName == 'currency label') {
            //     currencyLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required currency label field is given or not
            //     if (currencyLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required currency label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Currency Label' field and pass the new data
            //     const currencyLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField3','currencyLabelField');
            //     await clearFieldDataObj.clearFieldData(currencyLabelField);
            //     await currencyLabelField.sendKeys(currencyLabelData);
            //     await driver.sleep(500);
            // }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on the save button and verify newly added product details',async function() {
    try {
        await driver.sleep(1000);
        console.log("Product Details before navigation:");
        const productName = await driver.findElement(By.id('name')).getAttribute('value');
        console.log(productName);
        const skuCode = await driver.findElement(By.id('sku')).getAttribute('value');
        console.log(skuCode);
        const currency = await commonElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyName = await currency.getText();
        console.log(currencyName);
        const salePrice = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        console.log(salePrice);
        const description = await driver.findElement(By.id('description')).getAttribute('value');
        console.log(description);
        // const activeState = await driver.findElement(By.id('isActive')).getAttribute('value');
        // console.log(activeState);
        // const tags = await driver.findElement(By.xpath('//div[@class="tags-item-block"]//b')).getText();
        // console.log(tags);
        // const textLabel = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        // console.log(textLabel);
        // const textAreaLabel = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        // console.log(textAreaLabel);
        // const intLabel = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        // console.log(intLabel);
        // const decLabel = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        // console.log(decLabel);
        // const dateAndTimeLabel = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
        // console.log(dateAndTimeLabel);
        // const emailLabel = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        // console.log(emailLabel);
        // const phoneLabel = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        // console.log(phoneLabel);
        // const selectLabel = await commonElementsObj.findDropdown(driver, screenshotPath, 'textCustomField4');
        // const selectLabelText = await selectLabel.getText();
        // console.log(selectLabelText);
        // const multiSelectLabelText = await driver.findElement(By.xpath('//span[@role="combobox"]/ul/li[1]')).getText();
        // console.log(multiSelectLabelText);
        // const urlLabel = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        // console.log(urlLabel);
        // const bigIntLabel = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        // console.log(bigIntLabel);
        // const percentageLabel = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        // console.log(percentageLabel);
        // const booleanLabel = await driver.findElement(By.id('checkboxCustomField1')).getAttribute('value');
        // console.log(booleanLabel);
        // const currencyLabel = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        // console.log(currencyLabel);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(2500);
        //page navigation and come back to 'Product Listing' Page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify newly added 'Product Name', 'Currency', 'Sales Price'
        const productNameDisplayed = await driver.findElement(By.xpath(`//a[text()=' ${productNameFieldData} ']`)).isDisplayed();
        console.log("Is Newly Added Product Name Displayed: " + productNameDisplayed);
        const skuCodeDisplayed = await driver.findElement(By.xpath(`//a[text()=' ${productNameFieldData} ']/following::div[@col-id="sku"][2]`)).isDisplayed();
        console.log("Is Newly Added Sku/Code Displayed: " + skuCodeDisplayed);
        const currencyDisplayed = await driver.findElement(By.xpath(`//a[text()=" ${productNameFieldData} "]/following::div[@col-id="currency"][2]`)).isDisplayed();
        console.log("Is Newly Added Currency Displayed: " + currencyDisplayed);
        const salePriceDisplayed = await driver.findElement(By.xpath(`//a[text()=" ${productNameFieldData} "]/following::div[@col-id="unitPrice"][2]`)).isDisplayed();
        console.log("Is Sales Price Displayed: " + salePriceDisplayed);
        const descriptionDisplayed = await driver.findElement(By.xpath(`//a[text()=" ${productNameFieldData} "]/following::div[@col-id="description"][2]`)).isDisplayed();
        console.log("Is Description Displayed: " + descriptionDisplayed);
        // const tagsDisplayed = await driver.findElement(By.xpath(`//a[text()=" ${productNameFieldData} "]/following::div[@col-id="tags"][2]`)).isDisplayed();
        // console.log("Is Tags Displayed: " + tagsDisplayed);
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        const productNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ` ${productNameFieldData} `,'productName');
        await productNameElement.click();
        console.log("Product Details after navigation:");
        const quickPageProductName = await driver.findElement(By.id('name')).getAttribute('value');
        console.log(quickPageProductName);
        const quickPageSkuCode = await driver.findElement(By.id('sku')).getAttribute('value');
        console.log(quickPageSkuCode);
        const quickPageDescription = await driver.findElement(By.id('description')).getAttribute('value');
        console.log(quickPageDescription);
        // const quickPageActiveState = await driver.findElement(By.id('isActive')).getAttribute('value');
        // console.log(quickPageActiveState);
        // const quickPageTags = await driver.findElement(By.xpath('//div[@class="tags-item-block"]//b')).getText();
        // console.log(quickPageTags);
        // const quickPageTextLabel = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        // console.log(quickPageTextLabel);
        // const quickPageTextAreaLabel = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        // console.log(quickPageTextAreaLabel);
        // const quickPageIntLabel = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        // console.log(quickPageIntLabel);
        // const quickPageDecLabel = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        // console.log(quickPageDecLabel);
        // const quickPageDateAndTimeLabel = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
        // console.log(quickPageDateAndTimeLabel);
        // const quickPageEmailLabel = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        // console.log(quickPageEmailLabel);
        // const quickPagePhoneLabel = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        // console.log(quickPagePhoneLabel);
        // const quickPageSelectLabel = await commonElementsObj.findDropdown(driver, screenshotPath, 'textCustomField4');
        // const quickPageSelectLabelText = await quickPageSelectLabel.getText();
        // console.log(quickPageSelectLabelText);
        // const quickPageMultiSelectLabelText = await driver.findElement(By.xpath('//span[@role="combobox"]/ul/li[1]')).getText();
        // console.log(quickPageMultiSelectLabelText);
        // const quickPageURLLabel = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        // console.log(quickPageURLLabel);
        // const quickPageBigIntLabel = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        // console.log(quickPageBigIntLabel);
        // const quickPagePercentageLabel = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        // console.log(quickPagePercentageLabel);
        // const quickPageBooleanLabel = await driver.findElement(By.id('checkboxCustomField1')).getAttribute('value');
        // console.log(quickPageBooleanLabel);
        // const quickPageCurrencyLabel = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        // console.log(quickPageCurrencyLabel);
        // const quickPageTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', 'Price');
        // await quickPageTab.click();
        // await driver.sleep(2000);
        // const quickPageCurrency = await driver.findElement(By.xpath('//table//td[1]')).getText();
        // console.log(quickPageCurrency);
        // const quickPageSalePrice = await driver.findElement(By.xpath('//table//td[2]')).getText();
        // console.log(quickPageSalePrice);
        try {
            strictEqual(productName, quickPageProductName);
            strictEqual(skuCode, quickPageSkuCode);
            strictEqual(description, quickPageDescription);
            // strictEqual(activeState, quickPageActiveState);
            // strictEqual(tags, quickPageTags);
            // strictEqual(textLabel, quickPageTextLabel);
            // strictEqual(textAreaLabel, quickPageTextAreaLabel);
            // strictEqual(intLabel, quickPageIntLabel);
            // strictEqual(decLabel, quickPageDecLabel);
            // strictEqual(dateAndTimeLabel, quickPageDateAndTimeLabel);
            // strictEqual(emailLabel, quickPageEmailLabel);
            // strictEqual(phoneLabel, quickPagePhoneLabel);
            // strictEqual(urlLabel, quickPageURLLabel);
            // strictEqual(bigIntLabel, quickPageBigIntLabel);
            // strictEqual(percentageLabel, quickPagePercentageLabel);
            // strictEqual(booleanLabel, quickPageBooleanLabel);
            // strictEqual(currencyLabel, quickPageCurrencyLabel);
            console.log("As product details in add product page and quick page are equal,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 6: Verify, the user is not able to add a product by leaving required fields blank-----------------

When('click on the save button and verify {string},{string} and {string} validations',async function(expectedNameValidation,expectedSalePriceValidation,expectedTextLabelValidation) {
    try {
        //get product lists count before adding blank product details
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        productListsCount = await productLists.length;
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        const actualNameValidation = await driver.findElement(By.xpath('//add-product-form/div/div[1]/div[@class="row"]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualNameValidation, expectedNameValidation);
        const actualSalePriceValidation = await driver.findElement(By.xpath('//sm-input-txt[2]/sm-element//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSalePriceValidation, expectedSalePriceValidation);
        // const actualTextLabelValidation = await driver.findElement(By.xpath('//div/div[2]/div[@class="row"]/sm-input-txt[1]/sm-element//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualTextLabelValidation, expectedTextLabelValidation);
        const closeAddProductIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Close Icon');
        await closeAddProductIcon.click();
        await driver.sleep(1000);
        //get product lists count after adding blank product details
        const productList = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        const productListsCountAfterAddingBlankDetails = await productList.length;
        if (productListsCount === productListsCountAfterAddingBlankDetails) {
            console.log("As new product details are not added due to blank product details,so test case has been passed");
        } else {
            await assert.fail("As new product details are added even of blank product details,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 7: Verify, the user is not able to add a product with invalid data---------------------------

When('user is not able to add a product with invalid data',async function(dataTable) {
    try {
        //get product lists count before adding exceed length product details
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        productListsCount = await productLists.length;
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'product name') {
                productNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required product name field is given or not
                if (productNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product label name field, the test case execution has been aborted');
                }

                //will find 'Product Name' field and pass the new data
                const productNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Product Name');
                await clearFieldDataObj.clearFieldData(productNameField);
                await productNameField.sendKeys(productNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sku/code') {
                skuFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sku/code field is given or not
                if (skuFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the sku/code field, the test case execution has been aborted');
                }

                //will find 'Sku/Code' field and pass the new data
                const skuCodeField = await formElementsObj.findElementById(driver,screenshotPath,'sku','SKU Code');
                await clearFieldDataObj.clearFieldData(skuCodeField);
                await skuCodeField.sendKeys(skuFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','Sales Price');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            }
            // else if (fieldName == 'text label') {
            //     textLabelFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text label field is given or not
            //     if (textLabelFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Label' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','Text Label');
            //     await clearFieldDataObj.clearFieldData(textLabelField);
            //     await textLabelField.sendKeys(textLabelFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'int label') {
            //     intLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required int label field is given or not
            //     if (intLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required int label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Int Label' field and pass the new data
            //     const intLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'intCustomField1','intLabelField');
            //     await clearFieldDataObj.clearFieldData(intLabelField);
            //     await intLabelField.sendKeys(intLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'dec label') {
            //     decLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required dec label field is given or not
            //     if (decLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required dec label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Dec Label' field and pass the new data
            //     const decLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField1','decLabelField');
            //     await clearFieldDataObj.clearFieldData(decLabelField);
            //     await decLabelField.sendKeys(decLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'email label') {
            //     emailLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required email label field is given or not
            //     if (emailLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required email label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Email Label' field and pass the new data
            //     const emailLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField2','emailLabelField');
            //     await clearFieldDataObj.clearFieldData(emailLabelField);
            //     await emailLabelField.sendKeys(emailLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'phone label') {
            //     phoneLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required phone label field is given or not
            //     if (phoneLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required phone label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Dec Label' field and pass the new data
            //     const phoneLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField3','phoneLabelField');
            //     await clearFieldDataObj.clearFieldData(phoneLabelField);
            //     await phoneLabelField.sendKeys(phoneLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'big int label') {
            //     bigIntLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required big int label field is given or not
            //     if (bigIntLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required big int label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Big Int Label' field and pass the new data
            //     const bigIntLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'bigIntCustomField1','bigIntLabelField');
            //     await clearFieldDataObj.clearFieldData(bigIntLabelField);
            //     await bigIntLabelField.sendKeys(bigIntLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'percentage label') {
            //     percentageLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required percentage label field is given or not
            //     if (percentageLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required percentage label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Percentage Label' field and pass the new data
            //     const percentageLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField2','percentageLabelField');
            //     await clearFieldDataObj.clearFieldData(percentageLabelField);
            //     await percentageLabelField.sendKeys(percentageLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'currency label') {
            //     currencyLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required currency label field is given or not
            //     if (currencyLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required currency label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Currency Label' field and pass the new data
            //     const currencyLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField3','currencyLabelField');
            //     await clearFieldDataObj.clearFieldData(currencyLabelField);
            //     await currencyLabelField.sendKeys(currencyLabelData);
            //     await driver.sleep(500);
            // }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string},{string},{string},{string},{string}',async function(charValidation,longIntValidation,numberValidation,emailValidation,limitValidation) {
    try {
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
        const actualNameValidation = await driver.findElement(By.xpath('//add-product-form/div/div[1]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualNameValidation, charValidation);
        const actualSkuCodeValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[1]//sm-input-txt[1]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSkuCodeValidation, charValidation);
        const actualSalePriceValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[1]//sm-input-txt[2]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSalePriceValidation, longIntValidation);
        // const actualTextLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[1]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualTextLabelValidation, charValidation);
        // const actualIntLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[2]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualIntLabelValidation, numberValidation);
        // const actualDecLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[3]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualDecLabelValidation, longIntValidation);
        // const actualEmailLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[4]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualEmailLabelValidation, emailValidation);
        // const actualPhoneLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[5]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualPhoneLabelValidation, charValidation);
        // const actualBigIntLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[7]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualBigIntLabelValidation, longIntValidation);
        // const actualPercentageLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[8]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualPercentageLabelValidation, limitValidation);
        // const actualCurrencyLabelValidation = await driver.findElement(By.xpath('//sm-form-creator/div/div[2]//sm-input-txt[9]//div[@class="error-message text-danger"]')).getText();
        // strictEqual(actualCurrencyLabelValidation, longIntValidation);
        const closeAddProductIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Close Icon');
        await closeAddProductIcon.click();
        await driver.sleep(1000);
        //get product lists count after adding exceed length product details
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        const productListsCountAfterAddingExceedLengthDetails = await productLists.length;
        if (productListsCount === productListsCountAfterAddingExceedLengthDetails) {
            console.log("As new product details are not added due to exceed length of product details,so test case has been passed");
        } else {
            await assert.fail("As new product details are added even of exceed length product details,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 8: Verify, the user is not able to add a product with duplicate SKU/Code------------------------

When('user is not able to add a product with duplicate SkuCode',async function(dataTable) {
    try {
        //get product lists count before adding duplicate Sku/Code
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        productListsCount = await productLists.length;
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'product name') {
                productNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required product name field is given or not
                if (productNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product label name field, the test case execution has been aborted');
                }

                //will find 'Product Name' field and pass the new data
                const productNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Product Name');
                await clearFieldDataObj.clearFieldData(productNameField);
                await productNameField.sendKeys(productNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sku/code') {
                skuFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sku/code field is given or not
                if (skuFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the sku/code field, the test case execution has been aborted');
                }

                //will find 'Sku/Code' field and pass the new data
                const skuCodeField = await formElementsObj.findElementById(driver,screenshotPath,'sku','SKU Code');
                await clearFieldDataObj.clearFieldData(skuCodeField);
                await skuCodeField.sendKeys(skuFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','Sales Price');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            }
            // else if (fieldName == 'text label') {
            //     textLabelFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text label field is given or not
            //     if (textLabelFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Label' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','Text Label');
            //     await clearFieldDataObj.clearFieldData(textLabelField);
            //     await textLabelField.sendKeys(textLabelFieldData);
            //     await driver.sleep(500);
            // }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify duplicate {string} message',async function(expectedDuplicateValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualDuplicateValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualDuplicateValidation, expectedDuplicateValidation);
        await driver.sleep(5000);
        const closeAddProductIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Close Icon');
        await closeAddProductIcon.click();
        await driver.sleep(1000);
        //get product lists count after adding duplicate Sku/Code
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        const productListsCountAfterAddingDuplicateSkuCode = await productLists.length;
        if (productListsCount === productListsCountAfterAddingDuplicateSkuCode) {
            console.log("As new product details are not added due to duplicate Sku/Code product value,so test case has been passed");
        } else {
            await assert.fail("As new product details are added even of duplicate Sku/Code product value,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 9: Verify, the dynamic module name should be displayed on the Add Form------------------------

When('dynamic module name should be displayed as {string} on add form',async function(expectedSingularName) {
    try {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedProductModuleName.png');
        const productModuleSingularName = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Product Module Singular Name: " + productModuleSingularName);
        await driver.sleep(1000);
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product* ');
        await addProductButton.click();
        await driver.sleep(1500);
        const addProductHeaderName = await driver.findElement(By.xpath('//add-product//h4[@class="modal-title pull-left"]')).getText();
        console.log("Add Product Header Name: " + addProductHeaderName);
        if (productModuleSingularName === expectedSingularName && addProductHeaderName.includes(expectedSingularName)) {
            console.log("As dynamic module header name of add product and after updation,updated product singular name are displayed,so test case has been passed");
        } else {
            await assert.fail("As dynamic module header name of add product and after updation,updated product singular name are displayed,so test case has been aborted");
        }
        const closeAddProductIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Close Icon');
        await closeAddProductIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---Case 10: Verify, the 'Manage Fields' link should not be displayed when the user doesn't have 'Manage Fields' rights------------

Then('"Manage Fields" link should not be displayed and log in through {string}',async function(adminUser) {
    try {
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of "Manage Fields"
        const manageFieldsLink = await driver.findElements(By.xpath('//add-product//a'));
        const manageFieldsLinkLength = await manageFieldsLink.length;
        if (manageFieldsLinkLength === 0) {
            console.log("As manage fields link on add form length is " + manageFieldsLinkLength + " so it is not displayed after disabling add product rights,so test case has been passed");
        } else {
            await assert.fail("As manage fields link on add form length is " + manageFieldsLinkLength + " so it is displayed after disabling add product rights,so test case has been aborted");
        }
        const closeAddProductIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Close Icon');
        await closeAddProductIcon.click();
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

//----Case 10: Verify, the 'Manage Fields' link should be displayed only when the user has 'Manage Fields' rights-------

Then('"Manage Fields" link should be displayed and log in through {string}',async function(adminUser) {
    try {
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        await driver.sleep(1000);
        //check visibility of "Manage Fields"
        const manageFieldsLink = await driver.findElements(By.xpath('//add-product//a[text()="Manage Fields"]'));
        const manageFieldsLinkLength = await manageFieldsLink.length;
        if (manageFieldsLinkLength > 0) {
            console.log("As manage fields link on add form length is " + manageFieldsLinkLength + " so it is not displayed after disabling add product rights,so test case has been passed");
        } else {
            await assert.fail("As manage fields link on add form length is " + manageFieldsLinkLength + " so it is displayed after disabling add product rights,so test case has been aborted");
        }
        const closeAddProductIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Close Icon');
        await closeAddProductIcon.click();
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

//-----------------------Case 11: Verify, the user is able to add multiple products at a time---------------------------

When('user is able to add multiple products at a time',async function(dataTable) {
    try {
        //get product listing page count of products list
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        productListsCount = await productLists.length;
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'product name') {
                productNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required product name field is given or not
                if (productNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product label name field, the test case execution has been aborted');
                }

                //will find 'Product Name' field and pass the new data
                const productNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Product Name');
                await clearFieldDataObj.clearFieldData(productNameField);
                await productNameField.sendKeys(productNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sku/code') {
                skuFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sku/code field is given or not
                if (skuFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the sku/code field, the test case execution has been aborted');
                }

                //will find 'Sku/Code' field and pass the new data
                const skuCodeField = await formElementsObj.findElementById(driver,screenshotPath,'sku','SKU Code');
                await clearFieldDataObj.clearFieldData(skuCodeField);
                await skuCodeField.sendKeys(skuFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','Sales Price');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'description') {
                descriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required description field is given or not
                if (descriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required description field, the test case execution has been aborted');
                }

                //will find 'Description' field and pass the new data
                const descriptionField = await formElementsObj.findElementById(driver,screenshotPath, 'description','descriptionField');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(descriptionFieldData);
                await driver.sleep(500);
            }
            // else if (fieldName == 'active state') {
            //     activeState = dataTable.rawTable[i][1].toLowerCase();
            //
            //     //will check that the provided data is valid to execute a test case or not
            //     if (activeState == 'enable' || activeState == 'disable') {
            //         //will find 'Active' checkbox
            //         const activeCheckbox = await formElementsObj.findElementById(driver,screenshotPath, 'isActive','activeCheckbox');
            //         await driver.executeScript("arguments[0].focus();", activeCheckbox);
            //         await driver.sleep(1000);
            //
            //         //will get the current value of 'Active Checkbox'
            //         const currentState = await activeCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
            //
            //         //will enable/disable 'Active Checkbox'
            //         if (currentState != activeState) {
            //             await driver.executeScript("arguments[0].click();", activeCheckbox);
            //         }
            //     } else {
            //         assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task active checkbox is not valid. The value should be either \'enable\' or \'disable\'');
            //     }
            // } else if (fieldName == 'tags') {
            //     tagFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required tags field is given or not
            //     if (tagFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required tags field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Description' field and pass the new data
            //     const tagsField = await moduleElementsObj.findTagsField(driver);
            //     await clearFieldDataObj.clearFieldData(tagsField);
            //     await tagsField.sendKeys(tagFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'text label') {
            //     textLabelFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text label field is given or not
            //     if (textLabelFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Label' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','Text Label');
            //     await clearFieldDataObj.clearFieldData(textLabelField);
            //     await textLabelField.sendKeys(textLabelFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'text area label') {
            //     textAreaLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text area label field is given or not
            //     if (textAreaLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text area label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Area Label' field and pass the new data
            //     const textAreaLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textAreaCustomField1','textAreaField');
            //     await clearFieldDataObj.clearFieldData(textAreaLabelField);
            //     await textAreaLabelField.sendKeys(textAreaLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'int label') {
            //     intLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required int label field is given or not
            //     if (intLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required int label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Int Label' field and pass the new data
            //     const intLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'intCustomField1','intLabelField');
            //     await clearFieldDataObj.clearFieldData(intLabelField);
            //     await intLabelField.sendKeys(intLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'dec label') {
            //     decLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required dec label field is given or not
            //     if (decLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required dec label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Dec Label' field and pass the new data
            //     const decLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField1','decLabelField');
            //     await clearFieldDataObj.clearFieldData(decLabelField);
            //     await decLabelField.sendKeys(decLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'date and time label') {
            //     dateAndTimeFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the date and time label field is given or not
            //     if (dateAndTimeFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the date and time label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Date And Time Label' field and pass the new data
            //     const dateAndTimeField = await formElementsObj.findElementById(driver,screenshotPath, 'dateTimeCustomField1','dateAndTimeField');
            //     await clearFieldDataObj.clearFieldData(dateAndTimeField);
            //     await dateAndTimeField.sendKeys(dateAndTimeFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'date label') {
            //     dateFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the date label field is given or not
            //     if (dateFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the date label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Date Label' field and pass the new data
            //     const dateField = await driver.findElement(By.xpath("//input[@id='dateCustomField2'] | //input[@id='dateCustomField1']"));
            //     await clearFieldDataObj.clearFieldData(dateField);
            //     await dateField.sendKeys(dateFieldData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'email label') {
            //     emailLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required email label field is given or not
            //     if (emailLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required email label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Email Label' field and pass the new data
            //     const emailLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField2','emailLabelField');
            //     await clearFieldDataObj.clearFieldData(emailLabelField);
            //     await emailLabelField.sendKeys(emailLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'phone label') {
            //     phoneLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required phone label field is given or not
            //     if (phoneLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required phone label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Dec Label' field and pass the new data
            //     const phoneLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField3','phoneLabelField');
            //     await clearFieldDataObj.clearFieldData(phoneLabelField);
            //     await phoneLabelField.sendKeys(phoneLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'select label') {
            //     selectLabelDropdownData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the select label dropdown field is given or not
            //     if (selectLabelDropdownData == '') {
            //         await assert.fail('Due to the blank value is provided for the select label dropdown field, the test case execution has been aborted');
            //     }
            //
            //     //will select the provided new dropdown value from the 'Select Label' dropdown list
            //     await driver.sleep(1000);
            //     await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'textCustomField4', selectLabelDropdownData, 'yes');
            // } else if (fieldName == 'multi select label') {
            //     multiSelectLabelDropdownData1 = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the multi select label dropdown field is given or not
            //     if (multiSelectLabelDropdownData1 == '') {
            //         await assert.fail('Due to the blank value is provided for the multi select label dropdown field, the test case execution has been aborted');
            //     }
            //
            //     //will select the provided new dropdown value from the 'Multi Select Label' dropdown list
            //     await driver.sleep(1000);
            //     await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
            //     await driver.findElement(By.xpath(`//li[text()="${multiSelectLabelDropdownData1}"]`)).click();
            //     await driver.findElement(By.xpath('//li[text()="M4"]')).click();
            //     await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
            //     await driver.sleep(500);
            // } else if (fieldName == 'url label') {
            //     urlLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required url label field is given or not
            //     if (urlLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required url label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'URL Label' field and pass the new data
            //     const urlLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'textCustomField5','urlLabelField');
            //     await clearFieldDataObj.clearFieldData(urlLabelField);
            //     await urlLabelField.sendKeys(urlLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'big int label') {
            //     bigIntLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required big int label field is given or not
            //     if (bigIntLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required big int label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Big Int Label' field and pass the new data
            //     const bigIntLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'bigIntCustomField1','bigIntLabelField');
            //     await clearFieldDataObj.clearFieldData(bigIntLabelField);
            //     await bigIntLabelField.sendKeys(bigIntLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'percentage label') {
            //     percentageLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required percentage label field is given or not
            //     if (percentageLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required percentage label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Percentage Label' field and pass the new data
            //     const percentageLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField2','percentageLabelField');
            //     await clearFieldDataObj.clearFieldData(percentageLabelField);
            //     await percentageLabelField.sendKeys(percentageLabelData);
            //     await driver.sleep(500);
            // } else if (fieldName == 'boolean state') {
            //     booleanState = dataTable.rawTable[i][1].toLowerCase();
            //
            //     //will check that the provided data is valid to execute a test case or not
            //     if (booleanState == 'enable' || booleanState == 'disable') {
            //         //will find 'Boolean' checkbox
            //         const booleanCheckbox = await formElementsObj.findElementById(driver,screenshotPath, 'checkboxCustomField1','booleanCheckbox');
            //         await driver.executeScript("arguments[0].focus();", booleanCheckbox);
            //         await driver.sleep(1000);
            //
            //         //will get the current value of 'Boolean Checkbox'
            //         const currentState = await booleanCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
            //
            //         //will enable/disable 'Boolean Checkbox'
            //         if (currentState != booleanState) {
            //             await driver.executeScript("arguments[0].click();", booleanCheckbox);
            //         }
            //     } else {
            //         assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the boolean checkbox is not valid. The value should be either \'enable\' or \'disable\'');
            //     }
            // } else if (fieldName == 'currency label') {
            //     currencyLabelData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required currency label field is given or not
            //     if (currencyLabelData == '') {
            //         await assert.fail('Due to the blank value is provided for the required currency label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Currency Label' field and pass the new data
            //     const currencyLabelField = await formElementsObj.findElementById(driver,screenshotPath, 'decimalCustomField3','currencyLabelField');
            //     await clearFieldDataObj.clearFieldData(currencyLabelField);
            //     await currencyLabelField.sendKeys(currencyLabelData);
            //     await driver.sleep(500);
            // }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save and add other button and verify {string} message',async function(expectedNotification) {
    try {
        await driver.sleep(1000);
        const saveAndAddOtherButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveAndNewSubmit','Save And Add Other');
        await saveAndAddOtherButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check 'Add Product' Page Visibility
        const addProductPage = await driver.findElements(By.xpath('//add-product//h4[@class="modal-title pull-left"]'));
        const addProductPageLength = await addProductPage.length;
        //check field value
        const productNameFieldValue = await driver.findElement(By.id('name')).getAttribute('value');
        const skuCodeFieldValue = await driver.findElement(By.id('sku')).getAttribute('value');
        const salePriceFieldValue = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const descriptionFieldValue = await driver.findElement(By.id('description')).getAttribute('value');
        // const tagsFieldValue = await driver.findElement(By.xpath('//ro-tag//input')).getAttribute('value');
        // const textLabelFieldValue = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        // const textAreaLabelFieldValue = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        // const intLabelFieldValue = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        // const decLabelFieldValue = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        // const dateAndTimeLabelFieldValue = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
        // const emailLabelFieldValue = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        // const phoneLabelFieldValue = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        // const urlLabelFieldValue = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        // const bigIntLabelFieldValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        // const percentageLabelFieldValue = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        // const currencyLabelFieldValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        if (addProductPageLength > 0) {
            console.log("As after adding new product details and after clicking on 'Save and add other' button,the add page remains opened,so test case has been passed");
        } else {
            await assert.fail("As after adding new product details and after clicking on 'Save and add other' button,the add page does not remains opened,so test case has been aborted");
        }
        try {
            strictEqual(productNameFieldValue, '');
            strictEqual(skuCodeFieldValue, '');
            strictEqual(salePriceFieldValue, '');
            strictEqual(descriptionFieldValue, '');
            // strictEqual(tagsFieldValue, '');
            // strictEqual(textLabelFieldValue, '');
            // strictEqual(textAreaLabelFieldValue, '');
            // strictEqual(intLabelFieldValue, '');
            // strictEqual(decLabelFieldValue, '');
            // strictEqual(dateAndTimeLabelFieldValue, '');
            // strictEqual(emailLabelFieldValue, '');
            // strictEqual(phoneLabelFieldValue, '');
            // strictEqual(urlLabelFieldValue, '');
            // strictEqual(bigIntLabelFieldValue, '');
            // strictEqual(percentageLabelFieldValue, '');
            // strictEqual(currencyLabelFieldValue, '');
        } catch (err) {
            await assert.fail("As after adding new product with 'Save and add other' option,the field values are not reset,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user adds only required fields',async function(dataTable) {
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'product name') {
                productNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required product name field is given or not
                if (productNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the product label name field, the test case execution has been aborted');
                }

                //will find 'Product Name' field and pass the new data
                const productNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Product Name');
                await clearFieldDataObj.clearFieldData(productNameField);
                await productNameField.sendKeys(productNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','Sales Price');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            }
            // else if (fieldName == 'text label') {
            //     textLabelFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required text label field is given or not
            //     if (textLabelFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required text label field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Text Label' field and pass the new data
            //     const textLabelField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','Text Label');
            //     await clearFieldDataObj.clearFieldData(textLabelField);
            //     await textLabelField.sendKeys(textLabelFieldData);
            //     await driver.sleep(500);
            // }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on the save button and verify add form existence and {string} message',async function(expectedNotification) {
    try {
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check 'Add Product' Page should not be visible
        const addProductPage = await driver.findElements(By.xpath('//add-product//h4[@class="modal-title pull-left"]'));
        const addProductPageLength = await addProductPage.length;
        if (addProductPageLength === 0) {
            console.log("As after adding new product details and after clicking on 'Save' button,the add page is closed,so test case has been passed");
        } else {
            await assert.fail("As after adding new product details and after clicking on 'Save' button,the add page is not closed,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: 2000});
        //get product lists count after adding required fields product details
        const productLists = await driver.findElements(By.xpath('//div[@col-id="currency"]'));
        const productListsCountAfterAddingRequiredFields = await productLists.length;
        if ((productListsCount) + 2 === productListsCountAfterAddingRequiredFields) {
            console.log("As product list is increased by 2 i.e, (X+2) more products as one with all user details and other with required fields details,so test case has been passed");
        } else {
            await assert.fail("As product list is not increased by 2 i.e, (X+2) more products as one with all user details and other with required fields details,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 12: Verify, the system should display only active currencies in the currency dropdown---------------

When('the system should display only active currencies in the currency dropdown',async function() {
    try {
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Currencies' tab
        const currenciesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Currencies ');
        //will set focus on the 'Currencies' tab
        await driver.executeScript("arguments[0].scrollIntoView();", currenciesTab[0]);
        await driver.wait(until.elementIsVisible(currenciesTab[0]));
        //will click on the 'Currencies' tab
        await currenciesTab[0].click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //get 'Active Currencies' List in 'Currencies' Page
        const activeCurrenciesElements = await driver.findElements(By.xpath('//table//td[2]'));
        const activeCurrenciesListLength = await activeCurrenciesElements.length;
        console.log("Currencies Page Active Currencies Length: " + activeCurrenciesListLength);
        for (let i = 1; i <= activeCurrenciesListLength; i++) {
            const activeCurrenciesList = await driver.findElement(By.css(`tr:nth-of-type(${i}) > td:nth-of-type(2)`)).getText();
            console.log(`Active Currencies List on 'Currencies' page ${i}: ` + activeCurrenciesList);
        }
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        const addProductButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Product ');
        await addProductButton.click();
        await driver.findElement(By.xpath('//div[1]/div[@class="row"]//div/span//span[@role="presentation"]/b[@role="presentation"]')).click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //get 'Active Currencies' Dropdown List in 'Add Product' Page
        const activeCurrenciesDropdown = await driver.findElements(By.xpath('//ul[@role="tree"]/li'));
        const activeCurrenciesDropdownLength = await activeCurrenciesDropdown.length;
        console.log("Add Product Page Currencies Dropdown Length: " + activeCurrenciesDropdownLength);
        for (let i = 1; i <= activeCurrenciesDropdownLength; i++) {
            const activeCurrenciesDropdown = await driver.findElement(By.xpath(`//ul[@role="tree"]/li[${i}]`)).getText();
            console.log(`Add Product Page Currencies Dropdown ${i}: ` + activeCurrenciesDropdown);
        }
        if (activeCurrenciesListLength === activeCurrenciesDropdownLength) {
            console.log("As active currencies list in 'Currencies' page and 'Add Product' page are equal,so test case has been passed");
        } else {
            await assert.fail("As active currencies list in 'Currencies' page and 'Add Product' page are not equal,so test case has been aborted");
        }
        const closeAddProductIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Close Icon');
        await closeAddProductIcon.click();
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
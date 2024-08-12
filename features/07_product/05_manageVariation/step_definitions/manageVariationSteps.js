const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/05_manageVariation/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const manageVariationElementsObj = require('../common/manageVariationElements');
const pageNavigationObj = require('../../02_addProduct/common/actions');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

let variationNameFieldData = 'no', salePriceFieldData = 'no', currencyFieldDropdownData = 'no', activeState = 'no';
let salePriceBeforeNavigation, currencyBeforeNavigation;

//-------------------Case 1: Verify UI of the 'Variation' tab and also verify 'Add Variation' button--------------------

When('Verify UI of the {string} tab and also verify {string} button',async function(tabName,buttonName) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'VariationPageVisibility.png');
        //check visibility of 'Variation Product'
        const variationProductElement = await driver.findElements(By.xpath('//div[@class="text-center no-data wrapper-lg with-box m-t-md"]'));
        //check visibility of 'Add Variation' button
        const addVariationButtonDisplayValue = await driver.findElement(By.xpath(`//a[text()="${buttonName}"]`)).isDisplayed();
        console.log("Is 'Add Variation' button displayed: " + addVariationButtonDisplayValue);
        const addVariationButtonElement = await driver.findElements(By.xpath(`//a[text()="${buttonName}"]`));
        if (variationProductElement.length > 0 && addVariationButtonElement.length > 0) {
            console.log("As variation product div and 'Add Variation' buttons are displayed under " + tabName + " tab,so test case has been passed");
        } else {
            await assert.fail("As variation product div and 'Add Variation' buttons are not displayed under " + tabName + " tab,so test case has been aborted");
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

//--Case 2: When No Variation is added to the product then it should display the 'Product doesn't have any variant available' message-----------------

When('No {string} is added to the product then it should display the {string} message',async function(tabName,expectedText) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Variation Product',if this div present then no variations are added
        const variationProductElement = await driver.findElements(By.xpath('//div[@class="text-center no-data wrapper-lg with-box m-t-md"]'));
        if (variationProductElement.length > 0) {
            const actualText = await driver.findElement(By.xpath('//div[@class="text-center no-data wrapper-lg with-box m-t-md"]')).getText();
            console.log("Displayed Text is: " + actualText);
            strictEqual(actualText, expectedText);
            await driver.sleep(1000);
            console.log("As variation product does not contain any products and so displays " + actualText + " so,test case has been passed");
        } else {
            await assert.fail("As variation product contains products and does not displays " + expectedText + " so,test case has been aborted");
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

//--------------------------Case 3: Verify User should be able to Add Variation of Product------------------------------

When('user is able to Add Variation of Product',async function(dataTable) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        const addVariationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add Variation');
        await addVariationButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'variation name') {
                variationNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required variation name field is given or not
                if (variationNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the variation name field, the test case execution has been aborted');
                }

                //will find 'Variation Name' field and pass the new data
                const variationNameField = await manageVariationElementsObj.findVariationNameField(driver);
                await clearFieldDataObj.clearFieldData(variationNameField);
                await variationNameField.sendKeys(variationNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salesPrice');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'currency') {
                currencyFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the currency field dropdown field is given or not
                if (currencyFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the currency field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Currency' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'currency', currencyFieldDropdownData, 'no');
            } else if (fieldName == 'active state') {
                activeState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (activeState == 'enable' || activeState == 'disable') {
                    //will find 'Active' checkbox
                    const activeCheckbox = await formElementsObj.findElementById(driver,screenshotPath, 'isActive','activeCheckbox');
                    await driver.executeScript("arguments[0].focus();", activeCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Active Checkbox'
                    const currentState = await activeCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Active Checkbox'
                    if (currentState != activeState) {
                        await driver.executeScript("arguments[0].click();", activeCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task active checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on Save button and verify {string} variant message',async function(expectedNotification) {
    try {
        //get 'Variation' values before navigation
        const variationNameBeforeNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        const salePriceBeforeNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const currency = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyBeforeNavigation = await currency.getText();
        const activeSalesCheckboxBeforeNavigation = await driver.findElement(By.id('isActive')).getAttribute('value');
        const saveButton = await manageVariationElementsObj.findSaveButton(driver);
        await saveButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //page navigation and come back to product listing page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        //verify added 'Variation' product details
        const quickPageVariationName = await driver.findElement(By.xpath('//b[@class="font-size-md m-r-xs"]')).getText();
        console.log("Quick Page Variation Name: " + quickPageVariationName);
        const quickPageSalePrice = await driver.findElement(By.xpath('//td[1]')).getText();
        console.log("Quick Page Sale Price: " + quickPageSalePrice);
        const quickPageCurrency = await driver.findElement(By.xpath('//td[2]')).getText();
        console.log("Quick Page Currency: " + quickPageCurrency);
        await driver.findElement(By.xpath('//td[text()="INR"]')).click();
        await driver.sleep(500);
        const variationButton = await manageVariationElementsObj.findEditVariationButton(driver, 1);
        await variationButton.click();
        await driver.sleep(2000);
        //get 'Variation' values after navigation
        const variationNameAfterNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        const salePriceAfterNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const currencyElement = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyAfterNavigation = await currencyElement.getText();
        const activeSalesCheckboxAfterNavigation = await driver.findElement(By.id('isActive')).getAttribute('value');
        try {
            strictEqual(variationNameBeforeNavigation, variationNameAfterNavigation);
            strictEqual(salePriceBeforeNavigation, salePriceAfterNavigation);
            strictEqual(currencyBeforeNavigation, currencyAfterNavigation);
            strictEqual(activeSalesCheckboxBeforeNavigation, activeSalesCheckboxAfterNavigation);
            console.log("As added variation product details before and after navigation remains same,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const editPriceCloseIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Edit Price Close Icon');
        await editPriceCloseIcon.click();
        await driver.sleep(1000);
        const closeIconElement = await moduleElementsObj.findCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------------Case 4: Verify, user is able to Edit Variation of Product-------------------------------------

When('user is able to edit Variation of Product',async function(dataTable) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//td[text()="INR"]')).click();
        await driver.sleep(500);
        const variationButton = await manageVariationElementsObj.findEditVariationButton(driver, 1);
        await variationButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salesPrice');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'currency') {
                currencyFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the currency field dropdown field is given or not
                if (currencyFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the currency field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Currency' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'currency', currencyFieldDropdownData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on Update button and verify {string} variant update message',async function(expectedNotification) {
    try {
        //get 'Variation' values before navigation
        const variationNameBeforeNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        const salePriceBeforeNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const currency = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyBeforeNavigation = await currency.getText();
        const activeSalesCheckboxBeforeNavigation = await driver.findElement(By.id('isActive')).getAttribute('value');
        const updateVariation = await manageVariationElementsObj.findUpdateVariationButton(driver);
        await updateVariation.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //page navigation and come back to product listing page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        //verify added 'Variation' product details
        const quickPageVariationName = await driver.findElement(By.xpath('//b[@class="font-size-md m-r-xs"]')).getText();
        console.log("Quick Page Variation Name: " + quickPageVariationName);
        const quickPageSalePrice = await driver.findElement(By.xpath('//td[1]')).getText();
        console.log("Quick Page Sale Price: " + quickPageSalePrice);
        const quickPageCurrency = await driver.findElement(By.xpath('//td[2]')).getText();
        console.log("Quick Page Currency: " + quickPageCurrency);
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(500);
        const variationButton = await manageVariationElementsObj.findEditVariationButton(driver, 1);
        await variationButton.click();
        await driver.sleep(2000);
        //get 'Variation' values after navigation
        const variationNameAfterNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        const salePriceAfterNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const currencyElement = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyAfterNavigation = await currencyElement.getText();
        const activeSalesCheckboxAfterNavigation = await driver.findElement(By.id('isActive')).getAttribute('value');
        try {
            strictEqual(variationNameBeforeNavigation, variationNameAfterNavigation);
            strictEqual(salePriceBeforeNavigation, salePriceAfterNavigation);
            strictEqual(currencyBeforeNavigation, currencyAfterNavigation);
            strictEqual(activeSalesCheckboxBeforeNavigation, activeSalesCheckboxAfterNavigation);
            console.log("As updated variation product details before and after navigation remains same,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const editPriceCloseIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Edit Price Close Icon');
        await editPriceCloseIcon.click();
        await driver.sleep(1000);
        const closeIconElement = await moduleElementsObj.findCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------Case 5: Verify, user is able to add Multiple prices of Particular Variation--------------------

When('user is able to add Multiple prices of Particular Variation',async function(dataTable) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        const addPriceButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Add Price');
        await addPriceButton.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salesPrice');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'currency') {
                currencyFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the currency field dropdown field is given or not
                if (currencyFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the currency field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Currency' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'currency', currencyFieldDropdownData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on Save button and verify {string} variant add message',async function(expectedNotification) {
    try {
        //get added 'Price' values before navigation
        salePriceBeforeNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const currency = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        currencyBeforeNavigation = await currency.getText();
        const saveButton = await manageVariationElementsObj.findSaveButton(driver);
        await saveButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--Case 6: Verify, user is able to see a list of all price added in a different currency for the particular variation--

When('user is able to see a list of all price added in a different currency for the particular variation',async function() {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        //verify added 'Price' details
        const quickPageCurrency = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(1)')).getText();
        console.log("Quick Page Newly Added Sale Price: " + quickPageCurrency);
        const quickPageSalePrice = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(2)')).getText();
        console.log("Quick Page Newly Added Currency: " + quickPageSalePrice);
        await driver.findElement(By.xpath('//td[text()="INR"]')).click();
        await driver.sleep(500);
        const variationButton = await manageVariationElementsObj.findEditVariationButton(driver, 2);
        await variationButton.click();
        await driver.sleep(2000);
        //get added 'Price' values after navigation
        const currencyElement = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyAfterNavigation = await currencyElement.getText();
        try {
            strictEqual(quickPageCurrency, currencyAfterNavigation);
            console.log("As added price variation product details before and after navigation remains same,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const editPriceCloseIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Edit Price Close Icon');
        await editPriceCloseIcon.click();
        await driver.sleep(1000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 7: Verify, user should be able to edit specific currency price for Particular Variation--------------

When('user should be able to edit specific currency price for Particular Variation',async function(dataTable) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(500);
        const variationButton = await manageVariationElementsObj.findEditVariationButton(driver, 1);
        await variationButton.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'sale price') {
                salePriceFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required sale price field is given or not
                if (salePriceFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required sale price field, the test case execution has been aborted');
                }

                //will find 'Sale Price' field and pass the new data
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salesPrice');
                await clearFieldDataObj.clearFieldData(salePriceField);
                await salePriceField.sendKeys(salePriceFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'currency') {
                currencyFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the currency field dropdown field is given or not
                if (currencyFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the currency field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Currency' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'currency', currencyFieldDropdownData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on Update button and verify {string} price update message',async function(expectedNotification) {
    try {
        //get Updated 'Price' values before navigation
        salePriceBeforeNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const currency = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        currencyBeforeNavigation = await currency.getText();
        const updateVariation = await manageVariationElementsObj.findUpdateVariationButton(driver);
        await updateVariation.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //page navigation and come back to product listing page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        //verify updated 'Price' details on quick page
        const quickPageSalePrice = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(1)')).getText();
        console.log("Quick Page Newly Added Sale Price: " + quickPageSalePrice);
        const quickPageCurrency = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(2)')).getText();
        console.log("Quick Page Newly Added Currency: " + quickPageCurrency);
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(500);
        const variationButton = await manageVariationElementsObj.findEditVariationButton(driver, 1);
        await variationButton.click();
        await driver.sleep(2000);
        //get updated 'Price' values after navigation
        const salePriceAfterNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        const currencyElement = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyAfterNavigation = await currencyElement.getText();
        try {
            strictEqual(salePriceBeforeNavigation, salePriceAfterNavigation);
            strictEqual(currencyBeforeNavigation, currencyAfterNavigation);
            console.log("As updated price variation product details before and after navigation remains same,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const editPriceCloseIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Edit Price Close Icon');
        await editPriceCloseIcon.click();
        await driver.sleep(1000);
        const closeIconElement = await moduleElementsObj.findCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 8: Verify, User should not be allowed to add 2 price for the same Variation in same currency----------------

When('user should not be allowed to add 2 price {string} for the same Variation in same currency and verify {string}',async function(salePrice,expectedValidation) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationsTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', 'Variations');
        await variationsTab.click();
        await driver.sleep(2000);
        const addPriceButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Add Price');
        await addPriceButton.click();
        await driver.sleep(500);
        //will find 'Sale Price' field and pass the new data
        const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salesPrice');
        await clearFieldDataObj.clearFieldData(salePriceField);
        await salePriceField.sendKeys(salePrice);
        await driver.sleep(500);
        const saveButton = await manageVariationElementsObj.findSaveButton(driver);
        await saveButton.click();
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        const editPriceCloseIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','close','Edit Price Close Icon');
        await editPriceCloseIcon.click();
        await driver.sleep(1000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 9: Verify, user should be able to delete specific currency price for Particular Variation---------

When('user is able to delete specific currency price for Particular Variation and verify {string} message',async function(expectedNotification) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        //get length of 'Prices' tab before deletion
        const tableElement = await driver.findElements(By.xpath('//td[1]'));
        const tableLengthBeforeDeletion = await tableElement.length;
        await driver.findElement(By.xpath('//td[text()="INR"]')).click();
        await driver.sleep(500);
        const deletePriceButton = await manageVariationElementsObj.findDeletePriceButton(driver, 2);
        await deletePriceButton.click();
        await driver.sleep(1000);
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //page navigation and come back to 'Product Listing' page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productNameElement.click();
        await driver.sleep(2000);
        const variationsTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', 'Variations');
        await variationsTab.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deletedPriceInvisibility.png');
        //get length of 'Prices' tab after deletion
        const tableElements = await driver.findElements(By.xpath('//td[1]'));
        const tableLengthAfterDeletion = await tableElements.length;
        await driver.manage().setTimeouts({implicit: 2000});
        if ((tableLengthBeforeDeletion) - 1 === tableLengthAfterDeletion) {
            console.log("As price tab length is (X-1) after deleting currency price,so test case has been passed");
        } else {
            await assert.fail("As price tab length is not (X-1) after deleting currency price,so test case has been aborted");
        }
        const closeIconElement = await moduleElementsObj.findCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------Case 10: Verify user should be able to delete Variation of Product-------------------------------

When('user is able to delete Variation of Product and verify {string} message',async function(expectedNotification) {
    try {
        const productNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productNameElement.click();
        await driver.sleep(2000);
        const variationTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Variations');
        await variationTab.click();
        await driver.sleep(2000);
        //get count of 'variations' before deletion
        const variationElement = await driver.findElements(By.xpath('//price-list'));
        const variationElementLength = await variationElement.length;
        console.log("Variation Count Before Deletion: " + variationElementLength);
        const variationDeleteButton = await manageVariationElementsObj.findVariationDeleteButton(driver, 1);
        await variationDeleteButton.click();
        await driver.sleep(1000);
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //page navigation and come back to 'Product Listing' page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const variationsTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', 'Variations');
        await variationsTab.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Variation'
        const variationCount = await driver.findElements(By.xpath('//price-list'));
        const variationCountLength = await variationCount.length;
        console.log("Variation Count After Deletion: " + variationCountLength);
        if (variationCountLength === 0) {
            console.log("As deleted variation is not found and variant is deleted successfully,so test case has been passed");
        } else {
            await assert.fail("As deleted variation is found and variant is not deleted successfully,so test case has been aborted");
        }
        const closeIconElement = await moduleElementsObj.findCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
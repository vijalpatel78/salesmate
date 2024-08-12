const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/04_managePrices/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const managePricesElementsObj = require('../common/managePricesElements');
const pageNavigationObj = require('../../02_addProduct/common/actions');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

let  salePriceFieldData = 'no', currencyFieldDropdownData = 'no', salePriceBeforeNavigation, currencyBeforeNavigation;

//--------------------------------Case 1: As a User, verify the UI of the 'Prices' Tab----------------------------------

When('user verify UI of the {string} Tab and visibility of {string},{string} fields and {string} button',async function(tabName,currencyField,salePriceField,addPriceButton) {
   try {
       const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
       await productName.click();
       await driver.sleep(2000);
       const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${tabName}`);
       await priceTab.click();
       await driver.manage().setTimeouts({implicit: 2000});
       //check visibility of 'Currency' and 'Sales Price'
       const currencyFieldDisplayValue = await driver.findElement(By.xpath(`//th[text()="${currencyField}"]`)).isDisplayed();
       console.log("Is CURRENCY field is displayed: " + currencyFieldDisplayValue);
       const currencyFieldElement = await driver.findElements(By.xpath(`//th[text()="${currencyField}"]`));
       const salePriceFieldDisplayValue = await driver.findElement(By.xpath(`//th[text()="${salePriceField}"]`)).isDisplayed();
       console.log("Is SALE PRICE field is displayed: " + salePriceFieldDisplayValue);
       const salePriceFieldElement = await driver.findElements(By.xpath(`//th[text()="${salePriceField}"]`));
       //get values of 'Currency' and 'Sales Price'
       const quickPageCurrencyValue = await driver.findElement(By.xpath('//table//td[1]')).getText();
       console.log("Quick page CURRENCY value: " + quickPageCurrencyValue);
       const quickPageSalePriceValue = await driver.findElement(By.xpath('//table//td[2]')).getText();
       console.log("Quick page SALE PRICE value: " + quickPageSalePriceValue);
       //check visibility of 'Add Price' button
       const addPriceDisplayValue = await driver.findElement(By.xpath(`//a[text()="${addPriceButton}"]`)).isDisplayed();
       console.log("Is 'Add Price' button displayed: " + addPriceDisplayValue);
       const addPriceElement = await driver.findElements(By.xpath(`//a[text()="${addPriceButton}"]`));
       if (currencyFieldElement.length > 0 && salePriceFieldElement.length > 0 && addPriceElement.length > 0) {
           console.log("As " + currencyField + "," + salePriceField + "," + addPriceButton + " are displayed under " + tabName + " tab,so test case has been passed");
       } else {
           await assert.fail("As " + currencyField + "," + salePriceField + "," + addPriceButton + " are not displayed under " + tabName + " tab,so test case has been aborted");
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

//-------------Case 2: Verify, user should able to Add Price with different currencies from the prices tab--------------

When('user should be able to Add Price with different currencies from the prices tab',async function(dataTable) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        const addPriceButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add Price');
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
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salePriceField');
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

Then('click on Save button and verify {string} message',async function(expectedNotification) {
    try {
        console.log("Price details before navigation:");
        salePriceBeforeNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        console.log(salePriceBeforeNavigation);
        const currency = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        currencyBeforeNavigation = await currency.getText();
        console.log(currencyBeforeNavigation);
        const editPriceSaveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Save ');
        await editPriceSaveButton.click();
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

//------------Case 3: Verify User should be able to see a list of all price added in different currencies---------------

When('user should be able to see a list of all prices added in different currencies',async function() {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        //get newly added 'Price' details on quickPage
        console.log("Below are Price details of Quick Page:");
        const quickPageDefaultCurrency = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(1)')).getText();
        console.log(quickPageDefaultCurrency);
        const quickPageDefaultSalePrice = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(2)')).getText();
        console.log(quickPageDefaultSalePrice);
        const quickPageNewlyAddedCurrency = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(1)')).getText();
        console.log(quickPageNewlyAddedCurrency);
        const quickPageNewlyAddedSalePrice = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(2)')).getText();
        console.log(quickPageNewlyAddedSalePrice);
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(300);
        const editPriceButton = await managePricesElementsObj.findEditPriceButton(driver, 2, 3);
        await editPriceButton.click();
        await driver.sleep(1000);
        console.log("Price details after navigation:");
        const salePriceAfterNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        console.log(salePriceAfterNavigation);
        const currencyElement = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyNameAfterNavigation = await currencyElement.getText();
        console.log(currencyNameAfterNavigation);
        if (quickPageNewlyAddedCurrency === currencyNameAfterNavigation) {
            console.log("As newly added price details before and after navigation remains same,so test case has been passed");
        } else {
            await assert.fail("As newly added price details before and after navigation does not remains same,so test case has been aborted");
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

//------------------------Case 4: Verify, user should be able to edit specific currency price---------------------------

When('user should be able to edit specific currency price',async function(dataTable) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(300);
        const editPriceButton = await managePricesElementsObj.findEditPriceButton(driver, 2, 3);
        await editPriceButton.click();
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
                const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salePriceField');
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

Then('click on Update button and verify {string} message and check updated price details',async function(expectedNotification) {
    try {
        await driver.sleep(1000);
        console.log("Updated Price details before navigation:");
        const salePriceBeforeNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        console.log(salePriceBeforeNavigation);
        const currency = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyBeforeNavigation = await currency.getText();
        console.log(currencyBeforeNavigation);
        const editPriceUpdateButton = await managePricesElementsObj.findEditPriceUpdateButton(driver);
        await editPriceUpdateButton.click();
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
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        //get newly updated 'Price' details on quickPage
        console.log("Below are Updated Price details of Quick Page:");
        const quickPageDefaultCurrency = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(1)')).getText();
        console.log(quickPageDefaultCurrency);
        const quickPageDefaultSalePrice = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(2)')).getText();
        console.log(quickPageDefaultSalePrice);
        const quickPageNewlyUpdatedCurrency = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(1)')).getText();
        console.log(quickPageNewlyUpdatedCurrency);
        const quickPageNewlyUpdatedSalePrice = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(2)')).getText();
        console.log(quickPageNewlyUpdatedSalePrice);
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(300);
        const editPriceButton = await managePricesElementsObj.findEditPriceButton(driver, 2, 3);
        await editPriceButton.click();
        await driver.sleep(1000);
        console.log("Updated Price details after navigation:");
        const salePriceAfterNavigation = await driver.findElement(By.id('unitPrice')).getAttribute('value');
        console.log(salePriceAfterNavigation);
        const currencyElement = await formElementsObj.findDropdown(driver, screenshotPath, 'currency');
        const currencyNameAfterNavigation = await currencyElement.getText();
        console.log(currencyNameAfterNavigation);
        if (salePriceBeforeNavigation === salePriceAfterNavigation && currencyBeforeNavigation === currencyNameAfterNavigation) {
            console.log("As newly added updated details before and after navigation remains same,so test case has been passed");
        } else {
            await assert.fail("As newly updated price details before and after navigation does not remains same,so test case has been aborted");
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

//--Case 5: Verify, If the user doesn't have 'Add/Update/Delete' product rights then user should not be able to 'Add/Update/Delete' Prices of Currency---------------------

When('user does not have Add,Update,Delete product rights then {string} should not be able to Add,Update,Delete Prices of Currency',async function(user) {
    try {
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Apps' tab
        const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        //will set focus on the 'Profile Permissions' tab
        await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
        await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
        //will click on the 'Profile Permissions' tab
        await profilePermissionsTab[0].click();
        await driver.sleep(1000);
        const editButton = await moduleElementsObj.findEditButton(driver);
        await editButton.click();
        await driver.sleep(2000);
        await moduleElementsObj.enableOrDisableToggleButtons(driver, ['switch_Product_add', 'switch_Product_edit', 'switch_Product_delete'], 'disable');
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','Save Button');
        await saveButton.click();
        await driver.sleep(3000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on product listing page');
        await driver.sleep(2000);
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('verify validations {string},{string},{string} and switch {string}',async function(expectedAddProductValidation,expectedEditProductValidation,expectedDeleteProductValidation,adminUser) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        const addPriceButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add Price');
        await addPriceButton.click();
        await driver.sleep(500);
        //will find 'Sale Price' field and pass the new data
        const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salePriceField');
        await clearFieldDataObj.clearFieldData(salePriceField);
        await salePriceField.sendKeys("17");
        await driver.sleep(500);
        const editPriceSaveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Save ');
        await editPriceSaveButton.click();
        await driver.sleep(1000);
        //will check validation for 'Add' product
        const actualAddValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualAddValidationElement));
        const actualAddProductValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualAddProductValidation, expectedAddProductValidation);
        await driver.sleep(3000);
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(1000);
        //will check validation for 'Edit' product
        await driver.findElement(By.xpath('//td[text()="INR"]')).click();
        await driver.sleep(300);
        const editPriceButton = await managePricesElementsObj.findEditPriceButton(driver, 1, 3);
        await editPriceButton.click();
        await driver.sleep(1000);
        const editPriceUpdateButton = await managePricesElementsObj.findEditPriceUpdateButton(driver);
        await editPriceUpdateButton.click();
        await driver.sleep(1000);
        const actualEditValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualEditValidationElement));
        const actualEditProductValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualEditProductValidation, expectedEditProductValidation);
        await driver.sleep(3000);
        const cancelButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButtonElement.click();
        await driver.sleep(1500);
        //will check validation for 'Delete' product
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(300);
        const deletePriceButton = await managePricesElementsObj.findDeletePriceButton(driver, 2, 3);
        await deletePriceButton.click();
        await driver.sleep(1000);
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        const actualDeleteValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualDeleteValidationElement));
        const actualDeleteProductValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualDeleteProductValidation, expectedDeleteProductValidation);
        await driver.sleep(6500);
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

//-------------------------Case 6: Verify, user should be able to delete specific currency price------------------------

When('user should be able to delete specific currency price and verify {string} message',async function(expectedNotification) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        //get length of 'Prices' tab before deletion
        const tableElement = await driver.findElements(By.xpath('//td[1]'));
        const tableLengthBeforeDeletion = await tableElement.length;
        await driver.findElement(By.xpath('//td[text()="USD"]')).click();
        await driver.sleep(300);
        const deletePriceButton = await managePricesElementsObj.findDeletePriceButton(driver, 2, 3);
        await deletePriceButton.click();
        await driver.sleep(1000);
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(6000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //page navigation and come back to 'Product Listing' page
        await pageNavigationObj.comeBackToProductListingPage(driver, screenshotPath);
        const productNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productNameElement.click();
        await driver.sleep(2000);
        const pricesTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await pricesTab.click();
        await driver.sleep(2500);
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

//--------------Case 7: Verify, user should be able to see Active currencies only in currency dropdown------------------

When('user should be able to see Active currencies only in currency dropdown',async function() {
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
        const productIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_product');
        await productIcon.click();
        await driver.sleep(2000);
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        const addPriceButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add Price');
        await addPriceButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//ngb-modal-window[2]//b[@role="presentation"]')).click();
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
        if ((activeCurrenciesListLength) + 1 === activeCurrenciesDropdownLength) {
            console.log("As active currencies list in 'Currencies' page and 'Add Product' page are equal,so test case has been passed");
        } else {
            await assert.fail("As active currencies list in 'Currencies' page and 'Add Product' page are not equal,so test case has been aborted");
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

//----------Case 8: Verify, user should not be allowed to add 2 prices for the same product with same currency----------

When('user should not be allowed to add 2 prices {string} for the same product with same currency and verify {string}',async function(salePriceValue,expectedValidation) {
    try {
        const productName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', ' Product01 ');
        await productName.click();
        await driver.sleep(2000);
        const priceTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Price');
        await priceTab.click();
        await driver.sleep(2000);
        const addPriceButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Add Price');
        await addPriceButton.click();
        await driver.sleep(500);
        //will find 'Sale Price' field and pass the new data
        const salePriceField = await formElementsObj.findElementById(driver,screenshotPath,'unitPrice','salePriceField');
        await clearFieldDataObj.clearFieldData(salePriceField);
        await salePriceField.sendKeys(salePriceValue);
        await driver.sleep(500);
        const editPriceSaveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Save ');
        await editPriceSaveButton.click();
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
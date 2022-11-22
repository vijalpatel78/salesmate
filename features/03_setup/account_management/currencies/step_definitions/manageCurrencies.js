const { Given,When,Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const currenciesPageElementObj = require('../common/currenciesPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/03_setup/account_management/currencies/screenshots/';
let beforeActiveCurrencies, expectedUsedCurrency;

Given('the {string} is on currencies page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    let currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/company/currencysettings')){
        console.log('The currencies page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open currencies page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on currencies page');
        //will open the currencies page
        await actionObj.openCurrenciesPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open currencies page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on currencies page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on currencies page');
        //will open the currencies page
        await actionObj.openCurrenciesPage(driver,screenshotPath);
    }
    else{
        //as the user is logged in, it will open the currencies page
        await actionObj.openCurrenciesPage(driver,screenshotPath);
    }
});

When('the user goes on the {string} tab', async (tabName) =>{
    //will open the provided tab i.e. Inactive Currencies or Active Currencies tab
    if(tabName == 'Inactive Currencies' || tabName == 'Active Currencies'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyType',tabName,'');
        await driver.sleep(2000);
    }else{
        assert.fail('The provided '+tabName+' tab name is not valid. The tab name should be either \'Inactive Currencies\' or \'Active Currencies\'. Note: The name is case sensitive.')
    }
});

When('click on the Activate button from the {string} currency', async (currencyCode) =>{
    //will check the provided currency code found or not
    const allInactiveCurrencyCode = await currenciesPageElementObj.getCurrencyCodeList(driver);
    if(allInactiveCurrencyCode.includes(currencyCode.toUpperCase())){
        //will find 'Activate' button of provided currency code
        const activateButton = await currenciesPageElementObj.findActivateOrDeactivateBtn(driver,screenshotPath,currencyCode.toUpperCase());
        //will click on the 'Activate' button
        await activateButton.click();
        await driver.sleep(2000);
    }else{
        /* The provided currency is not found on the inactive currencies list. So, to check this case, first, it will deactivate that currency */

        //will deactivate that provided currency code
        await actionObj.deactivateSpecificCurrency(driver,screenshotPath,currencyCode.toUpperCase());
        await driver.sleep(1000);
        //will activate that provided currency code
        await actionObj.activateSpecificCurrency(driver,screenshotPath,currencyCode.toUpperCase());
        await driver.sleep(2000);
    }
});

When('click on the Deactivate button from the {string} currency', async (currencyCode) =>{
    //will check the provided currency code found or not
    const allActiveCurrencyCode = await currenciesPageElementObj.getCurrencyCodeList(driver);
    if(allActiveCurrencyCode.includes(currencyCode.toUpperCase())){
        //will find 'Deactivate' button of provided currency code
        const deactivateButton = await currenciesPageElementObj.findActivateOrDeactivateBtn(driver,screenshotPath,currencyCode.toUpperCase());
        //will click on the 'Deactivate' button
        await deactivateButton.click();
        await driver.sleep(2000);
    }else{
        /* The provided currency is not found on the active currencies list. So, to check this case, first, it will activate that currency */

        //will activate that provided currency code
        await actionObj.activateSpecificCurrency(driver,screenshotPath,currencyCode.toUpperCase());
        await driver.sleep(2000);
        //will deactivate that provided currency code
        await actionObj.deactivateSpecificCurrency(driver,screenshotPath,currencyCode.toUpperCase());
        await driver.sleep(1000);
    }
});

When('click on the Activate all currencies button', async () =>{
    //will check the 'Activate all currencies' button is displayed or not
    const isActivateAllCurrenciesBtnDisplay = await currenciesPageElementObj.findActivateAllCurrenciesBtn(driver);
    if(isActivateAllCurrenciesBtnDisplay.length > 0){
        //will click on the 'Activate all currencies' button
        await driver.wait(until.elementIsEnabled(isActivateAllCurrenciesBtnDisplay[0]));
        await isActivateAllCurrenciesBtnDisplay[0].click();
        await driver.sleep(2000);
    }else{
        /* We are not showing 'Activate all currencies' button when all currencies are active. So, to check this case we have to deactivate some currencies */

        //will deactivate all unused currencies
        await actionObj.deactivateAllCurrencies(driver,screenshotPath);
        await driver.sleep(1000);
        //will activate all currencies as 'Activate all currencies' button is showing now
        await actionObj.activateAllCurrencies(driver,screenshotPath);
        await driver.sleep(2000);
    }
});

When('click on the Deactivate all unused currencies button', async () =>{
    //will get current active currencies list before deactivating all
    beforeActiveCurrencies = await currenciesPageElementObj.getCurrencyCodeList(driver);
    //will find 'Deactivate All Unused Currencies' button
    const deactivateAllUnusedCurrenciesBtn = await currenciesPageElementObj.findDeactivateAllUnusedCurrenciesBtn(driver,screenshotPath);
    //will click on the 'Deactivate All Unused Currencies' button
    await deactivateAllUnusedCurrenciesBtn.click();
    try{
        await driver.wait(until.elementIsEnabled(deactivateAllUnusedCurrenciesBtn),60000,'There seems to be some issue while deactivating all currencies.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Error_While_DeactivatingCurrencies.png');
        await driver.navigate().refresh();
        assert.fail(err+' Screenshot Name: \''+screenshotPath+'Error_While_DeactivatingCurrencies.png\'.');
    }
    await driver.sleep(2000);
});

When('click on the Deactivate button from the used currency', async () =>{
    //will get all used currencies list
    const allUsedCurrencies = await currenciesPageElementObj.getCurrencyCodeList(driver);
    expectedUsedCurrency = allUsedCurrencies[0];
    console.log('*** Info: Used Currency> '+expectedUsedCurrency+' ***');
    //will find 'Deactivate' button from the first used currency
    const deactivateButton = await currenciesPageElementObj.findActivateOrDeactivateBtn(driver,screenshotPath,expectedUsedCurrency);
    //will click on the 'Deactivate' button
    await deactivateButton.click();
    await driver.sleep(2000);
});

Then('the system should activate all currencies with {string} message', async (successMessage) =>{
    //will check success message
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, successMessage);
    await driver.sleep(3000);

    //will navigate on another page and come back to the currencies page after performing action
    await actionObj.comeBackToCurrenciesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will open inactive currencies tab
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyType','Inactive Currencies','');
    await driver.sleep(2000);

    //will check all currencies get activated or not
    const isNoRecordsFoundTextFound = await currenciesPageElementObj.findNoRecordsFoundText(driver);
    if(isNoRecordsFoundTextFound.length > 0){
        console.log('\'Activate all currencies\' case has been passed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NoRecordsFoundText_NotFound.png');
        await assert.fail('Due to the no records found text is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'NoRecordsFoundText_NotFound.png\'.');
    }
});

Then('the system should activate {string} currency with {string} message', async (currencyCode,successMessage) =>{
    //will check success message
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, successMessage);
    await driver.sleep(3000);

    //will navigate on another page and come back to the currencies page after performing action
    await actionObj.comeBackToCurrenciesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will check the provided currency get activated or not
    const allActiveCurrencyCode = await currenciesPageElementObj.getCurrencyCodeList(driver);
    if(allActiveCurrencyCode.includes(currencyCode.toUpperCase())){
        //set focus on the currency
        const currency = await currenciesPageElementObj.findActivateOrDeactivateBtn(driver,screenshotPath,currencyCode.toUpperCase());
        await driver.executeScript("arguments[0].focus();",currency);
        console.log('\'Activate '+currencyCode+' currency\' case has been passed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+currencyCode+'_NotActivated.png');
        await assert.fail('Due to the '+currencyCode+' currency is not get activated, the test case has been failed. Screenshot Name: \''+screenshotPath+currencyCode+'_NotActivated.png\'.');
    }
});

Then('the system should deactivate {string} currency with {string} message', async (currencyCode,successMessage) =>{
    //will check success message
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, successMessage);
    await driver.sleep(3000);

    //will navigate on another page and come back to the currencies page after performing action
    await actionObj.comeBackToCurrenciesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will open inactive currencies tab
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyType','Inactive Currencies','');
    await driver.sleep(2000);

    //will check the provided currency get deactivated or not
    const allInactiveCurrencyCode = await currenciesPageElementObj.getCurrencyCodeList(driver);
    if(allInactiveCurrencyCode.includes(currencyCode.toUpperCase())){
        //set focus on the currency
        const currency = await currenciesPageElementObj.findActivateOrDeactivateBtn(driver,screenshotPath,currencyCode.toUpperCase());
        await driver.executeScript("arguments[0].focus();",currency);
        console.log('\'Deactivate '+currencyCode+' currency\' case has been passed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+currencyCode+'_NotDeactivated.png');
        await assert.fail('Due to the '+currencyCode+' currency is not get deactivated, the test case has been failed. Screenshot Name: \''+screenshotPath+currencyCode+'_NotDeactivated.png\'.');
    }
});

Then('the system should deactivate all unused currencies with {string} message',async (successMessage) =>{
    //will check success message
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, successMessage);
    await driver.sleep(3000);

    //will navigate on another page and come back to the currencies page after performing action
    await actionObj.comeBackToCurrenciesPage(driver,screenshotPath);
    await driver.sleep(2000);

    //will check the all unused currencies get deactivated or not
    const afterActiveCurrencies = await currenciesPageElementObj.getCurrencyCodeList(driver);
    if(afterActiveCurrencies.length < beforeActiveCurrencies.length){
        console.log('\'Deactivate all unused currencies\' case has been passed successfully...');
    }else if(afterActiveCurrencies.length == beforeActiveCurrencies.length){
        console.log('*** Info: The unused currencies are already deactivated ***');
        console.log('\'Deactivate all unused currencies\' case has been passed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DeactivateAllCurrencies_NotWorking.png');
        await assert.fail('Due to the all unused currencies are not get deactivated, the test case has been failed. Screenshot Name: \''+screenshotPath+'DeactivateAllCurrencies_NotWorking.png\'.');
    }
});

Then('the system should give {string} validation message on the currencies page', async (validationMsg) =>{
    //will check the validation message is as per the expectation or not
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, validationMsg);
    await driver.sleep(3000);
});

Then('the used currency should not get deactivated', async () =>{
    //will navigate on another page and come back to the currencies page after performing action
    await actionObj.comeBackToCurrenciesPage(driver,screenshotPath);
    await driver.sleep(2000);

    //will check the used currency is still active or not
    const allUsedCurrencies = await currenciesPageElementObj.getCurrencyCodeList(driver);
    if(allUsedCurrencies.includes(expectedUsedCurrency)){
        console.log('\'The user can\'t deactivated used '+expectedUsedCurrency+' currency\' case has been passed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UsedCurrency_'+expectedUsedCurrency+'_Deactivated.png');
        await assert.fail('Due to the used '+expectedUsedCurrency+' currency is get deactivated, the test case has been failed. Screenshot Name: \''+screenshotPath+'UsedCurrency_'+expectedUsedCurrency+'_Deactivated.png\'.');
    }
});

Then('the user activate "USD" currency',async function(){
    try {
        await driver.findElement(By.xpath('  //button[@id="USD"]//span[.=" Activate "]')).click();
        await driver.sleep(3000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
})
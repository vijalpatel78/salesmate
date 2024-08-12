const assert = require('assert');
const { strictEqual } = require('assert');
const { By, until } = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const currenciesPageElementObj = require('./currenciesPageElements');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');

//will navigate on the dashboard page and then come back to the currencies page
async function comeBackToCurrenciesPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2500);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const currenciesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Currencies ');
    await driver.executeScript("arguments[0].scrollIntoView();",currenciesTab[0]);
    await driver.wait(until.elementIsVisible(currenciesTab[0]));
    await currenciesTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/company/currencysettings'),10000);
}exports.comeBackToCurrenciesPage=comeBackToCurrenciesPage;

async function openCurrenciesPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Currencies' tab
    const currenciesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Currencies ');

    //will check the 'Currencies' tab is visible or not
    if(currenciesTab.length > 0){
        //will set focus on the 'Currencies' tab
        await driver.executeScript("arguments[0].scrollIntoView();",currenciesTab[0]);
        await driver.wait(until.elementIsVisible(currenciesTab[0]));
        //will click on the 'Currencies' tab
        await currenciesTab[0].click();
        await driver.sleep(1000);
    }else{
        /* As 'Currencies' tab is not visible to the logged-in user, it will do Admin login on the same browser */

        let adminUserNumber = '';

        //will get the Admin user details from the xlsx file
        const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.profile[i].toLowerCase() == 'admin'){
                adminUserNumber = userDetails.user[i];
            }
        }
        //will check whether the Admin user found or not from the excel file
        if(adminUserNumber == ''){
            await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
        }

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on currencies page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on currencies page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Currencies' tab
        const currenciesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Currencies ');
        ///will set focus on the 'Currencies' tab
        await driver.executeScript("arguments[0].scrollIntoView();",currenciesTab[0]);
        await driver.wait(until.elementIsVisible(currenciesTab[0]));
        //will click on the 'Currencies' tab
        await currenciesTab[0].click();
        await driver.sleep(1000);
    }
    await driver.sleep(1000);

    //will verify whether the currencies page found or not
    try{
        await driver.wait(until.urlContains('app/setup/company/currencysettings'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CurrenciesPage_NotFound.png');
        await assert.fail('Due to the currencies page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'CurrenciesPage_NotFound.png\'.');
    }

    console.log('The currencies page has been opened successfully...');
}exports.openCurrenciesPage=openCurrenciesPage;

async function deactivateAllCurrencies(driver,screenshotPath){
    //will open active currencies tab
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyType','Active Currencies','');
    await driver.sleep(2000);
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
    await driver.sleep(1000);
    //will check the success message is given or not after deactivating all currencies
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, 'Currencies inactivated successfully');
    await driver.sleep(3000);
}exports.deactivateAllCurrencies=deactivateAllCurrencies;

async function activateAllCurrencies(driver,screenshotPath){
    //will open inactive currencies tab
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyType','Inactive Currencies','');
    await driver.sleep(2000);
    //will find 'Activate All Currencies' button
    const activateAllCurrenciesBtn = await currenciesPageElementObj.findActivateAllCurrenciesBtn(driver);
    await driver.wait(until.elementIsEnabled(activateAllCurrenciesBtn[0]));
    //will click on the 'Activate All Currencies' button
    await activateAllCurrenciesBtn[0].click();
    await driver.sleep(2000);
    //will check the success message is given or not after activating all currencies
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, 'Currencies activated successfully');
    await driver.sleep(3000);
}exports.activateAllCurrencies=activateAllCurrencies;

async function deactivateSpecificCurrency(driver,screenshotPath,currencyCode){
    //will open active currencies tab
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyType','Active Currencies','');
    await driver.sleep(2000);
    //will find 'Deactivate' button from the provided currency code
    const deactivateBtn = await currenciesPageElementObj.findActivateOrDeactivateBtn(driver,screenshotPath,currencyCode);
    //will click on the 'Deactivate' button
    await deactivateBtn.click();
    await driver.sleep(2000);
    //will check the success message is given or not after deactivating specific currency
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, 'Currency inactivated successfully');
    await driver.sleep(3000);
}exports.deactivateSpecificCurrency=deactivateSpecificCurrency;

async function activateSpecificCurrency(driver,screenshotPath,currencyCode){
    //will open inactive currencies tab
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyType','Inactive Currencies','');
    await driver.sleep(2000);
    //will find 'Activate' button from the provided currency code
    const activateBtn = await currenciesPageElementObj.findActivateOrDeactivateBtn(driver,screenshotPath,currencyCode);
    //will click on the 'Activate' button
    await activateBtn.click();
    await driver.sleep(2000);
    //will check the success message is given or not after activating specific currency
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, 'Currencies activated successfully');
    await driver.sleep(3000);
}exports.activateSpecificCurrency=activateSpecificCurrency;
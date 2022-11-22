const { Given,When,Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { strictEqual } = require('assert');
const { By, until } = require('selenium-webdriver');
const formElementObj = require('../../../../00_common/webElements/formElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/03_setup/account_management/fiscalYear/screenshots/';
let expectedFiscalYear;

Given('the {string} is on fiscal year page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/setup/company/fiscalyear')){
        console.log('The fiscal year page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open fiscal year page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on fiscal year page');
        //will open the fiscal year page
        await actionObj.openFiscalYearPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open fiscal year page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on fiscal year page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on fiscal year page');
        //will open the fiscal year page
        await actionObj.openFiscalYearPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the fiscal year page
        await actionObj.openFiscalYearPage(driver,screenshotPath);  
    }
});

When('the user select {string} month from the {string} dropdown', async (month,dropdown) =>{
    expectedFiscalYear = month;
    //will select the provided dropdown value
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'fiscalYear',month,'yes');
});

When('the user search {string} from the Fiscal year starts from dropdown', async (searchChars) =>{
    //will check the search chars are provided or not
    if(searchChars != ''){
        //will find the fiscal year dropdown and then click on it
        const fiscalYearDropdown = await formElementObj.findDropdown(driver,screenshotPath,'fiscalYear');
        await fiscalYearDropdown.click();
        //will find the dropdown search box and pass the search chars in it
        try{
            const dropdownSearchBox = await formElementObj.findDropdownSearchBox(driver,screenshotPath,'fiscalYear');
            await dropdownSearchBox.sendKeys(searchChars);
            await driver.sleep(1000);
        }catch(err){
            await fiscalYearDropdown.click();
            await driver.sleep(1000);
            assert.fail(err);
        }    
    }else{
        assert.fail('The search value is not provided for the \'Fiscal year starts from\' dropdown.');
    }
});

Then('the fiscal year should get set with a {string} message', async (expectedNotification) =>{
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification, expectedNotification);
    await driver.sleep(3000);
    try{
        assert.strictEqual(actualNotification,expectedNotification);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not given after performing operations, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }

    //will navigate on another page and come back to the fiscal year page after performing action
    await actionObj.comeBackToFiscalYearPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will get the current value of fiscal year 
    const fiscalYearDropdown = await formElementObj.findDropdown(driver,screenshotPath,'fiscalYear');
    const actualFiscalYear = await fiscalYearDropdown.getText();

    //will check the fiscal year value is get updated or not 
    try{
        assert.strictEqual(actualFiscalYear,expectedFiscalYear);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FiscalYear_NotSet.png');
        await assert.fail('Due to the fiscal year is not updated, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'FiscalYear_NotSet.png\'.');
    }

    console.log('\'Set '+expectedFiscalYear+' as a start month of the fiscal year\' case has been passed successfully...'); 
});

Then('the system should give {string} {string} for the Fiscal year starts from dropdown', async (unused,expectedSearchChars) =>{
    let searchResult;
    const fiscalYearDropdown = await formElementObj.findDropdown(driver,screenshotPath,'fiscalYear');
    
    //will find the fiscal year dropdown list
    const dropdownListElem = await formElementObj.findDropdownListElement(driver,screenshotPath,'fiscalYear');

    //will check the search result of dropdown contains search chars or not
    try{
        for(let i=0; i<dropdownListElem.length; i++){
            searchResult = await dropdownListElem[i].getText();
            searchResult = searchResult.toLowerCase();
            try{
                assert(searchResult.includes(expectedSearchChars.toLowerCase()));
            }catch(err){
                await screenshotObj.takeScreenshot(driver,screenshotPath+'DropdownSearch_NotWorking.png'); 
                assert.fail('Due to the \''+await dropdownListElem[i].getText()+'\' search result of \'Fiscal year starts from\' dropdown doesn\'t contain \''+expectedSearchChars+'\' search char(s), the test case has been failed. Screenshot Name: \''+screenshotPath+'DropdownSearch_NotWorking.png\'.');
            }
        }
    }catch(err){
        await fiscalYearDropdown.click();
        await driver.sleep(1000);
        assert.fail(err);
    }

    //will close the dropdown list
    await driver.sleep(1000);
    await fiscalYearDropdown.click();
    await driver.sleep(1000);

    console.log('\'Search \"'+expectedSearchChars+'\" value from the Fiscal year starts from dropdown\' case has been passed successfully...');   
});
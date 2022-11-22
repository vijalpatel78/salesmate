const { Given,When,Then } = require('@cucumber/cucumber');
const { By,until,Key } = require('selenium-webdriver');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const importGoogleContactsPageElementObj = require('../common/importGoogleContactsPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const systemModulesPageElementObj = require('../../../customizations/systemModules/common/systemModulesPageElements')
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/data_administration/importGoogleContacts/screenshots/';

let expectedContactSingularName = 'no', expectedContactPluralName='Contacts', totalGoogleAccounts=0;

Given('the {string} is on Import Google Contacts page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/import/data?moduleName=contact&isGoogleImport=true')){
        console.log('The import google contacts page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open import google contacts page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Import Google Contacts page');
        //will open the 'Import Google Contacts' page
        await actionObj.openImportGoogleContactsPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open import google contacts page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Import Google Contacts page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Import Google Contacts page');
        //will open the 'Import Google Contacts' page
        await actionObj.openImportGoogleContactsPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the 'Import Google Contacts' page
        await actionObj.openImportGoogleContactsPage(driver,screenshotPath);  
    }
});

When('the user goes on the Setup>System Modules page and verifies the contact singular module name', async () =>{
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'System Modules' tab 
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');
    //will set focus on the 'System Modules' tab
    await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
    await driver.wait(until.elementIsVisible(systemModulesTab[0]));
    //will click on the 'System Modules' tab
    await systemModulesTab[0].click();
    await driver.sleep(1000);
    await driver.wait(until.urlContains('app/setup/customization/modules'),10000);
    //will find and click on the module edit button
    const moduleEditBtn = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,'Contact');
    await moduleEditBtn.click();
    await driver.sleep(1000);
    //will get the module singular name
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    expectedContactSingularName = await singularTextbox.getAttribute('value');
    //will get the module plural name
    const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
    expectedContactPluralName = await pluralTextbox.getAttribute('value');
    //will find and click on the Cancel button
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);
    await cancelBtn.click();
});

When('the user goes on the Import Google Contacts page', async () =>{
    //will open the 'Import Google Contacts' page
    await actionObj.openImportGoogleContactsPage(driver,screenshotPath);  
});

When('the user select {string} Google account', async (account) =>{
    //will select the provided Google account
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'googleAccounts',account,'no');
});

When('without selecting any Google group, click on the Next button', async () =>{
    //will find and click on the next button
    let nextBtn = await importGoogleContactsPageElementObj.findNextButton(driver,screenshotPath);
    await nextBtn.click();
    await driver.sleep(2000);
    nextBtn = await importGoogleContactsPageElementObj.findNextButton(driver,screenshotPath);
    await nextBtn.click();
    await driver.sleep(2000);
});

When('click on the Next button', async () =>{
    //will find and click on the next button
    const nextBtn = await importGoogleContactsPageElementObj.findNextButton(driver,screenshotPath);
    await nextBtn.click();
    await driver.sleep(1000);
});

When('select {string} group', async (groupName) =>{
    //will find and click on the provided group
    const groupCheckbox = await formElementObj.findCheckbox(driver,screenshotPath,groupName);
    await driver.executeScript("arguments[0].click();",groupCheckbox)
    await driver.sleep(1000);
});

When('add {string} and {string} tags', async (tag1,tag2) =>{
    //will find the contact tag textbox
    const contactTagTextbox = await importGoogleContactsPageElementObj.findTagTextbox(driver);
    await clearFieldDataObj.clearFieldData(contactTagTextbox[1]);
    //will pass the data in 06_contact tag textbox
    await contactTagTextbox[1].sendKeys(tag1+Key.TAB);
    await driver.sleep(1000);
    //will find the company tag textbox
    const companyTagTextbox = await importGoogleContactsPageElementObj.findTagTextbox(driver);
    await clearFieldDataObj.clearFieldData(companyTagTextbox[2]);
    //will pass the data in company tag textbox
    await companyTagTextbox[2].sendKeys(tag2+Key.TAB);
    await driver.sleep(500);
});

When('the user goes on the My Account> Connected Accounts page and verify the number of Google Accounts', async () =>{
    //will open the My Account page
    await openSalesmatePageObj.openMyAccountPage(driver,screenshotPath);
    //will find and click on the Connected Accounts page
    const connectedAccountsTab = await importGoogleContactsPageElementObj.findConnectedAccountsTab(driver,screenshotPath);
    await connectedAccountsTab.click();
    await driver.sleep(1000);
    //will get the number of connected Google accounts
    const numberOfAccounts = await importGoogleContactsPageElementObj.findConnectedAccounts(driver);
    for(let i=0; i<numberOfAccounts.length; i++){
        if(await numberOfAccounts[i].getText() == 'Google'){
            totalGoogleAccounts++;
        }
    }
});

When('the users goes on the Setup> Import Google Contacts page', async () =>{
    //will open the 'Import Google Contacts' page
    await actionObj.openImportGoogleContactsPage(driver,screenshotPath);  
});

Then('the system should display a singular module name on the Import Google Contacts page', async () =>{
    //will find the header name
    const headerNameElem = await importGoogleContactsPageElementObj.findHeaderName(driver,screenshotPath);
    const headerName = await headerNameElem.getText();
    //will check the dynamic module name is getting displayed or not
    try{
        assert.strictEqual(headerName,expectedContactPluralName);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DynamicModuleName_NotUsed.png');
        await assert.fail('Due to the dynamic module name is not used, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DynamicModuleName_NotUsed.png\'.');
    }

    console.log('The dynamic module name is getting displayed...');
});

Then('the system should give {string} validation message while Google contacts import', async (valMsg) =>{
    //will find validation message
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'))
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the validation message is correct or not
    try{
        assert.strictEqual(notyMessageText,valMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMessage_NotCorrect.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMessage_NotCorrect.png\'.');
    }    

    console.log('The \''+valMsg+'\' validation message is getting displayed...');   
    const backBtn = await importGoogleContactsPageElementObj.findBackButton(driver,screenshotPath);
    await backBtn.click();
    await driver.wait(until.stalenessOf(backBtn));
});

Then('the {string} message should be displayed', async (msg) =>{
    //will find the success message
    const successMsg = await driver.findElement(By.xpath('//h1[@class="heading m-b-md"]'));
    //will check the success message is correct or not
    try{
        assert.strictEqual(await successMsg.getText(),msg);
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotCorrect.png'); 
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotCorrect.png\'.');
    }

    console.log('The process of Google contacts import has been started successfully...');
});

Then('the system should display all connected Google accounts', async () =>{
    //will find the Select Google account dropdown
    const accountsDropdown = await formElementObj.findDropdown(driver,screenshotPath,'googleAccounts');
    await accountsDropdown.click();
    await driver.sleep(1000);
    //will get the number of displayed Google account
    const numberOfGoogleAccounts = await formElementObj.findDropdownListElement(driver);
    //will check all connected Google accounts are getting displayed or not
    try{
        assert.strictEqual(numberOfGoogleAccounts.length,totalGoogleAccounts);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AllGoogleAccounts_NotDisplayed.png'); 
        await accountsDropdown.click();
        await driver.sleep(1500);
        assert.fail('Due to all connected Google accounts are not displayed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'AllGoogleAccounts_NotDisplayed.png\'.');
    }

    console.log('All connected Google accounts are getting displayed...');
    await accountsDropdown.click();
    await driver.sleep(1000);
});
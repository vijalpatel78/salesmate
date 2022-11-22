const {Given,When,Then} = require('@cucumber/cucumber');
const {By, until} = require('selenium-webdriver');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const deletedRecordsPageElementObj = require('../common/deletedRecordsPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/data_administration/deletedRecords/screenshots/';

let expectedContactSingularName='Contact', expectedCompanySingularName='Company', expectedDealSingularName='Deal', expectedProductSingularName='Product', expectedActivitySingularName = 'Task',
expectedContactPluralName='Contacts', expectedCompanyPluralName='Companies', expectedDealPluralName='Deals', expectedProductPluralName = 'Products', expectedActivityPluralName = 'Tasks';

Given('the {string} is on Deleted Records page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/deleted-records')){
        console.log('The deleted records page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open deleted records page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Deleted Records page');
        //will open the 'Deleted Records' page
        await actionObj.openDeletedRecordsPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open deleted records page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Deleted Records page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Deleted Records page');
        //will open the 'Deleted Records' page
        await actionObj.openDeletedRecordsPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the 'Deleted Records' page
        await actionObj.openDeletedRecordsPage(driver,screenshotPath);  
    }
});

Given('the {string} record from the {string} module must be deleted', async (record,module) =>{
    if(module.toLowerCase() == 'contact'){
        //will add the contact
        await actionObj.addContact(driver,screenshotPath,record);
        //will delete that added contact
        await actionObj.deleteRecord(driver,screenshotPath);
        console.log('The contact has been deleted successfully...');
    }else if(module.toLowerCase() == 'company'){
        //will add the company 
        await actionObj.addCompany(driver,screenshotPath,record,'company');
        //will delete that added company 
        await actionObj.deleteRecord(driver,screenshotPath);
        console.log('The company has been deleted successfully...');
    }else if(module.toLowerCase() == 'deal'){
        //will add the deal 
        await actionObj.addDeal(driver,screenshotPath,record);
        //will delete that added deal 
        await actionObj.deleteRecord(driver,screenshotPath);
        console.log('The deal has been deleted successfully...');
    }else{
        assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name: \'Contact\', \'Company\' or \'Deal\'.');
    }   
});

Given('the records from the {string} module must be deleted', async (module) =>{
    if(module.toLowerCase() == 'contact'){
        //will delete all records from the contact module
        await actionObj.bulkDeleteRecords(driver,screenshotPath,'icon-ic_contacts','All '+expectedContactPluralName);
        console.log('The contacts have been deleted successfully...');
    }else if(module.toLowerCase() == 'company'){
        //will delete all records from the company module
        await actionObj.bulkDeleteRecords(driver,screenshotPath,'icon-ic_company','All '+expectedCompanyPluralName);
        console.log('The companies have been deleted successfully...');
    }else if(module.toLowerCase() == 'deal'){
        //will delete all records from the deal module
        await actionObj.bulkDeleteRecords(driver,screenshotPath,'icon-ic_deal','All '+expectedDealPluralName);
        console.log('The deals have been deleted successfully...');
    }else{
        assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name: \'Contact\', \'Company\' or \'Deal\'.');
    }   
});

When('the user goes on the Deleted Records page', async () =>{
    //will open the deleted records page
    await actionObj.openDeletedRecordsPage(driver,screenshotPath);
    await driver.sleep(1000);
});

When('select {string} module', async (module) =>{
    //will select the respective module from the dropdown
    if(module.toLowerCase() == 'contact'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedContactSingularName,'no');
    }else if(module.toLowerCase() == 'company'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedCompanySingularName,'no');
    }else if(module.toLowerCase() == 'deal'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedDealSingularName,'no');
    }else{
        assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name: \'Contact\', \'Company\' or \'Deal\'.');
    }   
    await driver.sleep(1000);
    await deletedRecordsPageElementObj.findAllRecordsDeletedOrRestored(driver);
});

When('select {string} record', async (record) =>{
    //will find the provided record
    // const recordElem = await deletedRecordsPageElementObj.findRecord(driver,record);
    // await driver.executeScript("arguments[0].scrollIntoView();",recordElem[0]);
    // const recordRowNumber = await recordElem[0].getAttribute('row-index');
    //will find the provided record's checkbox
    const checkBox = await deletedRecordsPageElementObj.findCheckbox(driver,screenshotPath);
    //will click on that checkbox
    await checkBox.click();
    await driver.sleep(1000);
});

When('click on the Restore button', async () =>{
    //will find and click on the 'Restore' button
    const restoreButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button',' Restore ');
    await restoreButton.click();
    await driver.sleep(500);
    //will find and click on the 'Yes' button
    const yesButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesButton.click();
    await driver.wait(until.stalenessOf(yesButton));
});

When('click on the Restore All button', async () =>{
    //will find and click on the 'Restore All' button
    const restoreAllButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button',' Restore All ');
    await restoreAllButton.click();
    await driver.sleep(500);
    //will find and click on the 'Yes' button
    const yesButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesButton.click();
    await driver.wait(until.stalenessOf(yesButton));
});

When('click on the Delete button', async () =>{
    //will find and click on the 'Delete' button
    const deleteButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
    await deleteButton.click();
    await driver.sleep(500);
    //will find and click on the 'Yes' button
    const yesButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesButton.click();
    await driver.wait(until.stalenessOf(yesButton));
});

When('click on the Delete All button', async () =>{
    //will find and click on the 'Delete All' button
    const deleteAllButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete All ');
    await deleteAllButton.click();
    await driver.sleep(500);
    //will find and click on the 'Yes' button
    const yesButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesButton.click();
    await driver.wait(until.stalenessOf(yesButton));
});

When('the user goes on the Setup>System Modules page and verifies the all singular module name', async () =>{
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

    //will get the dynamic name of the contact module
    const contactModuleName = await actionObj.getDynamicModuleName(driver,screenshotPath,'Contact');
    expectedContactSingularName = contactModuleName.singularModuleName;
    expectedContactPluralName = contactModuleName.pluralModuleName;
    //will get the dynamic name of the company module
    const companyModuleName = await actionObj.getDynamicModuleName(driver,screenshotPath,'Company');
    expectedCompanySingularName = companyModuleName.singularModuleName;
    expectedCompanyPluralName = companyModuleName.pluralModuleName;
    //will get the dynamic name of the deal module
    const dealModuleName = await actionObj.getDynamicModuleName(driver,screenshotPath,'Deal');
    expectedDealSingularName = dealModuleName.singularModuleName;
    expectedDealPluralName = dealModuleName.pluralModuleName;
    //will get the dynamic name of the Product module
    const productModuleName = await actionObj.getDynamicModuleName(driver,screenshotPath,'Product');
    expectedProductSingularName = productModuleName.singularModuleName;
    expectedProductPluralName = productModuleName.pluralModuleName;
    //will get the dynamic name of the Activity module
    const activityModuleName = await actionObj.getDynamicModuleName(driver,screenshotPath,'Activity');
    expectedActivitySingularName = activityModuleName.singularModuleName;
    expectedActivityPluralName = activityModuleName.pluralModuleName;
});

When('click on the {string} record', async (record) =>{
    //will find and click on the provided record link
    const recordLink = await deletedRecordsPageElementObj.findRecordLink(driver,screenshotPath,record);
    await recordLink.click();
    await driver.sleep(2000);
});

Then('the {string} record of the {string} module should get restored', async (record,module) =>{
    //will find notification message after performing operations 
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Record(s) restored successfully');
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after restoring a record, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }    

    //will navigate on the dashboard page and then come back to the deleted records page
    await actionObj.comeBackToDeletedRecordsPage(driver,screenshotPath);

    //will select the respective module from the dropdown
    if(module.toLowerCase() == 'contact'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedContactSingularName,'no');
    }else if(module.toLowerCase() == 'company'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedCompanySingularName,'no');
    }else if(module.toLowerCase() == 'deal'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedDealSingularName,'no');
    }else{
        assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name: \'Contact\', \'Company\' or \'Deal\'.');
    }   

    //will find the restored record
    const restoredRecord = await deletedRecordsPageElementObj.findRecord(driver,record);
    //will check the restored record is found or not
    if(restoredRecord.length > 0){
        await driver.executeScript("arguments[0].scrollIntoView();",restoredRecord[0]);
        await screenshotObj.takeScreenshot(driver,screenshotPath+record.replace(/\s/g,'_')+'_NotRestored.png');
        await assert.fail('Due to the \''+record+'\' record of the \''+module+'\' module is not restored, the test case has been failed. Screenshot Name: \''+screenshotPath+record.replace(/\s/g,'_')+'_NotRestored.png\'.');
    }else{
        console.log('The \''+record+'\' record of the \''+module+'\' module has been restored successfully...')
    }
});

Then('all records of the {string} module should get restored', async (module) =>{
    //will find notification message after performing operations 
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Record(s) restored successfully');
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after restoring a record, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }    

    //will navigate on the dashboard page and then come back to the deleted records page
    await actionObj.comeBackToDeletedRecordsPage(driver,screenshotPath);

    //will select the respective module from the dropdown
    if(module.toLowerCase() == 'contact'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedContactSingularName,'no');
    }else if(module.toLowerCase() == 'company'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedCompanySingularName,'no');
    }else if(module.toLowerCase() == 'deal'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedDealSingularName,'no');
    }else{
        assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name: \'Contact\', \'Company\' or \'Deal\'.');
    }   
    await driver.sleep(1000);

    //will check all records are get restored or not
    const records = await deletedRecordsPageElementObj.findAllRecordsDeletedOrRestored(driver);
    if(records.length > 0){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AllRecords_NotRestored.png');
        assert.fail('Due to all records of the \''+module+'\' module are not restored, the test case has been failed. Screenshot Name: \''+screenshotPath+'AllRecords_NotRestored.png\'.');
    }else{
        console.log('All records of the \''+module+'\' module has been restored successfully...');
    }
});

Then('the {string} record of the {string} module should get deleted', async (record,module) =>{
    //will find notification message after performing operations
    await driver.sleep(1000);
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Record(s) deleted successfully');
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after deleting a record, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }    

    //will navigate on the dashboard page and then come back to the deleted records page
    await actionObj.comeBackToDeletedRecordsPage(driver,screenshotPath);

    //will select the respective module from the dropdown
    if(module.toLowerCase() == 'contact'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedContactSingularName,'no');
    }else if(module.toLowerCase() == 'company'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedCompanySingularName,'no');
    }else if(module.toLowerCase() == 'deal'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedDealSingularName,'no');
    }else{
        assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name: \'Contact\', \'Company\' or \'Deal\'.');
    }   

    //will find the deleted record
    const deletedRecord = await deletedRecordsPageElementObj.findRecord(driver,record);
    //will check the deleted record is found or not
    if(deletedRecord.length > 0){
        await driver.executeScript("arguments[0].scrollIntoView();",deletedRecord[0]);
        await screenshotObj.takeScreenshot(driver,screenshotPath+record.replace(/\s/g,'_')+'_NotDeleted.png');
        await assert.fail('Due to the \''+record+'\' record of the \''+module+'\' module is not deleted, the test case has been failed. Screenshot Name: \''+screenshotPath+record.replace(/\s/g,'_')+'_NotDeleted.png\'.');
    }else{
        console.log('The \''+record+'\' record of the \''+module+'\' module has been deleted successfully...');
    }
});

Then('all records of the {string} module should get deleted', async (module) =>{
    //will find notification message after performing operations
    await driver.sleep(1000);
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Record(s) deleted successfully');
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after deleting a record, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }    

    //will navigate on the dashboard page and then come back to the deleted records page
    await actionObj.comeBackToDeletedRecordsPage(driver,screenshotPath);

    //will select the respective module from the dropdown
    if(module.toLowerCase() == 'contact'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedContactSingularName,'no');
    }else if(module.toLowerCase() == 'company'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedCompanySingularName,'no');
    }else if(module.toLowerCase() == 'deal'){
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'moduleField',expectedDealSingularName,'no');
    }else{
        assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name: \'Contact\', \'Company\' or \'Deal\'.');
    }   
    await driver.sleep(1000);

    //will check all records are get deleted or not
    const records = await deletedRecordsPageElementObj.findAllRecordsDeletedOrRestored(driver);
    if(records.length > 0){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AllRecords_NotDeleted.png');
        assert.fail('Due to all records of the \''+module+'\' module are not deleted, the test case has been failed. Screenshot Name: \''+screenshotPath+'AllRecords_NotDeleted.png\'.');
    }else{
        console.log('All records of the \''+module+'\' module has been deleted successfully...');
    }
});

Then('the product module should not be displayed on the Deleted Records page', async () =>{
    //will find and click on the module dropdown
    const moduleDropdown = await formElementObj.findDropdown(driver,screenshotPath,'moduleField');
    await moduleDropdown.click();
    await driver.sleep(1000);

    //will get all dropdown values
    const dropdownListElement = await formElementObj.findDropdownListElement(driver);
    //will travel dropdown value list
    for(let i=0; i<dropdownListElement.length; i++){
        //will check the product module name is getting displayed or not
        if(await dropdownListElement[i].getText() == expectedProductSingularName){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductModuleName_Displayed_AfterUninstalled.png');
            await moduleDropdown.click();
            assert.fail('The product module name is displayed even after uninstalling the product app. Screenshot Name: \''+screenshotPath+'ProductModuleName_Displayed_AfterUninstalled.png\'.');
        }
    }
    await moduleDropdown.click();
    console.log('The product module name is not displayed after uninstalling the product app...');
});

Then('the product module should be displayed on the Deleted Records page', async () =>{
    let isProductNameFound = 'no';

    //will find and click on the module dropdown
    const moduleDropdown = await formElementObj.findDropdown(driver,screenshotPath,'moduleField');
    await moduleDropdown.click();
    await driver.sleep(1000);

    //will get all dropdown values
    const dropdownListElement = await formElementObj.findDropdownListElement(driver);
    //will travel dropdown value list
    for(let i=0; i<dropdownListElement.length; i++){
        //will mark the flag with yes if the product name is found
        if(await dropdownListElement[i].getText() == expectedProductSingularName){
            isProductNameFound = 'yes';
        }
    }

    //will check the product module name is getting displayed or not
    if(isProductNameFound == 'no'){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductModuleName_NotDisplayed_AfterInstalled.png');
        await moduleDropdown.click();
        assert.fail('The product module name is not displayed even after installing the product app. Screenshot Name: \''+screenshotPath+'ProductModuleName_NotDisplayed_AfterInstalled.png\'.');
    }else{
        await moduleDropdown.click();
        console.log('The product module name is displayed after installing the product app...');
    }
});

Then('the system should display a singular module name on the Deleted Records page', async () => {
    let moduleNameList = [], name;

    //will find and click on the module dropdown
    const moduleDropdown = await formElementObj.findDropdown(driver,screenshotPath,'moduleField');
    await moduleDropdown.click();
    await driver.sleep(1000);
    //will get all dropdown values
    const dropdownListElement = await formElementObj.findDropdownListElement(driver);
    for(let i=0; i<dropdownListElement.length; i++){
        moduleNameList.push(await dropdownListElement[i].getText())
    }

    //will compare the dropdown value against the singular module name
    try{
        name = 'Contact';
        assert(moduleNameList.includes(expectedContactSingularName));
        name = 'Company';
        assert(moduleNameList.includes(expectedCompanySingularName));
        name = 'Activity';
        assert(moduleNameList.includes(expectedActivitySingularName));
        name = 'Deal';
        assert(moduleNameList.includes(expectedDealSingularName));
        name = 'Product';
        assert(moduleNameList.includes(expectedProductSingularName));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+name+'_SingularModuleName_NotUsed.png'); 
        await moduleDropdown.click();
        assert.fail('Due to the singular module name is not used for the \''+name+'\', the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+name+'_SingularModuleName_NotUsed.png\'.');
    }
    
    await moduleDropdown.click();
    console.log('The system is showing the dynamic module name...');
});

Then('the system should open the record in detail view on click of the respective {string} module record link', async (module) =>{
    await driver.sleep(2000);
    //will get the current page url
    const currentPageURL = await driver.getCurrentUrl();
    //will check the record detail view page is get opened or not
    if(currentPageURL.endsWith('/detail')){
        console.log('The system is redirected to the record detail view of '+module+' module...');
        await driver.navigate().back();
        await driver.sleep(2000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+module+'RecordDetailView_NotOpened.png'); 
        await driver.navigate().back();
        await driver.sleep(2000);
        assert.fail('Due to the system is not redirected to the record detail view of '+module+' module, the test case has been failed. Screenshot Name: \''+screenshotPath+module+'RecordDetailView_NotOpened.png\'.');
    }
});
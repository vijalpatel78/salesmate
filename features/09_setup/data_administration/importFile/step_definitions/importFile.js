const {Given,When,Then} = require('@cucumber/cucumber');
const { By,until,Key} = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');
const fs = require('fs')
const importFilePageElementObj = require('../common/importFilePageElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const usersPageElementObj = require('../../../users_security/users/common/usersPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const actionObj = require('../common/actions');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const openUsersPageObj = require('../../../users_security/users/common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/data_administration/importFile/screenshots/';
let expectedContactPluralName, expectedCompanyPluralName, expectedDealPluralName, expectedActivityPluralName;
let expectedContactSingularName, expectedCompanySingularName, expectedDealSingularName, expectedActivitySingularName;
let activeUsers = [];

Given('the {string} is on Import File page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/setup/migrate-data')){
        console.log('The import file page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open import file page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Import File page');
        //will open the 'Import File' page
        await actionObj.openImportFilePage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open import file page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Import File page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Import File page');
        //will open the 'Import File' page
        await actionObj.openImportFilePage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the 'Import File' page
        await actionObj.openImportFilePage(driver,screenshotPath);  
    }
});

When('the user goes on the Setup>System Modules page and verify the all plural module name', async () =>{
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
    await driver.wait(until.urlContains('app/setup/customization/modules'),20000);

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
    //will get the dynamic name of the Activity module
    const activityModuleName = await actionObj.getDynamicModuleName(driver,screenshotPath,'Activity');
    expectedActivitySingularName = activityModuleName.singularModuleName;
    expectedActivityPluralName = activityModuleName.pluralModuleName;
});

When('the user goes on the Import File page', async () =>{
    //will open the 'Import File' page
    await actionObj.openImportFilePage(driver,screenshotPath);  
    await driver.sleep(2000);
});

When('the user click on the Import using file', async () =>{
    //will find and click on the import using file option
    const importUsingFile = await importFilePageElementObj.findImportUsingFileOption(driver,screenshotPath);
    await importUsingFile.click();
    await driver.wait(until.stalenessOf(importUsingFile));
});

When('upload {string} file', async (file) =>{
    const filepath = await path.resolve(__dirname,'../testdata/'+file);
    //will upload provided file 
    const uploadFileField = await importFilePageElementObj.findUploadFileField(driver,screenshotPath);
    await uploadFileField.sendKeys(filepath);
    await driver.sleep(2000);
});

When('remove the uploaded file', async () =>{
    //will find and click on the Remove button
    const removeLink = await commonElementObj.findLinkElement(driver,screenshotPath,'Remove');
    await removeLink.click();
    await driver.sleep(2000);
});

When('click on the Download sample spreadsheet link', async () =>{
    //will find and click on the Download sample spreadsheet link 
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'Download sample spreadsheet');
    await link.click();
    await driver.sleep(5000);
});

When('the user click on the {string} link', async (linkName) =>{
    if(linkName.includes('individual or grouped file.') || linkName.includes('View import FAQs')){
        //will find and click on the import using file option
        const importUsingFile = await importFilePageElementObj.findImportUsingFileOption(driver,screenshotPath);
        await importUsingFile.click();
        await driver.wait(until.stalenessOf(importUsingFile));
    }
    //will find and click on the provided link name
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,linkName);
    await link.click();
    await driver.sleep(3000);
});

When('click on the Next button of import', async () =>{
    //will find and click on the Next button
    const nextButton = await importFilePageElementObj.findNextButton(driver,screenshotPath);
    await nextButton.click();
    await driver.wait(until.stalenessOf(nextButton));
});

When('open the Select Field popup', async () =>{
    //will find and click on the select field box
    const selectFieldBox = await importFilePageElementObj.findSelectFieldInputBox(driver,screenshotPath);
    await selectFieldBox.click();
    await driver.sleep(2000);
});

When('click on the Create New Field link', async () =>{
    await driver.sleep(1000);
    //will find and click on the Create New Field link
    const createNewFieldLink = await importFilePageElementObj.findCreateNewFieldLink(driver,screenshotPath);
    await createNewFieldLink[0].click();
    await driver.sleep(4000);
});

When('remove the selected field', async () =>{
    //will find and click on the X icon of selected field
    const fieldRemoveButton = await importFilePageElementObj.findSelectedFieldCloseButton(driver,screenshotPath);
    await fieldRemoveButton[0].click();
    await driver.wait(until.stalenessOf(fieldRemoveButton[0]));
});

When('click on the {string} tab and select {string} field', async (tabName,fieldName) =>{
    //will find all module names
    const moduleNameElem = await importFilePageElementObj.findModuleNames(driver,screenshotPath);
    //will click on the provided module name
    if(tabName.toLowerCase() == 'contact'){
        await moduleNameElem[0].click();
        await driver.sleep(1000);
    }else if(tabName.toLowerCase() == 'company'){
        await moduleNameElem[1].click();
        await driver.sleep(1000);
    }else if(tabName.toLowerCase() == 'activity'){
        await moduleNameElem[2].click();
        await driver.sleep(1000);
    }else if(tabName.toLowerCase() == 'deal'){
        await moduleNameElem[3].click();
        await driver.sleep(1000);
    }else if(tabName.toLowerCase() == 'note'){
        await moduleNameElem[4].click();
        await driver.sleep(1000);
    }else{
        assert.fail('The provided '+tabName+' tab name is not valid. Expected Tab Name ---> \'Contact\', \'Company\', \'Activity\', \'Deal\' or \'Note\'.')
    }

    //will find the search box
    const searchBox = await importFilePageElementObj.findFieldSearchBox(driver,screenshotPath);
    await searchBox.sendKeys(fieldName);
    await driver.sleep(1000);
    //will find and click on the provided field name
    const field = await importFilePageElementObj.findField(driver,screenshotPath,fieldName);
    await field[0].click();
    await driver.sleep(1000);
});

When('the user goes on the Setup>Users page and verified the active users list', async () =>{
    //will open the Users page
    await openUsersPageObj.openUsersPage(driver,screenshotPath);
    //will get the active user list
    const users = await usersPageElementObj.findNamesOnListPage(driver);
    for(let i=0; i<users.length; i++){
        activeUsers.push(await users[i].getText());
    }
    console.log('Active Users: '+ activeUsers);
});

When('click on the Back button of import', async () =>{
    //will find and click on the Back button
    const backButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Back');
    await backButton.click();
    await driver.wait(until.stalenessOf(backButton));
    await driver.sleep(1000);
});

When('click on the Select Date and Time option', async () =>{
    //will click on the Select Date and Time option
    const selectDateTimeOption = await importFilePageElementObj.findSelectDateTimeOption(driver,screenshotPath);
    await selectDateTimeOption.click();
    await driver.sleep(2000);
});

When('select {string} date option', async (value) =>{
    //will click on the Select your date format button
    const dateFormatOption = await importFilePageElementObj.findToggleButton(driver,screenshotPath,'dateSwitchField');
    await driver.executeScript('arguments[0].click();',dateFormatOption);
    await driver.sleep(1000);
    //will click on the provided date option
    const dateFormatValue = await importFilePageElementObj.findDateTimeFormatOption(driver,screenshotPath,value);
    await driver.executeScript('arguments[0].click();',dateFormatValue);
    await driver.sleep(1000);
});

When('select {string} time option', async (value) =>{
    //will click on the Select your time format button
    const timeFormatOption = await importFilePageElementObj.findToggleButton(driver,screenshotPath,'timeSwitchField');
    await driver.executeScript('arguments[0].click();',timeFormatOption);
    await driver.sleep(1000);
    //will click on the provided time option
    const timeFormatValue = await importFilePageElementObj.findDateTimeFormatOption(driver,screenshotPath,value);
    await driver.executeScript('arguments[0].click();',timeFormatValue);
    await driver.sleep(1000);
});

When('click on the Save button of popup', async () =>{
    //will click on the Save button
    const saveButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Save ');
    await saveButton.click();
    await driver.sleep(2000);
});

When('add {string} tag', async (tag) =>{
    //will find the tag field
    const tagField = await importFilePageElementObj.findTagField(driver,screenshotPath);
    await tagField.sendKeys(tag+Key.TAB);
    await tagField.sendKeys(Key.TAB);
    await driver.sleep(1000);
});

When('select {string} option of How to handle blank columns during merge?', async (value) =>{
    //will click on the provided value
    const optionElem = await importFilePageElementObj.findDateTimeFormatOption(driver,screenshotPath,value);
    await driver.executeScript('arguments[0].scrollIntoView();',optionElem);
    await driver.executeScript('arguments[0].click();',optionElem);
    await driver.sleep(1000);
});

When('click on the Start Import button', async () =>{
    //will find and click on the Start Import button
    const startImportButton = await importFilePageElementObj.findStartImportButton(driver,screenshotPath);
    await startImportButton.click();
    await driver.wait(until.stalenessOf(startImportButton));
});

When('the user goes on the Previous Imports grid', async () =>{
    //will set the focus on the grid
    const grid = await importFilePageElementObj.findPreviousImportsGrid(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',grid);
    await driver.sleep(1000);
});

When('download the imported file', async () =>{
    //will click on the imported file name
    const importedFile = await importFilePageElementObj.findImportedFileName(driver,screenshotPath);
    await importedFile.click();
    await driver.sleep(3000);
});

When('click on the Details link from the grid', async () =>{
    const importedStatusElem = await importFilePageElementObj.findImportedStatus(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',importedStatusElem);
    //will find and click on the details link
    const detailsLink = await importFilePageElementObj.findImportedDetailsLink(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',detailsLink);
    await detailsLink.click();
    await driver.sleep(1000);
});

When('click on the Created link', async () =>{
    //will find and click on the Created link
    const createdLink = await importFilePageElementObj.findCreatedOrUpdatedLink(driver,screenshotPath);
    await driver.executeScript('arguments[0].click();',createdLink[0]);
    await driver.sleep(1000);
});

When('click on the Updated link', async () =>{
    //will find and click on the Updated link
    const updatedLink = await importFilePageElementObj.findCreatedOrUpdatedLink(driver,screenshotPath);
    await driver.executeScript('arguments[0].click();',updatedLink[1]);
    await driver.sleep(1000);
});

When('click on the Download Rejected Records link', async () =>{
    //will find and click on the Download Rejected Records link
    const rejectedRecordLink = await commonElementObj.findLinkElement(driver,screenshotPath,'Download Rejected Records');
    await rejectedRecordLink.click();
    await driver.sleep(2000);
});

When('click on the Yes button from the confirmation popup', async () =>{
    //will find click on the 'Yes' button
    const yesBtn = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','YES');
    await yesBtn.click();
    await driver.wait(until.stalenessOf(yesBtn));
});

When('click on the Revert link from the grid', async () =>{
    const importedStatusElem = await importFilePageElementObj.findImportedStatus(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',importedStatusElem);
    //will find and click on the revert link
    const revertLink = await importFilePageElementObj.findImportedRevertLink1(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',revertLink);
    await revertLink.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the support doc of {string} link', async (linkName) =>{
    //will get the current tab id
    const currentTab = await driver.getWindowHandle();
    //will get all tab id
    const numberOfTabs = await driver.getAllWindowHandles();

    //will move on the support page
    const supportURLTab = numberOfTabs[numberOfTabs.length - 1];
    await driver.switchTo().window(supportURLTab);
    //will get the support link URL
    const currentURL = await driver.getCurrentUrl();
    console.log("The current support doc url is: "+currentURL);
    
    //will check the support link URL is correct or not
    if(currentURL === 'https://support.salesmate.io/hc/en-us/articles/360050448652'){
        console.log("The system is redirected to the support page of \'"+linkName+"\' link...");
    }else if(currentURL === 'https://support.salesmate.io/hc/en-us/articles/360050914871'){
        console.log("The system is redirected to the support page of \'"+linkName+"\' link...");
    }else if(currentURL === 'https://support.salesmate.io/hc/en-us/articles/360050914911'){
        console.log("The system is redirected to the support page of \'"+linkName+"\' link...");
    }else if(currentURL === 'https://support.salesmate.io/hc/en-us/articles/360052248591-Salesmate-Import-2-0-FAQ-s'){
        console.log("The system is redirected to the support page of \'"+linkName+"\' link...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SupportPage_NotFound.png');
        //will close the support page
        await driver.close();
        //will move back to the app page
        await driver.switchTo().window(currentTab);
        await driver.sleep(1500);
        await assert.fail('Due to the support page of \''+linkName+'\' link is not opened, the test case has been failed. Screenshot Name: \''+screenshotPath+'SupportPage_NotFound.png\'.');
    }

    //will close the support page
    await driver.close();
    //will move back to the app page
    await driver.switchTo().window(currentTab);
    await driver.sleep(1500);
});

Then('the system should display a plural module name on the Import File page', async () =>{
    //will find and get the displayed dynamic module names from the feature description
    const featureDescriptionElem = await importFilePageElementObj.findDynamicModuleNameOnPage(driver,screenshotPath);
    const featureDescription = await featureDescriptionElem.getText();
    //will check the dynamic module name is getting displayed or not
    try{
        assert(featureDescription.includes(expectedContactPluralName));
        assert(featureDescription.includes(expectedCompanyPluralName));
        assert(featureDescription.includes(expectedDealPluralName));
        assert(featureDescription.includes(expectedActivityPluralName));
        await driver.sleep(1000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DynamicModuleNameOnDescription_NotFound.png');
        await assert.fail('Due to the dynamic module name is not found from the description, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DynamicModuleNameOnDescription_NotFound.png\'.');
    }
    console.log('The dynamic module name is getting displayed on the \''+featureDescription+'\'...');

    //will find and get the displayed dynamic module names from the import file description
    const importFileDescriptionElem = await importFilePageElementObj.findDynamicModuleNameOnPage1(driver,screenshotPath);
    const importFileDescription = await importFileDescriptionElem.getText();
    //will check the dynamic module name is getting displayed or not
    try{
        assert(importFileDescription.includes(expectedContactPluralName.toLowerCase()));
        assert(importFileDescription.includes(expectedCompanyPluralName.toLowerCase()));
        assert(importFileDescription.includes(expectedDealPluralName.toLowerCase()));
        assert(importFileDescription.includes(expectedActivityPluralName.toLowerCase()));
        await driver.sleep(1000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DynamicModuleNameOnImportFileDescription_NotFound.png');
        await assert.fail('Due to the dynamic module name is not found from the import file description, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DynamicModuleNameOnImportFileDescription_NotFound.png\'.');
    }
    console.log('The dynamic module name is getting displayed on the \''+importFileDescription+'\'...');
});

Then('the Next button should remain as disabled', async () =>{
    //will find the Next button
    const nextButton = await importFilePageElementObj.findNextButton(driver,screenshotPath);
    const isDisabled = await nextButton.getAttribute('disabled');
    if(isDisabled == 'true'){
        console.log('The Next button is showing as disabled when any file is not uploaded...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NextButton_NotDisabled.png');
        assert.fail('Due to the next button is not showing as disabled, the test case has been failed. Screenshot Name: \''+screenshotPath+'NextButton_NotDisabled.png\'.');
    }
    //will find and click on the Back button
    const backButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Back');
    await backButton.click();
    await driver.wait(until.stalenessOf(backButton));
});

Then('the sample file of import should get downloaded', async () =>{
    //will check the file is get downloaded or not 
    const file = './downloadedFile/samplefile.csv';
    try{
        assert(fs.statSync(file).isFile());
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SampleFile_NotDownloaded.png');
        await assert.fail('Due to the sample file is not downloaded in the \'./downloadedFile\' folder, the test case has been failed. Screenshot Name: \''+screenshotPath+'SampleFile_NotDownloaded.png\'.');
    }
    console.log('The \'samplefile.csv\' file is downloaded successfully in the \'./downloadedFile\' folder...');
    
    //will find and click on the Back button
    const backButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Back');
    await backButton.click();
    await driver.wait(until.stalenessOf(backButton));
});

Then('the system should give {string} validation message and Next button should remain as disabled', async (validationMsg) =>{
    //will find the validation message
    const validationElem = await importFilePageElementObj.findValidationMsg(driver,screenshotPath);
    const validation = await validationElem.getText();
    //will find the Next button
    const nextButton = await importFilePageElementObj.findNextButton(driver,screenshotPath);
    const isDisabled = await nextButton.getAttribute('disabled');

    //will check the validation message is correct or not and Next button is disabled or not
    if(validationMsg == validation && isDisabled == 'true'){
        console.log('The \''+validation+'\' validation message is getting displayed...');
        console.log('The Next button is showing as disabled when the file format is not correct...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotDisplayed.png');
        assert.fail('Either the '+validationMsg+' validation message is not showing or the Next button is not disabled. Screenshot Name: \''+screenshotPath+'ValidationMsg_NotDisplayed.png\'.');
    }

    //will find and click on the Back button
    const backButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Back');
    await backButton.click();
    await driver.wait(until.stalenessOf(backButton));
});

Then('the file should get removed and the Next button should remain as disabled', async () =>{
    //will find upload file section
    const uploadFile = await importFilePageElementObj.findUploadedFileName(driver,screenshotPath);
    const isFileFound = await uploadFile.getText();
    if(isFileFound == ''){
        console.log('The uploaded file is get removed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UploadedFile_NotRemoved.png');
        assert.fail('The uploaded file is not get removed. Screenshot Name: \''+screenshotPath+'UploadedFile_NotRemoved.png\'.');
    }

    //will find and click on the Back button
    const backButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Back');
    await backButton.click();
    await driver.wait(until.stalenessOf(backButton));
});

Then('the system should display the required validation message', async () =>{
    //will find the required validation message
    const requiredValidationElem = await importFilePageElementObj.findRequiredValidationMsg(driver,screenshotPath);
    await driver.executeScript("arguments[0].scrollIntoView()",requiredValidationElem);
    const requiredValidation = await requiredValidationElem.getText();
    await driver.sleep(2000);

    //will check the validation message is correct or not
    if(requiredValidation.includes('Please map first name, last name or name field to continue the import.')){
        console.log('The \''+requiredValidation+'\' validation message is getting displayed...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RequiredValidation_NotDisplayed.png');
        assert.fail('The required validation message is not showing. Screenshot Name: \''+screenshotPath+'RequiredValidation_NotDisplayed.png\'.');
    }

    //will go back to the home screen
    const homePage = await commonElementObj.findLinkElement(driver,screenshotPath,'Import or Migrate Data');
    await homePage.click();
    await driver.sleep(2000);
});

Then('the system should display all module name', async () =>{
    let moduleName = [];

    //will find all module names
    const moduleNameElem = await importFilePageElementObj.findModuleNames(driver,screenshotPath);
    for(let i=0; i<5; i++){
        moduleName.push(await moduleNameElem[i].getText());
    }

    //will check all module name is getting displayed or not
    if(moduleName.includes(expectedContactSingularName) && moduleName.includes(expectedCompanySingularName) && moduleName.includes(expectedDealSingularName) && moduleName.includes(expectedActivitySingularName)){
        await moduleNameElem[0].click();
        await driver.sleep(1500);
        await moduleNameElem[1].click();
        await driver.sleep(1500);
        await moduleNameElem[2].click();
        await driver.sleep(1500);
        await moduleNameElem[3].click();
        await driver.sleep(1500);
        await moduleNameElem[4].click();
        await driver.sleep(1500);
        console.log('All module names are getting displayed...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AllModuleNames_NotDisplayed.png');
        assert.fail('All module names are not showing. Screenshot Name: \''+screenshotPath+'AllModuleNames_NotDisplayed.png\'.');
    }

    //will go back to the home screen
    const homePage = await commonElementObj.findLinkElement(driver,screenshotPath,'Import or Migrate Data');
    await homePage.click();
    await driver.sleep(2000);
});

Then('the system should display the selected {string} field', async (expectedFieldName) =>{
    //will find and click on the select field box
    const selectFieldBox = await importFilePageElementObj.findSelectFieldInputBox(driver,screenshotPath);
    const selectedFieldName = await selectFieldBox.getAttribute('value');
    await driver.sleep(1000);

    //will check the provided field is showing as selected or not
    if(selectedFieldName == expectedFieldName){
        console.log('The provided \''+expectedFieldName+'\' field is showing as selected...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+expectedFieldName.replace(/\s/g,'_')+'_Field_NotSelected.png');
        assert.fail('The provided \''+expectedFieldName+'\' field is not selected. Screenshot Name: \''+screenshotPath+expectedFieldName.replace(/\s/g,'_')+'_Field_NotSelected.png\'.');
    }
});

Then('the create new field popup should get opened', async () =>{
    //will find the create new field popup
    const createNewFieldPopup = await importFilePageElementObj.findCreateNewFieldPopup(driver,screenshotPath);
    //will check the create new field popup is found or not
    if(createNewFieldPopup.length > 0){
        console.log('The create new field popup is get opened...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CreateNewFieldPopup_NotFound.png');
        assert.fail('The create new field popup is not opened. Screenshot Name: \''+screenshotPath+'CreateNewFieldPopup_NotFound.png\'.');
    }

    //will close the create new field popup
    const closeButton = await importFilePageElementObj.findPopupCloseButton(driver,screenshotPath);
    await closeButton.click();
    await driver.wait(until.stalenessOf(closeButton));

    //will go back to the home screen
    const homePage = await commonElementObj.findLinkElement(driver,screenshotPath,'Import or Migrate Data');
    await homePage.click();
    await driver.sleep(2000);
});

Then('the system should remove the selected field', async () =>{
    //will find and click on the select field box
    const selectFieldBox = await importFilePageElementObj.findSelectFieldInputBox(driver,screenshotPath);
    const selectedFieldName = await selectFieldBox.getAttribute('value');
    await driver.sleep(1000);
    
    //will check the provided field is showing as selected or not
    if(selectedFieldName == ''){
        console.log('The selected field is get removed...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SelectedField_NotRemoved.png');
        assert.fail('The selected field is not removed. Screenshot Name: \''+screenshotPath+'SelectedField_NotRemoved.png\'.');
    }

    //will go back to the home screen
    const homePage = await commonElementObj.findLinkElement(driver,screenshotPath,'Import or Migrate Data');
    await homePage.click();
    await driver.sleep(2000);
});

Then('the system should display the active user list on the Owner dropdown list', async () =>{
    //will find and click on the owner dropdown
    const ownerDrp = await formElementObj.findDropdown(driver,screenshotPath,'defaultOwner');
    await ownerDrp.click();
    await driver.sleep(1000);
    //will get the dropdown values
    const ownerDrpList = await formElementObj.findDropdownListElement(driver);
    
    //will check the active users are getting displayed or not
    for(let i=0; i<activeUsers.length; i++){
        const user = await ownerDrpList[i].getText();
        if(!activeUsers.includes(user)){
            await screenshotObj.takeScreenshot(driver,screenshotPath+user.replace(/\s/g,'_')+'_NotActiveUser.png');
            assert.fail('The \''+user+'\' is not active user and it is displayed on the Owner dropdown. Screenshot Name: \''+screenshotPath+user.replace(/\s/g,'_')+'_NotActiveUser.png\'.');
        }
    }
    console.log('All active users are getting displayed on the Owner dropdown...');
    await ownerDrp.click();

    //will go back to the home screen
    const homePage = await commonElementObj.findLinkElement(driver,screenshotPath,'Import or Migrate Data');
    await homePage.click();
    await driver.sleep(2000);
});

Then('the system should redirect to the upload file screen', async () =>{
    //will get the screen name
    const screenNameElem = await importFilePageElementObj.findScreenName(driver,screenshotPath);
    const screenName = await screenNameElem.getText();
    
    //will check the system redirect to the upload file screen or not
    if(screenName == 'Import using file'){
        console.log('The system redirected to the upload file screen...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UploadFileScreen_NotFound.png');
        assert.fail('The system is not redirected to the upload file screen. Screenshot Name: \''+screenshotPath+'UploadFileScreen_NotFound.png\'.');
    }
});

Then('the system should redirect to the import home screen', async () =>{
    //will get the screen name
    const screenNameElem = await importFilePageElementObj.findScreenName(driver,screenshotPath);
    const screenName = await screenNameElem.getText();
    
    //will check the system redirect to the import home screen or not
    if(screenName == 'Import or Migrate Data'){
        console.log('The system redirected to the import home screen...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportHomeScreen_NotFound.png');
        assert.fail('The system is not redirected to the import home screen. Screenshot Name: \''+screenshotPath+'ImportHomeScreen_NotFound.png\'.');
    }
});

Then('the Date and Time field setting should get saved with {string} and {string} options', async (dateFormat,timeFormat) =>{
    //will click on the Select Date and Time option
    const selectDateTimeOption = await importFilePageElementObj.findSelectDateTimeOption(driver,screenshotPath);
    await selectDateTimeOption.click();
    await driver.sleep(2000);
    //will get the provided date format value
    const dateFormatValue = await importFilePageElementObj.findDateTimeFormatOption(driver,screenshotPath,dateFormat);
    //will get the provided time format value
    const timeFormatValue = await importFilePageElementObj.findDateTimeFormatOption(driver,screenshotPath,timeFormat);
    
    //will check the date and time format values are correct or not
    if(await dateFormatValue.getAttribute('value') == 'on' && await timeFormatValue.getAttribute('value') == 'on'){
        console.log('The provided date and time format is get set...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DateTimeFormat_NotSet.png');
        assert.fail('The provided date and time format is not set. Screenshot Name: \''+screenshotPath+'DateTimeFormat_NotSet.png\'.');
    }

    //will click on the Save button
    const saveButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Save ');
    await saveButton.click();
    await driver.sleep(2000);
    //will go back to the home screen
    const homePage = await commonElementObj.findLinkElement(driver,screenshotPath,'Import or Migrate Data');
    await homePage.click();
    await driver.sleep(2000);
});

Then('the system should display the warning message', async () =>{
    //will check the ID warning message is found or not
    try{
        const idWarningMsg = await importFilePageElementObj.findIdWarningMsg(driver,screenshotPath);
        await driver.wait(until.elementIsVisible(idWarningMsg));
        await driver.executeScript('arguments[0].scrollIntoView();',idWarningMsg);
        await driver.sleep(1500);
    }catch(err){
        assert.fail(err);
    }
    console.log('The warning message is getting displayed on mapping the \'ID\' column...');
    //will go back to the home screen
    const homePage = await commonElementObj.findLinkElement(driver,screenshotPath,'Import or Migrate Data');
    await homePage.click();
    await driver.sleep(2000);
});

Then('the system should display the imported file details', async () =>{
    let importedModules = [];
    //will find the imported file details
    const importedModulesElem = await importFilePageElementObj.findImportedModules(driver,screenshotPath);
    for(let i=0; i<importedModulesElem.length; i++){
        importedModules.push(await importedModulesElem[i].getAttribute('title'));
    }
    const importedStatusElem = await importFilePageElementObj.findImportedStatus(driver,screenshotPath);
    const importedStatus = await importedStatusElem.getText();
    await driver.executeScript('arguments[0].scrollIntoView();',importedStatusElem);
    const importedByElem = await importFilePageElementObj.findImportedBy(driver,screenshotPath);
    const importedBy = await importedByElem[1].getText();
    const importedDateElem = await importFilePageElementObj.findImportedDate(driver,screenshotPath);
    const importedDate = await importedDateElem.getText();
    const importedFileNameElem = await importFilePageElementObj.findImportedFileName(driver,screenshotPath);
    const importedFileName = await importedFileNameElem.getText();
    await driver.executeScript('arguments[0].scrollIntoView();',importedFileNameElem);

    console.log('The imported file details --> Imported Filename: '+importedFileName+', Imported Modules: '+importedModules+', Imported Status: '+importedStatus+', Imported By: '+importedBy+', Imported Date: '+importedDate+'');
});

Then('revert other imported files through automation testing', async () =>{
    await driver.navigate().refresh();
    await driver.sleep(5000);
    //will set the focus on the grid
    const grid = await importFilePageElementObj.findPreviousImportsGrid(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',grid);
    await driver.sleep(1000);
    const importedStatusElem = await importFilePageElementObj.findImportedStatus(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',importedStatusElem);
    //will find and click on the revert link
    const revertLink = await importFilePageElementObj.findImportedRevertLink2(driver,screenshotPath);
    await driver.executeScript('arguments[0].scrollIntoView();',revertLink);
    await revertLink.click();
    await driver.sleep(1000);
    //will find click on the 'Yes' button
    const yesBtn = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','YES');
    await yesBtn.click();
    await driver.wait(until.stalenessOf(yesBtn));
    //will find the revert progress bar 
    const revertProgressBar = await importFilePageElementObj.findRevertProgressBar(driver,screenshotPath);
    await driver.wait(until.elementIsVisible(revertProgressBar));
    await driver.executeScript("arguments[0].scrollIntoView();",revertProgressBar);
    await driver.wait(until.stalenessOf(revertProgressBar),120000);
});

Then('the imported files should get downloaded', async () =>{
    //will check the file is get downloaded or not 
    const file = './downloadedFile/ImportDataFile1.csv';
    try{
        assert(fs.statSync(file).isFile());
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedFile_NotDownloaded.png');
        await assert.fail('Due to the imported file is not downloaded in the \'./downloadedFile\' folder, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedFile_NotDownloaded.png\'.');
    }
    console.log('The imported file is downloaded successfully in the \'./downloadedFile\' folder...');
});

Then('the Import Summary popup should get opened', async () =>{
    const importedSummaryPopup = await importFilePageElementObj.findImportedSummaryPopup(driver,screenshotPath);
    const numberOfRecordCreated = await importedSummaryPopup[0].getText();
    const numberOfRecordUpdated = await importedSummaryPopup[1].getText();
    const rejectedRecordElem = await importFilePageElementObj.findNumberOfRejectedRecords(driver,screenshotPath);
    const numberOfRecordRejected = await rejectedRecordElem.getText();

    console.log('The import summary --> Created: '+numberOfRecordCreated+', Updated: '+numberOfRecordUpdated+', Rejected: '+numberOfRecordRejected+'.');
});

Then('the Records Created popup should get opened', async () =>{
    //will find the popup title
    const popup = await importFilePageElementObj.findRecordsPopup(driver,screenshotPath);
    const popupTitle = await popup.getText();
    console.log(popupTitle);
    //will check the popup title is correct or not
    if(popupTitle.toLowerCase() == 'records created'){
        console.log('The Records Created popup is get opened...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RecordsCreatedPopup_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('The Records Created popup is not opened. Screenshot Name: \''+screenshotPath+'RecordsCreatedPopup_NotOpened.png\'.');
    }

    //will find and click on the module button
    const moduleButton = await importFilePageElementObj.findModuleButton(driver,screenshotPath);
    await moduleButton.click();
    await driver.sleep(1000);
    //will find and click on the company module 
    const companyModule = await importFilePageElementObj.findModuleNameList(driver,screenshotPath,2);
    await companyModule.click();
    await driver.sleep(2000);
    await moduleButton.click();
    //will find and click on the Deal module 
    const dealModule = await importFilePageElementObj.findModuleNameList(driver,screenshotPath,3);
    await dealModule.click();
    await driver.sleep(2000);
    //will click on the popup cancel button
    const cancelButton = await importFilePageElementObj.findPopupCancelButton(driver,screenshotPath);
    await cancelButton.click();
    await driver.sleep(2000);
});

Then('the Records Updated popup should get opened', async () =>{
    //will find the popup title
    const popup = await importFilePageElementObj.findRecordsPopup(driver,screenshotPath);
    const popupTitle = await popup.getText();
    console.log(popupTitle);

    //will check the popup title is correct or not
    if(popupTitle.toLowerCase() == 'records updated'){
        console.log('The Records Updated popup is get opened...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RecordsUpdatedPopup_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('The Records Updated popup is not opened. Screenshot Name: \''+screenshotPath+'RecordsUpdatedPopup_NotOpened.png\'.');
    }

    //will find and click on the module button
    const moduleButton = await importFilePageElementObj.findModuleButton(driver,screenshotPath);
    await moduleButton.click();
    await driver.sleep(1000);
    //will find and click on the company module 
    const companyModule = await importFilePageElementObj.findModuleNameList(driver,screenshotPath,2);
    await companyModule.click();
    await driver.sleep(2000);
    await moduleButton.click();
    //will find and click on the Deal module 
    const dealModule = await importFilePageElementObj.findModuleNameList(driver,screenshotPath,3);
    await dealModule.click();
    await driver.sleep(2000);
    //will click on the popup cancel button
    const cancelButton = await importFilePageElementObj.findPopupCancelButton(driver,screenshotPath);
    await cancelButton.click();
    await driver.sleep(2000);
});

Then('the file of rejected records should get downloaded', async () =>{
    let isFileDownloaded = 'no';
    const files = fs.readdirSync('./downloadedFile/');

    //will check the file is get downloaded or not 
    for(let i = 0; i < files.length; i++){
        if(files[i].endsWith('11eb-8251-cb7c2eca995b.csv')){
            isFileDownloaded = 'yes'
        }
    }
    if(isFileDownloaded = 'yes'){
        console.log('The file of rejected records is downloaded successfully in the \'./downloadedFile\' folder...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RejectedRecordsFile_NotDownloaded.png');
        await assert.fail('Due to the file of rejected records is not downloaded in the \'./downloadedFile\' folder, the test case has been failed. Screenshot Name: \''+screenshotPath+'RejectedRecordsFile_NotDownloaded.png\'.');
    }
});

Then('the imported data should get reverted', async () =>{
    //will find the revert progress bar 
    const revertProgressBar = await importFilePageElementObj.findRevertProgressBar(driver,screenshotPath);
    await driver.wait(until.elementIsVisible(revertProgressBar));
    await driver.executeScript("arguments[0].scrollIntoView();",revertProgressBar);
    //will check the imported data is get reverted or not
    try{
        await driver.wait(until.stalenessOf(revertProgressBar),120000);
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedData_NotReverted.png');
        await assert.fail('Failed to revert the imported data in 2 min. Screenshot Name: \''+screenshotPath+'ImportedData_NotReverted.png\'.');
    }
    console.log('The imported data are reverted successfully...');
});
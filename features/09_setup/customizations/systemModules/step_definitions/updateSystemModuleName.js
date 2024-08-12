const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const systemModulesPageElementObj = require('../common/systemModulesPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/customizations/systemModules/screenshots/';

let expectedSingularModuleName, expectedPluralModuleName, expectedViewToggleValue, expectedCreateToggleValue,
expectedEditToggleValue, expectedDeleteToggleValue, expectedDisplayOrder, currentSourceModuleDisplayOrder;

Given('the {string} is on system modules page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/setup/customization/modules')){
        console.log('The system modules page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open system modules page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on system modules page');
        //will open the system modules page
        await actionObj.openSystemModulesPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open system modules page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on system modules page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on system modules page');
        //will open the system modules page
        await actionObj.openSystemModulesPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the system modules page
        await actionObj.openSystemModulesPage(driver,screenshotPath);  
    }
});

When('the user clicks on the Edit button of the {string} module', async (moduleName) =>{
    //will check the provided module name is valid or not
    if(moduleName.toLowerCase() != 'deal' && moduleName.toLowerCase() != 'contact' && moduleName.toLowerCase() != 'company' && moduleName.toLowerCase() != 'activity' && moduleName.toLowerCase() != 'product'){
        assert.fail('The provided '+moduleName+' module name is not valid. The name should be one of these ---> \'Contact\', \'Company\', \'Activity\', \'Product\' or \'Deal\'.');
    }
    //will find edit button of the provided module 
    const editButton = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,moduleName);
    //will click on the edit button
    await editButton.click();
    await driver.sleep(1000);
});

When('enter Singular Label: {string}', async (singularName) =>{
    //will find the 'Singular Label' field
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    await clearFieldDataObj.clearFieldData(singularTextbox);
    //will enter the data in the 'Singular Label' field
    await singularTextbox.sendKeys(singularName);
    expectedSingularModuleName = singularName;
});

When('enter Plural Label: {string}', async (pluralName) =>{
    //will find the 'Plural Label' field
    const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
    await clearFieldDataObj.clearFieldData(pluralTextbox);
    //will enter the data in the 'Plural Label' field
    await pluralTextbox.sendKeys(pluralName);
    expectedPluralModuleName = pluralName;
});

When('click on the save button', async () =>{
    //will find the 'Save' button and then will click on it
    const saveButton = await systemModulesPageElementObj.findSaveBtn(driver,screenshotPath);
    await saveButton.click();
    try{
        await driver.wait(until.elementIsEnabled(saveButton),30000,'There seems to be some issue while updating.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Error_While_Updating.png'); 
        assert.fail(err+' Screenshot Name: \''+screenshotPath+'Error_While_Updating.png\'.');
    }   
    await driver.sleep(1000);
});

When('{string} View: {string}', async (profileName,value) =>{
    //will check the provided profile name is exist or not
    const profile = await systemModulesPageElementObj.findProfileName(driver,profileName);
    if(profile.length > 0){
        //will find the View toggle button of the provided profile
        const viewToggleBtn = await systemModulesPageElementObj.findViewToggle(driver,screenshotPath,profileName);
        const currentToggleValue = await viewToggleBtn.getAttribute('value');
        expectedViewToggleValue = value.toLowerCase() == 'enable' ? 'true' : 'false';
        //will click on the toggle button if the existing and new values are different
        if(currentToggleValue != expectedViewToggleValue){
            await driver.executeScript("arguments[0].click();",viewToggleBtn);
        }else{
            console.log('The view toggle button of '+profileName+' profile is already '+value.toLowerCase()+'d...');
        }
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png'); 
        assert.fail('Due to the \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png\'.');
    }
});

When('{string} Create: {string}', async (profileName,value) =>{
    //will check the provided profile name is exist or not
    const profile = await systemModulesPageElementObj.findProfileName(driver,profileName);
    if(profile.length > 0){
        //will find the Create toggle button of the provided profile
        const createToggleBtn = await systemModulesPageElementObj.findCreateToggle(driver,screenshotPath,profileName);
        const currentToggleValue = await createToggleBtn.getAttribute('value');
        expectedCreateToggleValue = value.toLowerCase() == 'enable' ? 'true' : 'false';
        //will click on the toggle button if the existing and new values are different
        if(currentToggleValue != expectedCreateToggleValue){
            await driver.executeScript("arguments[0].click();",createToggleBtn);
        }else{
            console.log('The create toggle button of '+profileName+' profile is already '+value.toLowerCase()+'d...');
        }
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png'); 
        assert.fail('Due to the \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png\'.');
    }
});

When('{string} Edit: {string}', async (profileName,value) =>{
    //will check the provided profile name is exist or not
    const profile = await systemModulesPageElementObj.findProfileName(driver,profileName);
    if(profile.length > 0){
        //will find the Edit toggle button of the provided profile
        const editToggleBtn = await systemModulesPageElementObj.findEditToggle(driver,screenshotPath,profileName);
        const currentToggleValue = await editToggleBtn.getAttribute('value');
        expectedEditToggleValue = value.toLowerCase() == 'enable' ? 'true' : 'false';
        //will click on the toggle button if the existing and new values are different
        if(currentToggleValue != expectedEditToggleValue){
            await driver.executeScript("arguments[0].click();",editToggleBtn);
        }else{
            console.log('The edit toggle button of '+profileName+' profile is already '+value.toLowerCase()+'d...');
        }
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png'); 
        assert.fail('Due to the \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png\'.');
    }
});

When('{string} Delete: {string}', async (profileName,value) =>{
    //will check the provided profile name is exist or not
    const profile = await systemModulesPageElementObj.findProfileName(driver,profileName);
    if(profile.length > 0){
        //will find the Delete toggle button of the provided profile
        const deleteToggleBtn = await systemModulesPageElementObj.findDeleteToggle(driver,screenshotPath,profileName);
        const currentToggleValue = await deleteToggleBtn.getAttribute('value');
        expectedDeleteToggleValue = value.toLowerCase() == 'enable' ? 'true' : 'false';
        //will click on the toggle button if the existing and new values are different
        if(currentToggleValue != expectedDeleteToggleValue){
            await driver.executeScript("arguments[0].click();",deleteToggleBtn);
        }else{
            console.log('The delete toggle button of '+profileName+' profile is already '+value.toLowerCase()+'d...');
        }
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png'); 
        assert.fail('Due to the \''+profileName+'\' profile is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_NotFound.png\'.');
    }
});

When('the user {string} the Product app from the Setup>Apps page', async (newState) =>{
    await actionObj.installOrRemoveProductApp(driver,screenshotPath,newState);
});

When('the user moves the {string} module in place of the {string} module', async (sourceModule,targetModule) =>{
    //will find source module name and target module name
    const sourceModuleElem = await systemModulesPageElementObj.findModuleNameForDragAndDrop(driver,sourceModule);
    const targetModuleElem = await systemModulesPageElementObj.findModuleNameForDragAndDrop(driver,targetModule);
    
    //will check the source and target module name is visible or not
    if(sourceModuleElem.length > 0 && targetModuleElem.length > 0){
        //will get the current display order of source and target modules
        const moduleNames = await systemModulesPageElementObj.findModuleNamesOnListPage(driver,screenshotPath);
        for(let i=0; i<moduleNames.length; i++){
            const moduleName = await moduleNames[i].getText();
            if(moduleName.startsWith(targetModule)){
                expectedDisplayOrder = i+1;
            }else if(moduleName.startsWith(sourceModule)){
                currentSourceModuleDisplayOrder = i+1;
            }
        }
        //will drag the source module and then drop it to the target module place
        await driver.sleep(4000);
        await driver.actions().dragAndDrop(sourceModuleElem[0],targetModuleElem[0]).perform();
        await driver.sleep(2000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ModuleName_NotFound_OnSystemModulesPage.png'); 
        assert.fail('The provided source \''+sourceModule+'\' module name or target \''+targetModule+'\' module name is not valid. The name should be one of these ---> \'Contact\', \'Company\', \'Activity\', \'Product\' or \'Deal\'. Screenshot Name: \''+screenshotPath+'ModuleName_NotFound_OnSystemModulesPage.png\'.'); 
    }
});

Then('the display name of the {string} module should get changed with {string} message', async (moduleName,successMsg) =>{
    let isModuleNameUpdatedOnList = 'no';

    //will check the success message is given or not
    await actionObj.checkSuccessMessage(driver,screenshotPath,successMsg);
    //will navigate on another page and then come back to the system modules page 
    await actionObj.comeBackToSystemModulesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will check the updated module name on the system modules list page is showing or not
    const moduleNames = await systemModulesPageElementObj.findModuleNamesOnListPage(driver,screenshotPath);
    for(let i=0; i<moduleNames.length; i++){
        const moduleName = await moduleNames[i].getText();
        if(moduleName.endsWith(expectedSingularModuleName+')')){
            isModuleNameUpdatedOnList = 'yes'
            break;
        }
    }
    if(isModuleNameUpdatedOnList == 'yes'){
        console.log('The updated \''+moduleName+'\' module name is showing on the system modules list page...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+moduleName+'ModuleName_NotUpdated_OnListPage.png'); 
        assert.fail('Due to the \''+moduleName+'\' module name is not updated on the system modules list page, the test case has been failed. Screenshot Name: \''+screenshotPath+moduleName+'ModuleName_NotUpdated_OnListPage.png\'.');
    }
    
    //will open edit module page 
    const editButton = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,moduleName);
    await editButton.click();
    await driver.sleep(1000);
    //will get the actual singular and plural value
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    const actualSingularModuleName = await singularTextbox.getAttribute('value');
    const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
    const actualPluralModuleName = await pluralTextbox.getAttribute('value');
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);
    //will check the data on the edit module page is getting maintained or not 
    try{
        assert.strictEqual(actualPluralModuleName,expectedPluralModuleName);
        assert.strictEqual(actualSingularModuleName,expectedSingularModuleName);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+moduleName+'ModuleName_NotUpdated_EditPage.png'); 
        await cancelBtn.click();
        assert.fail('Due to the \''+moduleName+'\' module name is not updated on the edit module page, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+moduleName+'ModuleName_NotUpdated_EditPage.png\'.');
    }
    //will close the edit module page
    await cancelBtn.click();
    console.log('The updated \''+moduleName+'\' module name is showing on the edit module page...');
});

Then('the {string} profile permission of the selected {string} should get updated with {string} message', async (profileName,moduleName,successMsg) =>{
    let fieldName;

    //will check the success message is given or not
    await actionObj.checkSuccessMessage(driver,screenshotPath,successMsg);
    //will navigate on another page and then come back to the system modules page 
    await actionObj.comeBackToSystemModulesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will open edit module page 
    const editButton = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,moduleName);
    await editButton.click();
    await driver.sleep(1000);
    //will get the all toggle values of the provided profile 
    const viewToggleBtn = await systemModulesPageElementObj.findViewToggle(driver,screenshotPath,profileName);
    const actualViewToggleValue = await viewToggleBtn.getAttribute('value');
    const createToggleBtn = await systemModulesPageElementObj.findCreateToggle(driver,screenshotPath,profileName);
    const actualCreateToggleValue = await createToggleBtn.getAttribute('value');
    const editToggleBtn = await systemModulesPageElementObj.findEditToggle(driver,screenshotPath,profileName);
    const actualEditToggleValue = await editToggleBtn.getAttribute('value');
    const deleteToggleBtn = await systemModulesPageElementObj.findDeleteToggle(driver,screenshotPath,profileName);
    const actualDeleteToggleValue = await deleteToggleBtn.getAttribute('value');
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);

    //will check the all toggle values of the provided profile are getting maintained or not
    try{
        fieldName='View';
        assert.strictEqual(actualViewToggleValue,expectedViewToggleValue);
        fieldName='Create';
        assert.strictEqual(actualCreateToggleValue,expectedCreateToggleValue);
        fieldName='Edit';
        assert.strictEqual(actualEditToggleValue,expectedEditToggleValue);
        fieldName='Delete';
        assert.strictEqual(actualDeleteToggleValue,expectedDeleteToggleValue);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_'+fieldName+'_Permission_NotUpdated.png'); 
        await cancelBtn.click();
        assert.fail('Due to the \''+fieldName+'\' permission of the \''+profileName+'\' profile is not updated, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+profileName.replace(/\s/g,'_')+'_Profile_'+fieldName+'_Permission_NotUpdated.png\'.');
    }
    //will close the edit module page
    await cancelBtn.click();
    console.log('The '+profileName+' profile permissions of the selected '+moduleName+' module has been updated...')
});

Then('the system should give a required validation', async () =>{
    let fieldName, actualSingularFieldValidationMsg, actualPluralFieldValidationMsg;
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);

    //will check the field validation message is as per the expectation or not
    try{
        fieldName = 'SingularLabel'
        const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
        const singularFieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,singularTextbox);
        actualSingularFieldValidationMsg = await singularFieldValidationElement.getText();
        assert.strictEqual(actualSingularFieldValidationMsg,'Please provide singular label');

        fieldName = 'PluralLabel'
        const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
        const pluralFieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,pluralTextbox);
        actualPluralFieldValidationMsg = await pluralFieldValidationElement.getText();
        assert.strictEqual(actualPluralFieldValidationMsg,'Please provide plural label');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'Field_ValidationMsg_NotCorrect.png'); 
        await cancelBtn.click();
        assert.fail('Due to the \''+fieldName+'\' field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'Field_ValidationMsg_NotCorrect.png\'.');
    }

    //will close the edit module page
    await cancelBtn.click();
    
    console.log('On leaving required singular field as blank, the system has given the \''+actualSingularFieldValidationMsg+'\' validation message.');
    console.log('On leaving required plural field as blank, the system has given the \''+actualPluralFieldValidationMsg+'\' validation message.');
});

Then('the product module should get displayed on the System Modules page', async () =>{
    let isProductModuleDisplayedOnList = 'no';

    //will open the 'System Modules' page
    await actionObj.openSystemModulesPage(driver,screenshotPath);
    //will check the product module name on the system modules page is showing or not
    const moduleNames = await systemModulesPageElementObj.findModuleNamesOnListPage(driver,screenshotPath);
    for(let i=0; i<moduleNames.length; i++){
        const moduleName = await moduleNames[i].getText();
        if(moduleName.startsWith('Product')){
            isProductModuleDisplayedOnList = 'yes'
            break;
        }
    }
    if(isProductModuleDisplayedOnList == 'yes'){
        console.log('After installing the product app, the product module name is showing on the system modules page...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductModuleName_NotFound_OnSystemModulesPage.png'); 
        assert.fail('Due to the product module name is not getting displayed on the system modules page even after installing the product app, the test case has been failed. Screenshot Name: \''+screenshotPath+'ProductModuleName_NotFound_OnSystemModulesPage.png\'.');
    }
});

Then('the product module should not be displayed on the System Modules page', async () =>{
    let isProductModuleDisplayedOnList = 'no';

    //will open the 'System Modules' page
    await actionObj.openSystemModulesPage(driver,screenshotPath);
    //will check the product module name on the system modules page is showing or not
    const moduleNames = await systemModulesPageElementObj.findModuleNamesOnListPage(driver,screenshotPath);
    for(let i=0; i<moduleNames.length; i++){
        const moduleName = await moduleNames[i].getText();
        if(moduleName.startsWith('Product')){
            isProductModuleDisplayedOnList = 'yes'
            break;
        }
    }
    if(isProductModuleDisplayedOnList == 'no'){
        console.log('After uninstalling the product app, the product module name is not showing on the system modules page...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductModuleName_Found_OnSystemModulesPage.png'); 
        assert.fail('Due to the product module name is getting displayed on the system modules page even after uninstalling the product app, the test case has been failed. Screenshot Name: \''+screenshotPath+'ProductModuleName_Found_OnSystemModulesPage.png\'.');
    }
});

Then('the {string} module should be displayed in place of the {string} module', async (sourceModule,targetModule) =>{
    let actualDisplayOrder;

    //will check the success message is given or not
    await actionObj.checkSuccessMessage(driver,screenshotPath,'Module(s) updated successfully');
    //will navigate on another page and then come back to the system modules page 
    await actionObj.comeBackToSystemModulesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will get the current display order of source module
    const moduleNames = await systemModulesPageElementObj.findModuleNamesOnListPage(driver,screenshotPath);
    for(let i=0; i<moduleNames.length; i++){
        const moduleName = await moduleNames[i].getText();
        if(moduleName.startsWith(sourceModule)){
            actualDisplayOrder = i+1;
            break;
        }
    }
    //will check the display order of source module is get changed or not
    try{
        assert.strictEqual(actualDisplayOrder,expectedDisplayOrder);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DragAndDropModule_NotWorking.png'); 
        assert.fail('Due to the display order of \''+sourceModule+'\' module is not changed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DragAndDropModule_NotWorking.png\'.');
    }

    console.log('The display order of \''+sourceModule+'\' module is get changed from \''+currentSourceModuleDisplayOrder+'\' to \''+actualDisplayOrder+'\'.');
});
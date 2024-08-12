const {Given,When,Then} = require('@cucumber/cucumber');
const assert = require('assert');
const {By,until, Key} = require('selenium-webdriver');
const { strictEqual } = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const activityTypesPageElementObj = require('../common/activityTypesPageElements');
const systemModulesPageElementObj = require('../../systemModules/common/systemModulesPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/03_setup/customizations/activityTypes/screenshots/';

let expectedActivitySingularName, expectedActivityPluralName, expectedDisplayOrder, currentSourceTypeDisplayOrder, currentSourceOutcomeDisplayOrder,
oldOutcomes = [];

Given('the {string} is on activity types page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/customization/activity-type')){
        console.log('The activity types page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open activity types page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on activity types page');
        //will open the activity types page
        await actionObj.openActivityTypesPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open activity types page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity types page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on activity types page');
        //will open the activity types page
        await actionObj.openActivityTypesPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the activity types page
        await actionObj.openActivityTypesPage(driver,screenshotPath);  
    }
});

When('the user goes on the Setup> System Modules page and verifies the singular and plural name of the Activity module', async () =>{
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'System Modules' tab 
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');

    //will check the 'System Modules' tab is visible or not
    if(systemModulesTab.length > 0){
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
    }else{
        /* As 'System Modules' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the user goes on the Setup> System Modules page and verifies the singular and plural name of the Activity module');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the user goes on the Setup> System Modules page and verifies the singular and plural name of the Activity module');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'System Modules' tab 
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
    }
    await driver.sleep(1000);
    await driver.wait(until.urlContains('app/setup/customization/modules'),10000);

    //will get the singular and plural name of the activity module
    const moduleEditBtn = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,'Activity');
    await moduleEditBtn.click();
    await driver.sleep(1000);
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    expectedActivitySingularName = await singularTextbox.getAttribute('value');
    const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
    expectedActivityPluralName = await pluralTextbox.getAttribute('value');
});

When('the user goes on the Setup> Activity Types page', async () =>{
    //will open the activity types page
    await actionObj.openActivityTypesPage(driver,screenshotPath);  
});

When('the user clicks on the Add Activity Type button', async () =>{
    //will find the add activity type button
    const addActivityTypeBtn = await activityTypesPageElementObj.findAddActivityTypeBtn(driver,screenshotPath,expectedActivitySingularName);
    //will click on the add activity type button
    await driver.executeScript("arguments[0].click();",addActivityTypeBtn);
    await driver.sleep(1000);
});

When('Name: {string}', async (name) =>{
    try{
        //will find the 'Name' textbox
        const nameField = await activityTypesPageElementObj.findNameField(driver,screenshotPath);
        await clearFieldDataObj.clearFieldData(nameField);
        //will check which type of data needs to pass
        if(name.toLowerCase() == 'random_name'){
            //will pass the random data in the 'Name' textbox
            const random_num = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
            await nameField.sendKeys('Random_'+random_num);
        }else{
            //will pass the provided data in the 'Name' textbox
            await nameField.sendKeys(name);
        }
    }catch(err){
        //will close the activity type popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('Count as communication: {string}', async (expectedValue) =>{
    try{
        //will find the communication checkbox
        const communicationCheckbox = await activityTypesPageElementObj.findCommunicationCheckbox(driver,screenshotPath);
        //will click on the checkbox 
        await driver.executeScript("arguments[0].click();",communicationCheckbox);
    }catch(err){
        //will close the activity type popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('select activity type icon', async () =>{
    try{
        //will find the activity type icon
        const typeIcon = await activityTypesPageElementObj.findActivityIcon(driver,screenshotPath);
        //will click on the activity type icon
        await typeIcon.click()
    }catch(err){
        //will close the activity type popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('click on the {string} Type button', async (button) =>{
    try{
        //will find the add/update type button
        const addOrUpdateTypeBtn = await activityTypesPageElementObj.findAddOrUpdateTypeBtn(driver,screenshotPath);
        //will click on the add/update type button
        await addOrUpdateTypeBtn.click();
        await driver.sleep(1000);
    }catch(err){
        //will close the activity type popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('the user clicks on the Edit button of existing activity type', async () =>{
    //will find the edit button of provided activity type
    const editButton = await activityTypesPageElementObj.findEditBtn(driver);
    //will check the edit button is found or not
    try {
        await editButton.click();
        await driver.sleep(1500);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+typeName.replace(/\s/g,'_')+'_TypeName_NotFound_ListPage.png');
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the edit button of \''+typeName+'\' type name is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+typeName.replace(/\s/g,'_')+'_TypeName_NotFound_ListPage.png\'.');
    }
});

When('the user clicks on the Edit button of existing {string} activity type', async (typeName) =>{
    //will find the edit button of provided activity type
    const editButton = await activityTypesPageElementObj.findEditButton(driver);
    //will check the edit button is found or not
    try {
        await editButton.click();
        await driver.sleep(1500);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+typeName.replace(/\s/g,'_')+'_TypeName_NotFound_ListPage.png');
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the edit button of \''+typeName+'\' type name is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+typeName.replace(/\s/g,'_')+'_TypeName_NotFound_ListPage.png\'.');
    }
});

When('change activity type icon', async () =>{
    try{
        //will find the activity type icon
        const typeIcon = await activityTypesPageElementObj.findActivityIconChange(driver,screenshotPath);
        //will click on the activity type icon
        await typeIcon.click();
    }catch(err){
        //will close the activity type popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('the user moves the {string} activity type in place of the {string} activity type', async (sourceType,targetType) =>{
    //will find source type name and target type name
    const sourceTypeElem = await activityTypesPageElementObj.findTypeNameForDragAndDrop(driver,sourceType);
    const targetTypeElem = await activityTypesPageElementObj.findTypeNameForDragAndDrop(driver,targetType);
    
    //will check the source and target type name is visible or not
    if(sourceTypeElem.length > 0 && targetTypeElem.length > 0){
        //will get the current display order of source and target types
        const typeNames = await activityTypesPageElementObj.findAllNamesfromListPage(driver);
        for(let i=0; i<typeNames.length; i++){
            const typeName = await typeNames[i].getText();
            if(typeName.startsWith(targetType)){
                expectedDisplayOrder = i+1;
            }else if(typeName.startsWith(sourceType)){
                currentSourceTypeDisplayOrder = i+1;
            }
        }
        //will drag the source type and then drop it to the target type place
        await driver.actions().dragAndDrop(sourceTypeElem[0],targetTypeElem[0]).perform();
        await driver.sleep(2000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'TypeName_NotFound_OnActivityTypesPage.png'); 
        assert.fail('The provided source \''+sourceType+'\' type name or target \''+targetType+'\' type name does not exist on the active activity types page. Screenshot Name: \''+screenshotPath+'TypeName_NotFound_OnActivityTypesPage.png\'.'); 
    }
});

When('the user clicks on the Deactivate button of active {string} activity type', async (typeName) =>{
    //will find the deactivate button of the provided type
    const deactivateBtn = await activityTypesPageElementObj.findDeactivateBtn(driver,screenshotPath,typeName);
    //will click on the deactivate button of the provided type
    await deactivateBtn.click();
    await driver.sleep(2000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(1000);
});

When('click on the Activate button of inactive {string} activity type', async (typeName) =>{
    //will find the activate button of the provided type
    const activateBtn = await activityTypesPageElementObj.findActivateBtn(driver,screenshotPath,typeName);
    //will click on the activate button of the provided type
    await activateBtn.click();
    await driver.sleep(2000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(1000);
});

When('click on the Inactive tab', async () =>{
    //will find the inactive tab
    const inactiveTab = await activityTypesPageElementObj.findActiveOrInactiveTabName(driver,screenshotPath,'Inactive');
    //will click on the inactive tab
    await inactiveTab.click()
    await driver.sleep(2000);
});

When('the user clicks on the Inactive tab', async () =>{
    //will find the inactive tab
    const inactiveTab = await activityTypesPageElementObj.findActiveOrInactiveTabName(driver,screenshotPath,'Inactive');
    //will click on the inactive tab
    await inactiveTab.click()
    await driver.sleep(2000);
});

When('the user clicks on the Manage Outcomes button of {string} activity type', async (typeName) =>{
    //will find the Manage Outcomes button of the provided type
    const outcomesBtn = await activityTypesPageElementObj.findManageOutcomesBtn(driver,screenshotPath,typeName);
    //will click on the Manage Outcomes button of the provided type
    await outcomesBtn.click();
    await driver.sleep(2000);
});

When('Outcome: {string}', async (newOutcome) =>{
    try{
        //will find the Add New Outcome textbox
        const addNewOutcomeTextbox = await activityTypesPageElementObj.findAddOutcomeTextbox(driver,screenshotPath);
        //will pass the provided data in the Add New Outcome textbox
        await clearFieldDataObj.clearFieldData(addNewOutcomeTextbox);
        await addNewOutcomeTextbox.sendKeys(newOutcome);
        await addNewOutcomeTextbox.sendKeys(Key.ENTER);
        await driver.sleep(1000);
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('Update {string} outcome with {string}', async (oldOutcome,newOutcome) =>{
    let isOldOutcomeFound = 'no';
    oldOutcomes.push(oldOutcome);

    try{
        //will get all existing outcomes
        const allOutcomes = await activityTypesPageElementObj.findOutcomes(driver);
        //will check any outcome is found or not
        if(allOutcomes.length > 0){
            //will travel all outcomes
            for(let i=0; i<allOutcomes.length; i++){
                const outcome = await allOutcomes[i].getAttribute('value');
                //will check the outcomes list contains an old outcome or not
                if(outcome.includes(oldOutcome)){
                    isOldOutcomeFound = 'yes';
                    //will pass the provided data in the old outcome textbox
                    await clearFieldDataObj.clearFieldData(allOutcomes[i]);
                    await allOutcomes[i].sendKeys(newOutcome);
                }
            }
            //will mark the test case as failed when the outcomes list doesn't contain an old outcome
            if(isOldOutcomeFound == 'no'){
                await screenshotObj.takeScreenshot(driver,screenshotPath+oldOutcome.replace(/\s/g,'_')+'_Outcome_NotFound.png');
                await driver.navigate().refresh();
                assert.fail('Due to the \''+oldOutcome+'\' outcome is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+oldOutcome.replace(/\s/g,'_')+'_Outcome_NotFound.png\'.')
            }
        }else{
            await screenshotObj.takeScreenshot(driver,screenshotPath+'AnyOutcome_NotFound_ForUpdate.png');
            await driver.navigate().refresh();
            assert.fail('Due to any outcome is not found to update, the test case has been failed. Screenshot Name: \''+screenshotPath+'AnyOutcome_NotFound_ForUpdate.png\'.')
        }
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
    await driver.sleep(2000);
});

When('delete the outcome', async () =>{
    try {
        const trashButton = await activityTypesPageElementObj.findTrashButton(driver);
        await trashButton.click();
        await driver.sleep(500);
        const trashButtonElement = await activityTypesPageElementObj.findTrashButton(driver);
        await trashButtonElement.click();
        await driver.sleep(500);
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
}); 

When('click on the Save button of outcome', async () =>{
    //will find the 'Save' button and then click on it
    const saveButton = await activityTypesPageElementObj.findSaveBtn(driver,screenshotPath);
    await saveButton.click();
    try{
        await driver.wait(until.elementIsEnabled(saveButton),20000,'There seems to be some issue while performing operations.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Error_While_Outcomes_Update.png');
        await driver.navigate().refresh();
        assert.fail(err+' Screenshot Name: \''+screenshotPath+'Error_While_Outcomes_Update.png\'.');
    } 
    await driver.sleep(1000); 
});

When('move the {string} outcome in place of the {string} outcome', async (sourceOutcome,targetOutcome) =>{
    let sourceOutcomeElem, targetOutcomeElem, isSourceOutcomeFound = 'no', isTargetOutcomeFound = 'no';
    const dragAndDropOutcomeElem = await activityTypesPageElementObj.findOutcomeForDragAndDrop(driver);

    //will get all existing outcomes
    const allOutcomes = await activityTypesPageElementObj.findOutcomes(driver);
    //will check any outcome is found or not
    if(allOutcomes.length > 0){
        //will travel all outcomes
        for(let i=0; i<allOutcomes.length; i++){
            const outcome = await allOutcomes[i].getAttribute('value');
            //will check the outcomes list contains a source and target outcome or not
            if(outcome.includes(sourceOutcome)){
                isSourceOutcomeFound = 'yes'
                currentSourceOutcomeDisplayOrder = i+1;
                sourceOutcomeElem = dragAndDropOutcomeElem[i];
            }else if(outcome.includes(targetOutcome)){
                isTargetOutcomeFound = 'yes';
                expectedDisplayOrder = i+1;
                targetOutcomeElem = dragAndDropOutcomeElem[i];
            }
        }
        //will mark the test case as failed when the outcomes list doesn't contain a source or target outcome
        if(isSourceOutcomeFound == 'no' || isTargetOutcomeFound == 'no'){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Outcome_NotFound.png');
            await driver.navigate().refresh();
            assert.fail('Due to the \''+sourceOutcome+'\' or \''+targetOutcome+'\' outcome is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'Outcome_NotFound.png\'.')
        }
        //will drag the source outcome and then drop it to the target outcome place
        await driver.actions().dragAndDrop(sourceOutcomeElem,targetOutcomeElem).perform();
        await driver.sleep(5000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AnyOutcome_NotFound.png');
        await driver.navigate().refresh();
        assert.fail('Due to any outcome is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AnyOutcome_NotFound.png\'.')
    }
});

When('the user verifies the Edit and Deactivate button of Task and Call activity type', async () =>{
    //no need to do anything over here. This is written only to increase readability
});

Then('the system should display the singular and plural name of the Activity module on the Activity Types page', async () =>{
    //will get the current page title 
    let pageTitle = await activityTypesPageElementObj.findPageTitle(driver,screenshotPath);
    pageTitle = await pageTitle.getText();
    
    //will check the dynamic module name is showing or not on the page title
    try{
        await assert(pageTitle.startsWith(expectedActivitySingularName));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DynamicModuleName_NotShowing_PageTitle.png');
        assert.fail('Due to the dynamic module name is not showing on the activity types page title, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DynamicModuleName_NotShowing_PageTitle.png\'.');
    }

    console.log('The dynamic \''+expectedActivitySingularName+'\' module name is showing on the activity types page title...');
});

Then('the new activity type should get added with {string} message', async (expectedNotification) =>{
    const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(notificationMsgElement));
    const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(notificationMsg, expectedNotification);
    await driver.sleep(4000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(2000);
});

Then('the activity type details should be the same as provided {string} on the list page', async (expectedName) =>{
    //will check the provided activity type name is found or not on the list page
    const nameOnListPage = await activityTypesPageElementObj.findNamefromListPage(driver,expectedName);
    if(nameOnListPage.length > 0){
        console.log('The activity type name is the same as provided name: \''+expectedName+'\' on the list page...')
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+expectedName.replace(/\s/g,'_')+'_TypeName_NotFound_ListPage.png');
        assert.fail('Due to the \''+expectedName+'\' type name is not found on the activity types list page, the test case has been failed. Screenshot Name: \''+screenshotPath+expectedName.replace(/\s/g,'_')+'_TypeName_NotFound_ListPage.png\'.');
    }
});

Then('the activity type details should be the same as provided {string} and {string} on the edit activity type popup', async (expectedName,expectedCommunicationValue) =>{
    //will find activity type edit button
    const editButton = await activityTypesPageElementObj.findEditButton(driver);
    //will click on the activity type edit button
    await editButton.click();
    await driver.sleep(1500);

    //will find the 'Name' textbox
    const nameField = await activityTypesPageElementObj.findNameField(driver,screenshotPath);
    //will get the actual type name
    const actualName = await nameField.getAttribute('value');
    //will find the communication checkbox
    const communicationCheckbox = await activityTypesPageElementObj.findCommunicationCheckbox(driver,screenshotPath);
    //will get the actual communication value
    const actualCommunicationValue = await communicationCheckbox.getAttribute('value');

    //will check the value on the edit popup is the same as provided or not
    try{
        assert.strictEqual(actualName,expectedName);
        /* Note: The value of communication is always showing as false on the edit type popup */
        assert.strictEqual(actualCommunicationValue,'false');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ActivityTypeDetails_NotCorrect_EditPage.png');
        await driver.navigate().refresh();
        assert.fail('Due to the activity type details are not same as provided on the edit type page, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ActivityTypeDetails_NotCorrect_EditPage.png\'.');
    }

    //will close the edit popup
    const cancelBtn = await activityTypesPageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The activity type details are the same as provided name: \''+expectedName+'\' and communication: \''+expectedCommunicationValue+'\' on the edit activity type popup...');
});

Then('the activity type details should be the same as provided {string} and {string} on edit activity type popup', async (expectedName,expectedCommunicationValue) =>{
    //will find activity type edit button
    const editButton = await activityTypesPageElementObj.findEditBtn(driver);
    //will click on the activity type edit button
    await editButton.click();
    await driver.sleep(1500);

    //will find the 'Name' textbox
    const nameField = await activityTypesPageElementObj.findNameField(driver,screenshotPath);
    //will get the actual type name
    const actualName = await nameField.getAttribute('value');
    //will find the communication checkbox
    const communicationCheckbox = await activityTypesPageElementObj.findCommunicationCheckbox(driver,screenshotPath);
    //will get the actual communication value
    const actualCommunicationValue = await communicationCheckbox.getAttribute('value');

    //will check the value on the edit popup is the same as provided or not
    try{
        assert.strictEqual(actualName,expectedName);
        /* Note: The value of communication is always showing as false on the edit type popup */
        assert.strictEqual(actualCommunicationValue,'false');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ActivityTypeDetails_NotCorrect_EditPage.png');
        await driver.navigate().refresh();
        assert.fail('Due to the activity type details are not same as provided on the edit type page, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ActivityTypeDetails_NotCorrect_EditPage.png\'.');
    }

    //will close the edit popup
    const cancelBtn = await activityTypesPageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The activity type details are the same as provided name: \''+expectedName+'\' and communication: \''+expectedCommunicationValue+'\' on the edit activity type popup...');
});

Then('the system should give {string} validation message', async (expectedValidationMsg) =>{
    //will find the validation message
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the validation message text
    const notyMessageText = await notyMessage.getText();
    
    //will check the validation message is as per the expectation or not
    try{
        strictEqual(notyMessageText,expectedValidationMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the duplicate activity type validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The \''+notyMessageText+'\' validation message is showing...');
});

Then('the {string} validation message should be displayed for the Name field', async (nameValidationMsg) =>{
    //will find the validation msg of Name field
    const nameField = await activityTypesPageElementObj.findNameField(driver,screenshotPath);
    const validationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,nameField);
    //will get the validation message text
    const actualValidationMsg = await validationElem.getText();

    //will check the validation message is as per the expectation or not
    try{
        assert.strictEqual(actualValidationMsg,nameValidationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the name field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The \''+actualValidationMsg+'\' validation message is showing...');
});

Then('the system should give {string} validation message for the activity type name', async (validationMsg) =>{
    //will find the validation message
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the validation message text
    const notyMessageText = await notyMessage.getText();
    
    //will check the validation message is as per the expectation or not
    try{
        assert.strictEqual(notyMessageText,validationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the invalid type name validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The \''+notyMessageText+'\' validation message is showing...');
});

Then('the existing activity type should get updated with {string} message', async (expectedMessage) =>{
    //will check the success message is given or not
    const actualMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]')).getText();
    console.log(actualMessage);
    assert.strictEqual(actualMessage,expectedMessage);
    await driver.sleep(4000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(1000);
});

Then('the {string} activity type should be displayed in the inactive types list', async (typeName) =>{
    const inactiveTypeName = await activityTypesPageElementObj.findNamefromListPage(driver,typeName);
    //will check the provided type name is showing or not in the inactive list
    if(inactiveTypeName.length > 0){
        await driver.executeScript("arguments[0].scrollIntoView();",inactiveTypeName[0]);
        console.log('The \''+typeName+'\' activity type is get deactivated...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+typeName.replace(/\s/g,'_')+'_Type_Not_Deactivated.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the \''+typeName+'\' activity type is not deactivated, the test case has been failed. Screenshot Name: \''+screenshotPath+typeName.replace(/\s/g,'_')+'_Type_Not_Deactivated.png\'.');
    }
});

Then('the {string} activity type should be displayed in the active types list', async (typeName) =>{
    const activeTypeName = await activityTypesPageElementObj.findNamefromListPage(driver,typeName);
    //will check the provided type name is showing or not in the active list
    if(activeTypeName.length > 0){
        await driver.executeScript("arguments[0].scrollIntoView();",activeTypeName[0]);
        console.log('The \''+typeName+'\' activity type is get activated...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+typeName.replace(/\s/g,'_')+'_Type_Not_Activated.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the \''+typeName+'\' activity type is not activated, the test case has been failed. Screenshot Name: \''+screenshotPath+typeName.replace(/\s/g,'_')+'_Type_Not_Activated.png\'.');
    }
});

Then('the {string} activity type should be displayed in place of the {string} activity type', async (sourceType,targetType) =>{
    let actualDisplayOrder;

    //will check the success message is given or not
    const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(notificationMsgElement));
    const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(notificationMsg, 'Activity type added successfully');
    await driver.sleep(4000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(2000);

    //will get the current display order of source type
    const typeNames = await activityTypesPageElementObj.findAllNamesfromListPage(driver,screenshotPath);
    for(let i=0; i<typeNames.length; i++){
        const typeName = await typeNames[i].getText();
        if(typeName.startsWith(sourceType)){
            actualDisplayOrder = i+1;
            break;
        }
    }
    //will check the display order of source type is get changed or not
    try{
        assert.strictEqual(actualDisplayOrder,expectedDisplayOrder);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DragAndDropType_NotWorking.png'); 
        assert.fail('Due to the display order of \''+sourceType+'\' type is not get changed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DragAndDropType_NotWorking.png\'.');
    }

    console.log('The display order of \''+sourceType+'\' type is get changed from \''+currentSourceTypeDisplayOrder+'\' to \''+actualDisplayOrder+'\'.');
});

Then('the {string} and {string} outcomes should get added for the {string} activity type', async (outcome1,outcome2,typeName) =>{
    let isOutcomeOneFound = 'no', isOutcomeTwoFound = 'no';

    //will check the success message is given or not
    const actualMsg = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]')).getText();
    assert.strictEqual(actualMsg,'Activity outcomes updated successfully');
    await driver.sleep(3000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will find the Manage Outcomes button of the provided type
    const outcomesBtn = await activityTypesPageElementObj.findManageOutcomesBtn(driver,screenshotPath,typeName);
    //will click on the Manage Outcomes button of the provided type
    await outcomesBtn.click();
    await driver.sleep(2000);

    //will get all existing outcomes
    const allOutcomes = await activityTypesPageElementObj.findOutcomes(driver);
    //will check any outcome is found or not
    if(allOutcomes.length > 0){
        //will travel all outcomes
        for(let i=0; i<allOutcomes.length; i++){
            const outcome = await allOutcomes[i].getAttribute('value');
            //will check the outcomes list contains a new outcome or not
            if(outcome.includes(outcome1)){
                isOutcomeOneFound = 'yes'
            }else if(outcome.includes(outcome2)){
                isOutcomeTwoFound = 'yes'
            }
        }
        //will mark the test case as failed when the outcomes list doesn't contain a new outcome
        if(isOutcomeOneFound == 'no' || isOutcomeTwoFound == 'no'){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Outcome_NotAdded.png');
            await driver.navigate().refresh();
            assert.fail('Due to the new \''+outcome1+'\' or \''+outcome2+'\' outcome is not added, the test case has been failed. Screenshot Name: \''+screenshotPath+'Outcome_NotAdded.png\'.')
        }
        console.log('The new \''+outcome1+'\' and \''+outcome2+'\' outcomes have been added...')
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AnyOutcome_NotFound.png');
        await driver.navigate().refresh();
        assert.fail('Due to any outcome is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AnyOutcome_NotFound.png\'.')
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findOutcomeCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);
});

Then('the system should give {string} validation message for outcomes', async (validationMsg) =>{
    //will find notification message 
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the validation message is as per the expectation or not
    try{
        assert.strictEqual(notyMessageText,validationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMessage_NotCorrect.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMessage_NotCorrect.png\'');
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findOutcomeCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The \''+validationMsg+'\' validation message is getting displayed...');
});

Then('the outcomes of {string} activity type should get updated with {string} and {string} outcomes', async (typeName,updatedOutcome1,updatedOutcome2) =>{
    let isUpdatedOutcomeOneFound = 'no', isUpdatedOutcomeTwoFound = 'no';

    //will check the success message is given or not
    const actualMsg = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]')).getText();
    assert.strictEqual(actualMsg,'Activity outcomes updated successfully');
    await driver.sleep(3000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will find the Manage Outcomes button of the provided type
    const outcomesBtn = await activityTypesPageElementObj.findManageOutcomesBtn(driver,screenshotPath,typeName);
    //will click on the Manage Outcomes button of the provided type
    await outcomesBtn.click();
    await driver.sleep(2000);

    //will get all existing outcomes
    const allOutcomes = await activityTypesPageElementObj.findOutcomes(driver);
    //will check any outcome is found or not
    if(allOutcomes.length > 0){
        //will travel all outcomes
        for(let i=0; i<allOutcomes.length; i++){
            const outcome = await allOutcomes[i].getAttribute('value');
            //will check the outcomes list contains a updated outcome or not
            if(outcome.includes(updatedOutcome1)){
                isUpdatedOutcomeOneFound = 'yes'
            }else if(outcome.includes(updatedOutcome2)){
                isUpdatedOutcomeTwoFound = 'yes'
            }
        }
        //will mark the test case as failed when the outcomes list doesn't contain a updated outcome
        if(isUpdatedOutcomeOneFound == 'no' || isUpdatedOutcomeTwoFound == 'no'){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Outcome_NotUpdated.png');
            await driver.navigate().refresh();
            assert.fail('Due to the \''+updatedOutcome1+'\' or \''+updatedOutcome2+'\' outcome is not updated, the test case has been failed. Screenshot Name: \''+screenshotPath+'Outcome_NotUpdated.png\'.')
        }
        console.log('The old \''+oldOutcomes+'\' outcomes have updated with \''+updatedOutcome1+'\' and \''+updatedOutcome2+'\' outcomes...')
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AnyOutcome_NotFound_UpdateCase.png');
        await driver.navigate().refresh();
        assert.fail('Due to any outcome is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AnyOutcome_NotFound_UpdateCase.png\'.')
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findOutcomeCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);
});

Then('the {string} and {string} outcomes should be deleted for the {string} activity type', async (outcome1,outcome2,typeName) =>{
    let isDeletedOutcomeOneFound = 'no', isDeletedOutcomeTwoFound = 'no';

    //will check the success message is given or not
    const actualMsg = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]')).getText();
    assert.strictEqual(actualMsg,'Activity outcomes updated successfully');
    await driver.sleep(3000);
    //will navigate on the another page and then come back to the activity types page
    await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will find the Manage Outcomes button of the provided type
    const outcomesBtn = await activityTypesPageElementObj.findManageOutcomesBtn(driver,screenshotPath,typeName);
    //will click on the Manage Outcomes button of the provided type
    await outcomesBtn.click();
    await driver.sleep(2000);

    //will get all existing outcomes
    const allOutcomes = await activityTypesPageElementObj.findOutcomes(driver);
    //will check any outcome is found or not
    if(allOutcomes.length > 0){
        //will travel all outcomes
        for(let i=0; i<allOutcomes.length; i++){
            const outcome = await allOutcomes[i].getAttribute('value');
            //will check the outcomes list contains a deleted outcome or not
            if(outcome.includes(outcome1)){
                isDeletedOutcomeOneFound = 'yes'
            }else if(outcome.includes(outcome2)){
                isDeletedOutcomeTwoFound = 'yes'
            }
        }
        //will mark the test case as failed when the outcomes list contains the deleted outcome
        if(isDeletedOutcomeOneFound == 'yes' || isDeletedOutcomeTwoFound == 'yes'){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Outcome_NotDeleted.png');
            await driver.navigate().refresh();
            assert.fail('Due to the \''+outcome1+'\' or \''+outcome2+'\' outcome is not deleted, the test case has been failed. Screenshot Name: \''+screenshotPath+'Outcome_NotDeleted.png\'.')
        }
        console.log('The \''+outcome1+'\' and \''+outcome2+'\' outcomes of the \''+typeName+'\' type has been deleted...');
    }else{
        console.log('The \''+outcome1+'\' and \''+outcome2+'\' outcomes of the \''+typeName+'\' type has been deleted...');
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findOutcomeCancelBtn(driver,screenshotPath);
    await cancelBtn.click();
    await driver.sleep(1500);
});

Then('those buttons should be displayed as disabled', async () =>{
    /* Note: Right now, the edit and deactivate button of 'Task' type is not showing as disabled */

    //will find the edit and deactivate button of 'Call' type
    const callEditButton = await activityTypesPageElementObj.findDisabledEditBtn(driver,'Call');
    const callDeactivateBtn = await activityTypesPageElementObj.findDisabledDeactivateBtn(driver,'Call');
    
    //will check the edit button is showing as a disabled or not
    if(callEditButton.length > 0){
        console.log('The edit button of Call type is showing as a disabled...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Call_EditBtn_NotDisabled.png');
        assert.fail('Due to the edit button of Call type is not disabled, the test case has been failed. Screenshot Name: \''+screenshotPath+'Call_EditBtn_NotDisabled.png\'.');
    }
    //will check the deactivate button is showing as a disabled or not
    if(callDeactivateBtn.length > 0){
        console.log('The deactivate button of Call type is showing as a disabled...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Call_DeactivateBtn_NotDisabled.png');
        assert.fail('Due to the deactivate button of Call type is not disabled, the test case has been failed. Screenshot Name: \''+screenshotPath+'Call_DeactivateBtn_NotDisabled.png\'.');
    }
});

Then('the {string} outcome of {string} type should be displayed in place of the {string} outcome', async (sourceOutcome,typeName,targetOutcome) =>{
    let actualDisplayOrder;

    try{
        //will check the success message is given or not
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, 'Activity outcomes updated successfully');
        await driver.sleep(4000);
        //will navigate on the another page and then come back to the activity types page
        await actionObj.comeBackToActivityTypesPage(driver,screenshotPath);
        await driver.sleep(2000);
        //will find the Manage Outcomes button of the provided type
        const outcomesBtn = await activityTypesPageElementObj.findManageOutcomesBtn(driver,screenshotPath,typeName);
        //will click on the Manage Outcomes button of the provided type
        await outcomesBtn.click();
        await driver.sleep(2000);

        //will get the current display order of source outcome
        const allOutcomes = await activityTypesPageElementObj.findOutcomes(driver);
        for(let i=0; i<allOutcomes.length; i++){
            const outcome = await allOutcomes[i].getAttribute('value');
            if(outcome.startsWith(sourceOutcome)){
                actualDisplayOrder = i+1;
                break;
            }
        }   
    }catch(err){
        await driver.navigate().refresh();
        assert.fail(err);
    }
    
    //will check the display order of source outcome is get changed or not
    try{
        assert.strictEqual(actualDisplayOrder,expectedDisplayOrder);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DragAndDropOutcome_NotWorking.png'); 
        await driver.navigate().refresh();
        assert.fail('Due to the display order of \''+sourceOutcome+'\' outcome is not get changed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DragAndDropOutcome_NotWorking.png\'.');
    }

    //will close the popup
    const cancelBtn = await activityTypesPageElementObj.findOutcomeCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The display order of \''+sourceType+'\' outcome is get changed from \''+currentSourceOutcomeDisplayOrder+'\' to \''+actualDisplayOrder+'\'.');
});
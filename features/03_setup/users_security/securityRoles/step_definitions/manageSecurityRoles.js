const {Given,When,Then} = require('@cucumber/cucumber');
const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const securityRolesPageElementObj = require('../common/securityRolesPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/users_security/securityRoles/screenshots/';

let expectedDescription, expectedShareDataWithPeers, displayedReportsToDropdownValue;

Given('the {string} is on security roles page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/setup/security/roles')){
        console.log('The security roles page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open security roles page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on security roles page');
        //will open the security roles page
        await actionObj.openSecurityRolesPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open security roles page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on security roles page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on security roles page');
        //will open the security roles page
        await actionObj.openSecurityRolesPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the security roles page
        await actionObj.openSecurityRolesPage(driver,screenshotPath);  
    }
});

Given('the {string} role is exist and get the displayed dropdown value of that role', async (roleName) =>{
    if(roleName.toLowerCase() != 'ceo'){
        //will check the provided custom role exists or not
        const isRoleExist = await securityRolesPageElementObj.findRoleName(driver,screenshotPath,roleName);
        if(isRoleExist.length > 0){
            /*  We are appending '--' before the role name in the dropdown list. So, it is required to get the displayed dropdown value of that role.
            *   We can achieve this by opening add role popup from the provided role and can get the displayed dropdown value from the 'Reports To'.
            */

            try{
                //will find 'Add Role' button from the provided role
                const addRoleBtn = await securityRolesPageElementObj.findAddRoleBtn(driver,screenshotPath,roleName);
                //will click on the 'Add Role' button
                await addRoleBtn.click();
                //will find 'Reports To' dropdown
                const reportsToDropdown = await formElementObj.findDropdown(driver,screenshotPath,'reportsTo');
                //will get the displayed 'Reports To' dropdown value
                displayedReportsToDropdownValue = await reportsToDropdown.getText();
                //will close the add role popup by clicking on the 'Cancel' button
                const cancelBtn = await securityRolesPageElementObj.findCancelBtn(driver,screenshotPath);
                await driver.executeScript("arguments[0].click();",cancelBtn);
                await driver.sleep(2000);   
            }catch(err){
                //will refresh the page to close the role popup if any error found 
                await driver.navigate().refresh();
                assert.fail(err);
            }        
        }else{
            await screenshotObj.takeScreenshot(driver,screenshotPath+roleName.replace(/\s/g,'_')+'_Role_NotFound.png');
            await assert.fail('Due to the provided \''+roleName+'\' role is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+roleName.replace(/\s/g,'_')+'_Role_NotFound.png\'.');
        }
    }else{
        displayedReportsToDropdownValue = 'CEO';
    }    
});

When('the user click on the {string} button from the {string} role', async (addEditDeleteBtn,existingRoleName) =>{
    //will check the provided role exists or not
    const isRoleExist = await securityRolesPageElementObj.findRoleName(driver,screenshotPath,existingRoleName);
    if(isRoleExist.length > 0){
        if(addEditDeleteBtn.toLowerCase() == 'add role'){
            //will find 'Add Role' button from the provided role
            const addRoleBtn = await securityRolesPageElementObj.findAddRoleBtn(driver,screenshotPath,existingRoleName);
            //will click on the 'Add Role' button
            await addRoleBtn.click();
        }else if(addEditDeleteBtn.toLowerCase() == 'edit role'){
            await actionObj.comeBackToSecurityRolesPage(driver,screenshotPath)
            await driver.sleep(1000);
            //will find 'Edit Role' button from the provided role
            const editRoleBtn = await securityRolesPageElementObj.findEditRoleBtn(driver,screenshotPath,existingRoleName);
            //will click on the 'Edit Role' button
            await editRoleBtn[0].click();
        }else if(addEditDeleteBtn.toLowerCase() == 'delete role'){
            //will find 'Delete Role' button from the provided role
            const deleteRoleBtn = await securityRolesPageElementObj.findDeleteRoleBtn(driver,screenshotPath,existingRoleName);
            //will click on the 'Delete Role' button
            await deleteRoleBtn[0].click();
        }else{
            assert.fail('The provided '+addEditDeleteBtn+' button name is not valid. The button name should be one of \'Add Role\', \'Delete Role\' and \'Edit Role\'.');
        }
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+existingRoleName.replace(/\s/g,'_')+'_Role_NotFound.png');
        await assert.fail('Due to the provided \''+existingRoleName+'\' role is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+existingRoleName.replace(/\s/g,'_')+'_Role_NotFound.png\'.');
    }
    await driver.sleep(1000);
});

When('enter Role Name: {string}', async (newRoleName) =>{
    try{
        //will find 'Role Name' textbox 
        const roleNameTextbox = await securityRolesPageElementObj.findRoleNameTextbox(driver,screenshotPath);
        await clearFieldDataObj.clearFieldData(roleNameTextbox);
        //will check the test data (for the required role name field) is givien or not
        if(newRoleName != ''){
            //will enter data in the 'Role Name' textbox
            await roleNameTextbox.sendKeys(newRoleName);
        }else{
            assert.fail('Due to the test data is not provided for the required role name field, the test case has been failed.');
        }
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        assert.fail(err);
    }  
});

When('select Reports To: {string}', async (reportsToRoleName) =>{
    reportsToRoleName = displayedReportsToDropdownValue;

    try{
        //will find 'Reports To' dropdown
        const reportsToDropdown = await formElementObj.findDropdown(driver,screenshotPath,'reportsTo');
        //will click on the 'Reports To' dropdown
        await reportsToDropdown.click();
        //will find 'Reports To' dropdown list
        const dropdownListElement = await formElementObj.findDropdownListElement(driver,screenshotPath,'reportsTo');
        //will travel dropdown value list
        for(let i=0; i<dropdownListElement.length; i++){
            const existingDropdownValue = await dropdownListElement[i].getText();
            //will select the provided reports to role name if it is valid
            if(reportsToRoleName == existingDropdownValue){
                reportsToRoleName = reportsToRoleName.toLowerCase() == 'ceo' ? reportsToRoleName : " "+reportsToRoleName;
                const newDropdownValueElement = await formElementObj.findNewDropdownValueElement(driver,screenshotPath,reportsToRoleName);
                await newDropdownValueElement.click();
                await driver.sleep(1000);
                break;   
            }
        }   
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('select Transfer To: {string}', async (transferToRoleName) =>{
    let isNewDropdownValueValid = 'no', existingDropdownValue = [];
    transferToRoleName = displayedReportsToDropdownValue;
    await driver.sleep(2000);
    
    try{
        //will find 'Transfer To' dropdown
        const transferToDropdown = await formElementObj.findDropdown(driver,screenshotPath,'transferToRole');
        //will click on the 'Transfer To' dropdown
        await transferToDropdown.click();
        //will find 'Transfer To' dropdown list
        const dropdownListElement = await formElementObj.findDropdownListElement(driver,screenshotPath,'transferToRole');
        //will travel dropdown value list
        for(let i=0; i<dropdownListElement.length; i++){ 
            existingDropdownValue[i] = await dropdownListElement[i].getText();
            //will select the provided transfer to role name if it is valid
            if(transferToRoleName == existingDropdownValue[i]){
                isNewDropdownValueValid = 'yes'
                transferToRoleName = transferToRoleName.toLowerCase() == 'ceo' ? transferToRoleName : " "+transferToRoleName;
                const newDropdownValueElement = await formElementObj.findNewDropdownValueElement(driver,screenshotPath,transferToRoleName);
                await newDropdownValueElement.click();
                await driver.sleep(1000);
                break;   
            }
        } 
            
        //will mark the test case as failed if the provided transfer to role name is not valid
        if(isNewDropdownValueValid == 'no'){
            await assert.fail('Due to the provided \''+transferToRoleName+'\' transfer to role name is not valid, the test case has been failed. Expected Transfer To Role Name ---> \''+existingDropdownValue+'\'.');
        }
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        assert.fail(err);
    } 
});

When('enter Role Description: {string}', async (description) =>{
    try{
        //will find 'Role Description' textbox 
        const roleDescriptionTextbox = await securityRolesPageElementObj.findRoleDescriptionTextbox(driver,screenshotPath);
        await clearFieldDataObj.clearFieldData(roleDescriptionTextbox);
        //will enter data in the 'Role Description' textbox 
        await roleDescriptionTextbox.sendKeys(description);
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        assert.fail(err);
    }
    expectedDescription = description;
});

When('{string} Share data with peers option', async (newState) =>{
    try{
        //will check the provided value is valid to execute a test case or not
        if(newState.toLowerCase() == 'select' || newState.toLowerCase() == 'unselect'){
            //will find 'Share data with peers' checkbox 
            const shareWithPeersCheckbox = await securityRolesPageElementObj.findShareWithPeersCheckbox(driver,screenshotPath);
            //will get the current value of 'Share data with peers' checkbox  
            const currentState = await shareWithPeersCheckbox.getAttribute('value') == 'true' ? 'select' : 'unselect';
            //will select/unselect 'Share data with peers' checkbox  
            if(currentState != newState.toLowerCase()){
                await driver.executeScript("arguments[0].click();",shareWithPeersCheckbox);
            }else{
                console.log('The share with peers checkbox is already '+newState.toLowerCase()+'ed...');
            }
        }else{
            assert.fail('The provided '+newState.toLowerCase()+' value is not valid. The value should be either \'Select\' or \'Unselect\'.')
        } 
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        assert.fail(err);
    }
    await driver.sleep(1000);  
    expectedShareDataWithPeers = newState.toLowerCase();
});

When('leave {string} field as blank', async (fieldName) =>{
    try{
        if(fieldName.toLowerCase() == 'role name'){
            //will find 'Role Name' field 
            const roleNameTextbox = await securityRolesPageElementObj.findRoleNameTextbox(driver,screenshotPath);
            //will clear the 'Role Name' field data
            await clearFieldDataObj.clearFieldData(roleNameTextbox);
        }else{
            assert.fail('The provided \''+fieldName+'\' field name is not valid. The field name should be \'Role Name\'.')
        }
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('click on the Transfer & Delete button', async () =>{
    try{
        //will find 'Transfer & Delete' button
        const transferDeleteBtn = await securityRolesPageElementObj.findTransferDeleteBtn(driver,screenshotPath);
        //will click on the 'Transfer & Delete' button
        await transferDeleteBtn.click();
        await driver.wait(until.elementIsEnabled(transferDeleteBtn),15000,'There seems to be some issue while performing the transfer and delete operation.');
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        assert.fail(err);
    }    
});

Then('the new role {string} should get added under the {string} role with all details', async (newRoleName,reportsToRoleName) =>{
    //will compare the actual and expected values of the new added role
    await actionObj.verifyAddedUpdatedRoleDetails(driver,screenshotPath,newRoleName,expectedDescription,reportsToRoleName,expectedShareDataWithPeers,'Created successfully.');
    console.log('\'Add new custom role with all details\' case has been passed successfully...');
});

Then('the new role {string} should get added under the {string} role with the required details', async (newRoleName,reportsToRoleName) =>{
    //will compare the actual and expected values of the new added role
    await actionObj.verifyAddedUpdatedRoleDetails(driver,screenshotPath,newRoleName,'',reportsToRoleName,expectedShareDataWithPeers,'Created successfully.');
    console.log('\'Add new custom role with the required details\' case has been passed successfully...');
});

Then('the {string} role should get updated with all details', async(roleName) =>{
    //will compare the actual and expected values of the updated role
    await actionObj.verifyAddedUpdatedRoleDetails(driver,screenshotPath,roleName,expectedDescription,displayedReportsToDropdownValue,expectedShareDataWithPeers,'Updated successfully.');
    console.log('\'Update custom role with all details\' case has been passed successfully...');
});

Then('the {string} role should get updated with the required details', async(roleName) =>{
    //will compare the actual and expected values of the updated role
    await actionObj.verifyAddedUpdatedRoleDetails(driver,screenshotPath,roleName,expectedDescription,displayedReportsToDropdownValue,expectedShareDataWithPeers,'Updated successfully.');
    console.log('\'Update custom role with the required details\' case has been passed successfully...');
});

Then('the system should give the {string} validation message', async (expectedValidationMsg) =>{
    try{
        //will verify validation message 
        await actionObj.checkValidationMessage(driver,screenshotPath,expectedValidationMsg);
        //will close the role popup by clicking on the 'Cancel' button
        const cancelBtn = await securityRolesPageElementObj.findCancelBtn(driver,screenshotPath);
        await driver.executeScript("arguments[0].click();",cancelBtn);
        await driver.sleep(2000);     
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }

    console.log('\'Check \"'+expectedValidationMsg+'\" validation\' case has been passed successfully...');
});

Then('the system should give {string} validation message for the {string} field while {string}', async (expectedValidationMsg,fieldName,addEditRole) =>{
    const field = 'RoleName'; 

    try{
        //will find 'Role Name' field 
        const roleNameField = await securityRolesPageElementObj.findRoleNameTextbox(driver,screenshotPath);
        //will find 'Role Name' field validation message element
        const validationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,roleNameField);
        //will get the actual validation message text
        const actualValidationMsg = await validationElem.getText();
        await driver.sleep(2000);  

        //will compare the actual and expected field validation message
        try{
            assert.strictEqual(actualValidationMsg,expectedValidationMsg);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+field+'FieldValidationMsg_NotValid.png'); 
            assert.fail('Due to the \''+fieldName+'\' field validation message is not valid, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+field+'FieldValidationMsg_NotValid.png\'.');
        }  
        
        //will close the role popup by clicking on the 'Cancel' button
        const cancelBtn = await securityRolesPageElementObj.findCancelBtn(driver,screenshotPath);
        await driver.executeScript("arguments[0].click();",cancelBtn);
        await driver.sleep(2000);     
    }catch(err){
        //will refresh the page to close the role popup if any error found 
        await driver.navigate().refresh(); 
        assert.fail(err);
    }

    console.log('\'Check \"'+expectedValidationMsg+'\" validation while '+addEditRole.toLowerCase()+'\' case has been passed successfully...');
});

Then('the {string} role should get deleted', async (roleName) =>{
    //will check the success message is given or not
    //will find notification message after updating settings
    await driver.sleep(1000);
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    assert.strictEqual(notyMessageText,'Deleted successfully.');
    await driver.sleep(4000);

    //will navigate on another page and come back to the security roles page after adding a role
    await actionObj.comeBackToSecurityRolesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will check the deleted role is exist or not
    const isDeletedRoleExist = await securityRolesPageElementObj.findRoleName(driver,screenshotPath,roleName);
    if(isDeletedRoleExist.length == 0){
        console.log('\'Delete a custom role\' case has been passed successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+roleName.replace(/\s/g,'_')+'_Role_NotDeleted.png'); 
        assert.fail('Due to the \''+roleName+'\' role is not deleted, the test case has been failed. Screenshot Name: \''+screenshotPath+roleName.replace(/\s/g,'_')+'_Role_NotDeleted.png\'.');
    }
});
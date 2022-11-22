const assert = require('assert');
const {By,until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const securityRolesPageElementObj = require('./securityRolesPageElements');

//will navigate on the dashboard page and then come back to the security roles page
async function comeBackToSecurityRolesPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const securityRolesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Security Roles ');
    await driver.executeScript("arguments[0].scrollIntoView();",securityRolesTab[0]);
    await driver.wait(until.elementIsVisible(securityRolesTab[0]));
    await securityRolesTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/security/roles'),10000);
}exports.comeBackToSecurityRolesPage=comeBackToSecurityRolesPage;

async function openSecurityRolesPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Security Roles' tab 
    const securityRolesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Security Roles ');

    //will check the 'Security Roles' tab is visible or not
    if(securityRolesTab.length > 0){
        //will set focus on the 'Security Roles' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",securityRolesTab[0]);
        await driver.wait(until.elementIsVisible(securityRolesTab[0]));
        //will click on the 'Security Roles' tab 
        await securityRolesTab[0].click();
    }else{
        /* As 'Security Roles' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on security roles page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on security roles page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Security Roles' tab 
        const securityRolesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Security Roles ');
        //will set focus on the 'Security Roles' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",securityRolesTab[0]);
        await driver.wait(until.elementIsVisible(securityRolesTab[0]));
        //will click on the 'Security Roles' tab 
        await securityRolesTab[0].click();
        await driver.sleep(2000);
    }
    await driver.sleep(2000);

    //will verify whether the security roles page found or not
    try{
        await driver.wait(until.urlContains('app/setup/security/roles'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SecurityRolesPage_NotFound.png');
        await assert.fail('Due to the security roles page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SecurityRolesPage_NotFound.png\'.');
    }

    console.log('The security roles page has been opened successfully...');
}exports.openSecurityRolesPage=openSecurityRolesPage;

async function getRoleNameFieldData(driver,screenshotPath){
    //will find 'Role Name' textbox 
    const roleNameTextbox = await securityRolesPageElementObj.findRoleNameTextbox(driver,screenshotPath);
    //will get the 'Role Name' textbox data
    const roleNameFieldData = await roleNameTextbox.getAttribute('value');
    return roleNameFieldData;
}exports.getRoleNameFieldData=getRoleNameFieldData;

async function getRoleDescriptionFieldData(driver,screenshotPath){
    //will find 'Role Description' textbox 
    const roleDescriptionTextbox = await securityRolesPageElementObj.findRoleDescriptionTextbox(driver,screenshotPath);
    //will get the 'Role Description' textbox data
    const roleDescriptionFieldData = await roleDescriptionTextbox.getAttribute('value');
    return roleDescriptionFieldData;
}exports.getRoleDescriptionFieldData=getRoleDescriptionFieldData;

async function getShareWithPeersCheckboxValue(driver,screenshotPath){
    //will find 'Share data with peers' checkbox 
    const shareWithPeersCheckbox = await securityRolesPageElementObj.findShareWithPeersCheckbox(driver,screenshotPath);
    //will get the 'Share data with peers' checkbox value
    const shareWithPeersCheckboxValue = await shareWithPeersCheckbox.getAttribute('value') == 'true' ? 'select' : 'unselect';
    return shareWithPeersCheckboxValue;
}exports.getShareWithPeersCheckboxValue=getShareWithPeersCheckboxValue;

async function getReportsToDropdownValue(drive,screenshotPath){
    //will find 'Reports To' dropdown
    const reportsToDropdown = await formElementObj.findDropdown(drive,screenshotPath,'reportsTo');
    // will get the 'Reports To' dropdown value
    const reportsToDropdownValue = await reportsToDropdown.getText();
    return reportsToDropdownValue;
}exports.getReportsToDropdownValue=getReportsToDropdownValue;

async function verifyAddedUpdatedRoleDetails(driver,screenshotPath,expectedRoleName,expectedDescription,expectedReportsToRoleName,expectedShareDataWithPeers,addEditSuccessMessage){
    let fieldName;

    //will verify success message after adding/updating a role
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    assert.strictEqual(notyMessageText,addEditSuccessMessage);
    await driver.sleep(3000);

    //will navigate on another page and come back to the security roles page after adding a role
    await comeBackToSecurityRolesPage(driver,screenshotPath);
    await driver.sleep(2000);

    //will check the provided role found or not 
    const isRoleFound = await securityRolesPageElementObj.findRoleName(driver,screenshotPath,expectedRoleName);
    if(isRoleFound.length > 0){
        try{
            //will find 'Edit Role' button from that provided role
            const editRoleBtn = await securityRolesPageElementObj.findEditRoleBtn(driver,screenshotPath,expectedRoleName);
            //will click on the 'Edit Role' button
            await editRoleBtn[0].click();
            await driver.sleep(2000);

            //will get the actual details of that provided role
            const actualRoleName = await getRoleNameFieldData(driver,screenshotPath);
            const actualDescription = await getRoleDescriptionFieldData(driver,screenshotPath);
            const actualShareDataWithPeers = await getShareWithPeersCheckboxValue(driver,screenshotPath);
            const actualReportsTo = await getReportsToDropdownValue(driver,screenshotPath);
            
            //will compare the actual and expected value of that provided role 
            try{
                fieldName = 'RoleName';
                assert.strictEqual(actualRoleName,expectedRoleName);
                fieldName = 'Description';
                assert.strictEqual(actualDescription,expectedDescription);
                fieldName = 'ShareWithPeers';
                assert.strictEqual(actualShareDataWithPeers,expectedShareDataWithPeers);
                fieldName = 'ReportsTo';
                assert(actualReportsTo.includes(expectedReportsToRoleName));
            }catch(err){
                await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'FieldData_NotAsPerExpectation.png'); 
                assert.fail('Due to the \''+fieldName+'\' field data is not as per the expectation, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'FieldData_NotAsPerExpectation.png\'.');
            }    
            
            //will close the edit role popup by clicking on the 'Cancel' button
            const cancelBtn = await securityRolesPageElementObj.findCancelBtn(driver,screenshotPath);
            await cancelBtn.click();
            await driver.sleep(2000);     
        }catch(err){
            //will refresh the page to close the role popup if any error found 
            await driver.navigate().refresh();
            assert.fail(err);
        }
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+expectedRoleName.replace(/\s/g,'_')+'_Role_NotFound.png'); 
        assert.fail('Due to the \''+expectedRoleName+'\' role is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+expectedRoleName.replace(/\s/g,'_')+'_Role_NotFound.png\'.');
    }
}exports.verifyAddedUpdatedRoleDetails=verifyAddedUpdatedRoleDetails;

async function checkValidationMessage(driver,screenshotPath,expectedValidationMsg){
    await driver.sleep(1000);
    //will find notification message after performing operations 
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,expectedValidationMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the validation message is not given after performing operations, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMessage_NotGiven.png\'.');
    }
}exports.checkValidationMessage=checkValidationMessage;
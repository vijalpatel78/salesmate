const {Given,When,Then} = require('@cucumber/cucumber');
const {By,until} = require('selenium-webdriver');
const {strictEqual} = require('assert');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openProfilePermissionsPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const appPageElementsObj = require('../../../apps_voice/apps/common/appsPageElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const commonActionsObj = require('../../../apps_voice/apps/common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/users_security/profilePermissions/screenshots/';
const profilePermissionsObj = require('../common/profilePermissionsPageElements');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let profileNameFieldData = 'no', cloneProfileData = 'no' , profileDescriptionFieldData = 'no';
let newContactModuleState = 'no', newActivityModuleState = 'no', newDealModuleState = 'no', newProductModuleState = 'no';
let newImportContactState = 'no', newImportDealState = 'no';
let newExportContactState = 'no', newExportActivityState = 'no', newExportDealState = 'no';
let newMassUpdateContactState = 'no', newMassDeleteContactState = 'no', newMassTransferContactState = 'no';
let newMassUpdateActivityState = 'no', newMassDeleteActivityState = 'no', newMassTransferActivityState = 'no';
let newMassUpdateDealState = 'no', newMassDeleteDealState = 'no', newMassTransferDealState = 'no';
let newManageUsersState = 'no', newManageRolesState = 'no', newManageProfilesState = 'no', newManageLayoutState = 'no';
let newManageModulesState = 'no', newManageOrganizationState = 'no', newManageFieldsState = 'no', newManageWorkFlowsState = 'no';
let newManageEmailTemplatesState = 'no', newManageReportsState = 'no', newManageConfigurationState = 'no', newManageTagsState = 'no';
let newManageMessageTemplatesState = 'no', newDeleteMediaManagerFilesState = 'no', newManageCustomViewState = 'no';
let newMergeContactsState = 'no';
let newUploadFileState = 'no', newViewFileState = 'no', newDeleteFileState = 'no'
let newCreateDashboardState = 'no', newManageDashboardState = 'no', newCreateReportsState = 'no';
let newScheduleState = 'no', newExportReportsState = 'no';

const valueConverter = input => {
    if(input === undefined || input === 'undefined' || input === false || input === 'false') {
        return false;
    }
    if(input === true || input === 'true') {
        return true;
    }
    return null;
}

Given('the {string} is on profile permissions page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/security/profiles')){
        console.log('The profile permissions page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open profile permissions page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on profile permissions page');
        //will open the profile permissions page
        await openProfilePermissionsPageObj.openProfilePermissionsPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open profile permissions page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on profile permissions page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on profile permissions page');
        //will open the profile permissions page
        await openProfilePermissionsPageObj.openProfilePermissionsPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the profile permissions page
        await openProfilePermissionsPageObj.openProfilePermissionsPage(driver, screenshotPath);
    }
});

When('the user creates new profile with the following data:',async function(dataTable) {
    try {
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Standard');
        await editButton.click();
        await driver.sleep(3000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editPage.png');
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        //click on 'Add New Profile" button
        await driver.sleep(2000);
        const addProfileButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add New Profile ');
        await addProfileButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'profile name') {
                profileNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile name field is given or not
                if (profileNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile name field, the test case execution has been aborted');
                }

                //will find 'Profile Name' field and pass the new data
                const profileNameField = await formElementsObj.findElementById(driver,screenshotPath,'profileNameField','profileNameField');
                await clearFieldDataObj.clearFieldData(profileNameField);
                await profileNameField.sendKeys(profileNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'clone profile') {
                cloneProfileData = dataTable.rawTable[i][1];

                //will check that the data for the required clone profile dropdown field is given or not
                if (cloneProfileData == '') {
                    await assert.fail('Due to the blank value is provided for the required clone profile dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Clone Profile' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'profileSelectField', cloneProfileData, 'no');
            } else if (fieldName == 'profile description') {
                profileDescriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile description field is given or not
                if (profileDescriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile description field, the test case execution has been aborted');
                }

                //will find 'Profile Description' field and pass the new data
                const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
                await clearFieldDataObj.clearFieldData(profileDescriptionField);
                await profileDescriptionField.sendKeys(profileDescriptionFieldData);
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile,Profile Description');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (profileNameFieldData == 'no' || cloneProfileData == 'no' || profileDescriptionFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Profile Name,Clone Profile,Profile Description');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on add button',async function() {
    try {
        //click on add button to create a new profile
        const addButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','addButtonField');
        await addButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As add button is not found,test case has been failed");
    }
});

Then('new custom profile should get added',async function() {
    try {
        await driver.sleep(5000);

        //get actual values of edit page before navigation after adding new profile
        console.log("Profile Name and Description of custom profile 01 before navigation in edit page:");
        const actualProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        const actualProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Profile Name:" + actualProfileName);
        console.log("Profile Description:" + actualProfileDescription);

        //get profile permission values of new profile
        const newProfileContactValue = await driver.findElement(By.id('switch_Contact_access')).getAttribute('value');
        const newProfileImportContactValue = await driver.findElement(By.id('005')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        const newProfileExportContactValue = await driver.findElement(By.id('101')).getAttribute('value');
        const newProfileMassUpdateContactValue = await driver.findElement(By.id('301')).getAttribute('value');
        const newProfileManageUsersValue = await driver.findElement(By.id('401')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        const newProfileManageCustomViewsValue = await driver.findElement(By.id('501')).getAttribute('value');
        const newProfileMergeContactValue = await driver.findElement(By.id('601')).getAttribute('value');
        const newProfileUploadFileValue = await driver.findElement(By.id('801')).getAttribute('value');

        await driver.sleep(1000);
        //click on save button on edit page
        const addButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','addButtonField');
        await addButton.click();
        await driver.sleep(3000);
        //navigate to dashboard page and come back to profile permissions page
        await pageNavigationObj.comeBackToProfilePermissionsPage(driver, screenshotPath);
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfileCustom01.png');

        //get values of profile name and description in table of profile permissions page
        console.log("Profile Name and Description of custom profile 01 in profile permissions table:");
        const newProfileNameText = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(1)')).getText();
        console.log("Profile Name:" + newProfileNameText);
        const newProfileDescriptionText = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(2)')).getText();
        console.log("Profile Description:" + newProfileDescriptionText);

        //move to edit page of newly created profile
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);

        //get values of profile name and description in edit page
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfileCustom01EditPage.png');
        console.log("Profile Name and Description of custom profile 01 after navigation in edit page:");
        const expectedProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        console.log("Profile Name:" + expectedProfileName);
        const expectedProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Profile Description:" + expectedProfileDescription);
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);

        //get profile permission values of standard profile
        const editButtonElement = await profilePermissionsObj.findEditButton(driver, 'Standard');
        await editButtonElement.click();
        await driver.sleep(2000);
        const standardProfileContactValue = await driver.findElement(By.id('switch_Contact_access')).getAttribute('value');
        const standardProfileImportContactValue = await driver.findElement(By.id('005')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        const standardProfileExportContactValue = await driver.findElement(By.id('101')).getAttribute('value');
        const standardProfileMassUpdateContactValue = await driver.findElement(By.id('301')).getAttribute('value');
        const standardProfileManageUsersValue = await driver.findElement(By.id('401')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        const standardProfileManageCustomViewsValue = await driver.findElement(By.id('501')).getAttribute('value');
        const standardProfileMergeContactValue = await driver.findElement(By.id('601')).getAttribute('value');
        const standardProfileUploadFileValue = await driver.findElement(By.id('801')).getAttribute('value');

        await driver.sleep(2000);
        //compare actual and expected values before and after navigation
        try {
            //comparing profile name and description values
            strictEqual(actualProfileName, expectedProfileName);
            strictEqual(actualProfileDescription, expectedProfileDescription);

            //comparing profile permissions of both new profile and standard profile
            strictEqual(newProfileContactValue, standardProfileContactValue);
            strictEqual(newProfileImportContactValue, standardProfileImportContactValue);
            strictEqual(newProfileExportContactValue, standardProfileExportContactValue);
            strictEqual(newProfileMassUpdateContactValue, standardProfileMassUpdateContactValue);
            strictEqual(newProfileManageUsersValue, standardProfileManageUsersValue);
            strictEqual(newProfileManageCustomViewsValue, standardProfileManageCustomViewsValue);
            strictEqual(newProfileMergeContactValue, standardProfileMergeContactValue);
            strictEqual(newProfileUploadFileValue, standardProfileUploadFileValue);
            console.log("Compared values of profile name,description and profile permissions of custom profile are verified successfully");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfile_NotAdded.png');
            await assert.fail("As new profile is not added,test case has been failed");
        }
        const cancelButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButtonElement.click();
        await driver.sleep(2000);
        console.log("New profile of custom profile 01 has been added successfully,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user creates new profile with profile description as blank:',async function(dataTable) {
    try {
        const addProfileButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add New Profile ');
        await addProfileButton.click();
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'profile name') {
                profileNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile name field is given or not
                if (profileNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile name field, the test case execution has been aborted');
                }

                //will find 'Profile Name' field and pass the new data
                const profileNameField = await formElementsObj.findElementById(driver,screenshotPath,'profileNameField','profileNameField');
                await clearFieldDataObj.clearFieldData(profileNameField);
                await profileNameField.sendKeys(profileNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'clone profile') {
                cloneProfileData = dataTable.rawTable[i][1];

                //will check that the data for the required clone profile dropdown field is given or not
                if (cloneProfileData == '') {
                    await assert.fail('Due to the blank value is provided for the required clone profile dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Clone Profile' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'profileSelectField', cloneProfileData, 'no');
            } else if (fieldName == 'profile description') {
                profileDescriptionFieldData = dataTable.rawTable[i][1];

                //will find 'Profile Description' field and pass the new data
                const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
                await clearFieldDataObj.clearFieldData(profileDescriptionField);
                await profileDescriptionField.sendKeys(profileDescriptionFieldData);
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (profileNameFieldData == 'no' || cloneProfileData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Profile Name,Clone Profile');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('new custom profile with blank profile description should get added',async function() {
    try {
        await driver.sleep(2000);

        //get actual values of edit page before navigation after adding new profile
        console.log("Profile Name and Description of custom profile 02 before navigation in edit page:");
        const actualProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        const actualProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Profile Name:" + actualProfileName);
        console.log("Profile Description:" + actualProfileDescription);

        //click on save button
        const addButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','addButtonField');
        await addButton.click();
        await driver.sleep(2000);

        //navigate to dashboard page and come back to profile permissions page
        await pageNavigationObj.comeBackToProfilePermissionsPage(driver, screenshotPath);
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfileCustom02.png');

        //move to edit page of newly created profile
        const editButtonElement = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 02');
        await editButtonElement.click();
        await driver.sleep(3000);

        //get values of profile name and description in edit page
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfileCustom02EditPage.png');
        console.log("Profile Name and Description of custom profile 02 in edit page:");
        const expectedProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        console.log("Profile Name:" + expectedProfileName);
        const expectedProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Profile Description:" + expectedProfileDescription);
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);

        //compare actual and expected values before and after navigation
        try {
            //comparing profile name and description values
            console.log(actualProfileName, expectedProfileName);
            strictEqual(actualProfileName, expectedProfileName);
            console.log(actualProfileDescription, expectedProfileDescription);
            strictEqual(actualProfileDescription, expectedProfileDescription);
            
            console.log("Compared values of profile name,description and profile permissions of custom profile 02 are verified successfully");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfile_NotAdded.png');
            await assert.fail("As new profile is not added,test case has been failed" + err);
        }
        
        console.log("New profile of custom profile 02 has been added successfully");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user creates new profile leaving {string} field as blank and check {string}',async function(profileName,validationMessage) {
    try {
        await driver.sleep(2000);
        const addProfileButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add New Profile ');
        await addProfileButton.click();
        await driver.sleep(1000);
        await profilePermissionsObj.profileNameBlankValidation(driver,profileName,validationMessage);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'profileNameValidation.png');
        await driver.sleep(2000);
        const cancelPopup = await moduleElementsObj.findCloseIcon(driver);
        await cancelPopup.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'profileName_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As unable to locate profile name field,test case has been failed"+err);
    }
    console.log("Profile Name blank validation message verification successfully completed");
});

When('the user creates new profile with the invalid data:',async function(dataTable) {
    try {
        const addProfileButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add New Profile ');
        await addProfileButton.click();
        await driver.sleep(1500);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++){

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if(fieldName == 'profile name'){
            profileNameFieldData = dataTable.rawTable[i][1];

            //will find 'Profile Name' field and pass the new data
            const profileNameField = await formElementsObj.findElementById(driver,screenshotPath,'profileNameField','profileNameField');
            await clearFieldDataObj.clearFieldData(profileNameField);
            await profileNameField.sendKeys(profileNameFieldData);
            await driver.sleep(500);
        }
        else if(fieldName == 'clone profile'){
            cloneProfileData = dataTable.rawTable[i][1];

            //will check that the data for the required clone profile dropdown field is given or not
            if(cloneProfileData == ''){
                await assert.fail('Due to the blank value is provided for the required clone profile dropdown field, the test case execution has been aborted');
            }

            //will select the provided new dropdown value from the 'Clone Profile' dropdown list
            await driver.sleep(1000);
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'profileSelectField',cloneProfileData,'no');
        }
        else if(fieldName == 'profile description'){
            profileDescriptionFieldData = dataTable.rawTable[i][1];

            //will find 'Profile Description' field and pass the new data
            const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
            await clearFieldDataObj.clearFieldData(profileDescriptionField);
            await profileDescriptionField.sendKeys(profileDescriptionFieldData);
        }
        else{
            await assert.fail('Due to the provided \''+dataTable.rawTable[i][0]+'\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile,Profile Description');
        }
    }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'newProfileValidation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As unable to locate profile name field,test case has been failed");
    }
});

Then('should get validation message {string}',async function(expectedValidation) {
    try {
        const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualValidation,expectedValidation);
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'nameValidation_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As validation messages of profile name field is not found,test case has been failed");
    }
    console.log("Profile name field validation successfully completed");
});

When('the user enters exceed length of data:',async function(dataTable) {
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'profile name') {
                profileNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile name field is given or not
                if (profileNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile name field, the test case execution has been aborted');
                }

                //will find 'Profile Name' field and pass the new data
                const profileNameField = await formElementsObj.findElementById(driver,screenshotPath,'profileNameField','profileNameField');
                await clearFieldDataObj.clearFieldData(profileNameField);
                await profileNameField.sendKeys(profileNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'clone profile') {
                cloneProfileData = dataTable.rawTable[i][1];

                //will check that the data for the required clone profile dropdown field is given or not
                if (cloneProfileData == '') {
                    await assert.fail('Due to the blank value is provided for the required clone profile dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Clone Profile' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'profileSelectField', cloneProfileData, 'no');
            } else if (fieldName == 'profile description') {
                profileDescriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile description field is given or not
                if (profileDescriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile description field, the test case execution has been aborted');
                }

                //will find 'Profile Description' field and pass the new data
                const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
                await clearFieldDataObj.clearFieldData(profileDescriptionField);
                await profileDescriptionField.sendKeys(profileDescriptionFieldData);
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile,Profile Description');
            }
        }
        //will check whether the test data for all test fields is given or not
        if (profileNameFieldData == 'no' || cloneProfileData == 'no' || profileDescriptionFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Profile Name,Clone Profile,Profile Description');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('should get length {string} and {string} messages',async function(nameValidation,descriptionValidation) {
    try {
        const nameValidationMsg = await driver.findElement(By.css('sm-input-txt .error-message')).getText();
        strictEqual(nameValidationMsg,nameValidation);
        const descriptionValidationMsg = await driver.findElement(By.css('sm-textarea-txt .error-message')).getText();
        strictEqual(descriptionValidationMsg, descriptionValidation);
        await driver.sleep(1000);
        const cancelPopup = await moduleElementsObj.findCloseIcon(driver);
        await cancelPopup.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validationMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As validation messages of profile name and description fields are not found,test case has been failed");
    }
    console.log("New profile with invalid data is verified successfully along with validations");
});

Then('should get length {string} and {string} messages on edit page', async function(nameValidation,descriptionValidation) {
    try {
        const nameValidationMsg = await driver.findElement(By.css('sm-input-txt .error-message')).getText();
        strictEqual(nameValidationMsg,nameValidation);
        const descriptionValidationMsg = await driver.findElement(By.css('sm-textarea-txt .error-message')).getText();
        strictEqual(descriptionValidationMsg, descriptionValidation);
        await driver.sleep(1000);
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validationMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As validation messages of profile name and description fields are not found,test case has been failed");
    }
    console.log("New profile with invalid data is verified successfully along with validations");
});

When('the user is creating new profile with {string} and check {string}',async function(duplicateProfileName,validationMessage) {
    try {
        await driver.sleep(2000);
        const addProfileButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add New Profile ');
        await addProfileButton.click();
        await driver.sleep(1000);
        await profilePermissionsObj.duplicateProfileVerification(driver,duplicateProfileName,validationMessage);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'profileNameValidation.png');
        await driver.sleep(1000);
        const cancelPopup = await moduleElementsObj.findCloseIcon(driver);
        await cancelPopup.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'duplicateProfileName_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Duplicate Profile Name validation message verification successfully completed");
});

When('the user verifies all profile names in profile list page and in clone profile dropdown',async function() {
    try {
        await driver.sleep(3000);
        const profileNameElements = await driver.findElements(By.xpath("//table//td[1]"));
        const profileNameLength = await profileNameElements.length;
        console.log(profileNameLength);
        console.log("Profile Names List in profile permissions page:");
        for (let i = 0; i < profileNameLength; i++) {
            const profileNamesList = await profileNameElements[i].getText();
            console.log(profileNamesList);
        }
        const addProfileButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add New Profile ');
        await addProfileButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.css("span[role='combobox'] > span[role='presentation']")).click();
        await driver.sleep(2000);
        const cloneProfileElements = await driver.findElements(By.xpath('//ul[@class="select2-results__options"]//li'));
        const cloneProfileLength = await cloneProfileElements.length;
        console.log(cloneProfileLength);
        console.log("Profile Names List in clone profile dropdown from add profile:");
        for (let i = 0; i < cloneProfileLength; i++) {
            const cloneProfileList = await cloneProfileElements[i].getText();
            console.log(cloneProfileList);
        }
        try {
            if (profileNameLength === cloneProfileLength) {
                console.log("As profile name list and clone profile list lengths are equal,test case has been passed");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'profileList_NotFound.png');
                await assert.fail("As profile name list and clone profile list are not matched,test case has been failed");
            }
        } catch (err) {
            await assert.fail(err);
        }
        const cancelPopup = await moduleElementsObj.findCloseIcon(driver);
        await cancelPopup.click();
        await driver.sleep(2000);
        console.log("As profile names in listing page and in add profile clone profile dropdown contains same profile names,test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user leaves {string} field as blank and check {string}',async function(profileName,validationMessage) {
    try {
        await driver.sleep(2000);
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);
        await profilePermissionsObj.profileNameBlankValidation(driver,profileName,validationMessage);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'profileNameValidation.png');
        await driver.sleep(1000);
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'profileName_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As unable to locate profile name field,test case has been failed"+err);
    }
    console.log("Profile Name blank validation message in edit page has been verified successfully");
});

When('the user update profile with the invalid data:',async function(dataTable) {
    try {
        await driver.sleep(2000);
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++){

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if(fieldName == 'profile name'){
                profileNameFieldData = dataTable.rawTable[i][1];

                //will find 'Profile Name' field and pass the new data
                const profileNameField = await formElementsObj.findElementById(driver,screenshotPath,'profileNameField','profileNameField');
                await clearFieldDataObj.clearFieldData(profileNameField);
                await profileNameField.sendKeys(profileNameFieldData);
                await driver.sleep(500);
            }
            else if(fieldName == 'profile description'){
                profileDescriptionFieldData = dataTable.rawTable[i][1];

                //will find 'Profile Description' field and pass the new data
                const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
                await clearFieldDataObj.clearFieldData(profileDescriptionField);
                await profileDescriptionField.sendKeys(profileDescriptionFieldData);
            }
            else{
                await assert.fail('Due to the provided \''+dataTable.rawTable[i][0]+'\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile,Profile Description');
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'newProfileValidation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As unable to locate profile name field,test case has been failed");
    }
});

When('the user enters exceed length of data in edit page:',async function(dataTable) {
    try {
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'profile name') {
                profileNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile name field is given or not
                if (profileNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile name field, the test case execution has been aborted');
                }

                //will find 'Profile Name' field and pass the new data
                const profileNameField = await formElementsObj.findElementById(driver,screenshotPath,'profileNameField','profileNameField');
                await clearFieldDataObj.clearFieldData(profileNameField);
                await profileNameField.sendKeys(profileNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'profile description') {
                profileDescriptionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile description field is given or not
                if (profileDescriptionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile description field, the test case execution has been aborted');
                }

                //will find 'Profile Description' field and pass the new data
                const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
                await clearFieldDataObj.clearFieldData(profileDescriptionField);
                await profileDescriptionField.sendKeys(profileDescriptionFieldData);
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile,Profile Description');
            }
        }
        //will check whether the test data for all test fields is given or not
        if (profileNameFieldData == 'no' || profileDescriptionFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Profile Name,Clone Profile,Profile Description');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is updating new profile with {string} and check {string}',async function(duplicateProfileName,validationMessage) {
    try {
        await driver.sleep(1000);
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);
        await profilePermissionsObj.duplicateProfileVerification(driver,duplicateProfileName,validationMessage);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'profileNameValidation.png');
        await driver.sleep(1000);
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'duplicateProfileName_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Duplicate Profile Name validation message verification in edit page verified successfully");
});

When('the user is disabling all module-level permissions and check validation message:',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Apps' tab
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
        //will set focus on the 'Apps' tab
        await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab
        await appsTab[0].click();
        await driver.manage().setTimeouts({implicit: 2000});
        const configurationLink = await appPageElementsObj.findAppConfigurationLink(driver, 'Products');
        const configurationLinkLength = await configurationLink.length;
        if (configurationLinkLength === 0) {
            await commonActionsObj.installApp(driver, 'Products');
            await driver.sleep(3000);
        } else {
            await commonActionsObj.clickConfigureBtn(driver, 'Products');
            await driver.sleep(2000);
        }
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Profile Permissions' tab
        const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        //will set focus on the 'Profile Permissions' tab
        await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
        await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
        //will click on the 'Profile Permissions' tab
        await profilePermissionsTab[0].click();
        await driver.sleep(2000);
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'contact') {
                newContactModuleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newContactModuleState == 'enable' || newContactModuleState == 'disable') {
                    //will find 'Contact' checkbox
                    const contactModuleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'switch_Contact_access','contactModuleCheckbox');
                    await driver.executeScript("arguments[0].focus();", contactModuleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Contact Checkbox'
                    const currentState = await contactModuleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Contact Checkbox'
                    if (currentState != newContactModuleState) {
                        await driver.executeScript("arguments[0].click();", contactModuleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the call activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'activity') {
                newActivityModuleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newActivityModuleState == 'enable' || newActivityModuleState == 'disable') {
                    //will find 'Activity' checkbox
                    const activityModuleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'switch_Task_access','activityModuleCheckbox');
                    await driver.executeScript("arguments[0].focus();", activityModuleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Activity Checkbox'
                    const currentState = await activityModuleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Activity Checkbox'
                    if (currentState != newActivityModuleState) {
                        await driver.executeScript("arguments[0].click();", activityModuleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'deal') {
                newDealModuleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDealModuleState == 'enable' || newDealModuleState == 'disable') {
                    //will find 'Deal' checkbox
                    const dealModuleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'switch_Deal_access','dealModuleCheckbox');
                    await driver.executeScript("arguments[0].focus();", dealModuleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Deal Checkbox'
                    const currentState = await dealModuleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Deal Checkbox'
                    if (currentState != newDealModuleState) {
                        await driver.executeScript("arguments[0].click();", dealModuleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'product') {
                newProductModuleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newProductModuleState == 'enable' || newProductModuleState == 'disable') {
                    //will find 'Activity' checkbox
                    const productModuleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'switch_Product_view','productModuleCheckbox')
                    await driver.executeScript("arguments[0].focus();", productModuleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Activity Checkbox'
                    const currentState = await productModuleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Activity Checkbox'
                    if (currentState != newProductModuleState) {
                        await driver.executeScript("arguments[0].click();", productModuleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        // will check whether the test data for all test fields is given or not
        if (newContactModuleState == 'no' || newActivityModuleState == 'no' || newDealModuleState == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Contact,Activity,Deal');
        }
        const addButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','addButtonField');
        await addButton.click();
        await driver.sleep(1000);
        const validationMessageElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(validationMessageElement));
        const validationMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(validationMessage, 'Please select at least one module that will be accessible by this profile');
        await driver.sleep(5000);
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);
    }  catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user enable or disable profile permissions:',async function(dataTable) {
    try {
        await driver.sleep(2000);
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'contact') {
                newContactModuleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newContactModuleState == 'enable' || newContactModuleState == 'disable') {
                    //will find 'Contact' checkbox
                    const contactModuleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'switch_Contact_access','contactModuleCheckbox');
                    await driver.executeScript("arguments[0].focus();", contactModuleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Contact' Checkbox
                    const currentState = await contactModuleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Contact' Checkbox'
                    if (currentState != newContactModuleState) {
                        await driver.executeScript("arguments[0].click();", contactModuleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the call activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'activity') {
                newActivityModuleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newActivityModuleState == 'enable' || newActivityModuleState == 'disable') {
                    //will find 'Activity' checkbox
                    const activityModuleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'switch_Task_access','activityModuleCheckbox');
                    await driver.executeScript("arguments[0].focus();", activityModuleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Activity' Checkbox
                    const currentState = await activityModuleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Activity' Checkbox
                    if (currentState != newActivityModuleState) {
                        await driver.executeScript("arguments[0].click();", activityModuleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'deal') {
                newDealModuleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDealModuleState == 'enable' || newDealModuleState == 'disable') {
                    //will find 'Deal' checkbox
                    const dealModuleCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'switch_Deal_access','dealModuleCheckbox');
                    await driver.executeScript("arguments[0].focus();", dealModuleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Deal' Checkbox
                    const currentState = await dealModuleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Deal' Checkbox
                    if (currentState != newDealModuleState) {
                        await driver.executeScript("arguments[0].click();", dealModuleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the demo activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'import contact') {
                newImportContactState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newImportContactState == 'enable' || newImportContactState == 'disable') {
                    //will find 'Import Contact' checkbox

                    const importContactCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'005','importContactCheckbox');
                    await driver.executeScript("arguments[0].focus();", importContactCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Import Contact' checkbox
                    const currentState = await importContactCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Import Contact' checkbox
                    if (currentState != newImportContactState) {
                        await driver.executeScript("arguments[0].click();", importContactCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'export contact') {
                newExportContactState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newExportContactState == 'enable' || newExportContactState == 'disable') {
                    //will find 'Export Contact' checkbox

                    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 500 }, 0);");
                    const exportContactCheckbox = await formElementsObj.findElementById(driver,screenshotPath, '101','exportContactCheckbox');
                    await driver.executeScript("arguments[0].focus();", exportContactCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Export Contact' checkbox
                    const currentState = await exportContactCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Export Contact' checkbox
                    if (currentState != newExportContactState) {
                        await driver.executeScript("arguments[0].click();", exportContactCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'export activity') {
                newExportActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newExportActivityState == 'enable' || newExportActivityState == 'disable') {
                    //will find 'Export Activity' checkbox

                    const exportActivityCheckbox = await formElementsObj.findElementById(driver,screenshotPath, '104','exportActivityCheckbox');
                    await driver.executeScript("arguments[0].focus();", exportActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Export Activity' checkbox
                    const currentState = await exportActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Export Activity' checkbox
                    if (currentState != newExportActivityState) {
                        await driver.executeScript("arguments[0].click();", exportActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'export deal') {
                newExportDealState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newExportDealState == 'enable' || newExportDealState == 'disable') {
                    //will find 'Export Deal' checkbox

                    const exportDealCheckbox = await formElementsObj.findElementById(driver,screenshotPath, '103','exportDealCheckbox');
                    await driver.executeScript("arguments[0].focus();", exportDealCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Export Deal' checkbox
                    const currentState = await exportDealCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Export Deal' checkbox
                    if (currentState != newExportDealState) {
                        await driver.executeScript("arguments[0].click();", exportDealCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass update contact') {
                newMassUpdateContactState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassUpdateContactState == 'enable' || newMassUpdateContactState == 'disable') {
                    //will find 'Mass Update Contact' checkbox

                    const massUpdateContactCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'301','massUpdateContactCheckbox');
                    await driver.executeScript("arguments[0].focus();", massUpdateContactCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Update Contact' checkbox
                    const currentState = await massUpdateContactCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Update Contact' checkbox
                    if (currentState != newMassUpdateContactState) {
                        await driver.executeScript("arguments[0].click();", massUpdateContactCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass delete contact') {
                newMassDeleteContactState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassDeleteContactState == 'enable' || newMassDeleteContactState == 'disable') {
                    //will find 'Mass Delete Contact' checkbox

                    const massDeleteCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'302','massDeleteContactCheckbox');
                    await driver.executeScript("arguments[0].focus();", massDeleteCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Delete Contact' checkbox
                    const currentState = await massDeleteCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Delete Contact' checkbox
                    if (currentState != newMassDeleteContactState) {
                        await driver.executeScript("arguments[0].click();", massDeleteCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass transfer contact') {
                newMassTransferContactState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassTransferContactState == 'enable' || newMassTransferContactState == 'disable') {
                    //will find 'Mass Transfer Contact' checkbox

                    const massTransferContactCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'303','massTransferContactCheckbox');
                    await driver.executeScript("arguments[0].focus();", massTransferContactCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Transfer Contact' checkbox
                    const currentState = await massTransferContactCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Transfer Contact' checkbox
                    if (currentState != newMassTransferContactState) {
                        await driver.executeScript("arguments[0].click();", massTransferContactCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass update activity') {
                newMassUpdateActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassUpdateActivityState == 'enable' || newMassUpdateActivityState == 'disable') {
                    //will find 'Mass Update Activity' checkbox

                    const massUpdateActivityCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'304','massUpdateActivityCheckbox');
                    await driver.executeScript("arguments[0].focus();", massUpdateActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Update Activity' checkbox
                    const currentState = await massUpdateActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Update Activity' checkbox
                    if (currentState != newMassUpdateActivityState) {
                        await driver.executeScript("arguments[0].click();", massUpdateActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass delete activity') {
                newMassDeleteActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassDeleteActivityState == 'enable' || newMassDeleteActivityState == 'disable') {
                    //will find 'Mass Delete Activity' checkbox

                    const massDeleteActivityCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'305','massUpdateContactCheckbox');
                    await driver.executeScript("arguments[0].focus();", massDeleteActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Delete Activity' checkbox
                    const currentState = await massDeleteActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Delete Activity' checkbox
                    if (currentState != newMassDeleteActivityState) {
                        await driver.executeScript("arguments[0].click();", massDeleteActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass transfer activity') {
                newMassTransferActivityState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassTransferActivityState == 'enable' || newMassTransferActivityState == 'disable') {
                    //will find 'Mass Transfer Activity' checkbox

                    const massTransferActivityCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'306','massUpdateContactCheckbox');
                    await driver.executeScript("arguments[0].focus();", massTransferActivityCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Transfer Activity' checkbox
                    const currentState = await massTransferActivityCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Transfer Activity' checkbox
                    if (currentState != newMassTransferActivityState) {
                        await driver.executeScript("arguments[0].click();", massTransferActivityCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass update deal') {
                newMassUpdateDealState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassUpdateDealState == 'enable' || newMassUpdateDealState == 'disable') {
                    //will find 'Mass Update Deal' checkbox

                    const massUpdateDealCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'307','massUpdateDealCheckbox');
                    await driver.executeScript("arguments[0].focus();", massUpdateDealCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Update Deal' checkbox
                    const currentState = await massUpdateDealCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Update Deal' checkbox
                    if (currentState != newMassUpdateDealState) {
                        await driver.executeScript("arguments[0].click();", massUpdateDealCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass delete deal') {
                newMassDeleteDealState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassDeleteDealState == 'enable' || newMassDeleteDealState == 'disable') {
                    //will find 'Mass Delete Deal' checkbox

                    const massDeleteDealCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'308','massDeleteDealCheckbox');
                    await driver.executeScript("arguments[0].focus();", massDeleteDealCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Delete Deal' checkbox
                    const currentState = await massDeleteDealCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Delete Deal' checkbox
                    if (currentState != newMassDeleteDealState) {
                        await driver.executeScript("arguments[0].click();", massDeleteDealCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'mass transfer deal') {
                newMassTransferDealState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMassTransferDealState == 'enable' || newMassTransferDealState == 'disable') {
                    //will find 'Mass Transfer Deal' checkbox

                    const massTransferDealCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'309','massTransferDealCheckbox');
                    await driver.executeScript("arguments[0].focus();", massTransferDealCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Mass Transfer Deal' checkbox
                    const currentState = await massTransferDealCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Mass Transfer Deal' checkbox
                    if (currentState != newMassTransferDealState) {
                        await driver.executeScript("arguments[0].click();", massTransferDealCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage users') {
                newManageUsersState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageUsersState == 'enable' || newManageUsersState == 'disable') {
                    //will find 'Manage Users' checkbox

                    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1000 }, 0);");
                    const manageUsersCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'401','manageUsersCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageUsersCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Users' checkbox
                    const currentState = await manageUsersCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Users' checkbox
                    if (currentState != newManageUsersState) {
                        await driver.executeScript("arguments[0].click();", manageUsersCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage roles') {
                newManageRolesState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageRolesState == 'enable' || newManageRolesState == 'disable') {
                    //will find 'Manage Roles' checkbox

                    const manageRolesCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'402','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageRolesCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Roles' checkbox
                    const currentState = await manageRolesCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Roles' checkbox
                    if (currentState != newManageRolesState) {
                        await driver.executeScript("arguments[0].click();", manageRolesCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage profiles') {
                newManageProfilesState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageProfilesState == 'enable' || newManageProfilesState == 'disable') {
                    //will find 'Manage Profiles' checkbox

                    const manageProfileCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'403','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageProfileCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Profiles' checkbox
                    const currentState = await manageProfileCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Profiles' checkbox
                    if (currentState != newManageProfilesState) {
                        await driver.executeScript("arguments[0].click();", manageProfileCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage Layout') {
                newManageLayoutState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageLayoutState == 'enable' || newManageLayoutState == 'disable') {
                    //will find 'Manage Layout' checkbox

                    const manageLayoutCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'406','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageLayoutCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Layout' checkbox
                    const currentState = await manageLayoutCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Layout' checkbox
                    if (currentState != newManageLayoutState) {
                        await driver.executeScript("arguments[0].click();", manageLayoutCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage modules') {
                newManageModulesState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageModulesState == 'enable' || newManageModulesState == 'disable') {
                    //will find 'Manage Modules' checkbox

                    const manageModulesCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'407','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageModulesCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Modules' checkbox
                    const currentState = await manageModulesCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Modules' checkbox
                    if (currentState != newManageModulesState) {
                        await driver.executeScript("arguments[0].click();", manageModulesCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage organization') {
                newManageOrganizationState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageOrganizationState == 'enable' || newManageOrganizationState == 'disable') {
                    //will find 'Manage Organization' checkbox

                    const manageOrganizationCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'408','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageOrganizationCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Organization' checkbox
                    const currentState = await manageOrganizationCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Organization' checkbox
                    if (currentState != newManageOrganizationState) {
                        await driver.executeScript("arguments[0].click();", manageOrganizationCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage fields') {
                newManageFieldsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageFieldsState == 'enable' || newManageFieldsState == 'disable') {
                    //will find 'Manage Fields' checkbox

                    const manageFieldsCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'409','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageFieldsCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Fields' checkbox
                    const currentState = await manageFieldsCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Fields' checkbox
                    if (currentState != newManageFieldsState) {
                        await driver.executeScript("arguments[0].click();", manageFieldsCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage workflows') {
                newManageWorkFlowsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageWorkFlowsState == 'enable' || newManageWorkFlowsState == 'disable') {
                    //will find 'Manage Workflows' checkbox

                    const manageWorkFlowsCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'410','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageWorkFlowsCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Workflows' checkbox
                    const currentState = await manageWorkFlowsCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Workflows' checkbox
                    if (currentState != newManageWorkFlowsState) {
                        await driver.executeScript("arguments[0].click();", manageWorkFlowsCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage email templates') {
                newManageEmailTemplatesState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageEmailTemplatesState == 'enable' || newManageEmailTemplatesState == 'disable') {
                    //will find 'Manage Email Templates' checkbox

                    const manageEmailTemplatesCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'411','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageEmailTemplatesCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Email Templates' checkbox
                    const currentState = await manageEmailTemplatesCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Email Templates' checkbox
                    if (currentState != newManageEmailTemplatesState) {
                        await driver.executeScript("arguments[0].click();", manageEmailTemplatesCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage reports') {
                newManageReportsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageReportsState == 'enable' || newManageReportsState == 'disable') {
                    //will find 'Manage Reports' checkbox

                    const massManageReportsCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'412','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", massManageReportsCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Reports' checkbox
                    const currentState = await massManageReportsCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Reports' checkbox
                    if (currentState != newManageReportsState) {
                        await driver.executeScript("arguments[0].click();", massManageReportsCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage configurations') {
                newManageConfigurationState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageConfigurationState == 'enable' || newManageConfigurationState == 'disable') {
                    //will find 'Manage Calling Configurations' checkbox

                    const manageConfigurationCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'413','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageConfigurationCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Calling Configurations' checkbox
                    const currentState = await manageConfigurationCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Calling Configurations' checkbox
                    if (currentState != newManageConfigurationState) {
                        await driver.executeScript("arguments[0].click();", manageConfigurationCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage tags') {
                newManageTagsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageTagsState == 'enable' || newManageTagsState == 'disable') {
                    //will find 'Manage Tags' checkbox

                    const manageTagsCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'414','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageTagsCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Tags' checkbox
                    const currentState = await manageTagsCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Tags' checkbox
                    if (currentState != newManageTagsState) {
                        await driver.executeScript("arguments[0].click();", manageTagsCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage message templates') {
                newManageMessageTemplatesState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageMessageTemplatesState == 'enable' || newManageMessageTemplatesState == 'disable') {
                    //will find 'Manage Message Templates' checkbox

                    const manageMessageTemplatesCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'415','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageMessageTemplatesCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Message Templates' checkbox
                    const currentState = await manageMessageTemplatesCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Message Templates' checkbox
                    if (currentState != newManageMessageTemplatesState) {
                        await driver.executeScript("arguments[0].click();", manageMessageTemplatesCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'delete media manager files') {
                newDeleteMediaManagerFilesState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDeleteMediaManagerFilesState == 'enable' || newDeleteMediaManagerFilesState == 'disable') {
                    //will find 'Delete Media Manager Files' checkbox

                    const deleteMediaManagerFilesCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'416','managePermissionsCheckbox');
                    await driver.executeScript("arguments[0].focus();", deleteMediaManagerFilesCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Delete Media Manager Files' checkbox
                    const currentState = await deleteMediaManagerFilesCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Delete Media Manager Files' checkbox
                    if (currentState != newDeleteMediaManagerFilesState) {
                        await driver.executeScript("arguments[0].click();", deleteMediaManagerFilesCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage custom views') {
                newManageCustomViewState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageCustomViewState == 'enable' || newManageCustomViewState == 'disable') {
                    //will find 'Manage Custom Views' checkbox

                    const manageCustomViewsCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'501','manageCustomViewCheckbox');
                    await driver.executeScript("arguments[0].focus();", manageCustomViewsCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Custom Views' checkbox
                    const currentState = await manageCustomViewsCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Custom Views' checkbox
                    if (currentState != newManageCustomViewState) {
                        await driver.executeScript("arguments[0].click();", manageCustomViewsCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'merge contacts') {
                newMergeContactsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newMergeContactsState == 'enable' || newMergeContactsState == 'disable') {
                    //will find 'Merge Contacts' checkbox
                    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 2000 }, 0);");
                    const mergeContactsCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'601','mergeContactsCheckbox');
                    await driver.executeScript("arguments[0].focus();", mergeContactsCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Merge Contacts' checkbox
                    const currentState = await mergeContactsCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Merge Contacts' checkbox
                    if (currentState != newMergeContactsState) {
                        await driver.executeScript("arguments[0].click();", mergeContactsCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'upload file') {
                newUploadFileState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newUploadFileState == 'enable' || newUploadFileState == 'disable') {
                    //will find 'Upload File' checkbox
                    const uploadFileCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'801','uploadFileCheckbox');
                    await driver.executeScript("arguments[0].focus();", uploadFileCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Upload File' checkbox
                    const currentState = await uploadFileCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Upload File' checkbox
                    if (currentState != newUploadFileState) {
                        await driver.executeScript("arguments[0].click();", uploadFileCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'view file') {
                newViewFileState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newViewFileState == 'enable' || newViewFileState == 'disable') {
                    //will find 'View File' checkbox
                    const viewFileCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'802','viewFileCheckbox');
                    await driver.executeScript("arguments[0].focus();", viewFileCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'View File' checkbox
                    const currentState = await viewFileCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'View File' checkbox
                    if (currentState != newViewFileState) {
                        await driver.executeScript("arguments[0].click();", viewFileCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'delete file') {
                newDeleteFileState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newDeleteFileState == 'enable' || newDeleteFileState == 'disable') {
                    //will find 'Delete File' checkbox
                    const deleteFileCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'803','deleteFileCheckbox');
                    await driver.executeScript("arguments[0].focus();", deleteFileCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Delete File' checkbox
                    const currentState = await deleteFileCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Delete File' checkbox
                    if (currentState != newDeleteFileState) {
                        await driver.executeScript("arguments[0].click();", deleteFileCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'create dashboard') {
                newCreateDashboardState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newCreateDashboardState == 'enable' || newCreateDashboardState == 'disable') {
                    //will find 'Create Dashboard' checkbox
                    const createDashboardCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'901','createDashboardCheckbox');
                    await driver.executeScript("arguments[0].focus();", createDashboardCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Create Dashboard' checkbox
                    const currentState = await createDashboardCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Create Dashboard' checkbox
                    if (currentState != newCreateDashboardState) {
                        await driver.executeScript("arguments[0].click();", createDashboardCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'manage dashboard') {
                newManageDashboardState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newManageDashboardState == 'enable' || newManageDashboardState == 'disable') {
                    //will find 'Manage Dashboard' checkbox
                    const ManageDashboardCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'902','manageDashboardCheckbox');
                    await driver.executeScript("arguments[0].focus();", ManageDashboardCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Manage Dashboard' checkbox
                    const currentState = await ManageDashboardCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Manage Dashboard' checkbox
                    if (currentState != newManageDashboardState) {
                        await driver.executeScript("arguments[0].click();", ManageDashboardCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'create reports') {
                newCreateReportsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newCreateReportsState == 'enable' || newCreateReportsState == 'disable') {
                    //will find 'Create Reports' checkbox
                    const createReportCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'1001','reportCheckbox');
                    await driver.executeScript("arguments[0].focus();", createReportCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Create Reports' checkbox
                    const currentState = await createReportCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Create Reports' checkbox
                    if (currentState != newCreateReportsState) {
                        await driver.executeScript("arguments[0].click();", createReportCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'schedule') {
                newScheduleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newScheduleState == 'enable' || newScheduleState == 'disable') {
                    //will find 'Schedule' checkbox
                    const scheduleCheckbox = await await formElementsObj.findElementById(driver,screenshotPath,'1002','scheduleCheckbox');
                    await driver.executeScript("arguments[0].focus();", scheduleCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Schedule' checkbox
                    const currentState = await scheduleCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Schedule' checkbox
                    if (currentState != newScheduleState) {
                        await driver.executeScript("arguments[0].click();", scheduleCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'export reports') {
                newExportReportsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newExportReportsState == 'enable' || newExportReportsState == 'disable') {
                    //will find 'Export Reports' checkbox
                    const exportReportCheckbox = await formElementsObj.findElementById(driver,screenshotPath,'1003','exportReportCheckbox');
                    await driver.executeScript("arguments[0].focus();", exportReportCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Export Reports' checkbox
                    const currentState = await exportReportCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Export Reports' checkbox
                    if (currentState != newExportReportsState) {
                        await driver.executeScript("arguments[0].click();", exportReportCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the task activity checkbox is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        //get values of enabled/disabled modules of profile permissions before navigation
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 0 }, 0);");
        await driver.sleep(2000);
        const actualContactModuleValue = valueConverter(await driver.findElement(By.id('switch_Contact_access')).getAttribute('value'));
        const actualActivityModuleValue = valueConverter(await driver.findElement(By.id('switch_Task_access')).getAttribute('value'));
        const actualDealModuleValue = valueConverter(await driver.findElement(By.id('switch_Deal_access')).getAttribute('value'));
        const actualImportContactValue = valueConverter(await driver.findElement(By.id('005')).getAttribute('value'));
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 500 }, 0);");
        await driver.sleep(1000);
        const actualExportContactValue = valueConverter(await driver.findElement(By.id('101')).getAttribute('value'));
        const actualExportActivityValue = valueConverter(await driver.findElement(By.id('104')).getAttribute('value'));
        const actualExportDealValue = valueConverter(await driver.findElement(By.id('103')).getAttribute('value'));
        const actualMassUpdateContactValue = valueConverter(await driver.findElement(By.id('301')).getAttribute('value'));
        const actualMassDeleteContactValue = valueConverter(await driver.findElement(By.id('302')).getAttribute('value'));
        const actualMassTransferContactValue = valueConverter(await driver.findElement(By.id('303')).getAttribute('value'));
        const actualMassUpdateActivityValue = valueConverter(await driver.findElement(By.id('304')).getAttribute('value'));
        const actualMassDeleteActivityValue = valueConverter(await driver.findElement(By.id('305')).getAttribute('value'));
        const actualMassTransferActivityValue = valueConverter(await driver.findElement(By.id('306')).getAttribute('value'));
        const actualMassUpdateDealValue = valueConverter(await driver.findElement(By.id('307')).getAttribute('value'));
        const actualMassDeleteDealValue = valueConverter(await driver.findElement(By.id('308')).getAttribute('value'));
        const actualMassTransferDealValue = valueConverter(await driver.findElement(By.id('309')).getAttribute('value'));
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1000 }, 0);");
        await driver.sleep(1000);
        const actualManageUsersValue = valueConverter(await driver.findElement(By.id('401')).getAttribute('value'));
        const actualManageRolesValue = valueConverter(await driver.findElement(By.id('402')).getAttribute('value'));
        const actualManageProfilesValue = valueConverter(await driver.findElement(By.id('403')).getAttribute('value'));
        const actualManageLayoutValue = valueConverter(await driver.findElement(By.id('406')).getAttribute('value'));
        const actualManageModulesValue = valueConverter(await driver.findElement(By.id('407')).getAttribute('value'));
        const actualManageOrganizationValue = valueConverter(await driver.findElement(By.id('408')).getAttribute('value'));
        const actualManageFieldsValue = valueConverter(await driver.findElement(By.id('409')).getAttribute('value'));
        const actualManageWorkFlowsValue = valueConverter(await driver.findElement(By.id('410')).getAttribute('value'));
        const actualManageEmailTemplatesValue = valueConverter(await driver.findElement(By.id('411')).getAttribute('value'));
        const actualManageReportsValue = valueConverter(await driver.findElement(By.id('412')).getAttribute('value'));
        const actualManageConfigurationValue = valueConverter(await driver.findElement(By.id('413')).getAttribute('value'));
        const actualManageTagsValue = valueConverter(await driver.findElement(By.id('414')).getAttribute('value'));
        const actualManageMessageTemplatesValue = valueConverter(await driver.findElement(By.id('415')).getAttribute('value'));
        const actualDeleteMediaManagerFilesValue = valueConverter(await driver.findElement(By.id('416')).getAttribute('value'));
        const actualManageCustomViewsValue = valueConverter(await driver.findElement(By.id('501')).getAttribute('value'));
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 2000 }, 0);");
        await driver.sleep(1000);
        const actualMergeContactsValue = valueConverter(await driver.findElement(By.id('601')).getAttribute('value'));
        const actualUploadFileValue = valueConverter(await driver.findElement(By.id('801')).getAttribute('value'));
        const actualViewFileValue = valueConverter(await driver.findElement(By.id('802')).getAttribute('value'));
        const actualDeleteFileValue = valueConverter(await driver.findElement(By.id('803')).getAttribute('value'));
        const actualCreateDashboardValue = valueConverter(await driver.findElement(By.id('901')).getAttribute('value'));
        const actualManageDashboardValue = valueConverter(await driver.findElement(By.id('902')).getAttribute('value'));
        const actualCreateReportValue = valueConverter(await driver.findElement(By.id('1001')).getAttribute('value'));
        const actualScheduleValue = valueConverter(await driver.findElement(By.id('1002')).getAttribute('value'));
        const actualExportReportValue = valueConverter(await driver.findElement(By.id('1003')).getAttribute('value'));

        const addButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','addButtonField');
        await addButton.click();
        await driver.sleep(1000);
        await profilePermissionsObj.checkProfileUpdateMessage(driver);
        await driver.sleep(5000);

        //page navigation and come back to profile permissions page
        await pageNavigationObj.comeBackToProfilePermissionsPage(driver, screenshotPath);
        await driver.sleep(1000);
        const editButtonElement = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButtonElement.click();

        await driver.sleep(2000);
        //get values of enabled/disabled modules of profile permissions after navigation
        const expectedContactModuleValue = valueConverter(await driver.findElement(By.id('switch_Contact_access')).getAttribute('value'));
        console.log(actualContactModuleValue, expectedContactModuleValue)
        const expectedActivityModuleValue = valueConverter(await driver.findElement(By.id('switch_Task_access')).getAttribute('value'));
        console.log(actualActivityModuleValue, expectedActivityModuleValue)
        const expectedDealModuleValue = valueConverter(await driver.findElement(By.id('switch_Deal_access')).getAttribute('value'));
        console.log(actualDealModuleValue, expectedDealModuleValue)
        const expectedImportContactValue = valueConverter(await driver.findElement(By.id('005')).getAttribute('value'));
        console.log(actualImportContactValue, expectedImportContactValue)
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 500 }, 0);");
        await driver.sleep(1000);
        const expectedExportContactValue = valueConverter(await driver.findElement(By.id('101')).getAttribute('value'));
        console.log(actualExportContactValue, expectedExportContactValue)
        const expectedExportActivityValue = valueConverter(await driver.findElement(By.id('104')).getAttribute('value'));
        console.log(actualExportActivityValue, expectedExportActivityValue)
        const expectedExportDealValue = valueConverter(await driver.findElement(By.id('103')).getAttribute('value'));
        console.log(actualExportDealValue, expectedExportDealValue)
        const expectedMassUpdateContactValue = valueConverter(await driver.findElement(By.id('301')).getAttribute('value'));
        console.log(actualMassUpdateContactValue, expectedMassUpdateContactValue)
        const expectedMassDeleteContactValue = valueConverter(await driver.findElement(By.id('302')).getAttribute('value'));
        console.log(actualMassDeleteContactValue, expectedMassDeleteContactValue)
        const expectedMassTransferContactValue = valueConverter(await driver.findElement(By.id('303')).getAttribute('value'));
        console.log(actualMassTransferContactValue, expectedMassTransferContactValue)
        const expectedMassUpdateActivityValue = valueConverter(await driver.findElement(By.id('304')).getAttribute('value'));
        console.log(actualMassUpdateActivityValue, expectedMassUpdateActivityValue)
        const expectedMassDeleteActivityValue = valueConverter(await driver.findElement(By.id('305')).getAttribute('value'));
        console.log(actualMassDeleteActivityValue, expectedMassDeleteActivityValue)
        const expectedMassTransferActivityValue = valueConverter(await driver.findElement(By.id('306')).getAttribute('value'));
        console.log(actualMassTransferActivityValue, expectedMassTransferActivityValue)
        const expectedMassUpdateDealValue = valueConverter(await driver.findElement(By.id('307')).getAttribute('value'));
        console.log(actualMassUpdateDealValue, expectedMassUpdateDealValue)
        const expectedMassDeleteDealValue = valueConverter(await driver.findElement(By.id('308')).getAttribute('value'));
        console.log(actualMassDeleteDealValue, expectedMassDeleteDealValue)
        const expectedMassTransferDealValue = valueConverter(await driver.findElement(By.id('309')).getAttribute('value'));
        console.log(actualMassTransferDealValue, expectedMassTransferDealValue)
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 900 }, 0);");
        await driver.sleep(1000);
        const expectedManageUsersValue = valueConverter(await driver.findElement(By.id('401')).getAttribute('value'));
        console.log(actualManageUsersValue, expectedManageUsersValue)
        const expectedManageRolesValue = valueConverter(await driver.findElement(By.id('402')).getAttribute('value'));
        console.log(actualManageRolesValue, expectedManageRolesValue)
        const expectedManageProfilesValue = valueConverter(await driver.findElement(By.id('403')).getAttribute('value'));
        console.log(actualManageProfilesValue, expectedManageProfilesValue)
        const expectedManageLayoutValue = valueConverter(await driver.findElement(By.id('406')).getAttribute('value'));
        console.log(actualManageLayoutValue, expectedManageLayoutValue)
        const expectedManageModulesValue = valueConverter(await driver.findElement(By.id('407')).getAttribute('value'));
        console.log(actualManageModulesValue, expectedManageModulesValue)
        const expectedManageOrganizationValue = valueConverter(await driver.findElement(By.id('408')).getAttribute('value'));
        console.log(actualManageOrganizationValue, expectedManageOrganizationValue)
        const expectedManageFieldsValue = valueConverter(await driver.findElement(By.id('409')).getAttribute('value'));
        console.log(actualManageFieldsValue, expectedManageFieldsValue)
        const expectedManageWorkFlowsValue = valueConverter(await driver.findElement(By.id('410')).getAttribute('value'));
        console.log(actualManageWorkFlowsValue, expectedManageWorkFlowsValue)
        const expectedManageEmailTemplatesValue = valueConverter(await driver.findElement(By.id('411')).getAttribute('value'));
        console.log(actualManageEmailTemplatesValue, expectedManageEmailTemplatesValue)
        const expectedManageReportsValue = valueConverter(await driver.findElement(By.id('412')).getAttribute('value'));
        console.log(actualManageReportsValue, expectedManageReportsValue)
        const expectedManageConfigurationValue = valueConverter(await driver.findElement(By.id('413')).getAttribute('value'));
        console.log(actualManageConfigurationValue, expectedManageConfigurationValue)
        const expectedManageTagsValue = valueConverter(await driver.findElement(By.id('414')).getAttribute('value'));
        console.log(actualManageTagsValue, expectedManageTagsValue)
        const expectedManageMessageTemplatesValue = valueConverter(await driver.findElement(By.id('415')).getAttribute('value'));
        console.log(actualManageMessageTemplatesValue, expectedManageMessageTemplatesValue)
        const expectedDeleteMediaManagerFilesValue = valueConverter(await driver.findElement(By.id('416')).getAttribute('value'));
        console.log(actualDeleteMediaManagerFilesValue, expectedDeleteMediaManagerFilesValue)
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 2000 }, 0);");
        await driver.sleep(1000);
        const expectedManageCustomViewsValue = valueConverter(await driver.findElement(By.id('501')).getAttribute('value'));
        console.log(actualManageCustomViewsValue, expectedManageCustomViewsValue)
        const expectedMergeContactsValue = valueConverter(await driver.findElement(By.id('601')).getAttribute('value'));
        console.log(actualMergeContactsValue, expectedMergeContactsValue)
        const expectedUploadFileValue = valueConverter(await driver.findElement(By.id('801')).getAttribute('value'));
        console.log(actualUploadFileValue, expectedUploadFileValue)
        const expectedViewFileValue = valueConverter(await driver.findElement(By.id('802')).getAttribute('value'));
        console.log(actualViewFileValue, expectedViewFileValue)
        const expectedDeleteFileValue = valueConverter(await driver.findElement(By.id('803')).getAttribute('value'));
        console.log(actualDeleteFileValue, expectedDeleteFileValue)
        const expectedCreateDashboardValue = valueConverter(await driver.findElement(By.id('901')).getAttribute('value'));
        console.log(actualCreateDashboardValue, expectedCreateDashboardValue)
        const expectedManageDashboardValue = valueConverter(await driver.findElement(By.id('902')).getAttribute('value'));
        console.log(actualManageDashboardValue, expectedManageDashboardValue)
        const expectedCreateReportValue = valueConverter(await driver.findElement(By.id('1001')).getAttribute('value'));
        console.log(actualCreateReportValue, expectedCreateReportValue)
        const expectedScheduleValue = valueConverter(await driver.findElement(By.id('1002')).getAttribute('value'));
        console.log(actualScheduleValue, expectedScheduleValue)
        const expectedExportReportValue = valueConverter(await driver.findElement(By.id('1003')).getAttribute('value'));
        console.log(actualExportReportValue, expectedExportReportValue)

        //comparing actual and expected values of profile permissions before and after navigation
        try {
            strictEqual(actualContactModuleValue, expectedContactModuleValue);
            strictEqual(actualActivityModuleValue, expectedActivityModuleValue);
            strictEqual(actualDealModuleValue, expectedDealModuleValue);
            strictEqual(actualImportContactValue, expectedImportContactValue);
            strictEqual(actualExportContactValue, expectedExportContactValue);
            strictEqual(actualExportActivityValue, expectedExportActivityValue);
            strictEqual(actualExportDealValue, expectedExportDealValue);
            strictEqual(actualMassUpdateContactValue, expectedMassUpdateContactValue);
            strictEqual(actualMassDeleteContactValue, expectedMassDeleteContactValue);
            strictEqual(actualMassTransferContactValue, expectedMassTransferContactValue);
            strictEqual(actualMassUpdateActivityValue, expectedMassUpdateActivityValue);
            strictEqual(actualMassDeleteActivityValue, expectedMassDeleteActivityValue);
            strictEqual(actualMassTransferActivityValue, expectedMassTransferActivityValue);
            strictEqual(actualMassUpdateDealValue, expectedMassUpdateDealValue);
            strictEqual(actualMassDeleteDealValue, expectedMassDeleteDealValue);
            strictEqual(actualMassTransferDealValue, expectedMassTransferDealValue);
            strictEqual(actualManageUsersValue, expectedManageUsersValue);
            strictEqual(actualManageRolesValue, expectedManageRolesValue);
            strictEqual(actualManageProfilesValue, expectedManageProfilesValue);
            strictEqual(actualManageLayoutValue, expectedManageLayoutValue);
            strictEqual(actualManageModulesValue, expectedManageModulesValue);
            strictEqual(actualManageOrganizationValue, expectedManageOrganizationValue);
            strictEqual(actualManageFieldsValue, expectedManageFieldsValue);
            strictEqual(actualManageWorkFlowsValue, expectedManageWorkFlowsValue);
            strictEqual(actualManageEmailTemplatesValue, expectedManageEmailTemplatesValue);
            strictEqual(actualManageReportsValue, expectedManageReportsValue);
            strictEqual(actualManageConfigurationValue, expectedManageConfigurationValue);
            strictEqual(actualManageTagsValue, expectedManageTagsValue);
            strictEqual(actualManageMessageTemplatesValue, expectedManageMessageTemplatesValue);
            strictEqual(actualDeleteMediaManagerFilesValue, expectedDeleteMediaManagerFilesValue);
            strictEqual(actualManageCustomViewsValue, expectedManageCustomViewsValue);
            strictEqual(actualMergeContactsValue, expectedMergeContactsValue);
            strictEqual(actualUploadFileValue, expectedUploadFileValue);
            strictEqual(actualViewFileValue, expectedViewFileValue);
            strictEqual(actualDeleteFileValue, expectedDeleteFileValue);
            strictEqual(actualCreateDashboardValue, expectedCreateDashboardValue);
            strictEqual(actualManageDashboardValue, expectedManageDashboardValue);
            strictEqual(actualCreateReportValue, expectedCreateReportValue);
            strictEqual(actualScheduleValue, expectedScheduleValue);
            strictEqual(actualExportReportValue, expectedExportReportValue);
        } catch (err) {
            await assert.fail("As expected and actual values of " + err + " modules are indifferent,test case has been failed");
        }
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);
        console.log("As user enabled/disabled some profile permissions successfully,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user updates profile description field as blank and verify after navigation',async function(dataTable) {
    try {
        await driver.sleep(2000);
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'profile description') {
                profileDescriptionFieldData = dataTable.rawTable[i][1];

                //will find 'Profile Description' field and pass the new data
                const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
                await clearFieldDataObj.clearFieldData(profileDescriptionField);
                await profileDescriptionField.sendKeys(profileDescriptionFieldData);
                await driver.sleep(1000);
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile,Profile Description');
            }
        }
        console.log("As profile description remained as blank,test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('new custom profile with blank profile description should get updated',async function() {
    try {
        //get actual values of edit page before navigation after updating new profile
        console.log("Profile Name and Description of custom profile 01 before navigation in edit page:");
        const actualProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        const actualProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Profile Name:" + actualProfileName);
        console.log("Profile Description:" + actualProfileDescription);

        //get profile permission values of updated profile
        const actualContactValue = await driver.findElement(By.id('switch_Contact_access')).getAttribute('value');
        const actualImportContactValue = await driver.findElement(By.id('005')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        const actualExportContactValue = await driver.findElement(By.id('101')).getAttribute('value');
        const actualMassUpdateContactValue = await driver.findElement(By.id('301')).getAttribute('value');
        const actualManageUsersValue = await driver.findElement(By.id('401')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        const actualManageCustomViewsValue = await driver.findElement(By.id('501')).getAttribute('value');
        const actualMergeContactValue = await driver.findElement(By.id('601')).getAttribute('value');
        const actualUploadFileValue = await driver.findElement(By.id('801')).getAttribute('value');

        await driver.sleep(1000);
        //click on save button on edit page
        const addButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','addButtonField');
        await addButton.click();
        await driver.sleep(1000);
        //navigate to dashboard page and come back to profile permissions page
        await pageNavigationObj.comeBackToProfilePermissionsPage(driver, screenshotPath);
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedProfileCustom01.png');
        //updated profile name and description in profile permissions page:
        const updatedProfileNameValue = await driver.findElement(By.xpath('//tbody/tr[2]/td[1]')).getAttribute('value');
        console.log(updatedProfileNameValue);
        const updatedBlankDescriptionValue = await driver.findElement(By.xpath('//tbody/tr[2]/td[2]')).getAttribute('value');
        console.log(updatedBlankDescriptionValue);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'blankProfileDescriptionListingPage.png');
        await driver.sleep(1000);
        if (updatedBlankDescriptionValue === null) {
            console.log("As profile description is blank in profile listing page,test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'profileDescriptionListPage_NotNull.png');
            await assert.fail("As profile description is not blank in profile listing page,the test case has been aborted");
        }
        //move to edit page of newly created profile
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);

        //get values of profile name and description in edit page
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfileCustom01EditPage.png');
        console.log("Updated Profile Name and Description of custom profile 01 after navigation in edit page:");
        const expectedProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        console.log("Updated Profile Name:" + expectedProfileName);
        const expectedProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Updated Profile Description:" + expectedProfileDescription);

        //get profile permission values of updated profile
        await driver.sleep(1000);
        const expectedContactValue = await driver.findElement(By.id('switch_Contact_access')).getAttribute('value');
        const expectedImportContactValue = await driver.findElement(By.id('005')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        const expectedExportContactValue = await driver.findElement(By.id('101')).getAttribute('value');
        const expectedMassUpdateContactValue = await driver.findElement(By.id('301')).getAttribute('value');
        const expectedManageUsersValue = await driver.findElement(By.id('401')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        const expectedManageCustomViewsValue = await driver.findElement(By.id('501')).getAttribute('value');
        const expectedMergeContactValue = await driver.findElement(By.id('601')).getAttribute('value');
        const expectedUploadFileValue = await driver.findElement(By.id('801')).getAttribute('value');

        await driver.sleep(1000);
        //compare actual and expected values before and after navigation
        try {
            //comparing profile name and description values
            strictEqual(actualProfileName, expectedProfileName);
            strictEqual(actualProfileDescription, expectedProfileDescription);

            //comparing profile permissions of both updated profile
            strictEqual(actualContactValue, expectedContactValue);
            strictEqual(actualImportContactValue, expectedImportContactValue);
            strictEqual(actualExportContactValue, expectedExportContactValue);
            strictEqual(actualMassUpdateContactValue, expectedMassUpdateContactValue);
            strictEqual(actualManageUsersValue, expectedManageUsersValue);
            strictEqual(actualManageCustomViewsValue, expectedManageCustomViewsValue);
            strictEqual(actualMergeContactValue, expectedMergeContactValue);
            strictEqual(actualUploadFileValue, expectedUploadFileValue);
            console.log("Compared values of profile name,description and profile permissions of custom profile are verified successfully");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedProfile_NotAdded.png');
            await assert.fail("As profile is not updated,test case has been failed");
        }
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);
        console.log("As profile is updated with blank description field,so test case has been passed");
    }  catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user updates a custom profile with following data:',async function(dataTable) {
    try {
        await driver.sleep(2000);
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile 01');
        await editButton.click();
        await driver.sleep(2000);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++){

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if(fieldName == 'profile name'){
                profileNameFieldData = dataTable.rawTable[i][1];

                //will find 'Profile Name' field and pass the new data
                const profileNameField = await formElementsObj.findElementById(driver,screenshotPath,'profileNameField','profileNameField');
                await clearFieldDataObj.clearFieldData(profileNameField);
                await profileNameField.sendKeys(profileNameFieldData);
                await driver.sleep(500);
            }
            else if(fieldName == 'profile description'){
                profileDescriptionFieldData = dataTable.rawTable[i][1];

                //will find 'Profile Description' field and pass the new data
                const profileDescriptionField = await formElementsObj.findElementById(driver,screenshotPath,'profileDescriptionField','profileDescriptionField');
                await clearFieldDataObj.clearFieldData(profileDescriptionField);
                await profileDescriptionField.sendKeys(profileDescriptionFieldData);
            }
            else{
                await assert.fail('Due to the provided \''+dataTable.rawTable[i][0]+'\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Profile Name,Clone Profile,Profile Description');
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'newProfileValidation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('navigate to other page and verify updated profile in listing and edit page',async function() {
    try {
        await driver.sleep(2000);
        //get actual values of edit page before navigation after adding new profile
        console.log("Updated Profile Name and Description of custom profile 01 before navigation in edit page:");
        const actualProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        const actualProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Updated Profile Name:" + actualProfileName);
        console.log("Updated Profile Description:" + actualProfileDescription);

        //get profile permission values of updated profile
        const actualContactValue = await driver.findElement(By.id('switch_Contact_access')).getAttribute('value');
        const actualImportContactValue = await driver.findElement(By.id('005')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        const actualExportContactValue = await driver.findElement(By.id('101')).getAttribute('value');
        const actualMassUpdateContactValue = await driver.findElement(By.id('301')).getAttribute('value');
        const actualManageUsersValue = await driver.findElement(By.id('401')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        const actualManageCustomViewsValue = await driver.findElement(By.id('501')).getAttribute('value');
        const actualMergeContactValue = await driver.findElement(By.id('601')).getAttribute('value');
        const actualUploadFileValue = await driver.findElement(By.id('801')).getAttribute('value');

        await driver.sleep(1000);
        //click on save button on edit page
        const addButton = await formElementsObj.findElementById(driver,screenshotPath,'saveButtonField','addButtonField');
        await addButton.click();
        await driver.sleep(1000);
        //navigate to dashboard page and come back to profile permissions page
        await pageNavigationObj.comeBackToProfilePermissionsPage(driver, screenshotPath);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfileCustom01.png');

        //get values of updated profile name and description in table of profile permissions page
        console.log("Updated Profile Name and Description of custom profile 01 in profile permissions table:");
        const newProfileNameText = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(1)')).getText();
        console.log("Profile Name:" + newProfileNameText);
        const newProfileDescriptionText = await driver.findElement(By.css('tr:nth-of-type(2) > td:nth-of-type(2)')).getText();
        console.log("Profile Description:" + newProfileDescriptionText);
        await driver.sleep(1000);

        //move to edit page of updated profile
        const editButton = await profilePermissionsObj.findEditButton(driver, 'Cus Profile Updated 01');
        await editButton.click();
        await driver.sleep(2000);

        //get values of updated profile name and description in edit page
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfileCustom01EditPage.png');
        console.log("Updated Profile Name and Description of custom profile 01 after navigation in edit page:");
        const expectedProfileName = await driver.findElement(By.id('profileNameField')).getAttribute('value');
        console.log("Profile Name:" + expectedProfileName);
        const expectedProfileDescription = await driver.findElement(By.id('profileDescriptionField')).getAttribute('value');
        console.log("Profile Description:" + expectedProfileDescription);

        //get profile permission values of updated profile
        await driver.sleep(1000);
        const expectedContactValue = await driver.findElement(By.id('switch_Contact_access')).getAttribute('value');
        const expectedImportContactValue = await driver.findElement(By.id('005')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        const expectedExportContactValue = await driver.findElement(By.id('101')).getAttribute('value');
        const expectedMassUpdateContactValue = await driver.findElement(By.id('301')).getAttribute('value');
        const expectedManageUsersValue = await driver.findElement(By.id('401')).getAttribute('value');
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        const expectedManageCustomViewsValue = await driver.findElement(By.id('501')).getAttribute('value');
        const expectedMergeContactValue = await driver.findElement(By.id('601')).getAttribute('value');
        const expectedUploadFileValue = await driver.findElement(By.id('801')).getAttribute('value');

        await driver.sleep(1000);
        //compare actual and expected values before and after navigation
        try {
            //comparing profile name and description values
            strictEqual(actualProfileName, expectedProfileName);
            strictEqual(actualProfileDescription, expectedProfileDescription);

            //comparing profile permissions of both new profile and standard profile
            strictEqual(actualContactValue, expectedContactValue);
            strictEqual(actualImportContactValue, expectedImportContactValue);
            strictEqual(actualExportContactValue, expectedExportContactValue);
            strictEqual(actualMassUpdateContactValue, expectedMassUpdateContactValue);
            strictEqual(actualManageUsersValue, expectedManageUsersValue);
            strictEqual(actualManageCustomViewsValue, expectedManageCustomViewsValue);
            strictEqual(actualMergeContactValue, expectedMergeContactValue);
            strictEqual(actualUploadFileValue, expectedUploadFileValue);
            console.log("Compared values of profile name,description and profile permissions of updated custom profile are verified successfully");
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'newProfile_NotAdded.png');
            await assert.fail("As new profile is not added,test case has been failed");
        }
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await cancelButton.click();
        await driver.sleep(2000);
        console.log("As user is able to update a profile,test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is able to delete a custom profile',async function() {
    try {
        await driver.sleep(2000);
        const deleteButton = await profilePermissionsObj.deleteProfile(driver, 'Cus Profile Updated 01');
        await deleteButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="No"]')).click();
        await driver.sleep(2000);
        const customProfile01Elements = await driver.findElements(By.css('tr:nth-of-type(2)'));
        const customProfile01Length = await customProfile01Elements.length;
        for (let i = 0; i < customProfile01Length; i++) {
            const customProfile01List = await customProfile01Elements[i].getText();
            console.log("Profile Name and Profile Description in profile permissions page:");
            console.log(customProfile01List);
        }
        const deleteButtonElement = await profilePermissionsObj.deleteProfile(driver, 'Cus Profile Updated 01');
        await deleteButtonElement.click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(1000);
        await profilePermissionsObj.profileDeleteNotification(driver);
        await driver.sleep(2000);
        await pageNavigationObj.comeBackToProfilePermissionsPage(driver, screenshotPath);
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        try {
            const customProfile01 = await driver.findElements(By.xpath("//td[.='Cus Profile Updated 01']"));
            const customProfileLength = await customProfile01.length;
            if (customProfileLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'customProfile01_Deleted.png');
                console.log("As custom profile 01 deleted successfully,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As custom profile 01 is not deleted successfully,test case has been aborted");
            }
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            const deleteButton = await profilePermissionsObj.deleteProfile(driver, 'Cus Profile 02');
            await deleteButton.click();
            await driver.sleep(1000);
            await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
            await driver.sleep(2000);
            await profilePermissionsObj.profileDeleteNotification(driver);
            await driver.sleep(4000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'customProfile02_Deleted.png');
        } catch (err) {
            await assert.fail("As user is unable to delete custom profile,test case has been failed" + err);
        }
        console.log("As user is able to delete custom profile,test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user delete a custom profile when it is associated with the user and verify {string}',async function(promptMessage) {
    try {
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const usersPage = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Users ');
        await driver.executeScript("arguments[0].scrollIntoView();", usersPage[0]);
        await driver.wait(until.elementIsVisible(usersPage[0]));
        await usersPage[0].click();
        await driver.sleep(2000);

        //get profile name other than admin user
        const usersPageStandardUser = await profilePermissionsObj.findUserPageStandardUser(driver, 3);
        console.log("Users page profile name:" + usersPageStandardUser);

        await screenshotObj.takeScreenshot(driver, screenshotPath + 'usersList.png');
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const profilePermissionsPage = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsPage[0]);
        await driver.wait(until.elementIsVisible(profilePermissionsPage[0]));
        await profilePermissionsPage[0].click();
        await driver.sleep(1000);
        try {
            //get profile name in profile listing page
            const profilePageStandardUser = await driver.findElement(By.xpath('//td[text()="Standard"]')).getText();
            console.log("Profile permissions page profile name:" + profilePageStandardUser);
            //comparing standard profile in users page and profile page and if same then delete that profile
            if (usersPageStandardUser === profilePageStandardUser) {
                await driver.findElement(By.xpath(`//td[text()='${usersPageStandardUser}']/following-sibling::td/a[text()='Delete']`)).click();
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//button[text() ="Yes"]')).click();
                await driver.sleep(1000);
                //As standard profile associated with user so it is unable to delete so it gives a prompt notification
                const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(actualNotificationElement));
                const notificationMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMessage, promptMessage);
                await driver.sleep(5000);
                //page navigation and come back to profile permissions page
                await pageNavigationObj.comeBackToProfilePermissionsPage(driver, screenshotPath);
                await driver.sleep(1000);
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'standardProfile_Found.png');
                //check and display the standard profile is not deleted
                const standardProfileText = await driver.findElement(By.xpath('//td[text()="Standard"]')).getText();
                console.log("As standard profile is not deleted,it displays the profile name after navigation:" + standardProfileText);
            } else {
                await assert.fail("As standard profile associated with user of users page and profile permissions are not equal,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        console.log("As user is unable to delete profile associated with the user,test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is not able to edit or delete admin profile',async function() {
    try {
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'noEditDeleteOfAdmin.png');
        const adminEditLinkValue = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(3)')).getAttribute('value');
        const adminDeleteLinkValue = await driver.findElement(By.css('tr:nth-of-type(1) > td:nth-of-type(4)')).getAttribute('value');
        if (adminEditLinkValue === null && adminDeleteLinkValue === null) {
            console.log("As there are no edit and delete links for admin profile,test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'adminProfile_Notfound.png');
            await assert.fail("As admin profile edit and delete links are found,test case has been failed");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("As admin profile edit and delete links are found,test case has been passed");
});
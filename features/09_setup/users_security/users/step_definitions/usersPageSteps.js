const {Given,When,Then} = require('@cucumber/cucumber');
const {By, until} = require('selenium-webdriver');
const {strictEqual} = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openUsersPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/users_security/users/screenshots/';
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const commonModuleElementObj = require('../../../../00_common/webElements/formElements');
const usersPageElementsObj = require('../common/usersPageElements');
const performSpecificOperationsObj = require('../../../../04_myAccount/generalSettings/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let firstNameFieldData = 'no', lastNameFieldData = 'no', emailFieldData = 'no', mobileFieldData = 'no', profileFieldData = 'no';
let ipRestrictionFieldData = 'no', roleFieldData = 'no', nickNameFieldData = 'no', dobFieldData = 'no', dateOfAnniversaryFieldData = 'no';
let phoneFieldData = 'no', extensionFieldData = 'no', addressLine1FieldData = 'no', addressLine2FieldData = 'no', areaFieldData = 'no';
let cityFieldData = 'no', stateFieldData = 'no', countryFieldData = 'no', zipCodeFieldData = 'no', emailSignatureFieldData = 'no';
let activeUsers = 'no', activeUsersBeforeAddingNewUserLength, activeUsersCount = 'no', activeUsersAfterClosingEditPageLength = 'no';
let activeUserData = 'no', activeNonExistingUser = 'no', deactiveUserData = 'no', deactiveNonExistingUser = 'no', unconfirmedUserData = 'no', unconfirmedNonExistingUser = 'no';
let activeUsersBeforeDeactivatingUserLength,activeUsersAfterDeactivatingUserLength;
let deactivateUserNameText, deactivateUserEmailText, deactivateUserRoleText, deactivateUserProfileText;
let contactFieldData = 'no', companyFieldData = 'no', activityFieldData = 'no', dealFieldData = 'no';
let emailValueBeforeUpdatingUser = 'no';
let activeUsersCountBeforeAddingNewUser ,deactiveUsersCountBeforeAddingNewUser,unconfirmedUsersCountBeforeAddingNewUser;
let activeUsersCountBeforeDeactivatingUser,deactiveUsersCountBeforeDeactivatingUser,unconfirmedUsersCountBeforeDeactivatingUser;
let deactiveUsers = 'no', unconfirmedUsers = 'no', activeUsersCountBeforeDeletingUser, deactiveUsersCountBeforeDeletingUser,unconfirmedUsersCountBeforeDeletingUser;

Given('the {string} is on users page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/security/users/active')){
        console.log('The users page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open profile permissions page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on users page');
        //will open the users page
        await openUsersPageObj.openUsersPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open profile permissions page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on users page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on users page');
        //will open the users page
        await openUsersPageObj.openUsersPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the users page
        await openUsersPageObj.openUsersPage(driver, screenshotPath);
    }
});

//-----------------Case 1:Verify, the user is able to add a new another user with all details---------------------

When('the user adds new another user with the following data:',async function(dataTable) {
    try {
        await driver.sleep(1000);
        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        activeUsersCountBeforeAddingNewUser = activeUsers.length;
        console.log("Active users count before adding new user: " + activeUsersCountBeforeAddingNewUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //Deactive users length before adding new user
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeAddingNewUser = deactiveUsers.length;
        console.log("Deactive users count before adding new user: " + deactiveUsersCountBeforeAddingNewUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //Unconfirmed users length before adding new user
        unconfirmedUsersCountBeforeAddingNewUser = await driver.findElement(By.xpath('//a[@href="#/app/setup/security/users/unconfirmed"]')).getText();
        console.log("Unconfirmed users count before adding new user: " + unconfirmedUsersCountBeforeAddingNewUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //click on 'Add New User' button
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField');
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await formElementsObj.findElementById(driver,screenshotPath,'lastName','lastNameField');
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'mobile') {
                mobileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the mobile field is given or not
                if (mobileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the mobile field, the test case execution has been aborted');
                }

                //will find 'Mobile' field and pass the new data
                const mobileField = await formElementsObj.findElementById(driver,screenshotPath,'mobile','mobileField');
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(mobileFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'profile') {
                profileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile dropdown field is given or not
                if (profileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Profile' dropdown list
                await driver.sleep(500);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'profileId', profileFieldData, 'no');
            } else if (fieldName == 'ip restriction') {
                ipRestrictionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the ip restriction field is given or not
                if (ipRestrictionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the ip restriction field, the test case execution has been aborted');
                }

                //will find 'IP Restriction' field and pass the new data
                const ipRestrictionField = await formElementsObj.findElementById(driver,screenshotPath,'allowedLoginFrom','ipRestrictionField');
                await clearFieldDataObj.clearFieldData(ipRestrictionField);
                await ipRestrictionField.sendKeys(ipRestrictionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'role') {
                roleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required role dropdown field is given or not
                if (roleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required role dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Role' dropdown list
                await driver.sleep(500);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'roleData', roleFieldData, 'no');
            } else if (fieldName == 'nick name') {
                nickNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the nick name field is given or not
                if (nickNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the nick name field, the test case execution has been aborted');
                }

                //will find 'Nick Name' field and pass the new data
                const nickNameField = await formElementsObj.findElementById(driver,screenshotPath,'nickname','nickNameField');
                await clearFieldDataObj.clearFieldData(nickNameField);
                await nickNameField.sendKeys(nickNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date of birth') {
                dobFieldData = dataTable.rawTable[i][1];

                //will check that the data for the dob field is given or not
                if (dobFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date of birth field, the test case execution has been aborted');
                }

                //will find 'Date Of Birth' field and pass the new data
                const dobField = await formElementsObj.findElementById(driver,screenshotPath,'dateOfBirth','dobField');
                await clearFieldDataObj.clearFieldData(dobField);
                await dobField.sendKeys(dobFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date of anniversary') {
                dateOfAnniversaryFieldData = dataTable.rawTable[i][1];

                //will check that the data for the date of anniversary field is given or not
                if (dateOfAnniversaryFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date of anniversary field, the test case execution has been aborted');
                }

                //will find 'Date Of Anniversary' field and pass the new data
                const dateOfAnniversaryField = await formElementsObj.findElementById(driver,screenshotPath,'dateOfAnniversary','doaField');
                await clearFieldDataObj.clearFieldData(dateOfAnniversaryField);
                await dateOfAnniversaryField.sendKeys(dateOfAnniversaryFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone') {
                phoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the phone field is given or not
                if (phoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await formElementsObj.findElementById(driver,screenshotPath,'phoneNo','phoneField');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'extension') {
                extensionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the extension field is given or not
                if (extensionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the extension field, the test case execution has been aborted');
                }

                //will find 'Extension' field and pass the new data
                const extensionField = await formElementsObj.findElementById(driver,screenshotPath,'extensionNo','extensionField');
                await clearFieldDataObj.clearFieldData(extensionField);
                await extensionField.sendKeys(extensionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line1 field, the test case execution has been aborted');
                }

                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await formElementsObj.findElementById(driver,screenshotPath,'addressLine1','extensionField');
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line2') {
                addressLine2FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line2 field is given or not
                if (addressLine2FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const addressLine2Field = await formElementsObj.findElementById(driver,screenshotPath,'addressLine2','addressLine2Field');
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'area') {
                areaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the area field is given or not
                if (areaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the area field, the test case execution has been aborted');
                }

                //will find 'Area' field and pass the new data
                const areaField = await formElementsObj.findElementById(driver,screenshotPath,'area','areaField');
                await clearFieldDataObj.clearFieldData(areaField);
                await areaField.sendKeys(areaFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'city') {
                cityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the city field is given or not
                if (cityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the city field, the test case execution has been aborted');
                }

                //will find 'City' field and pass the new data
                const cityField = await formElementsObj.findElementById(driver,screenshotPath,'city','cityField');
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(cityFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'state') {
                stateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the state field is given or not
                if (stateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the state field, the test case execution has been aborted');
                }

                //will find 'State' field and pass the new data
                const stateField = await formElementsObj.findElementById(driver,screenshotPath,'state','stateField');
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(stateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'country') {
                countryFieldData = dataTable.rawTable[i][1];

                //will check that the data for the country dropdown field is given or not
                if (countryFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the country dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Country' dropdown list
                await driver.sleep(500);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'country', countryFieldData, 'yes');
            } else if (fieldName == 'zip code') {
                zipCodeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the zip code field is given or not
                if (zipCodeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the zip code field, the test case execution has been aborted');
                }

                //will find 'Zip Code' field and pass the new data
                const zipCodeField = await formElementsObj.findElementById(driver,screenshotPath,'zipCode','zipCodeField');
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(zipCodeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email signature') {
                emailSignatureFieldData = dataTable.rawTable[i][1];

                //will find email signature iFrame and then change focus on that
                const emailSignatureiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
                await driver.switchTo().frame(emailSignatureiFrame);

                //will find 'Email Signature' field and pass the data
                const emailSignatureField = await usersPageElementsObj.findEmailSignatureTextBox(driver);
                await emailSignatureField.clear();
                await emailSignatureField.sendKeys(emailSignatureFieldData);

                //will switch back to the main page
                await driver.switchTo().defaultContent();
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name,Last Name,Email,Mobile,Profile,Ip Restriction,Role,Nick Name,DOB,DOA,Phone,Extension,Address Line1,Address Line2,Area,City,State,Country,Zip Code,Email Signature fields only');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (firstNameFieldData == 'no' || lastNameFieldData == 'no' || emailFieldData == 'no' || mobileFieldData == 'no' || profileFieldData == 'no' || ipRestrictionFieldData == 'no' || roleFieldData == 'no' || nickNameFieldData == 'no' || dobFieldData == 'no' || dateOfAnniversaryFieldData == 'no' || phoneFieldData == 'no' || extensionFieldData == 'no' || addressLine1FieldData == 'no' || addressLine2FieldData == 'no' || areaFieldData == 'no' || cityFieldData == 'no' || stateFieldData == 'no' || countryFieldData == 'no' || zipCodeFieldData == 'no' || emailSignatureFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name,Last Name,Email,Mobile,Profile,Ip Restriction,Role,Nick Name,DOB,DOA,Phone,Extension,Address Line1,Address Line2,Area,City,State,Country,Zip Code,Email Signature');
        }
    }catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
    }
    console.log("New user added successfully with filling all fields data,so test case has been passed");
});

Then('Click on save button and verify {string} message and navigate to other page and verify user details',async function(expectedNotification) {
    try {
        await driver.sleep(1000);

        //get values of user details before navigation
        const actualFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        console.log("Newly created user details:");
        console.log("First Name: " + actualFirstNameData);
        const actualLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        console.log("Last Name: " + actualLastNameData);
        const actualEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        console.log("Email: " + actualEmailData);
        const actualMobileData = await driver.findElement(By.id('mobile')).getAttribute('value');
        console.log("Mobile: " + actualMobileData);
        const actualProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const actualProfileData = await actualProfileDropdown.getText();
        console.log("Profile: " + actualProfileData);
        const actualIPRestrictionData = await driver.findElement(By.id('allowedLoginFrom')).getAttribute('value');
        console.log("IP Restriction: " + actualIPRestrictionData);
        const actualRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const actualRoleData = await actualRoleDropdown.getText();
        console.log("Role: " + actualRoleData);
        const actualNickNameData = await driver.findElement(By.id('nickname')).getAttribute('value');
        console.log("Nick Name: " + actualNickNameData);
        const actualDOBData = await driver.findElement(By.id('dateOfBirth')).getAttribute('value');
        console.log("Date Of Birth: " + actualDOBData);
        const actualDOAData = await driver.findElement(By.id('dateOfAnniversary')).getAttribute('value');
        console.log("Date Of Anniversary: " + actualDOAData);
        const actualPhoneData = await driver.findElement(By.id('phoneNo')).getAttribute('value');
        console.log("Phone: " + actualPhoneData);
        const actualExtensionData = await driver.findElement(By.id('extensionNo')).getAttribute('value');
        console.log("Extension: " + actualExtensionData);
        const actualAddressLine1Data = await driver.findElement(By.id('addressLine1')).getAttribute('value');
        console.log("Address Line1: " + actualAddressLine1Data);
        const actualAddressLine2Data = await driver.findElement(By.id('addressLine2')).getAttribute('value');
        console.log("Address Line2: " + actualAddressLine2Data);
        const actualAreaData = await driver.findElement(By.id('area')).getAttribute('value');
        console.log("Area: " + actualAreaData);
        const actualCityData = await driver.findElement(By.id('city')).getAttribute('value');
        console.log("City: " + actualCityData);
        const actualStateData = await driver.findElement(By.id('state')).getAttribute('value');
        console.log("State: " + actualStateData);
        const actualCountryDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'country');
        const actualCountryData = await actualCountryDropdown.getText();
        console.log("Country: " + actualCountryData);
        const actualZipCodeData = await driver.findElement(By.id('zipCode')).getAttribute('value');
        console.log("Zip Code: " + actualZipCodeData);
        const actualEmailSignatureiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(actualEmailSignatureiFrame);
        //will find 'Email Signature' field and pass the data
        const actualEmailSignatureField = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const actualEmailSignatureData = await actualEmailSignatureField.getText();
        console.log("Email Signature: " + actualEmailSignatureData);
        await driver.switchTo().defaultContent();

        //click on save button
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);

        //verify notification message of 'User added successfully'
        const actualNotificationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activeUsersList.png');
        //get user details of users listing page
        const usersPageRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '1');
        console.log("Users page Role and Profile values:");
        console.log(usersPageRole);
        const usersPageProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '3')
        console.log(usersPageProfile);
        if (roleFieldData === usersPageRole && profileFieldData === usersPageProfile) {
            console.log("As role and profile of newly added user are matched with user details of users page,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As role and profile of newly added user are unmatched with user details of users page,test case has been aborted");
        }
        //click on specified user link
        await usersPageElementsObj.findUser(driver, 'Eshwari NL');
        await driver.sleep(3000);

        //get values of user details in quick view page
        const quickPageFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        const quickPageLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        const quickPageEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        const quickPageMobileData = await driver.findElement(By.id('mobile')).getAttribute('value');
        const quickPageProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const quickPageProfileData = await quickPageProfileDropdown.getText();
        const quickPageIPRestrictionData = await driver.findElement(By.id('allowedLoginFrom')).getAttribute('value');
        const quickPageRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const quickPageRoleData = await quickPageRoleDropdown.getText();
        const quickPageNickNameData = await driver.findElement(By.id('nickname')).getAttribute('value');
        const quickPageDOBData = await driver.findElement(By.id('dateOfBirth')).getAttribute('value');
        const quickPageDOAData = await driver.findElement(By.id('dateOfAnniversary')).getAttribute('value');
        const quickPagePhoneData = await driver.findElement(By.id('phoneNo')).getAttribute('value');
        const quickPageExtensionData = await driver.findElement(By.id('extensionNo')).getAttribute('value');
        const quickPageAddressLine1Data = await driver.findElement(By.id('addressLine1')).getAttribute('value');
        const quickPageAddressLine2Data = await driver.findElement(By.id('addressLine2')).getAttribute('value');
        const quickPageAreaData = await driver.findElement(By.id('area')).getAttribute('value');
        const quickPageCityData = await driver.findElement(By.id('city')).getAttribute('value');
        const quickPageStateData = await driver.findElement(By.id('state')).getAttribute('value');
        const quickPageCountryDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'country');
        const quickPageCountryData = await quickPageCountryDropdown.getText();
        const quickPageZipCodeData = await driver.findElement(By.id('zipCode')).getAttribute('value');

        //comparing newly created user details and quick page user details
        try {
            strictEqual(actualFirstNameData, quickPageFirstNameData);
            strictEqual(actualLastNameData, quickPageLastNameData);
            strictEqual(actualEmailData, quickPageEmailData);
            strictEqual(actualMobileData, quickPageMobileData);
            strictEqual(actualProfileData, quickPageProfileData);
            strictEqual(actualIPRestrictionData, quickPageIPRestrictionData);
            strictEqual(actualRoleData, quickPageRoleData);
            strictEqual(actualNickNameData, quickPageNickNameData);
            strictEqual(actualDOBData, quickPageDOBData);
            strictEqual(actualDOAData, quickPageDOAData);
            strictEqual(actualPhoneData, quickPagePhoneData);
            strictEqual(actualExtensionData, quickPageExtensionData);
            strictEqual(actualAddressLine1Data, quickPageAddressLine1Data);
            strictEqual(actualAddressLine2Data, quickPageAddressLine2Data);
            strictEqual(actualAreaData, quickPageAreaData);
            strictEqual(actualCityData, quickPageCityData);
            strictEqual(actualStateData, quickPageStateData);
            strictEqual(actualCountryData, quickPageCountryData);
            strictEqual(actualZipCodeData, quickPageZipCodeData);
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }

        //click on 'Edit' Button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(2000);

        //get values of user details after navigation
        const expectedFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        const expectedLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        const expectedEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        const expectedMobileData = await driver.findElement(By.id('mobile')).getAttribute('value');
        const expectedProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const expectedProfileData = await expectedProfileDropdown.getText();
        const expectedIPRestrictionData = await driver.findElement(By.id('allowedLoginFrom')).getAttribute('value');
        const expectedRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const expectedRoleData = await expectedRoleDropdown.getText();
        const expectedNickNameData = await driver.findElement(By.id('nickname')).getAttribute('value');
        const expectedDOBData = await driver.findElement(By.id('dateOfBirth')).getAttribute('value');
        const expectedDOAData = await driver.findElement(By.id('dateOfAnniversary')).getAttribute('value');
        const expectedPhoneData = await driver.findElement(By.id('phoneNo')).getAttribute('value');
        const expectedExtensionData = await driver.findElement(By.id('extensionNo')).getAttribute('value');
        const expectedAddressLine1Data = await driver.findElement(By.id('addressLine1')).getAttribute('value');
        const expectedAddressLine2Data = await driver.findElement(By.id('addressLine2')).getAttribute('value');
        const expectedAreaData = await driver.findElement(By.id('area')).getAttribute('value');
        const expectedCityData = await driver.findElement(By.id('city')).getAttribute('value');
        const expectedStateData = await driver.findElement(By.id('state')).getAttribute('value');
        const expectedCountryDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'country');
        const expectedCountryData = await expectedCountryDropdown.getText();
        const expectedZipCodeData = await driver.findElement(By.id('zipCode')).getAttribute('value');
        const expectedEmailSignatureiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(expectedEmailSignatureiFrame);
        //will find 'Email Signature' field and pass the data
        const expectedEmailSignatureField = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const expectedEmailSignatureData = await expectedEmailSignatureField.getText();
        await driver.switchTo().defaultContent();

        //comparing newly created user details and edit page user details
        try {
            strictEqual(actualFirstNameData, expectedFirstNameData);
            strictEqual(actualLastNameData, expectedLastNameData);
            strictEqual(actualEmailData, expectedEmailData);
            strictEqual(actualMobileData, expectedMobileData);
            strictEqual(actualProfileData, expectedProfileData);
            strictEqual(actualIPRestrictionData, expectedIPRestrictionData);
            strictEqual(actualRoleData, expectedRoleData);
            strictEqual(actualNickNameData, expectedNickNameData);
            strictEqual(actualDOBData, expectedDOBData);
            strictEqual(actualDOAData, expectedDOAData);
            strictEqual(actualPhoneData, expectedPhoneData);
            strictEqual(actualExtensionData, expectedExtensionData);
            strictEqual(actualAddressLine1Data, expectedAddressLine1Data);
            strictEqual(actualAddressLine2Data, expectedAddressLine2Data);
            strictEqual(actualAreaData, expectedAreaData);
            strictEqual(actualCityData, expectedCityData);
            strictEqual(actualStateData, expectedStateData);
            strictEqual(actualCountryData, expectedCountryData);
            strictEqual(actualZipCodeData, expectedZipCodeData);
            strictEqual(actualEmailSignatureData, expectedEmailSignatureData);
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }

        //close edit popup
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(1000);

        //close quick view page
        await usersPageElementsObj.findQuickPageCloseIcon(driver);

        //click on 'Unconfirmed Users' tab
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);

        //get values of newly added user from unconfirmed tab
        const unconfirmedUsersPageRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '1');
        console.log("Unconfirmed users page Email and Profile values:");
        console.log(unconfirmedUsersPageRole);
        const unconfirmedUsersPageProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '3')
        console.log(unconfirmedUsersPageProfile);
        console.log("email Data:" + emailFieldData);
        if (roleFieldData === unconfirmedUsersPageRole && profileFieldData === unconfirmedUsersPageProfile) {
            console.log("As role and profile of newly added user are matched with user details of unconfirmed users page,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As role and profile of newly added user are unmatched with user details of unconfirmed users page,test case has been aborted");
        }

        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
        //Active users length after adding new user
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterAddingNewUser = activeUserElements.length;
        console.log("Active users count after adding new user: " + activeUsersCountAfterAddingNewUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //Deactive users length after adding new user
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterAddingNewUser = deactiveUserElements.length;
        console.log("Deactive users count after adding new user: " + deactiveUsersCountBeforeAddingNewUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //Unconfirmed users length after adding new user
        const unconfirmedUsersCountAfterAddingNewUser = await driver.findElement(By.xpath('//a[@href="#/app/setup/security/users/unconfirmed"]')).getText();
        console.log("Unconfirmed users count after adding new user: " + unconfirmedUsersCountAfterAddingNewUser);
        //comparing active,deactivated and unconfirmed users count before and after adding new user
        if ((activeUsersCountBeforeAddingNewUser) + 1 === activeUsersCountAfterAddingNewUser && deactiveUsersCountBeforeAddingNewUser === deactiveUsersCountAfterAddingNewUser && unconfirmedUsersCountBeforeAddingNewUser !== unconfirmedUsersCountAfterAddingNewUser) {
            console.log("As active users count is (X+1),deactive users count is (X) and unconfirmed users count is (X+1) after adding new user,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As active users count is not increased by one user and unconfirmed users is also not increased  by one user after adding new user,so test case has been aborted");
        }
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 2:Verify, the user is able to add new another user with required details--------------------

When('the user adds new another user with required fields data only:',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        activeUsersCountBeforeAddingNewUser = activeUsers.length;
        console.log("Active users count before adding new user with required fields: " + activeUsersCountBeforeAddingNewUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //Deactive users length before adding new user
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeAddingNewUser = deactiveUsers.length;
        console.log("Deactive users count before adding new user with required fields: " + deactiveUsersCountBeforeAddingNewUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //Unconfirmed users length before adding new user
        unconfirmedUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        unconfirmedUsersCountBeforeAddingNewUser = unconfirmedUsers.length;
        console.log("Unconfirmed users count before adding new user with required fields: " + unconfirmedUsersCountBeforeAddingNewUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //click on 'Add New User' button
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField');
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await formElementsObj.findElementById(driver,screenshotPath,'lastName','lastNameField');
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'profile') {
                profileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile dropdown field is given or not
                if (profileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Profile' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'profileId', profileFieldData, 'no');
            } else if (fieldName == 'role') {
                roleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required role dropdown field is given or not
                if (roleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required role dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Role' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'roleData', roleFieldData, 'no');
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name,Last Name,Email,Profile,Role fields only');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (firstNameFieldData == 'no' || lastNameFieldData == 'no' || emailFieldData == 'no' || profileFieldData == 'no' || roleFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name,Last Name,Email,Profile,Role');
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'requiredFields_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("New user added successfully with filling required fields data,so test case has been passed");
});

Then('Click on save button and verify {string} notification and navigate to other page and verify user details',async function(expectedNotification) {
    try {
        await driver.sleep(1000);

        //get values of user details before navigation
        const actualFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        console.log("Newly created user details:");
        console.log("First Name: " + actualFirstNameData);
        const actualLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        console.log("Last Name: " + actualLastNameData);
        const actualEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        console.log("Email: " + actualEmailData);
        const actualProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const actualProfileData = await actualProfileDropdown.getText();
        console.log("Profile: " + actualProfileData);
        const actualRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const actualRoleData = await actualRoleDropdown.getText();
        console.log("Role: " + actualRoleData);
        //click on save button
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);

        //verify notification message of 'User added successfully'
        const actualNotificationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activeUsersListPage.png');

        //get user details of users listing page
        const usersPageRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '1');
        console.log("Users page Role and Profile values:");
        console.log(usersPageRole);
        const usersPageProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '3')
        console.log(usersPageProfile);
        if (roleFieldData === usersPageRole && profileFieldData === usersPageProfile) {
            console.log("As role and profile of newly added user are matched with user details of users page,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As role and profile of newly added user are unmatched with user details of users page,test case has been aborted");
        }
        //click on specified user link
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(3000);

        //get values of user details in quick view page
        const quickPageFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        const quickPageLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        const quickPageEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        const quickPageProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const quickPageProfileData = await quickPageProfileDropdown.getText();
        const quickPageRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const quickPageRoleData = await quickPageRoleDropdown.getText();
        //comparing newly created user details and quick page user details
        try {
            strictEqual(actualFirstNameData, quickPageFirstNameData);
            strictEqual(actualLastNameData, quickPageLastNameData);
            strictEqual(actualEmailData, quickPageEmailData);
            strictEqual(actualProfileData, quickPageProfileData);
            strictEqual(actualRoleData, quickPageRoleData);
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        //click on 'Edit' Button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(3000);

        //get values of user details after navigation
        const expectedFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        const expectedLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        const expectedEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        const expectedProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const expectedProfileData = await expectedProfileDropdown.getText();
        const expectedRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const expectedRoleData = await expectedRoleDropdown.getText();
        //comparing newly created user details and edit page user details
        try {
            strictEqual(actualFirstNameData, expectedFirstNameData);
            strictEqual(actualLastNameData, expectedLastNameData);
            strictEqual(actualEmailData, expectedEmailData);
            strictEqual(actualProfileData, expectedProfileData);
            strictEqual(actualRoleData, expectedRoleData);
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }

        //close edit popup
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(1000);

        //close quick view page
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(1000);

        //click on 'Unconfirmed Users' tab
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);

        //get values of newly added user from unconfirmed tab
        const unconfirmedUsersPageRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '1');
        console.log("Unconfirmed users page Role and Profile values:");
        console.log(unconfirmedUsersPageRole);
        const unconfirmedUsersPageProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, '3')
        console.log(unconfirmedUsersPageProfile);
        if (roleFieldData === unconfirmedUsersPageRole && profileFieldData === unconfirmedUsersPageProfile) {
            console.log("As role and profile of newly added user are matched with user details of unconfirmed users page,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As role and profile of newly added user are unmatched with user details of unconfirmed users page,test case has been aborted");
        }

        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(500);
        //Active users length after adding new user
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterAddingNewUser = activeUserElements.length;
        console.log("Active users count after adding new user with required fields: " + activeUsersCountAfterAddingNewUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(500);
        //Deactive users length after adding new user
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterAddingNewUser = deactiveUserElements.length;
        console.log("Deactive users count after adding new user with required fields: " + deactiveUsersCountBeforeAddingNewUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(500);
        //Unconfirmed users length after adding new user
        const unconfirmedUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const unconfirmedUsersCountAfterAddingNewUser = unconfirmedUserElements.length;
        console.log("Unconfirmed users count after adding new user with required fields: " + unconfirmedUsersCountAfterAddingNewUser);
        //comparing active,deactivated and unconfirmed users count before and after adding new user with required fields
        if ((activeUsersCountBeforeAddingNewUser) + 1 === activeUsersCountAfterAddingNewUser && deactiveUsersCountBeforeAddingNewUser === deactiveUsersCountAfterAddingNewUser && (unconfirmedUsersCountBeforeAddingNewUser) + 1 === unconfirmedUsersCountAfterAddingNewUser) {
            console.log("As active users count is (X+1),deactive users count is (X) and unconfirmed users count is (X+1) after adding new user with required fields,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As active users count is not increased by one user and unconfirmed users is also not increased by one user after adding new user with required fields,so test case has been aborted");
        }
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 3:Verify, the user is not able to leave required fields as blank while adding a new another user----------------------

When('the user leave required fields as blank:',async function(dataTable) {
    try {
        await driver.sleep(1000);
        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeAddingNewUserLength = activeUsers.length;
        console.log("Active users count before adding user with blank data: " + activeUsersBeforeAddingNewUserLength);

        //click on 'Add New User' button
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {

                    //will find 'First Name' field and pass the new data
                    const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField');
                    await clearFieldDataObj.clearFieldData(firstNameField);
                    await firstNameField.sendKeys(firstNameFieldData);
                    await driver.sleep(500);
                }
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {

                    //will find 'Last Name' field and pass the new data
                    const lastNameField = await formElementsObj.findElementById(driver,screenshotPath,'lastName','lastNameField');
                    await clearFieldDataObj.clearFieldData(lastNameField);
                    await lastNameField.sendKeys(lastNameFieldData);
                    await driver.sleep(500);
                }
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {

                    //will find 'Email' field and pass the new data
                    const emailField = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
                    await clearFieldDataObj.clearFieldData(emailField);
                    await emailField.sendKeys(emailFieldData);
                    await driver.sleep(500);
                }
            }
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string}, {string}, {string} validation message',async function(expectedFirstNameValidation,expectedLastNameValidation,expectedEmailValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
        //verifying 'First Name' validation message
        const firstNameValidation = await driver.findElement(By.xpath("//sm-input-txt[1]/sm-element/sm-validation-messages/div[@class='error-message text-danger']")).getText();
        strictEqual(firstNameValidation, expectedFirstNameValidation);

        //verifying 'Last Name' validation message
        const lastNameValidation = await driver.findElement(By.xpath("//sm-input-txt[2]/sm-element/sm-validation-messages/div[@class='error-message text-danger']")).getText();
        strictEqual(lastNameValidation, expectedLastNameValidation);

        //verifying 'Email' validation message
        const emailValidation = await driver.findElement(By.xpath("//sm-input-txt[3]/sm-element/sm-validation-messages/div[@class='error-message text-danger']")).getText();
        strictEqual(emailValidation, expectedEmailValidation);

        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(2000);

        //Active users length after closing edit page
        try {
            activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
            activeUsersAfterClosingEditPageLength = activeUsersCount.length;
            console.log("Active users count after closing edit page: " + activeUsersAfterClosingEditPageLength);

            //comparing both active users length,as required fields are not filled,the user should not be added
            if (activeUsersBeforeAddingNewUserLength === activeUsersAfterClosingEditPageLength) {
                console.log("As blank user details are not added,so the new record is not displayed,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await assert.fail("As number of active users before and after closing edit page are not equal,so test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 4:Verify, the user is not able to create a new another user with invalid data-----------------------

When('the user add a new user with invalid data:',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeAddingNewUserLength = activeUsers.length;
        console.log("Active users count before adding user with invalid data: " + activeUsersBeforeAddingNewUserLength);

        //click on 'Add New User' button
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField');
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await formElementsObj.findElementById(driver,screenshotPath,'lastName','lastNameField');
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify validation {string} message',async function(emailValidationMsg) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
        //verifying validation message
        const validationMessage = await usersPageElementsObj.findInvalidEmailValidation(driver);
        strictEqual(validationMessage, emailValidationMsg);
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(2000);
        //Active users length after closing edit page
        try {
            activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
            activeUsersAfterClosingEditPageLength = activeUsersCount.length;
            console.log("Active users count after closing edit page: " + activeUsersAfterClosingEditPageLength);
            //comparing both active users length,as user with invalid data fields are filled,the user should not be added
            if (activeUsersBeforeAddingNewUserLength === activeUsersAfterClosingEditPageLength) {
                console.log("As invalid user details are not added,so the new record is not displayed,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await assert.fail("As number of active users before and after closing edit page are not equal,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user enters exceed length of data',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeAddingNewUserLength = activeUsers.length;
        console.log("Active users count before adding user with exceed length validation: " + activeUsersBeforeAddingNewUserLength);

        //click on 'Add New User' button
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField');
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await formElementsObj.findElementById(driver,screenshotPath,'lastName','lastNameField');
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'mobile') {
                mobileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the mobile field is given or not
                if (mobileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the mobile field, the test case execution has been aborted');
                }

                //will find 'Mobile' field and pass the new data
                const mobileField = await formElementsObj.findElementById(driver,screenshotPath,'mobile','mobileField');
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(mobileFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'nick name') {
                nickNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the nick name field is given or not
                if (nickNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the nick name field, the test case execution has been aborted');
                }

                //will find 'Nick Name' field and pass the new data
                const nickNameField = await formElementsObj.findElementById(driver,screenshotPath,'nickname','nickNameField');
                await clearFieldDataObj.clearFieldData(nickNameField);
                await nickNameField.sendKeys(nickNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone') {
                phoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the phone field is given or not
                if (phoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await formElementsObj.findElementById(driver,screenshotPath,'phoneNo','phoneField');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'extension') {
                extensionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the extension field is given or not
                if (extensionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the extension field, the test case execution has been aborted');
                }

                //will find 'Extension' field and pass the new data
                const extensionField = await formElementsObj.findElementById(driver,screenshotPath,'extensionNo','extensionField');
                await clearFieldDataObj.clearFieldData(extensionField);
                await extensionField.sendKeys(extensionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line1 field, the test case execution has been aborted');
                }

                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await formElementsObj.findElementById(driver,screenshotPath,'addressLine1','addressLine1Field');
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line2') {
                addressLine2FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line2 field is given or not
                if (addressLine2FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const addressLine2Field = await formElementsObj.findElementById(driver,screenshotPath,'addressLine2','addressLine2Field');
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'area') {
                areaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the area field is given or not
                if (areaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the area field, the test case execution has been aborted');
                }

                //will find 'Area' field and pass the new data
                const areaField = await formElementsObj.findElementById(driver,screenshotPath,'area','areaField');
                await clearFieldDataObj.clearFieldData(areaField);
                await areaField.sendKeys(areaFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'city') {
                cityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the city field is given or not
                if (cityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the city field, the test case execution has been aborted');
                }

                //will find 'City' field and pass the new data
                const cityField = await formElementsObj.findElementById(driver,screenshotPath,'city','cityField');
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(cityFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'state') {
                stateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the state field is given or not
                if (stateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the state field, the test case execution has been aborted');
                }

                //will find 'State' field and pass the new data
                const stateField = await formElementsObj.findElementById(driver,screenshotPath,'state','stateField');
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(stateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'zip code') {
                zipCodeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the zip code field is given or not
                if (zipCodeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the zip code field, the test case execution has been aborted');
                }

                //will find 'Zip Code' field and pass the new data
                const zipCodeField = await formElementsObj.findElementById(driver,screenshotPath,'zipCode','zipCodeField');
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(zipCodeFieldData);
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name,Last Name,Mobile,Nick Name,Phone,Extension,Address Line1,Address Line2,Area,City,State,Zip Code fields only');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (firstNameFieldData == 'no' || lastNameFieldData == 'no' || mobileFieldData == 'no' || nickNameFieldData == 'no' || phoneFieldData == 'no' || extensionFieldData == 'no' || addressLine1FieldData == 'no' || addressLine2FieldData == 'no' || areaFieldData == 'no' || cityFieldData == 'no' || stateFieldData == 'no' || zipCodeFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name,Last Name,Mobile,Nick Name,Phone,Extension,Address Line1,Address Line2,Area,City,State,Zip Code');
        }
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}',async function(firstNameValidation,lastNameValidation,mobileValidation,nickNameValidation,phoneValidation,extensionValidation,addressLine1Validation,addressLine2Validation,areaValidation,cityValidation,stateValidation,zipCodeValidation) {
    try {
        //verify 'First Name' field validation message
        const firstNameValidationMsg = await usersPageElementsObj.findValidationMessage(driver, 1);
        strictEqual(firstNameValidationMsg, firstNameValidation);
        //verify 'Last Name' field validation message
        const lastNameValidationMsg = await usersPageElementsObj.findValidationMessage(driver, 2);
        strictEqual(lastNameValidationMsg, lastNameValidation);
        //verify 'Mobile' field validation message
        const mobileValidationMsg = await usersPageElementsObj.findValidationMessage(driver, 4);
        strictEqual(mobileValidationMsg, mobileValidation);
        //verify 'Nick Name' field validation message
        const nickNameValidationMsg = await usersPageElementsObj.findValidationMessage(driver, 6);
        strictEqual(nickNameValidationMsg, nickNameValidation);
        //verify 'Phone' field validation message
        const phoneValidationMsg = await usersPageElementsObj.findPhoneExtensionValidation(driver, 1);
        strictEqual(phoneValidationMsg, phoneValidation);
        //verify 'Extension' field validation message
        const extensionValidationMsg = await usersPageElementsObj.findPhoneExtensionValidation(driver, 2);
        strictEqual(extensionValidationMsg, extensionValidation);
        //verify 'Address Line1' field validation message
        const addressLine1ValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver, 1);
        strictEqual(addressLine1ValidationMsg, addressLine1Validation);
        //verify 'Address Line2' field validation message
        const addressLine2ValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver, 2);
        strictEqual(addressLine2ValidationMsg, addressLine2Validation);
        //verify 'Area' field validation message
        const areaValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver, 3);
        strictEqual(areaValidationMsg, areaValidation);
        //verify 'City' field validation message
        const cityValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver, 4);
        strictEqual(cityValidationMsg, cityValidation);
        //verify 'State' field validation message
        const stateValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver, 5);
        strictEqual(stateValidationMsg, stateValidation);
        //verify 'Zip Code' field validation message
        const zipCodeValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver, 6);
        strictEqual(zipCodeValidationMsg, zipCodeValidation);
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(2000);
        //Active users length after closing edit page
        try {
            activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
            activeUsersAfterClosingEditPageLength = activeUsersCount.length;
            console.log("Active users count after closing edit page: " + activeUsersAfterClosingEditPageLength);
            //comparing both active users length,as required fields are not filled,the user should not be added
            if (activeUsersBeforeAddingNewUserLength === activeUsersAfterClosingEditPageLength) {
                console.log("As exceed length of user details are not added,so the new record is not displayed,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await assert.fail("As number of active users before and after closing edit page are not equal,so test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 5:Verify, the user is not able to add another user with duplicate email address----------------------

When('the user enters duplicate email address',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeAddingNewUserLength = activeUsers.length;
        console.log("Active users count before adding user with duplicate email: " + activeUsersBeforeAddingNewUserLength);

        //click on 'Add New User' button
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField');
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await formElementsObj.findElementById(driver,screenshotPath,'lastName','lastNameField');
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'emailField_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} validation message',async function(duplicateEmailValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
        const duplicateEmailValidationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(duplicateEmailValidationMsg, duplicateEmailValidation);
        await driver.sleep(1000);
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(2000);
        //Active users length after closing edit page
        try {
            activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
            activeUsersAfterClosingEditPageLength = activeUsersCount.length;
            console.log("Active users count after closing edit page: " + activeUsersAfterClosingEditPageLength);
            //comparing both active users length,as required fields are not filled,the user should not be added
            if (activeUsersBeforeAddingNewUserLength === activeUsersAfterClosingEditPageLength) {
                console.log("As duplicate email user details are not added,so the new record is not displayed,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await assert.fail("As number of active users before and after closing edit page are not equal,so test case has been aborted");
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'duplicateMailCase_Failed.png');
            await driver.navigate().refresh();
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------- Case:6,7 (http://testrails.rapidops.com/index.php?/cases/view/13706,13707) ----------------------

When('the system shows all profiles on the profile dropdown list',async function() {
    try {
        await driver.sleep(1000);

        //click on profile dropdown list elements
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(2000);
        await usersPageElementsObj.findProfileListDropdown(driver);
        await driver.sleep(1000);
        //get profile dropdown elements length
        const profileDropdownElements = await driver.findElements(By.xpath('//ul[@class="select2-results__options"]//li'));
        const profileDropdownLength = await profileDropdownElements.length;
        console.log(profileDropdownLength);
        console.log("Profile Names List in profile dropdown from add user page:");
        for (let i = 0; i < profileDropdownLength; i++) {
            const profileDropdownList = await profileDropdownElements[i].getText();
            console.log(profileDropdownList);
        }
        await usersPageElementsObj.findEditPageCloseButton(driver);
        //navigate to profile names in profile permissions page
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Profile Permissions' tab
        const profilePermissionsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Profile Permissions ');
        //will set focus on the 'Profile Permissions' tab
        await driver.executeScript("arguments[0].scrollIntoView();", profilePermissionsTab[0]);
        await driver.wait(until.elementIsVisible(profilePermissionsTab[0]));
        //will click on the 'Profile Permissions' tab
        await profilePermissionsTab[0].click();
        await driver.sleep(1000);

        //verifying profile names in profile permissions page
        const profileNameElements = await driver.findElements(By.xpath("//table//td[1]"));
        const profileNameLength = await profileNameElements.length;
        console.log(profileNameLength);
        console.log("Profile Names List in profile permissions page:");
        for (let i = 0; i < profileNameLength; i++) {
            const profileNamesList = await profileNameElements[i].getText();
            console.log(profileNamesList);
        }
        try {
            if (profileDropdownLength === profileNameLength) {
                console.log("As profile dropdown in add users page and profile names in profile permissions page lengths are equal,test case has been passed");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'profilesList_NotFound.png');
                await driver.navigate().refresh();
                await assert.fail("As profile dropdown in add users page and profile names in profile permissions page lengths are not matched,test case has been failed");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        console.log("As profile dropdown of add users page and profile names in profile permissions page contains same profile names,test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the system shows all roles on the roles dropdown list',async function() {
    try {
        await driver.sleep(1000);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Profile Permissions' tab
        const usersTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Users ');
        //will set focus on the 'Profile Permissions' tab
        await driver.executeScript("arguments[0].scrollIntoView();", usersTab[0]);
        await driver.wait(until.elementIsVisible(usersTab[0]));
        //will click on the 'Profile Permissions' tab
        await usersTab[0].click();
        await driver.sleep(1000);

        //click on 'Add new user' button
        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        //click on roles dropdown list elements
        await usersPageElementsObj.findRolesListDropdown(driver);
        await driver.sleep(1000);
        //get roles dropdown elements length
        const rolesDropdownElements = await driver.findElements(By.xpath('//ul[@class="select2-results__options"]//li'));
        const rolesDropdownLength = await rolesDropdownElements.length;
        console.log(rolesDropdownLength);
        console.log("Profile Names List in profile dropdown from add user page:");
        for (let i = 0; i < rolesDropdownLength; i++) {
            const rolesDropdownList = await rolesDropdownElements[i].getText();
            console.log(rolesDropdownList);
        }
        await usersPageElementsObj.findEditPageCloseButton(driver);
        //navigate to profile names in security roles page
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the ' Security Roles' tab
        const securityRolesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Security Roles ');
        //will set focus on the 'Security Roles' tab
        await driver.executeScript("arguments[0].scrollIntoView();", securityRolesTab[0]);
        await driver.wait(until.elementIsVisible(securityRolesTab[0]));
        //will click on the 'Security Roles' tab
        await securityRolesTab[0].click();
        await driver.sleep(1000);

        //verifying profile names in profile permissions page
        const securityRolesElements = await driver.findElements(By.xpath("//span[@class='treeview-label']"));
        const securityRolesLength = await securityRolesElements.length;
        console.log(securityRolesLength);
        console.log("Roles Names List in security roles page:");
        for (let i = 0; i < securityRolesLength; i++) {
            const securityRolesNamesList = await securityRolesElements[i].getText();
            console.log(securityRolesNamesList);
        }
        try {
            if (rolesDropdownLength === securityRolesLength) {
                console.log("As roles dropdown in add users page and roles names in security roles page lengths are equal,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'rolesList_NotFound.png');
                await assert.fail("As roles dropdown in add users page and roles names in security roles page lengths are not matched,test case has been failed");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        console.log("As roles dropdown of add users page and roles names in security roles page contains same profile names,test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------Case 8:Verify, the user is able to search users--------------------------------------------

When('the user is able to search users from active users tab,deactivated users tab and unconfirmed users tab and verify message on each tab',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'active user') {
                activeUserData = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (activeUserData == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }
                //searching for 'Active User' in 'Active Users' tab and pass the new data
                const searchBoxField = await usersPageElementsObj.findSearchBox(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(activeUserData);
                await driver.sleep(500);

                //getting value of search box
                const searchBoxName = await driver.findElement(By.xpath('//form//input[@placeholder="Search User"]')).getAttribute('value');
                console.log(searchBoxName);

                //getting value of name
                const activeUserName = await driver.findElement(By.xpath('//a[@class="entity-show-link text-ellipsis"]')).getText();
                console.log(activeUserName);

                //compare 'Search box Name' and 'Active User Name'
                if (activeUserName.includes(searchBoxName)) {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + 'activeSearchRecordFound.png');
                    console.log("As user record which contain searched chars is displayed in active users tab,so test case has been passed");
                } else {
                    await assert.fail("As user record which contain searched chars is not displayed,so test case has been aborted");
                }
            } else if (fieldName == 'non-existing active user') {
                activeNonExistingUser = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (activeNonExistingUser == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }

                //searching for 'Non-Existing Active User' in 'Active Users' tab and pass the new data
                const searchBoxField = await usersPageElementsObj.findSearchBox(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(activeNonExistingUser);
                await driver.sleep(500);

                //verification of 'No Rows To Show' message in active users tab
                const noRowValidationMsg = await usersPageElementsObj.findNoRowsValidation(driver);
                strictEqual(noRowValidationMsg, 'No Rows To Show');
            } else if (fieldName == 'deactive user') {
                deactiveUserData = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (deactiveUserData == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }

                const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
                await deactivateUsersTab.click();
                await driver.sleep(500);
                //searching for 'Deactive User' in 'Deactive Users' tab and pass the new data
                const searchBoxField = await usersPageElementsObj.findSearchBox(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(deactiveUserData);
                await driver.sleep(500);

                //getting value of search box
                const searchBoxName = await driver.findElement(By.xpath('//form//input[@placeholder="Search User"]')).getAttribute('value');
                console.log(searchBoxName);

                //getting value of name
                const activeUserName = await driver.findElement(By.xpath('//a[@class="entity-show-link text-ellipsis"]')).getText();
                console.log(activeUserName);

                //compare 'Search box Name' and 'Deactive User Name'
                if (activeUserName.includes(searchBoxName)) {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + 'deactiveSearchRecordFound.png');
                    console.log("As user record which contain searched chars is displayed in deactive users tab,so test case has been passed");
                } else {
                    await assert.fail("As user record which contain searched chars is not displayed in deactive users tab,so test case has been aborted");
                }
            } else if (fieldName == 'non-existing deactive user') {
                deactiveNonExistingUser = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (deactiveNonExistingUser == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }

                //searching for 'Non-Existing Deactive User' in 'Deactive Users' tab and pass the new data
                const searchBoxField = await usersPageElementsObj.findSearchBox(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(deactiveNonExistingUser);
                await driver.sleep(500);

                //verification of 'No Rows To Show' message in 'Deactive Users' tab
                const noRowValidationMsg = await usersPageElementsObj.findNoRowsValidation(driver);
                strictEqual(noRowValidationMsg, 'No Rows To Show');
            } else if (fieldName == 'unconfirmed user') {
                unconfirmedUserData = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (unconfirmedUserData == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }

                await usersPageElementsObj.findUnconfirmedUsersTab(driver);
                await driver.sleep(500);
                //searching for 'Unconfirmed User' in 'Unconfirmed Users' tab and pass the new data
                const searchBoxField = await usersPageElementsObj.findSearchBox(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(unconfirmedUserData);
                await driver.sleep(500);

                //getting value of search box
                const searchBoxName = await driver.findElement(By.xpath('//form//input[@placeholder="Search User"]')).getAttribute('value');
                console.log(searchBoxName);

                //getting value of name
                const activeUserName = await driver.findElement(By.xpath('//a[@class="entity-show-link text-ellipsis"]')).getText();
                console.log(activeUserName);

                //compare 'Search box Name' and 'Unconfirmed User Name'
                if (activeUserName.includes(searchBoxName)) {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + 'unconfirmedSearchRecordFound.png');
                    console.log("As user record which contain searched chars is displayed in unconfirmed users tab,so test case has been passed");
                } else {
                    await assert.fail("As user record which contain searched chars is not displayed in unconfirmed users tab,so test case has been aborted");
                }
            } else if (fieldName == 'non-existing unconfirmed user') {
                unconfirmedNonExistingUser = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (unconfirmedNonExistingUser == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }

                //searching for 'Unconfirmed User' in 'Unconfirmed Users' tab and pass the new data
                const searchBoxField = await usersPageElementsObj.findSearchBox(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(unconfirmedNonExistingUser);
                await driver.sleep(500);

                //verification of 'No Rows To Show' message in 'Unconfirmed Users' tab
                const noRowValidationMsg = await usersPageElementsObj.findNoRowsValidation(driver);
                strictEqual(noRowValidationMsg, 'No Rows To Show');
            }
        }
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'searchCase_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 9:Verify, the user is able to update user with all details------------------------------

When('the user updates new another user with the following data:',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Bhanu VG'] ")).getText();
        console.log("User Name: " + userName);
        //click on user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(3000);
        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Edit' button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(3000);
        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const editUserPage = await driver.findElements(By.xpath('//h4[text()="Edit User"]'));
        const editUserPageLength = await editUserPage.length;
        if (editUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As edit user page is opened,test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await driver.navigate().refresh();
            await assert.fail("As edit user page is not opened,test case has been aborted");
        }
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findEditPageFirstNameField(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findEditPageLastNameField(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await usersPageElementsObj.findEditPageEmailField(driver);
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'mobile') {
                mobileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the mobile field is given or not
                if (mobileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the mobile field, the test case execution has been aborted');
                }

                //will find 'Mobile' field and pass the new data
                const mobileField = await usersPageElementsObj.findEditPageMobileField(driver);
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(mobileFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'profile') {
                profileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile dropdown field is given or not
                if (profileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Profile' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-select-box[1]/sm-element/div/span//span[@role='combobox']/span[@role='textbox']")).click();
                await driver.findElement(By.xpath(`//li[text()='${profileFieldData}']`)).click();
            } else if (fieldName == 'ip restriction') {
                ipRestrictionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the ip restriction field is given or not
                if (ipRestrictionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the ip restriction field, the test case execution has been aborted');
                }

                //will find 'IP Restriction' field and pass the new data
                const ipRestrictionField = await usersPageElementsObj.findEditPageIPRestrictionField(driver);
                await clearFieldDataObj.clearFieldData(ipRestrictionField);
                await ipRestrictionField.sendKeys(ipRestrictionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'role') {
                roleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required role dropdown field is given or not
                if (roleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required role dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Role' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-select-box[2]/sm-element/div/span//span[@role='combobox']/span[@role='textbox']")).click();
                await driver.findElement(By.xpath(`//li[text()='${roleFieldData}']`)).click();
            } else if (fieldName == 'nick name') {
                nickNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the nick name field is given or not
                if (nickNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the nick name field, the test case execution has been aborted');
                }

                //will find 'Nick Name' field and pass the new data
                const nickNameField = await usersPageElementsObj.findEditPageNickNameField(driver);
                await clearFieldDataObj.clearFieldData(nickNameField);
                await nickNameField.sendKeys(nickNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date of birth') {
                dobFieldData = dataTable.rawTable[i][1];

                //will check that the data for the dob field is given or not
                if (dobFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date of birth field, the test case execution has been aborted');
                }

                //will find 'Date Of Birth' field and pass the new data
                const dobField = await usersPageElementsObj.findEditPageDOBField(driver);
                await clearFieldDataObj.clearFieldData(dobField);
                await dobField.sendKeys(dobFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date of anniversary') {
                dateOfAnniversaryFieldData = dataTable.rawTable[i][1];

                //will check that the data for the date of anniversary field is given or not
                if (dateOfAnniversaryFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date of anniversary field, the test case execution has been aborted');
                }

                //will find 'Date Of Anniversary' field and pass the new data
                const dateOfAnniversaryField = await usersPageElementsObj.findEditPageDateOfAnniversaryField(driver);
                await clearFieldDataObj.clearFieldData(dateOfAnniversaryField);
                await dateOfAnniversaryField.sendKeys(dateOfAnniversaryFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone') {
                phoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the phone field is given or not
                if (phoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await usersPageElementsObj.findEditPagePhoneField(driver);
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'extension') {
                extensionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the extension field is given or not
                if (extensionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the extension field, the test case execution has been aborted');
                }

                //will find 'Extension' field and pass the new data
                const extensionField = await usersPageElementsObj.findEditPageExtensionField(driver);
                await clearFieldDataObj.clearFieldData(extensionField);
                await extensionField.sendKeys(extensionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line1 field, the test case execution has been aborted');
                }

                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await usersPageElementsObj.findEditPageAddressLine1Field(driver);
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line2') {
                addressLine2FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line2 field is given or not
                if (addressLine2FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const addressLine2Field = await usersPageElementsObj.findEditPageAddressLine2Field(driver);
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'area') {
                areaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the area field is given or not
                if (areaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the area field, the test case execution has been aborted');
                }

                //will find 'Area' field and pass the new data
                const areaField = await usersPageElementsObj.findEditPageAreaField(driver);
                await clearFieldDataObj.clearFieldData(areaField);
                await areaField.sendKeys(areaFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'city') {
                cityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the city field is given or not
                if (cityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the city field, the test case execution has been aborted');
                }

                //will find 'City' field and pass the new data
                const cityField = await usersPageElementsObj.findEditPageCityField(driver);
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(cityFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'state') {
                stateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the state field is given or not
                if (stateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the state field, the test case execution has been aborted');
                }

                //will find 'State' field and pass the new data
                const stateField = await usersPageElementsObj.findEditPageStateField(driver);
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(stateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'country') {
                countryFieldData = dataTable.rawTable[i][1];

                //will check that the data for the country dropdown field is given or not
                if (countryFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the country dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Country' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form/div/div/sm-form-creator/div/div[4]/div[@class='row']/sm-select-box/sm-element//span[@role='combobox']/span[@role='textbox']")).click();
                await driver.findElement(By.xpath(`//li[text()='${countryFieldData}']`)).click();
            } else if (fieldName == 'zip code') {
                zipCodeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the zip code field is given or not
                if (zipCodeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the zip code field, the test case execution has been aborted');
                }

                //will find 'Zip Code' field and pass the new data
                const zipCodeField = await usersPageElementsObj.findEditPageZipCodeField(driver);
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(zipCodeFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email signature') {
                emailSignatureFieldData = dataTable.rawTable[i][1];

                //will find email signature iFrame and then change focus on that
                const emailSignatureiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
                await driver.switchTo().frame(emailSignatureiFrame);

                //will find 'Email Signature' field and pass the data
                const emailSignatureField = await usersPageElementsObj.findEmailSignatureTextBox(driver);
                await emailSignatureField.clear();
                await emailSignatureField.sendKeys(emailSignatureFieldData);
                await driver.sleep(2000);
                //will switch back to the main page
                await driver.switchTo().defaultContent();
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name,Last Name,Email,Mobile,Profile,Ip Restriction,Role,Nick Name,DOB,DOA,Phone,Extension,Address Line1,Address Line2,Area,City,State,Country,Zip Code,Email Signature fields only');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (firstNameFieldData == 'no' || lastNameFieldData == 'no' || emailFieldData == 'no' || mobileFieldData == 'no' || profileFieldData == 'no' || ipRestrictionFieldData == 'no' || roleFieldData == 'no' || nickNameFieldData == 'no' || dobFieldData == 'no' || dateOfAnniversaryFieldData == 'no' || phoneFieldData == 'no' || extensionFieldData == 'no' || addressLine1FieldData == 'no' || addressLine2FieldData == 'no' || areaFieldData == 'no' || cityFieldData == 'no' || stateFieldData == 'no' || countryFieldData == 'no' || zipCodeFieldData == 'no' || emailSignatureFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name,Last Name,Email,Mobile,Profile,Ip Restriction,Role,Nick Name,DOB,DOA,Phone,Extension,Address Line1,Address Line2,Area,City,State,Country,Zip Code,Email Signature');
        }
        console.log("User updated successfully with filling all fields data,so test case has been passed");
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} message and navigate to other page and verify user details',async function(expectedNotification) {
    try {
        await driver.sleep(1000);

        //get values of user details before navigation
        const actualFirstName = await usersPageElementsObj.findEditPageFirstNameField(driver);
        const actualFirstNameData = await actualFirstName.getAttribute('value');
        const actualLastName = await usersPageElementsObj.findEditPageLastNameField(driver);
        const actualLastNameData = await actualLastName.getAttribute('value');
        const actualEmail = await usersPageElementsObj.findEditPageEmailField(driver);
        const actualEmailData = await actualEmail.getAttribute('value');
        const actualMobile = await usersPageElementsObj.findEditPageMobileField(driver);
        const actualMobileData = await actualMobile.getAttribute('value');
        const actualProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const actualProfileData = await actualProfileDropdown.getText();
        const actualIPRestriction = await usersPageElementsObj.findEditPageIPRestrictionField(driver);
        const actualIPRestrictionData = await actualIPRestriction.getAttribute('value');
        const actualRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const actualRoleData = await actualRoleDropdown.getText();
        const actualNickName = await usersPageElementsObj.findEditPageNickNameField(driver);
        const actualNickNameData = await actualNickName.getAttribute('value');
        const actualDOB = await usersPageElementsObj.findEditPageDOBField(driver);
        const actualDOBData = await actualDOB.getAttribute('value');
        const actualDOA = await usersPageElementsObj.findEditPageDateOfAnniversaryField(driver);
        const actualDOAData = await actualDOA.getAttribute('value');
        const actualPhone = await usersPageElementsObj.findEditPagePhoneField(driver);
        const actualPhoneData = await actualPhone.getAttribute('value');
        const actualExtension = await usersPageElementsObj.findEditPageExtensionField(driver);
        const actualExtensionData = await actualExtension.getAttribute('value');
        const actualAddressLine1 = await usersPageElementsObj.findEditPageAddressLine1Field(driver);
        const actualAddressLine1Data = await actualAddressLine1.getAttribute('value');
        const actualAddressLine2 = await usersPageElementsObj.findEditPageAddressLine2Field(driver);
        const actualAddressLine2Data = await actualAddressLine2.getAttribute('value');
        const actualArea = await usersPageElementsObj.findEditPageAreaField(driver);
        const actualAreaData = await actualArea.getAttribute('value');
        const actualCity = await usersPageElementsObj.findEditPageCityField(driver);
        const actualCityData = await actualCity.getAttribute('value');
        const actualState = await usersPageElementsObj.findEditPageStateField(driver);
        const actualStateData = await actualState.getAttribute('value');
        const actualZipCode = await usersPageElementsObj.findEditPageZipCodeField(driver);
        const actualZipCodeData = await actualZipCode.getAttribute('value');
        const actualEmailSignatureiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(actualEmailSignatureiFrame);
        //will find 'Email Signature' field and pass the data
        const actualEmailSignatureField = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const actualEmailSignatureData = await actualEmailSignatureField.getText();
        await driver.switchTo().defaultContent();

        //click on save button
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);

        //verify notification message of 'User added successfully'
        const actualNotificationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);

        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(500);
        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activeUsersList.png');
        //get user details of users listing page
        const usersPageRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 1);
        console.log("Users page Role and Profile values:");
        console.log(usersPageRole);
        const usersPageProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 3);
        console.log(usersPageProfile);
        if (roleFieldData === usersPageRole && profileFieldData === usersPageProfile) {
            console.log("As role and profile of updated user are matched with user details of users page,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As role and profile of updated user are unmatched with user details of users page,test case has been aborted");
        }
        //click on specified user link
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(3000);

        //get values of user details in quick view page
        const quickPageFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        const quickPageLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        const quickPageEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        const quickPageMobileData = await driver.findElement(By.id('mobile')).getAttribute('value');
        const quickPageProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const quickPageProfileData = await quickPageProfileDropdown.getText();
        const quickPageIPRestrictionData = await driver.findElement(By.id('allowedLoginFrom')).getAttribute('value');
        const quickPageRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const quickPageRoleData = await quickPageRoleDropdown.getText();
        const quickPageNickNameData = await driver.findElement(By.id('nickname')).getAttribute('value');
        const quickPageDOBData = await driver.findElement(By.id('dateOfBirth')).getAttribute('value');
        const quickPageDOAData = await driver.findElement(By.id('dateOfAnniversary')).getAttribute('value');
        const quickPagePhoneData = await driver.findElement(By.id('phoneNo')).getAttribute('value');
        const quickPageExtensionData = await driver.findElement(By.id('extensionNo')).getAttribute('value');
        const quickPageAddressLine1Data = await driver.findElement(By.id('addressLine1')).getAttribute('value');
        const quickPageAddressLine2Data = await driver.findElement(By.id('addressLine2')).getAttribute('value');
        const quickPageAreaData = await driver.findElement(By.id('area')).getAttribute('value');
        const quickPageCityData = await driver.findElement(By.id('city')).getAttribute('value');
        const quickPageStateData = await driver.findElement(By.id('state')).getAttribute('value');
        const quickPageZipCodeData = await driver.findElement(By.id('zipCode')).getAttribute('value');

        //comparing newly created user details and quick page user details
        try {
            strictEqual(actualFirstNameData, quickPageFirstNameData);
            strictEqual(actualLastNameData, quickPageLastNameData);
            strictEqual(actualEmailData, quickPageEmailData);
            strictEqual(actualMobileData, quickPageMobileData);
            strictEqual(actualProfileData, quickPageProfileData);
            strictEqual(actualIPRestrictionData, quickPageIPRestrictionData);
            strictEqual(actualRoleData, quickPageRoleData);
            strictEqual(actualNickNameData, quickPageNickNameData);
            strictEqual(actualDOBData, quickPageDOBData);
            strictEqual(actualDOAData, quickPageDOAData);
            strictEqual(actualPhoneData, quickPagePhoneData);
            strictEqual(actualExtensionData, quickPageExtensionData);
            strictEqual(actualAddressLine1Data, quickPageAddressLine1Data);
            strictEqual(actualAddressLine2Data, quickPageAddressLine2Data);
            strictEqual(actualAreaData, quickPageAreaData);
            strictEqual(actualCityData, quickPageCityData);
            strictEqual(actualStateData, quickPageStateData);
            strictEqual(actualZipCodeData, quickPageZipCodeData);
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }

        //click on 'Edit' Button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(3000);

        //get values of user details after navigation
        const expectedFirstName = await usersPageElementsObj.findEditPageFirstNameField(driver);
        const expectedFirstNameData = await expectedFirstName.getAttribute('value');
        const expectedLastName = await usersPageElementsObj.findEditPageLastNameField(driver);
        const expectedLastNameData = await expectedLastName.getAttribute('value');
        const expectedEmail = await usersPageElementsObj.findEditPageEmailField(driver);
        const expectedEmailData = await expectedEmail.getAttribute('value');
        const expectedMobile = await usersPageElementsObj.findEditPageMobileField(driver);
        const expectedMobileData = await expectedMobile.getAttribute('value');
        const expectedProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const expectedProfileData = await expectedProfileDropdown.getText();
        const expectedIPRestriction = await usersPageElementsObj.findEditPageIPRestrictionField(driver);
        const expectedIPRestrictionData = await expectedIPRestriction.getAttribute('value');
        const expectedRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const expectedRoleData = await expectedRoleDropdown.getText();
        const expectedNickName = await usersPageElementsObj.findEditPageNickNameField(driver);
        const expectedNickNameData = await expectedNickName.getAttribute('value');
        const expectedDOB = await usersPageElementsObj.findEditPageDOBField(driver);
        const expectedDOBData = await expectedDOB.getAttribute('value');
        const expectedDOA = await usersPageElementsObj.findEditPageDateOfAnniversaryField(driver);
        const expectedDOAData = await expectedDOA.getAttribute('value');
        const expectedPhone = await usersPageElementsObj.findEditPagePhoneField(driver);
        const expectedPhoneData = await expectedPhone.getAttribute('value');
        const expectedExtension = await usersPageElementsObj.findEditPageExtensionField(driver);
        const expectedExtensionData = await expectedExtension.getAttribute('value');
        const expectedAddressLine1 = await usersPageElementsObj.findEditPageAddressLine1Field(driver);
        const expectedAddressLine1Data = await expectedAddressLine1.getAttribute('value');
        const expectedAddressLine2 = await usersPageElementsObj.findEditPageAddressLine2Field(driver);
        const expectedAddressLine2Data = await expectedAddressLine2.getAttribute('value');
        const expectedArea = await usersPageElementsObj.findEditPageAreaField(driver);
        const expectedAreaData = await expectedArea.getAttribute('value');
        const expectedCity = await usersPageElementsObj.findEditPageCityField(driver);
        const expectedCityData = await expectedCity.getAttribute('value');
        const expectedState = await usersPageElementsObj.findEditPageStateField(driver);
        const expectedStateData = await expectedState.getAttribute('value');
        const expectedZipCode = await usersPageElementsObj.findEditPageZipCodeField(driver);
        const expectedZipCodeData = await expectedZipCode.getAttribute('value');
        const expectedEmailSignatureiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(expectedEmailSignatureiFrame);
        //will find 'Email Signature' field and pass the data
        const expectedEmailSignatureField = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const expectedEmailSignatureData = await expectedEmailSignatureField.getText();
        await driver.switchTo().defaultContent();

        //comparing newly created user details and edit page user details
        try {
            strictEqual(actualFirstNameData, expectedFirstNameData);
            strictEqual(actualLastNameData, expectedLastNameData);
            strictEqual(actualEmailData, expectedEmailData);
            strictEqual(actualMobileData, expectedMobileData);
            strictEqual(actualProfileData, expectedProfileData);
            strictEqual(actualIPRestrictionData, expectedIPRestrictionData);
            strictEqual(actualRoleData, expectedRoleData);
            strictEqual(actualNickNameData, expectedNickNameData);
            strictEqual(actualDOBData, expectedDOBData);
            strictEqual(actualDOAData, expectedDOAData);
            strictEqual(actualPhoneData, expectedPhoneData);
            strictEqual(actualExtensionData, expectedExtensionData);
            strictEqual(actualAddressLine1Data, expectedAddressLine1Data);
            strictEqual(actualAddressLine2Data, expectedAddressLine2Data);
            strictEqual(actualAreaData, expectedAreaData);
            strictEqual(actualCityData, expectedCityData);
            strictEqual(actualStateData, expectedStateData);
            strictEqual(actualZipCodeData, expectedZipCodeData);
            strictEqual(actualEmailSignatureData, expectedEmailSignatureData);
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }

        //close edit popup
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(500);

        //close quick view page
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(500);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 10: Verify, the user is able to update user with required details-------------------------

When('the user update user with required details:',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //get user name that is added through all fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Eshwari NL'] ")).getText();
        console.log("User Name: " + userName);
        //click on user added through all fields
        await usersPageElementsObj.findUser(driver, 'Eshwari NL');

        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected all fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As specified user of quick page is not opened,so test case has been aborted");
        }

        //click on 'Edit' button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const editUserPage = await driver.findElements(By.xpath('//h4[text()="Edit User"]'));
        const editUserPageLength = await editUserPage.length;
        if (editUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As edit user page is opened,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As edit user page is not opened,test case has been aborted");
        }

        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findEditPageFirstNameField(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findEditPageLastNameField(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await usersPageElementsObj.findEditPageEmailField(driver);
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'profile') {
                profileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required profile dropdown field is given or not
                if (profileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required profile dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Profile' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-select-box[1]/sm-element/div/span//span[@role='combobox']/span[@role='textbox']")).click();
                await driver.findElement(By.xpath(`//li[text()='${profileFieldData}']`)).click();
            } else if (fieldName == 'role') {
                roleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required role dropdown field is given or not
                if (roleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required role dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Role' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-select-box[2]/sm-element/div/span//span[@role='combobox']/span[@role='textbox']")).click();
                await driver.findElement(By.xpath(`//li[text()='${roleFieldData}']`)).click();
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name,Last Name,Email,Profile,Role fields only');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (firstNameFieldData == 'no' || lastNameFieldData == 'no' || emailFieldData == 'no' || profileFieldData == 'no' || roleFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name,Last Name,Email,Profile,Role');
        }
        console.log("User updated successfully with filling required fields data,so test case has been passed");
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} notification and navigate to other page and verify user details',async function(expectedNotification) {
    try {
        await driver.sleep(1000);

        //get values of user details before navigation
        const actualFirstName = await usersPageElementsObj.findEditPageFirstNameField(driver);
        const actualFirstNameData = await actualFirstName.getAttribute('value');
        const actualLastName = await usersPageElementsObj.findEditPageLastNameField(driver);
        const actualLastNameData = await actualLastName.getAttribute('value');
        const actualEmail = await usersPageElementsObj.findEditPageEmailField(driver);
        const actualEmailData = await actualEmail.getAttribute('value');
        const actualProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const actualProfileData = await actualProfileDropdown.getText();
        const actualRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const actualRoleData = await actualRoleDropdown.getText();

        //click on save button
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);

        //verify notification message of 'User added successfully'
        const actualNotificationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);

        await usersPageElementsObj.findQuickPageCloseIcon(driver);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activeUsersList.png');
        //get user details of users listing page
        const usersPageRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, 1);
        console.log("Users page Role and Profile values:");
        console.log(usersPageRole);
        const usersPageProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, 3)
        console.log(usersPageProfile);
        if (roleFieldData === usersPageRole && profileFieldData === usersPageProfile) {
            console.log("As role and profile of updated user are matched with user details of users page,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As role and profile of updated user are unmatched with user details of users page,test case has been aborted");
        }
        //click on specified user link
        await usersPageElementsObj.findUser(driver, 'Eshwari Sai GK');
        await driver.sleep(3000);

        //get values of user details in quick view page
        const quickPageFirstNameData = await driver.findElement(By.id('firstName')).getAttribute('value');
        const quickPageLastNameData = await driver.findElement(By.id('lastName')).getAttribute('value');
        const quickPageEmailData = await driver.findElement(By.id('email')).getAttribute('value');
        const quickPageProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const quickPageProfileData = await quickPageProfileDropdown.getText();
        const quickPageRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const quickPageRoleData = await quickPageRoleDropdown.getText();

        //comparing newly created user details and quick page user details
        try {
            strictEqual(actualFirstNameData, quickPageFirstNameData);
            strictEqual(actualLastNameData, quickPageLastNameData);
            strictEqual(actualEmailData, quickPageEmailData);
            strictEqual(actualProfileData, quickPageProfileData);
            strictEqual(actualRoleData, quickPageRoleData);
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }

        //click on 'Edit' Button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(3000);

        //get values of user details after navigation
        const expectedFirstName = await usersPageElementsObj.findEditPageFirstNameField(driver);
        const expectedFirstNameData = await expectedFirstName.getAttribute('value');
        const expectedLastName = await usersPageElementsObj.findEditPageLastNameField(driver);
        const expectedLastNameData = await expectedLastName.getAttribute('value');
        const expectedEmail = await usersPageElementsObj.findEditPageEmailField(driver);
        const expectedEmailData = await expectedEmail.getAttribute('value');
        const expectedProfileDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'profileId');
        const expectedProfileData = await expectedProfileDropdown.getText();
        const expectedRoleDropdown = await commonModuleElementObj.findDropdown(driver, screenshotPath, 'roleData');
        const expectedRoleData = await expectedRoleDropdown.getText();

        //comparing newly created user details and edit page user details
        try {
            strictEqual(actualFirstNameData, expectedFirstNameData);
            strictEqual(actualLastNameData, expectedLastNameData);
            strictEqual(actualEmailData, expectedEmailData);
            strictEqual(actualProfileData, expectedProfileData);
            strictEqual(actualRoleData, expectedRoleData);
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }

        //close edit popup
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(500);

        //close quick view page
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(500);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 11:Verify, the user is not able to leave required fields as blank while updating a user details---------------------

When('the user is not able to leave required fields as blank while updating a user',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeAddingNewUserLength = activeUsers.length;
        console.log("Active users count before adding user with exceed length validation: " + activeUsersBeforeAddingNewUserLength);

        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Bhanu VG'] ")).getText();
        console.log("User Name: " + userName);
        //click on user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(2000);

        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Edit' button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(1000);

        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const editUserPage = await driver.findElements(By.xpath('//h4[text()="Edit User"]'));
        const editUserPageLength = await editUserPage.length;
        if (editUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As edit user page is opened,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As edit user page is not opened,test case has been aborted");
        }

        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {

                    //will find 'First Name' field and pass the new data
                    const firstNameField = await usersPageElementsObj.findEditPageFirstNameField(driver);
                    await clearFieldDataObj.clearFieldData(firstNameField);
                    await firstNameField.sendKeys(firstNameFieldData);
                    await driver.sleep(500);
                }
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {

                    //will find 'Last Name' field and pass the new data
                    const lastNameField = await usersPageElementsObj.findEditPageLastNameField(driver);
                    await clearFieldDataObj.clearFieldData(lastNameField);
                    await lastNameField.sendKeys(lastNameFieldData);
                    await driver.sleep(500);
                }
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {

                    //will find 'Email' field and pass the new data
                    const emailField = await usersPageElementsObj.findEditPageEmailField(driver);
                    await clearFieldDataObj.clearFieldData(emailField);
                    await emailField.sendKeys(emailFieldData);
                    await driver.sleep(500);
                }
            }
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string}, {string}, {string} validation',async function(expectedFirstNameValidation,expectedLastNameValidation,expectedEmailValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
        //verifying 'First Name' validation message
        const firstNameValidation = await driver.findElement(By.xpath("//sm-input-txt[1]/sm-element/sm-validation-messages/div[@class='error-message text-danger']")).getText();
        strictEqual(firstNameValidation, expectedFirstNameValidation);

        //verifying 'Last Name' validation message
        const lastNameValidation = await driver.findElement(By.xpath("//sm-input-txt[1]/sm-element/sm-validation-messages/div[@class='error-message text-danger']")).getText();
        strictEqual(lastNameValidation, expectedLastNameValidation);

        //verifying 'Email' validation message
        const emailValidation = await driver.findElement(By.xpath("//sm-input-txt[1]/sm-element/sm-validation-messages/div[@class='error-message text-danger']")).getText();
        strictEqual(emailValidation, expectedEmailValidation);

        //closing 'Edit' Page
        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(500);
        //closing 'Quick' Page
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(1000);

        //Active users length after closing edit page
        try {
            activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
            activeUsersAfterClosingEditPageLength = activeUsersCount.length;
            console.log("Active users count after closing edit page: " + activeUsersAfterClosingEditPageLength);

            //comparing both active users length,as required fields are not filled,the user should not be added
            if (activeUsersBeforeAddingNewUserLength === activeUsersAfterClosingEditPageLength) {
                console.log("As blank user details are not added,so the new record is not displayed,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await assert.fail("As number of active users before and after closing edit page are not equal,so test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 12:Verify, the user is not able to update user details with invalid data-----------------------

When('the user update a user with invalid data:',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeAddingNewUserLength = activeUsers.length;
        console.log("Active users count before adding user with exceed length validation: " + activeUsersBeforeAddingNewUserLength);

        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Bhanu VG'] ")).getText();
        console.log("User Name: " + userName);
        //click on user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');

        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Edit' button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const editUserPage = await driver.findElements(By.xpath('//h4[text()="Edit User"]'));
        const editUserPageLength = await editUserPage.length;
        if (editUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As edit user page is opened,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As edit user page is not opened,test case has been aborted");
        }

        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findEditPageFirstNameField(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findEditPageLastNameField(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await usersPageElementsObj.findEditPageEmailField(driver);
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            }
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify email validation {string} message',async function(emailValidationMsg) {
    const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
    await saveButton.click();
    await driver.sleep(1000);
    //verifying validation message
    const validationMessage = await usersPageElementsObj.findInvalidEmailValidation(driver);
    strictEqual(validationMessage,emailValidationMsg);
    await usersPageElementsObj.findEditPageCloseButton(driver);
    await driver.sleep(500);
    await usersPageElementsObj.findQuickPageCloseIcon(driver);
    await driver.sleep(1000);

    //Active users length after closing quick page
    try {
        activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersAfterClosingEditPageLength = activeUsersCount.length;
        console.log("Active users count after closing edit page: "+activeUsersAfterClosingEditPageLength);
        //comparing both active users length,as user with invalid data fields are filled,the user should not be added
        if (activeUsersBeforeAddingNewUserLength === activeUsersAfterClosingEditPageLength) {
            console.log("As invalid user details are not added,so the new record is not displayed,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As number of active users before and after closing edit page are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user enters exceed length of data while updating',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //Active users length before adding new user
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeAddingNewUserLength = activeUsers.length;
        console.log("Active users count before adding user with exceed length validation: " + activeUsersBeforeAddingNewUserLength);

        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Bhanu VG'] ")).getText();
        console.log("User Name: " + userName);
        //click on user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');

        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Edit' button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const editUserPage = await driver.findElements(By.xpath('//h4[text()="Edit User"]'));
        const editUserPageLength = await editUserPage.length;
        if (editUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As edit user page is opened,test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As edit user page is not opened,test case has been aborted");
        }

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findEditPageFirstNameField(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findEditPageLastNameField(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'mobile') {
                mobileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the mobile field is given or not
                if (mobileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the mobile field, the test case execution has been aborted');
                }

                //will find 'Mobile' field and pass the new data
                const mobileField = await usersPageElementsObj.findEditPageMobileField(driver);
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(mobileFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'nick name') {
                nickNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the nick name field is given or not
                if (nickNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the nick name field, the test case execution has been aborted');
                }

                //will find 'Nick Name' field and pass the new data
                const nickNameField = await usersPageElementsObj.findEditPageNickNameField(driver);
                await clearFieldDataObj.clearFieldData(nickNameField);
                await nickNameField.sendKeys(nickNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone') {
                phoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the phone field is given or not
                if (phoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await usersPageElementsObj.findEditPagePhoneField(driver);
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'extension') {
                extensionFieldData = dataTable.rawTable[i][1];

                //will check that the data for the extension field is given or not
                if (extensionFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the extension field, the test case execution has been aborted');
                }

                //will find 'Extension' field and pass the new data
                const extensionField = await usersPageElementsObj.findEditPageExtensionField(driver);
                await clearFieldDataObj.clearFieldData(extensionField);
                await extensionField.sendKeys(extensionFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line1') {
                addressLine1FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line1 field is given or not
                if (addressLine1FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line1 field, the test case execution has been aborted');
                }

                //will find 'Address Line1' field and pass the new data
                const addressLine1Field = await usersPageElementsObj.findEditPageAddressLine1Field(driver);
                await clearFieldDataObj.clearFieldData(addressLine1Field);
                await addressLine1Field.sendKeys(addressLine1FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'address line2') {
                addressLine2FieldData = dataTable.rawTable[i][1];

                //will check that the data for the address line2 field is given or not
                if (addressLine2FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the address line2 field, the test case execution has been aborted');
                }

                //will find 'Address Line2' field and pass the new data
                const addressLine2Field = await usersPageElementsObj.findEditPageAddressLine2Field(driver);
                await clearFieldDataObj.clearFieldData(addressLine2Field);
                await addressLine2Field.sendKeys(addressLine2FieldData);
                await driver.sleep(500);
            } else if (fieldName == 'area') {
                areaFieldData = dataTable.rawTable[i][1];

                //will check that the data for the area field is given or not
                if (areaFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the area field, the test case execution has been aborted');
                }

                //will find 'Area' field and pass the new data
                const areaField = await usersPageElementsObj.findEditPageAreaField(driver);
                await clearFieldDataObj.clearFieldData(areaField);
                await areaField.sendKeys(areaFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'city') {
                cityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the city field is given or not
                if (cityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the city field, the test case execution has been aborted');
                }

                //will find 'City' field and pass the new data
                const cityField = await usersPageElementsObj.findEditPageCityField(driver);
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(cityFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'state') {
                stateFieldData = dataTable.rawTable[i][1];

                //will check that the data for the state field is given or not
                if (stateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the state field, the test case execution has been aborted');
                }

                //will find 'State' field and pass the new data
                const stateField = await usersPageElementsObj.findEditPageStateField(driver);
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(stateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'zip code') {
                zipCodeFieldData = dataTable.rawTable[i][1];

                //will check that the data for the zip code field is given or not
                if (zipCodeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the zip code field, the test case execution has been aborted');
                }

                //will find 'Zip Code' field and pass the new data
                const zipCodeField = await usersPageElementsObj.findEditPageZipCodeField(driver);
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(zipCodeFieldData);
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name,Last Name,Mobile,Nick Name,Phone,Extension,Address Line1,Address Line2,Area,City,State,Zip Code fields only');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (firstNameFieldData == 'no' || lastNameFieldData == 'no' || mobileFieldData == 'no' || nickNameFieldData == 'no' || phoneFieldData == 'no' || extensionFieldData == 'no' || addressLine1FieldData == 'no' || addressLine2FieldData == 'no' || areaFieldData == 'no' || cityFieldData == 'no' || stateFieldData == 'no' || zipCodeFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name,Last Name,Mobile,Nick Name,Phone,Extension,Address Line1,Address Line2,Area,City,State,Zip Code');
        }
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify messages {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}',async function(firstNameValidation,lastNameValidation,mobileValidation,nickNameValidation,phoneValidation,extensionValidation,addressLine1Validation,addressLine2Validation,areaValidation,cityValidation,stateValidation,zipCodeValidation) {
    //verify 'First Name' field validation message
    const firstNameValidationMsg = await usersPageElementsObj.findValidationMessage(driver,1);
    strictEqual(firstNameValidationMsg,firstNameValidation);
    //verify 'Last Name' field validation message
    const lastNameValidationMsg = await usersPageElementsObj.findValidationMessage(driver,2);
    strictEqual(lastNameValidationMsg,lastNameValidation);
    //verify 'Mobile' field validation message
    const mobileValidationMsg = await usersPageElementsObj.findValidationMessage(driver,4);
    strictEqual(mobileValidationMsg,mobileValidation);
    //verify 'Nick Name' field validation message
    const nickNameValidationMsg = await usersPageElementsObj.findValidationMessage(driver,6);
    strictEqual(nickNameValidationMsg,nickNameValidation);
    //verify 'Phone' field validation message
    const phoneValidationMsg = await usersPageElementsObj.findPhoneExtensionValidation(driver,1);
    strictEqual(phoneValidationMsg,phoneValidation);
    //verify 'Extension' field validation message
    const extensionValidationMsg = await usersPageElementsObj.findPhoneExtensionValidation(driver,2);
    strictEqual(extensionValidationMsg,extensionValidation);
    //verify 'Address Line1' field validation message
    const addressLine1ValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver,1);
    strictEqual(addressLine1ValidationMsg,addressLine1Validation);
    //verify 'Address Line2' field validation message
    const addressLine2ValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver,2);
    strictEqual(addressLine2ValidationMsg,addressLine2Validation);
    //verify 'Area' field validation message
    const areaValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver,3);
    strictEqual(areaValidationMsg,areaValidation);
    //verify 'City' field validation message
    const cityValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver,4);
    strictEqual(cityValidationMsg,cityValidation);
    //verify 'State' field validation message
    const stateValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver,5);
    strictEqual(stateValidationMsg,stateValidation);
    //verify 'Zip Code' field validation message
    const zipCodeValidationMsg = await usersPageElementsObj.findAddressFieldsValidation(driver,6);
    strictEqual(zipCodeValidationMsg,zipCodeValidation);
    await usersPageElementsObj.findEditPageCloseButton(driver);
    await driver.sleep(2000);
    await usersPageElementsObj.findQuickPageCloseIcon(driver);
    await driver.sleep(500);
    //Active users length after closing edit page
    try {
        activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersAfterClosingEditPageLength = activeUsersCount.length;
        console.log("Active users count after closing edit page: "+activeUsersAfterClosingEditPageLength);
        //comparing both active users length,as required fields are not filled,the user should not be added
        if (activeUsersBeforeAddingNewUserLength === activeUsersAfterClosingEditPageLength) {
            console.log("As exceed length of user details are not added,so the new record is not displayed,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As number of active users before and after closing edit page are not equal,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 13:Verify, the user is not able to update another user with duplicate email address--------------------------------

When('the user enters duplicate email address while updating',async function(dataTable) {
    try {
        await driver.sleep(1000);

        //get 'Email' value before updating user
        emailValueBeforeUpdatingUser = await driver.findElement(By.xpath(`//div[text()="meghapatel1234.456@gmail.com"]`)).getText();
        console.log("Email value of user before updating with duplicate email address: " + emailValueBeforeUpdatingUser);

        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@title='Bhanu VG'] ")).getText();
        console.log("User Name: " + userName);
        //click on user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');

        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Edit' button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const editUserPage = await driver.findElements(By.xpath('//h4[text()="Edit User"]'));
        const editUserPageLength = await editUserPage.length;
        if (editUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As edit user page is opened,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As edit user page is not opened,test case has been aborted");
        }

        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findEditPageFirstNameField(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findEditPageLastNameField(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await usersPageElementsObj.findEditPageEmailField(driver);
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
                await saveButton.click();
                await driver.sleep(1500);
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'emailField_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify email {string} validation message',async function(duplicateEmailValidation) {
    const duplicateEmailValidationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(duplicateEmailValidationMsg,duplicateEmailValidation);
    await driver.sleep(3500);
    await usersPageElementsObj.findEditPageCloseButton(driver);
    await driver.sleep(2500);
    await usersPageElementsObj.findQuickPageCloseIcon(driver);
    await driver.sleep(1500);

    //email address after updating user with duplicate email address
    try {
        const emailValueAfterUpdatingUser = await driver.findElement(By.xpath(`//div[text()="meghapatel1234.456@gmail.com"]`)).getText();
        console.log("Email address after updating user with duplicate email address: "+emailValueAfterUpdatingUser);
        //comparing both before and after email address,the email should not get updated,it should remain same as user enters duplicate email address
        if (emailValueBeforeUpdatingUser === emailValueAfterUpdatingUser) {
            console.log("As duplicate email user details are not updated,so the old email address is displayed,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As duplicate email user details are updated,so the updated email address is displayed,test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'emailValidation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 14:Verify, the system shows first name as nick name on leaving nick name blank--------------------------

When('the user leaves nick name field as blank',async function(dataTable) {
    try {
        await driver.sleep(1000);

        const newUserButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' User ');
        await newUserButton.click();
        await driver.sleep(1000);

        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const addNewUserPage = await driver.findElements(By.xpath('//h4[text()="Add New User"]'));
        const addNewUserPageLength = await addNewUserPage.length;
        if (addNewUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As add new user page is opened,test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As add new user page is not opened,test case has been aborted");
        }

        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findEditPageFirstNameField(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findEditPageLastNameField(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await usersPageElementsObj.findEditPageEmailField(driver);
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'nick name') {
                nickNameFieldData = dataTable.rawTable[i][1];

                //will find 'Nick Name' field and pass the new data
                const nickNameField = await usersPageElementsObj.findEditPageNickNameField(driver);
                await clearFieldDataObj.clearFieldData(nickNameField);
                await nickNameField.sendKeys(nickNameFieldData);
                await driver.sleep(500);
            }
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'nickNameField_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('system should display {string} and first name as nick name',async function(expectedNotification) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);

        //verify notification message of 'User updated successfully'
        const actualNotificationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);
        await usersPageElementsObj.findUser(driver, 'Amulya Pidge HL');
        await driver.sleep(2000);
        const quickPageFirstName = await driver.findElement(By.id('firstName')).getAttribute('value');
        const quickPageNickName = await driver.findElement(By.id('nickname')).getAttribute('value');
        console.log("quick page first name:" + quickPageFirstName);
        console.log("quick Page nick name:" + quickPageNickName);

        //compare 'First Name' and 'Nick Name' fields of 'Quick Page'
        if (quickPageFirstName === quickPageNickName) {
            console.log("As though leaving nick name as blank,first name is displayed as nick name in quick page,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As nick name is not displayed as first name in quick page while leaving nick name field is blank,so test case has been aborted");
        }

        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(2000);
        const editPageFirstName = await usersPageElementsObj.findEditPageFirstNameField(driver);
        const editPageFirstNameData = await editPageFirstName.getAttribute('value');
        const editPageNickName = await usersPageElementsObj.findEditPageNickNameField(driver);
        const editPageNickNameData = await editPageNickName.getAttribute('value');
        console.log(editPageFirstNameData);
        console.log(editPageNickNameData);

        //compare 'First Name' and 'Nick Name' fields of 'Edit Page'
        if (editPageFirstNameData === editPageNickNameData) {
            console.log("As though leaving nick name as blank,first name is displayed as nick name in edit page,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As nick name is not displayed as first name in edit page while leaving nick name field is blank,so test case has been aborted");
        }

        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(500);
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(500);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------------Case 15:Verify, the user is able to set formatted email signature-----------------------------

When('the user click on {string} option with {string} value and then enter {string}',async function(format,formatValue,signatureText) {
    try {
        await driver.sleep(1000);

        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Bhanu VG'] ")).getText();
        console.log("User Name: " + userName);
        //click on user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(2000);
        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Edit' button
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        //verify edit user popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const editUserPage = await driver.findElements(By.xpath('//h4[text()="Edit User"]'));
        const editUserPageLength = await editUserPage.length;
        if (editUserPageLength > 0) {
            await driver.manage().setTimeouts({implicit: 2000});
            console.log("As edit user page is opened,test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As edit user page is not opened,test case has been aborted");
        }
        await driver.sleep(2000);
        //will find 'Email Signature' field and then clear that field data
        const emailSignatureiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(emailSignatureiFrame);
        const emailSignatureField = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        await emailSignatureField.clear();
        await driver.switchTo().defaultContent();

        //will click on the provided format option with the format value
        await performSpecificOperationsObj.clickOnEmailSignatureFormatOption(driver, screenshotPath, format, formatValue, signatureText);

        await driver.switchTo().frame(emailSignatureiFrame);

        //will enter provided email signature
        if (format.toLowerCase() != 'insert link' && format.toLowerCase() != 'undo' && format.toLowerCase() != 'redo') {
            await emailSignatureField.sendKeys(signatureText);
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on update button and verify {string} message and navigate to other page and verify email signature',async function(expectedNotification) {
    try {
        await driver.sleep(1000);
        //will get actual email signature
        const actualEmailSignatureField = await usersPageElementsObj.findEditPageEmailSignatureTextBox(driver);
        const actualEmailSignatureData = await actualEmailSignatureField.getText();
        console.log("Email Signature: " + actualEmailSignatureData);
        await driver.switchTo().defaultContent();
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
        //verify notification message of 'User updated successfully'
        const actualNotificationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);

        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(1000);
        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);
        const userName = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', 'Bhanu VG');
        await userName.click();
        await driver.sleep(2000);
        await usersPageElementsObj.findActionButtons(driver, ' Edit ');
        await driver.sleep(2000);
        //will find 'Email Signature' field
        const emailSignatureiFrame = await usersPageElementsObj.findEditPageEmailSignatureiFrame(driver);
        await driver.switchTo().frame(emailSignatureiFrame);

        //will get expected email signature
        const expectedEmailSignatureField = await usersPageElementsObj.findEditPageEmailSignatureTextBox(driver);
        const expectedEmailSignatureData = await expectedEmailSignatureField.getText();
        console.log("Email Signature: " + expectedEmailSignatureData);
        await driver.switchTo().defaultContent();

        //will compare actual and expected email signature HTML code
        try {
            assert.strictEqual(actualEmailSignatureData, expectedEmailSignatureData);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'EmailSignatureFormat_Failed.png');
            await driver.navigate().refresh();
            assert.fail('Due to the format option of email signature is not working, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + '/EmailSignature_Failed.png\'');
        }
        console.log('Format email signature with format option case has been passed');

        await usersPageElementsObj.findEditPageCloseButton(driver);
        await driver.sleep(500);
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(500);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case-16-Verify, the user is able to re-invite unconfirmed user----------------------------

When('the user is able to re-invite unconfirmed user and verify {string} message',async function(expectedNotification) {
    try {
        await driver.sleep(1000);

        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Bhanu VG'] ")).getText();
        //click on user added through required fields
        const user = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', 'Bhanu VG');
        await user.click();
        await driver.sleep(1500);

        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        await driver.sleep(2000);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Re-invite' button
        await usersPageElementsObj.findActionButtons(driver, ' Re-Invite ');
        await driver.sleep(1000);
        //verify 'Re-verification email sent successfully' message
        const reInviteMessageElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(reInviteMessageElement));
        const actualNotification = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);

        //close quick view page
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(500);
        //To check that quick view page closed or not
        try {
            await driver.manage().setTimeouts({implicit: 2000});
            const quickPage = await driver.findElements(By.xpath('//a[text()="Details"]'));
            const quickPageLength = await quickPage.length;
            if (quickPageLength === 0) {
                await driver.manage().setTimeouts({implicit: 2000});
                console.log("As quick page is closed,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As quick page is not closed,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //click on 'Unconfirmed Users' tab
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //verify whether 'Unconfirmed Users' tab is opened or not
        const currentPageURL = await driver.getCurrentUrl();
        try {
            await currentPageURL.includes('app/setup/security/users/unconfirmed');
            console.log("As unconfirmed users tab is opened,so test case has been passed");
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail("As unconfirmed users tab is not found,so test case has been aborted");
            await assert.fail(err);
        }

        //click on 'Re-invite' button from 'Unconfirmed Users' tab
        const userNameElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a', 'Bhanu VG');
        await userNameElement.click();
        await driver.sleep(2000);
        await usersPageElementsObj.findActionButtons(driver, ' Re-Invite ');
        await driver.sleep(1000);
        //verify 'Re-verification email sent successfully' message
        const actualMessageElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualMessageElement));
        const actualMessage = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        console.log("As user is able to re-invite unconfirmed user,so test case has been passed");
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(500);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 17:Verify, the user is able to deactivate another user without releasing the licence---------------------

When('the user is able to deactivate another user without releasing the licence and verify {string} message',async function(deactivateMsg) {
    try {
        await driver.sleep(2000);

        //get count of 'Active users' list before user deactivation
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersCountBeforeDeactivatingUser = activeUsers.length;
        console.log("Active users count before deactivating user: " + activeUsersCountBeforeDeactivatingUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list before user deactivation
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeDeactivatingUser = deactiveUsers.length;
        console.log("Deactive users count before deactivating user: " + deactiveUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deactivation
        unconfirmedUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        unconfirmedUsersCountBeforeDeactivatingUser = unconfirmedUsers.length;
        console.log("Unconfirmed users count before deactivating user: " + unconfirmedUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //get name,role and profile of 'Deactivating User'
        const deactivateUserName = await usersPageElementsObj.findUserName(driver, 'Bhanu VG');
        const deactivateUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 1);
        const deactivateUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 3);
        console.log(deactivateUserName, deactivateUserRole, deactivateUserProfile);

        //deactivating user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(3000);
        await usersPageElementsObj.findActionButtons(driver, ' Deactivate ');
        await driver.sleep(2000);

        //click on 'Yes' button of 'Deactivate Popup'
        await usersPageElementsObj.findDeactivateYesButton(driver);
        await driver.sleep(2000);
        //verify 'User deactivated successfully' message after deactivation
        const deactivateNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(deactivateNotificationElement));
        const deactivateNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(deactivateNotification, deactivateMsg);
        await driver.sleep(5000);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver);
        await driver.sleep(2000);

        //get count of 'Active users' list after user deactivation
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterDeactivatingUser = activeUserElements.length;
        console.log("Active users count after deactivating user: " + activeUsersCountAfterDeactivatingUser);
        const deactiveUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactiveUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list after user deactivation
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterDeactivatingUser = deactiveUserElements.length;
        console.log("Deactive users count after deactivating user: " + deactiveUsersCountAfterDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deactivation
        const unconfirmedUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const unconfirmedUsersCountAfterDeactivatingUser = unconfirmedUserElements.length;
        console.log("Unconfirmed users count after deactivating user: " + unconfirmedUsersCountAfterDeactivatingUser);
        //comparing active,deactivated and unconfirmed users count before and after deactivating user
        if ((activeUsersCountBeforeDeactivatingUser) - 1 === activeUsersCountAfterDeactivatingUser && (deactiveUsersCountBeforeDeactivatingUser) + 1 === deactiveUsersCountAfterDeactivatingUser && unconfirmedUsersCountBeforeDeactivatingUser === unconfirmedUsersCountAfterDeactivatingUser) {
            console.log("As active users count is (X-1),deactive users count is (X+1) and unconfirmed users count is (X) after deactivating user,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As active users count is not decreased by one user and unconfirmed users is increased by one user after deactivating user,so test case has been aborted");
        }
        //click on 'Deactivate Users' tab
        const deactivatedUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivatedUsersTab.click();
        await driver.sleep(2000);

        //verify recently 'Deactivated User' details
        const deactivatedUserName = await usersPageElementsObj.findUserName(driver, 'Bhanu VG');
        const deactivatedUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 1);
        const deactivatedUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 3);
        console.log(deactivatedUserName, deactivatedUserRole, deactivatedUserProfile);

        if (deactivateUserName === deactivatedUserName && deactivateUserRole === deactivatedUserRole && deactivateUserProfile === deactivatedUserProfile) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'deactivatedUserList.png');
            console.log("As user with required details is deactivated and is displayed in deactivated users tab,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As user with required details is deactivated and is not displayed in deactivated users tab,so test case has been aborted");
        }
        console.log("As user is able to deactivate another user without releasing the licence,so test case has been passed");
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(1000);
        await usersPageElementsObj.findActionButtons(driver, ' Activate ');
        await driver.sleep(1000);
        await usersPageElementsObj.findYesButton(driver);
        await driver.sleep(2000);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 18:Verify, the user is able to deactivate another user with releasing the licence-------------------------

When('the user is able to deactivate another user with releasing the licence and verify {string} message',async function(deactivateMsg) {
    try {
        await driver.sleep(3000);

        //get count of 'Active users' list before user deactivation
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersCountBeforeDeactivatingUser = activeUsers.length;
        console.log("Active users count before deactivating user: " + activeUsersCountBeforeDeactivatingUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list before user deactivation
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeDeactivatingUser = deactiveUsers.length;
        console.log("Deactive users count before deactivating user: " + deactiveUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deactivation
        unconfirmedUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        unconfirmedUsersCountBeforeDeactivatingUser = unconfirmedUsers.length;
        console.log("Unconfirmed users count before deactivating user: " + unconfirmedUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //get name,role and profile of 'Deactivating User'
        const deactivateUserName = await usersPageElementsObj.findUserName(driver, 'Eshwari Sai GK');
        const deactivateUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 1);
        const deactivateUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 3);
        console.log(deactivateUserName, deactivateUserRole, deactivateUserProfile);

        //deactivating user added through required fields
        await usersPageElementsObj.findUser(driver, 'Eshwari Sai GK');
        await driver.sleep(3000);
        await usersPageElementsObj.findActionButtons(driver, ' Deactivate ');
        await driver.sleep(3000);

        //To check that 'Deactivate Popup' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const deactivatePopup = await driver.findElements(By.xpath('//h4[text()="Deactivate User"]'));
            const deactivatePopupLength = await deactivatePopup.length;
            if (deactivatePopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As deactivate popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await driver.navigate().refresh();
                await assert.fail("As deactivate popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //click on 'Deactivate This User And Release The License' dropdown
        await usersPageElementsObj.clickDeactivateUserWithLicenseDropdown(driver);
        await driver.sleep(2000);
        //click on 'Yes' button of 'Deactivate Popup'
        await usersPageElementsObj.findDeactivateYesButton(driver);
        await driver.sleep(2000);
        //verify 'User deactivated successfully' message after deactivation
        const deactivateNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(deactivateNotificationElement));
        const deactivateNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(deactivateNotification, deactivateMsg);
        await driver.sleep(3000);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver);
        await driver.sleep(2000);
        //get count of 'Active users' list after user deactivation
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterDeactivatingUser = activeUserElements.length;
        console.log("Active users count after deactivating user: " + activeUsersCountAfterDeactivatingUser);
        const deactiveUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactiveUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list after user deactivation
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterDeactivatingUser = deactiveUserElements.length;
        console.log("Deactive users count after deactivating user: " + deactiveUsersCountAfterDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deactivation
        const unconfirmedUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const unconfirmedUsersCountAfterDeactivatingUser = unconfirmedUserElements.length;
        console.log("Unconfirmed users count after deactivating user: " + unconfirmedUsersCountAfterDeactivatingUser);
        //comparing active,deactivated and unconfirmed users count before and after deactivating user
        if ((activeUsersCountBeforeDeactivatingUser) - 1 === activeUsersCountAfterDeactivatingUser && (deactiveUsersCountBeforeDeactivatingUser) + 1 === deactiveUsersCountAfterDeactivatingUser && unconfirmedUsersCountBeforeDeactivatingUser === unconfirmedUsersCountAfterDeactivatingUser) {
            console.log("As active users count is (X-1),deactive users count is (X+1) and unconfirmed users count is (X) after deactivating user,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As active users count is not decreased by one user and unconfirmed users is increased by one user after deactivating user,so test case has been aborted");
        }

        //click on 'Deactivate Users' tab
        const deactivatedUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivatedUsersTab.click();
        await driver.sleep(2000);

        //verify recently 'Deactivated User' details
        const deactivatedUserName = await usersPageElementsObj.findUserName(driver, 'Eshwari Sai GK');
        const deactivatedUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 1);
        const deactivatedUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 3);
        console.log(deactivatedUserName, deactivatedUserRole, deactivatedUserProfile);

        if (deactivateUserName === deactivatedUserName && deactivateUserRole === deactivatedUserRole && deactivateUserProfile === deactivatedUserProfile) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'deactivatedUserList.png');
            console.log("As user filled with all details is deactivated and is displayed in deactivated users tab,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As user filled with all details is deactivated and is not displayed in deactivated users tab,so test case has been aborted");
        }
        console.log("As user is able to deactivate another user with releasing the licence,so test case has been passed");
        await usersPageElementsObj.findUser(driver, 'Eshwari Sai GK');
        await driver.sleep(1000);
        await usersPageElementsObj.findActionButtons(driver, ' Activate ');
        await driver.sleep(1000);
        await usersPageElementsObj.findYesButton(driver);
        await driver.sleep(2000);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 19:Verify, the user is able to deactivate another user and invite new user at the same time-----------------------

When('the user is able to deactivate another user and invite new user at the same time',async function(dataTable) {
    try {
        await driver.sleep(3000);

        //get count of 'Active users' list before user deactivation
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersCountBeforeDeactivatingUser = activeUsers.length;
        console.log("Active users count before deactivating user: " + activeUsersCountBeforeDeactivatingUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list before user deactivation
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeDeactivatingUser = deactiveUsers.length;
        console.log("Deactive users count before deactivating user: " + deactiveUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deactivation
        unconfirmedUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        unconfirmedUsersCountBeforeDeactivatingUser = unconfirmedUsers.length;
        console.log("Unconfirmed users count before deactivating user: " + unconfirmedUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //get name,email,role and profile of 'Deactivating User'
        deactivateUserNameText = await usersPageElementsObj.findUserName(driver, 'Bhanu VG');
        deactivateUserRoleText = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 1);
        deactivateUserProfileText = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 3);
        console.log(deactivateUserNameText, deactivateUserRoleText, deactivateUserProfileText);

        //deactivating user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(3000);
        await usersPageElementsObj.findActionButtons(driver, ' Deactivate ');
        await driver.sleep(3000);

        //To check that 'Deactivate Popup' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const deactivatePopup = await driver.findElements(By.xpath('//h4[text()="Deactivate User"]'));
            const deactivatePopupLength = await deactivatePopup.length;
            if (deactivatePopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As deactivate popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As deactivate popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'licenseUsage', 'Deactivate this user and invite a new user using the same Licence', 'no');
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findDeactivateFirstName(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findDeactivateLastName(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await usersPageElementsObj.findDeactivateEmail(driver);
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            }
        }

        //will check whether the test data for all test fields is given or not
        if (firstNameFieldData == 'no' || lastNameFieldData == 'no' || emailFieldData == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name,Last Name,Email fields only');
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} message',async function(deactivateMsg) {
    try {
        //click on 'Yes' button of 'Deactivate Popup'
        await usersPageElementsObj.findDeactivateYesButton(driver);
        await driver.sleep(2000);
        //verify 'User deactivated successfully' message after deactivation
        const deactivateNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(deactivateNotificationElement));
        const deactivateNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(deactivateNotification, deactivateMsg);
        await driver.sleep(5000);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver);
        await driver.sleep(2000);

        //Getting values of 'New Invited User' like User Name,Role,Profile
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newInvitedUser.png');
        const newInvitedUserName = await usersPageElementsObj.findUserName(driver, 'Sowjanya RVD');
        const newInvitedUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, 1);
        const newInvitedUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, 3);
        console.log(newInvitedUserName, newInvitedUserRole, newInvitedUserProfile);

        //get count of 'Active users' list after user deactivation
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterDeactivatingUser = activeUserElements.length;
        console.log("Active users count after deactivating user: " + activeUsersCountAfterDeactivatingUser);
        const deactiveUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactiveUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list after user deactivation
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterDeactivatingUser = deactiveUserElements.length;
        console.log("Deactive users count after deactivating user: " + deactiveUsersCountAfterDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deactivation
        const unconfirmedUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const unconfirmedUsersCountAfterDeactivatingUser = unconfirmedUserElements.length;
        console.log("Unconfirmed users count after deactivating user: " + unconfirmedUsersCountAfterDeactivatingUser);
        //comparing active,deactivated and unconfirmed users count before and after deactivating user
        if (activeUsersCountBeforeDeactivatingUser === activeUsersCountAfterDeactivatingUser && (deactiveUsersCountBeforeDeactivatingUser) + 1 === deactiveUsersCountAfterDeactivatingUser && (unconfirmedUsersCountBeforeDeactivatingUser) + 1 === unconfirmedUsersCountAfterDeactivatingUser) {
            console.log("As active users count is (X),deactive users count is (X+1) and unconfirmed users count is (X+1) after deactivating user,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As active users count does not remains same,deactivated users count and unconfirmed users count is not increased by one user after deactivating user,so test case has been aborted");
        }

        //click on 'Deactivate Users' tab
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(2000);

        //verify recently 'Deactivated User' details
        const deactivatedUserName = await usersPageElementsObj.findUserName(driver, 'Bhanu VG');
        const deactivatedUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 1);
        const deactivatedUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'bhanuluckyvg@gmail.com', 3);
        console.log(deactivatedUserName, deactivatedUserRole, deactivatedUserProfile);

        if (deactivateUserNameText === deactivatedUserName && deactivateUserRoleText === deactivatedUserRole && deactivateUserProfileText === deactivatedUserProfile) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'deactivatedUserList.png');
            console.log("As user filled with required details is deactivated and is displayed in deactivated users tab,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As user filled with required details is deactivated and is not displayed in deactivated users tab,so test case has been aborted");
        }
        console.log("As user is able to deactivate another user and invited new user at the same time,so test case has been passed");
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(1000);
        await usersPageElementsObj.findActionButtons(driver, ' Activate ');
        await driver.sleep(1000);
        await usersPageElementsObj.findYesButton(driver);
        await driver.sleep(2000);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'userDeactivation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(6000);
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(1000);
        await usersPageElementsObj.findActionButtons(driver, ' Activate ');
        await driver.sleep(1000);
        await usersPageElementsObj.findYesButton(driver);
        await driver.sleep(2000);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);
        await assert.fail(err);
    }
});

//-----Case 20:Verify, the user is not able to deactivate another user with invite new user when new user details are not valid--------------------

When('the user enter invalid {string} {string} {string} of invite user and verify {string}',async function(firstNameData,lastNameData,emailData,expectedValidation) {
    try {
        await driver.sleep(1000);

        //get 'Active Users' count before deactivation
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersBeforeDeactivatingUserLength = activeUsers.length;
        console.log("Active users count before deactivating user: " + activeUsersBeforeDeactivatingUserLength);

        //deactivating user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(2000);
        await usersPageElementsObj.findActionButtons(driver, ' Deactivate ');
        await driver.sleep(3000);

        //To check that 'Deactivate Popup' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const deactivatePopup = await driver.findElements(By.xpath('//h4[text()="Deactivate User"]'));
            const deactivatePopupLength = await deactivatePopup.length;
            if (deactivatePopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As deactivate popup is opened,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As deactivate popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //Select 'Deactivate this user and invite a new user using the same Licence' dropdown
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'licenseUsage', 'Deactivate this user and invite a new user using the same Licence', 'no');
        //Enter 'First Name' in field
        const firstNameField = await usersPageElementsObj.findDeactivateFirstName(driver);
        await clearFieldDataObj.clearFieldData(firstNameField);
        await firstNameField.sendKeys(firstNameData);
        //Enter 'Last Name' in field
        const lastNameField = await usersPageElementsObj.findDeactivateLastName(driver);
        await clearFieldDataObj.clearFieldData(lastNameField);
        await lastNameField.sendKeys(lastNameData);
        //Enter 'Email' in field
        const emailField = await usersPageElementsObj.findDeactivateEmail(driver);
        await clearFieldDataObj.clearFieldData(emailField);
        await emailField.sendKeys(emailData);
        //click on 'Yes' button
        await usersPageElementsObj.findDeactivateYesButton(driver);
        await driver.sleep(2000);
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"] | //div[@class="error-message text-danger"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(6000);
        //Close 'Deactivate User Popup'
        await driver.findElement(By.xpath('//button[@class="close"]')).click();
        await driver.sleep(2000);
        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(1000);

        //get 'Active Users' count after entering invalid invite user details
        activeUsersCount = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersAfterDeactivatingUserLength = activeUsersCount.length;
        console.log("Active users count before deactivating user: " + activeUsersAfterDeactivatingUserLength);

        //compare before and after 'Active Users' count as invalid deactivate details are entered, the user should not be deactivated from 'Active User'
        if (activeUsersBeforeDeactivatingUserLength === activeUsersAfterDeactivatingUserLength) {
            console.log("As user entered invalid details of new invite user while deactivating,so current active user will not be deactivated,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("Although user entered invalid details of new invite user,current active user is deactivated,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validationCase_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 21:Verify, the user is able to transfer record ownership of deactivate user to another active user-----------------------------------------

When('the user is able to transfer record ownership of deactivate user to another active user',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //get count of 'Active users' list before user deactivation
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersCountBeforeDeactivatingUser = activeUsers.length;
        console.log("Active users count before deactivating user: " + activeUsersCountBeforeDeactivatingUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list before user deactivation
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeDeactivatingUser = deactiveUsers.length;
        console.log("Deactive users count before deactivating user: " + deactiveUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deactivation
        unconfirmedUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        unconfirmedUsersCountBeforeDeactivatingUser = unconfirmedUsers.length;
        console.log("Unconfirmed users count before deactivating user: " + unconfirmedUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //get name,role and profile of 'Deactivating User'
        deactivateUserNameText = await usersPageElementsObj.findUserName(driver, 'Eshwari Sai GK');
        deactivateUserRoleText = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 1);
        deactivateUserProfileText = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 3);
        console.log(deactivateUserNameText, deactivateUserEmailText, deactivateUserRoleText, deactivateUserProfileText);

        //deactivating user added through required fields
        await usersPageElementsObj.findUser(driver, 'Eshwari Sai GK');
        await driver.sleep(2000);
        await usersPageElementsObj.findActionButtons(driver, ' Deactivate ');
        await driver.sleep(3000);

        //To check that 'Deactivate Popup' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const deactivatePopup = await driver.findElements(By.xpath('//h4[text()="Deactivate User"]'));
            const deactivatePopupLength = await deactivatePopup.length;
            if (deactivatePopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As deactivate popup is opened,test case has been passed");
            } else {
                await driver.navigate().refresh();
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As deactivate popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate.refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //Select 'Deactivate this user and invite a new user using the same Licence' dropdown
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'licenseUsage', 'Deactivate this user and invite a new user using the same Licence', 'no');

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required first name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await usersPageElementsObj.findDeactivateFirstName(driver);
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field and pass the new data
                const lastNameField = await usersPageElementsObj.findDeactivateLastName(driver);
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'email') {
                emailFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required email field is given or not
                if (emailFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
                }

                //will find 'Email' field and pass the new data
                const emailField = await usersPageElementsObj.findDeactivateEmail(driver);
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(emailFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'contact') {
                contactFieldData = dataTable.rawTable[i][1];

                //will check that the data for the contact dropdown field is given or not
                if (contactFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the contact dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Contact' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//span[text()="-- Select  --"]')).click();
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'contactOwner', contactFieldData, 'yes');
            } else if (fieldName == 'company') {
                companyFieldData = dataTable.rawTable[i][1];

                //will check that the data for the company dropdown field is given or not
                if (companyFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the company dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Company' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'companyOwner', companyFieldData, 'yes');
            } else if (fieldName == 'activity') {
                activityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the activity dropdown field is given or not
                if (activityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the activity dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Activity' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'dealOwner', activityFieldData, 'yes');
            } else if (fieldName == 'deal') {
                dealFieldData = dataTable.rawTable[i][1];

                //will check that the data for the deal dropdown field is given or not
                if (dealFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the deal dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Deal' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'activityOwner', dealFieldData, 'yes');
            }
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} message after deactivation',async function(deactivateMsg) {
    try {
        //click on 'Yes' button of 'Deactivate Popup'
        await usersPageElementsObj.findDeactivateYesButton(driver);
        await driver.sleep(2500);
        //verify 'User deactivated successfully' message after deactivation
        const deactivateNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(deactivateNotificationElement));
        const deactivateNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(deactivateNotification, deactivateMsg);
        await driver.sleep(5000);

        //page navigation and come back to users page
        await pageNavigationObj.comeBackToUsersPage(driver);
        await driver.sleep(2000);

        //Getting values of 'New Invited User' like User Name,Role,Profile
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'newInvitedUser2.png');
        const newInvitedUserName = await usersPageElementsObj.findUserName(driver, 'Custom User');
        const newInvitedUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, 1);
        const newInvitedUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, `${emailFieldData}`, 3);
        console.log(newInvitedUserName, newInvitedUserRole, newInvitedUserProfile);

        //get count of 'Active users' list after user deactivation
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterDeactivatingUser = activeUserElements.length;
        console.log("Active users count after deactivating user: " + activeUsersCountAfterDeactivatingUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(2000);
        //get count of 'Deactive users' list after user deactivation
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterDeactivatingUser = deactiveUserElements.length;
        console.log("Deactive users count after deactivating user: " + deactiveUsersCountAfterDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(2000);
        //get count of 'Unconfirmed users' list before user deactivation
        const unconfirmedUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const unconfirmedUsersCountAfterDeactivatingUser = unconfirmedUserElements.length;
        console.log("Unconfirmed users count after deactivating user: " + unconfirmedUsersCountAfterDeactivatingUser);
        //comparing active,deactivated and unconfirmed users count before and after deactivating user
        if (activeUsersCountBeforeDeactivatingUser === activeUsersCountAfterDeactivatingUser && (deactiveUsersCountBeforeDeactivatingUser) + 1 === deactiveUsersCountAfterDeactivatingUser && (unconfirmedUsersCountBeforeDeactivatingUser) + 1 === unconfirmedUsersCountAfterDeactivatingUser) {
            console.log("As active users count is (X-1),deactive users count is (X+1) and unconfirmed users count is (X+1) after deactivating user,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As active users count remains same,deactivated users count and unconfirmed users count is not increased by one user after deactivating user,so test case has been aborted");
        }

        //click on 'Deactivate Users' tab
        const deactiveUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactiveUsersTab.click();
        await driver.sleep(2000);

        //verify recently 'Deactivated User' details
        const deactivatedUserName = await usersPageElementsObj.findUserName(driver, 'Eshwari Sai GK');
        const deactivatedUserRole = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 1);
        const deactivatedUserProfile = await usersPageElementsObj.findUserRoleOrProfileDetails(driver, 'eshwarisaigk@gmail.com', 3);
        console.log(deactivatedUserName, deactivatedUserRole, deactivatedUserProfile);

        if (deactivateUserNameText === deactivatedUserName && deactivateUserRoleText === deactivatedUserRole && deactivateUserProfileText === deactivatedUserProfile) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'deactivatedUserList.png');
            console.log("As user filled with required details is deactivated and is displayed in deactivated users tab,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await assert.fail("As user filled with required details is deactivated and is not displayed in deactivated users tab,so test case has been aborted");
        }
        console.log("As user is able to deactivate another user and invited new user at the same time,so test case has been passed");
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 22:Verify, the user is able to activate inactive user--------------------------------------------

When('the user is able to activate inactive user and verify {string} message',async function(activateMsg) {
    try {
        await driver.sleep(2000);

        //get count of 'Active users' list before user deactivation
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersCountBeforeDeactivatingUser = activeUsers.length;
        console.log("Active users count before deactivating user: " + activeUsersCountBeforeDeactivatingUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(2000);
        //get count of 'Deactive users' list before user deactivation
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeDeactivatingUser = deactiveUsers.length;
        console.log("Deactive users count before deactivating user: " + deactiveUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(2000);
        //get count of 'Unconfirmed users' list before user deactivation
        unconfirmedUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        unconfirmedUsersCountBeforeDeactivatingUser = unconfirmedUsers.length;
        console.log("Unconfirmed users count before deactivating user: " + unconfirmedUsersCountBeforeDeactivatingUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //click on 'Deactivate Users' tab
        const deactivatedUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivatedUsersTab.click();
        await driver.sleep(2000);
        //click on user added through required fields
        await usersPageElementsObj.findUser(driver, 'Bhanu VG');
        await driver.sleep(2000);
        await usersPageElementsObj.findActionButtons(driver, ' Activate ');
        await driver.sleep(2000);
        await usersPageElementsObj.findYesButton(driver);
        await driver.sleep(2000);
        const activationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(activationElement));
        const activationMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(activationMessage, activateMsg);
        await driver.sleep(5000);

        //page navigation and come back to 'Active Users' page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);
        console.log("As deactivated user is activated successfully,so test case has been passed");
        //get count of 'Active users' list after user deactivation
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterDeactivatingUser = activeUserElements.length;
        console.log("Active users count after deactivating user: " + activeUsersCountAfterDeactivatingUser);
        const deactiveUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactiveUsersTab.click();
        await driver.sleep(2000);
        //get count of 'Deactive users' list after user deactivation
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterDeactivatingUser = deactiveUserElements.length;
        console.log("Deactive users count after deactivating user: " + deactiveUsersCountAfterDeactivatingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(2000);
        //get count of 'Unconfirmed users' list before user deactivation
        const unconfirmedUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const unconfirmedUsersCountAfterDeactivatingUser = unconfirmedUserElements.length;
        console.log("Unconfirmed users count after deactivating user: " + unconfirmedUsersCountAfterDeactivatingUser);
        //comparing active,deactivated and unconfirmed users count before and after deactivating user
        if ((activeUsersCountBeforeDeactivatingUser) + 1 === activeUsersCountAfterDeactivatingUser && (deactiveUsersCountBeforeDeactivatingUser) - 1 === deactiveUsersCountAfterDeactivatingUser && unconfirmedUsersCountBeforeDeactivatingUser === unconfirmedUsersCountAfterDeactivatingUser) {
            console.log("As active users count is (X+1),deactive users count is (X-1) and unconfirmed users count is (X) after deactivating user,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As active users count is increased by one user,deactivated users count is decreased by one user and unconfirmed users count remains same after deactivating user,so test case has been aborted");
        }
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activateUserCase_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 23:Verify, the user is able to delete unconfirmed user-------------------------------------------

When('the user is able to delete unconfirmed user and verify {string} message',async function(deleteNotification) {
    try {
        await driver.sleep(2000);

        //get count of 'Active users' list before user deletion
        activeUsers = await driver.findElements(By.xpath("//a[@class='entity-show-link text-ellipsis']"));
        activeUsersCountBeforeDeletingUser = activeUsers.length;
        console.log("Active users count before deleting user: " + activeUsersCountBeforeDeletingUser);
        const deactivateUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactivateUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list before user deletion
        deactiveUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        deactiveUsersCountBeforeDeletingUser = deactiveUsers.length;
        console.log("Deactive users count before deleting user: " + deactiveUsersCountBeforeDeletingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deletion
        unconfirmedUsers = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        unconfirmedUsersCountBeforeDeletingUser = unconfirmedUsers.length;
        console.log("Unconfirmed users count before deleting user: " + unconfirmedUsersCountBeforeDeletingUser);
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(2000);

        //click on 'Unconfirmed Users' tab
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get user name that is added through required fields
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis'][@title='Custom User'] ")).getText();
        console.log("User Name: " + userName);
        await usersPageElementsObj.findUser(driver, 'Custom User');
        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }
        await usersPageElementsObj.findActionButtons(driver, ' Delete ');
        await usersPageElementsObj.findYesButton(driver);
        await driver.sleep(1000);
        const deleteElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(deleteElement));
        const deleteMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(deleteMessage, deleteNotification);
        await driver.sleep(5000);

        //page navigation and come back to 'Active Users' page
        await pageNavigationObj.comeBackToUsersPage(driver, screenshotPath);
        await driver.sleep(2000);

        //check for 'Deleted User' non-visibility in 'Active Users' page
        await driver.manage().setTimeouts({implicit: 2000});
        const deletedUserName = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis" and @title="Custom User"]'));
        const deletedUserLength = await deletedUserName.length;
        if (deletedUserLength === 0) {
            console.log("As deleted user is not displayed in active user list,so test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As deleted user details are displayed in active users list,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //get count of 'Active users' list after user deletion
        const activeUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const activeUsersCountAfterDeletingUser = activeUserElements.length;
        console.log("Active users count after deleting user: " + activeUsersCountAfterDeletingUser);
        const deactiveUsersTab = await usersPageElementsObj.findDeactivatedUsersTab(driver);
        await deactiveUsersTab.click();
        await driver.sleep(1000);
        //get count of 'Deactive users' list after user deletion
        const deactiveUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const deactiveUsersCountAfterDeletingUser = deactiveUserElements.length;
        console.log("Deactive users count after deleting user: " + deactiveUsersCountAfterDeletingUser);
        await usersPageElementsObj.findUnconfirmedUsersTab(driver);
        await driver.sleep(1000);
        //get count of 'Unconfirmed users' list before user deletion
        const unconfirmedUserElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const unconfirmedUsersCountAfterDeletingUser = unconfirmedUserElements.length;
        console.log("Unconfirmed users count after deleting user: " + unconfirmedUsersCountAfterDeletingUser);
        //comparing active,deactivated and unconfirmed users count before and after deactivating user
        if ((activeUsersCountBeforeDeletingUser) - 1 === activeUsersCountAfterDeletingUser && deactiveUsersCountBeforeDeletingUser === deactiveUsersCountAfterDeletingUser && (unconfirmedUsersCountBeforeDeletingUser) - 1 === unconfirmedUsersCountAfterDeletingUser) {
            console.log("As active users count is (X-1),deactive users count is (X) and unconfirmed users count is (X-1) after deactivating user,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As active users count is not decreased by one user,deactivated users count does not remains same and unconfirmed users count is decreased by one after deactivating user,so test case has been aborted");
        }

        //check for 'Deleted User' non-visibility in 'Unconfirmed Users' tab
        await driver.manage().setTimeouts({implicit: 2000});
        const deletedUnconfirmedUserName = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis" and @title="Custom User"]'));
        const deletedUnconfirmedUserLength = await deletedUnconfirmedUserName.length;
        if (deletedUnconfirmedUserLength === 0) {
            console.log("As deleted user is not displayed in unconfirmed user list,so test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await assert.fail("As deleted user details are displayed in unconfirmed users list,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        console.log("As user is able to delete unconfirmed user,test case has been passed");
        await usersPageElementsObj.findActiveUsersTab(driver);
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteUnconfirmedUserCase_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 24:Verify, the user is not able to delete active user--------------------------------------------

When('the user is not able to delete active user and verify {string} message',async function(promptMsg) {
    try {
        await driver.sleep(2000);

        //get user name that is going to be deleted
        const userName = await driver.findElement(By.xpath("//a[@class='entity-show-link text-ellipsis' and @title='Priyanka Vlr'] ")).getText();
        console.log("User Name: " + userName);
        //click on 'Active User' who is unconfirmed
        await usersPageElementsObj.findUser(driver, 'Priyanka Vlr');
        //get user name of quick page
        const quickPageUserName = await driver.findElement(By.xpath("//div[@class='pipetitle text-ellipsis m-b-xs']")).getText();
        console.log("Quick Page User Name: " + quickPageUserName);

        //compare both user name of active users tab and quick page selected user name
        if (userName === quickPageUserName) {
            console.log("Quick Page of selected required fields user is opened,so test case has been passed");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("As specified user quick page is not opened,so test case has been aborted");
        }

        //click on 'Delete' button
        await usersPageElementsObj.findActionButtons(driver, ' Delete ');
        await usersPageElementsObj.findYesButton(driver);
        await driver.sleep(1000);
        const deleteElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(deleteElement));
        const deleteMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(deleteMessage, promptMsg);
        await driver.sleep(5000);

        await usersPageElementsObj.findQuickPageCloseIcon(driver);
        await driver.sleep(1500);
        //verify visibility of 'Confirmed' user
        await driver.manage().setTimeouts({implicit: 2000});
        const deletedConfirmedUserName = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis" and @title="Priyanka Vlr"]'));
        const deletedConfirmedUserLength = await deletedConfirmedUserName.length;
        if (deletedConfirmedUserLength > 0) {
            console.log("As confirmed user is not deleted and displayed in active users page list,so test case has been passed");
        } else {
            await driver.manage().setTimeouts({implicit: elementSearchTimeout});
            await driver.navigate().refresh();
            await assert.fail("As confirmed user details are not displayed in active users list,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        console.log("As user is not able to delete confirmed user,so test case has been passed");
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteOperation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(6000);
        await assert.fail(err);
    }
});
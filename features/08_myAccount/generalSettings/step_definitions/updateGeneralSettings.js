const {Given,When,Then} = require('@cucumber/cucumber');
const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const generalSettingsPageElementObj = require('../common/generalSettingsPageElements');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const formElementObj = require('../../../00_common/webElements/formElements');
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const readUserDetailsObj = require('../../../00_common/actions/readExcelData');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const openEmailSignaturePageObj = require('../../emailSignature/common/actions');
const openContactListingPageObj = require('../../../06_contact/01_moduleAccessibility/common/actions');
const linkEnvironment = require('../../../../cucumber_config/cucumber_config').linkEnvironment;
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/04_myAccount/generalSettings/screenshots/';

let newFirstNameFieldData = 'no', newLastNameFieldData = 'no', newMobileFieldData = 'no', newTimeFormatDrpdwnData = 'no';
let newDateFormatDrpdwnData = 'no', newTimezoneDrpdwnData = 'no', newNickNameFieldData = 'no', newEmailSign = 'no', newEmailSignPlacementState = 'no';
let existingFirstNameFieldData = 'no', existingLastNameFieldData = 'no', existingEmailFieldData = 'no';
let existingMobileFieldData = 'no', existingNickNameFieldData = 'no';
const dataRequiredCase = 'required validation', dataLengthCase = 'length validation', dataDuplicateCase = 'duplication';
const invalidDataCase = 'invalid email format';
let expectedEmailSignatureFormat, resetFirstName, resetLastName;

Given('the {string} is on general settings page', async (user) =>{
    const currentPageTitle = await driver.getTitle();

    //will check that the user is on which page
    if(currentPageTitle == 'General - My Account'){
        console.log('The general settings page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
            then the process to open general settings page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on general settings page');

        //will open the general settings page
        await actionObj.openGeneralSettingsPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
            then the process to open general settings page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on general settings page');

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on general settings page');

        //will open the general settings page
        await actionObj.openGeneralSettingsPage(driver,screenshotPath);
    }
    else{
        //as the user is logged in, it will open the general settings page
        await actionObj.openGeneralSettingsPage(driver,screenshotPath);
    }
});

When('click on the Update button', async () =>{
    //will find 'update' button and then click on that
    const updateBtn = await generalSettingsPageElementObj.findUpdateBtn(driver,screenshotPath);
    await updateBtn.click();
    try{
        await driver.wait(until.elementIsEnabled(updateBtn),30000,'There seems to be some issue while updating.');
    }catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
    await driver.sleep(1000);
});

When('the user update general settings with the following valid data:', async (dataTable) =>{
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'first name') {
                newFirstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required first name field is given or not
                if (newFirstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required First Name field, the test case execution has been aborted');
                }

                //will find 'First Name' field and
                const firstNameField = await generalSettingsPageElementObj.findFirstNameField(driver, screenshotPath);
                resetFirstName = await firstNameField.getAttribute('value');
                //will pass the new data
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(newFirstNameFieldData);
            } else if (fieldName == 'last name') {
                newLastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required last name field is given or not
                if (newLastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required Last Name field, the test case execution has been aborted');
                }

                //will find 'Last Name' field
                const lastNameField = await generalSettingsPageElementObj.findLastNameField(driver, screenshotPath);
                resetLastName = await lastNameField.getAttribute('value');
                //will pass the new data
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(newLastNameFieldData);
            } else if (fieldName == 'mobile') {
                newMobileFieldData = dataTable.rawTable[i][1];

                //will find 'Mobile' field and pass the new data
                const mobileField = await generalSettingsPageElementObj.findMobileField(driver, screenshotPath);
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(newMobileFieldData);
            } else if (fieldName == 'time format') {
                newTimeFormatDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the required time format field is given or not
                if (newTimeFormatDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the required time format field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Time Format' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'timeFormat', newTimeFormatDrpdwnData, 'no');
            } else if (fieldName == 'date format') {
                newDateFormatDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the required date format field is given or not
                if (newDateFormatDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the required date format field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Date Format' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'dateFormat', newDateFormatDrpdwnData, 'no');
            } else if (fieldName == 'timezone') {
                newTimezoneDrpdwnData = dataTable.rawTable[i][1];

                //will check that the data for the required timezone field is given or not
                if (newTimezoneDrpdwnData == '') {
                    await assert.fail('Due to the blank value is provided for the required timezone field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Timezone' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'timezone', newTimezoneDrpdwnData, 'yes');
            } else if (fieldName == 'nick name') {
                newNickNameFieldData = dataTable.rawTable[i][1];

                //will find 'Nick Name' field and pass the data
                const nickNameField = await generalSettingsPageElementObj.findNickNameField(driver, screenshotPath);
                await clearFieldDataObj.clearFieldData(nickNameField);
                await nickNameField.sendKeys(newNickNameFieldData);
            } else if (fieldName == 'email signature') {
                newEmailSign = dataTable.rawTable[i][1];

                //will find email signature iFrame and then change focus on that
                const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
                await driver.switchTo().frame(emailSignatureiFrame);

                //will find 'Email Signature' field and pass the data
                const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);
                await emailSignatureField.clear();
                await emailSignatureField.sendKeys(newEmailSign);

                //will switch back to the main page
                await driver.switchTo().defaultContent();
            } else if (fieldName == 'email signature placement') {
                newEmailSignPlacementState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (newEmailSignPlacementState == 'enable' || newEmailSignPlacementState == 'disable') {
                    //will find 'Email Signature Placement' toggle button
                    const emailSignaturePlacementCheckbox = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
                    await driver.executeScript("arguments[0].focus();", emailSignaturePlacementCheckbox);
                    await driver.sleep(1000);

                    //will get the current value of 'Email Signature Placement'
                    const currentState = await emailSignaturePlacementCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Email Signature Placement' toggle button
                    if (currentState != newEmailSignPlacementState) {
                        await driver.executeScript("arguments[0].click();", emailSignaturePlacementCheckbox);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the email signature placement field is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else {
                await assert.fail('Due to the provided \'' + dataTable.rawTable[i][0] + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name, Last Name, Mobile, Time Format, Date Format, Timezone, Nick Name, Email Signature and Email Signature Placement fields only');
            }
        }

        //will check whether the test data for all test fields is given or not
        if (newFirstNameFieldData == 'no' || newLastNameFieldData == 'no' || newMobileFieldData == 'no' || newTimeFormatDrpdwnData == 'no' || newDateFormatDrpdwnData == 'no' || newTimezoneDrpdwnData == 'no' || newNickNameFieldData == 'no' || newEmailSign == 'no' || newEmailSignPlacementState == 'no') {
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> First Name, Last Name, Mobile, Time Format, Date Format, Timezone, Nick Name, Email Signature and Email Signature Placement fields');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user doesn\'t enter any value to the {string} field', async (field) =>{
    try {
        if (field.toLowerCase() == 'optional') {
            try {
                //will find 'Mobile' field and then clear that field data
                const mobileField = await generalSettingsPageElementObj.findMobileField(driver, screenshotPath);
                await clearFieldDataObj.clearFieldData(mobileField);
            } catch (err) {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                assert.fail(err);
            }
        } else if (field.toLowerCase() == 'nick name') {
            try {
                //will find 'Nick Name' field and then clear that field data
                const nickNameField = await generalSettingsPageElementObj.findNickNameField(driver, screenshotPath);
                await clearFieldDataObj.clearFieldData(nickNameField);
            } catch (err) {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                assert.fail(err);
            }
        } else {
            assert.fail('The provided \'' + field + '\' value is not valid. The value should be either \'optional\' or \'nick name\'');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user update {string} field with {string} data for {string} case', async (field,fieldData,testcase) =>{
    try {
        const changeFocus = await driver.findElement(By.xpath('//div[contains(text(),"General Settings")]'));
        const fieldName = field.toLowerCase();
        testcase = testcase.toLowerCase();

        //will check whether the provided field is part of the test case or not
        if (fieldName == 'first name') {
            //will check that the provided first name field data is valid to execute a test case or not
            if (testcase == dataRequiredCase && fieldData != '') {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                assert.fail('The test case execution has been aborted because it is required to pass a blank value to the First Name field to check a required validation message');
            } else if (testcase == dataLengthCase && fieldData.length <= 100) {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                assert.fail('The test case execution has been aborted because it is required to pass more than 100 characters to the First Name field to check a field length validation message. Provided Characters Length: ' + fieldData.length);
            }

            //will find 'First Name' field and get its existing value
            const firstNameField = await generalSettingsPageElementObj.findFirstNameField(driver, screenshotPath);
            existingFirstNameFieldData = await firstNameField.getAttribute('value');

            if (testcase == dataRequiredCase || testcase == dataLengthCase) {
                //will pass new data to the 'First Name' field
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(fieldData);
                await changeFocus.click();
            }
        } else if (fieldName == 'last name') {
            //will check that the provided last name field data is valid to execute a test case or not
            if (testcase == dataRequiredCase && fieldData != '') {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                await assert.fail('The test case execution has been aborted because it is required to pass a blank value to the Last Name field to check a required validation message');
            } else if (testcase == dataLengthCase && fieldData.length <= 100) {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                await assert.fail('The test case execution has been aborted because it is required to pass more than 100 characters to the Last Name field to check a field length validation message. Provided Characters Length: ' + fieldData.length);
            }

            //will find 'Last Name' field and get its existing value
            const lastNameField = await generalSettingsPageElementObj.findLastNameField(driver, screenshotPath);
            existingLastNameFieldData = await lastNameField.getAttribute('value');

            if (testcase == dataRequiredCase || testcase == dataLengthCase) {
                //will pass new data to the 'Last Name' field
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(fieldData);
                await changeFocus.click();
            }
        } else if (fieldName == 'mobile') {
            //will check that the provided mobile field data is valid to execute a test case or not
            if (testcase == dataLengthCase && fieldData.length <= 250) {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                await assert.fail('The test case execution has been aborted because it is required to pass more than 250 characters to the Mobile field to check a field length validation message. Provided Characters Length: ' + fieldData.length);
            }

            //will find 'Mobile' field and get its existing value
            const mobileField = await generalSettingsPageElementObj.findMobileField(driver, screenshotPath);
            existingMobileFieldData = await mobileField.getAttribute('value');

            if (testcase == dataLengthCase) {
                //will pass new data to the 'Mobile' field
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(fieldData);
                await changeFocus.click();
            }
        } else if (fieldName == 'nick name') {
            //will check that the provided nick name field data is valid to execute a test case or not
            if (testcase == dataLengthCase && fieldData.length <= 100) {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                await assert.fail('The test case execution has been aborted because it is required to pass more than 100 characters to the Nick Name field to check a field length validation message. Provided Characters Length: ' + fieldData.length);
            }

            //will find 'Nick Name' field and get its existing value
            const nickNameField = await generalSettingsPageElementObj.findNickNameField(driver, screenshotPath);
            existingNickNameFieldData = await nickNameField.getAttribute('value');

            if (testcase == dataLengthCase) {
                //will pass new data to the 'Nick Name' field
                await clearFieldDataObj.clearFieldData(nickNameField);
                await nickNameField.sendKeys(fieldData);
                await changeFocus.click();
            }
        } else if (fieldName == 'email') {
            let newEmailData = 'no';

            //will find 'Email' field and get its existing value
            const emailField = await generalSettingsPageElementObj.findEmailField(driver, screenshotPath);
            existingEmailFieldData = await emailField.getAttribute('value');

            //will check that the provided email field data is valid to execute a test case or not
            if (testcase == dataRequiredCase && fieldData != '') {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                await assert.fail('The test case execution has been aborted because it is required to pass a blank value to the Email field to check a required validation message');
            } else if (testcase == dataLengthCase && fieldData.length <= 100) {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                await assert.fail('The test case execution has been aborted because it is required to pass more than 100 characters to the Email field to check a field length validation message. Provided Characters Length: ' + fieldData.length);
            } else if (testcase == invalidDataCase && fieldData == '') {
                await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                await assert.fail('The test case execution has been aborted because it is required to pass an invalid data to the Email field to check an invalid data validation message');
            } else if (testcase == dataDuplicateCase) {
                let userDetails;
                //will fetch the email address of another user from the excel file
                if (linkEnvironment.toLocaleLowerCase() == 'dev') {
                    userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx', 'UserDetails');
                } else {
                    userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx', 'UserDetails');
                }
                for (let i = 0; i < userDetails.user.length; i++) {
                    if (existingEmailFieldData != userDetails.email[i]) {
                        newEmailData = userDetails.email[i];
                    }
                }
                if (newEmailData == 'no' || newEmailData == '') {
                    await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
                    assert.fail('The test case execution has been aborted because two users with different email address must be required to check the duplicate email address case. Note: Please provides these data in the test data excel file.');
                }
            }

            //will pass new data to the 'Email' field
            if (testcase == dataRequiredCase || testcase == dataLengthCase || testcase == invalidDataCase) {
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(fieldData);
                await changeFocus.click();
            } else if (testcase == dataDuplicateCase) {
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(newEmailData);
            }
        } else {
            await assert.fail('Due to the provided \'' + field + '\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> First Name, Last Name, Email, Mobile and Nick Name fields only');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user {string} place this signature before quoted text in replies option', async (newState) =>{
    try {
        //will check that the provided data is valid to execute a test case or not
        if (newState.toLowerCase() == 'enable' || newState.toLowerCase() == 'disable') {
            //will find 'Email Signature Placement' toggle button
            const emailSignaturePlacementCheckbox = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
            await driver.executeScript("arguments[0].focus();", emailSignaturePlacementCheckbox);
            await driver.sleep(1000);

            //will get the current value of 'Email Signature Placement'
            const currentState = await emailSignaturePlacementCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

            //will enable/disable 'Email Signature Placement' toggle button
            if (currentState != newState.toLowerCase()) {
                await driver.executeScript("arguments[0].click();", emailSignaturePlacementCheckbox);
            } else {
                console.log('The \'Place this signature before quoted text in replies\' option is already ' + newState.toLowerCase() + 'd')
            }
        } else {
            assert.fail('The provided \'' + newState + '\' value for the email signature placement field is not valid. The value should be either \'enable\' or \'disable\'');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user click on {string} option with {string} value and then enter {string} email signature', async (format,formatValue,signatureText) =>{
    try {
        //will make the email signature field visible on the screen
        const setFocusOnEmailSignField = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
        await driver.executeScript("arguments[0].focus();", setFocusOnEmailSignField);

        //will find 'Email Signature' field and then clear that field data
        const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
        await driver.switchTo().frame(emailSignatureiFrame);
        let emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);
        await emailSignatureField.clear();
        await driver.switchTo().defaultContent();
        await driver.sleep(1000);
        //will click on the provided format option with the format value
        await actionObj.clickOnEmailSignatureFormatOption(driver, screenshotPath, format, formatValue, signatureText);

        await driver.switchTo().frame(emailSignatureiFrame);

        //will enter provided email signature
        if (format.toLowerCase() != 'insert link' && format.toLowerCase() != 'undo' && format.toLowerCase() != 'redo') {
            await emailSignatureField.sendKeys(signatureText);
        }

        //will get HTML format of newly entered email signature
        expectedEmailSignatureFormat = await driver.executeScript("return arguments[0].outerHTML;", emailSignatureField);
        //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('<br>', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('<div>', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('</div>', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('fr-draggable', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/ /g, '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/[^\x20-\x7E]/g, '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/ *\<span[^]*span\>*/g, '');

        await driver.switchTo().defaultContent();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user {string} his email signature', async (setORremoveEmailSign) =>{
    try {
        //will make the email signature field visible on the screen
        const setFocusOnEmailSignField = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
        await driver.executeScript("arguments[0].focus();", setFocusOnEmailSignField);

        //will find email signature iFrame and then change focus on that
        const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
        await driver.switchTo().frame(emailSignatureiFrame);

        //will find 'Email Signature' field
        const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);

        //will set or remove email signature
        if (setORremoveEmailSign.toLowerCase() == 'set') {
            await emailSignatureField.clear();
            await driver.executeScript("arguments[0].innerHTML='<body class=\"fr-view\" dir=\"auto\" contenteditable=\"true\" style=\"min-height: 200px;\" aria-disabled=\"false\" spellcheck=\"true\"><p><strong><em><span style=\"color: rgb(41, 105, 176);\">Regards,</span></em></strong></p><p><strong><em><span style=\"color: rgb(41, 105, 176); font-family: Tahoma, Geneva, sans-serif; font-size: 20px;\">Automated Test</span></em></strong></p><p><strong><em><span style=\"color: rgb(41, 105, 176);\"><img src=\"http://images.clipartpanda.com/computer-clip-art-computer-clipart-black-and-white.png\" class=\"fr-fic fr-dib fr-fil fr-draggable\" style=\"width: 120px;\"></span></em></strong></p></body>';", emailSignatureField);
        } else if (setORremoveEmailSign.toLowerCase() == 'remove') {
            await emailSignatureField.clear();
            await driver.executeScript("arguments[0].innerHTML='<body class=\"fr-view\" dir=\"auto\" contenteditable=\"true\" style=\"min-height: 200px;\" aria-disabled=\"false\" spellcheck=\"true\"><div><br></div></body>';", emailSignatureField);
        } else {
            //will switch back to the main page before failing the test case
            await driver.switchTo().defaultContent();
            assert.fail('The provided \'' + setORremoveEmailSign + '\' value is not valid to execute test case. The value should be either \'set\' or \'remove\'');
        }

        //will get HTML format of entered new email signature
        expectedEmailSignatureFormat = await driver.executeScript("return arguments[0].outerHTML;", emailSignatureField);
        //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('<br>', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('fr-draggable', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/ /g, '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/[^\x20-\x7E]/g, '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/ *\<span[^]*span\>*/g, '');
        //will switch back to the main page
        await driver.switchTo().defaultContent();
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the details of general settings should get updated', async () =>{
    try {
        let fieldName;

        //will find notification message after updating general settings
        let notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);

        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();

        //will check whether the notification message is a success message or not
        try {
            assert.strictEqual(notyMessageText, 'Updated successfully.');
        } catch (err) {
            await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
            await driver.sleep(1000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SuccessMessage_NotGiven.png');
            assert.fail('Due to the success message is not given after updating the general settings, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'SuccessMessage_NotGiven.png\'');
        }

        //will navigate on the another page and then come back to the general settings page
        await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
        await driver.sleep(1000);

        //will check whether all test fields data are get updated or not
        try {
            fieldName = 'FirstName';
            const firstNameField = await generalSettingsPageElementObj.findFirstNameField(driver, screenshotPath);
            assert.strictEqual(await firstNameField.getAttribute('value'), newFirstNameFieldData);

            fieldName = 'LastName';
            const lastNameField = await generalSettingsPageElementObj.findLastNameField(driver, screenshotPath);
            assert.strictEqual(await lastNameField.getAttribute('value'), newLastNameFieldData);

            fieldName = 'Mobile';
            const mobileField = await generalSettingsPageElementObj.findMobileField(driver, screenshotPath);
            assert.strictEqual(await mobileField.getAttribute('value'), newMobileFieldData);

            fieldName = 'TimeFormat';
            const timeFormatDrpdwn = await formElementObj.findDropdown(driver, screenshotPath, 'timeFormat');
            assert.strictEqual(await timeFormatDrpdwn.getText(), newTimeFormatDrpdwnData);

            fieldName = 'DateFormat';
            const dateFormatDrpdwn = await formElementObj.findDropdown(driver, screenshotPath, 'dateFormat');
            assert.strictEqual(await dateFormatDrpdwn.getText(), newDateFormatDrpdwnData);

            fieldName = 'Timezone';
            const timezoneDrpdwn = await formElementObj.findDropdown(driver, screenshotPath, 'timezone');
            assert.strictEqual(await timezoneDrpdwn.getText(), newTimezoneDrpdwnData);

            fieldName = 'NickName';
            const nickNameField = await generalSettingsPageElementObj.findNickNameField(driver, screenshotPath);
            assert.strictEqual(await nickNameField.getAttribute('value'), newNickNameFieldData);

            fieldName = 'EmailSignature';
            const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
            await driver.switchTo().frame(emailSignatureiFrame);
            const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);
            assert.strictEqual(await emailSignatureField.getText(), newEmailSign);
            await driver.switchTo().defaultContent();

            fieldName = 'EmailSignaturePlacement';
            const emailSignaturePlacementCheckbox = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
            await driver.executeScript("arguments[0].focus();", emailSignaturePlacementCheckbox);
            await driver.sleep(1000);
            const actualEmailSignPlacementState = await emailSignaturePlacementCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';
            const expectedEmailSignPlacementState = newEmailSignPlacementState;
            assert.strictEqual(actualEmailSignPlacementState, expectedEmailSignPlacementState);
        } catch (err) {
            if (fieldName == 'EmailSignature') {
                await driver.switchTo().defaultContent();
            }
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'FieldData_NotUpdated.png');
            assert.fail('Due to the \'' + fieldName + '\' field data is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'FieldData_NotUpdated.png\'');
        }
        console.log('\'Update general settings with valid data\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the general settings should get updated and the optional fields should be displayed as blank', async () =>{
    try {
        //will find notification message after updating general settings
        let notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);

        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();

        //will check whether the notification message is a success message or not
        try {
            assert.strictEqual(notyMessageText, 'Updated successfully.');
        } catch (err) {
            await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
            await driver.sleep(1000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SuccessMessage_NotGiven.png');
            assert.fail('Due to the success message is not given after updating the general settings, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'SuccessMessage_NotGiven.png\'');
        }

        //will navigate on the another page and then come back to the general settings page
        await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
        await driver.sleep(1000);

        try {
            //will check whether the mobile field gets blank or not
            const mobileField = await generalSettingsPageElementObj.findMobileField(driver, screenshotPath);
            assert.strictEqual(await mobileField.getAttribute('value'), '');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'MobileFieldData_NotRemoved.png');
            assert.fail('Due to the mobile field data is not removed, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'MobileFieldData_NotRemoved.png\'');
        }
        console.log('\'Update general settings with leaving optional fields as blank\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the first name should get displayed on the nick name field', async () =>{
    try {
        //will find notification message after updating general settings
        let notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);

        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();

        //will check whether the notification message is a success message or not
        try {
            assert.strictEqual(notyMessageText, 'Updated successfully.');
        } catch (err) {
            await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
            await driver.sleep(1000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SuccessMessage_NotGiven.png');
            assert.fail('Due to the success message is not given after updating the general settings, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'SuccessMessage_NotGiven.png\'');
        }

        //will navigate on the another page and then come back to the general settings page
        await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
        await driver.sleep(1000);

        try {
            //will check the first name field data are showing in a nick name field or not when that field is blank
            const nickNameField = await generalSettingsPageElementObj.findNickNameField(driver, screenshotPath);
            const firstNameField = await generalSettingsPageElementObj.findFirstNameField(driver, screenshotPath);
            assert.strictEqual(await nickNameField.getAttribute('value'), await firstNameField.getAttribute('value'));
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'NickName_And_FirstName_FieldData_Not_Same.png');
            assert.fail('Due to the nick name and first name field data are not the same, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'NickName_And_FirstName_FieldData_Not_Same.png\'');
        }
        console.log('\'Display the first name on the nick name field when that field is blank\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should give {string} message for {string} field in case of {string}', async (expectedValidationMessage,field,testcase) =>{
    try {
        let fieldName = field.toLowerCase();
        testcase = testcase.toLowerCase();

        //will check that the field validation message is as per the expectation or not
        try {
            if (fieldName == 'first name' && (testcase == dataRequiredCase || testcase == dataLengthCase)) {
                fieldName = 'FirstName';
                //will find first name field validation message
                const firstNameField = await generalSettingsPageElementObj.findFirstNameField(driver, screenshotPath);
                const firstNameFieldValidation = await generalSettingsPageElementObj.findFieldValidationMessage(driver, screenshotPath, firstNameField);
                //will compare the actual and expected field validation messages
                assert.strictEqual(await firstNameFieldValidation.getText(), expectedValidationMessage);
            } else if (fieldName == 'last name' && (testcase == dataRequiredCase || testcase == dataLengthCase)) {
                fieldName = 'LastName';
                //will find last name field validation message
                const lastNameField = await generalSettingsPageElementObj.findLastNameField(driver, screenshotPath);
                const lastNameFieldValidation = await generalSettingsPageElementObj.findFieldValidationMessage(driver, screenshotPath, lastNameField);
                //will compare the actual and expected field validation messages
                assert.strictEqual(await lastNameFieldValidation.getText(), expectedValidationMessage);
            } else if (fieldName == 'mobile' && testcase == dataLengthCase) {
                fieldName = 'Mobile';
                //will find mobile field validation message
                const mobileField = await generalSettingsPageElementObj.findMobileField(driver, screenshotPath);
                const mobileFieldValidation = await generalSettingsPageElementObj.findFieldValidationMessage(driver, screenshotPath, mobileField);
                //will compare the actual and expected field validation messages
                assert.strictEqual(await mobileFieldValidation.getText(), expectedValidationMessage);
            } else if (fieldName == 'nick name' && testcase == dataLengthCase) {
                fieldName = 'NickName';
                //will find nick name field validation message
                const nickNameField = await generalSettingsPageElementObj.findNickNameField(driver, screenshotPath);
                const nickNameFieldValidation = await generalSettingsPageElementObj.findFieldValidationMessage(driver, screenshotPath, nickNameField);
                //will compare the actual and expected field validation messages
                assert.strictEqual(await nickNameFieldValidation.getText(), expectedValidationMessage);
            } else if (fieldName == 'email' && (testcase == dataRequiredCase || testcase == dataLengthCase || testcase == dataDuplicateCase || testcase == invalidDataCase)) {
                fieldName = 'Email';

                if (testcase == dataDuplicateCase) {
                    //will find notification message after updating general settings
                    const notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);
                    //will compare the actual and expected validation messages
                    assert.strictEqual(await notyMessage.getText(), expectedValidationMessage);
                } else {
                    //will find email field validation message
                    const emailField = await generalSettingsPageElementObj.findEmailField(driver, screenshotPath);
                    const emailFieldValidation = await generalSettingsPageElementObj.findFieldValidationMessage(driver, screenshotPath, emailField);
                    //will compare the actual and expected field validation messages
                    assert.strictEqual(await emailFieldValidation.getText(), expectedValidationMessage);
                }
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'Field_ValidationMsg_NotValid.png');
            await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
            assert.fail('Due to the \'' + fieldName + '\' field validation message is not as per the expectation, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'Field_ValidationMsg_NotValid.png\'');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the details of general settings should not get updated in case of {string}', async (testcase) =>{
    try {
        //will navigate on the another page and then come back to the general settings page
        await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);

        //will find test case fields
        const firstNameField = await generalSettingsPageElementObj.findFirstNameField(driver, screenshotPath);
        const lastNameField = await generalSettingsPageElementObj.findLastNameField(driver, screenshotPath);
        const mobileField = await generalSettingsPageElementObj.findMobileField(driver, screenshotPath);
        const nickNameField = await generalSettingsPageElementObj.findNickNameField(driver, screenshotPath);
        const emailField = await generalSettingsPageElementObj.findEmailField(driver, screenshotPath);

        //will check that the data of all test fields should not get updated
        try {
            if (testcase.toLowerCase() == dataRequiredCase) {
                fieldName = 'FirstName';
                assert.strictEqual(await firstNameField.getAttribute('value'), existingFirstNameFieldData);

                fieldName = 'LastName';
                assert.strictEqual(await lastNameField.getAttribute('value'), existingLastNameFieldData);

                fieldName = 'Email';
                assert.strictEqual(await emailField.getAttribute('value'), existingEmailFieldData);
            } else if (testcase.toLowerCase() == dataLengthCase) {
                fieldName = 'FirstName';
                assert.strictEqual(await firstNameField.getAttribute('value'), existingFirstNameFieldData);

                fieldName = 'LastName';
                assert.strictEqual(await lastNameField.getAttribute('value'), existingLastNameFieldData);

                fieldName = 'Email';
                assert.strictEqual(await emailField.getAttribute('value'), existingEmailFieldData);

                fieldName = 'Mobile';
                assert.strictEqual(await mobileField.getAttribute('value'), existingMobileFieldData);

                fieldName = 'NickName';
                assert.strictEqual(await nickNameField.getAttribute('value'), existingNickNameFieldData);
            } else if (testcase.toLowerCase() == invalidDataCase) {
                fieldName = 'Email';
                assert.strictEqual(await emailField.getAttribute('value'), existingEmailFieldData);
            } else if (testcase.toLowerCase() == dataDuplicateCase) {
                fieldName = 'Email';
                assert.strictEqual(await emailField.getAttribute('value'), existingEmailFieldData);
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + 'FieldData_Updated.png');
            assert.fail('Due to the \'' + fieldName + '\' field data is get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + fieldName + 'FieldData_Updated.png\'');
        }
        console.log('The \'Update general settings to check ' + testcase.toLowerCase() + '\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the place this signature before quoted text in replies option should get {string} on the {string} page', async (expectedState,page) =>{
    try {
        if (page.toLowerCase() == 'general settings') {
            //will navigate on the another page and then come back to the general settings page
            await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
            await driver.sleep(1000);
        } else if (page.toLowerCase() == 'email signature') {
            //will navigate on the another page and then come back to the email signature page
            await openEmailSignaturePageObj.comeBackToEmailSignaturePage(driver, screenshotPath);
            await driver.sleep(1000);
        } else {
            assert.fail('The provided \'' + page + '\' page name is not valid. Expected Page Name ---> \'General Settings\' OR \'Email Signature\'');
        }

        //will find 'Email Signature Placement' toggle button
        const emailSignaturePlacementCheckbox = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
        await driver.executeScript("arguments[0].focus();", emailSignaturePlacementCheckbox);
        await driver.sleep(1000);

        //will get the current value of 'Email Signature Placement'
        const actualState = await emailSignaturePlacementCheckbox.getAttribute('value') == 'true' ? 'enabled' : 'disabled';

        //will check 'Email Signature Placemente' option get updated or not
        try {
            await assert.strictEqual(actualState, expectedState.toLowerCase());
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'PlaceEmailSignBeforeReply_NotUpdated.png');
            assert.fail('Due to the \'Place email signature before reply quote\' option is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'PlaceEmailSignBeforeReply_NotUpdated.png\'');
        }

        const state = actualState == 'enabled' ? 'enable' : 'disable'
        console.log('\'Do ' + state + ' \"Place email signature before reply quote\" option\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the email signature should get displayed in the {string} format on the {string} page', async (format,page) =>{
    try {
        let formatOpt;
        if (format.toLowerCase() == 'color text') {
            formatOpt = 'ColorText';
        } else if (format.toLowerCase() == 'background color text') {
            formatOpt = 'BackgroundColorText';
        } else if (format.toLowerCase() == 'order list') {
            formatOpt = 'OrderList';
        } else if (format.toLowerCase() == 'unorder list') {
            formatOpt = 'UnorderList';
        } else if (format.toLowerCase() == 'insert link') {
            formatOpt = 'InsertLink';
        } else if (format.toLowerCase() == 'insert image') {
            formatOpt = 'InsertImage';
        } else if (format.toLowerCase() == 'font family') {
            formatOpt = 'FontFamily';
        } else if (format.toLowerCase() == 'font size') {
            formatOpt = 'FontSize';
        } else if (format.toLowerCase() == 'code view') {
            formatOpt = 'CodeView';
        } else {
            formatOpt = format;
        }

        //will find notification message after updating general settings
        let notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);

        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();

        //will check whether the notification message is a success message or not
        try {
            assert.strictEqual(notyMessageText, 'Updated successfully.');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SuccessMessage_NotGiven.png');
            await driver.navigate().refresh();
            await driver.sleep(1000);
            assert.fail('Due to the success message is not given after updating the general settings, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'SuccessMessage_NotGiven.png\'');
        }

        if (page.toLowerCase() == 'general settings') {
            //will navigate on the another page and then come back to the general settings page
            await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
            await driver.sleep(1000);
        } else if (page.toLowerCase() == 'email signature') {
            //will navigate on the another page and then come back to the email signature page
            await openEmailSignaturePageObj.comeBackToEmailSignaturePage(driver, screenshotPath);
            await driver.sleep(1000);
        } else if (page.toLowerCase() == 'contact details') {
            //will navigate on the another page and then come back to the contact details page
            await openContactListingPageObj.comeBackToContactListingPage(driver, screenshotPath);
            await driver.sleep(2000);
        } else {
            assert.fail('The provided \'' + page + '\' page name is not valid. Expected Page Name ---> \'General Settings\' OR \'Email Signature\'');
        }

        //will find 'Email Signature' field
        const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
        await driver.switchTo().frame(emailSignatureiFrame);
        const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);

        //will get HTML format of the updated email signature
        let actualEmailSignatureFormat = await driver.executeScript("return arguments[0].outerHTML;", emailSignatureField);
        //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('<br>', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('<div>', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('</div>', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('fr-draggable', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/ /g, '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/[^\x20-\x7E]/g, '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/ *\<span[^]*span\>*/g, '');
        if (format.toLowerCase() == 'redo') {
            actualEmailSignatureFormat = actualEmailSignatureFormat.replace('<p>', '');
            actualEmailSignatureFormat = actualEmailSignatureFormat.replace('</p>', '');
        }

        await driver.switchTo().defaultContent();

        //will compare actual and expected email signature HTML code
        try {
            assert.strictEqual(actualEmailSignatureFormat, expectedEmailSignatureFormat);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'EmailSignature_' + formatOpt + 'FormatOption_NotWorking.png');
            assert.fail('Due to the ' + format + ' format option of email signature is not working, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'EmailSignature_' + formatOpt + 'FormatOption_NotWorking.png\'');
        }

        console.log('\'Format email signature with \"' + format.toLowerCase() + '\" format option\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the email signature should get {string} on the {string} page', async (setORremoveEmailSign,page) =>{
    try {
        let actualEmailSignatureFormat;

        //will find notification message after updating general settings
        let notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);

        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();

        //will check whether the notification message is a success message or not
        try {
            assert.strictEqual(notyMessageText, 'Updated successfully.');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SuccessMessage_NotGiven.png');
            await driver.navigate().refresh();
            await driver.sleep(1000);
            assert.fail('Due to the success message is not given after updating the general settings, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'SuccessMessage_NotGiven.png\'');
        }

        if (page.toLowerCase() == 'general settings') {
            //will navigate on the another page and then come back to the general settings page
            await actionObj.comeBackToGeneralSettingsPage(driver, screenshotPath);
            await driver.sleep(1000);
        } else if (page.toLowerCase() == 'email signature') {
            //will navigate on the another page and then come back to the email signature page
            await openEmailSignaturePageObj.comeBackToEmailSignaturePage(driver, screenshotPath);
            await driver.sleep(1000);
        } else {
            assert.fail('The provided \'' + page + '\' page name is not valid. Expected Page Name ---> \'General Settings\' OR \'Email Signature\'');
        }

        //will make the email signature field visible on the screen
        const setFocusOnEmailSignField = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
        await driver.executeScript("arguments[0].focus();", setFocusOnEmailSignField);
        await driver.sleep(1000);

        //will find email signature iFrame and then change focus on that
        const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
        await driver.switchTo().frame(emailSignatureiFrame);

        //will find 'Email Signature' field
        const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);

        //will get HTML format of updated email signature
        actualEmailSignatureFormat = await driver.executeScript("return arguments[0].outerHTML;", emailSignatureField);
        //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('<br>', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('fr-draggable', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/ /g, '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/[^\x20-\x7E]/g, '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/ *\<span[^]*span\>*/g, '');

        //will switch back to the main page
        await driver.switchTo().defaultContent();

        //will compare HTML format of actual and expected email signature
        try {
            assert.strictEqual(actualEmailSignatureFormat, expectedEmailSignatureFormat);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'EmailSignature_Not_' + setORremoveEmailSign + '.png');
            assert.fail('Due to the email signature is not get ' + setORremoveEmailSign.toLowerCase() + ', the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'EmailSignature_Not_' + setORremoveEmailSign + '.png\'');
        }

        const operation = setORremoveEmailSign.toLowerCase() == 'set' ? 'set' : 'remove';
        console.log('The \'' + operation + ' email signature\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('reset first name and last name', async () =>{
    try {
        //will find 'First Name' field and reset the value
        const firstNameField = await generalSettingsPageElementObj.findFirstNameField(driver, screenshotPath);
        await clearFieldDataObj.clearFieldData(firstNameField);
        await firstNameField.sendKeys(resetFirstName);
        //will find 'Last Name' field and reset the value
        const lastNameField = await generalSettingsPageElementObj.findLastNameField(driver, screenshotPath);
        await clearFieldDataObj.clearFieldData(lastNameField);
        await lastNameField.sendKeys(resetLastName);
        //will find 'update' button and then click on that
        const updateBtn = await generalSettingsPageElementObj.findUpdateBtn(driver, screenshotPath);
        await updateBtn.click();
        await driver.wait(until.elementIsEnabled(updateBtn), 30000, 'There seems to be some issue while updating.');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
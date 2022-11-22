const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const voicemailPageElementObj = require('../common/voicemailPageElements');
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const actionObj = require('../common/actions');
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/04_myAccount/voicemailDrop/screenshots/';

let expectedNumberofVoicemail;

Given('the {string} is on voicemail drop page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/user/voicemailDrop')){
        console.log('The voicemail drop page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open voicemail drop page will be started from by performing the Salesmate login
        */


        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on voicemail drop page');
        //will open the voicemail drop page
        await actionObj.openVoicemailDropPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open voicemail drop page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on voicemail drop page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on voicemail drop page');
        //will open the voicemail drop page
        await actionObj.openVoicemailDropPage(driver,screenshotPath);
    }
    else{
        //will open the voicemail drop page
        await actionObj.openVoicemailDropPage(driver,screenshotPath);
    }
});

When('the user click on the {string} button', async (button) =>{
    try {
        if (button.toLowerCase() == 'upload audio') {
            //will find 'Upload Audio' button and then click on that
            const uploadAudioButton = await voicemailPageElementObj.findUploadAudioButton(driver, screenshotPath);
            await uploadAudioButton.click();
            await driver.sleep(2000);
        } else {
            assert.fail('The provided \'' + button + '\' value is not valid. The value should be \'upload audio\'.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('{string} Subject:{string}', async (operation,subject) =>{
    //will find 'Subject' field
    try {
        const subjectField = await voicemailPageElementObj.findSubjectField(driver, screenshotPath);

        if (operation.toLowerCase() == 'enter' || operation.toLowerCase() == 'update') {
            //will pass the provided data to the 'Subject' field
            await clearFieldDataObj.clearFieldData(subjectField);
            await subjectField.sendKeys(subject);
        } else if (operation.toLowerCase() == 'leave blank') {
            //will clear the 'Subject' field data
            await clearFieldDataObj.clearFieldData(subjectField);
        } else {
            await driver.navigate().refresh();
            assert.fail('The provided \'' + operation + '\' value is not valid. The value should be one of this: enter, update or leave blank.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('{string} Voicemail File:{string}', async (operation,file) =>{
    try {
        const filepath = await path.resolve(__dirname, '../testdata/' + file);
        let uploadFileField;

        if (operation.toLowerCase() == 'upload') {
            //will upload provided file
            uploadFileField = await voicemailPageElementObj.findUploadFileElement(driver, screenshotPath);
            await uploadFileField.sendKeys(filepath);
            await driver.sleep(2000);
        } else if (operation.toLowerCase() == 'update') {
            //will remove uploaded file
            const cancelUploadedFileButton = await voicemailPageElementObj.findCancelUploadedFileButton(driver, screenshotPath);
            await cancelUploadedFileButton.click();
            await driver.sleep(2000);
            //will upload provided file
            uploadFileField = await voicemailPageElementObj.findUploadFileElement(driver, screenshotPath);
            await uploadFileField.sendKeys(filepath);
            await driver.sleep(2000);
        } else if (operation.toLowerCase() == 'does not upload') {
            //do nothing
        } else if (operation.toLowerCase() == 'remove') {
            //will remove uploaded file
            const cancelUploadedFileButton = await voicemailPageElementObj.findCancelUploadedFileButton(driver, screenshotPath);
            await cancelUploadedFileButton.click();
            await driver.sleep(2000);
        } else {
            await driver.navigate().refresh();
            assert.fail('The provided \'' + operation + '\' value is not valid. The value should be one of this: upload, update, remove or does not upload.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('click on the {string} button', async (button) =>{
    try {
        if (button.toLowerCase() == 'save') {
            //will find the 'Save' button and then click on that
            const saveButton = await voicemailPageElementObj.findSaveButton(driver, screenshotPath);
            await saveButton.click();
            try {
                await driver.wait(until.elementIsEnabled(saveButton), 20000, 'There seems to be some issue while adding or updating voicemail.');
            } catch (err) {
                await driver.navigate().refresh();
                assert.fail(err);
            }
        } else if (button.toLowerCase() == 'yes') {
            //will find the 'Yes' button and then click on that
            const yesButton = await voicemailPageElementObj.findYesButton(driver, screenshotPath);
            await yesButton.click();
            await driver.sleep(2000);
        } else {
            await driver.navigate().refresh();
            assert.fail('The provided \'' + button + '\' value is not valid. The value should be either \'save\' or \'yes\'.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user click on the {string} button of {string} record', async (button,record) =>{
    //will find an existing record(voicemail)
    try {
        const addedUpdatedVoicemailElement = await voicemailPageElementObj.findAddedUpdatedVoicemailElement(driver, screenshotPath, record);

        if (button.toLowerCase() == 'edit') {
            //will click on the 'Edit' button of the existing record
            const editButton = await voicemailPageElementObj.findEditVoicemailButton(driver, screenshotPath, addedUpdatedVoicemailElement);
            await editButton.click();
            await driver.sleep(2000);
        } else if (button.toLowerCase() == 'play') {
            //will click on the 'Play' button of the existing record
            const playPauseVoicemailButton = await voicemailPageElementObj.findPlayPauseButton(driver, screenshotPath, addedUpdatedVoicemailElement);
            await driver.sleep(2000);
            await playPauseVoicemailButton.click();
            await driver.sleep(5000);
        } else if (button.toLowerCase() == 'pause') {
            //will click on the 'Pause' button of the existing record
            const playPauseVoicemailButton = await voicemailPageElementObj.findPlayPauseButton(driver, screenshotPath, addedUpdatedVoicemailElement);
            await playPauseVoicemailButton.click();
            await driver.sleep(2000);
        } else if (button.toLowerCase() == 'remove') {
            //will click on the 'Remove' button of the existing record
            const removeButton = await voicemailPageElementObj.findRemoveVoicemailButton(driver, screenshotPath, addedUpdatedVoicemailElement);
            await removeButton.click();
            await driver.sleep(2000);
        } else {
            assert.fail('The provided \'' + button + '\' value is not valid. The value should be one of this: edit, play, pause or remove.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the {string} add, update or delete voicemail file from his account', async (user) =>{
    try {
        //will get a voicemail file list from the currently logged-in user account
        try {
            const getVoicemailList = await voicemailPageElementObj.getVoicemailList(driver, screenshotPath);
            expectedNumberofVoicemail = getVoicemailList.length;
        } catch (err) {
            expectedNumberofVoicemail = 0;
        }

        /* To check this case, it is required to do login in another provided Salesmate account */

        //will logout from the current login and open the login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} add, update or delete voicemail file from his account');
        //will do Salesmate login with another user's credentials on that browser
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} add, update or delete voicemail file from his account');
        //will open the voicemail drop page on that browser
        await actionObj.openVoicemailDropPage(driver, screenshotPath);
        await driver.sleep(2000);

        //will add new voicemail in another user account
        const uploadAudioButton = await voicemailPageElementObj.findUploadAudioButton(driver, screenshotPath);
        await uploadAudioButton.click();
        await driver.sleep(2000);
        const subjectField = await voicemailPageElementObj.findSubjectField(driver, screenshotPath);
        await clearFieldDataObj.clearFieldData(subjectField);
        await subjectField.sendKeys('Test #2');
        const uploadFileField = await voicemailPageElementObj.findUploadFileElement(driver, screenshotPath);
        await uploadFileField.sendKeys(await path.resolve(__dirname, '../testdata/SampleAudio_0.5mb.mp3'));
        await driver.sleep(2000);
        const saveButton = await voicemailPageElementObj.findSaveButton(driver, screenshotPath);
        await saveButton.click();
        await driver.sleep(5000);

        //will edit newly added voicemail in another user account
        const addedVoicemailElement = await voicemailPageElementObj.findAddedUpdatedVoicemailElement(driver, screenshotPath, 'Test #2');
        const editButton = await voicemailPageElementObj.findEditVoicemailButton(driver, screenshotPath, addedVoicemailElement);
        await editButton.click();
        await driver.sleep(2000);
        const subjectField1 = await voicemailPageElementObj.findSubjectField(driver, screenshotPath);
        await clearFieldDataObj.clearFieldData(subjectField1);
        await subjectField1.sendKeys('Test Updated #2');
        const saveButton1 = await voicemailPageElementObj.findSaveButton(driver, screenshotPath);
        await saveButton1.click();
        await driver.sleep(5000);

        //will delete newly added voicemail in another user account
        const updatedVoicemailElement = await voicemailPageElementObj.findAddedUpdatedVoicemailElement(driver, screenshotPath, 'Test Updated #2');
        const removeButton = await voicemailPageElementObj.findRemoveVoicemailButton(driver, screenshotPath, updatedVoicemailElement);
        await removeButton.click();
        await driver.sleep(5000);

        //will logout from the current login and open the login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} add, update or delete voicemail file from his account');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the voicemail file with {string} and {string} should get {string}', async (subject,file,expectedResult) =>{
    //will find notification message after performing an action
    try {
        const notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);
        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();

        //will check whether the notification message is a success message or not
        try {
            if (expectedResult.toLowerCase() == 'added') {
                assert.strictEqual(notyMessageText, 'Added successfully');
            } else if (expectedResult.toLowerCase() == 'updated') {
                assert.strictEqual(notyMessageText, 'Updated successfully.');
            } else if (expectedResult.toLowerCase() == 'deleted') {
                assert.strictEqual(notyMessageText, 'Deleted successfully');
            } else {
                await driver.navigate().refresh();
                assert.fail('The provided \'' + expectedResult + '\' value is not valid. The value should be one of this: added, updated or deleted.');
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SuccessMessage_NotGiven.png');
            await driver.navigate().refresh();
            assert.fail('Due to the success message is not given after performing an action, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'SuccessMessage_NotGiven.png\'');
        }

        //will navigate on the another page and then come back to the voicemail drop page
        await actionObj.comeBackToVoicemailDropPage(driver, screenshotPath);
        await driver.sleep(1000);

        if (expectedResult.toLowerCase() == 'added' || expectedResult.toLowerCase() == 'updated') {
            //will open edit voicemail popup of added or updated voicemail
            const addedUpdatedVoicemailElement = await voicemailPageElementObj.findAddedUpdatedVoicemailElement(driver, screenshotPath, subject);
            const editButton = await voicemailPageElementObj.findEditVoicemailButton(driver, screenshotPath, addedUpdatedVoicemailElement);
            await editButton.click();
            await driver.sleep(2000);

            //will get the subject and filename
            const subjectField = await voicemailPageElementObj.findSubjectField(driver, screenshotPath);
            const actualSubject = await subjectField.getAttribute('value');
            const uploadedFileNameElement = await voicemailPageElementObj.findUploadedFilenameElement(driver, screenshotPath);
            const actualFileName = await uploadedFileNameElement.getText();
            const cancelButton = await voicemailPageElementObj.findCancelButton(driver, screenshotPath);

            //will compare actual and expected data
            try {
                assert.strictEqual(actualSubject, subject);
                assert.strictEqual(actualFileName, file);
            } catch (err) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'VoicemailDetails_NotasPerExpectation.png');
                await cancelButton.click();
                await driver.sleep(2000);
                await assert.fail('After adding or updating, the voicemail details is not as per the expectation. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'VoicemailDetails_NotasPerExpectation.png\'');
            }

            //will close edit voicemail popup
            await cancelButton.click();
            await driver.sleep(2000);

            const casename = expectedResult.toLowerCase() == 'added' ? 'add' : 'update';
            console.log('The \'' + casename + ' voicemail\' case has been passed successfully...');
        } else if (expectedResult.toLowerCase() == 'deleted') {
            let getVoicemailList

            //will get number of voicemail
            try {
                getVoicemailList = await voicemailPageElementObj.getVoicemailList(driver, screenshotPath);
            } catch (err) {
            }
            //will travel all those voicemail
            for (let i = 0; i < getVoicemailList.length; i++) {
                //will check, after deleting a voicemail, it is still showing or not
                try {
                    if (await getVoicemailList[i].getText() == subject) {
                        await screenshotObj.takeScreenshot(driver, screenshotPath + 'Voicemail_NotDeleted.png');
                        //assert.fail('After deleting the\'' + subject + '\' voicemail, it is showing on the voicemail list. Either the voicemail is not deleted or there is a duplicate voicemail. Screenshot Name: \'' + screenshotPath + 'Voicemail_NotDeleted.png\'');
                    }
                } catch (err) {
                    await assert.fail(err)
                }
            }

            console.log('The \'delete voicemail\' case has been passed successfully...');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the {string} voicemail should get {string}', async (record,expectedResult) =>{
    //will find an existing record(voicemail)
    try {
        const addedUpdatedVoicemailElement = await voicemailPageElementObj.findAddedUpdatedVoicemailElement(driver, screenshotPath, record);
        //will find 'Play' button
        const playPauseVoicemailButton = await voicemailPageElementObj.findPlayPauseButton(driver, screenshotPath, addedUpdatedVoicemailElement);
        await driver.sleep(3000);

        if (expectedResult.toLowerCase() == 'played' || expectedResult.toLowerCase() == 'resumed') {
            //will play whole audio file
            const isVoicemailPlaying = await voicemailPageElementObj.findVoicemailPlayingElement(driver, screenshotPath, playPauseVoicemailButton);
            while (await driver.executeScript("return arguments[0].outerText;", isVoicemailPlaying) != '00:00') {
            }
            await driver.sleep(5000);
            const casename = expectedResult.toLowerCase() == 'played' ? 'play' : 'resume';
            console.log('The \'' + casename + ' voicemail\' case has been passed successfully...');
        } else if (expectedResult.toLowerCase() == 'paused') {
            //will pause currently playing the audio file
            await playPauseVoicemailButton.click();
            await driver.sleep(5000);
            console.log('The \'pause voicemail\' case has been passed successfully...');
        } else {
            assert.fail('The provided \'' + expectedResult + '\' value is not valid. The value should be one of this: played, resumed or paused.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should give {string} validation message for {string} case', async (expectedValidationMsg,casename) =>{
    try {
        let actualValidationMsg, cancelButton;

        //will fetch currently displayed validation message
        if (casename.toLowerCase() == 'subjectrequired' || casename.toLowerCase() == 'subjectlenght') {
            const subjectField = await voicemailPageElementObj.findSubjectField(driver, screenshotPath);
            const fieldValidationElement = await commonElementObj.findFieldValidationElement(driver, screenshotPath, subjectField);
            actualValidationMsg = await fieldValidationElement.getText();
            await driver.sleep(2000);
        } else if (casename.toLowerCase() == 'filerequired' || casename.toLowerCase() == 'invalidfiletype' || casename.toLowerCase() == 'invalidfilesize') {
            const notyMessage = await commonElementObj.findNotyMessage(driver, screenshotPath);
            actualValidationMsg = await notyMessage.getText();
            await driver.sleep(2000);
        } else {
            await driver.navigate().refresh();
            assert.fail('The provided \'' + casename + '\' value is not valid. The value should be one of this: subjectrequired, subjectlenght, filerequired, invalidfiletype or invalidfilesize.');
        }

        //will compare actual and expected validation message
        try {
            if (casename.toLowerCase() == 'invalidfilesize') {
                assert(actualValidationMsg.includes(expectedValidationMsg));
                await driver.sleep(3000);
            } else {
                assert.strictEqual(actualValidationMsg, expectedValidationMsg);
                await driver.sleep(3000);
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'ValidationMsg_NotValid_' + casename + 'Case.png');
            cancelButton = await voicemailPageElementObj.findCancelButton(driver, screenshotPath);
            await cancelButton.click();
            await driver.sleep(2000);
            await assert.fail('Due to the validation message is not as per the expectation, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'ValidationMsg_NotValid_' + casename + 'Case.png\'');
        }

        //will close currently opened voicemail popup
        cancelButton = await voicemailPageElementObj.findCancelButton(driver, screenshotPath);
        await cancelButton.click();
        await driver.sleep(2000);

        if (casename.toLowerCase() == 'subjectrequired') {
            console.log('The \'subject required\' case has been passed successfully...');
        } else if (casename.toLowerCase() == 'filerequired') {
            console.log('The \'file required\' case has been passed successfully...');
        } else if (casename.toLowerCase() == 'subjectlenght') {
            console.log('The \'subject lenght\' case has been passed successfully...');
        } else if (casename.toLowerCase() == 'invalidfiletype') {
            console.log('The \'invalid file type\' case has been passed successfully...');
        } else if (casename.toLowerCase() == 'invalidfilesize') {
            console.log('The \'invalid file size\' case has been passed successfully...');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('it should not create an impact on the voicemail file settings of the {string} account', async (user) =>{
    try {
        let actualNumberofVoicemail;

        //will do Salesmate login with another user's credentials on that browser
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} add, update or delete voicemail file from his account');
        //will open the voicemail drop page on that browser
        await actionObj.openVoicemailDropPage(driver, screenshotPath);
        await driver.sleep(2000);

        //will get a voicemail file list from the currently logged-in user account
        try {
            const getVoicemailList = await voicemailPageElementObj.getVoicemailList(driver, screenshotPath);
            actualNumberofVoicemail = getVoicemailList.length;
        } catch (err) {
            actualNumberofVoicemail = 0;
        }

        //will compare the actual and expected number of voicemail
        try {
            assert.strictEqual(actualNumberofVoicemail, expectedNumberofVoicemail);
        } catch (err) {
            assert.fail('After adding, updating or removing voicemail files from the one account, it is creating an impact on another account. This value get changed ---> \'' + err + '\'');
        }
        console.log('The \'user wise voicemail file management\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
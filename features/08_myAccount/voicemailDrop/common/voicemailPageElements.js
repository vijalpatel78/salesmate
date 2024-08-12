const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of voicemail drop page on the browser 
 *  and then return those elements 
*/

async function findVoicemailDropTab(driver,screenshotPath){
    let voicemailDropTab;

    await driver.manage().setTimeouts({implicit:10000});
    try{
        voicemailDropTab = await driver.findElement(By.css('a[href="#/app/user/voicemailDrop"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'VoicemailDropTab_NotFound.png');
        await assert.fail('Due to the voicemail drop tab is not found, this test case is not possible to execute. To view voicemail drop tab, the Twilio app must be configred on the Salesmate link. Screenshot Name: \''+screenshotPath+'VoicemailDropTab_NotFound.png\'');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    await driver.wait(until.elementIsVisible(voicemailDropTab));
    return voicemailDropTab;
}exports.findVoicemailDropTab=findVoicemailDropTab;

async function findUploadAudioButton(driver,screenshotPath){
    let uploadAudioButton;

    try{
        uploadAudioButton = await driver.findElement(By.xpath('//button[contains(text(),"Upload Audio")]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UploadAudioButton_NotFound.png');
        await assert.fail('Due to the update button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'UploadAudioButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsEnabled(uploadAudioButton));
    return uploadAudioButton;
}exports.findUploadAudioButton=findUploadAudioButton;

async function findSubjectField(driver,screenshotPath){
    let subjectField;

    try{
        subjectField = await driver.findElement(By.id('subject'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SubjectField_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the subject field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SubjectField_NotFound.png\'');
    }

    await driver.wait(until.elementIsVisible(subjectField));
    return subjectField;
}exports.findSubjectField=findSubjectField;

async function findUploadFileElement(driver,screenshotPath){
    let uploadFileElement;

    try{
        uploadFileElement = await driver.findElement(By.xpath('//input[@type="file"][2]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UploadFileElement_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the upload file  element is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'UploadFileElement_NotFound.png\'');
    }

    return uploadFileElement;
}exports.findUploadFileElement=findUploadFileElement;

async function findSaveButton(driver,screenshotPath){
    let saveButton;

    try{
        saveButton = await driver.findElement(By.id('btnSubmit'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SaveButton_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the save button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SaveButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsEnabled(saveButton));
    return saveButton;
}exports.findSaveButton=findSaveButton;

async function findAddedUpdatedVoicemailElement(driver,screenshotPath,subject){
    let addedUpdatedVoicemailElement;

    await driver.manage().setTimeouts({implicit:5000});
    try{
        addedUpdatedVoicemailElement = await driver.findElement(By.xpath('//td[text()="'+subject+'"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AddedUpdated_'+subject+'_Voicemail_NotFound.png');
        await assert.fail('Due to the added/updated '+subject+' voicemail record is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddedUpdated_'+subject+'_Voicemail_NotFound.png\'');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    await driver.wait(until.elementIsVisible(addedUpdatedVoicemailElement));
    return addedUpdatedVoicemailElement;
}exports.findAddedUpdatedVoicemailElement=findAddedUpdatedVoicemailElement;

async function findEditVoicemailButton(driver,screenshotPath,addedUpdatedVoicemailElement){
    let editVoicemailButton;

    try{
        editVoicemailButton = await addedUpdatedVoicemailElement.findElement(By.xpath('following::td[1]/button[text()="Edit"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EditVoicemailButton_NotFound.png');
        await assert.fail('Due to the edit voicemail button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'EditVoicemailButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsEnabled(editVoicemailButton));
    return editVoicemailButton;
}exports.findEditVoicemailButton=findEditVoicemailButton;

async function findUploadedFilenameElement(driver,screenshotPath){
    let uploadedFilenameElement;

    try{
        uploadedFilenameElement = await driver.findElement(By.xpath('//div[@id="template"]/descendant::span[1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UploadedFilenameElement_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the uploaded filename element is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'UploadedFilenameElement_NotFound.png\'');
    }

    await driver.wait(until.elementIsVisible(uploadedFilenameElement));
    return uploadedFilenameElement;
}exports.findUploadedFilenameElement=findUploadedFilenameElement;

async function findCancelButton(driver,screenshotPath){
    let cancelButton;

    try{
        cancelButton = await driver.findElement(By.xpath('//button[text()=" Cancel "]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CancelButton_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the cancel button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CancelButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsEnabled(cancelButton));
    return cancelButton;
}exports.findCancelButton=findCancelButton;

async function findRemoveVoicemailButton(driver,screenshotPath,addedUpdatedVoicemailElement){
    let removeVoicemailButton;

    try{
        removeVoicemailButton = await addedUpdatedVoicemailElement.findElement(By.xpath('following::td[1]/button[text()="Remove"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RemoveVoicemailButton_NotFound.png');
        await assert.fail('Due to the remove voicemail button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RemoveVoicemailButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsEnabled(removeVoicemailButton));
    return removeVoicemailButton;
}exports.findRemoveVoicemailButton=findRemoveVoicemailButton;

async function findYesButton(driver,screenshotPath){
    let yesButton;

    try{
        yesButton = await driver.findElement(By.xpath('//button[text()="Yes"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'YesButton_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the yes button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'YesButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsEnabled(yesButton));
    return yesButton;
}exports.findYesButton=findYesButton;

async function getVoicemailList(driver,screenshotPath){
    let voicemailList;

    await driver.manage().setTimeouts({implicit:5000});
    try{
        voicemailList = await driver.findElements(By.xpath('//div[@class="middle-content"]/descendant::tr/td[2]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'VoicemailList_NotFound.png');
        await assert.fail('Due to the voicemail list is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'VoicemailList_NotFound.png\'');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});

    return voicemailList;
}exports.getVoicemailList=getVoicemailList;

async function findPlayPauseButton(driver,screenshotPath,addedUpdatedVoicemailElement){
    let playPauseButton;

    try{
        playPauseButton = await addedUpdatedVoicemailElement.findElement(By.xpath('preceding::button[@class="jp-play"][1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'PlayPauseButton_NotFound.png');
        await assert.fail('Due to the play/pause button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'PlayPauseButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsVisible(playPauseButton));
    return playPauseButton;
}exports.findPlayPauseButton=findPlayPauseButton;

async function findVoicemailPlayingElement(driver,screenshotPath,playPauseButtonElement){
    let voicemailPlayingElement;

    try{
        voicemailPlayingElement = await playPauseButtonElement.findElement(By.xpath('following::div[@class="jp-playing-content"][1]/child::div[@aria-label="time"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'VoicemailPlayingElement_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the voicemail playing element is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'VoicemailPlayingElement_NotFound.png\'');
    }

    return voicemailPlayingElement;
}exports.findVoicemailPlayingElement=findVoicemailPlayingElement;

async function findCancelUploadedFileButton(driver,screenshotPath){
    let cancelUploadedFileButton;

    try{
        cancelUploadedFileButton = await driver.findElement(By.css('a[title="Click to Remove"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CancelUploadedFileButton_NotFound.png');
        await driver.navigate().refresh();
        await assert.fail('Due to the cancel uploaded file button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CancelUploadedFileButton_NotFound.png\'');
    }

    await driver.wait(until.elementIsVisible(cancelUploadedFileButton));
    return cancelUploadedFileButton;
}exports.findCancelUploadedFileButton=findCancelUploadedFileButton;
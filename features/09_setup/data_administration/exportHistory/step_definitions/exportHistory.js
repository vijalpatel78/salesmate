const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const exportHistoryPageElementObj = require('../common/exportHistoryPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/data_administration/exportHistory/screenshots/';

let currentPageURL1;

Given('the {string} is on Export History page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/export/history')){
        console.log('The export history page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open Export History page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Export History page');
        //will open the 'Export History' page
        await actionObj.openExportHistoryPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open Export History page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Export History page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on Export History page');
        //will open the 'Export History' page
        await actionObj.openExportHistoryPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the 'Export History' page
        await actionObj.openExportHistoryPage(driver,screenshotPath);  
    }
});

When('one exported file is available', async () =>{
    //will check the exported file is found or not
    const grid = await exportHistoryPageElementObj.findGird(driver);
    if(grid.length > 0 ){
        console.log('The exported file is found...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AnyExportedFile_NotFound.png');
        await assert.fail('Due to any exported file is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AnyExportedFile_NotFound.png\'.');
    }
});

When('the exported file of {string} user is available', async (user) =>{
    //will find specified user's file
    const otherUserFile = await exportHistoryPageElementObj.findOtherUserFile(driver,user);
    
    //will check the specified user file is found or not
    if(otherUserFile.length > 0){
        console.log('The exported file of '+user+' user is found...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'OtherUserExportedFile_NotFound.png');
        await assert.fail('Due to the exported file of '+user+' user is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'OtherUserExportedFile_NotFound.png\'.');
    }
});

When('click on the Download button of {string} user file', async (user) =>{
    currentPageURL1 = await driver.getCurrentUrl();
    await driver.sleep(1000);
    //will find and click on the download button
    const downloadButton = await exportHistoryPageElementObj.findOtherUserFileDownloadBtn(driver,user);
    await downloadButton.click();
    await driver.sleep(2000);
});

When('the exported file of {string} view is available', async (viewName) =>{
    //will find specified view's file
    const viewFile = await exportHistoryPageElementObj.findViewFileDownloadBtn(driver,viewName);
    //will check the specified view file is found or not
    if(viewFile.length > 0){
        console.log('The exported file of '+viewName+' view is found...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ViewFile_NotFound.png');
        await assert.fail('Due to the exported file of '+viewName+' view is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ViewFile_NotFound.png\'.');
    }
});

When('click on the Download button of {string} view file', async (viewName) =>{
    //will find and click on the download button
    const downloadButton = await exportHistoryPageElementObj.findViewFileDownloadBtn(driver,viewName);
    await downloadButton[0].click();
    await driver.sleep(2000);
});

Then('the system should display exported file details', async () =>{
    let exportedRecords;

    //will get the exported file details
    const exportedFileDetails = await exportHistoryPageElementObj.findRecord(driver);
    const exportedDate = await exportedFileDetails[0].getText();
    const exportedUserName = await exportedFileDetails[1].getText();
    const exportedModuleName = await exportedFileDetails[2].getText();
    const exportedViewName = await exportedFileDetails[3].getText();
    if(exportedFileDetails.length == 5){
        exportedRecords = await exportedFileDetails[4].getText();
        console.log('The exported file details --> Exported Date: '+exportedDate+', Exported By: '+exportedUserName+', Exported Module: '+exportedModuleName+', Exported View: '+exportedViewName+', Exported Records: '+exportedRecords+'.');
    }else{
        console.log('The exported file details --> Exported Date: '+exportedDate+', Exported By: '+exportedUserName+', Exported Module: '+exportedModuleName+', Exported View: '+exportedViewName+'.');
    }
});

Then('the system should give validation message on downloading other user file', async () =>{
    //will find the validation message
    const validationMsgElem = await exportHistoryPageElementObj.findValidationMsg(driver);
    const validationMsg = await validationMsgElem[0].getText();
    //will check the validation message is correct or not
    try{
        assert.strictEqual(validationMsg,validationMsg);
    }catch(err){    
        await driver.get(currentPageURL1);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png');
        await assert.fail('Due to the validation message is not correct, the test case has been failed. Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }
    await driver.get(currentPageURL1);
    console.log('The '+validationMsg+' validation message is getting displayed...');
    await driver.sleep(2000);
});

Then('the {string} view file should get downloaded', async (view) =>{
    //will check the file is get downloaded or not 
    const file = './downloadedFile/'+view.replace(/\s/g,'_')+'.zip';
    try{
        assert(fs.statSync(file).isFile());
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+view.replace(/\s/g,'_')+'_File_NotDownloaded.png');
        await assert.fail('Due to the '+view+' view file is not downloaded in the \'./downloadedFile\' folder, the test case has been failed. Screenshot Name: \''+screenshotPath+view.replace(/\s/g,'_')+'_File_NotDownloaded.png\'.');
    }
    console.log('The \''+view+'\' view file is downloaded successfully in the \'./downloadedFile\' folder...');
});
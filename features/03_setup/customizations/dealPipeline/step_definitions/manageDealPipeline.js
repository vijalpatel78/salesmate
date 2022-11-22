const {Given,When,Then} = require('@cucumber/cucumber');
const { By, until} = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const dealPipelinePageElementObj = require('../common/dealPipelinePageElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/03_setup/customizations/dealPipeline/screenshots/';

let count = 1, expectedDisplayOrder, currentSourceStageDisplayOrder;

Given('the {string} is on deal pipeline page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/customization/dealpipeline')){
        console.log('The deal pipeline page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open deal pipeline page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on deal pipeline page');
        //will open the deal pipeline page
        await actionObj.openDealPipelinePage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open deal pipeline page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal pipeline page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on deal pipeline page');
        //will open the deal pipeline page
        await actionObj.openDealPipelinePage(driver,screenshotPath);
    }
    else{
        //as the user is logged in, it will open the deal pipeline page
        await actionObj.openDealPipelinePage(driver,screenshotPath);
    }
});

When('the user clicks on the New Pipeline button', async () =>{
    //will find the New Pipeline button
    const newPipelineBtn = await dealPipelinePageElementObj.findNewPipelineBtn(driver,screenshotPath);
    //will click on that button
    await newPipelineBtn.click();
    await driver.sleep(1000);
});

When('Pipeline: {string}', async (value) =>{
    try{
        //will find the pipeline textbox
        const pipelineTextbox = await dealPipelinePageElementObj.findPipelineTextbox(driver,screenshotPath);
        //will pass the data in the textbox
        await clearFieldDataObj.clearFieldData(pipelineTextbox);
        await pipelineTextbox.sendKeys(value);
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

When('Stage Title: {string}', async (value) =>{
    try{
        //will find the stage title textbox
        const stageTitleTextbox = await dealPipelinePageElementObj.findStageTitleTextbox(driver,screenshotPath);
        //will pass the data in the textbox
        await clearFieldDataObj.clearFieldData(stageTitleTextbox);
        await stageTitleTextbox.sendKeys(value);
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

When('Win Probability: {string}', async (value) =>{
    try{
        //will find the win probability textbox
        const winProbabilityTextbox = await dealPipelinePageElementObj.findWinProbabilityTextbox(driver,screenshotPath);
        //will pass the data in the textbox
        await clearFieldDataObj.clearFieldData(winProbabilityTextbox);
        await winProbabilityTextbox.sendKeys(value);
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

When('Rotten Period: {string}', async (value) =>{
    try{
        //will find the rotten period textbox
        const rottenPeriodTextbox = await dealPipelinePageElementObj.findRottenPeriodTextbox(driver,screenshotPath);
        //will pass the data in the textbox
        await clearFieldDataObj.clearFieldData(rottenPeriodTextbox);
        await rottenPeriodTextbox.sendKeys(value);
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

When('Allow users to set the probability for each deal manually: {string}', async (expectedValue) =>{
    try{
        //will find the set probability manually checkbox
        const setProbabilityManuallyCheckbox = await dealPipelinePageElementObj.findSetProbabilityManuallyCheckbox(driver,screenshotPath);
        //will get the current value of checkbox
        const currentValue = await setProbabilityManuallyCheckbox.getAttribute('value');
        //will click on the checkbox only when the current and expected values are different
        if(expectedValue.toLowerCase() != currentValue){
            await driver.executeScript("arguments[0].click();",setProbabilityManuallyCheckbox);
        }else{
            console.log('The value of set the probability for each deal manually checkbox is already '+currentValue+'...');
        }
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

When('click on the Save button of {string}', async (popup) =>{
    count++;

    try{
        //will find the Save button
        const saveBtn = await dealPipelinePageElementObj.findSaveBtn(driver,screenshotPath);
        //will click on the Save button
        await saveBtn.click();
        try{
            await driver.wait(until.elementIsEnabled(saveBtn),20000,'There seems to be some issue while performing operations. Screenshot Name: \''+screenshotPath+'Error_While_Performing_Operations_'+count+'.png\'.');
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Error_While_Performing_Operations_'+count+'.png');
        }
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
    await driver.sleep(2000);
});

When('the user clicks on the Edit button from the {string} pipeline', async (pipeline) =>{
    //will check the edit button of provided pipeline is found or not
    const editButton = await dealPipelinePageElementObj.findPipelineEditBtn(driver,pipeline);
    if(editButton.length > 0){
        //will click on the edit button
        await editButton[0].click();
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_EditBtn_NotFound.png');
        await assert.fail('Due to the edit button of provided '+pipeline+' pipeline is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_EditBtn_NotFound.png\'.');
    }
});

When('the user clicks on the Add New Stage button from the {string} pipeline', async (pipeline) =>{
    //will check the add stage button of the provided pipeline is found or not
    const addStageButton = await dealPipelinePageElementObj.findAddStageBtn(driver,pipeline);
    if(addStageButton.length > 0){
        //will click on the add stage button
        await addStageButton[0].click();
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_AddStageBtn_NotFound.png');
        await assert.fail('Due to the add stage button of the provided '+pipeline+' pipeline is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_AddStageBtn_NotFound.png\'.');
    }
});

When('the user goes on the {string} pipeline and move the {string} stage in place of the {string} stage', async (pipeline,sourceStage,targetStage) =>{
    //will check the provided pipeline is found or not on the list page
    const pipelineNameOnListPage = await dealPipelinePageElementObj.findPipelineNameOnListPage(driver,pipeline);
    if(pipelineNameOnListPage.length > 0){
        //will set the focus on that pipeline
        await driver.executeScript("arguments[0].scrollIntoView();", pipelineNameOnListPage[0]);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png');
        assert.fail('Due to the provided \''+pipeline+'\' pipeline is not found on the pipeline list page, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png\'.');
    }

    //will find the source stage name and target stage name
    const sourceStageElem = await dealPipelinePageElementObj.findStageForDragAndDrop(driver,pipeline,sourceStage);
    const targetStageElem = await dealPipelinePageElementObj.findStageForDragAndDrop(driver,pipeline,targetStage);

    //will check the source stage name and target stage name is visible or not
    if(sourceStageElem.length > 0 && targetStageElem.length > 0){
        //will get the current display order of source and target stage
        const stageNames = await dealPipelinePageElementObj.findAllStagesOfPipeline(driver,pipeline);
        for(let i=0; i<stageNames.length; i++){
            const stageName = await stageNames[i].getText();
            if(stageName.startsWith(targetStage)){
                expectedDisplayOrder = i+1;
            }else if(stageName.startsWith(sourceStage)){
                currentSourceStageDisplayOrder = i+1;
            }
        }
        //will drag the source stage and then drop it to the target stage place
        await driver.actions().dragAndDrop(sourceStageElem[0],targetStageElem[0]).perform();
        await driver.sleep(2000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'StageName_NotFound_On_'+pipeline.replace(/\s/g,'_')+'_Pipeline.png');
        assert.fail('The provided source \''+sourceStage+'\' stage name or target \''+targetStage+'\' stage name does not exist on the \''+pipeline+'\' pipeline. Screenshot Name: \''+screenshotPath+'StageName_NotFound_On_'+pipeline.replace(/\s/g,'_')+'_Pipeline.png\'.');
    }
});

When('the user clicks on the {string} stage edit button from the {string} pipeline', async (stageName,pipeline) =>{
    //will check the pipeline is found or not on the list page
    const pipelineNameOnListPage = await dealPipelinePageElementObj.findPipelineNameOnListPage(driver,pipeline);
    if(pipelineNameOnListPage.length > 0){
        //will set the focus on that pipeline
        await driver.executeScript("arguments[0].scrollIntoView();", pipelineNameOnListPage[0]);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png');
        assert.fail('Due to the provided \''+pipeline+'\' pipeline is not found on the pipeline list page, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png\'.');
    }

    //will find the stage edit button
    const stageEditBtn = await dealPipelinePageElementObj.findStageEditBtn(driver,pipeline,stageName);
    //will check the stage edit button is found or not
    if(stageEditBtn.length > 0){
        //will click on the edit button
        await driver.executeScript('arguments[0].click();',stageEditBtn[0]);
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stageName.replace(/\s/g,'_')+'_Stage_EditBtn_NotFound.png');
        assert.fail('Due to the \''+stageName+'\' stage edit button of the provided \''+pipeline+'\' pipeline is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stageName.replace(/\s/g,'_')+'_Stage_EditBtn_NotFound.png\'.');
    }
});

When('the user clicks on the delete {string} stage button of the {string} pipeline', async (stage,pipeline) =>{
    //will find the stage delete button
    const stageDeleteBtn = await dealPipelinePageElementObj.findStageDeleteBtn(driver,pipeline,stage);
    //will check the stage delete button is found or not
    if(stageDeleteBtn.length > 0){
        //will click on the delete button
        await driver.executeScript("arguments[0].scrollIntoView();", stageDeleteBtn[0]);
        await driver.executeScript('arguments[0].click();',stageDeleteBtn[0]);
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stage.replace(/\s/g,'_')+'_Stage_DeleteBtn_NotFound.png');
        assert.fail('Due to the \''+stage+'\' stage delete button of the provided \''+pipeline+'\' pipeline is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stage.replace(/\s/g,'_')+'_Stage_DeleteBtn_NotFound.png\'.');
    }
});

When('the user clicks on the delete button of the {string} pipeline', async (pipeline) =>{
    //will find the pipeline delete button
    const pipelineDeleteBtn = await dealPipelinePageElementObj.findPipelineDeleteBtn(driver,pipeline);
    //will check the pipeline delete button is found or not
    if(pipelineDeleteBtn.length > 0){
        //will click on the delete button
        await driver.executeScript("arguments[0].scrollIntoView();", pipelineDeleteBtn[0]);
        await driver.executeScript('arguments[0].click();',pipelineDeleteBtn[0]);
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_DeleteBtn_NotFound.png');
        assert.fail('Due to the delete button of the provided \''+pipeline+'\' pipeline is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_DeleteBtn_NotFound.png\'.');
    }
});

When('the user goes on the {string} system pipeline and verifies the delete button', async (pipeline) =>{
    //nothing to do in this step. This is written to increase readability
});

Then('the {string} should get {string} with {string} message', async (value,action,successMsg) =>{
    count++;

    //will find notification message
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        strictEqual(notyMessageText,successMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven_'+count+'.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not given after performing the operation, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven_'+count+'.png\'.');
    }
    console.log('The \''+successMsg+'\' message is getting displayed...');

    //will navigate on the another page and then come back to the deal pipeline page
    await actionObj.comeBackToDealPipelinePage(driver,screenshotPath);
    await driver.sleep(2000);
});

Then('the new {string} pipeline should get added with default {string} stages', async (pipeline,defaultStages) =>{
    const actualDefaultStages = [];
    const expectedDefaultStages = defaultStages.split(',');

    //will check the newly added pipeline is found or not on the list page
    const pipelineNameOnListPage = await dealPipelinePageElementObj.findPipelineNameOnListPage(driver,pipeline);
    if(pipelineNameOnListPage.length > 0){
        //will set the focus on that pipeline
        await driver.executeScript("arguments[0].scrollIntoView();", pipelineNameOnListPage[0]);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png');
        assert.fail('Due to the provided \''+pipeline+'\' pipeline is not found on the pipeline list page, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png\'.');
    }

    //will find all stages of newly added pipeline
    const allStages = await dealPipelinePageElementObj.findAllStagesOfPipeline(driver,pipeline);
    for(let i=0; i<allStages.length; i++){
        actualDefaultStages.push(await allStages[i].getText());
    }

    //will check the newly added pipeline contains the default stages or not
    for(let i=0; i<expectedDefaultStages.length; i++){
        if(actualDefaultStages.includes(expectedDefaultStages[i])){
            console.log('The \''+pipeline+'\' pipeline contains the default \''+actualDefaultStages[i]+'\' stage...');
        }else{
            await screenshotObj.takeScreenshot(driver,screenshotPath+expectedDefaultStages[i].replace(/\s/g,'_')+'_DefaultStage_NotFound_ListPage.png');
            assert.fail('Due to the default '+expectedDefaultStages[i]+' stage for the provided '+pipeline+' pipeline is not found on the pipeline list page, the test case has been failed. Screenshot Name: \''+screenshotPath+expectedDefaultStages[i].replace(/\s/g,'_')+'_DefaultStage_NotFound_ListPage.png\'.');
        }
    }
});

Then('the pipeline details on the edit pipeline should be the same as provided {string} and {string} details', async (pipeline,setProbabilityManually) =>{
    //will find the edit button of the provided pipeline
    const editButton = await dealPipelinePageElementObj.findPipelineEditBtn(driver,pipeline);
    //will click on that button
    await editButton[0].click();
    //will get the actual values
    const pipelineTextbox = await dealPipelinePageElementObj.findPipelineTextbox(driver,screenshotPath);
    const actualPipelineName = await pipelineTextbox.getAttribute('value');
    const setProbabilityManuallyCheckbox = await dealPipelinePageElementObj.findSetProbabilityManuallyCheckbox(driver,screenshotPath);
    const actualSetProbabilityManually = await setProbabilityManuallyCheckbox.getAttribute('value');

    //will check the details on the edit pipeline popup are the same as provided details or not
    try{
        strictEqual(actualPipelineName,pipeline);
        strictEqual(actualSetProbabilityManually,setProbabilityManually.toLowerCase());
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DetailsOnEditPipeline_NotSame_AsProvided.png');
        //will close the popup
        const cancelBtn = await dealPipelinePageElementObj.findCancelBtn(driver,screenshotPath);
        await driver.executeScript("arguments[0].click();",cancelBtn);
        await driver.sleep(1000);
        assert.fail('Due to the details on the edit pipeline popup are not same as provided, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DetailsOnEditPipeline_NotSame_AsProvided.png\'.');
    }

    //will close the popup
    const cancelBtn = await dealPipelinePageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The details on the edit pipeline popup are same as provided \''+pipeline+'\' and \''+setProbabilityManually+'\' details...');
});

Then('the {string} validation message should be displayed for the Pipeline field', async (nameValidationMsg) =>{
    //will find the validation msg of Pipeline field
    const pipelineField = await dealPipelinePageElementObj.findPipelineTextbox(driver,screenshotPath);
    const validationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,pipelineField);
    //will get the validation message text
    const actualValidationMsg = await validationElem.getText();

    //will check the validation message is as per the expectation or not
    try{
        strictEqual(actualValidationMsg,nameValidationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png');
        //will close the popup
        const cancelBtn = await dealPipelinePageElementObj.findCancelBtn(driver,screenshotPath);
        await driver.executeScript("arguments[0].click();",cancelBtn);
        await driver.sleep(1000);
        assert.fail('Due to the pipeline field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }

    //will close the popup
    const cancelBtn = await dealPipelinePageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The \''+actualValidationMsg+'\' validation message is showing...');
});

Then('the {string} validation message should be displayed on entering duplicate name', async (validationMsg) =>{
    //will find the validation message
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        strictEqual(notyMessageText,validationMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await driver.sleep(1000);
        assert.fail('Due to the validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }

    //will close the popup
    const cancelBtn = await dealPipelinePageElementObj.findCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The \''+notyMessageText+'\' validation message is showing...');
});

Then('the {string} validation message should be displayed on entering duplicate stage', async (validationMsg) =>{
    //will find the validation message
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        strictEqual(notyMessageText,validationMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png');
        const cancelBtn = await dealPipelinePageElementObj.findStageCancelBtn(driver,screenshotPath);
        await driver.executeScript("arguments[0].click();",cancelBtn);
        await driver.sleep(1000);
        assert.fail('Due to the validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }

    //will close the popup
    const cancelBtn = await dealPipelinePageElementObj.findStageCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The \''+notyMessageText+'\' validation message is showing...');
});

Then('the stage details of {string} pipeline on the edit stage should be the same as provided {string}, {string} and {string} details', async (pipeline,stageName,winProbability,rottenPeriod) =>{
    //will check the pipeline is found or not on the list page
    const pipelineNameOnListPage = await dealPipelinePageElementObj.findPipelineNameOnListPage(driver,pipeline);
    if(pipelineNameOnListPage.length > 0){
        //will set the focus on that pipeline
        await driver.executeScript("arguments[0].scrollIntoView();", pipelineNameOnListPage[0]);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png');
        assert.fail('Due to the provided \''+pipeline+'\' pipeline is not found on the pipeline list page, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotFound_ListPage.png\'.');
    }

    //will find the stage edit button
    const stageEditBtn = await dealPipelinePageElementObj.findStageEditBtn(driver,pipeline,stageName);
    //will check the stage edit button is found or not
    if(stageEditBtn.length > 0){
        //will click on the edit button
        await driver.executeScript('arguments[0].click();',stageEditBtn[0]);
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stageName.replace(/\s/g,'_')+'_Stage_EditBtn_NotFound.png');
        assert.fail('Due to the \''+stageName+'\' stage edit button of the provided \''+pipeline+'\' pipeline is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stageName.replace(/\s/g,'_')+'_Stage_EditBtn_NotFound.png\'.');
    }

    //will find the stage name, win probability and rotting period fields from the edit stage popup
    const stageTitleTextbox = await dealPipelinePageElementObj.findStageTitleTextbox(driver,screenshotPath);
    const winProbabilityTextbox = await dealPipelinePageElementObj.findWinProbabilityTextbox(driver,screenshotPath);
    const rottenPeriodTextbox = await dealPipelinePageElementObj.findRottenPeriodTextbox(driver,screenshotPath);
    //will get the actual value of stage name, win probability, and rotting period fields
    const actualStageName = await stageTitleTextbox.getAttribute('value');
    const actualWinProbabilityValue = await winProbabilityTextbox.getAttribute('value');
    const actualRottenPeriodValue = await rottenPeriodTextbox.getAttribute('value');
    console.log("actualStageName>>> "+actualStageName);
    console.log("actualWinProbabilityValue>>> "+actualWinProbabilityValue);
    console.log("actualRottenPeriodValue>>> "+actualRottenPeriodValue);

    //will check the stage details on the edit stage popup are the same as provided details
    try{
        strictEqual(actualStageName,stageName);
        strictEqual(actualRottenPeriodValue,rottenPeriod);
        strictEqual(actualWinProbabilityValue,winProbability);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stageName.replace(/\s/g,'_')+'_StageDetails_NotCorrect_EditStage.png');
        const cancelBtn = await dealPipelinePageElementObj.findStageCancelBtn(driver,screenshotPath);
        await driver.executeScript("arguments[0].click();",cancelBtn);
        await driver.sleep(1000);
        assert.fail('Due to the \''+stageName+'\' stage details of the provided \''+pipeline+'\' pipeline are not correct on the edit stage popup, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_'+stageName.replace(/\s/g,'_')+'_StageDetails_NotCorrect_EditStage.png\'.');
    }

    //will close the popup
    const cancelBtn = await dealPipelinePageElementObj.findStageCancelBtn(driver,screenshotPath);
    await driver.executeScript("arguments[0].click();",cancelBtn);
    await driver.sleep(1000);

    console.log('The stage details of the provided \''+pipeline+'\' pipeline on the edit stage popup are the same as provided \''+stageName+'\', \''+winProbability+'\' and \''+rottenPeriod+'\' details...');
});

Then('the {string} validation message should be displayed for the Stage Title field', async (nameValidationMsg) =>{
    //will find the validation msg of Stage Title field
    const stageTitleTextbox = await dealPipelinePageElementObj.findStageTitleTextbox(driver,screenshotPath);
    const validationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,stageTitleTextbox);
    //will get the validation message text
    const actualValidationMsg = await validationElem.getText();

    //will check the validation message is as per the expectation or not
    try{
        strictEqual(actualValidationMsg,nameValidationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'StageName_ValidationMsg_NotCorrect.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the stage title field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'StageName_ValidationMsg_NotCorrect.png\'.');
    }

    console.log('The \''+actualValidationMsg+'\' validation message is showing...');
});

Then('the {string} validation message should be displayed for the Win Probability field', async (probabilityValidationMsg) =>{
    //will find the validation msg of Win Probability field
    const winProbabilityTextbox = await dealPipelinePageElementObj.findWinProbabilityTextbox(driver,screenshotPath);
    const validationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,winProbabilityTextbox);
    //will get the validation message text
    const actualValidationMsg = await validationElem.getText();

    //will check the validation message is as per the expectation or not
    try{
        strictEqual(actualValidationMsg,probabilityValidationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WinProbability_ValidationMsg_NotCorrect.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the win probability field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'WinProbability_ValidationMsg_NotCorrect.png\'.');
    }

    console.log('The \''+actualValidationMsg+'\' validation message is showing...');
});

Then('the {string} validation message should be displayed for the Rotten Period field', async (rottenPeriodValidationMsg) =>{
    //will find the validation msg of Rotten Period field
    const rottenPeriodTextbox = await dealPipelinePageElementObj.findRottenPeriodTextbox(driver,screenshotPath);
    const validationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,rottenPeriodTextbox);
    //will get the validation message text
    const actualValidationMsg = await validationElem.getText();

    //will check the validation message is as per the expectation or not
    try{
        strictEqual(actualValidationMsg,rottenPeriodValidationMsg);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RottenPeriod_ValidationMsg_NotCorrect.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the rotten period field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'RottenPeriod_ValidationMsg_NotCorrect.png\'.');
    }

    console.log('The \''+actualValidationMsg+'\' validation message is showing...');
});

Then('click on the Cancel button of stage', async () =>{
    try{
        //will find the cancel button
        const cancelBtn = await dealPipelinePageElementObj.findStageCancelBtn(driver,screenshotPath);
        //will click on that button
        await driver.executeScript("arguments[0].click();",cancelBtn);
        await driver.sleep(1000);
    }catch(err){
        //will close the popup before throwing any error
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail(err);
    }
});

Then('the {string} stage of {string} pipeline should be displayed in place of the {string} stage', async (sourceStage,pipeline,targetStage) =>{
    let actualDisplayOrder;

    //will find notification message
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        strictEqual(notyMessageText,'Stage moved successfully');
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not given after performing the operation, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
    console.log('The \'Stage moved successfully\' message is getting displayed...');

    //will navigate on the another page and then come back to the pipeline page
    await actionObj.comeBackToDealPipelinePage(driver,screenshotPath);
    await driver.sleep(2000);
    //will find the provided pipeline and then set the focus on that pipeline
    const pipelineNameOnListPage = await dealPipelinePageElementObj.findPipelineNameOnListPage(driver,pipeline);
    await driver.executeScript("arguments[0].scrollIntoView();", pipelineNameOnListPage[0]);

    //will get the current display order of source stage
    const allStages = await dealPipelinePageElementObj.findAllStagesOfPipeline(driver,pipeline);
    for(let i=0; i<allStages.length; i++){
        const stage = await allStages[i].getText();
        if(stage.startsWith(sourceStage)){
            actualDisplayOrder = i+1;
            break;
        }
    }
    //will check the display order of source stage is get changed or not
    try{
        strictEqual(actualDisplayOrder,expectedDisplayOrder);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DragAndDropOutcome_NotWorking.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the display order of \''+sourceStage+'\' stage is not get changed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DragAndDropOutcome_NotWorking.png\'.');
    }

    console.log('The display order of \''+sourceStage+'\' stage is get changed from \''+currentSourceStageDisplayOrder+'\' to \''+actualDisplayOrder+'\'.');
});

Then('the {string} stage of {string} pipeline should get deleted with {string} message', async (stage,pipeline,successMsg) =>{
    //will find notification message
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        strictEqual(notyMessageText,successMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not given after performing the operation, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
    console.log('The \''+successMsg+'\' message is getting displayed...');

    //will navigate on the another page and then come back to the pipeline page
    await actionObj.comeBackToDealPipelinePage(driver,screenshotPath);
    await driver.sleep(2000);
    //will find the provided pipeline and then set the focus on that pipeline
    const pipelineNameOnListPage = await dealPipelinePageElementObj.findPipelineNameOnListPage(driver,pipeline);
    await driver.executeScript("arguments[0].scrollIntoView();", pipelineNameOnListPage[0]);

    //will get all stages of the provided pipeline
    const allStages = await dealPipelinePageElementObj.findAllStagesOfPipeline(driver,pipeline);
    //will travel all stages
    for(let i=0; i<allStages.length; i++){
        const stageName = await allStages[i].getText();
        //will check the deleted stage is get removed or not
        if(stageName.includes(stage)){
            await screenshotObj.takeScreenshot(driver,screenshotPath+stage.replace(/\s/g,'_')+'_Stage_NotDeleted.png');
            assert.fail('Due to the \''+stage+'\' stage of the \''+pipeline+'\' pipeline is not get deleted, the test case has been failed. Screenshot Name: \''+screenshotPath+stage.replace(/\s/g,'_')+'_Stage_NotDeleted.png\'.');
        }
    }

    console.log('The \''+stage+'\' stage of the \''+pipeline+'\' pipeline is get deleted...');
});

Then('the {string} pipeline should get deleted with {string} message', async (pipeline,successMsg) =>{
    //will find notification message
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        strictEqual(notyMessageText,successMsg);
        await driver.sleep(3000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not given after performing the operation, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
    console.log('The \''+successMsg+'\' message is getting displayed...');

    //will navigate on the another page and then come back to the pipeline page
    await actionObj.comeBackToDealPipelinePage(driver,screenshotPath);
    await driver.sleep(2000);

    //will get all pipelines
    const allPipelines = await dealPipelinePageElementObj.findAllPipelineOnListPage(driver);
    //will travel all pipelines
    for(let i=0; i<allPipelines.length; i++){
        const pipelineName = await allPipelines[i].getText();
        //will check the deleted pipeline is get removed or not
        if(pipelineName.includes(pipeline)){
            await driver.executeScript("arguments[0].scrollIntoView();", allPipelines[i]);
            await screenshotObj.takeScreenshot(driver,screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotDeleted.png');
            assert.fail('Due to the \''+pipeline+'\' pipeline is not get deleted, the test case has been failed. Screenshot Name: \''+screenshotPath+pipeline.replace(/\s/g,'_')+'_Pipeline_NotDeleted.png\'.');
        }
    }

    console.log('The \''+pipeline+'\' pipeline is get deleted...');
});

Then('the delete button should not be displayed for the {string} system pipeline', async (pipeline) =>{
    //will get all pipelines
    const allPipelines = await dealPipelinePageElementObj.findAllPipelineOnListPage(driver);
    //will get the first pipeline name because it is a system pipeline
    const firstPipelineName = await allPipelines[0].getText();
    //will find the delete button for the system pipeline
    const pipelineDeleteBtn = await dealPipelinePageElementObj.findPipelineDeleteBtn(driver,firstPipelineName);

    //will check the delete button for the system pipeline is found or not
    if(pipelineDeleteBtn.length > 0){
        await driver.executeScript("arguments[0].scrollIntoView();", allPipelines[0]);
        await screenshotObj.takeScreenshot(driver,screenshotPath+firstPipelineName.replace(/\s/g,'_')+'_Pipeline_DeleteBtn_Found.png');
        assert.fail('Due to the delete button for the \''+firstPipelineName+'\' system pipeline is found, the test case has been failed. Screenshot Name: \''+screenshotPath+firstPipelineName.replace(/\s/g,'_')+'_Pipeline_DeleteBtn_Found.png\'.');
    }else{
        console.log('The delete button for the \''+firstPipelineName+'\' system pipeline is not found...');
    }
});
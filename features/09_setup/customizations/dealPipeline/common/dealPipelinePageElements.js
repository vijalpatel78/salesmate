const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of deal pipeline page on the browser 
 *  and then return those elements 
*/

async function findNewPipelineBtn(driver,screenshotPath){
    let newPipelineBtn;

    try{
        newPipelineBtn = await driver.findElement(By.xpath('//button[text()=" New Pipeline "]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/NewPipelineBtn_NotFound.png');
        await assert.fail('Due to the new pipeline button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/NewPipelineBtn_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(newPipelineBtn));
    return newPipelineBtn;
}exports.findNewPipelineBtn=findNewPipelineBtn;

async function findPipelineTextbox(driver,screenshotPath){
    let pipelineTextbox;

    try{
        pipelineTextbox = await driver.findElement(By.id('pipeline'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/PipelineTextbox_NotFound.png');
        await assert.fail('Due to the pipeline textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/PipelineTextbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(pipelineTextbox));
    return pipelineTextbox;
}exports.findPipelineTextbox=findPipelineTextbox;

async function findStageTitleTextbox(driver,screenshotPath){
    let stageTitleTextbox;

    try{
        stageTitleTextbox = await driver.findElement(By.id('stageName'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/StageTitleTextbox_NotFound.png');
        await assert.fail('Due to the stage title textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/StageTitleTextbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(stageTitleTextbox));
    return stageTitleTextbox;
}exports.findStageTitleTextbox=findStageTitleTextbox;

async function findWinProbabilityTextbox(driver,screenshotPath){
    let winProbabilityTextbox;

    try{
        winProbabilityTextbox = await driver.findElement(By.id('winProbability'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/WinProbabilityTextbox_NotFound.png');
        await assert.fail('Due to the win probability textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/WinProbabilityTextbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(winProbabilityTextbox));
    return winProbabilityTextbox;
}exports.findWinProbabilityTextbox=findWinProbabilityTextbox;

async function findRottenPeriodTextbox(driver,screenshotPath){
    let rottenPeriodTextbox;

    try{
        rottenPeriodTextbox = await driver.findElement(By.id('rottenPeriod'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/RottenPeriodTextbox_NotFound.png');
        await assert.fail('Due to the rotten period textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/RottenPeriodTextbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(rottenPeriodTextbox));
    return rottenPeriodTextbox;
}exports.findRottenPeriodTextbox=findRottenPeriodTextbox;

async function findSetProbabilityManuallyCheckbox(driver,screenshotPath){
    let setProbabilityManuallyCheckbox;

    try{
        setProbabilityManuallyCheckbox = await driver.findElement(By.id('winProbabilityField'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/SetProbabilityManuallyCheckbox_NotFound.png');
        await assert.fail('Due to the set probability manually checkbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/SetProbabilityManuallyCheckbox_NotFound.png\'.');
    }
    
    return setProbabilityManuallyCheckbox;
}exports.findSetProbabilityManuallyCheckbox=findSetProbabilityManuallyCheckbox;

async function findSaveBtn(driver,screenshotPath){
    let saveBtn;

    try{
        saveBtn = await driver.findElement(By.id('btnUpdate'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/SaveBtn_NotFound.png');
        await assert.fail('Due to the save button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/SaveBtn_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsEnabled(saveBtn));
    return saveBtn;
}exports.findSaveBtn=findSaveBtn;

async function findAllStagesOfPipeline(driver,pipeline){
    await driver.manage().setTimeouts({implicit:10000});
    const allStagesOfPipeline = await driver.findElements(By.xpath('//span[text()="'+pipeline+' "]/ancestor::div[@class="content no-padder m-b-lg deal-pipeline-wrapper"]/descendant::div[@class="title text-ellipsis m-b-sm"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return allStagesOfPipeline;
}exports.findAllStagesOfPipeline=findAllStagesOfPipeline;

async function findPipelineNameOnListPage(driver,pipeline){
    await driver.manage().setTimeouts({implicit:10000});
    const pipelineNameOnListPage = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return pipelineNameOnListPage;
}exports.findPipelineNameOnListPage=findPipelineNameOnListPage;

async function findAllPipelineOnListPage(driver){
    await driver.manage().setTimeouts({implicit:10000});
    const allPipeline = await driver.findElements(By.xpath('//span[@class="title pull-left"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return allPipeline;
}exports.findAllPipelineOnListPage=findAllPipelineOnListPage;

async function findPipelineEditBtn(driver,pipeline){
    await driver.manage().setTimeouts({implicit:10000});
    const pipelineEditBtn = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/following-sibling::a[@class="m-t-n-xxs pull-right btn-icon"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return pipelineEditBtn;
}exports.findPipelineEditBtn=findPipelineEditBtn;

async function findPipelineDeleteBtn(driver,pipeline){
    await driver.manage().setTimeouts({implicit:10000});
    const pipelineDeleteBtn = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/following-sibling::span/button[@class="btn btn-default btn-icon pull-right"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return pipelineDeleteBtn;
}exports.findPipelineDeleteBtn=findPipelineDeleteBtn;

async function findAddStageBtn(driver,pipeline){
    await driver.manage().setTimeouts({implicit:10000});
    const addStageBtn = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/following-sibling::a[@class="m-t-n-xxs m-r btn btn-default btn-sm pull-right"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addStageBtn;
}exports.findAddStageBtn=findAddStageBtn;

async function findCancelBtn(driver,screenshotPath){
    let cancelBtn;

    try{
        cancelBtn = await driver.findElement(By.xpath('//button[text()="Cancel"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/CancelBtn_NotFound.png');
        await assert.fail('Due to the cancel button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/CancelBtn_NotFound.png\'.');
    }
    
    return cancelBtn;
}exports.findCancelBtn=findCancelBtn;

async function findStageCancelBtn(driver,screenshotPath){
    let cancelBtn;

    try{
        cancelBtn = await driver.findElement(By.xpath('//button[@class="btn btn-default m-l-sm pull-left"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/CancelBtn_NotFound.png');
        await assert.fail('Due to the cancel button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'/CancelBtn_NotFound.png\'.');
    }
    
    return cancelBtn;
}exports.findStageCancelBtn=findStageCancelBtn;

async function findStagesNameOnList(driver,pipeline,stageName){
    await driver.manage().setTimeouts({implicit:10000});
    const stageNameOnList = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/ancestor::div[@class="content no-padder m-b-lg deal-pipeline-wrapper"]/descendant::div[text()="'+stageName+'"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return stageNameOnList;
}exports.findStagesNameOnList=findStagesNameOnList;

async function findWinProbabilityOnList(driver,pipeline,stageName){
    await driver.manage().setTimeouts({implicit:10000});
    const winProbabilityOnList = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/ancestor::div[@class="content no-padder m-b-lg deal-pipeline-wrapper"]/descendant::div[text()="'+stageName+'"]/following::div[1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return winProbabilityOnList;
}exports.findWinProbabilityOnList=findWinProbabilityOnList;

async function findRottenPeriodOnList(driver,pipeline,stageName){
    await driver.manage().setTimeouts({implicit:10000});
    const rottenPeriodOnList = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/ancestor::div[@class="content no-padder m-b-lg deal-pipeline-wrapper"]/descendant::div[text()="'+stageName+'"]/following::div[2]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return rottenPeriodOnList;
}exports.findRottenPeriodOnList=findRottenPeriodOnList;

async function findStageEditBtn(driver,pipeline,stageName){
    await driver.manage().setTimeouts({implicit:10000});
    const stageEditBtn = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/ancestor::div[@class="content no-padder m-b-lg deal-pipeline-wrapper"]/descendant::div[text()="'+stageName+'"]/following::button[@class="btn btn-default btn-icon m-t-lg m-r-xs"][1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return stageEditBtn;
}exports.findStageEditBtn=findStageEditBtn;

async function findStageForDragAndDrop(driver,pipeline,stage){
    await driver.manage().setTimeouts({implicit:10000});
    const stageName = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/ancestor::div[@class="content no-padder m-b-lg deal-pipeline-wrapper"]/descendant::div[text()="'+stage+'"]/ancestor::div[@class="stage layout-drap-drop cursor-move list-group-item ui-sortable-handle"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return stageName;
}exports.findStageForDragAndDrop=findStageForDragAndDrop;

async function findStageDeleteBtn(driver,pipeline,stageName){
    await driver.manage().setTimeouts({implicit:10000});
    const stageDeleteBtn = await driver.findElements(By.xpath('//span[@class="title pull-left"][text()="'+pipeline+' "]/ancestor::div[@class="content no-padder m-b-lg deal-pipeline-wrapper"]/descendant::div[text()="'+stageName+'"]/following::button[@class="btn btn-default btn-icon m-t-lg"][1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return stageDeleteBtn;
}exports.findStageDeleteBtn=findStageDeleteBtn;
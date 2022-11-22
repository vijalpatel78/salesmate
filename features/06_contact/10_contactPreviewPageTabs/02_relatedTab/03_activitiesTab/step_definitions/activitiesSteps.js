const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/03_activitiesTab/screenshots/';
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const activitiesElementsObj = require('../common/activitiesElements');
const formElementsObj =require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

let addActivityPageTitle = 'no', addActivityPageContact = 'no', activityCountBeforeAddingActivity = 'no';
let titleFieldData = 'no', activitiesCountBeforeDeleting = 'no';

//--------------Case 1: As a User, Verify that When No Activity is attached it should display 'No Activity yet! let's create one' message----------

When('verify that When No Activity is attached it should display {string} message',async function(expectedNotification){
   try {
       const activities = await driver.findElement(By.xpath('//div[3]/div/section-title//i')).getText();
       console.log(activities);
       const activitiesText = await activities.replace(/[()]/g, '');
       const activitiesCount = await parseInt(activitiesText);
       console.log("Activities Count: "+activitiesCount);
       await activitiesElementsObj.findSideArrow(driver);
       if(activitiesCount === 0) {
           //check 'No Activities found' message
           const actualNotification = await driver.findElement(By.xpath('//div[@class="text-center wrapper"]//p')).getText();
           console.log("Actual Activity Notification: " + actualNotification);
           try {
               strictEqual(actualNotification, expectedNotification);
               console.log("As no activities are found the 'No Activity yet! let's create one' message is displayed,so test case has been passed");
           } catch (err) {
               await assert.fail(err);
           }
       } else {
           await assert.fail("As no activities are found the 'No deals found' message is not displayed,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'activityMessage_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//--------Case 2: As a User, Verify that it should open Add Activity dialog upon clicking on + button of Activity Panel---------

Then('verify that it should open Add Activity dialog upon clicking on + button of Activity Panel',async function(){
   try {
       await activitiesElementsObj.findAddActivityIcon(driver);
       const addNewActivityDialog = await driver.findElements(By.xpath('//h4[text()="Add New Activity"]'));
       const addNewActivityDialogLength = await addNewActivityDialog.length;
       if(addNewActivityDialogLength > 0) {
           console.log("As 'Add New Activity' dialog is displayed after clicking on '+' icon,so test case has been passed");
       } else {
           await assert.fail("As 'Add New Activity' dialog is not displayed after clicking on '+' icon,so test case has been aborted");
       }
       await activitiesElementsObj.findAddActivityCloseIcon(driver);
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'addActivityDialog_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//--------Case 3: As a User, Verify that Upon clicking on save button it should add Activity to Activity Panel on the spot---------

Then('verify that Upon clicking on save button it should add Activity to Activity Panel on the spot',async function(dataTable){
    try {
        //get 'Activities Count' before adding a deal
        const activities = await driver.findElement(By.xpath('//div[3]/div/section-title//i')).getText();
        console.log(activities);
        const activitiesCount = await activities.replace(/[()]/g, '');
        activityCountBeforeAddingActivity = await parseInt(activitiesCount);
        console.log("Activities Count Before Adding a Activity: "+activityCountBeforeAddingActivity);
        await activitiesElementsObj.findAddActivityIcon(driver);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the value field dropdown field is given or not
                if (titleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the value field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Title' field
                await driver.sleep(1000);
                const titleField = await activitiesElementsObj.findAddActivityFields(driver,'title');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            }
        }
        //get 'Added Deal' values
        addActivityPageTitle = await driver.findElement(By.id('title')).getAttribute('value');
        console.log(addActivityPageTitle);
        addActivityPageContact = await driver.findElement(By.xpath('//a[@class="name m-r-xs text-ellipsis"]')).getText();
        console.log(addActivityPageContact);
        await activitiesElementsObj.findSaveButton(driver);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activity_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('check added activity details',async function(){
    try {
        //get 'Added Activity Details' on 'Related Tab'
        const activityTitle = await driver.findElement(By.xpath('//ul//a[@title="Click to view details"]')).getText();
        console.log(activityTitle);
        if(addActivityPageTitle === activityTitle) {
            console.log("As add activity page and contact details widget page activity details are added,so test case has been passed");
        } else {
            await assert.fail("As activity deal page and contact details widget page activity details are not added,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------Case 4: As a User, Verify that when adding a new Activity it should increase a Activity count in Activity Panel---------

Then('verify that when adding a new Activity it should increase a Activity count in Activity Panel',async function(){
    try {
        //get 'Activity Count' after adding a deal
        const activities = await driver.findElement(By.xpath('//div[3]/div/section-title//i')).getText();
        console.log(activities);
        const activitiesCount = await activities.replace(/[()]/g, '');
        console.log(activitiesCount);
        const activitiesCountAfterAddingDeal = await parseInt(activitiesCount);
        console.log("Activities Count After Adding a Deal: "+activitiesCountAfterAddingDeal);
        if((activityCountBeforeAddingActivity)+1 === activitiesCountAfterAddingDeal) {
            console.log("As activity count is increased by (X+1) after adding a deal,so test case has been passed");
        } else {
            await assert.fail("As activity count is not increased by (X+1) after adding a deal,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityCount_NotIncreased.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-----------------------Case 5: As a User, Verify that I can expand - collapse Activity Panel--------------------------

Then('verify that I can expand - collapse Activity Panel',async function(){
    try {
        //click on 'Collapse' arrow from 'Activity Panel'
        await activitiesElementsObj.findSideArrow(driver);
        //verify whether 'Activity Section Table' is hidden or not after collapsing it
        await driver.manage().setTimeouts({implicit: 2000});
        const activitySectionTable = await driver.findElement(By.xpath('//ul[@class="rt-listing"]')).isDisplayed();
        if(activitySectionTable === true) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'activitySectionTableHidden.png');
            console.log("As activity section table is hidden after expanding section,so test case has been passed");
        } else {
            await assert.fail("As activity section table is not hidden even after expanding section,so test case has been aborted");
        }
        //click on 'Expand' arrow from 'Activity Panel'
        await activitiesElementsObj.findCollapsedArrow(driver);
        //verify whether 'Activity Section Table' is visible or not after expanding it
        await driver.manage().setTimeouts({implicit: 2000});
        const activitySectionTableElement = await driver.findElement(By.xpath('//ul[@class="rt-listing"]')).isDisplayed();
        if(activitySectionTableElement === false) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'activitySectionTableVisibility.png');
            console.log("As activity section table is visible after collapsing section,so test case has been passed");
        } else {
            await assert.fail("As activity section table is not visible even after collapsing section,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activitySection_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------Case 6: As a User, Verify that Activity can be removed/ disassociate from contact by the remove option on Activity card---------

Then('verify that Activity can be removed disassociate from {string} by the remove option on Activity card',async function(moduleName){
    try {
        //get 'Activity Count' before deleting a activity
        const activities = await driver.findElement(By.xpath('//div[3]/div/section-title//i')).getText();
        const activitiesCount = await activities.replace(/[()]/g, '');
        activitiesCountBeforeDeleting = await parseInt(activitiesCount);
        console.log(activitiesCountBeforeDeleting);
        await activitiesElementsObj.findSideArrow(driver);
        await driver.sleep(1000);
        await activitiesElementsObj.findActivityRemoveButton(driver);
        await activitiesElementsObj.findDeleteConfirmationButton(driver);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('check deleted activity details',async function(){
   try {
       //get 'Activity Count' after deleting a activity
       const activities = await driver.findElement(By.xpath('//sm-activity-list/section/section-title//i')).getText();
       const activitiesCount = await activities.replace(/[\[\]']+/g,'');
       const activitiesCountAfterDeleting = await parseInt(activitiesCount);
       console.log(activitiesCountAfterDeleting);
       await driver.sleep(2000);
       await driver.manage().setTimeouts({implicit: 2000});
       if((activitiesCountBeforeDeleting)-1 === activitiesCountAfterDeleting) {
           console.log("As Activity is removed and decreased by (X-1),so test case has been passed");
       } else {
           await assert.fail("As Activity is not removed and not decreased by (X-1),so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'activity_NotRemoved.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//--------Case 7: As a User, Verify that upon clicking on the Activity name link it should open Activity quick view---------

Then('verify that upon clicking on the Activity name link it should open Activity quick view',async function(){
    try {
        await activitiesElementsObj.findSideArrow(driver);
        await activitiesElementsObj.findActivityTitle(driver);
        //check 'Activity Title' redirects to 'Activity Quick View' page
        const activityQuickView = await driver.findElement(By.xpath('//activity-quick-view-header/div/div/div[1]/div[.=" Activity 01 "]')).isDisplayed();
        console.log("Is Activity Quick View Displayed: "+activityQuickView);
        if(activityQuickView === true) {
            console.log("As on click of 'Activity Title' icon it redirects to 'Activity Quick View' page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Activity Title' icon it does not redirects to 'Activity Quick View' page,so test case has been aborted");
        }
        await driver.findElement(By.xpath('//quick-view-activity[@class="enable-scroll"]/div[2]/div[@class="material-header quickview-header"]/a')).click();
        await driver.sleep(1000);
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activityQuickView_NotOpened.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
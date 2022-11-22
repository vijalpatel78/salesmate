const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const screenshotPath = './features/06_contact/09_contactDetails/03_changeOwner/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');

let wonDescriptionFieldData = 'no', lostReasonDropdownData = 'no', lostDescriptionFieldData = 'no', dealWonDescription, dealLostDescription = 'no';

//----------------------------------Case 1: Verify, user is able to won a deal------------------------------------------

When('user is able to won a deal',async function(dataTable){
   try {
        const dealWonButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Won ');
        await dealWonButton.click();
        await driver.sleep(1000);
       //will travel provided fields and data list
       for (let i = 0; i < dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'won description') {
               wonDescriptionFieldData = dataTable.rawTable[i][1];

               //will find 'Won Description' field and pass the new data
               const wonDescriptionField = await driver.findElement(By.xpath("//deal-won-lost-dialog//textarea[@id='description']"));
               await clearFieldDataObj.clearFieldData(wonDescriptionField);
               await wonDescriptionField.sendKeys(wonDescriptionFieldData);
               await driver.sleep(1000);
               dealWonDescription = await driver.findElement(By.xpath("//deal-won-lost-dialog//textarea[@id='description']")).getAttribute('value');
               console.log("Won Description: "+dealWonDescription);
           }
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

When('user click on save button',async function(){
   try {
       await driver.findElement(By.xpath('//button[@id="btnSave"]//span[.=" Save "]')).click();
       await driver.sleep(1000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('check deal status and added won deal note details',async function(){
    try {
        await driver.sleep(1000);
        //check 'Deal Status'
        const openDealButton = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','label-won m-r-sm pull-left','openDealButton');
        const openDealButtonVisibility = !!await openDealButton.isDisplayed();
        if (openDealButtonVisibility === true) {
            console.log("As deal stage is displayed as 'Opened',so test case has been passed");
        } else {
            await assert.fail("As deal stage is not displayed as 'Opened',so test case has been aborted");
        }
        const notesTimeline = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await notesTimeline.click();
        await driver.sleep(2000);
        //get 'Won Description' data over 'Notes' timeline
        const notesTimelineWonDealDescription = await driver.findElement(By.xpath('(//div[@class="breakword"])[1]')).getText();
        console.log("Note Timeline Won Description: "+notesTimelineWonDealDescription);
        if (dealWonDescription === notesTimelineWonDealDescription) {
            console.log("Both deal won description of deal won dialog and notes timeline are equal and updated, so test case has been passed");
        } else {
            await assert.fail("Both deal won description of deal won dialog and notes timeline are not equal and even not updated, so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------------Case 2: Verify, user is able to lost a deal-----------------------------------------

When('user is able to lost a deal',async function(dataTable){
    try {
        const dealLostButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Lost ');
        await dealLostButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'lost reason') {
                lostReasonDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the lost reason dropdown field is given or not
                if (lostReasonDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the lost reason dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Lost Reason' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'lostReason', lostReasonDropdownData, 'yes');
            } else if (fieldName == 'lost description') {
                lostDescriptionFieldData = dataTable.rawTable[i][1];

                //will find 'Lost Description' field and pass the new data
                const lostDescriptionField = await driver.findElement(By.xpath("//deal-won-lost-dialog//textarea[@id='description']"));
                await clearFieldDataObj.clearFieldData(lostDescriptionField);
                await lostDescriptionField.sendKeys(lostDescriptionFieldData);
                await driver.sleep(1000);
                dealLostDescription = await driver.findElement(By.xpath('//deal-won-lost-dialog//textarea[@id="description"]')).getAttribute('value');
                console.log("Won Description: "+dealLostDescription);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('check deal status and added lost deal note details',async function() {
    try {
        await driver.sleep(1000);
        //check 'Deal Status'
        const lostDealButton = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','label-lost m-r-sm pull-left','lostDealButton');
        const lostDealButtonVisibility = !!await lostDealButton.isDisplayed();
        if (lostDealButtonVisibility === true) {
            console.log("As deal stage is displayed as 'Lost',so test case has been passed");
        } else {
            await assert.fail("As deal stage is not displayed as 'Lost',so test case has been aborted");
        }
        const notesTimeline = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await notesTimeline.click();
        await driver.sleep(2000);
        //get 'Lost Description' data over 'Notes' timeline
        const notesTimelineLostDealDescription = await driver.findElement(By.xpath('(//div[@class="breakword"])[1]')).getText();
        console.log("Note Timeline Won Description: "+notesTimelineLostDealDescription);
        if (dealLostDescription === notesTimelineLostDealDescription) {
            console.log("Both deal lost description of deal lost dialog and notes timeline are equal and updated, so test case has been passed");
        } else {
            await assert.fail("Both deal lost description of deal lost dialog and notes timeline are not equal and even not updated, so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
})

//----------------------------------Case 3: Verify, user is able to reopen a deal---------------------------------------

When('user is able to reopen a deal',async function(){
    try {
        const reOpenButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Reopen ');
        await reOpenButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check deal status as open',async function(){
   try {
       const dealStatus = await driver.findElement(By.xpath('(//div[@col-id="status"])[2]')).getText();
       console.log("Deal Status after Reopening deal is: "+dealStatus);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----------------Case 4: Verify, the user is not able to update deal status when he doesn't have deal update rights----------------

When('deal won or lost option is not visible and log in through {string}',async function(adminUser){
    try {
        //check 'Deal Won' button invisibility
        await driver.manage().setTimeouts({implicit: 2000});
        const dealWonButton = await driver.findElements(By.xpath('//button[text()="Won "]'));
        const dealWonButtonLength = await dealWonButton.length;
        //check 'Deal Lost' button invisibility
        await driver.manage().setTimeouts({implicit: 2000});
        const dealLostButton = await driver.findElements(By.xpath('//button[text()=" Lost "]'));
        const dealLostButtonLength = await dealLostButton.length;
        if ((dealWonButtonLength && dealLostButtonLength) === 0) {
            console.log("As 'Deal Won' and 'Deal Lost' buttons length is 0, i.e, they are not visible, so test case has been passed");
        } else {
            await assert.fail("As 'Deal Won' and 'Deal Lost' buttons length is not 0, i.e, they are visible, so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

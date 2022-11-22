const { Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/13_teammatesWidget/screenshots/';
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');

//--------------------------------Case 1: As a User, Verify the UI of "Participants" widget--------------------------------

Then('verify the UI of "Participants" widget',async function(){
    try {
        const participantsWidget = await driver.findElement(By.xpath('//sm-add-teammate/section-title/h4')).getText();
        console.log("Participants Widget: "+participantsWidget);
        const searchBox = !!await driver.findElement(By.xpath('//sm-add-teammate//ro-tag/div/input')).isDisplayed();
        strictEqual(searchBox,true);
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'participantsWidget_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 2: As a user, Verify that the user able to add the participants from the deal details-------------

Then('verify that the user able to add the participant as {string} from the deal details',async function(participantName){
    try {
        const participantsBeforeAdding = await driver.findElements(By.xpath('//sm-add-participant//a[@class="name m-r-sm"]'));
        const participantsCountBeforeAdding = await participantsBeforeAdding.length;
        console.log("Participants Count Before Adding: "+participantsCountBeforeAdding);
        await driver.sleep(2000);
        const searchBox = await driver.findElement(By.xpath('//sm-add-participant/section-body//ro-tag/div/input'));
        await searchBox.click();
        await driver.sleep(500);
        await searchBox.sendKeys(participantName);
        await driver.sleep(2000);
        const selectParticipant = await driver.findElement(By.xpath('//thumb[.="S"]'));
        await driver.executeScript("arguments[0].click();",selectParticipant);
        await driver.sleep(2000);
        const participantsAfterAdding = await driver.findElements(By.xpath('//sm-add-participant//a[@class="name m-r-sm"]'));
        const participantsCountAfterAdding = await participantsAfterAdding.length;
        console.log("Participants Count After Adding: "+participantsCountAfterAdding);
        await driver.sleep(500);
        if ((participantsCountBeforeAdding)+1 === participantsCountAfterAdding) {
            console.log("As participants count is increased by (X+1),so test case has been passed");
        } else {
            await assert.fail("As participants count is not increased by (X+1),so test case has been aborted");
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 3: As a User, Verify user able to remove the contact by clicking on 'X' button--------------------

Then('verify user able to remove the contact by clicking on "X" button',async function(){
    try {
        const userThumb = await driver.findElement(By.xpath('//span[@title="Sample Contact"]/thumb[.="S"]'));
        await userThumb.click();
        await driver.sleep(500);
        const removeIcon = await driver.findElement(By.xpath('//sm-add-participant//span[@class="icon-close pull-left text-danger"]'));
        await removeIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const deletedContact = await driver.findElements(By.xpath('//ul//a[.="Sample Contact"]'));
        const deletedContactLength = await deletedContact.length;
        if (deletedContactLength === 0) {
            console.log("As deleted contact is not displayed and therefore it is deleted,so test case has been passed");
        } else {
            await assert.fail("As deleted contact is displayed even after it is deleted,so test case has been aborted");
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------Case 4: As a User, Verify that user is able to navigate to details view of contact--------------------------------

Then('verify that user is able to navigate to details view of contact',async function(){
    try {
        const participantName = await driver.findElement(By.xpath('(//sm-add-participant//ul//a)[1]'));
        await participantName.click();
        await driver.sleep(3500);
        //check on clicking on 'Contact Name' it redirects to 'Deal Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Contact Name' it redirects to 'Deal Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Contact Name' it does not redirects to 'Deal Details' screen page,so test case has been aborted");
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 5: As a User, Verify that timeline entry should get updated after adding participant of the deal------------------

Then('verify that timeline entry should get updated after adding participant of the deal',async function(){
    try {
        const updatesTimeline = await driver.findElement(By.xpath('//a[text()="Updates"]'));
        await updatesTimeline.click();
        await driver.sleep(2000);
        const timelineUpdatedText = await driver.findElement(By.xpath('//timeline-follower-log[1]//span[@class="font-medium"]')).getText();
        console.log("Timeline Updated Text: "+timelineUpdatedText);
        const addedParticipantName = await driver.findElement(By.xpath('(//timeline-follower-log[1]//span)[5]')).getText();
        console.log("Added Participant Name: "+addedParticipantName);
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 6: As a User, Verify that If user doesn't have contact rights then it should not able to add the participants in the widget-----

Then('participants search box is not displayed and log in through {string}',async function(adminUser){
    try{
        await driver.manage().setTimeouts({implicit: 2000});
        const searchBox = await driver.findElements(By.xpath('//sm-add-participant/section-body//ro-tag/div/input'));
        const searchBoxLength = await searchBox.length;
        if (searchBoxLength === 0) {
            console.log("As search box is not displayed after disabling the rights of deal edit right,so test case has been passed");
        } else {
            await assert.fail("As search box is displayed even after disabling the rights of deal edit right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deals listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on deals listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deals listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on deals listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
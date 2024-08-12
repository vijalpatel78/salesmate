const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/13_teammatesWidget/screenshots/';
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//--------------------------------Case 1: As a User, Verify the UI of "Teammates" widget--------------------------------

Then('verify the UI of "Teammates" widget',async function(){
    try {
        const teammatesWidget = await driver.findElement(By.xpath('//sm-add-teammate/section-title/h4')).getText();
        console.log("Teammates Widget: "+teammatesWidget);
        const teammateName = await driver.findElement(By.xpath('(//sm-add-teammate//ul//a)[1]')).getText();
        console.log("Teammate Name: "+teammateName);
        const searchBox = !!await driver.findElement(By.xpath('//sm-add-teammate//ro-tag/div/input')).isDisplayed();
        strictEqual(searchBox,true);
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'teammatesWidget_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 2: As a user, Verify that the user able to add the teammates from the deal details-------------

Then('verify that the user able to add the teammate as {string} from the deal details',async function(teammateName){
    try {
        const teammatesBeforeAdding = await driver.findElements(By.xpath('//sm-add-teammate//a[@class="name m-r-sm"]'));
        const teammatesCountBeforeAdding = await teammatesBeforeAdding.length;
        console.log("Teammates Count Before Adding: "+teammatesCountBeforeAdding);
        await driver.sleep(500);
        const searchBox = await driver.findElement(By.xpath('//sm-add-teammate/section-body//ro-tag/div/input'));
        await searchBox.sendKeys(teammateName);
        await driver.sleep(2000);
        const selectTeammate = await driver.findElement(By.xpath('//thumb[.="P"]'));
        await selectTeammate.click();
        await driver.sleep(2000);
        const teammatesAfterAdding = await driver.findElements(By.xpath('//sm-add-teammate//a[@class="name m-r-sm"]'));
        const teammatesCountAfterAdding = await teammatesAfterAdding.length;
        console.log("Teammates Count After Adding: "+teammatesCountAfterAdding);
        await driver.sleep(500);
        if ((teammatesCountBeforeAdding)+1 === teammatesCountAfterAdding) {
            console.log("As teammates count is increased by (X+1),so test case has been passed");
        } else {
            await assert.fail("As teammates count is not increased by (X+1),so test case has been aborted");
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 3: As a User, Verify user able to remove the user by clicking on 'X' button--------------------

Then('verify user able to remove the user by clicking on "X" button',async function(){
    try {
        const userThumb = await driver.findElement(By.css('.list-group.no-bg.no-borders.pull-in.users-chip-block span[title="Priyanka Vlr"] > thumb'));
        await userThumb.click();
        await driver.sleep(500);
        const removeIcon = await driver.findElement(By.xpath('//li[2]//span[@class="icon-close pull-left text-danger"]'));
        await removeIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const deletedUser = await driver.findElements(By.xpath('//ul//a[.=" Priyanka Vlr "]'));
        const deletedUserLength = await deletedUser.length;
        if (deletedUserLength === 0) {
            console.log("As deleted user is not displayed and therefore it is deleted,so test case has been passed");
        } else {
            await assert.fail("As deleted user is displayed even after it is deleted,so test case has been aborted");
        }
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 4: As a User, Verify that Quick view should be open with user details while user clicking to the user name--------------------------------

Then('verify that Quick view should be open with user details while user clicking to the user name',async function(){
    try {
        const teammateName = await driver.findElement(By.xpath('(//sm-add-teammate//ul//a)[1]'));
        await teammateName.click();
        await driver.sleep(3500);
        const quickView = await driver.findElements(By.xpath('//sm-user-quick-view//div[@class="material-header quickview-header"]'));
        const quickViewLength = await quickView.length;
        if (quickViewLength > 0) {
            console.log("As on clicking on the teammate name it opened the quick view of teammate,so test case has been passed");
        } else {
            await assert.fail("As on clicking on the teammate name it has not opened the quick view of teammate,so test case has been aborted");
        }
        const closeIcon = await driver.findElement(By.xpath('//sm-user-quick-view//div[@class="material-header quickview-header"]/a'));
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 5: As a User, Verify the user should able to change the owner from the teammates widget-----------------------

When('verify the user should able to change the owner from the teammates widget',async function(){
    try{
        const teammatePositionBeforeOperation = await driver.findElement(By.xpath('//sm-add-teammate//ul/li[2]/a')).getText();
        console.log("Teammate position before operation: "+teammatePositionBeforeOperation);
        const teammateAssign = await driver.findElement(By.xpath('//sm-add-teammate//ul/li[2]/a'));
        await teammateAssign.click();
        await driver.sleep(2000);
        const teammatePositionAfterOperation = await driver.findElement(By.xpath('//sm-add-teammate/section-body//span[@class="pull-right"]')).getText();
        console.log("Teammate position after operation: "+teammatePositionAfterOperation);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 6: As a User, Verify that timeline entry should get updated after assign the deal to other teammates------------------

Then('verify that timeline entry should get updated after assign the deal to other teammates',async function(){
    try {
        const updatesTimeline = await driver.findElement(By.xpath('//a[text()="Updates"]'));
        await updatesTimeline.click();
        await driver.sleep(2000);
        const timelineUpdatedText = await driver.findElement(By.xpath('//timeline-field-update-log[1]//div[@class="timeline-head-title"]')).getText();
        console.log("Timeline Updated Text: "+timelineUpdatedText);
        const previousOwner = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log[1]//span)[5]')).getText();
        console.log("Previous owner: "+previousOwner);
        const updatedOwner = await driver.findElement(By.xpath('(//soul-timeline/div/timeline-field-update-log[1]//span)[7]')).getText();
        console.log("Updated Owner: "+updatedOwner);
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
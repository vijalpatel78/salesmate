const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/03_deleteDeal/screenshots/';
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

//----------------Case 3: As a User, Verify it should display confirmation message upon clicking on the delete deal options-----------------

When('verify it should display confirmation message upon clicking on details page delete deal options',async function(){
    try {
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        const detailsPageDeleteLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Delete');
        await detailsPageDeleteLink.click();
        await driver.sleep(2000);
        //check confirmation Dialog visibility
        const confirmationPopup = await driver.findElements(By.xpath('//ngb-modal-window//sm-confirm-prompt//p'));
        const confirmationText = await driver.findElement(By.xpath('//ngb-modal-window//sm-confirm-prompt//p')).getText();
        console.log("Confirmation Popup Text "+confirmationText);
        if (confirmationPopup.length > 0) {
            console.log("As confirmation popup dialog opened after clicking on delete button,so test case has been passed");
        } else {
            await assert.fail("As confirmation popup dialog not opened even after clicking on delete button,so test case has been aborted");
        }
        const confirmationNoButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await confirmationNoButton.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 4: As a user, Verify upon clicking on 'yes' button it should soft delete deal------------------

When('verify upon clicking on "yes" button it should soft delete the deal and verify {string} message',async function(expectedNotification){
    try {
        const deals = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        const dealsCountBeforeDeleting = await deals.length;
        console.log("Deals Count Before Deleting: "+dealsCountBeforeDeleting);
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        const detailsPageDeleteLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Delete');
        await detailsPageDeleteLink.click();
        await driver.sleep(1000);
        const confirmationYesButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationYesButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
        const dealsCount = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        const dealsCountAfterDeleting = await dealsCount.length;
        console.log("Deals Count After Deleting: "+dealsCountAfterDeleting);
        if ((dealsCountBeforeDeleting)-1 === dealsCountAfterDeleting) {
            console.log("As deal is softly deleted after performing delete operation,so test case has been passed");
        } else {
            await assert.fail("As deal is not deleted even after performing delete operation,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 5: As a user, Verify when I click on the 'No' button it should terminate delete process-------------

When('verify when user click on the "No" button it should terminate delete process',async function(){
    try {
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        const detailsPageDeleteLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Delete');
        await detailsPageDeleteLink.click();
        await driver.sleep(1000);
        const confirmationNoButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await confirmationNoButton.click();
        await driver.sleep(1500);
        //check confirmation Popup Dialog visibility
        const confirmationPopup = await driver.findElements(By.xpath('//ngb-modal-window//sm-confirm-prompt//p'));
        const currentPageUrl = await driver.getCurrentUrl();
        console.log(currentPageUrl);
        if (confirmationPopup.length === 0 && currentPageUrl.endsWith('/detail')) {
            console.log("As confirmation popup closed after clicking on no button,so test case has been passed");
        } else {
            await assert.fail("As confirmation popup dialog is not closed even after clicking on no button,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
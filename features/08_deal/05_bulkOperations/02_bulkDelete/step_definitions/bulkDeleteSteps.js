const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/05_bulkOperations/03_bulkDelete/screenshots/';
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');

//---------------Case 3: As a user, I should be able to bulk delete deals from the deals listing screen-----------------

When('user should be able to bulk delete deals from deal listing screen and verify {string}',async function(expectedNotification) {
    try {
        //get deals lists count before deleting deals details
        const dealLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        const dealsCountBeforeDeletingDeal = await dealLists.length;
        await driver.sleep(1000);
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await dealCheckbox.click();
        await driver.sleep(1000);
        //click on bulk 'Delete' button
        const deleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await deleteButton.click();
        await driver.sleep(1000);
        //click on 'No' button
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        //click on bulk 'Delete' button
        const deleteButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await deleteButtonElement.click();
        await driver.sleep(1000);
        //click on 'Yes' button
        const deleteConfirmationElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationElement.click();
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(5000);
        //page navigation and come back to company listing page
        await pageNavigationObj.comeBackToDealListingPage(driver, screenshotPath);
        await driver.sleep(1000);
        //get deals lists count after deleting deal details
        const dealElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        const dealsCountAfterDeletingDeal = await dealElements.length;
        if((dealsCountBeforeDeletingDeal)-1 === dealsCountAfterDeletingDeal) {
            console.log("As deals list is decreased by (X-1) and deal got deleted,so test case has been passed");
        } else {
            await assert.fail("As deals list is not decreased by (X-1) and deal not deleted,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deal_NotDeleted.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
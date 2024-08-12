const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/06_massOperations/02_massDelete/screenshots/';
const massUpdateProductElementsObj = require('../../../../05_product/07_massOperations/01_massUpdate/common/massUpdateElements');
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

When('user is able to delete deals in bulk from the mass delete deals page and verify {string}',async function(expectedNotification) {
    try {
        //get deals lists count before deleting contact
        const dealsLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        const dealsCountBeforeDeleting = await dealsLists.length;
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Deals');
        await massDeleteContact.click();
        await driver.sleep(2000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Name' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(1000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const massDeleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await massDeleteButton.click();
        await driver.sleep(1000);
        const massDeleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await massDeleteConfirmationButton.click();
        await driver.sleep(1000);
        const massDeleteButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await massDeleteButtonElement.click();
        await driver.sleep(1000);
        const massDeleteConfirmationButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await massDeleteConfirmationButtonElement.click();
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(5000);
        //page navigation and come back to contact page
        await pageNavigationObj.comeBackToDealListingPage(driver);
        await driver.sleep(1000);
        //get contact lists count before adding contact details
        const dealsCount = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        const dealsCountAfterDeleting = await dealsCount.length;
        if((dealsCountBeforeDeleting)-1 === dealsCountAfterDeleting) {
            console.log("As deals length is decreased by (X-1) after performing mass delete operation,so test case has been passed");
        } else {
            await assert.fail("As deals length is not decreased by (X-1) even after performing mass delete operation,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massDelete_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 5: As a User, Verify upon clicking on cancel button it should terminate delete process--------------

When('user upon clicking on cancel button it should terminate delete deal process under {string}',async function(massDeleteButton) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massDeleteButton}`);
        await massDeleteContact.click();
        await driver.sleep(2000);
        const currentUrl = await driver.getCurrentUrl();
        if(currentUrl.endsWith('app/massoperation/deleteDeal')) {
            console.log("As mass delete page redirected to expected url page,so test case has been passed");
        } else {
            await assert.fail("As mass delete page redirected to expected url page,so test case has been aborted");
        }
        const massUpdateCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel')
        await massUpdateCancelButton.click();
        await driver.sleep(3000);
        const currentPageUrl = await driver.getCurrentUrl();
        if(currentPageUrl.endsWith('app/deals/list')) {
            console.log("As mass update termination redirected to expected contact url page,so test case has been passed");
        } else {
            await assert.fail("As mass update termination is not redirected to expected contact url page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteTermination_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
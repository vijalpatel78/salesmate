const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/06_massOperations/03_massDelete/screenshots/';
const massUpdateProductElementsObj = require('../../../../05_product/07_massOperations/01_massUpdate/common/massUpdateElements');
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//---------Case 3: As a user, I should be able to delete Companies in bulk from the Mass Delete Companies page------------

When('user is able to delete Companies in bulk from the mass delete Companies page and verify {string}',async function(expectedNotification) {
    try {
        //get companies lists count before deleting company
        const companyLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const companiesCountBeforeDeletingContact = await companyLists.length;
        await driver.sleep(500);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteCompany = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Companies');
        await massDeleteCompany.click();
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
        const companyCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await companyCheckbox.click();
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
        //page navigation and come back to company page
        await pageNavigationObj.comeBackToCompanyListingPage(driver);
        await driver.sleep(1000);
        //get company lists count before adding company details
        const companiesCount = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const companiesCountAfterDeletingContact = await companiesCount.length;
        if((companiesCountBeforeDeletingContact)-1 === companiesCountAfterDeletingContact) {
            console.log("As companies length is decreased by (X-1) after performing mass delete operation,so test case has been passed");
        } else {
            await assert.fail("As companies length is not decreased by (X-1) even after performing mass delete operation,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massDelete_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
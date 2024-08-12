const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/05_bulkOperations/03_bulkDelete/screenshots/';
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');

//------------Case 3: As a user, I should be able to bulk delete contacts from the contacts listing screen--------------

When('user should be able to bulk delete companies from company listing screen and verify {string}',async function(expectedNotification) {
    try {
        //get company lists count before deleting company details
        const companyLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const companiesCountBeforeDeletingContact = await companyLists.length;
        await driver.sleep(1000);
        const companyCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await companyCheckbox.click();
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
        await driver.sleep(2000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(6000);
        //page navigation and come back to company listing page
        await pageNavigationObj.comeBackToCompanyListingPage(driver, screenshotPath);
        await driver.sleep(1000);
        //get company lists count after deleting company details
        const companiesElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const companiesCountAfterDeletingContact = await companiesElements.length;
        if((companiesCountBeforeDeletingContact)-1 === companiesCountAfterDeletingContact) {
            console.log("As companies list is decreased by (X-1) and company got deleted,so test case has been passed");
        } else {
            await assert.fail("As companies list is not decreased by (X-1) and company not deleted,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'company_NotDeleted.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
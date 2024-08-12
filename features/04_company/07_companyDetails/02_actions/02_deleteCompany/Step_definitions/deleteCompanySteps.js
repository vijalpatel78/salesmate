const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/02_actions/02_deleteCompany/screenshots/';
const formElementsObj = require('../../../../../00_common/webElements/formElements');

let companiesCountBeforeDeletingContact = 'no';

When('get count of companies in listing page',async function(){
    try {
        //get companies lists count before deleting company
        const companiesLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        companiesCountBeforeDeletingContact = await companiesLists.length;
        console.log(companiesCountBeforeDeletingContact);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('Verify, user is able to delete a company and verify {string}',async function(expectedNotification){
    try {
        await driver.sleep(1000);
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(4000);
        //get contact lists count before adding company details
        const companiesCount = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const companiesCountAfterDeletingContact = await companiesCount.length;
        console.log(companiesCountBeforeDeletingContact)
        console.log(companiesCountAfterDeletingContact)
        if((companiesCountBeforeDeletingContact)-1 === companiesCountAfterDeletingContact) {
            console.log("As companies length is decreased by (X-1) after performing delete operation,so test case has been passed");
        } else {
            await assert.fail("As companies length is not decreased by (X-1) even after performing delete operation,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'company_NotDeleted.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/02_actions/03_deleteContact/screenshots/';
const pageNavigationObj = require('../../../../01_moduleAccessibility/common/actions');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

//-------------------------------case 3: Verify, the user is able to delete a contact-----------------------------------

When('Verify, the user is able to delete a contact and verify {string} message',async function(expectedNotification) {
    try {
        //get contact lists count before deleting contact
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountBeforeDeletingContact = await contactLists.length;
        const contact = await moduleElementsObj.clickOnContactName(driver, 1);
        await contact.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const deleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Delete');
        await deleteButton.click();
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(4000);
        await pageNavigationObj.comeBackToContactListingPage(driver);
        await driver.sleep(1000);
        //get contact lists count before adding contact details
        const contactsCount = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountAfterDeletingContact = await contactsCount.length;
        if((contactsCountBeforeDeletingContact)-1 === contactsCountAfterDeletingContact) {
            console.log("As contacts length is decreased by (X-1) after performing delete operation,so test case has been passed");
        } else {
            await assert.fail("As contacts length is not decreased by (X-1) even after performing delete operation,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contact_NotDeleted.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
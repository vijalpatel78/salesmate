const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/04_deleteContact/screenshots/';
const pageNavigationObj = require('../../01_moduleAccessibility/common/actions');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

//---------Case 1: Verify, user is not able to see Delete company option if user does not have Delete company rights-----------

Then('delete company button is not visible and log in through {string}',async function(adminUser) {
    try {
        const companyModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await companyModule.click();
        await driver.sleep(2000);
        //check invisibility of 'Delete' button on 'Preview' page
        const companyCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await companyCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(1000);
        const previewActions = await moduleElementsObj.findPreviewPageOptionsButton(driver);
        await previewActions.click();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        const previewPageDeleteButton = await driver.findElements(By.xpath('//a[text()="Delete"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteButton_Invisibility.png');
        const previewPageDeleteButtonLength = await previewPageDeleteButton.length;
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //check invisibility of 'Delete' button on 'Company Detail View' page
        const companyName = await moduleElementsObj.clickOnContactName(driver, 1);
        await companyName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageDeleteContactLink = await driver.findElement(By.xpath('//a[text()=" Delete"]')).isDisplayed();
        if (previewPageDeleteButtonLength === 0 && detailsPageDeleteContactLink === false) {
            console.log("As delete button of preview page and company details view page delete contact link are not displayed after disabling delete company rights,so test case has been passed");
        } else {
            await assert.fail("As delete button of preview page and company details view page delete contact link are displayed even after disabling delete company rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteLink_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------Case 2: Verify, user is able to see Delete company option if user have Delete contact rights--------------

Then('delete company button is visible and log in through {string}',async function(adminUser) {
    try {
        const companyModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await companyModule.click();
        await driver.sleep(2000);
        //check visibility of 'Delete' button on 'Preview' page
        await driver.manage().setTimeouts({implicit: 2000});
        const companyCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await companyCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(1000);
        const previewActions = await moduleElementsObj.findPreviewPageOptionsButton(driver);
        await previewActions.click();
        await driver.sleep(1000);
        const previewPageDeleteButton = await driver.findElements(By.xpath('//a[text()="Delete"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteButton_Invisibility.png');
        const previewPageDeleteButtonLength = await previewPageDeleteButton.length;
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        //check visibility of 'Delete' button on 'Company Detail View' page
        const companyName = await moduleElementsObj.clickOnContactName(driver, 1);
        await companyName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageDeleteContactLink = await driver.findElement(By.xpath('//a[text()=" Delete"]')).isDisplayed();
        if (previewPageDeleteButtonLength > 0 && detailsPageDeleteContactLink === true) {
            console.log("As delete button of preview page and company details view page delete contact link are displayed after enabling delete company rights,so test case has been passed");
        } else {
            await assert.fail("As delete button of preview page and company details view page delete contact link are not displayed even after enabling delete company rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteLink_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------------------------------case 3: Verify, the user is able to delete a company-----------------------------------

When('Verify, the user is able to delete a company and verify {string}',async function(expectedNotification) {
    try {
        //get companies lists count before deleting company
        const companiesLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const companiesCountBeforeDeletingContact = await companiesLists.length;
        const companyCheckbox = await moduleElementsObj.findContactCheckbox(driver,4);
        await companyCheckbox.click();
        await driver.sleep(1000);
        const deleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await deleteButton.click();
        await driver.sleep(1000);
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
        await pageNavigationObj.comeBackToCompanyListingPage(driver);
        //get contact lists count before adding company details
        const companiesCount = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const companiesCountAfterDeletingContact = await companiesCount.length;
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
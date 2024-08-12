const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/04_deleteDeal/screenshots/';
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

//---------Case 6: Verify, user is not able to see Delete deal option if user does not have Delete deal rights-----------

Then('delete deal button is not visible and log in through {string}',async function(adminUser) {
    try {
        const dealModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await dealModule.click();
        await driver.sleep(2000);
        //check invisibility of 'Delete' button on 'Preview' page
        await driver.manage().setTimeouts({implicit: 2000});
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await dealCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//deal-quick-view-header/div/div/div[1]/div[2]/a')).click();
        await driver.sleep(1500);
        const previewPageDeleteButton = await driver.findElements(By.xpath('//a[text()="Delete"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteButton_Invisibility.png');
        const previewPageDeleteButtonLength = await previewPageDeleteButton.length;
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Delete' button on 'Deal Detail View' page
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageDeleteContactLink = await driver.findElement(By.xpath('//a[text()=" Delete"]')).isDisplayed();
        if (previewPageDeleteButtonLength === 0 && detailsPageDeleteContactLink === false) {
            console.log("As delete button of preview page and deal details view page delete deal link are not displayed after disabling delete deal rights,so test case has been passed");
        } else {
            await assert.fail("As delete button of preview page and deal details view page delete deal link are displayed even after disabling delete deal rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteLink_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------Case 1: Verify, user is able to see Delete deal option if user have Delete deal rights-----------------

Then('delete deal button is visible and log in through {string}',async function(adminUser) {
    try {
        const dealModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await dealModule.click();
        await driver.sleep(2000);
        //check invisibility of 'Delete' button on 'Preview' page
        await driver.manage().setTimeouts({implicit: 2000});
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await dealCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//deal-quick-view-header/div/div/div[1]/div[2]/a')).click();
        await driver.sleep(1500);
        const previewPageDeleteButton = await driver.findElements(By.xpath('//a[text()="Delete"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteButton_Invisibility.png');
        const previewPageDeleteButtonLength = await previewPageDeleteButton.length;
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Delete' button on 'Deal Detail View' page
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageDeleteContactLink = await driver.findElement(By.xpath('//a[text()=" Delete"]')).isDisplayed();
        if (previewPageDeleteButtonLength > 0 && detailsPageDeleteContactLink === true) {
            console.log("As delete button of preview page and deal details view page delete deal link are not displayed after disabling delete deal rights,so test case has been passed");
        } else {
            await assert.fail("As delete button of preview page and deal details view page delete deal link are displayed even after disabling delete deal rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteLink_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------------Case 2: As a user able to Access delete deal option from detail view and from quick view---------------

When('user able to Access delete deal option from detail view and from quick view',async function(){
   try {
       const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
       await dealCheckbox.click();
       await driver.sleep(1000);
       const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
       await previewButton.click();
       await driver.sleep(2000);
       await driver.findElement(By.xpath('//deal-quick-view-header/div/div/div[1]/div[2]/a')).click();
       await driver.sleep(1500);
       const previewPageDeleteButton = await driver.findElements(By.xpath('//a[text()="Delete"]'));
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteButton_Invisibility.png');
       const previewPageDeleteButtonLength = await previewPageDeleteButton.length;
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
       //check invisibility of 'Delete' button on 'Deal Detail View' page
       const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
       await dealName.click();
       await driver.sleep(2000);
       const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
       await actionsButton.click();
       await driver.sleep(1500);
       await driver.manage().setTimeouts({implicit: 2000});
       const detailsPageDeleteContactLink = await driver.findElement(By.xpath('//a[text()=" Delete"]')).isDisplayed();
       if (previewPageDeleteButtonLength > 0 && detailsPageDeleteContactLink === true) {
           console.log("As delete button of preview page and deal details view page delete deal link are not displayed after disabling delete deal rights,so test case has been passed");
       } else {
           await assert.fail("As delete button of preview page and deal details view page delete deal link are displayed even after disabling delete deal rights,so test case has been aborted");
       }
       const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
       await driver.executeScript("arguments[0].click();",moduleIcon);
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//--------------Case 3: As a User, Verify it should display confirmation message upon clicking on the delete deal options---------------

When('verify it should display confirmation message upon clicking on the delete deal options',async function(){
    try {
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await dealCheckbox.click();
        await driver.sleep(1500);
        const listingPageDeleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await listingPageDeleteButton.click();
        await driver.sleep(1500);
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

When('verify upon clicking on "yes" button it should soft delete deal and verify {string} message',async function(expectedNotification){
    try {
        const deals = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        const dealsCountBeforeDeleting = await deals.length;
        console.log("Deals Count Before Deleting: "+dealsCountBeforeDeleting);
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await dealCheckbox.click();
        await driver.sleep(1500);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//deal-quick-view-header/div/div/div[1]/div[2]/a')).click();
        await driver.sleep(1500);
        const previewPageDeleteButton = await driver.findElement(By.xpath('//a[text()="Delete"]'));
        await previewPageDeleteButton.click();
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

When('verify when I click on the "No" button it should terminate delete process',async function(){
    try {
        const dealCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await dealCheckbox.click();
        await driver.sleep(1500);
        const listingPageDeleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await listingPageDeleteButton.click();
        await driver.sleep(1500);
        const confirmationNoButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await confirmationNoButton.click();
        await driver.sleep(1500);
        //check confirmation Popup Dialog visibility
        const confirmationPopup = await driver.findElements(By.xpath('//ngb-modal-window//sm-confirm-prompt//p'));
        const currentPageUrl = await driver.getCurrentUrl();
        console.log(currentPageUrl);
        if (confirmationPopup.length === 0 && currentPageUrl.endsWith('app/deals/list')) {
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
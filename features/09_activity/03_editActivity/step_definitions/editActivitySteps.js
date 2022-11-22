const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/03_editDeal/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');

let dealsCount = 'no', titleFieldData = 'no', stageFieldData = 'no', ownerFieldDropdownData = 'no',
    editDialogOwner = 'no', editDialogStage = 'no';

When('user is on activity "Edit Deal" page',async function(){
    try {
        //get Count of 'Deals' in 'Deal Listing Page'
        const deals = await driver.findElements(By.xpath('(//i[@class="icon-pencil2 m-l-xs"])[1]'));
        dealsCount = await deals.length;
        console.log("Deals Count: "+dealsCount);
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 1: Verify, As a User i should be able to see Edit deal option only if i have Edit deal rights---------

Then('edit activity module is not visible and log in through {string}',async function(adminUser) {
    try {
        const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",dealIcon);
        await driver.sleep(2500);
        //check invisibility of 'Edit' icon on listing page
        await driver.manage().setTimeouts({implicit: 2000});
        const editIcon = await driver.findElements(By.xpath('//i[@class="icon-pencil2"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editIcon_Invisibility.png');
        const editIconLength = await editIcon.length;
        //check invisibility of 'Update' button on 'Contact Preview' page
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2500);
        await driver.manage().setTimeouts({implicit: 2000});
        const previewPageUpdateButtonDisability = !!await driver.findElement(By.id('btnSubmit')).getAttribute('disabled');
        const previewPageCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Edit Contact' link on 'Deal Details' page
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageEditDealLink = !!await driver.findElement(By.xpath('//a[text()=" Edit Deal"]')).isDisplayed();
        if (editIconLength === 0 && previewPageUpdateButtonDisability === true && detailsPageEditDealLink === false) {
            console.log("As edit icon of listing page,preview page update button and details page edit deal link are not displayed after disabling edit deal rights,so test case has been passed");
        } else {
            await assert.fail("As edit icon of listing page,preview page update button and details page edit deal link are displayed even after disabling edit deal rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editIcon_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

When('edit activity module is visible and log in through {string}',async function(adminUser) {
    try {
        const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",dealIcon);
        await driver.sleep(2500);
        await driver.manage().setTimeouts({implicit: 2000});
        //check invisibility of 'Edit' icon on listing page
        const editIcon = await driver.findElements(By.xpath('//i[@class="icon-pencil2"]'));
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editIcon_Invisibility.png');
        const editIconLength = await editIcon.length;
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        //check invisibility of 'Update' button on 'Contact Preview' page
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const previewPageUpdateButtonDisability = !!await driver.findElement(By.id('btnSubmit')).getAttribute('disabled');
        const previewPageCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Edit Contact' link on 'Deal Details' page
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageEditDealElement = await driver.findElements(By.xpath('//a[text()=" Edit Deal"]'));
        const detailsPageEditDealLength = await detailsPageEditDealElement.length;
        if ((editIconLength && detailsPageEditDealLength) > 0 && previewPageUpdateButtonDisability === false) {
            console.log("As edit icon on listing page,preview page update button and details page edit deal link are displayed after enabling edit deal rights,so test case has been passed");
        } else {
            await assert.fail("As edit icon on listing page,preview page update button and details page edit deal link are not displayed even after deal edit contact rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
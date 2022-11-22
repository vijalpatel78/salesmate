const { Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/03_changeOwner/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//------Case 1: Verify, the user is not able to change contact owner when the user do not have contact edit rights------

Then('user is on contact listing page > details page',async function(){
    try {
        const contactModule = await moduleElementsObj.findContactModule(driver);
        await contactModule.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('change owner option is not visible and log in through {string}',async function(adminUser){
    try {
        //check invisibility of 'Owner Dropdown' on contact details page
        await driver.manage().setTimeouts({implicit: 2000});
        const ownerDropdownDisability = !!(await driver.findElement(By.xpath('//button[@class="btn btn-transparent disabled"]')).getAttribute('disabled')) !== null;
        console.log(ownerDropdownDisability);
        if(ownerDropdownDisability === true){
            console.log("As Owner dropdown in contact details page is disabled after disabling rights of edit contact,so test case has been passed");
        } else {
            await assert.fail("As Owner dropdown in contact details page is enabled even after disabling rights of edit contact,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'changeOwnerDropdown_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------------------Case 2: Verify, the user is able to change contact owner-----------------------------------

Then('{string} is able to change owner as {string}',async function(adminUser,owner){
    try {
        //check invisibility of 'Owner Dropdown' on contact details page
        await driver.manage().setTimeouts({implicit: 2000});
        const ownerDropdownDisability = !!await driver.findElement(By.xpath('//owner-list//button/div[@class="m-t-xxs pull-left"]')).getAttribute('disabled');
        if(ownerDropdownDisability === false){
            console.log("As Owner dropdown in contact details page is enabled after enabling rights of edit contact,so test case has been passed");
        } else {
            await assert.fail("As Owner dropdown in contact details page is disabled even after enabling rights of edit contact,so test case has been aborted");
        }
        //get 'Owner' value before updating
        const ownerValueBeforeUpdating = await driver.findElement(By.xpath('//div[@class="m-t-xxs pull-left"]')).getText();
        console.log("Owner value before updating :"+ownerValueBeforeUpdating);
        const ownerDropdown = await formElementsObj.findElementByXpath(driver,screenshotPath,'button','class','btn btn-transparent','ownerDropdown');
        await ownerDropdown.click();
        await driver.sleep(500);
        const ownerElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',` ${owner} `);
        await ownerElement.click();
        await driver.sleep(3000);
        //get 'Owner' value after updating
        const ownerValueAfterUpdating = await driver.findElement(By.xpath('//div[@class="m-t-xxs pull-left"]')).getText();
        console.log("Owner value after updating :"+ownerValueAfterUpdating);
        if(ownerValueBeforeUpdating !== ownerValueAfterUpdating) {
            console.log("As owner value got updated after changing value,so test case has been passed");
        } else {
            await assert.fail("As owner value not got updated even after changing value,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'changeOwnerDropdown_Invisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
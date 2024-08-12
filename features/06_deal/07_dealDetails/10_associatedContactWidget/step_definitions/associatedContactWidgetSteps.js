const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/10_associatedContactWidget/screenshots/';
const associatedContactElements = require('../../../../07_company/07_companyDetails/05_associatedContacts/common/associatedContactsElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//------------------------------Case 1: As a User, Verify UI of 'Associated Contacts' widget--------------------------------

Then('verify the UI of "Associated Contacts" widget',async function(){
    try {
        await driver.sleep(1500);
        const contactName = await driver.findElement(By.xpath('(//div[@class="d-flex v-center"]//a)[1]')).getText();
        console.log("Contact Name: "+contactName);
        const jobTitle = await driver.findElement(By.xpath('//li[@id="mainLi"]//div[@class="secondary-text"]')).getText();
        console.log("Job Title: "+jobTitle);
        const mobile = await driver.findElement(By.xpath('//li[@id="phone"]/div[1]//a')).getText();
        console.log("Mobile: "+mobile);
        const phone = await driver.findElement(By.xpath('//li[@id="phone"]/div[1]//a')).getText();
        console.log("Phone: "+phone);
        const email = await driver.findElement(By.xpath('//primarycontactinfo//ul//a[@href="javascript:void(0)"]')).getText();
        console.log("Email: "+email);
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedContactWidget_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 2: As a User can able to see name of the contact widget according to the given name of the contact module--------------

When('user can able to see name of contact widget according to given name of contact module',async function() {
    try {
        const contactModuleVisibility = await driver.findElement(By.xpath('//primarycontactinfo//h4')).isDisplayed();
        console.log("Is Contact Module Displayed: "+contactModuleVisibility);
        const contactModule = await driver.findElement(By.xpath('//primarycontactinfo//h4')).getText();
        console.log("Contact Module Text: "+contactModule);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedContactsWidget_NotExpanded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 3: As a User, Verify user able to navigate to details view of Contact------------------------

When('user able to navigate to details view of Contact',async function(){
    try{
        const jobTitle = await driver.findElement(By.xpath('//li[@id="mainLi"]//div[@class="secondary-text"]'));
        await jobTitle.click();
        await driver.sleep(500);
        const detailView = await driver.findElement(By.xpath('(//li[@id="mainLi"]/div//div/a[2]/i[@class="icon-expand-4 m-l-xs m-r-xs"])[1]'));
        await detailView.click();
        await driver.sleep(3000);
        //check 'Detail View Icon' redirects to 'Deal Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Detail View Icon' icon it redirects to 'Deal Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Detail View Icon' icon it does not redirects to 'Deal Details' screen page,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 4: Verify that Quick view should be open with contact all details while user clicking to the contact name--------------

When('quick view should be open with contact all details while user clicking to the contact name',async function(){
    try{
        const contactName = await driver.findElement(By.xpath('(//div[@class="d-flex v-center"]//a)[1]'));
        await contactName.click();
        await driver.sleep(3500);
        const quickView = await driver.findElements(By.xpath('//quick-view-contact//contact-quick-view-header'));
        const quickViewLength = await quickView.length;
        if (quickViewLength > 0) {
            console.log("As on clicking on the contact name it opened the quick view page,so test case has been passed");
        } else {
            await assert.fail("As on clicking on the contact name it has not opened the quick view page,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactAssociation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 5: Verify that the Contact widget should not be displayed when the primary contact is not found--------------------

When('contact widget should not be displayed when the primary contact is not found',async function(){
    try {
        const clickOnDeal = await moduleElementsObj.clickOnDealName(driver,3);
        await clickOnDeal.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const contactModule = await driver.findElements(By.xpath('//primarycontactinfo//h4'));
        const contactModuleLength = await contactModule.length;
        if (contactModuleLength === 0) {
            console.log("As contact module is not displayed,so test case has been passed");
        } else {
            await assert.fail("As contact module is displayed,so test case has been aborted");
        }
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associateContactsCount_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------Case 6: Verify that user clicks on email of the contact widget then email compose screen should be displayed with filled contact name----------------

When('user clicks on email of contact widget then email compose screen should be displayed with filled contact name',async function(){
    try{
        const contactName = await driver.findElement(By.xpath('(//div[@class="d-flex v-center"]//a)[1]')).getText();
        console.log("Contact Name: "+contactName);
        const email = await driver.findElement(By.xpath('//primarycontactinfo//ul//a[@href="javascript:void(0)"]'));
        await email.click();
        await driver.sleep(3000);
        const emailComposeHeader = await driver.findElements(By.xpath('//h4[text()=" Compose Email "]'));
        const emailComposeHeaderLength = await emailComposeHeader.length;
        const quickPageContactName = await driver.findElement(By.xpath('//div[@id="frm_compose_email"]/div[2]/div/div[2]/div[1]/ro-tag//div//b')).getText();
        console.log("Quick Page Contact Name: "+quickPageContactName);
        if (emailComposeHeaderLength > 0 && contactName === quickPageContactName) {
            console.log("As on clicking on email then email compose screen is displayed with filled contact name,so test case has been passed");
        } else {
            await assert.fail("As on clicking on email then email compose screen is not displayed with filled contact name,so test case has been aborted");
        }
        const closeIcon = await driver.findElement(By.xpath('//div[@id="frm_compose_email"]/div[1]/a'));
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'removeButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 7: As a User, Verify that If the user clicks to the 'Mobile' number then dial options should be opened------------------------

When('verify that user clicks to the "Mobile" number then dial options should be opened',async function(){
    try{
        const associatedContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'label',' Mobile: ');
        await associatedContact.click();
        await driver.sleep(500);
        const detailView = await associatedContactElements.findDetailViewIcon(driver);
        await detailView.click();
        await driver.sleep(3000);
        //check 'Detail View Icon' redirects to 'Contact Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Detail View Icon' icon it redirects to 'Contact Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Detail View Icon' icon it does not redirects to 'Contact Details' screen page,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'detailsViewPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
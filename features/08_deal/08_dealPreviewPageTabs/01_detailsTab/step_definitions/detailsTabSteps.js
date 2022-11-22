const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/13_teammatesWidget/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

When('user is on deal preview page',async function(){
   try {
       const checkbox = await moduleElementsObj.findContactCheckbox(driver,1);
       await checkbox.click();
       await driver.sleep(1000);
       const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
       await previewButton.click();
       await driver.sleep(2500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//----------Case 1: As a User, Verify that by default it should display detail view of Deal in Edit mode upon Opening quick view of deal-------------

When('verify that user should be able to open quick view by clicking on the preview button from the listing page',async function(){
   try {
        const quickViewHeader = await driver.findElements(By.xpath('//deal-quick-view-header'));
        const quickViewHeaderLength = await quickViewHeader.length;
        if (quickViewHeaderLength > 0) {
            console.log("As quick view header is opened after clicking on preview button,so test case has been passed");
        } else {
            await assert.fail("As quick view header is not opened after clicking on preview button,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----Case 2: As a User, Verify that by default It should display a detail view of Deal in Edit mode upon opening a quick view of the deal-------

Then('verify that by default It should display a detail view of Deal in Edit mode',async function(){
   try {
       const title = !!await driver.findElement(By.xpath('//input[@id="title"]')).isDisplayed();
       strictEqual(title,true);
       const winProbability = !!await driver.findElement(By.xpath('//input[@id="winProbability"]')).isDisplayed();
       strictEqual(winProbability,true);
       const owner = !!await driver.findElement(By.xpath('//select[@name="owner"]')).isDisplayed();
       strictEqual(owner,true);
       const source = !!await driver.findElement(By.xpath('//select[@name="source"]')).isDisplayed();
       strictEqual(source,true);
       const estimatedCloseDate = !!await driver.findElement(By.xpath('//input[@id="estimatedCloseDate"]')).isDisplayed();
       strictEqual(estimatedCloseDate,true);
       const dealValue = !!await driver.findElement(By.xpath('//input[@id="dealValue"]')).isDisplayed();
       strictEqual(dealValue,true);
       const currency = !!await driver.findElement(By.xpath('//select[@name="currency"]')).isDisplayed();
       strictEqual(currency,true);
       const pipeline = !!await driver.findElement(By.xpath('//select[@name="pipeline"]')).isDisplayed();
       strictEqual(pipeline,true);
       const stage = !!await driver.findElement(By.xpath('//select[@name="stage"]')).isDisplayed();
       strictEqual(stage,true);
       const priority = !!await driver.findElement(By.xpath('//select[@name="priority"]')).isDisplayed();
       strictEqual(priority,true);
       const status = !!await driver.findElement(By.xpath('//select[@name="status"]')).isDisplayed();
       strictEqual(status,true);
       const updateButton = !!await driver.findElement(By.xpath('//span[.=" Update "]')).isDisplayed();
       strictEqual(updateButton,true);
       const cancelButton = !!await driver.findElement(By.xpath('//button[.=" Cancel "]')).isDisplayed();
       strictEqual(cancelButton,true);
       const closeIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//---------------Case 5: As a User, Verify that User should be able to close quick view by clicking on the Close or Cancel button--------------

Then('redirects to deals listing page after clicking on cancel button',async function(){
    try {
        const closeIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Quick View Deal' dialog
        const quickViewPage = await driver.findElements(By.xpath('//deal-quick-view-header'));
        const quickViewPageLength = await quickViewPage.length;
        if (quickViewPageLength === 0) {
            console.log("As quick view page length is " + quickViewPageLength + " so quick view is closed,so test case has been passed");
        } else {
            await assert.fail("As quick view page length is " + quickViewPageLength + " so quick view is not closed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 7: As a User, Verify that User can redirect to the Deal details screen upon clicking on the 'Go to Details View' icon---------

When('verify that user can redirect to Deal details screen upon clicking on "Go to Details View" icon',async function(){
   try {
       const detailView = await driver.findElement(By.xpath('//deal-quick-view-header//div[1]/a[1]/i[@class="icon-expand-4"]'));
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

//------------------------Case 9: As a User, Verify that I should be able to Won the deal from the deal quick view----------------------------

When('check updated timeline entry of deal',async function(){
   try {
       const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Timeline');
       await timelineTab.click();
       await driver.sleep(2500);
       const dealStatus = await driver.findElement(By.xpath('//timeline-deal/div/div/span/span[2]')).getText();
       console.log("Deal Status: "+dealStatus);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

When('user closes quick view page',async function(){
    try {
        const closeIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
})

Then('user clicks on reopen deal',async function(){
    try {
        const dealReopenButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Reopen');
        await dealReopenButton.click();
        await driver.sleep(5000);
    } catch(err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
})

//-----Case 11: As a User, Verify that If the user clicks on the associated contact name then the quick view of contact details should opens------

Then('verify on click of associated contact name the quick view of contact details should opens',async function(){
   try {
       const contactName = await driver.findElement(By.xpath('//deal-quick-view-header//span[1]/a[@class="default-text"]'));
       await contactName.click();
       await driver.sleep(3000);
       await driver.manage().setTimeouts({implicit: 2000});
       //check on clicking on 'Contact Name' it redirects to 'Contact Quick View' screen page
       const contactQuickView = await driver.findElements(By.xpath('//quick-view-contact[@class="enable-scroll"]//contact-quick-view-header'));
       const contactQuickViewLength = await contactQuickView.length;
       if(contactQuickViewLength > 0) {
           console.log("As on click of 'Contact Name' it redirects to 'Contact Quick View' screen page,so test case has been passed");
       } else {
           await assert.fail("As on click of 'Contact Name' it does not redirects to 'Contact Quick View' screen page,so test case has been aborted");
       }
       const closeIcon = await driver.findElement(By.xpath('//ngb-modal-window[2]//div[@class="material-header quickview-header"]/a'));
       await closeIcon.click();
       await driver.sleep(1000);
       const quickViewCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
       await quickViewCloseIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----Case 12: As a User, Verify that If the user clicks on the associated company name then the quick view of company details should opens------

Then('verify on click of associated company name the quick view of company details should opens',async function(){
    try {
        const companyName = await driver.findElement(By.xpath('//deal-quick-view-header//span[2]/a[@class="default-text"]'));
        await companyName.click();
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check on clicking on 'Company Name' it redirects to 'Company Quick View' screen page
        const companyQuickView = await driver.findElements(By.xpath('//quick-view-company[@class="enable-scroll"]//company-quick-view-header'));
        const companyQuickViewLength = await companyQuickView.length;
        if(companyQuickViewLength > 0) {
            console.log("As on click of 'Company Name' it redirects to 'Company Quick View' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Company Name' it does not redirects to 'Company Quick View' screen page,so test case has been aborted");
        }
        const closeIcon = await driver.findElement(By.xpath('//ngb-modal-window[2]//div[@class="material-header quickview-header"]/a'));
        await closeIcon.click();
        await driver.sleep(1000);
        const quickViewCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
        await quickViewCloseIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
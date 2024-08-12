const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/07_dealWidget/screenshots/';
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const dealWidgetElementsObj = require('../common/dealWidgetElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let valueFieldData = 'no', dateFieldData = 'no', textFieldData = 'no', dealsCountBeforeAddingDeal = 'no', addDealPageTitle = 'no';
let addDealPageCurrency = 'no', addDealPageValue = 'no', dealsPageDealsCountBeforeDeleting = 'no';
let dealsCountBeforeDeleting = 'no';

//-------Case 1: As a User, Verify that When No deal is attached to Particular widget it should display No Deal found message----------

Then('verify that When No deal is attached to Particular widget it should display {string} message',async function(expectedNotification){
   try {
       const deals = await driver.findElement(By.xpath('//sm-deal-list[1]//section-title//i[@class="count"]')).getText();
       console.log(deals);
       const dealsText = await deals.replace(/[\[\]']+/g,'');
       const dealsCount = await parseInt(dealsText);
       console.log("Deals Count: "+dealsCount);
       if(dealsCount === 0) {
           //check 'No deals found' message
           const actualNotification = await driver.findElement(By.xpath('//div[@class="text-center wrapper m-no-data-found"]')).getText();
           console.log("Actual Deal Notification: " + actualNotification);
           try {
               strictEqual(actualNotification, expectedNotification);
               console.log("As no deals are found the 'No deals found' message is displayed,so test case has been passed");
           } catch (err) {
               await assert.fail(err);
           }
       } else {
           await assert.fail("As no deals are found the 'No deals found' message is not displayed,so test case has been aborted");
       }
   } catch(err){
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'noDealMessage_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//---------------Case 2: As a User, Verify that it should open Add deal dialog upon clicking on + button----------------

When('verify that it should open Add deal dialog upon clicking on + button',async function(){
   try {
        const addDealIcon = await dealWidgetElementsObj.findAddDealIcon(driver);
        await addDealIcon.click();
        await driver.sleep(1000);
        const addNewDealDialog = await driver.findElements(By.xpath('//h4[text()="Add New Deal"]'));
        const addNewDealDialogLength = await addNewDealDialog.length;
        if(addNewDealDialogLength > 0) {
           console.log("As 'Add New Deal' dialog is displayed after clicking on '+' icon,so test case has been passed");
        } else {
            await assert.fail("As 'Add New Deal' dialog is not displayed after clicking on '+' icon,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'addDealIcon_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//------Case 3: As a User, Verify that Upon clicking on save button it should add deal to deal widget on the spot-------

When('verify that Upon clicking on save button it should add deal to deal widget on the spot',async function(dataTable) {
    try {
        //get 'Deal Count' before adding a deal
        const deals = await driver.findElement(By.xpath('//sm-deal-list[1]//section-title//i[@class="count"]')).getText();
        console.log(deals);
        const dealsCount = await deals.replace(/[\[\]']+/g,'');
        dealsCountBeforeAddingDeal = await parseInt(dealsCount);
        console.log("Deals Count Before Adding a Deal: "+dealsCountBeforeAddingDeal);
        const addDealIcon = await dealWidgetElementsObj.findAddDealIcon(driver);
        await addDealIcon.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'value') {
                valueFieldData = dataTable.rawTable[i][1];

                //will check that the data for the value field dropdown field is given or not
                if (valueFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the value field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Value' field
                await driver.sleep(1000);
                const valueField = await formElementsObj.findElementById(driver,screenshotPath,'dealValue','dealValueField');
                await clearFieldDataObj.clearFieldData(valueField);
                await valueField.sendKeys(valueFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date') {
                dateFieldData = dataTable.rawTable[i][1];

                //will find 'Estimated Close Date' field and pass the new data
                const dateField = await formElementsObj.findElementById(driver,screenshotPath,'estimatedCloseDate','estimatedCloseDateField');
                await clearFieldDataObj.clearFieldData(dateField);
                await dateField.sendKeys(dateFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'text') {
                textFieldData = dataTable.rawTable[i][1];

                //will find 'Time' field and pass the new data
                const textField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','textField');
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(500);
            }
        }
        //get 'Added Deal' values
        addDealPageTitle = await driver.findElement(By.id('title')).getAttribute('value');
        console.log(addDealPageTitle);
        const currency = await formElementsObj.findDropdown(driver,screenshotPath,'currency');
        addDealPageCurrency = await currency.getText();
        console.log(addDealPageCurrency);
        addDealPageValue = await driver.findElement(By.id('dealValue')).getAttribute('value');
        console.log(addDealPageValue);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButtonField');
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deal_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('verify add deal details on contact widgets page',async function(){
   try {
       //get 'Added Deal Details' on 'Contact Details Widgets' page
       const contactWidgetPageTitle = await driver.findElement(By.css('.breakword.flex-1.font-medium.font-size-sm.m-b-xs.primary-text-dark.text-ellipsis.title')).getText();
       console.log(contactWidgetPageTitle);
       const contactWidgetPageCurrencyValue = await driver.findElement(By.css('.otherdetail > span:nth-of-type(1)')).getText();
       console.log(contactWidgetPageCurrencyValue);
       if(addDealPageTitle === contactWidgetPageTitle) {
           console.log("As add deal page and contact details widget page deal details are added,so test case has been passed");
       } else {
           await assert.fail("As add deal page and contact details widget page deal details are not added,so test case has been aborted");
       }
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactWidgetsPagedDeal_NotAdded.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//---------Case 4: As a User, Verify that when adding a new deal it should increase a deal count in deal widget---------

When('verify that when adding a new deal it should increase a deal count in deal widget',async function() {
    try {
        //get 'Deal Count' after adding a deal
        const deals = await driver.findElement(By.xpath('//sm-deal-list[1]//section-title//i[@class="count"]')).getText();
        const dealsCount = await deals.replace(/[\[\]']+/g,'');
        const dealsCountAfterAddingDeal = await parseInt(dealsCount);
        console.log("Deals Count After Adding a Deal: "+dealsCountAfterAddingDeal);
        if((dealsCountBeforeAddingDeal)+1 === dealsCountAfterAddingDeal) {
            console.log("As Deal count is increased by (X+1) after adding a deal,so test case has been passed");
        } else {
            await assert.fail("As Deal count is not increased by (X+1) after adding a deal,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealCount_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------------------------Case 5: As a User, Verify that User can expand - collapse deal widget------------------------

When('verify that User can expand - collapse deal widget',async function() {
    try {
        //click on 'Collapse' arrow from 'Deal Widget'
        const collapseArrow = await dealWidgetElementsObj.findExpandOrCollapseArrow(driver);
        await collapseArrow.click();
        await driver.sleep(1500);
        //verify whether 'Deal Section Table' is hidden or not after collapsing it
        await driver.manage().setTimeouts({implicit: 2000});
        const dealSectionTable = await driver.findElement(By.xpath('//li[@class="show-expand-on-hover"]')).isDisplayed();
        if(dealSectionTable === false) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'dealSectionTableHidden.png');
            console.log("As deal section table is hidden after collapsing section,so test case has been passed");
        } else {
            await assert.fail("As deal section table is not hidden even after collapsing section,so test case has been aborted");
        }
        //click on 'Expand' arrow from 'Deal Widget'
        const expandArrow = await dealWidgetElementsObj.findExpandOrCollapseArrow(driver);
        await expandArrow.click();
        await driver.sleep(1500);
        //verify whether 'Deal Section Table' is visible or not after expanding it
        await driver.manage().setTimeouts({implicit: 2000});
        const dealSectionTableElement = await driver.findElement(By.xpath('//li[@class="show-expand-on-hover"]')).isDisplayed();
        if(dealSectionTableElement === true) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'dealSectionTableVisibility.png');
            console.log("As deal section table is visible after expanding section,so test case has been passed");
        } else {
            await assert.fail("As deal section table is not visible even after expanding section,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deal_NotExpanded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---Case 6: As a User, Verify that deal can be removed disassociate from contact by the remove option on deal card in deal widget---

When('verify that deal can be removed from {string} module by remove option on deal card in deal widget',async function(moduleName) {
    try {
        //get 'Deal Count' before deleting a deal
        const deals = await driver.findElement(By.xpath('//sm-deal-list[1]//section-title//i[@class="count"]')).getText();
        const dealsCount = await deals.replace(/[\[\]']+/g,'');
        dealsCountBeforeDeleting = await parseInt(dealsCount);
        const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await dealIcon.click();
        await driver.sleep(2000);
        //get count of 'Deals' in 'Deals Page'
        const dealsPageDeals = await driver.findElements(By.xpath('//a[@class="entity-show-link"]'));
        dealsPageDealsCountBeforeDeleting = await dealsPageDeals.length;
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(3000);
        const optionsButton = await driver.findElement(By.xpath('//sm-deal//a[@class="dropdown-toggle secondary-text"]'));
        await driver.executeScript("arguments[0].click();",optionsButton);
        await driver.sleep(500);
        const removeButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Remove');
        await driver.executeScript("arguments[0].click();",removeButton);
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await confirmationButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deal_NotRemoved.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------Case 8: As a User, Verify that when removing a deal it should decrease the deal count in deal widget---------

Then('removing a deal it should decrease the deal count in deal widget',async function(){
   try {
       //get 'Deal Count' after deleting a deal
       const deals = await driver.findElement(By.xpath('//sm-deal-list[1]//section-title//i[@class="count"]')).getText();
       const dealsCount = await deals.replace(/[\[\]']+/g,'');
       const dealsCountAfterDeleting = await parseInt(dealsCount);
       console.log(dealsCountAfterDeleting);
       if((dealsCountBeforeDeleting)-1 === dealsCountAfterDeleting) {
           console.log("As Deal is removed and decreased by (X-1) and deleted deal is not displayed,so test case has been passed");
       } else {
           await assert.fail("As Deal is not removed and not decreased by (X-1) and deleted deal is displayed,so test case has been")
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//------------Case 7: As a User, Verify that upon clicking on the detail icon it should open deal detail page-----------

When('verify that upon clicking on the detail icon it should open deal detail page',async function() {
    try {
        const optionsButton = await driver.findElement(By.css('.otherdetail > span:nth-of-type(1)'));
        await driver.executeScript("arguments[0].click();",optionsButton);
        const dealViewIcon = await driver.findElement(By.xpath('//i[@class="icon-expand-4 m-l-xs m-r-xs"]'));
        await driver.executeScript("arguments[0].click();",dealViewIcon);
        await driver.sleep(3000);
        //check 'Deal View Icon' redirects to 'Deal Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Deal View Icon' icon it redirects to 'Deal Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Deal View Icon' icon it does not redirects to 'Deal Details' screen page,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealDetailPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------Case 9: As a User, Verify that Upon clicking on the deal title in the widget it should open deal quick view--------

Then('verify that Upon clicking on the deal title in the widget it should open deal quick view',async function(){
   try {
        const dealTitle = await dealWidgetElementsObj.findDealTitle(driver);
        await dealTitle.click();
        await driver.sleep(3500);
        //check by clicking on 'Deal Title' it opens 'Deal Quick View' page
        const dealQuickViewPage = await driver.findElements(By.tagName('deal-quick-view-header'));
        const dealQuickViewPageLength = await dealQuickViewPage.length;
        if(dealQuickViewPageLength > 0) {
            console.log("As 'Deal Quick View' page is opened by clicking on 'Deal Title',so test case has been passed");
        } else {
           await assert.fail("As 'Deal Quick View' page is not opened by clicking on 'Deal Title',so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealQuickViewPage_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//--------Case 10: As a User, Verify that Upon clicking on the deal pipeline bar User can change the stages of deal--------

Then('verify that Upon clicking on the deal pipeline bar User can change the stages of deal',async function(){
   try {
        const dealPipelineStatus = await driver.findElement(By.xpath('//sm-deal-list[1]//section-body/div/ul/li[1]/sm-deal/div/div[3]/a/span[1]')).getAttribute('class');
        console.log("Deal Pipeline Status: "+dealPipelineStatus);
        const dealTitle = await dealWidgetElementsObj.findDealTitle(driver);
        await dealTitle.click();
        await driver.sleep(3000);
        //get 'Deal Pipeline Title'
        const dealPipelineTitle = await driver.findElement(By.xpath('//deal-quick-view-header//div/span[3]')).getText();
        console.log("Deal Pipeline Title: "+dealPipelineTitle);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealStages_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//------Case 11: As a User, Verify that when a User don't have rights to Access deal module then It should not display deal widget in the detail screen------

When('deal widget is not visible and log in through {string}',async function(adminUser){
   try {
       //check invisibility of 'Deal Widget' on 'Contact Details' page
       await driver.manage().setTimeouts({implicit: 2000});
       const dealWidgetAddIcon = await driver.findElements(By.xpath('//div[@id="rightSideWidgetContainer"]/sm-deal-list//a'));
       const dealWidgetAddIconLength = await dealWidgetAddIcon.length;
       if (dealWidgetAddIconLength === 0) {
           console.log("As deal module is not displayed under details page after disabling deal module rights,so test case has been passed");
       } else {
           await assert.fail("As deal module is displayed under details page even after disabling deal module rights,so test case has been aborted");
       }
       await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
       await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealDetailPage_NotFound.png');
       await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
       await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

//------Case 12: As a User, Verify that when a User don't have rights to see any particular deal then it should display error message upon clicking on deal-------

Then('deal update button is disabled and log in through {string}',async function(adminUser){
   try {
       const addDealIcon = await dealWidgetElementsObj.findAddDealIcon(driver);
       await addDealIcon.click();
       await driver.sleep(1000);
       const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButtonField');
       await saveButton.click();
       await driver.sleep(1500);
       //check 'Update Button' Disability
       const dealTitle = await dealWidgetElementsObj.findDealTitle(driver);
       await dealTitle.click();
       await driver.sleep(3500);
       const updateButtonDisability = !!await driver.findElement(By.id('btnSubmit')).getAttribute('disabled');
       console.log("Is Update Button Disabled after disabling 'Deal Edit' right: "+updateButtonDisability);
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1000);
       await driver.manage().setTimeouts({implicit: 2000});
       if(updateButtonDisability === true) {
           console.log("As 'Update Button' is disabled after disabling rights of edit deal,so test case has been passed");
       } else {
           await assert.fail("As 'Update Button' is not disabled even after disabling rights of edit deal,so test case has been aborted");
       }
       await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
       await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'errorMessage_NotFound.png');
       await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
       await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
       await driver.sleep(3000);
       await assert.fail(err);
   }
});
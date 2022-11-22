const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/02_dealsTab/screenshots/';
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const dealElementsObj = require('../common/dealElements');
const formElementsObj  = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

let valueFieldData = 'no', dateFieldData = 'no', dealsCountBeforeAddingDeal = 'no', addDealPageTitle = 'no', addDealPageValue = 'no',
dealsCountBeforeDeleting = 'no', dealsPageDealsCountBeforeDeleting = 'no';

When('user is on Related Tab',async function(){
   try {
       const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
       await contactCheckbox.click();
       await driver.sleep(1000);
       const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
       await previewButton.click();
       await driver.sleep(2000);
       const timeLineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
       await timeLineTab.click();
       await driver.sleep(3000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'relatedTab_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------Case 1: As a User, Verify that When No deal is attached to Particular Contact then it should display No Deal found message in the Panel-------

Then('verify that When No deal is attached then it should display {string} message in the Panel',async function(expectedNotification){
   try {
       const deals = await driver.findElement(By.xpath('//div[1]/div/section-title//i')).getText();
       console.log(deals);
       const dealsText = await deals.replace(/[()]/g, '');
       const dealsCount = await parseInt(dealsText);
       console.log("Deals Count: "+dealsCount);
       const sideArrow = await dealElementsObj.findSideArrow(driver);
       await sideArrow.click();
       await driver.sleep(1000);
       if(dealsCount === 0) {
           //check 'No deals found' message
           const actualNotification = await driver.findElement(By.xpath('//sm-deal-list//section-body/div')).getText();
           console.log("Actual Deal Notification: " + actualNotification);
           try {
               strictEqual(actualNotification, expectedNotification);
               console.log("As no deals are found the 'No deals found' message is displayed,so test case has been passed");
           } catch (err) {
               const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
               await closeIcon.click();
               await driver.sleep(2000);
               await assert.fail(err);
           }
       } else {
           await assert.fail("As no deals are found the 'No deals found' message is not displayed,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'dealNotification_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//---------------Case 2: As a User, Verify that it should open Add deal dialog upon clicking on + button----------------

When('verify that it should open Add deal dialog upon clicking on + button of Deal Panel',async function(){
    try {
        const addDealIcon = await dealElementsObj.findAddDealIcon(driver);
        await addDealIcon.click();
        await driver.sleep(2000);
        const addNewDealDialog = await driver.findElements(By.xpath('//h4[text()="Add New Deal"]'));
        const addNewDealDialogLength = await addNewDealDialog.length;
        if(addNewDealDialogLength > 0) {
            console.log("As 'Add New Deal' dialog is displayed after clicking on '+' icon,so test case has been passed");
        } else {
            await assert.fail("As 'Add New Deal' dialog is not displayed after clicking on '+' icon,so test case has been aborted");
        }
        const dealCloseIcon = await dealElementsObj.findDealCloseIcon(driver);
        await driver.executeScript("arguments[0].click();",dealCloseIcon);
        await driver.sleep(1500);
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'addDealIcon_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------Case 3: As a User, Verify that Upon clicking on save button it should add deal to deal Panel on the spot-------

Then('verify that Upon clicking on save button it should add deal to deal Panel on the spot',async function(dataTable){
    try {
        //get 'Deal Count' before adding a deal
        const deals = await driver.findElement(By.xpath('//div[1]/div/section-title//i')).getText();
        console.log(deals);
        const dealsCount = await deals.replace(/[()]/g, '');
        dealsCountBeforeAddingDeal = await parseInt(dealsCount);
        console.log("Deals Count Before Adding a Deal: "+dealsCountBeforeAddingDeal);
        const addDealIcon = await dealElementsObj.findAddDealIcon(driver);
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
                const valueField = await formElementsObj.findElementById(driver,screenshotPath,'dealValue','valueField');
                await clearFieldDataObj.clearFieldData(valueField);
                await valueField.sendKeys(valueFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'date') {
                dateFieldData = dataTable.rawTable[i][1];

                //will find 'Estimated Close Date' field and pass the new data
                const dateField = await formElementsObj.findElementById(driver,screenshotPath,'estimatedCloseDate','dateField');
                await clearFieldDataObj.clearFieldData(dateField);
                await dateField.sendKeys(dateFieldData);
                await driver.sleep(500);
            }
        }
        //get 'Added Deal' values
        addDealPageTitle = await driver.findElement(By.id('title')).getAttribute('value');
        console.log(addDealPageTitle);
        addDealPageValue = await driver.findElement(By.id('dealValue')).getAttribute('value');
        console.log(addDealPageValue);
        const saveButton = await dealElementsObj.findSaveButton(driver);
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deal_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

Then('verify added deal details on related tab',async function(){
   try {
       //get 'Added Deal Details' on 'Related Tab'
       const dealTitle = await driver.findElement(By.css('.breakword.flex-1.font-medium.font-size-sm.m-b-xs.primary-text-dark.text-ellipsis.title')).getText();
       console.log(dealTitle);
       const dealCurrencyValue = await driver.findElement(By.css('.otherdetail > span:nth-of-type(1)')).getText();
       console.log(dealCurrencyValue);
       if(addDealPageTitle === dealTitle) {
           console.log("As add deal page and contact details widget page deal details are added,so test case has been passed");
       } else {
           await assert.fail("As add deal page and contact details widget page deal details are not added,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//---------Case 4: As a User, Verify that when adding a new deal it should increase a deal count in deal Panel----------

Then('verify that when adding a new deal it should increase a deal count in deal Panel',async function(){
   try {
       //get 'Deal Count' after adding a deal
       const deals = await driver.findElement(By.xpath('//div[1]/div/section-title//i')).getText();
       const dealsCount = await deals.replace(/[()]/g, '');
       const dealsCountAfterAddingDeal = await parseInt(dealsCount);
       console.log("Deals Count After Adding a Deal: "+dealsCountAfterAddingDeal);
       if((dealsCountBeforeAddingDeal)+1 === dealsCountAfterAddingDeal) {
           console.log("As Deal count is increased by (X+1) after adding a deal,so test case has been passed");
       } else {
           await assert.fail("As Deal count is not increased by (X+1) after adding a deal,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'dealCount_NotIncreased.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------------------------Case 5: As a User, Verify that User can expand - collapse deal panel-------------------------

When('verify that User can expand - collapse deal panel',async function() {
    try {
        await driver.sleep(1500);
        //click on 'Expand' arrow from 'Deal Panel'
        const sideArrow = await dealElementsObj.findSideArrow(driver);
        await sideArrow.click();
        await driver.sleep(1500);
        //verify whether 'Deal Section Table' is visible or not after expanding it
        await driver.manage().setTimeouts({implicit: 2000});
        const dealSectionTable = await driver.findElement(By.xpath('//div[@class="dealdetail padder-md m-t-sm m-b-lg"]')).isEnabled();
        if(dealSectionTable === true) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'dealSectionTableHidden.png');
            console.log("As deal section table is hidden after collapsing section,so test case has been passed");
        } else {
            await assert.fail("As deal section table is not hidden even after collapsing section,so test case has been aborted");
        }
        //click on 'Collapse' arrow from 'Deal Panel'
        const downArrow = await dealElementsObj.findDownArrow(driver);
        await downArrow.click();
        await driver.sleep(1500);
        //verify whether 'Deal Section Table' is hidden or not after collapsing it
        await driver.manage().setTimeouts({implicit: 2000});
        const dealSectionTableElement = await driver.findElement(By.xpath('//div[@class="dealdetail padder-md m-t-sm m-b-lg"]')).isEnabled();
        console.log(dealSectionTableElement)
        if(dealSectionTableElement === true) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'dealSectionTableVisibility.png');
            console.log("As deal section table is visible after expanding section,so test case has been passed");
        } else {
            await assert.fail("As deal section table is not visible even after expanding section,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deal_NotExpanded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 6: As a User, Verify that deal can be removed disassociate from contact by the remove option on deal card in deal panel-------

When('verify that deal can be removed disassociate from {string} module by the remove option on deal card in deal panel',async function(moduleName) {
    try {
        //get 'Deal Count' before deleting a deal
        const deals = await driver.findElement(By.xpath('//div[1]/div/section-title//i')).getText();
        const dealsCount = await deals.replace(/[()]/g, '');
        dealsCountBeforeDeleting = await parseInt(dealsCount);
        console.log(dealsCountBeforeDeleting);
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await dealIcon.click();
        await driver.sleep(2000);
        //get count of 'Deals' in 'Deals Page'
        const dealsPageDeals = await driver.findElements(By.xpath('//a[@class="entity-show-link"]'));
        dealsPageDealsCountBeforeDeleting = await dealsPageDeals.length;
        console.log(dealsPageDealsCountBeforeDeleting);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
        await previewButton.click();
        await driver.sleep(2000);
        const timeLineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
        await timeLineTab.click();
        await driver.sleep(3000);
        const sideArrow = await dealElementsObj.findSideArrow(driver);
        await sideArrow.click();
        await driver.sleep(1000);
        const dealOptions = await dealElementsObj.findDealOptions(driver);
        await dealOptions.click();
        await driver.sleep(500);
        const dealAction = await dealElementsObj.findDealRemoveAction(driver);
        await dealAction.click();
        await driver.sleep(500);
        const removeButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Remove');
        await removeButton.click();
        await driver.sleep(500);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await confirmationButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deal_NotRemoved.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check deleted deal details',async function(){
    try {
        //get 'Deal Count' after deleting a deal
        const deals = await driver.findElement(By.xpath('//sm-deal-list//section-title//i[@class="count"]')).getText();
        const dealsCount = await deals.replace(/[\[\]']+/g,'');
        const dealsCountAfterDeleting = await parseInt(dealsCount);
        console.log(dealsCountAfterDeleting);
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await moduleIcon.click();
        await driver.sleep(2000);
        //get count of 'Deals' in 'Deals Page'
        const dealsPageDeals = await driver.findElements(By.xpath('//a[@class="entity-show-link"]'));
        const dealsPageDealsCountAfterDeleting = await dealsPageDeals.length;
        console.log(dealsPageDealsCountAfterDeleting);
        await driver.manage().setTimeouts({implicit: 2000});
        if((dealsCountBeforeDeleting)-1 === dealsCountAfterDeleting && (dealsPageDealsCountBeforeDeleting)-1 === dealsPageDealsCountAfterDeleting) {
            console.log("As Deal is removed and decreased by (X-1) and deleted deal is not displayed,so test case has been passed");
        } else {
            await assert.fail("As Deal is not removed and not decreased by (X-1) and deleted deal is displayed,so test case has been")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 7: As a User, Verify that upon clicking on the detail icon it should open deal detail page-----------

When('verify that upon clicking on detail icon it should open deal detail page',async function() {
    try {
        const sideArrow = await dealElementsObj.findSideArrow(driver);
        await sideArrow.click();
        await driver.sleep(1000);
        const dealOption = await driver.findElement(By.css('.otherdetail > span:nth-of-type(1)'));
        await dealOption.click();
        await driver.sleep(500);
        const dealViewIcon = await driver.findElement(By.xpath('//i[@class="icon-expand-4 m-l-xs m-r-xs"]'));
        await dealViewIcon.click();
        await driver.sleep(2000);
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
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
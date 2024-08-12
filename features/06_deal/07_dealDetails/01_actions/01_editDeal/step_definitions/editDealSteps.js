const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/01_actions/01_editDeal/screenshots/';
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../../../../00_common/actions/fieldActions/selectDropdownValue');

let stageFieldData = 'no', ownerFieldDropdownData = 'no', editDialogOwner = 'no', editDialogStage = 'no';

When('user is on deal details screen "Edit Deal" dialog',async function(){
    try {
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        const detailsPageEditDealLink = await driver.findElement(By.xpath('//a[text()=" Edit Deal"]'));
        await detailsPageEditDealLink.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('user is on deal details page',async function(){
    try {
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---Case 4: As a User, Verify that I should be able to see edit deal dialog with the filled value of page elements for a particular deal---

When('user able to see edit deal dialog with filled value of page elements for a particular deal',async function(){
    try {
        //get 'Deal Values' of listing screen
        const listingPageDealTitle = await driver.findElement(By.xpath('(//a[@class="entity-show-link text-ellipsis show-eye-only"])[1]')).getText();
        console.log("Listing Page Title:"+listingPageDealTitle);
        const listingPageStage = await driver.findElement(By.xpath('(//div[@col-id="stage"])[2]')).getText();
        console.log("Listing Page Stage:"+listingPageStage);
        const listingPageStatus = await driver.findElement(By.xpath('(//div[@col-id="status"])[2]')).getText();
        console.log("Listing Page Status:"+listingPageStatus);
        const listingPageOwner = await driver.findElement(By.xpath('(//div[@col-id="owner"])[2]')).getText();
        console.log("Listing Page Owner:"+listingPageOwner);
        const dealName = await moduleElementsObj.clickOnDealName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        const detailsPageEditDealLink = await driver.findElement(By.xpath('//a[text()=" Edit Deal"]'));
        await detailsPageEditDealLink.click();
        await driver.sleep(2000);
        //get 'Deal Values' of edit dialog
        const editDialogTitle = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Edit Dialog Title:"+editDialogTitle);
        const owner = await formElementsObj.findDropdown(driver,screenshotPath,'owner');
        const editDialogOwner = await owner.getText();
        console.log("Edit Dialog Owner:"+editDialogOwner);
        const editDialogStage = await driver.findElement(By.xpath('//sm-select-box[5]/sm-element/div/span//span/span[@role="textbox"]')).getText();
        console.log("Edit Dialog Stage:"+editDialogStage);
        const editDialogStatus = await driver.findElement(By.xpath('//sm-select-box[7]/sm-element/div/span//span/span[@role="textbox"]')).getText();
        console.log("Edit Dialog Status:"+editDialogStatus);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
        if (listingPageDealTitle === editDialogTitle && listingPageOwner === editDialogOwner && listingPageStage === editDialogStage && listingPageStatus === editDialogStatus) {
            console.log("As listing page and details screen edit dialog details are equal,so test case has been passed");
        } else {
            await assert.fail("As listing page and details screen edit dialog details are not equal,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 5: As a user, Verify I should be able to see updated deal upon clicking on the update button------------

When('verify I should be able to see updated deal upon clicking on update button',async function(dataTable){
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'owner') {
                ownerFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the owner field dropdown field is given or not
                if (ownerFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the owner field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Owner' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldDropdownData, 'no');
                await driver.sleep(500);
                const owner = await formElementsObj.findDropdown(driver,screenshotPath,'owner');
                editDialogOwner = await owner.getText();
                console.log("Edit Dialog Owner:"+editDialogOwner);
            } else if (fieldName == 'stage') {
                stageFieldData = dataTable.rawTable[i][1];

                //will check that the data for the stage field dropdown field is given or not
                if (stageFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the stage field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Stage' dropdown list
                await driver.sleep(1000);
                await driver.findElement(By.xpath('//sm-select-box[5]/sm-element/div/span//span[@role="combobox"]/span[@role="presentation"]')).click();
                await driver.sleep(500);
                await driver.findElement(By.xpath('//ul[@role="tree"]/li[3]')).click();
                await driver.sleep(500);
                editDialogStage = await driver.findElement(By.xpath('//sm-select-box[5]/sm-element/div/span//span/span[@role="textbox"]')).getText();
                console.log("Edit Dialog Stage:"+editDialogStage);
            }
        }
        const saveButton = await moduleElementsObj.findEditPageSaveButton(driver);
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify added deal details screen updated owner and stage values',async function(){
    try {
        await driver.sleep(1000);
        const detailsScreenOwner = await driver.findElement(By.xpath('//owner-list//button/div[@class="m-t-xxs pull-left"]')).getText();
        console.log("Details Screen Owner:"+detailsScreenOwner);
        const detailsScreenStage = await driver.findElement(By.xpath('//li[3]//div[@class="text-ellipsis"]')).getText();
        console.log("Details Screen Stage:"+detailsScreenStage);
        if (editDialogOwner === detailsScreenOwner && editDialogStage === detailsScreenStage) {
            console.log("As edit dialog owner and stage values are updated under details screen,so test case has been passed");
        } else {
            await assert.fail("As edit dialog owner and stage values are not updated under details screen,so test case has been aborted");
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
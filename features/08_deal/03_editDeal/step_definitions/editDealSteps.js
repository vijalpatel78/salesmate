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

When('user is on "Edit Deal" page',async function(){
   try {
       //get Count of 'Deals' in 'Deal Listing Page'
       const deals = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
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

Then('edit deal module is not visible and log in through {string}',async function(adminUser) {
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

When('edit deal module is visible and log in through {string}',async function(adminUser) {
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

//----------Case 2: Verify, As a User I should be able Access edit contact dialog from icon beside contact name in the listing screen--------

When('user is able to Access {string} dialog from icon beside name in the listing screen',async function(editContactLinkName) {
    try {
        const editIcon = await moduleElementsObj.findEditIcon(driver, '1');
        await editIcon.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Edit Contact' dialog
        const editContactVisibility = !!await driver.findElement(By.xpath(`//h4[text()="${editContactLinkName}"]`)).isDisplayed();
        console.log("Is Edit Contact Displayed: " + editContactVisibility);
        const editContactLink = await driver.findElements(By.xpath(`//h4[text()="${editContactLinkName}"]`));
        const editContactLinkLength = await editContactLink.length;
        if (editContactLinkLength > 0 && editContactVisibility === true) {
            console.log("As edit contact dialog is displayed after clicking on edit icon beside contact name in listing page,so test case has been passed");
        } else {
            await assert.fail("As edit contact dialog is not displayed even after clicking on edit icon beside contact name in listing page,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------Case 3: As a User, It should be able to Access Edit deal dialog from detail screen and from quick view---------

When('user is on deal details > actions > edit deal dialog',async function(){
   try {
       const dealName = await moduleElementsObj.clickOnDealName(driver,1);
       await dealName.click();
       await driver.sleep(2000);
       const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
       await actionsButton.click();
       await driver.sleep(1000);
       const detailsPageEditDeal = await driver.findElement(By.xpath('//a[text()=" Edit Deal"]'));
       await detailsPageEditDeal.click();
       await driver.sleep(2000);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(500);
       await assert.fail(err);
   }
});

When('it should be able to Access Edit deal dialog from detail screen',async function(dataTable){
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required title field is given or not
                if (titleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the title field, the test case execution has been aborted');
                }

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'owner') {
                ownerFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the owner field dropdown field is given or not
                if (ownerFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the owner field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Owner' dropdown list
                await driver.sleep(150000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldDropdownData, 'no');
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

When('it should be able to Access Edit deal dialog from quick view',async function(dataTable){
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required title field is given or not
                if (titleFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the title field, the test case execution has been aborted');
                }

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'owner') {
                ownerFieldDropdownData = dataTable.rawTable[i][1];

                //will check that the data for the owner field dropdown field is given or not
                if (ownerFieldDropdownData == '') {
                    await assert.fail('Due to the blank value is provided for the owner field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Owner' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldDropdownData, 'no');
            }
        }
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','updateButton')
        await updateButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('close quick view page',async function(){
    try {
        await driver.sleep(1500);
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---Case 4: As a User, Verify that I should be able to see edit deal dialog with the filled value of page elements for a particular deal---

When('it should be able to see edit deal dialog with filled value of page elements for a particular deal',async function(){
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
        const editIcon = await moduleElementsObj.findEditIcon(driver,1);
        await editIcon.click();
        await driver.sleep(2500);
        //get 'Deal Values' of edit dialog
        const editDialogTitle = await driver.findElement(By.id('title')).getAttribute('value');
        console.log("Edit Dialog Title:"+editDialogTitle);
        const owner = await formElementsObj.findDropdown(driver,screenshotPath,'owner');
        const editDialogOwner = await owner.getText();
        console.log("Edit Dialog Owner:"+editDialogOwner);
        const stage = await formElementsObj.findDropdown(driver,screenshotPath,'stage');
        const editDialogStage = await stage.getText();
        console.log("Edit Dialog Stage:"+editDialogStage);
        const status = await formElementsObj.findDropdown(driver,screenshotPath,'status');
        const editDialogStatus = await status.getText();
        console.log("Edit Dialog Status:"+editDialogStatus);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
        if (listingPageDealTitle === editDialogTitle && listingPageOwner === editDialogOwner && listingPageStage === editDialogStage && listingPageStatus === editDialogStatus) {
            console.log("As listing page and edit dialog details are equal,so test case has been passed");
        } else {
            await assert.fail("As listing page and edit dialog details are not equal,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 5: As a user, Verify I should be able to see updated deal upon clicking on the update button------------

When('verify I should be able to see updated deal upon clicking on the update button',async function(dataTable){
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
               const editDialogStage = await driver.findElement(By.xpath('//sm-select-box[5]/sm-element/div/span//span/span[@role="textbox"]')).getText();
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

Then('verify add deal details screen updated owner and stage values',async function(){
   try {
       const dealName = await moduleElementsObj.clickOnDealName(driver,1);
       await dealName.click();
       await driver.sleep(2000);
       const detailsScreenOwner = await driver.findElement(By.xpath('//owner-list//button/div[@class="m-t-xxs pull-left"]')).getText();
       console.log("Details Screen Owner:"+detailsScreenOwner);
       const detailsScreenStage = await driver.findElement(By.xpath('//li[3]//div[@class="text-ellipsis"]')).getText();
       console.log("Details Screen Stage:"+detailsScreenStage);
       if (editDialogOwner === detailsScreenOwner && editDialogStage === detailsScreenStage) {
           console.log("As edit dialog owner and stage values are updated under details screen,so test case has been passed");
       } else {
           await assert.fail("As edit dialog owner and stage values are not updated under details screen,so test case has been aborted");
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//----------Case 6: As a user, Verify If I click on the cancel button it should terminate the edit deal dialog----------

Then('user is able to close Deal dialog upon clicking on close button',async function(){
   try {
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
       await driver.manage().setTimeouts({implicit: 2000});
       //check visibility of 'Edit Deal' dialog
       const editDealDialogElements = await driver.findElements(By.xpath('//h4[text()="Edit Deal"]'));
       const editDealDialogLength = await editDealDialogElements.length;
       console.log(editDealDialogLength);
       if (editDealDialogLength === 0) {
           console.log("As edit dialog length is " + editDealDialogLength + " so edit dialog is closed,so test case has been passed");
       } else {
           await assert.fail("As edit dialog length is " + editDealDialogLength + " so edit dialog is not closed,so test case has been aborted");
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----------Case 7: As a user, Verify that the timeline should be updated for that deal after editing deal-------------

When('verify that the timeline should be updated for that deal after editing deal',async function(){
   try {
       const dealName = await moduleElementsObj.clickOnDealName(driver,1);
       await dealName.click();
       await driver.sleep(2000);
       //click on 'Timeline' timeline
       const timeLineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Updates');
       await timeLineTab.click();
       await driver.sleep(2000);
       await screenshotObj.takeScreenshot(driver,screenshotPath+'timeLineUpdatedFields.png');
       //print text of 'Timeline' 'Company Creation'
       const timeLineUpdatedField01 = await driver.findElement(By.xpath('(//span[@class="font-medium"])[1]')).getText();
       console.log(timeLineUpdatedField01);
       const timeLineUpdatedField02 = await driver.findElement(By.xpath('(//span[@class="font-medium"])[2]')).getText();
       console.log(timeLineUpdatedField02);
       const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
       await driver.executeScript("arguments[0].click();",moduleIcon);
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//------Case 10: As a User, Verify the validation message should be display for required field if user remove the value from required field-----------

When('user does not enter data in title field',async function(dataTable){
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'title') {
                titleFieldData = dataTable.rawTable[i][1];

                //will find 'Title' field and pass the new data
                const titleField = await formElementsObj.findElementById(driver, screenshotPath, 'title', 'titleField');
                await clearFieldDataObj.clearFieldData(titleField);
                await titleField.sendKeys(titleFieldData);
                await driver.sleep(500);
            }
        }
        const updateButton = await driver.findElement(By.xpath('//button[@id="btnSubmit"]//span[.=" Update "]'));
        await updateButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 11: As a user, I should be able to edit a deal with the required details only-------------------

Then('user should be able to edit a deal with the required details only',async function(dataTable){
   try {
       //get Count of 'Deals' in 'Deal Listing Page'
       const deals = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
       dealsCount = await deals.length;
       console.log("Deals Count: "+dealsCount);
       const dealName = await moduleElementsObj.clickOnDealName(driver,1);
       await dealName.click();
       await driver.sleep(2000);
       const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
       await actionsButton.click();
       await driver.sleep(1000);
       const detailsPageEditLink = await driver.findElement(By.xpath('//a[text()=" Edit Deal"]'));
       await detailsPageEditLink.click();
       await driver.sleep(2500);
       //will travel provided fields and data list
       for (let i = 0; i < dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'title') {
               titleFieldData = dataTable.rawTable[i][1];

               //will find 'Title' field and pass the new data
               const titleField = await formElementsObj.findElementById(driver, screenshotPath, 'title', 'titleField');
               await clearFieldDataObj.clearFieldData(titleField);
               await titleField.sendKeys(titleFieldData);
               await driver.sleep(500);
           } else if (fieldName == 'owner') {
               ownerFieldDropdownData = dataTable.rawTable[i][1];

               //will check that the data for the owner field dropdown field is given or not
               if (ownerFieldDropdownData == '') {
                   await assert.fail('Due to the blank value is provided for the owner field dropdown field, the test case execution has been aborted');
               }

               //will select the provided new dropdown value from the 'Owner' dropdown list
               await driver.sleep(1000);
               await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldDropdownData, 'no');
           }
       }
       const updateButton = await moduleElementsObj.findEditPageSaveButton(driver);
       await updateButton.click();
       await driver.sleep(1000);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});
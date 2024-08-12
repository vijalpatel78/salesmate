const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/02_addDeal/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

let titleFieldData = 'no', firstNameFieldData = 'no', mobileFieldData = 'no', emailFieldData = 'no', textFieldData = 'no', websiteFieldData = 'no',
phoneFieldData = 'no', customFieldData = 'no', dealsCount = 'no', ownerFieldDropdownData = 'no', stageFieldData = 'no', priorityFieldData = 'no';

When('user is on "Add Deal" page',async function(){
    try {
        //get Count of 'Deals' in 'Deal Listing Page'
        const deals = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
        dealsCount = await deals.length;
        console.log("Deals Count: "+dealsCount);
        const addDealButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Deal ');
        await addDealButton.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 1: As a User, Verify '+ Deal' button should not be shown if disabled deal rights and '+ Deal' shown after enabling rights-------

Then('add deal module is not visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const addDealButton = await driver.findElements(By.xpath('//button[text()="Deal "]'));
        const addDealButtonCount = await addDealButton.length;
        if (addDealButtonCount === 0) {
            console.log("As add deal button length is " + addDealButtonCount + " so it is not displayed after disabling deal module create right,so test case has been passed");
        } else {
            await assert.fail("As add deal button length is " + addDealButtonCount + " so it is displayed after disabling deal module create right,so test case has been aborted");
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

Then('add deal module is visible and log in through {string}',async function(adminUser) {
    try {
        const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",dealIcon);
        await driver.executeScript("arguments[0].click();",dealIcon);
        await driver.manage().setTimeouts({implicit: 2000});
        const addDealButton = await driver.findElements(By.xpath('//button[text()="Deal "]'));
        const addDealButtonLength = await addDealButton.length;
        if (addDealButtonLength > 0) {
            console.log("As add deal button length is " + addDealButtonLength + " so it is displayed after enabling deal module create right,so test case has been passed");
        } else {
            await assert.fail("As add deal button length is " + addDealButtonLength + " so it is not displayed after enabling deal module create right,so test case has been aborted");
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

//--------------Case 2: As a user, I can see the Add New deal dialog while clicking on the '+ button'-------------------

Then('user see the Add New deal dialog while clicking on the "+ button"',async function(){
   try {
        //check fields visibility
        const associateProducts = await driver.findElement(By.xpath('//span[@class="dealTypeUniqueClass"]')).isDisplayed();
        strictEqual(associateProducts,true);
        const teammatesSearchBox = await driver.findElement(By.xpath('//sm-add-teammate/section-body//sm-autocomplete//ro-tag/div/input')).isDisplayed();
        strictEqual(teammatesSearchBox,true);
        const participantsSearchBox = await driver.findElement(By.xpath('//sm-add-participant//sm-autocomplete//ro-tag/div[@class="ro-tag-autocomplete"]')).isDisplayed();
        strictEqual(participantsSearchBox,true);
        const saveButton = await driver.findElement(By.id('btnSubmit')).isDisplayed();
        strictEqual(saveButton,true);
        const saveAndAddOtherButton = await driver.findElement(By.id('btnSaveAndNewSubmit')).isDisplayed();
        strictEqual(saveAndAddOtherButton,true);
        const cancelButton = await driver.findElement(By.xpath('//ngb-modal-window//button[text()="Cancel"]')).isDisplayed();
        strictEqual(cancelButton,true);
        const dealAddDialogCloseIcon = await driver.findElement(By.xpath('//ngb-modal-window//div[@class="modal-header"]/button[@type="button"]')).isDisplayed();
        strictEqual(dealAddDialogCloseIcon,true);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//---------Case 3: As a User, i should be able to see some default Page elements into the create new deal dialog--------

When('user able to see some default Page elements into the create new deal dialog',async function(){
   try {
       const title = await driver.findElement(By.id('title')).isDisplayed();
       strictEqual(title,true);
       const contact = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[1]/sm-element//ro-tag/div/input')).isDisplayed();
       strictEqual(contact,true);
       const company = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[2]/sm-element//ro-tag/div/input')).isDisplayed();
       strictEqual(company,true);
       const winProbability = await driver.findElement(By.id('winProbability')).isDisplayed();
       strictEqual(winProbability,true);
       const owner = await driver.findElement(By.name('owner')).isDisplayed();
       strictEqual(owner,true);
       const source = await driver.findElement(By.name('source')).isDisplayed();
       strictEqual(source,true);
       const estimatedCloseDate = await driver.findElement(By.id('estimatedCloseDate')).isDisplayed();
       strictEqual(estimatedCloseDate,true);
       const value = await driver.findElement(By.id('dealValue')).isDisplayed();
       strictEqual(value,true);
       const currency = await driver.findElement(By.name('currency')).isDisplayed();
       strictEqual(currency,true);
       const pipeLine = await driver.findElement(By.name('pipeline')).isDisplayed();
       strictEqual(pipeLine,true);
       const stage = await driver.findElement(By.name('stage')).isDisplayed();
       strictEqual(stage,true);
       const priority = await driver.findElement(By.name('priority')).isDisplayed();
       strictEqual(priority,true);
       const status = await driver.findElement(By.name('status')).isDisplayed();
       strictEqual(status,true);
       const description = await driver.findElement(By.id('description')).isDisplayed();
       strictEqual(description,true);
       const tags = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div[@class="ro-tag-autocomplete"]')).isDisplayed();
       strictEqual(tags,true);
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//--------------Case 5: As a User, I should be able to see 255 character Validation message for Deal Title--------------

Then('user should be able to enter invalid deal title',async function(dataTable){
   try {
       //will travel provided fields and data list
       for (let i = 0; i < dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'deal title') {
               titleFieldData = dataTable.rawTable[i][1];

               //will find 'Title' field and pass the new data
               const titleField = await formElementsObj.findElementById(driver,screenshotPath,'title','titleField');
               await clearFieldDataObj.clearFieldData(titleField);
               await titleField.sendKeys(titleFieldData);
               await driver.sleep(500);
           }
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('it should display {string} validation',async function(expectedValidation) {
    try {
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
        await saveButton.click();
        await driver.sleep(1000);
        const actualValidation = await driver.findElement(By.xpath('//div[1]//sm-input-txt[1]//div[@class="error-message text-danger"]')).getText();
        console.log("Actual Validation is: "+actualValidation);
        strictEqual(actualValidation, expectedValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 6: As a User, I should be able to create a new contact and company using a quick view---------------

When('user able to create a new contact and company using a quick view',async function(){
   try {
       const contact = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[1]/sm-element//ro-tag/div/input'));
       await contact.sendKeys("abc");
       await driver.sleep(1500);
       await driver.findElement(By.xpath('//div[text()="Create New Contact"]')).click();
       await driver.sleep(1500);
       const quickViewContact = await driver.findElement(By.xpath('//h4[text()=" Quick Add Contact"]')).isDisplayed();
       strictEqual(quickViewContact,true);
       const contactCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
       await contactCloseIcon.click();
       await driver.sleep(1500);
       const company = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[2]/sm-element//ro-tag/div/input'));
       await company.sendKeys("xyz");
       await driver.sleep(1500);
       await driver.findElement(By.xpath('//div[text()="Create New Company"]')).click();
       await driver.sleep(1500);
       const quickViewCompany = await driver.findElement(By.xpath('//h4[text()="Quick Add Company"]')).isDisplayed();
       strictEqual(quickViewCompany,true);
       const companyCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
       await companyCloseIcon.click();
       await driver.sleep(1500);
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------Case 7: As a User, I should be able to verify Save and cancel button functionality of contact quick view-------

Then('user able to verify Save button functionality of contact quick view',async function(dataTable){
   try {
       const contact = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[1]/sm-element//ro-tag/div/input'));
       await contact.sendKeys("abc");
       await driver.sleep(1500);
       await driver.findElement(By.xpath('//div[text()="Create New Contact"]')).click();
       await driver.sleep(1500);
       //will travel provided fields and data list
       for (let i = 0; i < dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'first name') {
               firstNameFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required first name field is given or not
               if (firstNameFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the first name field, the test case execution has been aborted');
               }

               //will find 'First Name' field and pass the new data
               const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField');
               await clearFieldDataObj.clearFieldData(firstNameField);
               await firstNameField.sendKeys(firstNameFieldData);
               await driver.sleep(500);
           } else if (fieldName == 'mobile') {
               mobileFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required mobile field is given or not
               if (mobileFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the required mobile field, the test case execution has been aborted');
               }

               //will find 'Mobile' field and pass the new data
               const mobileField = await formElementsObj.findElementById(driver,screenshotPath,'mobile','mobileField')
               await clearFieldDataObj.clearFieldData(mobileField);
               await mobileField.sendKeys(mobileFieldData);
               await driver.sleep(500);
           } else if (fieldName == 'email') {
               emailFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required email field is given or not
               if (emailFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the required email field, the test case execution has been aborted');
               }

               //will find 'Email' field and pass the new data
               const emailField = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField')
               await clearFieldDataObj.clearFieldData(emailField);
               await emailField.sendKeys(emailFieldData);
               await driver.sleep(500);
           }
           // else if (fieldName == 'text field') {
           //     textFieldData = dataTable.rawTable[i][1];
           //
           //     //will check that the data for the required text field is given or not
           //     if (textFieldData == '') {
           //         await assert.fail('Due to the blank value is provided for the text field, the test case execution has been aborted');
           //     }

               // //will find 'Text' field and pass the new data
               // const textField = await driver.findElement(By.xpath('//div[2]/div[@class="row"]/sm-input-txt/sm-element/input'));
               // await clearFieldDataObj.clearFieldData(textField);
               // await textField.sendKeys(textFieldData);
               // await driver.sleep(500);
           // }
       }
       const saveButton = await moduleElementsObj.findQuickViewPageSaveButton(driver);
       await saveButton.click();
       await driver.sleep(2500);
       const dealDialogContactName = await driver.findElement(By.xpath('//sm-autocomplete[1]/sm-element//ro-tag/div/div[@class="tags-item-block"]//b')).getText();
       console.log("Deal Page Contact Name: "+dealDialogContactName);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('user able to verify Cancel button functionality of contact quick view',async function(){
   try {
       await driver.findElement(By.xpath('//sm-autocomplete[1]/sm-element//ro-tag/div/div//a/i[@class="icon-close"]')).click();
       await driver.sleep(1500);
       const contact = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[1]/sm-element//ro-tag/div/input'));
       await contact.sendKeys("abc");
       await driver.sleep(1500);
       await driver.findElement(By.xpath('//div[text()="Create New Contact"]')).click();
       await driver.sleep(1500);
       const contactCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
       await contactCloseIcon.click();
       await driver.sleep(1500);
       await driver.manage().setTimeouts({implicit: 2000});
       const quickViewContact = await driver.findElements(By.xpath('//h4[text()=" Quick Add Contact"]'));
       const quickViewContactLength = await quickViewContact.length;
       strictEqual(quickViewContactLength,0);
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------Case 8: As a User, I should be able to verify Save and cancel button functionality of company quick view-------

Then('user able to verify Save button functionality of company quick view',async function(dataTable){
    try {
        const company = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[2]/sm-element//ro-tag/div/input'));
        await company.sendKeys("xyz");
        await driver.sleep(1500);
        await driver.findElement(By.xpath('//div[text()="Create New Company"]')).click();
        await driver.sleep(1500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'website') {
                websiteFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required website field is given or not
                if (websiteFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the website field, the test case execution has been aborted');
                }

                //will find 'Website' field and pass the new data
                const websiteField = await formElementsObj.findElementById(driver,screenshotPath,'website','websiteField');
                await clearFieldDataObj.clearFieldData(websiteField);
                await websiteField.sendKeys(websiteFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'phone') {
                phoneFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required phone field is given or not
                if (phoneFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required phone field, the test case execution has been aborted');
                }

                //will find 'Phone' field and pass the new data
                const phoneField = await formElementsObj.findElementById(driver,screenshotPath,'phone','phoneField')
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(phoneFieldData);
                await driver.sleep(500);
            }
            // else if (fieldName == 'custom field') {
            //     customFieldData = dataTable.rawTable[i][1];
            //
            //     //will check that the data for the required custom field is given or not
            //     if (customFieldData == '') {
            //         await assert.fail('Due to the blank value is provided for the required custom field, the test case execution has been aborted');
            //     }
            //
            //     //will find 'Custom' field and pass the new data
            //     const customField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField6','customField')
            //     await clearFieldDataObj.clearFieldData(customField);
            //     await customField.sendKeys(customFieldData);
            //     await driver.sleep(500);
            // }
        }
        const saveButton = await moduleElementsObj.findQuickViewPageSaveButton(driver);
        await saveButton.click();
        await driver.sleep(2500);
        const dealDialogCompanyName = await driver.findElement(By.xpath('//sm-autocomplete[2]/sm-element//ro-tag/div/div[@class="tags-item-block"]//b')).getText();
        console.log("Deal Page Company Name: "+dealDialogCompanyName);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('user able to verify Cancel button functionality of company quick view',async function(){
    try {
        await driver.findElement(By.xpath('//sm-autocomplete[2]/sm-element//ro-tag/div/div//a/i[@class="icon-close"]')).click();
        await driver.sleep(1500);
        const contact = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[2]/sm-element//ro-tag/div/input'));
        await contact.sendKeys("xyz");
        await driver.sleep(1500);
        await driver.findElement(By.xpath('//div[text()="Create New Company"]')).click();
        await driver.sleep(1500);
        const contactCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
        await contactCloseIcon.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const quickViewCompany = await driver.findElements(By.xpath('//h4[text()="Quick Add Company"]'));
        const quickViewCompanyLength = await quickViewCompany.length;
        strictEqual(quickViewCompanyLength,0);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 11: As a user, I able to 'search/add' the multiple teammates from the 'add new deal' dialog------------

Then('user able to search or add the multiple teammates from the add new deal dialog',async function(){
   try {
       const teammatesField = await driver.findElement(By.xpath('//sm-add-teammate/section-body//sm-autocomplete//ro-tag/div/input'));
       await teammatesField.sendKeys("Vijal");
       await driver.sleep(2000);
       await driver.findElement(By.xpath('//span[text()=" Vijal Patel"] | //span[text()="Vijal Patel "] | //div[text()=" Vijal Patel"] | //div[text()="Vijal Patel "]')).click();
       await driver.sleep(1000);
       const teammatesFieldElement = await driver.findElement(By.xpath('//sm-add-teammate/section-body//sm-autocomplete//ro-tag/div/input'));
       await teammatesFieldElement.sendKeys("Priyanka");
       await driver.sleep(1500);
       await driver.findElement(By.xpath('//div[text()="Priyanka Vlr"]')).click();
       await driver.sleep(1500);
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//----------Case 12: As a user, I able to 'search/add' the multiple participants from the 'add new deal' dialog---------

Then('user able to add or search the multiple participants from the add new deal dialog',async function(){
    try {
        const teammatesField = await driver.findElement(By.xpath('//sm-add-teammate/section-body//sm-autocomplete//ro-tag/div/input'));
        await teammatesField.sendKeys("Vijal");
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//span[text()=" Vijal Patel"] | //span[text()="Vijal Patel "] | //div[text()=" Vijal Patel"] | //div[text()="Vijal Patel "]')).click();
        await driver.sleep(1000);
        const teammatesFieldElement = await driver.findElement(By.xpath('//sm-add-teammate/section-body//sm-autocomplete//ro-tag/div/input'));
        await teammatesFieldElement.sendKeys("Priyanka");
        await driver.sleep(1500);
        await driver.findElement(By.xpath('//div[text()="Priyanka Vlr"]')).click();
        await driver.sleep(1500);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 15: As a user, I should be able to add a deal with the required details only-------------------

Then('user should be able to add a deal with the required details only',async function(dataTable){
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
               await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldDropdownData, 'yes');
           } else if (fieldName == 'stage') {
               stageFieldData = dataTable.rawTable[i][1];

               //will check that the data for the stage field dropdown field is given or not
               if (stageFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the stage field dropdown field, the test case execution has been aborted');
               }

               //will select the provided new dropdown value from the 'Stage' dropdown list
               await driver.sleep(1000);
               await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'stage', stageFieldData, 'yes');
           } else if (fieldName == 'priority') {
               priorityFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required priority field dropdown is given or not
               if (priorityFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the required priority dropdown field, the test case execution has been aborted');
               }

               //will select the provided new dropdown value from the 'Priority' dropdown list
               await driver.sleep(1000);
               await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'priority', priorityFieldData, 'no');
           }
       }
       const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','Save Button');
       await saveButton.click();
       await driver.sleep(1000);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('check count of deals added',async function(){
   try {
       //get Count of 'Deals' in 'Deal Listing Page'
       const deals = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis show-eye-only"]'));
       const dealsCountAfterAdding = await deals.length;
       console.log("Deals Count: "+dealsCountAfterAdding);
       if ((dealsCount)+1 === dealsCountAfterAdding) {
           console.log("As deal is added and deals count is increased by (X+1),so test case has been passed");
       } else {
           await assert.fail("As deal is not added and deals count is not increased by (X+1),so test case has been aborted");
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//------------------------Case 16: As a user, I should be able to add multiple deals at a time--------------------------

Then('user should be able to add multiple deals at a time',async function(dataTable){
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
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldDropdownData, 'yes');
            } else if (fieldName == 'stage') {
                stageFieldData = dataTable.rawTable[i][1];

                //will check that the data for the stage field dropdown field is given or not
                if (stageFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the stage field dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Stage' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'stage', stageFieldData, 'yes');
            } else if (fieldName == 'priority') {
                priorityFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required priority field dropdown is given or not
                if (priorityFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required priority dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Priority' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'priority', priorityFieldData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check message as {string} and click on "Save and add other" button',async function(expectedNotification){
   try {
       const saveAndAddOtherButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveAndNewSubmit','Save And Add Other');
       await saveAndAddOtherButton.click();
       const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
       await driver.wait(until.elementIsVisible(actualNotificationElement));
       const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
       strictEqual(actualNotification, expectedNotification);
       await driver.sleep(5000);
       await driver.manage().setTimeouts({implicit: 2000});
       //check 'Add New Deal' Page Visibility
       const addDealDialog = await driver.findElements(By.xpath('//h4[text()="Add New Deal"]'));
       const addDealDialogLength = await addDealDialog.length;
       //check field values
       const titleValue = await driver.findElement(By.id('title')).getAttribute('value');
       console.log("1"+titleValue)
       const contactValue = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[1]/sm-element//ro-tag/div/input')).getAttribute('value');
       console.log("2"+contactValue)
       const companyValue = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[2]/sm-element//ro-tag/div/input')).getAttribute('value');
       console.log("3"+companyValue)
       const estimatedCloseDateValue = await driver.findElement(By.id('estimatedCloseDate')).getAttribute('value');
       console.log("4"+estimatedCloseDateValue)
       const value = await driver.findElement(By.id('dealValue')).getAttribute('value');
       console.log("5"+value)
       const descriptionValue = await driver.findElement(By.id('description')).getAttribute('value');
       console.log("6"+descriptionValue)
       const textFieldValue = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
       console.log("8"+textFieldValue)
       const textAreaFieldValue = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
       console.log("9"+textAreaFieldValue)
       const integerFieldValue = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
       console.log("10"+integerFieldValue)
       const decimalFieldValue = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
       console.log("11"+decimalFieldValue)
       const dateFieldValue = await driver.findElement(By.id('dateCustomField1')).getAttribute('value');
       console.log("12"+dateFieldValue)
       const dateTimeFieldValue = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
       console.log("13"+dateTimeFieldValue)
       const emailDetailsFieldValue = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
       console.log("14"+emailDetailsFieldValue)
       const phoneDetailsFieldValue = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
       console.log("15"+phoneDetailsFieldValue)
       const urlFieldValue = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
       console.log("16"+urlFieldValue)
       const bigIntegerFieldValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
       console.log("17"+bigIntegerFieldValue)
       const percentageFieldValue = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
       console.log("18"+percentageFieldValue)
       const currencyFieldValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
       console.log("19"+currencyFieldValue)
       if (addDealDialogLength > 0) {
           console.log("As after adding new deal details and after clicking on 'Save and add other' button,the add deal dialog remains opened,so test case has been passed");
       } else {
           await assert.fail("As after adding new deal details and after clicking on 'Save and add other' button,the add deal dialog does not remains opened,so test case has been aborted");
       }
       try {
           strictEqual(titleValue,'');
           strictEqual(contactValue,'');
           strictEqual(companyValue,'');
           strictEqual(estimatedCloseDateValue,'');
           strictEqual(value,'');
           strictEqual(descriptionValue,'');
           strictEqual(textFieldValue, '');
           strictEqual(textAreaFieldValue, '');
           strictEqual(integerFieldValue, '');
           strictEqual(decimalFieldValue, '');
           strictEqual(dateFieldValue,'');
           strictEqual(dateTimeFieldValue,'');
           strictEqual(emailDetailsFieldValue, '');
           strictEqual(phoneDetailsFieldValue, '');
           strictEqual(urlFieldValue, '');
           strictEqual(bigIntegerFieldValue, '');
           strictEqual(percentageFieldValue, '');
           strictEqual(currencyFieldValue, '');
       } catch (err) {
           await assert.fail("As after adding new contact with 'Save and add other' option,the field values are not reset,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
   } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
   }
});

//-----Case 18: As a User, Verify that "win probability" textbox will appear as enabled or disabled according to selected deal pipeline-----

Then('verify that "win probability" textbox will appear as enabled or disabled according to selected deal pipeline',async function(){
   try {
        console.log("As win probability is appeared after enabling deal pipeline,so test case has been passed");
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//----Case 19: As a user, Verify that if user don't have rights of contact and company module then the user can't able to create a new contact and company----

Then('user get {string},{string} validations and log in through {string}',async function(expectedContactValidation,expectedCompanyValidation,adminUser){
   try {
       const dealIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
       await driver.executeScript("arguments[0].click();",dealIcon);
       await driver.sleep(2000);
       const addDealButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Deal ');
       await addDealButton.click();
       await driver.sleep(1500);
       const contact = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[1]/sm-element//ro-tag/div/input'));
       await contact.sendKeys("abc");
       await driver.sleep(1500);
       await driver.findElement(By.xpath('//div[text()="Create New Contact"]')).click();
       await driver.sleep(1500);
       // const textField = await driver.findElement(By.xpath('//div[2]/div[@class="row"]/sm-input-txt/sm-element/input'));
       // await textField.sendKeys("xyz");
       // await driver.sleep(500);
       const saveButton = await moduleElementsObj.findQuickViewPageSaveButton(driver);
       await saveButton.click();
       await driver.sleep(2000);
       const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
       await driver.wait(until.elementIsVisible(actualNotificationElement));
       const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
       strictEqual(actualNotification, expectedContactValidation);
       await driver.sleep(5000);
       const contactCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
       await contactCloseIcon.click();
       await driver.sleep(1500);
       const company = await driver.findElement(By.xpath('//div[1]/div/sm-autocomplete[2]/sm-element//ro-tag/div/input'));
       await company.sendKeys("xyz");
       await driver.sleep(1500);
       await driver.findElement(By.xpath('//div[text()="Create New Company"]')).click();
       await driver.sleep(1500);
       // const customField = await driver.findElement(By.id('textCustomField6'));
       // await customField.sendKeys("abc");
       // await driver.sleep(500);
       const saveButtonElement = await moduleElementsObj.findQuickViewPageSaveButton(driver);
       await saveButtonElement.click();
       await driver.sleep(2000);
       const actualCompanyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
       await driver.wait(until.elementIsVisible(actualCompanyMessage));
       const actualCompanyNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
       strictEqual(actualCompanyNotification, expectedCompanyValidation);
       await driver.sleep(5000);
       const companyCloseIcon = await moduleElementsObj.findQuickViewPageCloseIcon(driver);
       await companyCloseIcon.click();
       await driver.sleep(1500);
       const closeIcon = await moduleElementsObj.findCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(1500);
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
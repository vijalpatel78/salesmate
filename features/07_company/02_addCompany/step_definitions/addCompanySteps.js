const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/02_addCompany/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

let websiteFieldData = 'no', companyNameFieldData = 'no', associateContactFieldData = 'no', customFieldData = 'no',
companiesCount = 'no', associateContact02FieldData = 'no', ownerFieldDropdownData = 'no';

When('user is on "Add New Company" page',async function(){
   try {
       //get Count of 'Companies' in 'Company Listing Page'
       const companies = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
       companiesCount = await companies.length;
       console.log("Companies Count: "+companiesCount);
       const addCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Company ');
       await addCompanyButton.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----Case 1: As a User, Verify when user don't have rights to create company then '+ Company' button should not be shown-------

Then('add company module is not visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const addCompanyButton = await driver.findElements(By.xpath('//button[text()="Company "]'));
        const addCompanyButtonCount = await addCompanyButton.length;
        if (addCompanyButtonCount === 0) {
            console.log("As add company button length is " + addCompanyButtonCount + " so it is not displayed after disabling company module create right,so test case has been passed");
        } else {
            await assert.fail("As add company button length is " + addCompanyButtonCount + " so it is displayed after disabling company module create right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------Case 2: As a User, Verify that 'Create Company' button should be shown in 'Company Grid' view-------------

Then('add company module is visible and log in through {string}',async function(adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIcon.click();
        await driver.manage().setTimeouts({implicit: 2000});
        const addCompanyButton = await driver.findElements(By.xpath('//button[text()="Company "]'));
        const addCompanyButtonLength = await addCompanyButton.length;
        if (addCompanyButtonLength > 0) {
            console.log("As add company button length is " + addCompanyButtonLength + " so it is displayed after enabling company module create right,so test case has been passed");
        } else {
            await assert.fail("As add company button length is " + addCompanyButtonLength + " so it is not displayed after enabling company module create right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----Case 4: As a User, Verify the 'Link' button should be displayed for the website type field after adding a link to the field-----

When('verify the "Link" button should be displayed for the website type field',async function(dataTable) {
    let winHandleBefore;
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'website') {
                websiteFieldData = dataTable.rawTable[i][1];

                //will find 'First Name' field and pass the new data
                const websiteField = await formElementsObj.findElementById(driver,screenshotPath, 'website');
                await clearFieldDataObj.clearFieldData(websiteField);
                await websiteField.sendKeys(websiteFieldData);
                await driver.sleep(500);
            }
        }
        const linkButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Link ');
        await linkButton.click();
        await driver.sleep(3000);
        //check 'Current Url'
        winHandleBefore = await driver.getWindowHandle();
        const lastTab = await driver.getAllWindowHandles();
        const closeLastTab = lastTab[lastTab.length - 1];
        await driver.switchTo().window(closeLastTab);
        await driver.sleep(1000);
        const currentURL = await driver.getCurrentUrl();
        console.log("Current website url is:" +currentURL);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'websitePage.png');
        if(currentURL === websiteFieldData) {
            console.log("As current url and expected url are same test case has been passed...");
        } else {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("Due to unmatched URL,test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    finally {
        await driver.close();
        await driver.switchTo().window(winHandleBefore);
        await driver.sleep(2000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    }
});

//----Case 5: As a User, Verify the 'Link' button should be displayed for the website type field after adding a link to the field-----

Then('verify active currencies under company module',async function(){
    try {
        //get 'Active Currencies' List in 'Currencies' Page
        const activeCurrenciesElements = await driver.findElements(By.xpath('//table//td[2]'));
        const activeCurrenciesListLength = await activeCurrenciesElements.length;
        console.log("Currencies Page Active Currencies Length: " + activeCurrenciesListLength);
        for (let i = 1; i <= activeCurrenciesListLength; i++) {
            const activeCurrenciesList = await driver.findElement(By.css(`tr:nth-of-type(${i}) > td:nth-of-type(2)`)).getText();
            console.log(`Active Currencies List on 'Currencies' page ${i}: ` + activeCurrenciesList);
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIcon.click();
        await driver.sleep(1000);
        const addCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Company ');
        await addCompanyButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//sm-select-box[2]//div/span//span/span/b')).click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //get 'Active Currencies' Dropdown List in 'Add Contact' Page
        const activeCurrenciesDropdown = await driver.findElements(By.xpath('//ul[@role="tree"]/li'));
        const activeCurrenciesDropdownLength = await activeCurrenciesDropdown.length;
        console.log("Add Company Page Currencies Dropdown Length: " + activeCurrenciesDropdownLength);
        for (let i = 1; i <= activeCurrenciesDropdownLength; i++) {
            const activeCurrenciesDropdown = await driver.findElement(By.xpath(`//ul[@role="tree"]/li[${i}]`)).getText();
            console.log(`Add Company Page Currencies Dropdown ${i}: ` + activeCurrenciesDropdown);
        }
        console.log(" Currencies Page: "+activeCurrenciesListLength);
        if (activeCurrenciesListLength === activeCurrenciesDropdownLength) {
            console.log("As active currencies list in 'Currencies' page and 'Add Contact' page are equal,so test case has been passed");
        } else {
            await assert.fail("As active currencies list in 'Currencies' page and 'Add Contact' page are not equal,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 6: Verify that user able to search contacts as 'Test' in "Associate Contacts" field----------------

When('verify that user able to search contacts as {string} in "Associate Contacts" field',async function(searchData){
    try {
        const associateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Add Associate Contact ');
        await associateButton.click();
        await driver.sleep(500);
        const searchField = await formElementsObj.findElementByXpath(driver,screenshotPath,'input','placeholder','Search Contact','search_Field');
        await clearFieldDataObj.clearFieldData(searchField);
        await searchField.sendKeys(searchData);
        await driver.sleep(1000);

        //getting value of search box
        const searchBoxName = await driver.findElement(By.xpath('//input[@placeholder="Search Contact"]')).getAttribute('value');
        console.log("Existing Search Value: " + searchBoxName);

        //getting value of name
        const resultValue = await driver.findElement(By.xpath('(//div[@class="search-user-name text-ellipsis"])[1]')).getText();
        console.log("Search Field Result Value: " + resultValue);

        //compare 'Search box Name' and 'Result Value'
        if (resultValue.includes(searchBoxName)) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactSearchRecordFound.png');
            console.log("As contact which contain searched chars is displayed,so test case has been passed");
        } else {
            await assert.fail("As contact contain searched chars is not displayed,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 7: As a User, Verify user able to associate the contacts from 'Add new company' pop up--------------

When('verify user able to associate the contacts from "Add new company" pop up',async function(dataTable){
   try {
       const associateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Add Associate Contact ');
       await associateButton.click();
       await driver.sleep(500);
       //will travel provided fields and data list
       for (let i = 0; i < dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'associate contact') {
               associateContactFieldData = dataTable.rawTable[i][1];

               //will check that the data for the associate contact field is given or not
               if (associateContactFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the associate contact field, the test case execution has been aborted');
               }

               //will find 'Associate Contact' field and pass the new data
               const associateContact = await formElementsObj.findElementByXpath(driver,screenshotPath,'input','placeholder','Search Contact','Search Field');
               await clearFieldDataObj.clearFieldData(associateContact);
               await associateContact.sendKeys(associateContactFieldData);
               await driver.sleep(500);
               const associateContactSelect = await formElementsObj.findElementByXpath(driver,screenshotPath,'div','class','search-user-name text-ellipsis','Associate_Contact');
               await associateContactSelect.click();
               await driver.sleep(500);
           } else if (fieldName == 'company name') {
               companyNameFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required company name field is given or not
               if (companyNameFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the company name field, the test case execution has been aborted');
               }

               //will find 'Company Name' field and pass the new data
               const companyNameField = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input | //input[@id="name"]'));
               await clearFieldDataObj.clearFieldData(companyNameField);
               await companyNameField.sendKeys(companyNameFieldData);
               await driver.sleep(500);
           } else if (fieldName == 'custom field') {
               customFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required custom field is given or not
               if (customFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the required custom field, the test case execution has been aborted');
               }

               //will find 'Custom' field and pass the new data
               const customField = await driver.findElement(By.xpath('//sm-input-txt[@class="col-md-12 col-sm-12 sm-form-element"]/sm-element/input'));
               await customField.click();
               await clearFieldDataObj.clearFieldData(customField);
               await customField.sendKeys(customFieldData);
               await driver.sleep(500);
               const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','save_Button');
               await driver.executeScript("arguments[0].click();",saveButton);
           }
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('check added companies count',async function(){
   try {
       //get Count of 'Companies' in 'Company Listing Page'
       const companiesElement = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
       const companiesCountAfterAddingCompany = await companiesElement.length
       console.log("Companies Count After Adding Company : "+companiesCountAfterAddingCompany);
       if((companiesCount)+1 === companiesCountAfterAddingCompany) {
           console.log("As company added along with 'Associate Contact' and count is increased by (X+1),so test case has been passed");
       } else {
           await assert.fail("As company is not added along with 'Associate Contact' and count is not increased by (X+1),so test case has been aborted");
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------------Case 8: As a User, Verify user able to associate the "N" number of contacts to the company at a time--------------

When('verify user able to associate the "N" number of contacts to the company at a time',async function(dataTable){
    try {
        const associateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Add Associate Contact ');
        await associateButton.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'associate contact 01') {
                associateContactFieldData = dataTable.rawTable[i][1];

                //will check that the data for the associate contact 01 field is given or not
                if (associateContactFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the associate contact 01 field, the test case execution has been aborted');
                }

                //will find 'Associate Contact 01' field and pass the new data
                const associateContact01 = await formElementsObj.findElementByXpath(driver,screenshotPath,'input','placeholder','Search Contact','Search Field');
                await clearFieldDataObj.clearFieldData(associateContact01);
                await associateContact01.sendKeys(associateContactFieldData);
                await driver.sleep(500);
                const associateContactSelect = await formElementsObj.findElementByXpath(driver,screenshotPath,'div','class','search-user-name text-ellipsis','Associate_Contact');
                await associateContactSelect.click();
                await driver.sleep(500);
            } else if (fieldName == 'associate contact 02') {
                associateContact02FieldData = dataTable.rawTable[i][1];

                //will check that the data for the associate contact 02 field is given or not
                if (associateContact02FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the associate contact 02 field, the test case execution has been aborted');
                }

                const associateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Add Associate Contact ');
                await associateButton.click();
                //will find 'Associate Contact 02' field and pass the new data
                const associateContact02 = await formElementsObj.findElementByXpathIndexing(driver,'input','placeholder','Search Contact',2,'Search Field');
                await clearFieldDataObj.clearFieldData(associateContact02);
                await associateContact02.sendKeys(associateContact02FieldData);
                await driver.sleep(500);
                const associateContactSelect = await formElementsObj.findElementByXpath(driver,screenshotPath,'div','class','search-user-name text-ellipsis','Associate_Contact');
                await associateContactSelect.click();
                await driver.sleep(500);
            } else if (fieldName == 'company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required company name field is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the company name field, the test case execution has been aborted');
                }

                //will find 'Company Name' field and pass the new data
                const companyNameField = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input | //input[@id="name"]'));
                await clearFieldDataObj.clearFieldData(companyNameField);
                await companyNameField.sendKeys(companyNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'custom field') {
                customFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required custom field is given or not
                if (customFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required custom field, the test case execution has been aborted');
                }

                //will find 'Custom' field and pass the new data
                const customField = await driver.findElement(By.xpath('//sm-input-txt[@class="col-md-12 col-sm-12 sm-form-element"]/sm-element/input'));
                await customField.click();
                await clearFieldDataObj.clearFieldData(customField);
                await customField.sendKeys(customFieldData);
                await driver.sleep(500);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','save_Button');
                await driver.executeScript("arguments[0].click();",saveButton);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 9: As a User, Verify user able to remove the association by clicking on "X" button in "Add New Company" pop up--------------

When('verify user able to remove the association {string} by clicking on "X" button in "Add New Company" pop up',async function(searchData){
    try {
        const associateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Add Associate Contact ');
        await associateButton.click();
        const searchField = await formElementsObj.findElementByXpath(driver,screenshotPath,'input','placeholder','Search Contact','Search Field');
        await clearFieldDataObj.clearFieldData(searchField);
        await searchField.sendKeys(searchData);
        await driver.sleep(500);
        const associateContact = await formElementsObj.findElementByXpath(driver,screenshotPath,'div','class','search-user-name text-ellipsis','Associate_Contact');
        await associateContact.click();
        await driver.sleep(1000);
        //remove 'Associate Contact'
        const removeButton = await moduleElementsObj.findCrossRemoveIcon(driver);
        await removeButton.click();
        await driver.sleep(1000);
        //get 'Search Box' value
        const searchBoxName = await driver.findElement(By.xpath('//input[@placeholder="Search Contact"]')).getAttribute('value');
        try {
            strictEqual(searchBoxName,'');
        } catch(err) {
            await assert.fail(err);
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 10: As a User, Verify user able to associate the contacts from 'Add new company' pop up--------------

Then('redirect to company layout page and log in through {string}',async function(adminUser){
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIcon.click();
        await driver.sleep(2000);
        const addCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Company ');
        await addCompanyButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of "Manage Fields"
        const manageFieldsLink = await driver.findElements(By.xpath('//a[text()="Manage Fields"]'));
        const manageFieldsLinkLength = await manageFieldsLink.length;
        if (manageFieldsLinkLength > 0) {
            console.log("As manage fields link on add contact form length is " + manageFieldsLinkLength + " so it is displayed after enabling manage layout rights,so test case has been passed");
        } else {
            await assert.fail("As manage fields link on add contact form length is " + manageFieldsLinkLength + " so it is not displayed even after enabling manage layout rights,so test case has been aborted");
        }
        //check page redirection to 'Contact Layout'
        const manageFields = await driver.findElement(By.xpath('//a[text()="Manage Fields"]'));
        await manageFields.click();
        await driver.sleep(4000);
        const currentPageURL = await driver.getCurrentUrl();
        console.log("Current Page URL: " + currentPageURL);
        if (currentPageURL.includes('/app/setup/customization/layouts')) {
            console.log("As current page url is equal to expected url,so test case has been passed");
        } else {
            await assert.fail("As current page url is not equal to expected url,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------Case 11: As a User, Verify 'Manage Fields' option should not be shown when user don't have rights to manage the fields-----------

When('system shows validation upon clicking on "Manage Fields" and log in through {string}',async function(adminUser){
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIcon.click();
        await driver.sleep(1500);
        const addCompanyButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Company ');
        await addCompanyButton.click();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of "Manage Fields"
        const manageFieldsLink = await driver.findElements(By.xpath('//a[text()="Manage Fields"]'));
        const manageFieldsLinkLength = await manageFieldsLink.length;
        if (manageFieldsLinkLength === 0) {
            console.log("As manage fields link on add contact form length is " + manageFieldsLinkLength + " so it is not displayed after disabling manage layout rights,so test case has been passed");
        } else {
            await assert.fail("As manage fields link on add contact form length is " + manageFieldsLinkLength + " so it is displayed after disabling manage layout rights,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------------Case 12: As a User, Verify new company created after clicking on 'Save' button----------------------

When('verify new company created after clicking on Save button',async function(dataTable){
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required company name field is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the company name field, the test case execution has been aborted');
                }

                //will find 'Company Name' field and pass the new data
                const companyNameField = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input | //input[@id="name"]'));
                await clearFieldDataObj.clearFieldData(companyNameField);
                await companyNameField.sendKeys(companyNameFieldData);
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
            } else if (fieldName == 'custom field') {
                customFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required custom field is given or not
                if (customFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required custom field, the test case execution has been aborted');
                }

                //will find 'Custom' field and pass the new data
                const customField = await driver.findElement(By.xpath('//sm-input-txt[@class="col-md-12 col-sm-12 sm-form-element"]/sm-element/input'));
                await customField.click();
                await clearFieldDataObj.clearFieldData(customField);
                await customField.sendKeys(customFieldData);
                await driver.sleep(500);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','save_Button');
                await driver.executeScript("arguments[0].click();",saveButton);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 13: As a User, Verify user able to associate the "N" number of contacts to the company at a time--------------

When('add new company details',async function(dataTable){
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'company name') {
                companyNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required company name field is given or not
                if (companyNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the company name field, the test case execution has been aborted');
                }

                //will find 'Company Name' field and pass the new data
                const companyNameField = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input | //input[@id="name"]'));
                await clearFieldDataObj.clearFieldData(companyNameField);
                await companyNameField.sendKeys(companyNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'custom field') {
                customFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required custom field is given or not
                if (customFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required custom field, the test case execution has been aborted');
                }

                //will find 'Custom' field and pass the new data
                const customField = await driver.findElement(By.xpath('//sm-input-txt[@class="col-md-12 col-sm-12 sm-form-element"]/sm-element/input'));
                await customField.click();
                await clearFieldDataObj.clearFieldData(customField);
                await customField.sendKeys(customFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('same "Add new company" pop up opens after click on "Save and add other" and check {string}',async function(expectedNotification){
    try {
        const saveAndAddOtherButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSaveAndNewSubmit','Save And Add Other');
        await saveAndAddOtherButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check 'Add New Contact' Page Visibility
        const addCompanyPage = await driver.findElements(By.xpath('//h4[text()="Add New Company"]'));
        const addCompanyPageLength = await addCompanyPage.length;
        //check field values
        const companyName = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input | //input[@id="name"]'));
        const companyNameValue = await companyName.getAttribute('value');
        const websiteFieldValue = await driver.findElement(By.id('website')).getAttribute('value');
        const phoneFieldValue = await driver.findElement(By.id('phone')).getAttribute('value');
        const otherPhoneFieldValue = await driver.findElement(By.id('otherPhone')).getAttribute('value');
        const numberOfEmployeesFieldValue = await driver.findElement(By.id('numberOfEmployees')).getAttribute('value');
        const annualRevenue = await driver.findElement(By.id('annualRevenue')).getAttribute('value');
        const skypeFieldValue = await driver.findElement(By.id('skypeId')).getAttribute('value');
        const facebookFieldValue = await driver.findElement(By.id('facebookHandle')).getAttribute('value');
        const linkedInFieldValue = await driver.findElement(By.id('linkedInHandle')).getAttribute('value');
        const twitterFieldValue = await driver.findElement(By.id('twitterHandle')).getAttribute('value');
        const instagramFieldValue = await driver.findElement(By.id('instagramHandle')).getAttribute('value');
        const descriptionFieldValue = await driver.findElement(By.id('description')).getAttribute('value');
        const addressLine1FieldValue = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
        const addressLine2FieldValue = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
        const cityFieldValue = await driver.findElement(By.id('billingCity')).getAttribute('value');
        const zipCodeFieldValue = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
        const stateFieldValue = await driver.findElement(By.id('billingState')).getAttribute('value');
        const countryFieldValue = await driver.findElement(By.id('billingCountry')).getAttribute('value');
        const textFieldValue = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        const integerFieldValue = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        const decimalFieldValue = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        const dateFieldValue = await driver.findElement(By.id('dateCustomField1')).getAttribute('value');
        const dateAndTimeFieldValue = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
        const emailDetailsFieldValue = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const phoneDetailsFieldValue = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const urlFieldValue = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        const bigIntegerFieldValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        const percentageFieldValue = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        const currencyFieldValue = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        if (addCompanyPageLength > 0) {
            console.log("As after adding new company details and after clicking on 'Save and add other' button, add company page remains opened,so test case has been passed");
        } else {
            await assert.fail("As after adding new company details and after clicking on 'Save and add other' button, add company page does not remains opened,so test case has been aborted");
        }
        try {
            strictEqual(companyNameValue,'');
            strictEqual(phoneFieldValue, '');
            strictEqual(otherPhoneFieldValue, '');
            strictEqual(numberOfEmployeesFieldValue,'');
            strictEqual(annualRevenue,'');
            strictEqual(skypeFieldValue, '');
            strictEqual(websiteFieldValue, '');
            strictEqual(facebookFieldValue, '');
            strictEqual(linkedInFieldValue, '');
            strictEqual(twitterFieldValue, '');
            strictEqual(instagramFieldValue, '');
            strictEqual(descriptionFieldValue, '');
            strictEqual(addressLine1FieldValue, '');
            strictEqual(addressLine2FieldValue, '');
            strictEqual(cityFieldValue, '');
            strictEqual(zipCodeFieldValue, '');
            strictEqual(stateFieldValue, '');
            strictEqual(countryFieldValue, '');
            strictEqual(textFieldValue, '');
            strictEqual(integerFieldValue, '');
            strictEqual(decimalFieldValue, '');
            strictEqual(dateFieldValue,'');
            strictEqual(dateAndTimeFieldValue,'');
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
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 14: As a User, Verify the timeline entry should updated after creating new company----------------

When('verify the timeline entry should updated after creating new company',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,4);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,4);
        await previewButton.click();
        await driver.sleep(2000);
        //click on 'Timeline' timeline
        const timeLineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Timeline');
        await timeLineTab.click();
        await driver.sleep(2000);
        //check visibility of 'Timeline' 'Company Creation'
        const timeLineTextElement = await driver.findElement(By.xpath('//span[@class="font-medium"]')).isDisplayed();
        console.log("Is 'Timeline' Text displayed: " + timeLineTextElement);
        //print text of 'Timeline' 'Company Creation'
        const timeLineText = await driver.findElement(By.xpath('//span[@class="font-medium"]')).getText();
        console.log("'Timeline' Text :" + timeLineText);
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 15: As a User, Verify new company should not created after clicking on 'Cancel' or "X" button--------------

When('verify new company should not created after clicking on Cancel or "X" button',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,4);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const addCompanyButton = await driver.findElement(By.xpath('//button[text()="Company "]'));
        await addCompanyButton.click();
        await driver.sleep(2000);
        const closeIconElement = await driver.findElement(By.xpath('//add-company-new/div[@class="modal-header"]/button[@type="button"]'));
        await closeIconElement.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        //check "Add New Company Popup" length by clicking on 'Cancel' button
        const addNewCompanyPopup = await driver.findElements(By.xpath('//h4[text()="Add New Company"]'));
        const addNewCompanyPopupLength = await addNewCompanyPopup.length;
        if(addNewCompanyPopupLength === 0) {
            console.log("As 'Add New Company' popup closed after clicking on 'Cancel' button,so test case has been passed");
        } else {
            await assert.fail("As 'Add New Company' popup is not closed after clicking on 'Cancel' button,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 16: As a User, Verify that validation message should display if user do not add value to the required fields--------------

Then('verify validation of {string}',async function(expectedNameValidation){
    try {
        const saveButton = await driver.findElement(By.xpath('//button[@id="btnSaveBulkSubmit"] | //button[@id="btnSubmit"]'));
        await driver.executeScript("arguments[0].click();",saveButton);
        await driver.sleep(1000);
        try {
            const actualNameValidation = await driver.findElement(By.xpath('(//div[@class="error-message text-danger"])[1]')).getText();
            strictEqual(actualNameValidation,expectedNameValidation);
        } catch(err) {
            await assert.fail(err);
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
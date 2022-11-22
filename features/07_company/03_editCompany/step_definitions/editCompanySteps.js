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
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

let companyNameFieldData = 'no', phoneFieldData = 'no', employeesFieldData = 'no', customFieldData = 'no', editPageCompanyName,
editPagePhone, editPageEmployees;

When('user is on "Edit New Company" page',async function(){
    try {
        const editCompanyButton = await moduleElementsObj.findEditIcon(driver,4);
        await editCompanyButton.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 1: As a User, Verify that edit button should be visible beside name of the company name---------------

Then('edit company icon is visible and log in through {string}',async function(adminUser){
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIcon.click();
        await driver.manage().setTimeouts({implicit: 2000});
        const editIcon = await driver.findElements(By.xpath('(//i[@class="icon-pencil2"])[1]'));
        const editIconLength = await editIcon.length;
        if (editIconLength > 0) {
            console.log("As edit company button length is " + editIconLength + " so it is displayed after enabling company edit right,so test case has been passed");
        } else {
            await assert.fail("As edit company button length is " + editIconLength + " so it is not displayed even after enabling company edit right,so test case has been aborted");
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

//----Case 2: As a User, Verify that 'Edit Company' pop up should be open and content should be saved after clicking on 'Update' button----

When('verify that content should be saved after clicking on Update button',async function(dataTable){
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
               const companyNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','companyName');
               await clearFieldDataObj.clearFieldData(companyNameField);
               await companyNameField.sendKeys(companyNameFieldData);
               await driver.sleep(500);
               editPageCompanyName = await driver.findElement(By.id('name')).getAttribute('value');
               console.log("Edit Page Company Name: "+editPageCompanyName);
           } else if (fieldName == 'phone') {
               phoneFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required company name field is given or not
               if (phoneFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the company name field, the test case execution has been aborted');
               }

               //will find 'Company Name' field and pass the new data
               const phoneField = await formElementsObj.findElementById(driver,screenshotPath,'phone','phoneField');
               await clearFieldDataObj.clearFieldData(phoneField);
               await phoneField.sendKeys(phoneFieldData);
               await driver.sleep(500);
               editPagePhone = await driver.findElement(By.id('phone')).getAttribute('value');
               console.log("Edit Page Phone: "+editPagePhone);
           } else if (fieldName == 'employees') {
               employeesFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required company name field is given or not
               if (employeesFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the company name field, the test case execution has been aborted');
               }

               //will find 'Company Name' field and pass the new data
               const employeesField = await formElementsObj.findElementById(driver,screenshotPath,'numberOfEmployees','employeesField');
               await clearFieldDataObj.clearFieldData(employeesField);
               await employeesField.sendKeys(employeesFieldData);
               await driver.sleep(500);
               editPageEmployees = await driver.findElement(By.id('numberOfEmployees')).getAttribute('value');
               console.log("Edit Page Employees Count: "+editPageEmployees);
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
               const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','save_Button');
               await driver.executeScript("arguments[0].click();",updateButton);
           }
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('check updated company details',async function(){
   try {
       const listingPageCompanyName = await driver.findElement(By.xpath('(//a[@class="entity-show-link text-ellipsis"])[4]')).getText();
       console.log("Listing Page Company Name: "+listingPageCompanyName);
       const listingPageEmployees = await driver.findElement(By.xpath('(//div[@col-id="numberOfEmployees"])[5]')).getText();
       console.log("Listing Page Employees: "+listingPageEmployees);
       if(editPageCompanyName === listingPageCompanyName && editPageEmployees === listingPageEmployees) {
           console.log("As edit page and listing page updated details are equal,so test case has been passed");
       } else {
           await assert.fail("As edit page and listing page updated details are not equal,so test case has been aborted");
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----------Case 3: As a User, Verify the validation message should be display for required field if user remove the value from required field--------

When('verify validations {string} and {string} should be displayed for required fields',async function(expectedNameValidation,expectedCustomFieldValidation){
    try {
        const companyNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','companyName');
        await clearFieldDataObj.clearFieldData(companyNameField);
        await driver.sleep(500);
        const customField = await driver.findElement(By.xpath('//sm-input-txt[@class="col-md-12 col-sm-12 sm-form-element"]/sm-element/input'));
        await customField.click();
        await clearFieldDataObj.clearFieldData(customField);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','updateButton');
        await driver.executeScript("arguments[0].click();",updateButton);
        await driver.sleep(1000);
        try {
            const actualNameValidation = await driver.findElement(By.xpath('(//div[@class="error-message text-danger"])[1]')).getText();
            strictEqual(actualNameValidation,expectedNameValidation);
            const actualCustomFieldValidation = await driver.findElement(By.xpath('(//div[@class="error-message text-danger"])[2]')).getText();
            strictEqual(actualCustomFieldValidation,expectedCustomFieldValidation);
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

//-------------------case 4: As a User, Verify the timeline entry after the user update the company---------------------

Then('verify the timeline entry after the user update the company',async function(){
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
        await screenshotObj.takeScreenshot(driver,screenshotPath+'timeLineUpdatedFields.png');
        //print text of 'Timeline' 'Company Creation'
        const timeLineUpdatedCustomField = await driver.findElement(By.xpath('(//span[@class="font-medium"])[1]')).getText();
        console.log("Timeline Custom Field:" + timeLineUpdatedCustomField);
        const timeLineUpdatedPhone = await driver.findElement(By.xpath('(//span[@class="font-medium"])[2]')).getText();
        console.log("Timeline Phone:" + timeLineUpdatedPhone);
        const timeLineUpdatedEmployees = await driver.findElement(By.xpath('(//span[@class="font-medium"])[3]')).getText();
        console.log("Timeline Employees:" + timeLineUpdatedEmployees);
        const timeLineUpdatedName = await driver.findElement(By.xpath('(//span[@class="font-medium"])[4]')).getText();
        console.log("Timeline Company Name:" + timeLineUpdatedName);
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 6: As a User, Verify 'Edit' button should not be visible when user don't have rights to edit the company--------

Then('edit company icon is not visible and log in through {string}',async function(adminUser){
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIcon.click();
        await driver.manage().setTimeouts({implicit: 2000});
        const editIcon = await driver.findElements(By.xpath('(//i[@class="icon-pencil2"])[1]'));
        const editIconLength = await editIcon.length;
        if (editIconLength === 0) {
            console.log("As edit company button length is " + editIconLength + " so it is not displayed after disabling company edit right,so test case has been passed");
        } else {
            await assert.fail("As edit company button length is " + editIconLength + " so it is displayed even after disabling company edit right,so test case has been aborted");
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

//------------Case 5: As a User, Verify that user able to manage the fields by clicking on 'Manage Fields'--------------

Then('redirect to company layout page and logged in through {string}',async function(adminUser){
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIcon.click();
        await driver.sleep(2000);
        const editCompanyButton = await moduleElementsObj.findEditIcon(driver,1);
        await editCompanyButton.click();
        await driver.sleep(3000);
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
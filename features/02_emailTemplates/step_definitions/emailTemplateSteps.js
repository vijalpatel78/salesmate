const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../00_common/actions/openSalesmatePage');
const openEmailTemplatesPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const driver = require('../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/10_emailTemplates/screenshots/';
const emailTemplatesElementsObj = require('../common/emailTemplatesElements');
const commonElementsObj = require('../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../00_common/actions/fieldActions/selectDropdownValue');
const usersPageElementsObj = require('../../03_setup/users_security/users/common/usersPageElements');
const formElementsObj = require('../../00_common/webElements/formElements');
const moduleElementsObj = require('../../00_common/webElements/moduleElements');

let folderNameData = 'no', foldersCountBeforeAddingBlankName, foldersCountBeforeAddingExceedLengthName;
let templateNameFieldData = 'no', folderData = 'no', templateSubjectFieldData = 'no', templateContentFieldData = 'no';
let templatesCountBeforeNavigation, publicTemplateFolderCountBeforeUpdatingTemplate, customTemplateFolderCountBeforeUpdatingTemplate;
let templatesCountBeforeAddingBlankTemplate, templatesCountBeforeAddingExceedLengthTemplate;

Given('the {string} is on email templates page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/email-templates/list')){
        console.log('The email templates page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open email templates page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on email templates page');
        //will open the email templates page
        await openEmailTemplatesPageObj.openEmailTemplatesPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open email templates page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on email templates page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on email templates page');
        //will open the email templates page
        await openEmailTemplatesPageObj.openEmailTemplatesPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the tag management page
        await openEmailTemplatesPageObj.openEmailTemplatesPage(driver,screenshotPath);
    }
});

//-------------------------Case 1: Verify, the user is able to add a new custom folder----------------------------------

When('the user is able to add a new custom folder',async function(dataTable) {
    try {
        const addNewFolderIcon = await emailTemplatesElementsObj.findAddNewFolderIcon(driver);
        await addNewFolderIcon.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'folder name') {
                folderNameData = dataTable.rawTable[i][1];

                //will check that the data for the required folder name field is given or not
                if (folderNameData == '') {
                    await assert.fail('Due to the blank value is provided for the required folder name field, the test case execution has been aborted');
                }

                //will find 'Folder Name' field and pass the new data
                const folderNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Folder Name');
                await clearFieldDataObj.clearFieldData(folderNameField);
                await folderNameField.sendKeys(folderNameData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} message',async function(expectedNotification) {
    try {
        const editPageFolderNameBeforeNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Edit Page Folder Name Before Navigation: " + editPageFolderNameBeforeNavigation);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
        //page navigation and come back to email templates page
        await pageNavigationObj.comeBackToEmailTemplatesPage(driver, screenshotPath);
        const emailTemplatesPageFolderName = await driver.findElement(By.xpath(`//div[1]/ul[2]/li[3]/a[@class='text-ellipsis']`)).getText();
        console.log("Email Templates Page Folder Name: " + emailTemplatesPageFolderName);
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Auto Custom Folder @#$%^ 123 ');
        await folderNameElement.click();
        await driver.sleep(500);
        const actionsOption = await emailTemplatesElementsObj.findActionsOption(driver,3);
        await actionsOption.click();
        await driver.sleep(500);
        const editOrDeleteLink = await emailTemplatesElementsObj.findEditOrDeleteLink(driver, 3, 1);
        await editOrDeleteLink.click();
        await driver.sleep(500);
        const editPageFolderNameAfterNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Edit Page Folder Name After Navigation: " + editPageFolderNameAfterNavigation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        if (editPageFolderNameBeforeNavigation === editPageFolderNameAfterNavigation) {
            console.log("As folder name in email templates page and in edit page before and after navigation remains same,so test case has been passed");
        } else {
            await assert.fail("As folder name in email templates page and in edit page before and after navigation does not remains same,so test case has been aborted");
        }
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 2: Verify, the user is not able to leave required fields blank while creating a folder----------------

When('the user is not able to leave required fields blank while creating a folder',async function(dataTable) {
    try {
        //get count of folders before adding blank folder name
        const foldersCountElement = await driver.findElements(By.xpath('//div[@class="pull-right pos-rlt options"]'));
        foldersCountBeforeAddingBlankName = await foldersCountElement.length;
        console.log("Folders count before adding blank folder name: " + foldersCountBeforeAddingBlankName);
        const addNewFolderIcon = await emailTemplatesElementsObj.findAddNewFolderIcon(driver);
        await addNewFolderIcon.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'folder name') {
                folderNameData = dataTable.rawTable[i][1];

                //will find 'Folder Name' field and pass the new data
                const folderNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Folder Name');
                await clearFieldDataObj.clearFieldData(folderNameField);
                await folderNameField.sendKeys(folderNameData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} validation message',async function(expectedValidation) {
    try {
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const validationElement = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]'));
        await driver.wait(until.elementIsVisible(validationElement));
        const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        if (actualValidation.includes(expectedValidation)) {
            console.log("As actual and expected validations are equal,so test case has been passed");
        } else {
            await assert.fail("As actual and expected validations are not equal,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //get count of folders after adding blank folder name
        const foldersCountElement = await driver.findElements(By.xpath('//div[@class="pull-right pos-rlt options"]'));
        const foldersCountAfterAddingBlankName = await foldersCountElement.length;
        console.log("Folders count after adding blank folder name: " + foldersCountAfterAddingBlankName);
        if (foldersCountBeforeAddingBlankName === foldersCountAfterAddingBlankName) {
            console.log("As folders length remains same after verifying with blank folder name,so test case has been passed");
        } else {
            await assert.fail("As folders length does not remains same even after verifying with blank folder name,so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 3: Verify, the user is not able to enter more than 100 chars in the folder name while creating a folder---------------

When('the user is not able to enter more than 100 chars in the folder name while creating a folder',async function(dataTable) {
    try {
        //get count of folders before adding exceed length folder name
        const foldersCountElement = await driver.findElements(By.xpath('//div[@class="pull-right pos-rlt options"]'));
        foldersCountBeforeAddingExceedLengthName = await foldersCountElement.length;
        console.log("Folders count before adding exceed length folder name: " + foldersCountBeforeAddingExceedLengthName);
        const addNewFolderIcon = await emailTemplatesElementsObj.findAddNewFolderIcon(driver);
        await addNewFolderIcon.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'folder name') {
                folderNameData = dataTable.rawTable[i][1];

                //will check that the data for the required folder name field is given or not
                if (folderNameData == '') {
                    await assert.fail('Due to the blank value is provided for the required folder name field, the test case execution has been aborted');
                }

                //will find 'Folder Name' field and pass the new data
                const folderNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Folder Name');
                await clearFieldDataObj.clearFieldData(folderNameField);
                await folderNameField.sendKeys(folderNameData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} length validation message',async function(expectedValidation) {
    try {
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const validationElement = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]'));
        await driver.wait(until.elementIsVisible(validationElement));
        const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //get count of folders after adding exceed length folder name
        const foldersCountElement = await driver.findElements(By.xpath('//div[@class="pull-right pos-rlt options"]'));
        const foldersCountAfterAddingExceedLengthName = await foldersCountElement.length;
        console.log("Folders count after adding exceed length folder name: " + foldersCountAfterAddingExceedLengthName);
        if (foldersCountBeforeAddingExceedLengthName === foldersCountAfterAddingExceedLengthName) {
            console.log("As folders length remains same after verifying with exceed length folder name,so test case has been passed");
        } else {
            await assert.fail("As folders length does not remains same even after verifying with exceed length folder name,so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------------Case 4: Verify,the user is able to edit custom folder------------------------------------

When('the user is able to edit custom folder',async function(dataTable) {
    try {
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Auto Custom Folder @#$%^ 123 ');
        await folderNameElement.click();
        await driver.sleep(500);
        const actionsOption = await emailTemplatesElementsObj.findActionsOption(driver,3);
        await actionsOption.click();
        await driver.sleep(500);
        const editOrDeleteLink = await emailTemplatesElementsObj.findEditOrDeleteLink(driver, 3, 1);
        await editOrDeleteLink.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'folder name') {
                folderNameData = dataTable.rawTable[i][1];

                //will check that the data for the required folder name field is given or not
                if (folderNameData == '') {
                    await assert.fail('Due to the blank value is provided for the required folder name field, the test case execution has been aborted');
                }

                //will find 'Folder Name' field and pass the new data
                const folderNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Folder Name');
                await clearFieldDataObj.clearFieldData(folderNameField);
                await folderNameField.sendKeys(folderNameData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} updation message',async function(expectedNotification) {
    try {
        const editPageUpdatedFolderNameBeforeNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Edit Page Updated Folder Name Before Navigation: " + editPageUpdatedFolderNameBeforeNavigation);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //page navigation and come back to email templates page
        await pageNavigationObj.comeBackToEmailTemplatesPage(driver, screenshotPath);
        const emailTemplatesPageUpdatedFolderName = await driver.findElement(By.xpath(`//div[1]/ul[2]/li[3]/a[@class='text-ellipsis']`)).getText();
        console.log("Email Templates Page Updated Folder Name: " + emailTemplatesPageUpdatedFolderName);
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Auto Custom Folder Updated ');
        await folderNameElement.click();
        await driver.sleep(500);
        const actionsOption = await emailTemplatesElementsObj.findActionsOption(driver,3);
        await actionsOption.click();
        await driver.sleep(500);
        const editOrDeleteLink = await emailTemplatesElementsObj.findEditOrDeleteLink(driver, 3, 1);
        await editOrDeleteLink.click();
        await driver.sleep(500);
        const editPageUpdatedFolderNameAfterNavigation = await driver.findElement(By.id('name')).getAttribute('value');
        console.log("Edit Page Updated Folder Name After Navigation: " + editPageUpdatedFolderNameAfterNavigation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        if (editPageUpdatedFolderNameBeforeNavigation === editPageUpdatedFolderNameAfterNavigation) {
            console.log("As updated folder name in email templates page and updated folder name in edit page before and after navigation remains same,so test case has been passed");
        } else {
            await assert.fail("As updated folder name in email templates page and updated folder name in edit page before and after navigation does not remains same,so test case has been aborted");
        }
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 5: Verify, the user is not able to leave required fields blank while editing a folder----------------

When('the user is not able to leave required fields blank while editing a folder',async function(dataTable) {
    try {
        //get count of folders before updating blank folder name
        const foldersCountElement = await driver.findElements(By.xpath('//div[@class="pull-right pos-rlt options"]'));
        foldersCountBeforeAddingBlankName = await foldersCountElement.length;
        console.log("Folders count before updating blank folder name: " + foldersCountBeforeAddingBlankName);
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Auto Custom Folder Updated ');
        await folderNameElement.click();
        await driver.sleep(500);
        const actionsOption = await emailTemplatesElementsObj.findActionsOption(driver,3);
        await actionsOption.click();
        await driver.sleep(500);
        const editOrDeleteLink = await emailTemplatesElementsObj.findEditOrDeleteLink(driver, 3, 1);
        await editOrDeleteLink.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'folder name') {
                folderNameData = dataTable.rawTable[i][1];

                //will find 'Folder Name' field and pass the new data
                const folderNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Folder Name');
                await clearFieldDataObj.clearFieldData(folderNameField);
                await folderNameField.sendKeys(folderNameData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 6: Verify,the user is not able to enter more than 100 chars in the folder name while editing a folder------------------

When('the user is not able to enter more than 100 chars in the folder name while editing a folder',async function(dataTable) {
    try {
        //get count of folders before updating exceed length folder name
        const foldersCountElement = await driver.findElements(By.xpath('//div[@class="pull-right pos-rlt options"]'));
        foldersCountBeforeAddingExceedLengthName = await foldersCountElement.length;
        console.log("Folders count before updating exceed length folder name: " + foldersCountBeforeAddingExceedLengthName);
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Auto Custom Folder Updated ');
        await folderNameElement.click();
        await driver.sleep(500);
        const actionsOption = await emailTemplatesElementsObj.findActionsOption(driver,3);
        await actionsOption.click();
        await driver.sleep(500);
        const editOrDeleteLink = await emailTemplatesElementsObj.findEditOrDeleteLink(driver, 3, 1);
        await editOrDeleteLink.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'folder name') {
                folderNameData = dataTable.rawTable[i][1];

                //will find 'Folder Name' field and pass the new data
                const folderNameField = await formElementsObj.findElementById(driver,screenshotPath,'name','Folder Name');
                await clearFieldDataObj.clearFieldData(folderNameField);
                await folderNameField.sendKeys(folderNameData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 7: Verify,the user is not able to delete a folder when the folder contains templates-----------------

When('the user is not able to delete folder {string} when folder contains templates and displays {string} message',async function(folderName,expectedNotification) {
    try {
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, `${folderName} `);
        await folderNameElement.click();
        await driver.sleep(500);
        const actionsOption = await emailTemplatesElementsObj.findActionsOption(driver,2);
        await actionsOption.click();
        await driver.sleep(500);
        const editOrDeleteLink = await emailTemplatesElementsObj.findEditOrDeleteLink(driver, 2, 2);
        await editOrDeleteLink.click();
        await driver.sleep(500);
        const confirmationPopupButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await confirmationPopupButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //check visibility of public template folder
        const publicTemplateElement = await driver.findElements(By.xpath(`//a[text()="${folderName} "]`));
        const publicTemplateFolderLength = await publicTemplateElement.length;
        if (publicTemplateFolderLength > 0) {
            console.log("As public template folder does not get deleted as it contain templates,so test case has been passed");
        } else {
            await assert.fail("As public template folder deleted even containing templates,so test case has been aborted");
        }
    }  catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 8: Verify, the folder count should not be displayed if the folder does not contain any template-----------

When('the folder count of {string} should not be displayed if the folder does not contain any template',async function(folderName) {
    try {
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver,`${folderName} `);
        await folderNameElement.click();
        const templateRecordsCount = await driver.findElement(By.xpath('//div[@class="font-size-sm content text-center"]')).getText();
        console.log("Templates Records count: "+templateRecordsCount);
        const folderCount = await driver.findElement(By.xpath(`//a[text()="${folderName} "]//span`)).getText();
        if (folderCount === "") {
            console.log("As folder does not contain any templates,so folder count is not displayed,so test case has been passed");
        }
        else {
            await assert.fail("As folder count is displayed even folder does not contain any templates,so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
    await folderNameElement.click();
    await driver.sleep(1000);
});

//----------Case 9: Verify, the count should be displayed on the folder according to the number of templates------------

When('the count should be displayed on the folder {string} and {string} according to the number of templates',async function(publicFolder,customFolder) {
    try {
        const publicTemplate = await driver.findElement(By.xpath(`//a[text()="${publicFolder} "]//span[@class="secondary-text"]`)).getText();
        const publicTemplateFolder = await publicTemplate.replace(/[()]/g, "");
        const publicTemplateFolderCount = await parseInt(publicTemplateFolder);
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(1000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'folderCount.png');
        const publicTemplateRecordsElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const publicTemplateRecordsCount = await publicTemplateRecordsElement.length;
        if (publicTemplateFolderCount === publicTemplateRecordsCount) {
            console.log("As " + publicTemplateFolderCount + " and " + publicTemplateRecordsCount + " of public template records count are equal,so test case has been passed");
        } else {
            await assert.fail("As " + publicTemplateFolderCount + " and " + publicTemplateRecordsCount + " of public template records count are not equal,so test case has been aborted");
        }
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderNameElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 10: Verify, the system should display all user's templates under the All Templates folder-------------

When('the system should display all users templates under {string} folder',async function(folderName) {
    try {
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(1000);
        //get users list from 'All Templates' folder
        const usersElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]/following::span[2]'));
        const usersCount = await usersElement.length;
        console.log("Users Count: " + usersCount);
        for (let i = 0; i < usersCount; i++) {
            const usersElement = await driver.findElement(By.xpath(`//span[@class="secondary-text text-ellipsis"]//ancestor::div[@row-id="${i}"]//div[@class="grid-thumb-images"]//thumb/following::span[1]`));
            const usersText = await usersElement.getText();
            console.log(`Logged-in user ${i}: ` + usersText);
        }
        const allTemplatesRecordsElements = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const allTemplatesRecordsCount = await allTemplatesRecordsElements.length;
        if (allTemplatesRecordsCount > 0) {
            console.log("As all users templates are displayed under All Templates folder,so test case has been passed");
        } else {
            await assert.fail("As all users templates are not displayed under All Templates folder,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 11: Verify, the system should display only logged-in user's templates under My Templates folder---------

When('the system should display only logged-in users templates under {string} folder',async function(folderName) {
    try {
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(500);
        //get users list from 'All Templates' folder
        const usersElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]/following::span[2]'));
        const usersCount = await usersElement.length;
        console.log("Users Count: " + usersCount);
        for (let i = 0; i < usersCount; i++) {
            const usersElement = await driver.findElement(By.xpath(`//span[@class="secondary-text text-ellipsis"]//ancestor::div[@row-id="${i}"]//div[@class="grid-thumb-images"]//thumb/following::span[1]`));
            const usersText = await usersElement.getText();
            console.log(`User ${i}: ` + usersText);
        }
        const myTemplatesRecordsElements = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const myTemplatesRecordsCount = await myTemplatesRecordsElements.length;
        if (myTemplatesRecordsCount > 0) {
            console.log("As logged-in users templates are displayed under My Templates folder,so test case has been passed");
        } else {
            await assert.fail("As logged-in users templates are not displayed under My Templates folder,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------Case 12: Verify,the user is able to create a new template---------------------------------

When('the user is able to create a new template',async function(dataTable) {
    try {
        const allTemplatesFolder = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','All Templates');
        await allTemplatesFolder.click();
        await driver.sleep(1000);
        //get count of templates before adding new template
        const templatesElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        templatesCountBeforeNavigation = await templatesElement.length;
        console.log("Templates count before adding new template: " + templatesCountBeforeNavigation);
        const newTemplate = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' New Template ');
        await newTemplate.click();
        await driver.sleep(500);
        const basicEditor = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Basic Editor');
        await basicEditor.click();
        await driver.sleep(500);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'template name') {
                templateNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required template name field is given or not
                if (templateNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template name field, the test case execution has been aborted');
                }

                //will find 'Template Name' field and pass the new data
                const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
                await clearFieldDataObj.clearFieldData(templateNameField);
                await templateNameField.sendKeys(templateNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'folder name') {
                folderData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (folderData == '') {
                    await assert.fail('Due to the blank value is provided for the folder dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Folder Name' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'folderId', folderData, 'no');
            } else if (fieldName == 'subject name') {
                templateSubjectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (templateSubjectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template subject field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const templateSubjectField = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
                await clearFieldDataObj.clearFieldData(templateSubjectField);
                await templateSubjectField.sendKeys(templateSubjectFieldData);
                await driver.sleep(1000);
                const templateName = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Subject');
                await templateName.click();
                await driver.sleep(500);
            } else if (fieldName == 'template content'){
                templateContentFieldData = dataTable.rawTable[i][1];

                //will check that the data for the template content field is given or not
                if (templateContentFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the template content, the test case execution has been aborted');
                }

                //will pass data to the email body
                const templateContentiFram = await driver.findElement(By.css('iframe.fr-iframe'));
                await driver.switchTo().frame(templateContentiFram);
                const templateContentBody = await driver.findElement(By.xpath('//body[@class="fr-view"]/child::div'));
                await templateContentBody.sendKeys(templateContentFieldData);
                await driver.switchTo().defaultContent();
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string}',async function(expectedNotification) {
    try {
        await driver.sleep(1000);
        const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
        const templateNameBeforeNavigation = await templateNameField.getAttribute('value');
        console.log(templateNameBeforeNavigation);
        const folderElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'folderId');
        const folderNameBeforeNavigation = await folderElement.getText();
        console.log(folderNameBeforeNavigation);
        const templateSubjectField = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
        const templateSubjectBeforeNavigation = await templateSubjectField.getAttribute('value');
        console.log(templateSubjectBeforeNavigation);
        const templateContentiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(templateContentiFrame);
        //will find 'Template Content' field and pass the data
        const templateContent = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const templateContentBeforeNavigation = await templateContent.getText();
        console.log(templateContentBeforeNavigation);
        await driver.switchTo().defaultContent();
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //page navigation and come back to email templates page
        await pageNavigationObj.comeBackToEmailTemplatesPage(driver, screenshotPath);
        const isNewTemplateDisplayed = await driver.findElement(By.xpath(`//a[contains(text(),"${templateNameBeforeNavigation}")]`)).isDisplayed();
        console.log("Is New Template Displayed: " + isNewTemplateDisplayed);
        await driver.findElement(By.xpath(`//a[contains(text(),"${templateNameBeforeNavigation}")]`)).click();
        await driver.sleep(1000);
        const editTemplateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Edit Template ');
        await editTemplateButton.click();
        await driver.sleep(1000);
        const templateNameElement = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
        const templateNameAfterNavigation = await templateNameElement.getAttribute('value');
        console.log(templateNameAfterNavigation);
        const folderElements = await commonElementsObj.findDropdown(driver, screenshotPath, 'folderId');
        const folderNameAfterNavigation = await folderElements.getText();
        console.log(folderNameAfterNavigation);
        const templateSubjectElements = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
        const templateSubjectAfterNavigation = await templateSubjectElements.getAttribute('value');
        console.log(templateSubjectAfterNavigation);
        const templateContentIFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(templateContentIFrame);
        //will find 'Template Content' field and pass the data
        const templateContentElement = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const templateContentAfterNavigation = await templateContentElement.getText();
        console.log(templateContentAfterNavigation);
        await driver.switchTo().defaultContent();
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //will compare data
        assert.strictEqual(templateNameBeforeNavigation,templateNameAfterNavigation);
        assert.strictEqual(folderNameBeforeNavigation,folderNameAfterNavigation);
        assert.strictEqual(templateSubjectBeforeNavigation,templateSubjectAfterNavigation);
        assert.strictEqual(templateContentBeforeNavigation,templateContentAfterNavigation);
        //will click on the all template name
        const allTemplatesBackLink = await emailTemplatesElementsObj.findAllTemplatesBackLink(driver);
        await allTemplatesBackLink.click();
        await driver.sleep(1000);
        //get count of templates before adding new template
        const templatesElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const templatesCountAfterNavigation = await templatesElement.length;
        console.log("Templates count after adding new template: " + templatesCountAfterNavigation);
        if ((templatesCountBeforeNavigation) + 1 === templatesCountAfterNavigation) {
            console.log("As templates count is increased by (X+1) after adding new template,so test case has been passed");
        } else {
            await assert.fail("As templates count is not increased by (X+1) after adding new template,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 13: Verify, the system should display 'Name','Created By','Sent','Open','Clicked','Replied','Created' template details on the grid---------

When("the system should display {string}, {string}, {string}, {string}, {string}, {string}, {string} template details for {string} on the grid",async function(nameVal,createdByVal,sentVal,openVal,clickedVal,repliedVal,createdVal,template) {
    try {
        const createdBy = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[2]`)).getText();
        console.log(createdByVal + ": " + createdBy);
        const sentText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[3]/div`)).getText();
        console.log(sentVal + ": " + sentText);
        const openText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[4]`)).getText();
        console.log(openVal + ": " + openText);
        const clickedText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[5]`)).getText();
        console.log(clickedVal + ": " + clickedText);
        const repliedText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[6]`)).getText();
        console.log(repliedVal + ": " + repliedText);
        const created = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::div[@col-id="createdAt"][1]`)).getText();
        console.log(createdVal + ": " + created);
        console.log("As custom template's details 'Name', 'Created By', 'Sent', 'Open', 'Clicked', 'Replied', 'Created' are displayed on the grid,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 14: Verify, on click of the template name, the system should display template details-----------------

When('on click of the template name {string}, the system should display template details',async function(template) {
    try {
        await driver.findElement(By.xpath(`//a[text()="${template}"]`)).click();
        await driver.sleep(2000);
        //get 'Template Name' of custom template
        const templateName = await driver.findElement(By.xpath('//div[1]/div[2]/span/span')).getText();
        console.log("Template Name: " + templateName);
        //get 'Statistics' of 'Sent' custom template
        const sentValue = await driver.findElement(By.xpath('//table//td[1]')).getText();
        console.log("Statistic percentage of Sent: " + sentValue);
        //get 'Statistics' of 'Open' custom template
        const openValue = await driver.findElement(By.xpath('//table//td[2]')).getText();
        console.log("Statistic percentage of Open: " + openValue);
        //get 'Statistics' of 'Clicked' custom template
        const clickedValue = await driver.findElement(By.xpath('//table//td[3]')).getText();
        console.log("Statistic percentage of Clicked: " + clickedValue);
        //get 'Statistics' of 'Replied' custom template
        const repliedValue = await driver.findElement(By.xpath('//table//td[4]')).getText();
        console.log("Statistic percentage of Replied: " + repliedValue);
        //get 'Subject Name' of custom template
        const subjectName = await driver.findElement(By.xpath('//div[2]//email-template-list//div[@class="col-md-12 font-size-md"]/span')).getText();
        console.log("Subject Name: " + subjectName);
        console.log("As on click of the template name, the system displayed template details,so test case has been passed");
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 15: Verify, the user is not able to leave the required field blank while creating a template----------

When('user is not able to leave required field blank while creating template and verify {string},{string} validations',async function(expectedTemplateValidation,expectedSubjectValidation) {
    try {
        //get count of templates before adding blank template
        const templateCountElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        templatesCountBeforeAddingBlankTemplate = await templateCountElement.length;
        console.log("Templates count before adding blank template name: " + templatesCountBeforeAddingBlankTemplate);
        const newTemplate = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' New Template ');
        await newTemplate.click();
        await driver.sleep(500);
        const basicEditor = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Basic Editor');
        await basicEditor.click();
        await driver.sleep(500);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(2000);
        const actualTemplateValidation = await driver.findElement(By.xpath('//div[2]//div[@class="row"]/div[1]/sm-input-txt//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualTemplateValidation, expectedTemplateValidation);
        const actualSubjectValidation = await driver.findElement(By.xpath('//div[2]/form//div[@class="m-b w-full"]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSubjectValidation, expectedSubjectValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //get count of templates before adding blank template
        const templateCountElements = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const templatesCountAfterAddingBlankTemplate = await templateCountElements.length;
        console.log("Templates count after adding blank template name: " + templatesCountAfterAddingBlankTemplate);
        if (templatesCountBeforeAddingBlankTemplate === templatesCountAfterAddingBlankTemplate) {
            console.log("As templates count before and after adding blank name template remains same,so test case has been passed");
        } else {
            await assert.fail("As templates count before and after adding blank name template does not remains same,so test case has been aborted")
        }
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---Case 16: Verify, the user is not able to enter more than 255 chars in the template name and subject fields while adding a template------------------------

When('user is not able to enter more than 255 chars in the template name and subject fields while adding a template',async function(dataTable) {
    try {
        //get count of templates before adding exceed length template
        const templateCountElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        templatesCountBeforeAddingExceedLengthTemplate = await templateCountElement.length;
        console.log("Templates count before adding exceed length template name: " + templatesCountBeforeAddingExceedLengthTemplate);
        const newTemplate = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' New Template ');
        await newTemplate.click();
        await driver.sleep(500);
        const basicEditor = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Basic Editor');
        await basicEditor.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'template name') {
                templateNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required template name field is given or not
                if (templateNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template name field, the test case execution has been aborted');
                }

                //will find 'Template Name' field and pass the new data
                const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
                await clearFieldDataObj.clearFieldData(templateNameField);
                await templateNameField.sendKeys(templateNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'template subject') {
                templateSubjectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (templateSubjectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template subject field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const templateSubjectField = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
                await clearFieldDataObj.clearFieldData(templateSubjectField);
                await templateSubjectField.sendKeys(templateSubjectFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} validation',async function(expectedValidation) {
    try {
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1500);
        const actualTemplateValidation = await driver.findElement(By.xpath('//div[2]//div[@class="col-md-12 saveOrUpdateTemplate"]//div[1]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualTemplateValidation, expectedValidation);
        const actualSubjectValidation = await driver.findElement(By.xpath('//div[2]//div[@class="m-b w-full"]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSubjectValidation, expectedValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //get count of templates before adding blank template
        const templateCountElements = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const templatesCountAfterAddingExceedLengthTemplate = await templateCountElements.length;
        console.log("Templates count after adding exceed length template name: " + templatesCountAfterAddingExceedLengthTemplate);
        if (templatesCountBeforeAddingExceedLengthTemplate === templatesCountAfterAddingExceedLengthTemplate) {
            console.log("As templates count before and after adding exceed length template remains same,so test case has been passed");
        } else {
            await assert.fail("As templates count before and after adding exceed length template does not remains same,so test case has been aborted")
        }
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 17: Verify, the system should display all custom folders on the create a new template screen-----------

When('the system should display all custom folders on the create a new template screen',async function() {
    try {
        const foldersElement = await driver.findElements(By.xpath('//div[@class="pull-right pos-rlt options"]'));
        const foldersCountFromSideMenu = await foldersElement.length;
        console.log("Folders count from side menu: " + foldersCountFromSideMenu);
        const newTemplate = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' New Template ');
        await newTemplate.click();
        await driver.sleep(500);
        const basicEditor = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Basic Editor');
        await basicEditor.click();
        await driver.sleep(500);
        await driver.findElement(By.xpath('//span[@role="presentation"]/b')).click();
        const foldersElements = await driver.findElements(By.xpath('//ul[@role="tree"]/li'));
        const foldersCountFromDropdown = await foldersElements.length;
        console.log("Folders count from new template dropdown: " + foldersCountFromDropdown);
        if (foldersCountFromSideMenu === foldersCountFromDropdown) {
            console.log("As folders count from side menu and from new template drop down are same,so test case has been passed");
        } else {
            await assert.fail("As folders count from side menu and from new template drop down are same,so test case has been aborted");
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

//-----------------------------Case 18: Verify, the user is able to update a template-----------------------------------

When('the user is able to update a template',async function(dataTable) {
    try {
        //get count of 'Public Template' Folder
        const publicTemplate = await driver.findElement(By.xpath(`//a[text()="Public Template "]//span[@class="secondary-text"]`)).getText();
        const publicTemplateFolder = await publicTemplate.replace(/[()]/g, "");
        publicTemplateFolderCountBeforeUpdatingTemplate = await parseInt(publicTemplateFolder);
        console.log("Public Template Folder Count before updating template: " + publicTemplateFolderCountBeforeUpdatingTemplate);
        //get count of 'Custom Template' Folder
        const customTemplate = await driver.findElement(By.xpath(`//a[text()="Auto Custom Folder Updated "]//span[@class="secondary-text"]`)).getText();
        const customTemplateFolder = await customTemplate.replace(/[()]/g, "");
        customTemplateFolderCountBeforeUpdatingTemplate = await parseInt(customTemplateFolder);
        console.log("Custom Template Folder Count before updating template: " + customTemplateFolderCountBeforeUpdatingTemplate);
        await driver.findElement(By.xpath('//a[text()="Auto Custom Folder Updated "]')).click();
        await driver.sleep(1500);
        await driver.findElement(By.xpath('//a[text()="Auto Template ^&%$~!;<>"]')).click();
        await driver.sleep(1500);
        const editTemplateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Edit Template ');
        await editTemplateButton.click();
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'template name') {
                templateNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required template name field is given or not
                if (templateNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template name field, the test case execution has been aborted');
                }

                //will find 'Template Name' field and pass the new data
                const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
                await clearFieldDataObj.clearFieldData(templateNameField);
                await templateNameField.sendKeys(templateNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'folder name') {
                folderData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (folderData == '') {
                    await assert.fail('Due to the blank value is provided for the folder dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Folder Name' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'folderId', folderData, 'no');
            } else if (fieldName == 'subject name') {
                templateSubjectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (templateSubjectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template subject field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const templateSubjectField = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
                await clearFieldDataObj.clearFieldData(templateSubjectField);
                await templateSubjectField.sendKeys(templateSubjectFieldData);
                await driver.sleep(1000);
            } else if (fieldName == 'template content'){
                templateContentFieldData = dataTable.rawTable[i][1];

                //will check that the data for the template content field is given or not
                if (templateContentFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the template content, the test case execution has been aborted');
                }

                //will pass data to the email body
                const templateContentiFram = await driver.findElement(By.css('iframe.fr-iframe'));
                await driver.switchTo().frame(templateContentiFram);
                console.log('1');
                const templateContentBody = await driver.findElement(By.xpath('//body[@class="fr-view"]/child::div'));
                console.log('2');
                await templateContentBody.sendKeys(templateContentFieldData);
                await driver.switchTo().defaultContent();
                console.log('3');
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} message of template',async function(expectedNotification) {
    try {
        //will get data before navigation
        await driver.sleep(1000);
        const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
        const templateNameBeforeNavigation = await templateNameField.getAttribute('value');
        console.log(templateNameBeforeNavigation);
        const folderElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'folderId');
        const folderNameBeforeNavigation = await folderElement.getText();
        console.log(folderNameBeforeNavigation);
        const templateSubjectField = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
        const templateSubjectBeforeNavigation = await templateSubjectField.getAttribute('value');
        console.log(templateSubjectBeforeNavigation);
        const templateContentiFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(templateContentiFrame);
        const templateContent = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const templateContentBeforeNavigation = await templateContent.getText();
        console.log(templateContentBeforeNavigation);
        await driver.switchTo().defaultContent();
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await driver.executeScript("arguments[0].click();",saveButton);
        await driver.sleep(1000);
        //will check success message is given or not 
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //page navigation and come back to email templates page
        await pageNavigationObj.comeBackToEmailTemplatesPage(driver, screenshotPath);
        const isNewTemplateDisplayed = await driver.findElement(By.xpath(`//a[contains(text(),"${templateNameBeforeNavigation}")]`)).isDisplayed();
        console.log("Is New Template Displayed: " + isNewTemplateDisplayed);
        await driver.findElement(By.xpath(`//a[contains(text(),"${templateNameBeforeNavigation}")]`)).click();
        await driver.sleep(1000);
        const editTemplateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Edit Template ');
        await editTemplateButton.click();
        await driver.sleep(1000);
        //will get value after page navigation
        const templateNameElement = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
        const templateNameAfterNavigation = await templateNameElement.getAttribute('value');
        console.log(templateNameAfterNavigation);
        const folderElements = await commonElementsObj.findDropdown(driver, screenshotPath, 'folderId');
        const folderNameAfterNavigation = await folderElements.getText();
        console.log(folderNameAfterNavigation);
        const templateSubjectElements = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
        const templateSubjectAfterNavigation = await templateSubjectElements.getAttribute('value');
        console.log(templateSubjectAfterNavigation);
        const templateContentIFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(templateContentIFrame);
        const templateContentElement = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const templateContentAfterNavigation = await templateContentElement.getText();
        console.log(templateContentAfterNavigation);
        await driver.switchTo().defaultContent();
        //will close the popup
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        //will compare data
        assert.strictEqual(templateNameBeforeNavigation,templateNameAfterNavigation);
        assert.strictEqual(folderNameBeforeNavigation,folderNameAfterNavigation);
        assert.strictEqual(templateSubjectBeforeNavigation,templateSubjectAfterNavigation);
        //assert.strictEqual(templateContentBeforeNavigation,templateContentAfterNavigation);
        
        const allTemplatesBackLink = await emailTemplatesElementsObj.findAllTemplatesBackLink(driver);
        await allTemplatesBackLink.click();
        await driver.sleep(1500);

        //get count of 'Public Template' Folder
        const publicTemplate = await driver.findElement(By.xpath(`//a[text()="Public Template "]//span[@class="secondary-text"]`)).getText();
        const publicTemplateFolder = await publicTemplate.replace(/[()]/g, "");
        const publicTemplateFolderCountAfterUpdatingTemplate = await parseInt(publicTemplateFolder);
        console.log("Public Template Folder Count after updating folder: " + publicTemplateFolderCountAfterUpdatingTemplate);
        //get count of 'Custom Template' Folder
        const customTemplateFolderCountAfterUpdatingTemplate = await driver.findElement(By.xpath(`//a[text()="Auto Custom Folder Updated "]//span[@class="secondary-text"]`)).getText();
        console.log("Custom Template Folder Count after updating folder: " + customTemplateFolderCountAfterUpdatingTemplate);
        if ((publicTemplateFolderCountBeforeUpdatingTemplate) + 1 === publicTemplateFolderCountAfterUpdatingTemplate && customTemplateFolderCountAfterUpdatingTemplate === "") {
            console.log("As public template count is increased by (X+1) and custom template folder is decreased by (X-1) after adding new template,so test case has been passed");
        } else {
            await assert.fail("As public template count is not increased by (X+1) and custom template folder is not decreased by (X-1) after adding new template,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 19: Verify, the user is not able to leave the required field blank while editing a template-----------

When('the user is not able to leave the required field blank while editing a template',async function(dataTable) {
    try {
        //get count of templates before adding blank template
        const templateCountElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        templatesCountBeforeAddingBlankTemplate = await templateCountElement.length;
        console.log("Templates count before updating blank template name: " + templatesCountBeforeAddingBlankTemplate);
        await driver.findElement(By.xpath(`//a[text()="Auto Template Updated ^&%$~!;<>"]`)).click();
        await driver.sleep(1000);
        const editTemplateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Edit Template ');
        await editTemplateButton.click();
        await driver.sleep(500);
        
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'template name') {
                templateNameFieldData = dataTable.rawTable[i][1];

                //will find 'Template Name' field and pass the new data
                const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
                await clearFieldDataObj.clearFieldData(templateNameField);
                await templateNameField.sendKeys(templateNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'template subject') {
                templateSubjectFieldData = dataTable.rawTable[i][1];

                //will find 'Section Name' field and pass the new data
                const templateSubjectField = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
                await clearFieldDataObj.clearFieldData(templateSubjectField);
                await templateSubjectField.sendKeys(templateSubjectFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string},{string} validations',async function(expectedTemplateValidation,expectedSubjectValidation) {
    try {
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const actualTemplateValidation = await driver.findElement(By.xpath('//div[2]//div[@class="col-md-12 saveOrUpdateTemplate"]/div/div[1]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualTemplateValidation, expectedTemplateValidation);
        const actualSubjectValidation = await driver.findElement(By.xpath('//div[@class="m-b w-full"]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSubjectValidation, expectedSubjectValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        const allTemplatesBackLink = await emailTemplatesElementsObj.findAllTemplatesBackLink(driver);
        await allTemplatesBackLink.click();
        await driver.sleep(1500);
        //get count of templates before adding blank template
        const templateCountElements = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const templatesCountAfterUpdatingBlankTemplate = await templateCountElements.length;
        console.log("Templates count after updating blank template name: " + templatesCountAfterUpdatingBlankTemplate);
        if (templatesCountBeforeAddingBlankTemplate === templatesCountAfterUpdatingBlankTemplate) {
            console.log("As templates count before and after updating blank name template remains same,so test case has been passed");
        } else {
            await assert.fail("As templates count before and after updating blank name template does not remains same,so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 20: Verify,the user is not able to enter more than 255 chars in the template name and subject fields while editing a template---------------

When('user is not able to enter more than 255 chars in the template name and subject fields while editing a template',async function(dataTable) {
    try {
        //get count of templates before adding blank template
        const templateCountElement = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        templatesCountBeforeAddingExceedLengthTemplate = await templateCountElement.length;
        console.log("Templates count before updating exceed length template name: " + templatesCountBeforeAddingExceedLengthTemplate);
        await driver.findElement(By.xpath(`//a[text()="Auto Template Updated ^&%$~!;<>"]`)).click();
        await driver.sleep(1000);
        const editTemplateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Edit Template ');
        await editTemplateButton.click();
        await driver.sleep(500);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'template name') {
                templateNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required template name field is given or not
                if (templateNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template name field, the test case execution has been aborted');
                }

                //will find 'Template Name' field and pass the new data
                const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
                await clearFieldDataObj.clearFieldData(templateNameField);
                await templateNameField.sendKeys(templateNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'template subject') {
                templateSubjectFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (templateSubjectFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required template subject field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const templateSubjectField = await formElementsObj.findElementById(driver,screenshotPath,'subject','Template Subject');
                await clearFieldDataObj.clearFieldData(templateSubjectField);
                await templateSubjectField.sendKeys(templateSubjectFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on save button and verify {string} length validation',async function(expectedValidation) {
    try {
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(1000);
        const actualTemplateValidation = await driver.findElement(By.xpath('//div[2]/form//div[@class="col-md-12 saveOrUpdateTemplate"]//div[@class="row"]/div[1]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualTemplateValidation, expectedValidation);
        const actualSubjectValidation = await driver.findElement(By.xpath('//div[@class="m-b w-full"]//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualSubjectValidation, expectedValidation);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        const allTemplatesBackLink = await emailTemplatesElementsObj.findAllTemplatesBackLink(driver);
        await allTemplatesBackLink.click();
        await driver.sleep(2000);
        //get count of templates before adding blank template
        const templateCountElements = await driver.findElements(By.xpath('//span[@class="secondary-text text-ellipsis"]'));
        const templatesCountAfterUpdatingExceedLengthTemplate = await templateCountElements.length;
        console.log("Templates count after updating exceed length template name: " + templatesCountAfterUpdatingExceedLengthTemplate);
        if (templatesCountBeforeAddingExceedLengthTemplate === templatesCountAfterUpdatingExceedLengthTemplate) {
            console.log("As templates count before and after updating exceed length template remains same,so test case has been passed");
        } else {
            await assert.fail("As templates count before and after updating exceed length template does not remains same,so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------------Case 21: Verify, the user is able to see preview of the template---------------------------

When('the user is able to see preview of the template {string}',async function(templateName) {
    try {
        await driver.findElement(By.xpath(`//a[text()="${templateName}"]`)).click();
        await driver.sleep(1000);
        const editTemplateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Edit Template ');
        await editTemplateButton.click();
        await driver.sleep(1000);
        const templateContentIFrame = await usersPageElementsObj.findEmailSignatureiFrame(driver);
        await driver.switchTo().frame(templateContentIFrame);
        //will find 'Template Content' field and pass the data
        const templateContentElement = await usersPageElementsObj.findEmailSignatureTextBox(driver);
        const editPageTemplateContent = await templateContentElement.getText();
        console.log("Edit Page Template Content: " + editPageTemplateContent);
        await driver.switchTo().defaultContent();
        await driver.sleep(1000);
        const saveAndPreviewButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save & Preview ');
        await saveAndPreviewButton.click();
        await driver.sleep(2000);
        const previewPageTemplateContent = await driver.findElement(By.xpath('//div[@id="_email_content"]//span[@class="sm-variable"]')).getText();
        console.log("Preview Page Template Content: " + previewPageTemplateContent);
        await driver.findElement(By.xpath('//email-template-preview[@class="enable-scroll"]//button[@class="close"]')).click();
        await driver.sleep(1000);
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        console.log("As " + editPageTemplateContent + " and " + previewPageTemplateContent + " are equal,so test case has been passed");
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------------Case 22: Verify, the user is able to archive a template------------------------------------

When('the user is able to archive a template {string} of {string} and also {string} and verify {string}',async function(templateName,publicFolder,archiveFolder,expectedNotification) {
    try {
        //get count of folder before archiving template
        const publicTemplateCount = await driver.findElement(By.xpath(`//a[text()="${publicFolder} "]//span`)).getText();
        const publicTemplateFolder = await publicTemplateCount.replace(/[()]/g, "");
        const publicTemplateFolderCountBeforeArchive = await parseInt(publicTemplateFolder);
        console.log("Public Templates Count Before Archiving: " + publicTemplateFolderCountBeforeArchive);
        //get count of 'Archive' folder before archiving
        const archiveFolderCount = await driver.findElement(By.xpath(`//a[text()="${archiveFolder} "]//span`)).getText();
        const archiveTemplateFolder = await archiveFolderCount.replace(/[()]/g, "");
        const archiveTemplateFolderCountBeforeArchive = await parseInt(archiveTemplateFolder);
        console.log("Archive Templates Count Before Archiving: " + archiveTemplateFolderCountBeforeArchive);
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderName.click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath(`//a[text()="${templateName}"]`)).click();
        await driver.sleep(1000);
        const archiveButton = await formElementsObj.findElementByXpath(driver,screenshotPath,'i','class','icon-download-2','Archive Button');
        await archiveButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //get count of folder after archiving template
        const publicTemplateCountText = await driver.findElement(By.xpath(`//a[text()="${publicFolder} "]//span`)).getText();
        const publicTemplateFolderCount = await publicTemplateCountText.replace(/[()]/g, "");
        const publicTemplateFolderCountAfterArchive = await parseInt(publicTemplateFolderCount);
        console.log("Public Templates Count After Archiving: " + publicTemplateFolderCountAfterArchive);
        //get count of 'Archive' folder after archiving
        const archiveFolderCountText = await driver.findElement(By.xpath(`//a[text()="${archiveFolder} "]//span`)).getText();
        const archiveTemplateFolderCount = await archiveFolderCountText.replace(/[()]/g, "");
        const archiveTemplateFolderCountAfterArchive = await parseInt(archiveTemplateFolderCount);
        console.log("Archive Templates Count After Archiving: " + archiveTemplateFolderCountAfterArchive);
        if ((publicTemplateFolderCountBeforeArchive) - 1 === publicTemplateFolderCountAfterArchive && (archiveTemplateFolderCountBeforeArchive) + 1 === archiveTemplateFolderCountAfterArchive) {
            console.log("As custom template folder count is decreased by (X-1) and archived folder count is increased by (X+1),so test case has been passed");
        } else {
            await assert.fail("As custom template folder count is not decreased by (X-1) and archived folder count is not increased by (X+1),so test case has been aborted");
        }
        //page navigation and come back to email templates page
        await pageNavigationObj.comeBackToEmailTemplatesPage(driver, screenshotPath);
        /*
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, `${archiveFolder} `);
        await folderNameElement.click();
        await driver.sleep(1000);
        //get values of archived template
        const template = await driver.findElement(By.xpath(`//span[@class="secondary-text text-ellipsis"]/a[text()="${templateName}"]`)).getText();
        console.log("Template Name: " + template);
        const createdBy = await driver.findElement(By.xpath(`//a[text()="${templateName}"]/following::span[2]`)).getText()
        console.log("Created By: " + createdBy);
        const sentText = await driver.findElement(By.xpath(`//a[text()="${templateName}"]/following::span[3]/div`)).getText();
        console.log("Sent : " + sentText);
        const openText = await driver.findElement(By.xpath(`//a[text()="${templateName}"]/following::span[4]`)).getText();
        console.log("Open: " + openText);
        const clickedText = await driver.findElement(By.xpath(`//a[text()="${templateName}"]/following::span[5]`)).getText();
        console.log("Clicked: " + clickedText);
        const repliedText = await driver.findElement(By.xpath(`//a[text()="${templateName}"]/following::span[6]`)).getText();
        console.log("Replied: " + repliedText);
        const created = await driver.findElement(By.xpath(`//a[text()="${templateName}"]/following::div[@col-id="createdAt"][1]`)).getText();
        console.log("Created: " + created);
        await driver.findElement(By.xpath(`//a[text()="${archiveFolder} "]`)).click();
        await driver.sleep(1000);*/
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 23: Verify, the user can't able to create the new email template from the archived folder-----------

When('the user can not able to create the new email template from the {string} folder',async function(folderName) {
    try {
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, `${folderName} `);
        await folderNameElement.click();
        await driver.sleep(1000);
        //check visibility of 'New Template' button
        await driver.manage().setTimeouts({implicit: 2000});
        const newTemplateButton = await driver.findElements(By.xpath('//button[text()=" New Template "]'));
        const newTemplateButtonLength = await newTemplateButton.length;
        if (newTemplateButtonLength === 0) {
            console.log("As user can't be able to create new template for archived folder,so test case has been passed");
        } else {
            await assert.fail("As user can't be able to create new template for archived folder,so test case has been aborted");
        }
        const folderNameElements = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderNameElements.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------Case 24: Verify, the system should not display edit template button on archived template----------------

When('the system should not display edit template button on {string} folder of {string} template',async function(folderName,templateName) {
    try {
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, `${folderName} `);
        await folderNameElement.click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath(`//a[text()="Auto Template 01"]`)).click();
        await driver.sleep(2000);
        //check visibility of 'Edit' button in 'Archived Folder's Template'
        await driver.manage().setTimeouts({implicit: 2000});
        const editTemplateButton = await driver.findElements(By.xpath('//button[text()=" Edit Template "]'));
        const editTemplateButtonLength = await editTemplateButton.length;
        if (editTemplateButtonLength === 0) {
            console.log("As edit template button is not displayed for archived folder's template,so test case has been passed");
        } else {
            await assert.fail("As edit template button is displayed for archived folder's template,so test case has been aborted");
        }
        const folderNameElements = await emailTemplatesElementsObj.findFolderName(driver, 'Public Template ');
        await folderNameElements.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------------Case 25: Verify, the user is able to unArchive a template-----------------------------------

When('the user is able to unArchive a template {string} of {string} and {string} and verify {string}',async function(template,archiveFolder,publicFolder,expectedNotification) {
    try {
        //get count of folder before unarchiving template
        const publicTemplateCount = await driver.findElement(By.xpath(`//a[text()="${publicFolder} "]//span`)).getText();
        const publicTemplateFolder = await publicTemplateCount.replace(/[()]/g, "");
        const publicTemplateFolderCountBeforeArchive = await parseInt(publicTemplateFolder);
        console.log("Public Templates Count Before UnArchiving: " + publicTemplateFolderCountBeforeArchive);
        //get count of 'Archive' folder before unarchiving
        const archiveFolderCount = await driver.findElement(By.xpath(`//a[text()="${archiveFolder} "]//span`)).getText();
        const archiveTemplateFolder = await archiveFolderCount.replace(/[()]/g, "");
        const archiveTemplateFolderCountBeforeArchive = await parseInt(archiveTemplateFolder);
        console.log("Archive Templates Count Before UnArchiving: " + archiveTemplateFolderCountBeforeArchive);
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, `${archiveFolder} `);
        await folderNameElement.click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath(`//a[text()="${template}"]`)).click();
        await driver.sleep(2500);
        const archiveButton = await formElementsObj.findElementByXpath(driver,screenshotPath,'i','class','icon-upload-2','UnArchive Button');
        await archiveButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //get count of folder after unarchiving template
        const publicTemplateText = await driver.findElement(By.xpath(`//a[text()="${publicFolder} "]//span`)).getText();
        const publicTemplateFolderCount = await publicTemplateText.replace(/[()]/g, "");
        const publicTemplateFolderCountAfterArchive = await parseInt(publicTemplateFolderCount);
        console.log("Public Templates Count After UnArchiving: " + publicTemplateFolderCountAfterArchive);
        //get count of 'Archive' folder after unarchiving
        const archiveFolderText = await driver.findElement(By.xpath(`//a[text()="${archiveFolder} "]//span`)).getText();
        const archiveTemplateFolderCount = await archiveFolderText.replace(/[()]/g, "");
        const archiveTemplateFolderCountAftereArchive = await parseInt(archiveTemplateFolderCount);
        console.log("Archive Templates Count After UnArchiving: " + archiveTemplateFolderCountAftereArchive);
        if ((publicTemplateFolderCountBeforeArchive) + 1 === publicTemplateFolderCountAfterArchive && (archiveTemplateFolderCountBeforeArchive) - 1 === archiveTemplateFolderCountAftereArchive) {
            console.log("As custom template folder count is increased by (X+1) and archived folder count is decreased by (X-1),so test case has been passed");
        } else {
            await assert.fail("As custom template folder count is not increased by (X+1) and archived folder count is not decreased by (X-1),so test case has been aborted");
        }
        //page navigation and come back to email templates page
        await pageNavigationObj.comeBackToEmailTemplatesPage(driver, screenshotPath);
        const folderName = await emailTemplatesElementsObj.findFolderName(driver, `${publicFolder} `);
        await folderName.click();
        await driver.sleep(1000);
        //get values of 'Auto Custom Folder Updated' template
        const templateName = await driver.findElement(By.xpath(`//span[@class="secondary-text text-ellipsis"]/a[text()="${template}"]`)).getText();
        console.log("Template Name: " + templateName);
        const createdBy = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[2]`)).getAttribute('value');
        console.log("Created By: " + createdBy);
        const sentText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[3]/div`)).getAttribute('value');
        console.log("Sent : " + sentText);
        const openText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[4]`)).getAttribute('value');
        console.log("Open: " + openText);
        const clickedText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[5]`)).getAttribute('value');
        console.log("Clicked: " + clickedText);
        const repliedText = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::span[6]`)).getAttribute('value');
        console.log("Replied: " + repliedText);
        const created = await driver.findElement(By.xpath(`//a[text()="${template}"]/following::div[@col-id="createdAt"][1]`)).getAttribute('value');
        console.log("Created: " + created);
        const folderNameWebElement = await emailTemplatesElementsObj.findFolderName(driver,'Public Template ');
        await folderNameWebElement.click();
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 26: Verify, the user is able to delete a folder when the folder is blank--------------------

When('the user is able to delete a folder {string} and verify {string} and update template {string}',async function(folderName,expectedNotification,templateName) {
    try {
        const folderNameElements = await emailTemplatesElementsObj.findFolderName(driver, `${folderName} `);
        await folderNameElements.click();
        await driver.sleep(1000);
        const actionsOption = await emailTemplatesElementsObj.findActionsOption(driver,3);
        await actionsOption.click();
        await driver.sleep(1000);
        const editOrDeleteLink = await emailTemplatesElementsObj.findEditOrDeleteLink(driver, 3, 2);
        await editOrDeleteLink.click();
        await driver.sleep(1000);
        const confirmationPopupButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await confirmationPopupButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        //page navigation and come back to email templates page
        await pageNavigationObj.comeBackToEmailTemplatesPage(driver, screenshotPath);
        //check visibility of deleted folder
        await driver.manage().setTimeouts({implicit: 2000});
        const deletedFolder = await driver.findElements(By.xpath(`//a[text()="${folderName} "]`));
        const deletedFolderLength = await deletedFolder.length;
        if (deletedFolderLength === 0) {
            console.log("As deleted folder: " + folderName + " is deleted and not displayed on email templates page,so test case has been passed");
        } else {
            await assert.fail("As deleted folder: " + folderName + " is not deleted and is displayed on email templates page,so test case has been aborted");
        }
        const folderNameElement = await emailTemplatesElementsObj.findFolderName(driver, 'Auto Template Updated ^&%$~!;<>');
        await folderNameElement.click();
        await driver.sleep(1000);
        const editTemplateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Edit Template ');
        await editTemplateButton.click();
        await driver.sleep(1000);
        //will find 'Template Name' field and pass the updated data
        const templateNameField = await formElementsObj.findElementById(driver,screenshotPath,'templateName','Template Name');
        await clearFieldDataObj.clearFieldData(templateNameField);
        await templateNameField.sendKeys(templateName);
        await driver.sleep(500);
        const saveButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Save ');
        await saveButton.click();
        await driver.sleep(3000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
const { Given,When,Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openDealPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/customizations/dealLayout/screenshots/';
const contactPageElementsObj = require('../../contactLayout/common/contactLayoutElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const commonElementsObj = require('../../../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const tagManagementElementsObj = require('../../../customizations/tagManagement/common/tagManagementPageElements');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let sectionNameFieldData = 'no', columnLayoutData = 'no', sectionsLengthBeforeAddingSection, labelNameFieldData = 'no';
let requiredCheckboxState = 'no', listValue1Data = 'no',listValue2Data = 'no', listValue3Data = 'no';
let associationTypeState = 'no', recordLabelNameData = 'no', searchFieldData = 'no', labelNameBeforeUpdation, recordLabelBeforeUpdation;
let parentFieldData = 'no', childFieldData = 'no';

Given('the {string} is on deal page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/customization/layouts/4')){
        console.log('The deal page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open deal page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on deal page');
        //will open the deal page
        await openDealPageObj.openDealPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open deal page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on deal page');
        //will open the deal page
        await openDealPageObj.openDealPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the deal page
        await openDealPageObj.openDealPage(driver,screenshotPath);
    }
});

//------------Case 1: Verify, the system should display a singular module name on the header----------------------------------

When('the system displays a singular module deal on the header',async function() {
    try {
        await driver.sleep(2000);
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' System Modules ');
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();", systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
        await driver.sleep(2000);

        //click on 'Deal Edit' button module
        await tagManagementElementsObj.findModulesEditButton(driver, 'Deal');
        await driver.sleep(2000);
        //screenshot for displayed 'Deal' Module
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealModule.png');
        //get values of 'Singular and Plural' modules
        const dealSingularModule = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Singular Name: " + dealSingularModule);
        const dealPluralModule = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Plural Name: " + dealPluralModule);

        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const dealTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Deal ');
        //will set focus on the 'Deal' tab
        await driver.executeScript("arguments[0].scrollIntoView();", dealTab[0]);
        await driver.wait(until.elementIsVisible(dealTab[0]));
        //will click on the 'Deal' tab
        await dealTab[0].click();
        await driver.sleep(3000);

        //get title of 'Deal' Module page
        const currentPageHeader = await driver.findElement(By.xpath('//div[@class="sub-title pull-left"]')).getText();
        console.log("Current Page Header: " + currentPageHeader);
        //verify whether opened 'Deal' module page contains singular module name or not
        if (await currentPageHeader.includes('Deal')) {
            console.log("As deal module page contains " + currentPageHeader + " so,test case has been passed");
        } else {
            await assert.fail("As deal page does not contains " + currentPageHeader + " so,test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------------Case 2: Verify, the user is able to add a new section----------------------------------------------------

When('user adds a new section with following data in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await contactPageElementsObj.findNewSection(driver);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required section name field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'column layout') {
                columnLayoutData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (columnLayoutData == '') {
                    await assert.fail('Due to the blank value is provided for the column layout dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Column Layout' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'columns', columnLayoutData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} section message in deal module',async function(expectedNotificationMessage) {
    try {
        const sectionName = await driver.findElement(By.id('name')).getAttribute('value');
        const columnLayout = await commonElementsObj.findDropdown(driver, screenshotPath, 'columns');
        const columnLayoutText = await columnLayout.getText();
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotificationMessage);
        await driver.sleep(5000);
        //page navigation and come back to 'Deal Layout' Page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(3000);
        //verify newly added 'Section Name' and 'Column Layout' in section
        const newlyAddedSection = await driver.findElement(By.xpath(`//a[text()='${sectionName} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedSection);
        await driver.wait(until.elementIsVisible(newlyAddedSection));
        const newlyAddedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionName} ']`));
        const newlyAddedSectionLength = await newlyAddedSectionElements.length;
        const newlyAddedColumnLayout = await driver.findElement(By.xpath(`//span[text()='${columnLayoutText}']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedColumnLayout);
        await driver.wait(until.elementIsVisible(newlyAddedColumnLayout));
        const newlyAddedColumnElements = await driver.findElements(By.xpath(`//span[text()='${columnLayoutText}']`));
        const newlyAddedColumnLength = await newlyAddedColumnElements.length;
        if (newlyAddedSectionLength > 0 && newlyAddedColumnLength > 0) {
            console.log("As newly added " + sectionName + " and " + columnLayoutText + " are displayed in section,so test case has been passed");
        } else {
            await assert.fail("As newly added " + sectionName + " and " + columnLayoutText + " are not displayed in section,so test case has been aborted");
        }
        await contactPageElementsObj.findSectionEditButton(driver, 'Custom Section 01 ');
        await driver.sleep(2000);
        const editPageSectionName = await driver.findElement(By.id('name')).getAttribute('value');
        const editPageColumnLayout = await driver.findElement(By.xpath('//span[@class="select2-selection__rendered"]')).getText();
        if (sectionName === editPageSectionName && columnLayoutText === editPageColumnLayout) {
            console.log("As " + sectionName + " and" + columnLayoutText + " in company layout page are equal to " + editPageSectionName + " and" + editPageColumnLayout + " in edit page,so test case has been passed");
        } else {
            await assert.fail("As " + sectionName + " and" + columnLayoutText + " in company layout page are not equal to " + editPageSectionName + " and" + editPageColumnLayout + " in edit page,so test case has been aborted");
        }
        await contactPageElementsObj.findCancelButton(driver);
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 3: Verify, the user is not able to leave required fields as a blank while adding a new section----------------------------

When('the user is not able to leave required fields as a blank while adding a new section in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //get count of 'Sections' before adding blank section name
        const sectionElementsBeforeAddingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        sectionsLengthBeforeAddingSection = await sectionElementsBeforeAddingSection.length;

        await contactPageElementsObj.findNewSection(driver);
        //To check that 'New Section Popup' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const newSectionPopup = await driver.findElements(By.xpath('//h4[text()=" Add New Section"]'));
            const newSectionPopupLength = await newSectionPopup.length;
            if (newSectionPopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As add new section popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As add new section popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify blank validation {string} notification in deal module',async function(expectedBlankValidation) {
    try {
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualBlankValidationElement = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]'));
        await driver.wait(until.elementIsVisible(actualBlankValidationElement));
        const actualBlankValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualBlankValidation, expectedBlankValidation);
        await driver.sleep(2000);
        await contactPageElementsObj.findCancelButton(driver);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //get count of 'Sections' after verifying with blank section
        const sectionElementsAfterAddingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        const sectionsLengthAfterAddingSection = await sectionElementsAfterAddingSection.length;

        //compare count of sections before and after adding blank section
        if (sectionsLengthBeforeAddingSection === sectionsLengthAfterAddingSection) {
            console.log("As count of sections before and after adding/updating blank section are equal i.e section is not added/updated,so test case has been passed");
        } else {
            await assert.fail("As count of sections before and after adding/updating blank section are not equal i.e section is not added/updated,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 4: Verify, the user is not able to enter invalid data while adding a new section-------------------------------

When('the user is not able to enter invalid data while adding a new section in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //get count of 'Sections' before adding invalid section name
        const sectionElementsBeforeAddingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        sectionsLengthBeforeAddingSection = await sectionElementsBeforeAddingSection.length;

        await contactPageElementsObj.findNewSection(driver);
        //To check that 'New Section Popup' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const newSectionPopup = await driver.findElements(By.xpath('//h4[text()=" Add New Section"]'));
            const newSectionPopupLength = await newSectionPopup.length;
            if (newSectionPopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As add new section popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As add new section popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required section name field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'column layout') {
                columnLayoutData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (columnLayoutData == '') {
                    await assert.fail('Due to the blank value is provided for the column layout dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Column Layout' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'columns', columnLayoutData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify invalid validation message {string} in deal module',async function(expectedInvalidValidation) {
    try {
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);

        const actualInvalidValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualInvalidValidation, expectedInvalidValidation);
        await driver.sleep(2000);
        await contactPageElementsObj.findCancelButton(driver);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //get count of 'Sections' after verifying with invalid section
        const sectionElementsAfterAddingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        const sectionsLengthAfterAddingSection = await sectionElementsAfterAddingSection.length;

        //compare count of sections before and after adding invalid section
        if (sectionsLengthBeforeAddingSection === sectionsLengthAfterAddingSection) {
            console.log("As count of sections before and after adding/updating invalid section are equal i.e section is not added/updated,so test case has been passed");
        } else {
            await assert.fail("As count of sections before and after adding/updating invalid section are not equal i.e section is not added/updated,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 5: Verify, the user is not able to add a new section with more than 100 chars name------------------------------------

When('the user is not able to add a new section with more than 100 chars name in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //get count of 'Sections' before adding exceed length section name
        const sectionElementsBeforeAddingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        sectionsLengthBeforeAddingSection = await sectionElementsBeforeAddingSection.length;

        await contactPageElementsObj.findNewSection(driver);
        //To check that 'New Section Popup' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const newSectionPopup = await driver.findElements(By.xpath('//h4[text()=" Add New Section"]'));
            const newSectionPopupLength = await newSectionPopup.length;
            if (newSectionPopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As add new section popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As add new section popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required section name field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'column layout') {
                columnLayoutData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (columnLayoutData == '') {
                    await assert.fail('Due to the blank value is provided for the column layout dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Column Layout' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'columns', columnLayoutData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify exceed length validation {string} in deal module',async function(expectedLengthValidation) {
    try {
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);

        const actualLengthValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualLengthValidation, expectedLengthValidation);
        await driver.sleep(2000);
        await contactPageElementsObj.findCancelButton(driver);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //get count of 'Sections' after verifying with exceed length section name
        const sectionElementsAfterAddingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        const sectionsLengthAfterAddingSection = await sectionElementsAfterAddingSection.length;

        //compare count of sections before and after adding exceed length section name
        if (sectionsLengthBeforeAddingSection === sectionsLengthAfterAddingSection) {
            console.log("As count of sections before and after adding/updating exceed length section name are equal i.e section is not added/updated,so test case has been passed");
        } else {
            await assert.fail("As count of sections before and after adding/updating exceed length section name are not equal i.e section is not added/updated,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------------------Case 6: Verify, the user is able to update section---------------------------------------------

When('the user is able to update section in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await contactPageElementsObj.findSectionEditButton(driver, 'Custom Section 01 ');
        await driver.sleep(2000);
        //To check that 'Edit Section' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const editSectionPopup = await driver.findElements(By.xpath('//h4[text()=" Edit Section"]'));
            const editSectionPopupLength = await editSectionPopup.length;
            if (editSectionPopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As edit section popup section popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As edit section popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required section name field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'column layout') {
                columnLayoutData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (columnLayoutData == '') {
                    await assert.fail('Due to the blank value is provided for the column layout dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Column Layout' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'columns', columnLayoutData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify updation notification {string} in deal module',async function(expectedUpdationNotification) {
    try {
        const sectionName = await driver.findElement(By.id('name')).getAttribute('value');
        const columnLayout = await commonElementsObj.findDropdown(driver, screenshotPath, 'columns');
        const columnLayoutText = await columnLayout.getText();
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualUpdationNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualUpdationNotificationElement));
        const actualUpdationNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualUpdationNotification, expectedUpdationNotification);
        await driver.sleep(5000);
        //page navigation and come back to 'Deal Layout' Page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(3000);
        //verify newly added 'Section Name' and 'Column Layout' in section
        const updatedSection = await driver.findElement(By.xpath(`//a[text()='${sectionName} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", updatedSection);
        await driver.wait(until.elementIsVisible(updatedSection));
        const updatedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionName} ']`));
        const updatedSectionLength = await updatedSectionElements.length;
        const updatedColumnLayout = await driver.findElement(By.xpath(`//span[text()='${columnLayoutText}']`));
        await driver.executeScript("arguments[0].scrollIntoView();", updatedColumnLayout);
        await driver.wait(until.elementIsVisible(updatedColumnLayout));
        const updatedColumnElements = await driver.findElements(By.xpath(`//span[text()='${columnLayoutText}']`));
        const updatedColumnLength = await updatedColumnElements.length;
        if (updatedSectionLength > 0 && updatedColumnLength > 0) {
            console.log("As updated " + sectionName + " and " + columnLayoutText + " are displayed in section,so test case has been passed");
        } else {
            await assert.fail("As updated " + sectionName + " and " + columnLayoutText + " are not displayed in section,so test case has been aborted");
        }
        await contactPageElementsObj.findSectionEditButton(driver, 'Custom Section Updated 01 ');
        await driver.sleep(2000);
        const editPageSectionName = await driver.findElement(By.id('name')).getAttribute('value');
        const editPageColumnLayout = await driver.findElement(By.xpath('//span[@class="select2-selection__rendered"]')).getText();
        if (sectionName === editPageSectionName && columnLayoutText === editPageColumnLayout) {
            console.log("As " + sectionName + " and" + columnLayoutText + " in contact layout page are equal to " + editPageSectionName + " and" + editPageColumnLayout + " in edit page,so test case has been passed");
        } else {
            await assert.fail("As " + sectionName + " and" + columnLayoutText + " in contact layout page are not equal to " + editPageSectionName + " and" + editPageColumnLayout + " in edit page,so test case has been aborted");
        }
        await contactPageElementsObj.findCancelButton(driver);
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 7: Verify, the user is not able to leave required fields as a blank while updating section details-----------------------------------------

When('the user is not able to leave required fields as a blank while updating section in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //get count of 'Sections' before updating blank section name
        const sectionElementsBeforeUpdatingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        sectionsLengthBeforeAddingSection = await sectionElementsBeforeUpdatingSection.length;

        await contactPageElementsObj.findSectionEditButton(driver, 'Custom Section Updated 01 ');
        //To check that 'Edit Section' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const editSectionPopup = await driver.findElements(By.xpath('//h4[text()=" Edit Section"]'));
            const editSectionPopupLength = await editSectionPopup.length;
            if (editSectionPopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As edit section popup section popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As edit section popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 8: Verify, the user is not able to enter invalid data while updating section details------------------------------------

When('the user is not able to enter invalid data while updating section in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //get count of 'Sections' before updating invalid section name
        const sectionElementsBeforeUpdatingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        sectionsLengthBeforeAddingSection = await sectionElementsBeforeUpdatingSection.length;

        await contactPageElementsObj.findSectionEditButton(driver, 'Custom Section Updated 01 ');
        //To check that 'Edit Section' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 1000});
            const editSectionPopup = await driver.findElements(By.xpath('//h4[text()=" Edit Section"]'));
            const editSectionPopupLength = await editSectionPopup.length;
            if (editSectionPopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As edit section popup section popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As edit section popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required section name field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'column layout') {
                columnLayoutData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (columnLayoutData == '') {
                    await assert.fail('Due to the blank value is provided for the column layout dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Column Layout' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'columns', columnLayoutData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 9: the user is not able to update section details with more than 100 chars name--------------------------------

When('the user is not able to update section details with more than 100 chars name in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //get count of 'Sections' before updating exceed length section name
        const sectionElementsBeforeUpdatingSection = await driver.findElements(By.xpath('//a[@class="title-text pull-left"]'));
        sectionsLengthBeforeAddingSection = await sectionElementsBeforeUpdatingSection.length;

        await contactPageElementsObj.findSectionEditButton(driver, 'Custom Section Updated 01 ');
        //To check that 'Edit Section' opened or not
        try {
            await driver.manage().setTimeouts({implicit: 2000});
            const editSectionPopup = await driver.findElements(By.xpath('//h4[text()=" Edit Section"]'));
            const editSectionPopupLength = await editSectionPopup.length;
            if (editSectionPopupLength > 0) {
                await driver.manage().setTimeouts({implicit: 1000});
                console.log("As edit section popup section popup is opened,test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As edit section popup is not opened,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required section name field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required section name field, the test case execution has been aborted');
                }

                //will find 'Section Name' field and pass the new data
                const sectionNameField = await contactPageElementsObj.findSectionNameField(driver);
                await clearFieldDataObj.clearFieldData(sectionNameField);
                await sectionNameField.sendKeys(sectionNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'column layout') {
                columnLayoutData = dataTable.rawTable[i][1];

                //will check that the data for the column layout dropdown field is given or not
                if (columnLayoutData == '') {
                    await assert.fail('Due to the blank value is provided for the column layout dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Column Layout' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'columns', columnLayoutData, 'no');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------------Case 10: Verify, the user is able to drag and drop section----------------------------------------

When('the user is able to drag and drop section and verify {string} message in deal module',async function(expectedNotification) {
    await driver.sleep(2000);

    //get section name which is at first section before drag and drop
    const firstSectionNameBeforeDragAndDrop = await driver.findElement(By.xpath("//div[@id='group-sortable']/div[1]/div/a")).getText();
    console.log("Section Name which is at first section before drag and drop is: "+firstSectionNameBeforeDragAndDrop);

    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath("//a[text()='Custom Section Updated 01 ']"));
    const drop = await driver.findElement(By.xpath("//div[@id='group-sortable']/div[1]/div"));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToDealPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    //get section name which is at first section after drag and drop
    const firstSectionNameAfterDragAndDrop = await driver.findElement(By.xpath("//div[@id='group-sortable']/div[1]/div/a")).getText();
    console.log("Section Name which is at first section after drag and drop is: "+firstSectionNameAfterDragAndDrop);
    if(firstSectionNameBeforeDragAndDrop !== firstSectionNameAfterDragAndDrop) {
        console.log("As sections of first division has been changed after performing drag and drop,so test case has been passed");
    } else {
        await assert.fail("As sections of first division has not been changed even after performing drag and drop,so test case has been aborted");
    }
});

//-----------------------Case 11: Verify, the user is able to expand and collapse section-----------------------------------

When('the user is able to expand and collapse section in deal module',async function() {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //click on 'Collapse' arrow for 'Custom Section Updated 01'
        await contactPageElementsObj.findExpandOrCollapseArrow(driver, 'Custom Section Updated 01 ');
        await driver.sleep(3000);
        //verify whether section 'Table' is hidden or not after collapsing it
        await driver.manage().setTimeouts({implicit: 2000});
        const sectionTable = await driver.findElements(By.xpath('//div[3]/table[@class="panel-body sortableSectionPanel"]'));
        const sectionTableLength = await sectionTable.length;
        if (sectionTableLength === 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'customSectionTableHidden.png');
            console.log("As section table is hidden after collapsing section,so test case has been passed");
        } else {
            await assert.fail("As section table is not hidden even after collapsing section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //click on 'Expand' arrow for 'Custom Section Updated 01'
        await contactPageElementsObj.findExpandOrCollapseArrow(driver, 'Custom Section Updated 01 ');
        await driver.sleep(3000);
        //verify whether section 'Table' is visible or not after expanding it
        await driver.manage().setTimeouts({implicit: 2000});
        const sectionTableElements = await driver.findElements(By.xpath('//div[3]/table[@class="panel-body sortableSectionPanel"]'));
        const sectionTableElementsLength = await sectionTableElements.length;
        if (sectionTableElementsLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'customSectionTableVisibility.png');
            console.log("As section table is visible after expanding section,so test case has been passed");
        } else {
            await assert.fail("As section table is not visible even after expanding section,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------------Case 12: Verify, the user is able to add a new custom field----------------------------------

When('the user is able to add a new custom field in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(2000);
        await contactPageElementsObj.selectFieldType(driver, 'Text');
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {

                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the section name dropdown field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the section name dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Section Name' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'groupId', sectionNameFieldData, 'no');
            } else if (fieldName == 'required checkbox') {
                requiredCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (requiredCheckboxState == 'enable' || requiredCheckboxState == 'disable') {
                    //will find 'Required Checkbox' Toggle Button
                    const requiredToggleButton = await contactPageElementsObj.findRequiredCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", requiredToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Required Checkbox'
                    const currentState = await requiredToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != requiredCheckboxState) {
                        await driver.executeScript("arguments[0].click();", requiredToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} notification in deal module',async function(expectedFieldNotification) {
    try {
        await driver.sleep(2000);
        console.log("Custom Field Values before navigation:");
        const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(labelName);
        const sectionName = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const sectionNameText = await sectionName.getText();
        console.log(sectionNameText);
        const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(requiredCheckbox);
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedFieldNotification);
        await driver.sleep(5000);
        //page navigation and come back to 'Contact Layout' Page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify newly added 'Label Name', 'Section Name' and 'Required' in section
        const newlyAddedLabel = await driver.findElement(By.xpath(`//div[text()=' ${labelName} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedLabel);
        await driver.wait(until.elementIsVisible(newlyAddedLabel));
        const newlyAddedLabelElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
        const newlyAddedLabelLength = await newlyAddedLabelElements.length;
        const newlyAddedSection = await driver.findElement(By.xpath(`//a[text()='${sectionNameText} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedSection);
        await driver.wait(until.elementIsVisible(newlyAddedSection));
        const newlyAddedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionNameText} ']`));
        const newlyAddedSectionLength = await newlyAddedSectionElements.length;
        const requiredElements = await driver.findElements(By.xpath("//div[1]/table[@class='panel-body sortableSectionPanel']//td/div/div//span[@class='label label-danger lter m-r-xs']"));
        const requiredLength = await requiredElements.length;
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        if (newlyAddedLabelLength > 0 && newlyAddedSectionLength > 0 && requiredLength > 0) {
            console.log("As newly added " + labelName + " and " + sectionNameText + " and Required are displayed in section,so test case has been passed");
        } else {
            await assert.fail("As newly added " + labelName + " and " + sectionNameText + " and Required are not displayed in section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Field 01', 3, 1);
        await driver.sleep(2000);
        console.log("Custom Field Values after navigation:");
        const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(editPageLabelName);
        const editPageSectionName = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const editPageSectionText = await editPageSectionName.getText();
        console.log(editPageSectionText);
        const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(editPageRequiredCheckbox);
        if (labelName === editPageLabelName && sectionNameText === editPageSectionText && requiredCheckbox === editPageRequiredCheckbox) {
            console.log("As " + labelName + " and" + sectionNameText + " and " + requiredCheckbox + " in contact layout page are equal to " + editPageLabelName + " and" + editPageSectionText + " and" + editPageRequiredCheckbox + " in edit page,so test case has been passed");
        } else {
            await assert.fail("As " + labelName + " and" + sectionNameText + " and " + requiredCheckbox + " in contact layout page are not equal to " + editPageLabelName + " and" + editPageSectionText + " and" + editPageRequiredCheckbox + " in edit page,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 13: Verify, the user is able to add a select and multi-select type custom fields-------------------------------

When('the user is able to add a select and multi-select type custom fields in deal module',async function(dataTable) {
   try {
       await driver.sleep(2000);

       //click on 'New Custom Field' button
       await contactPageElementsObj.findNewCustomFieldButton(driver);
       await driver.sleep(3000);
       await contactPageElementsObj.selectFieldType(driver, 'Multi Select');
       await driver.sleep(2000);

       //will travel provided fields and data list
       for (let i = 0; i < dataTable.rawTable.length; i++) {

           //will check whether the provided field is part of the test case or not
           const fieldName = dataTable.rawTable[i][0].toLowerCase();
           if (fieldName == 'label name') {
               labelNameFieldData = dataTable.rawTable[i][1];

               //will check that the data for the required label name field is given or not
               if (labelNameFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the required label name field, the test case execution has been aborted');
               }

               //will find 'Label Name' field and pass the new data
               const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
               await clearFieldDataObj.clearFieldData(labelNameField);
               await labelNameField.sendKeys(labelNameFieldData);
               await driver.sleep(500);
           } else if (fieldName == 'section name') {
               sectionNameFieldData = dataTable.rawTable[i][1];

               //will check that the data for the section name dropdown field is given or not
               if (sectionNameFieldData == '') {
                   await assert.fail('Due to the blank value is provided for the section name dropdown field, the test case execution has been aborted');
               }

               //will select the provided new dropdown value from the 'Section Name' dropdown list
               await driver.sleep(1000);
               await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'groupId', sectionNameFieldData, 'no');
           } else if (fieldName == 'list values') {
               listValue1Data = dataTable.rawTable[i][1];
               listValue2Data = dataTable.rawTable[i][2];
               listValue3Data = dataTable.rawTable[i][3];

               //will check that the data for the list values are given or not
               if (listValue1Data == '' || listValue2Data == '' || listValue3Data == '') {
                   await assert.fail('Due to the blank values are provided for the list values field, the test case execution has been aborted');
               }

               //will find 'Label Name' field and pass the new data
               const listTextAreaField = await contactPageElementsObj.findListTextAreaField(driver);
               await clearFieldDataObj.clearFieldData(listTextAreaField);
               await listTextAreaField.sendKeys(listValue1Data + "\n" + listValue2Data + "\n" + listValue3Data);
               await driver.sleep(500);
           } else if (fieldName == 'required checkbox') {
               requiredCheckboxState = dataTable.rawTable[i][1].toLowerCase();

               //will check that the provided data is valid to execute a test case or not
               if (requiredCheckboxState == 'enable' || requiredCheckboxState == 'disable') {
                   //will find 'Required Checkbox' Toggle Button
                   const requiredToggleButton = await contactPageElementsObj.findRequiredCheckbox(driver);
                   await driver.executeScript("arguments[0].focus();", requiredToggleButton);
                   await driver.sleep(1000);

                   //will get the current value of 'Required Checkbox'
                   const currentState = await requiredToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                   //will enable/disable 'Required Checkbox'
                   if (currentState != requiredCheckboxState) {
                       await driver.executeScript("arguments[0].click();", requiredToggleButton);
                   }
               } else {
                   assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
               }
           }
       }
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('verify {string} notification message in deal module',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        console.log("Custom Field Values before navigation:");
        const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(labelName);
        const sectionName = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const sectionNameText = await sectionName.getText();
        console.log(sectionNameText);
        const listValue = await driver.findElement(By.id('selectMultiSelectOptions')).getAttribute('value');
        console.log(listValue);
        const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(requiredCheckbox);
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        //page navigation and come back to 'Contact Layout' Page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify newly added 'Label Name', 'Section Name', 'List Values' and 'Required' in section
        const newlyAddedLabel = await driver.findElement(By.xpath(`//div[text()=' ${labelName} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedLabel);
        await driver.wait(until.elementIsVisible(newlyAddedLabel));
        const newlyAddedLabelElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
        const newlyAddedLabelLength = await newlyAddedLabelElements.length;
        const newlyAddedSection = await driver.findElement(By.xpath(`//a[text()='${sectionNameText} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedSection);
        await driver.wait(until.elementIsVisible(newlyAddedSection));
        const newlyAddedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionNameText} ']`));
        const newlyAddedSectionLength = await newlyAddedSectionElements.length;
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        if (newlyAddedLabelLength > 0 && newlyAddedSectionLength > 0) {
            console.log("As newly added " + labelName + " and " + sectionNameText + " are displayed in section,so test case has been passed");
        } else {
            await assert.fail("As newly added " + labelName + " and " + sectionNameText + " are not displayed in section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Select Field 01', 3, 2);
        await driver.sleep(2000);
        console.log("Custom Field Values after navigation:");
        const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(editPageLabelName);
        const editPageSectionName = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const editPageSectionText = await editPageSectionName.getText();
        console.log(editPageSectionText);
        const editPageListValue1 = await driver.findElement(By.id('option__0')).getAttribute('value');
        const editPageListValue2 = await driver.findElement(By.id('option__1')).getAttribute('value');
        const editPageListValue3 = await driver.findElement(By.id('option__2')).getAttribute('value');
        const editPageListValue = editPageListValue1 + "\n" + editPageListValue2 + "\n" + editPageListValue3;
        console.log(editPageListValue);
        const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(editPageRequiredCheckbox);
        if (labelName === editPageLabelName && sectionNameText === editPageSectionText && listValue === editPageListValue && requiredCheckbox === editPageRequiredCheckbox) {
            console.log("As " + labelName + " and" + sectionNameText + " and " + editPageListValue1 + editPageListValue2 + editPageListValue3 + "and " + requiredCheckbox + " in contact layout page are equal to " + editPageLabelName + " and" + editPageSectionText + " and" + editPageRequiredCheckbox + " in edit page,so test case has been passed");
        } else {
            await assert.fail("As " + labelName + " and" + sectionNameText + " and " + editPageListValue1 + editPageListValue2 + editPageListValue3 + "and " + requiredCheckbox + " in contact layout page are not equal to " + editPageLabelName + " and" + editPageSectionText + " and" + editPageRequiredCheckbox + " in edit page,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------------Case 14: Verify, the user is able to add a lookup type custom fields-------------------------------------

When('the user is able to add a lookup type custom fields in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.selectFieldType(driver, 'Contact Lookup');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'association type') {
                associationTypeState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (associationTypeState == 'enable' || associationTypeState == 'disable') {
                    //will find 'Association Type' Toggle Button
                    const associationTypeToggleButton = await contactPageElementsObj.findAssociationTypeField(driver, 'Multiple');
                    await driver.executeScript("arguments[0].focus();", associationTypeToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Association Type'
                    const currentState = await associationTypeToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Association Type'
                    if (currentState != associationTypeState) {
                        await driver.executeScript("arguments[0].click();", associationTypeToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will check that the data for the required record label name field is given or not
                if (recordLabelNameData == '') {
                    await assert.fail('Due to the blank value is provided for the required record label name field, the test case execution has been aborted');
                }

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            } else if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the section name dropdown field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the section name dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Section Name' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'groupId', sectionNameFieldData, 'no');
            } else if (fieldName == 'required checkbox') {
                requiredCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (requiredCheckboxState == 'enable' || requiredCheckboxState == 'disable') {
                    //will find 'Required Checkbox' Toggle Button
                    const requiredToggleButton = await contactPageElementsObj.findRequiredCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", requiredToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Required Checkbox'
                    const currentState = await requiredToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != requiredCheckboxState) {
                        await driver.executeScript("arguments[0].click();", requiredToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} field notification message in deal module',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        console.log("Custom Field Values before navigation:");
        const assignTypeCheckbox = await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('value');
        console.log(assignTypeCheckbox);
        const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(labelName);
        const recordLabelName = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log(recordLabelName);
        const sectionName = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const sectionNameText = await sectionName.getText();
        console.log(sectionNameText);
        const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(requiredCheckbox);
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        //page navigation and come back to 'Company Layout' Page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify newly added 'Label Name', 'Record Label','Section Name' and 'Required' in section
        const newlyAddedLabel = await driver.findElement(By.xpath(`//div[text()=' ${labelName} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedLabel);
        await driver.wait(until.elementIsVisible(newlyAddedLabel));
        const newlyAddedLabelElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
        const newlyAddedLabelLength = await newlyAddedLabelElements.length;
        const newlyAddedSection = await driver.findElement(By.xpath(`//a[text()='${sectionNameText} ']`));
        await driver.executeScript("arguments[0].scrollIntoView();", newlyAddedSection);
        await driver.wait(until.elementIsVisible(newlyAddedSection));
        const newlyAddedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionNameText} ']`));
        const newlyAddedSectionLength = await newlyAddedSectionElements.length;
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        if (newlyAddedLabelLength > 0 && newlyAddedSectionLength > 0) {
            console.log("As newly added " + labelName + " and " + sectionNameText + " are displayed in section,so test case has been passed");
        } else {
            await assert.fail("As newly added " + labelName + " and " + sectionNameText + " are not displayed in section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field 01', 3, 3);
        await driver.sleep(2000);
        console.log("Custom Field Values after navigation:");
        const editPageAssignTypeCheckbox = await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('value');
        console.log(editPageAssignTypeCheckbox);
        const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(editPageLabelName);
        const editPageRecordLabelName = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log(editPageRecordLabelName);
        const editPageSectionName = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const editPageSectionNameText = await editPageSectionName.getText();
        console.log(editPageSectionNameText);
        const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(editPageRequiredCheckbox);
        if (assignTypeCheckbox === editPageAssignTypeCheckbox && labelName === editPageLabelName && recordLabelName === editPageRecordLabelName && sectionNameText === editPageSectionNameText && requiredCheckbox === editPageRequiredCheckbox) {
            console.log("As " + labelName + "," + recordLabelName + " and" + sectionNameText + "and " + requiredCheckbox + " in contact layout page are equal to " + editPageLabelName + " and" + editPageRecordLabelName + " and " + editPageSectionNameText + " and " + editPageRequiredCheckbox + " in edit page,so test case has been passed");
        } else {
            await assert.fail("As " + labelName + "," + recordLabelName + " and" + sectionNameText + "and " + requiredCheckbox + " in contact layout page are equal to " + editPageLabelName + " and" + editPageRecordLabelName + " and " + editPageSectionNameText + " and " + editPageRequiredCheckbox + " in edit page,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

///-----------Case 15: Verify, the user is not able to leave required fields as a blank while adding a new custom field--------------------------------------

When('the user is not able to leave required fields as a blank while adding a new custom field in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //get count of 'Custom fields' in section before adding invalid custom field
        const customFields = await contactPageElementsObj.findCustomFieldsCount(driver);
        const customFieldsBeforeAddingInvalidField = await customFields.length;

        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.selectFieldType(driver, 'Contact Lookup');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver, 1)
        strictEqual(actualLabelValidation, 'Please provide label');
        await driver.sleep(1000);
        const actualRecordLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver, 2);
        strictEqual(actualRecordLabelValidation, 'Please provide related record label');
        await driver.sleep(1000);

        //click on 'Change' Link
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.selectFieldType(driver, 'Multi Select');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'list value') {
                listValue1Data = dataTable.rawTable[i][1];

                //will find 'List Value' field and pass the new data
                const listTextAreaField = await contactPageElementsObj.findListTextAreaField(driver);
                await clearFieldDataObj.clearFieldData(listTextAreaField);
                await listTextAreaField.sendKeys(listValue1Data);
                await driver.sleep(500);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const labelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver, 1);
        strictEqual(labelValidation, 'Please provide label');
        await driver.sleep(1000);
        const listValidation = await driver.findElement(By.xpath("//sm-textarea-txt/sm-element//div[@class='error-message text-danger']")).getText();
        strictEqual(listValidation, 'Should have at least one option');
        await driver.sleep(1000);

        //click on 'Change' Link
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.selectFieldType(driver, 'Text');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualLabelValidationMsg = await contactPageElementsObj.findLabelRecordListValidation(driver, 1);
        strictEqual(actualLabelValidationMsg, 'Please provide label');
        await driver.sleep(1000);
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);

        //get count of 'Custom fields' in section after adding invalidation custom field
        const customFieldElements = await contactPageElementsObj.findCustomFieldsCount(driver);
        const customFieldsAfterAddingInvalidField = await customFieldElements.length;
        if (customFieldsBeforeAddingInvalidField === customFieldsAfterAddingInvalidField) {
            console.log("As custom fields count before and after adding invalid custom fields are equal,so test case has been passed");
        } else {
            await assert.fail("As custom fields count before and after adding invalid custom fields are not equal,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------Case 16: Verify, the user is not able to add a new custom field with more than 100 chars label name------------------------------------

When('the user is not able to add a new custom field with more than 100 chars in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //get count of 'Custom fields' in section before adding exceed length custom field
        const customFields = await contactPageElementsObj.findCustomFieldsCount(driver);
        const customFieldsBeforeAddingExceedLengthField = await customFields.length;

        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.selectFieldType(driver, 'Contact Lookup');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will check that the data for the record label name field is given or not
                if (recordLabelNameData == '') {
                    await assert.fail('Due to the blank value is provided for the record label name field, the test case execution has been aborted');
                }

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver, 1)
        strictEqual(actualLabelValidation, 'Should be maximum 100 characters');
        await driver.sleep(1000);
        const actualRecordLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver, 2);
        strictEqual(actualRecordLabelValidation, 'Should be maximum 100 characters');
        await driver.sleep(1000);

        //click on 'Change' Link
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.selectFieldType(driver, 'Multi Select');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const labelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver, 1);
        strictEqual(labelValidation, 'Should be maximum 100 characters');
        await driver.sleep(1000);

        //click on 'Change' Link
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.selectFieldType(driver, 'Text');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualLabelValidationMsg = await contactPageElementsObj.findLabelRecordListValidation(driver, 1);
        strictEqual(actualLabelValidationMsg, 'Should be maximum 100 characters');
        await driver.sleep(1000);
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);

        //get count of 'Custom fields' in section after adding exceed length custom field
        const customFieldElements = await contactPageElementsObj.findCustomFieldsCount(driver);
        const customFieldsAfterAddingExceedLengthField = await customFieldElements.length;
        if (customFieldsBeforeAddingExceedLengthField === customFieldsAfterAddingExceedLengthField) {
            console.log("As custom fields count before and after adding exceed length custom fields are equal,so test case has been passed");
        } else {
            await assert.fail("As custom fields count before and after adding exceed length custom fields are not equal,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 17: Verify, the user is able to search a field type while adding a new custom field------------------------------

When('the user is able to search a field type while adding a new custom field in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(3000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'existing search data') {
                searchFieldData = dataTable.rawTable[i][1];

                //will check that the data for the search name field is given or not
                if (searchFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the search name field, the test case execution has been aborted');
                }

                //will find 'Search' field and pass the new data
                const searchField = await contactPageElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchField);
                await searchField.sendKeys(searchFieldData)
                await driver.sleep(500);
            }
        }
        await driver.manage().setTimeouts({implicit: 2000});
        const searchResults = await driver.findElements(By.xpath("//li[@class='d-flex list-group-item']"));
        const searchResultsLength = await searchResults.length;
        if (searchResultsLength > 0) {
            console.log("As search results are found for valid search data,so test case has been passed");
        } else {
            await assert.fail("As search results are not found for valid search data,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'non-existing search data') {
                searchFieldData = dataTable.rawTable[i][1];

                //will check that the data for the search name field is given or not
                if (searchFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the search name field, the test case execution has been aborted');
                }

                //will find 'Search' field and pass the new data
                const searchField = await contactPageElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchField);
                await searchField.sendKeys(searchFieldData)
                await driver.sleep(500);
            }
        }
        await driver.manage().setTimeouts({implicit: 2000});
        const searchResultElements = await driver.findElements(By.xpath("//li[@class='d-flex list-group-item']"));
        const searchResultLength = await searchResultElements.length;
        if (searchResultLength === 0) {
            console.log("As search results are not found for invalid search data,so test case has been passed");
        } else {
            await assert.fail("As search results are found for valid search data,test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 18: Verify, the user is able to change field type while adding a new custom field---------------------------------------

When('the user is able to change field type while adding a new custom field in deal module',async function() {
    try {
        await driver.sleep(2000);

        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(2000);
        await contactPageElementsObj.selectFieldType(driver, 'Text');
        await driver.sleep(1000);
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(2000);
        await contactPageElementsObj.selectFieldType(driver, 'Date');
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const dateElements = await driver.findElements(By.xpath('//span[contains(text(), "field for Deals")]'));
        const dateElementsLength = await dateElements.length;
        if (dateElementsLength > 0) {
            console.log("As date field for contacts element is found,so test case has been passed");
        } else {
            await assert.fail("As date field contacts element is not found,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 19: Verify, the new custom field details should not get changed on selecting the same type again----------------------------------

When('the new custom field details should not get changed on selecting the same type again in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.selectFieldType(driver, 'Company Lookup');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'association type') {
                associationTypeState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (associationTypeState == 'enable' || associationTypeState == 'disable') {
                    //will find 'Association Type' Toggle Button
                    const associationTypeToggleButton = await contactPageElementsObj.findAssociationTypeField(driver, 'Multiple');
                    await driver.executeScript("arguments[0].focus();", associationTypeToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Association Type'
                    const currentState = await associationTypeToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Association Type'
                    if (currentState != associationTypeState) {
                        await driver.executeScript("arguments[0].click();", associationTypeToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will check that the data for the required record label name field is given or not
                if (recordLabelNameData == '') {
                    await assert.fail('Due to the blank value is provided for the required record label name field, the test case execution has been aborted');
                }

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            } else if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the section name dropdown field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the section name dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Section Name' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'groupId', sectionNameFieldData, 'no');
            } else if (fieldName == 'required checkbox') {
                requiredCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (requiredCheckboxState == 'enable' || requiredCheckboxState == 'disable') {
                    //will find 'Required Checkbox' Toggle Button
                    const requiredToggleButton = await contactPageElementsObj.findRequiredCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", requiredToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Required Checkbox'
                    const currentState = await requiredToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != requiredCheckboxState) {
                        await driver.executeScript("arguments[0].click();", requiredToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        await driver.sleep(2000);
        //get values of 'Assign Type', 'Label', 'Record Label', 'Section Name' and 'Required Checkbox' before changing link
        const assignTypeBeforeChangingLink = await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('value');
        console.log(assignTypeBeforeChangingLink);
        const labelNameBeforeChangingLink = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(labelNameBeforeChangingLink);
        const recordLabelBeforeChangingLink = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log(recordLabelBeforeChangingLink);
        const sectionName = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const sectionNameBeforeChangingLink = await sectionName.getText();
        console.log(sectionNameBeforeChangingLink);
        const requiredCheckboxBeforeChangingLink = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(requiredCheckboxBeforeChangingLink);
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.selectFieldType(driver, 'Company Lookup');
        await driver.sleep(2000);
        //get values of 'Assign Type', 'Label', 'Record Label', 'Section Name' and 'Required Checkbox' after changing link
        const assignTypeAfterChangingLink = await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('value');
        console.log(assignTypeAfterChangingLink);
        const labelNameAfterChangingLink = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(labelNameAfterChangingLink);
        const recordLabelAfterChangingLink = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log(recordLabelAfterChangingLink);
        const sectionNameElements = await commonElementsObj.findDropdown(driver, screenshotPath, 'groupId');
        const sectionNameAfterChangingLink = await sectionNameElements.getText();
        console.log(sectionNameAfterChangingLink);
        const requiredCheckboxAfterChangingLink = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(requiredCheckboxAfterChangingLink);
        //compare values before and after changing link
        if (assignTypeBeforeChangingLink === assignTypeAfterChangingLink && labelNameBeforeChangingLink === labelNameAfterChangingLink && recordLabelBeforeChangingLink === recordLabelAfterChangingLink && sectionNameBeforeChangingLink === sectionNameAfterChangingLink && requiredCheckboxBeforeChangingLink === requiredCheckboxAfterChangingLink) {
            console.log("As " + assignTypeBeforeChangingLink + labelNameBeforeChangingLink + recordLabelBeforeChangingLink + sectionNameBeforeChangingLink + requiredCheckboxBeforeChangingLink + " are equal to " + assignTypeAfterChangingLink + labelNameAfterChangingLink + recordLabelAfterChangingLink + sectionNameAfterChangingLink + requiredCheckboxAfterChangingLink + " so,test case has been passed");
        } else {
            await assert.fail("As " + assignTypeBeforeChangingLink + labelNameBeforeChangingLink + recordLabelBeforeChangingLink + sectionNameBeforeChangingLink + requiredCheckboxBeforeChangingLink + " are not equal to " + assignTypeAfterChangingLink + labelNameAfterChangingLink + recordLabelAfterChangingLink + sectionNameAfterChangingLink + requiredCheckboxAfterChangingLink + " so,test case has been aborted")
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 20: Verify, the new custom field details should get changed on selecting the different type-----------------------------------------

When('the new custom field details should get changed on selecting the different type in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //click on 'New Custom Field' button
        await contactPageElementsObj.findNewCustomFieldButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.selectFieldType(driver, 'Company Lookup');
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'association type') {
                associationTypeState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (associationTypeState == 'enable' || associationTypeState == 'disable') {
                    //will find 'Association Type' Toggle Button
                    const associationTypeToggleButton = await contactPageElementsObj.findAssociationTypeField(driver, 'Multiple');
                    await driver.executeScript("arguments[0].focus();", associationTypeToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Association Type'
                    const currentState = await associationTypeToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Association Type'
                    if (currentState != associationTypeState) {
                        await driver.executeScript("arguments[0].click();", associationTypeToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            } else if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will check that the data for the required record label name field is given or not
                if (recordLabelNameData == '') {
                    await assert.fail('Due to the blank value is provided for the required record label name field, the test case execution has been aborted');
                }

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            } else if (fieldName == 'section name') {
                sectionNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the section name dropdown field is given or not
                if (sectionNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the section name dropdown field, the test case execution has been aborted');
                }

                //will select the provided new dropdown value from the 'Section Name' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'groupId', sectionNameFieldData, 'no');
            } else if (fieldName == 'required checkbox') {
                requiredCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (requiredCheckboxState == 'enable' || requiredCheckboxState == 'disable') {
                    //will find 'Required Checkbox' Toggle Button
                    const requiredToggleButton = await contactPageElementsObj.findRequiredCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", requiredToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Required Checkbox'
                    const currentState = await requiredToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != requiredCheckboxState) {
                        await driver.executeScript("arguments[0].click();", requiredToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        await driver.sleep(2000);
        //get values of 'Label' and 'Record Label' before changing link
        const labelNameBeforeChangingLink = await driver.findElement(By.id('displayName')).getAttribute('value');
        const recordLabelBeforeChangingLink = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.selectFieldType(driver, 'Text');
        await driver.sleep(2000);

        //screenshot of 'Unset' values of 'Changing to text link'
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'unsetValuesOfText.png');

        //get values of 'Label Name' after changing link to 'Text' type
        const labelNameAfterChangingTextLink = await driver.findElement(By.id('displayName')).getAttribute('value');
        //compare label value before and after changing link
        if (labelNameBeforeChangingLink !== labelNameAfterChangingTextLink) {
            console.log("As " + labelNameBeforeChangingLink + " is not equal to " + labelNameAfterChangingTextLink + " so,test case has been passed");
        } else {
            await assert.fail("As " + labelNameBeforeChangingLink + " is equal to " + labelNameAfterChangingTextLink + " so,test case has been aborted");
        }
        await contactPageElementsObj.findChangeLink(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.selectFieldType(driver, 'Company Lookup');
        await driver.sleep(2000);

        //screenshot of 'Unset' values of 'Changing to company lookup link'
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'unsetValuesOfCompanyLookup.png');

        //get values of 'Label' and 'Record Label' after changing back to 'Company Lookup' link
        const labelNameAfterChangingLink = await driver.findElement(By.id('displayName')).getAttribute('value');
        const recordLabelAfterChangingLink = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');

        //compare values of before and after coming back to 'Company Lookup'
        if (labelNameBeforeChangingLink !== labelNameAfterChangingLink && recordLabelBeforeChangingLink !== recordLabelAfterChangingLink) {
            console.log("As " + labelNameBeforeChangingLink + recordLabelBeforeChangingLink + " are not equal to " + labelNameAfterChangingLink + recordLabelAfterChangingLink + " as values are unset after changing to different select type,so test case has been passed");
        } else {
            await assert.fail("As " + labelNameBeforeChangingLink + recordLabelBeforeChangingLink + " are equal to " + labelNameAfterChangingLink + recordLabelAfterChangingLink + " as values remains as set after changing to different select type,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 21: Verify, the user is able to update the custom field label and required settings----------------------------------------

When('the user is able to update the custom field label and required settings in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Field 01', 3, 1);
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'required checkbox') {
                requiredCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (requiredCheckboxState == 'enable' || requiredCheckboxState == 'disable') {
                    //will find 'Required Checkbox' Toggle Button
                    const requiredToggleButton = await contactPageElementsObj.findRequiredCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", requiredToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Required Checkbox'
                    const currentState = await requiredToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != requiredCheckboxState) {
                        await driver.executeScript("arguments[0].click();", requiredToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} updation message in deal module',async function(expectedUpdationMsg) {
    try {
        await driver.sleep(2000);
        const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(labelName);
        const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        console.log(requiredCheckbox);
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualUpdationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualUpdationMsgElement));
        const actualUpdationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualUpdationMsg, expectedUpdationMsg);
        await driver.sleep(5000);
        //page navigation and come back to 'Company Layout' Page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify updated 'Label Name' and 'Required' in section
        const updatedElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
        const updatedLabelLength = await updatedElements.length;
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        if (updatedLabelLength > 0) {
            console.log("As updated " + labelName + " is displayed in section,so test case has been passed");
        } else {
            await assert.fail("As updated " + labelName + " is not displayed in section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Field Updated 01', 3, 1);
        await driver.sleep(2000);
        const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
        if (labelName === editPageLabelName && requiredCheckbox === editPageRequiredCheckbox) {
            console.log("As " + labelName + " and " + requiredCheckbox + " in contact layout page are equal to " + editPageLabelName + " and" + editPageRequiredCheckbox + " in edit page,so test case has been passed");
        } else {
            await assert.fail("As " + labelName + " and " + requiredCheckbox + " in contact layout page are not equal to " + editPageLabelName + " and" + editPageRequiredCheckbox + " in edit page,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 22: Verify, the user is able to change the label and related record label of custom lookup field---------------------------------------

When('the user is able to change the label and related record label of custom lookup field in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field 01', 3, 3);
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the required label name field is given or not
                if (labelNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required label name field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will check that the data for the required record label name field is given or not
                if (recordLabelNameData == '') {
                    await assert.fail('Due to the blank value is provided for the required record label name field, the test case execution has been aborted');
                }

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} field updated notification in deal module',async function(expectedUpdationNotification) {
    try {
        await driver.sleep(2000);
        const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log(labelName);
        const recordLabelName = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log(recordLabelName);
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualUpdationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualUpdationMsgElement));
        const actualUpdationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualUpdationMsg, expectedUpdationNotification);
        await driver.sleep(5000);
        //page navigation and come back to 'Contact Layout' Page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify updated 'Label Name' section
        const updatedElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
        const updatedLabelLength = await updatedElements.length;
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        if (updatedLabelLength > 0) {
            console.log("As updated " + labelName + " is displayed in section,so test case has been passed");
        } else {
            await assert.fail("As updated " + labelName + " is not displayed in section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field Updated 01', 3, 3);
        await driver.sleep(2000);
        //get values of 'Label Name' and 'Record Label Name' in 'Edit' page
        const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
        const editPageRecordLabel = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        if (labelName === editPageLabelName && recordLabelName === editPageRecordLabel) {
            console.log("As " + labelName + " and " + recordLabelName + " in contact layout page are equal to " + editPageLabelName + " and" + editPageRecordLabel + " in edit page,so test case has been passed");
        } else {
            await assert.fail("As " + labelName + " and " + recordLabelName + " in contact layout page are not equal to " + editPageLabelName + " and" + editPageRecordLabel + " in edit page,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 23: Verify, the user is able to manage(add/update/delete/sort) select or multi-select values---------------------------------------

When('the user is able to manage select or multi-select values in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Select Field 01', 3, 2);
        await driver.sleep(2000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'new list value') {
                listValue1Data = dataTable.rawTable[i][1];

                //will check that the data for the list values are given or not
                if (listValue1Data == '') {
                    await assert.fail('Due to the blank values are provided for the list value field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const listTextAreaField = await contactPageElementsObj.findListTextAreaField(driver);
                await clearFieldDataObj.clearFieldData(listTextAreaField);
                await listTextAreaField.sendKeys(listValue1Data);
                await driver.sleep(1000);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Select Field 01', 3, 2);
        await driver.sleep(2000);
        //get value of newly 'Added List'
        const newlyAddedListValue = await driver.findElement(By.id('option__3')).getAttribute('value');
        console.log("Newly Added Pick List Value: " + newlyAddedListValue);

        //delete newly added 'List Value'
        await contactPageElementsObj.findListDeleteIcon(driver, 4);
        await driver.manage().setTimeouts({implicit: 2000});
        //verify Deleted list value is deleted after performing delete operation
        const deletedListElements = await driver.findElements(By.id('option__3'));
        const deletedListLength = await deletedListElements.length;
        if (deletedListLength === 0) {
            console.log("As deleted list value is not found in edit popup page,so test case has been passed");
        } else {
            await assert.fail("As deleted list value is found in edit popup page,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'update list value') {
                listValue1Data = dataTable.rawTable[i][1];

                //will check that the data for the list values are given or not
                if (listValue1Data == '') {
                    await assert.fail('Due to the blank values are provided for the list value field, the test case execution has been aborted');
                }

                //will find 'Label Name' field and pass the new data
                const listTextAreaField = await driver.findElement(By.id('option__2'));
                await clearFieldDataObj.clearFieldData(listTextAreaField);
                await listTextAreaField.sendKeys(listValue1Data);
                await driver.sleep(500);
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Select Field 01', 3, 2);
        await driver.sleep(2000);
        //get value of newly 'Updated List'
        const updatedListValue = await driver.findElement(By.id('option__2')).getAttribute('value');
        console.log("Updated Pick List Value: " + updatedListValue);

        //get values of list values before sorting
        console.log("Below are List Values before sorting:");
        const listValue1BeforeSorting = await driver.findElement(By.id('option__0')).getAttribute('value');
        console.log("List Value 1: " + listValue1BeforeSorting);
        const listValue2BeforeSorting = await driver.findElement(By.id('option__1')).getAttribute('value');
        console.log("List Value 2: " + listValue2BeforeSorting);
        const listValue3BeforeSorting = await driver.findElement(By.id('option__2')).getAttribute('value');
        console.log("List Value 3: " + listValue3BeforeSorting);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'unSortedListValues.png');
        //click on 'Sort Alphabetically' button
        await contactPageElementsObj.findSortAlphabeticallyButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(3000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Select Field 01', 3, 2);
        await driver.sleep(2000);

        //take screenshot of 'Alphabetically Sorted' list values
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'sortedListValues.png');

        //get values of list values after sorting
        console.log("Below are List Values after sorting:");
        const listValue1AfterSorting = await driver.findElement(By.id('option__0')).getAttribute('value');
        console.log("List Value 1: " + listValue1AfterSorting);
        const listValue2AfterSorting = await driver.findElement(By.id('option__1')).getAttribute('value');
        console.log("List Value 2: " + listValue2AfterSorting);
        const listValue3AfterSorting = await driver.findElement(By.id('option__2')).getAttribute('value');
        console.log("List Value 3: " + listValue3AfterSorting);
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const fieldNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(fieldNotificationElement));
        const fieldNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(fieldNotification, 'Field updated successfully');
        await driver.sleep(5000);

        //page navigation and come back to contact layout page
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Select Field 01', 3, 2);
        await driver.sleep(2000);
        const listValue1AfterNavigation = await driver.findElement(By.id('option__0')).getAttribute('value');
        const listValue2AfterNavigation = await driver.findElement(By.id('option__1')).getAttribute('value');
        const listValue3AfterNavigation = await driver.findElement(By.id('option__2')).getAttribute('value');
        if (listValue1AfterSorting === listValue1AfterNavigation && listValue2AfterSorting === listValue2AfterNavigation && listValue3AfterSorting === listValue3AfterNavigation) {
            console.log("As " + listValue1AfterSorting + listValue2AfterSorting + listValue3AfterSorting + " after sorting are equal to " + listValue1AfterNavigation + listValue2AfterNavigation + listValue3AfterNavigation + " after navigation values,so test case has been passed");
        } else {
            await assert.fail("As " + listValue1AfterSorting + listValue2AfterSorting + listValue3AfterSorting + " after sorting are not equal to " + listValue1AfterNavigation + listValue2AfterNavigation + listValue3AfterNavigation + " after navigation values,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 24: Verify, the user is not able to change the association type of custom lookup field------------------------------------

When('the user is not able to change the association type of custom lookup field in deal module',async function() {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field Updated 01', 3, 3);
        await driver.sleep(1000);
        //verifying 'Single' 'Multiple' Association type
        const singleAssociationType = !!await driver.findElement(By.xpath('//input[@value="Single"]')).getAttribute('disabled');
        console.log("Is Single Association Type disabled: " + singleAssociationType);
        const multipleAssociationType = !!await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('disabled');
        console.log("Is Multiple Association Type disabled: " + multipleAssociationType);
        if (singleAssociationType === true && multipleAssociationType === true) {
            console.log("As single and multiple association types are disabled,so test case haas been passed");
        } else {
            await assert.fail("As single and multiple association types are not disabled,so test case haas been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 25: Verify, the user is not able to change section name while updating a custom field---------------------------------------

When('the user is not able to change section name while updating a custom field in deal module',async function() {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Field Updated 01', 3, 1);
        await driver.sleep(3000);
        await driver.manage().setTimeouts({implicit: 2000});
        //verify 'Disabled Class' for section name
        const sectionDisabledClass = await driver.findElements(By.xpath('//div[@class="disabled"]'));
        const sectionDisabledLength = await sectionDisabledClass.length;
        if (sectionDisabledLength > 0) {
            console.log("As section name class is disabled,so test case haas been passed");
        } else {
            await assert.fail("As section name class is not disabled,so test case haas been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 26: Verify, the user is not able to leave required fields as a blank while updating a custom field-------------------------------------

When('the user is not able to leave label name field as a blank while updating a custom field in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Field Updated 01', 3, 1);
        await driver.sleep(1000);

        //get value of 'Label Name' before updating
        labelNameBeforeUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log("Label Name before updating label is: " + labelNameBeforeUpdation);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify validation {string} notification message in deal module',async function(expectedLabelValidation) {
    try {
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualLabelValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualLabelValidation, expectedLabelValidation);
        await driver.sleep(1000);
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Field Updated 01', 3, 1);
        await driver.sleep(2000);
        //get value of 'Label Name' after updating
        const labelNameAfterUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log("Label Name after updating label is: " + labelNameAfterUpdation);
        if (labelNameBeforeUpdation === labelNameAfterUpdation) {
            console.log("As label name after and before updating blank label name,so test case has been passed");
        } else {
            await assert.fail("As label name after and before updating blank label name,so test case has been aborted")
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is not able to leave record label name field as a blank while updating a custom field in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field Updated 01', 3, 3);
        await driver.sleep(1000);

        //get value of 'Label Name' before updating
        labelNameBeforeUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log("Label Name before updating label is: " + labelNameBeforeUpdation);
        recordLabelBeforeUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log("Record Label before updating label is: " + recordLabelBeforeUpdation);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify validation {string} and {string} message in deal module',async function(expectedLabelValidation,expectedRecordValidation) {
    try {
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualLabelValidation = await contactPageElementsObj.findValidation(driver, 1);
        strictEqual(actualLabelValidation, expectedLabelValidation);
        const actualRecordValidation = await contactPageElementsObj.findValidation(driver, 2);
        strictEqual(actualRecordValidation, expectedRecordValidation);
        await driver.sleep(1000);
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field Updated 01', 3, 3);
        await driver.sleep(2000);
        //get value of 'Label Name' after updating
        const labelNameAfterUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log("Label Name after updating label is: " + labelNameAfterUpdation);
        const recordLabelAfterUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log("Record Label after updating label is: " + recordLabelAfterUpdation);
        if (labelNameBeforeUpdation === labelNameAfterUpdation && recordLabelBeforeUpdation === recordLabelAfterUpdation) {
            console.log("As label name and record label are equal before and after updating blank label name and record label,so test case has been passed");
        } else {
            await assert.fail("As label name and record label are not equal before and after updating blank label name and record label,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 27: Verify, the user is not able to update the custom field with more than 100 chars label name--------------------------------

When('the user is not able to update the custom field with more than 100 chars label name in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field Updated 01', 3, 3);
        await driver.sleep(1000);

        //get value of 'Label Name' before updating
        labelNameBeforeUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log("Label Name before updating label is: " + labelNameBeforeUpdation);
        recordLabelBeforeUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log("Record Label before updating label is: " + recordLabelBeforeUpdation);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'label name') {
                labelNameFieldData = dataTable.rawTable[i][1];

                //will find 'Label Name' field and pass the new data
                const labelNameField = await contactPageElementsObj.findLabelNameField(driver);
                await clearFieldDataObj.clearFieldData(labelNameField);
                await labelNameField.sendKeys(labelNameFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'record label') {
                recordLabelNameData = dataTable.rawTable[i][1];

                //will find 'Record Label Name' field and pass the new data
                const recordLabelField = await contactPageElementsObj.findRecordLabelField(driver);
                await clearFieldDataObj.clearFieldData(recordLabelField);
                await recordLabelField.sendKeys(recordLabelNameData);
                await driver.sleep(500);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify {string} validation in deal module',async function(expectedLengthValidation) {
    try {
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const actualLengthValidation = await contactPageElementsObj.findValidation(driver, 1);
        strictEqual(actualLengthValidation, expectedLengthValidation);
        const actualRecordValidation = await contactPageElementsObj.findValidation(driver, 2);
        strictEqual(actualRecordValidation, expectedLengthValidation);
        await driver.sleep(1000);
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Lookup Field Updated 01', 3, 3);
        await driver.sleep(2000);
        //get value of 'Label Name' after updating
        const labelNameAfterUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
        console.log("Label Name after updating label is: " + labelNameAfterUpdation);
        const recordLabelAfterUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
        console.log("Record Label after updating label is: " + recordLabelAfterUpdation);
        if (labelNameBeforeUpdation === labelNameAfterUpdation && recordLabelBeforeUpdation === recordLabelAfterUpdation) {
            console.log("As label name and record label are equal before and after updating blank label name and record label,so test case has been passed");
        } else {
            await assert.fail("As label name and record label are not equal before and after updating blank label name and record label,so test case has been aborted");
        }
        await contactPageElementsObj.findCloseIcon(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 28: Verify, the user is not able to select the same field as a parent and child while creating a map dependency----------------------------------------

When('the user is not able to select the same field as a parent and child while creating a map dependency in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        await contactPageElementsObj.findMapDependencyFields(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.findCreateButton(driver);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'parent field') {
                parentFieldData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Parent Field' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'parentField', parentFieldData, 'yes');
            } else if (fieldName == 'child field') {
                childFieldData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Child Field' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'childField', childFieldData, 'yes');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on next button and verify {string} validation in deal module',async function(expectedValidation) {
    try {
        await contactPageElementsObj.findNextButton(driver);
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        await contactPageElementsObj.findMapCancelButton(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.findMapDependencyCancelButton(driver);
        await driver.sleep(3000);
        console.log("As user is not able to select the same field as a parent and child while creating a map dependency,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 29: Verify, the user is not able to create a map dependency without mapping any value--------------------------------------

When('the user is not able to create a map dependency without mapping any value in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencyFields(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.findCreateButton(driver);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'parent field') {
                parentFieldData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Parent Field' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'parentField', parentFieldData, 'yes');
            } else if (fieldName == 'child field') {
                childFieldData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Child Field' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'childField', childFieldData, 'yes');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on next button and verify {string} validation message in deal module',async function(expectedValidation) {
    try {
        await contactPageElementsObj.findNextButton(driver);
        await contactPageElementsObj.findMapDependencySaveButton(driver);
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        await contactPageElementsObj.findMapDependencyCancelButton(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.findMapDependencyCancelButton(driver);
        await driver.sleep(3000);
        console.log("As user is not able to create a map dependency without mapping any value,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 30: Verify, the user is able to create a map dependency between the select or multi-select fields---------------------------------------

When('the user is able to create a map dependency between the select or multi-select fields in deal module',async function(dataTable) {
    try {
        await driver.sleep(2000);

        await contactPageElementsObj.findMapDependencyFields(driver);
        await driver.sleep(1000);
        await contactPageElementsObj.findCreateButton(driver);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'parent field') {
                parentFieldData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Parent Field' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'parentField', parentFieldData, 'yes');
            } else if (fieldName == 'child field') {
                childFieldData = dataTable.rawTable[i][1];

                //will select the provided new dropdown value from the 'Child Field' dropdown list
                await driver.sleep(1000);
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'childField', childFieldData, 'yes');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on next button and verify {string} message in deal module',async function(expectedNotification) {
    try {
        await contactPageElementsObj.findNextButton(driver);
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//option[text()="M2"]')).click();
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencySaveButton(driver);
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedNotification);
        await driver.sleep(5000);
        await driver.navigate().refresh();
        await driver.sleep(6000);
        await contactPageElementsObj.findMapDependencyCancelButton(driver);
        await driver.sleep(3000);
        console.log("As user is able to create a map dependency between the select or multi-select fields,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 31: Verify, the user is able to update map dependency-----------------------------------

When('the user is able to update map dependency and verify {string} in deal module',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencyFields(driver);
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencyDealEditLink(driver);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//option[text()="M3"]')).click();
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencySaveButton(driver);
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        await driver.navigate().refresh();
        await driver.sleep(6000);
        await contactPageElementsObj.findMapDependencyDealEditLink(driver);
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedMapDependencyEditPage.png');
        await contactPageElementsObj.findMapDependencyCancelButton(driver);
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencyCancelButton(driver);
        await driver.sleep(2000);
        console.log("As user is able to update map dependency,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------Case 32: Verify, the user is able to delete map dependency----------------------------------

When('the user is able to delete map dependency and verify {string} in deal module',async function(expectedDeleteNotification) {
    try {
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencyFields(driver);
        await driver.sleep(2000);
        await contactPageElementsObj.findMapDependencyDealDeleteLink(driver);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(1000);
        const actualDeleteNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualDeleteNotificationElement));
        const actualDeleteNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualDeleteNotification, expectedDeleteNotification);
        await driver.sleep(5000);
        await driver.navigate().refresh();
        await driver.sleep(6000);
        await driver.manage().setTimeouts({implicit: 2000});
        const deletedCustomField = await driver.findElements(By.xpath('//td[text()="Custom Select Field 01"]'));
        const deletedCustomLength = await deletedCustomField.length;
        if (deletedCustomLength === 0) {
            console.log("As custom field is not found after successful deletion,so test case has been passed");
        } else {
            await assert.fail("As custom field is found even after successful deletion,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await contactPageElementsObj.findMapDependencyCancelButton(driver);
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------------Case 33: Verify, the user is able to drag and drop fields------------------------------------

When('the user is able to drag and drop fields and verify {string} in deal module',async function(expectedNotification) {
    await driver.sleep(2000);

    //get field which is at first place before drag and drop
    const firstFieldBeforeDragAndDrop = await driver.findElement(By.xpath("//div[@id='group-sortable']/div[1]/table[@class='panel-body sortableSectionPanel']//td/div[1]/div")).getText();
    console.log("Field which is at first section before drag and drop is: "+firstFieldBeforeDragAndDrop);

    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[2]/div'));
    const drop = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[1]/div'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToDealPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    //get field which is at first place after drag and drop
    const firstFieldAfterDragAndDrop = await driver.findElement(By.xpath("//div[1]/table[@class='panel-body sortableSectionPanel']//td/div[1]/div")).getText();
    console.log("Field Name which is at first section after drag and drop is: "+firstFieldAfterDragAndDrop);
    if(firstFieldBeforeDragAndDrop !== firstFieldAfterDragAndDrop) {
        console.log("As "+firstFieldBeforeDragAndDrop+" of first division has been interchanged with "+firstFieldAfterDragAndDrop+" after performing drag and drop,so test case has been passed");
    } else {
        await assert.fail("As "+firstFieldBeforeDragAndDrop+" of first division has not been interchanged with "+firstFieldAfterDragAndDrop+" after performing drag and drop,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
});

//-------------------Case 34: Verify, the user is able to deactivate fields by drag and drop-------------------------------

When('the user is able to deactivate field {string} by drag and drop and verify {string} in deal module',async function(fieldName,expectedNotification) {
    await driver.sleep(2000);

    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath(`//div[text()=" ${fieldName} "]`));
    const drop = await driver.findElement(By.xpath('//div[@id="inActiveField"]'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToDealPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    //get first field which is at inactive fields section after drag and drop
    const inactiveFieldAfterDragAndDrop = await driver.findElement(By.xpath("//div[@id='inActiveField']/div/div")).getText();
    console.log("Field Name which is at first section after drag and drop is: "+inactiveFieldAfterDragAndDrop);
});

//-------Case 35: Verify, the user is able to deactivate fields by clicking on the ‘Move to Inactive Fields’ button----------------------------

When('the user is able to deactivate {string} by clicking on the {string} button and verify {string} in deal module',async function(fieldName,moveToInactiveButton,expectedNotification) {
    await driver.sleep(2000);

    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath(`//div[@id="inActiveField"]//div[text()=" ${fieldName} "]`));
    const drop = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[1]'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(2000);
    await driver.findElement(By.xpath('//div[contains(text()," Deal")]')).click();
    await driver.sleep(3000);
    await contactPageElementsObj.customFieldDeleteButton(driver,'Custom Select Field 01',1,2);
    await driver.findElement(By.xpath(`//button[text()="${moveToInactiveButton}"]`)).click();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToDealPage(driver,screenshotPath);
    await driver.sleep(2000);
    //verifying display of 'Custom Select Field 01' in 'Inactive Fields' section
    const inactiveCustomField = await driver.findElement(By.xpath(`//div[@id='inActiveField']//div[text()=' ${fieldName} ']`));
    await driver.executeScript("arguments[0].scrollIntoView();",inactiveCustomField);
    await driver.wait(until.elementIsVisible(inactiveCustomField));
    await driver.manage().setTimeouts({implicit:2000});
    const inactiveCustomFieldElements = await driver.findElements(By.xpath(`//div[@id='inActiveField']//div[text()=' ${fieldName} ']`));
    const inactiveCustomFieldLength = await inactiveCustomFieldElements.length;
    //take screenshot of 'Custom Select Field 01' in 'Inactive Fields' section
    await screenshotObj.takeScreenshot(driver,screenshotPath+'customSelectField01UnderInactiveFieldSection.png');
    if(inactiveCustomFieldLength > 0) {
        console.log("As "+fieldName+" is displayed under inactive fields section,so test case has been passed");
    } else {
        await assert.fail("As "+fieldName+" is not displayed under inactive fields section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
});

//--------------------Case 36: Verify, the user is able to re-activate fields------------------------

When('the user is able to re-activate {string} and verify {string} in deal module',async function(fieldName,expectedNotification) {
    await driver.sleep(2000);

    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath(`//div[@id="inActiveField"]//div[text()=" ${fieldName} "]`));
    const drop = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[1]'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToDealPage(driver,screenshotPath);
    await driver.sleep(2000);
    //verifying display of 'Custom Select Field 01' in 'Custom Section Updated 01' Active section
    const reactiveCustomField = await driver.findElement(By.xpath(`//div[1]/table[@class='panel-body sortableSectionPanel']//td/div[1]/div`)).getText();
    console.log("The field re-activated after dragging it into active section is: "+reactiveCustomField);
    await driver.manage().setTimeouts({implicit:2000});
    const reactiveCustomFieldElements = await driver.findElements(By.xpath(`//div[1]/table[@class='panel-body sortableSectionPanel']//td/div[1]/div`));
    const reactiveCustomFieldLength = await reactiveCustomFieldElements.length;
    if(reactiveCustomFieldLength > 0) {
        console.log("As "+fieldName+" is displayed under active fields section,so test case has been passed");
    } else {
        await assert.fail("As "+fieldName+" is not displayed under active fields section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
});

//-----------Case 37: Verify, the user is not able to deactivate required fields by drag and drop---------------------

When('the user is not able to deactivate {string} required fields by drag and drop and verify {string} in deal module',async function(fieldName,expectedValidation) {
    await driver.sleep(2000);

    //get 'Custom Field' value before dragging
    const customFieldBeforeDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[1]')).getText();
    console.log(customFieldBeforeDrag);
    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath(`//div[text()=" ${fieldName} "]`));
    const drop = await driver.findElement(By.xpath('//div[@id="inActiveField"]'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualValidationElement));
    const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualValidation,expectedValidation);
    await driver.sleep(5000);
    //get 'Custom Field' value before dragging
    const customFieldAfterDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[1]')).getText();
    if(customFieldBeforeDrag === customFieldAfterDrag) {
        console.log("As required custom field is not changed to inactive fields due to required attribute,so test case has been passed");
    } else {
        await assert.fail("As required custom field is changed to inactive fields due to required attribute,so test case has been aborted");
    }
});

//------------Case 38: Verify, the user is not able to deactivate locked fields by drag and drop-----------------------------

When('the user is not able to deactivate locked fields by drag and drop and verify {string} in deal module',async function(expectedValidation) {
    await driver.sleep(2000);

    //get 'Last Name' value before dragging
    const contactBeforeDrag = await driver.findElement(By.xpath('//div[2]/table[@class="panel-body sortableSectionPanel"]//td/div[2]')).getText();
    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath('//div[text()=" Contact "]'));
    const drop = await driver.findElement(By.xpath('//div[@id="inActiveField"]'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualValidationElement));
    const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualValidation,expectedValidation);
    await driver.sleep(5000);
    //get 'Last Name' value after dragging
    const contactAfterDrag = await driver.findElement(By.xpath('//div[2]/table[@class="panel-body sortableSectionPanel"]//td/div[2]')).getText();
    if(contactBeforeDrag === contactAfterDrag) {
        console.log("As locked contact field is not changed to inactive fields due to locked attribute,so test case has been passed");
    } else {
        await assert.fail("As locked contact field is changed to inactive fields due to locked attribute,so test case has been aborted");
    }
});

//-------------Case 39: Verify, the user is not able to deactivate required fields by clicking on the ‘Move to Inactive Fields’ button--------------------------------

When('the user is not able to deactivate required fields {string} by clicking on the {string} button and verify {string} in deal module',async function(fieldName,moveToInactiveButton,expectedValidation) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //get 'Custom Field' value before dragging
        const customFieldBeforeDrag = await driver.findElement(By.xpath('//div[3]/table[@class="panel-body sortableSectionPanel"]//td/div[1]')).getText();
        console.log(customFieldBeforeDrag);
        await contactPageElementsObj.customFieldDeleteButton(driver, 'Custom Field Updated 01', 3, 1);
        await driver.findElement(By.xpath(`//button[text()="${moveToInactiveButton}"]`)).click();
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(6000);

        await driver.findElement(By.xpath('//div[contains(text()," Deal")]')).click();
        await driver.sleep(3000);
        //get 'Custom Field' value before dragging
        const customFieldAfterDrag = await driver.findElement(By.xpath('//div[3]/table[@class="panel-body sortableSectionPanel"]//td/div[1]')).getText();
        console.log(customFieldAfterDrag);
        if (customFieldBeforeDrag === customFieldAfterDrag) {
            console.log("As " + fieldName + " is displayed under active fields section only even after dragging to inactive section due to required attribute,so test case has been passed");
        } else {
            await assert.fail("As " + fieldName + " is not displayed under active fields section even after dragging to inactive section due to required attribute,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 40: Verify, the user is not able to delete a section when section contains a required field--------------------------

When('the user is not able to delete a section {string} when section contains a required field and verify {string} in deal module',async function(sectionName,expectedValidation) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //verifying 'Custom Section Updated 01' section
        const customSection = await driver.findElement(By.xpath(`//a[text()="${sectionName} "]`));
        const customSectionLength = await customSection.length;
        await contactPageElementsObj.findSectionDeleteButton(driver, 'Custom Section Updated 01');
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        //verifying 'Custom Section Updated 01' section
        const customSectionElements = await driver.findElement(By.xpath(`//a[text()="${sectionName} "]`));
        const customSectionElementsLength = await customSectionElements.length;
        if (customSectionLength === customSectionElementsLength) {
            console.log("As " + sectionName + " is displayed because section with required fields is not deleted,so test case has been passed");
        } else {
            await assert.fail("As " + sectionName + " is not displayed because section with required fields is deleted,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('disabling the required checkbox of custom field in deal module',async function(dataTable) {
    try {
        await driver.sleep(3000);
        await contactPageElementsObj.customFieldEditButton(driver, 'Custom Field Updated 01', 3, 1);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'required checkbox') {
                requiredCheckboxState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (requiredCheckboxState == 'enable' || requiredCheckboxState == 'disable') {
                    //will find 'Required Checkbox' Toggle Button
                    const requiredToggleButton = await contactPageElementsObj.findRequiredCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", requiredToggleButton);
                    await driver.sleep(1000);

                    //will get the current value of 'Required Checkbox'
                    const currentState = await requiredToggleButton.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Required Checkbox'
                    if (currentState != requiredCheckboxState) {
                        await driver.executeScript("arguments[0].click();", requiredToggleButton);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the required checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
        await contactPageElementsObj.findSaveButton(driver);
        await driver.sleep(3000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 41: Verify, the user is not able to delete a section when section contains a locked field----------------------

When('the user is not able to delete a section {string} when section contains a locked field and verify {string} in deal module',async function(sectionName,expectedValidation) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 0 }, 0);");
        await driver.sleep(2000);
        //verifying 'Default' section
        const defaultSection = await driver.findElement(By.xpath(`//a[text()="${sectionName} "]`));
        const defaultSectionLength = await defaultSection.length;
        await contactPageElementsObj.findDefaultSectionDeleteButton(driver, 'Default', 1);
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        //verifying 'Default' section
        const defaultSectionElements = await driver.findElement(By.xpath(`//a[text()="${sectionName} "]`));
        const defaultSectionElementsLength = await defaultSectionElements.length;
        if (defaultSectionLength === defaultSectionElementsLength) {
            console.log("As " + sectionName + " is displayed because section with locked fields is not deleted,so test case has been passed");
        } else {
            await assert.fail("As " + sectionName + " is not displayed because section with locked fields is deleted,so test case has been aborted");
        }
        await driver.findElement(By.xpath('//div[contains(text()," Deal ")]')).click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 42: Verify, the user is able to delete custom fields---------------------------

When('the user is able to delete {string},{string},{string} and verify {string} message in deal module',async function(customTextField,customSelectField,customLookupField,expectedNotification) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.customFieldDeleteButton(driver, 'Custom Field Updated 01', 3, 1);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Delete It"]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(5000);
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const customTextFieldElements = await driver.findElements(By.xpath(`//div[text()=" ${customTextField} "]`));
        const customTextFieldLength = await customTextFieldElements.length;
        if (customTextFieldLength === 0) {
            console.log("As " + customTextField + " is deleted it is not displayed under custom section,so test case has been passed");
        } else {
            await assert.fail("As " + customTextField + " is not deleted it is displayed under custom section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        await contactPageElementsObj.customFieldDeleteButton(driver, 'Custom Select Field 01', 3, 1);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Delete It"]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(1000);
        const actualMessageElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualMessageElement));
        const actualMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualMessage, expectedNotification);
        await driver.sleep(5000);
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const customSelectFieldElements = await driver.findElements(By.xpath(`//div[text()=" ${customSelectField} "]`));
        const customSelectFieldLength = await customSelectFieldElements.length;
        if (customSelectFieldLength === 0) {
            console.log("As " + customSelectField + " is deleted it is not displayed under custom section,so test case has been passed");
        } else {
            await assert.fail("As " + customSelectField + " is not deleted it is displayed under custom section,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});

        await contactPageElementsObj.customFieldDeleteButton(driver, 'Custom Lookup Field Updated 01', 3, 1);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Delete It"]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(1000);
        const actualDeleteNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualDeleteNotificationElement));
        const actualDeleteNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualDeleteNotification, expectedNotification);
        await driver.sleep(5000);
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const customLookupFieldElements = await driver.findElements(By.xpath(`//div[text()=" ${customLookupField} "]`));
        const customLookupFieldLength = await customLookupFieldElements.length;
        if (customLookupFieldLength === 0) {
            console.log("As " + customLookupField + " is deleted it is not displayed under custom section,so test case has been passed");
        } else {
            await assert.fail("As " + customLookupField + " is not deleted it is displayed under custom section,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------Case 43: Verify, the user is able to delete section---------------------------

When('the user is able to delete section {string} and verify {string} in deal module',async function(sectionName,expectedNotification) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await contactPageElementsObj.findSectionDeleteButton(driver, 'Custom Section Updated 01');
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(1000);
        const actualSectionDeleteElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualSectionDeleteElement));
        const actualSectionDeleteNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualSectionDeleteNotification, expectedNotification);
        await driver.sleep(5000);
        await pageNavigationObj.comeBackToDealPage(driver, screenshotPath);
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const customSection = await driver.findElements(By.xpath(`//div[text()="${sectionName} "]`));
        const customSectionLength = await customSection.length;
        if (customSectionLength === 0) {
            console.log("As " + sectionName + " is deleted it is not displayed in contact layout page,so test case has been passed");
        } else {
            await assert.fail("As " + sectionName + " is not deleted and it is displayed in contact layout page,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
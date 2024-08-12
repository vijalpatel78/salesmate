const { Given,When,Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openActivityPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/customizations/activityLayout/screenshots/';
const contactPageElementsObj = require('../../contactLayout/common/contactLayoutElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const commonElementsObj = require('../../../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const tagManagementElementsObj = require('../../../customizations/tagManagement/common/tagManagementPageElements');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let sectionNameFieldData = 'no', columnLayoutData = 'no', labelNameFieldData = 'no';
let requiredCheckboxState = 'no', listValue1Data = 'no',listValue2Data = 'no', listValue3Data = 'no';
let associationTypeState = 'no', recordLabelNameData = 'no', searchFieldData = 'no', labelNameBeforeUpdation, recordLabelBeforeUpdation;
let parentFieldData = 'no', childFieldData = 'no';

Given('the {string} is on activity page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/customization/layouts/2')){
        console.log('The activity page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open activity page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on activity page');
        //will open the activity page
        await openActivityPageObj.openActivityPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open activity page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on activity page');
        //will open the activity page
        await openActivityPageObj.openActivityPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the activity page
        await openActivityPageObj.openActivityPage(driver,screenshotPath);
    }
});

//------------Case 1: Verify, the system should display a singular module name on the header----------------------------------

When('the system displays a singular module activity on the header',async function() {
    await driver.sleep(2000);

    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' System Modules ');
    //will set focus on the 'System Modules' tab
    await driver.executeScript("arguments[0].scrollIntoView();", systemModulesTab[0]);
    await driver.wait(until.elementIsVisible(systemModulesTab[0]));
    //will click on the 'System Modules' tab
    await systemModulesTab[0].click();
    await driver.sleep(2000);

    //click on 'Activity Edit' button module
    await tagManagementElementsObj.findModulesEditButton(driver,'Activity');
    await driver.sleep(2000);
    //screenshot for displayed 'Activity' Module
    await screenshotObj.takeScreenshot(driver,screenshotPath+'activityModule.png');
    //get values of 'Singular and Plural' modules
    const activitySingularModule = await driver.findElement(By.id('singularName')).getAttribute('value');
    console.log("Singular Name: "+activitySingularModule);
    const activityPluralModule = await driver.findElement(By.id('pluralName')).getAttribute('value');
    console.log("Plural Name: "+activityPluralModule);

    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const activityTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Activity ');
    //will set focus on the 'Activity' tab
    await driver.executeScript("arguments[0].scrollIntoView();", activityTab[0]);
    await driver.wait(until.elementIsVisible(activityTab[0]));
    //will click on the 'Activity' tab
    await activityTab[0].click();
    await driver.sleep(3000);

    //get title of 'Activity' Module page
    const currentPageHeader = await driver.findElement(By.xpath('//div[@class="sub-title pull-left"]')).getText();
    console.log("Current Page Header: "+currentPageHeader);
    //verify whether opened 'Activity' module page contains singular module name or not
    if(await currentPageHeader.includes('Activity')) {
        console.log("As activity module page contains "+currentPageHeader+" so,test case has been passed");
    } else {
        await assert.fail("As activity page does not contains "+currentPageHeader+" so,test case has been aborted");
    }
});

//-----------------------------Case 2: Verify, the user is able to add a new custom field----------------------------------

When('the user is able to add a new custom field in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(2000);
    await contactPageElementsObj.selectFieldType(driver,'Text');
    await driver.sleep(1000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'groupId',sectionNameFieldData,'yes');
        } else if(fieldName == 'required checkbox') {
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
});

Then('verify {string} successful notification message in activity module',async function(expectedFieldNotification) {
    await driver.sleep(1000);
    console.log("Custom Field Values before navigation:");
    const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(labelName);
    const sectionName = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const sectionNameText = await sectionName.getText();
    console.log(sectionNameText);
    const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(requiredCheckbox);
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(notificationMsgElement));
    const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(notificationMsg,expectedFieldNotification);
    await driver.sleep(5000);
    //page navigation and come back to 'Activity Layout' Page
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.manage().setTimeouts({implicit: 2000});
    //verify newly added 'Label Name', 'Section Name' and 'Required' in section
    const newlyAddedLabel = await driver.findElement(By.xpath(`//div[text()=' ${labelName} ']`));
    await driver.executeScript("arguments[0].scrollIntoView();",newlyAddedLabel);
    await driver.wait(until.elementIsVisible(newlyAddedLabel));
    const newlyAddedLabelElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
    const newlyAddedLabelLength = await newlyAddedLabelElements.length;
    const newlyAddedSection = await driver.findElement(By.xpath(`//a[text()='${sectionNameText} ']`));
    await driver.executeScript("arguments[0].scrollIntoView();",newlyAddedSection);
    await driver.wait(until.elementIsVisible(newlyAddedSection));
    const newlyAddedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionNameText} ']`));
    const newlyAddedSectionLength = await newlyAddedSectionElements.length;
    const requiredElements = await driver.findElements(By.xpath("//div[1]/table[@class='panel-body sortableSectionPanel']//td/div/div//span[@class='label label-danger lter m-r-xs']"));
    const requiredLength = await requiredElements.length;
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    if(newlyAddedLabelLength > 0 && newlyAddedSectionLength > 0 && requiredLength > 0) {
        console.log("As newly added "+labelName+ " and "+sectionNameText+" and Required are displayed in section,so test case has been passed");
    } else {
        await assert.fail("As newly added "+labelName+ " and "+sectionNameText+" and Required are not displayed in section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Field 01',1,24);
    await driver.sleep(2000);
    console.log("Custom Field Values after navigation:");
    const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(editPageLabelName);
    const editPageSectionName = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const editPageSectionText = await editPageSectionName.getText();
    console.log(editPageSectionText);
    const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(editPageRequiredCheckbox);
    if(labelName === editPageLabelName && sectionNameText === editPageSectionText && requiredCheckbox === editPageRequiredCheckbox) {
        console.log("As "+labelName+" and" +sectionNameText+" and "+requiredCheckbox+" in 06_contact layout page are equal to "+editPageLabelName+" and"+editPageSectionText+" and"+editPageRequiredCheckbox+" in edit page,so test case has been passed");
    } else {
        await assert.fail("As "+labelName+" and" +sectionNameText+" and "+requiredCheckbox+" in 06_contact layout page are not equal to "+editPageLabelName+" and"+editPageSectionText+" and"+editPageRequiredCheckbox+" in edit page,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//------------------Case 3: Verify, the user is able to add a select and multi-select type custom fields-------------------------------

When('the user is able to add a select and multi-select type custom fields in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.selectFieldType(driver,'Multi Select');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'groupId',sectionNameFieldData,'no');
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
            await listTextAreaField.sendKeys(listValue1Data+"\n"+listValue2Data+"\n"+listValue3Data);
            await driver.sleep(500);
        } else if(fieldName == 'required checkbox') {
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
});

Then('verify {string} notification successful message in activity module',async function(expectedNotification) {
    await driver.sleep(1000);
    console.log("Custom Field Values before navigation:");
    const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(labelName);
    const sectionName = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const sectionNameText = await sectionName.getText();
    console.log(sectionNameText);
    const listValue = await  driver.findElement(By.id('selectMultiSelectOptions')).getAttribute('value');
    console.log(listValue);
    const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(requiredCheckbox);
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    //page navigation and come back to 'Activity Layout' Page
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(3000);
    await driver.manage().setTimeouts({implicit: 2000});

    //verify newly added 'Label Name', 'Section Name', 'List Values' and 'Required' in section
    const newlyAddedLabel = await driver.findElement(By.xpath(`//div[text()=' ${labelName} ']`));
    await driver.executeScript("arguments[0].scrollIntoView();",newlyAddedLabel);
    await driver.wait(until.elementIsVisible(newlyAddedLabel));
    const newlyAddedLabelElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
    const newlyAddedLabelLength = await newlyAddedLabelElements.length;
    const newlyAddedSection = await driver.findElement(By.xpath(`//a[text()='${sectionNameText} ']`));
    await driver.executeScript("arguments[0].scrollIntoView();",newlyAddedSection);
    await driver.wait(until.elementIsVisible(newlyAddedSection));
    const newlyAddedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionNameText} ']`));
    const newlyAddedSectionLength = await newlyAddedSectionElements.length;
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    if(newlyAddedLabelLength > 0 && newlyAddedSectionLength > 0) {
        console.log("As newly added "+labelName+ " and "+sectionNameText+" are displayed in section,so test case has been passed");
    } else {
        await assert.fail("As newly added "+labelName+ " and "+sectionNameText+" are not displayed in section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Select Field 01',1,25);
    await driver.sleep(2000);
    console.log("Custom Field Values after navigation:");
    const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(editPageLabelName);
    const editPageSectionName = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const editPageSectionText = await editPageSectionName.getText();
    console.log(editPageSectionText);
    const editPageListValue1 = await  driver.findElement(By.id('option__0')).getAttribute('value');
    const editPageListValue2 = await  driver.findElement(By.id('option__1')).getAttribute('value');
    const editPageListValue3 = await  driver.findElement(By.id('option__2')).getAttribute('value');
    const editPageListValue = editPageListValue1+"\n"+editPageListValue2+"\n"+editPageListValue3;
    console.log(editPageListValue);
    const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(editPageRequiredCheckbox);
    if(labelName === editPageLabelName && sectionNameText === editPageSectionText && listValue === editPageListValue && requiredCheckbox === editPageRequiredCheckbox) {
        console.log("As "+labelName+" and" +sectionNameText+" and "+editPageListValue1+ editPageListValue2+ editPageListValue3+"and "+requiredCheckbox+" in 06_contact layout page are equal to "+editPageLabelName+" and"+editPageSectionText+" and"+editPageRequiredCheckbox+" in edit page,so test case has been passed");
    } else {
        await assert.fail("As "+labelName+" and" +sectionNameText+" and "+editPageListValue1+ editPageListValue2+ editPageListValue3+"and "+requiredCheckbox+" in 06_contact layout page are not equal to "+editPageLabelName+" and"+editPageSectionText+" and"+editPageRequiredCheckbox+" in edit page,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//-------------------------Case 4: Verify, the user is able to add a lookup type custom fields-------------------------------------

When('the user is able to add a lookup type custom fields in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.selectFieldType(driver,'Contact Lookup');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if(fieldName == 'association type') {
            associationTypeState = dataTable.rawTable[i][1].toLowerCase();

            //will check that the provided data is valid to execute a test case or not
            if (associationTypeState == 'enable' || associationTypeState == 'disable') {
                //will find 'Association Type' Toggle Button
                const associationTypeToggleButton = await contactPageElementsObj.findAssociationTypeField(driver,'Multiple');
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
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'groupId',sectionNameFieldData,'no');
        } else if(fieldName == 'required checkbox') {
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
});

Then('verify {string} field notification message in activity module',async function(expectedNotification) {
    await driver.sleep(1000);
    console.log("Custom Field Values before navigation:");
    const assignTypeCheckbox = await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('value');
    console.log(assignTypeCheckbox);
    const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(labelName);
    const recordLabelName = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log(recordLabelName);
    const sectionName = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const sectionNameText = await sectionName.getText();
    console.log(sectionNameText);
    const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(requiredCheckbox);
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(6000);
    //page navigation and come back to 'Activity Layout' Page
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(3000);
    await driver.manage().setTimeouts({implicit: 2000});

    //verify newly added 'Label Name', 'Record Label','Section Name' and 'Required' in section
    const newlyAddedLabel = await driver.findElement(By.xpath(`//div[text()=' ${labelName} ']`));
    await driver.executeScript("arguments[0].scrollIntoView();",newlyAddedLabel);
    await driver.wait(until.elementIsVisible(newlyAddedLabel));
    const newlyAddedLabelElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
    const newlyAddedLabelLength = await newlyAddedLabelElements.length;
    const newlyAddedSection = await driver.findElement(By.xpath(`//a[text()='${sectionNameText} ']`));
    await driver.executeScript("arguments[0].scrollIntoView();",newlyAddedSection);
    await driver.wait(until.elementIsVisible(newlyAddedSection));
    const newlyAddedSectionElements = await driver.findElements(By.xpath(`//a[text()='${sectionNameText} ']`));
    const newlyAddedSectionLength = await newlyAddedSectionElements.length;
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    if(newlyAddedLabelLength > 0 && newlyAddedSectionLength > 0) {
        console.log("As newly added "+labelName+ " and "+sectionNameText+" are displayed in section,so test case has been passed");
    } else {
        await assert.fail("As newly added "+labelName+ " and "+sectionNameText+" are not displayed in section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field 01',1,26);
    await driver.sleep(2000);
    console.log("Custom Field Values after navigation:");
    const editPageAssignTypeCheckbox = await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('value');
    console.log(editPageAssignTypeCheckbox);
    const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(editPageLabelName);
    const editPageRecordLabelName = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log(editPageRecordLabelName);
    const editPageSectionName = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const editPageSectionNameText = await editPageSectionName.getText();
    console.log(editPageSectionNameText);
    const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(editPageRequiredCheckbox);
    if(assignTypeCheckbox === editPageAssignTypeCheckbox && labelName === editPageLabelName && recordLabelName === editPageRecordLabelName && sectionNameText === editPageSectionNameText && requiredCheckbox === editPageRequiredCheckbox) {
        console.log("As "+labelName+","+recordLabelName+" and" +sectionNameText+"and "+requiredCheckbox+" in 06_contact layout page are equal to "+editPageLabelName+" and" +editPageRecordLabelName+" and "+editPageSectionNameText+" and "+editPageRequiredCheckbox+" in edit page,so test case has been passed");
    } else {
        await assert.fail("As "+labelName+","+recordLabelName+" and" +sectionNameText+"and "+requiredCheckbox+" in 06_contact layout page are equal to "+editPageLabelName+" and" +editPageRecordLabelName+" and "+editPageSectionNameText+" and "+editPageRequiredCheckbox+" in edit page,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

///-----------Case 5: Verify, the user is not able to leave required fields as a blank while adding a new custom field--------------------------------------

When('the user is not able to leave required fields as a blank while adding a new custom field in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //get count of 'Custom fields' in section before adding invalid custom field
    const customFields = await contactPageElementsObj.findCustomFieldsCount(driver);
    const customFieldsBeforeAddingInvalidField = await customFields.length;

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.selectFieldType(driver,'Contact Lookup');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    const actualLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver,1)
    strictEqual(actualLabelValidation,'Please provide label');
    await driver.sleep(1000);
    const actualRecordLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver,2);
    strictEqual(actualRecordLabelValidation,'Please provide related record label');
    await driver.sleep(1000);

    //click on 'Change' Link
    await contactPageElementsObj.findChangeLink(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.selectFieldType(driver,'Multi Select');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    const labelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver,1);
    strictEqual(labelValidation,'Please provide label');
    await driver.sleep(1000);
    const listValidation = await driver.findElement(By.xpath("//sm-textarea-txt/sm-element//div[@class='error-message text-danger']")).getText();
    strictEqual(listValidation,'Should have at least one option');
    await driver.sleep(1000);

    //click on 'Change' Link
    await contactPageElementsObj.findChangeLink(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.selectFieldType(driver,'Text');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    const actualLabelValidationMsg = await contactPageElementsObj.findLabelRecordListValidation(driver,1);
    strictEqual(actualLabelValidationMsg,'Please provide label');
    await driver.sleep(1000);
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);

    //get count of 'Custom fields' in section after adding invalidation custom field
    const customFieldElements = await contactPageElementsObj.findCustomFieldsCount(driver);
    const customFieldsAfterAddingInvalidField = await customFieldElements.length;
    if(customFieldsBeforeAddingInvalidField === customFieldsAfterAddingInvalidField) {
        console.log("As custom fields count before and after adding invalid custom fields are equal,so test case has been passed");
    } else {
        await assert.fail("As custom fields count before and after adding invalid custom fields are not equal,so test case has been aborted");
    }
});

//-------Case 6: Verify, the user is not able to add a new custom field with more than 100 chars label name------------------------------------

When('the user is not able to add a new custom field with more than 100 chars in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //get count of 'Custom fields' in section before adding exceed length custom field
    const customFields = await contactPageElementsObj.findCustomFieldsCount(driver);
    const customFieldsBeforeAddingExceedLengthField = await customFields.length;

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.selectFieldType(driver,'Contact Lookup');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    const actualLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver,1)
    strictEqual(actualLabelValidation,'Should be maximum 100 characters');
    await driver.sleep(1000);
    const actualRecordLabelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver,2);
    strictEqual(actualRecordLabelValidation,'Should be maximum 100 characters');
    await driver.sleep(1000);

    //click on 'Change' Link
    await contactPageElementsObj.findChangeLink(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.selectFieldType(driver,'Multi Select');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    const labelValidation = await contactPageElementsObj.findLabelRecordListValidation(driver,1);
    strictEqual(labelValidation,'Should be maximum 100 characters');
    await driver.sleep(1000);

    //click on 'Change' Link
    await contactPageElementsObj.findChangeLink(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.selectFieldType(driver,'Text');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    const actualLabelValidationMsg = await contactPageElementsObj.findLabelRecordListValidation(driver,1);
    strictEqual(actualLabelValidationMsg,'Should be maximum 100 characters');
    await driver.sleep(1000);
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);

    //get count of 'Custom fields' in section after adding exceed length custom field
    const customFieldElements = await contactPageElementsObj.findCustomFieldsCount(driver);
    const customFieldsAfterAddingExceedLengthField = await customFieldElements.length;
    if(customFieldsBeforeAddingExceedLengthField === customFieldsAfterAddingExceedLengthField) {
        console.log("As custom fields count before and after adding exceed length custom fields are equal,so test case has been passed");
    } else {
        await assert.fail("As custom fields count before and after adding exceed length custom fields are not equal,so test case has been aborted");
    }
});

//---------Case 7: Verify, the user is able to search a field type while adding a new custom field------------------------------

When('the user is able to search a field type while adding a new custom field in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(3000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    if(searchResultsLength > 0) {
        console.log("As search results are found for valid search data,so test case has been passed");
    } else {
        await assert.fail("As search results are not found for valid search data,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    if(searchResultLength === 0) {
        console.log("As search results are not found for invalid search data,so test case has been passed");
    } else {
        await assert.fail("As search results are found for valid search data,test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//------------------Case 8: Verify, the user is able to change field type while adding a new custom field---------------------------------------

When('the user is able to change field type while adding a new custom field in activity module',async function() {
    await driver.sleep(2000);

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(2000);
    console.log('1');
    await contactPageElementsObj.selectFieldType(driver,'Text');
    await driver.sleep(1000);
    console.log('2');
    await contactPageElementsObj.findChangeLink(driver);
    await driver.sleep(2000);
    console.log('3');
    await contactPageElementsObj.selectFieldType(driver,'Date');
    await driver.sleep(2000);
    console.log('4');
    await driver.manage().setTimeouts({implicit: 10000});
    const dateElements = await driver.findElements(By.xpath('//b[contains(text(), "Date field for Activities")]'));
    const dateElementsLength = await dateElements.length;
    if(dateElementsLength > 0) {
        console.log("As date field for contacts element is found,so test case has been passed");
    } else {
        await assert.fail("As date field contacts element is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//-------------Case 9: Verify, the new custom field details should not get changed on selecting the same type again----------------------------------

When('the new custom field details should not get changed on selecting the same type again in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.selectFieldType(driver,'Company Lookup');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if(fieldName == 'association type') {
            associationTypeState = dataTable.rawTable[i][1].toLowerCase();

            //will check that the provided data is valid to execute a test case or not
            if (associationTypeState == 'enable' || associationTypeState == 'disable') {
                //will find 'Association Type' Toggle Button
                const associationTypeToggleButton = await contactPageElementsObj.findAssociationTypeField(driver,'Multiple');
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
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'groupId',sectionNameFieldData,'no');
        } else if(fieldName == 'required checkbox') {
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
    const sectionName = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const sectionNameBeforeChangingLink = await sectionName.getText();
    console.log(sectionNameBeforeChangingLink);
    const requiredCheckboxBeforeChangingLink = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(requiredCheckboxBeforeChangingLink);
    await contactPageElementsObj.findChangeLink(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.selectFieldType(driver,'Company Lookup');
    await driver.sleep(2000);
    //get values of 'Assign Type', 'Label', 'Record Label', 'Section Name' and 'Required Checkbox' after changing link
    const assignTypeAfterChangingLink = await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('value');
    console.log(assignTypeAfterChangingLink);
    const labelNameAfterChangingLink = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(labelNameAfterChangingLink);
    const recordLabelAfterChangingLink = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log(recordLabelAfterChangingLink);
    const sectionNameElements = await commonElementsObj.findDropdown(driver,screenshotPath,'groupId');
    const sectionNameAfterChangingLink = await sectionNameElements.getText();
    console.log(sectionNameAfterChangingLink);
    const requiredCheckboxAfterChangingLink = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(requiredCheckboxAfterChangingLink);
    //compare values before and after changing link
    if(assignTypeBeforeChangingLink === assignTypeAfterChangingLink && labelNameBeforeChangingLink === labelNameAfterChangingLink && recordLabelBeforeChangingLink === recordLabelAfterChangingLink && sectionNameBeforeChangingLink === sectionNameAfterChangingLink && requiredCheckboxBeforeChangingLink === requiredCheckboxAfterChangingLink) {
        console.log("As "+assignTypeBeforeChangingLink+labelNameBeforeChangingLink+recordLabelBeforeChangingLink+sectionNameBeforeChangingLink+requiredCheckboxBeforeChangingLink+" are equal to "+assignTypeAfterChangingLink+labelNameAfterChangingLink+recordLabelAfterChangingLink+sectionNameAfterChangingLink+requiredCheckboxAfterChangingLink+" so,test case has been passed");
    } else {
        await assert.fail("As "+assignTypeBeforeChangingLink+labelNameBeforeChangingLink+recordLabelBeforeChangingLink+sectionNameBeforeChangingLink+requiredCheckboxBeforeChangingLink+" are not equal to "+assignTypeAfterChangingLink+labelNameAfterChangingLink+recordLabelAfterChangingLink+sectionNameAfterChangingLink+requiredCheckboxAfterChangingLink+" so,test case has been aborted")
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//-----------Case 10: Verify, the new custom field details should get changed on selecting the different type-----------------------------------------

When('the new custom field details should get changed on selecting the different type in activity module',async function(dataTable) {
    await driver.sleep(2000);

    //click on 'New Custom Field' button
    await contactPageElementsObj.findNewCustomFieldButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.selectFieldType(driver,'Company Lookup');
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if(fieldName == 'association type') {
            associationTypeState = dataTable.rawTable[i][1].toLowerCase();

            //will check that the provided data is valid to execute a test case or not
            if (associationTypeState == 'enable' || associationTypeState == 'disable') {
                //will find 'Association Type' Toggle Button
                const associationTypeToggleButton = await contactPageElementsObj.findAssociationTypeField(driver,'Multiple');
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
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'groupId',sectionNameFieldData,'no');
        } else if(fieldName == 'required checkbox') {
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
    await contactPageElementsObj.selectFieldType(driver,'Text');
    await driver.sleep(2000);

    //screenshot of 'Unset' values of 'Changing to text link'
    await screenshotObj.takeScreenshot(driver,screenshotPath+'unsetValuesOfText.png');

    //get values of 'Label Name' after changing link to 'Text' type
    const labelNameAfterChangingTextLink = await driver.findElement(By.id('displayName')).getAttribute('value');
    //compare label value before and after changing link
    if(labelNameBeforeChangingLink !== labelNameAfterChangingTextLink) {
        console.log("As "+labelNameBeforeChangingLink+" is not equal to "+labelNameAfterChangingTextLink+" so,test case has been passed");
    } else {
        await assert.fail("As "+labelNameBeforeChangingLink+" is equal to "+labelNameAfterChangingTextLink+" so,test case has been aborted");
    }
    await contactPageElementsObj.findChangeLink(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.selectFieldType(driver,'Company Lookup');
    await driver.sleep(2000);

    //screenshot of 'Unset' values of 'Changing to company lookup link'
    await screenshotObj.takeScreenshot(driver,screenshotPath+'unsetValuesOfCompanyLookup.png');

    //get values of 'Label' and 'Record Label' after changing back to 'Company Lookup' link
    const labelNameAfterChangingLink = await driver.findElement(By.id('displayName')).getAttribute('value');
    const recordLabelAfterChangingLink = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');

    //compare values of before and after coming back to 'Company Lookup'
    if(labelNameBeforeChangingLink !== labelNameAfterChangingLink && recordLabelBeforeChangingLink !== recordLabelAfterChangingLink) {
        console.log("As "+labelNameBeforeChangingLink+recordLabelBeforeChangingLink+" are not equal to "+labelNameAfterChangingLink+recordLabelAfterChangingLink+" as values are unset after changing to different select type,so test case has been passed");
    } else {
        await assert.fail("As "+labelNameBeforeChangingLink+recordLabelBeforeChangingLink+" are equal to "+labelNameAfterChangingLink+recordLabelAfterChangingLink+" as values remains as set after changing to different select type,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//------------Case 11: Verify, the user is able to update the custom field label and required settings----------------------------------------

When('the user is able to update the custom field label and required settings in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Field 01',1,24);
    await driver.sleep(1000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
        } else if(fieldName == 'required checkbox') {
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
});

Then('verify {string} successfully notification message in activity module',async function(expectedUpdationMsg) {
    await driver.sleep(1000);
    const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(labelName);
    const requiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    console.log(requiredCheckbox);
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const actualUpdationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualUpdationMsgElement));
    const actualUpdationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualUpdationMsg,expectedUpdationMsg);
    await driver.sleep(5000);
    //page navigation and come back to 'Activity Layout' Page
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.manage().setTimeouts({implicit: 2000});

    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    //verify updated 'Label Name' and 'Required' in section
    const updatedElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
    const updatedLabelLength = await updatedElements.length;
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    if(updatedLabelLength > 0) {
        console.log("As updated "+labelName+ " is displayed in section,so test case has been passed");
    } else {
        await assert.fail("As updated "+labelName+ " is not displayed in section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Field Updated 01',1,24);
    await driver.sleep(2000);
    const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    const editPageRequiredCheckbox = await driver.findElement(By.id('isRequired')).getAttribute('value');
    if(labelName === editPageLabelName && requiredCheckbox === editPageRequiredCheckbox) {
        console.log("As "+labelName+" and "+requiredCheckbox+" in 06_contact layout page are equal to "+editPageLabelName+" and"+editPageRequiredCheckbox+" in edit page,so test case has been passed");
    } else {
        await assert.fail("As "+labelName+" and "+requiredCheckbox+" in 06_contact layout page are not equal to "+editPageLabelName+" and"+editPageRequiredCheckbox+" in edit page,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//--------Case 12: Verify, the user is able to change the label and related record label of custom lookup field---------------------------------------

When('the user is able to change the label and related record label of custom lookup field in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field 01',1,26);
    await driver.sleep(1000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
});

Then('verify {string} field updated notification in activity module',async function(expectedUpdationNotification) {
    await driver.sleep(1000);
    const labelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log(labelName);
    const recordLabelName = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log(recordLabelName);
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const actualUpdationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualUpdationMsgElement));
    const actualUpdationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualUpdationMsg,expectedUpdationNotification);
    await driver.sleep(5000);
    //page navigation and come back to 'Activity Layout' Page
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.manage().setTimeouts({implicit: 2000});

    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    //verify updated 'Label Name' section
    const updatedElements = await driver.findElements(By.xpath(`//div[text()=' ${labelName} ']`));
    const updatedLabelLength = await updatedElements.length;
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    if(updatedLabelLength > 0) {
        console.log("As updated "+labelName+ " is displayed in section,so test case has been passed");
    } else {
        await assert.fail("As updated "+labelName+ " is not displayed in section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field Updated 01',1,26);
    await driver.sleep(2000);
    //get values of 'Label Name' and 'Record Label Name' in 'Edit' page
    const editPageLabelName = await driver.findElement(By.id('displayName')).getAttribute('value');
    const editPageRecordLabel = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    if(labelName === editPageLabelName && recordLabelName === editPageRecordLabel) {
        console.log("As "+labelName+" and "+recordLabelName+" in 06_contact layout page are equal to "+editPageLabelName+" and"+editPageRecordLabel+" in edit page,so test case has been passed");
    } else {
        await assert.fail("As "+labelName+" and "+recordLabelName+" in 06_contact layout page are not equal to "+editPageLabelName+" and"+editPageRecordLabel+" in edit page,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//----------Case 13: Verify, the user is able to manage(add/update/delete/sort) select or multi-select values---------------------------------------

When('the user is able to manage select or multi-select values in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Select Field 01',1,25);
    await driver.sleep(2000);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Select Field 01',1,25);
    await driver.sleep(2000);
    //get value of newly 'Added List'
    const newlyAddedListValue = await driver.findElement(By.id('option__3')).getAttribute('value');
    console.log("Newly Added Pick List Value: "+newlyAddedListValue);

    //delete newly added 'List Value'
    await contactPageElementsObj.findListDeleteIcon(driver,4);
    await driver.manage().setTimeouts({implicit: 2000});
    //verify Deleted list value is deleted after performing delete operation
    const deletedListElements = await driver.findElements(By.id('option__3'));
    const deletedListLength = await deletedListElements.length;
    if(deletedListLength === 0) {
        console.log("As deleted list value is not found in edit popup page,so test case has been passed");
    } else {
        await assert.fail("As deleted list value is found in edit popup page,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Select Field 01',1,25);
    await driver.sleep(2000);
    //get value of newly 'Updated List'
    const updatedListValue = await driver.findElement(By.id('option__2')).getAttribute('value');
    console.log("Updated Pick List Value: "+updatedListValue);

    //get values of list values before sorting
    console.log("Below are List Values before sorting:");
    const listValue1BeforeSorting = await driver.findElement(By.id('option__0')).getAttribute('value');
    console.log("List Value 1: "+listValue1BeforeSorting);
    const listValue2BeforeSorting = await driver.findElement(By.id('option__1')).getAttribute('value');
    console.log("List Value 2: "+listValue2BeforeSorting);
    const listValue3BeforeSorting = await driver.findElement(By.id('option__2')).getAttribute('value');
    console.log("List Value 3: "+listValue3BeforeSorting);
    await screenshotObj.takeScreenshot(driver,screenshotPath+'unSortedListValues.png');
    //click on 'Sort Alphabetically' button
    await contactPageElementsObj.findSortAlphabeticallyButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(3000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Select Field 01',1,25);
    await driver.sleep(2000);

    //take screenshot of 'Alphabetically Sorted' list values
    await screenshotObj.takeScreenshot(driver,screenshotPath+'sortedListValues.png');

    //get values of list values after sorting
    console.log("Below are List Values after sorting:");
    const listValue1AfterSorting = await driver.findElement(By.id('option__0')).getAttribute('value');
    console.log("List Value 1: "+listValue1AfterSorting);
    const listValue2AfterSorting = await driver.findElement(By.id('option__1')).getAttribute('value');
    console.log("List Value 2: "+listValue2AfterSorting);
    const listValue3AfterSorting = await driver.findElement(By.id('option__2')).getAttribute('value');
    console.log("List Value 3: "+listValue3AfterSorting);
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const fieldNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(fieldNotificationElement));
    const fieldNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(fieldNotification,'Field updated successfully');
    await driver.sleep(5000);
    //page navigation and come back to activity layout page
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(3000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Select Field 01',1,25);
    await driver.sleep(2000);
    const listValue1AfterNavigation = await driver.findElement(By.id('option__0')).getAttribute('value');
    const listValue2AfterNavigation = await driver.findElement(By.id('option__1')).getAttribute('value');
    const listValue3AfterNavigation = await driver.findElement(By.id('option__2')).getAttribute('value');
    if(listValue1AfterSorting === listValue1AfterNavigation && listValue2AfterSorting === listValue2AfterNavigation && listValue3AfterSorting === listValue3AfterNavigation) {
        console.log("As "+listValue1AfterSorting+listValue2AfterSorting+listValue3AfterSorting+" after sorting are equal to "+listValue1AfterNavigation+listValue2AfterNavigation+listValue3AfterNavigation+" after navigation values,so test case has been passed");
    } else {
        await assert.fail("As "+listValue1AfterSorting+listValue2AfterSorting+listValue3AfterSorting+" after sorting are not equal to "+listValue1AfterNavigation+listValue2AfterNavigation+listValue3AfterNavigation+" after navigation values,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//---------------Case 14: Verify, the user is not able to change the association type of custom lookup field------------------------------------

When('the user is not able to change the association type of custom lookup field in activity module',async function() {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field Updated 01',1,26);
    await driver.sleep(1000);
    //verifying 'Single' 'Multiple' Association type
    const singleAssociationType = !!await driver.findElement(By.xpath('//input[@value="Single"]')).getAttribute('disabled');
    console.log("Is Single Association Type disabled: "+singleAssociationType);
    const multipleAssociationType = !!await driver.findElement(By.xpath('//input[@value="Multiple"]')).getAttribute('disabled');
    console.log("Is Multiple Association Type disabled: "+multipleAssociationType);
    if(singleAssociationType === true && multipleAssociationType === true) {
        console.log("As single and multiple association types are disabled,so test case haas been passed");
    } else {
        await assert.fail("As single and multiple association types are not disabled,so test case haas been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//-------------Case 15: Verify, the user is not able to change section name while updating a custom field---------------------------------------

When('the user is not able to change section name while updating a custom field in activity module',async function() {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Field Updated 01',1,24);
    await driver.sleep(3000);
    await driver.manage().setTimeouts({implicit: 2000});
    //verify 'Disabled Class' for section name
    const sectionDisabledClass = await driver.findElements(By.xpath('//div[@class="disabled"]'));
    const sectionDisabledLength = await sectionDisabledClass.length;
    if(sectionDisabledLength > 0) {
        console.log("As section name class is disabled,so test case haas been passed");
    } else {
        await assert.fail("As section name class is not disabled,so test case haas been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//---------Case 16: Verify, the user is not able to leave required fields as a blank while updating a custom field-------------------------------------

When('the user is not able to leave label name field as a blank while updating a custom field in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Field Updated 01',1,24);
    await driver.sleep(1000);

    //get value of 'Label Name' before updating
    labelNameBeforeUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log("Label Name before updating label is: "+labelNameBeforeUpdation);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
});

Then('verify validation {string} notification message in activity module',async function(expectedLabelValidation) {
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const actualLabelValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
    strictEqual(actualLabelValidation,expectedLabelValidation);
    await driver.sleep(1000);
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Field Updated 01',1,24);
    await driver.sleep(2000);
    //get value of 'Label Name' after updating
    const labelNameAfterUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log("Label Name after updating label is: "+labelNameAfterUpdation);
    if(labelNameBeforeUpdation === labelNameAfterUpdation) {
        console.log("As label name after and before updating blank label name,so test case has been passed");
    } else {
        await assert.fail("As label name after and before updating blank label name,so test case has been aborted")
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

When('the user is not able to leave record label name field as a blank while updating a custom field in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field Updated 01',1,26);
    await driver.sleep(1000);

    //get value of 'Label Name' before updating
    labelNameBeforeUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log("Label Name before updating label is: "+labelNameBeforeUpdation);
    recordLabelBeforeUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log("Record Label before updating label is: "+recordLabelBeforeUpdation);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
});

Then('verify validation {string} and {string} message in activity module',async function(expectedLabelValidation,expectedRecordValidation) {
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const actualLabelValidation = await contactPageElementsObj.findValidation(driver,1);
    strictEqual(actualLabelValidation,expectedLabelValidation);
    const actualRecordValidation = await contactPageElementsObj.findValidation(driver,2);
    strictEqual(actualRecordValidation,expectedRecordValidation);
    await driver.sleep(1000);
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field Updated 01',1,26);
    await driver.sleep(2000);
    //get value of 'Label Name' after updating
    const labelNameAfterUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log("Label Name after updating label is: "+labelNameAfterUpdation);
    const recordLabelAfterUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log("Record Label after updating label is: "+recordLabelAfterUpdation);
    if(labelNameBeforeUpdation === labelNameAfterUpdation && recordLabelBeforeUpdation === recordLabelAfterUpdation) {
        console.log("As label name and record label are equal before and after updating blank label name and record label,so test case has been passed");
    } else {
        await assert.fail("As label name and record label are not equal before and after updating blank label name and record label,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//----------Case 17: Verify, the user is not able to update the custom field with more than 100 chars label name--------------------------------

When('the user is not able to update the custom field with more than 100 chars label name in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field Updated 01',1,26);
    await driver.sleep(1000);

    //get value of 'Label Name' before updating
    labelNameBeforeUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log("Label Name before updating label is: "+labelNameBeforeUpdation);
    recordLabelBeforeUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log("Record Label before updating label is: "+recordLabelBeforeUpdation);

    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

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
});

Then('verify {string} validation in activity module',async function(expectedLengthValidation) {
    await contactPageElementsObj.findSaveButton(driver);
    await driver.sleep(1000);
    const actualLengthValidation = await contactPageElementsObj.findValidation(driver,1);
    strictEqual(actualLengthValidation,expectedLengthValidation);
    const actualRecordValidation = await contactPageElementsObj.findValidation(driver,2);
    strictEqual(actualRecordValidation,expectedLengthValidation);
    await driver.sleep(1000);
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Lookup Field Updated 01',1,26);
    await driver.sleep(2000);
    //get value of 'Label Name' after updating
    const labelNameAfterUpdation = await driver.findElement(By.id('displayName')).getAttribute('value');
    console.log("Label Name after updating label is: "+labelNameAfterUpdation);
    const recordLabelAfterUpdation = await driver.findElement(By.id('relatedRecordName')).getAttribute('value');
    console.log("Record Label after updating label is: "+recordLabelAfterUpdation);
    if(labelNameBeforeUpdation === labelNameAfterUpdation && recordLabelBeforeUpdation === recordLabelAfterUpdation) {
        console.log("As label name and record label are equal before and after updating blank label name and record label,so test case has been passed");
    } else {
        await assert.fail("As label name and record label are not equal before and after updating blank label name and record label,so test case has been aborted");
    }
    await contactPageElementsObj.findCloseIcon(driver);
    await driver.sleep(2000);
});

//------------Case 18: Verify, the user is not able to select the same field as a parent and child while creating a map dependency----------------------------------------

When('the user is not able to select the same field as a parent and child while creating a map dependency in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await contactPageElementsObj.findMapDependencyFields(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.findCreateButton(driver);
    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if (fieldName == 'parent field') {
            parentFieldData = dataTable.rawTable[i][1];

            //will select the provided new dropdown value from the 'Parent Field' dropdown list
            await driver.sleep(1000);
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'parentField',parentFieldData,'no');
        } else if (fieldName == 'child field') {
            childFieldData = dataTable.rawTable[i][1];

            //will select the provided new dropdown value from the 'Child Field' dropdown list
            await driver.sleep(1000);
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'childField',childFieldData,'no');
        }
    }
});

Then('click on next button and verify {string} validation notification in activity module',async function(expectedValidation) {
    await contactPageElementsObj.findNextButton(driver);
    await driver.sleep(1000);
    const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualValidationElement));
    const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualValidation,expectedValidation);
    await driver.sleep(5000);
    await contactPageElementsObj.findMapCancelButton(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.findMapDependencyCancelButton(driver);
    await driver.sleep(3000);
    console.log("As user is not able to select the same field as a parent and child while creating a map dependency,so test case has been passed");
});

//-----------Case 19: Verify, the user is not able to create a map dependency without mapping any value--------------------------------------

When('the user is not able to create a map dependency without mapping any value in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await contactPageElementsObj.findMapDependencyFields(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.findCreateButton(driver);
    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if (fieldName == 'parent field') {
            parentFieldData = dataTable.rawTable[i][1];

            //will select the provided new dropdown value from the 'Parent Field' dropdown list
            await driver.sleep(1000);
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'parentField',parentFieldData,'no');
        } else if (fieldName == 'child field') {
            childFieldData = dataTable.rawTable[i][1];

            //will select the provided new dropdown value from the 'Child Field' dropdown list
            await driver.sleep(1000);
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'childField',childFieldData,'no');
        }
    }
});

Then('click on next button and verify {string} validation notification message in activity module',async function(expectedValidation) {
    await contactPageElementsObj.findNextButton(driver);
    await contactPageElementsObj.findMapDependencySaveButton(driver);
    await driver.sleep(1000);
    const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualValidationElement));
    const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualValidation,expectedValidation);
    await driver.sleep(5000);
    await contactPageElementsObj.findMapDependencyCancelButton(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.findMapDependencyCancelButton(driver);
    await driver.sleep(3000);
    console.log("As user is not able to create a map dependency without mapping any value,so test case has been passed");
});

//-----------Case 20: Verify, the user is able to create a map dependency between the select or multi-select fields---------------------------------------

When('the user is able to create a map dependency between the select or multi-select fields in activity module',async function(dataTable) {
    await driver.sleep(2000);

    await contactPageElementsObj.findMapDependencyFields(driver);
    await driver.sleep(1000);
    await contactPageElementsObj.findCreateButton(driver);
    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if (fieldName == 'parent field') {
            parentFieldData = dataTable.rawTable[i][1];

            //will select the provided new dropdown value from the 'Parent Field' dropdown list
            await driver.sleep(1000);
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'parentField',parentFieldData,'no');
        } else if (fieldName == 'child field') {
            childFieldData = dataTable.rawTable[i][1];

            //will select the provided new dropdown value from the 'Child Field' dropdown list
            await driver.sleep(1000);
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'childField',childFieldData,'no');
        }
    }
});

Then('click on next button and verify {string} successful message in activity module',async function(expectedNotification) {
    await contactPageElementsObj.findNextButton(driver);
    await driver.sleep(2000);
    await driver.findElement(By.xpath('//option[text()="M2"]')).click();
    await driver.sleep(2000);
    await contactPageElementsObj.findMapDependencySaveButton(driver);
    await driver.sleep(1000);
    const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualValidationElement));
    const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualValidation,expectedNotification);
    await driver.sleep(5000);
    await driver.navigate().refresh();
    await driver.sleep(6000);
    //verify whether 'Map Dependency Fields' Page is opened or not
    const currentPageURL = await driver.getCurrentUrl();
    try {
        await currentPageURL.includes('app/03_setup/customization/mapdependencylist');
        console.log("As map dependency fields page is opened,so test case has been passed");
    }catch(err) {
        await assert.fail("As map dependency fields page is not found,so test case has been aborted");
        await assert.fail(err);
    }
    await contactPageElementsObj.findMapDependencyCancelButton(driver);
    await driver.sleep(3000);
    console.log("As user is able to create a map dependency between the select or multi-select fields,so test case has been passed");
});

//---------------------Case 21: Verify, the user is able to update map dependency-----------------------------------

When('the user is able to update map dependency and verify {string} in activity module',async function(expectedNotification) {
    await driver.sleep(2000);

    await contactPageElementsObj.findMapDependencyFields(driver);
    await driver.sleep(2000);
    await contactPageElementsObj.findMapDependencyEditLink(driver);
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//option[text()="M3"]')).click();
    await driver.sleep(1000);
    await contactPageElementsObj.findMapDependencySaveButton(driver);
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await driver.navigate().refresh();
    await driver.sleep(6000);
    //verify whether 'Map Dependency Fields' Page is opened or not
    const currentPageURL = await driver.getCurrentUrl();
    try {
        await currentPageURL.includes('app/03_setup/customization/mapdependencylist');
        console.log("As map dependency fields page is opened,so test case has been passed");
    }catch(err) {
        await assert.fail("As map dependency fields page is not found,so test case has been aborted");
        await assert.fail(err);
    }
    await contactPageElementsObj.findMapDependencyEditLink(driver);
    await driver.sleep(2000);
    await screenshotObj.takeScreenshot(driver,screenshotPath+'updatedMapDependencyEditPage.png');
    await contactPageElementsObj.findMapDependencyCancelButton(driver);
    await driver.sleep(2000);
    await contactPageElementsObj.findMapDependencyCancelButton(driver);
    await driver.sleep(2000);
    console.log("As user is able to update map dependency,so test case has been passed");
});

//----------------------Case 22: Verify, the user is able to delete map dependency----------------------------------

When('the user is able to delete map dependency and verify {string} in activity module',async function(expectedDeleteNotification) {
    await driver.sleep(2000);

    await contactPageElementsObj.findMapDependencyFields(driver);
    await driver.sleep(2000);
    await contactPageElementsObj.findMapDependencyDeleteLink(driver);
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
    await driver.sleep(1000);
    const actualDeleteNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualDeleteNotificationElement));
    const actualDeleteNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualDeleteNotification,expectedDeleteNotification);
    await driver.sleep(5000);
    await driver.navigate().refresh();
    await driver.sleep(6000);
    await driver.manage().setTimeouts({implicit: 2000});
    const deletedCustomField = await driver.findElements(By.xpath('//td[text()="Custom Select Field 01"]'));
    const deletedCustomLength = await deletedCustomField.length;
    if(deletedCustomLength === 0) {
        console.log("As custom field is not found after successful deletion,so test case has been passed");
    } else {
        await assert.fail("As custom field is found even after successful deletion,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
    await contactPageElementsObj.findMapDependencyCancelButton(driver);
    await driver.sleep(2000);
});

//--------------------------Case 23: Verify, the user is able to drag and drop fields------------------------------------

When('the user is able to drag and drop fields and verify {string} in activity module',async function(expectedNotification) {
    await driver.sleep(3000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 4000 }, 0);");
    await driver.sleep(2000);
    //get field which is at first place before drag and drop
    const firstFieldBeforeDragAndDrop = await driver.findElement(By.xpath("//div[@id='group-sortable']/div[1]/table[@class='panel-body sortableSectionPanel']//td/div[26]/div")).getText();
    console.log("Field which is at section before drag and drop is: "+firstFieldBeforeDragAndDrop);

    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[26]/div'));
    const drop = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[25]/div'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    //get field which is at first place after drag and drop
    const firstFieldAfterDragAndDrop = await driver.findElement(By.xpath("//div[1]/table[@class='panel-body sortableSectionPanel']//td/div[26]/div")).getText();
    console.log("Field Name which is at section after drag and drop is: "+firstFieldAfterDragAndDrop);
    if(firstFieldBeforeDragAndDrop !== firstFieldAfterDragAndDrop) {
        console.log("As "+firstFieldBeforeDragAndDrop+" of first division has been interchanged with "+firstFieldAfterDragAndDrop+" after performing drag and drop,so test case has been passed");
    } else {
        await assert.fail("As "+firstFieldBeforeDragAndDrop+" of first division has not been interchanged with "+firstFieldAfterDragAndDrop+" after performing drag and drop,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
});

//-------------------Case 24: Verify, the user is able to deactivate fields by drag and drop-------------------------------

When('the user is able to deactivate field {string} by drag and drop and verify {string} in activity module',async function(fieldName,expectedNotification) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 4000 }, 0);");
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
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    //get first field which is at inactive fields section after drag and drop
    const firstInactiveFieldAfterDragAndDrop = await driver.findElement(By.xpath("//div[@id='inActiveField']/div[1]")).getText();
    console.log("Field Name which is at first section in inactive field section after drag and drop is: "+firstInactiveFieldAfterDragAndDrop);
    console.log("As inactive fields section contains "+firstInactiveFieldAfterDragAndDrop+" after performing drag and drop,so test case has been passed");
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
});

//-------Case 25: Verify, the user is able to deactivate fields by clicking on the ‘Move to Inactive Fields’ button----------------------------

When('the user is able to deactivate {string} by clicking on the {string} button and verify {string} in activity module',async function(fieldName,moveToInactiveButton,expectedNotification) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    const act = await driver.actions();
    const source = await driver.findElement(By.xpath(`//div[@id="inActiveField"]//div[text()=" ${fieldName} "]`));
    const destination = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[26]'));
    await act.dragAndDrop(source,destination).perform();
    await driver.sleep(2000);
    await driver.findElement(By.xpath('//div[contains(text()," Activity")]')).click();
    await driver.sleep(3000);
    await contactPageElementsObj.customFieldDeleteButton(driver,'Custom Select Field 01',1,25);
    await driver.findElement(By.xpath(`//button[text()="${moveToInactiveButton}"]`)).click();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
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

//--------------------Case 26: Verify, the user is able to re-activate fields------------------------

When('the user is able to re-activate {string} and verify {string} in activity module',async function(fieldName,expectedNotification) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath(`//div[@id="inActiveField"]//div[text()=" ${fieldName} "]`));
    const drop = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[26]'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    //verifying display of 'Custom Select Field 01' in 'Custom Section Updated 01' Active section
    const reactiveCustomField = await driver.findElement(By.xpath(`//div[1]/table[@class='panel-body sortableSectionPanel']//td/div[27]`)).getText();
    console.log("The field re-activated after dragging it into active section is: "+reactiveCustomField);
    await driver.manage().setTimeouts({implicit:2000});
    const reactiveCustomFieldElements = await driver.findElements(By.xpath(`//div[1]/table[@class='panel-body sortableSectionPanel']//td/div[27]`));
    const reactiveCustomFieldLength = await reactiveCustomFieldElements.length;
    if(reactiveCustomFieldLength > 0) {
        console.log("As "+fieldName+" is displayed under active fields section,so test case has been passed");
    } else {
        await assert.fail("As "+fieldName+" is not displayed under active fields section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
});

//-----------Case 27: Verify, the user is not able to deactivate required fields by drag and drop---------------------

When('the user is not able to deactivate {string} required fields by drag and drop and verify {string} in activity module',async function(fieldName,expectedValidation) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    //get 'Custom Field' value before dragging
    const customFieldBeforeDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[26]')).getText();
    console.log("Required Field Value Before Drag and drop: "+customFieldBeforeDrag);
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
    //get 'Custom Field' value after dragging
    const customFieldAfterDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[26]')).getText();
    console.log("Required Field Value After Drag and drop: "+customFieldAfterDrag);
    if(customFieldBeforeDrag === customFieldAfterDrag) {
        console.log("As required custom field is not changed to inactive fields due to required attribute,so test case has been passed");
    } else {
        await assert.fail("As required custom field is changed to inactive fields due to required attribute,so test case has been aborted");
    }
});

//------------Case 28: Verify, the user is not able to deactivate locked fields by drag and drop-----------------------------

When('the user is not able to deactivate locked fields by drag and drop and verify {string} in activity module',async function(expectedValidation) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 1500 }, 0);");
    await driver.sleep(2000);
    //get 'Outcome' before dragging
    const outcomeBeforeDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[11]')).getText();
    console.log("Lock Field Value Before Drag and drop: "+outcomeBeforeDrag);
    const act = await driver.actions();
    const drag = await driver.findElement(By.xpath('//div[text()=" Outcome "]'));
    const drop = await driver.findElement(By.xpath('//div[@id="inActiveField"]'));
    await act.dragAndDrop(drag,drop).perform();
    await driver.sleep(1000);
    const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualValidationElement));
    const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualValidation,expectedValidation);
    await driver.sleep(5000);
    //get 'Outcome' after dragging
    const outcomeAfterDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[11]')).getText();
    console.log("Lock Field Value After Drag and drop: "+outcomeAfterDrag);
    if(outcomeBeforeDrag === outcomeAfterDrag) {
        console.log("As locked outcome field is not changed to inactive fields due to locked attribute,so test case has been passed");
    } else {
        await assert.fail("As locked outcome field is changed to inactive fields due to locked attribute,so test case has been aborted");
    }
});

//-------------Case 29: Verify, the user is not able to deactivate required fields by clicking on the ‘Move to Inactive Fields’ button--------------------------------

When('the user is not able to deactivate required fields {string} by clicking on the {string} button and verify {string} in activity module',async function(fieldName,moveToInactiveButton,expectedValidation) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await driver.findElement(By.xpath('//div[contains(text()," Activity ")]')).click();
    await driver.sleep(2000);
    //get 'Custom Field' value before dragging
    const customFieldBeforeDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[25]')).getText();
    await contactPageElementsObj.customFieldDeleteButton(driver,'Custom Field Updated 01',1,24);
    await driver.findElement(By.xpath(`//button[text()="${moveToInactiveButton}"]`)).click();
    await driver.sleep(1000);
    const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualValidationElement));
    const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualValidation,expectedValidation);
    await driver.sleep(5000);
    //get 'Custom Field' value after dragging
    const customFieldAfterDrag = await driver.findElement(By.xpath('//div[1]/table[@class="panel-body sortableSectionPanel"]//td/div[25]')).getText();
    if(customFieldBeforeDrag === customFieldAfterDrag) {
        console.log("As "+fieldName+" is displayed under active fields section only even after dragging to inactive section due to required attribute,so test case has been passed");
    } else {
        await assert.fail("As "+fieldName+" is not displayed under active fields section only even after dragging to inactive section due to required attribute,so test case has been aborted");
    }
});

Then('disabling the required checkbox of custom field in activity module',async function(dataTable) {
    await driver.sleep(2000);
    await driver.findElement(By.xpath('//div[contains(text()," Activity ")]')).click();
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldEditButton(driver,'Custom Field Updated 01',1,24);
    await driver.sleep(2000);
    //will travel provided fields and data list
    for(let i=0; i<dataTable.rawTable.length; i++) {

        //will check whether the provided field is part of the test case or not
        const fieldName = dataTable.rawTable[i][0].toLowerCase();
        if(fieldName == 'required checkbox') {
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
});

//------------------Case 30: Verify, the user is able to delete custom fields---------------------------

When('the user is able to delete {string},{string},{string} and verify {string} message in activity module',async function(customTextField,customSelectField,customLookupField,expectedNotification) {
    await driver.sleep(2000);

    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await contactPageElementsObj.customFieldDeleteButton(driver,'Custom Field Updated 01',1,24);
    await driver.sleep(2000);
    await driver.findElement(By.xpath('//button[text()="Delete It"]')).click();
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
    await driver.sleep(1000);
    const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualNotificationElement));
    const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    const customTextFieldElements = await driver.findElements(By.xpath(`//div[text()=" ${customTextField} "]`));
    const customTextFieldLength = await customTextFieldElements.length;
    if(customTextFieldLength === 0) {
        console.log("As "+customTextField+" is deleted it is not displayed under custom section,so test case has been passed");
    } else {
        await assert.fail("As "+customTextField+" is not deleted it is displayed under custom section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});

    await contactPageElementsObj.customFieldDeleteButton(driver,'Custom Select Field 01',1,24);
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[text()="Delete It"]')).click();
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
    await driver.sleep(1000);
    const actualDeleteMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualDeleteMsgElement));
    const actualMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualMessage,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    const customSelectFieldElements = await driver.findElements(By.xpath(`//div[text()=" ${customSelectField} "]`));
    const customSelectFieldLength = await customSelectFieldElements.length;
    if(customSelectFieldLength === 0) {
        console.log("As "+customSelectField+" is deleted it is not displayed under custom section,so test case has been passed");
    } else {
        await assert.fail("As "+customSelectField+" is not deleted it is displayed under custom section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});

    await contactPageElementsObj.customFieldDeleteButton(driver,'Custom Lookup Field Updated 01',1,24);
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[text()="Delete It"]')).click();
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
    await driver.sleep(1000);
    const actualDeleteElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    await driver.wait(until.elementIsVisible(actualDeleteElement));
    const actualDeleteNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(actualDeleteNotification,expectedNotification);
    await driver.sleep(5000);
    await pageNavigationObj.comeBackToActivityPage(driver,screenshotPath);
    await driver.sleep(2000);
    await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
    await driver.sleep(2000);
    await driver.manage().setTimeouts({implicit:2000});
    const customLookupFieldElements = await driver.findElements(By.xpath(`//div[text()=" ${customLookupField} "]`));
    const customLookupFieldLength = await customLookupFieldElements.length;
    if(customLookupFieldLength === 0) {
        console.log("As "+customLookupField+" is deleted it is not displayed under custom section,so test case has been passed");
    } else {
        await assert.fail("As "+customLookupField+" is not deleted it is displayed under custom section,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit: elementSearchTimeout});
});
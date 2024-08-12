const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openExportContactPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/data_administration/exportContact/screenshots/';
const exportContactElementsObj = require('../common/exportContactElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const tagManagementElementsObj = require('../../../customizations/tagManagement/common/tagManagementPageElements');

let existingSearchData = 'no', nonExistingSearchData = 'no', searchFieldData = 'no';
let companySingularName, associatedContactsState = 'no', enablingLastModifiedBy = 'no', disablingLastModifiedBy = 'no';

Given('the {string} is on export contact page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('/app/setup/export/detail?id=1')){
        console.log('The export contact page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open export contact page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on export contact page');
        //will open the export contact page
        await openExportContactPageObj.openExportContactPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open export contact page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on export contact page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on export contact page');
        //will open the export contact page
        await openExportContactPageObj.openExportContactPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the export contact page
        await openExportContactPageObj.openExportContactPage(driver,screenshotPath);
    }
});

//------------------------------Case 1 : the system should display dynamic module name of contact---------------------------------------

When('the system should display dynamic module name of contact',async function() {
    try {
        await driver.sleep(1000);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'System Modules' tab
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' System Modules ');
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();", systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
        await driver.sleep(2000);
        await tagManagementElementsObj.findModulesEditButton(driver, 'Contact');
        const contactPluralName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Contact Plural Name: " + contactPluralName);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Export Data' tab
        const exportDataTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Export Data ');
        //will set focus on the 'Export Data' tab
        await driver.executeScript("arguments[0].scrollIntoView();", exportDataTab[0]);
        await driver.wait(until.elementIsVisible(exportDataTab[0]));
        //will click on the 'Export Data' tab
        await exportDataTab[0].click();
        await driver.sleep(1000);
        const exportDataContactPluralName = await driver.findElement(By.xpath(`//div[text()=" ${contactPluralName} "]`)).getText();
        console.log("Export Data Contact Plural Name: " + exportDataContactPluralName);
        await driver.manage().setTimeouts({implicit: 2000});
        const exportDataContact = await driver.findElements(By.xpath(`//div[text()=" ${contactPluralName} "]`));
        const exportDataContactPluralNameLength = await exportDataContact.length;
        if (exportDataContactPluralNameLength > 0) {
            console.log("As export data plural name " + exportDataContactPluralName + " in export data exists,so test case has been passed");
        } else {
            await assert.fail("As export data plural name " + exportDataContactPluralName + " in export data does not exist,so test case has been aborted");
        }
        await exportContactElementsObj.findContactsExportModule(driver);
        await driver.sleep(1000);
        const contactHeaderName = await driver.findElement(By.xpath(`//h2[@class="m-b-xs"]`)).getText();
        console.log("Contact Header Name: " + contactHeaderName);
        await driver.manage().setTimeouts({implicit: 2000});
        const contactLowerCase = await exportDataContactPluralName.toLowerCase();
        const contactHeaderElements = await driver.findElements(By.xpath(`//h2[contains(.,"${contactLowerCase}")]`));
        const contactHeaderLength = await contactHeaderElements.length;
        if (contactHeaderLength > 0) {
            console.log("As header name of exports contact page " + contactHeaderName + " is displayed,so test case has been passed");
        } else {
            await assert.fail("As header name of exports contact page " + contactHeaderName + " is not displayed,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: 2000});
        const contactsLowerCase = await contactPluralName.toLowerCase();
        const moduleHeaderElements = await driver.findElements(By.xpath(`//h2[contains(.,"${contactsLowerCase}")]`));
        const moduleHeaderLength = await moduleHeaderElements.length;
        if (moduleHeaderLength > 0) {
            console.log("As module header name of exports contact page " + contactHeaderName + " is displayed,so test case has been passed");
        } else {
            await assert.fail("As module header name of exports contact page " + contactHeaderName + " is not displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 2: Verify, the system should display custom view list that displayed on the contact list page------------------------------------

When('the system display custom view list that displayed on the contact list page',async function() {
    try {
        await driver.sleep(2000);
        await exportContactElementsObj.findContactIcon(driver);
        await driver.sleep(3000);
        await driver.findElement(By.xpath('//contact-list//sm-custom-popover/div/a')).click();
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactPageCustomView.png');
        await driver.sleep(2000);
        const contactPageCustomViewValue = await driver.findElements(By.xpath("//div[@id='popover1-body']/div/div[3]/div/ul[1]/li"));
        const contactPageCustomViewValueLength = await contactPageCustomViewValue.length;
        console.log(contactPageCustomViewValueLength);
        console.log("Below are contact page custom view values:");
        for (let i = 1; i <= contactPageCustomViewValueLength; i++) {
            const contactPageCustomViewValue = await driver.findElement(By.xpath(`//div[@id='popover1-body']/div/div[3]/div/ul/li[${i}]/a`));
            const contactPageCustomViewText = await contactPageCustomViewValue.getText();
            console.log(contactPageCustomViewText);
        }
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Export Data' tab
        const exportDataTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Export Data ');
        //will set focus on the 'Export Data' tab
        await driver.executeScript("arguments[0].scrollIntoView();", exportDataTab[0]);
        await driver.wait(until.elementIsVisible(exportDataTab[0]));
        //will click on the 'Export Data' tab
        await exportDataTab[0].click();
        await driver.sleep(1000);
        await exportContactElementsObj.findContactsExportModule(driver);
        await driver.sleep(2000);
        await driver.findElement(By.xpath("//span[@role='combobox']/span[@role='textbox']")).click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'exportContactPageCustomView.png');
        await driver.manage().setTimeouts({implicit: 2000});
        console.log("Below are export contact page custom view values:");
        const exportContactPageCustomViewValue = await driver.findElement(By.name("customView")).getText();
        console.log(exportContactPageCustomViewValue);
        const exportContactPageCustomView = await driver.findElements(By.xpath("//ul[@role='tree']/li"));
        const exportContactPageCustomViewLength = await exportContactPageCustomView.length;
        console.log(exportContactPageCustomViewLength);
        if ((contactPageCustomViewValueLength)+1 === exportContactPageCustomViewLength) {
            console.log("As contact page custom view length: " + contactPageCustomViewValueLength + " and export contact page custom view length: " + exportContactPageCustomViewLength + " are equal,so test case has been passed");
        } else {
            await assert.fail("As contact page custom view: " + contactPageCustomViewValueLength + " and export contact page custom view length: " + exportContactPageCustomViewLength + " are not equal,so test case has been aborted");
        }
        await driver.findElement(By.xpath('//span[@role="combobox"]/span[@role="presentation"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'customViewLengths_InEqual.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------------------Case 3: Verify, the user is able to export the contact data-------------------------------------

When('the user is able to export the contact data and verify {string}',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await exportContactElementsObj.findModuleTab(driver, 'Contact');
        await driver.sleep(1000);
        await exportContactElementsObj.findSelectAllLink(driver);
        await exportContactElementsObj.findModuleTab(driver, 'Company');
        await driver.sleep(1000);
        await exportContactElementsObj.findSelectAllLink(driver);
        await exportContactElementsObj.findExportButton(driver);
        await driver.sleep(2000);
        const actualNotificationElement = await driver.findElement(By.xpath('//h1[@class="heading m-b-md"]'));
        await driver.executeScript("arguments[0].scrollIntoView();", actualNotificationElement);
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//h1[@class="heading m-b-md"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(1000);
        console.log("As user is able to export the contact data,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 4: Verify, the user is able to search the contact fields--------------------------------------

When('the user is able to search the contact fields',async function(dataTable) {
    try {
        await driver.sleep(3000);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Export Data' tab
        const exportDataTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Export Data ');
        //will set focus on the 'Export Data' tab
        await driver.executeScript("arguments[0].scrollIntoView();", exportDataTab[0]);
        await driver.wait(until.elementIsVisible(exportDataTab[0]));
        //will click on the 'Export Data' tab
        await exportDataTab[0].click();
        await driver.sleep(1000);
        await exportContactElementsObj.findContactsExportModule(driver);
        await driver.sleep(3000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'existing search word') {
                existingSearchData = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (existingSearchData == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }
                //searching for 'Name Field' and pass the new data
                const searchBoxField = await exportContactElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(existingSearchData);
                await driver.sleep(500);

                //getting value of search box
                const searchBoxName = await driver.findElement(By.xpath('//input[@placeholder="Search Fields"]')).getAttribute('value');
                console.log("Existing Search Value: " + searchBoxName);

                //getting value of name
                const resultValue = await driver.findElement(By.xpath('//ul/li[@name="name"]/span[@class="m-l"]')).getText();
                console.log("Search Field Result Value: " + resultValue);

                //compare 'Search box Name' and 'Result Value'
                if (resultValue.includes(searchBoxName)) {
                    await screenshotObj.takeScreenshot(driver, screenshotPath + 'nameSearchRecordFound.png');
                    console.log("As name checkbox which contain searched chars is displayed,so test case has been passed");
                } else {
                    await assert.fail("As name checkbox contain searched chars is not displayed,so test case has been aborted");
                }
            } else if (fieldName == 'non-existing search word') {
                nonExistingSearchData = dataTable.rawTable[i][1];

                //will check that the data for the search field is given or not
                if (nonExistingSearchData == '') {
                    await assert.fail('Due to the blank value is provided for the search field, the test case execution has been aborted');
                }

                //searching for 'Non-Existing Search Word' and pass the new data
                const searchBoxField = await exportContactElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchBoxField);
                await searchBoxField.sendKeys(nonExistingSearchData);
                await driver.sleep(500);

                //verification of 'Hidden Elements' with invalid search data
                const rowsHiddenElements = await driver.findElements(By.xpath('//div[@class="availableFields" and @hidden]'));
                const rowsHiddenElementsLength = await rowsHiddenElements.length;
                if (rowsHiddenElementsLength > 0) {
                    console.log("As rows are hidden after searching with invalid search data,test case has been passed");
                } else {
                    await assert.fail("As rows are hidden after searching with invalid search data,test case has been aborted");
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------------Case 5: Verify, the user is able to manage the fields for the export-----------------------------

When('the user is able to manage the fields for the export',async function(dataTable) {
    try {
        await driver.sleep(3000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'search field data') {
                searchFieldData = dataTable.rawTable[i][1];

                //will search for  'Associated Contacts' checkbox
                const searchField = await exportContactElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchField);
                await searchField.sendKeys(searchFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'enabling last modified by') {
                enablingLastModifiedBy = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (enablingLastModifiedBy == 'enable' || enablingLastModifiedBy == 'disable') {
                    //will find 'Last Modified By Checkbox' Toggle Button
                    const lastModifiedByToggle = await exportContactElementsObj.findLastModifiedByCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", lastModifiedByToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Associated Contacts Checkbox'
                    const currentState = await lastModifiedByToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Associated Contacts Checkbox'
                    if (currentState != enablingLastModifiedBy) {
                        await driver.executeScript("arguments[0].click();", lastModifiedByToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the associated contacts checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check data {string} should be displayed under selected fields section',async function(expectedSelectField) {
    try {
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const lastModifiedByElement = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        await driver.executeScript("arguments[0].scrollIntoView();", lastModifiedByElement);
        await driver.wait(until.elementIsVisible(lastModifiedByElement));
        const lastModifiedByText = await lastModifiedByElement.getText();
        console.log("After check the checkbox of last modified by, the field displaying under select fields is: " + lastModifiedByText);
        const lastModifiedByElements = await driver.findElements(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        const lastModifiedByLength = await lastModifiedByElements.length;
        if (lastModifiedByLength > 0) {
            console.log("As selected field " + lastModifiedByText + " is found after check " + lastModifiedByText + " checkbox,so test case has been passed");
        } else {
            await assert.fail("As selected field " + lastModifiedByText + " is not found after check " + lastModifiedByText + " checkbox,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user is able to manage the fields for the export contact',async function(dataTable) {
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'search field data') {
                searchFieldData = dataTable.rawTable[i][1];

                //will search for  'Associated Contacts' checkbox
                const searchField = await exportContactElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchField);
                await searchField.sendKeys(searchFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'disabling last modified by') {
                disablingLastModifiedBy = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (disablingLastModifiedBy == 'enable' || disablingLastModifiedBy == 'disable') {
                    //will find 'Last Modified By Checkbox' Toggle Button
                    const lastModifiedByToggle = await exportContactElementsObj.findLastModifiedByCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", lastModifiedByToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Last Modify Checkbox'
                    const currentState = await lastModifiedByToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Last Modify Checkbox'
                    if (currentState != disablingLastModifiedBy) {
                        await driver.executeScript("arguments[0].click();", lastModifiedByToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the last modified checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('uncheck data {string} should not be displayed under selected fields',async function(expectedSelectField) {
    try {
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const lastModifiedByElements = await driver.findElements(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        const lastModifiedByLength = await lastModifiedByElements.length;
        if (lastModifiedByLength === 0) {
            console.log("As selected field " + expectedSelectField + " is not found after unchecking the " + expectedSelectField + " checkbox,so test case has been passed");
        } else {
            await assert.fail("As selected field " + expectedSelectField + " is found even after unchecking " + expectedSelectField + " checkbox,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------Case 6: Verify, the company module name should be displayed on the company fields----------------------------

When('the company module name should be displayed on the company fields',async function(dataTable) {
    try {
        await driver.sleep(2000);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'System Modules' tab
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' System Modules ');
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();", systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
        await driver.sleep(2000);

        await tagManagementElementsObj.findModulesEditButton(driver, 'Company');
        companySingularName = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Company Singular Name: " + companySingularName);
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Export Data' tab
        const exportDataTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Export Data ');
        //will set focus on the 'Export Data' tab
        await driver.executeScript("arguments[0].scrollIntoView();", exportDataTab[0]);
        await driver.wait(until.elementIsVisible(exportDataTab[0]));
        //will click on the 'Export Data' tab
        await exportDataTab[0].click();
        await driver.sleep(1000);
        await exportContactElementsObj.findContactsExportModule(driver);
        await driver.sleep(2000);
        await exportContactElementsObj.findModuleTab(driver, 'Company');
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'search field data') {
                searchFieldData = dataTable.rawTable[i][1];

                //will search for  'Associated Contacts' checkbox
                const searchField = await exportContactElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchField);
                await searchField.sendKeys(searchFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'associated contacts') {
                associatedContactsState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (associatedContactsState == 'enable' || associatedContactsState == 'disable') {
                    //will find 'Associated Contacts Checkbox' Toggle Button
                    const associatedContactsToggle = await exportContactElementsObj.findAssociatedContactsCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", associatedContactsToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Associated Contacts Checkbox'
                    const currentState = await associatedContactsToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Associated Contacts Checkbox'
                    if (currentState != associatedContactsState) {
                        await driver.executeScript("arguments[0].click();", associatedContactsToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the associated contacts checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check data {string} should be displayed under selected fields division',async function(expectedSelectField) {
    try {
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const associatedContactsSelectField = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        await driver.executeScript("arguments[0].scrollIntoView();", associatedContactsSelectField);
        await driver.wait(until.elementIsVisible(associatedContactsSelectField));
        const associatedContactsSelectFieldText = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`)).getText();
        console.log("After check the checkbox of associated contacts, the field displaying under select fields is: " + associatedContactsSelectFieldText);
        await driver.sleep(2000);
        const associatedContactsSelectFieldElements = await driver.findElements(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        const associatedContactsSelectFieldLength = await associatedContactsSelectFieldElements.length;
        if (associatedContactsSelectFieldLength > 0) {
            console.log("As selected field " + associatedContactsSelectFieldText + " is found after check " + associatedContactsSelectFieldText + " checkbox,so test case has been passed");
        } else {
            await assert.fail("As selected field " + associatedContactsSelectFieldText + " is not found after check " + associatedContactsSelectFieldText + " checkbox,so test case has been aborted");
        }
        if (associatedContactsSelectFieldText.includes(companySingularName)) {
            console.log("As selected field " + associatedContactsSelectFieldText + " contains " + companySingularName + " ,so test case has been passed");
        } else {
            await assert.fail("As selected field " + associatedContactsSelectFieldText + " does not contains " + companySingularName + " ,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
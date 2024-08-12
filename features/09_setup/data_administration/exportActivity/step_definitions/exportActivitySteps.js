const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openExportActivityPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/data_administration/exportActivity/screenshots/';
const exportActivityElementsObj = require('../common/exportActivityElements');
const exportContactElementsObj = require('../../exportContact/common/exportContactElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const tagManagementElementsObj = require('../../../customizations/tagManagement/common/tagManagementPageElements');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

//Today if release is done i will do testing over production environment for all automated modules

let existingSearchData = 'no', nonExistingSearchData = 'no', searchFieldData = 'no';
let contactSingularName, companySingularName, dealSingularName;
let associatedContactsState = 'no', enablingLastModifiedBy = 'no', disablingLastModifiedBy = 'no';
let lastNameState = 'no', titleState = 'no';

Given('the {string} is on export activity page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/export/detail?id=2')){
        console.log('The export data page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open export activity page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on export activity page');
        //will open the export activity page
        await openExportActivityPageObj.openExportActivityPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open export activity page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on export activity page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on export activity page');
        //will open the export activity page
        await openExportActivityPageObj.openExportActivityPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the export activity page
        await openExportActivityPageObj.openExportActivityPage(driver,screenshotPath);
    }
});

//------------------------------Case 1 : the system should display dynamic module name of activity---------------------------------------

When('the system should display dynamic module name of activity',async function() {
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
        await driver.sleep(3000);

        await tagManagementElementsObj.findModulesEditButton(driver, 'Activity');
        await driver.sleep(2000);
        const activityPluralName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Activity Plural Name: " + activityPluralName);
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
        const exportDataActivityPluralName = await driver.findElement(By.xpath(`//div[text()=" ${activityPluralName} "]`)).getText();
        console.log("Export Data Activity Plural Name: " + exportDataActivityPluralName);
        await driver.manage().setTimeouts({implicit: 2000});
        const exportDataActivity = await driver.findElements(By.xpath(`//div[text()=" ${activityPluralName} "]`));
        const exportDataActivityPluralNameLength = await exportDataActivity.length;
        if (exportDataActivityPluralNameLength > 0) {
            console.log("As export data plural name " + exportDataActivityPluralName + " in export data exists,so test case has been passed");
        } else {
            await assert.fail("As export data plural name " + exportDataActivityPluralName + " in export data does not exist,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await exportActivityElementsObj.findTasksExportModule(driver);
        await driver.sleep(5000);
        const activityHeaderName = await driver.findElement(By.xpath(`//h2[@class="m-b-xs"]`)).getText();
        console.log("Activity Header Name: " + activityHeaderName);
        await driver.manage().setTimeouts({implicit: 2000});
        const activitiesLowerCase = await activityPluralName.toLowerCase();
        const activityHeaderElements = await driver.findElements(By.xpath(`//h2[contains(.,"${activitiesLowerCase}")]`));
        const activityHeaderLength = await activityHeaderElements.length;
        if (activityHeaderLength > 0) {
            console.log("As header name of exports activity page " + activityHeaderName + " is displayed,so test case has been passed");
        } else {
            await assert.fail("As header name of exports activity page " + activityHeaderName + " is not displayed,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: 2000});
        const moduleHeaderElements = await driver.findElements(By.xpath(`//h2[contains(.,"${activitiesLowerCase}")]`));
        const moduleHeaderLength = await moduleHeaderElements.length;
        if (moduleHeaderLength > 0) {
            console.log("As module header name of exports activity page " + activityHeaderName + " is displayed,so test case has been passed");
        } else {
            await assert.fail("As module header name of exports activity page " + activityHeaderName + " is not displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 2: Verify, the system should display custom view list that displayed on the activity list page------------------------------------

When('the system display custom view list that displayed on the activity list page',async function() {
    try {
        await driver.sleep(1000);

        await exportActivityElementsObj.findActivityIcon(driver);
        await driver.sleep(3000);
        await driver.findElement(By.xpath('//activity-list//sm-custom-popover/div/a')).click();
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activityPageCustomView.png');
        await driver.sleep(1000);
        const activityPageCustomViewValue = await driver.findElements(By.xpath("//div[@id='popover1-body']/div/div[3]/div/ul[1]/li"));
        const activityPageCustomViewValueLength = await activityPageCustomViewValue.length;
        console.log(activityPageCustomViewValueLength);
        console.log("Below are activity page custom view values:");
        for (let i = 1; i <= activityPageCustomViewValueLength; i++) {
            const activityPageCustomViewValue = await driver.findElement(By.xpath(`//div[@id='popover1-body']/div/div[3]/div/ul/li[${i}]/a`));
            const activityPageCustomViewText = await activityPageCustomViewValue.getText();
            console.log(activityPageCustomViewText);
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
        await exportActivityElementsObj.findTasksExportModule(driver);
        await driver.sleep(2000);
        await driver.findElement(By.xpath("//span[@role='combobox']/span[@role='textbox']")).click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'exportActivityPageCustomView.png');
        await driver.manage().setTimeouts({implicit: 2000});
        console.log("Below are export activity page custom view values:");
        const exportActivityPageCustomViewValue = await driver.findElement(By.name("customView")).getText();
        console.log(exportActivityPageCustomViewValue);
        const exportActivityPageCustomView = await driver.findElements(By.xpath("//ul[@role='tree']/li"));
        const exportActivityPageCustomViewLength = await exportActivityPageCustomView.length;
        console.log(exportActivityPageCustomViewLength);
        if (activityPageCustomViewValueLength === exportActivityPageCustomViewLength) {
            console.log("As activity page custom view length: " + activityPageCustomViewValueLength + " and export activity page custom view length: " + exportActivityPageCustomViewLength + " are equal,so test case has been passed");
        } else {
            await assert.fail("As activity page custom view length: " + activityPageCustomViewValueLength + " and export activity page custom view length: " + exportActivityPageCustomViewLength + " are not equal,so test case has been aborted");
        }
        await driver.findElement(By.xpath('//span[@role="combobox"]/span[@role="presentation"]')).click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------------Case 3: Verify, the user is able to export the activity data--------------------------------

When('the user is able to export the activity data and verify {string}',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await exportActivityElementsObj.findModuleTab(driver, 'Company');
        await driver.sleep(1000);
        await exportContactElementsObj.findSelectAllLink(driver);
        await driver.sleep(1000);
        await exportActivityElementsObj.findModuleTab(driver, 'Contact');
        await driver.sleep(1000);
        await exportContactElementsObj.findSelectAllLink(driver);
        await driver.sleep(1000);
        await exportActivityElementsObj.findModuleTab(driver, 'Activity');
        await driver.sleep(1000);
        await exportContactElementsObj.findSelectAllLink(driver);
        await driver.sleep(1000);
        await exportActivityElementsObj.findModuleTab(driver, 'Deal');
        await driver.sleep(1000);
        await exportContactElementsObj.findSelectAllLink(driver);
        await driver.sleep(1000);
        await exportContactElementsObj.findExportButton(driver);
        await driver.sleep(2000);
        const actualNotificationElement = await driver.findElement(By.xpath('//h1[@class="heading m-b-md"]'));
        await driver.executeScript("arguments[0].scrollIntoView();", actualNotificationElement);
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//h1[@class="heading m-b-md"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(1000);
        console.log("As user is able to export the activity data,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 4: Verify, the user is able to search the activity fields--------------------------------------

When('the user is able to search the activity fields',async function(dataTable) {
    try {
        await driver.sleep(2000);

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
        //will click on the 'Export Activity' tab
        await exportActivityElementsObj.findTasksExportModule(driver);
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
                await driver.sleep(1000);

                //getting value of search box
                const searchBoxName = await driver.findElement(By.xpath('//input[@placeholder="Search Fields"]')).getAttribute('value');
                console.log("Existing Search Value: " + searchBoxName);

                //getting value of name
                const resultValue = await driver.findElement(By.xpath('//ul/li[@name="title"]/span[@class="m-l"]')).getText();
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
                await driver.sleep(1000);

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

//----------------Case 5: Verify, the user is able to manage the fields for the export activity----------------------------

When('the user is able to manage the fields for the export activity',async function(dataTable) {
    try {
        await driver.sleep(2000);
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

Then('check data {string} displayed under selected fields of export activity',async function(expectedSelectField) {
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

When('the user is able to manage the fields for export activity',async function(dataTable) {
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

                    //will get the current value of 'Associated Contacts Checkbox'
                    const currentState = await lastModifiedByToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Associated Contacts Checkbox'
                    if (currentState != disablingLastModifiedBy) {
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

Then('uncheck data {string} should not be displayed under selected fields of export activity',async function(expectedSelectField) {
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

//--------Case 6: Verify,the deal,contact and company module name should be displayed on the respective module fields--------------------------------------

When('the company module name displayed on the company fields',async function(dataTable) {
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
        await driver.sleep(3000);

        await tagManagementElementsObj.findModulesEditButton(driver, 'Company');
        await driver.sleep(2000);
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
        await exportActivityElementsObj.findTasksExportModule(driver);
        await driver.sleep(2000);
        await exportActivityElementsObj.findModuleTab(driver, 'Company');
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'company search field data') {
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
                    const associatedContactsToggle = await exportActivityElementsObj.findAssociatedContactsCheckbox(driver);
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

Then('check data {string} and verify postfixed company singular name',async function(expectedSelectField) {
    try {
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const associatedContactsSelectField = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        await driver.executeScript("arguments[0].scrollIntoView();", associatedContactsSelectField);
        await driver.wait(until.elementIsVisible(associatedContactsSelectField));
        const associatedContactsSelectFieldText = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`)).getText();
        console.log("After check the checkbox of associated contacts, the field displaying under select fields is: " + associatedContactsSelectFieldText);
        const associatedContactsSelectFieldElements = await driver.findElements(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        const associatedContactsSelectFieldLength = await associatedContactsSelectFieldElements.length;
        if (associatedContactsSelectFieldLength > 0) {
            console.log("As selected field " + associatedContactsSelectFieldText + " is found after check " + associatedContactsSelectFieldText + " checkbox,so test case has been passed");
        } else {
            await assert.fail("As selected field " + associatedContactsSelectFieldText + " is not found after check " + associatedContactsSelectFieldText + " checkbox,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        if (associatedContactsSelectFieldText.includes(companySingularName)) {
            console.log("As selected field " + associatedContactsSelectFieldText + " contains " + companySingularName + " as postfix,so test case has been passed");
        } else {
            await assert.fail("As selected field " + associatedContactsSelectFieldText + " does not contains " + companySingularName + " as postfix,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the contact module name displayed on the contact fields',async function(dataTable) {
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
        await driver.sleep(3000);

        await tagManagementElementsObj.findModulesEditButton(driver, 'Contact');
        await driver.sleep(2000);
        contactSingularName = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Contact Singular Name: " + contactSingularName);
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
        await exportActivityElementsObj.findTasksExportModule(driver);
        await driver.sleep(2000);
        await exportActivityElementsObj.findModuleTab(driver, 'Contact')
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'contact search field data') {
                searchFieldData = dataTable.rawTable[i][1];

                //will search for  'Last Name' checkbox
                const searchField = await exportContactElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchField);
                await searchField.sendKeys(searchFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'last name') {
                lastNameState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (lastNameState == 'enable' || lastNameState == 'disable') {
                    //will find 'Last Name Checkbox' Toggle Button
                    const lastNameToggle = await exportActivityElementsObj.findLastNameCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", lastNameToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Last Name Checkbox'
                    const currentState = await lastNameToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Last Name Checkbox'
                    if (currentState != lastNameState) {
                        await driver.executeScript("arguments[0].click();", lastNameToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the last name checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check data {string} and verify postfixed contact singular name',async function(expectedSelectField) {
    try {
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const lastNameSelectField = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        await driver.executeScript("arguments[0].scrollIntoView();", lastNameSelectField);
        await driver.wait(until.elementIsVisible(lastNameSelectField));
        const lastNameSelectFieldText = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`)).getText();
        console.log("After check the checkbox of last name, the field displaying under select fields is: " + lastNameSelectFieldText);
        await driver.manage().setTimeouts({implicit: 2000});
        const lastNameSelectFieldElements = await driver.findElements(By.xpath(`//li[contains(text(),"${expectedSelectField}")]`));
        const lastNameSelectFieldLength = await lastNameSelectFieldElements.length;
        if (lastNameSelectFieldLength > 0) {
            console.log("As selected field " + lastNameSelectFieldText + " is found after check " + lastNameSelectFieldText + " checkbox,so test case has been passed");
        } else {
            await assert.fail("As selected field " + lastNameSelectFieldText + " is not found after check " + lastNameSelectFieldText + " checkbox,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        if (lastNameSelectFieldText.includes(contactSingularName)) {
            console.log("As selected field " + lastNameSelectFieldText + " contains " + contactSingularName + " as postfix,so test case has been passed");
        } else {
            await assert.fail("As selected field " + lastNameSelectFieldText + " does not contains " + contactSingularName + " as postfix,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the deal module name displayed on the deal fields',async function(dataTable) {
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
        await driver.sleep(3000);

        await tagManagementElementsObj.findModulesEditButton(driver, 'Deal');
        await driver.sleep(2000);
        dealSingularName = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Deal Singular Name: " + dealSingularName);
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
        await exportActivityElementsObj.findTasksExportModule(driver);
        await driver.sleep(2000);
        await exportActivityElementsObj.findModuleTab(driver, 'Deal');
        await driver.sleep(1000);

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'deal search field data') {
                searchFieldData = dataTable.rawTable[i][1];

                //will search for  'Title' checkbox
                const searchField = await exportContactElementsObj.findSearchField(driver);
                await clearFieldDataObj.clearFieldData(searchField);
                await searchField.sendKeys(searchFieldData);
                await driver.sleep(500);
            } else if (fieldName == 'title') {
                titleState = dataTable.rawTable[i][1].toLowerCase();

                //will check that the provided data is valid to execute a test case or not
                if (titleState == 'enable' || titleState == 'disable') {
                    //will find 'Title Checkbox' Toggle Button
                    const titleToggle = await exportActivityElementsObj.findTitleCheckbox(driver);
                    await driver.executeScript("arguments[0].focus();", titleToggle);
                    await driver.sleep(1000);

                    //will get the current value of 'Title Checkbox'
                    const currentState = await titleToggle.getAttribute('value') == 'true' ? 'enable' : 'disable';

                    //will enable/disable 'Title Checkbox'
                    if (currentState != titleState) {
                        await driver.executeScript("arguments[0].click();", titleToggle);
                    }
                } else {
                    assert.fail('The provided \'' + dataTable.rawTable[i][1] + '\' value for the title checkbox toggle button is not valid. The value should be either \'enable\' or \'disable\'');
                }
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('check data {string} and verify postfixed deal singular name',async function(expectedSelectField) {
    try {
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const titleSelectField = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField} (Deal)")]`));
        await driver.executeScript("arguments[0].scrollIntoView();", titleSelectField);
        await driver.wait(until.elementIsVisible(titleSelectField));
        const titleSelectFieldText = await driver.findElement(By.xpath(`//li[contains(text(),"${expectedSelectField} (Deal)")]`)).getText();
        console.log("After check the checkbox of title, the field displaying under select fields is: " + titleSelectFieldText);
        const titleSelectFieldElements = await driver.findElements(By.xpath(`//li[contains(text(),"${expectedSelectField} (Deal)")]`));
        const titleSelectFieldLength = await titleSelectFieldElements.length;
        if (titleSelectFieldLength > 0) {
            console.log("As selected field " + titleSelectFieldText + " is found after check " + titleSelectFieldText + " checkbox,so test case has been passed");
        } else {
            await assert.fail("As selected field " + titleSelectFieldText + " is not found after check " + titleSelectFieldText + " checkbox,so test case has been aborted");
        }
        console.log(titleSelectFieldText);
        console.log(dealSingularName);
        if (titleSelectFieldText.includes(dealSingularName)) {
            console.log("As selected field " + titleSelectFieldText + " contains " + dealSingularName + " ,so test case has been passed");
        } else {
            await assert.fail("As selected field " + titleSelectFieldText + " does not contains " + dealSingularName + " ,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
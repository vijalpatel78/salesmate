const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openExportCompanyPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/data_administration/exportCompany/screenshots/';
const exportCompanyElementsObj = require('../common/exportCompanyElements');
const exportContactElementsObj = require('../../exportContact/common/exportContactElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const tagManagementElementsObj = require('../../../customizations/tagManagement/common/tagManagementPageElements');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let existingSearchData = 'no', nonExistingSearchData = 'no', searchFieldData = 'no';
let enablingLastModifiedBy = 'no', disablingLastModifiedBy = 'no';

Given('the {string} is on export company page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/export/detail?id=5')){
        console.log('The export company page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open export company page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on export company page');
        //will open the export company page
        await openExportCompanyPageObj.openExportCompanyPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open export company page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on export company page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on export company page');
        //will open the export company page
        await openExportCompanyPageObj.openExportCompanyPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the export company page
        await openExportCompanyPageObj.openExportCompanyPage(driver,screenshotPath);
    }
});

//------------------------------Case 1 : the system should display dynamic module name of company---------------------------------------

When('the system should display dynamic module name of company',async function() {
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

        await tagManagementElementsObj.findModulesEditButton(driver, 'Company');
        const companyPluralName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Company Plural Name: " + companyPluralName);
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
        const exportDataCompanyPluralName = await driver.findElement(By.xpath(`//div[text()=" ${companyPluralName} "]`)).getText();
        console.log("Export Data Contact Plural Name: " + exportDataCompanyPluralName);
        await driver.manage().setTimeouts({implicit: 2000});
        const exportDataCompany = await driver.findElements(By.xpath(`//div[text()=" ${companyPluralName} "]`));
        const exportDataCompanyPluralNameLength = await exportDataCompany.length;
        if (exportDataCompanyPluralNameLength > 0) {
            console.log("As export data plural name " + exportDataCompanyPluralName + " in export data exists,so test case has been passed");
        } else {
            await assert.fail("As export data plural name " + exportDataCompanyPluralName + " in export data does not exist,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: elementSearchTimeout});
        await exportCompanyElementsObj.findCompaniesExportModule(driver);
        await driver.sleep(5000);
        const companyHeaderName = await driver.findElement(By.xpath(`//h2[@class="m-b-xs"]`)).getText();
        console.log("Company Header Name: " + companyHeaderName);
        await driver.manage().setTimeouts({implicit: 2000});
        const companyLowerCase = await exportDataCompanyPluralName.toLowerCase();
        const companyHeaderElements = await driver.findElements(By.xpath(`//h2[contains(.,"${companyLowerCase}")]`));
        const companyHeaderLength = await companyHeaderElements.length;
        if (companyHeaderLength > 0) {
            console.log("As header name of exports company page " + companyHeaderName + " is displayed,so test case has been passed");
        } else {
            await assert.fail("As header name of exports company page " + companyHeaderName + " is not displayed,so test case has been aborted");
        }
        await driver.manage().setTimeouts({implicit: 2000});
        const companiesLowerCase = await companyPluralName.toLowerCase();
        const moduleHeaderElements = await driver.findElements(By.xpath(`//h2[contains(.,"${companiesLowerCase}")]`));
        const moduleHeaderLength = await moduleHeaderElements.length;
        if (moduleHeaderLength > 0) {
            console.log("As module header name of exports company page " + companyHeaderName + " is displayed,so test case has been passed");
        } else {
            await assert.fail("As module header name of exports company page " + companyHeaderName + " is not displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 2: Verify, the system should display custom view list that displayed on the company list page------------------------------------

When('the system display custom view list that displayed on the company list page',async function() {
    try {
        await driver.sleep(2000);
        await exportCompanyElementsObj.findCompanyIcon(driver);
        await driver.sleep(3000);
        await driver.findElement(By.xpath('//company-list//sm-custom-popover/div/a')).click();
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'companyPageCustomView.png');
        await driver.sleep(2500);
        const companyPageCustomViewValue = await driver.findElements(By.xpath("//div[@id='popover1-body']/div/div[3]/div/ul[1]/li"));
        const companyPageCustomViewValueLength = await companyPageCustomViewValue.length;
        console.log(companyPageCustomViewValueLength);
        console.log("Below are company page custom view values:");
        for (let i = 1; i <= companyPageCustomViewValueLength; i++) {
            const companyPageCustomViewValue = await driver.findElement(By.xpath(`//div[@id='popover1-body']/div/div[3]/div/ul/li[${i}]/a`));
            const companyPageCustomViewText = await companyPageCustomViewValue.getText();
            console.log(companyPageCustomViewText);
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
        await exportCompanyElementsObj.findCompaniesExportModule(driver);
        await driver.sleep(2000);
        await driver.findElement(By.xpath("//span[@role='combobox']/span[@role='textbox']")).click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'exportCompanyPageCustomView.png');
        await driver.manage().setTimeouts({implicit: 2000});
        const exportCompanyPageCustomViewValue = await driver.findElement(By.name("customView")).getText();
        console.log("Below are export company page custom view values:");
        console.log(exportCompanyPageCustomViewValue);
        const exportCompanyPageCustomView = await driver.findElements(By.xpath("//ul[@role='tree']/li"));
        const exportCompanyPageCustomViewLength = await exportCompanyPageCustomView.length;
        console.log(exportCompanyPageCustomViewLength);
        if (companyPageCustomViewValueLength === exportCompanyPageCustomViewLength) {
            console.log("As company page custom view: " + companyPageCustomViewValueLength + " and export company page custom view: " + exportCompanyPageCustomViewLength + " are equal,so test case has been passed");
        } else {
            await assert.fail("As company page custom view: " + companyPageCustomViewValueLength + " and export company page custom view: " + exportCompanyPageCustomViewLength + " are not equal,so test case has been aborted");
        }
        await driver.findElement(By.xpath('//span[@role="combobox"]/span[@role="presentation"]')).click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------------Case 3: Verify, the user is able to export the company data--------------------------------

When('the user is able to export the company data and verify {string}',async function(expectedNotification) {
    try {
        await driver.sleep(2000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(2000);
        await exportContactElementsObj.findSelectAllLink(driver);
        await exportContactElementsObj.findExportButton(driver);
        await driver.sleep(2000);
        const actualNotificationElement = await driver.findElement(By.xpath('//h1[@class="heading m-b-md"]'));
        await driver.executeScript("arguments[0].scrollIntoView();", actualNotificationElement);
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//h1[@class="heading m-b-md"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(1500);
        console.log("As user is able to export the company data,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 4: Verify, the user is able to search the company fields--------------------------------------

When('the user is able to search the company fields',async function(dataTable) {
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
        //will click on the 'Export Company' tab
        await exportCompanyElementsObj.findCompaniesExportModule(driver);
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

//-----------------------Case 5: Verify, the user is able to manage the fields for the export----------------------------

When('the user is able to manage the fields for the export company',async function(dataTable) {
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

Then('check data {string} should be displayed under selected fields of export company',async function(expectedSelectField) {
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

When('the user is able to manage the fields for export company',async function(dataTable) {
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

Then('uncheck data {string} should not be displayed under selected fields of export company',async function(expectedSelectField) {
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
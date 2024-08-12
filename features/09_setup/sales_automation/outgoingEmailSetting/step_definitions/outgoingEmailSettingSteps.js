const { Given,When,Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openOutgoingEmailSettingPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/sales_automation/outgoingEmailSetting/screenshots/';
const outgoingEmailSettingElementsObj = require('../common/outgoingEmailSettingElements');

let domainFieldData = 'no', domainLengthBeforeAddingBlankDomain, domainLengthBeforeAddingInvalidDomain;
let domainLengthBeforeAddingDuplicateDomain;

Given('the {string} is on outgoing email setting page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('email-delivery/outgoing-setting')){
        console.log('The outgoing email setting page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open outgoing email setting page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on outgoing email setting page');
        //will open the sequences page
        await openOutgoingEmailSettingPageObj.openOutgoingEmailSettingPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open outgoing email setting page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on outgoing email setting page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on outgoing email setting page');
        //will open the sequences page
        await openOutgoingEmailSettingPageObj.openOutgoingEmailSettingPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the outgoing email setting page
        await openOutgoingEmailSettingPageObj.openOutgoingEmailSettingPage(driver,screenshotPath);
    }
});

//------------------------------Case 1 : Verify, the user is able to add a domain---------------------------------------

When('the user is able to add a domain',async function(dataTable) {
    try {
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'domain') {
                domainFieldData = dataTable.rawTable[i][1].toLowerCase();

                //will find 'Domain' field and pass the new data
                const domainField = await outgoingEmailSettingElementsObj.findDomainField(driver);
                await clearFieldDataObj.clearFieldData(domainField);
                await domainField.sendKeys(domainFieldData);
                await driver.sleep(1000);
            }
        }
        //get values of 'Domain' Field
        const domainBeforeNavigation = await driver.findElement(By.id('domainName')).getAttribute('value');
        console.log("Domain added before navigation: " + domainBeforeNavigation);
        await outgoingEmailSettingElementsObj.findAddButton(driver);
        await driver.sleep(2000);
        //page navigation and come back to 'Outgoing Email Setting' page
        await pageNavigationObj.comeBackToOutgoingEmailSettingPage(driver, screenshotPath);
        await driver.sleep(1000);
        //get value of 'Added Domain' after navigation
        const domainAfterNavigation = await driver.findElement(By.xpath('//span[@class="domain-title pos-rlt"]')).getText();
        console.log("Domain added after navigation: " + domainAfterNavigation);
        //compare added new domain before and after navigation
        if (domainBeforeNavigation === domainAfterNavigation) {
            console.log("As newly added domain before and after navigation remains same,so test case has been passed");
        } else {
            await assert.fail("As newly added domain before and after navigation does not remains same,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 2: Verify, the user is not able to leave required fields as blank while adding a domain-----------------------------

When('the user is not able to leave required fields as blank while adding a domain',async function(dataTable) {
    try {
        //get count of 'Domains' before adding new blank domain
        const domainElements = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        domainLengthBeforeAddingBlankDomain = await domainElements.length;

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'domain') {
                domainFieldData = dataTable.rawTable[i][1].toLowerCase();

                //will find 'Domain' field and pass the new data
                const domainField = await outgoingEmailSettingElementsObj.findDomainField(driver);
                await clearFieldDataObj.clearFieldData(domainField);
                await domainField.sendKeys(domainFieldData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on add button and verify blank validation {string}',async function(expectedValidation) {
    try {
        await outgoingEmailSettingElementsObj.findAddButton(driver);
        await driver.sleep(1500);
        const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(1000);

        //get count of 'Domains' after adding new blank domain
        const domainElements = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        const domainLengthAfterAddingBlankDomain = await domainElements.length;
        if (domainLengthBeforeAddingBlankDomain === domainLengthAfterAddingBlankDomain) {
            console.log("As domain data is of blank,new blank domain will not be added,so test case has been passed");
        } else {
            await assert.fail("As domain data is of blank,new blank domain is get added,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 3: Verify, the user is not able to enter invalid data while adding a domain---------------------------

When('the user is not able to enter invalid data while adding a domain',async function(dataTable) {
    try {
        //get count of 'Domains' before adding new invalid domain
        const domainElements = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        domainLengthBeforeAddingInvalidDomain = await domainElements.length;

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'domain') {
                domainFieldData = dataTable.rawTable[i][1].toLowerCase();

                //will find 'Domain' field and pass the new data
                const domainField = await outgoingEmailSettingElementsObj.findDomainField(driver);
                await clearFieldDataObj.clearFieldData(domainField);
                await domainField.sendKeys(domainFieldData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on add button and verify validation {string}',async function(expectedValidation) {
    try {
        await outgoingEmailSettingElementsObj.findAddButton(driver);
        await driver.sleep(1500);
        const actualValidation = await driver.findElement(By.xpath('//div[@class="error-message text-danger"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(1000);

        //get count of 'Domains' after adding new invalid domain
        const domain = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        const domainLengthAfterAddingInvalidDomain = await domain.length;
        if (domainLengthBeforeAddingInvalidDomain === domainLengthAfterAddingInvalidDomain) {
            console.log("As domain data is of invalid,new invalid domain will not be added,so test case has been passed");
        } else {
            await assert.fail("As domain data is of invalid,new invalid domain is get added,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on add button and verify validation {string} message',async function(expectedValidation) {
    try {
        await outgoingEmailSettingElementsObj.findAddButton(driver);
        await driver.sleep(1500);
        const actualValidation = await driver.findElement(By.xpath('//sm-element/sm-validation-messages/div[2]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(1000);

        //get count of 'Domains' after adding new exceed length domain
        const domain = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        const domainLengthAfterAddingInvalidDomain = await domain.length;
        if (domainLengthBeforeAddingInvalidDomain === domainLengthAfterAddingInvalidDomain) {
            console.log("As domain data is of exceed length,new exceed length domain will not be added,so test case has been passed");
        } else {
            await assert.fail("As domain data is of exceed length,new exceed length domain is get added,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------Case 4: Verify, the user is not able to add a duplicate domain------------------------------------

When('the user is not able to add a duplicate domain',async function(dataTable) {
    try {
        //get count of 'Domains' before adding duplicate domain
        const domainElements = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        domainLengthBeforeAddingDuplicateDomain = await domainElements.length;

        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'domain') {
                domainFieldData = dataTable.rawTable[i][1].toLowerCase();

                //will find 'Domain' field and pass the new data
                const domainField = await outgoingEmailSettingElementsObj.findDomainField(driver);
                await clearFieldDataObj.clearFieldData(domainField);
                await domainField.sendKeys(domainFieldData);
                await driver.sleep(1000);
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('click on add button and verify {string} validation',async function(expectedValidation) {
    try {
        await outgoingEmailSettingElementsObj.findAddButton(driver);
        await driver.sleep(1000);
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);

        //get count of 'Domains' after adding new duplicate domain
        const domain = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        const domainLengthAfterAddingDuplicateDomain = await domain.length;
        if (domainLengthBeforeAddingDuplicateDomain === domainLengthAfterAddingDuplicateDomain) {
            console.log("As domain data is of duplicate,new duplicate domain will not be added,so test case has been passed");
        } else {
            await assert.fail("As domain data is of duplicate,new duplicate domain is get added,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 5: Verify, the system should give validation if any error comes while domain verification----------------------------------------

When('the system should give {string} if any error comes while domain verification',async function(expectedValidation) {
    try {
        await outgoingEmailSettingElementsObj.findUnverifiedButton(driver);
        await driver.sleep(1000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);
        await outgoingEmailSettingElementsObj.findVerifyButton(driver);
        await driver.sleep(2000);
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(5000);
        await outgoingEmailSettingElementsObj.findUnverifiedButton(driver);
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------Case 6:  Verify, the support page should get open on click of the ‘Click here’ link-----------------------------------

When('the support page should get open on click of Click here in {string} and in quick section click here {string} and {string}',async function(expectedValidation,cnameClickHere,quickSectionClickHere) {
    try {
        await outgoingEmailSettingElementsObj.findUnverifiedButton(driver);
        await driver.sleep(1000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);
        await outgoingEmailSettingElementsObj.findVerifyButton(driver);
        await driver.sleep(1000);
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(3000);
        //checking with 'validation Click Here Link' redirection
        const winHandlesBefore = await driver.getWindowHandle();
        await driver.findElement(By.xpath(`//a[@href='${cnameClickHere}']`)).click();
        await driver.sleep(6000);
        const closeTab = await driver.getAllWindowHandles();
        const closeFinalTab = closeTab[closeTab.length - 1];
        await driver.switchTo().window(closeFinalTab);
        const currentURL = await driver.getCurrentUrl();
        console.log("current url is:" + currentURL);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'cnameClickHerePage.png');
        if (currentURL === cnameClickHere) {
            console.log("As current url and expected url of cname click here link page is opened and urls are same test case has been passed");
        } else {
            await assert.fail("Due to unmatced URLs of cname click here link page test case has been aborted");
        }
        await driver.close();
        await driver.switchTo().window(winHandlesBefore);
        await driver.sleep(2000);

        //checking with 'Quick Section Click Here Link' redirection
        const winHandles = await driver.getWindowHandle();
        await driver.findElement(By.xpath(`//a[@href='${quickSectionClickHere}']`)).click();
        await driver.sleep(6000);
        const finalTab = await driver.getAllWindowHandles();
        const secondTab = finalTab[finalTab.length - 1];
        await driver.switchTo().window(secondTab);
        const currentUrl = await driver.getCurrentUrl();
        console.log("current url is:" + currentUrl);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'QuickSectionClickHerePage.png');
        if (currentUrl === quickSectionClickHere) {
            console.log("As current url and expected url of quick section click here link page is opened and urls are same test case has been passed");
        } else {
            await assert.fail("Due to unmatced URLs of quick section click here link page test case has been aborted");
        }
        await driver.close();
        await driver.switchTo().window(winHandles);
        await driver.sleep(2000);
        await outgoingEmailSettingElementsObj.findUnverifiedButton(driver);
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------Case 7: Verify, the user is able to delete an existing domain--------------------------------------

When('the user is able to delete an existing domain',async function() {
    try {
        //get count of 'Domains' after deleting domain
        const domainElements = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        const domainLengthBeforeDeletingDomain = await domainElements.length;

        await outgoingEmailSettingElementsObj.findUnverifiedButton(driver);
        await driver.sleep(1000);
        await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 600 }, 0);");
        await driver.sleep(2000);
        await outgoingEmailSettingElementsObj.findDeleteButton(driver);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[text()="No"]')).click();
        await driver.sleep(2000);

        //get count of 'Domains' after deleting domain
        const domain = await driver.findElements(By.xpath('//div[@class="doamin-used-wrapper"]/div'));
        const domainLengthAfterDeletingDomain = await domain.length;
        if (domainLengthBeforeDeletingDomain === domainLengthAfterDeletingDomain) {
            console.log("As domain is not deleted because cancellation of domain deletion,so test case has been passed");
        } else {
            await assert.fail("As domain is deleted even after cancellation of deletion,so test case has been aborted");
        }
        await outgoingEmailSettingElementsObj.findDeleteButton(driver);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(2000);
        await pageNavigationObj.comeBackToOutgoingEmailSettingPage(driver, screenshotPath);
        //verifying that deleted domain should not be displayed after page navigation
        await driver.manage().setTimeouts({implicit: 3000});
        const deletedDomain = await driver.findElements(By.xpath('//div[2]/section-title/span[@class="domain-title pos-rlt"]'));
        const deletedDomainLength = await deletedDomain.length;
        if (deletedDomainLength === 0) {
            console.log("As domain is deleted,it is not displayed on page,so test case has been passed");
        } else {
            await assert.fail("As domain is not deleted,it is displayed on page,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
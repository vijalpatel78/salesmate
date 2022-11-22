const { Given,When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const formElementObj = require('../../00_common/webElements/formElements');
const dashboardPageElementObj = require('../../00_common/dashboard/common/dashboardPageElements');
const clearFieldDataObj = require('../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/01_signUp/screenshots/';
const signUpElementsObj = require('../common/signUpElements');
const openSalesmatePageObj = require('../../00_common/actions/openSalesmatePage');
const moduleElementsObj = require('../../00_common/webElements/moduleElements');

Given('the user with {string} and {string} is on {string} link',async function(userEmail,userPassword,linkName) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    await driver.sleep(3000);
    if(currentPageURL === linkName) {
        /*  As the user is on the Salesmate login page,
         *  then the process to open new link page will be started from by performing the Salesmate login
        */
        let emailElement, passElement, loginBtn, dashboardPage_dashboardMenuBtn;

        //will check whether the specified user's credentials are found or not from the xlsx file
        if(userEmail == '' && userPassword == ''){
            await assert.fail('Due to the provided credentials are invalid, the test case execution can not be started.');
        }else {
            /* As user's credentials found, will perform Salesmate login with the specified user's credentials */

            //will find email field, password field or login button on the browser
            try {
                emailElement = await formElementObj.findTextbox(driver, screenshotPath, 'email');
                passElement = await formElementObj.findTextbox(driver, screenshotPath, 'password');
                loginBtn = await formElementObj.findButton(driver, screenshotPath, 'btnSubmit');
            } catch (err) {
                await screenshotObj.takeScreenshot(driver,screenshotPath+'loginElements_NotFound.png');
                await assert.fail(err);
            }

            //will pass the data to 'Email' field
            const emailField = await emailElement;
            await clearFieldDataObj.clearFieldData(emailField);
            await emailElement.sendKeys(userEmail);

            //will pass the data to 'Password' field
            const passwordField = await passElement;
            await clearFieldDataObj.clearFieldData(passwordField);
            await passElement.sendKeys(userPassword);

            //will click on the 'Login(Sign In)' button
            await loginBtn.click();
            await driver.sleep(5000);

            //will check whether it redirects to the dashboard page or not
            try {
                dashboardPage_dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
            } catch (err) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'DashboardPage_NotFound'+ '.png');
                await assert.fail('Due to the Salesmate dashboard page is not found after the login, the test case has been aborted. Screenshot Name: \'' + screenshotPath + 'DashboardPage_NotFound.png.');
            }

            await driver.wait(until.elementIsEnabled(dashboardPage_dashboardMenuBtn));
            await dashboardPage_dashboardMenuBtn.click();
            await driver.sleep(5000);

            console.log('Login successful and the Salesmate dashboard page has been opened successfully...');
        }
    }
    else if(currentPageTitle === 'Forgot Password -- Salesmate' || currentPageTitle === ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open dashboard page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate new link login page
        await driver.get(linkName);
        let emailElement, passElement, loginBtn, dashboardPage_dashboardMenuBtn;

        //will check whether the specified user's credentials are found or not from the xlsx file
        if(userEmail == '' && userPassword == ''){
            await assert.fail('Due to the provided credentials are invalid, the test case execution can not be started.');
        }else {
            /* As user's credentials found, will perform Salesmate login with the specified user's credentials */

            //will find email field, password field or login button on the browser
            try {
                emailElement = await formElementObj.findTextbox(driver, screenshotPath, 'email');
                passElement = await formElementObj.findTextbox(driver, screenshotPath, 'password');
                loginBtn = await formElementObj.findButton(driver, screenshotPath, 'btnSubmit');
            } catch (err) {
                await screenshotObj.takeScreenshot(driver,screenshotPath+'loginElements_NotFound.png');
                await assert.fail(err);
            }

            //will pass the data to 'Email' field
            const emailField = await emailElement;
            await clearFieldDataObj.clearFieldData(emailField);
            await emailElement.sendKeys(userEmail);

            //will pass the data to 'Password' field
            const passwordField = await passElement;
            await clearFieldDataObj.clearFieldData(passwordField);
            await passElement.sendKeys(userPassword);

            //will click on the 'Login(Sign In)' button
            await loginBtn.click();
            await driver.sleep(5000);

            //will check whether it redirects to the dashboard page or not
            try {
                dashboardPage_dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
            } catch (err) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'DashboardPage_NotFound' + '.png');
                await assert.fail('Due to the Salesmate dashboard page is not found after the login, the test case has been aborted. Screenshot Name: \'' + screenshotPath + 'DashboardPage_NotFound.png.');
            }

            await driver.wait(until.elementIsEnabled(dashboardPage_dashboardMenuBtn));
            await dashboardPage_dashboardMenuBtn.click();
            await driver.sleep(5000);

            console.log('Login successful and the Salesmate dashboard page has been opened successfully...');
        }
    }
    else {
        //as the user is successfully logged in
        console.log("Login successful and the Salesmate dashboard page has been opened successfully...");
    }
});

//---------------Case 1: Verify, the default list page of main modules should be displayed after the signup-------------

When('the default list page {string} of main {string} should be displayed after the signup',async function(expectedUrl,moduleName) {
    try {
        //will find main modules page and verify current page url
        const moduleIcon = await signUpElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        const currentPageUrl = await driver.getCurrentUrl();
        if (currentPageUrl.endsWith(expectedUrl)) {
            console.log("As current page and expected urls of "+moduleName+" page are matched,so test case has been passed");
        } else {
            await assert.fail("As current and expected page urls of "+moduleName+" page are unmatched,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'modulesPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 2: Verify, the default view of main modules should be selected after the signup------------------

When('the default {string} of main {string} should be selected after the signup',async function(expectedDefaultView,moduleName) {
    try {
        //will find main modules page and verify default view
        const moduleIcon = await signUpElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        //get value of 'Default View'
        const actualDefaultView = await driver.findElement(By.xpath('//span[@class="text-ellipsis selected-text "]')).getText();
        console.log("Default View of "+moduleName+":"+actualDefaultView);
        strictEqual(actualDefaultView,expectedDefaultView);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'modulesPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("As actual and expected default views of "+moduleName+" are matched,so test case has been passed");
});

//--------------Case 3: Verify, the default fields of main modules should be displayed after the signup-----------------

When('Verifying the default fields of main modules should be displayed after the signup',async function() {
    try {
        //will find main modules page and verify default view of contact module
        const contactModuleIcon = await signUpElementsObj.findModuleIcon(driver,'contacts');
        await contactModuleIcon.click();
        const addContactButton = await signUpElementsObj.findAddModuleButton(driver,'Contact');
        await addContactButton.click();
        //verify default fields of 'Contact' module
        const contactFirstNameField = await driver.findElement(By.id('firstName')).isDisplayed();
        const contactLastNameField = await driver.findElement(By.id('lastName')).isDisplayed();
        const contactMobileField = await driver.findElement(By.id('mobile')).isDisplayed();
        const contactEmailField = await driver.findElement(By.id('email')).isDisplayed();
        const contactCompanyField = await driver.findElement(By.xpath('//sm-autocomplete/sm-element//ro-tag/div/input')).isDisplayed();
        const contactJobTitleField = await driver.findElement(By.id('designation')).isDisplayed();
        const contactPhoneField = await driver.findElement(By.id('phone')).isDisplayed();
        const contactOtherPhoneField = await driver.findElement(By.id('otherPhone')).isDisplayed();
        const contactOwnerField = await driver.findElement(By.name('owner')).isDisplayed();
        const contactTypeField = await driver.findElement(By.name('type')).isDisplayed();
        const contactEmailOptOut = await driver.findElement(By.name('emailOptOut')).isEnabled();
        const contactSmsOptOut = await driver.findElement(By.name('smsOptOut')).isEnabled();
        const contactEmailOptOutReasonField = await driver.findElement(By.id('emailOptOutReason')).isDisplayed();
        const contactCurrencyField = await driver.findElement(By.name('currency')).isDisplayed();
        const contactTimeZoneField = await driver.findElement(By.name('timezone')).isDisplayed();
        const contactSkypeField = await driver.findElement(By.id('skypeId')).isDisplayed();
        const contactWebsiteField = await driver.findElement(By.id('website')).isDisplayed();
        const contactFacebookField = await driver.findElement(By.id('facebookHandle')).isDisplayed();
        const contactLinkedInField = await driver.findElement(By.id('linkedInHandle')).isDisplayed();
        const contactTwitterField = await driver.findElement(By.id('twitterHandle')).isDisplayed();
        const contactInstagramField = await driver.findElement(By.id('instagramHandle')).isDisplayed();
        const contactDescriptionField = await driver.findElement(By.id('description')).isDisplayed();
        const contactTagsField = await driver.findElement(By.xpath('//sm-form-creator//sm-tag/sm-element//ro-tag/div/input')).isDisplayed();
        const contactAddressLine1Field = await driver.findElement(By.id('billingAddressLine1')).isDisplayed();
        const contactAddressLine2Field = await driver.findElement(By.id('billingAddressLine2')).isDisplayed();
        const contactCityField = await driver.findElement(By.id('billingCity')).isDisplayed();
        const contactZipCodeField = await driver.findElement(By.id('billingZipCode')).isDisplayed();
        const contactStateField = await driver.findElement(By.id('billingState')).isDisplayed();
        const contactCountryField = await driver.findElement(By.id('billingCountry')).isDisplayed();
        try {
            strictEqual(contactFirstNameField, true);
            strictEqual(contactLastNameField, true);
            strictEqual(contactMobileField, true);
            strictEqual(contactEmailField, true);
            strictEqual(contactCompanyField,true);
            strictEqual(contactJobTitleField, true);
            strictEqual(contactPhoneField, true);
            strictEqual(contactOtherPhoneField, true);
            strictEqual(contactOwnerField, true);
            strictEqual(contactTypeField, true);
            strictEqual(contactEmailOptOut,true);
            strictEqual(contactSmsOptOut,true);
            strictEqual(contactEmailOptOutReasonField, true);
            strictEqual(contactCurrencyField,true);
            strictEqual(contactTimeZoneField,true);
            strictEqual(contactSkypeField, true);
            strictEqual(contactWebsiteField, true);
            strictEqual(contactFacebookField, true);
            strictEqual(contactLinkedInField, true);
            strictEqual(contactTwitterField, true);
            strictEqual(contactInstagramField, true);
            strictEqual(contactDescriptionField, true);
            strictEqual(contactTagsField,true);
            strictEqual(contactAddressLine1Field, true);
            strictEqual(contactAddressLine2Field, true);
            strictEqual(contactCityField, true);
            strictEqual(contactZipCodeField, true);
            strictEqual(contactStateField, true);
            strictEqual(contactCountryField, true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'contactFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of company module
        const companyModuleIcon = await signUpElementsObj.findModuleIcon(driver,'company');
        await companyModuleIcon.click();
        const addCompanyButton = await signUpElementsObj.findAddModuleButton(driver,'Company');
        await addCompanyButton.click();
        //verify default fields of 'Company' module
        const companyName = await driver.findElement(By.id('name')).isDisplayed();
        const companyOwner = await driver.findElement(By.name('owner')).isDisplayed();
        const companyWebsite = await driver.findElement(By.id('website')).isDisplayed();
        const companyPhone = await driver.findElement(By.id('phone')).isDisplayed();
        const companyOtherPhone = await driver.findElement(By.id('otherPhone')).isDisplayed();
        const companyNumberOfEmployees = await driver.findElement(By.id('numberOfEmployees')).isDisplayed();
        const companyAnnualRevenue = await driver.findElement(By.id('annualRevenue')).isDisplayed();
        const companyCurrency = await driver.findElement(By.name('currency')).isDisplayed();
        const companyType = await driver.findElement(By.name('type')).isDisplayed();
        const companySkype = await driver.findElement(By.id('skypeId')).isDisplayed();
        const companyFacebook = await driver.findElement(By.id('facebookHandle')).isDisplayed();
        const companyLinkedIn = await driver.findElement(By.id('linkedInHandle')).isDisplayed();
        const companyTwitter = await driver.findElement(By.id('twitterHandle')).isDisplayed();
        const companyInstagram = await driver.findElement(By.id('instagramHandle')).isDisplayed();
        const companyDescription = await driver.findElement(By.id('description')).isDisplayed();
        const companyTags = await driver.findElement(By.xpath('//div[1]//sm-form-creator//sm-tag/sm-element//ro-tag/div')).isDisplayed();
        const companyAddressLine1 = await driver.findElement(By.id('billingAddressLine1')).isDisplayed();
        const companyAddressLine2 = await driver.findElement(By.id('billingAddressLine2')).isDisplayed();
        const companyCity = await driver.findElement(By.id('billingCity')).isDisplayed();
        const companyZipCode = await driver.findElement(By.id('billingZipCode')).isDisplayed();
        const companyState = await driver.findElement(By.id('billingState')).isDisplayed();
        const companyCountry = await driver.findElement(By.id('billingCountry')).isDisplayed();
        const companyAssociatedContact = await driver.findElement(By.xpath('//button[text()="Add Associate Contact "]')).isDisplayed();
        try {
            strictEqual(companyName, true);
            strictEqual(companyOwner, true);
            strictEqual(companyWebsite, true);
            strictEqual(companyPhone, true);
            strictEqual(companyOtherPhone, true);
            strictEqual(companyNumberOfEmployees, true);
            strictEqual(companyAnnualRevenue, true);
            strictEqual(companyCurrency, true);
            strictEqual(companyType,true);
            strictEqual(companySkype, true);
            strictEqual(companyFacebook, true);
            strictEqual(companyLinkedIn, true);
            strictEqual(companyTwitter, true);
            strictEqual(companyInstagram, true);
            strictEqual(companyDescription, true);
            strictEqual(companyTags,true);
            strictEqual(companyAddressLine1, true);
            strictEqual(companyAddressLine2, true);
            strictEqual(companyCity, true);
            strictEqual(companyZipCode, true);
            strictEqual(companyState, true);
            strictEqual(companyCountry, true);
            strictEqual(companyAssociatedContact,true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'companyFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of activity module
        const activityModuleIcon = await signUpElementsObj.findModuleIcon(driver,'activity');
        await activityModuleIcon.click();
        const addActivityButton = await signUpElementsObj.findAddModuleButton(driver,'Activity');
        await addActivityButton.click();
        //verify default fields of 'Activity' module
        const activityTypeField = await driver.findElement(By.name('type')).isDisplayed();
        const activityDueDateField = await driver.findElement(By.id('dueDate')).isDisplayed();
        const activityTimeField = await driver.findElement(By.id('dueTime')).isDisplayed();
        const activityDurationField = await driver.findElement(By.id('duration')).isDisplayed();
        const activityTitleField = await driver.findElement(By.id('title')).isDisplayed();
        const activityDescriptionField = await driver.findElement(By.id('description')).isDisplayed();
        const activityTagsField = await driver.findElement(By.xpath('//sm-tag[@class="undefined"]/sm-element//ro-tag/div/input[@class="form-control"]')).isDisplayed();
        const activityContactField = await driver.findElement(By.xpath('//ul/li[1]/sm-autocomplete/sm-element//ro-tag/div/input')).isDisplayed();
        const activityCompanyField = await driver.findElement(By.xpath('//ul/li[2]/sm-autocomplete/sm-element//ro-tag/div/input')).isDisplayed();
        const activityDealField = await driver.findElement(By.xpath('//ul/li[3]/sm-autocomplete/sm-element//ro-tag/div/input')).isDisplayed();
        const activityOwnerField = await driver.findElement(By.name('owner')).isDisplayed();
        const activityAddTeammatesField = await driver.findElement(By.xpath('//div[3]/ro-tag/div/input')).isDisplayed();
        const activityAddParticipantsField = await driver.findElement(By.xpath('//div[4]/ro-tag/div/input')).isDisplayed();
        const activityMarkAsComplete = await driver.findElement(By.name('isCompleted')).isEnabled();
        const activityRecurrence = await driver.findElement(By.name('recurrence')).isEnabled();
        const activitySendCalenderInviteField = await driver.findElement(By.id('isCalendarInvite')).isDisplayed();
        try {
            strictEqual(activityTypeField, true);
            strictEqual(activityDueDateField, true);
            strictEqual(activityTimeField, true);
            strictEqual(activityDurationField, true);
            strictEqual(activityTitleField, true);
            strictEqual(activityDescriptionField, true);
            strictEqual(activityTagsField, true);
            strictEqual(activityContactField, true);
            strictEqual(activityCompanyField, true);
            strictEqual(activityDealField, true);
            strictEqual(activityOwnerField,true);
            strictEqual(activityAddTeammatesField, true);
            strictEqual(activityAddParticipantsField, true);
            strictEqual(activityMarkAsComplete,true);
            strictEqual(activityRecurrence,true);
            strictEqual(activitySendCalenderInviteField, true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'activityFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of deal module
        const dealModuleElement = await signUpElementsObj.findModuleIcon(driver,'deal');
        await dealModuleElement.click();
        const addDealButton = await signUpElementsObj.findAddModuleButton(driver,'Deal');
        await addDealButton.click();
        //verify default fields of 'Deal' module
        const dealTitleField = await driver.findElement(By.id('title')).isDisplayed();
        const dealContactField = await driver.findElement(By.xpath('//div/div[1]/div/sm-autocomplete[1]//ro-tag/div/input')).isDisplayed();
        const dealCompanyField = await driver.findElement(By.xpath('//div/div[1]/div/sm-autocomplete[2]//ro-tag/div/input')).isDisplayed();
        const dealWinProbabilityField = await driver.findElement(By.id('winProbability')).isDisplayed();
        const dealOwnerField = await driver.findElement(By.name('owner')).isDisplayed();
        const dealEstimatedCloseField = await driver.findElement(By.id('estimatedCloseDate')).isDisplayed();
        const dealValueField = await driver.findElement(By.id('dealValue')).isDisplayed();
        const dealCurrencyField = await driver.findElement(By.name('currency')).isDisplayed();
        const dealPipelineField = await driver.findElement(By.name('pipeline')).isDisplayed();
        const dealStageField = await driver.findElement(By.name('stage')).isDisplayed();
        const dealSourceField = await driver.findElement(By.name('source')).isDisplayed();
        const dealPriorityField = await driver.findElement(By.name('priority')).isDisplayed();
        const dealStatusField = await driver.findElement(By.name('status')).isDisplayed();
        const dealDescriptionField = await driver.findElement(By.id('description')).isDisplayed();
        const dealTagsField = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div/input[@class="form-control"]')).isDisplayed();
        const dealAssociateProductsField = await driver.findElement(By.xpath('//span[@class="dealTypeUniqueClass"]')).isDisplayed();
        const dealTeammatesField = await driver.findElement(By.xpath('//sm-add-teammate//sm-autocomplete//ro-tag/div/input')).isDisplayed();
        const dealParticipantsField = await driver.findElement(By.xpath('//add-deal-form//sm-add-participant/section-body//sm-autocomplete//ro-tag/div/input')).isDisplayed();
        try {
            strictEqual(dealTitleField, true);
            strictEqual(dealContactField, true);
            strictEqual(dealCompanyField, true);
            strictEqual(dealWinProbabilityField, true);
            strictEqual(dealOwnerField, true);
            strictEqual(dealEstimatedCloseField, true);
            strictEqual(dealValueField, true);
            strictEqual(dealCurrencyField, true);
            strictEqual(dealPipelineField, true);
            strictEqual(dealStageField, true);
            strictEqual(dealSourceField,true);
            strictEqual(dealPriorityField, true);
            strictEqual(dealStatusField, true);
            strictEqual(dealDescriptionField, true);
            strictEqual(dealTagsField, true);
            strictEqual(dealAssociateProductsField, true);
            strictEqual(dealTeammatesField,true);
            strictEqual(dealParticipantsField,true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'dealFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of product module
        const productModuleIcon = await signUpElementsObj.findModuleIcon(driver,'product');
        await productModuleIcon.click();
        const addProductButton = await signUpElementsObj.findAddModuleButton(driver,'Product');
        await addProductButton.click();
        //verify default fields of 'Product' module
        const productNameField = await driver.findElement(By.id('name')).isDisplayed();
        const productSkuCodeField = await driver.findElement(By.id('sku')).isDisplayed();
        const productCurrencyField = await driver.findElement(By.name('currency')).isDisplayed();
        const productSalePriceField = await driver.findElement(By.id('unitPrice')).isDisplayed();
        const productDescriptionField = await driver.findElement(By.id('description')).isDisplayed();
        const productActiveForeSales = await driver.findElement(By.name('isActive')).isEnabled();
        const productTagsField = await driver.findElement(By.xpath('//ro-tag/div[@class="ro-tag-autocomplete"]/input')).isDisplayed();
        try {
            strictEqual(productNameField, true);
            strictEqual(productSkuCodeField, true);
            strictEqual(productCurrencyField, true);
            strictEqual(productSalePriceField, true);
            strictEqual(productDescriptionField, true);
            strictEqual(productActiveForeSales,true);
            strictEqual(productTagsField, true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'productFields_NotFound.png');
            await assert.fail(err);
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'defaultField_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("As default fields of contact module are set,so test case has been passed");
});

//-------------Case 4: Verify, the default columns of main modules should be displayed after the signup-----------------

When('the default columns of main modules should be displayed after the signup',async function() {
    try {
        //will find main modules page and verify default view of contact module
        const contactModuleIcon = await signUpElementsObj.findModuleIcon(driver,'contacts');
        await contactModuleIcon.click();
        const contactManageColumns = await signUpElementsObj.findManageColumns(driver);
        await contactManageColumns.click();
        //verify 'Selected Fields' of 'Contact' module
        const contactNameField = await driver.findElement(By.xpath('//li[text()=" Name "]')).isDisplayed();
        const contactJobTitleField = await driver.findElement(By.xpath('//li[text()=" Job Title "]')).isDisplayed();
        const contactNameCompanyField = await driver.findElement(By.xpath('//li[text()=" Name (Company) "]')).isDisplayed();
        const contactEmailField = await driver.findElement(By.xpath('//li[text()=" Email "]')).isDisplayed();
        const contactMobileField = await driver.findElement(By.xpath('//li[text()=" Mobile "]')).isDisplayed();
        const contactOwnerField = await driver.findElement(By.xpath('//li[text()=" Owner "]')).isDisplayed();
        const contactTagsField = await driver.findElement(By.xpath('//li[text()=" Tags "]')).isDisplayed();
        try {
            strictEqual(contactNameField, true);
            strictEqual(contactJobTitleField, true);
            strictEqual(contactNameCompanyField, true);
            strictEqual(contactEmailField, true);
            strictEqual(contactMobileField, true);
            strictEqual(contactOwnerField, true);
            strictEqual(contactTagsField, true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactSelectFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of company module
        const companyModuleIcon = await signUpElementsObj.findModuleIcon(driver,'company');
        await companyModuleIcon.click();
        const companyManageColumn = await signUpElementsObj.findManageColumns(driver);
        await companyManageColumn.click();
        //verify 'Selected Fields' of 'Company' module
        const companyNameField = await driver.findElement(By.xpath('//li[text()=" Name "]')).isDisplayed();
        const companyWebsiteField = await driver.findElement(By.xpath('//li[text()=" Website "]')).isDisplayed();
        const companyOwnerField = await driver.findElement(By.xpath('//li[text()=" Owner "]')).isDisplayed();
        const companyTagsField = await driver.findElement(By.xpath('//li[text()=" Tags "]')).isDisplayed();
        try {
            strictEqual(companyNameField, true);
            strictEqual(companyWebsiteField, true);
            strictEqual(companyOwnerField, true);
            strictEqual(companyTagsField, true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'companySelectFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of activity module
        const activityModuleIcon = await signUpElementsObj.findModuleIcon(driver,'activity');
        await activityModuleIcon.click();
        const activityManageColumn = await signUpElementsObj.findManageColumns(driver);
        await activityManageColumn.click();
        //verify 'Selected Fields' of 'Activity' module
        const activityTitleField = await driver.findElement(By.xpath('//li[text()=" Title "]')).isDisplayed();
        const activityDueDateField = await driver.findElement(By.xpath('//li[text()=" Due Date "]')).isDisplayed();
        const activityDurationField = await driver.findElement(By.xpath('//li[text()=" Duration "]')).isDisplayed();
        const activityOwnerField = await driver.findElement(By.xpath('//li[text()=" Owner "]')).isDisplayed();
        const activityDealTitleField = await driver.findElement(By.xpath('//li[text()=" Title (Deal) "]')).isDisplayed();
        const activityContactNameField = await driver.findElement(By.xpath('//li[text()=" Name (Contact) "]')).isDisplayed();
        const activityCompanyNameField = await driver.findElement(By.xpath('//li[text()=" Name (Company) "]')).isDisplayed();
        const activityTagsField = await driver.findElement(By.xpath('//li[text()=" Tags "]')).isDisplayed();
        try {
            strictEqual(activityTitleField, true);
            strictEqual(activityDueDateField, true);
            strictEqual(activityDurationField, true);
            strictEqual(activityOwnerField, true);
            strictEqual(activityDealTitleField, true);
            strictEqual(activityContactNameField, true);
            strictEqual(activityCompanyNameField, true);
            strictEqual(activityTagsField,true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'activitySelectFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of deal module
        const dealModuleIcon = await signUpElementsObj.findModuleIcon(driver,'deal');
        await dealModuleIcon.click();
        const dealToolTip = await signUpElementsObj.findDealToolTip(driver);
        await dealToolTip.click();
        const dealManageColumn = await signUpElementsObj.findDealManageColumns(driver);
        await dealManageColumn.click();
        //verify 'Selected Fields' of 'Deal' module
        const dealTitleField = await driver.findElement(By.xpath('//li[text()=" Title "]')).isDisplayed();
        const dealNameContactField = await driver.findElement(By.xpath('//li[text()=" Name (Contact) "]')).isDisplayed();
        const dealNameCompanyField = await driver.findElement(By.xpath('//li[text()=" Name (Company) "]')).isDisplayed();
        const dealValueField = await driver.findElement(By.xpath('//li[text()=" Value "]')).isDisplayed();
        const dealStageField = await driver.findElement(By.xpath('//li[text()=" Stage "]')).isDisplayed();
        const dealStatusField = await driver.findElement(By.xpath('//li[text()=" Status "]')).isDisplayed();
        const dealOwnerField = await driver.findElement(By.xpath('//li[text()=" Owner "]')).isDisplayed();
        const dealLastActivityField = await driver.findElement(By.xpath('//li[text()=" Last Activity At "]')).isDisplayed();
        const dealTagsField = await driver.findElement(By.xpath('//li[text()=" Tags "]')).isDisplayed();
        try {
            strictEqual(dealTitleField, true);
            strictEqual(dealNameContactField, true);
            strictEqual(dealNameCompanyField, true);
            strictEqual(dealValueField, true);
            strictEqual(dealStageField, true);
            strictEqual(dealStatusField, true);
            strictEqual(dealOwnerField, true);
            strictEqual(dealLastActivityField,true);
            strictEqual(dealTagsField,true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealSelectFields_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default view of product module
        const productModuleIcon = await signUpElementsObj.findModuleIcon(driver,'product');
        await productModuleIcon.click();
        const productManageColumn = await signUpElementsObj.findManageColumns(driver);
        await productManageColumn.click();
        //verify 'Selected Fields' of 'Product' module
        const productNameField = await driver.findElement(By.xpath('//li[text()=" Name "]')).isDisplayed();
        const productSkuCodeField = await driver.findElement(By.xpath('//li[text()=" SKU/Code "]')).isDisplayed();
        const productCurrencyField = await driver.findElement(By.xpath('//li[text()=" Currency "]')).isDisplayed();
        const productSalePriceField = await driver.findElement(By.xpath('//li[text()=" Sale Price "]')).isDisplayed();
        const productDescriptionField = await driver.findElement(By.xpath('//li[text()=" Description "]')).isDisplayed();
        const productTagsField = await driver.findElement(By.xpath('//li[text()=" Tags "]')).isDisplayed();
        try {
            strictEqual(productNameField, true);
            strictEqual(productSkuCodeField, true);
            strictEqual(productCurrencyField, true);
            strictEqual(productSalePriceField, true);
            strictEqual(productDescriptionField, true);
            strictEqual(productTagsField, true);
            const closeIcon = await moduleElementsObj.findCloseIcon(driver);
            await closeIcon.click();
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'productSelectFields_NotFound.png');
            await assert.fail(err);
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'selectedFields_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("As default manage column selected fields are displayed,so test case has been passed");
});

//---------------Case 5: Verify, the default widgets of main modules should be displayed after the signup---------------

When('the default widgets of main modules should be displayed after the signup',async function() {
    try {
        //will find main modules page and verify default widgets of contact module
        const contactModuleIcon = await signUpElementsObj.findModuleIcon(driver,'contacts');
        await contactModuleIcon.click();
        const contactOrCompanyName = await signUpElementsObj.findContactOrCompanyName(driver,1);
        await contactOrCompanyName.click();
        //verify 'Contact Widget' details
        const contactDetails = await driver.findElement(By.xpath('//h4[text()=" Contact Details "]')).isDisplayed();
        const contactSmartInsights = await driver.findElement(By.xpath('//h4[text()=" Smart Insights "]')).isDisplayed();
        const contactDeals = await driver.findElement(By.xpath('//span[text()=" Deals "]')).isDisplayed();
        const contactAssociatedDeals = await driver.findElement(By.xpath('//span[text()="Associated Deals "]')).isDisplayed();
        const contactSequences = await driver.findElement(By.xpath('//section-title//span[text()="Sequences"]')).isDisplayed();
        try {
            strictEqual(contactDetails, true);
            strictEqual(contactSmartInsights, true);
            strictEqual(contactDeals, true);
            strictEqual(contactAssociatedDeals, true);
            strictEqual(contactSequences, true);
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'contactWidgets_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default widgets of company module
        const companyModuleIcon = await signUpElementsObj.findModuleIcon(driver,'company');
        await companyModuleIcon.click();
        const contactOrCompanyNameElement = await signUpElementsObj.findContactOrCompanyName(driver,1);
        await contactOrCompanyNameElement.click();
        //verify 'Company Widget' details
        const companyDetails = await driver.findElement(By.xpath('//h4[text()=" Company Details "]')).isDisplayed();
        const companySmartInsights = await driver.findElement(By.xpath('//h4[text()=" Smart Insights "]')).isDisplayed();
        const companyDeals = await driver.findElement(By.xpath('//span[text()=" Deals "]')).isDisplayed();
        const companyAssociatedContacts = await driver.findElement(By.xpath('//h4[contains(text()," Associated Contact")]')).isDisplayed();
        try {
            strictEqual(companyDetails, true);
            strictEqual(companySmartInsights, true);
            strictEqual(companyDeals, true);
            strictEqual(companyAssociatedContacts, true);
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'companyWidgets_NotFound.png');
            await assert.fail(err);
        }

        //will find main modules page and verify default widgets of deal module
        const dealModuleIcon = await signUpElementsObj.findModuleIcon(driver,'deal');
        await dealModuleIcon.click();
        await driver.wait(until.elementLocated(By.xpath('//button[@tooltip="List"]')), 10000).click();
        await driver.sleep(500);
        const dropdownButton = await driver.wait(until.elementLocated(By.xpath('//deal-list//sm-custom-popover//i[@class="caret"]')), 10000);
        await dropdownButton.click();
        await driver.sleep(1000);
        const viewDropdown = await driver.wait(until.elementLocated(By.xpath('//a[text()="All Deals"]')), 10000);
        await viewDropdown.click();
        await driver.sleep(2000);
        const dealName = await signUpElementsObj.findDealName(driver,1);
        await dealName.click();
        //verify 'Deal Widget' details
        const dealContact = await driver.findElement(By.xpath('//h4[text()=" Contact"]')).isDisplayed();
        const dealCompany = await driver.findElement(By.xpath('//h4[text()=" Company"]')).isDisplayed();
        const dealDetails = await driver.findElement(By.xpath('//h4[text()=" Deal Details "]')).isDisplayed();
        const dealSpecificEmail = await driver.findElement(By.xpath('//h4[text()=" Deal specific email "]')).isDisplayed();
        const dealSmartInsights = await driver.findElement(By.xpath('//h4[text()=" Smart Insights "]')).isDisplayed();
        const dealTeammates = await driver.findElement(By.xpath('//section-title/h4[text()="Teammates"]')).isDisplayed();
        const dealParticipants = await driver.findElement(By.xpath('//section-title/h4[text()="Participants"]')).isDisplayed();
        const dealAssociateProducts = await driver.findElement(By.xpath('//span[text()="Associate Products"]')).isDisplayed();
        const dealSequences = await driver.findElement(By.xpath('//section-title//span[text()="Sequences"]')).isDisplayed();
        try {
            strictEqual(dealContact, true);
            strictEqual(dealCompany, true);
            strictEqual(dealDetails, true);
            strictEqual(dealSpecificEmail, true);
            strictEqual(dealSmartInsights,true);
            strictEqual(dealTeammates,true);
            strictEqual(dealParticipants,true);
            strictEqual(dealAssociateProducts,true);
            strictEqual(dealSequences,true);
            const dealModuleIcon = await signUpElementsObj.findModuleIcon(driver,'deal');
            await dealModuleIcon.click();
            const dropdownButton = await driver.wait(until.elementLocated(By.xpath('//deal-list//sm-custom-popover//i[@class="caret"]')), 10000);
            await dropdownButton.click();
            await driver.sleep(1000);
            const viewDropdown = await driver.wait(until.elementLocated(By.xpath('//a[text()="My Open Deals"]')), 10000);
            await viewDropdown.click();
            await driver.sleep(2000);
            await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on salesmate login listing page');
            await driver.sleep(1000);
        }catch(err) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'dealWidgets_NotFound.png');
            await assert.fail(err);
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'defaultWidget_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("As default widgets are visible,so test case has been passed");
});
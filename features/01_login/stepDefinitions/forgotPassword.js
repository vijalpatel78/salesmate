const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const openSalesmateLoginPageObj = require('../../00_common/actions/openSalesmatePage');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const formElementsObj = require('../../00_common/webElements/formElements');
const readUserDetailsObj = require('../../00_common/actions/readExcelData');
const driver = require('../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/02_login/screenshots/'
let resetPasswordBtn;

Given('the user is on forgot password page', async () =>{
    try {
        let forgotPasswordLink, currentPageTitle;

        //will verify whether the forgot password page is already opened or not
        currentPageTitle = await driver.getTitle();
        if (currentPageTitle == 'Forgot Password -- Salesmate') {
            /* Note: There are two pages of forgot password which have the same page title */

            //will check whether the user is on the first forgot password page or not
            const emailElement = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
            if (await emailElement.isDisplayed()) {
                console.log('The first forgot password page has been opened successfully...');
            } else {
                //will redirect to the first forgot password page
                await driver.navigate().refresh();
                console.log('The first forgot password page has been opened successfully...');
            }
        } else {
            /*  As the another page is opened,
                the process to open forgot password page will be started from the salesmate 02_login page
            */

            //will open Salesmate 02_login page
            await openSalesmateLoginPageObj.openSalesmateLoginPage(driver, screenshotPath, 'the user is on forgot password page');

            //will find the 'Forgot Password' link
            try {
                forgotPasswordLink = await formElementsObj.findElementById(driver,screenshotPath,'forgetPassword','loginButton');
            } catch (err) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'ForgotPasswordLink_NotFound.png');
                await assert.fail('Due to the forgot password link is not found, the test case has been failed');
            }

            await driver.wait(until.elementIsVisible(forgotPasswordLink));

            //will click on the 'Forgot Password' link
            await forgotPasswordLink.click();

            //will verify whether the forgot password page found or not
            currentPageTitle = await driver.getTitle();
            try {
                await assert.strictEqual(currentPageTitle, 'Forgot Password -- Salesmate');
                console.log('The first forgot password page has been opened successfully...');
            } catch (err) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'ForgotPassPage_NotFound.png');
                await assert.fail('Due to the forgot password page is not found, the test case has been failed. Error Details: \'' + err + '\'');
            }
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('click on the Reset My Password button', async () =>{
    try {
        //will find 'Reset My Password' button
        try {
            resetPasswordBtn = await formElementsObj.findElementById(driver,screenshotPath,'btn_reset_password','resetPasswordButton');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'ResetMyPasswordBtn_NotFound.png');
            await assert.fail('Due to the reset my password button is not found, the test case has been failed');
        }

        await driver.wait(until.elementIsEnabled(resetPasswordBtn));

        //will click on the 'Reset My Password' button
        await resetPasswordBtn.click();
        await driver.sleep(4000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('an email to reset password should be sent on an entered email address', async () =>{
    try {
        let emailAddressElem;

        //will wait till the first page of forgot password is get closed
        try {
            await driver.wait(until.elementIsNotVisible(resetPasswordBtn), 6000);
        } catch (err) {
            //as the first page of forgot password is still opened, it will mark the test case as a fail
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'ForgotPassValidEmail_Case_Failed.png');
            await assert.fail('Due to an email to reset a password is not sent, the test case has been failed');
        }

        //on the second page of forgot password, it will find an email address (on which email to reset a password is sent)
        try {
            emailAddressElem = await formElementsObj.findElementById(driver,screenshotPath,'email_placeholder','emailAddress');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'ForgotEmailAddressElement_NotFound.png');
            await assert.fail('Due to the email address element is not found, the test case has been failed');
        }

        await driver.wait(until.elementIsVisible(emailAddressElem));

        //will get the data of email address element
        const actualEmailAdd = await emailAddressElem.getText();

        //will get the expected email address data(on which email to reset a password should be sent)
        const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_staging.xlsx', 'UserDetails');
        const expectedEmailAdd = userDetails.email[0];

        //will compare actual(on which email to reset a password is sent) and expected(on which email to reset a password should be sent) email addresses
        try {
            await assert.strictEqual(actualEmailAdd, expectedEmailAdd);
        } catch (err) {
            //as actual and expected email addresses are not the same, it will mark the test case as a fail
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'ForgotPassValidEmail_Case_Failed.png');
            await assert.fail('Due to an email to reset a password is sent on the wrong email address, the test case has been failed. Error Details: \'' + err + '\'');
        }

        //as both actual and expected email addresses are the same, it will mark the test case as a pass
        console.log('\'Forgot password with valid email address\' case has been passed successfully...');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
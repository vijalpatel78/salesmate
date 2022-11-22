const { Given } = require('@cucumber/cucumber');
const { until } = require('selenium-webdriver');
const assert = require('assert');
const formElementObj = require('../../00_common/webElements/formElements');
const dashboardPageElementObj = require('../../00_common/dashboard/common/dashboardPageElements');
const clearFieldDataObj = require('../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/01_signUp/screenshots/';

Given('user with {string} and {string} is on {string} link',async function(userEmail,userPassword,linkName) {
    await driver.sleep(2000);
    const currentPageURL = await driver.getCurrentUrl();
    await driver.sleep(2000);
    if(currentPageURL.includes(linkName)) {
        //will open the Salesmate new link 02_login page
        let emailElement, passElement, loginBtn, dashboardPage_dashboardMenuBtn;

        //will check whether the specified user's credentials are found or not from the xlsx file
        if (userEmail == '' && userPassword == '') {
            await assert.fail('Due to the provided credentials are invalid, the test case execution can not be started.');
        } else {
            /* As user's credentials found, will perform Salesmate 02_login with the specified user's credentials */

            //will find email field, password field or 02_login button on the browser
            try {
                emailElement = await formElementObj.findTextbox(driver, screenshotPath, 'email');
                passElement = await formElementObj.findTextbox(driver, screenshotPath, 'password');
                loginBtn = await formElementObj.findButton(driver, screenshotPath, 'btnSubmit');
            } catch (err) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'loginElements_NotFound.png');
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
                await assert.fail('Due to the Salesmate dashboard page is not found after the 02_login, the test case has been aborted. Screenshot Name: \'' + screenshotPath + 'DashboardPage_NotFound.png.');
            }

            await driver.wait(until.elementIsEnabled(dashboardPage_dashboardMenuBtn));
            await dashboardPage_dashboardMenuBtn.click();
            await driver.sleep(5000);

            console.log('Login successful and the Salesmate dashboard page has been opened successfully...');
        }
    } else {
        //as the user is successfully logged in
        console.log("Login successful and the Salesmate dashboard page has been opened successfully...");
    }
});
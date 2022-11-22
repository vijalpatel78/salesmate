const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const config = require('../../../../cucumber_config/cucumber_config');
const driver = config.driver;
const changePasswordElements = require('../common/changePasswordPageElements');
const sharedElements = require('../../../00_common/actions/commonActions');
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const openSecurityPageObj = require('../common/actions');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/04_myAccount/changePassword/screenshots/';
const readUserDetailsObj = require('../../../00_common/actions/readExcelData');
const formElementsObj = require('../../../00_common/webElements/formElements');
const filePath = `${__dirname}/../../../../cucumber_config/testData_staging.xlsx`;
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

let newPasswordValue;

Given('the {string} is on security page',async (user) => {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/user/security/changePassword')) {
        console.log('The security page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate') {
        /*  As the user is on the Salesmate login page,
         *  then the process to open security page will be started from by performing the Salesmate login */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on security page');
        //will open the security page
        await openSecurityPageObj.openSecurityPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == '') {
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open security page will be started from by opening the Salesmate login page  */

        //will open the Salesmate login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on security page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on security page');
        //will open the security page
        await openSecurityPageObj.openSecurityPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the security page
        await openSecurityPageObj.openSecurityPage(driver,screenshotPath);
    }
});

When('Enter valid {string},{string},{string} and click on update button',async function (oldPassword,newPassword,confirmPassword){
    try {
        await changePasswordElements.changePassword(oldPassword, newPassword, confirmPassword);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        newPasswordValue = await driver.findElement(By.id('newPassword')).getAttribute('value');
        console.log(newPasswordValue);
        console.log("Changed old password and new password updated,so test case has been passed");
    }catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'updatedPassword_Failed.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
    }
});

Then('Salesmate password changed and successful message as {string} displayed',async function (expectedNotification) {
    try {
        let actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        let actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(3000);
        console.log("Salesmate password changed and successful message displayed test case has been passed");
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('User is not able to do login with old password and verify {string}',async function(expectedValidation) {
    try {
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on security page');
        await driver.sleep(2000);
        const userDetails = await readUserDetailsObj.readUserDetails(filePath, 'UserDetails');
        await sharedElements.login(userDetails.email[0], userDetails.password[0]);
        await driver.sleep(1000);
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation,expectedValidation);
        await driver.sleep(3000);
        await driver.navigate().refresh();
        await driver.sleep(3000);
        console.log(newPasswordValue);
        await sharedElements.login(userDetails.email[0], newPasswordValue);
        await driver.sleep(6000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'login_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Verifying {string} {string} {string} for each blank password fields',async function(oldPasswordValidation,newPasswordValidation,retypePasswordValidation) {
    try {
        await driver.manage().setTimeouts({implicit:2000});
        await changePasswordElements.changePassword('', '', '');
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        let requiredValidationMsg1 = await driver.findElement(By.xpath(`//sm-change-password//form/sm-input-txt[1]/sm-element/sm-validation-messages/div[@class='error-message text-danger']`)).getText();
        strictEqual(requiredValidationMsg1,oldPasswordValidation);
        let requiredValidationMsg2 = await driver.findElement(By.xpath(`//form/div/sm-input-txt/sm-element/sm-validation-messages/div[@class='error-message text-danger']`)).getText();
        strictEqual(requiredValidationMsg2,newPasswordValidation);
        let requiredValidationMsg3 = await driver.findElement(By.xpath(`//sm-change-password//form/sm-input-txt[2]/sm-element/sm-validation-messages/div[@class='error-message text-danger']`)).getText();
        strictEqual(requiredValidationMsg3,retypePasswordValidation);
        await driver.sleep(1000);
        console.log("As required field verification done,test case has been passed");
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'requiredValidationMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('User check {string},{string},{string}',async function (oldPassword,newPassword,confirmPassword){
    try {
        await changePasswordElements.changePassword(oldPassword, newPassword, confirmPassword);
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        await driver.sleep(1000);
        console.log("Checking with invalid passwords test case has been passed");
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'passwordsMisMatch_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('Password should not be updated and checking {string}',async function (expectedValidation){
    try {
        await driver.sleep(1000);
        let errMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(errMsgElement));
        let actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedValidation);
        await driver.sleep(4000);
        console.log("Verification of invalid password data with appropriate error messages test case has been passed");
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'invalidPasswordNotification_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Enter {string} in new password field',async function (newPasswordFieldValue) {
    try {
        await changePasswordElements.newPasswordFieldChecking(newPasswordFieldValue);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'newPasswordField_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    console.log("Verified strength of new password field test case has been passed");
});

Then('{string} message should be displayed under new password field',async function (expectedPasswordStrengthMessage) {
    try {
        const actualPasswordStrengthMsgElement = await driver.findElement(By.xpath('//div[@class="pull-right d-flex v-center pass-quality"]'));
        await driver.wait(until.elementIsVisible(actualPasswordStrengthMsgElement));
        const actualPasswordStrengthMsg = await driver.findElement(By.xpath('//div[@class="pull-right d-flex v-center pass-quality"]')).getText();
        strictEqual(actualPasswordStrengthMsg, expectedPasswordStrengthMessage);
        await driver.sleep(1000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'invalidPasswordNotification_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As password strength indicator has not been displayed,test case has been aborted");
    }
});

When('New password field is leaved as blank no strength indicator should be displayed',async function() {
    try {
        await changePasswordElements.newPasswordFieldBlank();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        try {
            const strengthIndicator = await driver.findElements(By.xpath('//div[@class="pull-right d-flex v-center pass-quality"]'));
            const strengthIndicatorLength = await strengthIndicator.length;
            if (strengthIndicatorLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'strengthIndicatorInvisible.png');
                console.log("As strength indicator is not found under blank password field,so test case has been passed");
            } else {
                await driver.manage().setTimeouts({implicit: elementSearchTimeout});
                await assert.fail("As strength indicator is found under blank password field,so test case has been aborted");
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'strengthIndicatorInVisible_Failed.png');
            await assert.fail(err);
        }
        console.log("Due to not presence of strength indicator message under new password field test case has been passed...");
        await changePasswordElements.resetPassword();
        const updateButton = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','Update Button');
        await updateButton.click();
        await driver.sleep(3500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
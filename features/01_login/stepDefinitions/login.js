const {When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const subscriptionPageElementObj = require('../../00_common/subscription/common/subscriptionPageElements');
const dashboardPageElementObj = require('../../00_common/dashboard/common/dashboardPageElements');
const twoFactorPageElementObj = require('../../04_myAccount/twoFactorAuthentication/common/twoFactorAuthenticationPageElements');
const readUserDetailsObj = require('../../00_common/actions/readExcelData');
const formElementsObj = require('../../00_common/webElements/formElements');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const clearFieldDataObj = require('../../00_common/actions/fieldActions/clearFieldData');
const driver = require('../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/02_login/screenshots/'
let count = 0;

When('enter Password:{string}', async (pwd) =>{
    try {
        let passElement;

        //will find 'Password' field
        try {
            passElement = await formElementsObj.findElementById(driver,screenshotPath,'password','passwordField');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'PasswordField_NotFound.png');
            await assert.fail('Due to the password field is not found, the test case has been failed');
        }

        await driver.wait(until.elementIsVisible(passElement));

        //will check whether have to pass a valid data or not
        if (pwd == 'validPassword') {
            //as have to pass a valid data, then will fetch valid password data from the excel file
            const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx', 'UserDetails');
            pwd = userDetails.password[0];
        }

        //will pass the data to 'Password' field
        await clearFieldDataObj.clearFieldData(passElement);
        await passElement.sendKeys(pwd);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('click on the Login button', async () =>{
    try {
        let loginBtn;

        //will find 'Login(Sign In)' button
        try {
            loginBtn = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','loginButton');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'LoginBtn_NotFound.png');
            await assert.fail('Due to the login button is not found, the test case has been failed');
        }

        await driver.wait(until.elementIsEnabled(loginBtn));

        //will click on the 'Login(Sign In)' button
        await loginBtn.click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the user should get login into the Salesmate', async () =>{
    /* will check whether the user gets login or not */

    const suspendedMsg = 'Your account has been suspended. Contact support system for any help.';
    const deactivatedMsg = 'Account is deactivated.';
    ++count;

    //will check whether it redirects to the dashboard or not
    try{
        const dashboardPage_dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
        await driver.wait(until.elementIsVisible(dashboardPage_dashboardMenuBtn));
        await driver.sleep(3000);
        console.log('Login successful and the Salesmate dashboard page has been opened successfully...');
    }catch(err1){
        /* if it is not redirected to the dashboard, then it will check some other cases */

        await driver.manage().setTimeouts({implicit:2000});

        //will check whether 2FA screen is getting opened or not
        try{
            const twoFactorPage_verificationCodeTextBox = await twoFactorPageElementObj.findVerificationCodeTextBox(driver);
            await driver.wait(until.elementIsVisible(twoFactorPage_verificationCodeTextBox),3000);
            console.log('The user\'s login credentials is valid but the two-factor authentication screen has been opened');
        }catch(err2){
            //will check whether link expired screen is getting opened or not (admin login)
            try{
                await subscriptionPageElementObj.findContactSalesBtn(driver);
                console.log('The user\'s login credentials or account is valid but the Salesmate link has been expired (Admin Login)');
            }catch(err3){
                //will check whether link expired screen is getting opened or not (non-admin login)
                try{
                    await subscriptionPageElementObj.findNonAdminSubsExpiredText(driver);
                    console.log('The user\'s login credentials or account is valid but the Salesmate link has been expired (Non-Admin Login)');
                }catch(err4){
                    //will check whether the account deactivated or link suspended message is getting fired or not (normal login)
                    try{
                        const errElement = await formElementsObj.findElementByXpath(driver,screenshotPath,'div','class','error-message text-danger','validationMessage');
                        const actualValidationMsg = await errElement.getText();
                        await driver.sleep(2000);
                        if(actualValidationMsg == deactivatedMsg || actualValidationMsg == suspendedMsg)
                        {
                            console.log('The user\'s login credentials are valid but either the account is deactivated or the link is suspended');
                        }else{
                            await assert.fail();
                        }
                    }catch(err5){
                            await screenshotObj.takeScreenshot(driver,screenshotPath+'LoginValidCredentials_Case_Failed_'+count+'.png');
                            await assert.fail('Due to the some error, the test case has been failed. Screenshot Name: '+screenshotPath+'LoginValidCredentials_Case_Failed_'+count+'.png');
                    }
                }
            }
        }
    }
});
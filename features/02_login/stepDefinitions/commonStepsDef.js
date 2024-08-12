const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const readUserDetailsObj = require('../../00_common/actions/readExcelData');
const openSalesmateLoginPageObj = require('../../00_common/actions/openSalesmatePage');
const commonElementObj = require('../../00_common/webElements/commonElements');
const formElementsObj = require('../../00_common/webElements/formElements');
const clearFieldDataObj = require('../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/02_login/screenshots/'

Given('the user is on Salesmate login page', async () =>{
    try {
        //will open Salesmate login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver, screenshotPath, 'the user is on Salesmate login page');
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'salesmateLoginPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('the user enter Email:{string}', async (email) =>{
    try {
        let emailElement;

        //will find 'Email' field
        try {
            emailElement = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'EmailField_NotFound.png');
            await assert.fail('Due to the email field is not found, the test case has been failed');
        }

        await driver.wait(until.elementIsVisible(emailElement));

        //will check whether have to pass a valid data or not
        if (email == 'validEmail') {
            //as have to pass a valid data, then will fetch valid email data from the excel file
            const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_staging.xlsx', 'UserDetails');
            email = userDetails.email[0];
        }

        //will pass the data to 'Email' field
        await clearFieldDataObj.clearFieldData(emailElement);
        await emailElement.sendKeys(email);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should give {string} message on the {string} page for {string} case', async (expectedValidationMsg,page,caseName) =>{
    let errElement;

    //will find validation message element
    try{
        if(page == 'Salesmate_Login'){
            if(caseName == 'Invalid Credentials'){
                await driver.sleep(1000);
                errElement = await commonElementObj.findNotyMessage(driver,screenshotPath);
                await driver.sleep(2000);
            }else{
                errElement = await formElementsObj.findElementByXpath(driver,screenshotPath,'div','class','error-message text-danger','validationMessage');
                await driver.wait(until.elementIsVisible(errElement),15000,'Validation message is not found');
            }
        }else if(page == 'Salesmate_Forgot_Password'){
            errElement = await formElementsObj.findElementById(driver,screenshotPath,'err_message','forgotValidation');
            await driver.wait(until.elementIsVisible(errElement),15000,'Validation message is not found');
        }else{
            await assert.fail('Provided value ---> '+page+' Note: The value should be one of \'Salesmate_Login\', \'Salesmate_Google_Login\' and \'Salesmate_Forgot_Password\'');
        }
    }catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath+'ValidationMsg_NotFound_'+page+'.png');
        await assert.fail('Due to the validation message element is not found, the test case has been failed');
    }
    await driver.wait(until.elementTextContains(errElement,expectedValidationMsg));

    //will fetch validation message text
    const actualValidationMsg = await errElement.getText();

    //will check whether the actual and expected validation messages are same or not
    try{
        await assert.strictEqual(actualValidationMsg,expectedValidationMsg);
    }catch(err){
        //as both validation messages are not same, it will mark the respective test case as a fail
        if(page == 'Salesmate_Login'){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'LoginInvalidCredentials_Case_Failed.png');
            await assert.fail('Due to this error ------> '+err+', the test case has been failed');
        }else if(page == 'Salesmate_Forgot_Password'){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'ForgotPassInvalidEmail_Case_Failed.png');
            await assert.fail('Due to this error ------> '+err+', the test case has been failed');
        }else if(page == 'Salesmate_Google_Login'){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'GLoginWithUnknownUser_Case_Failed.png');
            await assert.fail('Due to this error ------> '+err+', the test case has been failed');
        }
    }

    //as both validation messages are same, it will mark the respective test case as a pass
    if(page == 'Salesmate_Login'){
        console.log('\'Login with invalid credentials\' case has been passed successfully...');
    }else if(page == 'Salesmate_Forgot_Password'){
        console.log('\'Forgot password with invalid email address\' case has been passed successfully...');
    }
});
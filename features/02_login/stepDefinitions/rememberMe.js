const {When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const readSalesmteLinkNameObj = require('../../00_common/actions/readExcelData');
const formElementsObj = require('../../00_common/webElements/formElements');
const linkEnvironment = require('../../../cucumber_config/cucumber_config').linkEnvironment;
const driver = require('../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/02_login/screenshots/';

When('{string} Remember Me checkbox', async (newCheckboxState) =>{
    try {
        let rememberMeTxt, rememberMeChkbox;
        newCheckboxState = newCheckboxState.toLowerCase();

        //will find 'Remember Me' checkbox and label
        try {
            rememberMeTxt = await formElementsObj.findElementByXpath(driver,screenshotPath,'label','for','rememberMeCheckboxField','rememberMeText');
            rememberMeChkbox = await formElementsObj.findRememberMeCheckbox(driver,'rememberMeCheckboxField');
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'RememberMeField_NotFound.png');
            await assert.fail('Due to the remember me field is not found, the test case has been failed');
        }

        await driver.wait(until.elementIsEnabled(rememberMeChkbox));

        //will check/uncheck 'Remember Me' checkbox
        if (newCheckboxState == 'check') {
            if (!await rememberMeChkbox.isSelected()) {
                await rememberMeTxt.click();
            }
        } else if (newCheckboxState == 'uncheck') {
            if (await rememberMeChkbox.isSelected()) {
                await rememberMeTxt.click();
            }
        } else {
            await assert.fail('Provided value ---> ' + newCheckboxState + ' Note: The value should be either \'check\' or \'uncheck\'');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system {string} remember last login {string} and {string}', async (wantToRemember,expectedEmailData,expectedPassData) =>{
    let emailElement, passElement, salesmateLink, rememberMeChkbox;
    wantToRemember = wantToRemember.toLowerCase();

    // const loginBtn = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','loginButton');
    // await driver.wait(until.elementIsEnabled(loginBtn));

    //will refresh the page
    await driver.sleep(1000);
    if(linkEnvironment.toLocaleLowerCase() == 'dev'){
        salesmateLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData_dev.xlsx','SalesmateLink');
    } else if(linkEnvironment.toLocaleLowerCase() === 'staging'){
        salesmateLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData_staging.xlsx','SalesmateLink');
        salesmateLink = "https://staging9.salesmate.io";
    } else{
        salesmateLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData.xlsx','SalesmateLink');
    }
    salesmateLink = salesmateLink + '/fe/logout';
    await driver.get(salesmateLink);
    await driver.sleep(1000);

    //will find email and password fields
    try{
        emailElement = await formElementsObj.findElementById(driver,screenshotPath,'email','emailField');
        passElement = await formElementsObj.findElementById(driver,screenshotPath,'password','passwordField');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Email_PasswordFields_NotFound.png');
        await assert.fail('Due to the email and/or password field(s) are not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(emailElement));
    await driver.wait(until.elementIsVisible(passElement));

    //will get email and password data from the Salesmate login screen
    const actualEmailData = await emailElement.getAttribute('value');
    const actualPassData = await passElement.getAttribute('value');
    
    //will find 'Remember Me' checkbox
    try{
        rememberMeChkbox = await formElementsObj.findRememberMeCheckbox(driver,'rememberMeCheckboxField');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RememberMeField_NotFound.png');
        await assert.fail('Due to the remember me field is not found, the test case has been failed');
    }

    if(wantToRemember == 'should'){
        //will verify whether last login credentials is getting maintained or not when remember me checkbox is checked
        if(await rememberMeChkbox.isSelected() && actualEmailData == expectedEmailData && actualPassData == expectedPassData){
            console.log('\'Remember last login credentials\' case has been passed successfully...');
        }else{
            console.log('Due to the last login credentials are not maintained, the test case is getting failed');
            console.log('Remember Me ---> Expected: \'true\', Actual: \''+await rememberMeChkbox.isSelected()+'\'');
            console.log('Email ---> Expected: \''+expectedEmailData+'\', Actual: \''+actualEmailData+'\'');
            console.log('Password ---> Expected: \''+expectedPassData+'\', Actual: \''+actualPassData+'\'');
            await screenshotObj.takeScreenshot(driver,screenshotPath+'RememberMe_Case_Failed.png');
            await assert.fail('Due to the last login credentials are not maintained, the test case has been failed. Actual Result>> Email: \''+actualEmailData+'\', Pass: \''+actualPassData+'\', Checkbox: \''+await rememberMeChkbox.isSelected()+'\'.');
        }
    }else if(wantToRemember == 'should not'){
        //will verify whether last login credentials is getting maintained or not when remember me checkbox is unchecked
        if(!await rememberMeChkbox.isSelected() && actualEmailData == '' && actualPassData == ''){
            console.log('\'Do not remember last login credentials\' case has been passed successfully...');
        }else{
            console.log('Due to the email or password field is not blank or remember me checkbox is selected, the test case is getting failed');
            console.log('Remember Me ---> Expected: \'false\', Actual: \''+await rememberMeChkbox.isSelected()+'\'');
            console.log('Email ---> Expected: \'\', Actual: \''+actualEmailData+'\'');
            console.log('Password ---> Expected: \'\', Actual: \''+actualPassData+'\'');
            await screenshotObj.takeScreenshot(driver,screenshotPath+'RememberMeNot_Case_Failed.png');
            await assert.fail('Due to the email or password field is not blank or remember me checkbox is selected, the test case is getting failed. Actual Result>> Email: \''+actualEmailData+'\', Pass: \''+actualPassData+'\', Checkbox: \''+await rememberMeChkbox.isSelected()+'\'.');
        }
    }else{
        await assert.fail('Provided value ---> '+wantToRemember+' Note: The value should be either \'should not\' or \'should\'');
    }
});

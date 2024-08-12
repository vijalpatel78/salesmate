const {Given,When,Then} = require('@cucumber/cucumber');
const {By} = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openEmailSignaturePageObj = require('../common/actions');
const emailSignaturePageElementObj = require('../common/emailSignaturePageElements');
const generalSettingsPageElementObj = require('../../generalSettings/common/generalSettingsPageElements');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/04_myAccount/emailSignature/screenshots/';
let expectedEmailSignatureFormat, expectedStateOfEmailSignaturePlacement;

Given('the {string} is on email signature page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/user/emailSettings/signature')){
        console.log('The email signature page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open email signature page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on email signature page');
        //will open the email signature page
        await openEmailSignaturePageObj.openEmailSignaturePage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open email signature page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on email preferences page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on email preferences page');
        //will open the email signature page
        await openEmailSignaturePageObj.openEmailSignaturePage(driver,screenshotPath);
    }
    else{
        //as the user is logged in, it will open the email signature page
        await openEmailSignaturePageObj.openEmailSignaturePage(driver,screenshotPath);
    }
});

When('the user {string} email signature from the {string} page', async (state,pageName) =>{
    try {
        //will find email signature iFrame and then change focus on that
        const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
        await driver.switchTo().frame(emailSignatureiFrame);
        //will find 'Email Signature' field
        const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);

        //will set or remove email signature
        if (state.toLowerCase() == 'set') {
            await emailSignatureField.clear();
            expectedEmailSignatureFormat = '<body class="fr-view" dir="auto" contenteditable="true" style="min-height: 200px;" aria-disabled="false" spellcheck="true"><p><strong><span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">​</span><span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">​</span>Regards,</strong></p><p><strong>Automated Test</strong></p></body>';
            await driver.executeScript("arguments[0].innerHTML='" + expectedEmailSignatureFormat + "';", emailSignatureField);
        } else if (state.toLowerCase() == 'remove') {
            await emailSignatureField.clear();
            expectedEmailSignatureFormat = '<body class="fr-view" dir="auto" contenteditable="true" style="min-height: 200px;" aria-disabled="false" spellcheck="true"><div><br></div></body>';
            await driver.executeScript("arguments[0].innerHTML='" + expectedEmailSignatureFormat + "';", emailSignatureField);
        } else {
            //will switch back to the main page before failing the test case
            await driver.switchTo().defaultContent();
            assert.fail('The provided \'' + state + '\' value is not valid to execute test case. The value should be either \'set\' or \'remove\'.');
        }

        //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('<br>', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('<div>', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('</div>', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace('fr-draggable', '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/ /g, '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/[^\x20-\x7E]/g, '');
        expectedEmailSignatureFormat = expectedEmailSignatureFormat.replace(/ *\<span[^]*span\>*/g, '');
        //will switch back to the main page
        await driver.switchTo().defaultContent();
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('{string} place this signature before quoted text in replies option from the {string} page', async (newState,pageName) =>{
    try {
        //will check that the provided data is valid to execute a test case or not
        if (newState.toLowerCase() == 'enable' || newState.toLowerCase() == 'disable') {
            expectedStateOfEmailSignaturePlacement = newState.toLowerCase() == 'enable' ? 'enable' : 'disable';

            //will find 'Email Signature Placement' toggle button
            const emailSignaturePlacementCheckbox = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
            await driver.executeScript("arguments[0].focus();", emailSignaturePlacementCheckbox);
            await driver.sleep(1000);
            //will get the current value of 'Email Signature Placement'
            const currentState = await emailSignaturePlacementCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

            //will enable/disable 'Email Signature Placement' toggle button
            if (currentState != newState.toLowerCase()) {
                await driver.executeScript("arguments[0].click();", emailSignaturePlacementCheckbox);
            } else {
                console.log('The \'Place this signature before quoted text in replies\' option is already ' + newState.toLowerCase() + 'd')
            }
        } else {
            assert.fail('The provided \'' + newState + '\' value for the email signature placement field is not valid. The value should be either \'enable\' or \'disable\'.');
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('the system should display updated email signature and place this signature before quoted text in replies option on the {string} page', async (pageName) =>{
    try {
        //will find notification message after updating
        let notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
        //will fetch the notification message text
        const notyMessageText = await notyMessage.getText();

        //will check whether the notification message is a success message or not
        try {
            assert.strictEqual(notyMessageText, 'Updated successfully.');
            await driver.sleep(2000);
        } catch (err) {
            await driver.navigate().refresh();
            await driver.sleep(1000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SuccessMessage_NotGiven.png');
            assert.fail('Due to the success message is not given after updating, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'SuccessMessage_NotGiven.png\'');
        }

        //will go on the provided page
        if (pageName.toLowerCase() == 'email signature') {
            //will find 'email settings' tab and then click on that
            const emailSettingsTab = await emailSignaturePageElementObj.findEmailSettingsTab(driver, screenshotPath);
            await emailSettingsTab.click();
            await driver.sleep(2000);
            //will find 'email signature' tab and then click on that
            const emailSignatureTab = await emailSignaturePageElementObj.findEmailSignatureTab(driver, screenshotPath);
            await emailSignatureTab.click();
            await driver.sleep(2000);
        } else if (pageName.toLowerCase() == 'general settings') {
            //will find 'gerenal settings' tab and then click on that
            const generalSettingsTab = await generalSettingsPageElementObj.findGeneralSettingsTab(driver, screenshotPath);
            await generalSettingsTab.click();
            await driver.sleep(2000);
        } else {
            assert.fail('The provided \'' + pageName + '\' page name is not valid. Expected Page Name ---> \'Email Signature\' OR \'General Settings\'.');
        }

        //will find 'Email Signature Placement' toggle button
        const emailSignaturePlacementCheckbox = await generalSettingsPageElementObj.findemailSignaturePlacementCheckbox(driver, screenshotPath);
        await driver.executeScript("arguments[0].focus();", emailSignaturePlacementCheckbox);
        await driver.sleep(1000);
        //will get the current value of 'Email Signature Placement'
        const actualStateOfEmailSignaturePlacement = await emailSignaturePlacementCheckbox.getAttribute('value') == 'true' ? 'enable' : 'disable';

        //will find email signature iFrame and then change focus on that
        const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver, screenshotPath);
        await driver.switchTo().frame(emailSignatureiFrame);
        //will find 'Email Signature' field
        const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver, screenshotPath);
        //will get HTML format of updated email signature
        let actualEmailSignatureFormat = await driver.executeScript("return arguments[0].outerHTML;", emailSignatureField);
        //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('<br>', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('<div>', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('</div>', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace('fr-draggable', '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/ /g, '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/[^\x20-\x7E]/g, '');
        actualEmailSignatureFormat = actualEmailSignatureFormat.replace(/ *\<span[^]*span\>*/g, '');
        //will switch back to the main page
        await driver.switchTo().defaultContent();

        //will compare HTML format of actual and expected email signature
        try {
            assert.strictEqual(actualEmailSignatureFormat, expectedEmailSignatureFormat);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'EmailSignature_NotUpdated.png');
            assert.fail('Due to the email signature is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'EmailSignature_NotUpdated.png\'.');
        }

        //will compare actual and expected value of email signature placement
        try {
            assert.strictEqual(actualStateOfEmailSignaturePlacement, expectedStateOfEmailSignaturePlacement);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'EmailSignaturePlacement_NotUpdated.png');
            assert.fail('Due to the value of email signature placement option is not get updated, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + 'EmailSignaturePlacement_NotUpdated.png\'.');
        }

        if (pageName.toLowerCase() == 'email signature') {
            console.log('After updating the email signature and email signature placement option from the \'general settings\' page, those settings are also get updated on the \'' + pageName + '\' page.')
        } else {
            console.log('After updating the email signature and email signature placement option from the \'email signature\' page, those settings are also get updated on the \'' + pageName + '\' page.')
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
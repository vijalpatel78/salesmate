const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/02_actions/02_cloneContact/screenshots/';
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

//-----------Case 1: Verify, the clone option should be disabled when the user doesn't have contact add rights----------

Then('clone {string} module is not visible and log in through {string}',async function(moduleName,adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleIcon.click();
        await driver.sleep(2000);
        //check invisibility of 'Clone Contact' link on 'Contact Details' page
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const actionsButton = await driver.findElement(By.xpath('//a[text()="Actions "] | //button[text()="Actions "]'));
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageCloneContactLink = !!await driver.findElement(By.xpath('//a[text()=" Clone"]')).isDisplayed();
        if (detailsPageCloneContactLink === false) {
            console.log("As details page clone contact link is not displayed after disabling add contact rights,so test case has been passed");
        } else {
            await assert.fail("As details page clone contact link is displayed even after disabling add contact rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'cloneLink_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------Case 2: Verify, the clone option should be displayed when the user has add contact rights--------------

Then('clone {string} module is visible and log in through {string}',async function(moduleName,adminUser) {
    try {
        const contactModule = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await contactModule.click();
        await driver.sleep(2000);
        //check invisibility of 'Clone Contact' link on 'Contact Details' page
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const actionsButton = await driver.findElement(By.xpath('//a[text()="Actions "] | //button[text()="Actions "]'));
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const detailsPageCloneContactLink = !!await driver.findElement(By.xpath('//a[text()=" Clone"]')).isDisplayed();
        if (detailsPageCloneContactLink === true) {
            console.log("As details page clone contact link is displayed after enabling add contact rights,so test case has been passed");
        } else {
            await assert.fail("As details page clone contact link is not displayed even after enabling add contact rights,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'cloneLink_Invisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------------------------Case 3: Verify, the user is able to clone the contact details--------------------------------

When('the user is able to clone the contact details and verify {string} message',async function(expectedNotification){
    try {
        await driver.sleep(1500);
        const editIcon = await moduleElementsObj.findEditIcon(driver,'1');
        await editIcon.click();
        await driver.sleep(3000);
        //get all values of 'Edit Contact'
        const editContactFirstName = await driver.findElement(By.id('firstName')).getAttribute('value');
        const editContactLastName = await driver.findElement(By.id('lastName')).getAttribute('value');
        const editContactMobile = await driver.findElement(By.id('mobile')).getAttribute('value');
        const editContactEmail = await driver.findElement(By.id('email')).getAttribute('value');
        const editContactJobTitle = await driver.findElement(By.id('designation')).getAttribute('value');
        const editContactPhone = await driver.findElement(By.id('phone')).getAttribute('value');
        const editContactOtherPhone = await driver.findElement(By.id('otherPhone')).getAttribute('value');
        const editContactEmailOptOutReason = await driver.findElement(By.id('emailOptOutReason')).getAttribute('value');
        const editContactSkype = await driver.findElement(By.id('skypeId')).getAttribute('value');
        const editContactFacebook = await driver.findElement(By.id('facebookHandle')).getAttribute('value');
        const editContactLinkedIn = await driver.findElement(By.id('linkedInHandle')).getAttribute('value');
        const editContactTwitter = await driver.findElement(By.id('twitterHandle')).getAttribute('value');
        const editContactInstagram = await driver.findElement(By.id('instagramHandle')).getAttribute('value');
        const editContactDescription = await driver.findElement(By.id('description')).getAttribute('value');
        const editContactAddressLine1 = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
        const editContactAddressLine2 = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
        const editContactCity = await driver.findElement(By.id('billingCity')).getAttribute('value');
        const editContactZipCode = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
        const editContactState = await driver.findElement(By.id('billingState')).getAttribute('value');
        const editContactCountry = await driver.findElement(By.id('billingCountry')).getAttribute('value');
        const editContactText = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        const editContactTextArea = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        const editContactInteger = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        const editContactDecimal = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        const editContactEmailDetails = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const editContactPhoneDetails = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const editContactUrl = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        const editContactBigInteger = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        const editContactPercentage = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        const editContactCurrency = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        const closeIcon = await moduleElementsObj.findCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(1000);
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        //check values of 'Clone contact'
        const cloneLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Clone');
        await cloneLink.click();
        await driver.sleep(3000);
        const cloneContactFirstName = await driver.findElement(By.id('firstName')).getAttribute('value');
        const cloneContactLastName = await driver.findElement(By.id('lastName')).getAttribute('value');
        const cloneContactMobile = await driver.findElement(By.id('mobile')).getAttribute('value');
        const cloneContactEmail = await driver.findElement(By.id('email')).getAttribute('value');
        const cloneContactJobTitle = await driver.findElement(By.id('designation')).getAttribute('value');
        const cloneContactPhone = await driver.findElement(By.id('phone')).getAttribute('value');
        const cloneContactOtherPhone = await driver.findElement(By.id('otherPhone')).getAttribute('value');
        const cloneContactEmailOptOutReason = await driver.findElement(By.id('emailOptOutReason')).getAttribute('value');
        const cloneContactSkype = await driver.findElement(By.id('skypeId')).getAttribute('value');
        const cloneContactFacebook = await driver.findElement(By.id('facebookHandle')).getAttribute('value');
        const cloneContactLinkedIn = await driver.findElement(By.id('linkedInHandle')).getAttribute('value');
        const cloneContactTwitter = await driver.findElement(By.id('twitterHandle')).getAttribute('value');
        const cloneContactInstagram = await driver.findElement(By.id('instagramHandle')).getAttribute('value');
        const cloneContactDescription = await driver.findElement(By.id('description')).getAttribute('value');
        const cloneContactAddressLine1 = await driver.findElement(By.id('billingAddressLine1')).getAttribute('value');
        const cloneContactAddressLine2 = await driver.findElement(By.id('billingAddressLine2')).getAttribute('value');
        const cloneContactCity = await driver.findElement(By.id('billingCity')).getAttribute('value');
        const cloneContactZipCode = await driver.findElement(By.id('billingZipCode')).getAttribute('value');
        const cloneContactState = await driver.findElement(By.id('billingState')).getAttribute('value');
        const cloneContactCountry = await driver.findElement(By.id('billingCountry')).getAttribute('value');
        const cloneContactText = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        const cloneContactTextArea = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        const cloneContactInteger = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        const cloneContactDecimal = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        const cloneContactEmailDetails = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const cloneContactPhoneDetails = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const cloneContactUrl = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        const cloneContactBigInteger = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        const cloneContactPercentage = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        const cloneContactCurrency = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit');
        await saveButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(4000);
        try {
            strictEqual(editContactFirstName,cloneContactFirstName);
            strictEqual(editContactLastName,cloneContactLastName);
            strictEqual(editContactMobile,cloneContactMobile);
            strictEqual(editContactEmail,cloneContactEmail);
            strictEqual(editContactJobTitle,cloneContactJobTitle);
            strictEqual(editContactPhone,cloneContactPhone);
            strictEqual(editContactOtherPhone,cloneContactOtherPhone);
            strictEqual(editContactEmailOptOutReason,cloneContactEmailOptOutReason);
            strictEqual(editContactSkype,cloneContactSkype);
            strictEqual(editContactFacebook,cloneContactFacebook);
            strictEqual(editContactLinkedIn,cloneContactLinkedIn);
            strictEqual(editContactTwitter,cloneContactTwitter);
            strictEqual(editContactInstagram,cloneContactInstagram);
            strictEqual(editContactDescription,cloneContactDescription);
            strictEqual(editContactAddressLine1,cloneContactAddressLine1);
            strictEqual(editContactAddressLine2,cloneContactAddressLine2);
            strictEqual(editContactCity,cloneContactCity);
            strictEqual(editContactZipCode,cloneContactZipCode);
            strictEqual(editContactState,cloneContactState);
            strictEqual(editContactCountry,cloneContactCountry);
            strictEqual(editContactText,cloneContactText);
            strictEqual(editContactTextArea,cloneContactTextArea);
            strictEqual(editContactInteger,cloneContactInteger);
            strictEqual(editContactDecimal,cloneContactDecimal);
            strictEqual(editContactEmailDetails,cloneContactEmailDetails);
            strictEqual(editContactPhoneDetails,cloneContactPhoneDetails);
            strictEqual(editContactUrl,cloneContactUrl);
            strictEqual(editContactBigInteger,cloneContactBigInteger);
            strictEqual(editContactPercentage,cloneContactPercentage);
            strictEqual(editContactCurrency,cloneContactCurrency);
            console.log("As after cloning both edit and clone fields are not equal,so test case has been passed");
        } catch(err) {
            await assert.fail("As after cloning both edit and clone fields are not equal,so test case has been aborted");
        }
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'cloneContact_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
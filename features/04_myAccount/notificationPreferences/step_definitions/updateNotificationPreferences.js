const { Given, When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const config = require('../../../../cucumber_config/cucumber_config');
const driver = config.driver;
const { strictEqual } = require('assert');
const notificationPreferenceElementsObj = require('../common/notificationPreferencesPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/04_myAccount/notificationPreferences/screenshots/';
const commonActionElementsObj = require('../../../00_common/actions/commonActions');
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const openNotificationPreferencesPageObj = require('../common/actions');
const pageNavigationObj = require('../common/actions');

Given('the {string} is on notification preference page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/user/notificationPreferences')) {
        console.log('The notification preferences page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate') {
        /*  As the user is on the Salesmate 02_login page,
         *  then the process to open access key page page will be started from by performing the Salesmate 02_login */

        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on slack preferences page');
        //will open the notification preferences page
        await openNotificationPreferencesPageObj.openNotificationPreferencePage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == '') {
        /*  As the user is not logged in and also not on the Salesmate 02_login page,
         *  then the process to open notification preferences page will be started from by opening the Salesmate 02_login page  */

        //will open the Salesmate 02_login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on notification preferences page');
        //will do Salesmate 02_login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on notification preferences page');
        await openNotificationPreferencesPageObj.openNotificationPreferencePage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the notification preferences page
        await openNotificationPreferencesPageObj.openNotificationPreferencePage(driver,screenshotPath);
    }
});

When('User disable all notification preferences',async function() {
    try {
        await notificationPreferenceElementsObj.enableOrDisableNotificationPreference(['assignContactEmail', 'assignContactMobile', 'assignContactApp', 'assignCompanyEmail', 'assignCompanyMobile', 'assignCompanyApp', 'assignActivityEmail', 'assignActivityMobile', 'assignActivityApp', 'assignDealEmail', 'assignDealMobile', 'assignDealApp', 'addNoteEmail', 'addNoteMobile', 'addNoteApp', 'emailConversationsEmail', 'emailConversationsMobile', 'emailConversationsApp', 'receiveEmailMobile', 'receiveEmailApp', 'trackEmailMobile', 'trackEmailApp', 'userMentionEmail', 'userMentionMobile', 'userMentionApp', 'receiveTextMessageMobile', 'receiveTextMessageApp'],'disable',driver);
        const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButton.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);
        console.log("Disabling all notification preferences test case has been passed");
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'disabledNotification_Case_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        console.log(err)
        await assert.fail("As user is unable to disable all notification preferences,the test case has been aborted");
    }
});

Then('After navigation disabled values should not change',async function() {
    try {
        //get value of 'Contact Assigned' of Email,Mobile and App values before navigation
        const actualContactAssignedEmailValue = await driver.findElement(By.id('assignContactEmail')).getAttribute("value");
        const actualContactAssignedMobileValue = await driver.findElement(By.id('assignContactMobile')).getAttribute("value");
        const actualContactAssignedAppValue = await driver.findElement(By.id('assignContactApp')).getAttribute("value");

        //page navigation and come back to notification preferences page
        await pageNavigationObj.comeBackToNotificationPreferencesPage(driver, screenshotPath);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledNotificationPreferences.png');
        try {
            //get value of 'Contact Assigned' of Email,Mobile and App values after navigation
            const expectedContactAssignedEmailValue = await driver.findElement(By.id('assignContactEmail')).getAttribute("value");
            const expectedContactAssignedMobileValue = await driver.findElement(By.id('assignContactMobile')).getAttribute("value");
            const expectedContactAssignedAppValue = await driver.findElement(By.id('assignContactApp')).getAttribute("value");

            //compare actual and expected values of 06_contact assigned for email,mobile and app
            if (actualContactAssignedEmailValue === expectedContactAssignedEmailValue && actualContactAssignedMobileValue === expectedContactAssignedMobileValue && actualContactAssignedAppValue === expectedContactAssignedAppValue) {
                console.log("As email,mobile and app options for 06_contact assigned remained as disabled after navigation,so test case has been passed...");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledNavigationValues_Failed.png');
                await assert.fail("As after navigation disabled values get changed,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        console.log("As after navigation disabled values should not changed,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('User enable all notification preferences',async function() {
    try {
        await notificationPreferenceElementsObj.enableOrDisableNotificationPreference(['assignContactEmail', 'assignContactMobile', 'assignContactApp', 'assignCompanyEmail', 'assignCompanyMobile', 'assignCompanyApp', 'assignActivityEmail', 'assignActivityMobile', 'assignActivityApp', 'assignDealEmail', 'assignDealMobile', 'assignDealApp', 'addNoteEmail', 'addNoteMobile', 'addNoteApp', 'emailConversationsEmail', 'emailConversationsMobile', 'emailConversationsApp', 'receiveEmailMobile', 'receiveEmailApp', 'trackEmailMobile', 'trackEmailApp', 'userMentionEmail', 'userMentionMobile', 'userMentionApp', 'receiveTextMessageMobile', 'receiveTextMessageApp'], 'enable', driver);
        const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButton.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);
        console.log("Enabling all notification preferences test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('After navigation enabled values should not change',async function() {
    try {
        //get value of 'Contact Assigned' of Email,Mobile and App values before navigation
        const actualContactAssignedEmailValue = await driver.findElement(By.id('assignContactEmail')).getAttribute("value");
        const actualContactAssignedMobileValue = await driver.findElement(By.id('assignContactMobile')).getAttribute("value");
        const actualContactAssignedAppValue = await driver.findElement(By.id('assignContactApp')).getAttribute("value");

        //page navigation and come back to notification preferences page
        await pageNavigationObj.comeBackToNotificationPreferencesPage(driver, screenshotPath);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'EnabledNotificationPreferences.png');
        try {
            //get value of 'Contact Assigned' of Email,Mobile and App values after navigation
            const expectedContactAssignedEmailValue = await driver.findElement(By.id('assignContactEmail')).getAttribute("value");
            const expectedContactAssignedMobileValue = await driver.findElement(By.id('assignContactMobile')).getAttribute("value");
            const expectedContactAssignedAppValue = await driver.findElement(By.id('assignContactApp')).getAttribute("value");

            //compare actual and expected values of 06_contact assigned for email,mobile and app
            if (actualContactAssignedEmailValue === expectedContactAssignedEmailValue && actualContactAssignedMobileValue === expectedContactAssignedMobileValue && actualContactAssignedAppValue === expectedContactAssignedAppValue) {
                console.log("As email,mobile and app options for 06_contact assigned remained as enabled after navigation,so test case has been passed...");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'enabledNavigationValues_Failed.png');
                await assert.fail("As after navigation enabled values get changed,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        console.log("As after navigation enabled values should not changed,so test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Verifying email alert for email received,email opened and text received notifications',async function() {
    try {
        await notificationPreferenceElementsObj.emailAlert(driver);
        await pageNavigationObj.comeBackToNotificationPreferencesPage(driver,screenshotPath);
        //checking email received,email opened and text received values remained as "null" after navigation
        const emailReceived = await driver.findElement(By.xpath("//tbody/tr[7]/td[2]")).getAttribute("value");
        const emailOpened = await driver.findElement(By.xpath("//tbody/tr[8]/td[2]")).getAttribute("value");
        const textReceived = await driver.findElement(By.xpath("//tbody/tr[10]/td[2]")).getAttribute("value");
        if(emailReceived === null && emailOpened === null && textReceived === null) {
            console.log("As after navigation email alert is not available for email received,email opened and text received,so test case has been passed");
            await screenshotObj.takeScreenshot(driver,screenshotPath+'emailAlertUnavailable.png');
        } else {
            await assert.fail("As after navigation email alert option is visible for email received,email opened and text received,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
       await assert.fail(err);
    }
    console.log("Verified email alert for email received,email opened and text received notifications test case has been passed");
});

When('Enabling daily digest email reminder',async function() {
    try {
        await notificationPreferenceElementsObj.enableDailyDigestEmail(['dailyDigest'], 'enable', driver);
        const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButton.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);

        //get value of daily digest email before navigation
        const actualDailyDigestEmailValue = await driver.findElement(By.id('dailyDigest')).getAttribute("value");
        await driver.sleep(500);

        //page navigation and come back to notification preferences page
        await pageNavigationObj.comeBackToNotificationPreferencesPage(driver, screenshotPath);
        ////await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'EnabledDailyDigestEmail.png');
        await driver.sleep(1000);
        //get value of daily digest email after navigation
        const expectedDailyDigestEmailValue = await driver.findElement(By.id('dailyDigest')).getAttribute("value");
        try {
            if (actualDailyDigestEmailValue === expectedDailyDigestEmailValue) {
                console.log("As daily digest remainder is enabled after navigation...");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'dailyDigestEmail_Case_Failed.png');
                await assert.fail("As user unable to enable daily digest remainder,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        console.log("Enabling daily digest email remainder test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Setting daily digest email delivery time {string}',async function(emailDeliveryTime) {
    try {
        const dailyDigestEmailValue = await driver.findElement(By.id('dailyDigest')).getAttribute('value');
        if (dailyDigestEmailValue === true) {
            await notificationPreferenceElementsObj.setDailyDigestDeliveryTime(driver, emailDeliveryTime);
            const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
            await updateButton.click();
            await driver.sleep(1000);
            await notificationPreferenceElementsObj.notificationUpdateMessage(driver);

            //page navigation and come back to notification preferences page
            await pageNavigationObj.comeBackToNotificationPreferencesPage(driver, screenshotPath);
            //await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
            await driver.sleep(2000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'setDailyDigestEmailTime4pm.png');
        } else {
            await notificationPreferenceElementsObj.enableDailyDigestEmail(['dailyDigest'], 'enable', driver);
            await notificationPreferenceElementsObj.setDailyDigestDeliveryTime(driver, emailDeliveryTime);
            const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
            await updateButton.click();
            await driver.sleep(1000);
            await notificationPreferenceElementsObj.notificationUpdateMessage(driver);

            //page navigation and come back to notification preferences page
            await pageNavigationObj.comeBackToNotificationPreferencesPage(driver, screenshotPath);
            //await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
            await driver.sleep(1000);
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'setDailyDigestEmailTime4pm.png');
        }
        try {
            const dailyDigestTimeFieldValue = await driver.findElement(By.xpath('//span[@class="select2-selection__rendered"]')).getText();
            if (dailyDigestTimeFieldValue === emailDeliveryTime) {
                console.log("Daily digest email delivery time is remained as " + dailyDigestTimeFieldValue + "after navigation");
            } else {
                await assert.fail("Daily digest email delivery time is not remained as " + emailDeliveryTime + ",so test case has been failed...");
            }
        } catch (err) {
            await assert.fail(err);
        }
        console.log("Setting daily digest email remainder delivery time as " + emailDeliveryTime + " successfully done...");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Disabling daily digest email remainder',async function() {
    try {
        await notificationPreferenceElementsObj.enableDailyDigestEmail(['dailyDigest'], 'disable', driver);
        const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButton.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);

        //get value of daily digest email before navigation
        const actualDailyDigestEmailValue = await driver.findElement(By.id('dailyDigest')).getAttribute("value");

        //page navigation and come back to notification preferences page
        await pageNavigationObj.comeBackToNotificationPreferencesPage(driver, screenshotPath);
        //await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(500);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'DisabledDailyDigestEmail.png');
        //get value of daily digest email after navigation
        const expectedDailyDigestEmailValue = await driver.findElement(By.id('dailyDigest')).getAttribute("value");
        try {
            if (actualDailyDigestEmailValue === expectedDailyDigestEmailValue) {
                console.log("As after navigation daily digest remainder is disabled,so test case has been passed");
            } else {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'disabledDailyDigestEmail_Case_Failed.png');
                await assert.fail("As daily digest email has not been disabled,test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
        console.log("Disabled daily digest email remainder test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('Re-enabling digest email reminder and daily digest email delivery time is get maintained and check {string}',async function(value) {
    try {
        await notificationPreferenceElementsObj.enableDailyDigestEmail(['dailyDigest'], 'enable',driver);
        await notificationPreferenceElementsObj.setDailyDigestDeliveryTime(driver,value);
        const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButton.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);
        await notificationPreferenceElementsObj.enableDailyDigestEmail(['dailyDigest'],'disable',driver);
        const updateButtonElement = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButtonElement.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);
        await notificationPreferenceElementsObj.enableDailyDigestEmail(['dailyDigest'], 'enable',driver);
        const updateButtonWebElement = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButtonWebElement.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);

        //page navigation and come back to notification preferences page
        await pageNavigationObj.comeBackToNotificationPreferencesPage(driver,screenshotPath);
        //await driver.executeScript("return $('.wrapper-lg').animate({ scrollTop: 3000 }, 0);");
        await driver.sleep(1000);
        const timeFieldValue = await driver.findElement(By.xpath("//span[@class='select2-selection__rendered']")).getText();
        strictEqual(timeFieldValue,value);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'re-enabledDailyDigestEmail_Case_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail("As user unable to re-enable daily digest email,test case has been aborted");
    }
    console.log("Re-enabled daily digest email remainder is get maintained test case has been passed");
});

When('Verifying notification preferences through {string}, {string}',async function(adminUser,user) {
    try {
        //get values of notification preferences of user1 before navigation of other browser
        const actualContactAssignedEmailValue = await driver.findElement(By.id('assignContactEmail')).getAttribute('value');
        const actualCompanyAssignedEmailValue = await driver.findElement(By.id('assignCompanyEmail')).getAttribute('value');
        const actualActivityAssignedEmailValue = await driver.findElement(By.id('assignActivityEmail')).getAttribute('value');
        const actualDealAssignedEmailValue = await driver.findElement(By.id('assignDealEmail')).getAttribute('value');
        const actualNoteAddedEmailValue = await driver.findElement(By.id('addNoteEmail')).getAttribute('value');
        const actualEmailConversationsEmailValue = await driver.findElement(By.id('emailConversationsEmail')).getAttribute('value');

        //verify through 'User2'
        await commonActionElementsObj.clickOnSignOut();
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, user, 'the {string} is on notification preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        const notificationPreferenceTab = await notificationPreferenceElementsObj.clickOnNotificationPreference(driver);
        await notificationPreferenceTab.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.enableOrDisableNotificationPreference(['assignContactEmail', 'assignContactMobile', 'assignContactApp', 'assignCompanyEmail', 'assignCompanyMobile', 'assignCompanyApp'], 'disable', driver);
        const updateButton = await notificationPreferenceElementsObj.updateButton(driver);
        await updateButton.click();
        await driver.sleep(1000);
        await notificationPreferenceElementsObj.notificationUpdateMessage(driver);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'User2NotificationPage.png');
        const user2AssignContactEmail = await driver.findElement(By.id('assignContactEmail')).getAttribute("value");
        await commonActionElementsObj.clickOnSignOut();
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on notification preference page');
        await driver.sleep(1000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver, screenshotPath);
        const notificationPreferenceElement = await notificationPreferenceElementsObj.clickOnNotificationPreference(driver);
        await notificationPreferenceElement.click();
        await driver.sleep(1000);
        const user1AssignContactEmail = await driver.findElement(By.id('assignContactEmail')).getAttribute("value");
        if (user2AssignContactEmail !== user1AssignContactEmail) {
            console.log("There is no impact for other user,so test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'user2NotificationPage_Failed.png');
            await assert.fail("As user2 notification preference page is not updated,test case has been failed...");
        }
        try {

            //get values of notification preferences of user1 after navigation from other browser
            const expectedContactAssignedEmailValue = await driver.findElement(By.id('assignContactEmail')).getAttribute('value');
            const expectedCompanyAssignedEmailValue = await driver.findElement(By.id('assignCompanyEmail')).getAttribute('value');
            const expectedActivityAssignedEmailValue = await driver.findElement(By.id('assignActivityEmail')).getAttribute('value');
            const expectedDealAssignedEmailValue = await driver.findElement(By.id('assignDealEmail')).getAttribute('value');
            const expectedNoteAddedEmailValue = await driver.findElement(By.id('addNoteEmail')).getAttribute('value');
            const expectedEmailConversationsEmailValue = await driver.findElement(By.id('emailConversationsEmail')).getAttribute('value');

            //comparing both actual and expected values of notification preferences as to verify that both remains same after performing some operation in other browser
            strictEqual(actualContactAssignedEmailValue, expectedContactAssignedEmailValue);
            strictEqual(actualCompanyAssignedEmailValue, expectedCompanyAssignedEmailValue);
            strictEqual(actualActivityAssignedEmailValue, expectedActivityAssignedEmailValue);
            strictEqual(actualDealAssignedEmailValue, expectedDealAssignedEmailValue);
            strictEqual(actualNoteAddedEmailValue, expectedNoteAddedEmailValue);
            strictEqual(actualEmailConversationsEmailValue, expectedEmailConversationsEmailValue);
        } catch (err) {
            await driver.navigate().refresh();
            await assert.fail(err);
        }
        console.log("Verified notification preferences with user2 test case has been passed");
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
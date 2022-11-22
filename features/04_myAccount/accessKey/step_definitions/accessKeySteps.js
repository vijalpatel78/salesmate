const { Given, When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const config = require('../../../../cucumber_config/cucumber_config');
const driver = config.driver;
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/04_myAccount/accessKey/screenshots/';
const openSalesmateLoginPageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const openAccessKeyPageObj = require('../common/actions');

Given('the {string} is on access key page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/user/accesskey')) {
        console.log('The access key page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate') {
        /*  As the user is on the Salesmate login page,
         *  then the process to open access key page page will be started from by performing the Salesmate login */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on access key page');
        //will open access key page
        await openAccessKeyPageObj.openAccessKeyPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == '') {
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open access key page will be started from by opening the Salesmate login page  */

        //will open the Salesmate login page
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on access key page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on access key page');
        //will open access key page
        await openAccessKeyPageObj.openAccessKeyPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the access key page
        await openAccessKeyPageObj.openAccessKeyPage(driver,screenshotPath);
    }
});

//--------------------------Case 1: User able to copy access key,secret key and session key-----------------------------

When('User able to copy access key,secret key and session key',async function() {
    try {
        await driver.findElement(By.id('authAccessKey')).click();
        const accessKey = await driver.findElement(By.id('authAccessKey')).getAttribute('value');
        console.log("pasted value of access key is:" + accessKey);
        await driver.sleep(1000);
        await driver.findElement(By.id('authPrivateKey')).click();
        const privateKey = await driver.findElement(By.id('authPrivateKey')).getAttribute('value');
        console.log("pasted value of private key is:" + privateKey);
        await driver.sleep(1000);
        await driver.findElement(By.id('userAccessToken')).click();
        const sessionKey = await driver.findElement(By.id('userAccessToken')).getAttribute('value');
        console.log("pasted value of session key is:" + sessionKey);
        console.log("User able to copy access key,secret key and session key successfully done...");
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'accessKey_NotCopied.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------------------Case 2: User able to regenerate session key------------------------------------------

When('User able to regenerate session key',async function() {
    try {
        const sessionKeyValue = await driver.findElement(By.id('userAccessToken')).getAttribute('value');
        console.log("Value of session key is:" + sessionKeyValue);
        await driver.findElement(By.xpath("//a[text()=' click here ']")).click();
        await driver.sleep(2000);
        const cancelBtn = await driver.findElement(By.xpath("//button[text()='Cancel']"));
        await cancelBtn.click();
        const sessionKeyOldValue = await driver.findElement(By.id('userAccessToken')).getAttribute('value');
        console.log("Unchanged value of session key is:" + sessionKeyOldValue);
        if(sessionKeyValue === sessionKeyOldValue) {
            console.log("Both old and new session keys are same so test case has been passed...");
        } else{
            await assert.fail("Both old and new session keys are different so test case has been aborted");
        }
        await driver.sleep(2000);
        await driver.findElement(By.xpath("//a[text()=' click here ']")).click();
        await driver.sleep(2000);
        const okBtn = await driver.findElement(By.xpath("//button[text()='Ok']"));
        await okBtn.click();
        await driver.sleep(1000);
        const notifyMessageElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(notifyMessageElement));
        const notifyMessage = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(notifyMessage, 'New key has been generated.');
        await driver.sleep(3000);
        let sessionKeyNewValue = await driver.findElement(By.id('userAccessToken')).getAttribute('value');
        console.log("Newly changed value of session key is:" + sessionKeyNewValue);
        if(sessionKeyOldValue !== sessionKeyNewValue) {
            console.log("Both old and new session keys are different so test case has been passed...");
        } else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'accessKeyRegeneration_Failed.png');
            await assert.fail("Both old and new session keys are same so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'accessKey_NotGenerated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------------Case 3: User able to open api docs link in other tab-------------------------------------

When('User able to open api docs link in other tab',async function() {
    let winHandleBefore;
    try {
        winHandleBefore = await driver.getWindowHandle();
        await driver.findElement(By.xpath("//a[text()='API docs']")).click();
        await driver.sleep(15000);
        const lastTab = await driver.getAllWindowHandles();
        const closeLastTab = lastTab[lastTab.length - 1];
        await driver.switchTo().window(closeLastTab);
        const currentURL = await driver.getCurrentUrl();
        console.log("current api docs url is:" +currentURL);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'apiDocsLinkPage.png');
        if(currentURL === 'https://apidocs.salesmate.io/') {
            console.log("As current url and expected url are same test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'apiDocsLinkPage_NotFound.png')
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("Due to unmatched URLs,test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'apiDocs_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    finally {
        await driver.close();
        await driver.switchTo().window(winHandleBefore);
        await driver.sleep(2000);
    }
});

//-------------------Case 4: Verify access key,private key,session key fields are readonly or not-----------------------

When('Verify access key,private key,session key fields are readonly or not',async function() {
    try {
        const checkAccessKeyValue = !!await driver.findElement(By.id('authAccessKey')).getAttribute('readonly');
        console.log("Is Access Key value readonly:" + checkAccessKeyValue);
        const checkPrivateKeyValue = !!await driver.findElement(By.id('authPrivateKey')).getAttribute('readonly');
        console.log("Is Private Key value readonly:" + checkPrivateKeyValue);
        const checkSessionKeyValue = !!await driver.findElement(By.id('userAccessToken')).getAttribute('readonly');
        console.log("Is Session Key value readonly:" + checkSessionKeyValue);
        if (checkAccessKeyValue === true || checkPrivateKeyValue === true || checkSessionKeyValue === true) {
            console.log("Due to access key,private key and session key are read-only,the test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'readOnlyAttribute_Case_Failed.png');
            await assert.fail("Due to access key,private key and session key are not read-only,the test case has been failed...");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'accessKey_NotGenerated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------------------Case 5: Verifying access key feature through another user--------------------------------

When('Verifying access key feature through {string}, {string}',async function(adminUser,user) {
    // will verify through user2
    try {
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on access key page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on access key page');
        await driver.sleep(3000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver,screenshotPath);
        const accessKeyTab = await driver.findElement(By.xpath("//a[text()='Access Key']"));
        await accessKeyTab.click();
        await driver.sleep(1500);
        console.log("Below is session key of user2:");
        await driver.findElement(By.id('userAccessToken')).click();
        const user2SessionKey = await driver.findElement(By.id('userAccessToken')).getAttribute('value');
        console.log("pasted value of session key is:" + user2SessionKey);
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'User2AccessKeyPage.png');
        await openSalesmateLoginPageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on access key page');
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUser,'the {string} is on access key page');
        await driver.sleep(3000);
        await openSalesmateLoginPageObj.openMyAccountPage(driver,screenshotPath);
        const accessKeyTabElement = await driver.findElement(By.xpath("//a[text()='Access Key']"));
        await accessKeyTabElement.click();
        await driver.sleep(1500);
        console.log("------------------------------------------------------------");
        console.log("Below is session key of user1:");
        await driver.findElement(By.id('userAccessToken')).click();
        const user1SessionKey = await driver.findElement(By.id('userAccessToken')).getAttribute('value');
        console.log("pasted value of session key is:" + user1SessionKey);
        await driver.sleep(2000);
        if (user1SessionKey !== user2SessionKey) {
            console.log("As session key of user1 and user2 are different,so test case has been passed...");
        } else {
            await assert.fail("As session key of user1 and user2 are same,so test case has been aborted...");
        }
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'ReverifiedUser1AccessKeyPage.png');
        console.log("Verified access key feature through user2 successfully done...");
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'user2Verification_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
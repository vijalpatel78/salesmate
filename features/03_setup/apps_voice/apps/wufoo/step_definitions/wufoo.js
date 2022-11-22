const {Given,When,Then} = require('@cucumber/cucumber');
const assert = require('assert');
const appsPageElementObj = require('../../common/appsPageElements');
const wufooPageElementObj = require('../common/wufooPageElements');
const userPageElementObj = require('../../../../users_security/users/common/usersPageElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const commonActionObj = require('../../common/actions');
const userPageActionObj = require('../../../../users_security/users/common/actions')
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/wufoo/screenshots/';
let webhookUrlVal,webhookHandshakeKeyVal, activeUsers = [];

Given('the Wufoo app is uninstalled', async () =>{
    //will uninstall the Wufoo app
    await commonActionObj.uninstallApp(driver,screenshotPath,'Wufoo Integration');
});

Given('the Wufoo app is installed', async () =>{
    //will install the Wufoo app
    await commonActionObj.installApp(driver,'Wufoo Integration');
});

Given('the user is on the Setup>Users page and verified the active user list', async () =>{
    //will open the Users page
    await userPageActionObj.openUsersPage(driver,screenshotPath);
    //will get the active user list
    const users = await userPageElementObj.findEmailsOnListPage(driver,screenshotPath);
    for(let i=1; i<users.length; i++){
        activeUsers.push(await users[i].getText());
    }
    console.log('Active Users: '+ activeUsers);
});

When('the user clicks on the Install button of Wufoo app', async () =>{
    //will install the Wufoo app
    await commonActionObj.installApp(driver,'Wufoo Integration');
});

When('the user goes on the Setup>Apps page', async () =>{
    //will open the Apps page
    await commonActionObj.openAppsPage(driver,screenshotPath);
});

When('the user clicks on the Configure button of Wufoo app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Wufoo Integration');
});

When('click on the webhook url and webhook handshake key', async () =>{
    //will find and click on the webhook url
    const webhookUrl = await wufooPageElementObj.findWebhookURLElem(driver,screenshotPath);
    await driver.executeScript("arguments[0].click()",webhookUrl);
    webhookUrlVal = await webhookUrl.getText();
    console.log('Webhook URL: '+webhookUrlVal);
    //will find and click on the webhook handshake key
    const webhookHandshakeKey = await wufooPageElementObj.findWebhookHandshakeKeyElem(driver,screenshotPath);
    await driver.executeScript("arguments[0].click()",webhookHandshakeKey);
    webhookHandshakeKeyVal = await webhookHandshakeKey.getText();
    console.log('Webhook Handshake Key: '+webhookHandshakeKeyVal);
}); 

When('click on the sign-up for one now at wufoo.com link', async () =>{
    //will find and click on the link
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'sign-up for one now at wufoo.com');
    await link.click();
    await driver.sleep(1000);
});

Then('the Wufoo app should get installed', async () =>{
    //will check the app is get installed or not
    try{
        await appsPageElementObj.findAppRemoveBtn(driver,screenshotPath);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WufooApp_Not_Installed.png');
        assert.fail('The Wufoo app is not getting installed. Screenshot Name: \''+screenshotPath+'WufooApp_Not_Installed.png\'.');
    }

    console.log('The Wufoo app has been installed successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Wufoo app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'Wufoo Integration');
    if(installBtn.length > 0){
        console.log('The Wufoo app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WufooApp_Not_Uninstalled.png');
        assert.fail('The Wufoo app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'WufooApp_Not_Uninstalled.png\'.');
    }
});

Then('the webhook url and webhook handshake key should get copied', async () =>{
    //will the webhook url and webhook handshake key is get copied or not
    if(webhookUrlVal != null && webhookHandshakeKeyVal != null){
        console.log('The webhook url and webhook handshake key has been copied...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'URLAndKey_Not_GetCopied.png');
        assert.fail('The webhook url and webhook handshake key is not get copied. Screenshot Name: \''+screenshotPath+'URLAndKey_Not_GetCopied.png\'.');
    }
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);  
});

Then('the system should redirect to the Wufoo page', async () =>{
    //will get the current tab id
    const currentTab = await driver.getWindowHandle();
    //will get all tab id
    const numberOfTabs = await driver.getAllWindowHandles();

    //will move on the Wufoo page
    const wufooTab = numberOfTabs[numberOfTabs.length - 1];
    await driver.switchTo().window(wufooTab);
    await driver.sleep(2000);
    //will get the Wufoo page URL
    const currentURL = await driver.getCurrentUrl();
    console.log("The current Wufoo page url is: "+currentURL);
    
    //will check the Wufoo page URL is correct or not
    if(currentURL === 'https://www.wufoo.com/'){
        console.log("The system is redirected to the Wufoo page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WufooPage_NotFound.png');
        //will close the Wufoo page
        await driver.close();
        //will move back to the app page
        await driver.switchTo().window(currentTab);
        await driver.sleep(1000);
        await assert.fail('Due to the Wufoo page is not opened, the test case has been failed. Expected URL: \'https://www.wufoo.com/\' Screenshot Name: \''+screenshotPath+'WufooPage_NotFound.png\'.');
    }

    //will close the Wufoo page
    await driver.close();
    //will move back to the app page
    await driver.switchTo().window(currentTab);
    await driver.sleep(1000);
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should display active user list on the Wufoo integration page', async () =>{
    let isUsersFound = 0, users = [];

    //will get the user list from the wufoo page
    const usersList = await wufooPageElementObj.findUserEmailsOnWufooPage(driver);
    for(let i=0; i<usersList.length; i++){
        users.push(await usersList[i].getText());
    }
    
    //will compare the user list against the active user list
    for(let j=0; j<usersList.length; j++){
        if(users.includes(activeUsers[j])){
            isUsersFound++
        }
    }

    //will compare the number of found user and number of expected active user
    try{
        assert.strictEqual(isUsersFound,activeUsers.length);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AllActiveUsers_NotDisplayed_OnWufooPage.png'); 
        assert.fail('Due to the all active users are not displayed on the wufoo page, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'AllActiveUsers_NotDisplayed_OnWufooPage.png\'.');
    }

    console.log('All active users are displayed on the wufoo page...'); 
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);  
});
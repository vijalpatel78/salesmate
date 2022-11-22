const {Given,When,Then} = require('@cucumber/cucumber');
const {until} = require('selenium-webdriver');
const assert = require('assert');
const appsPageElementObj = require('../../common/appsPageElements');
const quickBooksPageElementObj = require('../common/quickBooksPageElements');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const commonActionObj = require('../../common/actions');
const readUserDetailsObj = require('../../../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/quickBooks/screenshots/';
let activeUsers=[];

Given('the QuickBooks app is uninstalled', async () =>{
    //will uninstall the QuickBooks app
    const isUninstalled = await commonActionObj.uninstallApp(driver,screenshotPath,'QuickBooks');
    //will check the app is already uninstalled or not
    if(isUninstalled == false){
        await driver.sleep(1000);
        //will find and click on the 'Yes' button
        const yesBtn = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await yesBtn.click();
        await driver.sleep(1000);
    }
});

Given('the QuickBooks app is installed', async () =>{
    //will install the QuickBooks app
    await commonActionObj.installApp(driver,'QuickBooks');
});

When('the user clicks on the Install button of QuickBooks app', async () =>{
    //will install the QuickBooks app
    await commonActionObj.installApp(driver,'QuickBooks'); 
    await driver.sleep(2000);
});

When('the user clicks on the Configure button of QuickBooks app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'QuickBooks');
});

When('click on the {string} QuickBooks option', async (option) =>{
    let optionElem
    //will find and click on the provided option
    if(option.toLowerCase() == 'everyone'){
        optionElem = await quickBooksPageElementObj.findOption(driver,screenshotPath,'accessSettingField_everyone');
        await optionElem.click();
    }else if(option.toLowerCase() == 'selected users'){
        optionElem = await quickBooksPageElementObj.findOption(driver,screenshotPath,'accessSettingField_selectedUsers');
        await optionElem.click();

        //will get the full name of the active users from the xlsx file 
        const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.isActive[i].toLowerCase() == 'yes'){
                activeUsers.push(userDetails.fullName[i]);
            }
        }
        //will check the two active users found or not
        if(activeUsers.length < 2 ){
            assert.fail('To execute this test case, it is required to have two active users in the excel file. Found Total Active Users ---> '+activeUsers.length+'.');
        }

        //will find the autocomplete input box
        const autocompleteInputbox = await quickBooksPageElementObj.findAutocompleteInputbox(driver,screenshotPath);
        //will travel all active users
        for(let i=0; i<2; i++){
            //will enter the active user name in the autocomplete input box
            await autocompleteInputbox.sendKeys(activeUsers[i].trim());
            await driver.sleep(2000);
            //will check the matching search results found or not
            const autocompleteSearchResult = await quickBooksPageElementObj.findAutocompleteSearchResult(driver);
            if(autocompleteSearchResult.length != 0){
                //will click on the first search result
                await autocompleteSearchResult[0].click();
                await driver.sleep(1000);
            }else{
                await screenshotObj.takeScreenshot(driver,screenshotPath+activeUsers[i].replace(/\s/g,'_')+'_User_NotFound.png');
                await assert.fail('Due to the \"'+activeUsers[i]+'\" user from the \"Selected Users\" is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+activeUsers[i].replace(/\s/g,'_')+'_User_NotFound.png\'.');
            }
        }
    }else{
        assert.fail('The provided \''+option+'\' option is not valid. The option should be either \'Everyone\' or \'Selected Users\'.');
    }
    await driver.sleep(1000);
});

When('authorize the QuickBooks app with {string} and {string} credentials', async (email,password) =>{
    //will find and click on the Authorize button
    const authorizeBtn = await quickBooksPageElementObj.findAuthorizeButton(driver,screenshotPath);
    await authorizeBtn.click();
    await driver.sleep(1000);

    //will get the id of currently focused window
    const salesmateWindow = await driver.getWindowHandle();
    //will get the id of all opened windows
    const allOpenedWindows = await driver.getAllWindowHandles();

    //will verify whether the QuickBooks authentication page found or not
    if(allOpenedWindows.length>1){
        for(index=0; index<allOpenedWindows.length; index++){
            if(allOpenedWindows[index] != salesmateWindow){
                //will set focus on the QuickBooks authentication page
                const quickBooksLoginWindow = allOpenedWindows[index];
                await driver.switchTo().window(quickBooksLoginWindow);

                try{
                    //will find the 'Email' field and then pass the data
                    const quickBooksEmailField = await formElementsObj.findElementById(driver,screenshotPath,'ius-userid','ius_userid');
                    await quickBooksEmailField.clear();
                    await quickBooksEmailField.sendKeys(email);
                    //will find the 'Password' field and then pass the data
                    const quickBooksPasswordField = await formElementsObj.findElementById(driver,screenshotPath,'ius-password','ius_password');
                    await quickBooksPasswordField.clear();
                    await quickBooksPasswordField.sendKeys(password);
                    //will find the 'Sign In' button
                    const quickBooksSignInBtn = await formElementsObj.findElementById(driver,screenshotPath,'ius-sign-in-submit-btn','ius_submitButton');
                    await quickBooksSignInBtn.click();
                    await driver.wait(until.stalenessOf(quickBooksSignInBtn));
                }catch(err){
                    await screenshotObj.takeScreenshot(driver,screenshotPath+'ErrorWhileQuickBooksLogin.png');
                    await driver.close();
                    await driver.switchTo().window(salesmateWindow);
                    await driver.navigate().refresh();
                    await assert.fail(err+' Screenshot Name: '+screenshotPath+'ErrorWhileQuickBooksLogin.png');
                }
                
                //will set focus back to the Salesmate page
                await driver.switchTo().window(salesmateWindow);
                try{
                    await driver.wait(until.stalenessOf(authorizeBtn),60000,'Failed to authorize QuickBooks');
                }catch(err){
                    await screenshotObj.takeScreenshot(driver,screenshotPath+'ErrorWhileAuthentication.png');
                    await assert.fail('There is an error while authentication. Error: '+err+' Screenshot Name: '+screenshotPath+'ErrorWhileAuthentication.png');
                }
            }               
        }
    }else{
        console.log('Number of opened windows ---> ',allOpenedWindows.length);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'QuickBooksLoginPage_NotFound.png');
        await assert.fail('Due to the QuickBooks authentication page is not found, the test case has been failed. Screenshot Name: '+screenshotPath+'QuickBooksLoginPage_NotFound.png');
    }
});

Then('the QuickBooks app should get installed', async () =>{
    //will check the app is get installed or not
    try{
        await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','updateButton');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'QuickBooksApp_Not_Installed.png');
        assert.fail('The QuickBooks app is not getting installed. Screenshot Name: \''+screenshotPath+'QuickBooksApp_Not_Installed.png\'.');
    }

    console.log('The QuickBooks app has been installed successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the QuickBooks settings should get updated with {string} option', async (option) =>{
    //will find notification message 
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Settings updated successfully');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after performing operations, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }

    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'QuickBooks');
    await driver.sleep(2000);

    //will find the provided option
    if(option.toLowerCase() == 'everyone'){
        //will check the setting is get updated with the everyone option or not
        const actualValue = await driver.executeScript("return $('input#accessSettingField_everyone').prop('checked');");
        try{
            assert.strictEqual(actualValue.toString(),'true');
        }catch{
            await screenshotObj.takeScreenshot(driver,screenshotPath+'QuickBookAppSettings_NotUpdated_WithEveryone.png');
            assert.fail('The QuickBook app settings is not updated with everyone. Screenshot Name: \''+screenshotPath+'QuickBookAppSettings_NotUpdated_WithEveryone.png\'.');
        }
    }else if(option.toLowerCase() == 'selected users'){
        //will check the setting is get updated with the selected users option or not
        const actualValue = await driver.executeScript("return $('input#accessSettingField_selectedUsers').prop('checked');");
        try{
            assert.strictEqual(actualValue.toString(),'true');
        }catch{
            await screenshotObj.takeScreenshot(driver,screenshotPath+'QuickBookAppSettings_NotUpdated_WithSelectedUser.png');
            assert.fail('The QuickBook app settings is not updated with selected user. Screenshot Name: \''+screenshotPath+'QuickBookAppSettings_NotUpdated_WithSelectedUser.png\'.');
        }
        //will check the setting is get updated with the provided users or not
        const teammatesTags = await quickBooksPageElementObj.findAutocompleteTags(driver);
        for(let i=0; i<2; i++){
            const actualTeammates = await teammatesTags[i].getText();
            try{
                assert(activeUsers.includes(actualTeammates));
            }catch(err){
                await screenshotObj.takeScreenshot(driver,screenshotPath+'QuickBookAppSettings_NotUpdated_With_'+actualTeammates.replace(/\s/g,'_')+'.png');
                assert.fail('The QuickBook app settings is not updated with '+actualTeammates+'. Screenshot Name: \''+screenshotPath+'QuickBookAppSettings_NotUpdated_With_'+actualTeammates.replace(/\s/g,'_')+'.png\'.');
            }
        }
    }

    console.log('The QuickBook app setting is get updated with \''+option+'\' option...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the support page of QuickBooks app', async () =>{
    //will get the current tab id
    const currentTab = await driver.getWindowHandle();
    //will get all tab id
    const numberOfTabs = await driver.getAllWindowHandles();

    //will move on the support page
    const supportTab = numberOfTabs[numberOfTabs.length - 1];
    await driver.switchTo().window(supportTab);
    //will get the support page URL
    const currentURL = await driver.getCurrentUrl();
    console.log("The current support page url is: "+currentURL);
    
    //will check the support page URL is correct or not
    if(currentURL === 'https://support.salesmate.io/hc/en-us/articles/360033395752'){
        console.log("The system is redirected to the support page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SupportPage_NotFound.png');
        //will close the support page
        await driver.close();
        //will move back to the app page
        await driver.switchTo().window(currentTab);
        await driver.sleep(1000);
        await assert.fail('Due to the support page is not opened, the test case has been failed. Expected URL: \'https://support.salesmate.io/hc/en-us/articles/360033395752\' Screenshot Name: \''+screenshotPath+'SupportPage_NotFound.png\'.');
    }

    //will close the support page
    await driver.close();
    //will move back to the app page
    await driver.switchTo().window(currentTab);
    await driver.sleep(1000);
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the QuickBooks app should get uninstalled', async () =>{
    await driver.sleep(1000);
    //will find and click on the Yes button
    const yesBtn = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesBtn.click();
    await driver.sleep(1000);

    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'QuickBooks');
    if(installBtn.length > 0){
        console.log('The QuickBooks app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'QuickBooksApp_Not_Uninstalled.png');
        assert.fail('The QuickBooks app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'QuickBooksApp_Not_Uninstalled.png\'.');
    }
});
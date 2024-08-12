const {until} = require('selenium-webdriver');
const assert = require('assert');
const openAnotherBrowserObj = require('../../../00_common/actions/browserActions/openAnotherBrowser');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../00_common/actions/readExcelData');
const emailPreferencesPageElementObj = require('./emailPreferencesPageElements');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const formElementObj = require('../../../00_common/webElements/formElements');
const commonActionObj = require('../../../00_common/actions/commonActions');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const appsPageElementsObj = require('../../../03_setup/apps_voice/apps/common/appsPageElements');
let adminUserNumber;

//will enable or disable the email tracking option of the 'Email Open & Click Tracking' app through Admin 02_login
async function configureEmailTrackingAppOptions(driver,screenshotPath,stepDetails,appDisplayName,newStateOfEmailTrackingOption){
    let newDriver

    //will get the Admin user details from the xlsx file 
    const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
    for(let i=0; i<userDetails.user.length; i++){
        if(userDetails.profile[i].toLowerCase() == 'admin'){
            adminUserNumber = userDetails.user[i]
        }
    }
    
    //will check whether the Admin user found or not from the excel file
    if(adminUserNumber == ''){
        await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'');
    }

    //will open another browser
    newDriver = await openAnotherBrowserObj.openAnotherBrowser(driver);
    try{
        //will open the Salesmate 02_login page on that browser
        await openSalesmatePageObj.openSalesmateLoginPage(newDriver,screenshotPath,stepDetails);
        //will do Salesmate 02_login with Admin user's credentials on that browser
        await performSalesmateLoginObj.performSalesmateLogin(newDriver,screenshotPath,adminUserNumber,stepDetails);  

        //will open the 03_setup page on that browser
        await openSalesmatePageObj.openSetupPage(newDriver,screenshotPath);
        //will find the 'Apps' button and click on it 
        const appsBtn = await commonElementObj.findSetupSubmenuBtn(newDriver,screenshotPath,'Apps');
        await newDriver.executeScript("arguments[0].scrollIntoView();",appsBtn[0]);
        await newDriver.wait(until.elementIsVisible(appsBtn[0]));
        await appsBtn[0].click();
        await newDriver.sleep(1000);
        //will open the configuration page of 'Email Open & Click Tracking' app
        const emailTrackingAppConfigurationLink = await appsPageElementsObj.findAppConfigurationLink(newDriver,screenshotPath,appDisplayName);
        await newDriver.executeScript("arguments[0].scrollIntoView();",emailTrackingAppConfigurationLink);
        await emailTrackingAppConfigurationLink.click();
        await newDriver.sleep(1000);
        
        //will enable or disable the email tracking option
        const emailTrackOption = await appsPageElementsObj.findEmailTrackingAppOption(newDriver,screenshotPath,'trackEmail');
        const currentStateOfEmailTrackOption = await emailTrackOption.getAttribute('value');
        if(newStateOfEmailTrackingOption.toLowerCase() == 'disabled' && currentStateOfEmailTrackOption == 'true'){
            await newDriver.executeScript("arguments[0].click();",emailTrackOption);
        }else if(newStateOfEmailTrackingOption.toLowerCase() == 'enabled' && currentStateOfEmailTrackOption == 'false'){
            await newDriver.executeScript("arguments[0].click();",emailTrackOption);
        }else{
            console.log('The \'Do you want to track your email?\' option is already '+newStateOfEmailTrackingOption+'...');
        }
    }catch(err){
        await newDriver.quit();
        assert.fail(err);
    }

    //will close the lastly opened browser
    await newDriver.sleep(2000);
    await newDriver.quit();
}exports.configureEmailTrackingAppOptions=configureEmailTrackingAppOptions;

//will navigate on the security page and then come back to the email preferences page
async function comeBackToEmailPreferencesPage(driver,screenshotPath){
    await commonActionObj.clickOnSecurity();
    const emailSettingsTab = await emailPreferencesPageElementObj.findEmailSettingsTab(driver,screenshotPath);
    await emailSettingsTab.click();
    await driver.sleep(1000);
    const emailPreferencesTab = await emailPreferencesPageElementObj.findEmailPreferencesTab(driver,screenshotPath);
    await emailPreferencesTab.click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/user/emailSettings/preferences'),10000);
}exports.comeBackToEmailPreferencesPage=comeBackToEmailPreferencesPage;

async function openEmailPreferencesPage(driver,screenshotPath){
    //will open the my account page
    await openSalesmatePageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'email settings' tab and then click on that
    const emailSettingsTab = await emailPreferencesPageElementObj.findEmailSettingsTab(driver,screenshotPath);
    await emailSettingsTab.click();
    await driver.sleep(2000);

    //will find 'email preferences' tab and then click on that
    const emailPreferencesTab = await emailPreferencesPageElementObj.findEmailPreferencesTab(driver,screenshotPath);
    await emailPreferencesTab.click();
    await driver.sleep(2000);

    //will verify whether the email preferences page found or not
    try{
        await driver.wait(until.urlContains('app/user/emailSettings/preferences'),15000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailPreferencesPage_NotFound.png');
        await assert.fail('Due to the email preferences page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'EmailPreferencesPage_NotFound.png\'');
    }

    console.log('The email preferences page has been opened successfully...');
}exports.openEmailPreferencesPage=openEmailPreferencesPage;

//will get the email preferences data of the currently logged-in user
async function getEmailPreferencesSettings(driver,screenshotPath){
    let defaultEmailTrackingVal;

    //will get the email sharing data
    await emailPreferencesPageElementObj.setFocusOnSection(driver,'E-Mail Sharing Permission');
    const dealEmailSharingDropdown = await formElementObj.findDropdown(driver,screenshotPath,'dealSpecificEmailConversationField');
    const dealEmailSharingVal = await dealEmailSharingDropdown.getText();
    const activityEmailSharingDropdown = await formElementObj.findDropdown(driver,screenshotPath,'activitySpecificEmailConversationField');
    const activityEmailSharingVal = await activityEmailSharingDropdown.getText();
    const contactEmailSharingDropdown = await formElementObj.findDropdown(driver,screenshotPath,'contactSpecificEmailConversationField');
    const contactEmailSharingVal = await contactEmailSharingDropdown.getText();
    
    //will get the default text style data
    const fontFamilyDropdown = await formElementObj.findDropdown(driver,screenshotPath,'fontFamily');
    const fontFamilyDropdownVal = await fontFamilyDropdown.getText();
    const fontSizeDropdown = await formElementObj.findDropdown(driver,screenshotPath,'fontSize');
    const fontSizeDropdownVal = await fontSizeDropdown.getText();
    
    //will get the data of link emails with deals 
    await emailPreferencesPageElementObj.setFocusOnSection(driver,'Automatic Email Linking');
    const dealAutoLinkVal = await driver.executeScript("return $('input#automaticLinkDealPreferenceField_true').prop('checked')");
    const dealManuallyLinkVal = await driver.executeScript("return $('input#automaticLinkDealPreferenceField_false').prop('checked')");
   
    //will get the data of default email tracking if the tracking option is visible
    const defaultEmailTrackingOption = await emailPreferencesPageElementObj.findDefaultEmailTrackingOption(driver,screenshotPath);
    if(defaultEmailTrackingOption.length > 0){
        defaultEmailTrackingVal = await defaultEmailTrackingOption[0].getAttribute('value');
    }

    //will return email preferences data
    return{ dealEmailSharingVal:dealEmailSharingVal,
            activityEmailSharingVal:activityEmailSharingVal, 
            contactEmailSharingVal:contactEmailSharingVal,
            fontFamilyDropdownVal:fontFamilyDropdownVal,
            fontSizeDropdownVal:fontSizeDropdownVal,
            dealAutoLinkVal:dealAutoLinkVal,
            dealManuallyLinkVal:dealManuallyLinkVal,
            defaultEmailTrackingVal:defaultEmailTrackingVal
    }
}exports.getEmailPreferencesSettings=getEmailPreferencesSettings;
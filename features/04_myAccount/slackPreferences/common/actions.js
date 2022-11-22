const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const sharedElementsObj = require('../../../00_common/actions/commonActions');
const slackPreferenceElementsObj = require('./slackPreferencesPageElements');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

//will navigate on the dashboard page and then come back to the slack preferences page
async function comeBackToSlackPreferencesPage(driver,screenshotPath){
    await driver.sleep(1000);
    await sharedElementsObj.clickOnSecurity();
    await driver.sleep(1000);
    await slackPreferenceElementsObj.clickOnSlackPreferenceTab(driver,screenshotPath);
    await driver.wait(until.urlContains('app/user/slackPreferences'),10000);
}exports.comeBackToSlackPreferencesPage=comeBackToSlackPreferencesPage;

async function openSlackPreferencePage(driver,screenshotPath){
    //will open my account page
    await openSalesmatePageObj.openMyAccountPage(driver,screenshotPath);
    await driver.manage().setTimeouts({implicit:2000});

    //check slack preference tab is visible or not
    const slackPreferenceTab = await driver.findElements(By.xpath('//a[text()="Slack Preferences"]'));
    const slackPreferenceTabLength = await slackPreferenceTab.length;
    if(slackPreferenceTabLength > 0 ) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'slackPreferencesTab.png');
        await slackPreferenceElementsObj.clickOnSlackPreferenceTab(driver,screenshotPath);
        console.log("As slack app is installed,the slack preference tab is displayed in my account");
    }else {
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Apps' tab
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');

        //will check the 'Apps' tab is visible or not
        if (appsTab.length > 0) {
            //will set focus on the 'Apps' tab
            await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
            await driver.wait(until.elementIsVisible(appsTab[0]));
            //will click on the 'Apps' tab
            await appsTab[0].click();
        } else {
            /* As 'Apps' tab is not visible to the logged-in user, it will do Admin 02_login on the same browser */

            let adminUserNumber = '';

            //will get the Admin user details from the xlsx file
            const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx', 'UserDetails');
            for (let i = 0; i < userDetails.user.length; i++) {
                if (userDetails.profile[i].toLowerCase() == 'admin') {
                    adminUserNumber = userDetails.user[i];
                }
            }
            //will check whether the Admin user found or not from the excel file
            if (adminUserNumber == '') {
                await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \'' + userDetails.profile + '\'.');
            }

            //will open the Salesmate 02_login page
            await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on global data sharing policies page');
            //will do Salesmate 02_login with Admin user's credentials
            await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUserNumber, 'the {string} is on global data sharing policies page');
            //will open the 'Setup' page
            await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
            //will find the 'Apps' tab
            const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
            //will set focus on the 'Apps' tab
            await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
            await driver.wait(until.elementIsVisible(appsTab[0]));
            //will click on the 'Apps' tab
            await appsTab[0].click();
            await driver.sleep(1000);
        }
        //install slack app
        await slackPreferenceElementsObj.findSlackAppInstallationButton(driver);
        await driver.sleep(1000);
        await slackPreferenceElementsObj.authorizeSlackApp(driver);
        await driver.sleep(2000);
        const findDropdown = await driver.findElement(By.css("select[name='addDealSelectedChannelField']"));
        await driver.wait(until.elementIsVisible(findDropdown));

        //will verify whether the slack preferences page found or not
        try {
            await driver.wait(until.urlContains('app/setup/apps/slack'), 10000);
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + '/slackPreferencesPage_NotFound.png');
            await assert.fail('Due to the slack preferences page is not found, the test case has been failed. Error Details: \'' + err + '\' Screenshot Name: \'' + screenshotPath + '/slackPreferencesPage_NotFound.png\'.');
        }
    }
    
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    console.log('The slack preferences page has been opened successfully...');
}exports.openSlackPreferencePage=openSlackPreferencePage;
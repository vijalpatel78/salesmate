const assert = require('assert');
const {By,until} = require('selenium-webdriver');
const commonElementObj = require('../../../00_common/webElements/commonElements');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../00_common/actions/readExcelData');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const ringCentralElementsObj = require('./ringCentralPreferencesPageElements');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function openRingCentralPage(driver,screenshotPath){
    //will open my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);
    await driver.manage().setTimeouts({implicit:2000});

    //check ring central preference tab is visible or not
    const ringCentralTab = await driver.findElements(By.xpath('//a[text()="RingCentral Preferences"]'));
    const ringCentralTabLength = await ringCentralTab.length;
    if(ringCentralTabLength > 0 ) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'ringCentralTab.png');
        console.log("As ring central app is installed,the slack preference tab is displayed in my account");
    } else {
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        //will find the 'Voice' tab
        const voiceTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Voice ');

        //will check the 'Voice' tab is visible or not
        if (voiceTab.length > 0) {
            //will set focus on the 'Voice' tab
            await driver.executeScript("arguments[0].scrollIntoView();", voiceTab[0]);
            await driver.wait(until.elementIsVisible(voiceTab[0]));
            //will click on the 'Voice' tab
            await voiceTab[0].click();
        } else {
            /* As 'Voice' tab is not visible to the logged-in user, it will do Admin 02_login on the same browser */

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
            //will find the 'Voice' tab
            const voiceTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Voice ');
            //will set focus on the 'Voice' tab
            await driver.executeScript("arguments[0].scrollIntoView();", voiceTab[0]);
            await driver.wait(until.elementIsVisible(voiceTab[0]));
            //will click on the 'Voice' tab
            await voiceTab[0].click();
            await driver.sleep(1000);
            //install ring central app
            await ringCentralElementsObj.installRingCentralApp(driver);
            await driver.sleep(1000);
            await ringCentralElementsObj.authorizeRingCentralApp(driver);
            await driver.sleep(6000);
            //will verify whether the apps page found or not
            try{
                await driver.wait(until.urlContains('app/03_setup/voice/ringcentral'),10000);
            }catch(err){
                await screenshotObj.takeScreenshot(driver,screenshotPath+'/ringCentralPage_NotFound.png');
                await assert.fail('Due to the ring central preferences page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/ringCentralPage_NotFound.png\'.');
            }
        }
        await driver.sleep(1000);
        //install ring central app
        await ringCentralElementsObj.installRingCentralApp(driver);
        await driver.sleep(1000);
        await ringCentralElementsObj.authorizeRingCentralApp(driver);
        await driver.sleep(6000);
        //will verify whether the apps page found or not
        try{
            await driver.wait(until.urlContains('app/03_setup/voice/ringcentral'),10000);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'/ringCentralPage_NotFound.png');
            await assert.fail('Due to the ring central preferences page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/ringCentralPage_NotFound.png\'.');
        }
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    console.log('The ring central preferences page has been opened successfully...');
}exports.openRingCentralPage=openRingCentralPage;
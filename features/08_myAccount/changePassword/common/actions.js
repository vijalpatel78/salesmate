const assert = require('assert');
const { until } = require('selenium-webdriver');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const changePasswordElementsObj = require('../common/changePasswordPageElements');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

async function openSecurityPage(driver,screenshotPath){
    //will open the my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'security' tab and then click on that
    const securityTab = await changePasswordElementsObj.clickOnSecurity();
    await securityTab.click();
    await driver.sleep(1500);
    //will verify whether the security page found or not
    try{
        await driver.wait(until.urlContains('app/user/security/changePassword'), 10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/securityPage_NotFound.png');
        await assert.fail('Due to the security page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/securityPage_NotFound.png\'');
    }

    console.log('The security page has been opened successfully...');
}exports.openSecurityPage=openSecurityPage;
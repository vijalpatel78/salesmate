const { By } = require('selenium-webdriver');
const assert = require('assert');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

async function openAccessKeyPage(driver,screenshotPath){
    //will open the my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'Access Key' tab and then click on that
    const accessKeyTab = await driver.findElement(By.xpath("//a[text()='Access Key']"));
    await accessKeyTab.click();
    await driver.sleep(2000);
    //will verify whether the access key page found or not
    const currentPageURL = await driver.getCurrentUrl();
    try{
        await currentPageURL.includes('app/user/accesskey');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/accessKeyPage_NotFound.png');
        await assert.fail('Due to the access key page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/accessKeyPage_NotFound.png\'');
    }

    console.log('The access key page has been opened successfully...');
}exports.openAccessKeyPage=openAccessKeyPage;
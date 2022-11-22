const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const moduleElementsObj = require('../../00_common/webElements/moduleElements');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the dashboard page and then come back to the email templates page
async function comeBackToEmailTemplatesPage(driver,screenshotPath){
    try {
        const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactModule.click();
        await driver.sleep(3000);
        const dashboardOption = await driver.findElement(By.xpath('//span[@class="icon-ic_more_rounded"]'));
        await dashboardOption.click();
        await driver.sleep(500);
        const emailTemplateIcon = await driver.findElement(By.xpath('//span[text()="Email Templates"]'));
        await emailTemplateIcon.click();
        await driver.sleep(3000);
        await driver.wait(until.urlContains('app/email-templates/list'), 10000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dashboardPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
}exports.comeBackToEmailTemplatesPage=comeBackToEmailTemplatesPage;

async function openEmailTemplatesPage(driver,screenshotPath) {
    await driver.sleep(1000);
    const dashboardOption = await driver.findElement(By.xpath('//span[@class="icon-ic_more_rounded"]'));
    await dashboardOption.click();
    await driver.sleep(500);
    const emailTemplateIcon = await driver.findElement(By.xpath('//span[text()="Email Templates"]'));
    await emailTemplateIcon.click();
    await driver.sleep(3000);
    //will verify whether the email templates page found or not
    try{
        await driver.wait(until.urlContains('app/email-templates/list'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'/emailTemplatesPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail('Due to the email templates page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'/emailTemplatesPage_NotFound.png\'.');
    }
    console.log('The email templates page has been opened successfully...');
}exports.openEmailTemplatesPage=openEmailTemplatesPage;
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

async function findSlackAppInstallationButton(driver) {
    const slackInstallationButton = await driver.findElement(By.xpath("//h4[text()='Slack Integration ']/following-sibling::a[text()='Install ']"));
    await driver.executeScript("arguments[0].scrollIntoView();",slackInstallationButton);
    await driver.wait(until.elementIsVisible(slackInstallationButton));
    await slackInstallationButton.click();
}

async function configureSlackPreference(driver) {
    const configureSlackLink = await driver.findElement(By.xpath("//a[text()='Slack Integration']"));
    await driver.executeScript("arguments[0].scrollIntoView();",configureSlackLink);
    await driver.wait(until.elementIsVisible(configureSlackLink));
    await configureSlackLink.click();
}

async function authorizeSlackApp(driver) {
    await driver.findElement(By.id('btnAuthorize')).click();
    await driver.sleep(2000);
    await driver.findElement(By.id('domain')).sendKeys('vijalteam');
    await driver.findElement(By.xpath('//button[@type="submit"]')).click();
    await driver.findElement(By.id('email')).sendKeys('meghapatel1234.456@gmail.com')
    await driver.findElement(By.id('password')).sendKeys('megha123!')
    await driver.findElement(By.id('signin_btn')).click();
    await driver.findElement(By.xpath('//button[text()="Allow"]')).click();
    await driver.sleep(2000);
}

async function clickOnSlackPreferenceTab(driver,screenshotPath) {
    screenshotPath = './features/04_myAccount/slackPreferences/screenshots/';
    try {
        await driver.findElement((By.xpath("//a[text()='Slack Preferences']"))).click();
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'slackPreferenceTab_NotFound.png');
        await assert.fail("As slack preference tab is not found,test case has been aborted");
    }
}

async function enableOrDisableToggles(names = [], toggleValue = 'disable',driver) {
    for (let i = 0; i < names.length; i++) {
        const toggleButtons = await driver.findElement(By.name(names[i]));
        const currentValue = await toggleButtons.getAttribute("value") === 'true' ? 'enable' : 'disable';
        if (currentValue !== toggleValue) {
            await driver.executeScript("arguments[0].click();", toggleButtons);
        }
    }
}

async function clickOnUpdate(driver) {
 await driver.findElement(By.id('btnUpdate')).click();
 await driver.sleep(1000);
}

async function reAuthorizeSlack(driver) {
    await driver.findElement(By.xpath('//button[@id="btnAuthorize"]')).click();
    await driver.sleep(5000);
    const allowbtn = await driver.findElement(By.xpath('//button[text()="Allow"]'));
    driver.wait(until.elementIsVisible(allowbtn));
    await allowbtn.click();
    await driver.sleep(2000);
}

async function authorizeSlackAppUser2(driver) {
    await driver.findElement(By.xpath('//button[@id="btnAuthorize"]')).click();
    await driver.sleep(2000);
    await driver.findElement(By.id('domain')).sendKeys('rapidopsworld');
    await driver.findElement(By.xpath('//button[@type="submit"]')).click();
    await driver.findElement(By.id('email')).sendKeys('priyanka.vlr@rapidops.com');
    await driver.findElement(By.id('password')).sendKeys('Violet@657');
    await driver.findElement(By.id('signin_btn')).click();
    const allowBtn = await driver.findElement(By.xpath('//button[@data-qa="oauth_submit_button"]'));
    await driver.executeScript("arguments[0].click();",allowBtn);
    await driver.sleep(2000);
}

async function removeSlackPreference(driver) {
    const removeBtn = await driver.findElement(By.id('btnRemove'));
    await driver.wait(until.elementIsVisible(removeBtn));
    await removeBtn.click();
    await driver.sleep(2000);
}

async function removeSlackApp(driver) {
    await driver.sleep(1000);
    await driver.findElement(By.xpath("//div[1]/ul/li[3]/div[@class='app-block pos-rlt wrapper-lg']/a[@class='btn btn-success']")).click();
    await driver.findElement(By.id('btnRemove')).click();
    await driver.sleep(2000);
}

module.exports = {
    findSlackAppInstallationButton,
    configureSlackPreference,
    authorizeSlackApp,
    clickOnSlackPreferenceTab,
    enableOrDisableToggles,
    clickOnUpdate,
    authorizeSlackAppUser2,
    removeSlackPreference,
    removeSlackApp,
    reAuthorizeSlack
    
}
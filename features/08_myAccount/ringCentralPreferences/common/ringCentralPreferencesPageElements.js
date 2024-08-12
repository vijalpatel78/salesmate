const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function clickOnRingCentralTab(driver) {
    await driver.findElement(By.xpath('//a[text() ="RingCentral Preferences"]')).click();
}

async function installRingCentralApp(driver) {
    await driver.findElement(By.id('ringCentralButtonField')).click();
    await driver.sleep(2000);
}

async function authorizeRingCentralApp(driver) {
    await driver.findElement(By.xpath('//a[@class="btn btn-primary pull-right"]')).click();
    const parentWindow = await driver.getWindowHandle();
    const windowHandlers = await driver.getAllWindowHandles();
    const lastWindow = windowHandlers[windowHandlers.length-1];
    await driver.switchTo().window(lastWindow);
    await driver.sleep(10000);
    await driver.findElement(By.id('credential')).sendKeys("+17048855532");
    await driver.findElement(By.xpath("//button[text()='Next']")).click();
    await driver.sleep(3000);
    await driver.findElement(By.id('password')).sendKeys("F0r@tf!9");
    const signInButton = await driver.findElement(By.xpath("//button[@type ='submit']"));
    await driver.executeScript("arguments[0].click();",signInButton);
    await driver.sleep(5000);
    await driver.findElement(By.xpath("//button[text() ='Authorize']")).click();
    await driver.switchTo().window(parentWindow);
    await driver.sleep(1000);
}

async function authorizationMessage(driver) {
    const notificationMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(notificationMessage,'Authorization done successfully.');
}

async function reAuthorizeRingCentral(driver) {
    await driver.findElement(By.xpath('//a[text() = " Authorize "]')).click();
    const parentWindow = await driver.getWindowHandle();
    const windowHandlers = await driver.getAllWindowHandles();
    const lastWindow = windowHandlers[windowHandlers.length-1];
    await driver.switchTo().window(lastWindow);
    await driver.sleep(10000);
    await driver.findElement(By.xpath("//button[@title ='Continue as Kay Greene. +1 (704) 8855532']")).click();
    await driver.sleep(3000);
    await driver.findElement(By.xpath('//button[text() = "Authorize"]')).click();
    await driver.switchTo().window(parentWindow);
    await driver.sleep(1000);
}

async function removingRingCentralApp(driver) {
    await driver.findElement(By.id("btnRemove")).click();
    await driver.findElement(By.xpath("//button[text()='Yes']")).click();
}

async function removeRingCentral(driver) {
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//button[text()= " Remove "]')).click();
    await driver.findElement(By.xpath('//button[text() = "Yes"]')).click();
}

async function removedRingCentralMessage(driver) {
    const removeMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
    strictEqual(removeMessage,'RingCentral account removed successfully.');
}

module.exports = {
    clickOnRingCentralTab,
    installRingCentralApp,
    authorizeRingCentralApp,
    authorizationMessage,
    reAuthorizeRingCentral,
    removingRingCentralApp,
    removeRingCentral,
    removedRingCentralMessage
}
const { By } = require('selenium-webdriver');
const driver = require('../../../cucumber_config/cucumber_config').driver;

async function login(email, password, localDriver = driver) {
    const title = await localDriver.getTitle();
    if(title === 'Login -- Salesmate') {
        const email1 = await localDriver.findElement(By.id('email'));
        await email1.clear();
        await email1.sendKeys(email);
        await localDriver.sleep(1000);
        const pswd = await localDriver.findElement(By.id('password'));
        await pswd.clear();
        await pswd.sendKeys(password);
        await localDriver.sleep(1000);
        await localDriver.findElement(By.id('btnSubmit')).click();
        await localDriver.sleep(2000);
        return true;
    }
    return false;
}

async function clickOnSignOut() {
    await driver.findElement(By.className('avatar')).click();
    await driver.sleep(2000);
    await driver.findElement(By.xpath("//ul//li//a[@href='/fe/logout?logoutAction=Manual Sign Out']")).click();
    await driver.sleep(2000);
}

async function clickOnSecurity() {
    await driver.sleep(500);
    await driver.findElement(By.xpath("//a[text()='Security']")).click();
    await driver.sleep(1000);
}

module.exports = {
    login,
    clickOnSignOut,
    clickOnSecurity
};
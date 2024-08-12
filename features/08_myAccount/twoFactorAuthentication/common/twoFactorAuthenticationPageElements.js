const {By} = require('selenium-webdriver');

//all these functions will find two-factor authentication module elements on the browser and return those elements

//----------------------- While Login -----------------------

async function findVerificationCodeTextBox(driver){
    const verificationCodeTextBox = await driver.findElement(By.id('verificationCode'));
    return verificationCodeTextBox;
}exports.findVerificationCodeTextBox=findVerificationCodeTextBox;
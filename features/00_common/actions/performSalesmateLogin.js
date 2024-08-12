const { until } = require('selenium-webdriver');
const assert = require('assert');
const { By } = require('selenium-webdriver');
const driver = require('../../../config/test_config').driver;
const readUserDetailsObj = require('./readExcelData');
const screenshotObj = require('./browserActions/takeScreenshot');
const formElementObj = require('../webElements/formElements');
const dashboardPageElementObj = require('../webElements/dashboardPageElements');
const linkEnvironment = require('../../../config/test_config').linkEnvironment;
let count = 0;

//this function will perform Salesmate login with specified user's credentials (it will not perform centralized login or login through the Google)
async function performSalesmateLogin(driver, screenshotPath, user, stepDetails) {
  let emailElement, passElement, loginBtn, dashboardPage_dashboardMenuBtn, dashboardOnboarding_closeBtn, userDetails;
  let email_data = '', password_data = '';
  ++count;

  //will fetch the specified user's email and password data from the xlsx file
  if (linkEnvironment.toLocaleLowerCase() === 'dev') {
    userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx', 'UserDetails');
  } else if (linkEnvironment.toLocaleLowerCase() === 'staging') {
    userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_staging.xlsx', 'UserDetails');
  } else {
    userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx', 'UserDetails');
  }

  for (let i = 0; i < userDetails.user.length; i++) {
    userDetails.user[i] = userDetails.user[i].toLowerCase();
    user = user.toLowerCase();
    if (userDetails.user[i] == user) {
      email_data = userDetails.email[i];
      password_data = userDetails.password[i];
    }
  }

  //will check whether the specified user's credentials are found or not from the xlsx file
  if (email_data == '' && password_data == '') {
    await assert.fail('Due to the provided \'' + user + '\' is not valid, the test case execution can not be started. The user should be anyone from this list ---> \'' + userDetails.user + '\'.');
  } else {
    /* As user's credentials found, will perform Salesmate login with the specified user's credentials */

    //will find email field, password field or login button on the browser
    try {
      emailElement = await formElementObj.findTextbox(driver, screenshotPath, 'email');
      passElement = await formElementObj.findTextbox(driver, screenshotPath, 'password');
      loginBtn = await formElementObj.findButton(driver, screenshotPath, 'btnSubmit');
    } catch (err) {
      console.log('::::::::::::: Failed Step: ' + stepDetails + ' :::::::::::::');
      console.log(err);
      await driver.quit();
      process.exit(0);
    }

    //will pass the data to 'Email' field
    await emailElement.clear();
    await emailElement.sendKeys(email_data);

    //will pass the data to 'Password' field
    await passElement.clear();
    await passElement.sendKeys(password_data);

    //will click on the 'Login(Sign In)' button
    await loginBtn.click();
    await driver.sleep(7000);

    //will check whether it redirects to the dashboard page or not
    try {
      dashboardPage_dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
    } catch (err) {
      await screenshotObj.takeScreenshot(driver, screenshotPath + 'DashboardPage_NotFound_' + count + '.png');
      await assert.fail('Due to the Salesmate dashboard page is not found after the login, the test case has been aborted. Screenshot Name: \'' + screenshotPath + 'DashboardPage_NotFound_' + count + '.png\'.');
    }

    await driver.wait(until.elementIsEnabled(dashboardPage_dashboardMenuBtn));
    // await dashboardPage_dashboardMenuBtn.click();
    await driver.sleep(3000);

    console.log('Login successful and the Salesmate dashboard page has been opened successfully...');
  }
} exports.performSalesmateLogin = performSalesmateLogin;

async function login(email, password, localDriver = driver) {
  const title = await localDriver.getTitle();
  if (title === 'Login -- Salesmate') {
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
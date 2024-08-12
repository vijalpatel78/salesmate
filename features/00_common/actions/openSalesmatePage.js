const assert = require('assert');
const { until } = require('selenium-webdriver');
const screenshotObj = require('./browserActions/takeScreenshot');
const formElementObj = require('../webElements/formElements');
const commonElementObj = require('../webElements/commonElements');
const dashboardPageElementObj = require('../webElements/dashboardPageElements');
const readSalesmteLinkNameObj = require('./readExcelData');
const elementSearchTimeout = require('../../../config/test_config').elementSearchTimeout;
const linkEnvironment = require('../../../config/test_config').linkEnvironment;
let count = 0;

async function openSalesmateLoginPage(driver, screenshotPath, stepDetails) {
  let salesmateLink;

  //will wait for a specified amount of times before throwing no such element found exception
  await driver.manage().setTimeouts({ implicit: elementSearchTimeout });

  //will fetch Salesmate test link name from the excel file
  if (linkEnvironment.toLocaleLowerCase() === 'dev') {
    salesmateLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData_dev.xlsx', 'SalesmateLink');
  } else if (linkEnvironment.toLocaleLowerCase() === 'staging') {
    salesmateLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData_staging.xlsx', 'SalesmateLink');
    salesmateLink = "https://staging9.salesmate.io";
  } else {
    salesmateLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData.xlsx', 'SalesmateLink');
  }
  salesmateLink = salesmateLink + '/fe/logout';

  //will verify whether the Salesmate login page is already opened or not
  let currentPageTitle = await driver.getTitle();
  if (currentPageTitle == 'Login -- Salesmate') {
    /* Note: The Salesmate login page and two-factor authentication page have the same page title */

    //will check whether the user is on the Salesmate login page or not
    const passwordElement = await formElementObj.findTextbox(driver, screenshotPath, 'password');
    if (await passwordElement.isDisplayed()) {
      console.log('The Salesmate login page has been opened successfully...');
    } else {
      //will redirect to the Salesmate login page
      await driver.get(salesmateLink);
      console.log('The Salesmate login page has been opened successfully...');
      await driver.sleep(500);
    }
  } else {
    /*  As the another page is opened, 
     *  the process to open Salesmate login page will be started from by entering the Salesmate URL
    */

    //will open given Salesmate URL/link on the browser
    await driver.get(salesmateLink);
    await driver.sleep(1000);
    //will verify whether the Salesmate login page is found or not
    currentPageTitle = await driver.getTitle();
    if (currentPageTitle == 'Login -- Salesmate') {
      console.log('The Salesmate login page has been opened successfully...');
      await driver.sleep(500);
    } else {
      console.log('::::::::::::: Failed Step: ' + stepDetails + ' :::::::::::::');
      console.log('Due to the Salesmate login page is not found, the test execution has been aborted. Screenshot Name: \'' + screenshotPath + 'SalesmateLoginPage_NotFound.png\'.');
      console.log('Expected Page Title ---> \'Login -- Salesmate\', Current Page Title ---> \'' + currentPageTitle + '\'.');
      await screenshotObj.takeScreenshot(driver, screenshotPath + 'SalesmateLoginPage_NotFound.png');
      await driver.quit();
      process.exit(0);
    }
  }
} exports.openSalesmateLoginPage = openSalesmateLoginPage;

async function openMyAccountPage(driver, screenshotPath) {
  /*  Before opening my account page, it is required to check whether the user is logged in or not. 
   *  This checking can be done by finding the dashboard menu button.
  */
  let dashboardMenuBtn;
  ++count;

  //will find dashboard menu button
  try {
    dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
    await driver.wait(until.elementIsVisible(dashboardMenuBtn));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + 'User_IsNot_LoggedIn' + count + '.png');
    await assert.fail('Due to the user is not logged into the Salesmate, the test case has been aborted. Screenshot Name: \'' + screenshotPath + 'User_IsNot_LoggedIn' + count + '.png\'.');
  }
  await driver.sleep(2000);
  //will find 'user profile thumb view' and then click on that
  const userProfileThumbview = await commonElementObj.findUserProfileThumbview(driver, screenshotPath);
  await userProfileThumbview.click();
  await driver.sleep(1000);
  //will find 'my account' menu button and then click on that
  const myAccountMenuBtn = await commonElementObj.findMyAccountMenuBtn(driver, screenshotPath);
  await myAccountMenuBtn.click();
  await driver.sleep(1000);
} exports.openMyAccountPage = openMyAccountPage;

async function openSetupPage(driver, screenshotPath) {
  /*  Before opening setup page, it is required to check whether the user is logged in or not.
   *  This checking can be done by finding the dashboard menu button.
  */

  let dashboardMenuBtn;
  ++count;

  //will find dashboard menu button
  try {
    dashboardMenuBtn = await dashboardPageElementObj.findDashboardMenuBtn(driver);
    await driver.wait(until.elementIsVisible(dashboardMenuBtn));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + 'User_IsNot_LoggedIn' + count + '.png');
    await assert.fail('Due to the user is not logged into the Salesmate, the test case has been aborted. Screenshot Name: \'' + screenshotPath + 'User_IsNot_LoggedIn' + count + '.png\'.');
  }
  await driver.sleep(3000);
  //will find 'user profile thumb view' and then click on that
  const userProfileThumbview = await commonElementObj.findUserProfileThumbview(driver, screenshotPath);
  await driver.wait(until.elementIsVisible(userProfileThumbview));
  await userProfileThumbview.click();
  await driver.sleep(1000);

  //will find 'setup' menu button and then click on that
  const setupMenuBtn = await commonElementObj.findSetupMenuBtn(driver, screenshotPath);
  await driver.executeScript("arguments[0].click();", setupMenuBtn);
  await driver.sleep(1000);
} exports.openSetupPage = openSetupPage;

async function openSalesmateLink(driver) {
  //will fetch Salesmate test link name from the excel file
  let salesmateLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData_dev.xlsx', 'SalesmateLink');
  await driver.get(salesmateLink);
} exports.openSalesmateLink = openSalesmateLink;
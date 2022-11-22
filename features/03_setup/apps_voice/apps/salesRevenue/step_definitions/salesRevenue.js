const {Given,When,Then} = require('@cucumber/cucumber');
const {until,Key} = require('selenium-webdriver');
const assert = require('assert');
const openOrganizationPageObj = require('../../../../account_management/organizationDetails/common/actions');
const openMyAccountPageObj = require('../../../../../04_myAccount/generalSettings/common/actions');
const openUsersPageObj = require('../../../../users_security/users/common/actions');
const openFiscalYearPageObj = require('../../../../account_management/fiscalYear/common/actions')
const appsPageElementObj = require('../../common/appsPageElements');
const myAccountPageElementObj = require('../../../../../04_myAccount/generalSettings/common/generalSettingsPageElements');
const usersPageElementObj = require('../../../../users_security/users/common/usersPageElements');
const salesRevenuePageElementObj = require('../common/salesRevenuePageElements');
const dashboardPageElementObj = require('../../../../../00_common/dashboard/common/dashboardPageElements')
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const commonActionObj = require('../../common/actions');
const selectDropdownValueObj = require('../../../../../00_common/actions/fieldActions/selectDropdownValue');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData')
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/salesRevenue/screenshots/';
let activeUsers=[], expectedCurrency, expectedYear, count = 0, loggedInUserName;

Given('the Sales Revenue app is uninstalled', async () =>{
    //will uninstall the Sales Revenue app
    await commonActionObj.uninstallApp(driver,screenshotPath,'Sales Revenue - Goal Management');
    await driver.sleep(1000);
});

Given('the Sales Revenue app is installed', async () =>{
    //will install the Sales Revenue app
    await commonActionObj.installApp(driver,'Sales Revenue - Goal Management');
    await driver.sleep(1000);
});

When('the user clicks on the Configure button of Sales Revenue app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Sales Revenue - Goal Management');
    await driver.sleep(1000);
});

When('the user clicks on the Install button of Sales Revenue app', async () =>{
    //will install the Sales Revenue app
    await commonActionObj.installApp(driver,'Sales Revenue - Goal Management');
    await driver.sleep(2000);
});

When('the user goes on the Setup>Organization Details page and verify currency', async () =>{
    //will open the Organization page
    await openOrganizationPageObj.openOrganizationDetailsPage(driver,screenshotPath);
    //will find and get the organization currency
    const currencyDropdown = await formElementsObj.findDropdown(driver,screenshotPath,'currencyDisplay');
    await driver.executeScript("arguments[0].scrollIntoView();",currencyDropdown);
    expectedCurrency = await currencyDropdown.getText();
});

When('the user goes on the Setup>Users page and verified the active user list', async () =>{
    //will open the Users page
    await openUsersPageObj.openUsersPage(driver,screenshotPath);
    //will get the active user list
    const users = await usersPageElementObj.findNamesOnListPage(driver);
    for(let i=0; i<users.length; i++){
        activeUsers.push(await users[i].getText());
    }
    console.log('Active Users: '+ activeUsers);
});

When('Amount : {string}', async (value) =>{
    //will find the amount checkbox
    const amountCheckbox = await salesRevenuePageElementObj.findAmountCheckbox(driver);
    //will click on the checkbox only if it is not checked
    const currentState = await amountCheckbox[count].getAttribute('value');
    if(currentState != 'true'){
        await driver.executeScript("arguments[0].click()",amountCheckbox[count]);
        await driver.sleep(1000);
    }

    //will find the amount textbox
    const amountTextbox = await salesRevenuePageElementObj.findAmountTextBox(driver);
    //will pass the data 
    await clearFieldDataObj.clearFieldData(amountTextbox[count]);
    await amountTextbox[count].sendKeys(value);
    await driver.sleep(1000);
    count++;
});

When('remove the goal', async () =>{
    //will find the amount checkbox
    const amountCheckbox = await salesRevenuePageElementObj.findAmountCheckbox(driver);
    //will click on the checkbox only if it is checked
    const currentState = await amountCheckbox[0].getAttribute('value');
    if(currentState == 'true'){
        await driver.executeScript("arguments[0].click()",amountCheckbox[0]);
        await driver.sleep(1000);
    }
});

When('click on the Change Period link', async () =>{
    //will find and click on the link
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'Change Period');
    await link.click();
});

When('select Period: {string}', async (period) =>{
    //will select the provided period
    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'periodSelectField',period);
});

When('click on the Save button of period', async () =>{
    //will find the Save button
    const saveBtn = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','updateButton');
    await saveBtn.click();
    await driver.wait(until.stalenessOf(saveBtn));
});

When('the user goes on the Setup>Fiscal Year page and verify the year', async () =>{
    //will open the Fiscal Year page
    await openFiscalYearPageObj.openFiscalYearPage(driver,screenshotPath);
    //will find the fiscal year dropdown 
    const fiscalYearDropdown = await formElementsObj.findDropdown(driver,screenshotPath,'fiscalYear');
    //will get the year
    expectedYear = await fiscalYearDropdown.getText();
});

When('Amount: {string}', async (value) =>{
    //will find the amount checkbox
    const amountCheckbox = await salesRevenuePageElementObj.findAmountCheckbox(driver);
    //will click on the checkbox only if it is not checked
    const currentState = await amountCheckbox[0].getAttribute('value');
    if(currentState != 'true'){
        await driver.executeScript("arguments[0].click()",amountCheckbox[0]);
        await driver.sleep(1000);
    }

    //will find the amount textbox
    const amountTextbox = await salesRevenuePageElementObj.findAmountTextBox(driver);
    await clearFieldDataObj.clearFieldData(amountTextbox[0]);
    await amountTextbox[0].sendKeys(Key.TAB);
    //will pass the data 
    await amountTextbox[0].sendKeys(value);
    await amountTextbox[0].sendKeys(Key.TAB);
    await driver.sleep(1000);
});

When('select yearly period', async () =>{
    //will find and click on the Change Period link
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'Change Period');
    await link.click();
    //will get the actual dropdown value
    const periodDropdown = await formElementsObj.findDropdown(driver,screenshotPath,'periodSelectField');
    const actualValue = await periodDropdown.getText();

    //will select the Yearly period if it is not set
    if(actualValue != 'Yearly'){
        //will select the Yearly period 
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'periodSelectField','Yearly');
        //will find and click on the Save button
        const saveBtn = await formElementsObj.findElementById(driver,screenshotPath,'btnUpdate','updateButton');
        await saveBtn.click();
        await driver.wait(until.stalenessOf(saveBtn));
    }else{
        //will find and click on the Cancel button
        const cancelBtn = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Cancel ');
        await cancelBtn.click();
        await driver.wait(until.stalenessOf(cancelBtn));
    }
})

When('click on the Go to Goal Report link', async () =>{
    //will find the link
    const reportLink = await commonElementObj.findLinkElement(driver,screenshotPath,'Go to Goal Report');
    await reportLink.click();
    await driver.sleep(1000);
});

When('the user goes on the MyAccount>GeneralSettings page and get the logged-in user name', async () =>{
    //will open the my account page
    await openMyAccountPageObj.openGeneralSettingsPage(driver,screenshotPath);
    //will find the logged-in user name
    const loggedInUserNameElem = await myAccountPageElementObj.findLoggedInUserName(driver);
    loggedInUserName = await loggedInUserNameElem.getText();
});

When('set goal with {string} amount for the logged-in user', async (goalAmount) =>{
    //will find the amount checkbox of logged-in user
    const amountCheckbox = await salesRevenuePageElementObj.findSpecifiedUserAmountCheckbox(driver,loggedInUserName);
    //will click on the checkbox only if it is not checked
    const currentState = await amountCheckbox.getAttribute('value');
    if(currentState != 'true'){
        await driver.executeScript("arguments[0].click()",amountCheckbox);
        await driver.sleep(1000);
    }

    //will find the amount textbox
    const amountTextbox = await salesRevenuePageElementObj.findSpecifiedUserAmountTextBox(driver,loggedInUserName);
    //will pass the data 
    await clearFieldDataObj.clearFieldData(amountTextbox);
    await amountTextbox.sendKeys(goalAmount);
    await driver.sleep(1000);
});

Then('the organization currency should be displayed on Sales Revenue - Goal Management page', async () =>{
    //will get the displayed currency
    const currencyElem = await salesRevenuePageElementObj.findCurrencyLabel(driver,screenshotPath);
    const currency = await currencyElem.getText();

    //will check the displayed currency is organization currency or not
    try{
        assert.strictEqual(currency.trim(),expectedCurrency.trim());
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'OrganizationCurrency_NotShowing.png');
        assert.fail('The organization currency is not getting displayed on the sales revenue page. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'OrganizationCurrency_NotShowing.png\'.');
    }

    console.log('The organization \''+expectedCurrency+'\' currency is getting displayed on the sales revenue page...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Sales Revenue app should get installed', async () =>{
    //will check the app is get installed or not
    try{
        await formElementsObj.findElementById(driver,screenshotPath,'btnRemove','removeButton');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'salesRevenueApp_Not_Installed.png');
        assert.fail('The Sales Revenue app is not getting installed. Screenshot Name: \''+screenshotPath+'salesRevenueApp_Not_Installed.png\'.');
    }

    console.log('The Sales Revenue app has been installed successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Sales Revenue app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'Sales Revenue - Goal Management');
    if(installBtn.length > 0){
        console.log('The Sales Revenue app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'salesRevenueApp_Not_Uninstalled.png');
        assert.fail('The Sales Revenue app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'salesRevenueApp_Not_Uninstalled.png\'.');
    }
});

Then('the active users should be displayed on Sales Revenue - Goal Management page', async () =>{
    //will get the displayed username
    const usersElem = await salesRevenuePageElementObj.findUserNameLabel(driver);

    //will check the active users are getting displayed or not
    for(let i=0; i<activeUsers.length; i++){
        const user = await usersElem[i].getText();
        if(!activeUsers.includes(user)){
            await screenshotObj.takeScreenshot(driver,screenshotPath+user.replace(/\s/g,'_')+'_NotActiveUser.png');
            assert.fail('The \''+user+'\' is not active user and it is displayed on the Sales Revenue - Goal Management page. Screenshot Name: \''+screenshotPath+user.replace(/\s/g,'_')+'_NotActiveUser.png\'.');
        }
    }

    console.log('All active users are getting displayed on the Sales Revenue - Goal Management page...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the goal period should set {string}', async (period) =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Sales Revenue - Goal Management');
    await driver.sleep(2000);

    //will find and click on the Change Period link
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'Change Period');
    await link.click();
    //will get the actual dropdown value
    const periodDropdown = await formElementsObj.findDropdown(driver,screenshotPath,'periodSelectField');
    const actualValue = await periodDropdown.getText();

    //will check the provided period is get set or not
    try{
        assert.strictEqual(actualValue,period);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Goal_NotSetWith_'+period+'.png');
        assert.fail('The provided '+period+' goal period is not getting set. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'Goal_NotSetWith_'+period+'.png\'.');
    }

    console.log('The goal period is set to '+period+'...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the yearly goal period should start with set fiscal year', async () =>{
    //will find the set goals period
    const setGoalPeriodElem = await salesRevenuePageElementObj.findSetGoalsPeriod(driver);
    const setGoalPeriod = await setGoalPeriodElem.getText();

    //will check the goal period start with a set fiscal year or not
    if(setGoalPeriod.startsWith(expectedYear)){
        console.log('The yearly goal period is getting started with set \''+expectedYear+'\' fiscal year...');
        const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
        await appsTab.click();
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FiscalYear_'+expectedYear+'_NotConsider.png');
        assert.fail('The yearly goal period is not started with set \''+expectedYear+'\' fiscal year. Screenshot Name: \''+screenshotPath+'FiscalYear_'+expectedYear+'_NotConsider.png\'.');
    }
});

Then('the system should give {string} message', async (validation) =>{
    //will find validation message
    const validationMsgElem = await salesRevenuePageElementObj.findValidationMsg(driver);
    const actualValidationMsg = await validationMsgElem[0].getText();

    //will check the validation message is correct or not
    try{
        assert.strictEqual(actualValidationMsg,validation);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotCorrect.png');
        assert.fail('The validation message is not correct. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotCorrect.png\'.');
    }

    console.log('The \''+validation+'\' validation message is getting displayed...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the goal should set by the {string} and {string} amount for the multiple users', async (value1,value2) =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Sales Revenue - Goal Management');
    await driver.sleep(2000);
    //will get the actual value
    const amounts = await salesRevenuePageElementObj.findAmountTextBox(driver);
    const actualVal1 = await amounts[count-2].getAttribute('value');
    const actualVal2 = await amounts[count-1].getAttribute('value');

    //will check the value is set as provided or not
    try{
        assert.strictEqual(actualVal1,value1);
        assert.strictEqual(actualVal2,value2);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Goal_NotSet.png');
        assert.fail('The goal is not getting set by the provided \''+value1+'\' and \''+value2+'\' amount. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'Goal_NotSet.png\'.');
    }

    console.log('The goal is set by the provided \''+value1+'\' and \''+value2+'\' amount...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the Sales Goal report', async () =>{
    await driver.wait(until.titleContains('Sales Goal'),20000);
    //will get the current page URL
    const currentURL = await driver.getCurrentUrl();
    console.log('Report Page URL: '+currentURL);

    //will check the system redirect on the report page or not
    if(currentURL.endsWith('app/reports/custom/salesgoalreport?title=Sales%20Goal&flag=Amount')){
        console.log('The system is redirected to the Sales Goal report...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ReportPage_NotFound.png');
        assert.fail('The system is not redirected to the Sales Goal report. Expected URL: \'app/reports/custom/salesgoalreport?title=Sales%20Goal&flag=Amount\' Screenshot Name: \''+screenshotPath+'ReportPage_NotFound.png\'.');
    }
});

Then('the goal should get removed', async () =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Sales Revenue - Goal Management');
    await driver.sleep(2000);
    //will get the actual value
    const goal = await salesRevenuePageElementObj.findAmountCheckbox(driver);
    const actualVal = await goal[0].getAttribute('value');

    //will check the goal is get removed or not
    try{
        assert.strictEqual(actualVal,'false');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Goal_NotRemoved.png');
        assert.fail('The goal is not getting removed. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'Goal_NotRemoved.png\'.');
    }

    console.log('The goal is removed successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the goal should get updated by the {string} amount', async (value) =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Sales Revenue - Goal Management');
    await driver.sleep(2000);
    //will get the actual value
    const amounts = await salesRevenuePageElementObj.findAmountTextBox(driver);
    const actualVal = await amounts[0].getAttribute('value');

    //will check the value is get updated or not
    try{
        assert.strictEqual(actualVal,value);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Goal_NotUpdated.png');
        assert.fail('The goal is not getting updated by the provided \''+value+'\' amount. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'Goal_NotUpdated.png\'.');
    }

    console.log('The goal is get updated by the provided \''+value+'\' amount...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Sales Goals widget should get added on the default dashboard', async () =>{
    //will find and click on the old dashboard menu button
    const dashboard = await dashboardPageElementObj.findOldDashboardMenuBtn(driver);
    await driver.executeScript("arguments[0].click()",dashboard);
    await driver.sleep(2000);

    //will check the sales goals widget is getting displayed or not
    try{
        const salesGoalsWidget = await salesRevenuePageElementObj.findSalesGoalsWidget(driver,screenshotPath);
        await driver.executeScript("arguments[0].scrollIntoView()",salesGoalsWidget);
        await driver.sleep(2000);
    }catch(err){
        assert.fail(err);
    }

    console.log('The Sales Goal widget is getting displayed on the dashboard...')
});
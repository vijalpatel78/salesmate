const {Given,When,Then} = require('@cucumber/cucumber');
const {until,Key} = require('selenium-webdriver');
const assert = require('assert');
const appsPageElementObj = require('../../common/appsPageElements');
const usersPageElementObj = require('../../../../users_security/users/common/usersPageElements');
const wonDealsPageElementObj = require('../common/wonDealsPageElements');
const systemModulesPageElementObj = require('../../../../customizations/systemModules/common/systemModulesPageElements')
const dashboardPageElementObj = require('../../../../../00_common/dashboard/common/dashboardPageElements')
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const myAccountPageElementObj = require('../../../../../04_myAccount/generalSettings/common/generalSettingsPageElements');
const openMyAccountPageObj = require('../../../../../04_myAccount/generalSettings/common/actions');
const openSystemModulesPageObj = require('../../../../customizations/systemModules/common/actions');
const openUsersPageObj = require('../../../../users_security/users/common/actions');
const openFiscalYearPageObj = require('../../../../account_management/fiscalYear/common/actions')
const commonActionObj = require('../../common/actions');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData')
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/wonDeals/screenshots/';
let activeUsers=[], expectedDealPluralName = 'Deals', expectedYear, count = 0, loggedInUserName;

Given('the Won Deals app is uninstalled', async () =>{
    //will uninstall the Won Deals app
    await commonActionObj.uninstallApp(driver,screenshotPath,'Won '+expectedDealPluralName+' - Goal Management');
    await driver.sleep(1000);
});

Given('the Won Deals app is installed', async () =>{
    //will install the Won Deals app
    await commonActionObj.installApp(driver,'Won '+expectedDealPluralName+' - Goal Management');
    await driver.sleep(1000);
});

When('the user clicks on the Configure button of Won Deals app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Won '+expectedDealPluralName+' - Goal Management');
    await driver.sleep(1000);
});

When('the user clicks on the Install button of Won Deals app', async () =>{
    //will install the Won Deals app
    await commonActionObj.installApp(driver,'Won '+expectedDealPluralName+' - Goal Management');
    await driver.sleep(2000);
});

When('the user goes on the Setup>Users page and verified the active users', async () =>{
    //will open the Users page
    await openUsersPageObj.openUsersPage(driver,screenshotPath);
    //will get the active user list
    const users = await usersPageElementObj.findNamesOnListPage(driver);
    for(let i=0; i<users.length; i++){
        activeUsers.push(await users[i].getText());
    }
    console.log('Active Users: '+ activeUsers);
});

When('the user goes on the Setup>System Modules page and verifies the deal module name', async () =>{
    //will open the System Modules page
    await openSystemModulesPageObj.openSystemModulesPage(driver,screenshotPath);
    //will get the dynamic module name of deal
    const moduleEditBtn = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,'Deal');
    await moduleEditBtn.click();
    await driver.sleep(1000);
    const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
    expectedDealPluralName = await pluralTextbox.getAttribute('value');
});

When('Deals : {string}', async (value) =>{
    //will find the Deals checkbox
    const dealsCheckbox = await wonDealsPageElementObj.findDealsCheckbox(driver);
    //will click on the checkbox only if it is not checked
    const currentState = await dealsCheckbox[count].getAttribute('value');
    if(currentState != 'true'){
        await driver.executeScript("arguments[0].click()",dealsCheckbox[count]);
        await driver.sleep(1000);
    }

    //will find the deals textbox
    const dealsTextbox = await wonDealsPageElementObj.findDealsTextBox(driver);
    //will pass the data
    await clearFieldDataObj.clearFieldData(dealsTextbox[count]);
    await dealsTextbox[count].sendKeys(value);
    await driver.sleep(1000);
    count++;
});

When('remove the deal goal', async () =>{
    //will find the deal checkbox
    const dealsCheckbox = await wonDealsPageElementObj.findDealsCheckbox(driver);
    //will click on the checkbox only if it is checked
    const currentState = await dealsCheckbox[0].getAttribute('value');
    if(currentState == 'true'){
        await driver.executeScript("arguments[0].click()",dealsCheckbox[0]);
        await driver.sleep(1000);
    }
});

When('the user goes on the Setup>Fiscal Year page and verify the month of fiscal year', async () =>{
    //will open the Fiscal Year page
    await openFiscalYearPageObj.openFiscalYearPage(driver,screenshotPath);
    //will find the fiscal year dropdown
    const fiscalYearDropdown = await formElementsObj.findDropdown(driver,screenshotPath,'fiscalYear');
    //will get the year
    expectedYear = await fiscalYearDropdown.getText();
});

When('Deals: {string}', async (value) =>{
    //will find the Deals checkbox
    const dealsCheckbox = await wonDealsPageElementObj.findDealsCheckbox(driver);
    //will click on the checkbox only if it is not checked
    const currentState = await dealsCheckbox[0].getAttribute('value');
    if(currentState != 'true'){
        await driver.executeScript("arguments[0].click()",dealsCheckbox[0]);
        await driver.sleep(1000);
    }

    //will find the deals textbox
    const dealsTextbox = await wonDealsPageElementObj.findDealsTextBox(driver);
    await clearFieldDataObj.clearFieldData(dealsTextbox[0]);
    await dealsTextbox[0].sendKeys(Key.TAB);
    //will pass the data
    await dealsTextbox[0].sendKeys(value);
    await dealsTextbox[0].sendKeys(Key.TAB);
    await driver.sleep(1000);
});

When('the user goes on the MyAccount>GeneralSettings page and get the logged-in user full name', async () =>{
    //will open the my account page
    await openMyAccountPageObj.openGeneralSettingsPage(driver,screenshotPath);
    //will find the logged-in user name
    const loggedInUserNameElem = await myAccountPageElementObj.findLoggedInUserName(driver);
    loggedInUserName = await loggedInUserNameElem.getText();
});

When('set goal with {string} deals for the logged-in user', async (goal) =>{
    //will find the deals checkbox of logged-in user
    const dealsCheckbox = await wonDealsPageElementObj.findSpecifiedUserDealsCheckbox(driver,loggedInUserName);
    //will click on the checkbox only if it is not checked
    const currentState = await dealsCheckbox.getAttribute('value');
    if(currentState != 'true'){
        await driver.executeScript("arguments[0].click()",dealsCheckbox);
        await driver.sleep(1000);
    }

    //will find the deals textbox
    const dealsTextbox = await wonDealsPageElementObj.findSpecifiedUserDealsTextBox(driver,loggedInUserName);
    //will pass the data
    await clearFieldDataObj.clearFieldData(dealsTextbox);
    await dealsTextbox.sendKeys(goal);
    await driver.sleep(1000);
});

Then('the Won Deals app should get installed', async () =>{
    await driver.sleep(1000);
    //will check the app is get installed or not
    try{
        await formElementsObj.findElementById(driver,screenshotPath,'btnRemove','removeButton');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WonDealsApp_Not_Installed.png');
        assert.fail('The Won Deals app is not getting installed. Screenshot Name: \''+screenshotPath+'WonDealsApp_Not_Installed.png\'.');
    }

    console.log('The Won Deals app has been installed successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Won Deals app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'Won '+expectedDealPluralName+' - Goal Management');
    if(installBtn.length > 0){
        console.log('The Won Deals app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'WonDealsApp_Not_Uninstalled.png');
        assert.fail('The Won Deals app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'WonDealsApp_Not_Uninstalled.png\'.');
    }
});

Then('the active users should be displayed on the Won Deals - Goal Management app', async () =>{
    //will get the displayed username
    const usersElem = await wonDealsPageElementObj.findUserNameLabel(driver);

    //will check the active users are getting displayed or not
    for(let i=0; i<activeUsers.length; i++){
        const user = await usersElem[i].getText();
        if(!activeUsers.includes(user)){
            await screenshotObj.takeScreenshot(driver,screenshotPath+user.replace(/\s/g,'_')+'_NotActiveUser.png');
            assert.fail('The \''+user+'\' is not active user and it is displayed on the Won Deals - Goal Management page. Screenshot Name: \''+screenshotPath+user.replace(/\s/g,'_')+'_NotActiveUser.png\'.');
        }
    }

    console.log('All active users are getting displayed on the Won Deals - Goal Management page...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the goal period should set {string} for the Won Deals app', async (period) =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Won '+expectedDealPluralName+' - Goal Management');
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

Then('the yearly goal period should get started with set fiscal year', async () =>{
    //will find the set goals period
    const setGoalPeriodElem = await wonDealsPageElementObj.findSetGoalsPeriod(driver);
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

Then('the system should give {string} message for deals field', async (validation) =>{
    //will find validation message
    const validationMsgElem = await wonDealsPageElementObj.findValidationMsg(driver);
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

Then('the won deals goal should set by the {string} and {string} deals for the multiple users', async (value1,value2) =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Won '+expectedDealPluralName+' - Goal Management');
    await driver.sleep(2000);
    //will get the actual value
    const deals = await wonDealsPageElementObj.findDealsTextBox(driver);
    const actualVal1 = await deals[count-2].getAttribute('value');
    const actualVal2 = await deals[count-1].getAttribute('value');

    //will check the value is set as provided or not
    try{
        assert.strictEqual(actualVal1,value1);
        assert.strictEqual(actualVal2,value2);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Goal_NotSet.png');
        assert.fail('The goal is not getting set by the provided \''+value1+'\' and \''+value2+'\' details. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'Goal_NotSet.png\'.');
    }

    console.log('The goal is set by the provided \''+value1+'\' and \''+value2+'\' number of deal...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the Won Deals report', async () =>{
    await driver.wait(until.titleContains('Won'),20000);
    //will get the current page URL
    const currentURL = await driver.getCurrentUrl();
    console.log('Report Page URL: '+currentURL);

    //will check the system redirect on the report page or not
    if(currentURL.includes('app/reports/custom/wondealsreport')){
        console.log('The system is redirected to the Won Deals report...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ReportPage_NotFound.png');
        assert.fail('The system is not redirected to the Won Deals report. Expected URL: \'app/reports/custom/wondealsreport?flag=NOD&title=Won%20Deals\' Screenshot Name: \''+screenshotPath+'ReportPage_NotFound.png\'.');
    }
});

Then('the deal goal should get removed', async () =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Won '+expectedDealPluralName+' - Goal Management');
    await driver.sleep(2000);
    //will get the actual value
    const goal = await wonDealsPageElementObj.findDealsCheckbox(driver);
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

Then('the won deals goal should get updated by the {string} deals', async (value) =>{
    //will navigate on the dashboard page and then come back to the apps page
    await commonActionObj.comeBackToAppsPage(driver,screenshotPath);
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Won '+expectedDealPluralName+' - Goal Management');
    await driver.sleep(2000);
    //will get the actual value
    const deals = await wonDealsPageElementObj.findDealsTextBox(driver);
    const actualVal = await deals[0].getAttribute('value');

    //will check the value is get updated or not
    try{
        assert.strictEqual(actualVal,value);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Goal_NotUpdated.png');
        assert.fail('The goal is not getting updated by the provided \''+value+'\' number of deal. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'Goal_NotUpdated.png\'.');
    }

    console.log('The goal is get updated by the provided \''+value+'\' number of deal...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Won Deals widget should get added on the default dashboard', async () =>{
    //will find and click on the old dashboard menu button
    const dashboard = await dashboardPageElementObj.findOldDashboardMenuBtn(driver);
    await driver.executeScript("arguments[0].click()",dashboard);
    await driver.sleep(2000);

    //will check the won deals widget is getting displayed or not
    try{
        const wonDealsWidget = await wonDealsPageElementObj.findWonDealsWidget(driver,screenshotPath);
        await driver.executeScript("arguments[0].scrollIntoView()",wonDealsWidget);
        await driver.sleep(2000);
    }catch(err){
        assert.fail(err);
    }

    console.log('The Won Deals widget is getting displayed on the dashboard...')
});

Then('the system should display dynamic module name on the Won Deals - Goal Management app', async () =>{
    //will get the app displayed name
    const wonDealAppNameLabelElem = await wonDealsPageElementObj.findWonDealAppNameLabel(driver,screenshotPath);
    await driver.executeScript("arguments[0].scrollIntoView()",wonDealAppNameLabelElem);
    const wonDealAppNameLabel = await wonDealAppNameLabelElem.getText();

    //will check the dynamic module name is getting displayed or not
    try{
        assert(wonDealAppNameLabel.includes(expectedDealPluralName));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DynamicModuleName_'+expectedDealPluralName+'_NotDisplayed.png');
        assert.fail('The dynamic module name '+expectedDealPluralName+' is not getting displayed on the app name. Error: \''+err+'\' Screenshot Name: \''+screenshotPath+'DynamicModuleName_'+expectedDealPluralName+'_NotDisplayed.png\'.');
    }

    console.log('The dynamic module name \''+expectedDealPluralName+'\' is getting displayed on the Won Deals - Goal Management app...');
});
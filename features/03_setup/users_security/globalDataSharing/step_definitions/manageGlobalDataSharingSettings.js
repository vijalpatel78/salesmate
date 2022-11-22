const {Given,When,Then} = require('@cucumber/cucumber');
const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/03_setup/users_security/globalDataSharing/screenshots/';

let expectedDealDataSharingValue = 'no', expectedActivityDataSharingValue = 'no', expectedContactDataSharingValue = 'no', expectedCompanyDataSharingValue = 'no';
let expectedContactSingularName, expectedCompanySingularName, expectedDealSingularName, expectedActivitySingularName;
let actualNameList = [];

Given('the {string} is on global data sharing policies page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currectPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currectPageURL.includes('app/setup/security/datasharing')){
        console.log('The global data sharing policies page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open global data sharing policies page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on global data sharing policies page');
        //will open the global data sharing policies page
        await actionObj.openGlobalDataSharingPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open global data sharing policies page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on global data sharing policies page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on global data sharing policies page');
        //will open the global data sharing policies page
        await actionObj.openGlobalDataSharingPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the global data sharing policies page
        await actionObj.openGlobalDataSharingPage(driver,screenshotPath);  
    }
});

When('the user select {string} global data sharing policies for the {string} module', async (value,module) =>{
    const moduleName = module.toLowerCase();

     //will find the data sharing dropdown of the respective module and then select the provided value
     try{
        if(moduleName == 'deal'){
            expectedDealDataSharingValue = value;
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'4_selectField',value,'no');
        }else if(moduleName == 'activity'){
            expectedActivityDataSharingValue = value;
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'2_selectField',value,'no');
        }else if(moduleName == 'contact'){
            expectedContactDataSharingValue = value;
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'1_selectField',value,'no');
        }else if(moduleName == 'company'){
            expectedCompanyDataSharingValue = value;
            await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'5_selectField',value,'no');
        }else{
            assert.fail('The provided \''+module+'\' module name is not valid. Expected Module Name ---> \'Contact\', \'Deal\', \'Company\' OR \'Activity\'.');
        }
    }catch(err){
        await actionObj.comeBackToGlobalDataSharingPoliciesPage(driver,screenshotPath);
        assert.fail(err);
    }
});

When('the user goes on the Setup> System Modules page and verifies the singular module name', async () =>{
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'System Modules' tab 
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');

    //will check the 'System Modules' tab is visible or not
    if(systemModulesTab.length > 0){
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
    }else{
        /* As 'System Modules' tab is not visible to the logged-in user, it will do Admin login on the same browser */
        
        let adminUserNumber = '';

        //will get the Admin user details from the xlsx file 
        const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.profile[i].toLowerCase() == 'admin'){
                adminUserNumber = userDetails.user[i];
            }
        }
        //will check whether the Admin user found or not from the excel file
        if(adminUserNumber == ''){
            await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
        }

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the user goes on the Setup> System Modules page and verifies the singular module name');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the user goes on the Setup> System Modules page and verifies the singular module name');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'System Modules' tab 
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
    }
    await driver.sleep(1000);
    await driver.wait(until.urlContains('app/setup/customization/modules'),10000);

    //will get the singular name of the 06_contact module
    expectedContactSingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Contact');
    //will get the singular name of the company module
    expectedCompanySingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Company');
    //will get the singular name of the deal module
    expectedDealSingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Deal');
    //will get the singular name of the activity module
    expectedActivitySingularName = await actionObj.getSingularModuleName(driver,screenshotPath,'Activity');
});

When('the user goes on the Setup> Global Data Sharing Policies page and verifies the dropdown name', async () =>{
    //will open the global data sharing policies page
    await actionObj.openGlobalDataSharingPage(driver,screenshotPath); 
    //will wait till element gets visible
    await driver.sleep(2000);
    const elem = await driver.findElement(By.xpath('//tr[1]/td[1]'));
    await driver.wait(until.elementIsVisible(elem));
    //will find all dropdown name element
    const dropdownNameElem = await driver.findElements(By.xpath('//tr/td[1]'));
    for(let i=0; i<dropdownNameElem.length; i++){
        //will get actual dropdown name 
        actualNameList.push(await dropdownNameElem[i].getText());
    }
    await driver.sleep(1000);
});

Then('the global data sharing policies should get set for {string} module', async (module) =>{
    let fieldName;

    //will find notification message after updating settings
    const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Updated successfully.');
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after updating the settings, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'');
    }

    //will navigate on another page and come back to the global data sharing policies page after updating data
    await actionObj.comeBackToGlobalDataSharingPoliciesPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will check the global data sharing policies data get updated or not
    try{
        if(expectedDealDataSharingValue != 'no'){
            fieldName = 'DealDataSharing';
            const dealDataSharingDropdown = await formElementObj.findDropdown(driver,screenshotPath,'4_selectField');
            const actualDealDataSharingValue = await dealDataSharingDropdown.getText();
            assert.strictEqual(actualDealDataSharingValue,expectedDealDataSharingValue);
        }
        if(expectedActivityDataSharingValue != 'no'){
            fieldName = 'ActivityDataSharing';
            const activityDataSharingDropdown = await formElementObj.findDropdown(driver,screenshotPath,'2_selectField');
            const actualActivityDataSharingValue = await activityDataSharingDropdown.getText();
            assert.strictEqual(actualActivityDataSharingValue,expectedActivityDataSharingValue);
        }
        if(expectedContactDataSharingValue != 'no'){
            fieldName = 'ContactDataSharing';
            const contactDataSharingDropdown = await formElementObj.findDropdown(driver,screenshotPath,'1_selectField');
            const actualContactDataSharingValue = await contactDataSharingDropdown.getText();
            assert.strictEqual(actualContactDataSharingValue,expectedContactDataSharingValue);
        }
        if(expectedCompanyDataSharingValue != 'no'){
            fieldName = 'CompanyDataSharing';
            const companyDataSharingDropdown = await formElementObj.findDropdown(driver,screenshotPath,'5_selectField');
            const actualCompanyDataSharingValue = await companyDataSharingDropdown.getText();
            assert.strictEqual(actualCompanyDataSharingValue,expectedCompanyDataSharingValue);
        }
    }catch(err){
        expectedDealDataSharingValue = 'no', expectedActivityDataSharingValue = 'no', expectedContactDataSharingValue = 'no', expectedCompanyDataSharingValue = 'no';
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'DropdownData_NotUpdated.png'); 
        assert.fail('Due to the \''+fieldName+'\' dropdown data is not get updated, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'DropdownData_NotUpdated.png\'');
    }
    expectedDealDataSharingValue = 'no', expectedActivityDataSharingValue = 'no', expectedContactDataSharingValue = 'no', expectedCompanyDataSharingValue = 'no';

    console.log('\'Set global data sharing policies for '+module.toLowerCase()+' module(s)\' case has been passed successfully...');
});

Then('the system should display a singular module name as the dropdown name', async () =>{
    let dropdownName;

    //will compare the dropdown name against the singular module name
    try{
        dropdownName = 'Contact';
        assert(actualNameList.includes(expectedContactSingularName));
        dropdownName = 'Company';
        assert(actualNameList.includes(expectedCompanySingularName));
        dropdownName = 'Activity';
        assert(actualNameList.includes(expectedActivitySingularName));
        dropdownName = 'Deal';
        assert(actualNameList.includes(expectedDealSingularName));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+dropdownName+'_SingularModuleName_NotUsed.png'); 
        assert.fail('Due to the singular module name is not used for the \''+dropdownName+'\' dropdown, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+dropdownName+'_SingularModuleName_NotUsed.png\'.');
    }

    console.log('\'Check singular module name as the dropdown name\' case has been passed successfully...');
});
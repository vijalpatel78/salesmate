const {Given,When,Then} = require('@cucumber/cucumber');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const callingConfigPageElementObj = require('../common/callingConfigPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath ='./features/03_setup/customizations/callingConfig/screenshots/';

let expectedProviderName, expectedSyntax, expectedNoOfConfigurations;

Given('the {string} is on calling configurations page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/customization/calling-config')){
        console.log('The calling config page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open calling config page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on calling configurations page');
        //will open the calling configurations page
        await actionObj.openCallingConfigPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open calling config page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on calling configurations page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on calling configurations page');
        //will open the calling configurations page
        await actionObj.openCallingConfigPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the calling configurations page
        await actionObj.openCallingConfigPage(driver,screenshotPath);  
    }
});

When('the user enters Provider: {string}', async (providerName) =>{
    expectedProviderName = providerName;

    //will check the how many calling configurations are set
    const noOfProviderTextbox = await callingConfigPageElementObj.findProviderTextbox(driver);
    if(noOfProviderTextbox.length == 1){
        //will check the data exist in first calling configuration or not
        if(await noOfProviderTextbox[0].getAttribute('value') != ''){
            /* As the data exist in the first calling configuration row, will add another configuration row */

            //will click on the 'Add' button
            const addBtn = await callingConfigPageElementObj.findAddBtn(driver,screenshotPath);
            await addBtn.click();
            await driver.sleep(1000);
            //will find lastly added provider textbox
            const providerTextbox = await callingConfigPageElementObj.findProviderTextbox(driver);
            await clearFieldDataObj.clearFieldData(providerTextbox[providerTextbox.length-1]);
            //will pass the data in lastly added provider textbox
            await providerTextbox[providerTextbox.length-1].sendKeys(providerName);
        }else{
            /* As any calling configuration is not found, will add data in the first configuration row */

            //will pass the data in first provider textbox
            await clearFieldDataObj.clearFieldData(noOfProviderTextbox[0]);
            await noOfProviderTextbox[0].sendKeys(providerName);
        }
    }else if(noOfProviderTextbox.length > 1){
        /* As multiple calling configurations are not found, will add another configuration row */

        //will click on the 'Add' button
        const addBtn = await callingConfigPageElementObj.findAddBtn(driver,screenshotPath);
        await addBtn.click();
        await driver.sleep(1000);
        //will find lastly added provider textbox
        const providerTextbox = await callingConfigPageElementObj.findProviderTextbox(driver);
        await clearFieldDataObj.clearFieldData(providerTextbox[providerTextbox.length-1]);
        //will pass the data in lastly added provider textbox
        await providerTextbox[providerTextbox.length-1].sendKeys(providerName);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProviderTextbox_NotFound.png');
        assert.fail('Due to the provider textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ProviderTextbox_NotFound.png\'.');
    }
});

When('enter Syntax: {string}', async (syntax) =>{
    expectedSyntax = syntax;

    //will check the how many calling configurations are set
    const noOfSyntaxTextbox = await callingConfigPageElementObj.findSyntaxTextbox(driver);
    if(noOfSyntaxTextbox.length == 1){
        //will check the data exist in first calling configuration or not
        if(await noOfSyntaxTextbox[0].getAttribute('value') != ''){
            /* As the data exist in the first calling configuration row, will add another configuration row */

            //will click on the 'Add' button
            const addBtn = await callingConfigPageElementObj.findAddBtn(driver,screenshotPath);
            await addBtn.click();
            await driver.sleep(1000);
            //will find lastly added syntax textbox
            const syntaxTextbox = await callingConfigPageElementObj.findSyntaxTextbox(driver);
            await clearFieldDataObj.clearFieldData(syntaxTextbox[syntaxTextbox.length-1]);
            //will pass the data in lastly added syntax textbox
            await syntaxTextbox[syntaxTextbox.length-1].sendKeys(syntax);
        }else{
            /* As any calling configuration is not found, will add data in the first configuration row */

            //will pass the data in first syntax textbox
            await clearFieldDataObj.clearFieldData(noOfSyntaxTextbox[0]);
            await noOfSyntaxTextbox[0].sendKeys(syntax);
        }
    }else if(noOfSyntaxTextbox.length > 1){
        /* As multiple calling configurations are not found, will add another configuration row */

        //will click on the 'Add' button
        const addBtn = await callingConfigPageElementObj.findAddBtn(driver,screenshotPath);
        await addBtn.click();
        await driver.sleep(1000);
        //will find lastly added syntax textbox
        const syntaxTextbox = await callingConfigPageElementObj.findSyntaxTextbox(driver);
        await clearFieldDataObj.clearFieldData(syntaxTextbox[syntaxTextbox.length-1]);
        //will pass the data in lastly added syntax textbox
        await syntaxTextbox[syntaxTextbox.length-1].sendKeys(syntax);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SyntaxTextbox_NotFound.png');
        assert.fail('Due to the syntax textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SyntaxTextbox_NotFound.png\'.');
    }
});

When('the user updates Provider: {string}', async (providerName) =>{
    expectedProviderName = providerName;

    //will check the how many calling configurations are set
    const noOfProviderTextbox = await callingConfigPageElementObj.findProviderTextbox(driver);
    if(noOfProviderTextbox.length == 1){
        //will clear the first provider textbox
        await clearFieldDataObj.clearFieldData(noOfProviderTextbox[0]);
        //will pass the data in first provider textbox
        await noOfProviderTextbox[0].sendKeys(providerName);
    }else if(noOfProviderTextbox.length > 1){
        //will clear the last provider textbox
        await clearFieldDataObj.clearFieldData(noOfProviderTextbox[noOfProviderTextbox.length-1]);
        //will pass the data in last provider textbox
        await noOfProviderTextbox[noOfProviderTextbox.length-1].sendKeys(providerName);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProviderTextbox_NotFound.png');
        assert.fail('Due to the provider textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ProviderTextbox_NotFound.png\'.');
    }
});

When('update Syntax: {string}', async (syntax) =>{
    expectedSyntax = syntax;

    //will check the how many calling configurations are set
    const noOfSyntaxTextbox = await callingConfigPageElementObj.findSyntaxTextbox(driver);
    if(noOfSyntaxTextbox.length == 1){
        //will clear the first syntax textbox
        await clearFieldDataObj.clearFieldData(noOfSyntaxTextbox[0]);
        //will pass the data in first syntax textbox
        await noOfSyntaxTextbox[0].sendKeys(syntax);
    }else if(noOfSyntaxTextbox.length > 1){
        //will clear the last syntax textbox
        await clearFieldDataObj.clearFieldData(noOfSyntaxTextbox[noOfSyntaxTextbox.length-1]);
        //will pass the data in last syntax textbox
        await noOfSyntaxTextbox[noOfSyntaxTextbox.length-1].sendKeys(syntax);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SyntaxTextbox_NotFound.png');
        assert.fail('Due to the syntax textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SyntaxTextbox_NotFound.png\'.');
    }
});

When('the user clicks on the Remove button', async () =>{
    const noOfRemoveBtn = await callingConfigPageElementObj.findRemoveBtn(driver);
    expectedNoOfConfigurations = noOfRemoveBtn.length;

    //will check how many configurations are available
    if(noOfRemoveBtn.length == 1){
        //will remove the first configuration
        await noOfRemoveBtn[0].click();
    }else if(noOfRemoveBtn.length > 1){
        //will remove the last configuration
        await noOfRemoveBtn[noOfRemoveBtn.length-1].click();
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RemoveBtn_NotFound.png');
        assert.fail('Due to the remove button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RemoveBtn_NotFound.png\'.');
    }
    await driver.sleep(1000);
});

Then('the calling configurations should get updated with {string} message', async (successMessage) =>{
    let actualProviderName, actualSyntax;

    //will find notification message
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,successMessage);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after performing an action, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
    //will navigate on the another page and then come back to the calling configurations page
    await actionObj.comeBackToCallingConfigurationsPage(driver,screenshotPath);
    await driver.sleep(2000);

    //will get the actual value of newly aded calling config
    const noOfProviderTextbox = await callingConfigPageElementObj.findProviderTextbox(driver);
    const noOfSyntaxTextbox = await callingConfigPageElementObj.findSyntaxTextbox(driver);
    if(noOfProviderTextbox.length == 1){
        actualProviderName = await noOfProviderTextbox[0].getAttribute('value');
        actualSyntax = await noOfSyntaxTextbox[0].getAttribute('value');
    }else if(noOfProviderTextbox.length > 1){
        actualProviderName = await noOfProviderTextbox[noOfProviderTextbox.length-1].getAttribute('value');
        actualSyntax = await noOfSyntaxTextbox[noOfSyntaxTextbox.length-1].getAttribute('value');
    }
    //will check the new calling config is set with provided details or not
    try{
        assert.strictEqual(actualProviderName,expectedProviderName);
        assert.strictEqual(actualSyntax,expectedSyntax);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NewCallingConfig_NotSet.png'); 
        assert.fail('Due to the new calling config is not set with the provided details, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'NewCallingConfig_NotSet.png\'.');
    }

    console.log('The calling config has been updated successfully...');
});

Then('the system should give {string} validation for the Provider field and {string} validation for the Syntax field', async (providerValidation,syntaxValidation) =>{
    let actualProviderValidation, actualSyntaxValidation;

    //will get the actual validation message of provider and syntax fields
    const noOfProviderTextbox = await callingConfigPageElementObj.findProviderTextbox(driver);
    const noOfSyntaxTextbox = await callingConfigPageElementObj.findSyntaxTextbox(driver);
    if(noOfProviderTextbox.length == 1){
        const providerValidationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,noOfProviderTextbox[0]);
        actualProviderValidation = await providerValidationElem.getText();
        const syntaxValidationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,noOfSyntaxTextbox[0]);
        actualSyntaxValidation = await syntaxValidationElem.getText();
    }else if(noOfProviderTextbox.length > 1){
        const providerValidationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,noOfProviderTextbox[noOfProviderTextbox.length-1]);
        actualProviderValidation = await providerValidationElem.getText();
        const syntaxValidationElem = await commonElementObj.findFieldValidationElement(driver,screenshotPath,noOfSyntaxTextbox[noOfSyntaxTextbox.length-1]);
        actualSyntaxValidation = await syntaxValidationElem.getText();
    }

    //will check the field validation message is as per the expected or not
    try{
        assert.strictEqual(actualProviderValidation,providerValidation);
        assert.strictEqual(actualSyntaxValidation,syntaxValidation);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FieldValidation_NotCorrect.png'); 
        assert.fail('Due to the field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'FieldValidation_NotCorrect.png\'.');
    }
    //will reset the settings by clicking on the Remove button
    const removeBtn = await callingConfigPageElementObj.findRemoveBtn(driver);
    await removeBtn[removeBtn.length-1].click();
    
    console.log('On leaving required fields as blank, the field validation messages are getting displayed...');
});

Then('the system should remove calling configuration settings', async () =>{
    //will find notification message
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
       assert.strictEqual(notyMessageText,'Calling Configurations updated successfully');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after performing an action, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
    //will navigate on the another page and then come back to the calling configurations page
    await actionObj.comeBackToCallingConfigurationsPage(driver,screenshotPath);
    await driver.sleep(2000);

    //will check how many configurations are available
    if(expectedNoOfConfigurations == 1){
        /* As only one calling configuration exists, will check the data from the first calling config row is get removed or not */

        //will get the actual data from the first calling config row
        const noOfProviderTextbox = await callingConfigPageElementObj.findProviderTextbox(driver);
        const actualProviderName = await noOfProviderTextbox[0].getAttribute('value');
        const noOfSyntaxTextbox = await callingConfigPageElementObj.findSyntaxTextbox(driver);
        const actualSyntax = await noOfSyntaxTextbox[0].getAttribute('value');

        //will check that the data is get removed or not
        try{
            assert.strictEqual(actualProviderName,'');
            assert.strictEqual(actualSyntax,'');
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'CallingConfig_NotRemoved.png');
            assert.fail('Due to the calling configuration is not get removed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'CallingConfig_NotRemoved.png\'.');
        }
    }else if(expectedNoOfConfigurations > 1){ 
        /* As multiple calling configurations exist, will check the last calling config row is get removed or not */

        //will get the actual number of calling configs
        const configuration = await callingConfigPageElementObj.findRemoveBtn(driver);
        const actualNoOfConfigurations = configuration.length;

        //will check the last calling config row is get removed or not by comparing the number of configurations
        try{
            assert.strictEqual(actualNoOfConfigurations,expectedNoOfConfigurations-1);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'CallingConfig_NotRemoved.png');
            assert.fail('Due to the calling configuration is not get removed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'CallingConfig_NotRemoved.png\'.');
        }
    }

    console.log('The calling configuration setting has been removed...');
});
const {Given,When,Then} = require('@cucumber/cucumber');
const {By} = require('selenium-webdriver');
const assert = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const organizationDetailsPageElementObj = require('../common/organizationDetailsPageElements');
const currenciesPageElementObj = require('../../currencies/common/currenciesPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const emailSignatureActionObj = require('../../../../04_myAccount/generalSettings/common/actions')
const openCurrenciesPageObj = require('../../currencies/common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/account_management/organizationDetails/screenshots/';

let expectedName='no', expectedOrganizationCode='no', expectedCorporateIdentityNo='no', expectedPhone='no', expectedEmail='no', expectedFax='no',
expectedWebsite='no', expectedAddress1='no', expectedAddress2='no', expectedArea='no', expectedCity='no', expectedState='no', expectedZipcode='no', 
expectedCountry='no', expectedTimezone='no', expectedCurrency='no', expectedCurrencyFormat='no', expectedDisclaimer='no', expectedActiveCurrencies = [];

Given('the {string} is on organization details page', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/company/profile')){
        console.log('The organization details page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open organization details page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on organization details page');
        //will open the organization details page
        await actionObj.openOrganizationDetailsPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open organization details page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on organization details page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on organization details page');
        //will open the organization details page
        await actionObj.openOrganizationDetailsPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will open the organization details page
        await actionObj.openOrganizationDetailsPage(driver,screenshotPath);  
    }
});

When('the user update organization details with the following valid data:', async (dataTable) =>{
    try{
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++){
            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if(fieldName == 'name'){
                expectedName = dataTable.rawTable[i][1];
                //will check the data for the required name field is given or not
                if(expectedName == ''){
                    await assert.fail('Due to the blank value is provided for the required Name field, the test case execution has been aborted');
                }
                //will find 'Name' field and pass the new data
                const NameField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'name');
                await clearFieldDataObj.clearFieldData(NameField);
                await NameField.sendKeys(expectedName);
            }else if(fieldName == 'organization code'){
                expectedOrganizationCode = dataTable.rawTable[i][1];
                //will check the provided data is valid to execute test case or not
                if(expectedOrganizationCode == ''){
                    await assert.fail('Due to the blank value is provided for the required Organization Code field, the test case execution has been aborted');
                }else if(expectedOrganizationCode.length > 5){
                    await assert.fail('Due to the more than 5 chars are provided for the Organization Code field, the test case execution has been aborted');
                }
                //will find 'Organization Code' field and pass the new data
                const organizationCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'code');
                await clearFieldDataObj.clearFieldData(organizationCodeField);
                await organizationCodeField.sendKeys(expectedOrganizationCode);
            }else if(fieldName == 'corporate identity no.'){
                expectedCorporateIdentityNo = dataTable.rawTable[i][1];
                //will check the provided data is valid to execute test case or not
                if(expectedCorporateIdentityNo.length > 21){
                    await assert.fail('Due to the more than 21 chars are provided for the Corporate Identity No field, the test case execution has been aborted');
                }
                //will find 'Corporate Identity No' field and pass the new data
                const corporateIdentityNoField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'cin');
                await clearFieldDataObj.clearFieldData(corporateIdentityNoField);
                await corporateIdentityNoField.sendKeys(expectedCorporateIdentityNo);
            }else if(fieldName == 'phone'){
                expectedPhone = dataTable.rawTable[i][1];
                //will find 'Phone' field and pass the new data
                const phoneField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'phone');
                await clearFieldDataObj.clearFieldData(phoneField);
                await phoneField.sendKeys(expectedPhone);
            }else if(fieldName == 'email'){
                expectedEmail = dataTable.rawTable[i][1];
                //will check the data for the required email field is given or not
                if(expectedEmail == ''){
                    await assert.fail('Due to the blank value is provided for the required Email field, the test case execution has been aborted');
                }
                //will find 'Email' field and pass the new data
                const emailField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'email');
                await clearFieldDataObj.clearFieldData(emailField);
                await emailField.sendKeys(expectedEmail);
            }else if(fieldName == 'fax'){
                expectedFax = dataTable.rawTable[i][1];
                //will find 'Fax' field and pass the new data
                const faxField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'fax');
                await clearFieldDataObj.clearFieldData(faxField);
                await faxField.sendKeys(expectedFax);
            }else if(fieldName == 'website'){
                expectedWebsite = dataTable.rawTable[i][1];
                //will find 'Website' field and pass the new data
                const websiteField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'website');
                await clearFieldDataObj.clearFieldData(websiteField);
                await websiteField.sendKeys(expectedWebsite);
            }else if(fieldName == 'address line 1'){
                expectedAddress1 = dataTable.rawTable[i][1];
                //will find 'Address Line 1' field and pass the new data
                const address1Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine1');
                await clearFieldDataObj.clearFieldData(address1Field);
                await address1Field.sendKeys(expectedAddress1);
            }else if(fieldName == 'address line 2'){
                expectedAddress2 = dataTable.rawTable[i][1];
                //will find 'Address Line 2' field and pass the new data
                const address2Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine2');
                await clearFieldDataObj.clearFieldData(address2Field);
                await address2Field.sendKeys(expectedAddress2);
            }else if(fieldName == 'area'){
                expectedArea = dataTable.rawTable[i][1];
                //will find 'Area' field and pass the new data
                const areaField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'area');
                await clearFieldDataObj.clearFieldData(areaField);
                await areaField.sendKeys(expectedArea);
            }else if(fieldName == 'city'){
                expectedCity = dataTable.rawTable[i][1];
                //will find 'City' field and pass the new data
                const cityField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'city');
                await clearFieldDataObj.clearFieldData(cityField);
                await cityField.sendKeys(expectedCity);
            }else if(fieldName == 'state'){
                expectedState = dataTable.rawTable[i][1];
                //will find 'State' field and pass the new data
                const stateField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'state');
                await clearFieldDataObj.clearFieldData(stateField);
                await stateField.sendKeys(expectedState);
            }else if(fieldName == 'zip code'){
                expectedZipcode = dataTable.rawTable[i][1];
                //will find 'ZipCode' field and pass the new data
                const zipCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'zipCode');
                await clearFieldDataObj.clearFieldData(zipCodeField);
                await zipCodeField.sendKeys(expectedZipcode);
            }else if(fieldName == 'country'){
                expectedCountry = dataTable.rawTable[i][1];
                //will check the data for the required country field is given or not
                if(expectedCountry == ''){
                    await assert.fail('Due to the blank value is provided for the required country field, the test case execution has been aborted');
                }
                //will select the provided new dropdown value from the 'Country' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'country',expectedCountry,'yes');            
            }else if(fieldName == 'time zone'){ 
                expectedTimezone = dataTable.rawTable[i][1];
                //will check that the data for the required timezone field is given or not
                if(expectedTimezone == ''){
                    await assert.fail('Due to the blank value is provided for the required timezone field, the test case execution has been aborted');
                }
                //will select the provided new dropdown value from the 'Timezone' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'timezone',expectedTimezone,'yes');            
            }else if(fieldName == 'default currency'){
                expectedCurrency = dataTable.rawTable[i][1];
                //will check that the data for the required currency field is given or not
                if(expectedCurrency == ''){
                    await assert.fail('Due to the blank value is provided for the required currency field, the test case execution has been aborted');
                }
                //will select the provided new dropdown value from the 'Currency' dropdown list
                await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'currencyDisplay',expectedCurrency,'no');            
            }else if(fieldName == 'currency format'){
                expectedCurrencyFormat = dataTable.rawTable[i][1];
                //will find 'Currency Format' field and pass the new data
                const currencyFormatField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
                await clearFieldDataObj.clearFieldData(currencyFormatField);
                await currencyFormatField.sendKeys(expectedCurrencyFormat);
            }else if(fieldName == 'disclaimer'){
                expectedDisclaimer = dataTable.rawTable[i][1];
                //will find disclaimer iFrame and then change focus on that
                const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
                await driver.switchTo().frame(disclaimeriFrame);
                //will find 'Disclaimer' field and pass the data
                const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);
                await disclaimerField.clear();
                await disclaimerField.sendKeys(expectedDisclaimer);
                //will switch back to the main page
                await driver.switchTo().defaultContent();
            }else{
                await assert.fail('Due to the provided \''+dataTable.rawTable[i][0]+'\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Name, Organization Code, Corporate Identity No., Phone, Email, Fax, Website, Address Line 1, Address Line 2, Area, City, State, Zip Code, Country, Time Zone, Default Currency, Currency Format and Disclaimer fields only');
            }
        }
        //will check whether the test data for all test fields is given or not
        if(expectedName=='no'||expectedOrganizationCode=='no'||expectedCorporateIdentityNo=='no'||expectedPhone=='no'||expectedEmail=='no'||expectedFax=='no'||expectedWebsite=='no'||expectedAddress1=='no'||expectedAddress2=='no'||expectedArea=='no'||expectedCity=='no'||expectedState=='no'||expectedZipcode=='no'||expectedCountry=='no'||expectedTimezone=='no'||expectedCurrency=='no'||expectedCurrencyFormat=='no'||expectedDisclaimer=='no'){
            await assert.fail('Due to the some test field\'s data is not provided, the test case execution has been aborted. Expected test data for these test fields ---> Name, Organization Code, Corporate Identity No., Phone, Email, Fax, Website, Address Line 1, Address Line 2, Area, City, State, Zip Code, Country, Time Zone, Default Currency, Currency Format and Disclaimer fields');
        }
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }  
}); 

When('the user doesn\'t enter any value to the optional field', async () =>{
    try{
        //will find 'Corporate Identity No' field and remove the data
        const corporateIdentityNoField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'cin');
        await clearFieldDataObj.clearFieldData(corporateIdentityNoField);
        //will find 'Phone' field and remove the data
        const phoneField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'phone');
        await clearFieldDataObj.clearFieldData(phoneField);
        //will find 'Fax' field and remove the data
        const faxField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'fax');
        await clearFieldDataObj.clearFieldData(faxField);
        //will find 'Website' field and remove the data
        const websiteField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'website');
        await clearFieldDataObj.clearFieldData(websiteField);
        //will find 'Address Line 1' field and remove the data
        const address1Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine1');
        await clearFieldDataObj.clearFieldData(address1Field);
        //will find 'Address Line 2' field and remove the data
        const address2Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine2');
        await clearFieldDataObj.clearFieldData(address2Field);
        //will find 'Area' field and remove the data
        const areaField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'area');
        await clearFieldDataObj.clearFieldData(areaField);
        //will find 'City' field and remove the data
        const cityField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'city');
        await clearFieldDataObj.clearFieldData(cityField);
        //will find 'State' field and remove the data
        const stateField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'state');
        await clearFieldDataObj.clearFieldData(stateField);
        //will find 'ZipCode' field and remove the data
        const zipCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'zipCode');
        await clearFieldDataObj.clearFieldData(zipCodeField);
        //will find 'Currency Format' field and remove the data
        const currencyFormatField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
        await clearFieldDataObj.clearFieldData(currencyFormatField);
        //will find disclaimer iFrame and then change focus on that
        const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
        await driver.switchTo().frame(disclaimeriFrame);
        //will find 'Disclaimer' field and remove the data
        const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);
        await disclaimerField.clear();
        //will switch back to the main page
        await driver.switchTo().defaultContent();
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }
});

When('the user enter {string} data in the {string} field', async (invalidData,emailField) =>{
    try{
        //will find 'Email' field 
        const emailField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'email');
        //will get current field value for the later comparison
        expectedEmail = await emailField.getAttribute('value')
        //will pass the new data
        await clearFieldDataObj.clearFieldData(emailField);
        await emailField.sendKeys(invalidData);
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }
});

When('the user doesn\'t enter any value to the required {string} field', async (fieldName) =>{
    try{    
        if(fieldName.toLowerCase() == 'name'){
            //will find 'Name' field 
            const NameField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'name');
            //will get current field value for the later comparison
            expectedName = await NameField.getAttribute('value')
            //will remove field data
            await clearFieldDataObj.clearFieldData(NameField);
        }else if(fieldName.toLowerCase() == 'organization code'){
            //will find 'Organization Code' field 
            const organizationCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'code');
            //will get current field value for the later comparison
            expectedOrganizationCode = await organizationCodeField.getAttribute('value')
            //will remove field data
            await clearFieldDataObj.clearFieldData(organizationCodeField);
        }else if(fieldName.toLowerCase() == 'email'){
            //will find 'Email' field 
            const emailField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'email');
            //will get current field value for the later comparison
            expectedEmail = await emailField.getAttribute('value')
            //will remove field data
            await clearFieldDataObj.clearFieldData(emailField);
        }else{
            await assert.fail('Due to the provided \''+fieldName+'\' field name is not part of the test case, the test case execution has been aborted. Expected Test Case Field Name ---> Name, Organization Code or Email field only');
        }
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }    
});

When('the user enter more than {string} chars data in the {string} field', async (numberOfChars,fieldName) =>{
    const chars100 = 'Rapidops Inc. Reliance Industries Ltd. Indian Oil Corporation Ltd. Oil And Natural Gas Corporation Ltd.';
    const chars255 = '123/a series of usually alphanumeric characters that specifies the storage location (as on a network or in a computer memory) of particular information <html> <body> Cont ~`! @ # $%^ &* () _ -=+{ }[ ]\\|:;<>./?123SD</body> </html> usually alphanumeric CHARS';
    const number255 = '+(91) 12 234-56-123-1223, +(01) 12 234-89-123-1674, +(02) 12 3435-56-123-1223, +(91) 456 234-56-123-1223, +(01) 12 345-56-123-1223, +(91) 12 234-56-123-1223, +(91) 12 234-56-123-1223, +(91) 12 234-56-123-1223, +(91) 12 234-56-123-1223, +(02) 12 244-56-162-1223';
    const number15 = '523012, 529218, 238534';

    try{
        if(fieldName.toLowerCase() == 'name'){
            //will find 'Name' field 
            const nameField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'name');
            //will get current field value for the later comparison
            expectedName = await nameField.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(nameField);
            await nameField.sendKeys(chars100);
        }else if(fieldName.toLowerCase() == 'phone'){
            //will find 'Phone' field
            const phoneField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'phone');
            //will get current field value for the later comparison
            expectedPhone = await phoneField.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(phoneField);
            await phoneField.sendKeys(number255);
        }else if(fieldName.toLowerCase() == 'fax'){
            //will find 'Fax' field 
            const faxField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'fax');
            //will get current field value for the later comparison
            expectedFax = await faxField.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(faxField);
            await faxField.sendKeys(chars255);
        }else if(fieldName.toLowerCase() == 'address line 1'){
            //will find 'Address Line 1' field 
            const address1Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine1');
            //will get current field value for the later comparison
            expectedAddress1 = await address1Field.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(address1Field);
            await address1Field.sendKeys(chars255);
        }else if(fieldName.toLowerCase() == 'address line 2'){
            //will find 'Address Line 2' field 
            const address2Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine2');
            //will get current field value for the later comparison
            expectedAddress2 = await address2Field.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(address2Field);
            await address2Field.sendKeys(chars255);
        }else if(fieldName.toLowerCase() == 'area'){
            //will find 'Area' field 
            const areaField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'area');
            //will get current field value for the later comparison
            expectedArea = await areaField.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(areaField);
            await areaField.sendKeys(chars255);
        }else if(fieldName.toLowerCase() == 'city'){
            //will find 'City' field 
            const cityField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'city');
            //will get current field value for the later comparison
            expectedCity = await cityField.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(cityField);
            await cityField.sendKeys(chars255);
        }else if(fieldName.toLowerCase() == 'state'){
            //will find 'State' field 
            const stateField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'state');
            //will get current field value for the later comparison
            expectedState = await stateField.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(stateField);
            await stateField.sendKeys(chars255);
        }else if(fieldName.toLowerCase() == 'zip code'){
            //will find 'Zip Code' field 
            const zipCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'zipCode');
            //will get current field value for the later comparison
            expectedZipcode = await zipCodeField.getAttribute('value');
            //will pass the data
            await clearFieldDataObj.clearFieldData(zipCodeField);
            await zipCodeField.sendKeys(number15);
        }else{
            await assert.fail('Due to the provided \''+fieldName+'\' field name is not part of the test case, the test case execution has been aborted. Expected Test Case Field Name ---> Name, Phone, Fax, Address Line 1, Address Line 2, Area, City, State or Zip Code field only');
        }
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }    
});

When('the user {string} organization disclaimer', async (setORremoveDisclaimer) =>{
    //will make the organization disclaimer field visible on the screen
    await driver.sleep(2000);
    const setFocusOnDisclaimerField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
    await driver.sleep(1000);
    await setFocusOnDisclaimerField.sendKeys('');
    
    //will find disclaimer iFrame and then change focus on that
    const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
    await driver.switchTo().frame(disclaimeriFrame);
    //will find 'Disclaimer' field 
    const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);
    
    //will set or remove disclaimer
    if(setORremoveDisclaimer.toLowerCase() == 'set'){
        await disclaimerField.sendKeys('');
        await disclaimerField.clear();
        await driver.executeScript("arguments[0].innerHTML='<body class=\"fr-view\" dir=\"auto\" contenteditable=\"true\" style=\"min-height: 200px;\" aria-disabled=\"false\" spellcheck=\"true\"><p style=\"text-align: center;\"><span style=\"color: rgb(243, 121, 52);\"><strong><span style=\"font-family: Tahoma, Geneva, sans-serif; font-size: 14px;\"><span class=\"fr-marker\" data-id=\"0\" data-type=\"false\" style=\"display: none; line-height: 0;\">​</span><span class=\"fr-marker\" data-id=\"0\" data-type=\"true\" style=\"display: none; line-height: 0;\">​</span>© 2020 Rapidops Inc.</span></strong></span><span style=\"color: rgb(71, 85, 119); font-family: Tahoma, Geneva, sans-serif;\">&nbsp;</span></p></body>';",disclaimerField);
    }else if(setORremoveDisclaimer.toLowerCase() == 'remove'){
        await disclaimerField.sendKeys('');
        await disclaimerField.clear();
        await driver.executeScript("arguments[0].innerHTML='<body class=\"fr-view\" dir=\"auto\" contenteditable=\"true\" style=\"min-height: 200px;\" aria-disabled=\"false\" spellcheck=\"true\"><div><br></div></body>';",disclaimerField);
    }else{
        //will switch back to the main page before failing the test case
        await driver.switchTo().defaultContent();
        assert.fail('The provided \''+setORremoveDisclaimer+'\' value is not valid to execute test case. The value should be either \'set\' or \'remove\'.');
    }

    //will get HTML format of entered new disclaimer
    expectedDisclaimer = await driver.executeScript("return arguments[0].outerHTML;",disclaimerField);
    //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
    expectedDisclaimer = expectedDisclaimer.replace('<br>','');
    expectedDisclaimer = expectedDisclaimer.replace('<div>','');
    expectedDisclaimer = expectedDisclaimer.replace('</div>','');
    expectedDisclaimer = expectedDisclaimer.replace('fr-draggable','');
    expectedDisclaimer = expectedDisclaimer.replace(/ /g,'');
    expectedDisclaimer = expectedDisclaimer.replace(/[^\x20-\x7E]/g,'');
    expectedDisclaimer = expectedDisclaimer.replace(/ *\<span[^]*span\>*/g,'');
    //will switch back to the main page
    await driver.switchTo().defaultContent();
});

When('the user click on {string} option with {string} value and then enter {string} disclaimer', async (format,formatValue,disclaimerText) =>{     
    //will make the organization disclaimer field visible on the screen
    const formatOption = await driver.findElement(By.css('button[data-cmd="html"]'));
    await driver.executeScript("arguments[0].focus();",formatOption);
    await driver.sleep(1000);
    
    //will find 'Disclaimer' field and then clear that field data
    const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
    await driver.switchTo().frame(disclaimeriFrame);
    const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);
    await disclaimerField.clear();
    await driver.switchTo().defaultContent();

    //will click on the provided format option with the format value
    await emailSignatureActionObj.clickOnEmailSignatureFormatOption(driver,screenshotPath,format,formatValue,disclaimerText);
    
    await driver.switchTo().frame(disclaimeriFrame);

    //will enter provided disclaimer
    if(format.toLowerCase() != 'insert link' && format.toLowerCase() != 'undo' && format.toLowerCase() != 'redo'){
        await disclaimerField.sendKeys(disclaimerText);
    }
    
    //will get HTML format of newly entered disclaimer
    expectedDisclaimer = await driver.executeScript("return arguments[0].outerHTML;",disclaimerField);
    //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
    expectedDisclaimer = expectedDisclaimer.replace('<br>','');
    expectedDisclaimer = expectedDisclaimer.replace('<div>','');
    expectedDisclaimer = expectedDisclaimer.replace('</div>','');
    expectedDisclaimer = expectedDisclaimer.replace('fr-draggable','');
    expectedDisclaimer = expectedDisclaimer.replace(/ /g,'');
    expectedDisclaimer = expectedDisclaimer.replace(/[^\x20-\x7E]/g,'');
    expectedDisclaimer = expectedDisclaimer.replace(/ *\<span[^]*span\>*/g,'');
    
    await driver.switchTo().defaultContent();
});

When('the user enter Currency Format: {string}', async (formatPattern) =>{
    try{
        expectedCurrencyFormat = formatPattern;
        //will make the currency format field visible on the screen
        const currencyFormatField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
        await driver.executeScript("arguments[0].focus();",currencyFormatField);
        await currencyFormatField.sendKeys('');
        //will pass the new data
        await clearFieldDataObj.clearFieldData(currencyFormatField);
        await currencyFormatField.sendKeys(formatPattern);
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }    
});

When('the user goes on the Setup>Currencies page and get the active currencies list', async () =>{
    //will open currencies page
    await openCurrenciesPageObj.openCurrenciesPage(driver,screenshotPath);
    //will get the code list of active currencies
    expectedActiveCurrencies = await currenciesPageElementObj.getCurrencyCodeList(driver);
});

When('the user goes on the Setup>Organization Details page and open default currency dropdown list', async () =>{
    try{
        //will open the organization details page
        await actionObj.openOrganizationDetailsPage(driver,screenshotPath);  
        //will click on the default currency dropdown
        const defaultCurrencyDropdown = await formElementObj.findDropdown(driver,screenshotPath,'currencyDisplay');
        await defaultCurrencyDropdown.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }    
});

Then('the details of organization details should get updated', async () =>{   
    let fieldName;

    //will find notification message after updating organization details
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Updated successfully.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        assert.fail('Due to the success message is not given after updating the organization details, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'');
    }

    //will navigate on the another page and then come back to the organization details page
    await actionObj.comeBackToOrganizationDetailsPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will check whether all test fields data are get updated or not
    try{
        fieldName = 'Name';
        const NameField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'name');
        assert.strictEqual(await NameField.getAttribute('value'),expectedName);
        fieldName = 'OrganizationCode';
        const organizationCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'code');
        assert.strictEqual(await organizationCodeField.getAttribute('value'),expectedOrganizationCode);
        fieldName = 'CorporateIdentityNo';
        const corporateIdentityNoField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'cin');
        assert.strictEqual(await corporateIdentityNoField.getAttribute('value'),expectedCorporateIdentityNo);
        fieldName = 'Phone';
        const phoneField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'phone');
        assert.strictEqual(await phoneField.getAttribute('value'),expectedPhone);
        fieldName = 'Email';
        const emailField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'email');
        assert.strictEqual(await emailField.getAttribute('value'),expectedEmail);
        fieldName = 'Fax';
        const faxField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'fax');
        assert.strictEqual(await faxField.getAttribute('value'),expectedFax);
        fieldName = 'Website';
        const websiteField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'website');
        assert.strictEqual(await websiteField.getAttribute('value'),expectedWebsite);
        fieldName = 'AddressLine1';
        const address1Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine1');
        assert.strictEqual(await address1Field.getAttribute('value'),expectedAddress1);
        fieldName = 'AddressLine2';
        const address2Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine2');
        assert.strictEqual(await address2Field.getAttribute('value'),expectedAddress2);
        fieldName = 'Area';
        const areaField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'area');
        assert.strictEqual(await areaField.getAttribute('value'),expectedArea);
        fieldName = 'City';
        const cityField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'city');
        assert.strictEqual(await cityField.getAttribute('value'),expectedCity);
        fieldName = 'State';
        const stateField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'state');
        assert.strictEqual(await stateField.getAttribute('value'),expectedState);
        fieldName = 'Zipcode';
        const zipCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'zipCode');
        assert.strictEqual(await zipCodeField.getAttribute('value'),expectedZipcode);
        fieldName = 'Country';
        const countryDrpdwn = await formElementObj.findDropdown(driver,screenshotPath,'country');
        assert.strictEqual(await countryDrpdwn.getText(),expectedCountry);
        fieldName = 'Timezone';
        const timezoneDrpdwn = await formElementObj.findDropdown(driver,screenshotPath,'timezone');
        assert.strictEqual(await timezoneDrpdwn.getText(),expectedTimezone);
        fieldName = 'Currency';
        const currencyDrpdwn = await formElementObj.findDropdown(driver,screenshotPath,'currencyDisplay');
        assert.strictEqual(await currencyDrpdwn.getText(),expectedCurrency);
        fieldName = 'CurrencyFormat';
        const currencyFormatField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
        assert.strictEqual(await currencyFormatField.getAttribute('value'),expectedCurrencyFormat);
        fieldName = 'Disclaimer';
        const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
        await driver.switchTo().frame(disclaimeriFrame);
        const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);
        assert.strictEqual(await disclaimerField.getText(),expectedDisclaimer);
        await driver.switchTo().defaultContent();
    }
    catch(err){
        if(fieldName == 'Disclaimer'){
            await driver.switchTo().defaultContent();
        }
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'FieldData_NotUpdated.png'); 
        assert.fail('Due to the \''+fieldName+'\' field data is not get updated, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'FieldData_NotUpdated.png\'');
    }  

    console.log('\'Update organization details with valid data\' case has been passed successfully...');
});

Then('the organization details should get updated and the optional fields should be displayed as blank', async () =>{
    let fieldName;

    //will find notification message after updating organization details
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Updated successfully.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        assert.fail('Due to the success message is not given after updating the organization details, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'');
    }

    //will navigate on the another page and then come back to the organization details page
    await actionObj.comeBackToOrganizationDetailsPage(driver,screenshotPath);
    await driver.sleep(1000);

    //will check whether all optional fields are showing blank or not
    try{
        fieldName = 'CorporateIdentityNo';
        const corporateIdentityNoField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'cin');
        assert.strictEqual(await corporateIdentityNoField.getAttribute('value'),'');
        fieldName = 'Phone';
        const phoneField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'phone');
        assert.strictEqual(await phoneField.getAttribute('value'),'');
        fieldName = 'Fax';
        const faxField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'fax');
        assert.strictEqual(await faxField.getAttribute('value'),'');
        fieldName = 'Website';
        const websiteField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'website');
        assert.strictEqual(await websiteField.getAttribute('value'),'');
        fieldName = 'AddressLine1';
        const address1Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine1');
        assert.strictEqual(await address1Field.getAttribute('value'),'');
        fieldName = 'AddressLine2';
        const address2Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine2');
        assert.strictEqual(await address2Field.getAttribute('value'),'');
        fieldName = 'Area';
        const areaField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'area');
        assert.strictEqual(await areaField.getAttribute('value'),'');
        fieldName = 'City';
        const cityField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'city');
        assert.strictEqual(await cityField.getAttribute('value'),'');
        fieldName = 'State';
        const stateField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'state');
        assert.strictEqual(await stateField.getAttribute('value'),'');
        fieldName = 'Zipcode';
        const zipCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'zipCode');
        assert.strictEqual(await zipCodeField.getAttribute('value'),'');
        fieldName = 'CurrencyFormat';
        const currencyFormatField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
        assert.strictEqual(await currencyFormatField.getAttribute('value'),'');
        fieldName = 'Disclaimer';
        const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
        await driver.switchTo().frame(disclaimeriFrame);
        const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);
        assert.strictEqual(await disclaimerField.getText(),'');
        await driver.switchTo().defaultContent();
    }catch(err){
        if(fieldName == 'Disclaimer'){
            await driver.switchTo().defaultContent();
        }
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'FieldData_NotRemoved.png'); 
        assert.fail('Due to the \''+fieldName+'\' field data is not removed, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'FieldData_NotRemoved.png\'.');
    }

    console.log('\'Update organization details with leaving optional fields as blank\' case has been passed successfully...');
});

Then('the system should give {string} validation for the {string} field', async (expectedValidationMsg,fieldName) =>{
    let actualValidationMsg, fieldValidationElement;

    try{
        //will fetch currently displayed validation message
        if(fieldName.toLowerCase() == 'name'){
            const nameField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'name');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,nameField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'organization code'){
            const organizationCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'code');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,organizationCodeField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'email'){
            const emailField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'email');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,emailField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'phone'){
            const phoneField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'phone');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,phoneField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'fax'){
            const faxField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'fax');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,faxField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'address line 1'){
            const address1Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine1');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,address1Field);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'address line 2'){
            const address2Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine2');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,address2Field);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'area'){
            const areaField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'area');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,areaField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'city'){
            const cityField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'city');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,cityField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'state'){
            const stateField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'state');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,stateField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else if(fieldName.toLowerCase() == 'zip code'){
            const zipCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'zipCode');
            fieldValidationElement = await commonElementObj.findFieldValidationElement(driver,screenshotPath,zipCodeField);
            actualValidationMsg = await fieldValidationElement.getText();
        }else{
            await assert.fail('Due to the provided \''+fieldName+'\' field is not part of the test case, the test case execution has been aborted. Expected Test Case Field Name ---> Name, Organization Code, Email, Phone, Fax, Address Line 1, Address Line 2, Area, City, State or Zip Code field only.');
        }

        //will compare actual and expected validation message
        try{
            assert.strictEqual(actualValidationMsg,expectedValidationMsg);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName.replace(/\s/g,'_')+'_FieldValidationMsg_NotValid.png');
            await assert.fail('Due to the \''+fieldName+'\' field validation message is not as per the expectation, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName.replace(/\s/g,'_')+'_FieldValidationMsg_NotValid.png\'.');
        } 
    }catch(err){
        //will refresh the page on any error 
        await driver.navigate().refresh();
        assert.fail(err)
    }

    console.log('\'Check the \"'+expectedValidationMsg+'\" validation of \"'+fieldName+'\" field\' case has been passed successfully...');
});

Then('the test field details of the organization should not get updated in case of {string}', async (testcase) =>{
    let fieldName;

    //will navigate on the another page and then come back to the organization details page
    await actionObj.comeBackToOrganizationDetailsPage(driver,screenshotPath);
    
    //will find test fields
    const nameField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'name');
    const organizationCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'code');
    const emailField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'email');
    const phoneField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'phone');
    const faxField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'fax');
    const address1Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine1');
    const address2Field = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'addressLine2');
    const areaField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'area');
    const cityField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'city');
    const stateField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'state');
    const zipCodeField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'zipCode');
    await driver.sleep(2000);

    //will check that the data of test fields should not get updated
    try{
        if(testcase.toLowerCase() == 'required'){
            fieldName = 'Name';
            assert.strictEqual(await nameField.getAttribute('value'),expectedName);
            fieldName = 'OrganizationCode';
            assert.strictEqual(await organizationCodeField.getAttribute('value'),expectedOrganizationCode);
            fieldName = 'Email';
            assert.strictEqual(await emailField.getAttribute('value'),expectedEmail);
        }else if(testcase.toLowerCase() == 'invalid email format'){
            fieldName = 'Email';
            assert.strictEqual(await emailField.getAttribute('value'),expectedEmail);
        }else if(testcase.toLowerCase() == 'invalid data length'){
            fieldName = 'Name';
            assert.strictEqual(await nameField.getAttribute('value'),expectedName);
            fieldName = 'Phone';
            assert.strictEqual(await phoneField.getAttribute('value'),expectedPhone);
            fieldName = 'Fax';
            assert.strictEqual(await faxField.getAttribute('value'),expectedFax);
            fieldName = 'AddressLine1';
            assert.strictEqual(await address1Field.getAttribute('value'),expectedAddress1);
            fieldName = 'AddressLine2';
            assert.strictEqual(await address2Field.getAttribute('value'),expectedAddress2);
            fieldName = 'Area';
            assert.strictEqual(await areaField.getAttribute('value'),expectedArea);
            fieldName = 'City';
            assert.strictEqual(await cityField.getAttribute('value'),expectedCity);
            fieldName = 'State';
            assert.strictEqual(await stateField.getAttribute('value'),expectedState);
            fieldName = 'Zipcode';
            assert.strictEqual(await zipCodeField.getAttribute('value'),expectedZipcode);
        }else{
            assert.fail('The provided \''+testcase+'\' case name is not valid. Expected Case Name ---> \'Required, Invalid email format OR Invalid data length\'.')
        }
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'FieldData_Updated.png');
        assert.fail('Due to the \''+fieldName+'\' field data is get updated, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'FieldData_Updated.png\'');
    }  

    console.log('After checking the \"'+testcase.toLowerCase()+'\" test case, it is not creating an effect on the existing data of the test fields...');
});

Then('the organization disclaimer should get {string}', async (setORremoveDisclaimer) =>{
    let actualDisclaimer;

    //will find notification message
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Updated successfully.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after updating the organization details, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }

    //will navigate on the another page and then come back to the organization details page
    await actionObj.comeBackToOrganizationDetailsPage(driver,screenshotPath);
    await driver.sleep(2000);
    //will make the organization disclaimer field visible on the screen
    const setFocusOnDisclaimerField = await await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
    await driver.sleep(1000);
    await setFocusOnDisclaimerField.sendKeys('');
    
    //will find disclaimer iFrame and then change focus on that
    const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
    await driver.switchTo().frame(disclaimeriFrame);
    //will find 'Disclaimer' field and pass the data
    const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);    
    //will get HTML format of updated disclaimer 
    actualDisclaimer = await driver.executeScript("return arguments[0].outerHTML;",disclaimerField);
    //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
    actualDisclaimer = actualDisclaimer.replace('<br>','');
    actualDisclaimer = actualDisclaimer.replace('<div>','');
    actualDisclaimer = actualDisclaimer.replace('</div>','');
    actualDisclaimer = actualDisclaimer.replace('fr-draggable','');
    actualDisclaimer = actualDisclaimer.replace(/ /g,'');
    actualDisclaimer = actualDisclaimer.replace(/[^\x20-\x7E]/g,'');
    actualDisclaimer = actualDisclaimer.replace(/ *\<span[^]*span\>*/g,'');
    await disclaimerField.sendKeys('');
    //will switch back to the main page
    await driver.switchTo().defaultContent();

    //will compare HTML format of actual and expected disclaimer
    try{
        assert.strictEqual(actualDisclaimer,expectedDisclaimer); 
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Disclaimer_Not_'+setORremoveDisclaimer+'.png'); 
        assert.fail('Due to the disclaimer is not get '+setORremoveDisclaimer.toLowerCase()+', the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'Disclaimer_Not_'+setORremoveDisclaimer+'.png\'.');
    }
    
    const operation = setORremoveDisclaimer.toLowerCase() == 'set' ? 'Set' : 'Remove';
    console.log('\''+operation+' disclaimer\' case has been passed successfully...');
});

Then('the disclaimer should get displayed in the {string} format', async (format) =>{
    //will find notification message after updating 
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Updated successfully.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not given after updating the organization details, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }

    //will navigate on the another page and then come back to the organization details page
    await actionObj.comeBackToOrganizationDetailsPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will make the organization disclaimer field visible on the screen
    const formatOption = await driver.findElement(By.css('button[data-cmd="html"]'));
    await driver.executeScript("arguments[0].focus();",formatOption);
    
    //will find 'Disclaimer' field
    const disclaimeriFrame = await organizationDetailsPageElementObj.findDisclaimeriFrame(driver,screenshotPath);
    await driver.switchTo().frame(disclaimeriFrame);
    const disclaimerField = await organizationDetailsPageElementObj.findDisclaimerTextBox(driver,screenshotPath);    
    
    //will get HTML format of the updated disclaimer
    let actualDisclaimer = await driver.executeScript("return arguments[0].outerHTML;",disclaimerField);
    await driver.sleep(1000);
    //right now some HTML tags or some other things are creating a problem when doing a comparison. So, removed all those
    actualDisclaimer = actualDisclaimer.replace('<br>','');
    actualDisclaimer = actualDisclaimer.replace('<div>','');
    actualDisclaimer = actualDisclaimer.replace('</div>','');
    actualDisclaimer = actualDisclaimer.replace('fr-draggable','');
    actualDisclaimer = actualDisclaimer.replace(/ /g,'');
    actualDisclaimer = actualDisclaimer.replace(/[^\x20-\x7E]/g,'');
    actualDisclaimer = actualDisclaimer.replace(/ *\<span[^]*span\>*/g,'');
    if(format.toLowerCase() == 'redo'){
        actualDisclaimer = actualDisclaimer.replace('<p>','');
        actualDisclaimer = actualDisclaimer.replace('</p>','');
    }
    
    await driver.switchTo().defaultContent();

    //will compare actual and expected HTML code of disclaimer
    try{
        assert.strictEqual(actualDisclaimer,expectedDisclaimer);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Disclaimer_'+format.replace(/\s/g,'_')+'_FormatOption_NotWorking.png'); 
        assert.fail('Due to the '+format+' format option of disclaimer is not working, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'Disclaimer_'+format.replace(/\s/g,'_')+'_FormatOption_NotWorking.png\'.');
    }

    console.log('\'Format disclaimer with \"'+format.toLowerCase()+'\" format option\' case has been passed successfully...'); 
});

Then('the currency format should get set in the provided format', async () =>{
    //will find notification message after updating organization details
    let notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,'Updated successfully.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        assert.fail('Due to the success message is not given after updating the organization details, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'');
    }

    //will navigate on the another page and then come back to the organization details page
    await actionObj.comeBackToOrganizationDetailsPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will make the currency format field visible on the screen
    const currencyFormatField = await organizationDetailsPageElementObj.findTextboxElem(driver,screenshotPath,'currencyDisplayFormat');
    await driver.executeScript("arguments[0].focus();",currencyFormatField);
    await currencyFormatField.sendKeys('');

    //will check whether the provided currency format get set or not
    try{
        assert.strictEqual(await currencyFormatField.getAttribute('value'),expectedCurrencyFormat);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CurrencyFormat_NotSet.png'); 
        assert.fail('Due to the currency format is not set, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'CurrencyFormat_NotSet\'.');
    }
    
    console.log('\'Set currency format\' case has been passed successfully...'); 
});

Then('the system should display active currencies on the default currency dropdown list', async () =>{
    let isActiveCurrencyFound = 0;

    //will find the search box of default currency dropdown if the search box is exist
    const dropdownSearchboxElem = await formElementObj.findDropdownSearchBoxInRareCase(driver);
    
    //will travel all active currencies
    for(let i=0; i<expectedActiveCurrencies.length; i++){
        //will enter active currency code in the search box of default currency dropdown if the search box is exist
        if(dropdownSearchboxElem.length>0){
            const dropdownSearchbox = await formElementObj.findDropdownSearchBox(driver,screenshotPath,'currencyDisplay');
            await dropdownSearchbox.clear();
            await dropdownSearchbox.sendKeys(expectedActiveCurrencies[i]);
        }

        //will find the default currency dropdown list 
        const dropdownListElem = await formElementObj.findDropdownListElement(driver);
        //will check the default currency dropdown list contains active currency code or not
        for(let j=0; j<dropdownListElem.length; j++){
            if(await dropdownListElem[j].getText() == expectedActiveCurrencies[i]){
                isActiveCurrencyFound++
                break;
            }
        }
    }

    //will close the default currency dropdown
    const defaultCurrencyDropdown = await formElementObj.findDropdown(driver,screenshotPath,'currencyDisplay');
    await defaultCurrencyDropdown.click();
    await driver.sleep(2000);

    //will compare the number of found active currencies in the dropdown list and number of expected active currencies
    try{
        assert.strictEqual(isActiveCurrencyFound,expectedActiveCurrencies.length);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DefaultCurrencyDropdown_NotContain_AllActiveCurrencies.png'); 
        assert.fail('Due to the default currency dropdown is not contain all active currencies, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DefaultCurrencyDropdown_NotContain_AllActiveCurrencies.png\'.');
    }

    console.log('\'Default currency dropdown contains all active currencies\' case has been passed successfully...');   
});
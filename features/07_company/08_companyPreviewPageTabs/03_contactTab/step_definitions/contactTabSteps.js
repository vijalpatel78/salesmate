const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/08_companyPreviewPageTabs/03_contactTab/screenshots/';
const associatedContactElements = require('../common/associatedContactsElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let lastNameFieldData = 'no', firstNameFieldData = 'no', mobileFieldData = 'no', textFieldData = 'no', associatedContactsCountBeforeOperation,
    contact01FieldData = 'no', contact02FieldData = 'no', contact03FieldData = 'no';

//-----------Case 1: As a User, Verify user able to associate the contact by clicking on 'Add associate contact'--------------

When('verify user able to associate contact {string} by clicking on "Add associate contact"',async function(contactName){
    try{
        const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
        await addAssociateButton.click();
        await driver.sleep(1500);
        const searchContactField = await associatedContactElements.findSearchField(driver);
        await searchContactField.sendKeys(contactName);
        await driver.sleep(1000);
        const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
        await saveButton.click();
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'addAssociateButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify added associated contact details',async function(){
    try{
        const associatedContact = await driver.findElement(By.css('li:nth-of-type(1) > .d-flex.m-b-sm.v-center > .d-flex.d-flex-column.flex-1.text-ellipsis > .d-flex.v-center > .flex-1.font-medium.font-size-sm.m-l-sm.primary-text-dark.text-ellipsis')).isDisplayed();
        console.log("Is Associated Contact Displayed: "+associatedContact);
        const associatedContactText = await driver.findElement(By.xpath('(//a[.=" Test Contact "])[1]')).getText();
        console.log("Associated Contact: "+associatedContactText);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 2: As a User, Verify user able to create new contact and associate the contact to the company--------------

When('verify user able to create new contact and associate the contact to company',async function(dataTable){
    try{
        //get count of contacts before adding
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await moduleIcon.click();
        await driver.sleep(2500);
        const contacts = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountBeforeAdding = await contacts.length;

        const moduleIconElement = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIconElement.click();
        await driver.sleep(2000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        const contactTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Contact');
        await contactTab.click();
        await driver.sleep(3000);
        const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
        await addAssociateButton.click();
        await driver.sleep(1500);
        const searchContactField = await associatedContactElements.findSearchField(driver);
        await searchContactField.sendKeys('Contact');
        await driver.sleep(1500);
        await driver.findElement(By.xpath('//span[contains(text(),"Create")]')).click();
        await driver.sleep(1000);
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'last name') {
                lastNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the lastName field is given or not
                if (lastNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the lastName field, the test case execution has been aborted');
                }

                //will select the provided value from the 'Last NameField' field
                await driver.sleep(1000);
                const lastNameField = await driver.findElement(By.xpath('//ro-tag/div/input[@type="text"]'));
                await clearFieldDataObj.clearFieldData(lastNameField);
                await lastNameField.sendKeys(lastNameFieldData);
                await driver.sleep(1000);
                const createLink = await driver.findElement(By.xpath('//div[text()="Create New Contact"]'));
                await createLink.click();
                await driver.sleep(1500);
                //get value of 'Last Name'
                const lastName = await driver.findElement(By.id('lastName')).getAttribute('value');
                console.log("Last Name: "+lastName);
            } else if (fieldName == 'first name') {
                firstNameFieldData = dataTable.rawTable[i][1];

                //will check that the data for the firstName field is given or not
                if (firstNameFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the firstName field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const firstNameField = await formElementsObj.findElementById(driver,screenshotPath,'firstName','firstNameField')
                await clearFieldDataObj.clearFieldData(firstNameField);
                await firstNameField.sendKeys(firstNameFieldData);
                await driver.sleep(500);
                //get value of 'First Name'
                const firstName = await driver.findElement(By.id('firstName')).getAttribute('value');
                console.log("First Name: "+firstName);
            } else if (fieldName == 'mobile') {
                mobileFieldData = dataTable.rawTable[i][1];

                //will check that the data for the mobile field is given or not
                if (mobileFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the mobile field, the test case execution has been aborted');
                }

                //will find 'Mobile' field and pass the new data
                const mobileField = await formElementsObj.findElementById(driver,screenshotPath,'mobile','mobileField')
                await clearFieldDataObj.clearFieldData(mobileField);
                await mobileField.sendKeys(mobileFieldData);
                await driver.sleep(500);
                //get value of 'Mobile'
                const mobile = await driver.findElement(By.id('mobile')).getAttribute('value');
                console.log("Mobile: "+mobile);
            } else if (fieldName == 'text field') {
                textFieldData = dataTable.rawTable[i][1];

                //will check that the data for the text field is given or not
                if (textFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the text field, the test case execution has been aborted');
                }

                //will find 'First Name' field and pass the new data
                const textField = await formElementsObj.findElementById(driver,screenshotPath,'textCustomField1','textField')
                await clearFieldDataObj.clearFieldData(textField);
                await textField.sendKeys(textFieldData);
                await driver.sleep(500);
                const saveButton = await driver.findElement(By.xpath('//ngb-modal-window//span[text()=" Save "]'));
                await driver.executeScript("arguments[0].click();",saveButton);
                await driver.sleep(1500);
            }
        }
        //get count of contacts after adding
        const contactModuleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactModuleIcon.click();
        await driver.sleep(2500);
        const contactElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountAfterAdding = await contactElements.length;
        if ((contactsCountBeforeAdding)+1 === contactsCountAfterAdding) {
            console.log("As contacts increased by (X+1) after adding contacts in associated contact,so test case has been passed");
        } else {
            await assert.fail("As contacts is not increased by (X+1) even after adding contacts in associated contact,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactAssociation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('verify user able to associate multiple contacts in a company',async function(dataTable){
    try{
        const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
        await addAssociateButton.click();
        await driver.sleep(1000);
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'contact 1') {
                contact01FieldData = dataTable.rawTable[i][1];

                //will check that the data for the contact 1 is given or not
                if (contact01FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the contact 1, the test case execution has been aborted');
                }

                //will select the provided value from the 'Contact 1' search field
                await driver.sleep(1000);
                const contact01Field = await driver.findElement(By.xpath('//ro-tag/div/input[@type="text"]'));
                await clearFieldDataObj.clearFieldData(contact01Field);
                await contact01Field.sendKeys(contact01FieldData);
                await driver.sleep(1500);
                await driver.findElement(By.xpath('//ro-tag/div/div[2]/div[1]/ul/li[1]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
                await saveButton.click();
                await driver.sleep(1500);
            } else if (fieldName == 'contact 2') {
                contact02FieldData = dataTable.rawTable[i][1];

                //will check that the data for the firstName field is given or not
                if (contact02FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the firstName field, the test case execution has been aborted');
                }

                //will select the provided value from the 'Contact 2' search field
                await driver.sleep(1000);
                const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
                await addAssociateButton.click();
                await driver.sleep(1000);
                const contact02Field = await driver.findElement(By.xpath('//ro-tag/div/input[@type="text"]'));
                await clearFieldDataObj.clearFieldData(contact02Field);
                await contact02Field.sendKeys(contact02FieldData);
                await driver.sleep(1500);
                await driver.findElement(By.xpath('//ro-tag/div/div[2]/div[1]/ul/li[1]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
                await saveButton.click();
                await driver.sleep(1500);
            } else if (fieldName == 'contact 3') {
                contact03FieldData = dataTable.rawTable[i][1];

                //will check that the data for the contact 3 field is given or not
                if (contact03FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the contact 3, the test case execution has been aborted');
                }

                //will select the provided value from the 'Contact 3' search field
                await driver.sleep(1000);
                const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
                await addAssociateButton.click();
                await driver.sleep(1000);
                const contact03Field = await driver.findElement(By.xpath('//ro-tag/div/input[@type="text"]'));
                await clearFieldDataObj.clearFieldData(contact03Field);
                await contact03Field.sendKeys(contact03FieldData);
                await driver.sleep(1500);
                await driver.findElement(By.xpath('//ro-tag/div/div[2]/div[1]/ul/li[1]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
                await saveButton.click();
                await driver.sleep(1500);
            }
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'multipleContactsAssociation_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify associated contact counts should increase',async function(){
    try{
        //get count of 'Associated Contacts'
        const associatedContactsText = await driver.findElement(By.xpath('(//sm-associated-contact[@class="sm-widget-block"]//span)[1]')).getText();
        console.log("Associated Contacts Text: "+associatedContactsText);
        const associatedContact = await associatedContactsText.replace(/[()]/g, '');
        console.log(associatedContact);
        const associatedContactsCountAfterOperation = await parseInt(associatedContact);
        console.log("Associated Contacts Count: "+associatedContactsCountAfterOperation);
        if ((associatedContactsCountBeforeOperation)+3 === associatedContactsCountAfterOperation) {
            console.log("As after multiple associate contacts adding the count increased by (X+3),so test case has been passed");
        } else {
            await assert.fail("As after multiple associate contacts adding the count is not increased by (X+3),so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 7: As a User, Verify the number of associated contact counts should be reflected in the 'Associated Contacts' column in the grid view of company--------------

When('verify the number of associated contact counts should be increased in "Associated Contacts" column in the grid view of company',async function(dataTable){
    try{
        const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
        await addAssociateButton.click();
        await driver.sleep(1000);
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'contact 01') {
                contact01FieldData = dataTable.rawTable[i][1];

                //will check that the data for the contact 1 is given or not
                if (contact01FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the contact 1, the test case execution has been aborted');
                }

                //will select the provided value from the 'Contact 1' search field
                await driver.sleep(1000);
                const contact01Field = await driver.findElement(By.xpath('//ro-tag/div/input[@type="text"]'));
                await clearFieldDataObj.clearFieldData(contact01Field);
                await contact01Field.sendKeys(contact01FieldData);
                await driver.sleep(1500);
                await driver.findElement(By.xpath('//ro-tag/div/div[2]/div[1]/ul/li[1]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver, screenshotPath, 'btnSubmit', 'saveButton');
                await saveButton.click();
                await driver.sleep(2000);
            }
        }
        //get count of 'Associated Contacts' after operation
        const associatedContactText = await driver.findElement(By.xpath('(//sm-associated-contact[@class="sm-widget-block"]//span)[1]')).getText();
        console.log("Associated Contacts Text: "+associatedContactText);
        const associatedContactElement = await associatedContactText.replace(/[()]/g, '');
        console.log(associatedContactElement);
        const associatedContactsCountAfterOperation = await parseInt(associatedContactElement);
        console.log("Associated Contacts Count After Operation: "+associatedContactsCountAfterOperation);
        if ((associatedContactsCountBeforeOperation)+1 === associatedContactsCountAfterOperation ) {
            console.log("As associated counts is increased by (X+1), so test case has been passed");
        } else {
            await assert.fail("As associated counts is not increased by (X+1), so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedContactsCount_NotIncreased.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify the number of associated contact counts should be decreased in "Associated Contacts" column in the grid view of company',async function(){
    try {
        //Remove an associated contact
        const removeIcon = await associatedContactElements.findRemoveIcon(driver,1);
        await removeIcon.click();
        await driver.sleep(1500);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedContactsCount_NotDecreased.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
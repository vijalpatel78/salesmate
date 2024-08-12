const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/04_editCompanyDetails/screenshots/';
const associatedContactElements = require('../common/associatedContactsElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

let lastNameFieldData = 'no', firstNameFieldData = 'no', mobileFieldData = 'no', textFieldData = 'no', associatedContactsCountBeforeOperation,
contact01FieldData = 'no', contact02FieldData = 'no', contact03FieldData = 'no';

//------------------------------Case 1: As a User, Verify UI of 'Associated Contacts' widget--------------------------------

Then('As a User, Verify UI of "Associated Contacts" widget and {string} message',async function(expectedNotification){
    try {
        const associatedContactsText = await driver.findElement(By.xpath('//sm-associated-contact//h4[@class="d-flex v-center"]')).getText();
        console.log("Associated Contacts Text: "+associatedContactsText);
        const associatedContact = await associatedContactsText.replace(/[()]/g, '');
        console.log(associatedContact);
        const associatedContacts = await associatedContact.replace("ASSOCIATED CONTACTS ","");
        console.log(associatedContacts);
        const associatedContactsCount = await parseInt(associatedContacts);
        console.log("Associated Contacts Count: "+associatedContactsCount);
        if(associatedContactsCount === 0) {
            //check 'No results found' message
            const actualNotification = await driver.findElement(By.xpath('//sm-associated-contact//p')).getText();
            console.log("Actual Associated Contacts Count Notification: " + actualNotification);
            try {
                strictEqual(actualNotification, expectedNotification);
                    console.log("As associated contacts are not found so 'No results found' message is displayed,so test case has been passed");
                } catch (err) {
                    await assert.fail(err);
                }
        } else {
            await assert.fail("As associated contacts are found so 'No results found' message is not displayed,so test case has been aborted");
        }
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'noResultsFoundMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 2: As a User, Verify that it should allow user to collapse and expand "Associated Contacts" widget--------------

When('verify that it should allow user to collapse and expand "Associated Contacts" widget',async function() {
    try {
        //click on 'Collapse' arrow from 'Associated Contacts'
        const expandOrCollapseArrow = await associatedContactElements.findExpandOrCollapseArrow(driver);
        await expandOrCollapseArrow.click();
        await driver.sleep(2000);
        //verify whether 'Associated Contacts' is hidden or not after collapsing it
        await driver.manage().setTimeouts({implicit: 2000});
        const associatedSectionTable = await driver.findElement(By.xpath('//sm-associated-contact//section-body[@style="display: none;"]')).isDisplayed();
        console.log(associatedSectionTable);
        if(associatedSectionTable === false) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'associatedSectionTableHidden.png');
            console.log("As associated contacts section table is hidden after collapsing section,so test case has been passed");
        } else {
            await assert.fail("As associated contacts section table is not hidden even after collapsing section,so test case has been aborted");
        }
        //click on 'Expand' arrow from 'Associated Contacts'
        const expandOrCollapseArrowElement = await associatedContactElements.findExpandOrCollapseArrow(driver);
        await expandOrCollapseArrowElement.click();
        await driver.sleep(2000);
        //verify whether 'Deal Section Table' is visible or not after expanding it
        await driver.manage().setTimeouts({implicit: 2000});
        const associatedSectionTableElement = await driver.findElements(By.xpath('//sm-associated-contact//section-body[@style="display: none;"]'));
        const associatedSectionLength = await associatedSectionTableElement.length;
        if(associatedSectionLength === 0) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'dealSectionTableVisibility.png');
            console.log("As associated contacts section table is visible after expanding section,so test case has been passed");
        } else {
            await assert.fail("As associated contacts section table is not visible even after expanding section,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedContactsWidget_NotExpanded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 3: As a User, Verify user able to associate the contact by clicking on 'Add associate contact'--------------

When('verify user able to associate the contact {string} by clicking on "Add associate contact"',async function(contactName){
   try{
       const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
       await addAssociateButton.click();
       await driver.sleep(1000);
       const searchContactField = await associatedContactElements.findSearchField(driver);
       await searchContactField.sendKeys(contactName);
       await driver.sleep(1000);
       const selectContact = await driver.findElement(By.xpath('//ul[@class="ro-tag-autocomplete-items"]/li[2]'));
       await selectContact.click();
       await driver.sleep(500);
       const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSubmit','saveButton');
       await saveButton.click();
       await driver.sleep(1500);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'addAssociateButton_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

Then('verify added associate contact details',async function(){
   try{
       const associatedContact = await driver.findElement(By.xpath('//section-body//ul//a[.=" Test Contact "]')).isDisplayed();
       console.log("Is Associated Contact Displayed: "+associatedContact);
       const associatedContactText = await driver.findElement(By.xpath('//section-body//ul//a[.=" Test Contact "]')).getText();
       console.log("Associated Contact: "+associatedContactText);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----------Case 4: As a User, Verify user able to create new contact and associate the contact to the company--------------

When('verify user able to create new contact and associate the contact to the company',async function(dataTable){
    try{
        //get count of contacts before adding
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await moduleIcon.click();
        await driver.sleep(2500);
        const contacts = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountBeforeAdding = await contacts.length;

        const moduleIconElement = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await moduleIconElement.click();
        await driver.sleep(2500);
        const companyName = await moduleElementsObj.clickOnContactName(driver,1);
        await companyName.click();
        await driver.sleep(2500);
        const addAssociateButton = await associatedContactElements.findAddAssociateButton(driver);
        await addAssociateButton.click();
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

//-------------------Case 5: As a User, Verify user able to associate multiple contacts in a company--------------------

When('get count of associate contacts before operation',async function(){
    try {
        //get count of 'Associated Contacts'
        const associatedContactsText = await driver.findElement(By.xpath('//sm-associated-contact//h4[@class="d-flex v-center"]')).getText();
        console.log("Associated Contacts Text: "+associatedContactsText);
        const associatedContact = await associatedContactsText.replace(/[()]/g, '');
        console.log(associatedContact);
        const associatedContacts = await associatedContact.replace("ASSOCIATED CONTACTS ","");
        console.log(associatedContacts);
        associatedContactsCountBeforeOperation = await parseInt(associatedContacts);
        console.log("Associated Contacts Count: "+associatedContactsCountBeforeOperation);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'associateContactsCount_NotFound.png');
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

                //will check that the data for the contact 2 field is given or not
                if (contact02FieldData == '') {
                    await assert.fail('Due to the blank value is provided for the contact 2 field, the test case execution has been aborted');
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
                await driver.sleep(2000);
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
        const associatedContactsText = await driver.findElement(By.xpath('//sm-associated-contact//h4[@class="d-flex v-center"]')).getText();
        console.log("Associated Contacts Text: "+associatedContactsText);
        const associatedContact = await associatedContactsText.replace(/[()]/g, '');
        console.log(associatedContact);
        const associatedContacts = await associatedContact.replace("ASSOCIATED CONTACTS ","");
        console.log(associatedContacts);
        const associatedContactsCountAfterOperation = await parseInt(associatedContacts);
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

//------------------Case 6: As a User, Verify user able to remove the contacts by clicking on 'X' button----------------

When('verify user able to remove the contacts by clicking on "X" button',async function(){
    try{
        //Remove an associated contact
        const removeIcon = await associatedContactElements.findRemoveIcon(driver,2);
        await removeIcon.click();
        await driver.sleep(2500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'removeButton_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

Then('verify associated contact counts should decrease',async function(){
    try{
        //get count of 'Associated Contacts'
        const associatedContactsText = await driver.findElement(By.xpath('//sm-associated-contact//h4[@class="d-flex v-center"]')).getText();
        console.log("Associated Contacts Text: "+associatedContactsText);
        const associatedContact = await associatedContactsText.replace(/[()]/g, '');
        console.log(associatedContact);
        const associatedContacts = await associatedContact.replace("ASSOCIATED CONTACTS ","");
        console.log(associatedContacts);
        const associatedContactsCountAfterOperation = await parseInt(associatedContacts);
        console.log("Associated Contacts Count: "+associatedContactsCountAfterOperation);
        if ((associatedContactsCountBeforeOperation)-1 === associatedContactsCountAfterOperation) {
            console.log("As after removing associate contacts the count decreased by (X-1),so test case has been passed");
        } else {
            await assert.fail("As after removing associate contacts the count is not decreased by (X-1),so test case has been aborted")
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------------------Case 8: As a User, Verify user able to navigate to details view of contact------------------------

When('verify user able to navigate to details view of contact',async function(){
    try{
        const associatedContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'label',' Mobile: ');
        await associatedContact.click();
        await driver.sleep(500);
        const detailView = await associatedContactElements.findDetailViewIcon(driver);
        await detailView.click();
        await driver.sleep(3000);
        //check 'Detail View Icon' redirects to 'Contact Details' screen page
        const currentPageUrl = await driver.getCurrentUrl();
        console.log("Current Page URL: "+currentPageUrl);
        if(currentPageUrl.endsWith('/detail')) {
            console.log("As on click of 'Detail View Icon' icon it redirects to 'Contact Details' screen page,so test case has been passed");
        } else {
            await assert.fail("As on click of 'Detail View Icon' icon it does not redirects to 'Contact Details' screen page,so test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'detailsViewPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 9: As a User, Verify the number of associated contact counts should be reflected in the 'Associated Contacts' column in the grid view of company--------------

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
        const associatedContactText = await driver.findElement(By.xpath('//sm-associated-contact//h4[@class="d-flex v-center"]')).getText();
        console.log("Associated Contacts Text: "+associatedContactText);
        const associatedContactElement = await associatedContactText.replace(/[()]/g, '');
        console.log(associatedContactElement);
        const associatedContactsOnlyCount = await associatedContactElement.replace("ASSOCIATED CONTACTS ","");
        console.log(associatedContactsOnlyCount);
        const associatedContactsCountAfterOperation = await parseInt(associatedContactsOnlyCount);
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
       const removeIcon = await associatedContactElements.findRemoveIcon(driver,3);
       await removeIcon.click();
       await driver.sleep(1500);
   } catch (err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'associatedContactsCount_NotDecreased.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-------------Case 10: As a User, Verify user able to initiate the call from mobile number of the contact--------------

When('verify user able to initiate the call from mobile number of the contact',async function(){
    try{
        const mobileNumber = await associatedContactElements.findMobileNumber(driver,1);
        await mobileNumber.click();
        await driver.sleep(1000);
        const browserOption = await associatedContactElements.findBrowserOption(driver);
        await driver.executeScript("arguments[0].click();",browserOption);
        await driver.sleep(3500);
        const outGoingCallPopup = await driver.findElements(By.xpath('//twilio-calling-card//div[.=" Outgoing Call "]'));
        const outGoingCallPopupLength = await outGoingCallPopup.length;
        if (outGoingCallPopupLength > 0) {
            console.log("As 'Outgoing Call Popup' is displayed after cal initialisation,so test case has been passed");
        } else {
            //click on 'End call button'
            const endCallButton = await associatedContactElements.findEndCallButton(driver);
            await endCallButton.click();
            await driver.sleep(1000);
            const deleteLogLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Delete Log & Recording');
            await deleteLogLink.click();
            await driver.sleep(1000);
            const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
            await confirmationButton.click();
            await driver.sleep(1500);
            await assert.fail("As 'Outgoing Call Popup' is not displayed after cal initialisation,so test case has been aborted");
        }
        //click on 'End call button'
        const endCallButton = await associatedContactElements.findEndCallButton(driver);
        await endCallButton.click();
        await driver.sleep(1000);
        const deleteLogLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Delete Log & Recording');
        await deleteLogLink.click();
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'call_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 11: As a User, Verify user able to send a text to the contact from mobile number field--------------

When('verify user able to send a text as {string} to the contact from mobile number field',async function(message){
    try{
        const mobileNumber = await associatedContactElements.findMobileNumber(driver,1);
        await mobileNumber.click();
        await driver.sleep(1000);
        const sendTextLink = await associatedContactElements.findSendTextOption(driver);
        await driver.executeScript("arguments[0].click();",sendTextLink);
        await driver.sleep(1500);
        const messageField = await formElementsObj.findElementById(driver,screenshotPath,'messageField','messageField');
        await clearFieldDataObj.clearFieldData(messageField);
        await messageField.sendKeys(message);
        await driver.sleep(1500);
        //get value of 'message' field
        const messageFieldText = await driver.findElement(By.id('messageField')).getAttribute('value');
        console.log("Message Field Text: "+messageFieldText);
        const sendButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSend','sendButton');
        await sendButton.click();
        await driver.sleep(1500);
        const timelineTextTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Texts');
        await timelineTextTab.click();
        await driver.sleep(2000);
        //check visibility of 'Sent Text'
        const textTabMessage = await driver.findElement(By.xpath('//div[@class="font-size-sm"]//span')).getText();
        console.log("Text Tab Message: "+textTabMessage);
        const sentBy = await driver.findElement(By.xpath('//div/timeline-text-message/div/div[1]/div[3]/span')).getText();
        console.log("Sent By: "+sentBy);
        if (messageFieldText === textTabMessage) {
            console.log("As 'message field text' and 'text tab message' are equal,so test case has been passed");
        } else {
            const deleteIcon = await associatedContactElements.findDeleteIcon(driver);
            await driver.executeScript("arguments[0].click();",deleteIcon);
            await driver.sleep(1000);
            const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
            await confirmationButton.click();
            await driver.sleep(1500);
            await assert.fail("As 'message field text' and 'text tab message' are not equal,so test case has been aborted");
        }
        //delete note
        const deleteIcon = await associatedContactElements.findDeleteIcon(driver);
        await driver.executeScript("arguments[0].click();",deleteIcon);
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1500);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'text_NotSent.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
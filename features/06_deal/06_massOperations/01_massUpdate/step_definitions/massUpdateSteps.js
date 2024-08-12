const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/06_massOperations/01_massUpdate/screenshots/';
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const massUpdateProductElementsObj = require('../../../../05_product/07_massOperations/01_massUpdate/common/massUpdateElements');
const commonElementsObj = require('../../../../00_common/webElements/formElements');

let selectField01Data = 'no', bigIntegerFieldData = 'no', selectField02Data = 'no', booleanState = 'no', selectField03Data = 'no', ownerFieldData = 'no',
selectField04Data = 'no', dateFieldData = 'no', selectField05Data = 'no', dateAndTimeFieldData = 'no',
bigIntegerUpdatedValue, booleanUpdatedValue, ownerUpdatedValue, dateUpdatedValue, dateAndTimeUpdatedValue;

//-----------Case 3: As a user, I should be able to update Contacts in bulk from the mass update Contacts page----------

When('user is able to update Deals in bulk from the mass update Deal page',async function(dataTable) {
    try {
        let expectedNotification = 'Record(s) updated successfully';
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massUpdateContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Update Deals')
        await massUpdateContact.click();
        await driver.sleep(1000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Title' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(1000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const updateButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Update');
        await updateButton.click();
        await driver.sleep(1000);
        //will travel provided fields and data list
        for (let i = 0; i < dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'select field01') {
                selectField01Data = dataTable.rawTable[i][1];
                bigIntegerFieldData = dataTable.rawTable[i][2];

                //will check that the data for the required big integer field is given or not
                if (bigIntegerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required big integer field, the test case execution has been aborted');
                }
                //select 'Big Integer' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField01Data, 'yes');
                //will find 'Big Integer' field and pass the new data
                const bigIntegerField = await formElementsObj.findElementById(driver,screenshotPath,'bigIntCustomField1','bigIntegerField');
                await clearFieldDataObj.clearFieldData(bigIntegerField);
                await bigIntegerField.sendKeys(bigIntegerFieldData);
                await driver.sleep(500);
                //get updated value of 'Big Integer'
                bigIntegerUpdatedValue = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
                console.log(bigIntegerUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field02') {
                selectField02Data = dataTable.rawTable[i][1];
                booleanState = dataTable.rawTable[i][2];

                //will check that the data for the required boolean state field is given or not
                if (booleanState == '') {
                    await assert.fail('Due to the blank value is provided for the required boolean state field, the test case execution has been aborted');
                }
                const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
                await contactCheckbox.click();
                await driver.sleep(1000);
                const updateButton = await formElementsObj.findElementByVisibleText(driver, screenshotPath, 'button', 'Update');
                await updateButton.click();
                await driver.sleep(1000);

                //select 'Boolean Label' dropdown to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField02Data, 'yes');
                //select value of 'Boolean Label'
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'checkboxCustomField1', booleanState, 'no');
                //get updated value of 'Boolean Label'
                const booleanStateElement = await commonElementsObj.findDropdown(driver, screenshotPath, 'checkboxCustomField1');
                booleanUpdatedValue = await booleanStateElement.getText();
                console.log(booleanUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field03') {
                selectField03Data = dataTable.rawTable[i][1];
                ownerFieldData = dataTable.rawTable[i][2];

                //will check that the data for the required owner field is given or not
                if (ownerFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the required owner field, the test case execution has been aborted');
                }
                const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
                await contactCheckbox.click();
                await driver.sleep(1000);
                const updateButton = await formElementsObj.findElementByVisibleText(driver, screenshotPath, 'button', 'Update');
                await updateButton.click();
                await driver.sleep(1000);

                //select 'Owner' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField03Data, 'yes');
                //will find 'Owner' field and pass the new data
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'owner', ownerFieldData, 'no');
                //get updated value of 'Owner' Field
                const ownerUpdatedText = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
                ownerUpdatedValue = await ownerUpdatedText.getText();
                console.log(ownerUpdatedValue);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field04') {
                selectField04Data = dataTable.rawTable[i][1];
                dateFieldData = dataTable.rawTable[i][2];

                //will check that the data for the date field is given or not
                if (dateFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date field, the test case execution has been aborted');
                }
                const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
                await contactCheckbox.click();
                await driver.sleep(1000);
                const updateButton = await formElementsObj.findElementByVisibleText(driver, screenshotPath, 'button', 'Update');
                await updateButton.click();
                await driver.sleep(1000);

                //select 'Date' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField04Data, 'yes');
                //will find 'Date' field and pass the new data
                const dateField = await formElementsObj.findElementById(driver,screenshotPath, 'dateCustomField1','dateField');
                await clearFieldDataObj.clearFieldData(dateField);
                await dateField.sendKeys(dateFieldData);
                await driver.sleep(500);
                //get updated value of 'Date'
                dateUpdatedValue = await driver.findElement(By.id('dateCustomField1')).getAttribute('value');
                console.log(dateUpdatedValue);
                await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            } else if (fieldName == 'select field05') {
                selectField05Data = dataTable.rawTable[i][1];
                dateAndTimeFieldData = dataTable.rawTable[i][2];

                //will check that the data for the date and time label field is given or not
                if (dateAndTimeFieldData == '') {
                    await assert.fail('Due to the blank value is provided for the date and time label field, the test case execution has been aborted');
                }
                const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
                await contactCheckbox.click();
                await driver.sleep(1000);
                const updateButton = await formElementsObj.findElementByVisibleText(driver, screenshotPath, 'button', 'Update');
                await updateButton.click();
                await driver.sleep(1000);

                //select 'Date And Time Label' Field to be edited
                await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'editablefields', selectField05Data, 'yes');
                //will find 'Date And Time Label' field and pass the new data
                const dateAndTimeField = await formElementsObj.findElementById(driver,screenshotPath,'dateTimeCustomField1','dateT');
                await clearFieldDataObj.clearFieldData(dateAndTimeField);
                await dateAndTimeField.sendKeys(dateAndTimeFieldData);
                await driver.sleep(500);
                //get updated value of 'Date And Time Label'
                dateAndTimeUpdatedValue = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
                console.log(dateAndTimeUpdatedValue);
                await driver.findElement(By.xpath('//h4[text()="Select Field to Update"]')).click();
                await driver.sleep(1000);
                const saveButton = await formElementsObj.findElementById(driver,screenshotPath,'btnSave','saveButton');
                await saveButton.click();
                await driver.sleep(1000);
                const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
                await driver.wait(until.elementIsVisible(notificationMsgElement));
                const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
                strictEqual(notificationMsg, expectedNotification);
                await driver.sleep(3000);
            }
        }

        //page navigation and comeback to contact listing page
        await pageNavigationObj.comeBackToDealListingPage(driver, screenshotPath);
        await driver.sleep(1000);
        const checkboxElement = await moduleElementsObj.findContactCheckbox(driver,1);
        await checkboxElement.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2500);
        console.log("Updated Deal Details after navigation on quick page:");
        const quickPageOwnerText = await commonElementsObj.findDropdown(driver,screenshotPath,'owner');
        const quickPageOwner = await quickPageOwnerText.getText();
        console.log(quickPageOwner);
        const quickPageDateField = await driver.findElement(By.id('dateCustomField1')).getAttribute('value');
        console.log(quickPageDateField);
        const quickPageDateAndTimeField = await driver.findElement(By.id('dateTimeCustomField1')).getAttribute('value');
        console.log(quickPageDateAndTimeField);
        const quickPageBigIntField = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        console.log(quickPageBigIntField);
        const quickPageBooleanField = await driver.findElement(By.id('checkboxCustomField1')).getAttribute('value');
        console.log(quickPageBooleanField);
        try {
            strictEqual(quickPageOwner, ownerUpdatedValue);
            strictEqual(quickPageDateField, dateUpdatedValue);
            strictEqual(quickPageDateAndTimeField, dateAndTimeUpdatedValue);
            strictEqual(quickPageBigIntField, bigIntegerUpdatedValue);
            console.log("As deal details in update deal page and quick page are equal,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
        const previewPageCloseIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await previewPageCloseIcon.click();
        await driver.sleep(1500);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massUpdate_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
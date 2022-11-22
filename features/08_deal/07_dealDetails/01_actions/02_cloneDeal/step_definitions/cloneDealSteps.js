const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/01_actions/02_cloneDeal/screenshots/';
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

//-------------------------Case 3: Verify, the user is able to clone the contact details--------------------------------

When('the user is able to clone the deal details and verify {string} message',async function(expectedNotification){
    try {
        await driver.sleep(1000);
        const editIcon = await moduleElementsObj.findEditIcon(driver,'1');
        await editIcon.click();
        await driver.sleep(3000);
        //get all values of 'Edit Deal'
        const editDealTitle = await driver.findElement(By.id('title')).getAttribute('value');
        const editDealWinProbability = await driver.findElement(By.id('winProbability')).getAttribute('value');
        console.log(editDealWinProbability);
        const owner = await formElementsObj.findDropdown(driver,screenshotPath,'owner');
        const editDealOwner = await owner.getText();
        console.log(editDealOwner)
        const source = await formElementsObj.findDropdown(driver,screenshotPath,'source');
        const editDealSource = await source.getText();
        console.log(editDealSource)
        const editDealEstimatedCloseDate = await driver.findElement(By.id('estimatedCloseDate')).getAttribute('value');
        console.log(editDealEstimatedCloseDate)
        const editDealValue = await driver.findElement(By.id('dealValue')).getAttribute('value');
        console.log(editDealValue)
        const currency = await formElementsObj.findDropdown(driver,screenshotPath,'currency');
        const editDealCurrency = await currency.getText();
        console.log(editDealCurrency)
        const pipeline = await formElementsObj.findDropdown(driver,screenshotPath,'pipeline');
        const editDealPipeLine = await pipeline.getText();
        console.log(editDealPipeLine)
        const stage = await formElementsObj.findDropdown(driver,screenshotPath,'stage');
        const editDealStage = await stage.getText();
        console.log(editDealStage)
        const priority = await formElementsObj.findDropdown(driver,screenshotPath,'priority');
        const editDealPriority = await priority.getText();
        console.log(editDealPriority)
        const status = await formElementsObj.findDropdown(driver,screenshotPath,'status');
        const editDealStatus = await status.getText();
        console.log(editDealStatus)
        const editDealDescription = await driver.findElement(By.id('description')).getAttribute('value');
        console.log(editDealDescription)
        const editDealTags = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div[@class="ro-tag-autocomplete"]')).getAttribute('value');
        const editDealText = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        const editDealTextArea = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        const editDealInteger = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        const editDealDecimal = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        const editDealDateField = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const editDealDateAndTimeField = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const editDealEmailDetails = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const editDealPhoneDetails = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const editDealUrl = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        const editDealBigInteger = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        const editDealPercentage = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        const editDealCurrencyField = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        const closeIcon = await driver.findElement(By.xpath('//add-deal/div[@class="modal-header"]/button[@type="button"]'));
        await closeIcon.click();
        await driver.sleep(1000);
        const dealName = await moduleElementsObj.clickOnDealName(driver,1);
        await dealName.click();
        await driver.sleep(2000);
        const actionsButton = await driver.findElement(By.xpath('//button[text()="Actions "]'));
        await actionsButton.click();
        await driver.sleep(1000);
        //check values of 'Clone Deal'
        const cloneLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Clone');
        await cloneLink.click();
        await driver.sleep(3000);
        const cloneDealTitle = await driver.findElement(By.id('title')).getAttribute('value');
        const cloneDealDescription = await driver.findElement(By.id('description')).getAttribute('value');
        const cloneDealTags = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div[@class="ro-tag-autocomplete"]')).getAttribute('value');
        const cloneDealText = await driver.findElement(By.id('textCustomField1')).getAttribute('value');
        const cloneDealTextArea = await driver.findElement(By.id('textAreaCustomField1')).getAttribute('value');
        const cloneDealInteger = await driver.findElement(By.id('intCustomField1')).getAttribute('value');
        const cloneDealDecimal = await driver.findElement(By.id('decimalCustomField1')).getAttribute('value');
        const cloneDealDateField = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const cloneDealDateAndTimeField = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const cloneDealEmailDetails = await driver.findElement(By.id('textCustomField2')).getAttribute('value');
        const cloneDealPhoneDetails = await driver.findElement(By.id('textCustomField3')).getAttribute('value');
        const cloneDealUrl = await driver.findElement(By.id('textCustomField5')).getAttribute('value');
        const cloneDealBigInteger = await driver.findElement(By.id('bigIntCustomField1')).getAttribute('value');
        const cloneDealPercentage = await driver.findElement(By.id('decimalCustomField2')).getAttribute('value');
        const cloneDealCurrencyField = await driver.findElement(By.id('decimalCustomField3')).getAttribute('value');
        const saveButton = await driver.findElement(By.xpath('//sm-button[2]/sm-element//button[@id="btnSubmit"]//span[.=" Save "]'));
        await saveButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(4000);
        try {
            strictEqual(editDealTitle,cloneDealTitle);
            strictEqual(editDealDescription,cloneDealDescription);
            strictEqual(editDealTags,cloneDealTags);
            strictEqual(editDealText,cloneDealText);
            strictEqual(editDealTextArea,cloneDealTextArea);
            strictEqual(editDealInteger,cloneDealInteger);
            strictEqual(editDealDecimal,cloneDealDecimal);
            strictEqual(editDealDateField,cloneDealDateField);
            strictEqual(editDealDateAndTimeField,cloneDealDateAndTimeField);
            strictEqual(editDealEmailDetails,cloneDealEmailDetails);
            strictEqual(editDealPhoneDetails,cloneDealPhoneDetails);
            strictEqual(editDealUrl,cloneDealUrl);
            strictEqual(editDealBigInteger,cloneDealBigInteger);
            strictEqual(editDealPercentage,cloneDealPercentage);
            strictEqual(editDealCurrencyField,cloneDealCurrencyField);
            console.log("As after cloning both edit and clone fields are not equal,so test case has been passed");
        } catch(err) {
            await assert.fail("As after cloning both edit and clone fields are not equal,so test case has been aborted");
        }
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'cloneDeal_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});
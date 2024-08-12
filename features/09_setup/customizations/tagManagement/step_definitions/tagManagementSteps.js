const { Given,When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const openTagManagementPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const pageNavigationObj = require('../common/actions');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/customizations/tagManagement/screenshots/';
const tagManagementElementsObj = require('../common/tagManagementPageElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');

Given('the {string} is on tag management page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.includes('app/setup/customization/tags')){
        console.log('The tag management page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open profile permissions page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on tag management page');
        //will open the tag management page
        await openTagManagementPageObj.openTagManagementPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open profile permissions page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on tag management page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on tag management page');
        //will open the tag management page
        await openTagManagementPageObj.openTagManagementPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the tag management page
        await openTagManagementPageObj.openTagManagementPage(driver,screenshotPath);
    }
});

//--------------------------Case 1: Verify, the user is able to add a new tag------------------------------------

When('the user is able to add new {string} and navigate to other page and verify updated tag details',async function(tagNameData) {
    try {
        //Click on 'Add New Tag' button
        await tagManagementElementsObj.findAddNewTagButton(driver);
        await driver.sleep(1000);

        //Verify 'Add New Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const addNewTagPopup = await driver.findElements(By.xpath('//h4[text()="Add Tag"]'));
        const addNewTagPopupLength = await addNewTagPopup.length;
        if (addNewTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'addNewTagPopup.png');
            console.log("As add new tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As add new tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        await driver.sleep(1000);
        //get value of newly added tag name from add new tag popup
        const tagNameValue = await driver.findElement(By.id('tagInput')).getAttribute('value');
        console.log(tagNameValue);
        //Click on 'Add' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(3000);

        //page navigation and come back to 'Tag Management' page
        await pageNavigationObj.comeBackToTagManagementPage(driver, screenshotPath);
        await driver.sleep(1000);
        //get value of newly added tag name from tag management page
        const tagNameOfTagManagementPage = await driver.findElement(By.xpath("//span[text()='Cus Tag Auto 01']")).getText();

        //compare tag name of new tag popup and tag name of tag management page
        if (tagNameValue === tagNameOfTagManagementPage) {
            console.log("As specified new tag name " + tagNameValue + " is added,so test case has been passed");
        } else {
            await assert.fail("As specified new tag name " + tagNameValue + " is not added,so test case has been aborted");
        }

        //click on 'Edit' button
        await tagManagementElementsObj.findEditButton(driver, 'Cus Tag Auto 01', 2);
        await driver.sleep(2000);
        //Verify 'Update Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const updateTagPopup = await driver.findElements(By.xpath('//h4[text()="Update Tag"]'));
        const updateTagPopupLength = await updateTagPopup.length;
        if (updateTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'updateTagPopup.png');
            console.log("As add new tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As add new tag popup is not opened,so test case has been aborted");
        }
        const updateTagName = await driver.findElement(By.id('tagInput')).getAttribute('value');
        if (tagNameValue === updateTagName) {
            console.log("As tag name in tag management page as " + tagNameValue + " and tag name in edit page as " + updateTagName + " are equal,so test case has been passed");
        } else {
            await assert.fail("As tag name in tag management page as " + tagNameValue + " and tag name in edit page as " + updateTagName + " are not equal,so test case has been aborted");
        }
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'newTag_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 2: Verify, the user is not able to leave the required tag name field as blank while adding a new tag-----------------

When('the user is not able to leave required {string} field as blank and system should give {string}',async function(tagNameData,expectedTagNameValidation) {
    try {
        //Click on 'Add New Tag' button
        await tagManagementElementsObj.findAddNewTagButton(driver);

        //Verify 'Add New Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const addNewTagPopup = await driver.findElements(By.xpath('//h4[text()="Add Tag"]'));
        const addNewTagPopupLength = await addNewTagPopup.length;
        if (addNewTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'addNewTagPopup.png');
            console.log("As add new tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As add new tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        //Click on 'Add' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(2000);
        const actualTagNameValidation = await driver.findElement(By.xpath("//div[@class='error-message text-danger']")).getText();
        strictEqual(actualTagNameValidation, expectedTagNameValidation);
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(1000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'blankValidation_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 3: Verify, the user is not able to add a duplicate tag----------------------------

When('the user is not able to add a duplicate tag {string} and verify {string} message',async function(tagNameData,expectedDuplicateTagValidation) {
    try {
        //get count of 'Tags' before adding duplicate tag
        const tagElements = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthBeforeAddingDuplicateTag = await tagElements.length;

        //Click on 'Add New Tag' button
        await tagManagementElementsObj.findAddNewTagButton(driver);

        //Verify 'Add New Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const addNewTagPopup = await driver.findElements(By.xpath('//h4[text()="Add Tag"]'));
        const addNewTagPopupLength = await addNewTagPopup.length;
        if (addNewTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'addNewTagPopup.png');
            console.log("As add new tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As add new tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        //Click on 'Add' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(1000);
        const actualTagNameValidationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualTagNameValidationElement));
        const actualTagNameValidation = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualTagNameValidation, expectedDuplicateTagValidation);
        await driver.sleep(5000);
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(1000);

        //get count of 'Tags' after adding duplicate tag
        const tagCount = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthAfterAddingDuplicateTag = await tagCount.length;

        //compare tags count before and after adding duplicate tag
        if (tagLengthBeforeAddingDuplicateTag === tagLengthAfterAddingDuplicateTag) {
            console.log("As new tag is not get added,due to duplicate tag name,test case has been passed");
        } else {
            await assert.fail("As new tag is get added even tag name is duplicate,test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'duplicateValidation_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 4: Verify, the user is not able to add a new tag with more than 100 chars tag name-----------------------------

When('the user is not able to add a new tag with more than 100 chars {string} and verify {string} message',async function(tagNameData,expectedInvalidTagValidation) {
    try {
        //get count of 'Tags' before adding new invalid tag
        const tagElements = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthBeforeAddingInvalidTag = await tagElements.length;

        //Click on 'Add New Tag' button
        await tagManagementElementsObj.findAddNewTagButton(driver);

        //Verify 'Add New Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const addNewTagPopup = await driver.findElements(By.xpath('//h4[text()="Add Tag"]'));
        const addNewTagPopupLength = await addNewTagPopup.length;
        if (addNewTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'addNewTagPopup.png');
            console.log("As add new tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As add new tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        //Click on 'Add' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(2000);
        const actualTagNameValidation = await driver.findElement(By.xpath("//div[@class='error-message text-danger']")).getText();
        strictEqual(actualTagNameValidation, expectedInvalidTagValidation);
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(1000);

        //get count of 'Tags' after adding new invalid tag
        const tagCount = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthAfterAddingInvalidTag = await tagCount.length;

        //compare tags count before and after adding invalid tag
        if (tagLengthBeforeAddingInvalidTag === tagLengthAfterAddingInvalidTag) {
            console.log("As new tag is not get added,due to invalid tag name,test case has been passed");
        } else {
            await assert.fail("As new tag is get added even tag name is invalid,test case has been aborted");
        }
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'invalidTagValidation_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------------Case 5: Verify, the user is able to update a tag name------------------------------------

When('the user is able to update a {string}',async function(tagNameData) {
    try {
        await tagManagementElementsObj.findEditButton(driver, 'Cus Tag Auto 01', 2);
        await driver.sleep(1000);

        //Verify 'Update Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const updateTagPopup = await driver.findElements(By.xpath('//h4[text()="Update Tag"]'));
        const updateTagPopupLength = await updateTagPopup.length;
        if (updateTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'updateTagPopup.png');
            console.log("As update tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As update tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        await driver.sleep(1000);
        //get value of newly added tag name from add new tag popup
        const updateTagName = await driver.findElement(By.id('tagInput')).getAttribute('value');
        console.log(updateTagName);
        //Click on 'Update' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(3000);

        //page navigation and come back to 'Tag Management' page
        await pageNavigationObj.comeBackToTagManagementPage(driver, screenshotPath);
        await driver.sleep(1000);
        //click on 'Edit' button
        await tagManagementElementsObj.findEditButton(driver, 'Cus Tag Auto Updated 01', 2);
        await driver.sleep(2000);
        //Verify 'Update Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const updatedTagPopup = await driver.findElements(By.xpath('//h4[text()="Update Tag"]'));
        const updatedTagPopupLength = await updatedTagPopup.length;
        if (updatedTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedTagPopup.png');
            console.log("As updated tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As updated tag popup is not opened,so test case has been aborted");
        }
        const updatedTagName = await driver.findElement(By.id('tagInput')).getAttribute('value');
        if (updateTagName === updatedTagName) {
            console.log("As tag name in tag management page as " + updatedTagName + " and tag name in edit page as " + updateTagName + " are equal,so test case has been passed");
        } else {
            await assert.fail("As tag name in tag management page as " + updatedTagName + " and tag name in edit page as " + updateTagName + " are not equal,so test case has been aborted");
        }
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(1000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 6: Verify, the user is not able to leave the required tag name field as blank while updating------------------------------

When('the user is not able to leave required {string} field as blank while updating and system should give {string}',async function(tagNameData,expectedTagValidation) {
    try {
        //get count of 'Tags' before updating with blank tag
        const tagElements = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthBeforeUpdatingBlankTag = await tagElements.length;
        await tagManagementElementsObj.findEditButton(driver, 'Cus Tag Auto Updated 01', 2);
        await driver.sleep(1000);
        //Verify 'Update Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const updatedTagPopup = await driver.findElements(By.xpath('//h4[text()="Update Tag"]'));
        const updatedTagPopupLength = await updatedTagPopup.length;
        if (updatedTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedTagPopup.png');
            console.log("As updated tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As updated tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        //Click on 'Update' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(2000);
        const actualTagNameValidation = await driver.findElement(By.xpath("//div[@class='error-message text-danger']")).getText();
        strictEqual(actualTagNameValidation, expectedTagValidation);
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(1000);

        //get count of 'Tags' after updating blank tag
        const tagCount = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthAfterUpdatingBlankTag = await tagCount.length;

        //compare tags count before and after updating blank tag
        if (tagLengthBeforeUpdatingBlankTag === tagLengthAfterUpdatingBlankTag) {
            console.log("As tag is not get updated,due to blank tag name,test case has been passed");
        } else {
            await assert.fail("As tag is get updated even tag name is blank,test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------------Case 7: Verify, the user is not able to update tag with duplicate name---------------------------------

When('the user is not able to update tag with duplicate {string} and verify {string} message',async function(tagNameData,expectedTagValidation) {
    try {
        await tagManagementElementsObj.findAddNewTagButton(driver);
        await driver.sleep(1000);
        const newTag = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(newTag);
        await newTag.sendKeys(tagNameData);
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(3000);
        //get count of 'Tags' before updating with duplicate tag
        const tagElements = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthBeforeUpdatingDuplicateTag = await tagElements.length;
        await tagManagementElementsObj.findEditButton(driver, 'Cus Tag Auto Updated 01', 2);
        await driver.sleep(1000);
        //Verify 'Update Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const updatedTagPopup = await driver.findElements(By.xpath('//h4[text()="Update Tag"]'));
        const updatedTagPopupLength = await updatedTagPopup.length;
        if (updatedTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedTagPopup.png');
            console.log("As updated tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As updated tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        //Click on 'Update' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(1000);
        const actualEditPageTagNameValidationElement = await driver.findElement(By.xpath("//span[@class='noty_text']"));
        await driver.wait(until.elementIsVisible(actualEditPageTagNameValidationElement));
        const actualEditPageTagNameValidation = await driver.findElement(By.xpath("//span[@class='noty_text']")).getText();
        strictEqual(actualEditPageTagNameValidation, expectedTagValidation);
        await driver.sleep(5000);
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(2000);

        //get count of 'Tags' after updating with duplicate tag
        const tagCount = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthAfterUpdatingDuplicateTag = await tagCount.length;

        //compare tags count before and after adding invalid tag
        if (tagLengthBeforeUpdatingDuplicateTag === tagLengthAfterUpdatingDuplicateTag) {
            console.log("As tag is not get updated,due to duplicate tag name,test case has been passed");
        } else {
            await assert.fail("As tag is get updated even tag name is duplicate,test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 8: Verify, the user is not able to update tag with more than 100 chars tag name-------------------------

When('the user is not able to update tag with more than 100 chars {string} and verify {string} message',async function(tagNameData,expectedTagValidation) {
    try {
        //get count of 'Tags' before updating with invalid tag
        const tagElements = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthBeforeUpdatingDuplicateTag = await tagElements.length;
        await tagManagementElementsObj.findEditButton(driver, 'Cus Tag Auto Updated 01', 2);
        await driver.sleep(1000);
        //Verify 'Update Tag' popup opened or not
        await driver.manage().setTimeouts({implicit: 2000});
        const updatedTagPopup = await driver.findElements(By.xpath('//h4[text()="Update Tag"]'));
        const updatedTagPopupLength = await updatedTagPopup.length;
        if (updatedTagPopupLength > 0) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedTagPopup.png');
            console.log("As updated tag popup is opened,test case has been passed");
        } else {
            await assert.fail("As updated tag popup is not opened,so test case has been aborted");
        }
        //Enter data into 'Tag Name' field
        const tagNameField = await tagManagementElementsObj.findTagNameField(driver);
        await clearFieldDataObj.clearFieldData(tagNameField);
        await tagNameField.sendKeys(tagNameData);
        //Click on 'Update' button
        await tagManagementElementsObj.findAddOrUpdateButton(driver);
        await driver.sleep(2000);
        const actualTagNameValidation = await driver.findElement(By.xpath("//div[@class='error-message text-danger']")).getText();
        strictEqual(actualTagNameValidation, expectedTagValidation);
        await driver.sleep(1000);
        await tagManagementElementsObj.findCancelIcon(driver);
        await driver.sleep(1000);

        //get count of 'Tags' after updating with duplicate tag
        const tagCount = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthAfterUpdatingDuplicateTag = await tagCount.length;

        //compare tags count before and after adding invalid tag
        if (tagLengthBeforeUpdatingDuplicateTag === tagLengthAfterUpdatingDuplicateTag) {
            console.log("As tag is not get updated,due to duplicate tag name,test case has been passed");
        } else {
            await assert.fail("As tag is get updated even tag name is duplicate,test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 9: Verify, the product module name should not be displayed when the product app is uninstalled----------------------------------

When('the product module name should not be displayed when the product app is uninstalled',async function() {
    try {
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
        //will set focus on the 'Apps' tab
        await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab
        await appsTab[0].click();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});
        //verify whether product app installation button found or not
        const productAppInstallationButton = await driver.findElements(By.xpath("//h4[text()='Products']/following-sibling::a[text()='Install ']"));
        const productAppInstallationButtonLength = await productAppInstallationButton.length;
        //As if installation button is found i.e; app is not installed yet,so install it
        if (productAppInstallationButtonLength > 0) {
            await tagManagementElementsObj.findProductAppInstallationButton(driver);
            await driver.sleep(3000);
        } else {
            console.log("Already Product app is installed successfully");
        }
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const appsTabClick = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
        //will set focus on the 'Apps' tab
        await driver.executeScript("arguments[0].scrollIntoView();", appsTabClick[0]);
        await driver.wait(until.elementIsVisible(appsTabClick[0]));
        //will click on the 'Apps' tab
        await appsTabClick[0].click();
        await driver.sleep(2000);
        //configure 'Product' App
        await tagManagementElementsObj.configureProductApp(driver);
        await driver.sleep(2000);
        await tagManagementElementsObj.findProductAppRemoveButton(driver);
        await driver.wait(until.stalenessOf(await driver.findElement(By.id('btnRemove'))));
        await driver.sleep(2000);
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const tagManagementTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();", tagManagementTab[0]);
        await driver.wait(until.elementIsVisible(tagManagementTab[0]));
        //will click on the 'Tag Management' tab
        await tagManagementTab[0].click();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify visibility of 'Product' grid in 'Tag Management' Page
        const productColumn = await driver.findElements(By.xpath("//span[text()='Product']"));
        const productColumnLength = await productColumn.length;
        //As 'Product App' is uninstalled,product column grid should not be displayed under tag management page
        try {
            if (productColumnLength === 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'productGridInvisible.png');
                console.log("As product app is uninstalled,product column is not visible under tag management page,so test case has been passed");
            } else {
                await assert.fail("As even product app is uninstalled,product column is displayed under tag management page,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 10: Verify, the product module name is displayed only when the product app is installed----------------------------

When('the product module name is displayed only when the product app is installed',async function() {
    try {
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
        //will set focus on the 'Apps' tab
        await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab
        await appsTab[0].click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        //verify whether product app installation button found or not
        const productAppInstallationButton = await driver.findElements(By.xpath("//h4[text()='Products ']/following-sibling::a[text()='Install ']"));
        const productAppInstallationButtonLength = await productAppInstallationButton.length;
        //As if installation button is found i.e; app is not installed yet,so install it
        if (productAppInstallationButtonLength > 0) {
            await tagManagementElementsObj.findProductAppInstallationButton(driver);
            await driver.sleep(2000);
        } else {
            console.log("Already Product app is installed successfully");
        }
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const tagManagementTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();", tagManagementTab[0]);
        await driver.wait(until.elementIsVisible(tagManagementTab[0]));
        //will click on the 'Tag Management' tab
        await tagManagementTab[0].click();
        await driver.sleep(1000);
        await driver.manage().setTimeouts({implicit: 2000});

        //verify visibility of 'Product' grid in 'Tag Management' Page
        const productColumn = await driver.findElements(By.xpath("//span[text()='Product']"));
        const productColumnLength = await productColumn.length;
        //As 'Product App' is uninstalled,product column grid should not be displayed under tag management page
        try {
            if (productColumnLength > 0) {
                await screenshotObj.takeScreenshot(driver, screenshotPath + 'productGridInvisible.png');
                console.log("As product app is installed,product column is visible under tag management page,so test case has been passed");
            } else {
                await assert.fail("As even product app is installed,product column is not displayed under tag management page,so test case has been aborted");
            }
        } catch (err) {
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 11: Verify, the singular module name is displayed on the tags list----------------------------

When('the singular module name is displayed on the tags list',async function() {
    try {
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' System Modules ');
        //will set focus on the 'System Modules' tab
        await driver.executeScript("arguments[0].scrollIntoView();", systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab
        await systemModulesTab[0].click();
        await driver.sleep(2000);

        //get length of 'Modules' in 'System Modules' page
        const systemModuleElements = await driver.findElements(By.xpath("//div[@id='module']/div"));
        const systemModulesLength = await systemModuleElements.length;
        console.log(systemModulesLength);

        //click on 'Contact Edit' button module
        await tagManagementElementsObj.findModulesEditButton(driver, 'Contact');
        await driver.sleep(3000);
        //screenshot for displayed 'Contact' Module
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactModule.png');
        //get values of 'Singular and Plural' modules
        const contactSingularModule = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Singular Name: " + contactSingularModule);
        const contactPluralModule = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Plural Name: " + contactPluralModule);
        await tagManagementElementsObj.findModulesCancelButton(driver);
        await driver.sleep(2000);

        //click on 'Activity Edit' button module
        await tagManagementElementsObj.findModulesEditButton(driver, 'Activity');
        await driver.sleep(3000);
        //screenshot for displayed 'Activity' Module
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'activityModule.png');
        //get values of 'Singular and Plural' modules
        const activitySingularModule = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Singular Name: " + activitySingularModule);
        const activityPluralModule = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Plural Name: " + activityPluralModule);
        await tagManagementElementsObj.findModulesCancelButton(driver);
        await driver.sleep(2000);

        //click on 'Deal Edit' button module
        await tagManagementElementsObj.findModulesEditButton(driver, 'Deal');
        await driver.sleep(3000);
        //screenshot for displayed 'Deal' Module
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'dealModule.png');
        //get values of 'Singular and Plural' modules
        const dealSingularModule = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Singular Name: " + dealSingularModule);
        const dealPluralModule = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Plural Name: " + dealPluralModule);
        await tagManagementElementsObj.findModulesCancelButton(driver);
        await driver.sleep(2000);

        //click on 'Company Edit' button module
        await tagManagementElementsObj.findModulesEditButton(driver, 'Company');
        await driver.sleep(3000);
        //screenshot for displayed 'Company' Module
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'companyModule.png');
        //get values of 'Singular and Plural' modules
        const companySingularModule = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Singular Name: " + companySingularModule);
        const companyPluralModule = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Plural Name: " + companyPluralModule);
        await tagManagementElementsObj.findModulesCancelButton(driver);
        await driver.sleep(2000);

        //click on 'Product Edit' button module
        await tagManagementElementsObj.findModulesEditButton(driver, 'Product');
        await driver.sleep(3000);
        //screenshot for displayed 'Product' Module
        await screenshotObj.takeScreenshot(driver, screenshotPath + '01_moduleAccessibility.png');
        //get values of 'Singular and Plural' modules
        const productSingularModule = await driver.findElement(By.id('singularName')).getAttribute('value');
        console.log("Singular Name: " + productSingularModule);
        const productPluralModule = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Plural Name: " + productPluralModule);
        await tagManagementElementsObj.findModulesCancelButton(driver);
        await driver.sleep(2000);

        //for opening 'Tag Management' Page
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const tagManagementTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();", tagManagementTab[0]);
        await driver.wait(until.elementIsVisible(tagManagementTab[0]));
        //will click on the 'Tag Management' tab
        await tagManagementTab[0].click();
        await driver.sleep(2000);

        //get values of 'Singular' modules on 'Tag Management' Page
        const contactTag = await driver.findElement(By.xpath("//div[4]//span[@class='ag-header-cell-text']")).getText();
        const contactTagModule = await contactTag.toLowerCase();
        console.log(contactTagModule);
        const companyTag = await driver.findElement(By.xpath("//div[5]//span[@class='ag-header-cell-text']")).getText();
        const companyTagModule = await companyTag.toLowerCase();
        console.log(companyTagModule);
        const activityTag = await driver.findElement(By.xpath("//div[6]//span[@class='ag-header-cell-text']")).getText();
        const activityTagModule = await activityTag.toLowerCase();
        console.log(activityTagModule);
        const dealTag = await driver.findElement(By.xpath("//div[7]//span[@class='ag-header-cell-text']")).getText();
        const dealTagModule = await dealTag.toLowerCase();
        console.log(dealTagModule);
        const productTag = await driver.findElement(By.xpath("//div[8]//span[@class='ag-header-cell-text']")).getText();
        const productTagModule = await productTag.toLowerCase();
        console.log(productTagModule);

        //get length of 'Tag Modules' in 'Tag Management' page
        const tagModulesElements = await driver.findElements(By.xpath("//div[@ref='eLabel']/following::span[@ref='eText'][4]"));
        const tagModulesLength = await tagModulesElements.length;
        console.log(tagModulesLength);

        if (systemModulesLength === tagModulesLength) {
            console.log("As both system modules and tag modules lengths are same,test case has been passed");
        } else {
            await assert.fail("As system modules and tag modules lengths are not same,test case has been aborted");
        }
        if (contactSingularModule.toLowerCase() === contactTagModule && companySingularModule.toLowerCase() === companyTagModule && activitySingularModule.toLowerCase() === activityTagModule && dealSingularModule.toLowerCase() === dealTagModule && productSingularModule.toLowerCase() === productTagModule) {
            console.log("As system modules and tag modules names are same,test case has been passed");
        } else {
            await assert.fail("As system modules and tag modules names are not same,test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 12: Verify, on click of the ‘see associated record’ link, the system should redirect to the respective module-------------------------------

When('click on ‘see associated record’ link, the system should redirect to the respective module',async function() {
    try {
        //click on 'See Contacts' link
        await tagManagementElementsObj.findModuleLink(driver, 'Contact');
        await driver.sleep(2000);
        //verify whether 'Contact Module List Page' is opened or not
        const contactPageURL = await driver.getCurrentUrl();
        try {
            await contactPageURL.includes('/app/contacts/list');
            console.log("As 'See Contacts' link is redirected to contacts listing page,so test case has been passed");
        } catch (err) {
            await assert.fail("As 'See Contacts' link is not redirected to contacts listing page,so test case has been aborted");
            await assert.fail(err);
        }
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const tagManagementTabClick = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();", tagManagementTabClick[0]);
        await driver.wait(until.elementIsVisible(tagManagementTabClick[0]));
        //will click on the 'Tag Management' tab
        await tagManagementTabClick[0].click();
        await driver.sleep(1000);

        //click on 'See Companies' link
        await tagManagementElementsObj.findModuleLink(driver, 'Company');
        await driver.sleep(2000);
        //verify whether 'Company Module List Page' is opened or not
        const companyPageURL = await driver.getCurrentUrl();
        try {
            await companyPageURL.includes('/app/companies/list');
            console.log("As 'See Companies' link is redirected to companies listing page,so test case has been passed");
        } catch (err) {
            await assert.fail("As 'See Companies' link is not redirected to companies listing page,so test case has been aborted");
            await assert.fail(err);
        }
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const tagTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();", tagTab[0]);
        await driver.wait(until.elementIsVisible(tagTab[0]));
        //will click on the 'Tag Management' tab
        await tagTab[0].click();
        await driver.sleep(1000);

        //click on 'See Activities' link
        await tagManagementElementsObj.findModuleLink(driver, 'Task');
        await driver.sleep(2000);
        //verify whether 'Activity Module List Page' is opened or not
        const activityPageURL = await driver.getCurrentUrl();
        try {
            await activityPageURL.includes('/app/tasks/list');
            console.log("As 'See Activities' link is redirected to activities listing page,so test case has been passed");
        } catch (err) {
            await assert.fail("As 'See Activities' link is not redirected to activities listing page,so test case has been aborted");
            await assert.fail(err);
        }
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const tagManagementTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();", tagManagementTab[0]);
        await driver.wait(until.elementIsVisible(tagManagementTab[0]));
        //will click on the 'Tag Management' tab
        await tagManagementTab[0].click();
        await driver.sleep(1000);

        //click on 'See Deals' link
        await tagManagementElementsObj.findModuleLink(driver, 'Deal');
        await driver.sleep(2000);
        //verify whether 'Deal Module List Page' is opened or not
        const dealPageURL = await driver.getCurrentUrl();
        try {
            await dealPageURL.includes('/app/deals/list');
            console.log("As 'See Deals' link is redirected to deals listing page,so test case has been passed");
        } catch (err) {
            await assert.fail("As 'See Deals' link is not redirected to deals listing page,so test case has been aborted");
            await assert.fail(err);
        }
        await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
        const tagManagement = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Tag Management ');
        //will set focus on the 'Tag Management' tab
        await driver.executeScript("arguments[0].scrollIntoView();", tagManagement[0]);
        await driver.wait(until.elementIsVisible(tagManagement[0]));
        //will click on the 'Tag Management' tab
        await tagManagement[0].click();
        await driver.sleep(1000);

        //click on 'See Products' link
        await tagManagementElementsObj.findModuleLink(driver, 'Product');
        await driver.sleep(2000);
        //verify whether 'Product Module List Page' is opened or not
        const productPageURL = await driver.getCurrentUrl();
        try {
            await productPageURL.includes('/app/products/list');
            console.log("As 'See Products' link is redirected to products listing page,so test case has been passed");
        } catch (err) {
            await assert.fail("As 'See Products' link is not redirected to products listing page,so test case has been aborted");
            await assert.fail(err);
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------------------Case 13: Verify, the user is able to delete a tag-----------------------------------

When('the user is able to delete a tag',async function() {
    try {
        //get count of 'Tags' before cancelling delete tag
        const tagElements = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthBeforeDeletingTag = await tagElements.length;

        //click on 'Delete Link' of specified 'Tag Name'
        await tagManagementElementsObj.findDeleteTagLink(driver, 'Cus Tag Auto Updated 01', 1);
        await driver.findElement(By.xpath('//button[text()="No"]')).click();
        await driver.sleep(2000);

        //get count of 'Tags' after cancelling delete tag
        const tagCount = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthAfterCancellingDeleteTag = await tagCount.length;

        //compare tags count before deleting and after cancelling delete tag
        if (tagLengthBeforeDeletingTag === tagLengthAfterCancellingDeleteTag) {
            console.log("As tag is not get deleted,as delete operation is cancelled,test case has been passed");
        } else {
            await assert.fail("As tag is get deleted even after cancellation of delete operation,so test case has been aborted");
        }

        //'Delete' specified tag
        await tagManagementElementsObj.findDeleteTagLink(driver, 'Cus Tag Auto Updated 01', 1);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(3000);
        //page navigation and come back to tag management page
        await pageNavigationObj.comeBackToTagManagementPage(driver, screenshotPath);
        await driver.sleep(2000);
        //get count of 'Tags' after deleting tag
        const tagElementsCount = await driver.findElements(By.xpath("//div[@col-id='tag']"));
        const tagLengthAfterDeletingTag = await tagElementsCount.length;

        //compare tags count before cancelling delete tag and after deleting tag
        if ((tagLengthBeforeDeletingTag) - 1 === tagLengthAfterDeletingTag) {
            console.log("As tag is get deleted and count of tags is (X-1),test case has been passed");
        } else {
            await assert.fail("As tag is not get deleted even after deleting tag,so test case has been aborted");
        }

        await driver.manage().setTimeouts({implicit: 2000});
        //Also verify that deleted "Tag Name' should not be displayed
        const deletedTagName = await driver.findElements(By.xpath("//span[text()='Cus Tag Auto Updated 01']"));
        const deletedTagLength = await deletedTagName.length;
        if (deletedTagLength === 0) {
            console.log("As deleted tag is not found after deletion operation,so test case has been passed");
        } else {
            await assert.fail("As tag is not deleted and displayed after deletion operation,test case has been aborted");
        }
        await tagManagementElementsObj.findDeleteTagLink(driver, 'sampleTag', 1);
        await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(2000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
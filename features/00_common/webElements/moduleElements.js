const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/00_common/screenshots/';

//*-------------------Common Module Elements-----------------------*//

async function findModuleIcon(driver,moduleName) {
    let moduleIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        moduleIcon = await driver.findElement(By.xpath(`//span[@class="${moduleName}"]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'moduleName_NotFound.png');
        await assert.fail(err);
    }
    return moduleIcon;
}exports.findModuleIcon = findModuleIcon;

async function findEditButton(driver) {
    let editButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editButton = await driver.findElement(By.xpath('//td[text()="Standard"]/following::a[1]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editButton_NotFound.png');
        await assert.fail("As edit button is not found,so test case has been aborted");
    }
    return editButton;
}exports.findEditButton = findEditButton;

async function findModulesEditButton(driver,moduleName) {
    let modulesEditButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        modulesEditButton = await driver.findElement(By.xpath(`//div[contains(text(),"${moduleName}")]/descendant::button[1]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'modulesEditButton_NotFound.png');
        await assert.fail("As modules edit button is not found,so test case has been aborted");
    }
    return modulesEditButton;
}exports.findModulesEditButton = findModulesEditButton;

async function enableOrDisableToggleButtons(driver,names = [], toggleValue = 'disable') {
    for(let i = 0; i < names.length; i++) {
        const toggleButton = await driver.findElement(By.name(names[i]));
        const currentValue = await toggleButton.getAttribute("value") === 'true' ? 'enable' : 'disable';
        if(currentValue !== toggleValue) {
            await driver.executeScript("arguments[0].click();", toggleButton);
        }
    }
}exports.enableOrDisableToggleButtons = enableOrDisableToggleButtons;

async function findEditIcon(driver,editIconNumber) {
    let editIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editIcon = await driver.findElement(By.xpath(`(//i[@class='icon-pencil2'])[${editIconNumber}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editIcon_NotFound.png');
        await assert.fail(err);
    }
    return editIcon;
}exports.findEditIcon = findEditIcon;

async function findCloseIcon(driver) {
    let closeIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        closeIcon = await driver.findElement(By.xpath('//button[@class="close"] | //quick-view-contact//i[@class="icon-close"] | //quick-view-company//i[@class="icon-close"] | //quick-view-deal//div/div/a/i[@class="icon-close"] | //div[2]/div[@class="material-header quickview-header"]/a | //ngb-modal-window/div//add-deal//button[@class="close"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'closeIcon_NotFound.png');
        await assert.fail(err);
    }
    return closeIcon;
}exports.findCloseIcon = findCloseIcon;

async function findPreviewPageCloseIcon(driver) {
    let preViewPageCloseIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        preViewPageCloseIcon = await driver.findElement(By.xpath('//div/a/i[@class="icon-close"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'preViewPageCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    return preViewPageCloseIcon;
}exports.findPreviewPageCloseIcon = findPreviewPageCloseIcon;

async function findQuickViewPageCloseIcon(driver) {
    let quickViewPageCloseIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        quickViewPageCloseIcon = await driver.findElement(By.xpath('//ngb-modal-window[2]/div//div[@class="modal-header"]/button | //div[@class="material-header quickview-header"]/a'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'quickViewPageCloseIcon_NotFound.png');
        await assert.fail(err);
    }
    return quickViewPageCloseIcon;
}exports.findQuickViewPageCloseIcon = findQuickViewPageCloseIcon;

async function findQuickViewPageSaveButton(driver) {
    let quickViewPageSaveButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        quickViewPageSaveButton = await driver.findElement(By.xpath('//ngb-modal-window[2]//button[@id="btnSubmit"]//span[.=" Save "]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'quickViewPageSaveButton_NotFound.png');
        await assert.fail(err);
    }
    return quickViewPageSaveButton;
}exports.findQuickViewPageSaveButton = findQuickViewPageSaveButton;

async function findEditPageSaveButton(driver) {
    let editPageSaveButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editPageSaveButton = await driver.findElement(By.xpath('//ngb-modal-window//sm-button[2]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageSaveButton_NotFound.png');
        await assert.fail(err);
    }
    return editPageSaveButton;
}exports.findEditPageSaveButton = findEditPageSaveButton;

async function findEditPageCancelButton(driver) {
    let editPageCancelButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        editPageCancelButton = await driver.findElement(By.xpath('//ngb-modal-window//div[@class="modal-header"]/button[@type="button"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageCancelButton_NotFound.png');
        await assert.fail(err);
    }
    return editPageCancelButton;
}exports.findEditPageCancelButton = findEditPageCancelButton;

async function findPopupByXpath(driver,section,attributeName,attributeValue,elementName) {
    let popupByXpath;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        popupByXpath = await driver.findElement(By.xpath(`//ngb-modal-window[2]//${section}[@${attributeName}="${attributeValue}"]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+elementName+'_NotFound.png');
        await assert.fail(err);
    }
    return popupByXpath;
}exports.findPopupByXpath = findPopupByXpath;

async function findPopupByVisibleText(driver,section,textName) {
    let popupByXpath;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        popupByXpath = await driver.findElement(By.xpath(`//ngb-modal-window[2]//${section}[text()="${textName}"]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+textName+'_NotFound.png');
        await assert.fail(err);
    }
    return popupByXpath;
}exports.findPopupByVisibleText = findPopupByVisibleText;

async function findOptionsButton(driver) {
    let optionsButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        optionsButton = await driver.findElement(By.xpath('//div/div/div[1]/div[2]/a/span'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'optionsButton_NotFound.png');
        await assert.fail(err);
    }
    return optionsButton;
}exports.findOptionsButton = findOptionsButton;

async function findPreviewPageOptionsButton(driver) {
    let previewPageOptionsButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        previewPageOptionsButton = await driver.findElement(By.xpath('//div/div/div[1]/div[2]/a/span'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'previewPageOptionsButton_NotFound.png');
        await assert.fail(err);
    }
    return previewPageOptionsButton;
}exports.findPreviewPageOptionsButton = findPreviewPageOptionsButton;

async function clickOnModuleName(driver,moduleIndex) {
    let clickOnModuleName;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        clickOnModuleName = await driver.findElement(By.xpath(`(//a[contains(@class,'text-ellipsis')])[${moduleIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'moduleName_NotFound.png');
        await assert.fail(err);
    }
    return clickOnModuleName;
}exports.clickOnModuleName = clickOnModuleName;

async function findTagsField(driver) {
    let tagsField;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        tagsField = await driver.findElement(By.xpath('//sm-tag/sm-element//ro-tag/div/input[@type="text"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'tagsField_NotFound.png');
        await assert.fail(err);
    }
    return tagsField;
}exports.findTagsField = findTagsField;

async function findCrossRemoveIcon(driver) {
    let crossRemoveIcon;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        crossRemoveIcon = await driver.findElement(By.xpath('//ro-tag//i[@class="icon-close"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'crossRemoveIcon_NotFound.png');
        await assert.fail(err);
    }
    return crossRemoveIcon;
}exports.findCrossRemoveIcon = findCrossRemoveIcon;

//*----------------Common Product Module Elements---------------------*//

async function findAllProductsCheckbox(driver) {
    let allProductsCheckbox;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        allProductsCheckbox = await driver.findElement(By.xpath('//div[1]/div[1]/div/div[1]/grid-component//i'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'allProductsCheckbox_NotFound.png');
        await assert.fail(err);
    }
    await driver.sleep(1000);
    return allProductsCheckbox;
}exports.findAllProductsCheckbox = findAllProductsCheckbox;

async function findProductCheckbox(driver,productNumber) {
    let productCheckbox;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        productCheckbox = await driver.findElement(By.xpath(`(//span[@class="ag-selection-checkbox"])[${productNumber}] | (//div[@class="ag-selection-checkbox"])[${productNumber}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'productCheckbox_NotFound.png');
        await assert.fail(err);
    }
    await driver.sleep(1000);
    return productCheckbox;
}exports.findProductCheckbox = findProductCheckbox;

//*----------------Common Contact Module Elements---------------------*//

async function findContactModule(driver) {
    let contactModule;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactModule = await driver.findElement(By.xpath('//span[@class="icon-ic_contacts"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactModule_NotFound.png');
        await assert.fail(err);
    }
    return contactModule;
}exports.findContactModule = findContactModule;

async function clickOnContactName(driver,contactNumber) {
    let contactName;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactName = await driver.findElement(By.xpath(`(//a[contains(@class,"entity-show-link text-ellipsis")])[${contactNumber}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactName_NotFound.png');
        await assert.fail(err);
    }
    return contactName;
}exports.clickOnContactName = clickOnContactName;

async function findContactName(driver,contactName) {
    let contactNameField;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactNameField = await driver.findElement(By.xpath(`//a[text()=" ${contactName} "]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactName_NotFound.png');
        await assert.fail(err);
    }
    return contactNameField;
}exports.findContactName = findContactName;

async function findContactCheckbox(driver,moduleIndex) {
    let contactCheckbox;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactCheckbox = await driver.findElement(By.xpath(`(//span[@class="ag-selection-checkbox"])[${moduleIndex}] | (//div[@class="ag-selection-checkbox"])[${moduleIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactCheckbox_NotFound.png');
        await assert.fail(err);
    }
    return contactCheckbox;
}exports.findContactCheckbox = findContactCheckbox;

async function findPreViewButton(driver,previewIndex) {
    let preViewButton;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        preViewButton = await driver.findElement(By.xpath(`(//i[@class="icon-eye"])[${previewIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'preViewButton_NotFound.png');
        await assert.fail(err);
    }
    return preViewButton;
}exports.findPreViewButton = findPreViewButton;

//----------------Deal Elements--------------------

async function clickOnDealName(driver,dealIndex) {
    let contactName;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        contactName = await driver.findElement(By.xpath(`(//a[@class="entity-show-link text-ellipsis show-eye-only"])[${dealIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'dealName_NotFound.png');
        await assert.fail(err);
    }
    return contactName;
}exports.clickOnDealName = clickOnDealName;
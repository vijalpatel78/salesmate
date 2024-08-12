const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/07_company/07_companyDetails/06_addNote/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findAddNote(driver) {
    let addNote;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addNote = await driver.findElement(By.id('description')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNote_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addNote;
}exports.findAddNote = findAddNote;

async function findSaveButton(driver) {
    let saveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        saveButton = await driver.findElement(By.xpath('//button[text()=" Save "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return saveButton;
}exports.findSaveButton = findSaveButton;

async function findFormatOption(driver,datacmdAttribute) {
    let formatOption;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        formatOption = await driver.findElement(By.xpath(`//button[@data-cmd="${datacmdAttribute}"]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+datacmdAttribute+'attribute_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return formatOption;
}exports.findFormatOption = findFormatOption;

async function findAddNoteTextAreaField(driver){
    let addNoteTextAreaField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addNoteTextAreaField = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]/div'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNoteTextArea_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addNoteTextAreaField;
}exports.findAddNoteTextAreaField = findAddNoteTextAreaField;

async function findAddNoteFormatOption(driver,screenshotPath,datacmdAttributeValue){
    let addNoteFormatOption;
    try{
        addNoteFormatOption = await driver.findElement(By.css('button[data-cmd="'+datacmdAttributeValue+'"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+datacmdAttributeValue+'_addNoteFormatOption_formatOpt_NotFound.png');
        await assert.fail('Due to the '+datacmdAttributeValue+' addNoteFormatOption format option is not found, the test case has been failed');
    }
    await driver.wait(until.elementIsVisible(addNoteFormatOption));
    return addNoteFormatOption;
}exports.findAddNoteFormatOption=findAddNoteFormatOption;

async function findAddNoteURLField(driver){
    let addNoteURLField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addNoteURLField = await driver.findElement(By.id('fr-link-insert-layer-url-1'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNoteURLField_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addNoteURLField;
}exports.findAddNoteURLField = findAddNoteURLField;

async function findAddNoteURLTextField(driver){
    let addNoteURLTextField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addNoteURLTextField = await driver.findElement(By.id('fr-link-insert-layer-text-1'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNoteURLTextField_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addNoteURLTextField;
}exports.findAddNoteURLTextField = findAddNoteURLTextField;

async function findAddNoteImageURLField(driver){
    let addNoteImageURLField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addNoteImageURLField = await driver.findElement(By.xpath('//input[@id="fr-image-by-url-layer-text-1"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNoteImageURLField_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addNoteImageURLField;
}exports.findAddNoteImageURLField = findAddNoteImageURLField;

async function findInsertButton(driver){
    let insertButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        insertButton = await driver.findElement(By.id('fr-link-insert-layer-url-1'));
        await driver.executeScript("arguments[0].click();",insertButton);
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'insertButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return insertButton;
}exports.findInsertButton = findInsertButton;

async function findFontFamilyValue(driver,fontFamilyValue){
    let notesTab;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        notesTab = await driver.findElement(By.xpath(`//a[text()="${fontFamilyValue}"]`));
        await driver.executeScript("arguments[0].click();",notesTab);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'notesTab_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return notesTab;
}exports.findFontFamilyValue = findFontFamilyValue;

async function findCancelButton(driver){
    let cancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelButton = await driver.findElement(By.xpath('//div[@id="toolbar"]//button[@type="button"]'));
        await driver.executeScript("arguments[0].click();",cancelButton);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelButton;
}exports.findCancelButton = findCancelButton;

async function findUserName(driver,userName){
    let userNameElement;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        userNameElement = await driver.findElement(By.xpath(`//div[@class="tribute-container"]/ul/li[text()="${userName} "]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'userName_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return userNameElement;
}exports.findUserName = findUserName;

async function findPinIcon(driver,pinIndex){
    let pinIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        pinIcon = await driver.findElement(By.xpath(`//timeline-note[${pinIndex}]//div[@role="group"]/button[2]/i[@class="icon-pin-22"]`));
        await driver.executeScript("arguments[0].click();",pinIcon);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'pinIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return pinIcon;
}exports.findPinIcon = findPinIcon;

async function findUnPinIcon(driver,pinIndex){
    let unPinIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        unPinIcon = await driver.findElement(By.xpath(`//div[@class='pinnedContainer']/timeline-note[${pinIndex}]//div[@role='group']/button[2]/i[@class='icon-unpin']`));
        await driver.executeScript("arguments[0].click();",unPinIcon);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'unPinIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return unPinIcon;
}exports.findUnPinIcon = findUnPinIcon;

async function findUpdateIcon(driver,updateIconIndex){
    let updateIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        updateIcon = await driver.findElement(By.xpath(`//div/timeline-note[${updateIconIndex}]//div[@role='group']/button[1]`));
        await driver.executeScript("arguments[0].click();",updateIcon);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'updateIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return updateIcon;
}exports.findUpdateIcon = findUpdateIcon;

async function findDeleteIcon(driver,deleteIconIndex){
    let deleteIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteIcon = await driver.findElement(By.xpath(`//timeline-note[${deleteIconIndex}]//div[@role='group']/button[3]`));
        await driver.executeScript("arguments[0].click();",deleteIcon);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteIcon_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteIcon;
}exports.findDeleteIcon = findDeleteIcon;

async function findConfirmationButton(driver,buttonName){
    let confirmationButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        confirmationButton = await driver.findElement(By.xpath(`//button[text()="${buttonName}"]`));
        await driver.executeScript("arguments[0].click();",confirmationButton);
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'confirmationButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return confirmationButton;
}exports.findConfirmationButton = findConfirmationButton;


async function findFileDeleteButton(driver){
    let fileDeleteButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        fileDeleteButton = await driver.findElement(By.xpath('//i[@class="icon-trash text-danger"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileDeleteButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return fileDeleteButton;
}exports.findFileDeleteButton = findFileDeleteButton;

async function findImageURL(driver){
    let imageURL;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        imageURL = await driver.findElement(By.id('fr-image-by-url-layer-text-1'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'imageURL_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return imageURL;
}exports.findImageURL = findImageURL;

async function findImgInsertButton(driver){
    let imgInsertButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        imgInsertButton = await driver.findElement(By.xpath('//button[@data-cmd="imageInsertByURL"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'insertButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return imgInsertButton;
}exports.findImgInsertButton = findImgInsertButton;
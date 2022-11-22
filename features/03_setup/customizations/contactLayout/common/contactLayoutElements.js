const { By } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/customizations/contactLayout/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findNewSection(driver) {
    let addNewSection;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        await driver.findElement(By.id('btnGroupDrop1')).click();
        await driver.sleep(1000);
        addNewSection = await driver.findElement(By.xpath("//a[text()='Add New Section']")).click();
        await driver.sleep(1500);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addNewSection_NotFound.png');
        await assert.fail("As add new section is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addNewSection;
}exports.findNewSection = findNewSection;

async function findSectionNameField(driver) {
    let sectionNameField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sectionNameField = await driver.findElement(By.id('name'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'sectionNameField_NotFound.png');
        await assert.fail("As section name field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sectionNameField;
}exports.findSectionNameField = findSectionNameField;

async function findSaveButton(driver) {
    let saveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        saveButton = await driver.findElement(By.id('btnSubmit')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'saveButton_NotFound.png');
        await assert.fail("As save button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return saveButton;
}exports.findSaveButton = findSaveButton;

async function findSectionEditButton(driver,sectionName) {
    let sectionEditButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sectionEditButton = await driver.findElement(By.xpath(`//a[text()='${sectionName}']/following::span[@class='icon-pencil2 default-text']`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'sectionEditButton_NotFound.png');
        await assert.fail("As section edit button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sectionEditButton;
}exports.findSectionEditButton = findSectionEditButton;

async function findCancelButton(driver) {
    let cancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelButton = await driver.findElement(By.xpath('//button[@class="btn-default btn btn-sm pull-left"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'cancelButton_NotFound.png');
        await assert.fail("As cancel button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelButton;
}exports.findCancelButton = findCancelButton;

async function findExpandOrCollapseArrow(driver,sectionName) {
    let expandOrCollapseArrow;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        expandOrCollapseArrow = await driver.findElement(By.xpath(`//a[text()='${sectionName}']//span`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'expandOrCollapseArrow_NotFound.png');
        await assert.fail("As expand or collapse button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return expandOrCollapseArrow;
}exports.findExpandOrCollapseArrow = findExpandOrCollapseArrow;

async function findNewCustomFieldButton(driver) {
    let newCustomFieldButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        newCustomFieldButton = await driver.findElement(By.xpath('//button[text()=" New Custom Field "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'newCustomFieldButton_NotFound.png');
        await assert.fail("As new custom field button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return newCustomFieldButton;
}exports.findNewCustomFieldButton = findNewCustomFieldButton;

async function selectFieldType(driver,fieldTypeName) {
    let selectTextType;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        selectTextType = await driver.findElement(By.xpath(`//ul[@class="list-group"]//h5[text()="${fieldTypeName}"]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'selectTextType_NotFound.png');
        await assert.fail("As select text type column is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return selectTextType;
}exports.selectFieldType = selectFieldType;

async function findLabelNameField(driver) {
    let labelNameField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        labelNameField = await driver.findElement(By.id('displayName'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'labelNameField_NotFound.png');
        await assert.fail("As label name field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return labelNameField;
}exports.findLabelNameField = findLabelNameField;

async function findRequiredCheckbox(driver) {
    let requiredCheckbox;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        requiredCheckbox = await driver.findElement(By.id('isRequired'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'requiredCheckbox_NotFound.png');
        await assert.fail("As required checkbox is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return requiredCheckbox;
}exports.findRequiredCheckbox = findRequiredCheckbox;

async function customFieldEditButton(driver,fieldName,sectionNumber,fieldNumber) {
    let customFieldEditButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        await driver.findElement(By.xpath(`//div[text()=' ${fieldName} ']`)).click();
        await driver.findElement(By.xpath(`//div[${sectionNumber}]/table[@class='panel-body sortableSectionPanel']//td/div[${fieldNumber}]/div//ul[@class='nav']/li/a/span`)).click();
        await driver.sleep(1000);
        customFieldEditButton = await driver.findElement(By.xpath(`//div[${sectionNumber}]/table[@class='panel-body sortableSectionPanel']//td/div[${fieldNumber}]/div//ul[@class='nav']//ul[@class='dropdown-menu pull-right']/li[1]/a[@class='text']`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'customFieldEditButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return customFieldEditButton;
}exports.customFieldEditButton = customFieldEditButton;

async function findListTextAreaField(driver) {
    let listTextAreaField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        listTextAreaField = await driver.findElement(By.id('selectMultiSelectOptions'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listTextAreaField_NotFound.png');
        await assert.fail("As list text area field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return listTextAreaField;
}exports.findListTextAreaField = findListTextAreaField;

async function findAssociationTypeField(driver,value) {
    let associationTypeField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        associationTypeField = await driver.findElement(By.xpath(`//input[@value='${value}']`));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'associationTypeField_NotFound.png');
        await assert.fail("As association type field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return associationTypeField;
}exports.findAssociationTypeField = findAssociationTypeField;

async function findRecordLabelField(driver) {
    let recordLabelField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        recordLabelField = await driver.findElement(By.id('relatedRecordName'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'recordLabelField_NotFound.png');
        await assert.fail("As record label field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return recordLabelField;
}exports.findRecordLabelField = findRecordLabelField;

async function findLabelRecordListValidation(driver,validationNumber) {
    let labelRecordListFieldsValidation;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        labelRecordListFieldsValidation = await driver.findElement(By.xpath(`//div[1]/div[2]/sm-input-txt[${validationNumber}]/sm-element//div[@class='error-message text-danger']`)).getText();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'labelRecordListValidation_NotFound.png');
        await assert.fail("As label or record or list fields validation message is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return labelRecordListFieldsValidation;
}exports.findLabelRecordListValidation = findLabelRecordListValidation;

async function findChangeLink(driver) {
    let recordLabelField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        recordLabelField = await driver.findElement(By.xpath('//a[text()="Change"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'recordLabelField_NotFound.png');
        await assert.fail("As record label field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return recordLabelField;
}exports.findChangeLink = findChangeLink;

async function findCustomFieldsCount(driver) {
    let customFieldsCount;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        customFieldsCount = await driver.findElements(By.xpath("//div[1]/table[@class='panel-body sortableSectionPanel']//div[@class='list-group-item cursor-move m-b ui-sortable-handle']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'customFieldsCount_NotFound.png');
        await assert.fail("As custom fields are not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return customFieldsCount;
}exports.findCustomFieldsCount = findCustomFieldsCount;

async function findSearchField(driver) {
    let searchField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        searchField = await driver.findElement(By.xpath('//input[@placeholder="Search Field"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'searchField_NotFound.png');
        await assert.fail("As search field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return searchField;
}exports.findSearchField = findSearchField;

async function findCloseIcon(driver) {
    let closeIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        closeIcon = await driver.findElement(By.xpath('//button[@class="close"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'closeIcon_NotFound.png');
        await assert.fail("As close icon is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return closeIcon;
}exports.findCloseIcon = findCloseIcon;

async function findListDeleteIcon(driver,listNumber) {
    let listDeleteIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        listDeleteIcon = await driver.findElement(By.xpath(`//li[${listNumber}]//a[@href="javascript:void(0);"]/div[@class="icon-trash m-t-sm"]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listDeleteIcon_NotFound.png');
        await assert.fail("As list delete icon is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return listDeleteIcon;
}exports.findListDeleteIcon = findListDeleteIcon;

async function findSortAlphabeticallyButton(driver) {
    let sortAlphabeticallyButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sortAlphabeticallyButton = await driver.findElement(By.xpath('//button[text()="Sort alphabetically"]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'sortAlphabeticallyButton_NotFound.png');
        await assert.fail("As sort alphabetically button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sortAlphabeticallyButton;
}exports.findSortAlphabeticallyButton = findSortAlphabeticallyButton;

async function findValidation(driver,validationNumber) {
    let validationMsg;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        validationMsg = await driver.findElement(By.xpath(`//div[1]/div[2]/sm-input-txt[${validationNumber}]/sm-element//div[@class="error-message text-danger"]`)).getText();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validationMsg_NotFound.png');
        await assert.fail("As validation message is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return validationMsg;
}exports.findValidation = findValidation;

async function findMapDependencyFields(driver) {
    let mapDependencyFields;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        await driver.findElement(By.id('btnGroupDrop1')).click();
        await driver.sleep(1000);
        mapDependencyFields = await driver.findElement(By.xpath('//a[text()="Map Dependency Fields"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapDependencyFields_NotFound.png');
        await assert.fail("As map dependency fields option is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return mapDependencyFields;
}exports.findMapDependencyFields = findMapDependencyFields;

async function findCreateButton(driver) {
    let createButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        createButton = await driver.findElement(By.xpath('//a[text()=" Create "]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'createButton_NotFound.png');
        await assert.fail("As create button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return createButton;
}exports.findCreateButton = findCreateButton;

async function findNextButton(driver) {
    let nextButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        nextButton = await driver.findElement(By.xpath('//button[text()=" Next "]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'nextButton_NotFound.png');
        await assert.fail("As next button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return nextButton;
}exports.findNextButton = findNextButton;

async function findMapCancelButton(driver) {
    let cancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelButton = await driver.findElement(By.xpath('//button[text()=" Cancel "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapCancelButton_NotFound.png');
        await assert.fail("As cancel button of map page is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelButton;
}exports.findMapCancelButton = findMapCancelButton;

async function findMapDependencyCancelButton(driver) {
    let cancelButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        cancelButton = await driver.findElement(By.xpath('//a[text()=" Cancel "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapDependencyCancelButton_NotFound.png');
        await assert.fail("As cancel button of map dependency page is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return cancelButton;
}exports.findMapDependencyCancelButton = findMapDependencyCancelButton;

async function findMapDependencySaveButton(driver) {
    let saveButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        saveButton = await driver.findElement(By.id('buttonField')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapDependencySaveButton_NotFound.png');
        await assert.fail("As save button of map dependency page is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return saveButton;
}exports.findMapDependencySaveButton = findMapDependencySaveButton;

async function findMapDependencyEditLink(driver) {
    let editLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editLink = await driver.findElement(By.xpath('//a[text()=" edit "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapDependencyEditLink_NotFound.png');
        await assert.fail("As edit link of map dependency page is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editLink;
}exports.findMapDependencyEditLink = findMapDependencyEditLink;

async function findMapDependencyDealEditLink(driver) {
    let editLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editLink = await driver.findElement(By.xpath('//tr[2]/td[1]/span/a[1]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapDependencyEditLink_NotFound.png');
        await assert.fail("As edit link of map dependency page is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editLink;
}exports.findMapDependencyDealEditLink = findMapDependencyDealEditLink;

async function findMapDependencyDeleteLink(driver) {
    let deleteLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteLink = await driver.findElement(By.xpath('//a[text()=" delete "]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapDependencyDeleteLink_NotFound.png');
        await assert.fail("As delete link of map dependency page is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteLink;
}exports.findMapDependencyDeleteLink = findMapDependencyDeleteLink;

async function findMapDependencyDealDeleteLink(driver) {
    let deleteLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteLink = await driver.findElement(By.xpath('//tr[2]/td[1]/span/a[2]')).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'mapDependencyDealDeleteLink_NotFound.png');
        await assert.fail("As delete link of map dependency deal page is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteLink;
}exports.findMapDependencyDealDeleteLink = findMapDependencyDealDeleteLink;

async function customFieldDeleteButton(driver,fieldName,sectionNumber,fieldNumber) {
    let customFieldDeleteButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        await driver.findElement(By.xpath(`//div[text()=' ${fieldName} ']`)).click();
        await driver.findElement(By.xpath(`//div[${sectionNumber}]/table[@class='panel-body sortableSectionPanel']//td/div[${fieldNumber}]/div//ul[@class='nav']/li/a/span`)).click();
        await driver.sleep(1000);
        customFieldDeleteButton = await driver.findElement(By.xpath(`//div[${sectionNumber}]/table[@class='panel-body sortableSectionPanel']//td/div[${fieldNumber}]/div//ul[@class='nav']//ul[@class='dropdown-menu pull-right']/li[2]/a[@class='text']`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'customFieldDeleteButton_NotFound.png');
        await assert.fail("As custom field delete button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return customFieldDeleteButton;
}exports.customFieldDeleteButton = customFieldDeleteButton;

async function findSectionDeleteButton(driver,sectionName) {
    let sectionDeleteButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sectionDeleteButton = await driver.findElement(By.xpath(`//a[text()="${sectionName} "]/following::span[@class="icon-trash default-text"]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'sectionDeleteButton_NotFound.png');
        await assert.fail("As section delete button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sectionDeleteButton;
}exports.findSectionDeleteButton = findSectionDeleteButton;

async function findDefaultSectionDeleteButton(driver,sectionName,sectionNumber) {
    let sectionDeleteButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        sectionDeleteButton = await driver.findElement(By.xpath(`//a[text()="${sectionName} "]/following::span[@class="icon-trash default-text"][${sectionNumber}]`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'defaultSectionDeleteButton_NotFound.png');
        await assert.fail("As default section delete button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return sectionDeleteButton;
}exports.findDefaultSectionDeleteButton = findDefaultSectionDeleteButton;
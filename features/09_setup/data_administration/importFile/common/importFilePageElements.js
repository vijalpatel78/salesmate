const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');

/*  All these following functions will find elements of import file page on the browser 
 *  and then return those elements 
*/

async function findDynamicModuleNameOnPage(driver,screenshotPath){
    let dynamicNameOnPage;
    try{
        dynamicNameOnPage = await driver.findElement(By.xpath('//div[@class="description description-for-testing"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DynamicModuleNameOnPage_NotFound.png');
        await assert.fail('Due to the dynamic module name is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DynamicModuleNameOnPage_NotFound.png\'.');
    }
    return dynamicNameOnPage;
}exports.findDynamicModuleNameOnPage=findDynamicModuleNameOnPage;

async function findDynamicModuleNameOnPage1(driver,screenshotPath){
    let dynamicNameOnPage;
    try{
        dynamicNameOnPage = await driver.findElement(By.xpath('//div[@class="secondary-text m-b-sm"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DynamicModuleNameOnPage_NotFound.png');
        await assert.fail('Due to the dynamic module name is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DynamicModuleNameOnPage_NotFound.png\'.');
    }
    return dynamicNameOnPage;
}exports.findDynamicModuleNameOnPage1=findDynamicModuleNameOnPage1;

async function findImportUsingFileOption(driver,screenshotPath){
    let importUsingFileOption;
    try{
        importUsingFileOption = await driver.findElement(By.xpath('//li[@class="import-from-csv import-block m-r-lg"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportUsingFileOption_NotFound.png');
        await assert.fail('Due to the \'Import Using File\' option is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportUsingFileOption_NotFound.png\'.');
    }
    return importUsingFileOption;
}exports.findImportUsingFileOption=findImportUsingFileOption;

async function findUploadFileField(driver,screenshotPath){
    let uploadFileField;
    try{
        uploadFileField = await driver.findElement(By.xpath('//input[@type="file"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UploadFileField_NotFound.png');
        await assert.fail('Due to the upload file field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'UploadFileField_NotFound.png\'.');
    }
    return uploadFileField;
}exports.findUploadFileField=findUploadFileField;

async function findNextButton(driver,screenshotPath){
    let nextButton;
    try{
        nextButton = await driver.findElement(By.xpath('//button[@class="btn btn-sm btn-primary ng-binding"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NextButton_NotFound.png');
        await assert.fail('Due to the next button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'NextButton_NotFound.png\'.');
    }
    return nextButton;
}exports.findNextButton=findNextButton;

async function findValidationMsg(driver,screenshotPath){
    let validationMsg;
    try{
        validationMsg = await driver.findElement(By.xpath('//p[@class="text-danger"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotFound.png');
        await assert.fail('Due to the validation message is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ValidationMsg_NotFound.png\'.');
    }
    return validationMsg;
}exports.findValidationMsg=findValidationMsg;

async function findRequiredValidationMsg(driver,screenshotPath){
    let requiredValidationMsg;
    try{
        requiredValidationMsg = await driver.findElement(By.xpath('//div[@class="alert alert-danger flex-column m-b-lg"]/child::span[2]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RequiredValidationMsg_NotFound.png');
        await assert.fail('Due to the required validation message is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RequiredValidationMsg_NotFound.png\'.');
    }
    return requiredValidationMsg;
}exports.findRequiredValidationMsg=findRequiredValidationMsg;

async function findUploadedFileName(driver,screenshotPath){
    let uploadedFileName;
    try{
        uploadedFileName = await driver.findElement(By.xpath('//div[@class="default-text m-b-sm font-medium"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UploadedFile_NotFound.png');
        await assert.fail('Due to the uploaded file is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'UploadedFile_NotFound.png\'.');
    }
    return uploadedFileName;
}exports.findUploadedFileName=findUploadedFileName;

async function findSelectFieldInputBox(driver,screenshotPath){
    let selectFieldInputBox;
    try{
        selectFieldInputBox = await driver.findElement(By.xpath('//div[@class="csv-view-select-field"]/descendant::input[@class="form-control"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SelectFieldInputBox_NotFound.png');
        await assert.fail('Due to the select field input box is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SelectFieldInputBox_NotFound.png\'.');
    }
    return selectFieldInputBox;
}exports.findSelectFieldInputBox=findSelectFieldInputBox;

async function findModuleNames(driver,screenshotPath){
    let moduleNames;
    try{
        moduleNames = await driver.findElements(By.xpath('//popper-content/descendant::button'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ModuleNames_NotFound.png');
        await assert.fail('Due to the module name is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ModuleNames_NotFound.png\'.');
    }
    return moduleNames;
}exports.findModuleNames=findModuleNames;

async function findFieldSearchBox(driver,screenshotPath){
    let fieldSearchBox;
    try{
        fieldSearchBox = await driver.findElement(By.xpath('//input[@id="searchField_0"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FieldSearchBox_NotFound.png');
        await assert.fail('Due to the field search box is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'FieldSearchBox_NotFound.png\'.');
    }
    return fieldSearchBox;
}exports.findFieldSearchBox=findFieldSearchBox;

async function findField(driver,screenshotPath, fieldName){
    let field;
    try{
        field = await driver.findElements(By.xpath('//div[@class="fields-list clearfix"]/descendant::li[text()=" '+fieldName+' "]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName.replace(/\s/g,'_')+'_Field_NotFound.png');
        await assert.fail('Due to the provided field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+fieldName.replace(/\s/g,'_')+'_Field_NotFound.png\'.');
    }
    return field;
}exports.findField=findField;

async function findCreateNewFieldLink(driver,screenshotPath){
    let createNewFieldLink;
    try{
        createNewFieldLink = await driver.findElements(By.xpath('//div[@class="fields-list clearfix"]/following::a[@class="create-new-btn"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CreateNewFieldLink_NotFound.png');
        await assert.fail('Due to the create new field link is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CreateNewFieldLink_NotFound.png\'.');
    }
    return createNewFieldLink;
}exports.findCreateNewFieldLink=findCreateNewFieldLink;

async function findCreateNewFieldPopup(driver,screenshotPath){
    let createNewFieldPopup;
    try{
        createNewFieldPopup = await driver.findElements(By.xpath('//h4[text()=" Select Field Type"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CreateNewFieldPopup_NotFound.png');
        await assert.fail('Due to the create new field popup is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'CreateNewFieldPopup_NotFound.png\'.');
    }
    return createNewFieldPopup;
}exports.findCreateNewFieldPopup=findCreateNewFieldPopup;

async function findPopupCloseButton(driver,screenshotPath){
    let popupCloseButton;
    try{
        popupCloseButton = await driver.findElement(By.xpath('//button[@class="close"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'PopupCloseButton_NotFound.png');
        await assert.fail('Due to the popup close button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'PopupCloseButton_NotFound.png\'.');
    }
    return popupCloseButton;
}exports.findPopupCloseButton=findPopupCloseButton;

async function findSelectedFieldCloseButton(driver,screenshotPath){
    let selectedFieldCloseButton;
    try{
        selectedFieldCloseButton = await driver.findElements(By.xpath('//a[@class="close-btn"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SelectedFieldCloseButton_NotFound.png');
        await assert.fail('Due to the close button of selected field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SelectedFieldCloseButton_NotFound.png\'.');
    }
    return selectedFieldCloseButton;
}exports.findSelectedFieldCloseButton=findSelectedFieldCloseButton;

async function findScreenName(driver,screenshotPath){
    let screenName;
    try{
        screenName = await driver.findElement(By.xpath('//h2[@class="m-b-sm"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ScreenName_NotFound.png');
        await assert.fail('Due to the screen name is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ScreenName_NotFound.png\'.');
    }
    return screenName;
}exports.findScreenName=findScreenName;

async function findSelectDateTimeOption(driver,screenshotPath){
    let selectDateTimeOption;
    try{
        selectDateTimeOption = await driver.findElement(By.xpath('//a[@class="icon-ic_danger_alert text-warning m-r-sm"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SelectDateTimeOption_NotFound.png');
        await assert.fail('Due to the select date and time option is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SelectDateTimeOption_NotFound.png\'.');
    }
    return selectDateTimeOption;
}exports.findSelectDateTimeOption=findSelectDateTimeOption;

async function findToggleButton(driver,screenshotPath,nameAttribute){
    let toggleButton;
    try{
        toggleButton = await driver.findElement(By.xpath('//input[@name="'+nameAttribute+'"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+nameAttribute+'_NotFound.png');
        await assert.fail('Due to the '+nameAttribute+' is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+nameAttribute+'_NotFound.png\'.');
    }
    return toggleButton;
}exports.findToggleButton=findToggleButton;

async function findDateTimeFormatOption(driver,screenshotPath,value){
    let dateTimeFormatOption;
    try{
        dateTimeFormatOption = await driver.findElement(By.xpath('//label[text()="'+value+'"]/preceding-sibling::label/child::input'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DateFormatOption_NotFound.png');
        await assert.fail('Due to the date format is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'DateFormatOption_NotFound.png\'.');
    }
    return dateTimeFormatOption;
}exports.findDateTimeFormatOption=findDateTimeFormatOption;

async function findTagField(driver,screenshotPath){
    let tagField;
    try{
        tagField = await driver.findElement(By.xpath('//div[@class="ro-tag-autocomplete"]/input[@class="form-control"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'TagField_NotFound.png');
        await assert.fail('Due to the tag field is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'TagField_NotFound.png\'.');
    }
    return tagField;
}exports.findTagField=findTagField;

async function findStartImportButton(driver,screenshotPath){
    let startImportButton;
    try{
        startImportButton = await driver.findElement(By.xpath('//button[@id="buttonField"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'StartImportButton_NotFound.png');
        await assert.fail('Due to the start import button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'StartImportButton_NotFound.png\'.');
    }
    return startImportButton;
}exports.findStartImportButton=findStartImportButton;

async function findIdWarningMsg(driver,screenshotPath){
    let idWarningMsg;
    try{
        idWarningMsg = await driver.findElement(By.xpath('//div[@class="alert alert-warning m-t-lg m-b-none flex-column"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'IdWarningMsg_NotFound.png');
        await assert.fail('Due to the ID warning message is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'IdWarningMsg_NotFound.png\'.');
    }
    return idWarningMsg;
}exports.findIdWarningMsg=findIdWarningMsg;

async function findPreviousImportsGrid(driver,screenshotPath){
    let previousImportsGrid;
    try{
        previousImportsGrid = await driver.findElement(By.xpath('//h3[text()="Previous Imports"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'PreviousImportsGrid_NotFound.png');
        await assert.fail('Due to the previous imports grid is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'PreviousImportsGrid_NotFound.png\'.');
    }
    return previousImportsGrid;
}exports.findPreviousImportsGrid=findPreviousImportsGrid;

async function findImportedDate(driver,screenshotPath){
    let importedDate;
    try{
        importedDate = await driver.findElement(By.xpath('//div[@row-index="0"]/div[@col-id="createdAt"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedDate_NotFound.png');
        await assert.fail('Due to the imported date is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedDate_NotFound.png\'.');
    }
    return importedDate;
}exports.findImportedDate=findImportedDate;

async function findImportedFileName(driver,screenshotPath){
    let importedFileName;
    try{
        importedFileName = await driver.findElement(By.xpath('//div[@row-index="0"]/div[@col-id="source"]//a'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedFileName_NotFound.png');
        await assert.fail('Due to the imported file name is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedFileName_NotFound.png\'.');
    }
    return importedFileName;
}exports.findImportedFileName=findImportedFileName;

async function findImportedBy(driver,screenshotPath){
    let importedBy;
    try{
        importedBy = await driver.findElements(By.xpath('//div[@row-index="0"]/div[@col-id="createdBy"]//span[1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedBy_NotFound.png');
        await assert.fail('Due to the imported by is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedBy_NotFound.png\'.');
    }
    return importedBy;
}exports.findImportedBy=findImportedBy;

async function findImportedModules(driver,screenshotPath){
    let importedModules;
    try{
        importedModules = await driver.findElements(By.xpath('//div[@row-index="0"]/div[@col-id="modules"]//i'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedModules_NotFound.png');
        await assert.fail('Due to the imported module is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedModules_NotFound.png\'.');
    }
    return importedModules;
}exports.findImportedModules=findImportedModules;

async function findImportedStatus(driver,screenshotPath){
    let importedStatus;
    try{
        importedStatus = await driver.findElement(By.xpath('//div[@row-index="0"]/div[@col-id="status"]/span'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedStatus_NotFound.png');
        await assert.fail('Due to the imported status is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedStatus_NotFound.png\'.');
    }
    return importedStatus;
}exports.findImportedStatus=findImportedStatus;

async function findImportedDetailsLink(driver,screenshotPath){
    let importedDetailsLink;
    try{
        importedDetailsLink = await driver.findElement(By.xpath('//div[@row-index="0"]/div[@col-id="action"]//a[text()="Details"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedDetailsLink_NotFound.png');
        await assert.fail('Due to the imported details link is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedDetailsLink_NotFound.png\'.');
    }
    return importedDetailsLink;
}exports.findImportedDetailsLink=findImportedDetailsLink;

async function findImportedRevertLink1(driver,screenshotPath){
    let importedRevertLink;
    try{
        importedRevertLink = await driver.findElement(By.xpath('//div[@row-index="0"]/div[@col-id="action"]//a[text()="Revert"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedRevertLink_NotFound.png');
        await assert.fail('Due to the imported revert link is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedRevertLink_NotFound.png\'.');
    }
    return importedRevertLink;
}exports.findImportedRevertLink1=findImportedRevertLink1;

async function findImportedRevertLink2(driver,screenshotPath){
    let importedRevertLink;
    try{
        importedRevertLink = await driver.findElement(By.xpath('//div[@row-index="1"]/div[@col-id="action"]//a[text()="Revert"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedRevertLink_NotFound.png');
        await assert.fail('Due to the imported revert link is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedRevertLink_NotFound.png\'.');
    }
    return importedRevertLink;
}exports.findImportedRevertLink2=findImportedRevertLink2;

async function findImportedSummaryPopup(driver,screenshotPath){
    let importedSummaryPopup;
    try{
        importedSummaryPopup = await driver.findElements(By.xpath('//body[@class="compact-header"]/popper-content[1]//li/a/span'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ImportedSummaryPopup_NotFound.png');
        await assert.fail('Due to the imported summary popup is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'ImportedSummaryPopup_NotFound.png\'.');
    }
    return importedSummaryPopup;
}exports.findImportedSummaryPopup=findImportedSummaryPopup;

async function findCreatedOrUpdatedLink(driver,screenshotPath){
    let createdOrUpdatedLink;
    try{
        createdOrUpdatedLink = await driver.findElements(By.xpath('//body[@class="compact-header"]/popper-content[1]//li/a'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CreatedOrUpdatedLink_NotFound.png');
        await assert.fail('Due to the created or updated link is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'CreatedOrUpdatedLink_NotFound.png\'.');
    }
    return createdOrUpdatedLink;
}exports.findCreatedOrUpdatedLink=findCreatedOrUpdatedLink;

async function findNumberOfRejectedRecords(driver,screenshotPath){
    let numberOfRejectedRecords;
    try{
        numberOfRejectedRecords = await driver.findElement(By.xpath('//body[@class="compact-header"]/popper-content[1]//li/span'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NumberOfRejectedRecords_NotFound.png');
        await assert.fail('Due to the number of rejected records is not found on the grid, the test case has been failed. Screenshot Name: \''+screenshotPath+'NumberOfRejectedRecords_NotFound.png\'.');
    }
    return numberOfRejectedRecords;
}exports.findNumberOfRejectedRecords=findNumberOfRejectedRecords;

async function findModuleButton(driver,screenshotPath){
    let moduleButton;
    try{
        moduleButton = await driver.findElement(By.xpath('//button[@class="btn btn-default"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ModuleButton_NotFound.png');
        await assert.fail('Due to the module button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ModuleButton_NotFound.png\'.');
    }
    return moduleButton;
}exports.findModuleButton=findModuleButton;

async function findRecordsPopup(driver,screenshotPath){
    let recordsPopup;
    try{
        recordsPopup = await driver.findElement(By.xpath('//h4[@class="modal-title pull-left text-capitalize text-ellipsis"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RecordsPopup_NotFound.png');
        await assert.fail('Due to the records popup is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RecordsPopup_NotFound.png\'.');
    }
    return recordsPopup;
}exports.findRecordsPopup=findRecordsPopup;

async function findModuleNameList(driver,screenshotPath,moduleIndex){
    let moduleNameList;
    try{
        moduleNameList = await driver.findElement(By.xpath(`(//ul[@class="custom-list-group"]/li/a)[${moduleIndex}]`));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ModuleNameList_NotFound.png');
        await assert.fail('Due to the Module Name List is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ModuleNameList_NotFound.png\'.');
    }
    return moduleNameList;
}exports.findModuleNameList=findModuleNameList;

async function findPopupCancelButton(driver,screenshotPath){
    let popupCancelButton;
    try{
        popupCancelButton = await driver.findElement(By.xpath('//button[@class="close m-l-auto"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'PopupCloseButton_NotFound.png');
        await assert.fail('Due to the popup close button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'PopupCloseButton_NotFound.png\'.');
    }
    return popupCancelButton;
}exports.findPopupCancelButton=findPopupCancelButton;

async function findRevertProgressBar(driver,screenshotPath){
    let revertProgressBar;
    try{
        revertProgressBar = await driver.findElement(By.xpath('//div[@class="data-progress m-b-md revert"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'RevertProgressBar_NotFound.png');
        await assert.fail('Due to the revert progress bar is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'RevertProgressBar_NotFound.png\'.');
    }
    return revertProgressBar;
}exports.findRevertProgressBar=findRevertProgressBar;
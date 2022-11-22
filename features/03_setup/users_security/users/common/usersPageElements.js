const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/users_security/users/screenshots/';
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findEmailSignatureTextBox(driver){
    let emailSignatureTextBox;
    await driver.manage().setTimeouts({implicit:10000});
    try{
        emailSignatureTextBox = await driver.findElement(By.css('body.fr-view'));
    }catch(err){
        await driver.switchTo().defaultContent();
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureField_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(emailSignatureTextBox));
    await driver.sleep(500);
    return emailSignatureTextBox;
}

async function findEmailSignatureiFrame(driver){
    let emailSignatureiFrame;
    await driver.manage().setTimeouts({implicit:10000});
    try{
        emailSignatureiFrame = await driver.findElement(By.css('iframe.fr-iframe'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignature_iFrame_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(emailSignatureiFrame));
    await driver.sleep(500);
    return emailSignatureiFrame;
}

async function findEditPageFirstNameField(driver) {
    let editPageFirstNameField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageFirstNameField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-input-txt[1]/sm-element/input[@id='firstName']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageFirstNameField_NotFound.png');
        await assert.fail("As edit page first name field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageFirstNameField;
}

async function findEditPageLastNameField(driver) {
    let editPageLastNameField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageLastNameField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-input-txt[2]/sm-element/input[@id='lastName']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageLastNameField_NotFound.png');
        await assert.fail("As edit page last name field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageLastNameField;
}

async function findEditPageEmailField(driver) {
    let editPageEmailField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageEmailField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-input-txt[3]/sm-element/input[@id='email']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageEmailField_NotFound.png');
        await assert.fail("As edit page email field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageEmailField;
}

async function findEditPageMobileField(driver) {
    let editPageMobileField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageMobileField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-input-txt[4]/sm-element/input[@id='mobile']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageMobileField_NotFound.png');
        await assert.fail("As edit page mobile field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageMobileField;
}

async function findEditPageIPRestrictionField(driver) {
    let editPageIpRestrictionField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageIpRestrictionField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-input-txt[5]/sm-element/input[@id='allowedLoginFrom']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageIpRestrictionField_NotFound.png');
        await assert.fail("As edit page ip restriction field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageIpRestrictionField;
}

async function findEditPageNickNameField(driver) {
    let editPageNickNameField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageNickNameField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[1]/div[@class='row']/sm-input-txt[6]/sm-element/input[@id='nickname']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageNickNameField_NotFound.png');
        await assert.fail("As edit page nick name field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageNickNameField;
}

async function findEditPageDOBField(driver) {
    let editPageDobField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageDobField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[2]/div[@class='row']/sm-datetime-picker[1]/sm-element/input[@id='dateOfBirth']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageDobField_NotFound.png');
        await assert.fail("As edit page date of birth field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageDobField;
}

async function findEditPageDateOfAnniversaryField(driver) {
    let editPageDateOfAnniversaryField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageDateOfAnniversaryField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[2]/div[@class='row']/sm-datetime-picker[2]/sm-element/input[@id='dateOfAnniversary']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageDOAField_NotFound.png');
        await assert.fail("As edit page date of anniversary field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageDateOfAnniversaryField;
}

async function findEditPagePhoneField(driver) {
    let editPagePhoneField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPagePhoneField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[3]/div[@class='row']/sm-input-txt[1]/sm-element/input[@id='phoneNo']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPagePhoneField_NotFound.png');
        await assert.fail("As edit page phone field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPagePhoneField;
}

async function findEditPageExtensionField(driver) {
    let editPageExtensionField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageExtensionField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[3]/div[@class='row']/sm-input-txt[2]/sm-element/input[@id='extensionNo']"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageExtensionField_NotFound.png');
        await assert.fail("As edit page extension field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageExtensionField;
}

async function findEditPageAddressLine1Field(driver) {
    let editPageAddressLine1Field;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageAddressLine1Field = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[4]/div[@class='row']/sm-input-txt[1]/sm-element/input"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageAddressLine1Field_NotFound.png');
        await assert.fail("As edit page address line1 field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageAddressLine1Field;
}

async function findEditPageAddressLine2Field(driver) {
    let editPageAddressLine2Field;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageAddressLine2Field = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[4]/div[@class='row']/sm-input-txt[2]/sm-element/input"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageAddressLine2Field_NotFound.png');
        await assert.fail("As edit page address line2 field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageAddressLine2Field;
}

async function findEditPageAreaField(driver) {
    let editPageAreaField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageAreaField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[4]/div[@class='row']/sm-input-txt[3]/sm-element/input"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageAreaField_NotFound.png');
        await assert.fail("As edit page area field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageAreaField;
}

async function findEditPageCityField(driver) {
    let editPageCityField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageCityField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[4]/div[@class='row']/sm-input-txt[4]/sm-element/input"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageCityField_NotFound.png');
        await assert.fail("As edit page area field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageCityField;
}

async function findEditPageStateField(driver) {
    let editPageStateField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageStateField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[4]/div[@class='row']/sm-input-txt[5]/sm-element/input"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageStateField_NotFound.png');
        await assert.fail("As edit page state field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageStateField;
}

async function findEditPageZipCodeField(driver) {
    let editPageZipCodeField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        editPageZipCodeField = await driver.findElement(By.xpath("//form[@id='add-user-form']/sm-add-user-form//sm-form-creator/div/div[4]/div[@class='row']/sm-input-txt[6]/sm-element/input"));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'editPageZipCodeField_NotFound.png');
        await assert.fail("As edit page zip code field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editPageZipCodeField;
}

async function findEditPageEmailSignatureTextBox(driver){
    let emailSignatureTextBox;
    await driver.manage().setTimeouts({implicit:5000});
    try{
        emailSignatureTextBox = await driver.findElement(By.className('fr-view'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await driver.switchTo().defaultContent();
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureField_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return emailSignatureTextBox;
}

async function findEditPageEmailSignatureiFrame(driver){
    let emailSignatureiFrame;
    await driver.manage().setTimeouts({implicit:5000});
    try{
        emailSignatureiFrame = await driver.findElement(By.className('fr-iframe'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignature_iFrame_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return emailSignatureiFrame;
}

async function findUserRoleOrProfileDetails(driver,mailId,colIndex) {
    let roleOrProfileDetails;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        roleOrProfileDetails = await driver.findElement(By.xpath(`//div[text()="${mailId}"]/following::span[${colIndex}]`)).getText();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'userDetails_NotFound.png');
        await assert.fail("As user title "+colIndex+" is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return roleOrProfileDetails;
}

async function findUser(driver,userTitle) {
    let userName;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        userName = await driver.findElement(By.xpath(`//a[@title='${userTitle}']`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'userTitle_NotFound.png');
        await assert.fail("As user title "+userTitle+" is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return userName;
}

async function findActionButtons(driver,actionType) {
    let actionName;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        actionName = await driver.findElement(By.xpath(`//button[text()='${actionType}']`)).click();
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'actionType_NotFound.png');
        await assert.fail("As action type "+actionType+" is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return actionName;
}

async function findEditPageCloseButton(driver) {
    let closeButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        closeButton = await driver.findElement(By.xpath('//button[@class="close"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'closeButton_NotFound.png');
        await assert.fail("As close button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return closeButton;
}

async function findQuickPageCloseIcon(driver) {
    let quickPageCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        quickPageCloseIcon = await driver.findElement(By.xpath('//i[@class="icon-close"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'quickPageCloseIcon_NotFound.png');
        await assert.fail("As quick page close icon is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return quickPageCloseIcon;
}

async function findDeactivatedUsersTab(driver) {
    let deactivatedUsersTab;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deactivatedUsersTab = await driver.findElement(By.xpath("//a[@href='#/app/setup/security/users/deactivated']"));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deactivatedUsersTab_NotFound.png');
        await assert.fail("As deactivated users tab is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deactivatedUsersTab;
}

async function findUnconfirmedUsersTab(driver) {
    let unconfirmedUsersTab;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        unconfirmedUsersTab = await driver.findElement(By.xpath("//a[@href='#/app/setup/security/users/unconfirmed']")).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'unconfirmedUsersTab_NotFound.png');
        await assert.fail("As unconfirmed users tab is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return unconfirmedUsersTab;
}

async function findActiveUsersTab(driver) {
    let activeUsersTab;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        activeUsersTab = await driver.findElement(By.xpath("//a[@href='#/app/setup/security/users/active']")).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'activeUsersTab_NotFound.png');
        await assert.fail("As active users tab is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return activeUsersTab;
}

async function findInvalidEmailValidation(driver) {
    let invalidEmailValidation;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        invalidEmailValidation = await driver.findElement(By.xpath("//div[@class='error-message text-danger']")).getText();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'invalidEmailValidation_NotFound.png');
        await assert.fail("As invalid email validation message is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return invalidEmailValidation;
}

async function findValidationMessage(driver,validationNumber) {
    let validationMessage;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        validationMessage = await driver.findElement(By.xpath(`//div/div[1]/div[@class='row']/sm-input-txt[${validationNumber}]/sm-element/sm-validation-messages/div[@class='error-message text-danger']`)).getText();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validationMessage_NotFound.png');
        await assert.fail("As one of the validation message for first name,last name,mobile and nick name validation is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return validationMessage;
}

async function findPhoneExtensionValidation(driver,validationNumber) {
    let phoneExtensionValidation;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        phoneExtensionValidation = await driver.findElement(By.xpath(`//div/div[3]/div/sm-input-txt[${validationNumber}]/sm-element/sm-validation-messages/div[@class='error-message text-danger']`)).getText();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'phoneExtensionValidation_NotFound.png');
        await assert.fail("As phone and extension validation message is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return phoneExtensionValidation;
}

async function findAddressFieldsValidation(driver,validationNumber) {
    let addressFieldsValidation;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        addressFieldsValidation = await driver.findElement(By.xpath(`//div/div[4]/div[@class='row']/sm-input-txt[${validationNumber}]/sm-element/sm-validation-messages/div[@class='error-message text-danger']`)).getText();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'addressFieldsValidation_NotFound.png');
        await assert.fail("As one of address fields like Address Line1,Address Line2,Area,City,State,ZipCode validation message is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return addressFieldsValidation;
}

async function findProfileListDropdown(driver) {
    let profileDropdownList;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        profileDropdownList = await driver.findElement(By.xpath("//div/div[1]/div[@class='row']/sm-select-box[1]/sm-element//span[@role='combobox']/span[@role='textbox']")).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'profileDropdownList_NotFound.png');
        await assert.fail("As profile list dropdown is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return profileDropdownList;
}

async function findRolesListDropdown(driver) {
    let rolesDropdownList;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        rolesDropdownList = await driver.findElement(By.xpath("//div/div[1]/div[@class='row']/sm-select-box[2]/sm-element/div/span//span[@role='combobox']/span[@role='presentation']")).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'rolesDropdownList_NotFound.png');
        await assert.fail("As roles list dropdown is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return rolesDropdownList;
}

async function findSearchBox(driver) {
    let searchBoxField;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        searchBoxField = await driver.findElement(By.xpath('//form//input[@placeholder="Search User"]'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'searchBoxField_NotFound.png');
        await assert.fail("As search box field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return searchBoxField;
}

async function findNoRowsValidation(driver) {
    let noRowsValidation;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        noRowsValidation = await driver.findElement(By.xpath('//span[@class="ag-overlay-no-rows-center"]')).getText();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'noRowsValidation_NotFound.png');
        await assert.fail("As search box field is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return noRowsValidation;
}

async function findReInviteLink(driver,userName,reInviteLocation) {
    let reInviteLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        reInviteLink = await driver.findElement(By.xpath(`//a[@title='${userName}']/following::a[${reInviteLocation}]`)).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'reInviteLink_NotFound.png');
        await assert.fail("As Re-Invite Link is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return reInviteLink;
}

async function findDeactivateYesButton(driver) {
    let deactiveYesButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deactiveYesButton = await driver.findElement(By.xpath("//button[@id='btnSave']//span[text()=' Yes ']")).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deactiveYesButton_NotFound.png');
        await assert.fail(err);
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deactiveYesButton;
}

async function findYesButton(driver) {
    let yesButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        yesButton = await driver.findElement(By.xpath('//button[text()="Yes"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'yesButton_NotFound.png');
        await assert.fail("As yes button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return yesButton;
}

async function findUserName(driver,userName) {
    let userNameText
    await driver.manage().setTimeouts({implicit:5000});
    try {
        userNameText = await driver.findElement(By.xpath(`//a[@title='${userName}']`)).getText();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'userName_NotFound.png');
        await assert.fail("As user name is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return userNameText;
}

async function clickDeactivateUserWithLicenseDropdown(driver) {
    try {
        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'licenseUsage','Deactivate this user and release the Licence','no');
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deactivateUserWithLicenseDropdown_NotFound.png');
        await assert.fail("As deactivate user with license dropdown is not found,so test case has been aborted");
    }
}

async function findDeactivateFirstName(driver) {
    let deactivateFirstName
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deactivateFirstName = await driver.findElement(By.xpath('//div[2]/div[1]/div[@class="col-md-12"]//input[@id="firstName"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deactivateFirstName_NotFound.png');
        await assert.fail("As deactivate first name is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deactivateFirstName;
}

async function findDeactivateLastName(driver) {
    let deactivateLastName
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deactivateLastName = await driver.findElement(By.xpath('//div[2]/div[2]/div[@class="col-md-12"]//input[@id="lastName"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deactivateLastName_NotFound.png');
        await assert.fail("As deactivate last name is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deactivateLastName;
}

async function findDeactivateEmail(driver) {
    let deactivateEmail
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deactivateEmail = await driver.findElement(By.xpath('//div[2]/div[3]/div[@class="col-md-12"]//input[@id="email"]'));
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deactivateEmail_NotFound.png');
        await assert.fail("As deactivate email is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deactivateEmail;
}

async function findEmailsOnListPage(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const emails = await driver.findElements(By.xpath('//ag-grid-angular/descendant::div[@col-id="email"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return emails;
}

async function findNamesOnListPage(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const names = await driver.findElements(By.xpath('//ag-grid-angular/descendant::div[@col-id="firstName"]/descendant::a[1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return names;
}

module.exports = {
    findEmailSignatureTextBox,
    findEmailSignatureiFrame,
    findEditPageFirstNameField,
    findEditPageLastNameField,
    findEditPageEmailField,
    findEditPageMobileField,
    findEditPageIPRestrictionField,
    findEditPageNickNameField,
    findEditPagePhoneField,
    findEditPageExtensionField,
    findEditPageDOBField,
    findEditPageDateOfAnniversaryField,
    findEditPageAddressLine1Field,
    findEditPageAddressLine2Field,
    findEditPageAreaField,
    findEditPageCityField,
    findEditPageStateField,
    findEditPageZipCodeField,
    findEditPageEmailSignatureTextBox,
    findEditPageEmailSignatureiFrame,
    findUser,
    findActionButtons,
    findEditPageCloseButton,
    findQuickPageCloseIcon,
    findDeactivatedUsersTab,
    findUnconfirmedUsersTab,
    findActiveUsersTab,
    findUserRoleOrProfileDetails,
    findInvalidEmailValidation,
    findValidationMessage,
    findPhoneExtensionValidation,
    findAddressFieldsValidation,
    findProfileListDropdown,
    findRolesListDropdown,
    findSearchBox,
    findNoRowsValidation,
    findDeactivateYesButton,
    findYesButton,
    findUserName,
    clickDeactivateUserWithLicenseDropdown,
    findDeactivateFirstName,
    findDeactivateLastName,
    findDeactivateEmail,
    findEmailsOnListPage,
    findNamesOnListPage,
}
const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/* All these following functions will find general module elements on the browser and return those elements */

async function findGeneralSettingsTab(driver,screenshotPath){
    let generalSettingsTab;

    try{
        generalSettingsTab = await driver.findElement(By.css('a[href="#/app/user/profile"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GeneralSettingsTab_NotFound.png');
        await assert.fail('Due to the general settings tab is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(generalSettingsTab));
    return generalSettingsTab;
}exports.findGeneralSettingsTab=findGeneralSettingsTab;

async function findUpdateBtn(driver,screenshotPath){
    let updateBtn;

    try{
        updateBtn = await driver.findElement(By.id('btnUpdate'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'UpdateBtn_NotFound.png');
        await assert.fail('Due to the update button is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsEnabled(updateBtn));
    return updateBtn;
}exports.findUpdateBtn=findUpdateBtn;

async function findFirstNameField(driver,screenshotPath){
    let firstNameField;

    try{
        firstNameField = await driver.findElement(By.id('firstName'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FirstNameField_NotFound.png');
        await assert.fail('Due to the first name field is not found, the test case has been failed');
    }
    
    await driver.wait(until.elementIsVisible(firstNameField));
    return firstNameField;
}exports.findFirstNameField=findFirstNameField;

async function findLastNameField(driver,screenshotPath){
    let lastNameField;

    try{
        lastNameField = await driver.findElement(By.id('lastName'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'LastNameField_NotFound.png');
        await assert.fail('Due to the last name field is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(lastNameField));
    return lastNameField;
}exports.findLastNameField=findLastNameField;

async function findEmailField(driver,screenshotPath){
    let emailField;

    try{
        emailField = await driver.findElement(By.id('email'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailField_NotFound.png');
        await assert.fail('Due to the email field is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(emailField));
    return emailField;
}exports.findEmailField=findEmailField;

async function findMobileField(driver,screenshotPath){
    let mobileField;

    try{
        mobileField = await driver.findElement(By.id('mobile'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'MobileField_NotFound.png');
        await assert.fail('Due to the mobile field is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(mobileField));
    return mobileField;
}exports.findMobileField=findMobileField;

async function findNickNameField(driver,screenshotPath){
    let nickNameField;

    try{
        nickNameField = await driver.findElement(By.id('nickname'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'NickNameField_NotFound.png');
        await assert.fail('Due to the nick name field is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(nickNameField));
    return nickNameField;
}exports.findNickNameField=findNickNameField;

async function findEmailSignatureTextBox(driver,screenshotPath){
    let emailSignatureTextBox;

    try{
        emailSignatureTextBox = await driver.findElement(By.css('body.fr-view'));
    }catch(err){
        await driver.switchTo().defaultContent();
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureField_NotFound.png');
        await assert.fail('Due to the email signature field is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(emailSignatureTextBox));
    return emailSignatureTextBox;
}exports.findEmailSignatureTextBox=findEmailSignatureTextBox;

async function findEmailSignatureiFrame(driver,screenshotPath){
    let emailSignatureiFrame;

    try{
        emailSignatureiFrame = await driver.findElement(By.css('iframe.fr-iframe'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignature_iFrame_NotFound.png');
        await assert.fail('Due to the email signature iFrame is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(emailSignatureiFrame));
    return emailSignatureiFrame;
}exports.findEmailSignatureiFrame=findEmailSignatureiFrame;

async function findEmailSignatureFormatOption(driver,screenshotPath,datacmdAttributeValue){
    let emailSignatureFormatOption;

    try{
        emailSignatureFormatOption = await driver.findElement(By.css('button[data-cmd="'+datacmdAttributeValue+'"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+datacmdAttributeValue+'_EmailSignature_formatOpt_NotFound.png');
        await assert.fail('Due to the '+datacmdAttributeValue+' email signature format option is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(emailSignatureFormatOption));
    return emailSignatureFormatOption;    
}exports.findEmailSignatureFormatOption=findEmailSignatureFormatOption;

async function findEmailSignatureFormatOptionRare(driver,datacmdAttributeValue){
    await driver.manage().setTimeouts({implicit:3000});
    const emailSignatureFormatOption = await driver.findElements(By.xpath('//button[@data-cmd="'+datacmdAttributeValue+'"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return emailSignatureFormatOption;    
}exports.findEmailSignatureFormatOptionRare=findEmailSignatureFormatOptionRare;

async function findDropdownListOfEmailSignatureFormatOption(driver,screenshotPath,formatOption,formatOptionElement){
    let dropdownListOfEmailSignatureFormatOption, formatOpt;

    if(formatOption.toLowerCase() == 'font family'){ formatOpt = 'FontFamily'; }
    else if(formatOption.toLowerCase() == 'font size'){ formatOpt = 'FontSize'; }
    else if(formatOption.toLowerCase() == 'order list'){ formatOpt = 'OrderList'; }
    else if(formatOption.toLowerCase() == 'unorder list'){ formatOpt = 'UnorderList'; }
    else{ formatOpt = formatOption; }

    try{
        dropdownListOfEmailSignatureFormatOption = await formatOptionElement.findElements(By.xpath('following::div[@class="fr-dropdown-menu"][1]/descendant::a'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+formatOpt+'_DropdownList_NotFound.png');
        await assert.fail('Due to the '+formatOption.toLowerCase()+' dropdown list is not found, the test case has been failed');
    }

    return dropdownListOfEmailSignatureFormatOption;
}exports.findDropdownListOfEmailSignatureFormatOption=findDropdownListOfEmailSignatureFormatOption;

async function findNewDropdownValueOfEmailSignatureFormatOption(driver,screenshotPath,formatOption,formatOptionElement,formatValue){
    let newDropdownValueOfEmailSignatureFormatOption;

    try{
        newDropdownValueOfEmailSignatureFormatOption = await formatOptionElement.findElement(By.xpath('following::div[@class="fr-dropdown-menu"][1]/descendant::a[contains(text(),"'+formatValue+'")]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+formatValue+'_DropdownValue_NotFound.png');
        await assert.fail('Due to the \''+formatValue+'\' value of '+formatOption+' dropdown is not found, the test case has been failed');    
    }

    return newDropdownValueOfEmailSignatureFormatOption;
}exports.findNewDropdownValueOfEmailSignatureFormatOption=findNewDropdownValueOfEmailSignatureFormatOption;

async function findURLTextBox(driver,screenshotPath,nameAttributeValue){
    let urlTextBox;

    try{
        urlTextBox = await driver.findElement(By.xpath('//div[@class="fr-link-insert-layer fr-layer fr-active"]/descendant::input[@name="'+nameAttributeValue+'"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureFormat_URLTextBox_NotFound.png');
        await assert.fail('Due to the URL text box is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(urlTextBox));
    return urlTextBox;
}exports.findURLTextBox=findURLTextBox;

async function findImageTextBox(driver,screenshotPath){
    let imageTextBox;

    try{
        imageTextBox = await driver.findElement(By.xpath('//div[@class="fr-image-by-url-layer fr-active fr-layer"]/descendant::input[@type="text"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureFormat_ImageTextBox_NotFound.png');
        await assert.fail('Due to the image text box is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(imageTextBox));
    return imageTextBox;
}exports.findImageTextBox=findImageTextBox;

async function findColorTextboxOnEmailSignatureFormatPopup(driver,screenshotPath){
    let textbox;

    try{
        textbox = await driver.findElement(By.xpath('//input[@maxlength="7"][1]'));
    }catch(err){
        console.log(err);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureFormat_ColorTextboxOnPopup_NotFound.png');
        await assert.fail('Due to the color textbox on the email signature format popup is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(textbox));
    return textbox;
}exports.findColorTextboxOnEmailSignatureFormatPopup=findColorTextboxOnEmailSignatureFormatPopup;

async function findOkORInsertButtonOnEmailSignatureFormatPopup(driver,screenshotPath,datacmdAttributeValue){
    let okORInsertButton;

    try{
        okORInsertButton = await driver.findElement(By.xpath(('//button[@data-cmd="'+datacmdAttributeValue+'"]')));
        //okORInsertButton = await driver.findElement(By.xpath(('//div[@class="fr-popup fr-desktop fr-above fr-active"]/descendant::span[@data-param1="#D14841"]')));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureFormat_OkORInsertButton_NotFound.png');
        await assert.fail('Due to the ok or insert button('+datacmdAttributeValue+') on the email signature format popup is not found, the test case has been failed');
    }
    
    await driver.wait(until.elementIsEnabled(okORInsertButton));
    return okORInsertButton;
}exports.findOkORInsertButtonOnEmailSignatureFormatPopup=findOkORInsertButtonOnEmailSignatureFormatPopup;

async function findHTMLViewTextArea(driver,screenshotPath){
    let HTMLViewTextArea;

    try{
        HTMLViewTextArea = await driver.findElement(By.css('textarea.fr-code'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignatureFormat_HTMLViewTextArea_NotFound.png');
        await assert.fail('Due to the HTML view text area of email signature is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(HTMLViewTextArea));
    return HTMLViewTextArea;
}exports.findHTMLViewTextArea=findHTMLViewTextArea;

async function findemailSignaturePlacementCheckbox(driver,screenshotPath){
    let emailSignaturePlacementCheckbox;

    try{
        emailSignaturePlacementCheckbox = await driver.findElement(By.id('emailSignaturePlacement'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'EmailSignaturePlacementCheckbox_NotFound.png');
        await assert.fail('Due to the email signature placement checkbox is not found, the test case has been failed');
    }

    return emailSignaturePlacementCheckbox;
}exports.findemailSignaturePlacementCheckbox=findemailSignaturePlacementCheckbox;

async function findFieldValidationMessage(driver,screenshotPath,field){
    let fieldValidationMessage;

    try{
        fieldValidationMessage = await field.findElement(By.xpath('following::sm-validation-messages[1]/div[1]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'FieldValidationMessage_NotFound.png');
        await assert.fail('Due to the field validation message is not found, the test case has been failed');
    }

    await driver.wait(until.elementIsVisible(fieldValidationMessage));
    return fieldValidationMessage;
}exports.findFieldValidationMessage=findFieldValidationMessage;

async function findLoggedInUserName(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const loggedInUserName = await driver.findElement(By.xpath('//h3'));  
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return loggedInUserName;
}exports.findLoggedInUserName=findLoggedInUserName;
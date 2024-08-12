const assert = require('assert');
const {until} = require('selenium-webdriver');
const openMyAccountPageObj = require('../../../00_common/actions/openSalesmatePage');
const generalSettingsPageElementObj = require('../common/generalSettingsPageElements');
const commonActionObj = require('../../../00_common/actions/commonActions');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');

//will navigate on the security page and then come back to the general settings page
async function comeBackToGeneralSettingsPage(driver,screenshotPath){
    await commonActionObj.clickOnSecurity();
    const generalSettingsTab = await generalSettingsPageElementObj.findGeneralSettingsTab(driver,screenshotPath);
    await generalSettingsTab.click();
    await driver.sleep(2000);
    await driver.wait(until.titleContains('General - My Account'));
}exports.comeBackToGeneralSettingsPage=comeBackToGeneralSettingsPage;

async function openGeneralSettingsPage(driver,screenshotPath){
    //will open the my account page
    await openMyAccountPageObj.openMyAccountPage(driver,screenshotPath);

    //will find 'gerenal settings' tab and then click on that
    const generalSettingsTab = await generalSettingsPageElementObj.findGeneralSettingsTab(driver,screenshotPath);
    await generalSettingsTab.click();
    await driver.sleep(2000);

    //will verify whether the general settings page found or not
    const currentPageTitle = await driver.getTitle();
    try{
        await assert.strictEqual(currentPageTitle,'General - My Account');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'GeneralSettingsPage_NotFound.png');
        await assert.fail('Due to the general settings page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'GeneralSettingsPage_NotFound.png\'');
    }

    console.log('The general settings page has been opened successfully...');
}exports.openGeneralSettingsPage=openGeneralSettingsPage;

async function clickOnEmailSignatureFormatOption(driver,screenshotPath,formatOption,formatValue,emailSignatureText){
    //will find email signature field
    const emailSignatureiFrame = await generalSettingsPageElementObj.findEmailSignatureiFrame(driver,screenshotPath);
    await driver.switchTo().frame(emailSignatureiFrame);
    const emailSignatureField = await generalSettingsPageElementObj.findEmailSignatureTextBox(driver,screenshotPath);
    await driver.switchTo().defaultContent();

    const paragraphOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'moreParagraph');
    const textOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'moreText');

    //will click on the respective format option
    const formatOpt = formatOption.toLowerCase();
    if(formatOpt == 'bold'){
        const boldOptElem = await generalSettingsPageElementObj.findEmailSignatureFormatOptionRare(driver,'bold');
        if(await boldOptElem[0].isDisplayed()){
            await boldOptElem[0].click();
        }else{
            await textOpt.click();
            const boldOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'bold');
            await boldOpt.click();
        }
    }
    else if(formatOpt == 'italic'){
        const italicOptElem = await generalSettingsPageElementObj.findEmailSignatureFormatOptionRare(driver,'italic');
        if(await italicOptElem[0].isDisplayed()){
            await italicOptElem[0].click();
        }else{
            await textOpt.click();
            const italicOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'italic');
            await italicOpt.click();
        }
    }
    else if(formatOpt == 'underline'){
        const underlineOptElem = await generalSettingsPageElementObj.findEmailSignatureFormatOptionRare(driver,'underline');
        if(await underlineOptElem[0].isDisplayed()){
            await underlineOptElem[0].click();
        }else{
            await textOpt.click();
            const underlineOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'underline'); 
            await underlineOpt.click();
        }
    }
    else if(formatOpt == 'strikethrough'){
        const strikethroughOptElem = await generalSettingsPageElementObj.findEmailSignatureFormatOptionRare(driver,'strikeThrough');
        if(await strikethroughOptElem[0].isDisplayed()){
            await strikethroughOptElem[0].click();
        }else{
            await textOpt.click();
            const strikethroughOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'strikeThrough'); 
            await strikethroughOpt.click();
        }
    }
    else if(formatOpt == 'color text'){
        //creating an error
    }
    else if(formatOpt == 'background color text'){
       //creating an error
    }
    else if(formatOpt == 'order list'){
        await paragraphOpt.click();
        const orderListOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'formatOLOptions');
        await orderListOpt.click();
        await driver.sleep(1000); 
        await selectDropdownValueFromEmailSignatureFormatOption(driver,screenshotPath,formatOpt,orderListOpt,formatValue);
    }
    else if(formatOpt == 'unorder list'){
        await paragraphOpt.click();
        const unorderListOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'formatULOptions');
        await unorderListOpt.click();
        await driver.sleep(1000); 
        await selectDropdownValueFromEmailSignatureFormatOption(driver,screenshotPath,formatOpt,unorderListOpt,formatValue);
    }
    else if(formatOpt == 'insert link'){
        const linkOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'insertLink');
        await linkOpt.click();
         
        const linkURLTextbox = await generalSettingsPageElementObj.findURLTextBox(driver,screenshotPath,'href');
        await linkURLTextbox.sendKeys(formatValue);
        await linkURLTextbox.sendKeys('\t');
        const linkTextbox = await generalSettingsPageElementObj.findURLTextBox(driver,screenshotPath,'text');
        await linkTextbox.sendKeys(emailSignatureText);

        const linkInsertButton = await generalSettingsPageElementObj.findOkORInsertButtonOnEmailSignatureFormatPopup(driver,screenshotPath,'linkInsert');
        await linkInsertButton.click();
        await driver.sleep(1000);
    }
    else if(formatOpt == 'undo'){
        await driver.switchTo().frame(emailSignatureiFrame);
        await emailSignatureField.clear();
        await emailSignatureField.sendKeys(emailSignatureText);
        await driver.sleep(1000); 
        await driver.switchTo().defaultContent();

        const undoOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'undo');
        await undoOpt.click();
        await driver.sleep(1000);
    }
    else if(formatOpt == 'redo'){
        await driver.switchTo().frame(emailSignatureiFrame);
        await emailSignatureField.clear();
        await emailSignatureField.sendKeys(emailSignatureText);
        await driver.sleep(1000);
        await driver.switchTo().defaultContent();

        const undoOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'undo');
        await undoOpt.click();
        await driver.sleep(1000);

        const redoOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'redo');
        await redoOpt.click();
        await driver.sleep(1000);
    }
    else if(formatOpt == 'insert image'){
        const imageOpt = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'insertImage');
        await imageOpt.click();

        const imageURLTextbox = await generalSettingsPageElementObj.findImageTextBox(driver,screenshotPath);
        await imageURLTextbox.sendKeys(formatValue);
        
        const imageInsertButton = await generalSettingsPageElementObj.findOkORInsertButtonOnEmailSignatureFormatPopup(driver,screenshotPath,'imageInsertByURL');
        await imageInsertButton.click();
        await driver.sleep(7000);
    }
    else if(formatOpt == 'font family'){
        const fontFamilyOptElem = await generalSettingsPageElementObj.findEmailSignatureFormatOptionRare(driver,'fontFamily');
        if(await fontFamilyOptElem[0].isDisplayed()){
            await fontFamilyOptElem[0].click();
            await selectDropdownValueFromEmailSignatureFormatOption(driver,screenshotPath,formatOpt,fontFamilyOptElem[0],formatValue);
        }else{
            await textOpt.click();
            const fontFamilyOptField = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'fontFamily');
            await fontFamilyOptField.click();
            await selectDropdownValueFromEmailSignatureFormatOption(driver,screenshotPath,formatOpt,fontFamilyOptField,formatValue);
        }
    }
    else if(formatOpt == 'font size'){
        const fontSizeOptElem = await generalSettingsPageElementObj.findEmailSignatureFormatOptionRare(driver,'fontSize');
        if(await fontSizeOptElem[0].isDisplayed()){
            await fontSizeOptElem[0].click();
            await selectDropdownValueFromEmailSignatureFormatOption(driver,screenshotPath,formatOpt,fontSizeOptElem[0],formatValue);
        }else{
            await textOpt.click();
            const fontSizeOptField = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'fontSize');
            await fontSizeOptField.click();
            await selectDropdownValueFromEmailSignatureFormatOption(driver,screenshotPath,formatOpt,fontSizeOptField,formatValue);
        }
    }
    else if(formatOpt == 'align'){
        let alignOptField;
        await paragraphOpt.click();
        if(formatValue.toLowerCase() == 'align left'){
            alignOptField = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'alignLeft');
        }else if(formatValue.toLowerCase() == 'align center'){
            alignOptField = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'alignCenter');
        }else if(formatValue.toLowerCase() == 'align right'){
            alignOptField = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'alignRight');
        }else if(formatValue.toLowerCase() == 'align justify'){
            alignOptField = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'alignJustify');
        }else{
            assert.fail('The provided '+formatValue+' value is not valid. The value should be one of this ---> Align Left, Align Center, Align Right and Align Justify.');
        }
        await alignOptField.click();   
    }
    else if(formatOpt == 'code view'){
        await driver.switchTo().frame(emailSignatureiFrame);
        await emailSignatureField.clear();
        await driver.executeScript("arguments[0].innerHTML='<body class=\"fr-view __web-inspector-hide-shortcut__\" dir=\"auto\" contenteditable=\"true\" style=\"min-height: 200px;\" aria-disabled=\"false\" spellcheck=\"true\"><p><strong><em><span style=\"color: rgb(41, 105, 176);\"><u>Regards,</u></span></em></strong></p><p><strong><em><span style=\"color: rgb(41, 105, 176); font-family: Tahoma, Geneva, sans-serif; font-size: 20px;\">Automated Test</span></em></strong></p><p><strong><em><span style=\"color: rgb(41, 105, 176);\"><img src=\"http://images.clipartpanda.com/computer-clip-art-computer-clipart-black-and-white.png\" class=\"fr-fic fr-dib fr-fil fr-draggable\" style=\"width: 120px;\"></span></em></strong></p><table class=\"default-border fr-dashed-borders\" style=\"width: 100%;\"><tbody><tr><td style=\"width: 50.0000%;\"><div style=\"text-align: center;\"><strong><span style=\"color: rgb(41, 105, 176);\"><a href=\"https://www.rapidops.com/\">https://www.rapidops.com</a></span></strong></div></td><td style=\"width: 50.0000%;\"><div data-empty=\"true\" style=\"text-align: center;\"><a href=\"https://www.salesmate.io\"><strong>https://www.salesmate.io</strong></a></div></td></tr></tbody></table></body>';",emailSignatureField);    
        await driver.sleep(1000);
        await driver.switchTo().defaultContent();

        const codeViewBtn = await generalSettingsPageElementObj.findEmailSignatureFormatOption(driver,screenshotPath,'html');
        await codeViewBtn.click();
        await driver.sleep(2000);
    }
    else{
        assert.fail('The provided \''+formatOption+'\' format option is not valid to execute test case. Expected format options ---> Bold, Italic, Underline, Strikethrough, Color Text, Background Color Text, Order List, Unorder List, Insert Link, Undo, Redo, Insert Image, Font Family, Font Size, Align or Code View format option only');
    }
}exports.clickOnEmailSignatureFormatOption=clickOnEmailSignatureFormatOption;

async function selectDropdownValueFromEmailSignatureFormatOption(driver,screenshotPath,formatOption,formatOptionElement,formatValue){
    let existingDropdownValue, isNewDropdownValueValid = 'no', dropdownValueList = [], newDropdownValue;
    
    //will get dropdown value list
    const dropdownlist = await generalSettingsPageElementObj.findDropdownListOfEmailSignatureFormatOption(driver,screenshotPath,formatOption,formatOptionElement);
    //will travel dropdown value list
    for(let i=0; i<dropdownlist.length; i++){
        existingDropdownValue = await dropdownlist[i].getText();
        dropdownValueList.push(existingDropdownValue);
        
        //will select provided new dropdown value if it is valid
        if(formatValue.toLowerCase() == existingDropdownValue.toLowerCase()){
            isNewDropdownValueValid = 'yes'
            newDropdownValue = await generalSettingsPageElementObj.findNewDropdownValueOfEmailSignatureFormatOption(driver,screenshotPath,formatOption,formatOptionElement,formatValue);
            await newDropdownValue.click();
            await driver.sleep(1000);
        }
    }

    //will mark the test case as failed if the provided new dropdown value is not valid
    if(isNewDropdownValueValid == 'no'){
        assert.fail('The provided \''+formatValue+'\' dropdown value is not valid to execute the test case. Expected Dropdown Value ---> \''+dropdownValueList+'\'');
    }
}
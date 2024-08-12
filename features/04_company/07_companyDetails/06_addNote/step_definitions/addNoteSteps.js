const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/06_addNote/screenshots/';
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const path = require('path');
const addNoteElementsObj = require('../common/addNoteElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');

let boldNoteData = 'no', italicNoteData = 'no', underLineNoteData = 'no', strikeThroughNoteData = 'no', insertLinkNoteUrl = 'no';
let insertLinkNoteText = 'no', fontFamilyNote = 'no', fontFamilyValue = 'no', fontSizeNote = 'no', fontSizeValue = 'no';
let actualBoldNote, actualItalicNote, actualUnderLineNote, actualStrikeThroughNote, actualURLTextNote, actualFontFamilyNote, actualFontSizeNote;
let imageLink = 'no', actualImageNote, fileName = 'no', actualFileLink;

//---------Case 1: As a User, Verify that user should be able to add the note with the CK editor functionality----------

When('user is able to add note with the CK editor',async function(dataTable){
    try {
        //will make the add note visible on the screen
        await addNoteElementsObj.findAddNote(driver);
        await driver.sleep(1000);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'bold') {
                boldNoteData = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'moreText');
                await driver.sleep(1000);
                await addNoteElementsObj.findFormatOption(driver,'bold');
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(boldNoteData);
                //get value of added note
                actualBoldNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Bold Note: "+actualBoldNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            }
            else if (fieldName == 'italic') {
                italicNoteData = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'italic');
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(italicNoteData);
                //get value of added note
                actualItalicNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Italic Note: "+actualItalicNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'underline') {
                underLineNoteData = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'underline');
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(underLineNoteData);
                //get value of added note
                actualUnderLineNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Underline Note: "+actualUnderLineNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'insert link') {
                insertLinkNoteUrl = dataTable.rawTable[i][1];
                insertLinkNoteText = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'insertLink');
                await driver.sleep(500);
                const urlField = await addNoteElementsObj.findAddNoteURLField(driver);
                await urlField.sendKeys(insertLinkNoteUrl);
                const urlTextField = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await urlTextField.sendKeys(insertLinkNoteText);
                await driver.sleep(1000);
                //get value of added note
                const actualURLNote = await driver.findElement(By.id('fr-link-insert-layer-url-1')).getAttribute('value');
                actualURLTextNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("URL Note: "+actualURLNote);
                console.log("URL Text Note: "+actualURLTextNote);
                //click on 'Insert' Button
                await addNoteElementsObj.findInsertButton(driver);
                await driver.sleep(1000);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'font family') {
                fontFamilyNote = dataTable.rawTable[i][1];
                fontFamilyValue = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'fontFamily');
                await driver.sleep(500);
                await addNoteElementsObj.findFontFamilyValue(driver,`${fontFamilyNote}`);
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(fontFamilyValue);
                await driver.sleep(1000);
                //get value of added note
                actualFontFamilyNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Font Family Note: "+actualFontFamilyNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'font size') {
                fontSizeNote = dataTable.rawTable[i][1];
                fontSizeValue = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'fontSize');
                await driver.sleep(500);
                await addNoteElementsObj.findFontFamilyValue(driver,`${fontSizeNote}`);
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(fontSizeValue);
                await driver.sleep(1000);
                //get value of added note
                actualFontSizeNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Font Size Note: "+actualFontSizeNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            }
        }
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //get values of 'Added Notes' in 'Notes' tab
        const expectedBoldNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[6]')).getText();
        console.log(expectedBoldNote);
        const expectedItalicNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[5]')).getText();
        console.log(expectedItalicNote);
        const expectedUnderlineNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[4]')).getText();
        console.log(expectedUnderlineNote);
        const expectedUrlTextNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[3]')).getText();
        console.log(expectedUrlTextNote);
        const expectedFontFamilyNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[2]')).getText();
        console.log(expectedFontFamilyNote);
        const expectedFontSizeNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[1]')).getText();
        console.log(expectedFontSizeNote);
        try {
            strictEqual(actualBoldNote,expectedBoldNote);
            strictEqual(actualItalicNote,expectedItalicNote);
            strictEqual(actualUnderLineNote,expectedUnderlineNote);
            strictEqual(actualURLTextNote,expectedUrlTextNote);
            strictEqual(actualFontFamilyNote,expectedFontFamilyNote);
            strictEqual(actualFontSizeNote,expectedFontSizeNote);
            console.log("As notes are added and actual and expected notes are equal,so test case has been passed");
        }catch(err) {
            await assert.fail(err);
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'note_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 2: As a User, Verify that User should be able to add note with Attachments----------------------

When('user should be able to add note with Attachments',async function(dataTable){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //will make the add note visible on the screen
        await addNoteElementsObj.findAddNote(driver);
        await driver.sleep(1000);
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++) {

            //will check whether the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if (fieldName == 'bold') {
                boldNoteData = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'moreText');
                await driver.sleep(1000);
                await addNoteElementsObj.findFormatOption(driver,'bold');
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(boldNoteData);
                //get value of added note
                actualBoldNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Bold Note: "+actualBoldNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            }
            else if (fieldName == 'italic') {
                italicNoteData = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'italic');
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(italicNoteData);
                //get value of added note
                actualItalicNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Italic Note: "+actualItalicNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'underline') {
                underLineNoteData = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'underline');
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(underLineNoteData);
                //get value of added note
                actualUnderLineNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Underline Note: "+actualUnderLineNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'strikethrough') {
                strikeThroughNoteData = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'strikeThrough');
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(strikeThroughNoteData);
                //get value of added note
                actualStrikeThroughNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Strike Through Note: "+actualStrikeThroughNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'font family') {
                fontFamilyNote = dataTable.rawTable[i][1];
                fontFamilyValue = dataTable.rawTable[i][2];

                await addNoteElementsObj.findFormatOption(driver,'fontFamily');
                await driver.sleep(500);
                await addNoteElementsObj.findFontFamilyValue(driver,`${fontFamilyNote}`);
                await driver.sleep(500);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys(fontFamilyValue);
                await driver.sleep(1000);
                //get value of added note
                actualFontFamilyNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Font Family Note: "+actualFontFamilyNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'image') {
                imageLink = dataTable.rawTable[i][2];

                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys("Image");
                await driver.sleep(500);
                await addNoteElementsObj.findFormatOption(driver,'insertImage');
                await driver.sleep(500);
                const imageLinkValue = await addNoteElementsObj.findAddNoteImageURLField(driver);
                await imageLinkValue.sendKeys(imageLink);
                await driver.sleep(1000);
                //get value of added note
                const actualImageSrc = await driver.findElement(By.xpath('//input[@id="fr-image-by-url-layer-text-1"]')).getAttribute('value');
                console.log("Image Link Note: "+actualImageSrc);
                await addNoteElementsObj.findImgInsertButton(driver);
                await driver.sleep(2000);
                actualImageNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
                console.log("Image Note: "+actualImageNote);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            } else if (fieldName == 'file') {
                fileName = dataTable.rawTable[i][2];

                const filepath = await path.resolve(__dirname, '../testdata/'+fileName);
                //upload provided file
                const uploadFileElement = await formElementsObj.findUploadFileElement(driver);
                await uploadFileElement.sendKeys(filepath);
                await driver.sleep(3000);
                //get value of added note
                actualFileLink = await driver.findElement(By.xpath('//span[@class="name"]')).getText();
                console.log("Actual Uploaded File Note: "+actualFileLink);
                const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
                await textArea.sendKeys("File");
                await driver.sleep(500);
                await addNoteElementsObj.findSaveButton(driver);
                await driver.sleep(3000);
            }
        }
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //get values of 'Added Notes' in 'Notes' tab
        const expectedBoldNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[4]')).getText();
        console.log(expectedBoldNote);
        const expectedItalicNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[3]')).getText();
        console.log(expectedItalicNote);
        const expectedUnderlineNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[2]')).getText();
        console.log(expectedUnderlineNote);
        const expectedFontFamilyNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[1]')).getText();
        console.log(expectedFontFamilyNote);
        const expectedFileLink = await driver.findElement(By.xpath('//a[@class="name text-ellipsis primary-text-dark font-size-sm font-medium"]')).getText();
        console.log("Expected Updated File Note: "+expectedFileLink);
        try {
            strictEqual(actualBoldNote,expectedBoldNote);
            strictEqual(actualItalicNote,expectedItalicNote);
            strictEqual(actualUnderLineNote,expectedUnderlineNote);
            strictEqual(actualFileLink,expectedFileLink);
            console.log("As notes are added along with attachments and actual and expected notes are equal,so test case has been passed");
        }catch(err) {
            await assert.fail(err);
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'note_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 3: As a User, Verify that it should display success message upon clicking on the save button------------

When('user is on details page > add note',async function(){
   try {
       const contactName = await moduleElementsObj.clickOnContactName(driver,1);
       await contactName.click();
       await driver.sleep(3000);
       //will make the add note visible on the screen
       await addNoteElementsObj.findAddNote(driver);
       await driver.sleep(2000);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});

When('it should display success message {string} upon clicking on save button after adding note {string}',async function(expectedNotification,noteName){
    try {
        const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
        await textArea.click();
        await driver.sleep(500);
        await textArea.sendKeys(noteName);
        await addNoteElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'noteAddedNotification.png');
        await driver.sleep(3000);
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //get added 'Note' value
        const newlyAddedNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[1]')).getText();
        console.log("Newly Added Note: "+newlyAddedNote);
        //checking empty note text area after saving
        const noteText = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
        if(noteName === newlyAddedNote && noteText === '') {
            console.log("As after clicking on save button success message displayed and note get added and no note remains in text area after saving,so test case has been passed");
        }else {
            await assert.fail("As after clicking on save button success message is not displayed and note is not get added and note remains visible,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------------Case 4: As a User, Verify that Upon cancel button click it should terminate note add process-------------

When('add note {string} and upon Cancel button click it should terminate note add process',async function(noteName){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //will make the add note visible on the screen
        await addNoteElementsObj.findAddNote(driver);
        await driver.sleep(2000);
        const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
        await textArea.sendKeys(noteName);
        await addNoteElementsObj.findCancelButton(driver);
        await driver.sleep(2000);
        const noteText = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
        if(noteText === '') {
            console.log("As after clicking on cancel button add note process is terminated and note is not added,so test case has been passed");
        }else {
            await assert.fail("As after clicking on cancel button add note process is not terminated and note is added,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------------------Case 5: As a User, Verify that active user can be mentioned in the note---------------------------

When('verify that active user with {string} of {string} can be mentioned in the note',async function(userSymbol,userName){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //will make the add note visible on the screen
        await addNoteElementsObj.findAddNote(driver);
        await driver.sleep(2000);
        const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
        await textArea.sendKeys(userSymbol);
        await driver.sleep(1000);
        await addNoteElementsObj.findUserName(driver,`${userName}`);
        const actualUserName = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
        await addNoteElementsObj.findSaveButton(driver);
        await driver.sleep(3000);
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //get added 'Note' value
        const expectedUserName = await driver.findElement(By.xpath('(//div[@class="breakword"])[1]')).getText();
        console.log("Newly Added Note: "+expectedUserName);
        //visibility of 'User' tag
        const userTagVisibility = !!await driver.findElement(By.tagName('usertag')).isDisplayed();
        if(actualUserName === expectedUserName && userTagVisibility === true) {
            console.log("As user is added and user tag is displayed,so test case has been passed");
        }else {
            await assert.fail("As user is not added and user tag is not displayed,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 7: As a user, Verify that After adding note it should display in the All and in Note timeline-----------

When('verify that After adding note it should display in the All and in Note timeline',async function (){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //click on 'All' tab
        const timelineTabElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','All');
        await timelineTabElement.click();
        await driver.sleep(2000);
        //get added 'Note' value
        const allTabNoteNameText = await driver.findElement(By.xpath('(//div[@class="breakword"])[2]')).getText();
        console.log("All Tab Newly Added Note: "+allTabNoteNameText);
        const allTabNoteNameVisibility = !!await driver.findElement(By.xpath('(//div[@class="breakword"])[2]')).isDisplayed();
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //get added 'Note' value
        const noteTabNoteNameText = await driver.findElement(By.xpath('(//div[@class="breakword"])[2]')).getText();
        console.log("Notes Tab Newly Added Note: "+noteTabNoteNameText);
        const noteTabNoteNameVisibility = !!await driver.findElement(By.xpath('(//div[@class="breakword"])[2]')).isDisplayed();
        if(allTabNoteNameVisibility === noteTabNoteNameVisibility && allTabNoteNameText === noteTabNoteNameText) {
            console.log("As added note in all and notes tab are displayed,so test case has been passed");
        }else {
            await assert.fail("As added note in all and notes tab are not displayed,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 8: As a User, Verify that i should be able to pin/unpin the note from the timeline entry--------------

When('verify that user should be able to pin or unpin the note from the timeline entry',async function(){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //'Pin' a Note
        await addNoteElementsObj.findPinIcon(driver,1);
        await driver.sleep(2000);
        //check visibility of 'Pinned Notes'
        const pinnedContainer = !!await driver.findElement(By.xpath('//div[@class="pinnedContainer"]')).isDisplayed();
        const pinnedNotesVisibility = !!await driver.findElement(By.xpath('//h2[ contains (text(),"Pinned Notes" ) ]')).isDisplayed();
        //get value of 'Pinned Notes'
        const pinnedNoteText = await driver.findElement(By.xpath('(//div[@class="pinnedContainer"]/timeline-note//div[@class="breakword"]/div)[1]')).getText();
        console.log("Pinned Note Text: "+pinnedNoteText);
        if((pinnedContainer && pinnedNotesVisibility) === true) {
            console.log("As pinned container and pinned note are visible after pinning a note,so test case has been passed");
        } else {
            await assert.fail("As pinned container and pinned note are not visible after pinning a note,so test case has been aborted");
        }
        //'UnPin' a Note
        await addNoteElementsObj.findUnPinIcon(driver,1);
        await driver.sleep(2000);
        //check visibility of 'Pinned Notes'
        const pinnedContainerVisibility = !!await driver.findElement(By.xpath('//div[@class="pinnedContainer"]')).isDisplayed();
        //get value of 'Pinned Notes'
        const pinnedNoteElement = await driver.findElements(By.xpath('(//div[@class="pinnedContainer"]/timeline-note//div[@class="breakword"]/div)[1]'));
        const pinnedNoteLength = await pinnedNoteElement.length;
        if(pinnedContainerVisibility === false && pinnedNoteLength === 0) {
            console.log("As pinned container and pinned note are not visible after unpinning a note,so test case has been passed");
        } else {
            await assert.fail("As pinned container and pinned note are visible even after pinning a note,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 9: As a User, Verify that it should allow me to update the note from timeline entry-----------------

When('verify that it should allow me to update {string} note from timeline entry and verify {string}',async function(updatedNote,expectedNotification){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //'Update' a Note
        await addNoteElementsObj.findUpdateIcon(driver,2);
        await driver.sleep(2000);
        const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
        await textArea.clear();
        await driver.sleep(500);
        await textArea.sendKeys(updatedNote);
        await driver.sleep(1000);
        const actualUpdatedNote = await driver.findElement(By.xpath('//div[@class="fr-element fr-view"]')).getText();
        console.log("Actual Updated Note: "+actualUpdatedNote);
        await addNoteElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
        const timelineTabElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTabElement.click();
        await driver.sleep(2000);
        //get updated 'Note' value
        const expectedUpdatedNote = await driver.findElement(By.xpath('(//div[@class="breakword"])[2]')).getText();
        console.log("Expected Updated Note: "+expectedUpdatedNote);
        try {
            strictEqual(actualUpdatedNote,expectedUpdatedNote);
            console.log("As note is updated and actual and expected updated notes are equal,so test case has been passed");
        }catch(err){
            await assert.fail("As note is not updated and actual and expected updated notes are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 10: As a user, Verify that it should allow me to delete the note from timeline entry----------------

When('verify that it should allow me to delete the note from timeline entry',async function(){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //get 'Added Notes' Count before deletion
        const notesCountBeforeDeletion = await driver.findElements(By.xpath('//div[@class="breakword"]'));
        const notesCountBeforeDeletionLength = await notesCountBeforeDeletion.length;
        //'Delete' a Note
        await addNoteElementsObj.findDeleteIcon(driver,2);
        await driver.sleep(1000);
        await addNoteElementsObj.findConfirmationButton(driver,'Yes');
        await driver.sleep(3000);
        //get 'Added Notes' Count after deletion
        const notesCountAfterDeletion = await driver.findElements(By.xpath('//div[@class="breakword"]'));
        const notesCountAfterDeletionLength = await notesCountAfterDeletion.length;
        if((notesCountBeforeDeletionLength)-1 === notesCountAfterDeletionLength) {
            console.log("As notes count after deletion is decreased by (X-1),so test case has been passed");
        } else {
            await assert.fail("As notes count after deletion is not decreased by (X-1),so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 11: As a User, Verify that it should allow me to update note with Attachments--------------------

When('verify that it should allow me to update note {string} with Attachments',async function(fileName){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(2500);
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        await addNoteElementsObj.findUpdateIcon(driver,2);
        await driver.sleep(3000);
        await addNoteElementsObj.findFileDeleteButton(driver);
        await driver.sleep(1000);
        const filepath = await path.resolve(__dirname, '../testdata/'+fileName);
        //upload provided file
        const uploadFileElement = await formElementsObj.findUploadFileElement(driver);
        await uploadFileElement.sendKeys(filepath);
        await driver.sleep(3000);
        //get value of added note
        const actualUpdatedFileNote = await driver.findElement(By.xpath('//span[@class="name"]')).getText();
        console.log("Actual Updated File Note: "+actualUpdatedFileNote);
        await addNoteElementsObj.findSaveButton(driver);
        await driver.sleep(3000);
        //get expected value of image note
        const expectedUpdatedFileNote = await driver.findElement(By.xpath('//a[@class="name text-ellipsis primary-text-dark font-size-sm font-medium"]')).getText();
        console.log("Expected Updated File Note: "+expectedUpdatedFileNote);
        if(actualUpdatedFileNote === expectedUpdatedFileNote) {
            console.log("As previous file is updated with new one and actual and expected updated file notes are equal,so test case has been passed");
        } else {
            await assert.fail("As previous file is not updated with new one and actual and expected updated file notes are not equal,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------Case 12: As a User, Verify that it shouldn't allow user to add / Update note with blank content-----------

When('it should not allow user to add or update note with blank content and shows {string}',async function(expectedNotification){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //will make the add note visible on the screen
        await addNoteElementsObj.findAddNote(driver);
        await driver.sleep(1000);
        //checking validation message while 'Adding' empty note
        await addNoteElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        try {
            strictEqual(actualNotification, expectedNotification);
            await driver.sleep(3500);
        }catch(err){
            await assert.fail(err);
        }
        //checking validation message while 'Updating' empty note
        await addNoteElementsObj.findUpdateIcon(driver,1);
        await driver.sleep(3000);
        await addNoteElementsObj.findFileDeleteButton(driver);
        await driver.sleep(1000);
        const textArea = await addNoteElementsObj.findAddNoteTextAreaField(driver);
        await textArea.clear();
        await driver.sleep(1000);
        await addNoteElementsObj.findSaveButton(driver);
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const actualNotificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        try {
            strictEqual(actualNotificationMsg, expectedNotification);
            await driver.sleep(3000);
        }catch(err){
            await assert.fail(err);
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------------Case 13: As a User, Verify that it should allow me to delete note with Attachments--------------------

When('verify that it should allow me to delete note with Attachments',async function(){
    try {
        const contactName = await moduleElementsObj.clickOnContactName(driver,1);
        await contactName.click();
        await driver.sleep(3000);
        //click on 'Notes' tab
        const timelineTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Notes');
        await timelineTab.click();
        await driver.sleep(2000);
        //get 'Added Notes' Count before deletion
        const notesCountBeforeDeletion = await driver.findElements(By.xpath('//div[@class="breakword"]'));
        const notesCountBeforeDeletionLength = await notesCountBeforeDeletion.length;
        //'Delete' a Note
        await addNoteElementsObj.findDeleteIcon(driver,1);
        await driver.sleep(1000);
        await addNoteElementsObj.findConfirmationButton(driver,'Yes');
        await driver.sleep(3000);
        //get 'Added Notes' Count after deletion
        const notesCountAfterDeletion = await driver.findElements(By.xpath('//div[@class="breakword"]'));
        const notesCountAfterDeletionLength = await notesCountAfterDeletion.length;
        if((notesCountBeforeDeletionLength)-1 === notesCountAfterDeletionLength) {
            console.log("As notes count after deletion is decreased by (X-1) and note with attachment is deleted successfully,so test case has been passed");
        } else {
            await assert.fail("As notes count after deletion is not decreased by (X-1) and note with attachment is not deleted,so test case has been aborted");
        }
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

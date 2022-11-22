const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/07_companyDetails/07_addFile/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const addFileElements = require('../common/addFileElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const commonElementObj = require('../../../../00_common/webElements/commonElements');

When('user is on company details page > file tab',async function(){
   try {
       const companyName = await moduleElementsObj.clickOnContactName(driver,1);
       await companyName.click();
       await driver.sleep(2000);
       const fileTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','File');
       await fileTab.click();
       await driver.sleep(1500);
   } catch (err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'fileTab_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//--------------------------------Case 1: As a User, Verify the UI of 'Attach a file'-----------------------------------

Then('verify the UI of file tab and check {string} message',async function(expectedNotification){
    try {
        //check 'Drag and Drop files here or Click to upload' message
        const actualNotification = await driver.findElement(By.xpath('//sm-file-upload//p')).getText();
        console.log("File tab Notification: " + actualNotification);
        try {
            strictEqual(actualNotification, expectedNotification);
            await driver.sleep(1500);
            console.log("As 'Drag and Drop files here or Click to upload' message is displayed under file tab,so test case has been passed");
        } catch (err) {
            await assert.fail(err);
        }
    } catch(err){
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'fileMessage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 3: As a User, Verify 'Attach from Google Drive' button shows after installing google drive app in set up-------------

When('verify {string} button shows after installing google drive app in set up',async function(googleDriveButton){
   try {
       await openSalesmatePageObj.openSetupPage(driver, screenshotPath);
       const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
       //will set focus on the 'Apps' tab
       await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
       await driver.wait(until.elementIsVisible(appsTab[0]));
       //will click on the 'Apps' tab
       await appsTab[0].click();
       await driver.sleep(1000);
       await driver.manage().setTimeouts({implicit: 1000});
       //verify whether google drive app installation button found or not
       const googleDriveAppInstallationButton = await driver.findElements(By.xpath("//h4[text()='Google Drive ']/following-sibling::a[text()='Install ']"));
       const googleDriveAppInstallationButtonLength = await googleDriveAppInstallationButton.length;
       //As if installation button is found i.e; app is not installed yet,so install it
       if (googleDriveAppInstallationButtonLength > 0) {
           const googleDriveInstallButton = await addFileElements.findGoogleDriveInstallButton(driver);
           await driver.executeScript("arguments[0].click();",googleDriveInstallButton);
           await driver.sleep(3000);
       } else {
           console.log("Google Drive app is installed successfully");
       }
       const companyModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
       await companyModule.click();
       await driver.sleep(2000);
       const companyName = await moduleElementsObj.clickOnContactName(driver,1);
       await companyName.click();
       await driver.sleep(2000);
       const fileTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','File');
       await fileTab.click();
       await driver.sleep(1500);
       const attachFromGoogleDriveButton = await driver.findElements(By.id('attachFromGoogleDrive'));
       const googleDriveButtonLength = await attachFromGoogleDriveButton.length;
       if (googleDriveButtonLength > 0) {
           console.log("As 'Attach from google drive' button is displayed,so test case has been passed");
       } else {
           await assert.fail("As 'Attach from google drive' button is not displayed,so test case has been aborted");
       }
   } catch(err){
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'googleDriveApp_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//--------------------------Case 4: As a User, Verify user able to delete the uploaded file-----------------------------

Then('verify user able to delete the uploaded file and check {string} message',async function(expectedNotification){
    try {
        //get count of 'files' before deleting
        const fileElement = await driver.findElements(By.xpath('//div[@id="desktop"]/a'));
        const filesLengthBeforeDeleting = await fileElement.length;
        const deleteIcon = await addFileElements.findDeleteIcon(driver,1);
        await driver.executeScript("arguments[0].click();",deleteIcon);
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1000);
        const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
        //get count of 'files' after deleting
        const fileElements = await driver.findElements(By.xpath('//div[@id="desktop"]/a'));
        const filesLengthAfterDeleting = await fileElements.length;
        if ((filesLengthBeforeDeleting)-1 === filesLengthAfterDeleting) {
            console.log("As file is deleted and also files length decreased by (X-1),so test case has been passed");
        } else {
            await assert.fail("As file is not deleted and also files length is not decreased by (X-1),so test case has been aborted");
        }
    } catch (err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 6: As a User, Verify user should not be able to upload the file by clicking on 'Cancel' button-----------------

Then('verify user should not be able to upload the file {string} by clicking on {string} button',async function(fileName,cancelButton){
    try {
        const filepath = await path.resolve(__dirname, '../testdata/' + fileName);
        //upload provided file
        const uploadFileElement = await formElementsObj.findUploadFileDiv(driver);
        await uploadFileElement.sendKeys(filepath);
        await driver.sleep(3000);
        //get Uploaded 'File Name' and 'File Size'
        const uploadedFileName = await driver.findElement(By.xpath('//span[@class="name"]')).getText();
        console.log("Uploaded File Name: " + uploadedFileName);
        const uploadedFileSize = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[1]//span[@class="size"]')).getText();
        console.log("Uploaded File Size: " + uploadedFileSize);
        //click on 'Cancel' button
        const cancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Cancel ');
        await cancelButton.click();
        await driver.sleep(1500);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 1000});
        const uploadedFileElement = await driver.findElements(By.xpath('//span[@class="name"]'));
        const uploadedFileElementLength = await uploadedFileElement.length;
        if (uploadedFileElementLength === 0) {
            console.log("As file is not uploaded after clicking on cancel button,so test case has been passed");
        } else {
            await assert.fail("As file is uploaded even after clicking on cancel button,so test case has been aborted");
        }
    } catch (err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------------Case 7: As a User, Verify timeline entry should get updated after file is attached-------------------

Then('verify timeline entry should get updated after file is attached',async function(){
    try {
        const fileElements = await driver.findElements(By.xpath('//div[@id="desktop"]/a'));
        const fileElementsLength = await fileElements.length;
        for (let i = 1; i <= fileElementsLength; i++) {
            const filesText = await driver.findElement(By.xpath(`(//div[@id='desktop']/a)[${i}]`)).getText();
            console.log(filesText);
        }
        for (let i = 1; i <= 5; i++) {
            const fileAttachmentText = await driver.findElement(By.xpath(`(//timeline-file[1]//span)[${i}]`)).getText();
            console.log(fileAttachmentText);
        }
        //check 'Download button' visibility
        const downloadIcon = !!await driver.findElement(By.xpath('//timeline-file[1]//sm-file-attachment//a/i')).isDisplayed();
        const deleteIcon = !!await driver.findElement(By.xpath('//timeline-file[1]//button/i[@class="icon-trash"]')).isEnabled();
       console.log(downloadIcon, deleteIcon)
        if ((downloadIcon && deleteIcon) === true) {
            console.log("As UI of timeline entry is displayed as expected,so test case has been passed");
        } else {
            await assert.fail("As UI of timeline entry is not displayed as expected,so test case has been aborted")
        }
    } catch (err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 9: As a User, Verify user able to download the image type file from the company timeline entry--------------

Then('verify user able to download the image type file from the company timeline entry',async function(){
    let winHandleBefore;
    try {
        winHandleBefore = await driver.getWindowHandle();
        const downloadIcon = await addFileElements.findDownloadIcon(driver,3);
        await downloadIcon.click();
        await driver.sleep(8000);
        const lastTab = await driver.getAllWindowHandles();
        const closeLastTab = lastTab[lastTab.length - 1];
        await driver.switchTo().window(closeLastTab);
        const currentURL = await driver.getCurrentUrl();
        console.log("current url is:" +currentURL);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'downloadImagePage.png');
        if(currentURL.includes('https://storage.googleapis.com')) {
            console.log("As download image page opened and current url and expected url are same test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'downloadImagePage_NotFound.png')
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("Due to unmatched URLs,test case has been aborted");
        }
    } catch (err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    finally {
        await driver.close();
        await driver.switchTo().window(winHandleBefore);
        await driver.sleep(3000);
    }
});

//------------Case 10: As a User, Verify user able to see the csv or pdf type file from the company timeline entry--------------

Then('verify user able to see the pdf type file from the company timeline entry',async function(){
    let winHandleBefore;
    try {
        winHandleBefore = await driver.getWindowHandle();
        const downloadIcon = await addFileElements.findDownloadIcon(driver,2);
        await downloadIcon.click();
        await driver.sleep(10000);
        const lastTab = await driver.getAllWindowHandles();
        const closeLastTab = lastTab[lastTab.length - 1];
        await driver.switchTo().window(closeLastTab);
        const currentURL = await driver.getCurrentUrl();
        console.log("current url is:" +currentURL);
        await screenshotObj.takeScreenshot(driver,screenshotPath+'downloadPdfPage.png');
        if(currentURL.includes('https://storage.googleapis.com')) {
            console.log("As download pdf page opened and current url and expected url are same test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'downloadPdfPage_NotFound.png')
            await driver.navigate().refresh();
            await driver.sleep(5000);
            await assert.fail("Due to unmatched URLs,test case has been aborted");
        }
    } catch (err){
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
    finally {
        await driver.close();
        await driver.switchTo().window(winHandleBefore);
        await driver.sleep(3000);
    }
});

Then('verify user able to see the csv type file from the company timeline entry',async function(){
    try {
        //will check the file is get downloaded or not
        const file = './downloadedFile/datetime.csv';
        const downloadIcon = await addFileElements.findDownloadIcon(driver, 1);
        await downloadIcon.click();
        await driver.sleep(6000);
        assert(fs.statSync(file).isFile());
        const fileExtension = await file.split('.').pop();
        console.log("File Extension: " + fileExtension);
        if (fileExtension === 'csv') {
            console.log("As downloaded file's extension is " + fileExtension + ",so test case has been passed");
        } else {
            await assert.fail("As downloaded file's extension is not expected " + fileExtension + ",so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
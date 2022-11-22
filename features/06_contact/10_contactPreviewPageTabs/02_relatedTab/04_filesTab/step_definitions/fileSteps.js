const { Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/04_filesTab/screenshots/';
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const filesElementsObj = require('../common/fileElements');
const path = require('path');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

//----Case 1: As a User, Verify that When No File is attached it should display "No file attached yet! let's attach one" message----

Then('verify that When No File is attached it should display {string} message',async function(expectedNotification){
   try {
       const files = await driver.findElement(By.xpath('//div[4]/div/section-title//i')).getText();
       console.log(files);
       const filesText = await files.replace(/[()]/g, '');
       const filesCount = await parseInt(filesText);
       console.log("Files Count: "+filesCount);
       await filesElementsObj.findSideArrow(driver);
       if(filesCount === 0) {
           //check 'No Files found' message
           const actualNotification = await driver.findElement(By.xpath('//sm-file-list//section-body//p')).getText();
           console.log("Actual File Notification: " + actualNotification);
           try {
               strictEqual(actualNotification, expectedNotification);
               console.log("As no files are found 'No file attached yet! let's attach one' message is displayed,so test case has been passed");
           } catch (err) {
               await driver.navigate().refresh();
               await driver.sleep(5000);
               await assert.fail(err);
           }
       } else {
           await assert.fail("As no files are found 'No file attached yet! let's attach one' message is not displayed,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'message_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----Case 2: As a User, Verify 'Attach from Google Drive' button shows after installing google drive app in set up----

Then('verify "Attach from Google Drive" button shows after installing google drive app under {string} module',async function(moduleName){
   try {
       await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
       const appsTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
       //will set focus on the 'Apps' tab
       await driver.executeScript("arguments[0].scrollIntoView();", appsTab[0]);
       await driver.wait(until.elementIsVisible(appsTab[0]));
       //will click on the 'Apps' tab
       await appsTab[0].click();
       await driver.sleep(1000);
       await driver.manage().setTimeouts({implicit:10000});
       //verify whether 'Google Drive' app installation button found or not
       const googleDriveInstallationButton = await driver.findElements(By.xpath("//h4[text()='Google Drive ']/following-sibling::a[text()='Install ']"));
       const googleDriveInstallationButtonLength = await googleDriveInstallationButton.length;
       //As if installation button is found i.e; app is not installed yet,so install it
       if(googleDriveInstallationButtonLength > 0) {
           await filesElementsObj.findGoogleDriveInstallationButton(driver);
           await driver.sleep(3000);
       } else {
           console.log("Already Google drive app is installed successfully");
       }
       const contactModule = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
       await contactModule.click();
       await driver.sleep(2000);
       const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
       await contactCheckbox.click();
       await driver.sleep(2000);
       const previewButton = await moduleElementsObj.findPreViewButton(driver, 1);
       await previewButton.click();
       await driver.sleep(2000);
       const relatedTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
       await relatedTab.click();
       await driver.sleep(2000);
       //check visibility of 'Attach From Google Drive'
       await filesElementsObj.findSideArrow(driver);
       await filesElementsObj.findAttachFileButton(driver);
       await driver.manage().setTimeouts({implicit:2000});
       const attachFromGoogleDrive = await driver.findElements(By.id("attachFromGoogleDrive"));
       const attachFromGoogleDriveCount = await attachFromGoogleDrive.length;
       try {
           if (attachFromGoogleDriveCount > 0) {
               await screenshotObj.takeScreenshot(driver, screenshotPath + 'attachFromGoogleDriveButton.png');
               console.log("As 'Attach from google drive' is visible under related tab > attach file page,so test case has been passed");
           } else {
               await assert.fail("As 'Attach from google drive' is not visible under related tab > attach file page,so test case has been aborted");
           }
       } catch(err) {
           await assert.fail(err);
       }
       await filesElementsObj.findAttachFileCloseIcon(driver);
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);

       await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
       const appTab = await commonElementObj.findSetupSubmenuBtn(driver, screenshotPath, ' Apps ');
       //will set focus on the 'Apps' tab
       await driver.executeScript("arguments[0].scrollIntoView();", appTab[0]);
       await driver.wait(until.elementIsVisible(appTab[0]));
       //will click on the 'Apps' tab
       await appTab[0].click();
       await driver.sleep(1000);
       await filesElementsObj.configureGoogleDriveApp(driver);
       await filesElementsObj.findGoogleDriveRemoveButton(driver);
       const contactModuleElement = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
       await contactModuleElement.click();
       await driver.sleep(2000);
       const contactCheckboxElement = await moduleElementsObj.findContactCheckbox(driver,1);
       await contactCheckboxElement.click();
       await driver.sleep(2000);
       const previewButtonElement = await moduleElementsObj.findPreViewButton(driver, 1);
       await previewButtonElement.click();
       await driver.sleep(2000);
       const relatedTabElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
       await relatedTabElement.click();
       await driver.sleep(2000);
       //check visibility of 'Attach From Google Drive'
       await filesElementsObj.findSideArrow(driver);
       await filesElementsObj.findAttachFileButton(driver);
       await driver.manage().setTimeouts({implicit:2000});
       const attachFromGoogleDriveElement = await driver.findElements(By.id("attachFromGoogleDrive"));
       const attachFromGoogleDriveLength = await attachFromGoogleDriveElement.length;
       try {
           if (attachFromGoogleDriveLength === 0) {
               await screenshotObj.takeScreenshot(driver, screenshotPath + 'attachFromGoogleDriveButton.png');
               console.log("As 'Attach from google drive' is invisible under related tab > attach file page,so test case has been passed");
           } else {
               await assert.fail("As 'Attach from google drive' is not invisible under related tab > attach file page,so test case has been aborted");
           }
       } catch(err) {
           await assert.fail(err);
       }
       await filesElementsObj.findAttachFileCloseIcon(driver);
       const closeIconElement = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIconElement.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'attachButton_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//--------Case 3: As a User, Verify that user can upload any system file by clicking on drag and drop section---------

Then('user can upload {string} file by clicking on drag and drop section and verify {string}',async function(fileName,expectedNotification){
   try {
       const files = await driver.findElement(By.xpath('//div[3]/div/section-title//i | //div[3]/div/section-title//i')).getText();
       console.log(files);
       const filesText = await files.replace(/[()]/g, '');
       const filesCountBeforeAddingFile = await parseInt(filesText);
       console.log("Files Count: "+filesCountBeforeAddingFile);
       await filesElementsObj.findSideArrow(driver);
       await filesElementsObj.findAttachFileButton(driver);
       const filepath = await path.resolve(__dirname, '../testdata/' + fileName);
       //upload provided file
       const uploadFileElement = await formElementsObj.findUploadFileElement(driver);
       await uploadFileElement.sendKeys(filepath);
       await driver.sleep(3000);
       //get Uploaded 'File Name' and 'File Size'
       const uploadedFileName = await driver.findElement(By.xpath('//span[@class="name"]')).getText();
       console.log("Uploaded File Name: " + uploadedFileName);
       const uploadedFileSize = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[1]//span[@class="size"]')).getText();
       console.log("Uploaded File Size: " + uploadedFileSize);
       //click on 'Attach' button
       const attachButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Attach ');
       await attachButton.click();
       await driver.sleep(3000);
       const notificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
       await driver.wait(until.elementIsVisible(notificationElement));
       const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
       strictEqual(actualNotification, expectedNotification);
       await driver.sleep(5000);
       //get 'File Name'
       const addedFileName = await driver.findElement(By.xpath('//a[@class="default-text text-ellipsis title"]')).getText();
       console.log("Added File Name: "+addedFileName);
       //get 'Files Count' after adding a file
       const filesElement = await driver.findElement(By.xpath('//sm-file-list//section/section-title//i')).getText();
       console.log(filesElement);
       const fileText = await filesElement.replace(/[()]/g, '');
       const filesCountAfterAddingFile = await parseInt(fileText);
       console.log("Files Count: "+filesCountAfterAddingFile);
       if((filesCountBeforeAddingFile)+1 === filesCountAfterAddingFile && uploadedFileName === addedFileName) {
           console.log("As files count increased by (X+1) after adding a file and file is added,so test case has been passed");
       } else {
           await assert.fail("As files count is not increased by (X+1) even after adding a file and file is not added,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'file_NotUploaded.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----------------Case 6: As a User, Verify It should add File in to panel on the spot after we attach-----------------

Then('verify It should add File in to panel on the spot after we attach',async function(){
    try {
        await filesElementsObj.findSideArrow(driver);
        //get Uploaded 'File Name' and 'File Size'
        const addedFileName = await driver.findElement(By.xpath('//a[@class="default-text text-ellipsis title"]')).getText();
        console.log("Added File Name: "+addedFileName);
        const fileUploadedDate = await driver.findElement(By.css('.font-size-xs.otherdetail.secondary-text > span:nth-of-type(1)')).getText();
        console.log("File Uploaded Date: "+fileUploadedDate);
        const addedFileSize = await driver.findElement(By.css('.font-size-xs.otherdetail.secondary-text > span:nth-of-type(2)')).getText();
        console.log("Added File Size: "+addedFileSize);
        await filesElementsObj.findFileRemoveButton(driver);
        const removeButtonVisibility = await driver.findElement(By.xpath('//i[@class="icon-more-squares-vertical-filled"]')).isDisplayed();
        console.log("Is File Remove Button is displayed: "+removeButtonVisibility);
        if(removeButtonVisibility === true) {
            console.log("As added file details and remove button are displayed under files panel section,so test case has been passed");
        } else {
            await assert.fail("As added file details and remove button are not displayed under files panel section,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'file_NotAdded.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----Case 5: As a User, Verify that If we click on the Attach button without adding a file it should display validation message----

Then('we click on the Attach button without adding a file it should display validation {string}',async function(expectedValidation){
   try {
       await filesElementsObj.findAddFileIcon(driver);
       const attachButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Attach ');
       await attachButton.click();
       await driver.sleep(1000);
       const validationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
       await driver.wait(until.elementIsVisible(validationElement));
       const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
       strictEqual(actualValidation, expectedValidation);
       await driver.sleep(2000);
       await filesElementsObj.findAttachFileCloseIcon(driver);
       await driver.sleep(2000);
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'validationMessage_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//---------Case 7: As a User, Verify that After uploading a file if we click on the Cancel button it should terminate file upload process------

Then('uploading a {string} file if we click on the Cancel button it should terminate file upload process',async function(fileName){
   try {
       await filesElementsObj.findAddFileIcon(driver);
       const filepath = await path.resolve(__dirname, '../testdata/' + fileName);
       //upload provided file
       const uploadFileElement = await formElementsObj.findUploadFileElement(driver);
       await uploadFileElement.sendKeys(filepath);
       await driver.sleep(3000);
       //get Uploaded 'File Name' and 'File Size'
       const uploadedFileName = await driver.findElement(By.xpath('//span[@class="name"]')).getText();
       console.log("Uploaded File Name: " + uploadedFileName);
       const uploadedFileSize = await driver.findElement(By.xpath('//div[@id="attachmentPreviews"]/div[1]//span[@class="size"]')).getText();
       console.log("Uploaded File Size: " + uploadedFileSize);
       await filesElementsObj.findCancelButton(driver);
       await filesElementsObj.findCancelConfirmButton(driver,'No');
       await driver.manage().setTimeouts({implicit:2000});
       const uploadedFileNameElements = await driver.findElements(By.xpath('//span[@class="name"]'));
       const uploadedFileNameCount = await uploadedFileNameElements.length;
       if(uploadedFileNameCount > 0) {
           console.log("As File is not get removed after terminating file upload process by clicking on 'No' button,so test case has been passed");
       } else {
           await assert.fail("As File is get removed even after terminating file upload process,so test case has been aborted");
       }
       await filesElementsObj.findCancelButton(driver);
       await filesElementsObj.findCancelConfirmButton(driver,'Yes');
       await driver.manage().setTimeouts({implicit:2000});
       const uploadedFileNameElement = await driver.findElements(By.xpath('//span[@class="name"]'));
       const uploadedFileNameLength = await uploadedFileNameElement.length;
       const uploadedFilesWindow = await driver.findElements(By.xpath('//ngb-modal-window[2]//sm-file-upload-dialog//h4'));
       const uploadedFilesWindowLength = await uploadedFilesWindow.length;
       if((uploadedFileNameLength && uploadedFilesWindowLength) === 0) {
           console.log("As File is get removed and 'Upload Files Window' is closed after clicking on 'Yes' button of terminating file upload process,so test case has been passed");
       } else {
           await assert.fail("As File is not get removed and 'Upload Files Window' is not closed even after clicking on 'Yes' button of terminating file upload process,so test case has been aborted");
       }
       const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
       await closeIcon.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver,screenshotPath+'fileUploadProcess_NotTerminated.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//--------------------------Case 8: As a User, Verify that I can expand - collapse File Panel-------------------------

Then('verify that I can expand - collapse File Panel',async function(){
    try {
        await driver.sleep(2000);
        //click on 'Collapse' arrow from 'File Panel'
        await filesElementsObj.findSideArrow(driver);
        //verify whether 'File Section Table' is hidden or not after collapsing it
        await driver.manage().setTimeouts({implicit: 2000});
        const fileSectionTable = await driver.findElement(By.xpath('//sm-file-list//section-body')).isDisplayed();
        if(fileSectionTable === true) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'fileSectionTableHidden.png');
            console.log("As file section table is hidden after expanding section,so test case has been passed");
        } else {
            await assert.fail("As file section table is not hidden even after expanding section,so test case has been aborted");
        }
        //click on 'Expand' arrow from 'File Panel'
        await filesElementsObj.findCollapsedArrow(driver);
        //verify whether 'File Section Table' is visible or not after expanding it
        await driver.manage().setTimeouts({implicit: 2000});
        const fileSectionTableElement = await driver.findElement(By.xpath('//sm-file-list//section-body')).isDisplayed();
        if(fileSectionTableElement === false) {
            await screenshotObj.takeScreenshot(driver,screenshotPath+'fileSectionTableVisibility.png');
            console.log("As file section table is visible after collapsing section,so test case has been passed");
        } else {
            await assert.fail("As file section table is not visible even after collapsing section,so test case has been aborted");
        }
        const closeIcon = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIcon.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'fileUploadProcess_NotTerminated.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});
const {By} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/07_company/07_companyDetails/07_addFile/screenshots/';

async function findGoogleDriveInstallButton(driver) {
    let googleDriveInstallButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        googleDriveInstallButton = await driver.findElement(By.xpath("//h4[text()='Google Drive ']/following-sibling::a[text()='Install ']"));
        await driver.executeScript("arguments[0].scrollIntoView();",googleDriveInstallButton);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'googleDriveApp_NotFound.png');
        await assert.fail("As google drive app is not found,so test case has been aborted");
    }
    return googleDriveInstallButton;
}exports.findGoogleDriveInstallButton = findGoogleDriveInstallButton;

async function findDeleteIcon(driver,fileIndex) {
    let deleteIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        deleteIcon = await driver.findElement(By.xpath(`//timeline-file[${fileIndex}]//button/i[@class='icon-trash']`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteIcon_NotFound.png');
        await assert.fail("As delete icon is not found,so test case has been aborted");
    }
    return deleteIcon;
}exports.findDeleteIcon = findDeleteIcon;

async function findDownloadIcon(driver,downloadIconIndex) {
    let downloadIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        downloadIcon = await driver.findElement(By.xpath(`//timeline-file[${downloadIconIndex}]//sm-file-attachment//a/i`));
        await driver.executeScript("arguments[0].scrollIntoView();",downloadIcon);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'downloadIcon_NotFound.png');
        await assert.fail("As download icon is not found,so test case has been aborted");
    }
    return downloadIcon;
}exports.findDownloadIcon = findDownloadIcon;
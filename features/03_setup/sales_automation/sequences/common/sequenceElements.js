const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/03_setup/customizations/contactLayout/screenshots/';
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

async function findExecuteOnWeekdaysToggle(driver) {
    let executeOnWeekdaysToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        executeOnWeekdaysToggle = await driver.findElement(By.id('is_execute_on_weekdays_only'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'executeOnWeekdaysToggle_NotFound.png');
        await assert.fail("As execute on weekdays toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return executeOnWeekdaysToggle;
}exports.findExecuteOnWeekdaysToggle = findExecuteOnWeekdaysToggle;

async function findEnableThreadingToggle(driver) {
    let enableThreadingToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        enableThreadingToggle = await driver.findElement(By.id('is_threading_enabled'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'enableThreadingToggle_NotFound.png');
        await assert.fail("As enable threading toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return enableThreadingToggle;
}exports.findEnableThreadingToggle = findEnableThreadingToggle;

async function findContactTimeZoneToggle(driver) {
    let contactTimeZoneToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        contactTimeZoneToggle = await driver.findElement(By.id('use_customer_timezone'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactTimeZoneToggle_NotFound.png');
        await assert.fail("As 06_contact timezone toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return contactTimeZoneToggle;
}exports.findContactTimeZoneToggle = findContactTimeZoneToggle;

async function findUnSubscribeToggle(driver) {
    let unSubscribeToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        unSubscribeToggle = await driver.findElement(By.id('add_unsubscribe_link'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'unSubscribeToggle_NotFound.png');
        await assert.fail("As unsubscribe toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return unSubscribeToggle;
}exports.findUnSubscribeToggle = findUnSubscribeToggle;

async function findContactCompletesSequenceToggle(driver) {
    let contactCompletesSequenceToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        contactCompletesSequenceToggle = await driver.findElement(By.id('add_unsubscribe_link'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contactCompletesSequenceToggle_NotFound.png');
        await assert.fail("As 06_contact completes sequence toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return contactCompletesSequenceToggle;
}exports.findContactCompletesSequenceToggle = findContactCompletesSequenceToggle;

async function findOfficeEmailToggle(driver) {
    let officeEmailToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        officeEmailToggle = await driver.findElement(By.id('pause_on_out_of_office'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'officeEmailToggle_NotFound.png');
        await assert.fail("As office email toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return officeEmailToggle;
}exports.findOfficeEmailToggle = findOfficeEmailToggle;

async function findEmailReplyToggle(driver) {
    let emailReplyToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        emailReplyToggle = await driver.findElement(By.id('exit_on_sequence_mail_reply'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'emailReplyToggle_NotFound.png');
        await assert.fail("As email reply toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return emailReplyToggle;
}exports.findEmailReplyToggle = findEmailReplyToggle;

async function findEmailCommunicationToggle(driver) {
    let emailCommunicationToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        emailCommunicationToggle = await driver.findElement(By.id('exit_on_any_reply'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'officeEmailToggle_NotFound.png');
        await assert.fail("As email communication toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return emailCommunicationToggle;
}exports.findEmailCommunicationToggle = findEmailCommunicationToggle;

async function findStopsOnTextToggle(driver) {
    let stopsOnTextToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        stopsOnTextToggle = await driver.findElement(By.id('exit_on_text_receive'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'stopsOnTextToggle_NotFound.png');
        await assert.fail("As stops on text toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return stopsOnTextToggle;
}exports.findStopsOnTextToggle = findStopsOnTextToggle;

async function findStopsOnDealCloseToggle(driver) {
    let stopsOnDealCloseToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        stopsOnDealCloseToggle = await driver.findElement(By.id('exit_on_deal_close'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'stopsOnDealCloseToggle_NotFound.png');
        await assert.fail("As stops on deal close toggle button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return stopsOnDealCloseToggle;
}exports.findStopsOnDealCloseToggle = findStopsOnDealCloseToggle;

async function findAssignTags(driver,fieldValue) {
    let assignTags;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        assignTags = await driver.findElement(By.xpath(`//div[5]/div[${fieldValue}]/div[@class='row']//sm-tag/sm-element//ro-tag/div/input`));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'assignTags_NotFound.png');
        await assert.fail("As assign tags section is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return assignTags;
}exports.findAssignTags = findAssignTags;

async function findUpdateButton(driver) {
    let updateButton;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        updateButton = await driver.findElement(By.id('updateButton')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'updateButton_NotFound.png');
        await assert.fail("As update button is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return updateButton;
}exports.findUpdateButton = findUpdateButton;

async function findAutoResume(driver) {
    let autoResumeToggle;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        autoResumeToggle = await driver.findElement(By.id('auto_resume_on_out_of_office'));
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'autoResumeToggle_NotFound.png');
        await assert.fail("As auto resume toggle is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return autoResumeToggle;
}exports.findAutoResume = findAutoResume;

async function findThreadingLink(driver) {
    let threadingLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        threadingLink = await driver.findElement(By.xpath('//a[@href="https://support.salesmate.io/hc/en-us/articles/360033396112-Email-Threading-with-Sequence"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'threadingLink_NotFound.png');
        await assert.fail("As threading link is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return threadingLink;
}exports.findThreadingLink = findThreadingLink;

async function findAccessLink(driver) {
    let accessLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        accessLink = await driver.findElement(By.xpath('//a[@href="https://support.salesmate.io/hc/en-us/articles/360033759311-Sequence-Access-Visibility-and-Sharing-Policy"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'accessLink_NotFound.png');
        await assert.fail("As access link is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return accessLink;
}exports.findAccessLink = findAccessLink;

async function findThrottlingLink(driver) {
    let throttlingLink;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        throttlingLink = await driver.findElement(By.xpath('//a[@href="https://support.salesmate.io/hc/en-us/articles/360034223512-Sequence-Throttle"]')).click();
        await driver.sleep(1000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'throttlingLink_NotFound.png');
        await assert.fail("As throttling link is not found,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return throttlingLink;
}exports.findThrottlingLink = findThrottlingLink;

async function findStatusCloseIcon(driver) {
    let statusCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        statusCloseIcon = await driver.findElement(By.xpath("//div[4]/div[@class='wrapper-lg']/div[@class='row']/div[2]//li[@title='No answer']/span[@role='presentation']"));
        await driver.executeScript("arguments[0].scrollIntoView();",statusCloseIcon);
        await driver.wait(until.elementIsVisible(statusCloseIcon));
        await statusCloseIcon.click();
        await driver.findElement(By.xpath('//ul[@class="select2-selection__rendered"]//input[@role="textbox"]')).click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'statusCloseIcon_NotFound.png');
        await assert.fail("As status close icon is not found for status drop down ,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return statusCloseIcon;
}exports.findStatusCloseIcon = findStatusCloseIcon;

async function findTagsCloseIcon(driver,tagNumber) {
    let tagsCloseIcon;
    await driver.manage().setTimeouts({implicit:5000});
    try {
        tagsCloseIcon = await driver.findElement(By.xpath(`//div[5]/div[${tagNumber}]/div/div[@class="col-md-10"]//i[@class="icon-close"]`));
        await driver.executeScript("arguments[0].scrollIntoView();",tagsCloseIcon);
        await driver.wait(until.elementIsVisible(tagsCloseIcon));
        await tagsCloseIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'tagsCloseIcon_NotFound.png');
        await assert.fail("As tags close icon is not found for "+tagNumber+" ,so test case has been aborted");
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return tagsCloseIcon;
}exports.findTagsCloseIcon = findTagsCloseIcon;


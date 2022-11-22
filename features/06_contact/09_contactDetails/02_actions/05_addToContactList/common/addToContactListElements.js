const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const screenshotPath = './features/06_contact/09_contactDetails/02_actions/05_addToContactList/screenshots/';

async function findListDropdown(driver) {
    let listDropdown;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        listDropdown = await driver.findElement(By.xpath('//ngb-modal-window[@role="dialog"]/div//add-contact-to-list//sm-element//span[@role="combobox"]'));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listDropdown_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(listDropdown));
    return listDropdown;
}exports.findListDropdown = findListDropdown;

async function findList(driver,listIndex) {
    let list;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        list = await driver.findElement(By.xpath(`//span[@class="select2-dropdown select2-dropdown--below"]//ul[@role="tree"]/li[${listIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'list_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(list));
    return list;
}exports.findList = findList;

async function findListPageListElement(driver,listIndex) {
    let listPageListElement;
    await driver.manage().setTimeouts({implicit:10000});
    try {
        listPageListElement = await driver.findElement(By.xpath(`(//div[@class="text-primary cursor-pointer"])[${listIndex}]`));
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'listPageListElement_NotFound.png');
        await assert.fail(err);
    }
    await driver.wait(until.elementIsVisible(listPageListElement));
    return listPageListElement;
}exports.findListPageListElement = findListPageListElement;
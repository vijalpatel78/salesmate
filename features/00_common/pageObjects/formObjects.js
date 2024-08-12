const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../actions/browserActions/takeScreenshot');
const screenshotPath = './features/00_common/screenshots';
const elementSearchTimeout = require('../../../config/test_config').elementSearchTimeout;

/* Note: This file will contain web form elements like textbox, dropdown, button, checkbox, etc. */

//all these following functions will find an element on the browser and return that element

async function findTextbox(driver, screenshotPath, id) {
  let textbox;
  try {
    textbox = await driver.findElement(By.id(id));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + id + '_Textbox.png');
    await assert.fail('Due to the ' + id + ' textbox is not found, the test case has been failed. Screenshot: \'' + screenshotPath + id + '_Textbox_NotFound.png\'.');
  }
  await driver.wait(until.elementIsVisible(textbox));
  return textbox;
} exports.findTextbox = findTextbox;

async function findCheckbox(driver, screenshotPath, id) {
  let checkbox;
  try {
    checkbox = await driver.findElement(By.id(id));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + id + '_Checkbox_NotFound.png');
    await assert.fail('Due to the ' + id + ' checkbox is not found, the test case has been failed. Screenshot: \'' + screenshotPath + id + '_Checkbox_NotFound.png\'.');
  }
  return checkbox;
} exports.findCheckbox = findCheckbox;

async function findButton(driver, screenshotPath, id) {
  let button;
  try {
    button = await driver.findElement(By.id(id));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + id + '_Button_NotFound.png');
    await assert.fail('Due to the ' + id + ' button is not found, the test case has been failed. Screenshot: \'' + screenshotPath + id + '_Button_NotFound.png\'.');
  }
  await driver.wait(until.elementIsEnabled(button));
  return button;
} exports.findButton = findButton;

async function findDropdown(driver, screenshotPath, dropdownNameAttribute) {
  let dropdown;
  try {
    dropdown = await driver.findElement(By.xpath('//select[@name=\"' + dropdownNameAttribute + '\"]/following-sibling::span[@dir="ltr"]/descendant::span[@class="select2-selection__rendered"]'));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + dropdownNameAttribute + '_Dropdown_NotFound.png');
    await assert.fail('Due to the \'' + dropdownNameAttribute + '\' dropdown is not found, the test case has been failed. Screenshot: \'' + screenshotPath + dropdownNameAttribute + '_Dropdown_NotFound.png\'.');
  }
  await driver.wait(until.elementIsVisible(dropdown));
  return dropdown;
} exports.findDropdown = findDropdown;

async function findDropdownListElement(driver) {
  await driver.manage().setTimeouts({ implicit: 5000 });
  const dropdownListElement = await driver.findElements(By.xpath('//ul[@class="select2-results__options"]/child::li'));
  await driver.manage().setTimeouts({ implicit: elementSearchTimeout });
  return dropdownListElement;
} exports.findDropdownListElement = findDropdownListElement;

async function findNewDropdownValueElement(driver, screenshotPath, newDropdownValue) {
  let newDropdownValueElement;
  try {
    newDropdownValueElement = await driver.findElement(By.xpath('//ul[@class="select2-results__options"]/child::li[text()="' + newDropdownValue + '"]'));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + newDropdownValue + '_DropdownValueElement_NotFound.png');
    await assert.fail('Due to the \'' + newDropdownValue + '\' dropdown value element is not found, the test case has been failed. Screenshot: \'' + screenshotPath + newDropdownValue + '_DropdownValueElement_NotFound.png\'.');
  }
  return newDropdownValueElement;
} exports.findNewDropdownValueElement = findNewDropdownValueElement;

async function findDropdownSearchBox(driver, screenshotPath, dropdownNameAttribute) {
  let dropdownSearchBox;
  try {
    dropdownSearchBox = await driver.findElement(By.css('input[type="search"]'));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + dropdownNameAttribute + '_DropdownSearchBox_NotFound.png');
    await assert.fail('Due to the \'' + dropdownNameAttribute + '\' dropdown search box is not found, the test case has been failed. Screenshot: \'' + screenshotPath + dropdownNameAttribute + '_DropdownSearchBox_NotFound.png\'.');
  }
  return dropdownSearchBox;
} exports.findDropdownSearchBox = findDropdownSearchBox;

async function findDropdownSearchBoxInRareCase(driver) {
  await driver.manage().setTimeouts({ implicit: 5000 });
  const dropdownSearchBoxInRareCase = await driver.findElements(By.xpath('//input[@type="search"]/parent::span[@class="select2-search select2-search--dropdown"]'));
  await driver.manage().setTimeouts({ implicit: elementSearchTimeout });
  return dropdownSearchBoxInRareCase;
} exports.findDropdownSearchBoxInRareCase = findDropdownSearchBoxInRareCase;

//////////////////////////////////////////////////////////

async function findElementById(driver, screenshotPath, id, fieldName) {
  let elementById;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementById = await driver.findElement(By.id(id));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + fieldName + '_NotFound.png');
    await assert.fail("As " + fieldName + " of " + id + " element is not found,so test case has been aborted");
  }
  return elementById;
} exports.findElementById = findElementById;

async function findElementByName(driver, screenshotPath, name, elementName) {
  let elementByName;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByName = await driver.findElement(By.name(name));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + elementName + '_NotFound.png');
    await assert.fail("As " + elementName + " of " + name + " is not found,so test case has been aborted");
  }
  return elementByName;
} exports.findElementByName = findElementByName;

async function findElementByClassName(driver, screenshotPath, className, elementName) {
  let elementByClassName;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByClassName = await driver.findElement(By.className(className));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + className + '_NotFound.png');
    await assert.fail("As " + elementName + " is not found,so test case has been aborted");
  }
  return elementByClassName;
} exports.findElementByClassName = findElementByClassName;

async function findElementByCss(driver, screenshotPath, css, elementName) {
  let elementByCss;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByCss = await driver.findElement(By.css(`${css}`));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + elementName + '_NotFound.png');
    await assert.fail("As " + elementName + " is not found,so test case has been aborted");
  }
  return elementByCss;
} exports.findElementByCss = findElementByCss;

async function findElementByLinkText(driver, screenshotPath, linkText, elementName) {
  let elementByLinkText;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByLinkText = await driver.findElement(By.linkText(linkText));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + elementName + '_NotFound.png');
    await assert.fail("As " + elementName + " of " + linkText + " is not found,so test case has been aborted");
  }
  return elementByLinkText;
} exports.findElementByLinkText = findElementByLinkText;

async function findElementByTagName(driver, screenshotPath, tagName, elementName) {
  let elementByTagName;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByTagName = await driver.findElement(By.tagName(tagName));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + elementName + '_NotFound.png');
    await assert.fail("As " + elementName + " of " + tagName + " is not found,so test case has been aborted");
  }
  return elementByTagName;
} exports.findElementByTagName = findElementByTagName;

async function findElementByXpath(driver, screenshotPath, sectionName, attributeName, attributeValue, elementName) {
  let elementByXpath;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByXpath = await driver.findElement(By.xpath(`//${sectionName}[@${attributeName}="${attributeValue}"]`));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + elementName + '_NotFound.png');
    await assert.fail(err);
  }
  return elementByXpath;
} exports.findElementByXpath = findElementByXpath;

async function findElementByXpathIndexing(driver, sectionName, attributeName, attributeValue, indexNumber, elementName) {
  let elementByXpath;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByXpath = await driver.findElement(By.xpath(`(//${sectionName}[@${attributeName}="${attributeValue}"])[${indexNumber}]`));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + elementName + '_NotFound.png');
    await assert.fail(err);
  }
  return elementByXpath;
} exports.findElementByXpathIndexing = findElementByXpathIndexing;

async function findElementByVisibleText(driver, screenshotPath, sectionName, buttonName) {
  let elementByVisibleText;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    elementByVisibleText = await driver.findElement(By.xpath(`//${sectionName}[text()="${buttonName}"]`));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + buttonName + '_Button_NotFound.png');
    await assert.fail('Due to the ' + buttonName + ' button is not found, the test case has been failed. Screenshot: \'' + screenshotPath + buttonName + '_Button_NotFound.png\'.');
  }
  return elementByVisibleText;
} exports.findElementByVisibleText = findElementByVisibleText;

async function findRememberMeCheckbox(driver, id) {
  let rememberMeCheckbox;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    rememberMeCheckbox = await driver.findElement(By.id(id));
  } catch (err) {
    await assert.fail(err);
  }
  return rememberMeCheckbox;
} exports.findRememberMeCheckbox = findRememberMeCheckbox;

//*Upload File Elements

async function findUploadFileElement(driver) {
  let uploadPhotoElement;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    uploadPhotoElement = await driver.findElement(By.xpath('//input[@type="file"]'));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + 'uploadPhotoElement_NotFound.png');
    await assert.fail(err);
  }
  return uploadPhotoElement;
} exports.findUploadFileElement = findUploadFileElement;

async function findUploadFileDiv(driver) {
  let uploadFileDiv;
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    uploadFileDiv = await driver.findElement(By.xpath('//input[@type="file"][2]'));
  } catch (err) {
    await screenshotObj.takeScreenshot(driver, screenshotPath + 'uploadFileDiv_NotFound.png');
    await assert.fail(err);
  }
  return uploadFileDiv;
} exports.findUploadFileDiv = findUploadFileDiv;
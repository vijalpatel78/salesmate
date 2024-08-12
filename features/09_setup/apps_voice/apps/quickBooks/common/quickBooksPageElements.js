const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of QuickBooks page on the browser 
 *  and then return those elements 
*/

async function findAuthorizeButton(driver,screenshotPath){
    let authorizeButton;
    try{
        authorizeButton = await driver.findElement(By.xpath('//a[@class="pull-right m-r-sm btn btn-primary"]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AuthorizeButton_NotFound.png');
        await assert.fail('Due to the authorize button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AuthorizeButton_NotFound.png\'');
    }
    await driver.wait(until.elementIsVisible(authorizeButton));
    return authorizeButton;
}exports.findAuthorizeButton=findAuthorizeButton;

async function findOption(driver,screenshotPath,forAttribute){
    let optionElem;
    try{
        optionElem = await driver.findElement(By.css('label[for="'+forAttribute+'"]'));  
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+forAttribute+'_AppOption_NotFound.png');
        await assert.fail('Due to the '+forAttribute+' app option is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+forAttribute+'_AppOption_NotFound.png\'');
    }
    return optionElem;
}exports.findOption=findOption;

async function findAutocompleteInputbox(driver,screenshotPath){
    let autocompleteInputbox;
    try{
        autocompleteInputbox = await driver.findElement(By.xpath('//div[@class="ro-tag-autocomplete"]/child::input[@type="text"]'));
    }catch{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'User_AutocompleteInputbox_NotFound.png');
        await assert.fail('Due to the user autocomplete input box is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'User_AutocompleteInputbox_NotFound.png\'.');
    }
    return autocompleteInputbox;
}exports.findAutocompleteInputbox=findAutocompleteInputbox;

async function findAutocompleteSearchResult(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const autocompleteSearchResult = await driver.findElements(By.xpath('//ul[@class="ro-tag-autocomplete-items"]/descendant::div[@class="search-user-name text-ellipsis"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return autocompleteSearchResult;
}exports.findAutocompleteSearchResult=findAutocompleteSearchResult;

async function findAutocompleteTags(driver){
    await driver.manage().setTimeouts({implicit:3000});
    const autocompleteTags = await driver.findElements(By.xpath('//ro-tag/descendant::b'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return autocompleteTags;
}exports.findAutocompleteTags=findAutocompleteTags;
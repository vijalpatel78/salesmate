const {By,until} = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const elementSearchTimeout = require('../../../../../cucumber_config/cucumber_config').elementSearchTimeout;

/*  All these following functions will find elements of teams page on the browser 
 *  and then return those elements 
*/

async function findAddTeamBtn(driver){
    let learnMoreLink = [], addTeamBtn = [];

    await driver.manage().setTimeouts({implicit:3000});
    learnMoreLink = await driver.findElements(By.css('a[href="https://support.salesmate.io/hc/en-us/articles/360044437911"]'));
    if(learnMoreLink.length > 0){
        const addFirstTeamBtn = await driver.findElements(By.xpath('//button[text()="Create Your First Team"]'));
        addTeamBtn = addFirstTeamBtn;
    }else{
        const addMoreTeamBtn = await driver.findElements(By.xpath('//button[@type="button"]'));
        addTeamBtn = addMoreTeamBtn;
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    
    return addTeamBtn;
}exports.findAddTeamBtn=findAddTeamBtn;

async function findCreateTeamPopup(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const createTeamPopup = await driver.findElements(By.xpath('//h4[text()="Create Team"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return createTeamPopup;
}exports.findCreateTeamPopup=findCreateTeamPopup;

async function findTextbox(driver,screenshotPath,idAttribute){
    let textbox;

    try{
        textbox = await driver.findElement(By.id(idAttribute));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+idAttribute.toUpperCase()+'_Textbox_NotFound.png');
        await assert.fail('Due to the '+idAttribute.toUpperCase()+' textbox is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+idAttribute.toUpperCase()+'_Textbox_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsVisible(textbox));
    return textbox;
}exports.findTextbox=findTextbox;

async function findSaveBtn(driver,screenshotPath){
    let saveBtn;

    try{
        saveBtn = await driver.findElement(By.id('btnSave'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SaveBtn_NotFound.png');
        await assert.fail('Due to the save button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'SaveBtn_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsEnabled(saveBtn));
    return saveBtn;
}exports.findSaveBtn=findSaveBtn;

async function findAutocompleteInputbox(driver,screenshotPath,fieldName){
    let autocompleteInputbox;

    try{
        autocompleteInputbox = await driver.findElement(By.xpath('//label[text()="'+fieldName+'"]/following::input[@type="text"]'));
    }catch{
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_AutocompleteInputbox_NotFound.png');
        await assert.fail('Due to the '+fieldName+' autocomplete input box is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+fieldName+'_AutocompleteInputbox_NotFound.png\'.');
    }

    await driver.wait(until.elementIsEnabled(autocompleteInputbox));
    return autocompleteInputbox;
}exports.findAutocompleteInputbox=findAutocompleteInputbox;

async function findAutocompleteSearchResult(driver,fieldName){
    await driver.manage().setTimeouts({implicit:5000});
    const autocompleteSearchResult = await driver.findElements(By.xpath('//label[text()="'+fieldName+'"]/following::li/descendant::div[@class="search-user-name text-ellipsis"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return autocompleteSearchResult;
}exports.findAutocompleteSearchResult=findAutocompleteSearchResult;

async function findAutocompleteNoSearchResultFound(driver,fieldName){
    await driver.manage().setTimeouts({implicit:3000});
    const autocompleteNoSearchResultFound = await driver.findElements(By.xpath('//label[text()="'+fieldName+'"]/following::li[text()="No results found"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return autocompleteNoSearchResultFound;
}exports.findAutocompleteNoSearchResultFound=findAutocompleteNoSearchResultFound;

async function findAutocompleteTags(driver,fieldName){
    await driver.manage().setTimeouts({implicit:3000});
    const autocompleteTags = await driver.findElements(By.xpath('//label[text()="'+fieldName+'"]/following::b'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return autocompleteTags;
}exports.findAutocompleteTags=findAutocompleteTags;

async function findAutocompleteTagRemoveBtn(driver,fieldName){
    await driver.manage().setTimeouts({implicit:2000});
    const autocompleteTagRemoveBtn = await driver.findElements(By.xpath('//label[text()="'+fieldName+'"]/following::i'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return autocompleteTagRemoveBtn;
}exports.findAutocompleteTagRemoveBtn=findAutocompleteTagRemoveBtn;

async function findEditTeamBtn(driver,teamName,isRare = 'no'){
    let editTeamBtn;
    const timeout = isRare == 'no' ? 5000 : 2000 ;
    await driver.manage().setTimeouts({implicit:timeout});
    if(isRare == 'no'){
        editTeamBtn = await driver.findElements(By.xpath('//div[@ref="eBodyViewport"]/descendant::a[text()=" '+teamName+'"]/following::a[text()="Edit"][1]'));
    }else{
        editTeamBtn = await driver.findElements(By.xpath('//a[text()="Edit"]'));
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return editTeamBtn;
}exports.findEditTeamBtn=findEditTeamBtn;

async function findDeactivateTeamBtn(driver,teamName,isRare = 'no'){
    let deactivateTeamBtn;
    const timeout = isRare == 'no' ? 5000 : 2000 ;
    await driver.manage().setTimeouts({implicit:timeout});
    if(isRare == 'no'){
        deactivateTeamBtn = await driver.findElements(By.xpath('//div[@ref="eBodyViewport"]/descendant::a[text()=" '+teamName+'"]/following::a[text()="Deactivate"][1]'));
    }else{
        deactivateTeamBtn = await driver.findElements(By.xpath('//a[text()="Deactivate"]'));
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deactivateTeamBtn;
}exports.findDeactivateTeamBtn=findDeactivateTeamBtn;

async function findReactivateTeamBtn(driver,teamName,isRare = 'no'){
    let reactivateTeamBtn;
    const timeout = isRare == 'no' ? 5000 : 2000 ;
    await driver.manage().setTimeouts({implicit:timeout});
    if(isRare == 'no'){
        reactivateTeamBtn = await driver.findElements(By.xpath('//div[@ref="eBodyViewport"]/descendant::a[text()=" '+teamName+'"]/following::a[text()="Reactivate"][1]'));
    }else{
        reactivateTeamBtn = await driver.findElements(By.xpath('//a[text()="Reactivate"]'));
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return reactivateTeamBtn;
}exports.findReactivateTeamBtn=findReactivateTeamBtn;

async function findDeleteTeamBtn(driver,teamName,isRare = 'no'){
    let deleteTeamBtn;
    const timeout = isRare == 'no' ? 5000 : 2000 ;
    await driver.manage().setTimeouts({implicit:timeout});
    if(isRare == 'no'){
        deleteTeamBtn = await driver.findElements(By.xpath('//div[@ref="eBodyViewport"]/descendant::a[text()=" '+teamName+'"]/following::a[text()="Delete"][1]'));
    }else{
        deleteTeamBtn = await driver.findElements(By.xpath('//a[text()="Delete"]')); 
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return deleteTeamBtn;
}exports.findDeleteTeamBtn=findDeleteTeamBtn;

async function findNamefromListPage(driver,teamName){
    await driver.manage().setTimeouts({implicit:5000});
    const name = await driver.findElements(By.xpath('//div[@col-id="name"]/following::a[text()=" '+teamName+'"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return name;
}exports.findNamefromListPage=findNamefromListPage;

async function findNamefromListPageRare(driver,teamName){
    await driver.manage().setTimeouts({implicit:2000});
    const name = await driver.findElements(By.xpath('//div[@col-id="name"]/following::a[text()=" '+teamName+'"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return name;
}exports.findNamefromListPageRare=findNamefromListPageRare;

async function findManagerNamefromListPage(driver,teamName){
    await driver.manage().setTimeouts({implicit:3000});
    const managerName = await driver.findElements(By.xpath('//a[contains(text(),"'+teamName+'")]/ancestor::div[@col-id="name"]/following-sibling::div[@col-id="manager"]/descendant::span[2]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return managerName;
}exports.findManagerNamefromListPage=findManagerNamefromListPage;

async function findUsersfromListPage(driver,teamName){
    await driver.manage().setTimeouts({implicit:3000});
    const usersCount = await driver.findElements(By.xpath('//a[contains(text(),"'+teamName+'")]/ancestor::div[@col-id="name"]/following-sibling::div[@col-id="users"]//descendant::span[2]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return usersCount;
}exports.findUsersfromListPage=findUsersfromListPage;

async function findGrid(driver){
    await driver.manage().setTimeouts({implicit:120000});
    const gridElem = await driver.findElements(By.xpath('//div[@role="grid"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return gridElem;
}exports.findGrid=findGrid;

async function findNamefromViewPopup(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const name = await driver.findElement(By.xpath('//h4[@class="modal-title pull-left team-name-test"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return name;
}exports.findNamefromViewPopup=findNamefromViewPopup;

async function findDescriptionfromViewPopup(driver){
    await driver.manage().setTimeouts({implicit:2000});
    const description = await driver.findElement(By.xpath('//label[text()="Description"]/following::div[1]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return description;
}exports.findDescriptionfromViewPopup=findDescriptionfromViewPopup;

async function findTeamManagerfromViewPopup(driver){
    await driver.manage().setTimeouts({implicit:2000});
    const teamManager = await driver.findElement(By.xpath('//label[text()="Team Manager"]/following::span[2]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return teamManager;
}exports.findTeamManagerfromViewPopup=findTeamManagerfromViewPopup;

async function findTeammatesfromViewPopup(driver){
    await driver.manage().setTimeouts({implicit:2000});
    const teammates = await driver.findElement(By.xpath('//label[text()="Teammates"]/following::span[@class="m-l-xs m-t-xxs"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return teammates;
}exports.findTeammatesfromViewPopup=findTeammatesfromViewPopup

async function findPopupCloseBtn(driver,screenshotPath){
    let popupCloseBtn;

    try{
        popupCloseBtn = await driver.findElement(By.xpath('//ngb-modal-window//button[@type="button"]'));
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'PopupCloseBtn_NotFound.png');
        await assert.fail('Due to the close button of popup is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'PopupCloseBtn_NotFound.png\'.');
    }
    
    await driver.wait(until.elementIsEnabled(popupCloseBtn));
    return popupCloseBtn;
}exports.findPopupCloseBtn=findPopupCloseBtn;

async function findInactiveTabBtn(driver,screenshotPath){
    let inactiveTabBtn;

    await driver.manage().setTimeouts({implicit:5000});
    try{
        inactiveTabBtn = await driver.findElement(By.css('a[href="#/app/setup/security/teams/inactive"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'InactiveTabBtn_NotFound.png');
        await assert.fail('Due to the inactive tab button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'InactiveTabBtn_NotFound.png\'.');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    
    await driver.wait(until.elementIsVisible(inactiveTabBtn));
    return inactiveTabBtn;
}exports.findInactiveTabBtn=findInactiveTabBtn;

async function findActiveTabBtn(driver,screenshotPath){
    let activeTabBtn;

    await driver.manage().setTimeouts({implicit:5000});
    try{
        activeTabBtn = await driver.findElement(By.css('a[href="#/app/setup/security/teams/active"]'));
    }catch(err){
        await driver.manage().setTimeouts({implicit:elementSearchTimeout});
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ActiveTabBtn_NotFound.png');
        await assert.fail('Due to the active tab button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'ActiveTabBtn_NotFound.png\'.');
    }
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    
    await driver.wait(until.elementIsVisible(activeTabBtn));
    return activeTabBtn;
}exports.findActiveTabBtn=findActiveTabBtn;

async function findNoTeamFoundText(driver){
    await driver.manage().setTimeouts({implicit:5000});
    const noTeamFoundText = await driver.findElements(By.xpath('//div[@class="no-team-found text-center"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return noTeamFoundText;
}exports.findNoTeamFoundText=findNoTeamFoundText;

async function findLearnMoreLink(driver){
    await driver.manage().setTimeouts({implicit:3000});
    const learnMoreLink = await driver.findElements(By.css('a[href="https://support.salesmate.io/hc/en-us/articles/360044437911"]'));
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
    return learnMoreLink;
}exports.findLearnMoreLink=findLearnMoreLink;
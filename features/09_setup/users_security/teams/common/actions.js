const assert = require('assert');
const {until} = require('selenium-webdriver');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const teamsPageElementObj = require('./teamsPageElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');

//will navigate on the dashboard page and then come back to the teams page
async function comeBackToTeamsPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const teamsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Teams ');
    await driver.executeScript("arguments[0].scrollIntoView();",teamsTab[0]);
    await driver.wait(until.elementIsVisible(teamsTab[0]));
    await teamsTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/security/teams/active'),10000);
}exports.comeBackToTeamsPage=comeBackToTeamsPage;

async function checkLoggedInUserAdmin(driver,screenshotPath){
    /* If 'User Profile> Current Plan' menu is visible then the logged-in user will be considered as Admin */

    //will find 'user profile thumb view' and then click on that
    const userProfileThumbview = await commonElementObj.findUserProfileThumbview(driver,screenshotPath);
    await userProfileThumbview.click(); 
    await driver.sleep(1000);  
    //will find 'Subscription' text
    const subscriptionText = await commonElementObj.findSubscriptionText(driver);

    //will check the 'Subscription' text is visible or not
    if(subscriptionText.length > 0){
        await userProfileThumbview.click(); 
        console.log('The logged-in user is Admin...');
    }else{
        /* As the logged-in user is not Admin, it will do Admin login on the same browser */
        console.log('As the logged-in user is not Admin, will perform login as Admin user...');

        let adminUserNumber = '';

        //will get the Admin user details from the xlsx file 
        const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.profile[i].toLowerCase() == 'admin'){
                adminUserNumber = userDetails.user[i];
                break;
            }
        }
        //will check whether the Admin user found or not from the excel file
        if(adminUserNumber == ''){
            await userProfileThumbview.click(); 
            await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
        }

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on teams page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on teams page');
    }
}exports.checkLoggedInUserAdmin=checkLoggedInUserAdmin;

async function selectValueFromAutocompleteDropdown(driver,screenshotPath,fieldName,value){
    //will find autocomplete input box
    const autocompleteInputbox = await teamsPageElementObj.findAutocompleteInputbox(driver,screenshotPath,fieldName);
    //will travel all provided value(s)
    for(let i=0; i<value.length; i++){
        //will enter provided value in the autocomplete input box
        await autocompleteInputbox.sendKeys(value[i].trim());
        await driver.sleep(2000);
        //will check the matching search results found or not
        const autocompleteSearchResult = await teamsPageElementObj.findAutocompleteSearchResult(driver,fieldName);
        if(autocompleteSearchResult.length != 0){
            //will click on the first search result
            await autocompleteSearchResult[0].click();
            await driver.sleep(1000);
        }else{
            await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_'+value[i].replace(/\s/g,'_')+'_NotFound.png');
            await assert.fail('Due to the \"'+value[i]+'\" user from the \"'+fieldName+'\" is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+fieldName+'_'+value[i].replace(/\s/g,'_')+'_NotFound.png\'.');
        }
    }
}exports.selectValueFromAutocompleteDropdown=selectValueFromAutocompleteDropdown;

async function checkSuccessMessage(driver,screenshotPath,message){
    //will find notification message after performing operations 
    const notyMessage = await commonElementObj.findNotyMessage(driver,screenshotPath);
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert.strictEqual(notyMessageText,message);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png'); 
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after performing operations, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
}exports.checkSuccessMessage=checkSuccessMessage; 

async function getTeamsDetailsFromListPage(driver,screenshotPath,teamName){
    let name = '', managerName = '-- Select Team Manager --', noOfUsers = '';
    //will find the provided team name on the list page
    const nameElem = await teamsPageElementObj.findNamefromListPage(driver,teamName);
    //will check the provided team name is found or not
    if(nameElem.length > 0){
        //will get the displayed team name from the list page
        await driver.wait(until.elementIsVisible(nameElem[0]));
        name = await nameElem[0].getText();
        //will get the displayed manager name from the list page if it is exist
        const managerNameElem = await teamsPageElementObj.findManagerNamefromListPage(driver,teamName);
        if(managerNameElem.length > 0){
            await driver.wait(until.elementIsVisible(managerNameElem[0]));
            managerName = await managerNameElem[0].getText();
        }
        //will get the displayed no of user count from the list page
        const usersElem = await teamsPageElementObj.findUsersfromListPage(driver,teamName);
        await driver.wait(until.elementIsVisible(usersElem[0]));
        noOfUsers = await usersElem[0].getText();
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+teamName.replace(/\s/g,'_')+'_NotFound_ListPage.png'); 
        assert.fail('Due to the provided \"'+teamName+'\" team is not found on the list page, the test case has been failed. Screenshot Name: \''+screenshotPath+teamName.replace(/\s/g,'_')+'_NotFound_ListPage.png\'.');
    }
    return {name:name, managerName:managerName, noOfUsers:noOfUsers};
}exports.getTeamsDetailsFromListPage=getTeamsDetailsFromListPage;

async function getTeamsDetailsFromViewPopup(driver,screenshotPath,teamName){
    let name = '', managerName = '-- Select Team Manager --', description = '', teammates = [];
    //will find the provided team name on the list page
    const nameElem = await teamsPageElementObj.findNamefromListPage(driver,teamName);
    //will check the provided team name is found or not
    if(nameElem.length > 0){
        //will open the view popup of the provided team name
        await nameElem[0].click();
        //will get the displayed team name from the view popup
        const teamNameElem = await teamsPageElementObj.findNamefromViewPopup(driver);
        name = await teamNameElem.getText();
        //will get the displayed description from the view popup if it is exist
        const descriptionElem = await teamsPageElementObj.findDescriptionfromViewPopup(driver);
        description = await descriptionElem.getText();
        //will get the displayed manager name from the view popup if it is exist
        const managerElem = await teamsPageElementObj.findTeamManagerfromViewPopup(driver);
        managerName = await managerElem.getText();
        //will get the displayed teammates name from the view popup
        const teammatesElem = await teamsPageElementObj.findTeammatesfromViewPopup(driver);
        if(teammatesElem.length > 0){
            for(let i=0; i<teammatesElem.length; i++){
                teammates.push(await teammatesElem[i].getText());
            }
        }
        //will close the view popup
        const popupCloseBtn = await teamsPageElementObj.findPopupCloseBtn(driver,screenshotPath);
        await popupCloseBtn.click();
        await driver.sleep(2000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+teamName.replace(/\s/g,'_')+'_NotFound_ListPage.png'); 
        assert.fail('Due to the provided \"'+teamName+'\" team is not found on the list page, the test case has been failed. Screenshot Name: \''+screenshotPath+teamName.replace(/\s/g,'_')+'_NotFound_ListPage.png\'.');
    }
    return {name:name, managerName:managerName, description:description, teammates:teammates};
}exports.getTeamsDetailsFromViewPopup=getTeamsDetailsFromViewPopup;

async function openTeamsPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Teams' tab 
    const teamsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Teams ');
    //will set focus on the 'Teams' tab 
    await driver.executeScript("arguments[0].scrollIntoView();",teamsTab[0]);
    await driver.wait(until.elementIsVisible(teamsTab[0]));
    //will click on the 'Teams' tab 
    await teamsTab[0].click();
    await driver.sleep(2000);

    //will verify whether the 'Teams' page found or not
    try{
        await driver.wait(until.urlContains('app/setup/security/teams/active'),10000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'TeamsPage_NotFound.png');
        await assert.fail('Due to the teams page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'TeamsPage_NotFound.png\'.');
    }

    console.log('The teams page has been opened successfully...');
}exports.openTeamsPage=openTeamsPage;
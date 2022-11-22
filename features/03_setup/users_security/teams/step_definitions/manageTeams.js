const {Given,When,Then} = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const teamsPageElementObj = require('../common/teamsPageElements');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const actionObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const linkEnvironment = require('../../../../../cucumber_config/cucumber_config').linkEnvironment;
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/users_security/teams/screenshots/';

let newNameFieldData = 'no', newDescriptionFieldData = 'no', newTeamManagerDrpdwnData = 'no', newTeammatesAutocompleteDrpdwnData = [],
fieldName, actualTeammates;

Given('the {string} is on teams page and he is Admin user', async (user) =>{
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(currentPageURL.includes('app/setup/security/teams/active') || currentPageURL.includes('app/setup/security/teams/inactive')){
        console.log('The teams page has been opened successfully...');
    }   
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open teams page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on teams page');
        //will check the logged-in user is admin or not
        await actionObj.checkLoggedInUserAdmin(driver,screenshotPath);
        //will open the teams page
        await actionObj.openTeamsPage(driver,screenshotPath);  
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open teams page will be started from by opening the Salesmate login page
        */
        
        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on teams page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on teams page');
        //will check the logged-in user is admin or not
        await actionObj.checkLoggedInUserAdmin(driver,screenshotPath);
        //will open the teams page
        await actionObj.openTeamsPage(driver,screenshotPath);  
    }
    else{
        //as the user is logged in, it will check the logged-in user is admin or not
        await actionObj.checkLoggedInUserAdmin(driver,screenshotPath);
        //will open the teams page
        await actionObj.openTeamsPage(driver,screenshotPath);  
    }
});

When('the user click on the Add Team button', async () =>{
    //will find 'Add' team button
    const addTeamBtn = await teamsPageElementObj.findAddTeamBtn(driver);
    //will check the 'Add' team button is found or not
    if(addTeamBtn.length > 0){
        //will click on the 'Add' team button
        await driver.wait(until.elementIsEnabled(addTeamBtn[0]));
        await addTeamBtn[0].click();
        await driver.sleep(1000);
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'AddTeamBtn_NotFound.png');
        await assert.fail('Due to the add team button is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddTeamBtn_NotFound.png\'.');
    }
});

When('the Create Team popup gets opened', async () =>{
    /* If 'Create Team' popup gets opened then it means that the current plan support 'Teams' feature */

    //will check the 'Create Team' popup is found or not
    const createTeamPopup = await teamsPageElementObj.findCreateTeamPopup(driver);
    if(createTeamPopup.length > 0){
        console.log('The Create Team popup is get opened...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'CreateTeamPopup_NotFound.png');
        await actionObj.comeBackToTeamsPage(driver,screenshotPath);
        await assert.fail('Due to the create team popup is not found, the test case has been failed. This might have happened because the current plan doesn\'t support teams feature. Screenshot Name: \''+screenshotPath+'CreateTeamPopup_NotFound.png\'.');
    }
});

When('the user fills the following details:', async (dataTable) =>{
    try{
        //will travel provided fields and data list
        for(let i=0; i<dataTable.rawTable.length; i++){
            //will check the provided field is part of the test case or not
            const fieldName = dataTable.rawTable[i][0].toLowerCase();
            if(fieldName == 'name'){
                newNameFieldData = dataTable.rawTable[i][1];
                //will check the data for the required name field is given or not
                if(newNameFieldData == ''){
                    await assert.fail('Due to the blank value is provided for the required Name field, the test case execution has been aborted.');
                }
                //will find the 'Name' field and pass the new data
                const nameField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'name');
                await clearFieldDataObj.clearFieldData(nameField);
                await nameField.sendKeys(newNameFieldData);
            }else if(fieldName == 'description'){
                newDescriptionFieldData = dataTable.rawTable[i][1];
                //will find the 'Description' field and pass the new data
                const descriptionField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'description');
                await clearFieldDataObj.clearFieldData(descriptionField);
                await descriptionField.sendKeys(newDescriptionFieldData);
            }else if(fieldName == 'team manager'){
                newTeamManagerDrpdwnData = dataTable.rawTable[i][1];

                //will check from where have to pick up the value for the 'Manager' field
                if(newTeamManagerDrpdwnData.toLowerCase() == 'select from the excel file' || newTeamManagerDrpdwnData.toLowerCase() == 'select from the excel file (updated)'){
                    let activeUsers = [], userDetails;
                    //will get the full name of the active users from the xlsx file 
                    if(linkEnvironment.toLocaleLowerCase() === 'dev'){
                        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
                    }else{
                        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx','UserDetails');
                    }
                    for(let i=0; i<userDetails.user.length; i++){
                        if(userDetails.isActive[i].toLowerCase() == 'yes'){
                            activeUsers.push(userDetails.fullName[i]);
                        }
                    }
                    //will check the two active users found or not
                    if(activeUsers.length < 2 ){
                        assert.fail('To execute this test case, it is required to have two active users in the excel file. Found Total Active Users ---> '+activeUsers.length+'.');
                    }

                    if(newTeamManagerDrpdwnData.toLowerCase() == 'select from the excel file'){
                        //will select first active user from the 'Team Manager' dropdown list
                        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'manager',activeUsers[0],'no');            
                        newTeamManagerDrpdwnData = activeUsers[0];
                    }else{
                        //will select second active user from the 'Team Manager' dropdown list
                        await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'manager',activeUsers[1],'no');            
                        newTeamManagerDrpdwnData = activeUsers[1];
                    }   
                }else{
                    //will select the provided new dropdown value from the 'Team Manager' dropdown list
                    await selectDropdownValueObj.selectDropdownValue(driver,screenshotPath,'manager',newTeamManagerDrpdwnData,'no');            
                }
            }else if(fieldName == 'teammates'){
                let newTeammates = dataTable.rawTable[i][1], activeUsers = [];

                //will check the data for the required teammates field is given or not
                if(newTeammates == ''){
                    await assert.fail('Due to the blank value is provided for the required teammates field, the test case execution has been aborted.');
                }else{
                    newTeammatesAutocompleteDrpdwnData = newTeammates.split(',');
                }          
                
                //will clear the 'Teammates' field
                const autocompleteTagRemoveBtn = await teamsPageElementObj.findAutocompleteTagRemoveBtn(driver,'Teammates');
                if(autocompleteTagRemoveBtn.length > 0){
                    for(let i=0; i<autocompleteTagRemoveBtn.length; i++){
                        await autocompleteTagRemoveBtn[i].click();
                    }
                }
                
                //will check from where have to pick up the value for the 'Teammates' field
                if(newTeammatesAutocompleteDrpdwnData[0].toLowerCase() == 'select from the excel file' || newTeammatesAutocompleteDrpdwnData[0].toLowerCase() == 'select from the excel file (updated)'){
                    let userDetails;
                    //will get the full name of the active users from the xlsx file 
                    if(linkEnvironment.toLocaleLowerCase() === 'dev'){
                        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
                    }else{
                        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx','UserDetails');
                    }
                    for(let i=0; i<userDetails.user.length; i++){
                        if(userDetails.isActive[i].toLowerCase() == 'yes'){
                            activeUsers.push(userDetails.fullName[i]);
                        }
                    }
                    //will check the two active users found or not
                    if(activeUsers.length < 2 ){
                        assert.fail('To execute this test case, it is required to have two active users in the excel file. Found Total Active Users ---> '+activeUsers.length+'.');
                    }

                    if(newTeammatesAutocompleteDrpdwnData[0].toLowerCase() == 'select from the excel file'){
                        //will select two active users from the 'Teammates' dropdown list
                        await actionObj.selectValueFromAutocompleteDropdown(driver,screenshotPath,'Teammates',activeUsers.slice(0,2));
                        newTeammatesAutocompleteDrpdwnData = activeUsers.slice(0,2);
                    }else{
                        //will select the first active users from the 'Teammates' dropdown list
                        await actionObj.selectValueFromAutocompleteDropdown(driver,screenshotPath,'Teammates',activeUsers.slice(0,1));
                        newTeammatesAutocompleteDrpdwnData = activeUsers.slice(0,1);
                    }
                }else{
                    //will select the provided user(s) from the 'Teammates' dropdown list
                    await actionObj.selectValueFromAutocompleteDropdown(driver,screenshotPath,'Teammates',newTeammatesAutocompleteDrpdwnData);
                }
            }else{
                await assert.fail('Due to the provided \''+dataTable.rawTable[i][0]+'\' field is not part of the test case, the test case execution has been aborted. Expected test case fields ---> Name, Description, Team Manager and Teammates fields only.');
            }
        }
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('clicks on the Save button', async () =>{
    //will find the 'Save' button and then click on it
    const saveButton = await teamsPageElementObj.findSaveBtn(driver,screenshotPath);
    await saveButton.click();
    try{
        await driver.wait(until.elementIsEnabled(saveButton),20000,'There seems to be some issue while performing operations. Screenshot Name: \''+screenshotPath+'/Error_WhilePerformingOperations.png\'.');
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Error_WhilePerformingOperations.png'); 
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }  
    await driver.sleep(2000);
});

When('leave Name field as blank', async () =>{
    try{
        //will find 'Name' field 
        const nameField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'name');
        //will clear the field data
        await clearFieldDataObj.clearFieldData(nameField);
        await driver.sleep(1000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    } 
});

When('leave Teammates field as blank', async () =>{
    try{
        //will find 'Name' field and pass the data
        const nameField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'name');
        await clearFieldDataObj.clearFieldData(nameField);
        await nameField.sendKeys('Test....');
        //will clear the 'Teammates' field
        const autocompleteTagRemoveBtn = await teamsPageElementObj.findAutocompleteTagRemoveBtn(driver,'Teammates');
        if(autocompleteTagRemoveBtn.length > 0){
            for(let i=0; i<autocompleteTagRemoveBtn.length; i++){
                await autocompleteTagRemoveBtn[i].click();
            }
        }
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    } 
});

When('enter Name: {string}', async (nameData) =>{
    try{
        //will find 'Name' field 
        const nameField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'name');
        await clearFieldDataObj.clearFieldData(nameField);
        //will pass the new data
        if(nameData.toLowerCase() == 'more than 100 chars'){
            await nameField.sendKeys('<body> Cont ~`!@ # $%^&* ()_- = + {} [] \\ | : ; \' \" < >, ./ ? Cont ~`!@ # $%^&* ()_- = + {} [] \\ | : ; \' \" < >, ./ ? 123SD</body>');
        }else{
            await nameField.sendKeys(nameData);
        }
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    } 
});

When('enter Teammates: {string}', async (teammates) =>{
    try{
        //will check from where have to pick up the value for the 'Teammates' field
        if(teammates.toLowerCase() == 'select from the excel file'){
            let activeUsers = [], userDetails;
            //will get the full name of the active user from the xlsx file 
            if(linkEnvironment.toLocaleLowerCase() === 'dev'){
                userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
            }else{
                userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx','UserDetails');
            }
            for(let i=0; i<userDetails.user.length; i++){
                if(userDetails.isActive[i].toLowerCase() == 'yes'){
                    activeUsers.push(userDetails.fullName[i]);
                }
            }
            //will check the any active user found or not
            if(activeUsers.length == 0){
                assert.fail('To execute this test case, it is required to have one active user in the excel file.');
            }
            //will select first active users from the 'Teammates' dropdown list
            await actionObj.selectValueFromAutocompleteDropdown(driver,screenshotPath,'Teammates',activeUsers.slice(0,1));
        }else{
            const newTeammates = teammates.split(',');
            //will select the provided user(s) from the 'Teammates' dropdown list
            await actionObj.selectValueFromAutocompleteDropdown(driver,screenshotPath,'Teammates',newTeammates);
        }
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
});

When('the user enter Description: {string}', async (descriptionData) =>{
    try{
        //will find the 'Description' field and pass the data
        const descriptionField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'description');
        await clearFieldDataObj.clearFieldData(descriptionField);
        await descriptionField.sendKeys('<body> Cont ~`!@ # $%^&* ()_- = + {} [] \\ | : ; \' " <hellotest >, ./ ? Cont ~`!@ # $%^&* ()_- = + {} [] \\ | : ; \' " < >, ./ ? 123SD</body> test HHHHHHHafhsfg dsds sdretjfg rwey 2342364*^jh sdasfd :": af JGHGHJG fsdkfn 5 *&*&*&( sfdsfsdf tetstv xfasa ^%#) test');
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    } 
});

When('open Manager dropdown', async () =>{
    try{
        //will find the 'Manager' dropdown and then click on it
        const managerDropdown = await formElementObj.findDropdown(driver,screenshotPath,'manager');
        await managerDropdown.click();
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }   
});

When('the user click on the Edit button from the {string} team', async (teamName) =>{
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);

    //will find the 'Edit' button of the provided team
    const editTeamBtn = await teamsPageElementObj.findEditTeamBtn(driver,teamName);
    //will check the 'Edit' button is found or not
    if(editTeamBtn.length > 0){
        //will click on that button
        await driver.wait(until.elementIsVisible(editTeamBtn[0]));
        await editTeamBtn[0].click();
        await driver.sleep(1000); 
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+teamName.replace(/\s/g,'_')+'_EditBtn_NotFound.png');
        await assert.fail('Due to the edit button of \''+teamName+'\' team is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+teamName.replace(/\s/g,'_')+'_EditBtn_NotFound.png\'.');
    }   
});

When('the user click on the Deactivate button from the {string} team', async (teamName) =>{
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);
    
    //will find the 'Deactivate' button of the provided team
    const deactivateTeamBtn = await teamsPageElementObj.findDeactivateTeamBtn(driver,teamName);
    //will check the 'Deactivate' button is found or not
    if(deactivateTeamBtn.length > 0){
        //will click on that button
        await driver.wait(until.elementIsVisible(deactivateTeamBtn[0]));
        await deactivateTeamBtn[0].click();
        await driver.sleep(1000); 
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+teamName.replace(/\s/g,'_')+'_DeactivateBtn_NotFound.png');
        await assert.fail('Due to the deactivate button of \''+teamName+'\' team is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+teamName.replace(/\s/g,'_')+'_DeactivateBtn_NotFound.png\'.');
    }
});

When('click on the Reactivate button from the {string} team', async (teamName) =>{
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);

    //will find the 'Reactivate' button of the provided team
    const reactivateTeamBtn = await teamsPageElementObj.findReactivateTeamBtn(driver,teamName);
    //will check the 'Reactivate' button is found or not
    if(reactivateTeamBtn.length > 0){
        //will click on that button
        await driver.wait(until.elementIsVisible(reactivateTeamBtn[0]));
        await reactivateTeamBtn[0].click();
        await driver.sleep(1000); 
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+teamName.replace(/\s/g,'_')+'_ReactivateBtn_NotFound.png');
        await assert.fail('Due to the reactivate button of \''+teamName+'\' team is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+teamName.replace(/\s/g,'_')+'_ReactivateBtn_NotFound.png\'.');
    }
});

When('click on the Delete button from the {string} team', async (teamName) =>{
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);
    
    //will find the 'Delete' button of the provided team
    const deleteTeamBtn = await teamsPageElementObj.findDeleteTeamBtn(driver,teamName);
    //will check the 'Delete' button is found or not
    if(deleteTeamBtn.length > 0){
        //will click on that button
        await driver.wait(until.elementIsVisible(deleteTeamBtn[0]));
        await deleteTeamBtn[0].click();
        await driver.sleep(1000); 
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+teamName.replace(/\s/g,'_')+'_DeleteBtn_NotFound.png');
        await assert.fail('Due to the delete button of \''+teamName+'\' team is not found, the test case has been failed. Screenshot Name: \''+screenshotPath+teamName.replace(/\s/g,'_')+'_DeleteBtn_NotFound.png\'.');
    }
});

When('the user click on the Inactive tab button', async () =>{
    //will find the 'Inactive' tab button
    const inactiveTabBtn = await teamsPageElementObj.findInactiveTabBtn(driver,screenshotPath);
    //will click on that button
    await inactiveTabBtn.click();
    await driver.sleep(2000);
});

When('the user click on the Active tab button', async () =>{
    //will find the 'Active' tab button
    const activeTabBtn = await teamsPageElementObj.findActiveTabBtn(driver,screenshotPath);
    //will click on that button
    await activeTabBtn.click();
    await driver.sleep(2000);
});

When('the user with {string} profile do Salesmate login', async (profileName) =>{
    let otherProfileUser = '', userDetails;

    //will get the user details of the provided profile from the xlsx file 
    if(linkEnvironment.toLocaleLowerCase() === 'dev'){
        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
    }else{
        userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx','UserDetails');
    }
    for(let i=0; i<userDetails.user.length; i++){
        if(userDetails.profile[i].toLowerCase() == profileName.toLowerCase()){
            otherProfileUser = userDetails.user[i];
            break;
        }
    }
    //will check the user details of the provided profile is found or not from the excel file
    if(otherProfileUser == ''){
        await assert.fail('Due to the \''+profileName+'\' profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
    }

    //will open the Salesmate login page
    await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the user with {string} profile do Salesmate login');
    //will do Salesmate login with the provided profile user's credentials
    await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,otherProfileUser,'the user with {string} profile do Salesmate login');
});

When('goes on the Setup>Teams page', async () =>{
    //will open the teams page
    await actionObj.openTeamsPage(driver,screenshotPath);  
});

Then('the new team should get added with {string} message', async (message) =>{
    //will check the success message is as per the expected or not
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    strictEqual(notyMessageText,message);
    await driver.sleep(4000);
    //will navigate on another page and come back to the teams page after adding a team
    await actionObj.comeBackToTeamsPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);
    console.log('The \''+message+'\' message is getting displayed...');
});

Then('the team details should get updated with {string} message', async (message) =>{
    //will check the success message is as per the expected or not
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    strictEqual(notyMessageText,message);
    await driver.sleep(4000);
    //will navigate on another page and come back to the teams page after updating team details
    await actionObj.comeBackToTeamsPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);
    console.log('The \''+message+'\' message is getting displayed...');
});

Then('the team details should be same as provided details on the list page', async () =>{
    let fieldName;
    let teammates = newTeammatesAutocompleteDrpdwnData.length;
    teammates = teammates.toString();

    //will get the provided team details from the list page
    const teamDetailsOnList = await actionObj.getTeamsDetailsFromListPage(driver,screenshotPath,newNameFieldData);
    const nameOnListPage = teamDetailsOnList.name;
    const managerNameOnListPage = teamDetailsOnList.managerName;
    const usersCountOnListPage = teamDetailsOnList.noOfUsers;
    console.log(nameOnListPage,newNameFieldData)
    console.log(managerNameOnListPage,newTeamManagerDrpdwnData)
    console.log(usersCountOnListPage,teammates)

    //will check the team details are same as provided details
    try{
        fieldName = 'TeamName';
        strictEqual(nameOnListPage,newNameFieldData);
        fieldName = 'Manager';
        strictEqual(managerNameOnListPage,newTeamManagerDrpdwnData);
        fieldName = 'Teammates';
        strictEqual(usersCountOnListPage,teammates);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_Data_NotCorrect_ListPage.png'); 
        assert.fail('Due to the data of '+fieldName+' is not correct on the list page, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'_Data_NotCorrect_ListPage.png\'.');
    }

    console.log('The team details are same as provided details on the list page...')   
});

Then('the team details should be same as provided details on the team details view popup', async () =>{
    let fieldName;

    //will get the provided team details from the view popup
    const teamDetailsOnViewPopup = await actionObj.getTeamsDetailsFromViewPopup(driver,screenshotPath,newNameFieldData);
    const nameOnViewPopup = teamDetailsOnViewPopup.name;
    const descriptionOnViewPopup = teamDetailsOnViewPopup.description;
    const managerNameOnViewPopup = teamDetailsOnViewPopup.managerName;

    //will check the team details are same as provided details
    try{
        fieldName = 'TeamName';
        strictEqual(nameOnViewPopup,newNameFieldData+' Team');
        fieldName = 'Manager';
        strictEqual(managerNameOnViewPopup,newTeamManagerDrpdwnData);
        fieldName = 'Description';
        strictEqual(descriptionOnViewPopup,newDescriptionFieldData);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_Data_NotCorrect_ViewPopup.png'); 
        assert.fail('Due to the data of '+fieldName+' is not correct on the view popup, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'_Data_NotCorrect_ViewPopup.png\'.');
    }

    console.log('The team details are same as provided details on the team details view popup...');
});

Then('the team details should be same as provided details on the edit team details popup', async () =>{
    await driver.sleep(1000);
    //will open the 'Edit Team' popup
    const editTeamBtn = await teamsPageElementObj.findEditTeamBtn(driver,newNameFieldData);
    await editTeamBtn[0].click();
    await driver.sleep(1000); 

    try{
        //will find all test fields on the 'Edit Team' popup
        const nameField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'name');
        const descriptionField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'description');
        const managerField = await formElementObj.findDropdown(driver,screenshotPath,'manager')
        const teammatesTags = await teamsPageElementObj.findAutocompleteTags(driver,'Teammates');
        
        //will check the team details are same as provided details
        try{
            fieldName = 'NameField';
            assert.strictEqual(await nameField.getAttribute('value'),newNameFieldData);
            fieldName = 'DescriptionField';
            assert.strictEqual(await descriptionField.getAttribute('value'),newDescriptionFieldData);
            fieldName = 'ManagerField';
            assert.strictEqual(await managerField.getText(),newTeamManagerDrpdwnData);
            fieldName = 'TeammatesField';
            for(let i=0; i<newTeammatesAutocompleteDrpdwnData.length; i++){
                newTeammatesAutocompleteDrpdwnData[i] = newTeammatesAutocompleteDrpdwnData[i].replace(/\s/g,'');
                actualTeammates = await teammatesTags[i].getText();
                assert(newTeammatesAutocompleteDrpdwnData.includes(actualTeammates.replace(/\s/g,'')));
            }
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+fieldName+'_Data_NotCorrect_EditPopup.png'); 
            assert.fail('Due to the data of '+fieldName+' is not correct on the edit popup, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+fieldName+'_Data_NotCorrect_EditPopup.png\'.');
        }

        //will close the 'Edit Team' popup
        const popupCloseBtn = await teamsPageElementObj.findPopupCloseBtn(driver,screenshotPath);
        await popupCloseBtn.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }

    console.log('The team details are same as provided details on the edit team details popup...');
});

Then('the system should give {string} validation for the Name field', async (expectedValidationMsg) =>{
    try{
        //will find the 'Name' field validation 
        const nameField = await teamsPageElementObj.findTextbox(driver,screenshotPath,'name');
        const nameFieldValidation = await commonElementObj.findFieldValidationElement(driver,screenshotPath,nameField);

        //will compare the actual and expected field validation messages
        try{
            assert.strictEqual(await nameFieldValidation.getText(),expectedValidationMsg);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'NameField_RequiredValidationMsg_NotCorrect.png'); 
            assert.fail('Due to the Name field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'NameField_RequiredValidationMsg_NotCorrect.png\'.');
        }

        //will close the popup
        const popupCloseBtn = await teamsPageElementObj.findPopupCloseBtn(driver,screenshotPath);
        await popupCloseBtn.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }

    console.log('The \''+expectedValidationMsg+'\' validation message is getting displayed...');
});

Then('the system should give {string} validation for the Teammates field', async (expectedValidationMsg) =>{
    try{
        //will find notification message 
        const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
        //will fetch the notification message text
        const actualValidationMsg = await notyMessage.getText();

        //will check whether the notification message is as per the expected or not
        try{
            assert.strictEqual(actualValidationMsg,expectedValidationMsg);
            await driver.sleep(3000);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'TeammatesField_RequiredValidationMsg_NotCorrect.png'); 
            assert.fail('Due to the Teammates field validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'TeammatesField_RequiredValidationMsg_NotCorrect.png\'.');
        }

        //will close the popup
        const popupCloseBtn = await teamsPageElementObj.findPopupCloseBtn(driver,screenshotPath);
        await popupCloseBtn.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }

    console.log('The \''+expectedValidationMsg+'\' validation message is getting displayed...');
});

Then('the system should give {string} duplication validation message', async (expectedValidationMsg) =>{
    try{
        //will find notification message 
        const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
        //will fetch the notification message text
        const actualValidationMsg = await notyMessage.getText();

        //will check whether the notification message is as per the expected or not
        try{
            assert.strictEqual(actualValidationMsg,expectedValidationMsg);
            await driver.sleep(3000);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Name_DuplicationValidationMsg_NotCorrect.png'); 
            assert.fail('Due to the name duplication validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'Name_DuplicationValidationMsg_NotCorrect.png\'.');
        }

        //will close the popup
        const popupCloseBtn = await teamsPageElementObj.findPopupCloseBtn(driver,screenshotPath);
        await popupCloseBtn.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }

    console.log('The \''+expectedValidationMsg+'\' validation message is getting displayed...');
});

Then('the system should give {string} length validation message for the Name field', async (expectedValidationMsg) =>{
    try{
        //will find notification message 
        const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
        //will fetch the notification message text
        const actualValidationMsg = await notyMessage.getText();

        //will check whether the notification message is as per the expected or not
        try{
            assert.strictEqual(actualValidationMsg,expectedValidationMsg);
            await driver.sleep(3000);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Name_LengthValidationMsg_NotCorrect.png'); 
            assert.fail('Due to the name length validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'Name_LengthValidationMsg_NotCorrect.png\'.');
        }
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }

    console.log('The \''+expectedValidationMsg+'\' validation message is getting displayed...');
});

Then('the system should give {string} length validation message for the Description field', async (expectedValidationMsg) =>{
    try{
        //will find notification message 
        const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
        //will fetch the notification message text
        const actualValidationMsg = await notyMessage.getText();

        //will check whether the notification message is as per the expected or not
        try{
            assert.strictEqual(actualValidationMsg,expectedValidationMsg);
            await driver.sleep(3000);
        }catch(err){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Description_LengthValidationMsg_NotCorrect.png'); 
            assert.fail('Due to the description length validation message is not correct, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'Description_LengthValidationMsg_NotCorrect.png\'.');
        }

        //will close the popup
        const popupCloseBtn = await teamsPageElementObj.findPopupCloseBtn(driver,screenshotPath);
        await popupCloseBtn.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }

    console.log('The \''+expectedValidationMsg+'\' validation message is getting displayed...');
});

Then('the system should not display inactive users for the Manager field', async () =>{
    try{
        let inactiveUsers = [], userDetails;
        //will get the inactive user list from th excel file
        if(linkEnvironment.toLocaleLowerCase() === 'dev'){
            userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        }else{
            userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx','UserDetails');
        }
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.isActive[i].toLowerCase() == 'no'){
                inactiveUsers.push(userDetails.fullName[i]);
            }
        }
        //will check the inactive users found or not
        if(inactiveUsers.length == 0 ){
            assert.fail('To execute this test case, it is required to have one inactive users in the excel file.');
        }

        //will find the 'Manager' dropdown list
        const managerDropdownList = await formElementObj.findDropdownListElement(driver,screenshotPath,'manager');
        for(let i=0; i<managerDropdownList.length; i++){
            actualDropdownVal = await managerDropdownList[i].getText();
            for(let j=0; j<inactiveUsers.length; j++){
                //will check the 'Manager' drop-down list contains the inactive users or not
                if(actualDropdownVal.includes(inactiveUsers[j])){
                    await screenshotObj.takeScreenshot(driver,screenshotPath+'ManagerDropdown_Contains_'+inactiveUsers[j].replace(/\s/g,'_')+'_InactiveUser.png'); 
                    assert.fail('Due to the manager drop down list contains an inactive \''+inactiveUsers[j]+'\' user, the test case has been failed. Screenshot Name: \''+screenshotPath+'ManagerDropdown_Contains_'+inactiveUsers[j].replace(/\s/g,'_')+'_InactiveUser.png\'.');
                }
            }
        }

        //will close the 'Manager' dropdown list
        const managerDropdown = await formElementObj.findDropdown(driver,screenshotPath,'manager');
        await managerDropdown.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }

    console.log('The manager field doesn\'t contains inactive users...')
});

Then('when the user search inactive users from the Teammates field then the system should not display inactive users', async () =>{
    try{
        let inactiveUsers = [], userDetails;
        //will get the inactive user list from th excel file
        if(linkEnvironment.toLocaleLowerCase() === 'dev'){
            userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        }else{
            userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData.xlsx','UserDetails');
        }
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.isActive[i].toLowerCase() == 'no'){
                inactiveUsers.push(userDetails.fullName[i]);
            }
        }
        //will check the inactive users found or not
        if(inactiveUsers.length == 0 ){
            assert.fail('To execute this test case, it is required to have one inactive users in the excel file.');
        }

        //will find autocomplete input box
        const autocompleteInputbox = await teamsPageElementObj.findAutocompleteInputbox(driver,screenshotPath,'Teammates');
        for(let i=0; i<inactiveUsers.length; i++){
            //will enter inactive user in the autocomplete input box
            await autocompleteInputbox.sendKeys(inactiveUsers[i].trim());
            await driver.sleep(2000);
            //will check the 'No such record found' message is showing or not
            const autocompleteNoSearchResultFound = await teamsPageElementObj.findAutocompleteNoSearchResultFound(driver,'Teammates');
            if(autocompleteNoSearchResultFound.length == 0){
                await screenshotObj.takeScreenshot(driver,screenshotPath+'TeammatesDropdown_Contains_'+inactiveUsers[i].replace(/\s/g,'_')+'_InactiveUser.png'); 
                assert.fail('Due to the teammates drop down list contains an inactive \''+inactiveUsers[i]+'\' user, the test case has been failed. Screenshot Name: \''+screenshotPath+'TeammatesDropdown_Contains_'+inactiveUsers[i].replace(/\s/g,'_')+'_InactiveUser.png\'.');
            }else{
                await clearFieldDataObj.clearFieldData(autocompleteInputbox);
                await driver.sleep(1000);
            }
        }
    
        //will close the popup
        const popupCloseBtn = await teamsPageElementObj.findPopupCloseBtn(driver,screenshotPath);
        await popupCloseBtn.click();
        await driver.sleep(2000);
    }catch(err){
        //will refresh the page to close the popup before throwing any error
        await driver.navigate().refresh();
        assert.fail(err);
    }
    
    console.log('The teammates field doesn\'t contains inactive users...')
});

Then('the {string} team should get deactivated with	{string} message', async (teamName,expectedMessage) =>{
    //will check the success message is as per the expected or not
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    strictEqual(notyMessageText,expectedMessage);
    await driver.sleep(4000);
    console.log('The \''+expectedMessage+'\' message is getting displayed...');
    //will navigate on another page and come back to the teams page after deactivating a team
    await actionObj.comeBackToTeamsPage(driver,screenshotPath);
    await driver.sleep(1000);
    
    //will open the inactive team list page
    const inactiveTabBtn = await teamsPageElementObj.findInactiveTabBtn(driver,screenshotPath);
    await inactiveTabBtn.click();
    await driver.sleep(1000);
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);

    //will check the recently deactivated team is showing on the inactive list or not
    const teamNameOnInactiveList = await teamsPageElementObj.findNamefromListPage(driver,teamName);
    if(teamNameOnInactiveList.length == 0){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Inactive_'+teamName.replace(/\s/g,'_')+'_Team_NotShowingOn_InactiveList.png'); 
        assert.fail('Due to the inactive '+teamName+' team is not showing on the inactive team list, the test case has been failed. Screenshot Name: \''+screenshotPath+'Inactive_'+teamName.replace(/\s/g,'_')+'_Team_NotShowingOn_InactiveList.png\'.');
    }else{
        console.log('The inactive '+teamName+' team is showing on the inactive team list...');
    }
});

Then('the {string} team should get reactivated with	{string} message', async (teamName,expectedMessage) =>{
    //will check the success message is as per the expected or not
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    strictEqual(notyMessageText,expectedMessage);
    await driver.sleep(4000);
    console.log('The \''+expectedMessage+'\' message is getting displayed...');
    //will navigate on another page and come back to the teams page after reactivating a team
    await actionObj.comeBackToTeamsPage(driver,screenshotPath);
    await driver.sleep(1000);
    //will wait till the grid get loaded
    await teamsPageElementObj.findGrid(driver);
    
    //will check the recently activated team is showing on the active list or not
    const teamNameOnActiveList = await teamsPageElementObj.findNamefromListPage(driver,teamName);
    if(teamNameOnActiveList.length == 0){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'Active_'+teamName.replace(/\s/g,'_')+'_Team_NotShowingOn_ActiveList.png'); 
        assert.fail('Due to the active '+teamName+' team is not showing on the active team list, the test case has been failed. Screenshot Name: \''+screenshotPath+'Active_'+teamName.replace(/\s/g,'_')+'_Team_NotShowingOn_ActiveList.png\'.');
    }else{
        console.log('The active '+teamName+' team is showing on the active team list...');
    }
});

Then('the {string} team should get deleted with	{string} message', async (teamName,expectedMessage) =>{
    //will check the success message is as per the expected or not
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    strictEqual(notyMessageText,expectedMessage);
    await driver.sleep(4000);
    console.log('The \''+expectedMessage+'\' message is getting displayed...');
    //will navigate on another page and come back to the teams page after deleting a team
    await actionObj.comeBackToTeamsPage(driver,screenshotPath);
    await driver.sleep(500);
    
    //will check the welcome screen is getting displayed or not
    const learnMoreLink = await teamsPageElementObj.findLearnMoreLink(driver);
    if(learnMoreLink.length == 0){
        //will open the inactive team list page
        const inactiveTabBtn = await teamsPageElementObj.findInactiveTabBtn(driver,screenshotPath);
        await inactiveTabBtn.click();
        await driver.sleep(1000);
        await teamsPageElementObj.findNoTeamFoundText(driver);

        //will check the recently deleted team is showing on the inactive list or not
        const teamNameOnInactiveList = await teamsPageElementObj.findNamefromListPage(driver,teamName);
        if(teamNameOnInactiveList.length > 0){
            await screenshotObj.takeScreenshot(driver,screenshotPath+'Deleted_'+teamName.replace(/\s/g,'_')+'_Team_ShowingOn_InactiveList.png'); 
            assert.fail('Due to the deleted '+teamName+' team is showing on the inactive team list, the test case has been failed. Screenshot Name: \''+screenshotPath+'Deleted_'+teamName.replace(/\s/g,'_')+'_Team_ShowingOn_InactiveList.png\'.');
        }else{
            console.log('The deleted '+teamName+' team is not showing on the inactive team list...');
        }
    }else{
        /* As the welcome screen is getting displayed that's mean the team is get deleted */
        console.log('The '+teamName+' team has been deleted...');
        await driver.sleep(2000);
    }
});

Then('the system should not display Add, Edit, Deactivate, Reactivate and Delete buttons to the {string} profile', async (profileName) =>{
    try{
        //will check the currently which screen is getting displayed, Welcome Screen or Teams List Page.
        const learnMoreLink = await teamsPageElementObj.findLearnMoreLink(driver);
        if(learnMoreLink.length > 0){
            /* As the welcome screen is getting displayed, will check the validation message on click of the 'Add' team button */

            //will find 'Add' team button and then click on that
            const addTeamBtn = await teamsPageElementObj.findAddTeamBtn(driver);
            await addTeamBtn[0].click();
            await driver.sleep(1000);

            //will find notification message 
            const notyMessage = await driver.findElement(By.xpath('//div[@class="noty_message"]/descendant::span[@class="noty_text"]'));
            //will fetch the notification message text
            const actualValidationMsg = await notyMessage.getText();
            //will check whether the validation message is as per the expected or not
            try{
                assert.strictEqual(actualValidationMsg,'You don\'t have permission to create team.');
                await driver.sleep(3000);
            }catch(err){
                await screenshotObj.takeScreenshot(driver,screenshotPath+'ValidationMsg_NotDisplayed_'+profileName.replace(/\s/g,'_')+'.png'); 
                assert.fail('Due to the validation message on click of the add team button is not getting displayed for the '+profileName+' profile, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'ValidationMsg_NotDisplayed_'+profileName.replace(/\s/g,'_')+'.png\'.');
            }

            console.log('\'User with other than admin profile should not be able to manage teams settings\' case has been passed successfully...');
        }else{
            /* As the team list page is getting displayed, will check the Add, Edit, Deactivate, Reactivate and Delete buttons should not be displayed */

            //will check the 'Add' team button is getting displayed or not
            const addTeamBtn = await teamsPageElementObj.findAddTeamBtn(driver);
            if(addTeamBtn.length == 0){
                console.log('The \'Add Team\' button is not getting displayed for the \''+profileName+'\' profile...');
            }else{
                await screenshotObj.takeScreenshot(driver,screenshotPath+'AddTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png');
                await assert.fail('Due to the add team button is getting displayed on the '+profileName+' profile account, the test case has been failed. Screenshot Name: \''+screenshotPath+'AddTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png\'.');
            }

            //will check the 'Edit' team button is getting displayed or not
            const editTeamBtn = await teamsPageElementObj.findEditTeamBtn(driver,'teamName','yes');
            if(editTeamBtn.length == 0){
                console.log('The \'Edit Team\' button is not getting displayed for the \''+profileName+'\' profile...');
            }else{
                await screenshotObj.takeScreenshot(driver,screenshotPath+'EditTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png');
                await assert.fail('Due to the edit team button is getting displayed on the '+profileName+' profile account, the test case has been failed. Screenshot Name: \''+screenshotPath+'EditTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png\'.');
            }   

            //will check the 'Deactivate' team button is getting displayed or not
            const deactivateTeamBtn = await teamsPageElementObj.findDeactivateTeamBtn(driver,'teamName','yes');
            if(deactivateTeamBtn.length == 0){
                console.log('The \'Deactivate Team\' button is not getting displayed for the \''+profileName+'\' profile...');
            }else{
                await screenshotObj.takeScreenshot(driver,screenshotPath+'DeactivateTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png');
                await assert.fail('Due to the deactivate team button is getting displayed on the '+profileName+' profile account, the test case has been failed. Screenshot Name: \''+screenshotPath+'DeactivateTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png\'.');
            }

            //will open inactive teams list page
            const inactiveTabBtn = await teamsPageElementObj.findInactiveTabBtn(driver,screenshotPath);
            await inactiveTabBtn.click();
            await driver.sleep(2000);

            //will check the 'Reactivate' team button is getting displayed or not
            const reactivateTeamBtn = await teamsPageElementObj.findReactivateTeamBtn(driver,'teamName','yes');
            if(reactivateTeamBtn.length == 0){
                console.log('The \'Reactivate Team\' button is not getting displayed for the \''+profileName+'\' profile...');
            }else{
                await screenshotObj.takeScreenshot(driver,screenshotPath+'ReactivateTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png');
                await assert.fail('Due to the reactivate team button is getting displayed on the '+profileName+' profile account, the test case has been failed. Screenshot Name: \''+screenshotPath+'ReactivateTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png\'.');
            }

            //will check the 'Delete' team button is getting displayed or not
            const deleteTeamBtn = await teamsPageElementObj.findDeleteTeamBtn(driver,'teamName','yes');
            if(deleteTeamBtn.length == 0){
                console.log('The \'Delete Team\' button is not getting displayed for the \''+profileName+'\' profile...');
            }else{
                await screenshotObj.takeScreenshot(driver,screenshotPath+'DeleteTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png');
                await assert.fail('Due to the delete team button is getting displayed on the '+profileName+' profile account, the test case has been failed. Screenshot Name: \''+screenshotPath+'DeleteTeamBtn_Found_'+profileName.replace(/\s/g,'_')+'_Profile.png\'.');
            }
        }
    }catch(err){
        //will logout from this profile user account before throwing any error
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the system should not display Add, Edit, Deactivate, Reactivate And Delete buttons to the {string} profile');
        assert.fail(err);
    }
     
    //will logout from this profile user account
    await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the system should not display Add, Edit, Deactivate, Reactivate And Delete buttons to the {string} profile');
});
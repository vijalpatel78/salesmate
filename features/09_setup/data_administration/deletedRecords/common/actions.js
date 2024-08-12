const assert = require('assert');
const {By,until, Key} = require('selenium-webdriver');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../00_common/webElements/formElements');
const deletedRecordsPageElementObj = require('../common/deletedRecordsPageElements');
const moduleElementsObj =  require('../../../../00_common/webElements/moduleElements');
const systemModulesPageElementObj = require('../../../customizations/systemModules/common/systemModulesPageElements')
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const clearFieldDataObj = require('../../../../00_common/actions/fieldActions/clearFieldData');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');

async function addContact(driver,screenshotPath,lastName){
    //will open the add contact popup
    const quickAddIcon = await deletedRecordsPageElementObj.findQuickAddBtn(driver,screenshotPath);
    await quickAddIcon.click();
    await driver.sleep(1000);
    const contactAddBtn = await deletedRecordsPageElementObj.findQuickAddModuleBtn(driver,screenshotPath,'Contact');
    await contactAddBtn.click();
    await driver.sleep(1000);
    //will find the last name field and pass the data in the last name field
    const lastNameField = await formElementObj.findTextbox(driver,screenshotPath,'lastName');
    await clearFieldDataObj.clearFieldData(lastNameField);
    await lastNameField.sendKeys(lastName);
    //will find the custom text field and pass the data
    const customTextField = await formElementObj.findTextbox(driver,screenshotPath,'textCustomField1');
    await clearFieldDataObj.clearFieldData(customTextField);
    await customTextField.sendKeys('custom text data');
    const saveBtn = await formElementObj.findButton(driver,screenshotPath,'btnSubmit');
    await saveBtn.click();
    await driver.sleep(1000);
}exports.addContact=addContact;

async function addCompany(driver,screenshotPath,name,custom){
    //will open the add company popup
    const quickAddIcon = await deletedRecordsPageElementObj.findQuickAddBtn(driver,screenshotPath);
    await quickAddIcon.click();
    await driver.sleep(1000);
    const companyAddBtn = await deletedRecordsPageElementObj.findQuickAddModuleBtn(driver,screenshotPath,'Company');
    await companyAddBtn.click();
    await driver.sleep(1000);
    //will find the name field
    const nameField = await deletedRecordsPageElementObj.findCompanyNameField(driver,screenshotPath);
    await clearFieldDataObj.clearFieldData(nameField);
    //will pass the data in the name field
    await nameField.sendKeys(name+Key.TAB);
    await driver.sleep(1000);
    // //will find the custom field
    const customField = await deletedRecordsPageElementObj.findCustomField(driver,screenshotPath);
    await clearFieldDataObj.clearFieldData(customField);
    //will pass the data in the custom field
    await customField.sendKeys(custom+Key.TAB);
    await driver.sleep(1000);
    //will find and click on the 'Save' button
    const saveBtn = await formElementObj.findButton(driver,screenshotPath,'btnSubmit');
    await saveBtn.click();
    await driver.sleep(1000);
}exports.addCompany=addCompany;

async function addDeal(driver,screenshotPath,title){
    //will open the add deal popup
    const quickAddIcon = await deletedRecordsPageElementObj.findQuickAddBtn(driver,screenshotPath);
    await quickAddIcon.click();
    await driver.sleep(1000);
    const dealAddBtn = await deletedRecordsPageElementObj.findQuickAddModuleBtn(driver,screenshotPath,'Deal');
    await dealAddBtn.click();
    await driver.sleep(1000);
    //await driver.actions().sendKeys(Key.chord('c','d')).perform();
    //will find the title field
    const titleField = await formElementObj.findTextbox(driver,screenshotPath,'title');
    await clearFieldDataObj.clearFieldData(titleField);
    //will pass the data in the title field
    await titleField.sendKeys(title);
    //will find and click on the 'Save' button
    const saveBtn = await formElementObj.findButton(driver,screenshotPath,'btnSubmit');
    await saveBtn.click();
    await driver.sleep(1000);
}exports.addDeal=addDeal;

async function deleteRecord(driver,screenshotPath){
    //will open the record detail view
    const recordViewLink = await commonElementObj.findViewLinkOnNotyMessage(driver,screenshotPath);
    await recordViewLink.click();
    await driver.sleep(1000);
    //will find and click on the record delete button
    const deleteButton = await deletedRecordsPageElementObj.findRecordDeleteButton(driver,screenshotPath);
    await driver.executeScript("arguments[0].click()",deleteButton);
    await driver.sleep(1000);
    const yesButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesButton.click();
    await driver.sleep(1000);
    //will find notification message after performing operations 
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert(notyMessageText.includes('deleted successfully'));
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        assert.fail('Due to the success message is not given after deleting a record, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
}exports.deleteRecord=deleteRecord;

async function bulkDeleteRecords(driver,screenshotPath,classAttributeOfModuleIcon,customViewName){
    //will find and click on the module menu button
    const moduleMenu = await commonElementObj.findModuleMenu(driver,screenshotPath,classAttributeOfModuleIcon);
    await moduleMenu.click();
    await driver.sleep(1000);
    //will open the deal module list page if it is not opened
    const currentURL = await driver.getCurrentUrl();
    if(!currentURL.endsWith('list') && classAttributeOfModuleIcon == 'icon-ic_deal'){
        const dealListButton = await deletedRecordsPageElementObj.findDealListButton(driver,screenshotPath);
        await driver.executeScript("arguments[0].click()",dealListButton);
        await driver.sleep(1000);
    }
    //will click on the custom view    
    const customViewElem = await commonElementObj.findCustomView(driver,screenshotPath);
    await customViewElem.click();
    await driver.sleep(1000);
    //will click on the All View tab
    const allViewTab = await commonElementObj.findLinkElement(driver,screenshotPath,'ALL VIEWS');
    await allViewTab.click();
    await driver.sleep(1000);
    //will click on the provided custom view
    const customView = await commonElementObj.findCustomViewName(driver,screenshotPath,customViewName);
    await customView.click();
    await deletedRecordsPageElementObj.findRecordEditIcon(driver,screenshotPath);
    await driver.sleep(1000);
    //will select all records    
    const selectAllCheckbox = await commonElementObj.findSelectAllRecordsCheckbox(driver,screenshotPath);
    await driver.executeScript("arguments[0].click()",selectAllCheckbox);
    await driver.sleep(1000);
    //will find and click on the 'Bulk Delete' button    
    const bulkDeleteBtn = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
    await bulkDeleteBtn.click();
    await driver.sleep(1000);
    //will find and click on the 'Yes' button
    const yesButton = await formElementObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
    await yesButton.click();
    await driver.sleep(1000);
    //will find notification message after performing operations 
    const notyMessage = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
    //will fetch the notification message text
    const notyMessageText = await notyMessage.getText();
    //will check whether the notification message is a success message or not
    try{
        assert(notyMessageText.includes('deleted successfully'));
        await driver.sleep(4000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SuccessMessage_NotGiven.png');
        await driver.navigate().refresh();
        await driver.sleep(1000);
        assert.fail('Due to the success message is not given after deleting a record, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SuccessMessage_NotGiven.png\'.');
    }
}exports.bulkDeleteRecords=bulkDeleteRecords;

//will navigate on the dashboard page and then come back to the deleted records page
async function comeBackToDeletedRecordsPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const deletedRecordsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Deleted Records ');
    await driver.executeScript("arguments[0].scrollIntoView();",deletedRecordsTab[0]);
    await driver.wait(until.elementIsVisible(deletedRecordsTab[0]));
    await deletedRecordsTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/deleted-records'),10000);
}exports.comeBackToDeletedRecordsPage=comeBackToDeletedRecordsPage;

async function openDeletedRecordsPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Deleted Records' tab 
    const deletedRecordsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Deleted Records ');

    //will check the 'Deleted Records' tab is visible or not
    if(deletedRecordsTab.length > 0){
        //will set focus on the 'Deleted Records' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",deletedRecordsTab[0]);
        await driver.wait(until.elementIsVisible(deletedRecordsTab[0]));
        //will click on the 'Deleted Records' tab 
        await deletedRecordsTab[0].click();
    }else{
        /* As 'Deleted Records' tab is not visible to the logged-in user, it will do Admin login on the same browser */

        let adminUserNumber = '';

        //will get the Admin user details from the xlsx file 
        const userDetails = await readUserDetailsObj.readUserDetails('./cucumber_config/testData_dev.xlsx','UserDetails');
        for(let i=0; i<userDetails.user.length; i++){
            if(userDetails.profile[i].toLowerCase() == 'admin'){
                adminUserNumber = userDetails.user[i];
            }
        }
        //will check whether the Admin user found or not from the excel file
        if(adminUserNumber == ''){
            await assert.fail('Due to the Admin profile user is not found from the excel file, the test case has been aborted. Found Profiles ---> \''+userDetails.profile+'\'.');
        }

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on Deleted Records page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on Deleted Records page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Deleted Records' tab 
        const deletedRecordsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Deleted Records ');
        //will set focus on the 'Deleted Records' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",deletedRecordsTab[0]);
        await driver.wait(until.elementIsVisible(deletedRecordsTab[0]));
        //will click on the 'Deleted Records' tab 
        await deletedRecordsTab[0].click();
        await driver.sleep(2000);
    }
    await driver.sleep(2000);

    //will verify whether the deleted records page found or not
    try{
        await driver.wait(until.urlContains('app/setup/deleted-records'),30000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'DeletedRecordsPage_NotFound.png');
        await assert.fail('Due to the deleted records page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'DeletedRecordsPage_NotFound.png\'.');
    }

    console.log('The deleted records page has been opened successfully...');
}exports.openDeletedRecordsPage=openDeletedRecordsPage;

async function getDynamicModuleName(driver,screenshotPath,moduleName){
    //will find and click on the module edit button
    const moduleEditBtn = await systemModulesPageElementObj.findModuleEditBtn(driver,screenshotPath,moduleName);
    await moduleEditBtn.click();
    await driver.sleep(1000);
    //will get the module singular name
    const singularTextbox = await systemModulesPageElementObj.findSingularTextbox(driver,screenshotPath);
    const expectedSingularModuleName = await singularTextbox.getAttribute('value');
    //will get the module plural name
    const pluralTextbox = await systemModulesPageElementObj.findPluralTextbox(driver,screenshotPath);
    const expectedPluralModuleName = await pluralTextbox.getAttribute('value');
    //will find and click on the Cancel button
    const cancelBtn = await systemModulesPageElementObj.findCancelBtn(driver,screenshotPath);
    await cancelBtn.click();
    await driver.sleep(2000);
    //will return the module singular and plural name
    return { singularModuleName:expectedSingularModuleName, pluralModuleName:expectedPluralModuleName };
}exports.getDynamicModuleName=getDynamicModuleName;
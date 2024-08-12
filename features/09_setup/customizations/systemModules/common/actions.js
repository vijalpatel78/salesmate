const assert = require('assert');
const {until} = require('selenium-webdriver');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const commonElementObj = require('../../../../00_common/webElements/commonElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const systemModulesPageElementObj = require('../common/systemModulesPageElements');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const readUserDetailsObj = require('../../../../00_common/actions/readExcelData');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');

//will navigate on the dashboard page and then come back to the system modules page
async function comeBackToSystemModulesPage(driver,screenshotPath){
    const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
    await contactModule.click();
    await driver.sleep(2000);
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');
    await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
    await driver.wait(until.elementIsVisible(systemModulesTab[0]));
    await systemModulesTab[0].click();
    await driver.sleep(2000);
    await driver.wait(until.urlContains('app/setup/customization/modules'),10000);
}exports.comeBackToSystemModulesPage=comeBackToSystemModulesPage;

async function openSystemModulesPage(driver,screenshotPath){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'System Modules' tab 
    const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');

    //will check the 'System Modules' tab  is visible or not
    if(systemModulesTab.length > 0){
        //will set focus on the 'System Modules' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab 
        await systemModulesTab[0].click();
    }else{
        /* As 'System Modules' tab is not visible to the logged-in user, it will do Admin login on the same browser */

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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on security roles page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on security roles page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'System Modules' tab 
        const systemModulesTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' System Modules ');
        //will set focus on the 'System Modules' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",systemModulesTab[0]);
        await driver.wait(until.elementIsVisible(systemModulesTab[0]));
        //will click on the 'System Modules' tab 
        await systemModulesTab[0].click();
    }
    await driver.sleep(2000);

    //will verify whether the system modules page found or not
    try{
        await driver.wait(until.urlContains('app/setup/customization/modules'),30000);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SystemModulesPage_NotFound.png');
        await assert.fail('Due to the system modules page is not found, the test case has been failed. Error Details: \''+err+'\' Screenshot Name: \''+screenshotPath+'SystemModulesPage_NotFound.png\'.');
    }

    console.log('The system modules page has been opened successfully...');
}exports.openSystemModulesPage=openSystemModulesPage;

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
    console.log('The \''+message+'\' success message has been displayed...');
}exports.checkSuccessMessage=checkSuccessMessage;

async function installOrRemoveProductApp(driver,screenshotPath,newState){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Apps' tab 
    const appsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Apps ');

    //will check the 'Apps' tab is visible or not
    if(appsTab.length > 0){
        //will set focus on the 'Apps' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab 
        await appsTab[0].click();

        if(newState.toLowerCase() == 'install'){
            //will check the 'Product' app is installed or not
            const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
            if(productInstallBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productInstallBtn[0]);
                await driver.wait(until.elementIsEnabled(productInstallBtn[0]));
                //will click on the 'Product Install' button
                await productInstallBtn[0].click();
                await driver.sleep(3000);
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await driver.wait(until.elementIsVisible(productRemoveBtn));
                console.log('The \'Product\' app has been installed...');
            }else{
                console.log('The \'Product\' app is already installed...');
            }
        }else if(newState.toLowerCase() == 'remove'){
            //will check the 'Product' app is uninstalled or not
            const productConfigureBtn = await systemModulesPageElementObj.findProductConfigureBtn(driver);
            if(productConfigureBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productConfigureBtn[0]);
                await driver.wait(until.elementIsVisible(productConfigureBtn[0]));
                //will click on the Product app's 'Configure' button
                await productConfigureBtn[0].click();
                await driver.sleep(1000);
                //will find 'Remove' button and then will click on it
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await productRemoveBtn.click();
                await driver.sleep(3000);
                const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
                await driver.wait(until.elementIsVisible(productInstallBtn[0]));
                console.log('The \'Product\' app has been uninstalled...');
            }else{
                console.log('The \'Product\' app is already uninstalled...');
            }
        }else{
            assert.fail('The provided \''+newState+'\' value is not valid. The value should be either \'Install\' or \'Remove\'.');
        }
    }else{
        /* As the 'Apps' tab is not visible to the logged-in user, it will do Admin login on the same browser */

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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on system modules page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on system modules page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Apps' tab 
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Apps ');
        //will set focus on the 'Apps' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab 
        await appsTab[0].click();

        if(newState.toLowerCase() == 'install'){
            //will check the 'Product' app is installed or not
            const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
            if(productInstallBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productInstallBtn[0]);
                await driver.wait(until.elementIsEnabled(productInstallBtn[0]));
                //will click on the 'Product Install' button
                await productInstallBtn[0].click();
                await driver.sleep(3000);
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await driver.wait(until.elementIsVisible(productRemoveBtn));
                console.log('The \'Product\' app has been installed...');
            }else{
                console.log('The \'Product\' app is already installed...');
            }
        }else if(newState.toLowerCase() == 'remove'){
            //will check the 'Product' app is uninstalled or not
            const productConfigureBtn = await systemModulesPageElementObj.findProductConfigureBtn(driver);
            if(productConfigureBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productConfigureBtn[0]);
                await driver.wait(until.elementIsVisible(productConfigureBtn[0]));
                //will click on the Product app's 'Configure' button
                await productConfigureBtn[0].click();
                await driver.sleep(1000);
                //will find 'Remove' button and then will click on it
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await productRemoveBtn.click();
                await driver.sleep(3000);
                const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
                await driver.wait(until.elementIsVisible(productInstallBtn[0]));
                console.log('The \'Product\' app has been uninstalled...');
            }else{
                console.log('The \'Product\' app is already uninstalled...');
            }
        }else{
            assert.fail('The provided \''+newState+'\' value is not valid. The value should be either \'Install\' or \'Remove\'.');
        }
    }
}exports.installOrRemoveProductApp=installOrRemoveProductApp;

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
    console.log('The \''+message+'\' success message has been displayed...');
}exports.checkSuccessMessage=checkSuccessMessage;

async function installOrRemoveProductApp(driver,screenshotPath,newState){
    //will open the 'Setup' page
    await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
    //will find the 'Apps' tab 
    const appsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Apps ');

    //will check the 'Apps' tab is visible or not
    if(appsTab.length > 0){
        //will set focus on the 'Apps' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab 
        await appsTab[0].click();

        if(newState.toLowerCase() == 'install'){
            //will check the 'Product' app is installed or not
            const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
            if(productInstallBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productInstallBtn[0]);
                await driver.wait(until.elementIsEnabled(productInstallBtn[0]));
                //will click on the 'Product Install' button
                await productInstallBtn[0].click();
                await driver.sleep(3000);
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await driver.wait(until.elementIsVisible(productRemoveBtn));
                console.log('The \'Product\' app has been installed...');
            }else{
                console.log('The \'Product\' app is already installed...');
            }
        }else if(newState.toLowerCase() == 'remove'){
            //will check the 'Product' app is uninstalled or not
            const productConfigureBtn = await systemModulesPageElementObj.findProductConfigureBtn(driver);
            if(productConfigureBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productConfigureBtn[0]);
                await driver.wait(until.elementIsVisible(productConfigureBtn[0]));
                //will click on the Product app's 'Configure' button
                await productConfigureBtn[0].click();
                await driver.sleep(1000);
                //will find 'Remove' button and then will click on it
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await productRemoveBtn.click();
                await driver.sleep(3000);
                const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
                await driver.wait(until.elementIsVisible(productInstallBtn[0]));
                console.log('The \'Product\' app has been uninstalled...');
            }else{
                console.log('The \'Product\' app is already uninstalled...');
            }
        }else{
            assert.fail('The provided \''+newState+'\' value is not valid. The value should be either \'Install\' or \'Remove\'.');
        }
    }else{
        /* As the 'Apps' tab is not visible to the logged-in user, it will do Admin login on the same browser */

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
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on system modules page');
        //will do Salesmate login with Admin user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,adminUserNumber,'the {string} is on system modules page');
        //will open the 'Setup' page
        await openSalesmatePageObj.openSetupPage(driver,screenshotPath);
        //will find the 'Apps' tab 
        const appsTab = await commonElementObj.findSetupSubmenuBtn(driver,screenshotPath,' Apps ');
        //will set focus on the 'Apps' tab 
        await driver.executeScript("arguments[0].scrollIntoView();",appsTab[0]);
        await driver.wait(until.elementIsVisible(appsTab[0]));
        //will click on the 'Apps' tab 
        await appsTab[0].click();

        if(newState.toLowerCase() == 'install'){
            //will check the 'Product' app is installed or not
            const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
            if(productInstallBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productInstallBtn[0]);
                await driver.wait(until.elementIsEnabled(productInstallBtn[0]));
                //will click on the 'Product Install' button
                await productInstallBtn[0].click();
                await driver.sleep(3000);
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await driver.wait(until.elementIsVisible(productRemoveBtn));
                console.log('The \'Product\' app has been installed...');
            }else{
                console.log('The \'Product\' app is already installed...');
            }
        }else if(newState.toLowerCase() == 'remove'){
            //will check the 'Product' app is uninstalled or not
            const productConfigureBtn = await systemModulesPageElementObj.findProductConfigureBtn(driver);
            if(productConfigureBtn.length > 0){
                //will set focus on the 'Product' app
                await driver.executeScript("arguments[0].scrollIntoView();",productConfigureBtn[0]);
                await driver.wait(until.elementIsVisible(productConfigureBtn[0]));
                //will click on the Product app's 'Configure' button
                await productConfigureBtn[0].click();
                await driver.sleep(1000);
                //will find 'Remove' button and then will click on it
                const productRemoveBtn = await systemModulesPageElementObj.findProductRemoveBtn(driver,screenshotPath);
                await productRemoveBtn.click();
                await driver.sleep(3000);
                const productInstallBtn = await systemModulesPageElementObj.findProductInstallBtn(driver);
                await driver.wait(until.elementIsVisible(productInstallBtn[0]));
                console.log('The \'Product\' app has been uninstalled...');
            }else{
                console.log('The \'Product\' app is already uninstalled...');
            }
        }else{
            assert.fail('The provided \''+newState+'\' value is not valid. The value should be either \'Install\' or \'Remove\'.');
        }
    }
}exports.installOrRemoveProductApp=installOrRemoveProductApp;
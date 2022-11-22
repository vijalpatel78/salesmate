const {Given,When,Then} = require('@cucumber/cucumber');
const assert = require('assert');
const appsPageElementObj = require('../../common/appsPageElements');
const commonElementObj = require('../../../../../00_common/webElements/commonElements');
const formElementObj = require('../../../../../00_common/webElements/formElements');
const commonActionObj = require('../../common/actions');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/03_setup/apps_voice/apps/05_product/screenshots/';
let currentUrl;

Given('the Product app is uninstalled', async () =>{
    //will uninstall the Product app
    await commonActionObj.uninstallApp(driver,screenshotPath,'Products');
});

Given('the Product app is installed', async () =>{
    //will install the Product app
    await commonActionObj.installApp(driver,'Products');
});

When('the user clicks on the Install button of Product app', async () =>{
    //will install the Product app
    await commonActionObj.installApp(driver,'Products');
});

When('click on the Go to products link', async () =>{
    currentUrl = await driver.getCurrentUrl();
    //will find and click on the link
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'Go to products');
    await link.click();
    await driver.sleep(1000);
});

When('click on the Learn more link', async () =>{
    //will find and click on the link
    const link = await commonElementObj.findLinkElement(driver,screenshotPath,'Learn more');
    await link.click();
    await driver.sleep(1000);
});

When('the user clicks on the Configure button of Product app', async () =>{
    //will click on the Configure button
    await commonActionObj.clickConfigureBtn(driver,'Products');
});

Then('the Product app should get installed', async () =>{
    //will check the app is get installed or not
    try{
        await appsPageElementObj.findAppRemoveBtn(driver,screenshotPath);
    }catch(err){
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductApp_Not_Installed.png');
        assert.fail('The Product app is not getting installed. Screenshot Name: \''+screenshotPath+'ProductApp_Not_Installed.png\'.');
    }

    console.log('The Product app has been installed successfully...');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the products list', async () =>{
    //will get the 05_product list page Url
    const productListUrl = await driver.getCurrentUrl();
    console.log("The 05_product list page url is: "+productListUrl);

    //will check the 05_product list URL is correct or not
    if(productListUrl.includes('app/products/list')){
        console.log("The system is redirected to the 05_product list page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductListPage_NotFound.png');
        //will go back to the Salesmate page
        await driver.get(currentUrl);
        await driver.sleep(1000);
        await assert.fail('Due to the 05_product list page is not opened, the test case has been failed. The URL should end with \'app/products/list\'. Screenshot Name: \''+screenshotPath+'ProductListPage_NotFound.png\'.');
    }

    //will go back to the Salesmate page
    await driver.get(currentUrl);
    await driver.sleep(2000);
    await formElementObj.findButton(driver,screenshotPath,'btnRemove');
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the system should redirect to the support page of Product', async () =>{
    //will get the current tab id
    const currentTab = await driver.getWindowHandle();
    //will get all tab id
    const numberOfTabs = await driver.getAllWindowHandles();

    //will move on the support page
    const supportURLTab = numberOfTabs[numberOfTabs.length - 1];
    await driver.switchTo().window(supportURLTab);
    //will get the support link URL
    currentURL = await driver.getCurrentUrl();
    console.log("The current support doc url is: "+currentURL);
    
    //will check the support link URL is correct or not
    if(currentURL === 'https://support.salesmate.io/hc/en-us/sections/360003033051-Products'){
        console.log("The system is redirected to the support page...");
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'SupportPage_NotFound.png');
        //will close the support page
        await driver.close();
        //will move back to the app page
        await driver.switchTo().window(currentTab);
        await driver.sleep(1000);
        await assert.fail('Due to the support page is not opened, the test case has been failed. Expected URL: \'https://support.salesmate.io/hc/en-us/sections/360003033051-Products\' Screenshot Name: \''+screenshotPath+'SupportPage_NotFound.png\'.');
    }

    //will close the support page
    await driver.close();
    //will move back to the app page
    await driver.switchTo().window(currentTab);
    await driver.sleep(1000);
    const appsTab = await appsPageElementObj.findAppsTab(driver,screenshotPath);
    await appsTab.click();
    await driver.sleep(1000);
});

Then('the Product app should get uninstalled', async () =>{
    //will check the app is get uninstalled or not
    const installBtn = await appsPageElementObj.findAppInstallBtn(driver,'Products');
    if(installBtn.length > 0){
        console.log('The Products app has been uninstalled successfully...');
    }else{
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ProductsApp_Not_Uninstalled.png');
        assert.fail('The Products app is not getting uninstalled. Screenshot Name: \''+screenshotPath+'ProductsApp_Not_Uninstalled.png\'.');
    }
});
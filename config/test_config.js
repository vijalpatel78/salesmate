const assert = require('assert');
const path = require('path');
const {Builder} = require('selenium-webdriver');
const {BeforeAll,AfterAll,Before,After,setDefaultTimeout} = require('@cucumber/cucumber');
const firefox_headless = require('selenium-webdriver/firefox');
const chrome_headless = require('selenium-webdriver/chrome');
const readSalesmteLinkNameObj = require('../features/00_common/actions/readExcelData');
const tmp_dir = path.normalize(__dirname+'/../downloadedFile/');
const elementSearchTimeout = 3000;
let testingEnvironment = process.argv[process.argv.length-1];
const linkEnvironment = process.argv[process.argv.length-2];
let driver;

try{
    //will open the specified browser
    testingEnvironment = testingEnvironment.toLowerCase();
    if(testingEnvironment == 'firefox-local'){
        driver = new Builder().forBrowser('firefox').build();
        driver.manage().window().maximize();
    }else if(testingEnvironment == 'chrome-local'){
        const options = new chrome_headless.Options();
        options.addArguments("--disable-notifications");
        options.setUserPreferences({'download.default_directory': tmp_dir});
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
        driver.manage().window().maximize();
    }else if (testingEnvironment == 'firefox-headless'){
        const options = new firefox_headless.Options().headless();
        driver = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    }else if (testingEnvironment == 'chrome-headless'){
        const options = new chrome_headless.Options().headless();
        options.addArguments('--window-size=1440x900');
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }else if(testingEnvironment == 'browserstack-mac-chrome'){
        const browserstackMacChromeConfig = {
            "os" : "OS X",
            "os_version" : "Catalina",
            "browserName" : "Chrome",
            "browser_version" : "80.0",
            "project" : "Salesmate",
            "build" : "0.1",
            "name" : "Functional Test",
            "browserstack.local" : "false",
            "browserstack.timezone" : "New_York",
            "browserstack.selenium_version" : "3.8.0",
            "browserstack.user" : "meghapatel3",
            "browserstack.key" : "ikaV3my77nq4Dh1A4Hzc"
        };
        driver = new Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(browserstackMacChromeConfig).build();
        driver.manage().window().maximize();
    }else{
        console.log('The test execution can not be started because of the following reason:');
        console.log('=======>>> The provided testing environment is not a valid. It should be one of firefox-local, chrome-local, browserstack-mac-chrome, chrome-headless and firefox-headless');
        process.exit(0);
    }
}catch(err){
    console.log(err);
}

//will set a default timeout for hooks(beforall,afterall,etc) and steps(cucumber_steps)
setDefaultTimeout(600 * 1000);

//will perform some action before all test cases
BeforeAll(async () =>{
    let salesmateTestLink;

    //will set default element search timeout when an element is not found (implicit)
    //will set default pageload timeout after the page navigation (pageLoadStrategy:normal)
    await driver.manage().setTimeouts({implicit:elementSearchTimeout,pageLoadStrategy:'normal'});

    //will fetch the Salesmate test link from the excel file
    if(linkEnvironment.toLocaleLowerCase() === 'dev'){
        salesmateTestLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData_dev.xlsx','SalesmateLink');
    }else if(linkEnvironment.toLocaleLowerCase() === 'staging'){
        salesmateTestLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData_staging.xlsx','SalesmateLink');
        salesmateTestLink = "https://staging9.salesmate.io";
    }else{
        salesmateTestLink = await readSalesmteLinkNameObj.readSalesmteLinkName('./cucumber_config/testData.xlsx','SalesmateLink');
    }

    //will check whether the provided Salesmate URL is in a valid format or not
    try{
        assert.strictEqual(salesmateTestLink.endsWith('salesmate.io'),true);
    }catch(err){
        console.log('Please provide a Salesmate URL only till the salesmate.io. Provided Salesmate URL ---> '+salesmateTestLink);
        await driver.quit();
        process.exit(0);
    }

    console.log('Salesmate Test Link --------------->>> '+salesmateTestLink);
    console.log('________________________________________________________________________________________________'+'\n');
});

//will perform some action before each test cases
Before(() =>{
    console.log('\t','________________________________Test_Case_Started________________________________');
});

//will perform some action after each test cases
After(async () =>{
    console.log('\t','_________________________________Test_Case_Ended_________________________________');
    await driver.manage().setTimeouts({implicit:elementSearchTimeout});
});

//will perform some action after all test cases
AfterAll(async () =>{
    //will close browser windows
    await driver.quit();
});

exports.driver = driver;
exports.elementSearchTimeout = elementSearchTimeout;
exports.linkEnvironment = linkEnvironment;

/* 
'Sign in with Google' case is getting failed on BrowserStack.
Upon executing this case on the BrowserStack's browser, the Google is opening send OTP screen for 
the security purpose and it is not possible to handle.

    else if(testingEnvironment == 'browserstack-chrome'){
        let browserstackChromeConfig ={
            "os" : "OS X",
            "os_version" : "Catalina",
            "browserName" : "Chrome",
            "browser_version" : "80.0",
            "project" : "Salesmate",
            "build" : "0.1",
            "name" : "Functional Test",
            "browserstack.local" : "false",
            "browserstack.timezone" : "New_York",
            "browserstack.selenium_version" : "3.8.0",
            "browserstack.user" : "meghapatel3",
            "browserstack.key" : "ikaV3my77nq4Dh1A4Hzc"
        };
        driver = new Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(browserstackChromeConfig).build();
    }
*/

/* 
'Sign in with Google' case is getting failed on chrome-headless. 
The chrome-headless browser is opening the old login page of Google and email field id is also different on this page.

    //const chrome_headless = require('selenium-webdriver/chrome');
    else if (testingEnvironment == 'chrome-headless'){
        const options = new chrome_headless.Options().headless();
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }
*/
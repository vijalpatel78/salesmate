const {By} = require('selenium-webdriver');
const assert = require('assert');

//all these functions will find dashboard module elements on the browser and return those elements

//----------------------- Dashboard -----------------------

async function findDashboardMenuBtn(driver){
    await driver.sleep(1000);
    const dashboardMenuBtn = await driver.findElement(By.xpath('//a[@class="navbar-brand text-lt"]'));
    return dashboardMenuBtn;
}exports.findDashboardMenuBtn=findDashboardMenuBtn;

async function findDashboardElement(driver){
    const dashboardElement = await driver.findElement(By.xpath('//h3[text()="Default Dashboard "]'));
    return dashboardElement;
}exports.findDashboardElement=findDashboardElement;

async function findContactsBtn(driver){
    const contactsBtn = await driver.findElement(By.className("icon-ic_contacts"));
    return contactsBtn;
}exports.findContactsBtn=findContactsBtn;

async function findOldDashboardMenuBtn(driver){
    const dashboardMenuBtn = await driver.findElement(By.css('a[href="#/app/dashboard"]'));
    return dashboardMenuBtn;
}exports.findOldDashboardMenuBtn=findOldDashboardMenuBtn;

//------------------ Dashboard Onboarding ------------------

async function findCloseBtn(driver){
    const closeBtn = await driver.findElement(By.xpath('//onboardingtour/descendant::span[@class="icon-close pull-left"]'));
    return closeBtn;
}exports.findCloseBtn=findCloseBtn;

async function findGetStartedBtn(driver){
    const getStartedBtn = await driver.findElement(By.xpath('//onboardingtour/descendant::button'));
    return getStartedBtn;
}exports.findGetStartedBtn=findGetStartedBtn;
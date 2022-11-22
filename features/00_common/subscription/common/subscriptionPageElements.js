const {By} = require('selenium-webdriver');

//all these functions will find subscription module elements on the browser and return those elements

//---------------------------- Link Expired - Admin Login----------------------------

async function findContactSalesBtn(driver){
    const contactSalesBtn = await driver.findElement(By.id('link_contact_sales'));
    return contactSalesBtn;
}exports.findContactSalesBtn=findContactSalesBtn;

//---------------------------- Link Expired - Non-Admin Login----------------------------

async function findNonAdminSubsExpiredText(driver){
    const nonAdminSubsExpiredText = await driver.findElement(By.xpath('//h2[@class="m-b-xs"]'));
    return nonAdminSubsExpiredText;
}exports.findNonAdminSubsExpiredText=findNonAdminSubsExpiredText;
const { test, expect } = require('@playwright/test');
let page;

test.describe('Place Order', () => {

  test.beforeEach(async ({browser}) => {
    //open url
    const loginRequest = await browser.newContext({
      httpCredentials:{
        username:"visualcomfortstaging",
        password:"Pictures1"
      }
    });
    page = await loginRequest.newPage();
    await page.goto('https://stage.visualcomfort.com/'); 
    await page.waitForLoadState('domcontentloaded');
  });

  test.skip('Do login', async () =>{
    await page.locator('xpath=//div[@class="header-panel-right"]/descendant::li[@class="link authorization-link"]/descendant::a').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('xpath=//input[@id="email"]').fill('test-qa1-retail@n8ko5unu.mailosaur.net');
    await page.locator('xpath=//input[@id="pass"]').fill('test#qa1#retail#n8ko5unu#mailosaur#net');
    await page.locator('xpath=//button[@id="send2"]').click();
  });

  test('The retail customer should be able to search and place an order for a product', async () => {
    //do login
    await page.locator('xpath=//div[@class="header-panel-right"]/descendant::li[@class="link authorization-link"]/descendant::a').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('xpath=//input[@id="email"]').fill('test-qa1-retail@n8ko5unu.mailosaur.net');
    await page.locator('xpath=//input[@id="pass"]').fill('test#qa1#retail#n8ko5unu#mailosaur#net');
    await page.locator('xpath=//button[@id="send2"]').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('xpath=//div[@class="header-panel-right"]/descendant::li[@class="customer-welcome"]')).toBeAttached();
    await page.waitForLoadState('domcontentloaded');
    
    //search product
    await page.locator('xpath=//input[@id="search"]').fill('Darlana Small Lantern');
    await page.locator('xpath=//div[@id="search_autocomplete"]/descendant::span[@class="qs-option-name" and contains(text(),"darlana small lantern")]').click({force:true});
    await page.waitForLoadState('domcontentloaded');

    //click on the product
    await page.locator('xpath=//div[@id="amasty-shopby-product-list"]/descendant::a[@class="product-item-link" and contains(text(),"Darlana Small Lantern")][1]').click({force:true});
    await page.waitForLoadState('domcontentloaded');

    //enter product details
    await page.locator('xpath=//select[@id="attribute2461"]').selectOption('Aged Iron');
    await page.locator('xpath=//input[@id="qty"]').fill('2');
    //await page.locator('xpath=//label[@class="label admin__field-label label-lightbulb"]/child::span[@class="name" and contains(text(),"Add LED bulb(s)")]').click();
    
    //add to cart
    await page.locator('xpath=//button[@id="product-addtocart-button"]').click();
    await expect(page.locator('xpath=//div[@class="page messages"]/descendant::div[@data-bind="html: $parent.prepareMessageForHtml(message.text)"]')).toBeAttached();
    //await page.locator('xpath=//div[@class="modal-inner-wrap"]/descendant::button[@fdprocessedid="j2zmm6"]').click({force:true});

    //begin checkout
    await page.locator('xpath=//div[@class="minicart-wrapper"]/child::a[@href="https://stage.visualcomfort.com/checkout/cart/"]').hover();
    await page.locator('xpath=//button[@id="top-cart-btn-checkout" and @title="Begin Checkout"]').click();

    //select shipping method and continue
    await page.locator('xpath=//div[@id="checkout-shipping-method-load"]/descendant::span[text()="Standard Overnight"]').click();
    await page.locator('xpath=//div[@class="actions-toolbar-label"]/descendant::span[text()="Continue to Payment"]').click();

    //enter credit card details and place order
    await page.locator('xpath=//div[@id="checkout-payment-method-load"]/descendant::span[@data-bind="text: getTitle()"]').click();
    await page.locator('xpath=//input[@name="payment[name_on_card]"]').fill('Test Account');
    await page.locator('xpath=//input[@name="payment[cc_number]"]').fill('370000000000002');
    await page.locator('xpath=//select[@name="payment[cc_exp_month]"]').selectOption('04 - April');
    await page.locator('xpath=//select[@name="payment[cc_exp_year]"]').selectOption('2027');
    await page.locator('xpath=//input[@name="payment[cc_cid]"]').fill('1234');
    await page.locator('xpath=//span[@data-bind="text: getTitle()"]/ancestor::div[@class="payment-method _active"]/descendant::button[@title="Place Order"]/child::span').click();

    //verify thank you msg
    await expect(page.locator('xpath=//div[@id="csp-extension"]/descendant::h1[contains(text(),"Thank you for your purchase")]')).toBeAttached();
    
  });

  test('The wholesale customer should be able to select and place an order for a product', async () => {
    //do login
    await page.locator('xpath=//div[@class="header-panel-right"]/descendant::li[@class="link authorization-link"]/descendant::a').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('xpath=//input[@id="email"]').fill('test-qalead-wholesale@n8ko5unu.mailosaur.net');
    await page.locator('xpath=//input[@id="pass"]').fill('test#qalead#wholesale#n8ko5unu#mailosaur#net');
    await page.locator('xpath=//button[@id="send2"]').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('xpath=//div[@class="header-panel-right"]/descendant::li[@class="customer-welcome"]')).toBeAttached();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('xpath=//input[@id="search"]').clear();
    
    //select Chandelier from the Ceiling mega menu
    await page.locator('xpath=//ul[@id="rw-menutop"]/child::li/child::a[contains(text(),"Ceiling")]').hover();
    await page.locator('xpath=//div[@class="title cat-name"]/descendant::a[contains(text(),"Chandelier")][1]').click();
    await page.waitForLoadState('domcontentloaded');

    //click on the product
    await page.locator('xpath=//div[@id="amasty-shopby-product-list"]/descendant::a[@class="product-item-link" and contains(text(),"Talia Medium Chandelier")][1]').click({force:true});
    await page.waitForLoadState('domcontentloaded');

    //enter product details
    await page.locator('xpath=//select[@id="attribute2461"]').selectOption('Gild and Clear Swirled Glass');
    await page.locator('xpath=//input[@id="qty"]').fill('3');

    //add to cart
    await page.locator('xpath=//button[@id="product-addtocart-button"]').click();
    await expect(page.locator('xpath=//div[@class="page messages"]/descendant::div[@data-bind="html: $parent.prepareMessageForHtml(message.text)"]')).toBeAttached();
    
    //begin checkout
    await page.locator('xpath=//div[@class="minicart-wrapper"]/child::a[@href="https://stage.visualcomfort.com/checkout/cart/"]').hover();
    await page.locator('xpath=//button[@id="top-cart-btn-checkout" and @title="Begin Checkout"]').click();

    //select shipping method and continue
    await page.locator('xpath=//div[@id="checkout-shipping-method-load"]/descendant::span[text()="Ship When Ready"]').click();
    await page.locator('xpath=//div[@class="actions-toolbar-label"]/descendant::span[text()="Continue to Payment"]').click();
    
    //enter credit card details and place order
    await page.locator('xpath=//div[@id="checkout-payment-method-load"]/descendant::span[@data-bind="text: getTitle()" and text()="Credit Card"]').click();
    let cardNumber = await page.frameLocator('css=iframe[src*="number"]').locator('css=input#number');
    await cardNumber.fill('370000000000002');
    await page.locator('xpath=//select[@name="payment[cc_exp_month]"]').selectOption('04 - April');
    await page.locator('xpath=//select[@name="payment[cc_exp_year]"]').selectOption('2027');
    let cvv = await page.frameLocator('css=iframe[src*="securityCode"]').locator('css=input#securityCode');
    await cvv.fill('1234');
    await page.locator('css=input[name="po_number"]').nth(3).fill('GV30R');
    await page.locator('xpath=//button[@type="submit"]/child::span[text()="Place Order"]').nth(3).click();

    //verify thank you msg
    await expect(page.locator('xpath=//div[@id="csp-extension"]/descendant::h1[contains(text(),"Thank you for your purchase..")]')).toBeAttached();
  });

  test.skip('Verify home page image', async () => {
    //validate home page image
    expect(await page.screenshot({fullPage:true})).toMatchSnapshot('homePage.png');
  });
  
});  
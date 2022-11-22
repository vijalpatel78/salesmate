@regression_test_setup @regression_test @apps_voice
Feature: Product 

    The product app allow user to associate products and services with deals. Once the user associate products 
    with the deal, the deal value will be calculated automatically based on the sum of the product price. 

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16673) ----------------------
    
    Scenario: The user is able to install the Product app
        Given the Product app is uninstalled
        When the user clicks on the Install button of Product app
        Then the Product app should get installed

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16674) ----------------------

    Scenario: It should redirect to the products list on click of the ‘Go to products’ link
        Given the Product app is installed
        When the user clicks on the Configure button of Product app
            And click on the Go to products link
        Then the system should redirect to the products list

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16675) ----------------------

    Scenario: It should redirect to the support page on click of the ‘Learn more’ link
        Given the Product app is installed
        When the user clicks on the Configure button of Product app
            And click on the Learn more link
        Then the system should redirect to the support page of Product
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16676) ----------------------
    
    Scenario: The user is able to uninstall the Product app
        Given the Product app is installed
        When the user clicks on the Configure button of Product app
            And click on the Remove button
        Then the Product app should get uninstalled
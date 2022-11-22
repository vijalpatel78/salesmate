@regression_test_setup @regression_test @apps_voice
Feature: Salesmate API

    Every user in Salesmate is provided with a unique API that one can use to integrate their Salesmate account with 
    other applications.

    Background: 
        Given the 'User1' is on Salesmate API page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16891) ----------------------

    Scenario: The product tab should not be displayed when the product app is uninstalled
        When the user 'remove' the Product app from the Setup>Apps page
        Then the product module should not be displayed on the System API page

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16892) ----------------------

    Scenario: the product tab should be displayed only when the product app is installed
        When the user 'install' the Product app from the Setup>Apps page
        Then the product module should be displayed on the System API page
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16893) ----------------------
    
    Scenario: The system should display dynamic module names
        When the user goes on the Setup> System Modules page and verifies the all singular module name
        Then the system should display a singular module name on the System API page
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16894) ----------------------
    
    Scenario: It should redirect to the API page on click of the ‘https://apidocs.salesmate.io/’ link
        When the user click on the api docs link
        Then the system should redirect to the Salesmate API Doc page
    
    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16895) ----------------------
    
    Scenario: It should redirect to the accesskey page on click of the ‘Click here’ link
        When the user click on the Click here link from the Salesmate API page
        Then the system should redirect to the accesskey page
@regression_test_setup @regression_test @apps_voice
Feature: IndiaMart Integration

    With this app, the user can auto-capture lead data from IndiaMART to Salesmate as Contacts and Companies. The admin 
    can install and configure the IndiaMart app and later on, he can remove this integration also.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16552) ----------------------
    
    Scenario: The user is able to install the IndiaMart app
        Given the IndiaMart app is uninstalled
        When the user clicks on the Install button of IndiaMart app
            And Mobile: '+91-8761234309'
            And CRM Key: 'RDGMEM916WJxafRUGgOvd6dVJkeQVM5pCGb6p4oIM&index'
            And Owner: 'User1'
            # We are fetching user name from the excel based on the user number
            And click on the Submit button
        Then the IndiaMart app should get installed with 'Connection done successfully. We will push new leads to Salesmate' message

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16553) ----------------------
    
    Scenario: The user is not able to leave required fields as blank while updating IndiaMart settings
        Given the IndiaMart app is installed
        When the user clicks on the Configure button of IndiaMart app
            And Mobile: ''
            And CRM Key: ''
            And click on the Submit button
        Then the system should give the following validation message 'Mobile is required' and 'CRM Key is required'

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16554) ----------------------
    
    Scenario: The user is able to update the IndiaMart settings
        Given the IndiaMart app is installed
        When the user clicks on the Configure button of IndiaMart app
            And Mobile: '+01-9061234239'
            And CRM Key: 'vF7jjpnteKg&index29&listRDGMEM916WJxa'
            And Owner: 'User2'
            # We are fetching user name from the excel based on the user number
            And click on the Submit button
        Then the IndiaMart app should get updated with 'Connection done successfully. We will push new leads to Salesmate' message

    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16555) ----------------------
    
    Scenario: On click of the ‘IndiaMart help page’ link, the system should redirect to the support page
        Given the IndiaMart app is installed
        When the user clicks on the Configure button of IndiaMart app
            And click on the IndiaMart help page link
        Then the system should redirect to the support page of IndiaMart app

    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16556) ----------------------
    
    Scenario: The user is able to uninstall the IndiaMart app
        Given the IndiaMart app is installed
        When the user clicks on the Configure button of IndiaMart app
            And clicks on the Remove button
        Then the IndiaMart app should get uninstalled
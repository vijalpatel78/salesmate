@regression_test_setup @regression_test @data_administration
Feature: Import Google Contacts

    The Salesmate allows user to import the Google contacts. For that, the user can connect the Google account with the 
    Salesmate and then can select that account for the import.
    
    Background: 
        Given the 'User1' is on Import Google Contacts page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/17432) ----------------------

    Scenario: The dynamic module name should be displayed on the Import Google Contacts page
        When the user goes on the Setup>System Modules page and verifies the contact singular module name
            And the user goes on the Import Google Contacts page
        Then the system should display a singular module name on the Import Google Contacts page
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/17433) ----------------------
    
    Scenario: The user is not able to import Google contacts without selecting Google group
        When the user select 'meghapatel1234.456@gmail.com' Google account
            And without selecting any Google group, click on the Next button
        Then the system should give 'Select at least one group to import contacts.' validation message while Google contacts import
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/17434) ----------------------

    Scenario: The user is able to import the Google contacts 
        When the user select 'meghapatel1234.456@gmail.com' Google account
            And click on the Next button
            And select 'All Contacts (5)' group
            And click on the Next button
            And add 'Newly imported contact' and 'Newly imported company' tags
            And click on the Next button
        Then the 'Your import has started now' message should be displayed
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/17435) ----------------------

    Scenario: The system should display connected Google accounts
        When the user goes on the My Account> Connected Accounts page and verify the number of Google Accounts
            And the users goes on the Setup> Import Google Contacts page
        Then the system should display all connected Google accounts
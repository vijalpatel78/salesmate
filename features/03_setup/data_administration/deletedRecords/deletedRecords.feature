@regression_test_setup @regression_test @data_administration
Feature: Deleted Records

    The records which deleted are kept under the Deleted Records section over a period of 30 days. Later on, the user 
    can restore them or can delete them permanently.

    Background: 
        Given the 'User1' is on Deleted Records page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/17022) ----------------------

    Scenario: The product tab should not be displayed when the product app is uninstalled
        When the user 'remove' the Product app from the Setup>Apps page
            And the user goes on the Deleted Records page
        Then the product module should not be displayed on the Deleted Records page
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/17023) ----------------------

    Scenario: The product tab should be displayed when the product app is installed
        When the user 'install' the Product app from the Setup>Apps page
            And the user goes on the Deleted Records page
        Then the product module should be displayed on the Deleted Records page
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/17024) ----------------------

    Scenario: The system should display dynamic module name
        When the user goes on the Setup>System Modules page and verifies the all singular module name
            And the user goes on the Deleted Records page
        Then the system should display a singular module name on the Deleted Records page
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/17025) ----------------------

    Scenario Outline: It should open the record in detail view on click of the respective module's record link
        Given the '<record>' record from the '<module>' module must be deleted
        When the user goes on the Deleted Records page
            And select '<module>' module
            And click on the '<record>' record
        Then the system should open the record in detail view on click of the respective '<module>' module record link

    Examples:
        | module  | record          |
        | Contact | Auto Contact 01 |
        | Deal    | Auto Deal 01    |

    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/17026) ----------------------

    Scenario Outline: The user is able to restore a specific records
        Given the '<record>' record from the '<module>' module must be deleted
        When the user goes on the Deleted Records page
            And select '<module>' module
            And select '<record>' record
            And click on the Restore button
        Then the '<record>' record of the '<module>' module should get restored
    
    Examples:
        | module  | record          |
        | Contact | Auto Contact 02 |
        | Company | Auto Company 02 |
        | Deal    | Auto Deal 02    |
    
    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/17027) ----------------------
@skip_in_ci
    Scenario Outline: The user is able to restore all records
        Given the records from the '<module>' module must be deleted
        When the user goes on the Deleted Records page
            And select '<module>' module
            And click on the Restore All button
        Then all records of the '<module>' module should get restored
    
    Examples:
        | module  |
        | Contact |
        | Company |
        | Deal    |
    
    #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/17028) ----------------------
    @skip_in_ci
    Scenario Outline: The user is able to delete a specific records
        Given the '<record>' record from the '<module>' module must be deleted
        When the user goes on the Deleted Records page
            And select '<module>' module
            And select '<record>' record
            And click on the Delete button
        Then the '<record>' record of the '<module>' module should get deleted
    
    Examples:
        | module  | record          |
        | Contact | Auto Contact 03 |
        | Company | Auto Company 03 |
        | Deal    | Auto Deal 03    |
    
    #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/17029) ----------------------
    @skip_in_ci
    Scenario Outline: The user is able to delete all records
        Given the records from the '<module>' module must be deleted
        When the user goes on the Deleted Records page
            And select '<module>' module
            And click on the Delete All button
        Then all records of the '<module>' module should get deleted
    
    Examples:
        | module  |
        | Contact |
        | Company |
        | Deal    |
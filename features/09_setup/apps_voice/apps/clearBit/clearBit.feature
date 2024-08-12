@regression_test_setup @regression_test @apps_voice
Feature: ClearBit Integration

    The user can subscribe to changes in contacts’s information. Whenever ClearBit receive updates, they’ll post them 
    to the associated Salesmate account. The user can also use this integration while importing a contact.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16662) ----------------------
    
    Scenario: The user is able to install the ClearBit app
        Given the ClearBit app is uninstalled
        When the user clicks on the Install button of ClearBit app
            And ClearBit API Key: 'sk_454542db088c949965a154dbf3dd0d0028'
            And click on the Save button
        Then the ClearBit app should get installed
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16663) ----------------------
    
    Scenario: The user is not able to leave required fields as blank while updating ClearBit settings
        Given the ClearBit app is installed
        When the user clicks on the Configure button of ClearBit app
            And ClearBit API Key: ''
            And click on the Save button
        Then the system should give the 'This field is required.' validation message for the key field
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16664) ----------------------

    Scenario Outline: The user is able to update the ClearBit settings
        Given the ClearBit app is installed
        When the user clicks on the Configure button of ClearBit app
            And ClearBit API Key: '<key>'
            And Contacts Import: '<contactImportValue>'
            And Google Contacts Import: '<googleContactImportValue>'
            And Auto Subscribe: '<subscribeValue>'
            And click on the Save button
        Then the ClearBit settings should get updated

    Examples:
        | key                                  | contactImportValue | googleContactImportValue | subscribeValue |
        | sk_00042db088c949965a154dbf3dd0d0020 | True               | True                     | True           |
        | sk_12342db088c949965a154dbf3dd0d0TYS | False              | False                    | False          |

    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16665) ----------------------
    
    Scenario: The user is able to uninstall the ClearBit app
        Given the ClearBit app is installed
        When the user clicks on the Configure button of ClearBit app
            And click on the Remove button
        Then the ClearBit app should get uninstalled
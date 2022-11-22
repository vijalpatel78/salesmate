@regression_test_setup @regression_test @account_management
Feature: Manage Currencies

    The user can manage currencies that he wants to use in the records. The user can activate useful currencies 
    or deactivate unnecessary currencies from the predefined currencies list.

    Background: 
        Given the 'User1' is on currencies page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13284) ----------------------
    
    Scenario: The user is able to deactivate all unused currencies
        When the user goes on the 'Active Currencies' tab
            And click on the Deactivate all unused currencies button
        Then the system should deactivate all unused currencies with 'Currencies inactivated successfully' message
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13285) ----------------------
    
    Scenario Outline: The user is able to activate specific inactive currency
        When the user goes on the 'Inactive Currencies' tab
            And click on the Activate button from the '<currencyCode>' currency 
        Then the system should activate '<currencyCode>' currency with 'Currency activated successfully' message
    
    Examples:
        | currencyCode | 
        | VUV          | 
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13286) ----------------------

    Scenario: The user is able to activate all inactive currencies
        When the user goes on the 'Inactive Currencies' tab
            And click on the Activate all currencies button
        Then the system should activate all currencies with 'Currencies activated successfully' message
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13287) ----------------------
    
    Scenario Outline: The user is able to deactivate specific active currency
        When the user goes on the 'Active Currencies' tab
            And click on the Deactivate button from the '<currencyCode>' currency 
        Then the system should deactivate '<currencyCode>' currency with 'Currency inactivated successfully' message
    
    Examples:
        | currencyCode | 
        | VUV          | 
    
    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13288) ----------------------

    Scenario: The user is not able to deactivate used currency
        When the user goes on the 'Active Currencies' tab
            And click on the Deactivate all unused currencies button
            And click on the Deactivate button from the used currency
        Then the system should give 'This currency can\'t be de-activated as it is being used inside the system.' validation message on the currencies page
            And the used currency should not get deactivated
        #When the user goes on the 'Inactive Currencies' tab
        #And the user activate "USD" currency
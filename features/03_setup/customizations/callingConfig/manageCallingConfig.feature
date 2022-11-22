@regression_test_setup @regression_test @customizations
Feature: Manage Calling Configurations

    The Salesmate Calling Configuration allows users to set their IP/Phone vendors. However, Salesmate provides some 
    of the most common syntaxes that might be useful. This feature will only allow the user to initiate quick calls. 
    It will not log any calls automatically. The user can set multiple calling configurations.

    Background:
        Given the 'User1' is on calling configurations page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13907) ----------------------

    Scenario Outline: The user is able to set the single or multiple calling configurations
        When the user enters Provider: '<provider>'
            And enter Syntax: '<syntax>'
            And click on the save button
        Then the calling configurations should get updated with 'Calling Configurations updated successfully' message

    Examples:
        | provider            | syntax                  | 
        | Apple FaceTime Call | facetime://[number]     | 
        | SIP Phone           | sip:[number]@gateway.com|

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13908) ----------------------
    
    Scenario: The user is not able to leave the required fields as blank
        When the user enters Provider: ''
            And enter Syntax: ''
            And click on the save button
        Then the system should give 'Provider is required' validation for the Provider field and 'Syntax is required' validation for the Syntax field
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13909) ----------------------

    Scenario Outline: The user is able to update the calling configuration
        When the user updates Provider: '<provider>'
            And update Syntax: '<syntax>'
            And click on the save button
        Then the calling configurations should get updated with 'Calling Configurations updated successfully' message

    Examples:
        | provider          | syntax                | 
        | SKYPE CALL        | skype:[number]?call   | 
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13910) ----------------------
    
    Scenario: The user is able to remove the calling configuration settings
        When the user clicks on the Remove button
            And click on the save button
        Then the system should remove calling configuration settings 
        When the user clicks on the Remove button
            And click on the save button
        Then the system should remove calling configuration settings 
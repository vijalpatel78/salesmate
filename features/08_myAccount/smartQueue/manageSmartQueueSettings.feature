@regression_test_myAccount @regression_test
Feature: Manage Smart Queue Settings

    Once the user has activities planned for a day, he can start with the activity queue that is a 
    smart queue. He can manage a smart queue through this feature. For now, these settings are only 
    for the call type activities. Through this feature, he can set auto-dial or manual dial as well 
    as can set outgoing ring timeout.

    Background: 
        Given the 'User1' is on smart queue page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/12735) ----------------------
    
    Scenario Outline: The user is able to update smart queue settings
        When the user 'enable' Do you want to auto-dial number for call activities under smart queues? option
            And enter '<validTimerValue>' in the Wait for X seconds before auto dialing the number field
            And enter '<validßRingTimeValue>' in the Manage ring time field
            And click on the Update button
        Then the smart queue settings should get updated

    Examples:
        | validTimerValue | validRingTimeValue |
        | 10              | 25                 |
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/12736) ----------------------

    Scenario Outline: The user is able to enable/disable auto-dial option
        When the user '<enable/disable>' Do you want to auto-dial number for call activities under smart queues? option
            And click on the Update button
        Then the Do you want to auto-dial number for call activities under smart queues? option should get '<enabled/disabled>'
    
    Examples:
        | enable/disable | enabled/disabled |
        | Disable        | Disabled         |
        | Enable         | Enabled          |
        
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/12737) ----------------------
    
    Scenario Outline: The user is not able to leave 'wait for X seconds before auto dialing' and 'manage ring time' fields as blank
        When the user leave 'Wait for X seconds before auto dialing' and 'Manage ring time' fields as blank
            And click on the Update button
        Then the system should give '<timerFieldRequiredValidation>' validation for the 'Wait for X seconds before auto dialing' field and '<ringTimeFieldRequiredValidation>' validation for the 'Manage ring time' field in case of 'Required'
            And the smart queue settings should not get changed

    Examples:
        | timerFieldRequiredValidation                          | ringTimeFieldRequiredValidation   |
        | Please enter waiting time before auto dial in seconds | Please enter ring time in seconds |
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/12738) ----------------------
    
    Scenario Outline: The user is not able to enter less than 5 value for the 'wait for X seconds before auto dialing' and 'manage ring time' fields
        When the user enter '4' in the 'Wait for X seconds before auto dialing the number' field
            And enter '1 Test@' in the 'Manage ring time' field
            And click on the Update button
        Then the system should give '<timerFieldValidation>' validation for the 'Wait for X seconds before auto dialing' field and '<ringTimeFieldValidation>' validation for the 'Manage ring time' field in case of 'less than 5'
            And the smart queue settings should not get changed

    Examples:
        | timerFieldValidation                     | ringTimeFieldValidation                  |
        | Wait time can not be less than 5 seconds | Ring time can not be less than 5 seconds |

    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/12739) ----------------------
    
    Scenario Outline: The user is not able to enter invalid for the 'wait for X seconds before auto dialing' and 'manage ring time' fields
        When the user enter '<invalidData>' in the 'Wait for X seconds before auto dialing the number' field
            And click on the Update button
        Then the system should give '<timerValidation>' validation message in case of '<case>'
        When enter '<invalidData>' in the 'Manage ring time' field
            And click on the Update button
        Then the system should give '<ringTimeValidation>' validation message in case of '<case>'
            And the smart queue settings should not get changed
    
    Examples:
        | case              | invalidData       | timerValidation                                       | ringTimeValidation                        |
        | Invalid Data      | 12.34             | \"auto_dialling_waiting_time\" must be an integer     | \"ringing_time\" must be an integer       |
        | Length Validation | 12345678901234567 | \"auto_dialling_waiting_time\" must be a safe number  | \"ringing_time\" must be a safe number    |

    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/12740) ----------------------
    
    Scenario: The smart queue settings are user wise
        When the 'User2' update smart queue settings from his account
        Then it should not create an impact on the smart queue settings of the 'User1' account
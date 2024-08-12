@regression_test_myAccount @regression_test

Feature: Manage Email Preferences

    Through the email preferences, the user can secure his email conversions, 
    can set default email content style and tracking or can manage email association with deals

    Background:
        Given the 'User1' is on email preferences page
    
    #--------------------------------------- Case:1 (C12397) ---------------------------------------
    
    Scenario Outline: The user is able to set email sharing permissions for all modules
        When the user select '<dealEmailSharingVal>' email sharing permission for the 'Deal' module
            And the user select '<activityEmailSharingVal>' email sharing permission for the 'Activity' module
            And the user select '<contactEmailSharingVal>' email sharing permission for the 'Contact' module
            And click on the Save button
        Then the email sharing permissions should get set for 'all' module

    Examples:
        | dealEmailSharingVal               | activityEmailSharingVal | contactEmailSharingVal |
        | Share with teammates and owner    | Private                 | Public                 |
    
    #--------------------------------------- Case:2 (C12398) ---------------------------------------
    
    Scenario Outline: The user is able to set email sharing permissions for a specific module
        When the user select '<emailSharingVal>' email sharing permission for the '<moduleName>' module
            And click on the Save button
        Then the email sharing permissions should get set for '<moduleName>' module

    Examples:
        | moduleName    | emailSharingVal                | 
        | Activity      | Share with teammates and owner | 

    #--------------------------------------- Case:3 (C12399) ---------------------------------------
    
    Scenario Outline: The user is able to set default font family for the email content
        When the user select '<fontFamilyVal>' font 'family'
        Then the system should set default '<fontFamilyVal>' font 'family' for the email content
    
    Examples:
        | fontFamilyVal | 
        | Georgia       | 
        | Impact        |
    
    #--------------------------------------- Case:4 (C12400) ---------------------------------------

    Scenario Outline: The user is able to set default font size for the email content
        When the user select '<fontSizeVal>' font 'size'
        Then the system should set default '<fontSizeVal>' font 'size' for the email content
    
    Examples:
        | fontSizeVal | 
        | 18          | 
        | 14          |

    #--------------------------------------- Case:5 (C12401) ---------------------------------------
    
    Scenario Outline: The user is able to search font family or font size
        When the user search '<validValue>' from the '<dropdownName>' dropdown
            Then the system should give 'matching records of' '<validValue>' for the '<dropdownName>' dropdown 
        When the user search '<inValidValue>' from the '<dropdownName>' dropdown
            Then the system should give '' 'No results found' for the '<dropdownName>' dropdown 

    Examples:
        |dropdownName | validValue | inValidValue |
        | Font Family | r          | test         |
        | Font Size   | 8          | 111          |
    
    #--------------------------------------- Case:6 (C12402) ---------------------------------------
    
    Scenario Outline: The user is able to change the settings of 'link emails with deals'
        When the user click on the '<optionVal>' option of 'link emails with deals' setting
        Then the system should select '<optionVal>' option of 'link emails with deals' setting

    Examples:
        | optionVal | 
        | Auto      |
        | Manual    | 

    #--------------------------------------- Case:7 (C12403) ---------------------------------------

    Scenario: The system should not show 'Track Email Opens & Clicks by default' option when the email tracking app is not configured
        When the user click on the Setup>Apps
            And the user marks 'Do you want to track your email?' option of the 'Email Open & Click Tracking' app as 'disabled'
        Then the system should 'not display' 'Track Email Opens & Clicks by default' option under the My Account>Email Settings>Email Preferences page
    
    #--------------------------------------- Case:8 (C12404) ---------------------------------------

    Scenario: The system should show 'Track Email Opens & Clicks by default' option when the email tracking app is configured
        When the user click on the Setup>Apps
            And the user marks 'Do you want to track your email?' option of the 'Email Open & Click Tracking' app as 'enabled' 
        Then the system should 'display' 'Track Email Opens & Clicks by default' option under the My Account>Email Settings>Email Preferences page
       
    #--------------------------------------- Case:9 (C12405) ---------------------------------------
    
    Scenario Outline: The user is able to enable/disable 'Track Email Opens & Clicks by default' option
        When the 'Track Email Opens & Clicks by default' option is getting displayed
            And the user '<enable/disable>' 'Track Email Opens & Clicks by default' option
        Then the system should show 'Track Email Opens & Clicks by default' option as '<enabled/disabled>'
    
    Examples:
        | enable/disable    | enabled/disabled  |
        | enable            | enabled           |

    #--------------------------------------- Case:10 (C12406) ---------------------------------------
    
    Scenario: The email preferences settings are user wise
        When the 'User2' update email preferences settings from his account
        Then it should not create an impact on the email preferences settings of the 'User1' account
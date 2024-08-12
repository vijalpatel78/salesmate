@regression_test_setup @regression_test @apps_voice
Feature: Email Tracking Preferences

    With Email Tracking, the user can track all outbound emails and link clicks. The user can enable or disable 
    the email tracking preferences.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16520) ----------------------
    
    Scenario: The user is able to enable the email and link tracking preferences
        When the user clicks on the Configure button of Email Tracking app
            And Email Tracking: 'True'
            And Link Tracking: 'True'
        Then the email and link tracking preferences should get updated

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16521) ----------------------
    
    Scenario: The user is able to disable the email and link tracking preferences
        When the user clicks on the Configure button of Email Tracking app
            And Email Tracking: 'False'
            And Link Tracking: 'False'
        Then the email and link tracking preferences should get updated

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16522) ----------------------
    
    Scenario: The user can be able to update only the email tracking option
        When the user clicks on the Configure button of Email Tracking app
            And Email Tracking: 'True'
        Then the email tracking option should get updated
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16523) ----------------------
    
    Scenario: The user can be able to update only the link tracking option
        When the user clicks on the Configure button of Email Tracking app
            And Link Tracking: 'True'
        Then the link tracking option should get updated
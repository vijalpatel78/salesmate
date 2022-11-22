@regression_test_setup @regression_test @apps_voice
Feature: Google Drive Integration

    With Google Drive integration, the user can quickly upload new files to his drive, or pick and attach them with 
    Salesmate records. The user can select preference for attached Google Drive files in the system.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16514) ----------------------
    
    Scenario: The user is able to install the Google Drive app
        Given the Google Drive app is uninstalled
        When the user clicks on the Install button of Google Drive app
        Then the Google Drive app should get installed

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16515) ----------------------
    
    Scenario: The user is able to change the preferences of Google Drive app
        Given the Google Drive app is installed
        When the user clicks on the Configure button of Google Drive app
            And click on the 'Comment Only' option
            And click on the 'Read Only' option
            And click on the Save button
        Then the preferences of Google Drive app should get updated

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16516) ----------------------

    Scenario: On click of the ‘Google Drive Integration’ link, the system should redirect to the support page
        Given the Google Drive app is installed
        When the user clicks on the Configure button of Google Drive app
            And click on the Google Drive Integration link
        Then the system should redirect to the support page

    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16517) ----------------------
    
    Scenario: The user is able to uninstall the Google Drive app
        Given the Google Drive app is installed
        When the user clicks on the Configure button of Google Drive app
            And click on the Remove button
        Then the Google Drive app should get uninstalled
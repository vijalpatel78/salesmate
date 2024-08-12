@@regression_test_setup @regression_test @apps_voice
Feature: Wufoo Integration 

    This integration between Wufoo and Salesmate enables contacts to be created automatically when a visitor fills 
    in a form on website. Automatically push form submissions from Wufoo as new contacts in Salesmate.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16716) ----------------------
     
    Scenario: The user is able to install the Wufoo app
        Given the Wufoo app is uninstalled
        When the user clicks on the Install button of Wufoo app
        Then the Wufoo app should get installed

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16717) ----------------------
     
    Scenario: The active users should be displayed on the Wufoo Integration page
        Given the user is on the Setup>Users page and verified the active user list
        When the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Wufoo app
        Then the system should display active user list on the Wufoo integration page

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16718) ----------------------
     
    Scenario: The user is able to copy webhook url and webhook handshake key
        Given the Wufoo app is installed
        When the user clicks on the Configure button of Wufoo app
            And click on the webhook url and webhook handshake key
        Then the webhook url and webhook handshake key should get copied

    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16719) ----------------------

    Scenario: It should redirect to the Wufoo page on click of the ‘sign-up for one now at wufoo.com’ link
        Given the Wufoo app is installed
        When the user clicks on the Configure button of Wufoo app
            And click on the sign-up for one now at wufoo.com link
        Then the system should redirect to the Wufoo page

    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16720) ----------------------
    
    Scenario: The user is able to uninstall the Wufoo app
        Given the Wufoo app is installed
        When the user clicks on the Configure button of Wufoo app
            And click on the Remove button
        Then the Wufoo app should get uninstalled
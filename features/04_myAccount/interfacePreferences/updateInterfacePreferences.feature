@regression_test_myAccount @regression_test 

Feature: Interface Preference Feature

Description: In this feature user enable/disable interface preferences and selects themes for salesmate and
             also disable interface preferences for standard profile user.

Background:
    Given the 'User1' is on interface preference page

#---------------------- Case:1,2,3 (http://testrails.rapidops.com/index.php?/cases/view/9817,9818,9819) ----------------------

  Scenario: Verify, user is able to enable contact,company,deal interface preferences
     When Enable contact,company,deal preference option and click on update button
     Then Setting successfully updated message should be displayed and checking values after navigating page

#---------------------- Case:4,5,6 (http://testrails.rapidops.com/index.php?/cases/view/9820,9821,9822) ----------------------

  Scenario: Verify, user is able to disable contact,company,deal interface preferences
    When Disable contact,company,deal preference option and click on update button
    Then Setting successfully updated message should be displayed and checking values after navigating to another page

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/9823) ----------------------

   Scenario: Verify, the user is able to change Salesmate theme
     When Select light theme and verify message and navigate page
     And Select dark theme and verify message and navigate page

#---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/9827) ----------------------

   Scenario: Verify, the interface preferences setting is user wise
     When Verifying changes in 'User1' interface preferences should not affect 'User2'

#---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/9887) ----------------------
@skip_in_ci
   Scenario: Disabling view rights of company,contact or deal
     When 'User1' disabling view rights of company,contact and then contact,company should not be displayed under 'User2'
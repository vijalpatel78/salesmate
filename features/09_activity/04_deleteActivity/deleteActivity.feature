@regression_test_activity @regression_test
Feature: Activity Module > Delete Activity

  Description: In this feature user is able to enable/disable delete deal toggle rights and verify deleted activity
               details

  Background:
    Given 'User1' is on the activity listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C20979) --------------------------

  Scenario: Verify, delete activity button should not be displayed when the user doesn't have delete activity rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Task_delete' through 'User1'
    Then delete activity button is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C20980) --------------------------

  Scenario: Verify, the delete activity button should be displayed only when the user has delete activity rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Task_delete' through 'User1'
    Then delete activity button is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C20981) --------------------------

  Scenario: Verify, the user is able to delete a activity
    When Verify, the user is able to delete a activity and verify 'Activity deleted successfully'
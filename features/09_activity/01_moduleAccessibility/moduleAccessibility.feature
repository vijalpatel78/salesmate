@regression_test_activity @regression_test
Feature: Activity Module > Module Accessibility

  Description: In this feature user is able to enable/disable activity toggle rights and verify activity module dynamic
               singular and plural names

  Background:
    Given 'User1' is on the activity listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22986) --------------------------

  Scenario: As a Admin User, I shouldn't be able to see activity module if I don't have company module view rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Task_access' through 'User1'
    Then activity module is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22985) --------------------------

  Scenario: As a Admin User, I should be able to see activity module if I have company module view rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Task_access' through 'User1'
    Then activity module is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22987) --------------------------

  Scenario: As a User, I should be able to see Company module with updated Company module name given in setup
    When dynamic module name 'Activity' of 'pluralName' should be displayed as 'Activity1'
    Then verification of updated dynamic activity module name 'Activity1'
    Then dynamic module name 'Activity' of 'pluralName' should be displayed as 'Activities'
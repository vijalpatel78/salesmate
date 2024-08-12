@regression_test_deal @regression_test
Feature: Deal Module > Module Accessibility

  Description: In this feature user is able to enable/disable company toggle rights and verify deal module dynamic
               singular and plural names

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22986) --------------------------

  Scenario: As a Admin User, I shouldn't be able to see deal module if I don't have deal module view rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_access' through 'User1'
    Then deal module is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22985) --------------------------

  Scenario: As a Admin User, I should be able to see deal module if I have deal module view rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_access' through 'User1'
    Then deal module is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22987) --------------------------

  Scenario: As a User, I should be able to see Deal module with updated Deal module name given in setup
    When dynamic module name 'Deal' of 'pluralName' should be displayed as 'Deal1'
    Then verification of updated dynamic deal module name 'Deal1'
    Then dynamic module name 'Deal' of 'pluralName' should be displayed as 'Deals'
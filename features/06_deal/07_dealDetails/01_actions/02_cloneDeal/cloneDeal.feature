@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Widgets > Actions > Clone Contact

  Description: In this feature user is able to enable/disable create deal toggle rights and manage cloning of a created
               deal

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26047) --------------------------

  Scenario: Verify, the clone option should be disabled when the user doesn't have deal add rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_add' through 'User1'
    Then clone 'icon-ic_deal' module is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26048) --------------------------

  Scenario: Verify, the clone option should be displayed when the user has add deal rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_add' through 'User1'
    Then clone 'icon-ic_deal' module is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26049) --------------------------

  Scenario: Verify, the user is able to clone the deal details
    When the user is able to clone the deal details and verify 'Deal Created' message
@regression_test_deal @regression_test
Feature: Deal Module > Deal Details > Update Value

  Description: In this feature user is able to update a value of a deal from deal details screen

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26369) --------------------------

  Scenario: Verify, the user is not able to update deal value when he doesn't have update deal rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then user is not able to update deal value from details screen and log in through 'User1'

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26368) --------------------------

  Scenario: Verify, the user is able to update deal value when he has update deal rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_edit' through 'User1'

  Scenario Outline:
    When user is on deals listing page
    Then user is on deal details page
    When user is able to update deal '<Value>' and verify 'Record updated successfully'
      Examples:
        | Value  |
        | -12.34 |
        |        |
        | 5467   |


#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26371) --------------------------

  Scenario: Verify, associated products popup should get opened when any product is associated with deal
    Then user is on deal details page
    When associated products popup should get opened when any product is associated with deal
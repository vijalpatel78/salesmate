@regression_test_deal @regression_test
Feature: Deal Module > Deal Details > Update Deal Lost Reason

  Description: In this feature user is able to update lost reason  of a deal from deal details screen

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26396) --------------------------

  Scenario: Verify, the user is not able to update deal status when he doesn't have deal update rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then deal won or lost option is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26397) --------------------------

  Scenario: Verify, the user is able to lost a deal when he has deal update rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    When user is able to lost a deal
      | Lost Reason      | Price                  |
      | Lost Description | Deal should be failed  |
    When user click on save button
    Then check notification message as 'Record updated successfully'
    Then check deal status and added lost deal note details
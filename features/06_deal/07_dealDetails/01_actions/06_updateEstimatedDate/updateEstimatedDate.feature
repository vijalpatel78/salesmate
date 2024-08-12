@regression_test_deal @regression_test
Feature: Deal Module > Deal Details > Update Estimated Date

  Description: In this feature user is able to update estimated date of a deal from deal details screen

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26376) --------------------------

  Scenario: Verify, the user is unable to update estimated date when user has no update deal rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then user is unable to update estimated date from details screen and log in through 'User1'

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26375) --------------------------

  Scenario: Verify, the user is able to update estimated date when user has update deal rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then user is able to update estimated date and log in through 'User1' and check 'Record updated successfully'
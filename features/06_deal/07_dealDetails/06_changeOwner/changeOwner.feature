@regression_test_deal @regression_test
Feature: Deal Module > Deal Details > Change Owner

  Description: In this feature user is able to change owner from deal details screen

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21681) --------------------------

  Scenario: Verify the user is not able to change deal owner when the user doesn't have deal edit rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then change owner option is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21682) --------------------------

  Scenario: Verify, the user is able to change deal owner
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then 'User1' is able to change owner as 'Priyanka Vlr'
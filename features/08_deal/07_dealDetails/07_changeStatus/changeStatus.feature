@regression_test_deal @regression_test
Feature: Deal Module > Deal Details > Change Status

  Description: In this feature user is able to change status of a deal from deal details screen

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26300) --------------------------

  Scenario: Verify, the user is able to won a deal
    When user is on deal details page
    When user is able to won a deal
      | Won Description | Account research done prior to first call Proposal presented to the decision maker Customer has been qualified for credit and chosen method of paymen Demonstration has been attended by the decision maker Customers business issues have been identified, documented, and agreed to by the decision maker Time frame to make a decision has been identified and agreed to by the customer Customer has agreed that the proposed solution will solve their business issues.|
    When user click on save button
    Then check notification message as 'Record updated successfully'
    Then check deal status and added won deal note details

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26301) --------------------------

  Scenario: Verify, the user is able to lost a deal
    When user is on deal details page
    When user is able to lost a deal
      | Lost Reason      | Price                  |
      | Lost Description | Deal should be failed  |
    When user click on save button
    Then check notification message as 'Record updated successfully'
    Then check deal status and added lost deal note details

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26303) --------------------------

  Scenario: Verify, the user is able to reopen a deal
    When user is on deal details page
    When user is able to reopen a deal
    Then check notification message as 'Record updated successfully'
    Then user is on deals listing page
    Then check deal status as open

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26306) --------------------------

  Scenario: Verify, the user is not able to update deal status when he doesn't have deal update rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then deal won or lost option is not visible and log in through 'User1'
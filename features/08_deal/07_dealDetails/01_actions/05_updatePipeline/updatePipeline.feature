@regression_test_deal @regression_test
Feature: Deal Module > Deal Details > Update Pipeline/Stage

  Description: In this feature user is able to update a pipeline of a deal from deal details screen

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26373) --------------------------

  Scenario: Verify, the user is unable to update deal pipeline and stage when user has no update deal rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then user is unable to update pipeline value from details screen and log in through 'User1'

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26372) --------------------------

  Scenario: Verify, the user is able to update deal pipeline and stage when user has update deal rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_edit' through 'User1'
    Then user is on deals listing page
    Then user is on deal details page
    Then user is able to update pipeline and log in through 'User1' and check 'Record updated successfully'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26374) --------------------------

  Scenario: Verify, the user is able to update a stage
    When user is on deal details page
    Then user is able to update stage and check 'Record updated successfully' message
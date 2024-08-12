@regression_test_deal @regression_test
Feature: Deal Module > Deal Details > Update Win Probability

  Description: In this feature user is able to update estimated date of a deal from deal details screen

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26394) --------------------------

  Scenario: Verify, the user is unable to update win probability when user has no update deal rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    When user is on deals listing page
    When user is on deal details page
    Then user is unable to update win probability from details screen and log in through 'User1'

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26392) --------------------------

  Scenario: Verify, the user is able to update win probability
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_edit' through 'User1'
    When user is on deals listing page
    When user is on deal details page
    When user is able to update win probability and log in through 'User1' and check 'Record updated successfully'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26395) --------------------------

  Scenario: Verify, the system should give validation message on entering invalid win probability
    When user is on deal details page
    Then system should give validation as 'Should be in between 0-100' on entering invalid data as '-70'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26393) --------------------------

  Scenario Outline: Verify, the user is not able to update win probability when win probability setting of pipeline is OFF
    When user is on setup > deal pipeline screen
    When the user clicks on the Edit button from the '<existingPipeline>' pipeline
    And Pipeline: '<newPipeline>'
    And Allow users to set the probability for each deal manually: '<falseValue>'
    And click on the Save button of 'pipeline'
    When user is on deals listing page
    When user is on deal details page
    And user is not able to update win probability when win probability setting of pipeline is OFF
    Examples:
      | existingPipeline   | newPipeline     | falseValue |
      | Sales              | Sales           | False      |
      | test               | test            | False      |
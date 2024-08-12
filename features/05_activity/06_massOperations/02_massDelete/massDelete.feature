@regression_test_activity @regression_test
Feature: Activity Module > Mass Operations > Mass Delete

  Description: In this feature user is able to enable/disable mass delete activity rights and manage mass delete
               operations

  Background:
    Given 'User1' is on the activity listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21102) --------------------------

  Scenario: As a user, Verify that the Delete button should not be displayed on the bulk operation when the user doesn't have a right to Mass Delete Company
    When verifying 'User2' when rights are disabled for right name of '305' through 'User1'
    Then user is on activity listing page
    Then 'Mass Delete Activities' link is not visible and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21103) --------------------------

  Scenario: As a user, I should able to see the 'Mass Delete' option when user has 'Mass Delete Company' right
    When verifying 'User2' when rights are enabled for right name of '305' through 'User1'
    Then user is on activity listing page
    Then 'Mass Delete Activities' link is visible and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21104) --------------------------

  Scenario: As a user, I should be able to delete Companies in bulk from the mass delete Companies page
    When user is able to delete Activities in bulk from the mass delete Activities page and verify 'Deleted successfully.'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21105) --------------------------

  Scenario: As a User, Verify I should be able to display delete button disable if I haven't checked any checkbox
    When user is able to display 'Delete' button as disabled if I have not checked any checkbox under 'Mass Delete Activities' of 'icon-ic_activity' module

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C21106) --------------------------

  Scenario: As a User, Verify upon clicking on cancel button it should terminate delete process
    When user upon clicking on cancel button it should terminate delete process under 'Mass Delete Activities'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C21107) --------------------------

  Scenario: As a User, the system should give me a validation message when any criteria are not selected
    When system should give validation 'Select Search Criteria' when any criteria is not selected under 'Mass Delete Activities'
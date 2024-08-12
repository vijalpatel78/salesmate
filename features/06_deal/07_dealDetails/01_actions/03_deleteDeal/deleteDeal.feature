@regression_test_deal @regression_test
Feature: Deal Module > Delete Deal

  Description: In this feature user is able to enable/disable delete deal toggle rights and verify deleted deal
               details

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C25380) --------------------------

  Scenario: As a user, Verify that If user doesn't have rights to Delete Deal then Delete action should not be displayed on actions
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_delete' through 'User1'
    Then delete deal button is not visible and log in through 'User1'

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25375) --------------------------

  Scenario: Verify, the delete deal button should be displayed only when the user has delete deal rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_delete' through 'User1'
    Then delete deal button is visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25376) --------------------------

  Scenario: As a User, Verify I should be able to Access delete deal option from detail view and from quick view
    When user able to Access delete deal option from detail view and from quick view

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25377) --------------------------

  Scenario: As a User, Verify it should display confirmation message upon clicking on the details page delete deal options
    When verify it should display confirmation message upon clicking on details page delete deal options

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C25378) --------------------------

  Scenario: As a user, Verify upon clicking on 'yes' button it should soft delete deal
    When verify upon clicking on "yes" button it should soft delete the deal and verify 'Deal deleted successfully' message

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C25379) --------------------------

  Scenario: As a user, Verify when I click on the 'No' button it should terminate delete process
    When verify when user click on the "No" button it should terminate delete process
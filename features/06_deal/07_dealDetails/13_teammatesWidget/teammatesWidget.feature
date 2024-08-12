@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Screen > Deal Teammates Widget

  Description: In this feature user is able to update deal teammates widget

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26447) --------------------------

  Scenario: As a User, Verify the UI of 'Teammates' widget
    When user is on deal details page
    Then verify the UI of "Teammates" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26449) --------------------------

  Scenario: As a user, Verify that the user able to add the teammates from the deal details
    When user is on deal details page
    Then verify that the user able to add the teammate as 'Priyanka' from the deal details

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26451) --------------------------

  Scenario: As a user, Verify that Quick view should be open with user details while user clicking to the user name
    When user is on deal details page
    When verify that Quick view should be open with user details while user clicking to the user name

#------------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C26453) -------------------------

  Scenario: As a User, Verify the user should able to change the owner from the teammates widget
    When user is on deal details page
    When verify the user should able to change the owner from the teammates widget

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C26454) --------------------------

  Scenario: As a user, Verify that timeline entry should get updated after assign the deal to other teammates
    When user is on deal details page
    Then verify that timeline entry should get updated after assign the deal to other teammates

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26450) --------------------------

  Scenario: As a User, Verify user able to remove the user by clicking on 'X' button
    When user is on deal details page
    Then verify user able to remove the user by clicking on "X" button
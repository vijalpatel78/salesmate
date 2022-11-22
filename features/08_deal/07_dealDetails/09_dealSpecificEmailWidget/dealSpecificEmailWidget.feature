@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Screen > Deal Specific Email Widget

  Description: In this feature user is able to update deal specific email widget

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26418) --------------------------

  Scenario: As a User i can able to see name of deal specific email widget according to the given name of deal module
    When user is on deal details page
    Then user able to see name of deal specific email widget according to the given name of deal module

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26420) --------------------------

  Scenario: As a User, Verify that user should able to copy the deal specific email address
    When user is on deal details page
    Then user is able to copy the deal specific email address and check message as 'Copied successfully.'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26421) --------------------------

  Scenario: As a user, Verify the deal specific email address should be unique for deal wise
    When user is on deal details page
    Then verify the deal specific email address should be unique for deal wise
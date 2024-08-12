@regression_test_company @regression_test
Feature: Company Module > Company Details > Log Activity

  Description: In this feature user is able to add log activity under company details page

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25121) --------------------------

  Scenario: As a User, Verify the UI of 'Log Activity'
    When user is on company details page
    Then verify UI of "Log Activity" tab

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25122) --------------------------

  Scenario: As a User, Verify that upon clicking on save button user should be able to log any completed activity
    When user is on company details page
    Then verify that upon clicking on Save button user can add log to Activity
      | Activity Type  | Call              |
      | Title          | Voice Call        |
      | Text           | Inbound           |
      | Text Area      | Call Attempt      |
    And check notification message as 'Activity added successfully'
    And verify newly added log activity details on 'icon-ic_company' module

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25123) --------------------------

  Scenario: As a User, Verify Cancel button functionality for Log Activity
    When user is on company details page
    Then enter data in log activity fields
      | Title          | Voice Call        |
      | Text           | Bound Call        |
    Then verify Cancel button functionality for Log Activity

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C25124) --------------------------

  Scenario: As a User, Verify that timeline entry should get updated after adding activity
    When user is on company details page
    Then verify that timeline entry should get updated after adding log activity

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C25125) --------------------------

  Scenario: As a User, Verify validation message for required activity fields
    When user is on company details page
    Then verify log activity with adding blank data
      | Title          |       |
      | Date           |       |
      | Time           |       |
    And check validation message as 'Title is required'
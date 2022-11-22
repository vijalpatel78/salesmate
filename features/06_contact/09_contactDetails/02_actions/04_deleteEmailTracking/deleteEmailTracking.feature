@regression_test_contact @regression_test
Feature: Contact Module > Contact Details Widgets > Actions > Delete Email Tracking Logs

  Description: In this feature user is able to delete email tracking logs under actions of contact module and verify
               deleted notification message

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21678) --------------------------

  Scenario: Verify, the user is able to delete email tracking
    When the user is able to delete email tracking and verify 'Tracking logs deleted successfully.'
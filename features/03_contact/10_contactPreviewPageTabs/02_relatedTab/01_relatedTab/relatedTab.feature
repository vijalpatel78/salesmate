@regression_test_contact @regression_test
Feature: Contact Module > Preview Page > Related Tab

  Description: In this feature user is able to check UI visibility of related tab under preview page

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22651) --------------------------

  Scenario: As a User, Verify the UI of Preview Page > Related tab
    When user is on the contact preview page
    When As a User, Verify the UI of Preview Page > Related tab
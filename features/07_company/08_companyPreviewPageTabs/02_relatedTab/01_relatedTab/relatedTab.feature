@skip_in_ci
Feature: Company Module > Preview Page > Related Tab

  Description: In this feature user is able to check UI visibility of related tab under preview page

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22651) --------------------------

  Scenario: As a User, Verify the UI of Company Preview > Related tab
    When user is on preview page > related tab
    When As a User, Verify the UI of Company Preview Page > Related tab
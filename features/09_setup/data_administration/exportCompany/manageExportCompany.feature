@regression_test_setup @regression_test @data_administration
Feature: Export Company Feature

  Description: In this feature,user will export data of company module and verify fields existence and
               also verifies whether check data displays under select fields and uncheck data not displays
               under select fields and manages all fields data

  Background:
    Given the 'User1' is on export company page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/17408) -----------------------------

  Scenario: Verify, the system should display dynamic module name of company
    When the system should display dynamic module name of company

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/17409) -----------------------------

  Scenario: Verify, the system should display custom view list that displayed on the company list page
    When the system display custom view list that displayed on the company list page

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/17410) -----------------------------

  Scenario: Verify, the user is able to export the company data
    When the user is able to export the company data and verify 'We are preparing your export.'

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/17411) -----------------------------

  Scenario: Verify, the user is able to search the company fields
    When the user is able to search the company fields
      | Existing Search Word      | Name   |
      | Non-Existing Search Word  | xyz    |

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/17412) -----------------------------

  Scenario: Verify, the user is able to manage the fields for the export
    When the user is able to manage the fields for the export company
      | Search Field Data          | Last Modified By |
      | Enabling Last Modified By  | Enable           |
    Then check data 'Last Modified By' should be displayed under selected fields of export company
    When the user is able to manage the fields for export company
      | Search Field Data          | Last Modified By |
      | Disabling Last Modified By | Disable          |
    Then uncheck data 'Last Modified By' should not be displayed under selected fields of export company
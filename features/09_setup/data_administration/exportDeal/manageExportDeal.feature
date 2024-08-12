@regression_test_setup @regression_test @data_administration
Feature: Export Deal Feature

  Description: In this feature,user will export data of deal module verify fields existence and also
               verifies whether check data displays under select fields and uncheck data not displays
               under select fields and manages all fields data

  Background:
    Given the 'User1' is on export deal page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16866) -----------------------------

  Scenario: Verify, the system should display dynamic module name of deal
    When the system should display dynamic module name of deal

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16867) -----------------------------

  Scenario: Verify, the system should display custom view list that displayed on the deal list page
    When the system display custom view list that displayed on the deal list page

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16868) -----------------------------

  Scenario: Verify, the user is able to export the deal data
    When the user is able to export the deal data and verify 'We are preparing your export.'

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16869) -----------------------------

  Scenario: Verify, the user is able to search the deal fields
    When the user is able to search the deal fields
      | Existing Search Word      | Title  |
      | Non-Existing Search Word  | xyz    |

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16870) -----------------------------

  Scenario: Verify, the user is able to manage the fields for the deal
    When the user is able to manage the fields for the deal
      | Search Field Data          | Last Modified By |
      | Enabling Last Modified By  | Enable           |
    Then check data 'Last Modified By' should be displayed under selected fields of export deal
    When the user is able to manage the fields for the export deal
      | Search Field Data          | Last Modified By |
      | Disabling Last Modified By | Disable          |
    Then uncheck data 'Last Modified By' should not be displayed under selected fields of export deal

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/16871) -----------------------------

  Scenario: Verify, the company module name should be displayed on the company and contact fields
    When the company module name should be displayed on the company fields in export deal
      | Search Field Data   | Associated Contacts |
      | Associated Contacts | Enable              |
    Then check data 'Associated Contacts' should be displayed under selected fields in export deal
    When the contact module name should be displayed on the contact fields in export deal
      | Search Field Data  | Last Name  |
      | Last Name          | Enable     |
    Then check data 'Last Name' should be displayed under selected fields division in export deal
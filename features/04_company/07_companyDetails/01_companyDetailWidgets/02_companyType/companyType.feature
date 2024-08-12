@regression_test_company @regression_test
Feature: Company Module > Company Detail View > Company Type

  Description: In this feature user uploads photo and verifies size and type of uploaded image

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21659) --------------------------

  Scenario: Verify user can create/edit/delete a 'Contact Type' from contact detail screen
    When user is on company details screen page > company type
    Then user can create,edit,delete a "Contact Type" of 'Tester' from contact detail screen
    And check notification message as 'Record updated successfully'
    And check details of contact type after navigation
    Then edit contact type as 'Tester01' and verify updated details
    And check notification message as 'Contact type updated successfully.'
    And check details of contact type after navigation
    And cancel updating contact type and verify default page url
    Then delete updated contact type
    And check notification message 'Contact type deleted successfully.'
    And verify non-existence of deleted contact type

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21660) --------------------------
@skip_in_ci
  Scenario: Verify user cannot create/edit/update from contact preview/edit screen
    When user is on company details screen page > company type
    Then it displays contact type dropdown
    Then user is on company listing page
    Then user is on company preview page
    And user can not edit contact type dropdown preview page

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21661) --------------------------

  Scenario: Verify the user can not create the duplicate contact type
    When user is on company details screen page > company type
    Then user can create,edit,delete a "Contact Type" of 'Vendor' from contact detail screen
    And check notification message as "Type already exists with name 'Vendor'. Please provide different type name."
    Then user can not update a duplicate contact type as 'Lead'
    And check notification message as "Type with name 'Lead' already exists."


#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21662) --------------------------

  Scenario: Verify name of contact type reflected in all places after update of contact type
    When name of contact type as 'Customer01' reflected in all places after update of contact type and check 'Contact type updated successfully.'
    When user is on company listing page
    Then verify updated contact type details
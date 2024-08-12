@regression_test_company @regression_test
Feature: Company Module > Company Details View > Actions > Delete Company

  Description: In this feature user is able to enable/disable delete company toggle rights and verify deleted company
               details

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C23443) --------------------------

  Scenario: Verify, delete company button should not be displayed when the user doesn't have delete company rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_delete' through 'User1'
    Then delete company button is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C23444) --------------------------

  Scenario: Verify, the delete company button should be displayed only when the user has delete company rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_delete' through 'User1'
    Then delete company button is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C23445) --------------------------

  Scenario: Verify, the user is able to delete a company
    When get count of companies in listing page
    When user is on company details page > actions > delete company
    Then Verify, user is able to delete a company and verify 'Company deleted successfully'
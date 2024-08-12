@regression_test_company @regression_test
Feature: Company Module > Company Details > Change Owner

  Description: In this feature user is able to change owner of a company

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21681) --------------------------

  Scenario: Verify the user is not able to change company owner when the user doesn't have company edit rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_edit' through 'User1'
    Then user is on company listing page
    Then user is on company details page
    Then change owner option is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21682) --------------------------

  Scenario: Verify, the user is able to change company owner
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_edit' through 'User1'
    Then user is on company listing page
    Then user is on company details page
    Then 'User1' is able to change owner as 'Priyanka Vlr'
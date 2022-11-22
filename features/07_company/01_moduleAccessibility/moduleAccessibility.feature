@regression_test_company @regression_test
Feature: Company Module > Module Accessibility

  Description: In this feature user is able to enable/disable company toggle rights and verify company module dynamic
               singular and plural names

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22986) --------------------------

  Scenario: As a Admin User, I shouldn't be able to see company module if I don't have company module view rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_access' through 'User1'
    Then company module is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22985) --------------------------

  Scenario: As a Admin User, I should be able to see company module if I have company module view rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_access' through 'User1'
    Then company module is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22987) --------------------------

  Scenario: As a User, I should be able to see Company module with updated Company module name given in setup
    When dynamic module name 'Company' of 'pluralName' should be displayed as 'Company1'
    Then verification of updated dynamic company module name 'Company1'
    Then dynamic module name 'Company' of 'pluralName' should be displayed as 'Companies'
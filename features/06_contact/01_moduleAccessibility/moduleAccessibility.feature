@regression_test_contact @regression_test
Feature: Contact Module > Module Accessibility

  Description: In this feature user is able to enable/disable contact toggle rights and verify contact module
               name

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19746) --------------------------

  Scenario: Verify, As a standard profile User I shouldn't be able to see contact module if i don't have contact module view rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_access' through 'User1'
    Then contact module is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19745) --------------------------

  Scenario: Verify, As a Admin User i should be able to see contact module if i have contact module view rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_access' through 'User1'
    Then contact module is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19747) --------------------------

  Scenario: Verify, As a User i should be able to see contact module with updated contact module name given in setup
    When dynamic module name 'Contact' of 'pluralName' should be displayed as 'Contact1'
    Then verification of updated dynamic contact module name 'Contact1'
    Then dynamic module name 'Contact' of 'pluralName' should be displayed as 'Contacts'
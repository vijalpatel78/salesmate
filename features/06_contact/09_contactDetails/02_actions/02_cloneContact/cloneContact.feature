@regression_test_contact @regression_test
Feature: Contact Module > Contact Details Widgets > Actions > Clone Contact

  Description: In this feature user is able to enable/disable create contact toggle rights and manage cloning of a created
               contact

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21675) --------------------------

  Scenario: Verify, the clone option should be disabled when the user doesn't have contact add rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_add' through 'User1'
    Then clone 'icon-ic_contacts' module is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21676) --------------------------

  Scenario: Verify, the clone option should be displayed when the user has add contact rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_add' through 'User1'
    Then clone contact module is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21674) --------------------------

  Scenario: Verify, the user is able to clone the contact details
    When the user is able to clone the contact details and verify 'Contact Created' message
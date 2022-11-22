@regression_test_contact @regression_test
Feature: Contact Module > Mass Operations > Mass Import/Export

  Description: In this feature user is able to enable/disable mass import/export contact rights and manage mass
               import/export operations

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21194) --------------------------

  Scenario: Verify, 'Import from Excel or CSV file' and 'Import Google Contacts' options should not be displayed when the user doesn't have import rights
    When verifying 'User2' when rights are disabled for right name of '005' through 'User1'
    Then user is on contact listing page
    Then 'Import from Excel or CSV file' link is not visible under "Actions" and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21195) --------------------------

  Scenario: Verify, 'Import from Excel or CSV file' and 'Import Google Contacts' options should be display when the user have import rights
    When verifying 'User2' when rights are enabled for right name of '005' through 'User1'
    Then user is on contact listing page
    Then 'Import from Excel or CSV file' link is visible under "Actions" and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21196) --------------------------

  Scenario: Verify, on click of the 'Import from Excel or CSV file' and 'Import Google Contacts' options, the system should redirect to the respective import page
    When on click of 'Import from Excel or CSV file' option,the system should redirect to respective import page
    When on click of 'Import Google Contacts' option,the system should redirect to respective import page of 'icon-ic_contacts'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21197) --------------------------

  Scenario: Verify, 'Export Contact' option should not be displayed when the user doesn't have export rights
    When verifying 'User2' when rights are disabled for right name of '101' through 'User1'
    Then user is on contact listing page
    Then 'Export Contacts' link is not visible under "Actions" and logged in through 'User1'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C21199) --------------------------

  Scenario: Verify, 'Export Contact' option should be displayed when the user have export rights
    When verifying 'User2' when rights are enabled for right name of '101' through 'User1'
    Then user is on contact listing page
    Then 'Export Contacts' link is visible under "Actions" and logged in through 'User1'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C21198) --------------------------

  Scenario: Verify, on click of the 'Export Contact' option, the system should redirect to the export page
    When on click of the 'Export Contacts' option, the system should redirect to the export page
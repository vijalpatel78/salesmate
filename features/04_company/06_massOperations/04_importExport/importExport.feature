@regression_test_company @regression_test
Feature: Company Module > Mass Operations > Mass Import/Export

  Description: In this feature user is able to enable/disable mass import/export company rights and manage mass
               import/export operations

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21194) --------------------------

  Scenario: Verify, 'Import from Excel or CSV file' and 'Import Google Companies' options should not be displayed when the user doesn't have import rights
    When verifying 'User2' when rights are disabled for right name of '005' through 'User1'
    Then user is on company listing page
    Then 'Import from Excel or CSV file' link is not visible under "Actions" and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21195) --------------------------

  Scenario: Verify, 'Import from Excel or CSV file' and 'Import Google Companies' options should be display when the user have import rights
    When verifying 'User2' when rights are enabled for right name of '005' through 'User1'
    Then user is on company listing page
    Then 'Import from Excel or CSV file' link is visible under "Actions" and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21196) --------------------------

  Scenario: Verify, on click of the 'Import from Excel or CSV file' and 'Import Google Companies' options, the system should redirect to the respective import page
    When on click of 'Import from Excel or CSV file' option,the system should redirect to respective import page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21197) --------------------------

  Scenario: Verify, 'Export Company' option should not be displayed when the user doesn't have export rights
    When verifying 'User2' when rights are disabled for right name of '101' through 'User1'
    Then user is on company listing page
    Then 'Export Companies' link is not visible under "Actions" and logged in through 'User1'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C21199) --------------------------

  Scenario: Verify, 'Export Company' option should be displayed when the user have export rights
    When verifying 'User2' when rights are enabled for right name of '101' through 'User1'
    Then user is on company listing page
    Then 'Export Companies' link is visible under "Actions" and logged in through 'User1'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C21198) --------------------------

  Scenario: Verify, on click of the 'Export Company' option, the system should redirect to the export page
    When on click of the 'Export Companies' option, the system should redirect to the export page
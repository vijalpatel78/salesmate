@regression_test_deal @regression_test
Feature: Deal Module > Mass Operations > Mass Import/Export

  Description: In this feature user is able to enable/disable mass import/export deal rights and manage mass
               import/export operations

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25650) --------------------------

  Scenario: Verify, 'Import Deals' option should not be displayed when the user doesn't have import data rights
    When verifying 'User2' when rights are disabled for right name of '005' through 'User1'
    Then user is on deals listing page
    Then 'Import Deals' link is not visible under "Actions" and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25651) --------------------------

  Scenario: Verify, 'Import Deals' option should be display when the user have import data rights
    When verifying 'User2' when rights are enabled for right name of '005' through 'User1'
    Then user is on deals listing page
    Then 'Import Deals' link is visible under "Actions" and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25652) --------------------------

  Scenario: Verify, on click of the 'Import Deals' options, the system should redirect to the respective import page
    When on click of 'Import Deals' option, the system should redirect to respective import page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C25653) --------------------------

  Scenario: Verify, 'Export Deals' option should not be displayed when the user doesn't have export rights
    When verifying 'User2' when rights are disabled for right name of '103' through 'User1'
    Then user is on deals listing page
    Then 'Export Deals' link is not visible under "Actions" and logged in through 'User1'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C25654) --------------------------

  Scenario: Verify, 'Export Deals' option should be displayed when the user have export rights
    When verifying 'User2' when rights are enabled for right name of '103' through 'User1'
    Then user is on deals listing page
    Then 'Export Deals' link is visible under "Actions" and logged in through 'User1'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C25655) --------------------------

  Scenario: Verify, on click of the 'Export Deals' option, the system should redirect to the export page
    When on click of the 'Export Deals' option, the system should redirect to the export page
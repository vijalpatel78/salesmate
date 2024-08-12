@regression_test_deal @regression_test
Feature: Deal Module > Bulk Operations > Bulk Update

  Description: In this feature user is able to enable/disable mass update deal rights and manage update operations

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25394) --------------------------

  Scenario: Verify that User can't able to see Update options on bulk operation when user doesn't have a right to Mass Update Deals
    When verifying 'User2' when rights are disabled for right name of '307' through 'User1'
    Then user is on deals listing page
    Then 'Update' button is not visible and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25392) --------------------------

  Scenario: As a user, I should able to see the 'Update' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '307' through 'User1'
    Then user is on deals listing page
    Then 'Update' button is visible and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25393) --------------------------

  Scenario: As a user, I should be able to Bulk update deals from companies listing screen
    When user is able to Bulk update deals from deals listing screen
      | Select Field01  | Big Integer Field        | 546774                   |
      | Select Field02  | Boolean Field            | Yes                      |
      | Select Field03  | Currency Field           | Indian Rupees            |
      | Select Field04  | Date Field               | Jan 13, 2021             |
      | Select Field05  | Date Time Field          | Apr 24, 2021 07:33 PM    |
      | Select Field06  | Decimal Field            | 7777                     |
      | Select Field07  | Description              | Personal Contact Details |
      | Select Field08  | Estimated Close Date     | Nov 17, 2021             |
      | Select Field09  | Integer Field            | 370                      |
      | Select Field10  | Multi Select Field       | M2                       |
      | Select Field11  | Owner                    | Vijal Patel              |
      | Select Field12  | Percentage Field         | 95                       |
      | Select Field13  | Pipeline                 | Qualified                |
      | Select Field14  | Priority                 | Medium                   |
      | Select Field15  | Select Field             | S3                       |
      | Select Field16  | Source                   | Website                  |
      | Select Field17  | Status                   | Won                      |
      | Select Field18  | Tags                     | Support                  |
      | Select Field19  | Text Area Field          | Contact Details          |
      | Select Field20  | Text Field               | Imported Contact         |
      | Select Field21  | Title                    | Deal                     |
      | Select Field22  | URL Field                | www.support.com          |
      | Select Field23  | Value                    | 540987                   |
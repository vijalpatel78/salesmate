@regression_test_company @regression_test
Feature: Company Module > Bulk Operations > Bulk Update

  Description: In this feature user is able to enable/disable mass update companies rights and manage update operations

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C23468) --------------------------

  Scenario: Verify that User can't able to see Update options on bulk operation when user doesn't have a right to Mass Update Companies
    When verifying 'User2' when rights are disabled for right name of '301' through 'User1'
    Then user is on company listing page
    Then 'Update' button is not visible and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C23469) --------------------------

  Scenario: As a user, I should able to see the 'Update' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '301' through 'User1'
    Then user is on company listing page
    Then 'Update' button is visible and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C23470) --------------------------

  Scenario: As a user, I should be able to Bulk update companies from companies listing screen
    When user is able to Bulk update companies from companies listing screen
      | Select Field01  | Address Line 1           | Bangalore                |
      | Select Field02  | Address Line 2           | Prasanthi Nagar          |
      | Select Field03  | Annual Revenue           | 450000                   |
      | Select Field04  | Big Integer Field        | 546774                   |
      | Select Field05  | Boolean Field            | Yes                      |
      | Select Field06  | City                     | Bangalore                |
      | Select Field07  | Country                  | India                    |
      | Select Field08  | Currency                 | INR - ₹                  |
      | Select Field09  | Currency Field           | Indian Rupees            |
      | Select Field10  | Date Field               | Jan 13, 2021             |
      | Select Field11  | Date Time Field          | Apr 24, 2021 07:33 PM    |
      | Select Field12  | Decimal Field            | 7777                     |
      | Select Field13  | Description              | Personal Contact Details |
      | Select Field14  | Facebook                 | Shanthosh                |
      | Select Field15  | Instagram                | lucky santhu             |
      | Select Field16  | Integer Field            | 370                      |
      | Select Field17  | LinkedIn                 | Santhosh Sandy           |
      | Select Field18  | Multi Select Field       | M2                       |
      | Select Field19  | Name                     | Ketha                    |
      | Select Field20  | Number Of Employees      | 570                      |
      | Select Field21  | Owner                    | Vijal Patel              |
      | Select Field22  | Percentage Field         | 95                       |
      | Select Field23  | Select Field             | S3                       |
      | Select Field24  | Skype                    | Shanthosh K              |
      | Select Field25  | State                    | Karnataka                |
      | Select Field26  | Tags                     | Support                  |
      | Select Field27  | Text Area Field          | Contact Details          |
      | Select Field28  | Text Field               | Imported Contact         |
      | Select Field29  | Twitter                  | Ketha Santhosh           |
      | Select Field30  | Type                     | Customer                 |
      | Select Field31  | URL Field                | www.support.com          |
      | Select Field32  | Website                  | helpdesk                 |
      | Select Field33  | ZipCode                  | 540987                   |
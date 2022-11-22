@regression_test_activity @regression_test
Feature: Activity Module > Bulk Operations > Bulk Update

  Description: In this feature user is able to enable/disable mass update activity rights and manage update operations

  Background:
    Given 'User1' is on the activity listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21003) --------------------------

  Scenario: Verify that User can't able to see Update options on bulk operation when user doesn't have a right to Mass Update Activity
    When verifying 'User2' when rights are disabled for right name of '304' through 'User1'
    Then user is on activity listing page
    Then 'Update' button is not visible and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21004) --------------------------

  Scenario: As a user, I should able to see the 'Update' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '304' through 'User1'
    Then user is on activity listing page
    Then 'Update' button is visible and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21005) --------------------------

  Scenario: As a user, I should be able to Bulk update activities from activities listing screen
    When user is able to Bulk update activities from activities listing screen
      | Select Field01  | Availability             | Bangalore                |
      | Select Field02  | Big Integer Field        | 546774                   |
      | Select Field03  | Boolean Field            | Yes                      |
      | Select Field04  | Company                  | MindBoard                |
      | Select Field05  | Completed                | Yes                      |
      | Select Field06  | Contact                  | INR - ₹                  |
      | Select Field07  | Date Field               | Jan 13, 2021             |
      | Select Field08  | Date Time Field          | Apr 24, 2021 07:33 PM    |
      | Select Field09  | Decimal Field            | 7777                     |
      | Select Field10  | Description              | Personal Contact Details |
      | Select Field11  | Duration                 | No                       |
      | Select Field12  | End Date                 | Feb 11, 2022 06:59 PM    |
      | Select Field13  | Integer Field            | 370                      |
      | Select Field14  | Internal Note            | Data Scientist           |
      | Select Field15  | Location                 | Santhosh                 |
      | Select Field16  | Multi Select Field       | M2                       |
      | Select Field17  | Owner                    | Vijal Patel              |
      | Select Field18  | Percentage Field         | 95                       |
      | Select Field19  | Select Field             | S3                       |
      | Select Field20  | Start Date               | Kalambakkam              |
      | Select Field21  | Tags                     | Support                  |
      | Select Field21  | Text Area Field          | Contact Details          |
      | Select Field22  | Text Field               | Imported Contact         |
      | Select Field23  | Title                    | Asia/Kolkata             |
      | Select Field24  | Type                     | Customer                 |
      | Select Field25  | URL Field                | www.support.com          |
      | Select Field26  | Video Conferencing       | 540987                   |
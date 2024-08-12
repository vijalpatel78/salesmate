@regression_test_product @regression_test
Feature: Product Module > Bulk Operations > Bulk Update

  Description: In this feature user is able to enable/disable mass update products rights and manage update operations

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19377) --------------------------

  Scenario: Verify that User can't able to see Update options on bulk operation when user doesn't have a right to Mass Update Products
    When verifying 'User2' when rights are disabled for right name of '313' through 'User1'
    Then 'Update' button is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19375) --------------------------

  Scenario: As a user, I should able to see the 'Update' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '313' through 'User1'
    Then 'Update' button is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19376) --------------------------

  Scenario: As a user, I should be able to Bulk update products from products listing screen
    When user is able to Bulk update products from products listing screen
      | Select Field01  | Active for Sales       | Yes                      |
      | Select Field02  | Big Int Label          | 67890                    |
      | Select Field03  | Boolean Label          | No                       |
      | Select Field04  | Currency Label         | 37                       |
      | Select Field05  | Date Label             | Jan 13, 2021             |
      | Select Field06  | Date and Time Label    | Apr 24, 2021 07:33 PM    |
      | Select Field07  | Dec Label              | 77                       |
      | Select Field08  | Description            | Pure Platinum Based      |
      | Select Field09  | Int Label              | 50                       |
      | Select Field10  | Multi Select           | M3                       |
      | Select Field11  | Name                   | Ring                     |
      | Select Field12  | Percentage Label       | 95                       |
      | Select Field13  | Select Label           | S2                       |
      | Select Field14  | Tags                   | Jewellery                |
      | Select Field15  | Text Area Label        | Rose Gold Base           |
      | Select Field16  | Text Label             | Platinum                 |
      | Select Field17  | URL Label              | www.platinum.com         |
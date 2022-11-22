@regression_test_product @regression_test
Feature: Product Module > Mass Operations > Mass Update

  Description: In this feature user is able to enable/disable mass update products rights and mass manage update
               operations

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19505) --------------------------

  Scenario: As a User, Verify that User can't able to see Update options on bulk operation when user doesn't have a right to Mass Update Products
    When verifying 'User2' when rights are disabled for right name of '313' through 'User1'
    Then 'Mass Update Products' is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19506) --------------------------

  Scenario: As a user, I should able to see the 'Mass Update' option when user has 'Mass Update Product' right
    When verifying 'User2' when rights are enabled for right name of '313' through 'User1'
    Then 'Mass Update Products' is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19507) --------------------------

  Scenario: As a user, I should be able to update products in bulk from the mass update products page
    When user able to update products in bulk from the mass update products page
      | Select Field01  | Active for Sales       | Yes                      |
      | Select Field02  | Big Int Label          | 773150                   |
      | Select Field03  | Boolean Label          | No                       |
      | Select Field04  | Currency Label         | 52                       |
      | Select Field05  | Date Label             | Feb 07, 2021             |
      | Select Field06  | Date and Time Label    | Aug 27, 2021 03:11 PM    |
      | Select Field07  | Dec Label              | 456                      |
      | Select Field08  | Description            | Pure Gold Based          |
      | Select Field09  | Int Label              | 65                       |
      | Select Field10  | Multi Select           | M3                       |
      | Select Field11  | Name                   | Product3                 |
      | Select Field12  | Percentage Label       | 88                       |
      | Select Field13  | Select Label           | S3                       |
      | Select Field14  | Tags                   | Gadget                   |
      | Select Field15  | Text Area Label        | Guaranteed Gold Base     |
      | Select Field16  | Text Label             | Fastrack                 |
      | Select Field17  | URL Label              | www.watchDetails.com     |

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C19511) --------------------------

  Scenario: As a User, Verify I should be able to display update button disable if I haven't checked any checkbox
    When system should display 'Update' button as disabled if user have not checked any checkbox

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C19512) --------------------------

  Scenario: As a User, Verify upon clicking on cancel button it should terminate update process
    When user clicks on cancel button it should terminate update process

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C19513) --------------------------

  Scenario: As a User, the system should give me a validation message when any criteria are not selected
    When system should give a validation 'Select Search Criteria' when any criteria is not selected
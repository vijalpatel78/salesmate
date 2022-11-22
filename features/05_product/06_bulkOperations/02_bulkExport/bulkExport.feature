@regression_test_product @regression_test
Feature: Product Module > Bulk Operations > Bulk Export

  Description: In this feature user is able to verify visibility of export button and user can also be able to
               export products

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19378) --------------------------

  Scenario: As a user, Verify I should able to see 'Export' option on grid header while clicking on available checkbox on products listing screen
    When user is able to see 'Export' option on grid header while clicking on available checkbox on products listing screen

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19379) --------------------------

  Scenario: As a User, Verify that it should allow me to export selected products from the products listing page
    When user is able to export selected products from the products listing page
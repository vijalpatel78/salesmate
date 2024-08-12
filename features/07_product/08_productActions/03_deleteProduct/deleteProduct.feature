@regression_test_product @regression_test
Feature: Product Module > Delete Product Feature

  Description: In this feature user verifies whether product module delete rights are given to user or not and if
               so will add a product and will verify that deleted product details should not exist

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C18892) --------------------------

  Scenario: Verify, the delete product button should not be displayed when the user doesn't have Delete Product rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Product_delete' through 'User1'
    Then delete option is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C18893) --------------------------

  Scenario: Verify, the add product button should be displayed only when the user has Delete Product rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Product_delete' through 'User1'
    Then delete option is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C18894) --------------------------

  Scenario: Verify, the user is able to delete a product
    When user is able to delete a product 'Ring' and verify 'Product deleted successfully' message
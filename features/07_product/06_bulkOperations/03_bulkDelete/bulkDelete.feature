@regression_test_product @regression_test
Feature: Product Module > Bulk Operations > Bulk Delete

  Description: In this feature user is able to enable/disable mass delete products rights and can able to perform delete
               operations on products from product listing page

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19373) --------------------------

  Scenario: As a user, Verify that Delete button should not be displayed on bulk operation when user doesn't have a right to Mass Delete Products
    When verifying 'User2' when rights are disabled for right name of '314' through 'User1'
    Then Bulk 'Delete' button is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19371) --------------------------

  Scenario: As a user, I should able to see the 'Delete' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '314' through 'User1'
    Then Bulk 'Delete' button is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19372) --------------------------

  Scenario: As a user, I should be able to bulk delete products from product listing screen
    When user should be able to bulk delete products from product listing screen and verify 'Product deleted successfully'
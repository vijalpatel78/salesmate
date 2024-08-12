@regression_test_product @regression_test
Feature: Product Module > Manage Prices Feature

  Description: In this feature user verifies whether product module is displayed only when product app is installed
               and verify product module is displayed only when product view rights are given and also verify
               dynamic product module name

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C16677) --------------------------

  Scenario: As a User, Verify the UI of the 'Prices' Tab
    When user verify UI of the 'Price' Tab and visibility of 'Currency','Sale Price' fields and 'Add Price' button

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C16678) --------------------------

  Scenario: Verify, user should be able to 'Add Price' with different currencies from the prices tab
    When user should be able to Add Price with different currencies from the prices tab
     | Sale Price  | 20   |
     | Currency    | USD  |
   And click on Save button and verify 'Created successfully.' message

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C16679) --------------------------

  Scenario: Verify, user should be able to see a list of all prices added in different currencies
    When user should be able to see a list of all prices added in different currencies

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C16680) --------------------------

  Scenario: Verify, user should be able to edit specific currency price
    When user should be able to edit specific currency price
     | Sale Price  | 30   |
     | Currency    | USD  |
    And click on Update button and verify 'Updated successfully.' message and check updated price details

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C16684) --------------------------

  Scenario: Verify, If the user does not have 'Add/Update/Delete' product rights then user should not be able to 'Add/Update/Delete' Prices of Currency
    When user does not have Add,Update,Delete product rights then 'User2' should not be able to Add,Update,Delete Prices of Currency
    And verify validations "You don't have permission to add products price","You don't have permission to edit products price","You don't have permission to delete products price" and switch 'User1'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C16681) --------------------------

  Scenario: Verify, user should be able to delete specific currency price
    When user should be able to delete specific currency price and verify 'Deleted successfully.' message

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C16682) --------------------------

  Scenario: Verify, user should be able to see Active currencies only in currency dropdown
    When user should be able to see Active currencies only in currency dropdown

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C16683) --------------------------

  Scenario: Verify User should not be allowed to add 2 prices for the same product with same currency
    When user should not be allowed to add 2 prices '40' for the same product with same currency and verify 'Price already defined for the selected currency.'
@regression_test_product @regression_test
Feature: Product Module > Manage Variation Feature

  Description: In this feature user verifies whether product module is displayed only when product app is installed
  and verify product module is displayed only when product view rights are given and also verify
  dynamic product module name

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C16689) --------------------------

  Scenario: Verify the UI of the 'Variation' tab
    When Verify UI of the 'Variations' tab and also verify 'Add Variation' button

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C16690) --------------------------

  Scenario: Verify that When No Variation is added to the product then it should display the 'Product doesn't have any variant available' message
    When No 'Variations' is added to the product then it should display the "Product doesn't have any variant available" message

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C16691) --------------------------

  Scenario: Verify user should be able to Add Variation of Product
    When user is able to Add Variation of Product
     | Variation Name  | New_Var  |
     | Sale Price      | 2500     |
     | Currency        | INR      |
     | Active Sales    | Enable   |
    And click on Save button and verify 'Created successfully' variant message

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C16693) --------------------------

  Scenario: Verify user should be able to edit Variation of Product
    When user is able to edit Variation of Product
      | Sale Price      | 3000           |
      | Currency        | USD            |
    And click on Update button and verify 'Updated successfully.' variant update message

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C16692) --------------------------

  Scenario: Verify user should be able to add Multiple prices of Particular Variation
    When user is able to add Multiple prices of Particular Variation
     | Sale Price      | 500     |
     | Currency        | INR     |
    And click on Save button and verify 'Created successfully.' variant add message

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C16698) --------------------------

  Scenario: Verify user is able to see a list of all price added in a different currency for the particular variation
    When user is able to see a list of all price added in a different currency for the particular variation

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C16692) --------------------------

  Scenario: Verify user should be able to edit specific currency price for Particular Variation
    When user should be able to edit specific currency price for Particular Variation
      | Sale Price      | 750     |
      | Currency        | USD     |
    And click on Update button and verify 'Created successfully.' price update message

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C16700) --------------------------

   Scenario: Verify user should not be allowed to add 2 price for the same Variation in same currency
     When user should not be allowed to add 2 price '6' for the same Variation in same currency and verify 'Price already defined for the selected currency.'

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C16693) --------------------------

  Scenario: Verify user should be able to delete specific currency price for Particular Variation
    When user is able to delete specific currency price for Particular Variation and verify 'Deleted successfully.' message


#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C16694) --------------------------

  Scenario: Verify user should be able to delete Variation of Product
    When user is able to delete Variation of Product and verify 'Deleted successfully.' message
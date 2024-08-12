@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Screen > Deal Associated Product Widget

  Description: In this feature user is able to update deal associated product widget

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26439) --------------------------

  Scenario: As a User, Verify the UI of 'Associated Product' widget
    When user is on deal details page
    Then verify the UI of "Associated Product" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26440) --------------------------

  Scenario: As a user, Verify 'No product found' message should be displayed in the associate product widget while if any product does not associate with the deal
    Then 'No products found.' message should be displayed in associate product widget when any product does not associate with deal

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26442) --------------------------

  Scenario: As a User, Verify user able to associate the Product by clicking on 'Add associate Product'
    When user is on deal details page
    Then verify user able to associate Product as 'Test' and check 'Deal Value set successfully'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26443) --------------------------

  Scenario: As a User, Verify that the user able to associate multiple products in a deal
    When user is on deal details page
    When get count of associate products before operation
    When verify that user able to associate multiple products in a deal
      | Product 01  | Sample      |
      | Product 02  | Test        |
    Then verify associated product counts should increase

#------------------------- Case:5,6 (http://testrails.rapidops.com/index.php?/cases/view/C26444,C26445) ---------------------------

  Scenario: As a User, Verify user able to remove the associated product by clicking on the 'delete' icon from the product in the deal dialog
    When user is on deal details page
    When get count of associate products before operation
    When verify user able to remove the product and check 'Deal Value set successfully'
    Then verify associated product counts should decrease

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C26446) --------------------------

  Scenario: As a user, Verify that Quick view should be open with product all details while user clicking to the product name
    When user is on deal details page
    Then verify that Quick view should be open with product all details while user clicking to the product name
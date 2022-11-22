@regression_test_product @regression_test
Feature: Product Module > Mass Operations > Mass Delete

  Description: In this feature user is able to enable/disable mass delete products rights and manage mass delete
               operations

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19508) --------------------------

  Scenario: As a user, Verify that Delete button should not be displayed on bulk operation when user doesn't have a right to Mass Delete Products
    When verifying 'User2' when rights are disabled for right name of '314' through 'User1'
    Then 'Mass Delete Products' option is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19509) --------------------------

  Scenario: As a user, I should able to see 'Mass Delete' option when user has 'Mass Delete Product' right
    When verifying 'User2' when rights are enabled for right name of '314' through 'User1'
    Then 'Mass Delete Products' option is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19510) --------------------------

  Scenario: As a user, I should be able to delete products in bulk from the mass delete products page
    When user is able to delete products 'Product3' in bulk from the mass delete products page and verify 'Record(s) deleted successfully'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C19514) --------------------------

  Scenario: As a User, Verify I should be able to display delete button disable if I haven't checked any checkbox
    When system should display 'Delete' button as disabled if user have not checked any product checkbox

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C19515) --------------------------

  Scenario: As a User, Verify upon clicking on cancel button it should terminate delete process
    When user clicks on cancel button it should terminate delete process

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C19516) --------------------------

  Scenario: As a User, the system should give me a validation message when any criteria are not selected
    When system should give a validation message as 'Select Search Criteria' when any criteria are not selected
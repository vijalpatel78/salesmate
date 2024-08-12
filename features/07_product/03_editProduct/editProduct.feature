@regression_test_product @regression_test
Feature: Product Module > Edit Product Feature

Description: In this feature user verifies whether product module edit rights are given to user or not and if so will
             update a product and will verify updated product details and verify validations for each updated
             product fields

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C18892) --------------------------

  Scenario: Verify, the update product button should not be displayed when the user doesn't have Edit Product rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Product_edit' through 'User1'
    Then Update button should not be displayed and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C18893) --------------------------

  Scenario: Verify, the add product button should be displayed only when the user has Edit Product rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Product_edit' through 'User1'
    When 'Update' button should be displayed and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C18895) --------------------------

  Scenario: Verify, the user is able to update a product with required details only
    When user is able to update a product with required details only
      | Product Name  | Product01            |
      | Text Label    | Sample Product Label |
    And click on the update button and verify 'Updated successfully.' message

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C18896) ---------------------------

  Scenario: Verify, the user is able to update a product with all details
    When user is able to update a product with all details
      | Product Name         | Product02                 |
      | Sku/Code             | Pro77                     |
      | Description          | Product02 Description     |
      | Active State         | Disable                   |
      | Tags                 | Product Support           |
      | Text Label           | Product02 Label           |
      | Text Area Label      | Sample Product02          |
      | Int Label            | 10                        |
      | Dec Label            | 43                        |
      | Date And Time Label  | Feb 02, 2021 07:33 PM     |
      | Date Label           | Apr 24, 2021              |
      | Email Label          | xyzproduct@gmail.com      |
      | Phone Label          | 7890651245                |
      | Select Label         | S1                        |
      | Multi Select Label   | M1                        |
      | URL Label            | http://selenium-info.com  |
      | Big Int Label        | 5689321                   |
      | Percentage Label     | 100                       |
      | Boolean State        | Disable                   |
      | Currency Label       | 4                         |
    And click on the update button and verify 'Updated successfully.' and newly added product details

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C18897) --------------------------

  Scenario: Verify, the user is not able to update a product by leaving required fields blank
    When user is not able to update a product by leaving required fields blank
      | Product Name  |           |
      | Text Label    |           |
    And click on the update button and verify 'Name is required' and 'Text Label is required' validations

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C18898) --------------------------

  Scenario: Verify, the user is not able to update a product with invalid data
    When user is not able to update a product with invalid data
      | Product Name         | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Sku/Code             | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Text Label           | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Int Label            | 1234567891011121          |
      | Dec Label            | 1234567891011121          |
      | Email Label          | xyz                       |
      | Phone Label          | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Big Int Label        | 12345678909876543000      |
      | Percentage Label     | 111                       |
      | Currency Label       | 1234567890987654321       |
    And verify 'Should be maximum 255 characters','Number should be between -999999999999999 to 999999999999999','Number should be between -2147483648 to 2147483647','Email should be valid','Should be in between 0-100' on product update page

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C18899) --------------------------
@skip_in_ci
  Scenario: Verify, the user is not able to update a product with duplicate SKU/Code
    When user is not able to update a product with duplicate SkuCode
      | Product Name  | Product02  |
      | Sku/Code      | 7          |
      | Text Label    | Product    |
    And verify duplicate 'SKU/Code already exist' message on product update page
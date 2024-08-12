@regression_test_product @regression_test
Feature: Product Module > Add Product Feature

Description: In this feature user verifies whether product module add rights are given to user or not and if so will
             add a product and will verify added product details and verify validations for each added product fields

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C18892) --------------------------

  Scenario: Verify, the add product button should not be displayed when the user doesn't have Add Product rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Product_add' through 'User1'
    Then add 'Product' button is not displayed and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C18893) --------------------------

  Scenario: Verify, the add product button should be displayed only when the user has Add Product rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Product_add' through 'User1'
    Then add 'Product' button is displayed and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C18894) --------------------------

  Scenario: Verify, the dynamic module name should be displayed on the button
    When dynamic module name 'Product' of 'singularName' should be displayed as 'Product*'
    Then verification of updated dynamic module name as 'Product*'
    Then dynamic module name 'Product' of 'singularName' should be displayed as 'Product'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C18895) --------------------------

  Scenario: Verify, the user is able to add a product with required details only
    When user is able to add a product with required details only
     | Product Name  | Product1  |
     | Sale Price    | 11        |
     | Text Label    | Product   |
    And click on the save button and verify 'Created successfully.' message

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C18896) ---------------------------

  Scenario: Verify, the user is able to add a product with all details
    When user is able to add a product with all details
      | Product Name         | Product2                  |
      | Sku/Code             | Asdf60                    |
      | Sale Price           | 3                         |
      | Description          | Product Description       |
      | Active State         | Enable                    |
      | Tags                 | Support                   |
      | Text Label           | Product                   |
      | Text Area Label      | Sample Product            |
      | Int Label            | 7                         |
      | Dec Label            | 29                        |
      | Date And Time Label  | Jan 05, 2021 07:33 PM     |
      | Date Label           | Dec 29, 2020              |
      | Email Label          | lucky.priya369@gmail.com  |
      | Phone Label          | 9780345621                |
      | Select Label         | S2                        |
      | Multi Select Label   | M2                        |
      | URL Label            | http://local/host.com     |
      | Big Int Label        | 1234567                   |
      | Percentage Label     | 90                        |
      | Boolean State        | Enable                    |
      | Currency Label       | 5                         |
    And click on the save button and verify newly added product details

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C18897) --------------------------

  Scenario: Verify, the user is not able to add a product by leaving required fields blank
    And click on the save button and verify 'Name is required','Sale Price is required' and 'Text Label is required' validations

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C18898) --------------------------

  Scenario: Verify, the user is not able to add a product with invalid data
    When user is not able to add a product with invalid data
      | Product Name         | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Sku/Code             | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Sale Price           | 1234567891011121          |
      | Text Label           | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Int Label            | 1234567891011121          |
      | Dec Label            | 1234567891011121          |
      | Email Label          | xyz                       |
      | Phone Label          | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Big Int Label        | 12345678909876543000      |
      | Percentage Label     | 111                       |
      | Currency Label       | 1234567890987654321       |
    And verify 'Should be maximum 255 characters','Number should be between -999999999999999 to 999999999999999','Number should be between -2147483648 to 2147483647','Email should be valid','Should be in between 0-100'

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C18899) --------------------------

  Scenario: Verify, the user is not able to add a product with duplicate SKU/Code
    When user is not able to add a product with duplicate SkuCode
      | Product Name  | Product3   |
      | Sku/Code      | Asdf60     |
      | Sale Price    | 11         |
      | Text Label    | Product    |
    And verify duplicate 'SKU/Code already exist' message

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C18900) --------------------------

  Scenario: Verify, the dynamic module name should be displayed on the Add Form
    When dynamic module name 'Product' of 'singularName' should be displayed as 'Product*'
    When dynamic module name should be displayed as 'Product*' on add form
    Then dynamic module name 'Product' of 'singularName' should be displayed as 'Product'

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C18902) -------------------------

  Scenario: Verify, the 'Manage Fields' link should not be displayed when the user doesn't have 'Manage Fields' rights
    When verifying 'User2' when rights are disabled for right name of '406' through 'User1'
    Then "Manage Fields" link should not be displayed and log in through 'User1'

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C18901) -------------------------

  Scenario: Verify, the 'Manage Fields' link should be displayed only when the user has 'Manage Fields' rights
    When verifying 'User2' when rights are enabled for right name of '406' through 'User1'
    Then "Manage Fields" link should be displayed and log in through 'User1'

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C18903) -------------------------

  Scenario: Verify, the user is able to add multiple products at a time
    When user is able to add multiple products at a time
      | Product Name         | Product3                  |
      | Sku/Code             | Psd70                     |
      | Sale Price           | 14                        |
      | Description          | Sample Product            |
      | Active State         | Enable                    |
      | Tags                 | Support                   |
      | Text Label           | Product                   |
      | Text Area Label      | Sample Product            |
      | Int Label            | 7                         |
      | Dec Label            | 30                        |
      | Date And Time Label  | Jan 05, 2021 07:33 PM     |
      | Date Label           | Dec 29, 2020             |
      | Email Label          | lucky.priya369@gmail.com  |
      | Phone Label          | 9780345621                |
      | Select Label         | S2                        |
      | Multi Select Label   | M1                        |
      | URL Label            | http://local/host.com     |
      | Big Int Label        | 1234567                   |
      | Percentage Label     | 87                        |
      | Boolean State        | Enable                    |
      | Currency Label       | 6                         |
    And click on save and add other button and verify 'Created successfully.' message
    When user adds only required fields
      | Product Name  | Product4  |
      | Sale Price    | 7         |
      | Text Label    | Product   |
    And click on the save button and verify add form existence and 'Created successfully.' message

#------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C18904) -------------------------

  Scenario: Verify, the system should display only active currencies in the currency dropdown
    When the system should display only active currencies in the currency dropdown
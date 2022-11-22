@regression_test_product @regression_test
Feature: Product Module Feature

  Description: In this feature user verifies whether product module is displayed only when product app is installed and
               verify product module is displayed only when product view rights are given and also verify dynamic
               product module name

  Background:
    Given the 'User1' is on app page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C18887) --------------------------

  Scenario: Verify, the product module should not be displayed when the app is not installed
    When product module should not be displayed when the app is not installed

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C18888) --------------------------

  Scenario: Verify, the product module should be displayed only when the app is installed
    When product module should be displayed only when the app is installed

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C18889) --------------------------

  Scenario: Verify, the product module should not be displayed when the product view rights are not given
    When verifying 'User2' when rights are disabled for right name of 'switch_Product_access' through 'User1'
    Then product module is not visible and log in into admin user 'User1'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C18890) --------------------------

  Scenario: Verify, the product module should be displayed only when the product view rights are given
    When verifying 'User2' when rights are enabled for right name of 'switch_Product_access' through 'User1'
    When product module is visible and log in into admin user 'User1'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C18891) --------------------------

  Scenario: Verify, the dynamic module name should be displayed
    When dynamic module name 'Product' of 'pluralName' should be displayed as 'Products*'
    Then verification of updated dynamic module name 'Products*'
    Then dynamic module name 'Product' of 'pluralName' should be displayed as 'Products'
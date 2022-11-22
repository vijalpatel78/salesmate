@regression_test_setup @regression_test @customizations
Feature: Tag Management Feature

  Description: In this feature verify that user is able to add update and delete tag and also verify with
  invalid tag data

  Background:
    Given the 'User1' is on tag management page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/14285) ------------------------------------------------

  Scenario Outline: Verify, the user is able to add a new tag
    When the user is able to add new '<tagName>' and navigate to other page and verify updated tag details
    Examples:
      | tagName          |
      | Cus Tag Auto 01  |

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/14286) ------------------------------------------------

  Scenario Outline: Verify, the user is not able to leave the required tag name field as blank while adding a new tag
    When the user is not able to leave required '<tagName>' field as blank and system should give 'Tag name is required'
    Examples:
      | tagName     |
      |             |

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/14287) ------------------------------------------------

  Scenario Outline: Verify, the user is not able to add a duplicate tag
    When the user is not able to add a duplicate tag '<tagName>' and verify 'Tag already exists' message
    Examples:
      | tagName          |
      | Cus Tag Auto 01  |

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/14288) ------------------------------------------------

  Scenario Outline: Verify, the user is not able to add a new tag with more than 100 chars tag name
    When the user is not able to add a new tag with more than 100 chars '<tagName>' and verify 'Max length should be 100' message
    Examples:
      | tagName          |
      | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/14289) ------------------------------------------------

  Scenario Outline: Verify, the user is able to update a tag name
    When the user is able to update a '<tagName>'
    Examples:
      | tagName                 |
      | Cus Tag Auto Updated 01 |

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/14290) ------------------------------------------------

  Scenario Outline: Verify, the user is not able to leave the required tag name field as blank while updating
    When the user is not able to leave required '<tagName>' field as blank while updating and system should give 'Tag name is required'
    Examples:
      | tagName     |
      |             |

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/14291) ------------------------------------------------

  Scenario Outline: Verify, the user is not able to update tag with duplicate name
    When the user is not able to update tag with duplicate '<tagName>' and verify 'Tag already exists' message
    Examples:
      | tagName    |
      | sampleTag  |

#---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/14292) ------------------------------------------------

  Scenario Outline: Verify, the user is not able to update tag with more than 100 chars tag name
    When the user is not able to update tag with more than 100 chars '<tagName>' and verify 'Max length should be 100' message
    Examples:
      | tagName    |
      | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |

#---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/14293) ------------------------------------------------

  Scenario: Verify, the product module name should not be displayed when the product app is uninstalled
    When the product module name should not be displayed when the product app is uninstalled

#---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/14294) ------------------------------------------------

  Scenario: Verify, the product module name is displayed only when the product app is installed
    When the product module name is displayed only when the product app is installed

#---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/14296) ------------------------------------------------

  Scenario: Verify, the singular module name is displayed on the tags list
    When the singular module name is displayed on the tags list

#---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/14295) ------------------------------------------------

  Scenario: Verify, on click of the ‘see associated record’ link, the system should redirect to the respective module
    When click on ‘see associated record’ link, the system should redirect to the respective module

#---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/14296) ------------------------------------------------

  Scenario: Verify, the user is able to delete a tag
    When the user is able to delete a tag
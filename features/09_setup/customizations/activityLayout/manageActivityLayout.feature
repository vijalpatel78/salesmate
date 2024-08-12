@regression_test_setup @regression_test @customizations 
Feature: Activity Layout Feature

  Description: In this feature,user will create and update new section and custom fields and perform
               some operations like drag and drop,expand and collapse,verifying section and custom
               fields with invalid data

  Background:
    Given the 'User1' is on activity page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/15005) -----------------------------

  Scenario: Verify, the system should display a singular module name on the header
    When the system displays a singular module activity on the header

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/15016) -----------------------------

  Scenario: Verify, the user is able to add a new custom field
    When the user is able to add a new custom field in activity module
      | Label Name         | Custom Field 01 |
      | Section Name       | Default         |
      | Required Checkbox  | Enable          |
    And verify 'Created successfully.' successful notification message in activity module

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/15017) -----------------------------

  Scenario: Verify, the user is able to add a select and multi-select type custom fields
    When the user is able to add a select and multi-select type custom fields in activity module
      | Label Name         | Custom Select Field 01    |    |    |
      | Section Name       | Default                   |    |    |
      | List Values        | S1                        | S2 | S3 |
      | Required Checkbox  | Disable                   |    |    |
    And verify 'Created successfully.' notification successful message in activity module

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/15018) -----------------------------

  Scenario: Verify, the user is able to add a lookup type custom fields
    When the user is able to add a lookup type custom fields in activity module
      | Association Type  | Enable                         |
      | Label Name        | Custom Lookup Field 01         |
      | Record Label      | Custom Related Lookup Field 01 |
      | Section Name      | Default                        |
      | Required Checkbox | Disable                        |
    And verify 'Created successfully.' field notification message in activity module

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/15019) -----------------------------

  Scenario: Verify, the user is not able to leave required fields as a blank while adding a new custom field
    When the user is not able to leave required fields as a blank while adding a new custom field in activity module
      | Label Name   |        |
      | Record Label |        |
      | List Value   |        |

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/15020) -----------------------------

  Scenario: Verify, the user is not able to add a new custom field with more than 100 chars label name
    When the user is not able to add a new custom field with more than 100 chars in activity module
      | Label Name   | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
      | Record Label | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/15021) -----------------------------

  Scenario: Verify, the user is able to search a field type while adding a new custom field
    When the user is able to search a field type while adding a new custom field in activity module
      | Existing Search Data     | Text   |
      | Non-Existing Search Data | Abc    |

#---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/15022) -----------------------------

  Scenario: Verify, the user is able to change field type while adding a new custom field
    When the user is able to change field type while adding a new custom field in activity module

#---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/15023) -----------------------------

  Scenario: Verify, the new custom field details should not get changed on selecting the same type again
    When the new custom field details should not get changed on selecting the same type again in activity module
      | Association Type  | Enable                         |
      | Label Name        | Custom Lookup Field 01         |
      | Record Label      | Custom Related Lookup Field 01 |
      | Section Name      | Default                        |
      | Required Checkbox | Enable                         |

#---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/15024) -----------------------------

  Scenario: Verify, the new custom field details should get changed on selecting the different type
    When the new custom field details should get changed on selecting the different type in activity module
      | Association Type  | Enable                         |
      | Label Name        | Custom Lookup Field 01         |
      | Record Label      | Custom Related Lookup Field 01 |
      | Section Name      | Default                        |
      | Required Checkbox | Enable                         |

#---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/15079) -----------------------------

  Scenario: Verify, the user is able to update the custom field label and required settings
    When the user is able to update the custom field label and required settings in activity module
      | Label Name         | Custom Field Updated 01    |
      | Required Checkbox  | Enable                     |
    And verify 'Field updated successfully' successfully notification message in activity module

#---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/15081) -----------------------------

  Scenario: Verify, the user is able to change the label and related record label of custom lookup field
    When the user is able to change the label and related record label of custom lookup field in activity module
      | Label Name     | Custom Lookup Field Updated 01         |
      | Record Label   | Custom Related Lookup Field Updated 01 |
    And verify 'Field updated successfully' field updated notification in activity module

#---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/15121) -----------------------------

  Scenario: Verify, the user is able to manage(add/update/delete/sort) select or multi-select values
    When the user is able to manage select or multi-select values in activity module
      | New List Value    | S4  |
      | Update List Value | S0  |

#---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/15122) -----------------------------

  Scenario: Verify, the user is not able to change the association type of custom lookup field
    When the user is not able to change the association type of custom lookup field in activity module

#---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/15123) -----------------------------

  Scenario: Verify, the user is not able to change section name while updating a custom field
    When the user is not able to change section name while updating a custom field in activity module

#---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/15124) -----------------------------

  Scenario: Verify, the user is not able to leave required fields as a blank while updating a custom field
    When the user is not able to leave label name field as a blank while updating a custom field in activity module
      | Label Name    |       |
    And verify validation 'Please provide label' notification message in activity module
    When the user is not able to leave record label name field as a blank while updating a custom field in activity module
      | Label Name    |       |
      | Record Label  |       |
    And verify validation 'Please provide label' and 'Please provide related record label' message in activity module

#---------------------- Case:17 (http://testrails.rapidops.com/index.php?/cases/view/15125) -----------------------------

  Scenario: Verify, the user is not able to update the custom field with more than 100 chars label name
    When the user is not able to update the custom field with more than 100 chars label name in activity module
      | Label Name    | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
      | Record Label  | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
    And verify 'Should be maximum 100 characters' validation in activity module

#---------------------- Case:18 (http://testrails.rapidops.com/index.php?/cases/view/15127) -----------------------------

  Scenario: Verify, the user is not able to select the same field as a parent and child while creating a map dependency
    When the user is not able to select the same field as a parent and child while creating a map dependency in activity module
      | Parent Field  | Custom Select Field 01  |
      | Child Field   | Custom Select Field 01  |
    And click on next button and verify "Parent Field and Child Field can't be same" validation notification in activity module

#---------------------- Case:19 (http://testrails.rapidops.com/index.php?/cases/view/15128) -----------------------------

  Scenario: Verify, the user is not able to create a map dependency without mapping any value
    When the user is not able to create a map dependency without mapping any value in activity module
      | Parent Field  | Custom Select Field 01  |
      | Child Field   | Multi Select Field      |
    And click on next button and verify 'Select atleast one option to map' validation notification message in activity module

#---------------------- Case:20 (http://testrails.rapidops.com/index.php?/cases/view/15126) -----------------------------

  Scenario: Verify, the user is able to create a map dependency between the select or multi-select fields
    When the user is able to create a map dependency between the select or multi-select fields in activity module
      | Parent Field  | Custom Select Field 01 |
      | Child Field   | Multi Select Field     |
    And click on next button and verify 'Map dependency created successfully' successful message in activity module

#---------------------- Case:21 (http://testrails.rapidops.com/index.php?/cases/view/15129) -----------------------------

  Scenario: Verify, the user is able to update map dependency
    When the user is able to update map dependency and verify 'Map dependency updated successfully' in activity module

#---------------------- Case:22 (http://testrails.rapidops.com/index.php?/cases/view/15130) -----------------------------

  Scenario: Verify, the user is able to delete map dependency
    When the user is able to delete map dependency and verify 'Map dependency deleted successfully' in activity module

#---------------------- Case:23 (http://testrails.rapidops.com/index.php?/cases/view/15131) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to drag and drop fields
    When the user is able to drag and drop fields and verify 'Record updated successfully' in activity module

#---------------------- Case:24 (http://testrails.rapidops.com/index.php?/cases/view/15132) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to deactivate fields by drag and drop
    When the user is able to deactivate field 'Custom Select Field 01' by drag and drop and verify 'Record updated successfully' in activity module

#---------------------- Case:25 (http://testrails.rapidops.com/index.php?/cases/view/15133) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to deactivate fields by clicking on the ‘Move to Inactive Fields’ button
    When the user is able to deactivate 'Custom Select Field 01' by clicking on the 'Move it to Inactive Fields' button and verify 'Record updated successfully' in activity module

#---------------------- Case:26 (http://testrails.rapidops.com/index.php?/cases/view/15134) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to re-activate fields
    When the user is able to re-activate 'Custom Select Field 01' and verify 'Record updated successfully' in activity module

#---------------------- Case:27 (http://testrails.rapidops.com/index.php?/cases/view/15135) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is not able to deactivate required fields by drag and drop
    When the user is not able to deactivate 'Custom Field Updated 01' required fields by drag and drop and verify "Required field can't be inactive" in activity module

#---------------------- Case:28 (http://testrails.rapidops.com/index.php?/cases/view/15136) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is not able to deactivate locked fields by drag and drop
    When the user is not able to deactivate locked fields by drag and drop and verify "Locked field can't be inactive" in activity module

#---------------------- Case:29 (http://testrails.rapidops.com/index.php?/cases/view/15137) -----------------------------

  Scenario: Verify, the user is not able to deactivate required fields by clicking on the ‘Move to Inactive Fields’ button
    When the user is not able to deactivate required fields 'Custom Field Updated 01' by clicking on the 'Move it to Inactive Fields' button and verify "Required field can't be inactive" in activity module
    Then disabling the required checkbox of custom field in activity module
     | Required Checkbox | Disable  |

#---------------------- Case:30 (http://testrails.rapidops.com/index.php?/cases/view/15142) -----------------------------

  Scenario: Verify, the user is able to delete custom fields
    When the user is able to delete 'Custom Field Updated 01','Custom Select Field 01','Custom Lookup Field Updated 01' and verify 'Field deleted successfully' message in activity module
@skip_in_ci
Feature: Contact Layout Feature

  Description: In this feature,user will create and update new section and custom fields and perform
               some operations like drag and drop,expand and collapse,verifying section and custom fields
               with invalid data

  Background:
    Given the 'User1' is on contact page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/15005) -----------------------------

  Scenario: Verify, the system should display a singular module name on the header
    When the system displays a singular module on the header

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/15006) -----------------------------

  Scenario: Verify, the user is able to add a new section
    When user adds a new section with below data:
      | Section Name   | Custom Section 01  |
      | Column Layout  | Two Column         |
    And verify 'Section added successfully' notification message

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/15007) -----------------------------

  Scenario: Verify, the user is not able to leave required fields as a blank while adding a new section
    When the user is not able to leave required fields as a blank while adding a new section
      | Section Name  |           |
    And verify blank validation 'Please provide section name' message

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/15008) -----------------------------

  Scenario: Verify, the user is not able to enter invalid data while adding a new section
    When the user is not able to enter invalid data while adding a new section
      | Section Name  | Custom $ % 12  |
      | Column Layout  | Two Column    |
    And verify invalid validation "The column name provided is not valid. Use alphanumerical characters and special chars(!, @, $, ', ?, /, &, ., - and ())"

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/15009) -----------------------------

  Scenario: Verify, the user is not able to add a new section with more than 100 chars name
    When the user is not able to add a new section with more than 100 chars name
      | Section Name  | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
      | Column Layout | Two Column   |
    And verify exceed length validation 'Column name should not be more than 100 character'

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/15010) -----------------------------

  Scenario: Verify, the user is able to update section
    When the user is able to update section
      | Section Name   | Custom Section Updated 01 |
      | Column Layout  | One Column                |
    And verify updation notification 'Section updated successfully'

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/15011) -----------------------------

  Scenario: Verify, the user is not able to leave required fields as a blank while updating section details
    When the user is not able to leave required fields as a blank while updating section
      | Section Name   |              |
    And verify blank validation 'Please provide section name' message

#---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/15012) -----------------------------

  Scenario: Verify, the user is not able to enter invalid data while updating section details
    When the user is not able to enter invalid data while updating section
      | Section Name   | Custom $ % 12  |
      | Column Layout  | Two Column     |
    And verify invalid validation "The column name provided is not valid. Use alphanumerical characters and special chars(!, @, $, ', ?, /, &, ., - and ())"

#---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/15013) -----------------------------

  Scenario: Verify, the user is not able to update section details with more than 100 chars name
    When the user is not able to update section details with more than 100 chars name
      | Section Name  | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
      | Column Layout | Two Column   |
    And verify exceed length validation 'Column name should not be more than 100 character'

#---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/15014) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to drag and drop section
    When the user is able to drag and drop section and verify 'Record updated successfully' message

#---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/15015) -----------------------------

  Scenario: Verify, the user is able to expand and collapse section
    When the user is able to expand and collapse section

#---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/15016) -----------------------------

  Scenario: Verify, the user is able to add a new custom field
    When the user is able to add a new custom field
      | Label Name         | Custom Field 01           |
      | Section Name       | Custom Section Updated 01 |
      | Required Checkbox  | Enable                    |
    And verify 'Field added successfully' successful message

#---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/15017) -----------------------------

  Scenario: Verify, the user is able to add a select and multi-select type custom fields
    When the user is able to add a select and multi-select type custom fields
      | Label Name         | Custom Select Field 01    |    |    |
      | Section Name       | Custom Section Updated 01 |    |    |
      | List Values        | S1                        | S2 | S3 |
      | Required Checkbox  | Disable                   |    |    |
    And verify successful notification

#---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/15018) -----------------------------

  Scenario: Verify, the user is able to add a lookup type custom fields
    When the user is able to add a lookup type custom fields
      | Association Type  | Enable                         |
      | Label Name        | Custom Lookup Field 01         |
      | Record Label      | Custom Related Lookup Field 01 |
      | Section Name      | Custom Section Updated 01      |
      | Required Checkbox | Disable                        |
    And verify notification

#---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/15019) -----------------------------

  Scenario: Verify, the user is not able to leave required fields as a blank while adding a new custom field
    When the user is not able to leave required fields as a blank while adding a new custom field
      | Label Name   |        |
      | Record Label |        |
      | List Value   |        |

#---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/15020) -----------------------------

  Scenario: Verify, the user is not able to add a new custom field with more than 100 chars label name
    When the user is not able to add a new custom field with more than 100 chars
      | Label Name   | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
      | Record Label | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |

#---------------------- Case:17 (http://testrails.rapidops.com/index.php?/cases/view/15021) -----------------------------

  Scenario: Verify, the user is able to search a field type while adding a new custom field
    When the user is able to search a field type while adding a new custom field
      | Existing Search Data     | Text   |
      | Non-Existing Search Data | Abc    |

#---------------------- Case:18 (http://testrails.rapidops.com/index.php?/cases/view/15022) -----------------------------

  Scenario: Verify, the user is able to change field type while adding a new custom field
    When the user is able to change field type while adding a new custom field

#---------------------- Case:19 (http://testrails.rapidops.com/index.php?/cases/view/15023) -----------------------------

  Scenario: Verify, the new custom field details should not get changed on selecting the same type again
    When the new custom field details should not get changed on selecting the same type again
      | Association Type  | Enable                         |
      | Label Name        | Custom Lookup Field 01         |
      | Record Label      | Custom Related Lookup Field 01 |
      | Section Name      | Custom Section Updated 01      |
      | Required Checkbox | Enable                         |

#---------------------- Case:20 (http://testrails.rapidops.com/index.php?/cases/view/15024) -----------------------------

  Scenario: Verify, the new custom field details should get changed on selecting the different type
    When the new custom field details should get changed on selecting the different type
      | Association Type  | Enable                         |
      | Label Name        | Custom Lookup Field 01         |
      | Record Label      | Custom Related Lookup Field 01 |
      | Section Name      | Custom Section Updated 01      |
      | Required Checkbox | Enable                         |

#---------------------- Case:21 (http://testrails.rapidops.com/index.php?/cases/view/15079) -----------------------------

  Scenario: Verify, the user is able to update the custom field label and required settings
    When the user is able to update the custom field label and required settings
      | Label Name         | Custom Field Updated 01    |
      | Required Checkbox  | Enable                     |
    And verify 'Field updated successfully' successfully notification

#---------------------- Case:22 (http://testrails.rapidops.com/index.php?/cases/view/15081) -----------------------------

  Scenario: Verify, the user is able to change the label and related record label of custom lookup field
    When the user is able to change the label and related record label of custom lookup field
     | Label Name     | Custom Lookup Field Updated 01         |
     | Record Label   | Custom Related Lookup Field Updated 01 |
    And verify 'Field updated successfully' successfully message

#---------------------- Case:23 (http://testrails.rapidops.com/index.php?/cases/view/15121) -----------------------------

  Scenario: Verify, the user is able to manage(add/update/delete/sort) select or multi-select values
    When the user is able to manage select or multi-select values
     | New List Value    | S4  |
     | Update List Value | S0  |

#---------------------- Case:24 (http://testrails.rapidops.com/index.php?/cases/view/15122) -----------------------------

  Scenario: Verify, the user is not able to change the association type of custom lookup field
    When the user is not able to change the association type of custom lookup field

#---------------------- Case:25 (http://testrails.rapidops.com/index.php?/cases/view/15123) -----------------------------

  Scenario: Verify, the user is not able to change section name while updating a custom field
    When the user is not able to change section name while updating a custom field

#---------------------- Case:26 (http://testrails.rapidops.com/index.php?/cases/view/15124) -----------------------------

  Scenario: Verify, the user is not able to leave required fields as a blank while updating a custom field
    When the user is not able to leave label name field as a blank while updating a custom field
     | Label Name    |       |
    And verify validation 'Please provide label'
    When the user is not able to leave record label name field as a blank while updating a custom field
     | Label Name    |       |
     | Record Label  |       |
    And verify validation 'Please provide label' and 'Please provide related record label'

#---------------------- Case:27 (http://testrails.rapidops.com/index.php?/cases/view/15125) -----------------------------

  Scenario: Verify, the user is not able to update the custom field with more than 100 chars label name
    When the user is not able to update the custom field with more than 100 chars label name
     | Label Name    | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
     | Record Label  | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
    And verify validation 'Should be maximum 100 characters' notification

#---------------------- Case:28 (http://testrails.rapidops.com/index.php?/cases/view/15127) -----------------------------

  Scenario: Verify, the user is not able to select the same field as a parent and child while creating a map dependency
    When the user is not able to select the same field as a parent and child while creating a map dependency
     | Parent Field  | Custom Select Field 01  |
     | Child Field   | Custom Select Field 01  |
    And click on next button and verify "Parent Field and Child Field can't be same" validation

#---------------------- Case:29 (http://testrails.rapidops.com/index.php?/cases/view/15128) -----------------------------

  Scenario: Verify, the user is not able to create a map dependency without mapping any value
    When the user is not able to create a map dependency without mapping any value
     | Parent Field  | Custom Select Field 01  |
     | Child Field   | Time Zone               |
    And click on next button and verify 'Select atleast one option to map' validation message

#---------------------- Case:30 (http://testrails.rapidops.com/index.php?/cases/view/15126) -----------------------------

  Scenario: Verify, the user is able to create a map dependency between the select or multi-select fields
    When the user is able to create a map dependency between the select or multi-select fields
     | Parent Field  | Custom Select Field 01 |
     | Child Field   | Time Zone              |
    And click on next button and verify 'Map dependency created successfully' message

#---------------------- Case:31 (http://testrails.rapidops.com/index.php?/cases/view/15129) -----------------------------

  Scenario: Verify, the user is able to update map dependency
    When the user is able to update map dependency and verify 'Map dependency updated successfully'

#---------------------- Case:32 (http://testrails.rapidops.com/index.php?/cases/view/15130) -----------------------------

  Scenario: Verify, the user is able to delete map dependency
    When the user is able to delete map dependency and verify 'Map dependency deleted successfully'

#---------------------- Case:33 (http://testrails.rapidops.com/index.php?/cases/view/15131) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to drag and drop fields
    When the user is able to drag and drop fields and verify 'Record updated successfully'

#---------------------- Case:34 (http://testrails.rapidops.com/index.php?/cases/view/15132) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to deactivate fields by drag and drop
    When the user is able to deactivate field 'Custom Select Field 01' by drag and drop and verify 'Record updated successfully'

#---------------------- Case:35 (http://testrails.rapidops.com/index.php?/cases/view/15133) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to deactivate fields by clicking on the ‘Move to Inactive Fields’ button
    When the user is able to deactivate 'Custom Select Field 01' by clicking on the 'Move it to Inactive Fields' button and verify 'Record updated successfully'

#---------------------- Case:36 (http://testrails.rapidops.com/index.php?/cases/view/15134) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to re-activate fields
    When the user is able to re-activate 'Custom Select Field 01' and verify 'Record updated successfully'

#---------------------- Case:37 (http://testrails.rapidops.com/index.php?/cases/view/15135) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is not able to deactivate required fields by drag and drop
    When the user is not able to deactivate 'Custom Field Updated 01' required fields by drag and drop and verify "Required field can't be inactive"

#---------------------- Case:38 (http://testrails.rapidops.com/index.php?/cases/view/15136) -----------------------------
  @skip_in_ci
  Scenario: Verify, the user is not able to deactivate locked fields by drag and drop
    When the user is not able to deactivate locked fields by drag and drop and verify "Locked field can't be inactive"

#---------------------- Case:39 (http://testrails.rapidops.com/index.php?/cases/view/15137) -----------------------------

  Scenario: Verify, the user is not able to deactivate required fields by clicking on the ‘Move to Inactive Fields’ button
    When the user is not able to deactivate required fields 'Custom Field Updated 01' by clicking on the 'Move it to Inactive Fields' button and verify "Required field can't be inactive"

#---------------------- Case:40 (http://testrails.rapidops.com/index.php?/cases/view/15140) -----------------------------

  Scenario: Verify, the user is not able to delete a section when section contains a required field
    When the user is not able to delete a section 'Custom Section Updated 01' when section contains a required field and verify 'Cannot be deleted because it contain required or locked field(s)'
    And disabling the required checkbox of custom field
     | Required Checkbox | Disable  |

#---------------------- Case:41 (http://testrails.rapidops.com/index.php?/cases/view/15141) -----------------------------

  Scenario: Verify, the user is not able to delete a section when section contains a locked field
    When the user is not able to delete a section 'Default' when section contains a locked field and verify 'Cannot be deleted because it contain required or locked field(s)'

#---------------------- Case:42 (http://testrails.rapidops.com/index.php?/cases/view/15142) -----------------------------

   Scenario: Verify, the user is able to delete custom fields
     When the user is able to delete 'Custom Field Updated 01','Custom Select Field 01','Custom Lookup Field Updated 01' and verify 'Field deleted successfully' message

#---------------------- Case:43 (http://testrails.rapidops.com/index.php?/cases/view/15143) -----------------------------

   Scenario: Verify, the user is able to delete section
     When the user is able to delete section 'Custom Section Updated 01' and verify 'Section deleted successfully'
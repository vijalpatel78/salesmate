@regression_test_setup @regression_test @customizations
Feature: Manage Activity Types

    Salesmate comes with basic activity types viz. Call, Task, Meeting, Demo. The user can create their own activity 
    types and assign an icon to it. Activity Types will be listed based on the order defined in the Activity Type 
    Menu. The user can activate or deactivate an activity type. 

    Background:
        Given the 'User1' is on activity types page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13933) ----------------------

    Scenario: The dynamic module name should be displayed on the activity types page
        When the user goes on the Setup> System Modules page and verifies the singular and plural name of the Activity module
            And the user goes on the Setup> Activity Types page
        Then the system should display the singular and plural name of the Activity module on the Activity Types page

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13934) ----------------------

    Scenario Outline: The user is able to add a new activity type 
        When the user clicks on the Add Activity Type button
            And Name: '<name>'
            And Count as communication: '<communicationValue>'
            And select activity type icon
            And click on the 'Add' Type button
            Then the new activity type should get added with 'Activity type added successfully' message
            And the activity type details should be the same as provided '<name>' on the list page
            And the activity type details should be the same as provided '<name>' and '<communicationValue>' on edit activity type popup

    Examples:
        | name        | communicationValue |
        | Activity01  | True               |

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13935) ----------------------

    Scenario: The user is not able to add a duplicate activity type
        When the user clicks on the Add Activity Type button
            And Name: 'Call'
            And click on the 'Add' Type button
        Then the system should give "It seems you already have 'Call' type of Activity, Try another name here." validation message

    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13936) ----------------------

    Scenario: The user is not able to leave required fields as blank while adding a new activity type
        When the user clicks on the Add Activity Type button
            And Name: ''
            And click on the 'Add' Type button
        Then the 'This field is required.' validation message should be displayed for the Name field

    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13937) ----------------------

    Scenario: The user is not able to add a new activity type with invalid data
        When the user clicks on the Add Activity Type button
            And Name: 'Test / . #'
            And click on the 'Add' Type button
        Then the system should give 'Please provide valid type name. \ / \' , . " are not allowed' validation message for the activity type name
        When the user clicks on the Add Activity Type button
            And Name: 'Computers are used as control systems for a wide variety of industrial and consumer devices This includes simple special purpose devices like microwave ovens and remote controls factory devices such as industrial robots and computer-aided design vijal patel 777123'
            And click on the 'Add' Type button
        Then the 'Should be maximum 255 characters' validation message should be displayed for the Name field
    
    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/13997) ----------------------

    Scenario Outline: The user is able to update activity type
        When the user clicks on the Edit button of existing activity type
            And Name: '<name>'
            And Count as communication: '<communicationValue>'
            And change activity type icon
            And click on the 'Update' Type button
        Then the existing activity type should get updated with 'Activity type updated successfully' message
            And the activity type details should be the same as provided '<name>' on the list page
            And the activity type details should be the same as provided '<name>' and '<communicationValue>' on the edit activity type popup

    Examples:
        | name               | communicationValue   |
        | Presentation Auto  | False                |

    #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/13998) ----------------------

    Scenario: The user is not able to update activity type with a duplicate name
        When the user clicks on the Edit button of existing 'Presentation Auto' activity type
            And Name: 'Call'
            And click on the 'Update' Type button
        Then the system should give "It seems you already have 'Call' type of Activity, Try another name here." validation message
    
    #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/13999) ----------------------

    Scenario: The user is not able to leave required fields as blank while updating an activity type
        When the user clicks on the Edit button of existing 'Presentation Auto' activity type
            And Name: ''
            And click on the 'Update' Type button
        Then the 'This field is required.' validation message should be displayed for the Name field
    
    #---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/14000) ----------------------

    Scenario: The user is not able to update an activity type with invalid data
        When the user clicks on the Edit button of existing 'Presentation Auto' activity type
            And Name: 'Test / . #'
            And click on the 'Update' Type button
        Then the system should give 'Please provide valid name, \ / \' , . " are not allowed' validation message for the activity type name
        When the user clicks on the Edit button of existing 'Presentation Auto' activity type
            And Name: 'Computers are used as control systems for a wide variety of industrial and consumer devices This includes simple special purpose devices like microwave ovens and remote controls factory devices such as industrial robots and computer-aided design vijal patel 777123'
            And click on the 'Update' Type button
        Then the 'Should be maximum 255 characters' validation message should be displayed for the Name field
    
    #---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/14273) ----------------------

    Scenario Outline: The user is able to add activity outcomes
        When the user clicks on the Manage Outcomes button of '<typeName>' activity type
            And Outcome: '<outcome1>'
            And Outcome: '<outcome2>'
            And click on the Save button of outcome
        Then the '<outcome1>' and '<outcome2>' outcomes should get added for the '<typeName>' activity type

    Examples:
        | typeName          | outcome1  | outcome2  | 
        | Presentation Auto | Outcome01 | Outcome02 |
    
    #---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/14274) ----------------------

    Scenario Outline: The user is not able to add an outcome with invalid data
        When the user clicks on the Manage Outcomes button of '<typeName>' activity type
            And Outcome: '<invalidOutcome>'
        Then the system should give '<validationMsg>' validation message for outcomes

    Examples:
        | typeName          | invalidOutcome  | validationMsg                      | 
        | Presentation Auto | Outcome ^ *     | Outcomes should be in alphanumeric |
    
    #---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/14275) ----------------------

    Scenario Outline: The user is not able to add a duplicate outcome
        When the user clicks on the Manage Outcomes button of '<typeName>' activity type
            And Outcome: '<duplicateOutcome>'
            And click on the Save button of outcome
        Then the system should give '<validationMsg>' validation message for outcomes

    Examples:
        | typeName          | duplicateOutcome | validationMsg             | 
        | Presentation Auto | Outcome01        | Duplicate outcomes exists |
    
    #---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/14276) ----------------------

    Scenario Outline: The user is able to update activity outcomes
        When the user clicks on the Manage Outcomes button of '<typeName>' activity type
            And Update '<oldOutcomeVal1>' outcome with '<newOutcomeVal1>'
            And Update '<oldOutcomeVal2>' outcome with '<newOutcomeVal2>'
            And click on the Save button of outcome
        Then the outcomes of '<typeName>' activity type should get updated with '<newOutcomeVal1>' and '<newOutcomeVal2>' outcomes 

    Examples:
        | typeName          | oldOutcomeVal1 | newOutcomeVal1         | oldOutcomeVal2 | newOutcomeVal2         |
        | Presentation Auto | Outcome01      | Updated TypeOutcome 01 | Outcome02      | Updated TypeOutcome 02 |
    
    #---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/14277) ----------------------

    Scenario Outline: The user is not able to update an outcome with invalid data
        When the user clicks on the Manage Outcomes button of '<typeName>' activity type
            And Update '<oldOutcomeVal>' outcome with '<invalidOutcomeVal>'
            And click on the Save button of outcome
        Then the system should give '<validationMsg>' validation message for outcomes

    Examples:
        | typeName          | oldOutcomeVal          | invalidOutcomeVal | validationMsg                      | 
        | Presentation Auto | Updated TypeOutcome 01 | Test #$           | Outcomes should be in alphanumeric |

    #---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/14278) ----------------------

    Scenario Outline: The user is not able to update an outcome with a duplicate name
        When the user clicks on the Manage Outcomes button of '<typeName>' activity type
            And Update '<oldOutcomeVal>' outcome with '<duplicateOutcomeVal>'
            And click on the Save button of outcome
        Then the system should give '<validationMsg>' validation message for outcomes

    Examples:
        | typeName          | oldOutcomeVal          | duplicateOutcomeVal    | validationMsg             | 
        | Presentation Auto | Updated TypeOutcome 01 | Updated TypeOutcome 02 | Duplicate outcomes exists |

    #---------------------- Case:18 (http://testrails.rapidops.com/index.php?/cases/view/14280) ----------------------

    Scenario Outline: The user is able to delete an activity outcomes
        When the user clicks on the Manage Outcomes button of '<typeName>' activity type
            And delete the outcome
            And click on the Save button of outcome
        Then the '<outcome1>' and '<outcome2>' outcomes should be deleted for the '<typeName>' activity type

    Examples:
        | typeName          | outcome1               | outcome2               | 
        | Presentation Auto | Updated TypeOutcome 01 | Updated TypeOutcome 02 |

    #---------------------- Case:19 (http://testrails.rapidops.com/index.php?/cases/view/14281) ----------------------

    Scenario: The 'Edit' and 'Deactivate' button should be displayed as disabled for the ‘Task’ and ‘Call’ activity type
        When the user verifies the Edit and Deactivate button of Task and Call activity type
        Then those buttons should be displayed as disabled
        
    #---------------------- Case:20 (http://testrails.rapidops.com/index.php?/cases/view/14002) ----------------------

    Scenario Outline: The user is able to deactivate the active activity type
        When the user clicks on the Deactivate button of active '<typeName>' activity type
            And click on the Inactive tab
        Then the '<typeName>' activity type should be displayed in the inactive types list

    Examples:
        | typeName          | 
        | Presentation Auto |

    #---------------------- Case:21 (http://testrails.rapidops.com/index.php?/cases/view/14003) ----------------------

    Scenario Outline: The user is able to activate the inactive activity type
        When the user clicks on the Inactive tab
            And click on the Activate button of inactive '<typeName>' activity type
        Then the '<typeName>' activity type should be displayed in the active types list
       
    Examples:
        | typeName          | 
        | Presentation Auto | 
   
    #---------------------- Case:22 (http://testrails.rapidops.com/index.php?/cases/view/14002) ----------------------

    Scenario Outline: Deactivate and rename activity type created through a script
        When the user clicks on the Deactivate button of active '<typeName>' activity type
            And click on the Inactive tab
        Then the '<typeName>' activity type should be displayed in the inactive types list
        When the user clicks on the Edit button of existing '<typeName>' activity type
            And Name: 'random_name'
            And click on the 'Update' Type button
        Then the existing activity type should get updated with 'Activity type updated successfully' message

    Examples:
        | typeName          | 
        | Presentation Auto | 
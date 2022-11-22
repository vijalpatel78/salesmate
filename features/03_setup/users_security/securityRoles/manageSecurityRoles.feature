@regression_test_setup @regression_test @users_security 
Feature: Manage Security Roles

    The user can define organization-wide hierarchy using Roles management. Users at a higher hierarchy can always access all the 
    records of the users at a lower hierarchy. The user can also share data between the same level of hierarchy 
    users by using Share data with peers policy.

    Background: 
        Given the 'User1' is on security roles page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13102) ----------------------
    
    Scenario Outline: The user is able to add a new custom role
        When the user click on the 'Add Role' button from the '<existingRoleName>' role
            And enter Role Name: '<newRoleName>'
            And enter Role Description: '<description>'
            And '<select/unselect>' Share data with peers option
            And click on the Save button
        Then the new role '<newRoleName>' should get added under the '<existingRoleName>' role with all details

    Examples:
        | existingRoleName | newRoleName     | description             | select/unselect |
        | CEO              | Cus_Role_01     | Cus_Role_Description    | select          |

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13103) ----------------------
    
    Scenario Outline: The user is able to leave optional fields as blank while adding a new custom role
        When the user click on the 'Add Role' button from the '<existingRoleName>' role
            And enter Role Name: '<newRoleName>'
            And enter Role Description: ''
            And '<unselect>' Share data with peers option
            And click on the Save button 
        Then the new role '<newRoleName>' should get added under the '<existingRoleName>' role with the required details
    
    Examples:
        | existingRoleName | newRoleName | unselect   |
        | CEO              | Cus_Role_02 | unselect   |

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13104) ----------------------
    
    Scenario Outline: The user is not able to leave required fields as blank while adding a new custom role
        When the user click on the 'Add Role' button from the '<existingRoleName>' role
            And leave '<fieldName>' field as blank
            And click on the Save button 
        Then the system should give '<validationMessage>' validation message for the '<fieldName>' field while 'add role'

    Examples:
        | existingRoleName | fieldName | validationMessage     |
        | CEO              | Role Name | Role name is required |
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13105) ----------------------
    
    Scenario Outline: The user is able to update a custom role 
        Given the '<reportsTo>' role is exist and get the displayed dropdown value of that role
        When the user click on the 'Edit Role' button from the '<existingRoleName>' role
            And enter Role Name: '<roleName>'
            And select Reports To: '<reportsTo>'
            And enter Role Description: '<description>'
            And '<select/unselect>' Share data with peers option
            And click on the Save button
        Then the '<roleName>' role should get updated with all details

    Examples:
        | existingRoleName | roleName            | reportsTo   | description                  | select/unselect |
        | Cus_Role_02      | Cus_Role_Updated_02 | Cus_Role_01 | Cus_Role_Description_Updated | select          |
    
    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13106) ----------------------
    
    Scenario Outline: The user is not able to leave required fields as blank while updating a custom role
        When the user click on the 'Edit Role' button from the '<existingRoleName>' role
            And leave '<fieldName>' field as blank
            And click on the Save button 
        Then the system should give '<validationMessage>' validation message for the '<fieldName>' field while 'edit role'

    Examples:
        | existingRoleName | fieldName | validationMessage     |
        | Cus_Role_01      | Role Name | Role name is required |
    
    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/13107) ----------------------
    
    Scenario Outline: The user is not able to select a child role as 'Reports To' while updating a custom role
        Given the '<childRoleName>' role is exist and get the displayed dropdown value of that role
        When the user click on the 'Edit Role' button from the '<existingRoleName>' role
            And select Reports To: '<childRoleName>'
            And click on the Save button 
        Then the system should give the '<validationMessage>' validation message

    Examples:
        | existingRoleName | childRoleName       | validationMessage     |
        | Cus_Role_01      | Cus_Role_Updated_02 | Role can\'t be assigned has it is already a Parent. |

    #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/13108) ----------------------
    
    Scenario Outline: The user is able to leave optional fields as blank while updating a custom role
        Given the '<reportsTo>' role is exist and get the displayed dropdown value of that role
        When the user click on the 'Edit Role' button from the '<existingRoleName>' role
            And enter Role Name: '<roleName>'
            And select Reports To: '<reportsTo>'
            And enter Role Description: ''
            And '<unselect>' Share data with peers option
            And click on the Save button
        Then the '<roleName>' role should get updated with the required details

    Examples:
        | existingRoleName | roleName            | reportsTo | unselect |
        | Cus_Role_01      | Cus_Role_Updated_01 | CEO       | unselect |
    
    #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/13109) ----------------------
    
    Scenario Outline: The user is not able to delete a custom role with transfer the role to itself
        Given the '<transferTo>' role is exist and get the displayed dropdown value of that role
        When the user click on the 'Delete Role' button from the '<existingRoleName>' role
            And select Transfer To: '<transferTo>'
            And click on the Transfer & Delete button
        Then the system should give the '<validationMessage>' validation message
    
    Examples:
        | existingRoleName    | transferTo          | validationMessage |
        | Cus_Role_Updated_02 | Cus_Role_Updated_02 | Can\'t transfer the role to itself. |

    #---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/13110) ----------------------
    
    Scenario Outline: The user is able to delete a custom role 
        Given the '<transferTo>' role is exist and get the displayed dropdown value of that role
        When the user click on the 'Delete Role' button from the '<existingRoleName>' role
            And select Transfer To: '<transferTo>'
            And click on the Transfer & Delete button
        Then the '<existingRoleName>' role should get deleted
    
    Examples:
        | existingRoleName     | transferTo  | 
        | Cus_Role_Updated_01  | CEO         |
        | Cus_Role_Updated_02  | CEO         |    
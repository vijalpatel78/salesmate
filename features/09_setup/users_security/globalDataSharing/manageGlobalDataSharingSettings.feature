@regression_test_setup @regression_test @users_security
Feature: Manage Global Data Sharing Settings

    The global data sharing policy defines the level of record accessibility. There are three types of access 
    levels to the user: 1) Private: Only the record owner and his/her superior can view the record. 
    2) Public Read only: Everyone can view all records but can't modify or delete them. 3) Public Read/Write: 
    Everyone can view all records with an ability to modify and delete them. Through this feature, the user 
    can set module wise record accessibility.

    Background: 
        Given the 'User1' is on global data sharing policies page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/12850) ----------------------
    
    Scenario Outline: The user is able to set global data sharing policies for all modules
        When the user select '<contactDataSharingVal>' global data sharing policies for the 'Contact' module
            And the user select '<companyDataSharingVal>' global data sharing policies for the 'Company' module
            And the user select '<activityDataSharingVal>' global data sharing policies for the 'Activity' module
            And the user select '<dealDataSharingVal>' global data sharing policies for the 'Deal' module
            And click on the Save button
        Then the global data sharing policies should get set for 'all' module

    Examples:
        | contactDataSharingVal | companyDataSharingVal | activityDataSharingVal | dealDataSharingVal  |
        | Private               | Public Read Only      | Public Read / Write    | Public Read Only    |
        | Private               | Private               | Private                | Private             |
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/12851) ----------------------

    Scenario Outline: The user is able to set global data sharing policies for a specific module
        When the user select '<globalDataSharingVal>' global data sharing policies for the '<moduleName>' module
            And click on the Save button
        Then the global data sharing policies should get set for '<moduleName>' module 

    Examples:
        | moduleName    | globalDataSharingVal           | 
        | Activity      | Public Read Only               | 
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/12852) ----------------------
    
    Scenario: The singular module name should be displayed as dropdown name
        When the user goes on the Setup> System Modules page and verifies the singular module name
            And the user goes on the Setup> Global Data Sharing Policies page and verifies the dropdown name
        Then the system should display a singular module name as the dropdown name
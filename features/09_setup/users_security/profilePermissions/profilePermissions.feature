@regression_test_setup @regression_test @users_security
Feature: Profile Permissions Feature

Description: In this feature user will be able to create new custom profile and can able to manage
             profile by performing operations like updating and deleting.User can't be able to edit
             or delete both admin and standard profile.

Background:
  Given the 'User1' is on profile permissions page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13048) ----------------------

Scenario: Verify, the user is able to create a new custom profile
  When the user creates new profile with the following data:
       | Profile Name        | Cus Profile 01             |
       | Clone Profile       | Standard                   |
       | Profile Description | Custom Profile Description |
     And click on add button
     Then new custom profile should get added

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13049) ----------------------

Scenario: Verify, the user is able to leave optional fields as blank while creating a new custom profile
  When the user creates new profile with profile description as blank:
       | Profile Name        | Cus Profile 02             |
       | Clone Profile       | Admin                      |
       | Profile Description |                            |
     And click on add button
     Then new custom profile with blank profile description should get added

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13050) ----------------------

Scenario Outline: Verify, the user is not able to leave required fields as blank while creating a new custom profile
  When the user creates new profile leaving '<profileName>' field as blank and check '<validationMessage>'
  Examples:
  | profileName  | validationMessage        |
  |              | This field is required.  |

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13051) ----------------------

Scenario: Verify, the user is not able to create a new custom profile with invalid data
  When the user creates new profile with the invalid data:
       | Profile Name        | Test @`%                   |
       | Clone Profile       | Admin                      |
       | Profile Description |                            |
     And click on add button
     Then should get validation message "Profile name provided is not valid. Use alphanumeric characters,space and other special allowed character are !, @, $, ', ?, /, - , &, ., _ and ( )"
  When the user enters exceed length of data:
    | Profile Name        | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna |
    | Clone Profile       | Admin        |
    | Profile Description | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. |
  And click on add button
  Then should get length 'Profile name should be maximum 100 characters' and 'Profile description should be maximum 255 characters' messages

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13052) ----------------------

Scenario Outline: Verify, the user is not able to create a new custom profile with the duplicate profile name
  When the user is creating new profile with '<duplicateProfileName>' and check '<validationMessage>'
  Examples:
  | duplicateProfileName  | validationMessage                     |
  | Admin                 | Profile with same name already exists |

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/13053) ----------------------

Scenario: Verify, all profiles are listed on the clone profile dropdown list
  When the user verifies all profile names in profile list page and in clone profile dropdown

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/13054) ----------------------

Scenario Outline: Verify, the user is not able to leave required fields as blank while updating a custom profile
  When the user leaves '<profileName>' field as blank and check '<validationMessage>'
  Examples:
  | profileName  | validationMessage        |
  |              | This field is required.  |

#---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/13055) ----------------------

Scenario: Verify, the user is not able to update a custom profile with invalid data
  When the user update profile with the invalid data:
    | Profile Name        | Test @`%                   |
    | Profile Description |                            |
     And click on add button
     Then should get validation message "Profile name provided is not valid. Use alphanumeric characters,space and other special allowed character are !, @, $, ', ?, /, - , &, ., _ and ( )"
  When the user enters exceed length of data in edit page:
    | Profile Name        | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna |
    | Profile Description | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. |
  And click on add button
  Then should get length 'Profile name should be maximum 100 characters' and 'Profile description should be maximum 255 characters' messages on edit page

#---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/13056) ----------------------

Scenario Outline: Verify, the user is not able to update a custom profile with the duplicate profile name
  When the user is updating new profile with '<duplicateProfileName>' and check '<validationMessage>'
  Examples:
  | duplicateProfileName  | validationMessage                     |
  | Admin                 | Profile with same name already exists |

#---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/13057) ----------------------

Scenario: Verify, the user is not able to disable all module-level permissions
  When the user is disabling all module-level permissions and check validation message:
    | Contact      | Disable  |
    | Activity     | Disable  |
    | Deal         | Disable  |
    | Product      | Disable  |

#---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/13058) ----------------------

Scenario: Verify, the user is able to enable/disable profile permissions
  When the user enable or disable profile permissions:
    | Contact                       |  Enable    |
    | Activity                      |  Disable   |
    | Deal                          |  Disable   |
    | Import Contact                |  Enable    |
    | Export Contact                |  Enable    |
    | Export Activity               |  Disable   |
    | Export Deal                   |  Enable    |
    | Mass Update Contact           |  Enable    |
    | Mass Delete Contact           |  Disable   |
    | Mass Transfer Contact         |  Enable    |
    | Mass Update Activity          |  Enable    |
    | Mass Delete Activity          |  Enable    |
    | Mass Transfer Activity        |  Disable   |
    | Mass Update Deal              |  Disable   |
    | Mass Delete Deal              |  Enable    |
    | Mass Transfer Deal            |  Enable    |
    | Manage Users                  |  Disable   |
    | Manage Roles                  |  Enable    |
    | Manage Profiles               |  Enable    |
    | Manage Layout                 |  Disable   |
    | Manage Modules                |  Enable    |
    | Manage Organization           |  Disable   |
    | Manage Fields                 |  Enable    |
    | Manage Workflows              |  Disable   |
    | Manage Email Templates        |  Enable    |
    | Manage Reports                |  Enable    |
    | Manage Calling Configurations |  Enable    |
    | Manage Tags                   |  Enable    |
    | Manage Message Templates      |  Disable   |
    | Delete Media Manager Files    |  Enable    |
    | Manage Custom Views           |  Disable   |
    | Merge Contacts                |  Enable    |
    | Upload File                   |  Enable    |
    | View File                     |  Enable    |
    | Delete File                   |  Enable    |
    | Create Dashboard              |  Enable    |
    | Manage Dashboard              |  Disable   |
    | Create Reports                |  Enable    |
    | Schedule                      |  Enable    |
    | Export Reports                |  Disable   |

#---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/13059) ----------------------

Scenario: Verify, the user is able to leave optional fields as blank while updating a custom profile
  When the user updates profile description field as blank and verify after navigation
    | Profile Description |            |
  Then new custom profile with blank profile description should get updated

#---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/13060) ----------------------

Scenario: Verify, the user is able to update a custom profile
  When the user updates a custom profile with following data:
    | Profile Name         | Cus Profile Updated 01                 |
    | Profile Description  | Custom Profile Description Updated...  |
  Then navigate to other page and verify updated profile in listing and edit page

#---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/13061) ----------------------

Scenario: Verify, the user is able to delete a custom profile
  When the user is able to delete a custom profile

#---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/13062) ----------------------

Scenario Outline: Verify, the user is not able to delete a custom profile when it is associated with the user
  When the user delete a custom profile when it is associated with the user and verify '<promptMessage>'
Examples:
  | promptMessage  |
  | There are users who has been assigned this profile, so you cannot delete it |

#---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/13063) ----------------------

Scenario: Verify, the user is not able to edit or delete Admin profile
  When the user is not able to edit or delete admin profile
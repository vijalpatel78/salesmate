@regression_test_myAccount @regression_test

Feature: Calender Sync Feature

Description: In this feature user will be able to start calender sync feature and will perform some validations
             on fields and also able to verify default setting values and can unsync all/some activities and
             also able to stop calender sync feature.

  Background:
    Given the 'User1' is on calender sync page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/12325) ----------------------

  Scenario: Verify connected account in calender sync page should be displayed in connected accounts page
    When Select connected account in calender sync page and verify that accounts with connected account page

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/12326) ----------------------

  Scenario: Verify events will appear in salesmate dropdown
    When Click on events will appear in salesmate dropdown and check with setup>Activity types

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/12327) ----------------------

  Scenario: Verify user is able to start a calender sync
    When the user selecting all fields in calender sync page>click on update button>calender sync starts:
    | Connected Account          | vijal.patel123456@gmail.com                         |
    | Sync Calender              | vijal.patel123456@gmail.com                         |
    | Events                     | Task                                                |
    | Call                       | Enable                                              |
    | Notification Type          | Email                                               |
    | Notification Time          | 30                                                  |
    | Notification Time Unit     | minutes                                             |
    | Task                       | Enable                                              |
    | Meeting                    | Enable                                              |
    | Demo                       | Enable                                              |
    | Sync All Events            | Enable                                              |

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/12329) ----------------------

  Scenario: Verify user is able to update a calender sync
    When the user selecting all fields>click on update button>calender sync starts:
      | Connected Account          | meghapatel1234.456@gmail.com                        |
      | Sync Calender              | meghapatel1234.456@gmail.com                        |
      | Events                     | Demo                                                |
      | Call                       | Enable                                              |
      | Notification Type          | Email                                               |
      | Notification Time          | 30                                                  |
      | Notification Time Unit     | minutes                                             |
      | Task                       | Enable                                              |
      | Meeting                    | Enable                                              |
      | Demo                       | Enable                                              |
      | Sync All Events            | Enable                                              |

#---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/12333) ----------------------

  Scenario: User is able to sync all or some activity types
    When User is able to sync all or some activity types
    | Call        | Enable      |
    | Task        | Enable      |
    | Meeting     | Enable      |
    | Demo        | Disable     |

#---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/12334) ----------------------
@skip_in_ci
  Scenario: Verify default notification settings for activity type
    When Verify default notification settings like 'Popup' '30' and 'minutes' for activity type

#---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/12335) ----------------------

  Scenario: Verify, the user is able to set notifications for synced activities type
    When the user set notifications for synced activities type:
      | Call Activity                | Enable    |
      | Call Activity Type           | Email     |
      | Call Activity Duration       | 1         |
      | Call Activity Time Type      | days      |
      | Task Activity                | Enable    |
      | Task Activity Type           | Email     |
      | Task Activity Duration       | 2         |
      | Task Activity Time Type      | hours     |
      | Meeting Activity             | Enable    |
      | Meeting Activity Type        | Email     |
      | Meeting Activity Duration    | 15        |
      | Meeting Activity Time Type   | minutes   |
      | Demo Activity                | Enable    |
    And click on update button and navigate to other page and verify saved details

#---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/12336) ----------------------

  Scenario: Leave duration field of notification setting as blank
    When Leave duration field as blank and verify default notification time should be '30'

#---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/12337) ----------------------

   Scenario Outline: User is not able to enter invalid duration in notification settings
     When User enters '<invalidDuration>' and it popups an '<validationMessage>' and verify default notification time '30'
     Examples:
       | invalidDuration | validationMessage                |
       | Test#           | Duration should be valid number  |

#---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/12338) ----------------------

   Scenario: User able to remove notification for synced activity type
     When User able to remove notification for synced activity type

#---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/12339) ----------------------

   Scenario: Notification default settings should not get changed on re-syncing activity type
     When Check and uncheck activity type and verify default notification settings

#---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/12340) ----------------------

  Scenario: User is able to unsync all or some activity types
    When User is able to unsync all or some activity types
      | Call        | Disable     |
      | Task        | Disable     |
      | Meeting     | Disable     |
      | Demo        | Disable     |

#---------------------- Case:17 (http://testrails.rapidops.com/index.php?/cases/view/12341) ----------------------

   Scenario: Verify user is unable to set notifications for unsynced activities
     When Verify user is unable to set notifications for unsynced activities

#---------------------- Case:18 (http://testrails.rapidops.com/index.php?/cases/view/12342) ----------------------

   Scenario: Verify, the user is able to set two-way calendar sync
     When User able to set two-way calender sync

#---------------------- Case:19 (http://testrails.rapidops.com/index.php?/cases/view/12343) ----------------------

   Scenario: Verify, the user is able to set one-way calendar sync
     When User able to set one-way calender sync

#---------------------- Case:20 (http://testrails.rapidops.com/index.php?/cases/view/12344) ----------------------

   Scenario: User able to stop calender sync
    When User able to stop calender sync
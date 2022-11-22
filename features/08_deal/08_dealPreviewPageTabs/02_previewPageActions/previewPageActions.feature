@regression_test_deal @regression_test
Feature: Deal Module > Preview Page > Actions

  Description: In this feature user is able to check the deal preview actions, able to post a note, add a new activity, add a new file, clone
               the deal and delete the deal options

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C27003) --------------------------

  Scenario: As a User, Verify the UI of Deal Preview > Actions
    When user is on deal preview page
    Then verify the UI of Deal Preview > Actions
    When user closes quick view page

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C27004) --------------------------

  Scenario: As a User, Verify I should be able to post a note
    When user is on deal preview page
    When user is on 'Add Note' screen
    When it should display success message 'Note added successfully' upon clicking on save button after adding note 'Test'
    When user closes quick view page

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C27005) --------------------------

  Scenario: As a User, Verify that I can be able to Add new Activity from the 'Add Activity' option of deal preview action
    When user is on deal preview page
    When user is on 'Add Activity' screen
    Then verify that upon clicking on Save button user can add new Activity
      | Activity Type  | Call              |
      | Title          | Inbound Call      |
      | Text           | Activity          |
      | Text Area      | Company Activity  |
    And check notification message as 'Created successfully.'
    Then user closes quick view page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C27006) --------------------------

  Scenario: As a User, Verify that I can be able to Add File from Add File option of deal preview action
    When user is on deal preview page
    When user is on 'Add File' screen
    When user is able to add a file 'datetime.csv' and verify 'File(s) uploaded successfully'
    Then user closes quick view page

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C27008) --------------------------

  Scenario: As a User, Verify that I should be able to Clone the deal from the Clone option of deal preview action
    When the user is able to clone deal details and verify 'Created successfully.' message

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C27010) --------------------------

  Scenario: As a User, Verify that I should be able to Delete deal from the Delete option of the action menu of preview
    When get count of deals
    When user is on deal preview page
    When user is on 'Delete' screen
    Then clicking on "yes" button it should soft delete deal and verify 'Deleted successfully.' message
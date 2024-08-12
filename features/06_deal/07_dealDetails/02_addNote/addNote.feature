@regression_test_deal @regression_test
Feature: Deal Module > Deal Detail View > Add Note

  Description: In this feature user is able to add note from deal details view page and update note and can able to
               delete note and can manage other actions of note

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21266) --------------------------

  Scenario: As a User, Verify that user should be able to add the note with the CK editor functionality
    When user is on deal details page
    When user is able to add note with the CK editor
      | Bold                      |                           | Text in the bold format    |
      | Italic                    |                           | Text in the italic format  |
      | Underline                 |                           | Text with underline        |
      | Insert Link               | https://www.rapidops.com  | Rapidops Inc.              |
      | Font Family               | Impact                    | Text in a different font   |
      | Font Size                 | 18                        | Text in a different size   |
    When user is on deal module

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21267) --------------------------

  Scenario: As a User, Verify that User should be able to add note with Attachments
    When user should be able to add note with Attachments
      | Bold                      |                           | Bold Format                   |
      | Italic                    |                           | Italic Format                 |
      | Underline                 |                           | Underline Format              |
      | Image                     |                           | https://picsum.photos/200/30  |
      | File                      |                           | dateTime.csv                  |
    When user is on deal module

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21268) --------------------------

  Scenario: As a User, Verify that it should display success message upon clicking on the save button
    When it should display success message 'Note added successfully' upon clicking on save button after adding note 'Test'
    When user is on deal module

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21269) --------------------------

  Scenario: As a User, Verify that Upon cancel button click it should terminate note add process
    When add note 'Test' and upon Cancel button click it should terminate note add process
    When user is on deal module

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C21270) --------------------------

  Scenario: As a User, Verify that active user can be mentioned in the note
    When verify that active user with '@' of 'Vijal Patel' can be mentioned in the note
    When user is on deal module

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C21272) --------------------------

  Scenario: As a User, Verify that After adding note it should display in the All and in Note timeline
    When verify that After adding note it should display in the All and in Note timeline
    When user is on deal module

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C21273) --------------------------

  Scenario: As a User, Verify that i should be able to pin/unpin the note from the timeline entry
    When verify that user should be able to pin or unpin the note from the timeline entry
    When user is on deal module

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C21274) --------------------------

  Scenario: As a User, Verify that it should allow me to update the note from timeline entry
    When verify that it should allow me to update 'Test Updated' note from timeline entry and verify 'Note updated successfully'
    When user is on deal module

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C21275) -------------------------

  Scenario: As a User, Verify that it should allow me to delete the note from timeline entry
    When verify that it should allow me to delete the note from timeline entry
    When user is on deal module

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C21276) -------------------------

  Scenario: As a User, Verify that it should allow me to update note with Attachments
    When verify that it should allow me to update note 'users.pdf' with Attachments
    When user is on deal module

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C21278) -------------------------

  Scenario: As a User, Verify that it shouldn't allow user to add / Update note with blank content
    When it should not allow user to add or update note with blank content and shows 'Please specify content for note'
    When user is on deal module

#------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C21277) -------------------------

  Scenario: As a User, Verify that it should allow me to delete note with Attachments
    When verify that it should allow me to delete note with Attachments
    When user is on deal module
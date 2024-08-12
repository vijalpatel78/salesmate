@regression_test_emailTemplates @regression_test
Feature: Email Templates Feature

  Description: In this feature verify that user is able to create and update and verify validations of email templates

  Background:
    Given the 'User1' is on email templates page

  #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C18591) ------------------------------------------------

  Scenario: Verify, the user is able to add a new custom folder
    When the user is able to add a new custom folder
      | Folder Name | Auto Custom Folder @#$%^ 123 |
    Then click on save button and verify 'Created successfully.' message

  #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C18592) ----------------------------

  Scenario: Verify, the user is not able to leave required fields blank while creating a folder
    When the user is not able to leave required fields blank while creating a folder
      | Folder Name |  |
    Then click on save button and verify 'This field is required' validation message

  #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C18593) ----------------------------

  Scenario: Verify, the user is not able to enter more than 100 chars in the folder name while creating a folder
    When the user is not able to enter more than 100 chars in the folder name while creating a folder
      | Folder Name | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
    Then click on save button and verify 'Should be maximum 100 characters' length validation message

  #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C18594) ----------------------------

  Scenario: Verify, the user is able to edit custom folder
    When the user is able to edit custom folder
      | Folder Name | Auto Custom Folder Updated |
    Then click on save button and verify 'Updated successfully.' updation message

  #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C18595) ----------------------------

  Scenario: Verify, the user is not able to leave required fields blank while editing a folder
    When the user is not able to leave required fields blank while editing a folder
      | Folder Name |  |
    Then click on save button and verify 'This field is required' validation message

  #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C18596) ----------------------------

  Scenario: Verify, the user is not able to enter more than 100 chars in the folder name while editing a folder
    When the user is not able to enter more than 100 chars in the folder name while editing a folder
      | Folder Name | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore |
    Then click on save button and verify 'Should be maximum 100 characters' length validation message

  #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C18597) ----------------------------

  Scenario: Verify, the user is not able to delete a folder when the folder contains templates
    When the user is not able to delete folder 'Public Template' when folder contains templates and displays 'Folder cannot be deleted, it contains templates' message

  #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C18602) ----------------------------

  Scenario: Verify, the folder count should not be displayed if the folder does not contain any template
    When the folder count of 'Auto Custom Folder Updated' should not be displayed if the folder does not contain any template

  #---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C18599) ----------------------------

  Scenario: Verify, the count should be displayed on the folder according to the number of templates
    When the count should be displayed on the folder 'Public Template' and 'Auto Custom Folder Updated' according to the number of templates

  #---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C18603) ---------------------------

  Scenario: Verify, the system should display all user's templates under the All Templates folder
    When the system should display all users templates under 'All Templates' folder

  #---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C18604) ---------------------------

  Scenario: Verify, the system should display only logged-in user's templates under My Templates folder
    When the system should display only logged-in users templates under 'My Templates' folder

  #---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C18605) ---------------------------

  Scenario: Verify, the user is able to create a new template
    When the user is able to create a new template
      | Template Name    | Auto Template ^&%$~!;<>                                            |
      | Folder Name      | Auto Custom Folder Updated                                         |
      | Subject Name     | Auto Template Subject ~`!@#$%^&*()_- \t =+{}[]\|:;' " \n <>,./?123 |
      | Template Content | Name: {{Contact.name}}                                             |
    Then click on save button and verify 'Created successfully.'

  #---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C18630) ---------------------------

  Scenario: Verify, the system should display 'Name', 'Created By', 'Sent', 'Open', 'Clicked', 'Replied', 'Created' template details on the grid
    When the system should display 'Name', 'Created By', 'Sent', 'Open', 'Clicked', 'Replied', 'Created' template details for 'Auto Template ^&%$~!;<>' on the grid

  #---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/C18631) ---------------------------

  Scenario: Verify, on click of the template name, the system should display template details
    When on click of the template name 'Auto Template ^&%$~!;<>', the system should display template details

  #---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/C18606) ---------------------------

  Scenario: Verify, the user is not able to leave the required field blank while creating a template
    When user is not able to leave required field blank while creating template and verify 'Template name is required','Subject is required' validations

  #---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/C18608) ---------------------------

  Scenario: Verify, the user is not able to enter more than 255 chars in the template name and subject fields while adding a template
    When user is not able to enter more than 255 chars in the template name and subject fields while adding a template
      | Template Name    | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore sggt ghyuk iol sdfg hjkl vbnmc tyun dfghsi vbhy tryu efgshsh osjkjk sjhsudofn asdf werty cvxzjhs syusj sjjsjk fghj kloip hjikolp ddfght cvvbbnmkierty asddfghey htiui skjn xcvgf ghfj cvbn astey fhjd |
      | Template Subject | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore sggt ghyuk iol sdfg hjkl vbnmc tyun dfghsi vbhy tryu efgshsh osjkjk sjhsudofn asdf werty cvxzjhs syusj sjjsjk fghj kloip hjikolp ddfght cvvbbnmkierty asddfghey htiui skjn xcvgf ghfj cvbn astey fhjd |
    Then click on save button and verify 'Max length should be 255' validation

  #---------------------- Case:17 (http://testrails.rapidops.com/index.php?/cases/view/C18622) ---------------------------

  Scenario: Verify, the system should display all custom folders on the create a new template screen
    When the system should display all custom folders on the create a new template screen

  #---------------------- Case:18 (http://testrails.rapidops.com/index.php?/cases/view/C18624) ---------------------------

  Scenario: Verify, the user is able to update a template
    When the user is able to update a template
      | Template Name    | Auto Template Updated ^&%$~!;<>                                            |
      | Folder Name      | Public Template                                                            |
      | Subject Name     | Auto Template Subject Updated ~`!@#$%^&*()_- \t =+{}[]\|:;' " \n <>,./?123 |
      | Template Content | Company Name: {{Company.name}}                                             |
    Then click on save button and verify 'Updated successfully.' message of template

  #---------------------- Case:19 (http://testrails.rapidops.com/index.php?/cases/view/C18625) ---------------------------

  Scenario: Verify, the user is not able to leave the required field blank while editing a template
    When the user is not able to leave the required field blank while editing a template
      | Template Name    |  |
      | Template Subject |  |
    Then click on save button and verify 'Template name is required','Subject is required' validations

  #---------------------- Case:20 (http://testrails.rapidops.com/index.php?/cases/view/C18626) ---------------------------

  Scenario: Verify, the user is not able to enter more than 255 chars in the template name and subject fields while editing a template
    When user is not able to enter more than 255 chars in the template name and subject fields while editing a template
      | Template Name    | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore sggt ghyuk iol sdfg hjkl vbnmc tyun dfghsi vbhy tryu efgshsh osjkjk sjhsudofn asdf werty cvxzjhs syusj sjjsjk fghj kloip hjikolp ddfght cvvbbnmkierty asddfghey htiui skjn xcvgf ghfj cvbn astey fhjd |
      | Template Subject | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore sggt ghyuk iol sdfg hjkl vbnmc tyun dfghsi vbhy tryu efgshsh osjkjk sjhsudofn asdf werty cvxzjhs syusj sjjsjk fghj kloip hjikolp ddfght cvvbbnmkierty asddfghey htiui skjn xcvgf ghfj cvbn astey fhjd |
    Then click on save button and verify 'Max length should be 255' length validation

  #---------------------- Case:21 (http://testrails.rapidops.com/index.php?/cases/view/C18623) ---------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to see preview of the template
    When the user is able to see preview of the template 'Auto Template Updated ^&%$~!;<>'

  #---------------------- Case:22 (http://testrails.rapidops.com/index.php?/cases/view/C18627) ---------------------------

  Scenario: Verify, the user is able to archive a template
    When the user is able to archive a template 'Auto Template Updated ^&%$~!;<>' of 'Public Template' and also 'Archived' and verify 'Template archived successfully'

  #---------------------- Case:23 (http://testrails.rapidops.com/index.php?/cases/view/C18627) ---------------------------

  Scenario: Verify, the user can't able to create the new email template from the archived folder
    When the user can not able to create the new email template from the 'Archived' folder

  #---------------------- Case:24 (http://testrails.rapidops.com/index.php?/cases/view/C18627) ---------------------------

  Scenario: Verify, the system should not display edit template button on archived template
    When the system should not display edit template button on 'Archived' folder of 'Auto Template Updated ^&%$~!;<>' template

  #---------------------- Case:25 (http://testrails.rapidops.com/index.php?/cases/view/C18627) ---------------------------
  @skip_in_ci
  Scenario: Verify, the user is able to unArchive a template
    When the user is able to unArchive a template 'Auto Template Updated ^&%$~!;<>' of 'Archived' and 'Public Template' and verify 'Template unarchived successfully'

  #---------------------- Case:26 (http://testrails.rapidops.com/index.php?/cases/view/C18627) ---------------------------

  Scenario: Verify, the user is able to delete a folder when the folder is blank
    When the user is able to delete a folder 'Auto Custom Folder Updated' and verify 'Deleted successfully.' and update template 'Auto Template'
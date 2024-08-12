@regression_test_product @regression_test
Feature: Product Module > Actions > Upload File

  Description: In this feature user uploads single file and multiple files and also verifies validation of  uploaded file

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19282) --------------------------

  Scenario: Verify, the user is able to add a file
    When user is able to add a file 'dateTime.csv' and verify 'File(s) uploaded successfully' message

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19283) --------------------------

  Scenario: Verify, the user is able to add multiple files
    When user is able to add multiple files i.e; 'product.jpeg','users.pdf' and verify 'File(s) uploaded successfully' message


#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19288) --------------------------

  Scenario: Verify, the warning message should be displayed when any file is not uploaded
    When warning message 'Please select at least one file for upload' should be displayed when any file is not uploaded
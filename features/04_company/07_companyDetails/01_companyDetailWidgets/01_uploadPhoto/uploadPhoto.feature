@regression_test_company @regression_test
Feature: Contact Module > Contact Details > Contact Details Widgets > Upload Photo

  Description: In this feature user uploads photo and verifies size and type of uploaded image

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21643) --------------------------

  Scenario: Verify, the user is able to upload a photo of the company
    When user is on company details page
    When the user is able to upload a photo 'company01.jpg' of company

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21644) --------------------------

  Scenario: Verify, the user is not able to upload file other that image file
    When user is on company details page
    When the user is not able to upload file other than image file i.e; 'invalidFileFormat.pdf' and verify 'File format not supported. Please select valid format (Accepted formats are: - JPG, JPEG, PNG).'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21645) --------------------------

  Scenario: Verify, the user is not able to upload image file more than 1mb size
    When user is on company details page
    When the user is not able to upload image file more than 1mb size i.e; 'invalidFileSize.csv' and verify 'File is too big (74.84MiB). Max filesize: 1MiB.' message
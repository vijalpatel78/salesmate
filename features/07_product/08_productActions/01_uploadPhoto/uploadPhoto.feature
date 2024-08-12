@regression_test_product @regression_test
Feature: Product Module > Actions > Upload Photo

  Description: In this feature user uploads photo and verifies size and type of uploaded image

  Background:
    Given the 'User1' is on product listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19281) --------------------------

  Scenario: Verify, the user is able to upload a photo of the product
    When the user is able to upload a photo 'product01.jpg' of the product

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19279) --------------------------

  Scenario: Verify, the user is not able to upload file other that image file
   When the user is not able to upload file other that image file i.e; 'invalidFileFormat.pdf' and verify 'File format not supported. Please select valid format (Accepted formats are: - JPG, JPEG, PNG).'


#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19280) --------------------------

  Scenario: Verify, the user is not able to upload image file more than 1mb size
    When the user is not able to upload image file more than 1mb size i.e; 'invalidFileSize.csv' and verify 'File is too big (74.84MiB). Max filesize: 1MiB.'
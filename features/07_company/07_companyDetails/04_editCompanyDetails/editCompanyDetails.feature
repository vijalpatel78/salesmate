@regression_test_company @regression_test
Feature: Company Module > Company Details Widgets > Edit Company Details

  Description: In this feature user is able to edit company details and manage companies

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22065) --------------------------

  Scenario: As a User, Verify UI of 'Company Details' widget
    When user is on company details page
    Then As a User, Verify UI of "Company Details" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22066) --------------------------

  Scenario: As a User, Verify that upon clicking on Customized fields option it should redirect to Manage company Fields screen
    When user is on company details page
    Then on click of Customized fields option it should redirect to Manage Company Fields screen

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22067) --------------------------

  Scenario: As a User, Verify that User can Add - remove fields from customized screen to show in company detail widget
    When user is on company details page > customize fields screen > manage fields screen
    Then user can add and remove fields from the customized screen

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22069) --------------------------

  Scenario: As a User, Verify that i can search any field from search box
    When user is on company details page > customize fields screen > manage fields screen
    Then user can search any field from search box
      | Search Word   | Website  |

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22070) --------------------------

  Scenario: As a User, Verify Save and cancel button functionality of customized fields screen
    When user is on company details page > customize fields screen > manage fields screen
    Then verify Save and Cancel button functionality of customized fields screen

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22071) --------------------------

  Scenario: As a User, Verify that it should redirect to company Layout screen upon clicking on Add company Field button of Customized field screen
    When user is on company details page > customize fields screen > manage fields screen
    Then on clicking on Add Company Field button of Customized field screen it should redirect to company layout screen

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22072) --------------------------

  Scenario: As a User, Verify that it should allow me to collapse and expand the 'company Details' widget
    When user is on company details page
    Then verify that it should allow user to collapse and expand "Contact Details" widget

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22073) --------------------------

  Scenario: As a User, Verify that it should allow me to update the fields from company detail widget
    When user is on company details page
    Then verify that it should allow user to update the fields from company detail widget
      | Other Phone      | 7071983700  |
      | Address Line1    | Banglore    |

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C22074) --------------------------

  Scenario: As a User, Verify that timeline entries should be updated as per field update
    When user is on company details page
    Then verify that the timeline entries should be updated as per field update

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C22075) -------------------------

  Scenario: As a User, Verify that validation message for required fields should be display
    When user is on company details page
    Then verify that validation message 'Name is required' for required fields should be display

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C22076) -------------------------

  Scenario: As a User, Verify that If user don't have rights to Update company then All field of company detail widget should not display edit icon
    When verifying 'User2' when rights are disabled for right name of 'switch_company_edit' through 'User1'
    When All field of company detail widget should not display edit icon for 'User1'

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C22077) -------------------------

  Scenario: As a User, Verify that user don't have rights to Manage field then User should not be able to edit customized field
    When verifying 'User2' when rights are disabled for right name of 'switch_company_edit' through 'User1'
    When 'User1' not be able to edit customized field
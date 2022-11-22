@regression_test_contact @regression_test
Feature: Contact Module > Contact Details Widgets > Edit Contact Details

  Description: In this feature user is able to edit contact details and manage contacts

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22065) --------------------------

  Scenario: As a User, Verify UI of 'Contact Details' widget
    When user is on contact details page
    Then As a User, Verify UI of "Contact Details" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22066) --------------------------

  Scenario: As a User, Verify that upon clicking on Customized fields option it should redirect to Manage Contact Fields screen
    When user is on contact details page
    Then on click of Customized fields option it should redirect to Manage Contact Fields screen

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22067) --------------------------

  Scenario: As a User, Verify that User can Add - remove fields from customized screen to show in contact detail widget
    When user is on contact details page > customize fields screen > manage fields screen
    Then user can add and remove fields from customized screen

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22069) --------------------------

  Scenario: As a User, Verify that i can search any field from search box
    When user is on contact details page > customize fields screen > manage fields screen
    Then user can search any field from search box
      | Search Word   | Website  |

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22070) --------------------------

  Scenario: As a User, Verify Save and cancel button functionality of customized fields screen
    When user is on contact details page > customize fields screen > manage fields screen
    Then verify Save and cancel button functionality of customized fields screen

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22071) --------------------------

  Scenario: As a User, Verify that it should redirect to contact Layout screen upon clicking on Add Contact Field button of Customized field screen
    When user is on contact details page > customize fields screen > manage fields screen
    Then on clicking on Add Contact Field button of Customized field screen it should redirect to contact layout screen

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22072) --------------------------

  Scenario: As a User, Verify that it should allow me to collapse and expand the 'Contact Details' widget
    When user is on contact details page
    Then verify that it should allow user to collapse and expand Details widget

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22073) --------------------------

  Scenario: As a User, Verify that it should allow me to update the fields from contact detail widget
    When user is on contact details page
    Then verify that it should allow user to update the fields from contact detail widget
      | Email        | juishah1269@gmail.com  |
      | Other Phone  | 7071983700             |

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C22074) --------------------------

  Scenario: As a User, Verify that timeline entries should be updated as per field update
    When user is on contact details page
    Then verify that timeline entries should be updated as per field update

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C22075) -------------------------

  Scenario: As a User, Verify that validation message for required fields should be display
    When user is on contact details page
    Then verify that validation of element 'lastName' of edit link as '14' as 'Last Name is required' should be displayed

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C22076) -------------------------

  Scenario: As a User, Verify that If user don't have rights to Update contact then All field of contact detail widget should not display edit icon
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_edit' through 'User1'
    When All field of contact detail widget should not display edit icon for 'User1'

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C22077) -------------------------

  Scenario: As a User, Verify that user don't have rights to Manage field then User should not be able to edit customized field
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_edit' through 'User1'
    When 'User1' should not be able to edit customized field for 'icon-ic_contacts'
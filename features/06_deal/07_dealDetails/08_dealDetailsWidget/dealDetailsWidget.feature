@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Screen > Deal Details Widget

  Description: In this feature user is able to update deal details customized widgets

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22065) --------------------------

  Scenario: As a User, Verify UI of 'Deal Details' widget
    When user is on deal details page
    Then As a User, Verify UI of "Deal Details" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22066) --------------------------

  Scenario: As a User, Verify that upon clicking on Customized fields option it should redirect to Manage Deal Fields screen
    When user is on deal details page
    Then on click of Customized fields option it should redirect to Manage Deal Fields screen

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22067) --------------------------

  Scenario: As a User, Verify that User can Add - remove fields from customized screen to show in deal detail widget
    When user is on deal details page
    When user is on customize fields screen
    Then user can add and remove fields from customized fields screen

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22069) --------------------------

  Scenario: As a User, Verify that i can search any field from search box
    When user is on deal details page
    When user is on customize fields screen
    Then user can search any field from search box
      | Search Word   | Source  |

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22070) --------------------------

  Scenario: As a User, Verify Save and cancel button functionality of customized fields screen
    When user is on deal details page
    When user is on customize fields screen
    Then verify Save and cancel button functionality of the customized fields screen

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22071) --------------------------

  Scenario: As a User, Verify that it should redirect to deal Layout screen upon clicking on Add Deal Field button of Customized field screen
    When user is on deal details page
    When user is on customize fields screen
    Then on clicking on Add Deal Field button of Customized field screen it should redirect to deal layout screen

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22072) --------------------------

  Scenario: As a User, Verify that it should allow me to collapse and expand the 'Deal Details' widget
    When user is on deal details page
    Then verify that it should allow user to collapse and expand Details widget

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22073) --------------------------

  Scenario: As a User, Verify that it should allow me to update the fields from deal detail widget
    When user is on deal details page
    Then verify that it should allow user to update the fields from deal detail widget
      | Description | Deal is updated |

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C22074) --------------------------

  Scenario: As a User, Verify that timeline entries should be updated as per field update
    When user is on deal details page
    Then verify that timeline entries should be updated as per field update

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C22075) -------------------------

  Scenario: As a User, Verify that validation message for required fields should be display
    When user is on deal details page
    Then verify that validation of element 'title' of edit link as '4' as 'Title is required' should be displayed

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C22076) -------------------------

  Scenario: As a User, Verify that If user don't have rights to Update deal then All field of deal detail widget should not display edit icon
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    When All field of deal detail widget should not display edit icon for 'User1'

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C22077) -------------------------

  Scenario: As a User, Verify that user don't have rights to Manage field then User should not be able to edit customized field
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    When 'User1' should not be able to edit customized field for 'icon-ic_deal'
@regression_test_setup @regression_test @sales_automation
Feature: Outgoing Email Setting Feature

  Description: In this feature,user will add new domain for email settings and verify domain settings with invalid and
               blank data of domain and also and verify redirection of specified links

  Background:
    Given the 'User1' is on outgoing email setting page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16782) -----------------------------

  Scenario: Verify, the user is able to add a domain
    When the user is able to add a domain
     | Domain  | salesmate.io  |

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16784) -----------------------------

  Scenario: Verify, the user is not able to leave required fields as blank while adding a domain
    When the user is not able to leave required fields as blank while adding a domain
     | Domain  |         |
    And click on add button and verify blank validation 'This field is required.'

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16785) -----------------------------

  Scenario: Verify, the user is not able to enter invalid data while adding a domain
    When the user is not able to enter invalid data while adding a domain
     | Domain | xyz123   |
    And click on add button and verify validation 'Please enter valid domain name.'
    When the user is not able to enter invalid data while adding a domain
     | Domain | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor emo asd |
    And click on add button and verify validation 'Should be maximum 255 characters' message

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16786) -----------------------------

  Scenario: Verify, the user is not able to add a duplicate domain
    When the user is not able to add a duplicate domain
     | Domain  | salesmate.io  |
    And click on add button and verify 'Domain name already exists' validation

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16787) -----------------------------

  Scenario: Verify, the system should give validation if any error comes while domain verification
    When the system should give 'CNAME verification failed. Click here to understand the possible reasons.' if any error comes while domain verification

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/16789) -----------------------------

  Scenario: Verify, the support page should get open on click of the ‘Click here’ link
    When the support page should get open on click of Click here in 'CNAME verification failed. Click here to understand the possible reasons.' and in quick section click here 'https://support.salesmate.io/hc/en-us/articles/360006677972' and 'https://support.salesmate.io/hc/en-us/articles/360006983771-How-to-create-a-DKIM-record-for-your-domains-'

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/16788) -----------------------------

  Scenario: Verify, the user is able to delete an existing domain
    When the user is able to delete an existing domain

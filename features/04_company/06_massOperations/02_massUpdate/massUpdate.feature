@regression_test_company @regression_test
Feature: Company Module > Mass Operations > Mass Update

  Description: In this feature user is able to enable/disable mass update company rights and manage mass update
               operations

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21096) --------------------------

  Scenario: As a User, Verify that User can't able to see the Update options on the bulk operation when the user doesn't have a right to Mass Update Company
    When verifying 'User2' when rights are disabled for right name of '301' through 'User1'
    Then user is on company listing page
    Then 'Mass Update Companies' link is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21097) --------------------------

  Scenario: As a user, I should able to see the 'Mass Update' option when user has 'Mass Update Company' right
    When verifying 'User2' when rights are enabled for right name of '301' through 'User1'
    Then user is on company listing page
    Then 'Mass Update Companies' link is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21098) --------------------------

  Scenario: As a user, I should be able to update Contacts in bulk from the mass update Company page
    When user is able to update Companies in bulk from the mass update Companies page
      | Select Field01  | Address Line 1           | Bangalore                |
      | Select Field02  | Address Line 2           | Prasanthi Nagar          |
      | Select Field03  | Big Integer Field        | 546774                   |
      | Select Field04  | Boolean Field            | Yes                      |
      | Select Field05  | City                     | Bangalore                |
      | Select Field06  | Company                  | MindBoard                |
      | Select Field07  | Country                  | India                    |
      | Select Field08  | Currency                 | INR - ₹                  |
      | Select Field09  | Currency Field           | Indian Rupees            |
      | Select Field10  | Date Field               | Jan 13, 2021             |
      | Select Field11  | Date and Time Field      | Apr 24, 2021 07:33 PM    |
      | Select Field12  | Decimal Field            | 7777                     |
      | Select Field13  | Description              | Personal Contact Details |
      | Select Field14  | Email Opt Out            | No                       |
      | Select Field15  | Email Opt Out Reason     | Receiving multiple mails |
      | Select Field16  | Facebook                 | Shanthosh                |
      | Select Field17  | First Name               | Ketha                    |
      | Select Field18  | Google+                  | Ketha Santhosh           |
      | Select Field19  | Instagram                | lucky santhu             |
      | Select Field20  | Integer Field            | 370                      |
      | Select Field21  | Job Title                | Data Scientist           |
      | Select Field22  | Last Name                | Santhosh                 |
      | Select Field23  | LinkedIn                 | Santhosh Sandy           |
      | Select Field24  | Multi Select Field       | M2                       |
      | Select Field25  | Owner                    | Vijal Patel              |
      | Select Field26  | Percentage Field         | 95                       |
      | Select Field27  | SMS Opt Out              | No                       |
      | Select Field28  | Select Field             | S3                       |
      | Select Field29  | Shipping Address Line 1  | Kalambakkam              |
      | Select Field30  | Shipping Address Line 2  | Rose Towers              |
      | Select Field31  | Shipping City            | Chennai                  |
      | Select Field32  | Shipping Country         | India                    |
      | Select Field33  | Shipping State           | TamilNadu                |
      | Select Field34  | Shipping ZipCode         | 567321                   |
      | Select Field35  | Skype                    | Shanthosh K              |
      | Select Field36  | State                    | Karnataka                |
      | Select Field37  | Tags                     | Support                  |
      | Select Field38  | Text Area Field          | Contact Details          |
      | Select Field39  | Text Field               | Imported Contact         |
      | Select Field40  | Time Zone                | Asia/Kolkata             |
      | Select Field41  | Twitter                  | Ketha Santhosh           |
      | Select Field42  | Type                     | Customer                 |
      | Select Field43  | URL Field                | www.support.com          |
      | Select Field44  | Website                  | helpdesk                 |
      | Select Field45  | ZipCode                  | 540987                   |

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21099) --------------------------

  Scenario: As a User, Verify I should be able to display update button disable if I haven't checked any checkbox
    When user is able to display 'Update' button disable if I have not checked any checkbox under 'Mass Update Companies' of 'icon-ic_company' module

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C21100) --------------------------

  Scenario: As a User, Verify upon clicking on cancel button it should terminate update process
    When user upon clicking on cancel button it should terminate update process under 'Mass Update Companies'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C21101) --------------------------

  Scenario: As a User, the system should give me a validation message when any criteria are not selected
    When system should give validation 'Select Search Criteria' when any criteria not selected under 'Mass Update Companies'
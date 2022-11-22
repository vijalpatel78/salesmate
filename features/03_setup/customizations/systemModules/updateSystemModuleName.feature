@regression_test_setup @regression_test @customization
Feature: Update System Module Name

    The user can rename the module display name as well as can rearrange the display order

    Background: 
        Given the 'User1' is on system modules page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13840) ----------------------

    Scenario Outline: The user is able to update the module display name
        When the user clicks on the Edit button of the '<moduleName>' module
            And enter Singular Label: '<singularName>'
            And enter Plural Label: '<pluralName>'
            And click on the save button
        Then the display name of the '<moduleName>' module should get changed with 'Module details updated successfully' message

    Examples:
        | moduleName | singularName | pluralName |
        | Activity   | Task         | Tasks      |
        | Activity   | Activity     | Activities |
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13841) ----------------------
    
    Scenario Outline: The user is able to update the profile permission of the selected module
        When the user clicks on the Edit button of the '<moduleName>' module
            And '<profileName>' View: '<viewValue>'
            And '<profileName>' Create: '<createValue>'
            And '<profileName>' Edit: '<editValue>'
            And '<profileName>' Delete: '<deleteValue>'
            And click on the save button
        Then the '<profileName>' profile permission of the selected '<moduleName>' should get updated with 'Module details updated successfully' message

    Examples:
        | moduleName | profileName | viewValue | createValue | editValue | deleteValue |
        | Activity   | Standard    | Enable    | Disable     | Enable    | Disable     |

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13842) ----------------------

    Scenario: The user is not able to leave required fields as blank while updating module name
        When the user clicks on the Edit button of the 'Company' module
            And enter Singular Label: ''
            And enter Plural Label: ''
            And click on the save button
        Then the system should give a required validation

    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13843) ----------------------
    @skip_in_ci
    Scenario Outline: The user is able to change the module display order
        When the user moves the '<sourceModule>' module in place of the '<targetModule>' module
        Then the '<sourceModule>' module should be displayed in place of the '<targetModule>' module

    Examples:
        | sourceModule | targetModule | 
        | Company      | Deal         |

    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13845) ----------------------

    Scenario: When the ‘Product’ app is uninstalled, the 'Product' module should not be displayed on the 'System Modules' page
        When the user 'remove' the Product app from the Setup>Apps page
        Then the product module should not be displayed on the System Modules page

    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/13844) ----------------------

    Scenario: When the ‘Product’ app is installed, the 'Product' module should be displayed on the 'System Modules' page
        When the user 'install' the Product app from the Setup>Apps page
        Then the product module should get displayed on the System Modules page
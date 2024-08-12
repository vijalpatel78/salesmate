@regression_test_setup @regression_test @customizations
Feature: Manage Deal Pipeline

    The sales pipeline is a visual representation of sales process where all potential deals are displayed and arranged
    according to their stages in sales cycle. The Salesmate offers a default `Sales Pipeline` with stages, the user can,
    however, rename stages and pipeline according to their need. Aslo, the user can create as many pipeline as required,
    rename pipeline and stages, create multiple stages in various pipeline, set win probability or rotting period for
    each stage, re-order the stages as well as can delete custom pipeline and stages.

    Background:
        Given the 'User1' is on deal pipeline page

    #------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/14360) -------------------------

    Scenario Outline: The user is able to add a custom pipeline with all details
        When the user clicks on the New Pipeline button
        And Pipeline: '<pipeline>'
        And Allow users to set the probability for each deal manually: '<trueValue>'
        And click on the Save button of 'pipeline'
        Then the 'new pipeline' should get 'added' with 'Pipeline added successfully' message
        And the new '<pipeline>' pipeline should get added with default 'Qualified,Contact Made,Proposal Presented,Quote Sent,In Negotiation' stages
        And the pipeline details on the edit pipeline should be the same as provided '<pipeline>' and '<trueValue>' details

        Examples:
            | pipeline                | trueValue |
            | Auto Custom Pipeline 01 | True      |

    #------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/14361) -------------------------

    Scenario Outline: The user is able to add a custom pipeline with required details only
        When the user clicks on the New Pipeline button
        And Pipeline: '<pipeline>'
        And Allow users to set the probability for each deal manually: '<falseValue>'
        And click on the Save button of 'pipeline'
        Then the 'new pipeline' should get 'added' with 'Pipeline added successfully' message
        And the new '<pipeline>' pipeline should get added with default 'Qualified,Contact Made,Proposal Presented,Quote Sent,In Negotiation' stages
        And the pipeline details on the edit pipeline should be the same as provided '<pipeline>' and '<falseValue>' details

        Examples:
            | pipeline                | falseValue |
            | Auto Custom Pipeline 02 | False      |

    #------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/14362) -------------------------

    Scenario: The user is not able to leave required fields as blank while adding a custom pipeline
        When the user clicks on the New Pipeline button
        And Pipeline: ''
        And click on the Save button of 'pipeline'
        Then the 'This field is required.' validation message should be displayed for the Pipeline field

    #------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/14363) -------------------------

    Scenario Outline: The user is not able to add a custom pipeline with an invalid data
        When the user clicks on the New Pipeline button
        And Pipeline: '<invalidPipeline>'
        And click on the Save button of 'pipeline'
        Then the '<validationMsg>' validation message should be displayed for the Pipeline field

        Examples:
            | invalidPipeline | validationMsg                 |
            | Test % ^        | pipeline name should be valid |
            | Early digital computers were electromechanical electric switches drove mechanical relays to perform the calculation | Should be maximum 100 characters |

    #------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/14364) -------------------------

    Scenario: The user is not able to add a custom pipeline with a duplicate name
        When the user clicks on the New Pipeline button
        And Pipeline: 'test'
        And click on the Save button of 'pipeline'
        Then the 'Pipeline with name \'test\' already exists.' validation message should be displayed on entering duplicate name

    #------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/14365) -------------------------

    Scenario Outline: The user is able to update a pipeline with all details
        When the user clicks on the Edit button from the '<existingPipeline>' pipeline
        And Pipeline: '<newPipeline>'
        And Allow users to set the probability for each deal manually: '<trueValue>'
        And click on the Save button of 'pipeline'
        Then the 'pipeline' should get 'updated' with 'Record updated successfully' message
        And the pipeline details on the edit pipeline should be the same as provided '<newPipeline>' and '<trueValue>' details

        Examples:
            | existingPipeline        | newPipeline                     | trueValue |
            | Auto Custom Pipeline 02 | Auto Custom Pipeline Updated 01 | True |

    #------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/14366) -------------------------

    Scenario Outline: The user is able to update a pipeline with required details only
        When the user clicks on the Edit button from the '<existingPipeline>' pipeline
        And Pipeline: '<newPipeline>'
        And Allow users to set the probability for each deal manually: '<falseValue>'
        And click on the Save button of 'pipeline'
        Then the 'pipeline' should get 'updated' with 'Record updated successfully' message
        And the pipeline details on the edit pipeline should be the same as provided '<newPipeline>' and '<falseValue>' details

        Examples:
            | existingPipeline        | newPipeline                     | falseValue |
            | Auto Custom Pipeline 01 | Auto Custom Pipeline Updated 02 | False      |

    #------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/14367) -------------------------

    Scenario: The user is not able to leave required fields as blank while updating a pipeline
        When the user clicks on the Edit button from the 'Auto Custom Pipeline Updated 02' pipeline
        And Pipeline: ''
        And click on the Save button of 'pipeline'
        Then the 'This field is required.' validation message should be displayed for the Pipeline field

    #------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/14368) -------------------------

    Scenario Outline: The user is not able to update a pipeline with an invalid data
        When the user clicks on the Edit button from the '<existingPipeline>' pipeline
        And Pipeline: '<invalidPipeline>'
        And click on the Save button of 'pipeline'
        Then the '<validationMsg>' validation message should be displayed for the Pipeline field

        Examples:
            | existingPipeline                | invalidPipeline | validationMsg                 |
            | Auto Custom Pipeline Updated 02 | Test % ^        | pipeline name should be valid |
            | Auto Custom Pipeline Updated 02 | Early digital computers were electromechanical electric switches drove mechanical relays to perform the calculation | Should be maximum 100 characters |

    #------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/14369) -------------------------

    Scenario: The user is not able to update a pipeline with a duplicate name
        When the user clicks on the Edit button from the 'Auto Custom Pipeline Updated 02' pipeline
        And Pipeline: 'Auto Custom Pipeline Updated 01'
        And click on the Save button of 'pipeline'
        Then the 'Pipeline name already exists' validation message should be displayed on entering duplicate name

    #------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/14370) -------------------------

    Scenario Outline: The user is able to add a custom stage with all details
        When the user clicks on the Add New Stage button from the '<existingPipeline>' pipeline
        And Stage Title: '<stageName>'
        And Win Probability: '<winProbability>'
        And Rotten Period: '<rottenPeriod>'
        And click on the Save button of 'stage'
        Then the 'new stage' should get 'added' with 'Stage added successfully' message
        And the stage details of '<existingPipeline>' pipeline on the edit stage should be the same as provided '<stageName>', '<winProbability>' and '<rottenPeriod>' details

        Examples:
            | existingPipeline                | stageName            | winProbability | rottenPeriod |
            | Auto Custom Pipeline Updated 02 | Auto Custom Stage 01 | 77             | 1            |

    #------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/14371) -------------------------

    Scenario Outline: The user is able to add a custom stage with required details only
        When the user clicks on the Add New Stage button from the '<existingPipeline>' pipeline
        And Stage Title: '<stageName>'
        And Win Probability: '<winProbability>'
        And Rotten Period: '<rottenPeriod>'
        And click on the Save button of 'stage'
        Then the 'new stage' should get 'added' with 'Stage added successfully' message
        And the stage details of '<existingPipeline>' pipeline on the edit stage should be the same as provided '<stageName>', '<winProbability>' and '<rottenPeriod>' details

        Examples:
            | existingPipeline                | stageName            | winProbability | rottenPeriod |
            | Auto Custom Pipeline Updated 02 | Auto Custom Stage 02 | 100            |              |

    #------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/14372) -------------------------

    Scenario: The user is not able to leave required fields as blank while adding a custom stage
        When the user clicks on the Add New Stage button from the 'Auto Custom Pipeline Updated 02' pipeline
        And Stage Title: ''
        And click on the Save button of 'stage'
        Then the 'This field is required.' validation message should be displayed for the Stage Title field
        And click on the Cancel button of stage

    #------------------------ Case:14 (http://testrails.rapidops.com/index.php?/cases/view/14373) -------------------------

    Scenario Outline: The user is not able to add a custom stage with an invalid data
        When the user clicks on the Add New Stage button from the '<existingPipeline>' pipeline
        And Stage Title: '<invalidStageName>'
        And Win Probability: '<invalidWinProbability>'
        And Rotten Period: '<invalidRottenPeriod>'
        And click on the Save button of 'stage'
        Then the '<stageValidation>' validation message should be displayed for the Stage Title field
        And the '<probabilityValidation>' validation message should be displayed for the Win Probability field
        And the '<rottenPeriodValidation>' validation message should be displayed for the Rotten Period field
        And click on the Cancel button of stage

        Examples:
            | existingPipeline                | invalidStageName | stageValidation            | invalidWinProbability | probabilityValidation                            | invalidRottenPeriod | rottenPeriodValidation         |
            | Auto Custom Pipeline Updated 02 | Test ^ % </Test> | stage name should be valid | 1.2                   | Please enter win probability(%) between 0 to 100 | 12 D                | Rotting period should be valid |
            | Auto Custom Pipeline Updated 02 | Early digital computers were electromechanical electric switches drove mechanical relays to perform the calculation | Should be maximum 100 characters | 2345 | Please enter win probability(%) between 0 to 100 | 4567 12 | Rotting period should be valid |

    #------------------------ Case:15 (http://testrails.rapidops.com/index.php?/cases/view/14374) -------------------------

    Scenario: The user is not able to add a custom stage with a duplicate name
        When the user clicks on the Add New Stage button from the 'Auto Custom Pipeline Updated 02' pipeline
        And Stage Title: 'Auto Custom Stage 02'
        And click on the Save button of 'stage'
        Then the 'Stage "Auto Custom Stage 02" is already exist in "Auto Custom Pipeline Updated 02" pipeline.' validation message should be displayed on entering duplicate stage

    #------------------------ Case:16 (http://testrails.rapidops.com/index.php?/cases/view/14375) -------------------------

    Scenario Outline: The user is able to update a custom stage with all details
        When the user clicks on the '<existingStage>' stage edit button from the '<existingPipeline>' pipeline
        And Stage Title: '<newStageName>'
        And Win Probability: '<winProbability>'
        And Rotten Period: '<rottenPeriod>'
        And click on the Save button of 'stage'
        Then the 'stage' should get 'updated' with 'Record updated successfully' message
        And the stage details of '<existingPipeline>' pipeline on the edit stage should be the same as provided '<newStageName>', '<winProbability>' and '<rottenPeriod>' details

        Examples:
            | existingPipeline                | existingStage        | newStageName | winProbability | rottenPeriod |
            | Auto Custom Pipeline Updated 02 | Auto Custom Stage 02 | Auto Custom Stage Updated 01  | 17 | 2 |

    #------------------------ Case:17 (http://testrails.rapidops.com/index.php?/cases/view/14376) -------------------------

    Scenario Outline: The user is able to update a custom stage with required details only
        When the user clicks on the '<existingStage>' stage edit button from the '<existingPipeline>' pipeline
        And Stage Title: '<newStageName>'
        And Win Probability: '<winProbability>'
        And Rotten Period: '<rottenPeriod>'
        And click on the Save button of 'stage'
        Then the 'stage' should get 'updated' with 'Record updated successfully' message
        And the stage details of '<existingPipeline>' pipeline on the edit stage should be the same as provided '<newStageName>', '<winProbability>' and '<rottenPeriod>' details

        Examples:
            | existingPipeline                | existingStage        | newStageName                 | winProbability | rottenPeriod |
            | Auto Custom Pipeline Updated 02 | Auto Custom Stage 01 | Auto Custom Stage Updated 02 | 0              |              |

    #------------------------ Case:18 (http://testrails.rapidops.com/index.php?/cases/view/14377) -------------------------

    Scenario: The user is not able to leave required fields as blank while updating a custom stage
        When the user clicks on the 'Auto Custom Stage Updated 02' stage edit button from the 'Auto Custom Pipeline Updated 02' pipeline
        And Stage Title: ''
        And click on the Save button of 'stage'
        Then the 'This field is required.' validation message should be displayed for the Stage Title field
        And click on the Cancel button of stage

    #------------------------ Case:19 (http://testrails.rapidops.com/index.php?/cases/view/14378) -------------------------

    Scenario Outline: The user is not able to update a custom stage with an invalid data
        When the user clicks on the '<existingStage>' stage edit button from the '<existingPipeline>' pipeline
        And Stage Title: '<invalidStageName>'
        And Win Probability: '<invalidWinProbability>'
        And Rotten Period: '<invalidRottenPeriod>'
        And click on the Save button of 'stage'
        Then the '<stageValidation>' validation message should be displayed for the Stage Title field
        And the '<probabilityValidation>' validation message should be displayed for the Win Probability field
        And the '<rottenPeriodValidation>' validation message should be displayed for the Rotten Period field
        And click on the Cancel button of stage

        Examples:
            | existingPipeline                | existingStage                | invalidStageName | stageValidation            | invalidWinProbability | probabilityValidation                            | invalidRottenPeriod | rottenPeriodValidation         |
            | Auto Custom Pipeline Updated 02 | Auto Custom Stage Updated 02 | Test ^ % </Test> | stage name should be valid | 1.2                   | Please enter win probability(%) between 0 to 100 | 12 D                | Rotting period should be valid |
            | Auto Custom Pipeline Updated 02 | Auto Custom Stage Updated 02 | Early digital computers were electromechanical electric switches drove mechanical relays to perform the calculation | Should be maximum 100 characters | 2345 | Please enter win probability(%) between 0 to 100 | 4567 12 | Rotting period should be valid |

    #------------------------ Case:20 (http://testrails.rapidops.com/index.php?/cases/view/14379) -------------------------

    Scenario: The user is not able to update a custom stage with a duplicate name
        When the user clicks on the 'Auto Custom Stage Updated 02' stage edit button from the 'Auto Custom Pipeline Updated 02' pipeline
        And Stage Title: 'Auto Custom Stage Updated 01'
        And click on the Save button of 'stage'
        Then the 'Stage "Auto Custom Stage Updated 01" is already exist in "Auto Custom Pipeline Updated 02" pipeline.' validation message should be displayed on entering duplicate name

    #------------------------ Case:22 (http://testrails.rapidops.com/index.php?/cases/view/14381) -------------------------

    Scenario Outline: The user is able to delete a custom stage
        When the user clicks on the delete '<stage>' stage button of the '<pipeline>' pipeline
        And click on the 'Yes' button
        Then the '<stage>' stage of '<pipeline>' pipeline should get deleted with 'Stage deleted successfully' message

        Examples:
            | pipeline                        | stage                        |
            | Auto Custom Pipeline Updated 02 | Auto Custom Stage Updated 02 |

    #------------------------ Case:23 (http://testrails.rapidops.com/index.php?/cases/view/14382) -------------------------

    Scenario Outline: The user is able to delete a custom pipeline
        When the user clicks on the delete button of the '<pipeline>' pipeline
        And click on the 'Yes' button
        Then the '<pipeline>' pipeline should get deleted with 'Pipeline deleted successfully' message

        Examples:
            | pipeline                        |
            | Auto Custom Pipeline Updated 02 |
            | Auto Custom Pipeline Updated 01 |

    #------------------------ Case:24 (http://testrails.rapidops.com/index.php?/cases/view/14383) -------------------------

    Scenario: The user is not able to delete a system pipeline
        When the user goes on the 'Sales' system pipeline and verifies the delete button
        Then the delete button should not be displayed for the 'Sales' system pipeline
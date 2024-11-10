Feature: Create tags
  Create a new tag

  Scenario: E0011 - Crear un tag con un nombre satisfactoriamente
    Given I navigate to "tags" section
    When I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "test tag name"
    And I click on save tag button
    Then I go to tags list
    And the tag "test tag name" should be in the list

  Scenario: E0012 - Crear un tag con metadata
    Given I navigate to "tags" section
    When I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "tag with metadata"
    And I expand the metadata section
    And I fill the metadata title with "tag with metadata" and description "tag with metadata desc"
    And I click on save tag button
    Then I go to tags list
    And the tag "tag with metadata" should be in the list
    
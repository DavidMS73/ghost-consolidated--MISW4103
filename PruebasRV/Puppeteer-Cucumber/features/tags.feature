Feature: Create tags
  Create a new tag

  @rv-45
  Scenario: E010 - Crear un tag con nombre existente
    Given I navigate to "tags" section
    When I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "test tag name"
    And I click on save tag button
    And I go to tags list
    Then the tag "test tag name" should be in the list
    When I click on new tag button
    And I fill tag name with "test tag name"
    And I click on save tag button
    And I go to tags list
    Then There are 2 or more tags with tag "test tag name" in the tag list

  @rv-45
  Scenario: E0011 - Crear un tag con un nombre satisfactoriamente
    Given I navigate to "tags" section
    When I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "test tag name 2"
    And I click on save tag button
    Then I should see tag title "test tag name 2"

  @rv-45
  Scenario: E0012 - Crear un tag con un nombre satisfactorio y metadata
    Given I navigate to "tags" section
    When I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "tag with metadata"
    And I expand the metadata section
    And I fill the metadata title with "tag with metadata" and description "tag with metadata desc"
    And I click on save tag button
    Then I should see tag title "test tag name 2"

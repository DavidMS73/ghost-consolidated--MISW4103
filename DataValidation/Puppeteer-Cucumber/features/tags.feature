Feature: Create tags
  Create a new tag

  Scenario: E009 - Crear un tag modificando su slug con caracteres especiales
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "test tag name"
    And I fill the slug with an emoji
    When I click on save tag button
    And I go to tags list
    Then the tag "test tag name" should be in the list
    And The tag "test tag name" has slug starting with "tag"

  @run
  Scenario Outline: ET02_1 - Crear un tag con nombre existente
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    And I click on save tag button
    And I go to tags list
    And the tag should be in the list
    And I click on new tag button
    And I fill tag name with the previous tag name
    When I click on save tag button
    Then I go to tags list
    And There are 2 or more tags with the previous tag name in the tag list

    Examples:
      | tagName                     |
      | {a_priori(tag-tuple1_name)} |
      | {faker(alphanumeric)}       | 

  Scenario Outline: ET03_1 - Crear un tag con un nombre satisfactoriamente
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I create pseudo random data with seed "31"
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    When I click on save tag button
    Then I should see tag title

    Examples:
      | tagName                     |
      | {a_priori(tag-tuple1_name)} |
      | {faker(alphanumeric)}       |    

  Scenario Outline: ET04_1 - Crear un tag con metadata
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I create pseudo random data with seed "41"
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    And I expand the metadata section
    And I fill the metadata title with the tag name and description "<tagMetadataDesc>"
    When I click on save tag button
    Then I should see tag title

    Examples:
      | tagName                     | tagMetadataDesc             |
      | {a_priori(tag-tuple1_name)} | {a_priori(tag-tuple1_desc)} | 
      | {faker(alphanumeric)}       | {faker(alphanumeric_100)}       |
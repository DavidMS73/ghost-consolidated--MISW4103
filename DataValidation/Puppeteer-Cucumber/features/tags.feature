Feature: Create tags
  Create a new tag

  @run
  Scenario Outline: ET01 - Crear un tag modificando su slug con caracteres especiales
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I create pseudo random data with seed "11"
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    And I fill the slug with an emoji
    When I click on save tag button
    And I go to tags list
    Then the tag should be in the list
    And The tag has slug starting with "tag"

    Examples:
      | tagName                     |
      | {a_priori(tag-tuple1_name)} |
      | {pseudo_aleatorio(tag-name)}|
      | {faker(alphanumeric)}       | 

  Scenario Outline: ET02 - Crear un tag con nombre existente
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I create pseudo random data with seed "21"
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
      | {pseudo_aleatorio(tag-name)}|
      | {faker(alphanumeric)}       | 

  Scenario Outline: ET03 - Crear un tag con un nombre satisfactoriamente
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
      | {pseudo_aleatorio(tag-name)}|
      | {faker(alphanumeric)}       |    

  Scenario Outline: ET04 - Crear un tag con metadata
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
      | {pseudo_aleatorio(tag-name)}| {pseudo_aleatorio(tag-desc)}|
      | {faker(alphanumeric)}       | {faker(alphanumeric_100)}       |
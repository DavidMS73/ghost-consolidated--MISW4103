Feature: Create tags
  Create a new tag

  Scenario Outline: ET01 - Crear un tag modificando su slug con caracteres especiales
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    And I fill the slug with an emoji
    When I click on save tag button
    And I go to "public" tags list
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
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    And I click on save tag button
    And I go to "public" tags list
    And the tag should be in the list
    And I click on new tag button
    And I fill tag name with the previous tag name
    When I click on save tag button
    Then I go to "public" tags list
    And There are 2 or more tags with the previous tag name in the tag list

    Examples:
      | tagName                     |
      | {a_priori(tag-tuple2_name)} |
      | {pseudo_aleatorio(tag-name)}|
      | {faker(alphanumeric)}       | 

  Scenario Outline: ET03 - Crear un tag con un nombre satisfactoriamente
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    When I click on save tag button
    Then I should see tag title

    Examples:
      | tagName                     |
      | {a_priori(tag-tuple3_name)} |
      | {pseudo_aleatorio(tag-name)}|
      | {faker(alphanumeric)}       |    

  Scenario Outline: ET04 - Crear un tag con metadata
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    And I expand the metadata section
    And I fill the metadata title with the tag name and description "<tagMetadataDesc>"
    When I click on save tag button
    Then I should see tag title

    Examples:
      | tagName                     | tagMetadataDesc             |
      | {a_priori(tag-tuple4_name)} | {a_priori(tag-tuple4_desc)} |
      | {pseudo_aleatorio(tag-name)}| {pseudo_aleatorio(tag-desc)}|
      | {faker(alphanumeric)}       | {faker(alphanumeric_100)}   |

  Scenario Outline: ET05 - Crear un tag interno
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    When I click on save tag button
    Then I go to "internal" tags list
    And The tag has slug starting with "hash"

    Examples:
      | tagName                              |
      | {a_priori(tag-tuple5_name)}          |
      | {pseudo_aleatorio(tag-internalName)} |
      | {faker(internal_alphanumeric)}       |       

 Scenario Outline: ET06 - Crear tag interno con codigo hexa de color
    Given I navigate to "tags" section
    And I login to the application if necessary
    And I navigate to "tags" section
    And I click on new tag button
    And I fill tag name with "<tagName>"
    And I fill the color input with "<color>"
    When I click on save tag button
    Then I go to "internal" tags list
    And The tag has slug starting with "hash"

    Examples:
      | tagName                              | color                         |
      | {a_priori(tag-tuple6_name)}          | {a_priori(tag-tuple6_color)}  |
      | {pseudo_aleatorio(tag-internalName)} | {pseudo_aleatorio(tag-color)} |
      | {faker(internal_alphanumeric)}       | {faker(hex_color)}| 
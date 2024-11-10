Feature: Crear tag

@user1 @web
Scenario: E009 - Crear un tag modificando su slug con caracteres especiales
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I click the tags button
    And I wait for 1 seconds
    And I click the new tag button
    And I wait for 1 seconds
    And I fill the tag name with string "$name_1"
    And I wait for 1 seconds
    And I fill the slug with an emoji
    And I wait for 1 seconds
    And I click the save tag button
    And I wait for 1 seconds
    And I click the tags button
    And I wait for 1 seconds
    Then I validate the new tag name "$$name_1" is in the tag list
    And I validate that tag with name "$$name_1" has slug starting with "tag"

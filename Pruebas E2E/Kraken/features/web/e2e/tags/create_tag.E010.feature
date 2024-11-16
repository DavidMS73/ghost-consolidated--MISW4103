Feature: Crear tag

@user1 @web
Scenario: E010 - Crear un tag con nombre existente
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
    And I click the save tag button
    And I wait for 1 seconds
    And I click the tags button
    And I wait for 1 seconds
    Then I validate the new tag name "$$name_1" is in the tag list
    When I click the new tag button
    And I wait for 1 seconds
    And I fill the tag name with string "$$name_1"
    And I wait for 1 seconds
    And I click the save tag button
    And I wait for 1 seconds
    And I click the tags button
    And I wait for 1 seconds
    Then I validate that there are 2 or more tags with name "$$name_1" in the tag list
    And I wait for 1 seconds

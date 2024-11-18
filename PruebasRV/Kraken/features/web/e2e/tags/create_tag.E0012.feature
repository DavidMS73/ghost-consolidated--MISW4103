Feature: Crear tag

  @user1 @web
  Scenario: E0012 - Crear un tag con un nombre satisfactorio y metadata
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
    And I expand the metadata section
    And I wait for 1 seconds
    And I fill the metadata title with text "$$name_1" and the metadata description with text "$string_1"
    And I wait for 1 seconds
    When I click the save tag button
    And I wait for 2 seconds
    And I should see title "$$name_1"

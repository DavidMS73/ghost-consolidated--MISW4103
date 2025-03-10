Feature: Create tags

  @user1 @web
  Scenario: E0011 - Crear un tag con un nombre satisfactorio
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E011" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E011" and step "2"
    And I click the tags button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E011" and step "3"
    And I click the new tag button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E011" and step "4"
    And I fill the tag name with string "$name_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E011" and step "5"
    When I click the save tag button
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E011" and step "6"
    Then I should see title "$$name_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E011" and step "7"

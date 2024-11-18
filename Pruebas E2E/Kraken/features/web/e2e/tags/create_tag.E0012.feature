Feature: Crear tags

  @user1 @web
  Scenario: E0012 - Crear un tag con un nombre satisfactorio y metadata
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "2"
    And I click the tags button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "3"
    And I click the new tag button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "4"
    And I fill the tag name with string "$name_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "5"
    And I expand the metadata section
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "6"
    And I fill the metadata title with text "$$name_1" and the metadata description with text "$string_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "7"
    When I click the save tag button
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "8"
    And I should see title "$$name_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E012" and step "9"

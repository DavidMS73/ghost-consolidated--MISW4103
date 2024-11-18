Feature: Create tags

  @user1 @web
  Scenario: E010 - Crear un tag con nombre existente
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "2"
    And I click the tags button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "3"
    And I click the new tag button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "4"
    And I fill the tag name with string "$name_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "5"
    And I click the save tag button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "6"
    And I click the tags button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "7"
    And I validate the new tag name "$$name_1" is in the tag list
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "8"
    And I click the new tag button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "9"
    And I fill the tag name with string "$$name_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "10"
    When I click the save tag button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "11"
    Then I click the tags button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "12"
    And I validate that there are 2 or more tags with name "$$name_1" in the tag list
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-tags" and scenario "E010" and step "13"

Feature: Crear vista de posts

  @user1 @web
  Scenario: E019 - Al presionar el botón "cancel" se cierra el modal de creación de vista
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "2"
    And I click the posts button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "3"
    And I filter by featured posts
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "4"
    And view of featured posts should not exist
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "5"
    And I click on create view button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "6"
    When I click on cancel view creation button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "7"
    Then view creation modal should hide
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E019" and step "8"

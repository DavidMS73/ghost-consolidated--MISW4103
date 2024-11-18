Feature: Crear vista de posts

  @user1 @web
  Scenario: E018 - Al intentar crear una vista sin un nombre se muestra un mensaje de error
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "2"
    And I click the posts button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "3"
    And I filter by featured posts
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "4"
    And view of featured posts should not exist
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "5"
    And I click on create view button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "6"
    When I click on save view button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "7"
    Then an error should appear indicating that the view name is required
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-post-view" and scenario "E018" and step "8"

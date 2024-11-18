Feature: Crear vista de posts

  @user1 @web
  Scenario: E017 - Vista creada se despliega cuando se le asigna un nombre y se hace click en guardar
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "2"
    And I click the posts button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "3"
    And I filter by featured posts
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "4"
    And view of featured posts should not exist
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "5"
    And I click on create view button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "6"
    And I fill the view name field with "$name_1"
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "7"
    When I click on save view button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "8"
    Then view should appear in sidebar under posts section with name "$$name_1"
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "9"
    And current view should be "$$name_1"
    And I save a ss of version "4.5" and feature "create-post-view" and scenario "E017" and step "10"

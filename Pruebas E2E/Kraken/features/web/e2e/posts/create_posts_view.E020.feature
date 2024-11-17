Feature: Crear vista de posts

  @user1 @web
  Scenario: E020 - El botón de crear vista se muestra al seleccionar el filtro "public" dentro del desplegable "all access"
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I click the posts button
    And I wait for 1 seconds
    When I filter by public posts
    And I wait for 1 seconds
    Then create view button should exist

Feature: Create page

  @run
  Scenario: E005 - Crear una página básica, darle al botón de preview y luego al botón de publicar
    Given I navigate to ghost local page
    When I login to the application if necessary
    And I navigate to "pages" section

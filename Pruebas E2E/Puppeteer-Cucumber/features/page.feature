Feature: Create page

  @run
  Scenario: E005 - Crear una página básica, darle al botón de preview y luego al botón de publicar
    Given I navigate to "dashboard" section
    When I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Basic page"
    And I click the page content
    And I click preview button
    And I click publish button
    And I click continue final review button
    And I click confirm publish page button
    Then I should see title "Basic page" inside a modal

Feature: Create page

  Scenario: ERV03 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to "home" section
    When I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title"
    And I fill the page content with text "Page content"
    And I click publish menu
    And I click publish page button
    And I navigate to "pages" section
    And I click the pages type filter
    And I click the published pages filter
    Then I should see the first page with title "Page title"
    And I click first page
    And I click gear button
    And I click delete page
    And I click delete button

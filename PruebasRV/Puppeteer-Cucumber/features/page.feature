Feature: Create page

  @rv-45
  Scenario: E006 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title"
    And I fill the page content with text "Page content"
    And I click publish menu
    When I click publish page button
    And I navigate to "pages" section
    And I click the pages type filter
    And I click the published pages filter
    Then I should see the first page with title "Page title"
    And I click first page
    And I click gear button
    And I click delete page
    And I click delete button

  @rv-45 @run
  Scenario: E021 - Crear una página con título, texto en el cuerpo y una URL customizada y publicarla
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title 2"
    And I fill the page content with text "Page content 2"
    And I click gear button
    And I fill page URL with value "custom-url"
    And I close page settings drawer
    When I click publish menu
    And I click publish page button
    And I navigate to "pages" section
    And I click the pages type filter
    And I click the published pages filter
    Then I should see the first page with title "Page title 2"
    And I navigate to created page "custom-url" site
    And I validate title "Page title 2" in page view
    And I navigate to "pages" section
    And I click the pages type filter
    And I click the published pages filter
    And I click first page
    And I click gear button
    And I click delete page
    And I click delete button

Feature: Create page

  Scenario: E005 - Crear una página básica, darle al botón de preview y luego al botón de publicar
    Given I navigate to "home" section
    When I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Basic page"
    And I click the page content
    And I click preview button
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    Then I should see title "Basic page" inside a modal
    When I click the pages type filter
    And I click the published pages filter
    Then I should see the first page with title "Basic page"

  Scenario: E006 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to "home" section
    When I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title"
    And I fill the page content with text "Page content"
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    Then I should see title "Page title" and content "Page content" inside a modal
    When I click the pages type filter
    And I click the published pages filter
    Then I should see the first page with title "Page title"

  Scenario: E007 - Crear una página con una imagen adjunta
    Given I navigate to "dashboard" section
    When I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title"
    And I click the page content
    And I fill the page content with text "Page content"
    And I fill the image with an asset
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    Then I should see title "Page title" and content "Page content" inside a modal
    When I click the pages type filter
    And I click the published pages filter
    Then I should see the first page with title "Page title"

  Scenario: E008 - Crear una página con un audio adjunto
    Given I navigate to "dashboard" section
    When I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title"
    And I click the page content
    And I click the add button
    And I click the audio button
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    Then I should see title "Page title" inside a modal
    When I click the pages type filter
    And I click the published pages filter
    Then I should see the first page with title "Page title"

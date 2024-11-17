Feature: Create page

  Scenario: E005 - Crear una página básica, darle al botón de preview y luego al botón de publicar
    Given I navigate to "home" section
    And I login to the application if necessary
    When I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Basic page"
    And I click the page content
    And I click preview button
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    Then I should see title "Basic page" inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title "Basic page"

  Scenario: E0061 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to "home" section
    And I login to the application if necessary
    When I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title"
    And I fill the page content with text "Page content"
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    Then I should see title "Page title" and content "Page content" inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title "Page title"

  Scenario: E0062 - Crear una página con título, texto en el cuerpo y una URL customizada y publicarla
    Given I navigate to "home" section
    When I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "Page title"
    And I fill the page content with text "Page content"
    And I click gear button
    And I fill page URL with value "custom-url"
    And I click gear button
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    Then I should see title "Page title" and content "Page content" inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title "Page title"
    And I navigate to created page "custom-url" site
    And I validate title "Page title" in page view
    And I validate content "Page content" in page view
    And I navigate to "pages" section
    And I click the pages type filter
    And I click the published pages filter
    And I click first page
    And I click gear button
    And I click delete page
    And I click delete button

  Scenario: E007 - Crear una página con una imagen adjunta
    Given I navigate to "dashboard" section
    And I login to the application if necessary
    When I navigate to "pages" section
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
    And I login to the application if necessary
    When I navigate to "pages" section
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

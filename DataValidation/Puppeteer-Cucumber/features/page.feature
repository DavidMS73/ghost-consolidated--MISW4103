Feature: Create page

  Scenario Outline: EPA01 - Crear una página básica, darle al botón de preview y luego al botón de publicar
    Given I navigate to "home" section
    And I login to the application if necessary
    And I create pseudo random data with seed "10"
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I click the page content
    And I click preview button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title

    Examples:
      | title |
      | {data_pool(page-tuple1_title)} |
      | {dynamic_data_pool(page-title)} |
      | {faker(alphanumeric)} |

  @rv-596
  Scenario: EPA02 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to "home" section
    And I login to the application if necessary
    And I create pseudo random data with seed "20"
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title

    Examples:
      | title | content |
      | {data_pool(page-tuple1_title)} | {data_pool(page-tuple1_content)} |
      | {dynamic_data_pool(page-title)} | {dynamic_data_pool(page-content)} |
      | {faker(alphanumeric)} | {faker(paragraph)} |

  Scenario: EPA03 - Crear una página con una imagen adjunta
    Given I navigate to "dashboard" section
    And I login to the application if necessary
    And I create pseudo random data with seed "30"
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I click the page content
    And I fill the page content with text "<content>"
    And I fill the image with an asset
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title

    Examples:
      | title | content |
      | {data_pool(page-tuple1_title)} | {data_pool(page-tuple1_content)} |
      | {dynamic_data_pool(page-title)} | {dynamic_data_pool(page-content)} |
      | {faker(alphanumeric)} | {faker(paragraph)} |

  Scenario: EPA04 - Crear una página con un audio adjunto
    Given I navigate to "dashboard" section
    And I login to the application if necessary
    And I create pseudo random data with seed "40"
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I click the page content
    And I click the add button
    And I click the audio button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title

    Examples:
      | title |
      | {data_pool(page-tuple1_title)} |
      | {dynamic_data_pool(page-title)} |
      | {faker(alphanumeric)} |

  @rv-596
  Scenario: EPA05 - Crear una página con título, texto en el cuerpo y una URL customizada y publicarla
    Given I navigate to "home" section
    And I login to the application if necessary
    And I create pseudo random data with seed "50"
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click gear button
    And I fill page URL with value "<customUrl>"
    And I click gear button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title
    And I navigate to created page site
    And I validate title in page view
    And I navigate to "pages" section
    And I click the pages type filter
    And I click the published pages filter
    And I click first page
    And I click gear button
    And I click delete page
    And I click delete button

    Examples:
      | title | content | customUrl |
      | {data_pool(page-tuple1_title)} | {data_pool(page-tuple1_content)} | {data_pool(page-tuple1_customUrl)} |
      | {dynamic_data_pool(page-title)} | {dynamic_data_pool(page-content)} | {dynamic_data_pool(page-customUrl)} |
      | {faker(alphanumeric)} | {faker(paragraph)} | {faker(alphanumeric)} |

  Scenario: EPA06 - Crear una página con título y texto en el cuerpo para sólo miembros
    Given I navigate to "home" section
    And I login to the application if necessary
    And I create pseudo random data with seed "60"
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click gear button
    And I click page access dropdown
    And I click members only button
    And I click gear button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I click access filter
    And I click members only filter
    And I should see the first page with title

    Examples:
      | title | content |
      | {data_pool(page-tuple1_title)} | {data_pool(page-tuple1_content)} |
      | {dynamic_data_pool(page-title)} | {dynamic_data_pool(page-content)} |
      | {faker(alphanumeric)} | {faker(paragraph)} |
  
  Scenario: EPA07 - Crear una página con título y texto en el cuerpo para sólo miembros pagos
    Given I navigate to "home" section
    And I login to the application if necessary
    And I create pseudo random data with seed "70"
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click gear button
    And I click page access dropdown
    And I click paid members only button
    And I click gear button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I click access filter
    And I click paid members only filter
    And I should see the first page with title

    Examples:
      | title | content |
      | {data_pool(page-tuple1_title)} | {data_pool(page-tuple1_content)} |
      | {dynamic_data_pool(page-title)} | {dynamic_data_pool(page-content)} |
      | {faker(alphanumeric)} | {faker(paragraph)} |

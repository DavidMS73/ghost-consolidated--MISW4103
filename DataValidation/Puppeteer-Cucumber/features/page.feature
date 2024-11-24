Feature: Create page

  @run
  Scenario Outline: EPA01 - Crear una página básica, darle al botón de preview y luego al botón de publicar
    Given I navigate to "home" section
    And I login to the application if necessary
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
      | title                          |
      | {a_priori(page-tuple1_title)}  |
      | {pseudo_aleatorio(page-title)} |
      | {faker(alphanumeric)}          |

  @rv-596
  Scenario: EPA02 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to "home" section
    And I login to the application if necessary
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
      | title                          | content                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               |

  Scenario: EPA03 - Crear una página con una imagen adjunta
    Given I navigate to "dashboard" section
    And I login to the application if necessary
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
      | title                          | content                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               |

  Scenario: EPA04 - Crear una página con un audio adjunto
    Given I navigate to "dashboard" section
    And I login to the application if necessary
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
      | title                          |
      | {a_priori(page-tuple1_title)}  |
      | {pseudo_aleatorio(page-title)} |
      | {faker(alphanumeric)}          |

  @rv-596
  Scenario: EPA05 - Crear una página con título, texto en el cuerpo y una URL customizada y publicarla
    Given I navigate to "home" section
    And I login to the application if necessary
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
      | title                          | content                          | customUrl                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  | {a_priori(page-tuple1_customUrl)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} | {pseudo_aleatorio(page-customUrl)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               | {faker(alphanumeric)}              |

  Scenario: EPA06 - Crear una página con título y texto en el cuerpo para sólo miembros
    Given I navigate to "home" section
    And I login to the application if necessary
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
      | title                          | content                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               |

  Scenario: EPA07 - Crear una página con título y texto en el cuerpo para sólo miembros pagos
    Given I navigate to "home" section
    And I login to the application if necessary
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
      | title                          | content                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               |

  Scenario: EPA08 - Crear una página con título, texto en el cuerpo y excerpt
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click gear button
    And I fill excerpt with "<excerpt>"
    And I click gear button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see page title and excerpt inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title

    Examples:
      | title                          | content                          | excerpt                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  | {a_priori(page-tuple1_excerpt)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} | {pseudo_aleatorio(page-excerpt)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               | faker(paragraph)                 |

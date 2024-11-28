@pages
Feature: Create page

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
    And I delete all the info

    Examples:
      | title                          |
      | {a_priori(page-tuple1_title)}  |
      | {pseudo_aleatorio(page-title)} |
      | {faker(alphanumeric)}          |

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
    And I delete all the info

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
    And I delete all the info

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
    And I delete all the info

    Examples:
      | title                          |
      | {a_priori(page-tuple1_title)}  |
      | {pseudo_aleatorio(page-title)} |
      | {faker(alphanumeric)}          |

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
    And I delete all the info

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
    And I delete all the info

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
    And I delete all the info

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
    And I delete all the info

    Examples:
      | title                          | content                          | excerpt                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  | {a_priori(page-tuple1_excerpt)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} | {pseudo_aleatorio(page-excerpt)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               | faker(paragraph)                 |

  Scenario: EPA09 - Crear una página con título y texto en el cuerpo escondiendo el título y la imagen destacada
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click gear button
    And I copy page URL
    And I toggle show title and feature image
    And I click gear button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see page title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title
    And I navigate to created page site
    And I check page title is absent
    And I validate content in page view
    And I navigate to "home" section
    And I delete all the info

    Examples:
      | title                          | content                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               |

  Scenario: EPA10 - Crear una página destacada
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click gear button
    And I toggle feature page
    And I click gear button
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title
    And I validate first page is featured
    And I delete all the info

    Examples:
      | title                          | content                          |
      | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  |
      | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}               |

  @sem-8
  Scenario: EPA11 - Editar título y descripción de página publicada
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    And I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title
    And I click first page
    And I delete page title
    And I fill the page title with text "<new_title>"
    And I fill the page content with text "<new_content>"
    And I click update page button
    And I click edit page back
    And I click the pages type filter
    When I click the published pages filter
    Then I should see the first page with title
    And I delete all the info

  Examples:
    | title                          | content                          | new_title | new_content |
    | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  | {a_priori(page-tuple2_title)} | {a_priori(page-tuple2_content)} |
    | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} | {pseudo_aleatorio(page-title_random)} | {pseudo_aleatorio(page-content_random)} |
    | {faker(alphanumeric)}          | {faker(paragraph)}               | {faker(alphanumeric)} | {faker(paragraph)} |

  @sem-8
  Scenario: EPA12 - Agregar imagen destacada a página publicada
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "pages" section
    And I click on new page button
    And I fill the page title with text "<title>"
    And I fill the page content with text "<content>"
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    And I should see title and content inside a modal
    And I click the pages type filter
    And I click the published pages filter
    And I should see the first page with title
    And I click first page
    And I fill the image with an asset
    And I click update page button
    And I click edit page back
    And I click the pages type filter
    When I click the published pages filter
    Then I should see the first page with title
    And I delete all the info

  Examples:
    | title                          | content                          |
    | {a_priori(page-tuple1_title)}  | {a_priori(page-tuple1_content)}  |
    | {pseudo_aleatorio(page-title)} | {pseudo_aleatorio(page-content)} |
    | {faker(alphanumeric)}          | {faker(paragraph)}               |

Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  Scenario Outline: EPO01 - Create a post with title and description to be published later
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I fill post description with "<description>"
    And I click publish button
    And I click on post time options
    And I click on schedule for later post option
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I go to scheduled posts
    And the post created should be in the list
    And I delete all the info

    Examples:
      | title                          | description                          |
      | {a_priori(post-tuple1_title)}  | {a_priori(post-tuple1_description)}  |
      | {pseudo_aleatorio(post-title)} | {pseudo_aleatorio(post-description)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}                   |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  Scenario Outline: EPO02 - Create a post with title and description to be published right now
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I fill post description with "<description>"
    And I click publish button
    And I click on post time options
    And I click on set it live now option
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and content inside a modal
    And I go to published posts
    And the post created should be in the list
    And I delete all the info

    Examples:
      | title                          | description                          |
      | {a_priori(post-tuple2_title)}  | {a_priori(post-tuple2_description)}  |
      | {pseudo_aleatorio(post-title)} | {pseudo_aleatorio(post-description)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}                   |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  Scenario Outline: EPO03 - Create a post with title and a feature image
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I upload a feature image "<image>"
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and a image inside a modal
    And I go to published posts
    And the post created should be in the list
    And I delete all the info

    Examples:
      | title                          | image                                 |
      | {a_priori(post-tuple3_title)}  | {a_priori(post-tuple3_featureImage)}  |
      | {pseudo_aleatorio(post-title)} | {pseudo_aleatorio(post-featureImage)} |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio

  Scenario Outline: EPO04 - Create a post without title and with description
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post description with "<description>"
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title (Untitled) and correct description inside a modal
    And I go to published posts
    And the post (Untitled) should be in the list
    And I delete all the info

    Examples:
      | description                          |
      | {a_priori(post-tuple4_description)}  |
      | {pseudo_aleatorio(post-description)} |
      | {faker(paragraph)}                   |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  Scenario Outline: EPO05 - Create a post with 255 chars in title (max frontier)
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title inside a modal
    And I go to published posts
    And the post created should be in the list
    And I delete all the info

    Examples:
      | title                     |
      | {faker(alphanumeric_255)} |
    # El primer example ejecuta la función de faker (datos completamente aleatorios)

  @run
  Scenario Outline: EPO06 - Create a post with 256 chars in title (max frontier + 1)
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    When I click on editor page
    Then I should not see the publish button

    Examples:
      | title                     |
      | {faker(alphanumeric_256)} |
    # El primer example ejecuta la función de faker (datos completamente aleatorios)

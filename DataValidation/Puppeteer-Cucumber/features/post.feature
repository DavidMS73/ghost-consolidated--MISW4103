Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @run
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

    Examples:
      | title                          | description                          |
      | {a_priori(post-tuple1_title)}  | {a_priori(post-tuple1_description)}  |
      | {pseudo_aleatorio(post-title)} | {pseudo_aleatorio(post-description)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}                   |
      # El primer example ejecuta la función de pool de datos a-priori
      # El segundo example ejecuta la función pool de datos pseudo-aleatorio
      # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  Scenario: E002 - Create a post to be published right now (check default option)
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "Test post right now"
    And I fill post description with "Description test post right now"
    And I click publish button
    And I click on post time options
    And I click on set it live now option
    And I click continue final review button
    When I click confirm publish button
    Then I should see title "Test post right now" and content "Description test post right now" inside a modal
    And I go to published posts
    And the post "Test post right now" should be in the list

  Scenario: E003 - Create a post with feature image
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "Post with feature image"
    And I upload a feature image
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title "Post with feature image" and a image inside the modal
    And I go to published posts
    And the post "Post with feature image" should be in the list

  @rv-596
  Scenario: E004 - Create a post without title and with description
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post description with "Description test post without title"
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title "(Untitled)" and content "Description test post without title" inside a modal
    And I go to published posts
    And the post "(Untitled)" should be in the list

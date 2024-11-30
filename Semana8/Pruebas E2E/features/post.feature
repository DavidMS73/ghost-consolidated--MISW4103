@posts
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

  Scenario Outline: EPO07 - Create a post with title and an audio file
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I upload an audio "<audio>"
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and some content related inside a modal
    And I go to published posts
    And the post created should be in the list
    And I delete all the info

    Examples:
      | title                         | audio                         |
      | {a_priori(post-tuple5_title)} | {a_priori(post-tuple5_audio)} |
      | {a_priori(post-tuple6_title)} | {a_priori(post-tuple6_audio)} |
      | {a_priori(post-tuple7_title)} | {a_priori(post-tuple7_audio)} |
      | {a_priori(post-tuple8_title)} | {a_priori(post-tuple8_audio)} |
    # El primer example ejecuta la función de pool de datos a-priori con MP3
    # El segundo example ejecuta la función de pool de datos a-priori con OGG
    # El tercer example ejecuta la función de pool de datos a-priori con M4A
    # El cuarto example ejecuta la función de pool de datos a-priori con WAV

  Scenario Outline: EPO08 - Create a post with title and a video file
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I upload a video "<video>"
    And I click publish button
    And I click continue final review button
    When I click confirm publish button
    Then I should see title and some content related inside a modal
    And I go to published posts
    And the post created should be in the list
    And I delete all the info

    Examples:
      | title                          | video                          |
      | {a_priori(post-tuple9_title)}  | {a_priori(post-tuple9_video)}  |
      | {a_priori(post-tuple10_title)} | {a_priori(post-tuple10_video)} |
    # El primer example ejecuta la función de pool de datos a-priori con MP4
    # El segundo example ejecuta la función de pool de datos a-priori con WEBM

  Scenario Outline: EPO09 - Create a post with title and an using video option but loading an image file
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    When I upload a video "<video>"
    Then I should see an error in video preview editor

    Examples:
      | title                          | video                          |
      | {a_priori(post-tuple11_title)} | {a_priori(post-tuple11_video)} |

  @sem-8
  Scenario Outline: EPO10 - Edit title and description of a post that will be published later
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
    And I click confirm publish button
    And I should see title and content inside a modal
    And I go to scheduled posts
    And I click on the post created to edit
    And I delete post existing title
    And I change post title with "<new_title>"
    And I complement post description with "<new_description>"
    When I click update button
    Then I should see a small modal with title "Post updated"
    And I navigate to "posts" section
    And I go to scheduled posts
    And the post updated should be in the list
    And I delete all the info

    Examples:
      | title                          | description                          | new_title                         | new_description                         |
      | {a_priori(post-tuple1_title)}  | {a_priori(post-tuple1_description)}  | {a_priori(post-tuple1_newTitle)}  | {a_priori(post-tuple1_newDescription)}  |
      | {pseudo_aleatorio(post-title)} | {pseudo_aleatorio(post-description)} | {pseudo_aleatorio(post-newTitle)} | {pseudo_aleatorio(post-newDescription)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}                   | {faker(alphanumeric)}             | {faker(paragraph)}                      |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  @sem-8
  Scenario Outline: EPO11 - Edit title and description of a post that already was published
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
    And I click confirm publish button
    And I should see title and content inside a modal
    And I go to published posts
    And I click on the post created to edit
    And I delete post existing title
    And I change post title with "<new_title>"
    And I complement post description with "<new_description>"
    When I click update button
    Then I should see a small modal with title "Post updated"
    And I navigate to "posts" section
    And I go to published posts
    And the post updated should be in the list
    And I delete all the info

    Examples:
      | title                          | description                          | new_title                         | new_description                         |
      | {a_priori(post-tuple2_title)}  | {a_priori(post-tuple2_description)}  | {a_priori(post-tuple2_newTitle)}  | {a_priori(post-tuple2_newDescription)}  |
      | {pseudo_aleatorio(post-title)} | {pseudo_aleatorio(post-description)} | {pseudo_aleatorio(post-newTitle)} | {pseudo_aleatorio(post-newDescription)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}                   | {faker(alphanumeric)}             | {faker(paragraph)}                      |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  @sem-8
  Scenario Outline: EPO12 - Add a feature image of a post with title that already was published
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    And I should see title inside a modal
    And I go to published posts
    And I click on the post created to edit
    And I delete post existing title
    And I change post title with "<new_title>"
    And I upload a feature image "<image>"
    When I click update button
    Then I should see a small modal with title "Post updated"
    And I navigate to "posts" section
    And I go to published posts
    And the post updated should be in the list
    And I click on the post created to edit
    And I should see the feature image in the post editor
    And I navigate to "posts" section
    And I delete all the info

    Examples:
      | title                          | image                                 | new_title                         |
      | {a_priori(post-tuple12_title)} | {a_priori(post-tuple12_featureImage)} | {a_priori(post-tuple12_newTitle)} |
    # El primer example ejecuta la función de pool de datos a-priori

  @sem-8
  Scenario Outline: EPO13 - Edit a post that was created without title, it was set Untitled and change it
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post description with "<description>"
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    And I should see title (Untitled) and correct description inside a modal
    And I go to published posts
    And I click on the post created to edit
    And I change post title with "<newTitle>"
    When I click update button
    Then I should see a small modal with title "Post updated"
    And I navigate to "posts" section
    And I go to published posts
    And the post updated should be in the list
    And I delete all the info

    Examples:
      | description                          | newTitle                       |
      | {a_priori(post-tuple13_description)} | {a_priori(post-tuple13_title)} |
      | {pseudo_aleatorio(post-description)} | {pseudo_aleatorio(post-title)} |
      | {faker(paragraph)}                   | {faker(alphanumeric)}          |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  @sem-8
  Scenario Outline: EPO14 - Create a post with title and description, not publish and it should be in drafts
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I fill post description with "<description>"
    When I return to posts section
    Then I go to drafts posts
    And the post created should be in the list
    And I delete all the info

    Examples:
      | title                          | description                          |
      | {a_priori(post-tuple14_title)} | {a_priori(post-tuple14_description)} |
      | {pseudo_aleatorio(post-title)} | {pseudo_aleatorio(post-description)} |
      | {faker(alphanumeric)}          | {faker(paragraph)}                   |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  @sem-8
  Scenario Outline: EPO15 - Edit a post with title that will be published later and add a WAV audio
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I click publish button
    And I click on post time options
    And I click on schedule for later post option
    And I click continue final review button
    And I click confirm publish button
    Then I should see title inside a modal
    And I go to scheduled posts
    And I click on the post created to edit
    And I click on editor page
    And I upload an audio "<audio>"
    When I click update button
    Then I should see a small modal with title "Post updated"
    And I navigate to "posts" section
    And I go to scheduled posts
    And the post with original title should be in the list
    And I delete all the info

    Examples:
      | title                          | audio                          |
      | {a_priori(post-tuple15_title)} | {a_priori(post-tuple15_audio)} |
    # El primer example ejecuta la función de pool de datos a-priori

  @sem-8
  Scenario Outline: EPO23 - Edit a post with title that will be published later and add a MP4 video
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I click publish button
    And I click on post time options
    And I click on schedule for later post option
    And I click continue final review button
    And I click confirm publish button
    Then I should see title inside a modal
    And I go to scheduled posts
    And I click on the post created to edit
    And I click on editor page
    And I upload a video "<video>"
    When I click update button
    Then I should see a small modal with title "Post updated"
    And I navigate to "posts" section
    And I go to scheduled posts
    And the post with original title should be in the list
    And I delete all the info

    Examples:
      | title                          | video                          |
      | {a_priori(post-tuple17_title)} | {a_priori(post-tuple17_video)} |
    # El primer example ejecuta la función de pool de datos a-priori

  @sem-8
  Scenario Outline: EPO24 - Edit a post that was created with title and unpublish it
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I click publish button
    And I click continue final review button
    And I click confirm publish button
    And I should see title inside a modal
    And I go to published posts
    And I click on the post created to edit
    And I click unpublish button
    When I click unpublish and revert to private draft
    Then I should see a small modal with title "Post reverted to a draft."
    And I navigate to "posts" section
    And I go to drafts posts
    And the post with original title should be in the list
    And I delete all the info

    Examples:
      | title                          |
      | {a_priori(post-tuple18_title)} |
      | {pseudo_aleatorio(post-title)} |
      | {faker(alphanumeric)}          |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

  @sem-8
  Scenario Outline: EPO25 - Edit a post with title and load a feature image
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "<title>"
    And I click on editor page
    And I click publish button
    And I click on post time options
    And I click on schedule for later post option
    And I click continue final review button
    And I click confirm publish button
    Then I should see title inside a modal
    And I go to scheduled posts
    And I click on the post created to edit
    And I click on editor page
    And I upload a feature image "<image>"
    When I click update button
    Then I should see a small modal with title "Post updated"
    And I navigate to "posts" section
    And I go to scheduled posts
    And the post with original title should be in the list
    And I delete all the info

    Examples:
      | title                          | image                                 |
      | {a_priori(post-tuple16_title)} | {a_priori(post-tuple16_featureImage)} |
    # El primer example ejecuta la función de pool de datos a-priori
    # El segundo example ejecuta la función pool de datos pseudo-aleatorio
    # El tercer example ejecuta la función de faker (datos completamente aleatorios)

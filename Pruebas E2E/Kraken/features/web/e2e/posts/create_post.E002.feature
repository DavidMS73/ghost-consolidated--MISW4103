Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @user2 @web
  Scenario: E002 - Create a post to be published right now (check default option)
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 2 seconds
    And I click the posts button
    And I wait for 1 seconds
    And I click on new post button
    And I wait for 1 seconds
    And I fill post title with "$name_1"
    And I wait for 1 seconds
    And I fill post description with "$string_1"
    And I wait for 1 seconds
    And I click publish button
    And I wait for 1 seconds
    And I click on post time options
    And I wait for 1 seconds
    And I click on set it live now option
    And I wait for 1 seconds
    And I click continue final review button
    And I wait for 1 seconds
    When I click confirm publish button
    And I wait for 1 seconds
    Then I should see title "$$name_1" and content "$$string_1" inside a modal
    And I wait for 1 seconds
    And I go to published posts
    And I wait for 1 seconds
    And the post "$$name_1" should be in the list

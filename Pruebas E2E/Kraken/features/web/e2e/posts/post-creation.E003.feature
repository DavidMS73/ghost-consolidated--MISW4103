Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @user3 @web
  Scenario: E003 - Create a post with feature image
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    When I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 2 seconds
    And I visit posts section
    And I wait for 1 seconds
    And I click on new post button
    And I wait for 1 seconds
    And I fill post title with "$name_1"
    And I wait for 1 seconds
    And I upload a feature image
    And I wait for 1 seconds
    And I click on publish post button
    And I wait for 1 seconds
    And I program a post to be published right now
    And I wait for 1 seconds
    Then I go to published posts
    And I wait for 1 seconds
    And the post "$$name_1" should be in the list

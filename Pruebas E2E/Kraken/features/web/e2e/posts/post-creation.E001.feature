Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @user1 @web
  Scenario: E001 - Create a post to be published later
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    When I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 2 seconds
    And I visit posts section
    And I click on new post button
    And I fill post title with "$name_1"
    And I fill post description with "$string_1"
    And I click on publish post button
    And I program a post to be published later
    Then I go to scheduled posts
    And the post "$$name_1" should be in the list

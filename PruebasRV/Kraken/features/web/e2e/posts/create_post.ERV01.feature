Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @user1 @web
  Scenario: ERV01 - Create a post to be published later
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    When I click the posts button
    And I wait for 1 seconds
    And I click on new post button
    And I wait for 1 seconds
    And I fill post title with "Test post scheduled"
    And I wait for 2 seconds
    And I fill post description with "Description test post scheduled"
    And I wait for 1 seconds
    And I click publish button
    And I wait for 1 seconds
    And I just wait a few seconds
    And I wait for 1 seconds
    And I click on schedule for later post option
    And I wait for 1 seconds
    And I just wait a few seconds
    And I wait for 1 seconds
    And I click confirm publish button
    And I wait for 1 seconds
    Then I should see a toast message of "Scheduled"
    And I wait for 1 seconds
    And I go to scheduled posts
    And I wait for 1 seconds
    And the post "Test post scheduled" should be in the list

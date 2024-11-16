Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @user1 @web
  Scenario: ERV04 - Create a post without title and with description
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I click the posts button
    And I wait for 1 seconds
    When I click on new post button
    And I wait for 1 seconds
    And I fill post description with "Description test post without title"
    And I wait for 1 seconds
    And I click publish button
    And I wait for 1 seconds
    And I just wait a few seconds
    And I wait for 1 seconds
    And I click confirm publish button
    And I wait for 1 seconds
    Then I should see a toast message of "Published"
    And I wait for 1 seconds
    And I go to published posts
    And I wait for 1 seconds
    And the post "(Untitled)" should be in the list

Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @rv-45
  Scenario: E001 - Create a post to be published later
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post title with "Test post scheduled"
    And I fill post description with "Description test post scheduled"
    And I click publish button
    And I just wait a few seconds
    And I click on schedule for later post option
    And I just wait a few seconds
    When I click confirm publish button
    Then I should see a toast message of "Scheduled"
    And I go to scheduled posts
    And the post "Test post scheduled" should be in the list

  @rv-45
  Scenario: E004 - Create a post without title and with description
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I click on new post button
    And I fill post description with "Description test post without title"
    And I click publish button
    And I just wait a few seconds
    When I click confirm publish button
    Then I should see a toast message of "Published"
    And I go to published posts
    And the post "(Untitled)" should be in the list

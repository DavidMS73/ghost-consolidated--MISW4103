Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @user1 @web
  Scenario: E004 - Create a post without title and with description
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "2"
    And I click the posts button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "3"
    And I click on new post button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "4"
    And I fill post description with "Description test post without title"
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "5"
    And I click publish button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "6"
    And I just wait a few seconds
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "7"
    When I click confirm publish button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "8"
    Then I should see a toast message of "Published"
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "9"
    And I go to published posts
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "10"
    And the post "(Untitled)" should be in the list
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E004" and step "11"

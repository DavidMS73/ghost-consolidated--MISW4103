Feature: Create post
  Create a new blog post, whether it is an article, guide, review, story, tip, recipe, etc., and can use a variety of elements, such as images, videos, links, and other media to keep readers interested.

  @user1 @web
  Scenario: E001 - Create a post to be published later
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 2 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "2"
    And I click the posts button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "3"
    And I click on new post button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "4"
    And I fill post title with "$name_1"
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "5"
    And I fill post description with "$string_1"
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "6"
    And I click publish button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "7"
    And I click on post time options
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "8"
    And I click on schedule for later post option
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "9"
    And I click continue final review button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "10"
    When I click confirm publish button
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "11"
    Then I should see title "$$name_1" and content "$$string_1" inside a modal
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "12"
    And I go to scheduled posts
    And I wait for 2 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "13"
    Then the post "$$name_1" should be in the list
    And I wait for 1 seconds
    And I save a ss of version "4.5" and feature "create-post" and scenario "E001" and step "14"  

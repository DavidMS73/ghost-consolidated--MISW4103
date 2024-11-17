Feature: Crear página

  @user1 @web
  Scenario: E008 - Crear una página con un audio adjunto
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I click the pages button
    And I wait for 1 seconds
    And I click the new page button
    And I wait for 1 seconds
    And I fill the page title with text "$name_1"
    And I wait for 1 seconds
    And I click the page content
    And I wait for 1 seconds
    And I click the add button
    And I wait for 1 seconds
    And I click the audio button
    And I wait for 1 seconds
    And I fill the audio box with a file
    And I wait for 1 seconds
    And I click publish button
    And I wait for 1 seconds
    And I click continue final review button
    And I wait for 2 seconds
    When I click confirm publish button
    And I wait for 2 seconds
    Then I should see title "$$name_1" inside a modal
    And I wait for 1 seconds
    And I click the pages type filter
    And I wait for 1 seconds
    And I click the published pages filter
    And I wait for 1 seconds
    And I should see the first page with title "$$name_1"

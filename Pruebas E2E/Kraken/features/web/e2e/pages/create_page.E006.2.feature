Feature: Crear página

  @user1 @web
  Scenario: E006 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    When I click the pages button
    And I wait for 1 seconds
    And I click the new page button
    And I wait for 1 seconds
    And I fill the page title with text "$name_1"
    And I wait for 1 seconds
    And I fill the page content with text "$string_1"
    And I wait for 1 seconds
    And I click gear button
    And I wait for 1 seconds
    And I fill page URL with value "$name_2"
    And I wait for 1 seconds
    And I click gear button
    And I wait for 1 seconds
    And I click publish button
    And I wait for 1 seconds
    And I click continue final review button
    And I wait for 2 seconds
    And I click confirm publish button
    And I wait for 1 seconds
    And I should see title "$$name_1" and content "$$string_1" inside a modal
    And I wait for 1 seconds
    And I click the pages type filter
    And I wait for 1 seconds
    And I click the published pages filter
    And I wait for 1 seconds
    Then I should see the first page with title "$$name_1"
    And I navigate to created page "$$name_2" with base url "<BASE_URL>"
    And I wait for 1 seconds
    And I validate title "$$name_1" in page view
    And I wait for 1 seconds
    And I validate content "$$string_1" in page view
    And I wait for 1 seconds
    And I navigate to page "<BASE_URL>"
    And I wait for 1 seconds
    And I click the pages button
    And I wait for 1 seconds
    And I click the pages type filter
    And I wait for 1 seconds
    And I click the published pages filter
    And I wait for 1 seconds
    And I click first page
    And I wait for 1 seconds
    And I click gear button
    And I wait for 1 seconds
    And I click delete page
    And I wait for 1 seconds
    And I click delete button
    And I wait for 1 seconds

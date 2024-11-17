Feature: Crear página

  @user1 @web
  Scenario: E021 - Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "1"
    And I login with email "<EMAIL>" and password "<PASSWORD>"
    And I wait for 3 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "2"
    When I click the pages button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "3"
    And I click the new page button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "4"
    And I fill the page title with text "$name_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "5"
    And I fill the page content with text "$string_1"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "6"
    And I click gear button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "7"
    And I fill page URL with value "$name_2"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "8"
    And I click gear button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "9"
    And I click publish button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "10"
    And I click continue final review button
    And I wait for 2 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "11"
    And I click confirm publish button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "12"
    And I should see title "$$name_1" and content "$$string_1" inside a modal
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "13"
    And I click the pages type filter
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "14"
    And I click the published pages filter
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "15"
    Then I should see the first page with title "$$name_1"
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "16"
    And I navigate to created page "$$name_2" with base url "<BASE_URL>"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "17"
    And I validate title "$$name_1" in page view
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "18"
    And I validate content "$$string_1" in page view
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "19"
    And I navigate to page "<BASE_URL>"
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "20"
    And I click the pages button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "21"
    And I click the pages type filter
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "22"
    And I click the published pages filter
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "23"
    And I click first page
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "24"
    And I click gear button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "25"
    And I click delete page
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "26"
    And I click delete button
    And I wait for 1 seconds
    And I save a ss of version "5.96" and feature "create-page" and scenario "E021" and step "27"

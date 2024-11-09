Feature: Crear página

@user1 @web
Scenario: Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
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
  And I click the publish button
  And I wait for 1 seconds
  And I click the continue final review button
  And I wait for 2 seconds
  And I click the publish page button
  Then I should see title "$$name_1" and content "$$string_1" inside a modal
  And I should see the first page with title "$$name_1"

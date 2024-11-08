Feature: Crear página

@user1 @web
Scenario: Crear una página con sólo título y texto en el cuerpo satisfactoriamente y publicarla
  Given I navigate to page "http://localhost:2368/ghost"
  And I wait for 2 seconds
  When I click the pages button
  And I wait for 1 seconds
  And I click the new page button
  And I wait for 1 seconds
  And I fill the page title with text "$page_title"
  And I wait for 1 seconds
  And I fill the page content with "$page_content"
  And I wait for 1 seconds
  And I click the publish button
  And I wait for 1 seconds
  And I click the continue final review button
  And I wait for 2 seconds
  And I click the publish page button
  Then I should see title "$$page_title" and content "$$page_content" inside a modal
  And I should see the first page with title "$$page_title"

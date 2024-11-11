Feature: Crear vista de posts

@user1 @web
Scenario: E017 - Vista creada se despliega cuando se le asigna un nombre y se hace click en guardar
  Given I navigate to page "<BASE_URL>"
  And I wait for 2 seconds
  And I login with email "<EMAIL>" and password "<PASSWORD>"
  And I wait for 3 seconds
  And I click the posts button
  And I wait for 1 seconds
  And I filter by featured posts
  And view of featured posts should not exist
  When I click on create view button
  And I wait for 1 seconds
  And I fill the view name field with "$name_1"
  And I wait for 1 seconds
  And I click on save view button
  And I wait for 1 seconds
  Then view should appear in sidebar under posts section with name "$$name_1"
  And I wait for 1 seconds
  And current view should be "$$name_1"

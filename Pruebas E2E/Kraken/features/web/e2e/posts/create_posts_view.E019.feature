Feature: Crear vista de posts

@user1 @web
Scenario: E019 - Al presionar el botón "cancel" se cierra el modal de creación de vista
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
  And I click on cancel view creation button
  And I wait for 1 seconds
  Then view creation modal should hide

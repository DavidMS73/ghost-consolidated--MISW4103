Feature: Crear miembro

@user1 @web
Scenario: E0013 - Crear miembro con un correo válido se crea satisfactoriamente
  Given I navigate to page "<BASE_URL>"
  And I wait for 2 seconds
  And I login with email "<EMAIL>" and password "<PASSWORD>"
  And I wait for 3 seconds
  When I click the members button
  And I wait for 1 seconds
  And I click the new member button
  And I wait for 1 seconds
  And I fill the member email with text "$email"
  And I wait for 1 seconds
  And I click the save member button
  And I wait for 2 seconds
  Then I should see members page title "$$email" 


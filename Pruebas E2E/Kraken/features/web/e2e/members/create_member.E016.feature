Feature: Crear Miembro

@user1 @web
Scenario: E016 - Si el miembro tiene un sólo nombre la imagen debería tener una sola inicial
  Given I navigate to page "<BASE_URL>"
  And I wait for 2 seconds
  And I login with email "<EMAIL>" and password "<PASSWORD>"
  And I wait for 3 seconds
  When I click the members button
  And I wait for 1 seconds
  And I click the new member button
  And I wait for 1 seconds
  And I fill the member name with text "$name_1"
  And I unfocus the form field
  And I wait for 1 seconds
  Then I should see the member initials according their firstname "$$name_1"
  
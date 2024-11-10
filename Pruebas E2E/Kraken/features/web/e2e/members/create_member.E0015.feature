Feature: Crear miembro

@user1 @web
Scenario: E0015 - La imagen del miembro debería tener las iniciales del primer y último nombre
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
  And I fill the member name with text "$name_1" "$name_2"
  And I click the save member button
  And I wait for 2 seconds
  Then I should see the member initials according their first and lastname "$$name_1" "$$name_2"
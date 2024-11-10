Feature: Crear tag

@user1 @web
Scenario: E0011 - Crear un tag con un nombre satisfactorio
  Given I navigate to page "<BASE_URL>"
  And I wait for 2 seconds
  And I login with email "<EMAIL>" and password "<PASSWORD>"
  And I wait for 3 seconds
  When I click the tags button
  And I wait for 1 seconds
  And I click the new tag button
  And I wait for 1 seconds
  And I fill the tag name with text "$name_1"
  And I wait for 1 seconds
  And I click the save tag button
  And I wait for 2 seconds
  Then I should see title "$$name_1" 


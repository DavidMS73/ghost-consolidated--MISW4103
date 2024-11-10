Feature: Create members
  Create a new member
 
  Scenario: E0013 - Crear miembro con un correo valido
    Given I navigate to "members" section
    When I login to the application if necessary
    And I navigate to "members" section
    And I click on new member button
    And I fill member email with "test@domain.com"
    And I click on save member button
    Then I go to members list
    And the member "test@domain.com" should be in the list

  Scenario: E0014 - Crear miembro sin correo muestra un mensaje de error
    Given I navigate to "members" section
    When I login to the application if necessary
    And I navigate to "members" section
    And I click on new member button
    And I click on save member button
    Then I should see an error message due to a missing email field

  Scenario: E0015 - La imagen del miembro debería tener las iniciales del primer y último nombre
    Given I navigate to "members" section
    When I login to the application if necessary
    And I navigate to "members" section
    And I click on new member button
    And I fill member name with "Testing User"
    And I fill member email with "test@domain.com"
    And I click on save member button
    Then I should see the initials "T" and "U" in the user avatar

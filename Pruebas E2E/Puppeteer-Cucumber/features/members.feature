Feature: Create members
  Create a new member

  Scenario: E0013 - Crear miembro con un correo valido
    Given I navigate to "members" section
    And I login to the application if necessary
    And I navigate to "members" section
    And I click on new member button
    And I fill member email with "test123@domain.com"
    When I click on save member button
    Then I go to members list
    And the member "test123@domain.com" should be in the list

  Scenario: E0014 - Crear miembro sin correo muestra un mensaje de error
    Given I navigate to "members" section
    And I login to the application if necessary
    And I navigate to "members" section
    And I click on new member button
    When I click on save member button
    Then I should see an error message due to a missing email field

  Scenario: E0015 - La imagen del miembro deberia tener las iniciales del primer y ultimo nombre
    Given I navigate to "members" section
    And I login to the application if necessary
    And I navigate to "members" section
    And I click on new member button
    And I fill member name with "Testing User"
    And I fill member email with "test321@domain.com"
    When I click on save member button
    Then I should see the initials "T" and "U" in the user avatar

  Scenario: E0016 - Si el miembro tiene un solo nombre la imagen deberia tener una sola inicial
    Given I navigate to "members" section
    And I login to the application if necessary
    And I navigate to "members" section
    And I click on new member button
    And I fill member name with "Testing"
    When I unfocus the member form field
    Then I should see the initials "T" in the user avatar

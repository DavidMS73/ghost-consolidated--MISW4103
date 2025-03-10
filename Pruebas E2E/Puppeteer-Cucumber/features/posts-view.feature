Feature: Create posts view
  Creates a new view for the posts, which saves the current selected filters.

  @rv-596
  @run
  Scenario: E017 - Vista creada se despliega cuando se le asigna un nombre y se hace click en guardar
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I filter by featured posts
    And view of featured posts should not exist
    And I click on create view button
    And I fill the view name field with "Prueba"
    When I click on save view button
    Then view should appear in sidebar under posts section with name "Prueba"
    And current view should be "Prueba"

  @rv-596
  Scenario: E018 - Al intentar crear una vista sin un nombre se muestra un mensaje de error
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I filter by featured posts
    And view of featured posts should not exist
    And I click on create view button
    When I click on save view button
    Then an error should appear indicating that the view name is required

  @rv-596
  Scenario: E019 - Al presionar el botón cancel se cierra el modal de creacion de vista
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    And I filter by featured posts
    And view of featured posts should not exist
    And I click on create view button
    When I click on cancel view creation button
    Then view creation modal should hide

  Scenario: E020 - El boton de crear vista se muestra al seleccionar el filtro public dentro del desplegable all access
    Given I navigate to "home" section
    And I login to the application if necessary
    And I navigate to "posts" section
    When I filter by public posts
    Then create view button should exist
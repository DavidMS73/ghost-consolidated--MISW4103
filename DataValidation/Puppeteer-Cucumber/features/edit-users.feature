Feature: Edit users view
  Edits the information of the current user.

  Scenario: EU01 - Cambiar el nombre del usuario por uno vacío genera un error
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "fullName" to ""
    When I click on save changes button
    Then an error should appear indicating that the full name is required

  Scenario Outline: EU02 - Cambiar el nombre del usuario por una cadena de caracteres lo actualiza exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "fullName" to "<fullName>"
    When I click on save changes button
    Then the name of the user should be updated

    Examples:
      | fullName                            |
      | {a_priori(user-normal_fullName)}    |
      | {faker(fullName)}                   |
      | {faker(alphanumeric_191)}           |

  Scenario Outline: EU03 - Cambiar el nombre del usuario por una cadena de 192 caracteres no es permitido
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "fullName" to "<fullName>"
    When I click on save changes button
    Then the name of the user should be trimmed and updated

    Examples:
      | fullName                            |
      | {faker(alphanumeric_192)}           |

  Scenario: EU04 - Cambiar el correo del usuario por uno vacío genera un error
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "email" to ""
    When I click on save changes button
    Then an error should appear indicating that the email is required

  Scenario Outline: EU05 - Cambiar el correo del usuario por uno con el formato incorrecto genera un error
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "email" to "<email>"
    When I click on save changes button
    Then an error should appear indicating that the email is not valid

    Examples:
      | email               |
      | some.email          |
      | some.email@         |
      | some.email@domain   |
      | some.email@domain.  |
      | some.email@domain.c |

  Scenario Outline: EU06 - Cambiar el correo del usuario por uno con un formato correcto lo actualiza exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "email" to "<email>"
    When I click on save changes button
    Then the email of the user should be updated
    And (post) returned to original email

    Examples:
      | email              |
      | correo@prueba.com  |
      | {faker(email)}     |

  Scenario Outline: EU07 - Al cambiar el correo y el nombre del usuario ambos campos se actualizan exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "fullName" to "<fullName>"
    And I set the field "email" to "<email>"
    When I click on save changes button
    Then the email and the name of the user should be updated
    And (post) returned to original email

    Examples:
      | fullName                          | email                           |
      | {a_priori(user-normal_fullName)}  | {a_priori(user-normal_email)}   |
      | {pseudo_aleatorio(user-fullName)} | {pseudo_aleatorio(user-email)}  |
      | {faker(fullName)}                 | {faker(email)}                  |

  Scenario Outline: EU08 - Al cambiar el slug de un usuario por uno vacío debe poner el primer nombre del usuario
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "fullName" to "<firstName>"
    And I set the field "slug" to ""
    When I click on save changes button
    Then the slug of the user should be updated with the name

    Examples:
      | firstName           |
      | {faker(firstName)}  |

  Scenario Outline: EU09 - Al cambiar el slug de un usuario por una cadena de caracteres debe actualizarlo exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "slug" to "<slug>"
    When I click on save changes button
    Then the slug of the user should be updated

    Examples:
      | slug                |
      | andres              |
      | {faker(firstName)}  |

  Scenario Outline: EU10 - Al cambiar el slug de un usuario por una cadena de 191 caracteres debe actualizarlo exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "slug" to "<slug>"
    When I click on save changes button
    Then the slug of the user should be updated

    Examples:
      | slug                      |
      | {faker(alphanumeric_191)} |

  Scenario Outline: EU11 - Al cambiar el slug de un usuario por una cadena de 192 caracteres debe actualizarlo exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "slug" to "<slug>"
    When I click on save changes button
    Then the slug of the user should be trimmed and updated

    Examples:
      | slug                      |
      | {faker(alphanumeric_192)} |

  Scenario Outline: EU12 - Al cambiar el slug por una cadena con espacios, estos se deben reemplazar por guiones (-)
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "slug" to "<slug>"
    When I click on save changes button
    Then the slug of the user should be separated by dashes

    Examples:
      | slug              |
      | My personal slug  |
      | {faker(words)}    |

  Scenario Outline: EU13 - Al editar el slug y el nombre del usuario estos se deben actualizar exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "fullName" to "<fullName>"
    And I set the field "slug" to "<slug>"
    When I click on save changes button
    Then the slug and the name of the user should be updated

    Examples:
      | fullName                          | slug                          |
      | {a_priori(user-normal_fullName)}  | {a_priori(user-normal_slug)}  |
      | {pseudo_aleatorio(user-fullName)} | {pseudo_aleatorio(user-slug)} |
      | {faker(fullName)}                 | {faker(words)}                |

  Scenario Outline: EU14 - Al editar el slug y el correo del usuario estos se deben actualizar exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "email" to "<email>"
    And I set the field "slug" to "<slug>"
    When I click on save changes button
    Then the slug and the email of the user should be updated
    And (post) returned to original email

    Examples:
      | email                          | slug                          |
      | {a_priori(user-normal_email)}  | {a_priori(user-normal_slug)}  |
      | {pseudo_aleatorio(user-email)} | {pseudo_aleatorio(user-slug)} |
      | {faker(email)}                 | {faker(words)}                |

  Scenario: EU15 - Al ingresar 150 caracteres en el lugar de residencia se actualiza exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "location" to "<location>"
    When I click on save changes button
    Then the location of the user should be updated

    Examples:
      | location                  |
      | {faker(alphanumeric_150)} |

  Scenario: EU16 - Al ingresar 151 caracteres en el lugar de residencia sale un error
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "location" to "<location>"
    When I click on save changes button
    Then an error should appear indicating that the location is too long

    Examples:
      | location                  |
      | {faker(alphanumeric_151)} |

  Scenario: EU17 - Al ingresar un lugar existente debería actualizarse exitosamente
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "location" to "<location>"
    When I click on save changes button
    Then the location of the user should be updated

    Examples:
      | location          |
      | Colombia          |
      | {faker(country)}  |

  Scenario: EU18 - Al ingresar caracteres especiales debería aparecer un error
    Given I navigate to "home" section
    And I login to the application if necessary
    And I click on my profile picture
    And I click on Your Profile
    And I set the field "location" to "{[!@#$%^&*()]}"
    When I click on save changes button
    Then an error should appear indicating that the location is not valid
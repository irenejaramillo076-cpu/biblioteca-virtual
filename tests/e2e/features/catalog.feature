Feature: Gestión del catálogo
  Como bibliotecario
  Quiero administrar los libros disponibles
  Para mantener el catálogo actualizado

  Scenario: Registrar un libro válido
    Given que tengo una sesión válida y estoy en el catálogo
    When registro un título, autor, ISBN y cantidad válidos
    Then el libro debe aparecer en el catálogo

  Scenario: Buscar un libro existente
    Given que existe un libro registrado
    When busco el libro por su título
    Then debo ver la ficha correspondiente

  Scenario: Editar un libro existente
    Given que existe un libro sin préstamos asociados
    When modifico su título y guardo los cambios
    Then el catálogo debe mostrar el nuevo título

  Scenario: Eliminar un libro existente
    Given que existe un libro sin préstamos asociados
    When confirmo su eliminación
    Then el libro no debe aparecer en el catálogo

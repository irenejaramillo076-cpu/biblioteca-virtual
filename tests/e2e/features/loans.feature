Feature: Gestión de préstamos
  Como bibliotecario
  Quiero registrar y devolver préstamos
  Para conocer la disponibilidad real de los ejemplares

  Scenario: Registrar un préstamo con ejemplares disponibles
    Given que existen un libro disponible y un lector registrado
    When confirmo el préstamo para ese lector
    Then el préstamo debe aparecer con estado "Activo"

  Scenario: Registrar la devolución de un préstamo activo
    Given que existe un préstamo con estado "Activo"
    When selecciono "Registrar devolución"
    Then el préstamo debe aparecer con estado "Devuelto"

  Scenario: Filtrar préstamos activos
    Given que existen préstamos activos y devueltos
    When filtro la lista por "Activos"
    Then solamente debo ver préstamos con estado "Activo"

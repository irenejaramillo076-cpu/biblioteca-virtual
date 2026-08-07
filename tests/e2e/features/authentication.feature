Feature: Autenticación del bibliotecario
  Como miembro autorizado del personal
  Quiero controlar el acceso a la Biblioteca Virtual
  Para evitar que personas no autorizadas administren la información

  Scenario: Inicio de sesión válido
    Given que estoy en la página de inicio de sesión
    When ingreso el correo y la contraseña válidos
    Then debo acceder al catálogo de la Biblioteca Virtual

  Scenario: Inicio de sesión con contraseña incorrecta
    Given que estoy en la página de inicio de sesión
    When ingreso una contraseña incorrecta
    Then debo ver el mensaje "Credenciales inválidas"

  Scenario: Cierre de sesión exitoso
    Given que tengo una sesión válida
    When selecciono "Cerrar sesión"
    Then debo regresar a la página de inicio de sesión

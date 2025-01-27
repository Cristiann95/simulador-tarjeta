# Simulador de Compra - Tarjeta de Crédito

Este es un simulador de compra interactivo que muestra una tarjeta de crédito en su frente y dorso, mientras permite al usuario completar un formulario con los datos de su tarjeta. A medida que el usuario llena los campos del formulario, los datos se reflejan en la tarjeta en tiempo real. El proyecto incluye medidas de seguridad para validar los campos y asegura que los datos sean completados correctamente.

## Características

-   **Formulario de Datos de Tarjeta**: El formulario incluye los siguientes campos:
    
    -   **Nombre del titular**
    -   **Número de tarjeta**
    -   **Mes y año de vencimiento**
    -   **Código de seguridad (CVV)**
-   **Validación de Datos**: Cada campo tiene validaciones de formato y longitud. Los datos incorrectos o incompletos muestran mensajes de error para guiar al usuario.
    
-   **Reflejo en la tarjeta de crédito**: Los datos ingresados en el formulario se muestran en tiempo real en una tarjeta de crédito que se visualiza en la pantalla.
    
-   **Responsividad**: El diseño es completamente responsivo, adaptándose a diferentes tamaños de pantalla (móviles, tablets, escritorios).
    

## Tecnologías Usadas

-   **HTML5**
-   **CSS3**
-   **JavaScript**
-   **Responsive Design** (Media Queries)

## Instalación

1.  Clona este repositorio a tu máquina local:
    
    `git clone https://github.com/Cristiann95/simulador-tarjeta`
    
2.  Navega al directorio del proyecto:
    
    `cd simulador-tarjeta` 
    
3.  Abre el archivo `index.html` en tu navegador preferido para ver el proyecto en acción.
    

## Funcionalidades

-   El formulario solo permite la entrada de los datos correctos para cada campo (números en el campo "Número de tarjeta", un formato de fecha válido para el "Mes y Año de vencimiento", etc.).
    
-   Si los datos introducidos son incorrectos o faltantes, se mostrará un mensaje de error junto al campo correspondiente.
    
-   El diseño se adapta a diferentes dispositivos para ofrecer una experiencia de usuario consistente y amigable.
    

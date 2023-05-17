# Planeta 3D

E-commerse diseñado para practicar lo aprendido en el curso de React JS, de la plataforma CoderHouse
La pagina recrea una tienda de venta de articulos dedicados a la impresión en 3D

GitHub Pages: 
https://ivanbonnot.github.io/rce-react/

Usando libreria gh-pages

## Descripción

La aplicación permite conectarse con un backend realizdo con Firebase. Pudiendo seleccionar ciertos products, navegar a sus detalles, agregarlos al carrito, poder acceder a él y simular la compra de los mismos. Al clickear sobre el botón "Finalizar compra" del carrito, pide llenar un formulario con datos básicos (nombre, apellido, telefono, doble comprobació de email), al pasar la validación del mismo y clickear en "Enviar", se genera un id de orden para el usuario y en Firebase se guarda la orden con los products que compró. 

Al emitir la orden de compra se modifica el stock en la base de datos de Firebase del o los products adquiridos. Si el stock del producto llega a 0, se advierte la faltante en detalles y no se puede realizar compras del mismo

## Tecnologías y librerias usadas

Interfaz realizada con ReactJS - Create React App

Estilos con Bootstrap y styled-components (libreria)

Ruteo con React Router Dom para hacer una SPA

Backend con Firebase
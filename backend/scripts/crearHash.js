const bcrypt = require('bcrypt');

/* 
Este script genera un hash de la contraseña que le pases.
primero se crea una funcion asíncrona que recibe la contraseña y se autoejecuta.
luego se le pasa la contraseña que se desea hasear
se le da un nivel de seguridad.
El resultado es un hash que se imprime en la consola.
*/

(async () => {
  const contraseña = 'admin123'; 
  const hash = await bcrypt.hash(contraseña, 10); 
  console.log('Hash generado:', hash);
})();
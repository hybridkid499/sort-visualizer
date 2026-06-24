**[Ver demo en vivo](https://hybridkid499.github.io/sort-visualizer/)**

# Sort Visualizer

Un visualizador de algoritmos de ordenamiento. Elegís un algoritmo, le das play,
y mirás cómo ordena las barras paso a paso. Bubble, insertion, quick y merge.
Todo del lado del cliente: sin backend, sin dependencias, sin build.

## ¿Por qué?

Porque los algoritmos de sorting son mucho más fáciles de entender viéndolos que
leyéndolos, y porque quería una excusa para meterme con Canvas. No resuelve
ningún problema del mundo —hay mil visualizadores online— pero la gracia, como
siempre, está en cómo está hecho por dentro.

## La parte interesante

El desafío real no es ordenar un array (eso lo hace `.sort()` en una línea), sino
**poder animar el proceso**. Un sort normal te da el antes y el después, no los
pasos del medio.

Los algoritmos no animan nada ni esperan. Corren enteros y van
**registrando cada operación como un evento** Eso genera una lista de pasos. Después, un reproductor separado los
va aplicando a la velocidad que quieras.

Esa separación es la que da todo: cambiar la velocidad en vivo, pausar,
comparar dos algoritmos sobre el mismo array... aunque sin poder modificar el tamaño ya una vez que empieza la secuencia.


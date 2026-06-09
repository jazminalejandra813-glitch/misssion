# 🎮 MISSION - Juego de Desplazamiento

**Elude obstáculos, recolecta recompensas y domina la batalla. Un juego de acción arcade con 10 personajes únicos.**

---

## 📋 Descripción

**MISSION** es un juego de desplazamiento lateral donde los jugadores controlan personajes que avanzan esquivando obstáculos y recolectando monedas. El juego incluye:

- 🎭 **10 personajes únicos** con habilidades especiales y monedas distintivas
- 🏆 **5 niveles con dificultad creciente**
- 💰 **Sistema de monedas** que funcionan como armas en modo batalla
- ⚔️ **Modo Batalla PvP** donde dos jugadores se enfrentan usando monedas
- 💓 **Sistema de vidas** con recuperación automática
- 🎨 **Gráficos vibrantes y animaciones suaves**

---

## 🎮 Características del Juego

### 👥 Personajes (10 en total)

1. **Luna** 🐺 - Velocidad aumentada (+20%)
2. **Fuego** 🔥 - Poder de ataque (+30% daño)
3. **Ártico** ❄️ - Defensa aumentada (+25% resistencia)
4. **Relámpago** ⚡ - Velocidad crítica (+40% rapidez)
5. **Sombra** 🌑 - Invisibilidad parcial
6. **Titán** 🗿 - Poder gigante (+50% salud)
7. **Félix** 😸 - Suerte felina (bonus aleatorio)
8. **Espectro** 👻 - Traspaso de muros
9. **Venganza** ⚔️ - Contraataque potente
10. **Destino** 🎭 - Habilidades balanceadas

### 💰 Sistema de Monedas

| Moneda | Nombre | Daño | Color |
|--------|--------|------|-------|
| 🪙 | Oro | 10 | #FFD700 |
| 🏅 | Plata | 8 | #C0C0C0 |
| 🥉 | Bronce | 6 | #CD7F32 |
| 💎 | Cian | 7 | #00d4ff |
| 💠 | Rosa | 9 | #FF1493 |

### 🎯 Obstáculos

- **Púas** (Spike) - Daño básico
- **Cajas** (Box) - Obstáculos sólidos
- **Bolas** (Ball) - Obstáculos rodantes
- **Sierras** (Saw) - Alto daño
- **Láseres** (Laser) - Obstáculos avanzados

### 🕹️ Controles

#### Modo Juego
- **A / Flecha Izquierda** - Moverse a la izquierda
- **D / Flecha Derecha** - Moverse a la derecha
- **W / Flecha Arriba** - Saltar
- **S / Flecha Abajo** - Agacharse
- **P / ESC** - Pausar juego
- **M** - Menú principal

#### Modo Batalla
- **Botones de Movimiento** - Controlar personaje
- **Botones de Monedas** - Lanzar ataques con monedas

---

## 📊 Niveles

| Nivel | Velocidad | Spawn Obstáculos | Tipos de Obstáculos |
|-------|-----------|------------------|---------------------|
| 1 | 3 | 2000ms | Púa, Caja |
| 2 | 4 | 1800ms | Púa, Caja, Bola |
| 3 | 5 | 1600ms | Púa, Caja, Bola, Sierra |
| 4 | 6 | 1400ms | Púa, Caja, Bola, Sierra |
| 5 | 7 | 1200ms | Púa, Caja, Bola, Sierra, Láser |

---

## 💓 Sistema de Vidas

- **Máximo**: 5 vidas
- **Daño por obstáculo**: 20 HP
- **Recuperación**: 1 vida cada 10 minutos después de perder
- **Efecto visual**: Parpadeo rojo cuando reciben daño

---

## 🎯 Modo Batalla

En el modo batalla dos personajes se enfrentan usando monedas como armas:

- **Barra de Salud**: Muestra arriba de cada personaje (100 HP máximo)
- **Ataques**: 5 botones para cada tipo de moneda
- **Movimiento**: Esquiva los ataques del oponente
- **Victoria**: Texto dorado + 100 partículas doradas (visible 8 segundos)
- **Derrota**: Texto rojo + 80 partículas rojas (visible 8 segundos)

---

## 🎨 Diseño Visual

### Temas de Fondo
- Cada personaje tiene un fondo único con colores distintivos
- Efecto de desplazamiento sincronizado con el movimiento
- Cambio de estilo según el nivel alcanzado

### Animaciones
- Rotación de obstáculos
- Flotación de monedas
- Sistema de partículas para eventos
- Efectos de parpadeo en daño

---

## 🔧 Estructura del Proyecto

```
misssion/
├── index.html              # Archivo principal HTML
├── styles.css              # Estilos CSS
├── js/
│   ├── constants.js        # Constantes del juego
│   ├── characters.js       # Definición de personajes
│   ├── coins.js            # Sistema de monedas
│   ├── gameState.js        # Gestor de estado global
│   ├── physics.js          # Física: jugador y obstáculos
│   ├── renderer.js         # Sistema de renderizado
│   ├── game.js             # Lógica principal del juego
│   ├── battle.js           # Sistema de batalla
│   ├── ui.js               # Gestión de interfaz
│   └── main.js             # Punto de entrada y eventos
└── README.md               # Este archivo
```

---

## 🚀 Cómo Ejecutar

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jazminalejandra813-glitch/misssion.git
   cd misssion
   ```

2. **Abrir en navegador**
   - Opción 1: Abrir `index.html` directamente en tu navegador
   - Opción 2: Usar un servidor local (recomendado para mejor rendimiento)
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   ```

3. **Acceder al juego**
   - Local: `http://localhost:8000`
   - Remoto: Accede a través del navegador

---

## 🎮 Flujo de Juego

1. **Menú Principal**
   - Botón "Jugar" → Selecciona personaje → Comienza el juego
   - Botón "Batalla" → Modo PvP
   - Botón "Configuración" → Ajusta volumen y efectos

2. **Selección de Personaje**
   - Visualiza los 10 personajes disponibles
   - Lee sus ventajas
   - Haz clic para seleccionar

3. **Juego Principal**
   - Elude obstáculos
   - Recolecta monedas
   - Completa niveles
   - Sube de nivel con dificultad creciente

4. **Modo Batalla**
   - Controla tu personaje
   - Lanza monedas como armas
   - Derrota al oponente

---

## 🔊 Sonido y Música

- **Volumen**: Ajustable de 0-100%
- **Efectos de Sonido**: Activable/desactivable
- **Música de Fondo**: Única por personaje
- **Controles de volumen** en el menú de configuración

---

## 📈 Progresión

### Sistema de Puntos
- **Recolectar moneda**: 10 × daño de moneda
- **Completar nivel**: Bonus según nivel
- **Puntos acumulativos**: Se mantienen entre niveles

### Desafíos
- Aumenta velocidad con cada nivel
- Más tipos de obstáculos disponibles
- Mayor frecuencia de spawn

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **Canvas API** - Renderizado gráfico
- **Vanilla JavaScript** - Lógica del juego
- **Responsive Design** - Compatible con múltiples dispositivos

---

## 📝 Requisitos del Navegador

- HTML5 Canvas support
- JavaScript ES6+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

---

## 🎓 Conceptos Implementados

- **Game Loop**: Sistema de actualización y renderizado continuo
- **Event Handling**: Gestión de entrada del usuario
- **Physics Engine**: Gravedad, colisiones
- **Particle System**: Efectos visuales dinámicos
- **State Management**: Control centralizado del estado
- **Object-Oriented Programming**: Clases y herencia

---

## 🔮 Futuras Características (Roadmap)

- [ ] Sonidos y música por personaje
- [ ] Efectos de sonido de colisión
- [ ] Leaderboard global
- [ ] Modo cooperativo
- [ ] PowerUps especiales
- [ ] Personajes desbloqueables
- [ ] Menú de pausa mejorado
- [ ] Sistema de logros
- [ ] Compatibilidad móvil mejorada

---

## 👨‍💻 Autores

- **jazminalejandra813** - Desarrollador Principal

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un issue en GitHub con:
- Descripción del problema
- Pasos para reproducir
- Navegador y versión
- Screenshots si es posible

---

## 💬 Soporte

¿Preguntas o sugerencias? Abre un issue o contacta al autor.

---

**¡Disfruta jugando MISSION!** 🎮✨

Última actualización: Junio 2026

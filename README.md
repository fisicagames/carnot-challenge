# Carnot Game 🔥❄️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Babylon.js](https://img.shields.io/badge/Babylon.js-7.5.0-purple.svg)](https://www.babylonjs.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2.11-yellow.svg)](https://vitejs.dev/)

An interactive simulation on the Carnot thermodynamic cycle — the simulation that consolidated the **callback-based Mediator pattern** as the architectural standard of the SHIFT series.

### [🎮 Play Now!](https://fisicagames.com.br/)

---

## 📄 Table of Contents

* [About the Game](#-about-the-game)
* [Key Features](#-key-features)
* [How to Play](#-how-to-play)
* [Tech Stack](#-tech-stack)
* [Installation and Setup](#-installation-and-setup)
* [Architecture and Technical Highlights](#-architecture-and-technical-highlights)
* [License](#-license)
* [Author](#-author)

---

## 📖 About the Game

**Carnot Game** is the seventh and final simulation produced in 2024 (developed December 21–29). It adapts the **Carnot cycle** — a theoretical, idealized thermodynamic process — into an interactive game format. The player alternates between three thermal reservoirs (hot, insulating, and cold) by clicking a single button, attempting to keep the piston operating close to the ideal cycle and avoiding the cylinder exploding (overheating) or freezing.

The simulation is intentionally demonstrative rather than quantitative — the Carnot cycle is an idealized construct, and the game focuses on the correct sequence of processes (isothermal expansion, adiabatic expansion, isothermal compression, adiabatic compression) rather than precise calculations of state variables.

To make the experience more engaging for casual users, dramatic outcomes such as machine explosion or freezing represent the lúdic consequences of straying from the ideal cycle conditions.

---

## ✨ Key Features

* **Reservoir Switching:** A single button alternates between the hot reservoir, the cold reservoir, and the insulator.
* **Carnot-Based Scoring:** The closer the player's cycle is to the ideal Carnot cycle, the more work is generated and the higher the score.
* **Real-Time Visual Feedback:**
  * **Temperature:** Particles change color (red to blue) and velocity, reflecting temperature changes.
  * **Pressure:** The piston moves dynamically as internal pressure changes, driven by real particle collisions inside the cylinder.
* **Real-Time PV Diagram:** A graph displays the relation between volume (piston height) and temperature, updated dynamically as the cycle progresses.
* **Score Levels and Titles:**
  * 499–: 🐣 Beginner
  * 500–539: 🧐 Curious Student
  * 540–579: 📘 Diligent Student
  * 580–619: ✏️ Early Undergraduate
  * 620–659: 📚 Dedicated Undergraduate
  * 660–699: 🧑‍🏫 Physics Teacher
  * 700–709: 🔥 Thermodynamics Teacher
  * 710–719: 🧠 Physics Genius
  * 720+: ⚙️ Nicolas Léonard Sadi Carnot
* **Limited Switches:** The player can perform up to 9 reservoir switches; a final hot-reservoir switch causes an explosion.
* **Multilingual:** Native support for Portuguese and English.

---

## 🕹 How to Play

**Objective:** Perform precise reservoir switches to maximize the work generated and prevent the piston from getting stuck or the cylinder from exploding.

#### Controls

💻 **On PC:** Spacebar or any key to switch between thermal reservoirs.

📱 **On Mobile / Touch:** Tap the on-screen button to switch reservoirs.

#### Challenges

* **Limited Switches:** Up to 9 reservoir switches; the last switch causes an explosion if it is the hot reservoir.
* **Piston Jamming:** The piston can get stuck at the maximum or minimum volume limits if switches are mistimed.
* **Score:** Points are awarded based on how closely the cycle approaches the ideal Carnot cycle.

You can switch between **Portuguese** and **English** using the button in the top-right corner.

---

## 🛠 Tech Stack

| Tool                                       | Version | Description                                                              |
| ------------------------------------------ | ------- | ------------------------------------------------------------------------ |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2   | Core language, providing type safety and modular architecture.           |
| [Babylon.js](https://www.babylonjs.com/)      | 7.5.0   | Graphics engine for 3D rendering, animations, particles, and GUI system. |
| [Havok](https://www.havok.com/)               | latest  | Physics engine used for rigid-body gas particles and piston interactions.|
| [Vite.js](https://vitejs.dev/)                | 5.2.11  | Build tool for ES6 module compilation, tree-shaking, and optimization.   |
| [Node.js](https://nodejs.org/en)              | 20+     | Development environment and runtime.                                     |

---

## 🚀 Installation and Setup

**Prerequisites:** Node.js (v20+), npm (v10+).

```sh
npm install
npm run dev      # development server
npm run build    # production build (generates the dist folder)
```

---

## 🏗 Architecture and Technical Highlights

**Carnot Game** was a milestone for consolidating the **callback-based Mediator pattern** introduced in *Faraday Game*. All event flows from inner to outer classes are handled through chained callbacks across every intermediate class, providing linear traceability and dispensing with state machines or central event managers.

The simulation builds on the **adapted MVC architecture** (Core / Controller / Model / View) established in the previous SHIFT simulations.

#### Physics Modeling — Hybrid Approach

The Carnot cycle is a theoretical and idealized process — quasi-static and reversible — that cannot be reproduced exactly. The simulation uses a **hybrid physics approach**:

* **Gas particles as Havok rigid bodies:** 100 spherical particles inside the cylinder, configured with restitution = 1.0 for elastic collisions, simulating gas molecule behavior.
* **Particle velocity scales with temperature:** Velocities follow `v ∝ √T`, inspired by the kinetic theory result `v_rms = √(3kT/m)`, simplified to a tunable factor for gameplay purposes.
* **Color-coded temperature:** Particle hue varies from blue (cold) to red (hot) using HSV color space, providing immediate visual feedback.
* **Piston motion governed by reservoir state:** The piston velocity is set explicitly per process (isothermal vs adiabatic), rather than computed from gas pressure dynamics — a deliberate simplification for accessibility.
* **Work and pressure approximation:** Work is computed every 10 frames as `W = P · ΔV`, with pressure approximated as `P ∝ T / V`, a simplified version of the ideal gas law `PV = nRT`.
* **Velocity clamping:** Particle velocities are bounded to prevent tunneling through cylinder walls between time steps.

#### A Note on Code Complexity

The piston control logic accumulated technical debt in the form of deeply nested conditional branches (cyclomatic complexity > 30). This was a known and accepted trade-off, as refactoring was deferred to prioritize the publication schedule of the simulations in January 2025.

#### Architecture Highlights

* **MVC adapted:** Core / Controller / Model / View folder organization.
* **Mediator with callbacks:** Linear event flow between adjacent classes via chained callbacks.
* **Real-time PV diagram:** Implemented as a `realTimeGraph` View component, updating each frame.
* **Game-over conditions:** The simulation handles "exploded engine" and "frozen engine" states as part of the hypercasual gameplay loop.

The result is a visually engaging, conceptually accurate animation of the Carnot cycle, accessible to casual users while still capturing the qualitative dynamics of thermodynamic processes.

---

## 📸 Screenshots

<p align="center">
  <img src="image/README/1736179748201.png" width="22%" alt="Carnot Game screenshot 1" />
  <img src="image/README/1736179767389.png" width="22%" alt="Carnot Game screenshot 2" />
  <img src="image/README/1736179798065.png" width="22%" alt="Carnot Game screenshot 3" />
  <img src="image/README/1736179831530.png" width="22%" alt="Carnot Game screenshot 4" />
</p>

---

## 📜 License

### Source Code

The source code in this repository is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file.

### Visual Assets

3D models, textures, and original visual content created by the author are licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

### Audio Assets

Music and sound effects in this project are sourced from [Pixabay](https://pixabay.com/) under the [Pixabay Content License](https://pixabay.com/service/license-summary/), which permits free use including for commercial purposes.

### Third-Party Libraries

* **Babylon.js** — Apache License 2.0
* **Havok Physics** — Per vendor terms (Babylon.js distribution)
* **Vite.js** — MIT License

**Copyright © 2024 Rafael João Ribeiro.**

---

## 👨‍🔬 Author

Developed by:
**Prof. Dr. Rafael João Ribeiro**
Federal Institute of Paraná (IFPR)
[www.fisicagames.com.br](https://www.fisicagames.com.br)

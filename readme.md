# 3D Haunted House — TypeScript Refactor

[![Vercel](https://vercelbadge.vercel.app/api/peterridingdev/threejs-haunted-house-ts)](https://haunted-house-ts.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/peterridingdev/threejs-haunted-house-ts?style=social)](https://github.com/peterridingdev/threejs-haunted-house-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Three.js](https://img.shields.io/badge/Made%20with-Three.js-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue?logo=typescript)](https://www.typescriptlang.org/)

![Haunted House Screenshot](./static/haunted-house-ts-screenshot.jpg)

🔗 **Live Demo:** [haunted-house-ts.vercel.app](https://haunted-house-ts.vercel.app)

A Three.js haunted house scene originally built from the **Three.js Journey** course and refactored into a **class-based, TypeScript architecture**.

This project focuses on restructuring a tutorial scene into a more maintainable, modular real-time 3D application.

---

## Tech Stack

- Three.js
- TypeScript (strict mode)
- Vite

---

## What Was Refactored

- Scene split into modular classes (House, Graves, Ghosts, Sky, Fog, Lights)
- Central `Experience` class managing lifecycle, render loop, and resize handling
- `World` class responsible for scene composition
- Resource loading system with ready events
- Strong typing for materials, textures, and shader uniforms
- Update loop separation for animated systems

---

## Features

- PBR textured floor (AO, normal, displacement maps)
- Animated ghost lights
- Procedural sky and fog
- Responsive canvas + OrbitControls

---

## Getting Started

# clone

git clone https://github.com/peterridingdev/threejs-haunted-house-ts
cd repo

# install

npm install

# dev

npm run dev

# build

npm run build
npm run preview

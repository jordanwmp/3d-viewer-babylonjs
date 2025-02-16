import * as BABYLON from 'babylonjs';
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
registerBuiltInLoaders()


import hinoModel from './models/hino.glb';

window.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.createElement('canvas');
  const t = document.querySelector('.container__visualizador')
  console.log('t ', t)
  t.appendChild(canvas);

  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

  const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.05 }, scene);
  // sphere.position.y = 1

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });


  const loadMesh = async () => {
    try {
        const models = await BABYLON.SceneLoader.ImportMeshAsync('', hinoModel, '', scene);
        console.log("models", models);
    } catch (error) {
        console.error("Error loading mesh:", error);
    }
}

 loadMesh()

});


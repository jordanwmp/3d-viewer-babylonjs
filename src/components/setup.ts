// import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import {
    Engine,
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    DirectionalLight,
    Color4,
    CreateBox
} 
from '@babylonjs/core/Legacy/legacy'
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
registerBuiltInLoaders()

class Setup {

    orbitAlpha: number = 1.59749986435041;
    orbtBeta: number = 1.3386675362796507;
    orbitDist: number = 5

    engine!: Engine
    scene: Scene = null
    camera!: ArcRotateCamera
    ambientLight!: HemisphericLight
    directionalLight!:DirectionalLight


    async init(canvas?: HTMLCanvasElement) {

        this.engine = new Engine(canvas, true, { antialias: true })
        this.scene = new Scene(this.engine)
        this.scene.clearColor = new Color4(0.949, 0.949, 0.949, 1.0);
        this.camera = new ArcRotateCamera(
            "camera1",
            this.orbitAlpha,
            this.orbtBeta,
            this.orbitDist,
            Vector3.Zero(),
            this.scene
        )
        this.camera.attachControl(canvas, true)
        this.ambientLight = new HemisphericLight("ambientLight", new Vector3(0, 1, 0))
        this.directionalLight  = new DirectionalLight("light", new Vector3(6, 6, 0), this.scene);
        this.directionalLight.intensity = 0.8;

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })

        window.addEventListener('resize', () => {
            this.engine.resize()
        })

    }

    inspector()
    {
        this.scene.debugLayer.show({
            embedMode: true,
          });
    }

    testSetup() {
        const box = CreateBox("box1", { size: 0.8 })
    }

}

export default Setup
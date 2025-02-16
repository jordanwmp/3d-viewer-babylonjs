import AnimationModel from "./AnimationModel";
import GUI from "./GUI";
import Setup from "./setup";
import 
{
    Scene,
    SceneLoader,
    Vector3
} from '@babylonjs/core/Legacy/legacy'


class Models {

    scene: Scene;
    camera: any;
    animation: AnimationModel
    GUI = new GUI()

    constructor(setup: Setup) {
        this.scene = setup.scene
        this.camera = setup.camera
        this.animation = new AnimationModel(setup)
    }

    async modelAsBase64(base64) {
        this.scene.animationGroups = []
        await SceneLoader.AppendAsync("", base64, this.scene).then(() => {
            const model = this.scene.meshes[this.scene.meshes.length - 1];
            if (model) {
                this.updateModelOnScene(model)
                this.setAnimations()
            } else {
                console.log("Modelo não encontrado na cena");
            }
        }).catch((error) => {
            console.error("Erro ao carregar o modelo:", error);
        });
    }

    handleAnimations = (animationName) => {
        try {
            const animationGroup = this.scene.getAnimationGroupByName(animationName)
            if (animationGroup.isPlaying) {
                this.animation.stopAnimation(animationGroup)
            } else {
                this.animation.startAnimation(animationGroup)
            }
        } catch (error) {
            console.log('Error on handle animations ', error)
        }
    }

    setAnimations() {
        this.GUI.clearListAnimation()
        this.animation.animationsGroup = this.scene.animationGroups
        this.GUI.createAnimationList(this.animation.animationsGroup)
        this.GUI.eventListener(this.handleAnimations)
    }

    private updateModelOnScene(model) {
        model.computeWorldMatrix(true);
        const boundingBox = model.getBoundingInfo().boundingBox;
        const center = boundingBox.centerWorld;
        model.position = new Vector3(-center.x, -center.y, -center.z);

        const maxDimension = Math.max(
            boundingBox.maximumWorld.x - boundingBox.minimumWorld.x,
            boundingBox.maximumWorld.y - boundingBox.minimumWorld.y,
            boundingBox.maximumWorld.z - boundingBox.minimumWorld.z
        );

        const scaleFactor = 1 / maxDimension;
        model.scaling = new Vector3(scaleFactor, scaleFactor, scaleFactor);
        model.computeWorldMatrix(true);
        const newBoundingBox = model.getBoundingInfo().boundingBox;
        const newCenter = newBoundingBox.centerWorld;
        model.position = new Vector3(-newCenter.x, -newCenter.y - 1, -newCenter.z + 0.5);

        const size = newBoundingBox.extendSizeWorld;
        const radius = Math.max(size.x, size.y, size.z) * 3; // Ajuste conforme necessário
        const cameraPosition = new Vector3(newCenter.x, (newCenter.y + radius / 2), newCenter.z + radius);
        this.camera.setPosition(cameraPosition);
        this.camera.target = new Vector3(0, 0, 0);
    }

    async clear() {
        try {
            if (this.scene && this.scene.meshes) {
                this.scene.meshes.forEach(mesh => {
                    mesh.dispose();
                });
            } else {
                console.log('Scene or meshes is undefined.');
            }
        } catch (error) {
            console.log('Erro on clear mesh ', error);
        }
    }
}


export default Models
import Models from "./models";
import Setup from "./setup";

class FileHandle {

    models;

    constructor(setup:Setup) {
        this.models = new Models(setup) 
    }


    async selectModelFromInput(event: any) {

        const files = event.target.files;
        if (files.length === 0) {
            console.log('Nenhum arquivo selecionado.');
            return;
        }

        const file = files[0];
        const reader = new FileReader();
        await this.models.clear()

        reader.onload = async (e: any) => {

            const base64Data = e.target.result//.split(',')[1];
            await this.models.modelAsBase64(base64Data)

        };

        reader.readAsDataURL(file);
    }
}

export default FileHandle
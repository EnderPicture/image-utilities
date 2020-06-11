import MagickW from './magick.worker'
import "./main.scss"

var app = new Vue({
    el: '#app',
    data: {
        formats: [
            {
                name: 'jpeg',
                extension: 'jpg',
            },
            {
                name: 'jpeg2000',
                extension: 'jp2',
            },
            {
                name: 'png',
                extension: 'png',
            },
            {
                name: 'png8',
                extension: 'png',
            },
            {
                name: 'tiff',
                extension: 'tif',
            },
            {
                name: 'gif',
                extension: 'gif',
            },
            {
                name: 'bmp',
                extension: 'bmp',
            },
            {
                name: 'webp',
                extension: 'webp',
            }
        ],
        currentFormat: 0,

        saveButtonText: '',
        processing: false,
        resultImageUrl: '',
        newFileName: '',
        quality: 90,
    },
    computed: {
        format() {
            return this.formats[this.currentFormat];
        }
    },
    methods: {
        inputFileEvent(e) {
            let files = e.target.files;
            this.run(files);
        },
        run(files) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let worker = new MagickW();

                let fnFull = file.name;
                let fnName = file.name.split('.')[0];
                let fnExt = file.name.split('.').pop();

                this.processing = true;
                this.saveButtonText = `processing ${fnFull} ...`;
                this.newFileName = `${fnName}-out.${this.format.extension}`;

                let command = `convert '${fnFull}' `;

                if (this.format.name == 'jpeg') {
                    command += `-quality ${this.quality} `;
                } else if (this.format.name == 'png8') {
                    command += `-colors 256 png8:'`;
                }

                command += `'${this.newFileName}`;
                let message = {
                    input: file,
                    command: command,
                    extension: this.format.extension,
                }
                worker.postMessage(message);
                worker.onmessage = args => {
                    this.processing = false;
                    this.resultImageUrl = URL.createObjectURL(args.data.output);
                    this.saveButtonText = `Save ${this.newFileName}`
                };
            }
        }
    }
})


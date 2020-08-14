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
                name: 'jpeg 2000',
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

        processedFiles: [],

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
            console.log(files);
            this.run(files);
            e.target.value = '';
        },
        dropEvent(e) {
            let files = e.dataTransfer.files;
            this.run(files);
        },
        dropOverEvent(e) {

        },
        run(files) {
            this.processedFiles.length = 0;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let worker = new MagickW();

                let fnFull = file.name;
                let fnName = file.name.split('.')[0];
                let fnExt = file.name.split('.').pop();
                let newFileName = `${fnName}-out.${this.format.extension}`;

                this.processedFiles.push({
                    saveButtonText: `processing ${fnFull} ...`,
                    processing: true,
                    resultImageUrl: '',
                    failed: false,
                    newFileName: newFileName,
                });

                let command = `convert '${fnFull}' `;

                if (this.format.name == 'jpeg') {
                    command += `-quality ${this.quality} `;
                } else if (this.format.name == 'png8') {
                    command += `-colors 256 png8:`;
                }

                command += `'${newFileName}'`;
                console.log(command);
                let message = {
                    index: i,
                    input: file,
                    command: command,
                    extension: this.format.extension,
                }
                worker.postMessage(message);
                worker.onmessage = args => {
                    let file = this.processedFiles[args.data.index];
                    console.log(this.processedFiles);
                    if (args.data.status == 'good') {
                        file.processing = false;
                        file.resultImageUrl = URL.createObjectURL(args.data.output);
                        file.saveButtonText = `Save ${file.newFileName}`;
                    } else {
                        file.processing = false;
                        file.failed = true;
                        file.saveButtonText = `Failed processing ${file.newFileName}`;
                    }
                };
            }
        }
    }
})


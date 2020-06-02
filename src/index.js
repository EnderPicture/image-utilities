import { main } from 'magica'
import { File } from 'magica'
import "./main.scss"

var app = new Vue({
    el: '#app',
    data: {
        formats: [
            'jpeg',
            'png',
            'tiff',
            'gif',
            'bmp',
            'webp',
        ],
        currentFormat: 0,

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
            (async () => {
                let files = await File.fromHtmlFileInputElement(e.target);
                if (files.length > 0) {

                    let file = files[0];

                    let fnFull = file.name;
                    let fnName = file.name.split('.')[0];
                    let fnExt = file.name.split('.').pop();

                    this.newFileName = `${fnName}-out.${this.format}`;

                    let command = '';
                    if (this.currentFormat == 0) {
                        command = `convert '${fnFull}' -quality ${this.quality} '${this.newFileName}'`;
                    } else {
                        command = `convert '${fnFull}' '${this.newFileName}'`;
                    }

                    const result = await main({
                        debug: true,
                        command: command,
                        inputFiles: [file]
                    })

                    let blob = new Blob([result.outputFiles[0].content.buffer], { type: `image/${this.format}` });
                    this.resultImageUrl = URL.createObjectURL(blob);
                }

            })()
        }
    }
})


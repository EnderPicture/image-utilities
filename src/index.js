import { main } from 'magica'
import { File } from 'magica'
import "./main.scss"

var app = new Vue({
    el: '#app',
    data: {
        formats: [
            'jpg',
            'png',
            'png8',
            'tif',
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
                    if (this.formats[this.currentFormat] == 'jpg') {
                        command = `convert '${fnFull}' -quality ${this.quality} '${this.newFileName}'`;
                    } else if (this.formats[this.currentFormat] == 'png8') {
                        this.newFileName = `${fnName}-out.png`;
                        command = `convert '${fnFull}' -colors 256 PNG8:'${this.newFileName}'`;
                    } else {
                        command = `convert '${fnFull}' '${this.newFileName}'`;
                    }

                    const result = await main({
                        // debug: true,
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


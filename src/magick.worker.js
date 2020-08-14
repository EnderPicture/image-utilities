import { main } from 'magica'
import { File } from 'magica'

onmessage = args => {
    (async () => {
        let data = args.data;
        let input = data.input;
        let buffer = await input.arrayBuffer();
        let file = new File(input.name, new Uint8ClampedArray(buffer));
        let command = data.command;
        let extension = data.extension;

        let result = await main({
            //debug: true,
            command: command,
            inputFiles: [file]
        })

        if (result.outputFiles.length > 0) {
            let blob = new Blob([result.outputFiles[0].content.buffer], { type: `image/${extension}` });
            postMessage({
                index: data.index,
                status: 'good',
                output: blob
            });
        } else {
            postMessage({
                index: data.index,
                status: 'failed',
            });
        }
    })();
}
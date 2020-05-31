import { main } from 'magica'
import { File } from 'magica'


let input = document.querySelector('.file-input');
input.addEventListener('change', (e) => {



    (async () => {
        let files = await File.fromHtmlFileInputElement(input);
        
        let file = files[0];

        let fnFull = file.name;
        let fnName = file.name.split('.')[0];
        let fnExt = file.name.split('.').pop();
        

        const result = await main({
            debug: true,
            command: `convert '${fnFull}' -scale 50% -rotate 45 '${fnName}-out.png'`,
            inputFiles: [file]
        })
        
        let blob = new Blob([result.outputFiles[0].content.buffer], { type: 'image/png' });
        document.getElementById('img-foo').src = URL.createObjectURL(blob);
    })()

})


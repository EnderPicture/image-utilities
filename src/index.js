import {main} from 'magica'
(async ()=>{
 const result = await main({
    debug: true,
    command: 'convert bar.gif -scale 150% -rotate 45 foo.png',
    inputFiles: [ 'static/img/bar.gif' ]
  })
  const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode(...result.outputFiles[0].content))}`
  document.getElementById('img-foo').src = dataUrl
})()
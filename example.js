
const wrapper=document.querySelector('.wrapper')
form=wrapper.querySelector('form')
fileInp=form.querySelector('input')
infoText=form.querySelector('p')
copyBtn=wrapper.querySelector('.copy')
closeBtn=wrapper.querySelector('.close')

function fetchRequest(formData,file){
    infoText.innerText="Scanning QR code..."
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:'POST', body:formData
    }).then(res=> res.json()).then(result=>{
        result=result[0].symbol[0].data
        infoText.innerText=result ? "Upload QR code to Scan":"Invalid QR code"
        if(!result) return
        wrapper.querySelector('textarea').innerText=result
        form.querySelector('img').src=URL.createObjectURL(file)
        infoText.innerText="Upload QR code to Scan"
        wrapper.classList.add('active')
    }).catch(()=>{
        infoText.innerText='Invalid QR code'
    })
}

fileInp.addEventListener('change',e=>{
    let file=e.target.files[0]
    if(!file) return;
    let formData=new FormData()
    formData.append('file',file)
    fetchRequest(formData,file)
})

copyBtn.addEventListener('click',()=>{
    let txt=wrapper.querySelector('textarea').textContent
    navigator.clipboard.writeText(txt)
})

form.addEventListener('click',()=> fileInp.click())
closeBtn.addEventListener('click',()=> wrapper.classList.remove('active'))
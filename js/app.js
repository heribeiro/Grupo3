
async function injectContent() {
    let url = location.href; 
    file = url.split('='); 
    let view = (file[1] != undefined) ? file[1] : 'inicio';
    const resp = await fetch(`views/${view}.html`);
    const html = await resp.text(); 
    let inject = document.getElementById('content');
    inject.innerHTML = html;
}

function activeLink() {
    let url = location.href;
    let view = url.split('=');
    let sessao = (view[1] != undefined) ? view[1] : 'inicio';
    document.getElementById(sessao).className += ' active';
}
injectContent();
activeLink();

// Alerta Cookies lei LGPD Feito po Márlon

let lgpdUrl = '#';
let lgpdHTML = `
    <div class="lgpd">
        <div class="lgpd-esq">
            Esse site usa cookies para garantir que você obtenha a melhor experiência de navegação. <br>
            Para conferir detalhadamente todos os cookies utilizados, leia nossa <a href="#"> Política de Privacidade.</a>
        </div>
        <div class="lgpd-dir">
            <button>Aceitar</button>
        </div>
    </div>
    `;
    
let lsContent = localStorage.getItem('lgpd');
if(!lsContent){
    document.body.innerHTML += lgpdHTML;

    let lgpdArea = document.querySelector('.lgpd');
    let lgpdButton = lgpdArea.querySelector('button');

    lgpdButton.addEventListener('click', async ()=>{
        lgpdArea.remove();

        let result = await fetch(lgpdUrl);
        let json = await result.json();

        if(json.error != '') {
            let id = '123'; //json.id ficticio de teste
            localStorage.setItem('lgpd', json.id);
        }

        localStorage.setItem('lgpd', '123');
    });
}



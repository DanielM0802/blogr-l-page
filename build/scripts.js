document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp(){
    dropdown();
    showNavigation();
}

function showNavigation(){
    const navegacion = document.querySelector('.navegacion');
    const button = document.getElementById('btn-open');
    button.dataset.buttonId = 1;
    button.onclick = ()=>{
        btnDesplegar();
    }
    function btnDesplegar(){
        button.dataset.buttonId = button.dataset.buttonId == 1 ? 2 : 1;

        if(button.dataset.buttonId == 1){
                button.src = './src/images/icon-hamburger.svg';
                navegacion.classList.add('d-none');
                return;
            }
            navegacion.classList.remove('d-none');
            button.src = './src/images/icon-close.svg';
    }
}

function dropdown(){
    const items = document.querySelectorAll('.item');
    const [product, company, connect] = items;
    const icons = document.querySelectorAll('.icon-img');

    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('subitem');

    let lastVisible = null;

    class Item{
        constructor(name, options, icon){
            this.name=name;
            this.options = this.generateP(options);
            this.icon = icon;
        }
        generateP(options){
            let listP = ``;
            options.forEach( option => listP +=`<p class="nav-link">${option}</p>`);
            return listP;
        }
        showMenu(){
            dropdownMenu.innerHTML = this.options;
            this.name.appendChild(dropdownMenu);
            lastVisible = this.name;
            this.icon.style.transform = 'rotate(180deg)';
        }
        hideMenu(){
            dropdownMenu.remove();
            lastVisible = null;
            this.icon.style.transform = 'rotate(0deg)';
        }
        rotateIcon(){
            if(lastVisible!==null && lastVisible!==name){
                icons.forEach(icon=>icon.style.transform = 'rotate(0deg)');
            }
        }
        checkMenu(e){
            if(this.hasSubitem() && e.target.className!=='nav-link'){
                return;    
            }else{
                rotateIcon();
            }
            if(this.name === lastVisible){ //Si estamos haciendo click sobre el mismo link
                icons[0].style.transform = 'rotate(0deg)';
                this.hideMenu();
            }else{
                this.showMenu();
            }
        }
        hasSubitem(){
            return this.name.lastChild.className === 'subitem';
        }
    }

    const product1 = new Item( product, ['Overview','Pricing','Marketplace','Features','Integrations'], icons[0] );
    const company1 = new Item( company, ['About','Team','Blog','Careers'], icons[1] );
    const connect1 = new Item( connect, ['Contact','Newsletter','LinkedIn'], icons[2] );

    document.onclick = (e) => { //Remove dropdown
        if(e.target.className!=='nav-link' && e.target.className!=='subitem' && document.querySelector('.subitem')){
            dropdownMenu.remove();
            rotateIcon();
            lastVisible = null;
        }
    }

    product.onclick = (e) => product1.checkMenu(e);

    company.onclick = (e) => company1.checkMenu(e);

    connect.onclick = (e) => connect1.checkMenu(e);

    function rotateIcon(){
        icons.forEach( (icon) => {
            if(icon.style.transform === 'rotate(180deg)'){
            icon.style.transform = 'rotate(0deg)';
            }
        });
    }

}
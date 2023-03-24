const criaCalculadora = () => {
    return{
        display: document.querySelector('.display'),

        incia(){
            this.cliqueBotao();
            this.apertaEnter();
        },

        cliqueBotao(){
            //Até aqui this-> calculadora.
            document.addEventListener('click', function(e){ //A partir daqui o this -> document.
                const event = e.target;

                if(event.classList.contains('btn-num')){
                    this.btnParaDisplay(event.innerText);
                }

                if(event.classList.contains('btn-clear')){
                    this.limpaDisplay();
                }

                if(event.classList.contains('btn-del')){
                    this.apagaUm();
                }

                if(event.classList.contains('btn-eq')){
                    this.fazConta();
                }
            }.bind(this)); //Usando o .bind eu posso atribuir novamente this -> calculadora.
        },

        btnParaDisplay(valor){
            this.display.value += valor;
        },

        fazConta(){
            let conta = this.display.value;

            try{
                conta = eval(conta); //Isso aqui é MUITO perigoso(Tira a segurança da página), pois permite que o usuário execute qualquer código JavaScript pelo input.

                if(!conta){
                    alert('Conta inválida');
                    return;
                }

                this.display.value = String(conta);
            } catch(e){
                alert('Conta inválida');
                return;
            }
        },

        apertaEnter(){
            this.display.addEventListener('keyup', (e) => { //Nesse caso em específico a ArrowFunction pode ser usada dentro de um método, pois o valor não será alterado.
                if(e.keyCode === 13){
                    this.fazConta();
                }
            });
        },

        limpaDisplay(){
            this.display.value = '';
        },

        apagaUm(){
            this.display.value = this.display.value.slice(0, -1);
        }
    };
}

const calculadora = criaCalculadora();
calculadora.incia();
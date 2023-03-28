//Calculadora 2.0 otimizada com funções construtoras.
function Calculadora(){
    this.display = document.querySelector('.display');
    
    this.inicia = () => {
        this.pegaClick();
        this.enter();
    };

    this.enter = () => {
        document.addEventListener('keyup', evento => {
            if(evento.keyCode === 13){
                this.calc();
            }
        });
    };

    this.pegaClick = () => {
        document.addEventListener('click', evento => {
            const element = evento.target;
            if(element.classList.contains('btn-num')) this.numDisplay(element);
            if(element.classList.contains('btn-clear')) this.clear();
            if(element.classList.contains('btn-del')) this.del();
            if(element.classList.contains('btn-eq')) this.calc();
        });
    };

    this.calc = () => {
        try{
            const conta = eval(this.display.value);

            if(!conta){
                alert('Conta inválida');
                return;
            }

            this.display.value = conta;
        }catch(e){
            alert('Conta inválida');
            return;
        }
    };

    this.numDisplay = element => {
        this.display.value += element.innerText;
        this.display.focus();
    };

    this.clear = () => this.display.value = '';
    this.del = () => this.display.value = this.display.value.slice(0, -1);
}

const calculadora = new Calculadora();
calculadora.inicia();
class ValidateCPF {
    constructor(cpfSent) {
      Object.defineProperty(this, 'cpfClean', {
        writable: false,
        enumerable: true,
        configurable: false,
        value: cpfSent.replace(/\D+/g, '')
      });
    }
  
    isSequence() {
      return this.cpfClean.charAt(0).repeat(11) === this.cpfClean;
    }
  
    generateNewCpf() {
      const cpfNoDigits = this.cpfClean.slice(0, -2);
      const digit1 = ValidateCPF.generateDigit(cpfNoDigits);
      const digit2 = ValidateCPF.generateDigit(cpfNoDigits + digit1);
      this.newCPF = cpfNoDigits + digit1 + digit2;
    }
  
    static generateDigit(cpfNoDigits) {
      let total = 0;
      let reverse = cpfNoDigits.length + 1;
  
      for(let stringNumerical of cpfNoDigits) {
        total += reverse * Number(stringNumerical);
        reverse--;
      }
  
      const digit = 11 - (total % 11);
      return digit <= 9 ? String(digit) : '0';
    }
  
    validate() {
      if(!this.cpfClean) return false;
      if(typeof this.cpfClean !== 'string') return false;
      if(this.cpfClean.length !== 11) return false;
      if(this.isSequence()) return false;
      this.generateNewCpf();
  
      return this.newCPF === this.cpfClean;
    }
}

class ValidateForm{
    constructor(){
        this.forms = document.querySelector('.forms')
        this.events();
    }

    events(){
        this.forms.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const checkFields = this.checkFields();
        const checkPassword = this.checkPassword();

        if(checkFields && checkPassword){
            alert('Formulário enviado.');
            this.forms.submit();
        }
    }

    checkPassword(){
        let valid = true;

        const password = this.forms.querySelector('.password');
        const repeatPassword = this.forms.querySelector('.repeat-password');

        if(password.value !== repeatPassword.value){
            valid = false;
            this.createError(password, 'As senhas não coincidem.');
            this.createError(repeatPassword, 'As senhas não coincidem.')
        }

        if(password.value.length < 6 || password.value.length > 12){
            valid = false;
            this.createError(password, 'A senha deve conter no mínimo 6 e no máximo 12 caracteres.');
        }

        return valid;
    }

    checkFields(){
        let valid = true;

        for(let errorText of this.forms.querySelectorAll('.text-error')){
            errorText.remove();
        }
        
        for(let field of this.forms.querySelectorAll('.valid')){
            
            if(field.classList.contains('cpf')){
                if(!this.validateCPF(field)) valid = false;
            }
        }

        return valid;
    }

    validateCPF(field){
        const cpf = new ValidateCPF(field.value);

        if(!cpf.validate()){
            this.createError(field, 'CPF Inválido.');
            return false;
        }

        return true;
    }

    createError(field, message){
        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('text-error');
        field.insertAdjacentElement('afterend', div);
    }
}

const valido = new ValidateForm();

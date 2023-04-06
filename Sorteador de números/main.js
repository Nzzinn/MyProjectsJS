function sorteiaNum(min, max, sorteado){
    min = parseInt(document.getElementById('min').value);
    max = parseInt(document.getElementById('max').value);
    sorteado = Math.floor(Math.random() * (max - min) + min);
    document.getElementById('resultado').innerHTML = `O número sorteado foi: ${sorteado}`;
};
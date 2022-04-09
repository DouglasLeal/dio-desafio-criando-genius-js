const divVermelho = document.querySelector('.vermelho');
const divVerde = document.querySelector('.verde');
const divAzul = document.querySelector('.azul');
const divAmarelo = document.querySelector('.amarelo');

let sequenciaJogo = [];
let sequenciaCliques = [];
let pontuacao = 0;

function sortearProximo() {
    let proximo = Math.floor(Math.random() * 4);
    sequenciaJogo[sequenciaJogo.length] = proximo;
    sequenciaCliques = [];

    for(let i in sequenciaJogo) {
        let div = retornaDivCor(sequenciaJogo[i]);
        piscar(div, Number(i) + 1);
    }
}

function piscar(div, n){
    let tempo = n * 500;
    setTimeout(() => {
        div.classList.add("selecionado");
    }, tempo - 250);
    
    setTimeout(() => {
        div.classList.remove("selecionado");
    }, tempo);
}

function verificarSequencias(){
    for(let i in sequenciaCliques) {
        if(sequenciaCliques[i] != sequenciaJogo[i]) {
            finalizarJogo();
            break;
        }
    }
    if(sequenciaCliques.length == sequenciaJogo.length) {
        alert(`Preparando próximo nível...\nPontuação atual: ${pontuacao}!\nClique em OK para continuar.`);
        proximaFase();
    }
}

function clique(numero) {
    sequenciaCliques[sequenciaCliques.length] = numero;
    retornaDivCor(numero).classList.add('selecionado');

    setTimeout(() => {
        retornaDivCor(numero).classList.remove('selecionado');
        verificarSequencias();
    },250);
}

function retornaDivCor(numero){
    if(numero == 0) {
        return divVermelho;
    } else if(numero == 1) {
        return divVerde;
    } else if (numero == 2) {
        return divAzul;
    } else if (numero == 3) {
        return divAmarelo;
    }
}

function proximaFase(){
    pontuacao++;
    sortearProximo();
}

function iniciarJogo(){
    alert("Iniciando o Jogo!!!");
    pontuacao = 0;
    proximaFase();
}

function finalizarJogo(){
    alert(`Você perdeu!\nPontuação: ${pontuacao}!\nClique em OK para jogar novamente.`);
    sequenciaJogo = [];
    sequenciaCliques = [];

    iniciarJogo();
}

divVermelho.addEventListener('click', ()=>{
    clique(0);
});

divVerde.addEventListener('click', ()=>{
    clique(1);
});

divAzul.addEventListener('click', ()=>{
    clique(2);
});

divAmarelo.addEventListener('click', ()=>{
    clique(3);
});

iniciarJogo();
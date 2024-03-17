const listaDePalavras = ['manteiga', 'leite', 'praça', 'parque', 'lua']
let palavraEscolhida;
let palavraSecreta;
let letrasChutadas;
let tentativasRestantes;
let numeroErros;

//iniciando
function iniciarJogo() {

    document.getElementById('btn_reiniciar').style.display = 'none';
    document.getElementById('entrada_letra').disabled = false;
    //Escolher uma palavra aleátoria da lista

    palavraEscolhida = listaDePalavras[Math.floor(Math.random()*listaDePalavras.length)]
    console.log(palavraEscolhida)

    //iniciar a exibicao
    palavraSecreta = Array(palavraEscolhida.length).fill('_')
    console.log(palavraSecreta);


    //inicializar lista d epalavras chutadas
    letrasChutadas =[]


    //defininir o numero maximo de tentativas
    tentativasRestantes = 7

    //Inicializa o numero de erros 
    numeroErros = 0

    atualizarExibicao();
}

function atualizarExibicao() {
    document.getElementById('palavra-secreta').innerText= palavraSecreta.join('  ')
    document.getElementById('letras_chutadas').innerText= `${letrasChutadas.join(', ')}`

    document.getElementById('mensagem').innerText = '';
    document.getElementById('imagem').src = `img/forca${numeroErros}.png `;

    //Verificar se o jogo terminou
    if(tentativasRestantes === 0){
        encerrarJogo('VOCÊ MORREU!')
    }else if(!palavraSecreta.includes('_')){
        encerrarJogo("PARABÉNS VOCÊ VENCEU!")
    }

}

function chutarLetra() {
    const entrada_letra = document.getElementById('entrada_letra')
    const letra = entrada_letra.value.toLowerCase();

    if(!letra.match(/[a-zà-ùç]/i)){
        alert('Por favor, insira uma letra válida')
        entrada_letra.value = '';
        return
    }
    if(letrasChutadas.includes(letra)){
        alert('Você ja tentou essa letra, Tente outra!')
        entrada_letra.value = '';
        return
    }

    letrasChutadas.push(letra)

    if(palavraEscolhida.includes(letra)){
        for (let i =0; i<palavraEscolhida.length; i++){
            if(palavraEscolhida[i] === letra){
                palavraSecreta[i] = letra
            }
        }
    }else {
        tentativasRestantes--;
        numeroErros++;

    }

    entrada_letra.value = '';
    atualizarExibicao()

}

function encerrarJogo(mensagem) {
    //desabilitar o campo de doiigitação
    document.getElementById('entrada_letra').disabled =true;
    
    //Exibir a mensagem
    document.getElementById('mensagem').style.display = 'block'
    document.getElementById('mensagem').innerText = mensagem

    //exibir o botao reiniciar
    document.getElementById('btn_reiniciar').style.display = 'block';


}

window.load = iniciarJogo();

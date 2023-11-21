const nomesFilmes = [
  "O Labirinto do Fauno",

  "Up - Altas Aventuras",

  "Amnésia",

  "Coração Valente",

  "Quem Quer Ser um Milionário?",

  "Senhor dos Anéis: O Retorno do Rei",

  "A Bela e a Fera",

  "A Origem",

  "Senhor dos Anéis: A Sociedade do Anel",

  "Wall-E",

  "Gladiador",

  "Avatar",

  "O Rei Leão",

  "O Fabuloso Destino de Amélie Poulain",

  "Batman: O Cavaleiro das Trevas",

  "Brilho Eterno de uma Mente sem Lembranças",

  "Gênio Indomável",

  "Jurassic Park: O Parque dos Dinossauros",

  "Titanic",

  "Matrix",

  "Toy Story",
];

const tamanhoArray = nomesFilmes.length;
const input = document.querySelector("#letraSugerida");
const botaoGerarPalavra = document.querySelector(".gerarPalavra");
const imagemForca = document.querySelector(".imagemForca");
const menuFimDeJogo = document.querySelector(".fimdeJogo");
const painelLetrasTestadas = document.querySelector(".letrasTestadas");

let palavraDaJogada = []; //array com a palavra da jogada, cada elemento do array uma letra -escrita normal e com acentos
let tentativas = [];
let letrasPalavraSecreta = []; // contem todas as letras da palavra secreta, maiusculas e sem acentos
let todasLetras; // um array com todas as divs das letras
let letrasErradas;
let letrasPreenchidas = 0;
let statusJogo;

function criarElemento(tipo, classe) {
  const elemento = document.createElement(tipo);
  elemento.classList.add(classe);
  return elemento;
}

function numeroAleatorio() {
  const numeroale = parseInt(Math.random() * (tamanhoArray - 0 + 0));
  return numeroale;
}

function escolherPalavraSecreta() {
  const indicePalavra = numeroAleatorio();
  return nomesFilmes[
    indicePalavra
  ]; /**O array é o que estiver escolhendo as palavras// alterar para poder inserir o array como parâmetro */
}

function arrayPalavraSecreta() {
  const palavraSecreta = escolherPalavraSecreta().split("");
  return palavraSecreta;
}

function tirarAcentoEdeixarMaiuscula(palavra) {
  return palavra
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/, "");
}

function criarDivsdaPalavraSecreta() {
  palavraDaJogada = arrayPalavraSecreta();
  const divLetras = document.querySelector(".palavraSecreta");
  console.log(palavraDaJogada);

  palavraDaJogada.forEach(function (elemento) {
    const letra = criarElemento("div", "letraPalavra");

    divLetras.appendChild(letra);
    letra.appendChild(document.createTextNode(elemento));
  });
}

function prepararJogo() {
  criarDivsdaPalavraSecreta();

  todasLetras = Array.from(document.querySelectorAll(".letraPalavra"));

  todasLetras.forEach(function (elemento) {
    if (elemento.textContent == " ") {
      elemento.style.borderColor = "white";
      letrasPreenchidas++;

      if (elemento.getBoundingClientRect().left >= 800) {
        elemento.classList.add("quebrarLinha"); // Evita que a palavra fique quebrada
      }
    } else if (
      elemento.textContent == ":" ||
      elemento.textContent == "-" ||
      elemento.textContent == "!" ||
      elemento.textContent == "?"
    ) {
      elemento.style.color = "black";
      letrasPreenchidas++;
    } else {
      elemento.style.color = "white";
    }
  });
}

function exibirImagemForca(letrasErradas) {
  if (letrasErradas.length == 1) {
    imagemForca.setAttribute("src", "./img/forca2.png");
  }

  if (letrasErradas.length == 2) {
    imagemForca.setAttribute("src", "./img/forca3.png");
  }

  if (letrasErradas.length == 3) {
    imagemForca.setAttribute("src", "./img/forca4.png");
  }

  if (letrasErradas.length == 4) {
    imagemForca.setAttribute("src", "./img/forca5.png");
  }

  if (letrasErradas.length == 5) {
    imagemForca.setAttribute("src", "./img/forca6.png");
  }

  if (letrasErradas.length == 6) {
    imagemForca.setAttribute("src", "./img/forca7.png");
  }

  if (letrasErradas.length == 7) {
    imagemForca.setAttribute("src", "./img/forca8.png");
  }
}

function tirarDuplicados(vetor) {
  const vetorSemDuplicados = vetor.filter((elemento, indice, array) => {
    return array.indexOf(elemento) == indice;
  });
  return vetorSemDuplicados;
}

function iniciarJogo() {
  palavraDaJogada = [];
  tentativas = [];
  letrasPalavraSecreta = [];
  todasLetras = [];
  letrasErradas = [];
  letrasPreenchidas = 0;

  painelLetrasTestadas.innerText = "Letras Testadas :";
  menuFimDeJogo.style.display = "none";

  input.disabled = false;

  imagemForca.setAttribute("src", "./img/forca1.png");

  const palavraSecreta = document.querySelector(".palavraSecreta");
  palavraSecreta.innerText = "";

  prepararJogo(); // Chamar essa função no botão iniciar/Gerar palavra
  checarSugestao();
}

function fimDeJogo() {
  const btnReiniciar = document.querySelector(".reiniciar");
  const textoDerrota = document.querySelector(".textoFim");

  input.disabled = true;
  menuFimDeJogo.style.display = "block";
  btnReiniciar.addEventListener("click", iniciarJogo);

  if (statusJogo == false) {
    menuFimDeJogo.classList.add("derrota");
    textoDerrota.innerText = "Que Tragédia... VOCÊ PERDEU!!!!";
  }
  if (statusJogo == true) {
    menuFimDeJogo.classList.remove("derrota");
    textoDerrota.innerText = "Parabéns ... VOCÊ GANHOU !!!!";
  }
}

function verificarFimDeJogo() {
  if (letrasPalavraSecreta.length == letrasPreenchidas) {
    console.log("Fim do Jogo .. Você ganhou!!!");
    statusJogo = true;
    fimDeJogo();
  } else if (imagemForca.getAttribute("src") == "./img/forca8.png") {
    console.log("Fim do Jogo .. Você perdeu!!!");
    statusJogo = false;
    fimDeJogo();
  }
}

function checarSugestao() {
  letrasPalavraSecreta = todasLetras.map(function (e) {
    return tirarAcentoEdeixarMaiuscula(e.textContent);
  });

  document.addEventListener("keydown", function revelaLetra(evento) {
    if (evento.key == "Enter") {
      const letraSugestao = input.value.toUpperCase();

      todasLetras.forEach(function (e) {
        const letraPalavra = tirarAcentoEdeixarMaiuscula(e.textContent);

        if (tentativas.indexOf(letraSugestao) == -1) {
          if (letraSugestao == letraPalavra) {
            e.style.color = "black";
            letrasPreenchidas++;
          }
          input.value = "";
        } else {
          console.log(
            `A letra ${letraSugestao} já foi testada.. tente novamente!!!`
          );
          input.value = "";
        }
      });

      tentativas.push(letraSugestao);

      letrasErradas = tentativas.filter((el) => {
        return letrasPalavraSecreta.indexOf(el) == -1;
      });

      const tentativasErradas = tirarDuplicados(letrasErradas).filter((i) => {
        return i;
      });

      painelLetrasTestadas.innerText = `Letras Testadas : ${tentativasErradas}`;

      exibirImagemForca(tentativasErradas);
      verificarFimDeJogo();
    }
  });
}

botaoGerarPalavra.addEventListener("click", iniciarJogo);

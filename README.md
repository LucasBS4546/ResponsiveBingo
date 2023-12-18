# BingoResponsivo
Bingo Responsivo é um projeto pessoal voltado ao meu aprendizado em JavaScript e CSS responsivo.
Busco aqui criar uma aplicação web de um bingo que funcione em qualquer dispositivo.

O bingo foi desenvolvido pela perspectiva do Mobile-First, tendo sua versão desktop adaptada posteriormente.
Seu CSS possui essa distinção por meio de uma palavra-chave "@media", que separa a estilização usada em dispositivos desktop e dispositivos mobile.
O JavaScript foi feito de forma a poder rodar diversos ciclos de jogo, alterando constantemente o documento HTML em suas funções.

### [ACESSAR O BINGO](https://lucasbs4546.github.io/BingoResponsivo/)

## Guia do repositório
 * index.html - O arquivo que contem a estrutura da página em linguagem de marcação (HTML 5).
 * style.css - O arquivo que contem a estilização do cabeçalho e rodapé (header e footer).
 * main.css - O arquivo que contem a estilização da parte principal do corpo da página (main).
 * script.js - O arquivo que contem a programação feita em JavaScript.
 * headericon.png - O arquivo de imagem usado no cabeçalho da página.

## Funcionalidades
Início do jogo:
 * Criação de cartelas - O usuário pode inserir o nome de um jogador do bingo e sua cartela respectiva será criada. O usuário pode criar quantas cartelas quiser.

O usuário pode então escolher se deseja realizar um sorteio manual ou automático:
 * Sorteio manual - O usuário aperta um botão para sortear um número.
 * Sorteio automático: O programa sorteia números automaticamente dentro de um intervalo fixo.

Finalização do jogo:
 * Assim que qualquer cartela seja completamente preenchida, o jogador respectivo daquela cartela será o vencedor.
   * Caso mais de um jogador faça bingo ao mesmo tempo, todos os jogadores vencedores serão consdierados vencedores.
 * O programa anunciará o vencedor / os vencedores.
 * O jogador pode apertar um botão para jogar novamente 

## Objetivos
Metas que ainda não foram implementadas, mas pretendo desenvolver:
* Capacidade de apagar cartelas criadas

const cardsSection = document.getElementById("cardsSection");
const buttonsSection = document.getElementById("buttonsSection");
const inputDiv = document.getElementById("inputDiv");
const addCardButton = document.getElementById("addCardButton");
const startRaffleButton = document.getElementById("startRaffleButton");

var cardCounter = 0;
var players = [];
var generatedNumbers = [];
var raffleNumbers = [];
var raffleInterval;
var winnerNames = [];

startRaffleButton.disabled = true;

//DEIXAR O USUARIO ESCOLHER ENTRE SORTEAMENTO MANUAL E SORTEAMENTO AUTOMATICO

function askName(){

    addCardButton.classList.add("hidden");
    inputDiv.classList.add("flexColumn");
    inputDiv.classList.remove("hidden");

}

function createPlayer(){

    addCardButton.classList.remove("hidden");
    inputDiv.classList.add("hidden");
    inputDiv.classList.remove("flexColumn");

    var playerName = document.getElementById("nameInput").value;

    var isNameUnique = true;
    players.forEach((player)=>{

        if(player.playerName == playerName){

            isNameUnique = false;

        }

    });

    var card = [];

    if(isNameUnique && playerName != ""){

        players.push({

            playerName: playerName,
            card: this.playerName

        });

        createCard(playerName);
        generatedNumbers = [];
        startRaffleButton.disabled = false;

    } else {

        if(!isNameUnique){
            createErrorMessage(1);
        } else {
            createErrorMessage(0);
        }

    }

    document.getElementById("nameInput").value = "";

}

function createErrorMessage(errorSwitch){

    var errorText = "";

    switch(errorSwitch)
    {
        case 0: errorText = "Não é possível criar jogadores sem nome!";
            break;
        case 1: errorText = "Não é possível usar nomes repetidos!";
            break;
    }

    displayErrorMessage(errorText);

}

function displayErrorMessage(errorText){

    var errorP = document.createElement("p");
    errorP.id = "errorP";
    errorP.innerHTML = errorText;

    var errorDiv = document.createElement("div");
    errorDiv.id = "errorDiv";
    errorDiv.appendChild(errorP);

    buttonsSection.appendChild(errorDiv);

    setTimeout(()=>{

        buttonsSection.removeChild(errorDiv);

    }, 2000);

}

function createCard(name){

    var card = document.createElement("div");
    card.id = "card" + cardCounter;
    card.classList.add("cards");

    var playerNameTag = document.createElement("h2");
    playerNameTag.id = "playerNameTag" + cardCounter;
    playerNameTag.classList.add("playerNameTags");
    playerNameTag.innerHTML = players[cardCounter].playerName;
    card.appendChild(playerNameTag);

    var cardArray = createCardArray();
    console.log(cardArray);

    card.appendChild(drawCard(cardArray, name));
    cardsSection.appendChild(card);
    
    players[cardCounter].card = cardArray;
    cardCounter++;

}

function createCardArray(){

    var cardArray = [];

    for(i=0; i<5; i++){

        var row = [];

        for(j=0; j<5; j++){

            if(i == 2 && j == 2){

                row[j] = 0;

            } else {

                row[j] = getRandomNumber(i);

            }

        }

        cardArray[i] = row;

    }
    return cardArray;

}

function getRandomNumber(interval){

    var randomNumber;

    switch(interval)
    {
        case 0: randomNumber = generateRandomNumber(1, 15, generatedNumbers);
            break;

        case 1: randomNumber = generateRandomNumber(16, 30, generatedNumbers);
            break;

        case 2: randomNumber = generateRandomNumber(31, 45, generatedNumbers);
            break;
            
        case 3: randomNumber = generateRandomNumber(46, 60, generatedNumbers);
            break;
            
        case 4: randomNumber = generateRandomNumber(61, 75, generatedNumbers);
            break;
    }

    return randomNumber;

}

function generateRandomNumber(min, max, numArray){

    var randomNumber, isRepeatedNumber;

    do{

        isRepeatedNumber = false;
        randomNumber = Math.ceil(Math.random() * (max-min)) + min;

        numArray.forEach((n)=>{

            if(randomNumber == n){
                isRepeatedNumber = true;
            }

        });

    }while(isRepeatedNumber);

    numArray.push(randomNumber);
    return randomNumber;

}

function drawCard(cardArray, name){

    var table = document.createElement("table");
    table.id = "table" + cardCounter;

    for(i = 0; i < 5; i++){

        var tr = document.createElement("tr");

        for(j = 0; j < 5; j++){

            var td = document.createElement("td");
            td.id = "td" + name + i + j;

            if(i == 2 && j == 2){

                td.innerHTML = "X";
                
            } else {

                td.innerHTML = cardArray[j][i];

            }

            tr.appendChild(td);

        }

        table.appendChild(tr);

    }

    return table;

}

function startRaffle(){

    prepareRaffleArea();

    raffleInterval = setInterval(()=>{

        //            colocar 74 aqui quebra o código - não sei o porquê disso...
        //                        V
        if(raffleNumbers.length > 73){

            clearInterval(raffleInterval);

        } else {

            var raffleNumber = generateRandomNumber(1, 75, raffleNumbers);
            drawRaffleNumber(raffleNumber);
            checkCards(raffleNumber);
            checkForWinner();

        }

    }, 600);

}

function prepareRaffleArea(){

    buttonsSection.innerHTML = "";
    buttonsSection.classList.replace("buttonsSection", "buttonSectionChanged");

}

function drawRaffleNumber(raffleNumber){

    var numP = document.createElement("p");
    numP.id = "raffleNumberP" + raffleNumbers.length;
    numP.classList.add("raffleNumberP");
    numP.innerHTML = raffleNumber;

    var numDiv = document.createElement("div");
    numDiv.id = "raffleNumberDiv" + raffleNumbers.length;
    numDiv.classList.add("raffleNumberDiv");
    numDiv.appendChild(numP);
    
    buttonsSection.appendChild(numDiv);

}

function checkCards(raffleNumber){

    players.forEach((player)=>{

        for(i = 0; i < 5; i++){

            for(j = 0; j < 5; j++){

                if(player.card[i][j] == raffleNumber && !(i == 2 && j == 2)){

                    player.card[i][j] = 0;
                    var td = document.getElementById("td" + player.playerName + j + i);
                    td.style.backgroundColor = "lightblue";
                    
                }

            }

        }

    });

}

function checkForWinner(){

    players.forEach((player)=>{

        var isWinner = true;
        
        for(i = 0; i < 5; i++){

            for(j = 0; j < 5; j++){

                if(player.card[i][j] != 0){

                    isWinner = false;

                }

            }

        }

        if(isWinner){

            winnerNames.push(player.playerName);
            clearInterval(raffleInterval);
            endGame();
            
        }

    });

}

function endGame(){

    buttonsSection.innerHTML = "";
    var winnerText;  

    if(winnerNames.length == 1) {

        winnerText = winnerNames[0] + " venceu o jogo!";

    } else if(winnerNames.length > 1){
        
        winnerText = "";
        winnerNames.forEach((name)=>{
            
            winnerText += name;

            if(winnerNames.indexOf(name) == winnerNames.length - 2) {

                winnerText += " & ";

            } else {

                winnerText += ", ";

            }
            
        })
        winnerText = winnerText.slice(0, -2);
        winnerText += " venceram o jogo!";
        
    } else {
        
        winnerText = "Ninguém venceu o jogo!";
        
    }
    
    var winnerP = document.createElement("p");
    winnerP.id = "winnerP";
    winnerP.innerHTML = winnerText;

    var restartButton = document.createElement("button");
    restartButton.id = "restartButton";
    restartButton.onclick = function() {restartGame()};
    restartButton.innerHTML = "Jogar Novamente";

    var winnerDiv = document.createElement("div");
    winnerDiv.id = "winnerDiv";
    winnerDiv.appendChild(winnerP);
    winnerDiv.appendChild(restartButton);

    buttonsSection.appendChild(winnerDiv);

}

function restartGame() {

    location.reload();

}
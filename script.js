const cardsSection = document.getElementById("cardsSection");
const buttonsSection = document.getElementById("buttonsSection");
const inputDiv = document.getElementById("inputDiv");
const addCardButton = document.getElementById("addCardButton");
const startRaffleButton = document.getElementById("startRaffleButton");

let players = [];
let generatedNumbers = [];
let raffleNumbers = [];
let raffleInterval;
let winnerNames = [];
let isWinner;

startRaffleButton.disabled = true;


function askName(){

    addCardButton.classList.add("hidden");
    inputDiv.classList.add("flexColumn");
    inputDiv.classList.remove("hidden");

}

function createPlayer(){

    addCardButton.classList.remove("hidden");
    inputDiv.classList.add("hidden");
    inputDiv.classList.remove("flexColumn");

    let playerName = document.getElementById("nameInput").value;

    let isNameUnique = true;
    players.forEach((player)=>{

        if(player.playerName == playerName){

            isNameUnique = false;

        }

    });

    let card = [];

    if(isNameUnique && playerName != ""){

        players.push({

            playerName: playerName,
            card: this.playerName

        });

        createCard(playerName, players.length);
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

    let errorText = "";

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

    let errorP = document.createElement("p");
    errorP.id = "errorP";
    errorP.innerHTML = errorText;

    let errorDiv = document.createElement("div");
    errorDiv.id = "errorDiv";
    errorDiv.appendChild(errorP);

    buttonsSection.appendChild(errorDiv);

    setTimeout(()=>{

        buttonsSection.removeChild(errorDiv);

    }, 2000);

}

function createCard(name, pLength){

    let card = document.createElement("div");
    card.id = "card" + name;
    card.classList.add("cards");

    let playerNameTag = document.createElement("h2");
    playerNameTag.id = "playerNameTag" + name;
    playerNameTag.classList.add("playerNameTags");
    playerNameTag.innerHTML = name;
    card.appendChild(playerNameTag);

    let cardArray = createCardArray();
    console.log(cardArray);

    card.appendChild(drawCard(cardArray, name));
    cardsSection.appendChild(card);

    let deleteIcon = document.createElement("img");
    deleteIcon.id = "deleteIcon" + name;
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.src = "deleteIcon.webp";

    let deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton" + name;
    deleteButton.classList.add("deleteButton");
    deleteButton.onclick = function() {deleteCard(deleteButton.id)};
    deleteButton.appendChild(deleteIcon);
    card.appendChild(deleteButton);    
    
    players[pLength - 1].card = cardArray;

}

function createCardArray(){

    let cardArray = [];

    for(i=0; i<5; i++){

        let row = [];

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

    let randomNumber;

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

    let randomNumber, isRepeatedNumber;

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

    let table = document.createElement("table");
    table.id = "table" + name;
    table.classList.add("cardTable");

    for(i = 0; i < 5; i++){

        let tr = document.createElement("tr");

        for(j = 0; j < 5; j++){

            let td = document.createElement("td");
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

function deleteCard(btnId){

    btnId = btnId.substring(12);
    players.forEach((player)=>{

        if(player.playerName == btnId){

            players.splice(players.indexOf(player), 1);

        }

    });

    let deletedCard = document.getElementById("card" + btnId);
    cardsSection.removeChild(deletedCard);

}

function chooseRaffle(){

    buttonsSection.removeChild(startRaffleButton);
    addCardButton.disabled = true;
    let delButtons = document.querySelectorAll(".deleteButton");
    delButtons.forEach((delB)=>{
        delB.remove();
    });

    let manualRaffleButton = document.createElement("button");
    manualRaffleButton.id = "manualRaffleButton";
    manualRaffleButton.innerHTML = "Sorteio manual";
    manualRaffleButton.classList.add("mainButton");
    manualRaffleButton.onclick = function() {prepareManualRaffle()};

    let autoRaffleButton = document.createElement("button");
    autoRaffleButton.id = "autoRaffleButton";
    autoRaffleButton.innerHTML = "Sorteio automático";
    autoRaffleButton.classList.add("mainButton");
    autoRaffleButton.onclick = function() {startAutoRaffle()};

    let raffleOptionSpan = document.createElement("span");
    raffleOptionSpan.id = "raffleOptionsSpan";
    raffleOptionSpan.appendChild(manualRaffleButton);
    raffleOptionSpan.appendChild(autoRaffleButton);

    buttonsSection.appendChild(raffleOptionSpan);

}

function prepareManualRaffle(){

    prepareRaffleArea();

    let manualRaffleButton = document.createElement("button");
    manualRaffleButton.id = "manualRaffleButton";
    manualRaffleButton.classList.add("manualRaffleButton");
    manualRaffleButton.innerHTML = "Clique para sortear";
    manualRaffleButton.onclick = function() {pickManualNumber()};

    buttonsSection.appendChild(manualRaffleButton);   
    
}

function pickManualNumber(){
    
    if(raffleNumbers.length < 73 && !isWinner){
        
        let raffleNumber = generateRandomNumber(1, 75, raffleNumbers);
        drawRaffleNumber(raffleNumber);
        checkCards(raffleNumber);
        checkForWinner();

        document.getElementById("manualRaffleButton").disabled = true;
        setTimeout(()=>{

            document.getElementById("manualRaffleButton").disabled = false;

        }, 500);
             
    }

}

function startAutoRaffle(){

    prepareRaffleArea();

    raffleInterval = setInterval(()=>{

        //            colocar 74 aqui quebra o código - não sei o porquê disso...
        //                        V
        if(raffleNumbers.length > 73){

            clearInterval(raffleInterval);

        } else {

            let raffleNumber = generateRandomNumber(1, 75, raffleNumbers);
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

    let numP = document.createElement("p");
    numP.id = "raffleNumberP" + raffleNumbers.length;
    numP.classList.add("raffleNumberP");
    numP.innerHTML = raffleNumber;

    let numDiv = document.createElement("div");
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
                    let td = document.getElementById("td" + player.playerName + j + i);
                    td.style.backgroundColor = "lightblue";
                    
                }

            }

        }

    });

}

function checkForWinner(){

    players.forEach((player)=>{

        isWinner = true;
        
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
    let winnerText;  

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
    
    let winnerP = document.createElement("p");
    winnerP.id = "winnerP";
    winnerP.innerHTML = winnerText;

    let restartButton = document.createElement("button");
    restartButton.id = "restartButton";
    restartButton.onclick = function() {restartGame()};
    restartButton.innerHTML = "Jogar Novamente";

    let winnerDiv = document.createElement("div");
    winnerDiv.id = "winnerDiv";
    winnerDiv.appendChild(winnerP);
    winnerDiv.appendChild(restartButton);

    buttonsSection.appendChild(winnerDiv);

}

function restartGame() {

    location.reload();

}
# ResponsiveBingo
ResponsiveBingo is a personal project I made to get a better grip on JavaScript and responsive CSS.

Here I aim to create a <i>bingo</i> web aplication that works on any device.

The website was developed and designed with the mobile-first perspective, having its desktop version adapted afterwards.

<hr>

## [ACCESS THE BINGO!](https://lucasbs4546.github.io/BingoResponsivo/)

<hr>

## Repository guide
 * **index.html** - File containing the structure of the website in HTML5.
 * **style.css** - File containing the styling of the header and footer of the website.
 * **main.css** - File containing the styling of the main part of the website.
 * **script.js** - File containing the code written in JavaScript.
 * **headerIcon.png** - Image file used in the header of the website.
 * **deleteIcon.webp** - Image file used in bingo cards of the website.

<details>
  <summary>
    <h2>Functionality</h2>
  </summary>
  
  Start of game:
   * Create card - The user can input the name of a player and their respective bingo card will be created. The user can create as many players as they want, as long as there are no repeated names.
   * Delete card - The user can also delete an existing bingo card/player if they want to.

  The user can now choose between a <i>manual raffle</i> and an <i>automatic raffle</i>:
   * Manual raffle - The user presses a button in order to draw a number.
   * Automatic raffle: The program will keep drawing a number every few seconds automatically.
  
  Game over:
   * Whenever a bingo card is completely filled, the corresponding player of that card will win.
     * There might be multiple winners.
   * The program will declare the winners.
   * The user can press a button to play again. 
</details>

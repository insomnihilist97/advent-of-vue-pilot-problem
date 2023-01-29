<template>
  <div class="container">
    <div class="row">
      <div style="background-color: rebeccapurple" class="col-4"><TicTacToeCell @click="addAndcheckBoard(0, 0)"/></div>
      <div style="background-color: aliceblue" class="col-4"><TicTacToeCell @click="addAndcheckBoard(1, 0)"/></div>
      <div style="background-color: rebeccapurple;" class="col-4"><TicTacToeCell @click="addAndcheckBoard(2, 0)"/></div>
    </div>
    <hr />
    <div class="row">
      <div style="background-color: aliceblue" class="col-4"><TicTacToeCell @click="addAndcheckBoard(0, 1)"/></div>
      <div style="background-color: rebeccapurple" class="col-4"><TicTacToeCell @click="addAndcheckBoard(1, 1)"/></div>
      <div style="background-color: aliceblue;" class="col-4"><TicTacToeCell @click="addAndcheckBoard(2, 1)"/></div>
    </div>
    <hr />
    <div class="row">
      <div style="background-color: rebeccapurple" class="col-4"><TicTacToeCell @click="addAndcheckBoard(0, 2)"/></div>
      <div style="background-color: aliceblue" class="col-4"><TicTacToeCell @click="addAndcheckBoard(1, 2)"/></div>
      <div style="background-color: rebeccapurple;" class="col-4"><TicTacToeCell @click="addAndcheckBoard(2, 2)"/></div>
    </div>
    <div v-if="playerWon">
      <h1>{{ winMessage }}</h1>
      <button @click="resetGame">RESET</button>
    </div>   
    <div v-if="tieGame">
      <h1>Tied!!</h1>
      <button @click="resetGame">RESET</button>
    </div>
    <h1 v-if="!playerWon && !tieGame">{{ playingNext }}</h1>
  </div>
</template>
  
  <script>
  import TicTacToeCell from './TicTacToeCell.vue';
  import { mapState, mapActions } from 'pinia'
  import { useXOStore } from '../store/xOrOStore'
  
  export default {
    name: 'BoardComponent',
    components: {
        TicTacToeCell
    },
    data() {
      return {
        gameBoard: [],
        playerWon: false,
        tieGame: false,
        winMessage: '',
      }
    },
    computed: {
        ...mapState(useXOStore, ['XO']),
        playingNext() {
            return this.XO.toUpperCase() + " playing next..."
        }
    },
    mounted() {
     this.initializeBoard();
    },
    methods: {
      ...mapActions(useXOStore, ['swapXO', 'incrementGamesPlayed', 'setGameWon']),
      initializeBoard() {
        for (let i = 0; i < 3; i++) {
            this.gameBoard.push(['unmarked']);
            for (let j = 0; j < 3; j++) {
            this.gameBoard[i][j] = 'unmarked';
            }
        }
      },
      addAndcheckBoard(xCord, yCord) {
        if(this.gameBoard[xCord][yCord] !== 'unmarked' || this.playerWon) return;
        this.gameBoard[xCord][yCord] = this.XO;
        console.log(this.gameBoard[xCord][yCord]);
        if((this.gameBoard[0][0] == this.XO && this.gameBoard[0][1] == this.XO && this.gameBoard[0][2] == this.XO)
        ||
        (this.gameBoard[1][0] == this.XO && this.gameBoard[1][1] == this.XO && this.gameBoard[1][2] == this.XO)
        ||
        (this.gameBoard[2][0] == this.XO && this.gameBoard[2][1] == this.XO && this.gameBoard[2][2] == this.XO)
        ||
        (this.gameBoard[0][0] == this.XO && this.gameBoard[1][0] == this.XO && this.gameBoard[2][0] == this.XO)
        ||
        (this.gameBoard[0][1] == this.XO && this.gameBoard[1][1] == this.XO && this.gameBoard[2][1] == this.XO)
        ||
        (this.gameBoard[0][2] == this.XO && this.gameBoard[1][2] == this.XO && this.gameBoard[2][2] == this.XO)
        ||
        (this.gameBoard[0][0] == this.XO && this.gameBoard[1][1] == this.XO && this.gameBoard[2][2] == this.XO)
        ||
        (this.gameBoard[2][0] == this.XO && this.gameBoard[1][1] == this.XO && this.gameBoard[0][2] == this.XO))
        {
            this.winMessage = (this.XO.toUpperCase() + " Wins!!");
            this.playerWon = true;
            this.setGameWon(true);
        }
        else
        {
            const allFilled = this.gameBoard.every(cell => cell.every((val) => val !== 'unmarked'));
            this.tieGame = allFilled;
        }
        this.swapXO();
      },
      resetGame() {
        this.playerWon = false;
        this.tieGame = false;
        this.gameBoard = [];
        this.setGameWon(false);
        this.initializeBoard();
        this.incrementGamesPlayed();
      }
    },
  }
  </script>
  
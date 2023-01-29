import { defineStore } from 'pinia'

export const useXOStore = defineStore('xOrO', {
    state: () => ({ XOFile: 'x.svg', XO: 'x', gamesPlayedCount: 0, gameWon: false }),
    actions: {
        swapXO() {
            if(this.XOFile === 'x.svg'){
                this.XOFile = 'o.svg';
                this.XO = 'o';
            }
            else { 
                this.XOFile = 'x.svg';
                this.XO = 'x';
            }
        },
        incrementGamesPlayed() {
            this.gamesPlayedCount ++;
        },
        setGameWon(won) {
            this.gameWon = won;
        }
    }
  })
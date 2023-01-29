<template>
    <div @click="addXorO()" class="tic-tac-cell">
    <img v-if="cellClicked" :src="require(`@/assets/${xOrOLocation}`)" class="xOrOSvg"/>
    <canvas v-if="!cellClicked" style="width: 50%" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useXOStore } from '../store/xOrOStore'

export default {
    name: 'BoardComponent',
    data() {
        return {
            xOrOFile: '',
            cellClicked: false
        };
    },
    computed: {
        ...mapState(useXOStore, ['XOFile', 'gamesPlayedCount', 'gameWon']),
        xOrOLocation(){
            return this.xOrOFile;
        }
    },
    methods: {
        ...mapActions(useXOStore, ['swapXO']),
        addXorO() {
            if(this.cellClicked || this.gameWon) return;
            this.xOrOFile = this.XOFile;
            this.cellClicked = true;
        }
    },
    watch: {
        gamesPlayedCount(newValue) {
            this.cellClicked = false;
            this.xOrOFile = '';
        }
    }
  }

</script>

<style>

.tic-tac-cell {
    width: 100%;
    height:
}

.xOrOSvg {
    width: 50%;
}

</style>
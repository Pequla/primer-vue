<template>
    <div class="search">
        <h3>Pretraga</h3>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text" id="desc">Destination:</span>
            <input type="text" class="form-control" placeholder="Unesite destinaciju" aria-describedby="desc" list="destOpt"
                v-model="tekst" @keypress="(e) => pronadjiLet()" @input="(e)=> autocomplete()" @change="(e)=>pronadjiLet()">
            <datalist id="destOpt">
                <option v-for="option in opcije" :value="option" @click="(e)=> console.log(option)"></option>
            </datalist>
            <button class="btn btn-outline-primary" @click="(e) => pronadjiLet()">Pronadji</button>
        </div>
        <table class="table table-striped" v-if="letovi">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">BROJ LETA</th>
                    <th scope="col">DESTINACIJA</th>
                    <th scope="col">MODEL AVIONA</th>
                    <th scope="col">VREME</th>
                    <th scope="col">AKCIJA</th>
                </tr>
            </thead>
            <tbody>
                <FlightTableRow v-for="flight in letovi.content" :flight="flight" />
            </tbody>
        </table>
    </div>
</template>

<script setup>
import FlightService from '@/services/flight.service';
import FlightTableRow from '@/components/FlightTableRow.vue';
import { ref } from 'vue';

const tekst = ref();
const letovi = ref();
const opcije = ref();

function pronadjiLet() {
    if (tekst && tekst.value != '') {
        FlightService.getAllFlightsForDestination(tekst.value).then(rsp => {
            letovi.value = rsp.data
        })
    }
}

function autocomplete() {
    FlightService.autocompleteDestinations(tekst.value).then(rsp => {
        if (tekst.value === rsp.data[0]) return // Ako je ukucana vrednost vec u ponudjenim, ne prikazuj je
        opcije.value = rsp.data
    })
}
</script>
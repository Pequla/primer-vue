<template>
    <div class="flight">
        <div v-if="flight && mapData && weather">
            <div class="row mt-3">
                <div class="col front-row">
                    <div class="card mx-auto">
                        <div class="card-body">
                            <h3 class="card-title">{{ mapData.items[0].title }}</h3>
                            Zakazno poletanje: <b>{{ new Date(flight.scheduledAt).toLocaleString('sr-RS') }}</b>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Broj leta: <b>{{ flight.flightKey }}</b></li>
                            <li class="list-group-item">Model aviona: <b>{{ flight.plane }}</b></li>
                            <li class="list-group-item">Izlazna kapija: <b>{{ flight.gate }}</b> Terminal: <b>{{
                                flight.terminal }}</b></li>
                            <li class="list-group-item">
                                Trenutna temperatura: <b>{{ toCelsious(weather.current.temp) }}&deg;C</b>
                            </li>
                            <li class="list-group-item">
                                Osecaj: <b>{{ toCelsious(weather.current.feels_like) }}&deg;C</b>
                            </li>
                            <li class="list-group-item">
                                Vlažnost vazduha: <b>{{ weather.current.humidity }}%</b>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col front-row">
                    <img :src="'https://img.pequla.com/destination/' + flight.destination.toLowerCase().split(' ')[0] + '.jpg'"
                        class="card-img-top">
                </div>
            </div>
            <div class="row mt-3">
                <iframe class="mx-auto" height="400"
                    :src="`https://www.google.com/maps?output=embed&q=${mapData.items[0].title}`" allowfullscreen=""
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade" id="gmaps"></iframe>
            </div>
        </div>
        <LoadingWidget v-else />
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import FlightService from '@/services/flight.service';
import WeatherService from '@/services/weather.service';
import LoadingWidget from '@/components/LoadingWidget.vue';

const route = useRoute();
const id = route.params.id

const flight = ref();
const mapData = ref();
const weather = ref()

FlightService.getFlightById(id)
    .then(rsp => {
        flight.value = rsp.data

        // Lokacija
        WeatherService.geocode(rsp.data.destination)
            .then(rsp => {
                mapData.value = rsp.data

                // Vremenska prognoza
                const pos = rsp.data.items[0].position
                WeatherService.getWeatherData(pos)
                    .then(rsp => {
                        weather.value = rsp.data
                    })
            })
    })

function toCelsious(k) {
    return Math.round(k - 273.15)
}
</script>

<style>
.row {
    display: flex;
}

.col {
    flex: 1;
}
</style>
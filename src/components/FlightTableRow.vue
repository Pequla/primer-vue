<template>
        <tr v-if="flight">
          <th scope="row">{{ flight.id }}</th>
          <td>{{ flight.flightNumber }}</td>
          <td>{{ flight.destination }}</td>
          <td>{{ flight.plane }}</td>
          <td>{{ new Date(flight.scheduledAt).toLocaleString('sr-RS') }}</td>
          <td>
            <button type="button" class="btn btn-outline-primary" @click="(e)=>showDetails(flight.id)">Detalji</button>
          </td>
        </tr>
</template>

<script setup>
import { defineProps } from 'vue';
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    flight: Object
});
const {flight} = toRefs(props);

const router = useRouter();
function showDetails(id) {
 router.push('/flight/'+id)
}

</script>
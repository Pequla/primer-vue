import axios from "axios";

const client = axios.create({
    baseURL: 'https://flight.pequla.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default {
    getAllFlights(page = 0, size = 30) {
        return client.get(`/flight?page=${page}&size=${size}&sort=scheduledAt,asc`)
    },
    getFlightById(id) {
        return client.get('/flight/' + id)
    }
}
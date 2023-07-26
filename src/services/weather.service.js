import axios from "axios";

const client = axios.create({
    baseURL: 'https://api.pequla.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default {
    geocode(dest) {
        return client.get('/here/geocode?q=' + dest.toLowerCase().split(' ')[0])
    },
    getWeatherData(pos) {
        return client.get('/weather?lat=' + pos.lat + '&lon=' + pos.lng)
    }
}
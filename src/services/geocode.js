/*
Reverse-geocoding service provided by OpenStreetMap - http://www.openstreetmap.org/copyright
*/
import { Utl } from "../common/utility.js";
import { DataHolder, ErrorHolder } from "../storage/holders.js";
import { DataStore } from "../storage/stores.js";


class GeocodeService {
    #payload;

    constructor(payload) {
        this.#payload = payload;
    }

    async process() {
        const data = this.#payload;
        if (!Utl.truthy(data)) return false;
        data.display_name = this.#checkStore(data) || await this.#reverseGeocode(data);
        return data;
    }

    #checkStore = data => DataStore.prevEvents[data.event_id] || false;

    async #reverseGeocode(data) {
        const url = `https://nominatim.openstreetmap.org/reverse?` +
            `lat=${data.latitude}&lon=${data.longitude}&format=json`;

        const options = {
            headers: {
                'user-agent': 'Webhook/1.0'
            }
        };

        const response = await fetch(url, options).catch(e => e);
        await Utl.waitSec(1);
        if (!this.#handleResponseErrors(response, data)) return null;

        const composeResponse = Utl.composeAsync(
            this.#getDisplayName,
            this.#validateJson,
            this.#validateBody,
        );

        const displayName = await composeResponse(response);
        return (DataStore.prevEvents = { id: data.event_id, name: displayName }).name;
    }

    #handleResponseErrors(response, data) {
        if (response.error) {
            ErrorHolder.geocode = { error: `Geocode Error: ${JSON.stringify(response.error)}` };
            return false;
        } else if (response.status != 200) {
            ErrorHolder.geocode = {
                error:
                    `Geocode Error for record_id ${data.record_id} / vehicle_vin ${data.vehicle_vin}: ` +
                    `status ${response.status}, ${response.statusText}, url ${response.url}`
            };
            return false;
        }
        return true;
    }

    #validateBody(response) {
        try {
            return response ? response.text() : null;
        } catch (error) {
            return ErrorHolder.geocode = error, null;
        }
    }

    #validateJson(data) {
        try {
            return Utl.truthy(data) ? JSON.parse(data) : null;
        } catch (error) {
            return ErrorHolder.geocode = `${error} || Data: ${data}`, null;
        }
    };

    #getDisplayName(obj) {
        try {
            return Utl.truthy(obj) ? obj.display_name : null;
        } catch (error) {
            return ErrorHolder.geocode = `${error} || Data: ${obj}`, null;
        }
    }
}

export { GeocodeService };

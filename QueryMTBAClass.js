'use strict';
const axios = require('axios');

module.exports = class QueryMTBA {
    /*
        types 0 & 1 include Subway/Metro and Tram/Streetcar/Light rail
        Filtering on fare_class="Rapid Transit" would also include *most* of the
        Silver Line -- but as that's not a valid filter, and the SL lines are
        typed as busses, leaving them out of the search querry for now
    */
    constructor(types=[0, 1]) {
        if (types instanceof Number) {
            types = [types];
        } else if ( !(types instanceof Array) ) {
            throw TypeError("This class takes only numbers and arrays for types\n" +
            "See 'route_type' in https://github.com/google/transit/blob/master/gtfs/spec/en/reference.md#routestxt" +
            " for acceptable ranges");
        }

        this.types = types;
        this.site = "https://api-v3.mbta.com";
        this.route = "routes";
        this.stops = "stops";

        this.stopCache = {};
        this.oldAge = 30000; // 30s timer vs Date.now()

        this.buildUrl = this.buildUrl.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
        this.getRouteStops = this.getRouteStops.bind(this);
    }

    getRoutes(callback) {
        var url = `${this.buildUrl(this.route)}?filter[type]=${this.types.join('\,')}`;

        axios.get(url)
            .then(res => {
                callback(res.data.data, null);
            })
            .catch(err => {
                if (err) {
                    console.log(`ROUTES ERROR!\n${url}\n`);
                }

                callback(null, err);
            })
    }

    getRouteStops(routeID, callback) {
        // simple cache to prevent 20 requests/minute overload for user
        // simpler implementation of what I saw reading up on Redis, sans Redis
        if (routeID in this.stopCache && this.stopCache[routeID] != null) {
            if (Date.now() - this.stopCache[routeID].timeStamp < this.oldAge) {
                // if cache is youthful, return remembered data
                // console.log(`Returning cached stops for ${routeID}`);
                return callback(this.stopCache[routeID].data, null);
            } else {
                // if it's aged out, remove cache
                // console.log(`Old cache for ${routeID}, removing`);
                this.stopCache[routeID] = null;
            }
        }/* else {
            console.log(`No cached stops for ${routeID}\n`);
        }*/

        var url = `${this.buildUrl(this.stops)}?filter[route]=${routeID}`;

        axios.get(url)
            .then(res => {
                this.stopCache[routeID] = {timeStamp: Date.now(), data: res.data.data};
                callback(res.data.data, null);
            })
            .catch(err => {
                if (err) {
                    console.log(`STOPS ERROR!\n${url}`);
                }

                callback(null, err);
            })
    }

    buildUrl(routeExtension) {
        return `${this.site}/${routeExtension}`;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }
}
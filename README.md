# MBTA-Routes-and-Stops
Small coding application to query routes &amp; their stops, from the [MBTA API](https://api-v3.mbta.com/)

---

## Running the Application

1. Download the files either as a zip & extract them, or via `git clone`.
2. Make sure you have `node` and `npm` properly installed on your machine.
   - Please note, I'm running this with `node v12.18.2` and `npm v6.14.5` on my local computer.
3. Navigate to the downloaded or cloned folder, and run `npm install`
4. You must build the files before launching:
   - `npm run build` will build the production version of this code.
   - `npm run dev` will build the development version, and will contain more `console.log` outputs as components load onto the page.
5. Launch via `npm start`.
   - Current functionality allows for filtering only MBTA transportation lines with "Line" present in their name.
      - This allows for formally typed and colloquially termed "Subways" to be the main focus of the screen, as of the time of this writing.
   - Note: addresses for each stop are as-given by the API, and may not link you directly to their Google Maps location upon clicking, though if present should be relatively close.

---

## The following was relevent to development, and found referencing the [V3 API Swagger documentation](https://api-v3.mbta.com/docs/swagger/index.html)

### [Routes](https://api-v3.mbta.com/docs/swagger/index.html#/Route/ApiWeb_RouteController_index)

- Line types are defined by `/data/{index}/attributes/type`
  - Corresponds to the [transit reference](https://github.com/google/transit/blob/master/gtfs/spec/en/reference.md#routestxt)
    - A route_type of `1` is a subway or metro, our target type
    - Green lines have a route_type of `0` and will be included as specified by our requirements examples
  - Routes can be filtered based on this type
    - ex: `/routes?filter[type]=1`
- Route ID's are in their top-level `"id"` field in the JSON
  - `Red`, `Orange`, `Green-B`, etc.

### [Stops](https://api-v3.mbta.com/docs/swagger/index.html#/Stop/ApiWeb_StopController_index)

- `Stops` have a relationship to their `Routes`
  - Stops can be filtered based on this relationship
    - ex: `/stops?filter[route]=Red`

---

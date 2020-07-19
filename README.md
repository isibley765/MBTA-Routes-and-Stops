# MBTA-Routes-and-Stops
Small coding application to query routes &amp; their stops, from the MBTA API: https://api-v3.mbta.com/

---

### The following was found referencing the [V3 API Swagger documentation](https://api-v3.mbta.com/docs/swagger/index.html)

### [Routes](https://api-v3.mbta.com/docs/swagger/index.html#/Route/ApiWeb_RouteController_index)

- Line types are defined by `/data/{index}/attributes/type`
  - Corresponds to the [transit reference](https://github.com/google/transit/blob/master/gtfs/spec/en/reference.md#routestxt)
    - A route_type of `1` is a subway or metro, our target type
  - Routes can be filtered based on this type
    - ex: `/routes?filter[type]=1`
- Route ID's are in their top-level `"id"` field in the JSON

### [Stops](https://api-v3.mbta.com/docs/swagger/index.html#/Stop/ApiWeb_StopController_index)

- `Stops` have a relationship to their `Routes`
  - Stops can be filtered based on this relationship
    - ex: `/stops?filter[route]=Red`

---

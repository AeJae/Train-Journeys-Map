// The most basic information about any item being POSTed to an API endpoint.
export interface BaseItem {
    // Possible values: "link"
    type: string
}

// Information related to a link being POSTed to an API endpoint.
export interface LinkOverAPI extends BaseItem {
    // Location A (e.g. "London Victoria")
    a: string,
    // Location B
    b: string
}

// Information related to a location edit being POSTed to an API endpoint.
export interface LocationEditOverAPI {
    // Possible values: "name", "latLong", "isStation".
    editType: string,
    // The new name. Must be included if editType is "name".
    newName?: string,
    // The new latitude. Must be included if editType is "latLong".
    newLat?: number,
    // The new longitude. Must be included if editType is "latLong".
    newLong?: number,
    // The new is_station value. Must be included if editType is "isStation".
    newIsStation?: boolean
}

// Information related to a location retrieved from the database.
export interface Location {
    // The location's name.
    name: string,
    // Whether the location is a station (true) or a waypoint (false).
    is_station: boolean,
    // The location's latitude, AFTER MODIFICATION to fit JS number precision limits.
    lat: number,
    // The location's longitude, AFTER MODIFICATION to fit JS number precision limits.
    long: number
}

// Parameters (props) for a LocationElem.
export interface LocationElemParams {
    // An object conforming to the Location interface.
    loc: Location,
    // A server action that will change the name.
    nameFunc: Function,
    // A server action that will change the latitude and longitude.
    latLongFunc: Function,
    // A server action that will swap the value of is_station.
    swapFunc: Function,
    // A server action that will delete the location.
    deleteFunc: Function,
}
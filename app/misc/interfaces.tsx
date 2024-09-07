// The most basic information about any item being POSTed to an API endpoint.
export interface BaseItem {
    type: string // Possible types: "link"
}

// Information related to a link being POSTed to an API endpoint.
export interface LinkOverAPI extends BaseItem {
    a: string,   // Location A (e.g. "London Victoria")
    b: string    // Location B
}

// Information related to a location retrieved from the database.
export interface Location {
    name: string,
    is_station: boolean,
    lat: number,
    long: number
}

// Parameters (props) for a LocationElem.
export interface LocationElemParams {
    loc: Location,
    nameFunc: Function,
    latLongFunc: Function,
    swapFunc: Function,
    deleteFunc: Function,
}
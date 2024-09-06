// The most basic information about any item being POSTed to an API endpoint.
export interface BaseItem {
    type: string // Possible types: "link"
}

// Information related to a link being POSTed to an API endpoint.
export interface LinkOverAPI extends BaseItem {
    a: string,   // Location A (e.g. "London Victoria")
    b: string    // Location B
}
export const database = `http://localhost:9000/`
export const users = database + "users"
export const scores = database + "scores"
export const states = database + "states"
export const places_api = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=golf+courses+in+`
export const key_ending = `&key=${process.env.REACT_APP_GP_API_K}`

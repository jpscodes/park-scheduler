import sendRequest from "./send-request";
const BASE_URL = '/api/parks';


export async function makeReservation(search) {
  console.log('made it to utilities')
  return sendRequest(`${BASE_URL}/?search=${search}`);
}

// export async function getPark(id) {
//   return sendRequest(`${BASE_URL}/${id}`)
// }
// export async function addParkToDB(data) {
//   return sendRequest(BASE_URL, 'POST', data);
// }

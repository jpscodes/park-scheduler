import sendRequest from "./send-request";
const BASE_URL = '/api/reservations';


export async function makeReservation(reservations) {
  console.log('made it to utilities')
  return sendRequest(`${BASE_URL}`, 'POST', reservations);
}

export async function searchReservations(search) {
  console.log('made it to utilities')
  return sendRequest(`${BASE_URL}/?search=${search}`);
}




// export async function getPark(id) {
//   return sendRequest(`${BASE_URL}/${id}`)
// }
// export async function addParkToDB(data) {
//   return sendRequest(BASE_URL, 'POST', data);
// }

import axios from 'axios';
import { BASE_URL } from './consts';

export default function API() {
  // GET function
  async function GET(endpoint, params, header) {
    const res = await axios
      .get(`${BASE_URL}/${endpoint}`, {
        params: params,
        headers: header
      })
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
    // console.log(res);
    return res;
  }

  // POST function
  async function POST(endpoint, body, header) {
    const res = await axios.post(`${BASE_URL}${endpoint}`, body, {
      headers: header
    });
    // console.log(res);
    return res;
  }

  // PUT function
  async function PUT(endpoint, body, header) {
    const res = await axios.put(`${BASE_URL}/${endpoint}`, body, {
      headers: header,

    });
    // console.log(res);
    return res;
  }

  // DELETE function
  async function DEL(endpoint, params, header) {
    const res = await axios.delete(`${BASE_URL}/${endpoint}`, {
      data: params,
      headers: header,
      
    });

    // console.log(res);
    return res;
  }

  return {
    GET,
    POST,
    PUT,
    DEL
  };
}

import axios from "axios/index";

const cartApi = {
  async get(sessionId) {
    console.log(process.env.REACT_APP_BUSINESS_ID);
    return await axios.get('/api/cart/' + sessionId + '/' + process.env.REACT_APP_BUSINESS_ID);
  },

  async put(sessionId, cart) {
    return await axios.put('/api/cart/' + sessionId+ '/' + process.env.REACT_APP_BUSINESS_ID, { productList: cart })
  }
}

export default cartApi
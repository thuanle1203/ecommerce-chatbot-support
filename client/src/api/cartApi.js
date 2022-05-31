import axios from "axios/index";

const cartApi = {
  async get(sessionId) {
    return await axios.get('/api/cart/' + sessionId);
  },

  async put(sessionId, cart) {
    return await axios.put('/api/cart/' + sessionId, { productList: cart })
  }
}

export default cartApi
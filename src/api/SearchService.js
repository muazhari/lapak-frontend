import Axios from "axios";

class SearchService {
  apiURL = process.env.REACT_APP_API_URL;

  getAllItem() {
    return Axios.get(`${this.apiURL}/items`);
  }

  getAllItemWithUsername() {
    return Axios.get(`${this.apiURL}/items/with/username`);
  }

  getItemById(itemId) {
    return Axios.get(`${this.apiURL}/items/${itemId}`);
  }
}

export default new SearchService();

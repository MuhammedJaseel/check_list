import axios from "axios";

export class ListServices {
  async getAll() {
    return await axios.get(
      "https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all"
    );
  }

  async create(body: any) {
    return await axios.post(
      "https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all",
      body
    );
  }
  async update(id: number, body: any) {
    return await axios.put(
      `https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all/${id}`,
      body
    );
  }
  async delete(id: number) {
    return await axios.delete(
      `https://66e59ca45cc7f9b6273ddad8.mockapi.io/list/all/${id}`
    );
  }
}

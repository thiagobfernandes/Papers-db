import axios from "axios";
import { PapersDTO } from "./dto/papers.dto";

export async function createPapersHttp(
  data: FormData,
  token?: string
): Promise<PapersDTO> {
  const response = await axios.post("/api/papers", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", 
    },
  });

  return response.data;
}
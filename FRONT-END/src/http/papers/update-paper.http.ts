import axios from "axios";
import { PapersDTO, UpdatePaperDTO } from "./dto/papers.dto";

export async function updatePaperHttp(
  id: number,
  data: UpdatePaperDTO,
  token?: string
): Promise<PapersDTO> {
  const response = await axios.put(`/api/papers/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

import axios from "axios";

export async function deletePaperHttp(
  id: number,
  token?: string
): Promise<void> {
  await axios.delete(`/api/papers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

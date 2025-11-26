import axios from "axios";
import { UpdateUserDTO } from "./dto/user.dto";

interface UpdateUserProps {
  data: UpdateUserDTO;
  userId: number | null;
  token: string | null;
}

export async function updateUserHttp({ data, userId, token }: UpdateUserProps) {
   
  return axios.put(`/api/user/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

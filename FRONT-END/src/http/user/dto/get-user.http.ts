import axios from "axios";
import { UserDTO } from "./user.dto";

interface GetUserProps {
  userId: number | null;
}

interface GetUserResponse {
  message: string;
  status: number;
  content: UserDTO;
}

export async function getUserHttp({ userId }: GetUserProps): Promise<UserDTO> {
  const response = await axios.get<GetUserResponse>(
    `/api/user/${userId}`, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    }
  );
  return response.data.content;
}
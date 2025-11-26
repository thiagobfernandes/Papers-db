import axios from "axios";
import { CreateUserDTO, UserDTO } from "./dto/user.dto";

export async function createUserHttp(data: CreateUserDTO): Promise<UserDTO> {
  const response = await axios.post(
    "/api/user/register",
    data
  );

  return response.data;
}

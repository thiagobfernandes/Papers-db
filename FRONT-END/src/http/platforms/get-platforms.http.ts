import axios from "axios";
import { PlatformDTO } from "./dto/platforms.dto";
import { useAuth } from "../../lib/auth-context";

interface GetPlatformsResponse {
  message: string;
  status: number;
  content: {
    page: number;
    pageSize: number;
    total: number;
    platforms: PlatformDTO[];
  };
}


export function useGetPlatforms() {
  const { token } = useAuth();

  const getPlatforms = async (): Promise<PlatformDTO[]> => {
    const response = await axios.get<GetPlatformsResponse>(
      "/api/platforms",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.content.platforms;
  };

  return { getPlatforms };
}

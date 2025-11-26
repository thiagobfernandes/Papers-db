
import { PlatformDTO } from "../../platforms/dto/platforms.dto";
import { UserDTO } from "../../user/dto/user.dto";

export interface PapersDTO {
  documentPath?: string;
  id: number;
  title: string;
  language: string;
  platform: PlatformDTO;
  user: UserDTO;
  platformId: number;
  userId: number;
  createdAt: Date;
}



export interface UpdatePaperDTO {
  title?: string;
  language?: string;
  platformId?: number;
}

import axios from "axios";
import { PapersDTO } from "./dto/papers.dto";

export interface PapersResponse {
  papers: PapersDTO[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getPapersUserHttp(
  page = 1,
  pageSize = 10,
  token?: string,
  userId?: number | null
): Promise<PapersResponse> {
  const response = await axios.get(
    `/api/papers?filter[userId]=${userId}`,
    {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { content } = response.data;

  return {
    papers: content.papers,
    total: content.total,
    page: content.page,
    pageSize: content.pageSize,
  };
}

export async function getPapersUserHttpByIsAdmin(
  page = 1,
  pageSize = 10,
  token?: string,
  userId?: number | null
): Promise<PapersResponse> {
  const response = await axios.get(
    `/api/papers/adm?filter[userId]=${userId}`,
    {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { content } = response.data;

  return {
    papers: content.papers,
    total: content.total,
    page: content.page,
    pageSize: content.pageSize,
  };
}

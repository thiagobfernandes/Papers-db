import { Op } from "sequelize";
import { FindPapersPaginationRepositoryProtocol, FindPapersPaginationRepositoryProtocolInterface } from "../../domain/repositories/find-papers-pagination";
import PapersEntity from "../entities/papers-entity";
import { Papers } from "../../domain/entities/papers";
import { Logger } from "../../../../shared/helpers/logger";


export class FindPapersPaginationRepository implements FindPapersPaginationRepositoryProtocolInterface {


    async execute(params: FindPapersPaginationRepositoryProtocol.Params): Promise<FindPapersPaginationRepositoryProtocol.Response> {
        const page = Number(params.page) || 1;
        const pageSize = Number(params.pageSize) || 10
        Logger.info(`FindPapersPaginationRepository: Executing with page: ${page}, pageSize: ${pageSize}`);
        const pappers = await PapersEntity.findAndCountAll({
            where: params.isAdmin ? {} :this.buildSearchConditions(params.search || {}, params.filter || {}),
            limit: pageSize,
            offset: this.offset(page, pageSize),
            order: this.buildOrder(params.order || {}),
            include: ["user"],
        });
        Logger.info(`FindPapersPaginationRepository: Retrieved ${pappers.count} papers from database and papers rows: ${pappers.rows ? pappers.rows.length : []}`);
        return {
            total: pappers.count ?? 0,
            page,
            pageSize,
            papers: pappers.rows.length > 0 ? pappers.rows.map(value => Papers.fromEntity(value)) : [],
        }

    }


    private buildSearchConditions(
        search: Record<string, string>,
        filter: Record<string, string>
    ) {
        const searchConditions = Object.entries(search)
            .filter(([, value]) => value)
            .map(([key, value]) => ({ [key]: { [Op.like]: `%${value}%` } }));

        const filterConditions = Object.entries(filter)
            .filter(([, value]) => value)
            .map(([key, value]) => ({ [key]: value }));

        const conditions = [];

        if (searchConditions.length) conditions.push({ [Op.or]: searchConditions });
        if (filterConditions.length) conditions.push(...filterConditions);

        return conditions.length ? { [Op.or]: conditions } : {};
    }

    private buildOrder(order: Record<string, string>): [string, string][] {
        return Object.entries(order)
            .filter(([, direction]) => direction === "ASC" || direction === "DESC")
            .map(([key, direction]) => [key, direction]);
    }

    private offset(page: number, pageSize: number): number {
        return (page - 1) * pageSize;
    }

}
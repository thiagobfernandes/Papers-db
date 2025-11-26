import { Op } from "sequelize";
import { FindPlatformPaginationRepositoryProtocol, FindPlatformPaginationRepositoryProtocolInterface } from "../../domain/repositories/find-platform-pagination";
import PlatformEntity from "../entities/platform-entity";
import { Platform } from "../../domain/entities/platform";
import { Logger } from "../../../../shared/helpers/logger";


export class FindPlatformPaginationRepository implements FindPlatformPaginationRepositoryProtocolInterface {


    async execute(params: FindPlatformPaginationRepositoryProtocol.Params): Promise<FindPlatformPaginationRepositoryProtocol.Response> {
        const page = Number(params.page) || 1;
        const pageSize = Number(params.pageSize) || 10
        Logger.info(`FindPlatformPaginationRepository: Executing with page: ${page}, pageSize: ${pageSize}`);
        const platforms = await PlatformEntity.findAndCountAll({
            where: this.buildSearchConditions(params.search || {}, params.filter || {}),
            limit: pageSize,
            offset: this.offset(page, pageSize),
            order: this.buildOrder(params.order || {}),
        });
        Logger.info(`FindPlatformPaginationRepository: Retrieved ${platforms.count} platforms from database and platforms rows: ${platforms.rows ? platforms.rows.length : []}`);
        return {
            total: platforms.count ?? 0,
            page,
            pageSize,
            platforms: platforms.rows.length > 0 ? platforms.rows.map(value => Platform.fromEntity(value)) : [],
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
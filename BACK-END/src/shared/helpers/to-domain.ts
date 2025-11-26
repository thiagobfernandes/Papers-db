


export function toDomain<T extends Object, K extends Object>(domain: T, values: K): T {
    return Object.assign({} as T, domain, values);
}
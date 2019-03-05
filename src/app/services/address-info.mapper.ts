import { AddressInfoStateModel } from '../dapp-store/address-info.state.model';

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export namespace AddressInfoMapper {
    export function toAddressInfoStateModel(json: string): AddressInfoStateModel {
      return cast(JSON.parse(json), r('AddressInfoStateModel'));
    }

    export function addressInfoStateModelToJson(value: AddressInfoStateModel): string {
        return JSON.stringify(uncast(value, r('AddressInfoStateModel')), null, 2);
    }

    function invalidValue(typ: any, val: any): never {
        throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
    }

    function jsonToJSProps(typ: any): any {
        if (typ.jsonToJS === undefined) {
            const map: any = {};
            typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
            typ.jsonToJS = map;
        }
        return typ.jsonToJS;
    }

    function jsToJSONProps(typ: any): any {
        if (typ.jsToJSON === undefined) {
            const map: any = {};
            typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
            typ.jsToJSON = map;
        }
        return typ.jsToJSON;
    }

    // tslint:disable:no-shadowed-variable
    function transform(val: any, typ: any, getProps: any): any {
        function transformPrimitive(typ: string, val: any): any {
            if (typeof typ === typeof val) { return val; }
            return invalidValue(typ, val);
        }

        function transformUnion(typs: any[], val: any): any {
            // val must validate against one typ in typs
            const l = typs.length;
            for (let i = 0; i < l; i++) {
                const typ = typs[i];
                try {
                    return transform(val, typ, getProps);
                } catch (_) {}
            }
            return invalidValue(typs, val);
        }

        function transformEnum(cases: string[], val: any): any {
            if (cases.indexOf(val) !== -1) { return val; }
            return invalidValue(cases, val);
        }

        function transformArray(typ: any, val: any): any {
            // val must be an array with no invalid elements
            if (!Array.isArray(val)) { return invalidValue('array', val); }
            return val.map(el => transform(el, typ, getProps));
        }

        function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
            if (val === null || typeof val !== 'object' || Array.isArray(val)) {
                return invalidValue('object', val);
            }
            const result: any = {};
            Object.getOwnPropertyNames(props).forEach(key => {
                const prop = props[key];
                const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
                result[prop.key] = transform(v, prop.typ, getProps);
            });
            Object.getOwnPropertyNames(val).forEach(key => {
                if (!Object.prototype.hasOwnProperty.call(props, key)) {
                    result[key] = transform(val[key], additional, getProps);
                }
            });
            return result;
        }

        if (typ === 'any') { return val; }
        if (typ === null) {
            if (val === null) { return val; }
            return invalidValue(typ, val);
        }
        if (typ === false) { return invalidValue(typ, val); }
        while (typeof typ === 'object' && typ.ref !== undefined) {
            typ = typeMap[typ.ref];
        }
        if (Array.isArray(typ)) { return transformEnum(typ, val); }
        if (typeof typ === 'object') {
            return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
                : typ.hasOwnProperty('arrayItems')    ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty('props')         ? transformObject(getProps(typ), typ.additional, val)
                : invalidValue(typ, val);
        }
        return transformPrimitive(typ, val);
    }

    function cast<T>(val: any, typ: any): T {
        return transform(val, typ, jsonToJSProps);
    }

    function uncast<T>(val: T, typ: any): any {
        return transform(val, typ, jsToJSONProps);
    }

    function a(typ: any) {
        return { arrayItems: typ };
    }

    function u(...typs: any[]) {
        return { unionMembers: typs };
    }

    function o(props: any[], additional: any) {
        return { props, additional };
    }

    function m(additional: any) {
        return { props: [], additional };
    }

    function r(name: string) {
        return { ref: name };
    }

    const typeMap: any = {
        'TokenStateModel': o([
            { json: 'address', js: 'address', typ: u(undefined, '') },
            { json: 'ETH', js: 'ETH', typ: u(undefined, r('Eth')) },
            { json: 'countTxs', js: 'countTxs', typ: u(undefined, 0) },
            { json: 'contractInfo', js: 'contractInfo', typ: u(undefined, r('ContractInfo')) },
            { json: 'tokenInfo', js: 'tokenInfo', typ: u(undefined, r('TokenStateModelTokenInfo')) },
            { json: 'tokens', js: 'tokens', typ: u(undefined, a(r('Token'))) },
        ], false),
        'Eth': o([
            { json: 'balance', js: 'balance', typ: u(undefined, 3.14) },
        ], false),
        'ContractInfo': o([
            { json: 'creatorAddress', js: 'creatorAddress', typ: u(undefined, '') },
            { json: 'transactionHash', js: 'transactionHash', typ: u(undefined, '') },
            { json: 'timestamp', js: 'timestamp', typ: u(undefined, 0) },
        ], false),
        'TokenStateModelTokenInfo': o([
            { json: 'address', js: 'address', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'decimals', js: 'decimals', typ: u(undefined, '') },
            { json: 'symbol', js: 'symbol', typ: u(undefined, '') },
            { json: 'totalSupply', js: 'totalSupply', typ: u(undefined, '') },
            { json: 'owner', js: 'owner', typ: u(undefined, '') },
            { json: 'lastUpdated', js: 'lastUpdated', typ: u(undefined, 0) },
            { json: 'issuancesCount', js: 'issuancesCount', typ: u(undefined, 0) },
            { json: 'holdersCount', js: 'holdersCount', typ: u(undefined, 0) },
            { json: 'ethTransfersCount', js: 'ethTransfersCount', typ: u(undefined, 0) },
            { json: 'price', js: 'price', typ: u(undefined, r('PriceClass')) },
        ], false),
        'PriceClass': o([
            { json: 'rate', js: 'rate', typ: u(undefined, '') },
            { json: 'diff', js: 'diff', typ: u(undefined, 3.14) },
            { json: 'diff7d', js: 'diff7d', typ: u(undefined, 3.14) },
            { json: 'ts', js: 'ts', typ: u(undefined, '') },
            { json: 'marketCapUsd', js: 'marketCapUsd', typ: u(undefined, u(null, '')) },
            { json: 'availableSupply', js: 'availableSupply', typ: u(undefined, u(null, '')) },
            { json: 'volume24h', js: 'volume24h', typ: u(undefined, u(null, '')) },
            { json: 'diff30d', js: 'diff30d', typ: u(undefined, 3.14) },
            { json: 'currency', js: 'currency', typ: u(undefined, r('Currency')) },
        ], false),
        'Token': o([
            { json: 'tokenInfo', js: 'tokenInfo', typ: u(undefined, r('TokenTokenInfo')) },
            { json: 'balance', js: 'balance', typ: u(undefined, 3.14) },
            { json: 'totalIn', js: 'totalIn', typ: u(undefined, 0) },
            { json: 'totalOut', js: 'totalOut', typ: u(undefined, 0) },
        ], false),
        'TokenTokenInfo': o([
            { json: 'address', js: 'address', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'decimals', js: 'decimals', typ: u(undefined, '') },
            { json: 'symbol', js: 'symbol', typ: u(undefined, '') },
            { json: 'totalSupply', js: 'totalSupply', typ: u(undefined, '') },
            { json: 'owner', js: 'owner', typ: u(undefined, '') },
            { json: 'lastUpdated', js: 'lastUpdated', typ: u(undefined, 0) },
            { json: 'issuancesCount', js: 'issuancesCount', typ: u(undefined, 0) },
            { json: 'holdersCount', js: 'holdersCount', typ: u(undefined, 0) },
            { json: 'ethTransfersCount', js: 'ethTransfersCount', typ: u(undefined, 0) },
            { json: 'price', js: 'price', typ: u(undefined, u(true, r('PriceClass'))) },
            { json: 'website', js: 'website', typ: u(undefined, '') },
            { json: 'image', js: 'image', typ: u(undefined, '') },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'facebook', js: 'facebook', typ: u(undefined, '') },
            { json: 'twitter', js: 'twitter', typ: u(undefined, '') },
            { json: 'reddit', js: 'reddit', typ: u(undefined, '') },
        ], false),
        'Currency': [
            'USD',
        ],
    };
}

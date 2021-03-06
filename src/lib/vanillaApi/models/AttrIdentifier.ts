// tslint:disable
/**
 * Vanilla API
 * This API helps calculate gear effectiveness
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * 
 * @export
 * @enum {string}
 */
export enum AttrIdentifier {
    SpellHit = 'SpellHit',
    SpellCrit = 'SpellCrit',
    Arcane = 'Arcane',
    Fire = 'Fire',
    Frost = 'Frost',
    Holy = 'Holy',
    Nature = 'Nature',
    Shadow = 'Shadow'
}

export function AttrIdentifierFromJSON(json: any): AttrIdentifier {
    return json as AttrIdentifier;
}

export function AttrIdentifierToJSON(value?: AttrIdentifier): any {
    return value as any;
}


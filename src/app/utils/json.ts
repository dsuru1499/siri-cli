import { Xml } from './xml';

declare var document: any;
declare var DOMParser: any;
declare var Node: any;

export class Json {

    public static PREFIX_MATCH = new RegExp('(?!xmlns)^.*:');
    public static NAMESPACE_MATCH = new RegExp('^xmlns:*');

    public static toJson(xml: any): any {
        let result = {};

        // element
        if (xml.nodeType === 1) {

            // attributes
            if (xml.attributes.length > 0) {
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    if (Json.NAMESPACE_MATCH
                        .test(attribute.nodeName)) {
                        continue;
                    }

                    const nodeName = attribute.nodeName
                        .replace(
                            Json.PREFIX_MATCH,
                            '');
                    result[nodeName] = attribute.nodeValue;
                }
            }

            // text
        } else if (xml.nodeType === 3) {
            result = this.convert(xml.nodeValue);
        }

        // childrens
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName.replace(
                    Json.PREFIX_MATCH, '');

                if (item.nodeType === 3) {
                    result = this
                        .convert(item.nodeValue);
                } else {
                    if (typeof (result[nodeName]) === 'undefined') {
                        const value = this
                            .toJson(item);
                        result[nodeName] = value;
                    } else {
                        if (typeof (result[nodeName].push) === 'undefined') {
                            const old = result[nodeName];
                            result[nodeName] = [];
                            result[nodeName].push(old);
                        }
                        const value = this.toJson(item);
                        result[nodeName].push(value);
                    }
                }
            }
        }
        return result;
    }

    private static convert(text) {
        if (/^\s*$/.test(text)) {
            return null;
        }
        if (/^(?:true|false)$/i.test(text)) {
            return text.toLowerCase() === 'true';
        }
        // if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
        //     .test(text)) {
        //     var value = Date.parse(text);
        //     return value;
        // }
        if (isFinite(text)) {
            return parseFloat(text);
        }
        return text;
    }
}

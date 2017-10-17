import * as xmldom from 'xmldom';

export class Xml {

    public static SOAP_NAMESPACE_URI = 'http://schemas.xmlsoap.org/soap/envelope/';
    public static XSD_NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';
    public static XSI_NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema-instance';
    public static SIRI_NAMESPACE_URI = 'http://www.siri.org.uk/siri';
    public static ACSB_NAMESPACE_URI = 'http://www.ifopt.org.uk/acsb';
    public static IFOPT_NAMESPACE_URI = 'http://www.ifopt.org.uk/ifopt';
    public static DATEX_NAMESPACE_URI = 'http://datex2.eu/schema/2_0RC1/2_0';
    public static TNS_NAMESPACE_URI = 'http://wsdl.siri.org.uk';

    public static createElement(parent, name, value?, attributes?) {
        let document = parent.ownerDocument;
        let result = document.createElement(name);
        parent.appendChild(result);
        if (value) {
            let text = document.createTextNode(value);
            result.appendChild(text);
        }
        if (attributes) {
            for (let key in attributes) {
                result.setAttribute(key, attributes[key]);
            }
        }
        return result;
    }

    public static createSoapDocument() {
        let result = Xml.createDocument(Xml.SOAP_NAMESPACE_URI, 'soap:Envelope');
        let element = result.documentElement;
        element.setAttribute("xmlns:xsd", Xml.XSD_NAMESPACE_URI);
        element.setAttribute("xmlns:xsi", Xml.XSI_NAMESPACE_URI);
        return result;
    }

    public static createDocument(namespaceUri?, qualifiedName?) {
        let result = new xmldom.DOMImplementation().createDocument(namespaceUri || "", qualifiedName || "", null);
        let pi = result.createProcessingInstruction('xml', 'version="1.0"');
        result.insertBefore(pi, result.firstChild);
        return result;
    }

    public static fromString(text: string): any {
        let parser = new xmldom.DOMParser();
        let result = parser.parseFromString(text, 'text/xml');
        return result;
    }

    public static toString(doc: any): any {
        let serializer = new xmldom.XMLSerializer();
        return serializer.serializeToString(doc);
    }
}

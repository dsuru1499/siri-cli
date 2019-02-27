
export class Constant {

    public static HOST :string = '127.0.0.1';
    public static PORT :string = '8080';
    public static PATH :string = '/siri';
    public static VERSION :string = '2.0:FR-IDF-2.4';
    public static REQUESTOR_REF :string = 'default:default';

    public static URL :string = Constant.PATH
    + '?version=' + Constant.VERSION
    + '&requestorRef=' + Constant.REQUESTOR_REF;

    public static TIME_PATTERN = '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';
}
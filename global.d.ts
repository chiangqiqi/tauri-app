interface ResponseJson {
    success: boolean,
    code: number,
    data: object | null,
    msg: string,
}
interface ResDataType {
    success: (data:object) => ResponseJson;
    successInfo: (code:number,msg:string,data?:object|null) => ResponseJson;
    failed:  (code:number,msg:string,data?:object|null) => ResponseJson;
}
declare var ResData: ResDataType;

declare var wx: any;


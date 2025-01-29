declare module 'multer' {
    import { Request } from "express";

    interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
    }

    interface Multer {
        single(fieldname: string): any;
        array(fieldname: string, maxCount?: number): any;
        fields(fields: { name: string; maxCount?: number }[]): any;
        any(): any;
    }

    function multer(options?: any): Multer;
    export = multer;
}

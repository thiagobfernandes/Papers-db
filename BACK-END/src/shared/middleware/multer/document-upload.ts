import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import { Logger } from '../../helpers/logger';
import { badRequest } from '../../http/protocols';
import crypto from "crypto";

const MIME_TYPES = {
    // Documentos
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'text/plain': 'txt',

    'text/x-python': 'py',
    'application/x-python-code': 'py',

    'application/javascript': 'js',
    'text/javascript': 'js',

    'application/x-typescript': 'ts',
    'text/x-typescript': 'ts',

    'text/x-c': 'c',
    'text/x-csrc': 'c',

    'text/x-c++': 'cpp',
    'text/x-cppsrc': 'cpp',
    'application/x-cplusplus': 'cpp',

    'application/json': 'json',

    'text/html': 'html',

    'text/css': 'css'
};


const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback) => {
        callback(null, 'upload');
    },
    filename: (req: Request, file: Express.Multer.File, callback) => {
        const userId = (req as any).user?.id || 'unknown';

        const originalName = path.parse(file.originalname).name;
        const sanitized = originalName.replace(/\s+/g, '_');

        const hash = crypto.createHash("md5").update(sanitized + Date.now()).digest("hex").slice(0, 6);

        const extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES];

        const filename = `${sanitized}-${hash}.${extension}`;
        callback(null, filename);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    if (MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES]) {
        callback(null, true);
    } else {
        Logger.error(`Multer: Tipo de arquivo não suportado: ${file.mimetype}`);
        callback(new Error('Tipo de arquivo não suportado. Apenas PDF, DOCX, DOC e TXT são permitidos.'));
    }
};


const documentUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).single('document');


export const documentUploadMiddleware = (req: Request, res: any, next: any) => {
    documentUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json(badRequest({ message: 'O arquivo é muito grande. O tamanho máximo permitido é 5MB.', messageDev: err.message, method: "documentUploadMiddleware" }));
            }
            return res.status(400).json(badRequest({ message: `Erro no upload: ${err.message}`, messageDev: err.message, method: "documentUploadMiddleware" }));
        } else if (err) {

            return res.status(400).json(badRequest({ message: err.message, messageDev: err.message, method: "documentUploadMiddleware" }));
        }
        next();
    });
};

import { User as SupabaseUser } from '@supabase/supabase-js';
import { Multer } from 'multer';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      full_name: string;
      user_type: 'job_seeker' | 'employer' | 'hr_agency' | 'content_creator' | 'admin';
    }

    namespace Multer {
      interface File {
        /** Field name specified in the form */
        fieldname: string;
        /** Name of the file on the user's computer */
        originalname: string;
        /** Encoding type of the file */
        encoding: string;
        /** Mime type of the file */
        mimetype: string;
        /** Size of the file in bytes */
        size: number;
        /** The folder to which the file has been saved (DiskStorage) */
        destination?: string;
        /** The name of the file within the destination (DiskStorage) */
        filename?: string;
        /** Location of the uploaded file (DiskStorage) */
        path?: string;
        /** A Buffer of the entire file (MemoryStorage) */
        buffer?: Buffer;
      }
    }

    interface Request {
      user?: User;
      file?: Multer.File;
      files?: {
        [fieldname: string]: Multer.File[];
      } | Multer.File[];
      requestTime?: string;
      [key: string]: any; // Allow additional properties
    }
  }
}

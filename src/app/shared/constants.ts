import { environment } from "../../environments/environment.prod";


const news = environment.news;

export const API_NEWS_EXTERNAL = news + '/api/custom/external/news';
export const API_NEWS_INTERNAL = news + '/api/custom/internal/news';
export const API_FILE_UPLOAD = news + '/api/custom/internal/upload';
export const API_FILE_DELETE = news + '/api/custom/internal/delete-file';
export const API_FILE_DOWNLOAD = news + '/api/custom/external/download?filename=';

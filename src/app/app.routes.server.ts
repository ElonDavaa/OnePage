import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender   // Home page
  },
  {
    path: 'login',
    renderMode: RenderMode.Client      // Auth flow тул client дээрээ
  },
  {
    path: 'login/callback',
    renderMode: RenderMode.Client      // Auth redirect тул client дээрээ
  },
  {
    path: 'news',
    renderMode: RenderMode.Prerender   // Мэдээний жагсаалт
  },
  {
    path: 'news/:id',
    renderMode: RenderMode.Client,
        // getPrerenderParams: async () => {
        //   // Жишээ нь серверээс id жагсаалт авах
        //   const ids = [1009, 6001, 6002, 6003]; 
        //   return ids.map(id => ({ id: id.toString() }));
        // }
  }
];
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://rtbnetworkbd.com',
            lastModified: new Date(),
        },
    ];
}

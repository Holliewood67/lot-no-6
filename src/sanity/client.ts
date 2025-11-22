import { createClient } from "next-sanity";

export const client = createClient({
    projectId: 'hio9dz4h',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    
})
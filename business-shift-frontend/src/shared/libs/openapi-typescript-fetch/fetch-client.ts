import { Fetcher } from 'openapi-typescript-fetch';
// import { interceptor } from './interceptor';
import type { paths } from '../../types/api/generated';

export const fetchClient = Fetcher.for<paths>();

export type APIClientEndpoint = keyof paths;

fetchClient.configure({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API,
//   use: [interceptor],
});

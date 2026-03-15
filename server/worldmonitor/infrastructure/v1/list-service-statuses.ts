/**
 * ListServiceStatuses RPC -- reads seeded service status data from Railway seed cache.
 * All external status page checks happen in seed-service-statuses.mjs on Railway.
 */

import type {
  ServerContext,
  ListServiceStatusesRequest,
  ListServiceStatusesResponse,
  ServiceStatus,
} from '../../../../src/generated/server/worldmonitor/infrastructure/v1/service_server';

import { getCachedJson } from '../../../_shared/redis';

const SEED_CACHE_KEY = 'infra:service-statuses:v1';

const STATUS_ORDER: Record<string, number> = {
  SERVICE_OPERATIONAL_STATUS_MAJOR_OUTAGE: 0,
  SERVICE_OPERATIONAL_STATUS_PARTIAL_OUTAGE: 1,
  SERVICE_OPERATIONAL_STATUS_DEGRADED: 2,
  SERVICE_OPERATIONAL_STATUS_MAINTENANCE: 3,
  SERVICE_OPERATIONAL_STATUS_UNSPECIFIED: 4,
  SERVICE_OPERATIONAL_STATUS_OPERATIONAL: 5,
};

function filterAndSortStatuses(statuses: ServiceStatus[], req: ListServiceStatusesRequest): ServiceStatus[] {
  let filtered = statuses;
  if (req.status && req.status !== 'SERVICE_OPERATIONAL_STATUS_UNSPECIFIED') {
    filtered = statuses.filter((s) => s.status === req.status);
  }
  return [...filtered].sort((a, b) => (STATUS_ORDER[a.status] ?? 4) - (STATUS_ORDER[b.status] ?? 4));
}

export async function listServiceStatuses(
  _ctx: ServerContext,
  req: ListServiceStatusesRequest,
): Promise<ListServiceStatusesResponse> {
  try {
    const results = await getCachedJson(SEED_CACHE_KEY, true) as ServiceStatus[] | null;
    return { statuses: filterAndSortStatuses(results || [], req) };
  } catch {
    return { statuses: [] };
  }
}

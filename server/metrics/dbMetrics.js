import { databaseQueriesCounter } from "./metrics.js";

// ============================================================
// Database Query Counter
// ============================================================

export const recordDatabaseQuery = () => {
  databaseQueriesCounter.inc();
};

// ============================================================
// Multiple Database Queries
// ============================================================

export const recordDatabaseQueries = (count = 1) => {
  databaseQueriesCounter.inc(count);
};
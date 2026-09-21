'use strict';

const MAX_SOURCES = 4;
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const FIELD_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T/;

function fail(message) { throw new Error(message); }
function own(record, key) { return Object.prototype.hasOwnProperty.call(record, key); }
function text(value) { return value === undefined || value === null ? '' : String(value).trim(); }

function parseDateOnly(value) {
  if (!DATE_PATTERN.test(value)) fail('Date must use YYYY-MM-DD.');
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) fail('Date is not a real calendar date.');
  return date;
}

function isoDate(value, field) {
  if (typeof value !== 'string' || !ISO_PATTERN.test(value)) fail(`${field} must be an ISO date-time.`);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) fail(`${field} must be an ISO date-time.`);
  return date;
}

function resourceId(value, field) {
  const result = text(value);
  if (!ID_PATTERN.test(result)) fail(`${field} is not a safe resource ID.`);
  return result;
}

function safeUrl(raw, pageUrl) {
  if (typeof raw !== 'string' || !raw || raw.length > 2048) fail('REST endpoint is empty or too long.');
  const page = new URL(pageUrl);
  const url = new URL(raw, page.origin);
  if (url.protocol !== 'https:' || url.host !== page.host || !url.pathname.includes('/_api/')) fail('REST endpoint must be an HTTPS same-tenant SharePoint REST URL.');
  if (url.username || url.password || url.pathname.includes('..')) fail('REST endpoint contains unsafe URL parts.');
  return url.toString();
}

function validField(value, field) {
  if (typeof value !== 'string' || !FIELD_PATTERN.test(value)) fail(`${field} is not a safe field name.`);
  return value;
}

function validClock(value, field) {
  if (typeof value !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) fail(`${field} must use HH:mm.`);
  return value;
}

function validateConfig(config, pageUrl) {
  if (!config || typeof config !== 'object') fail('Planner config must be an object.');
  const page = new URL(pageUrl);
  if (page.protocol !== 'https:') fail('Planner page URL must use HTTPS.');
  const host = text(config.tenantHost);
  if (host && host.toLowerCase() !== page.host.toLowerCase()) fail('Configured tenant host does not match the current SharePoint host.');
  const timezone = text(config.timezone) || 'UTC';
  try { new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(); } catch (_) { fail('Configured timezone is invalid.'); }
  const maxHorizonDays = Number(config.maxHorizonDays);
  const defaultHorizonDays = Number(config.defaultHorizonDays);
  const maxPageSize = Number(config.maxPageSize);
  const maxItems = Number(config.maxItems);
  if (!Number.isInteger(maxHorizonDays) || maxHorizonDays < 1 || maxHorizonDays > 62) fail('maxHorizonDays must be an integer from 1 to 62.');
  if (!Number.isInteger(defaultHorizonDays) || defaultHorizonDays < 1 || defaultHorizonDays > maxHorizonDays) fail('defaultHorizonDays exceeds the horizon bound.');
  if (!Number.isInteger(maxPageSize) || maxPageSize < 1 || maxPageSize > 500) fail('maxPageSize must be an integer from 1 to 500.');
  if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 5000) fail('maxItems must be an integer from 1 to 5000.');
  if (!Array.isArray(config.sources) || config.sources.length < 1 || config.sources.length > MAX_SOURCES) fail('One to four REST sources are required.');
  const seen = new Set();
  const sources = config.sources.map((source) => {
    if (!source || typeof source !== 'object') fail('Each source must be an object.');
    const id = resourceId(source.id, 'Source ID');
    if (seen.has(id)) fail('Source IDs must be unique.');
    seen.add(id);
    if (source.kind !== 'room' && source.kind !== 'shared-resource') fail(`Source ${id} has an unsupported kind.`);
    if (!text(source.label) || text(source.label).length > 80) fail(`Source ${id} needs a short label.`);
    return Object.assign({}, source, {
      id,
      label: text(source.label),
      resourcesEndpoint: safeUrl(source.resourcesEndpoint, pageUrl),
      reservationsEndpoint: safeUrl(source.reservationsEndpoint, pageUrl),
      resourceIdField: validField(source.resourceIdField, `${id}.resourceIdField`),
      resourceNameField: validField(source.resourceNameField, `${id}.resourceNameField`),
      capacityField: validField(source.capacityField, `${id}.capacityField`),
      timezoneField: validField(source.timezoneField, `${id}.timezoneField`),
      reservationResourceIdField: validField(source.reservationResourceIdField, `${id}.reservationResourceIdField`),
      reservationStartField: validField(source.reservationStartField, `${id}.reservationStartField`),
      reservationEndField: validField(source.reservationEndField, `${id}.reservationEndField`),
      reservationUnitsField: validField(source.reservationUnitsField, `${id}.reservationUnitsField`)
    });
  });
  const workingHours = config.workingHours || { start: '09:00', end: '17:00' };
  validClock(workingHours.start, 'workingHours.start');
  validClock(workingHours.end, 'workingHours.end');
  if (workingHours.start >= workingHours.end) fail('workingHours must end after it starts.');
  return Object.assign({}, config, { timezone, maxHorizonDays, defaultHorizonDays, maxPageSize, maxItems, sources, workingHours, currentUserEndpoint: safeUrl(config.currentUserEndpoint, pageUrl) });
}

function dateRange(startDate, horizonDays, config) {
  const start = parseDateOnly(startDate);
  const days = Number(horizonDays);
  if (!Number.isInteger(days) || days < 1 || days > config.maxHorizonDays) fail('Date horizon exceeds the configured bound.');
  const dates = [];
  for (let index = 0; index < days; index += 1) {
    const date = new Date(start.getTime());
    date.setUTCDate(date.getUTCDate() + index);
    dates.push(date.toISOString().slice(0, 10));
  }
  const end = new Date(start.getTime());
  end.setUTCDate(end.getUTCDate() + days);
  return { start: startDate, end: end.toISOString().slice(0, 10), dates };
}

function normalizeResource(record, source) {
  if (!record || typeof record !== 'object') fail('Resource record is not an object.');
  const id = resourceId(record[source.resourceIdField], 'Resource ID');
  const capacity = Number(record[source.capacityField]);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 100000) fail(`Resource ${id} has invalid capacity.`);
  let timezone = text(record[source.timezoneField]) || 'UTC';
  try { new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(); } catch (_) { timezone = 'UTC'; }
  return { id, name: text(record[source.resourceNameField]) || id, capacity, timezone, sourceId: source.id, sourceLabel: source.label };
}

function normalizeReservation(record, source) {
  if (!record || typeof record !== 'object') fail('Reservation record is not an object.');
  const id = resourceId(record.Id || record.ID || record.id, 'Reservation ID');
  const resource = resourceId(record[source.reservationResourceIdField], 'Reservation resource ID');
  const start = isoDate(record[source.reservationStartField], 'Reservation start');
  const end = isoDate(record[source.reservationEndField], 'Reservation end');
  if (end <= start) fail('Reservation end must be after start.');
  const rawUnits = record[source.reservationUnitsField] === undefined ? 1 : Number(record[source.reservationUnitsField]);
  if (!Number.isInteger(rawUnits) || rawUnits < 1 || rawUnits > 100000) fail('Reservation units are invalid.');
  return { id, resourceId: resource, title: text(record.Title || record.title) || id, start: start.toISOString(), end: end.toISOString(), units: rawUnits, sourceId: source.id, sourceLabel: source.label };
}

function overlap(a, b) { return a.start < b.end && b.start < a.end; }

function overlapEdges(reservations) {
  const sorted = reservations.slice().sort((a, b) => a.resourceId.localeCompare(b.resourceId) || a.start.localeCompare(b.start) || b.end.localeCompare(a.end) || a.id.localeCompare(b.id));
  const edges = [];
  for (let left = 0; left < sorted.length; left += 1) {
    for (let right = left + 1; right < sorted.length; right += 1) {
      const a = sorted[left]; const b = sorted[right];
      if (a.resourceId !== b.resourceId) break;
      if (b.start >= a.end) break;
      if (overlap(a, b)) edges.push({ resourceId: a.resourceId, leftId: a.id, rightId: b.id, startsAt: b.start, endsAt: a.end < b.end ? a.end : b.end });
    }
  }
  return edges;
}

function clockMinutes(value) { const parts = value.split(':').map(Number); return parts[0] * 60 + parts[1]; }
function dayWindow(date, workingHours) {
  const day = new Date(`${date}T00:00:00.000Z`);
  const start = new Date(day.getTime()); start.setUTCMinutes(clockMinutes(workingHours.start));
  const end = new Date(day.getTime()); end.setUTCMinutes(clockMinutes(workingHours.end));
  return { start, end };
}

function computeDailyUtilization(resources, reservations, range, workingHours) {
  return resources.flatMap((resource) => range.dates.map((date) => {
    const window = dayWindow(date, workingHours);
    const usedHours = reservations.filter((item) => item.resourceId === resource.id).reduce((sum, item) => {
      const start = Math.max(window.start.getTime(), new Date(item.start).getTime());
      const end = Math.min(window.end.getTime(), new Date(item.end).getTime());
      return sum + (end > start ? (end - start) / 3600000 * item.units : 0);
    }, 0);
    const availableHours = resource.capacity * (window.end - window.start) / 3600000;
    return { resourceId: resource.id, date, usedHours, availableHours, utilization: availableHours ? Math.min(1, usedHours / availableHours) : 0 };
  }));
}

function weekStart(date) {
  const value = new Date(`${date}T00:00:00.000Z`);
  const offset = (value.getUTCDay() + 6) % 7;
  value.setUTCDate(value.getUTCDate() - offset);
  return value.toISOString().slice(0, 10);
}

function computeWeeklyUtilization(daily) {
  const groups = new Map();
  daily.forEach((item) => {
    const key = `${item.resourceId}|${weekStart(item.date)}`;
    const current = groups.get(key) || { resourceId: item.resourceId, weekStart: weekStart(item.date), usedHours: 0, availableHours: 0 };
    current.usedHours += item.usedHours; current.availableHours += item.availableHours; current.utilization = current.availableHours ? Math.min(1, current.usedHours / current.availableHours) : 0;
    groups.set(key, current);
  });
  return Array.from(groups.values()).sort((a, b) => a.resourceId.localeCompare(b.resourceId) || a.weekStart.localeCompare(b.weekStart));
}

function computeAvailableSlots(resources, reservations, range, workingHours) {
  return resources.flatMap((resource) => range.dates.flatMap((date) => {
    const window = dayWindow(date, workingHours);
    const events = [{ time: window.start.getTime(), delta: 0 }, { time: window.end.getTime(), delta: 0 }];
    reservations.filter((item) => item.resourceId === resource.id).forEach((item) => {
      const start = Math.max(window.start.getTime(), new Date(item.start).getTime());
      const end = Math.min(window.end.getTime(), new Date(item.end).getTime());
      if (end > start) { events.push({ time: start, delta: item.units }); events.push({ time: end, delta: -item.units }); }
    });
    events.sort((a, b) => a.time - b.time || a.delta - b.delta);
    let used = 0; let previous = window.start.getTime(); const slots = [];
    events.forEach((event) => {
      if (event.time > previous && used < resource.capacity) slots.push({ resourceId: resource.id, date, start: new Date(previous).toISOString(), end: new Date(event.time).toISOString(), remainingCapacity: resource.capacity - used });
      used += event.delta; previous = event.time;
    });
    return slots.filter((slot) => new Date(slot.end) > new Date(slot.start));
  }));
}

function loadStatus(error) {
  const status = Number(error && (error.status || error.statusCode));
  if (status === 401 || status === 403) return 'permission';
  if (status === 429) return 'throttled';
  if (status === 408 || status === 502 || status === 503 || status === 504) return 'retry';
  return 'error';
}

module.exports = { MAX_SOURCES, safeUrl, validateConfig, dateRange, resourceId, normalizeResource, normalizeReservation, overlap, overlapEdges, computeDailyUtilization, computeWeeklyUtilization, computeAvailableSlots, loadStatus };

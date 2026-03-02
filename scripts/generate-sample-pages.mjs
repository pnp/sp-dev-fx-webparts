#!/usr/bin/env node
/**
 * Generate Hugo content pages from Docs/docs/data/all-samples.json
 *
 * Usage:
 *   node scripts/generate-sample-pages.mjs
 *   node scripts/generate-sample-pages.mjs --delete-orphans
 *
 * Optional env vars:
 *   GALLERY_PATH="/home/"  (default "/")
 *   SAMPLE_QUERY_KEY="sample" (default "sample")
 */

import fs from "node:fs/promises";
import path from "node:path";

const REPO_ROOT = process.cwd();

const DATA_FILE = path.join(REPO_ROOT, "data", "all-samples.json");
const OUT_DIR = path.join(REPO_ROOT, "content", "samples");

const DELETE_ORPHANS = process.argv.includes("--delete-orphans");

const GALLERY_PATH = "/sp-dev-fx-webparts/";

const SAMPLE_QUERY_KEY = process.env.SAMPLE_QUERY_KEY ?? "sample";

function slugifyName(name) {
    // Use sample.name as slug, but make it URL-safe and stable.
    // Keep this conservative so slugs don't change unexpectedly.
    return String(name ?? "")
        .trim()
        .toLowerCase()
        .replace(/['"]/g, "")          // drop quotes
        .replace(/&/g, " and ")        // normalize ampersand
        .replace(/[^a-z0-9]+/g, "-")   // non-alnum -> dash
        .replace(/-+/g, "-")           // collapse dashes
        .replace(/^-|-$/g, "");        // trim dashes
}

function yamlEscape(value) {
    const s = String(value ?? "");
    // Escape backslashes and quotes for YAML double-quoted strings
    const escaped = s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `"${escaped}"`;
}

function yamlArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return "[]";
    return `[${arr.map((x) => JSON.stringify(String(x))).join(", ")}]`;
}

function safeDateIso(dateLike) {
    // Hugo accepts ISO strings; we keep original if parseable.
    if (!dateLike) return null;
    const d = new Date(dateLike);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

async function readJson(filePath) {
    const txt = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(txt);

    if (!Array.isArray(parsed)) {
        // If you ever change shape to an object/map, support that too.
        const vals = parsed && typeof parsed === "object" ? Object.values(parsed) : null;
        if (Array.isArray(vals)) return vals;
        throw new Error(`Expected JSON array in ${filePath}`);
    }
    return parsed;
}

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true });
}

async function exists(p) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}

async function listSubdirs(dir) {
    if (!(await exists(dir))) return [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

function buildMarkdown(sample, slug) {
    const title = sample.title || sample.name || slug;
    const description = sample.shortDescription || "";
    const tags = Array.isArray(sample.tags) ? sample.tags : [];
    const categories = Array.isArray(sample.categories) ? sample.categories : [];
    const lastmod = safeDateIso(sample.updateDateTime);
    const thumb = Array.isArray(sample.thumbnails) ? sample.thumbnails[0] : null;
    const thumbUrl = thumb?.url ?? null;
    const thumbAlt = thumb?.alt ?? (sample.title || sample.name || slug);

    // Normalize gallery root (must be an absolute path from domain root)
    const base = String(GALLERY_PATH || "/").trim().startsWith("/")
        ? String(GALLERY_PATH || "/").trim()
        : "/" + String(GALLERY_PATH || "/").trim();

    // Ensure it ends with a trailing slash so "/sp-dev-fx-webparts" becomes "/sp-dev-fx-webparts/"
    const baseWithSlash = base.endsWith("/") ? base : base + "/";

    const cleanSlug = String(slug).replace(/^"+|"+$/g, ""); // strip leading/trailing quotes defensively
    const openInGalleryUrl = `${baseWithSlash}?${SAMPLE_QUERY_KEY}=${cleanSlug}`;       

    // - type "sample" lets you create layouts/sample/single.html if you want
    // - slug is explicit for nice URLs
    // - sampleName preserved (so templates can re-look-up from site.Data if desired)
    // - redirect_to_gallery is optional: you can use it in your layout to auto-redirect
    const fm = [
        "---",
        `title: ${yamlEscape(title)}`,
        `description: ${yamlEscape(description)}`,
        `type: "sample-panel"`,
        `slug: ${yamlEscape(slug)}`,
        `sampleName: ${yamlEscape(sample.name ?? "")}`,
        thumbUrl ? `thumbnail: ${yamlEscape(thumbUrl)}` : null,
        thumbUrl ? `images: [${yamlEscape(thumbUrl)}]` : `images: []`,
        thumbAlt ? `thumbnailAlt: ${yamlEscape(thumbAlt)}` : null,
        lastmod ? `lastmod: ${yamlEscape(lastmod)}` : null,
        tags.length ? `tags: ${yamlArray(tags)}` : `tags: []`,
        categories.length ? `categories: ${yamlArray(categories)}` : `categories: []`,
        `openInGalleryUrl: ${yamlEscape(openInGalleryUrl)}`,
        // Set to true if you want the detail page to immediately redirect back to the gallery.
        // If you leave this false, you get an SEO-readable page with a prominent link.
        `redirect_to_gallery: false`,
        "---",
        "",
    ].filter(Boolean).join("\n");

    // Body content:
    // Keep it lightweight for SEO and to help users understand what they’re opening.
    const body = [
        thumbUrl ? `![${thumbAlt}](${thumbUrl})\n\n` : "",
        "",
        description ? description : "",
        "",
        `\n**Open this sample in the gallery (popup panel)**:`,
        "",
        `[Open in gallery](${openInGalleryUrl})`,
        "",
        sample.url ? `\nSource: ${sample.url}\n` : "",
        "",
    ].filter((x) => x !== "").join("\n");

    return fm + "\n" + body + "\n";
}

async function writeSamplePage(sample) {
    const name = sample?.name;
    if (!name) return null;

    const slug = slugifyName(name);
    if (!slug) return null;

    const dir = path.join(OUT_DIR, slug);
    await ensureDir(dir);

    const outFile = path.join(dir, "index.md");
    const md = buildMarkdown(sample, slug);

    await fs.writeFile(outFile, md, "utf8");
    return slug;
}

async function deleteOrphanPages(validSlugs) {
    const existing = await listSubdirs(OUT_DIR);
    const valid = new Set(validSlugs);

    const toDelete = existing.filter((d) => !valid.has(d));
    for (const slug of toDelete) {
        const full = path.join(OUT_DIR, slug);
        await fs.rm(full, { recursive: true, force: true });
        console.log(`Deleted orphan: ${path.relative(REPO_ROOT, full)}`);
    }
}

async function main() {
    console.log(`Reading: ${path.relative(REPO_ROOT, DATA_FILE)}`);
    const samples = await readJson(DATA_FILE);

    await ensureDir(OUT_DIR);

    const slugs = [];
    for (const s of samples) {
        const slug = await writeSamplePage(s);
        if (slug) slugs.push(slug);
    }

    console.log(`Generated ${slugs.length} sample pages in ${path.relative(REPO_ROOT, OUT_DIR)}`);

    if (DELETE_ORPHANS) {
        await deleteOrphanPages(slugs);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
import { IClientSideComponentManifest } from '@microsoft/sp-module-interfaces';
/**
 * Given a manifest, or a manifest and a name, normalizes the name for usage
 * in stores and SystemJS.
 *
 * This is used in order to support versioning for components, and uniquely
 * identify non-component dependencies.
 *
 * Current behavior:
 * Returns <manifestId>_<manifestVersion>.
 * If a name is provided returns the <manifestId>_<manifestVersion>/<name>.
 * It prepends 'https://component-id.invalid/' in order to make it an absolute URL.
 *
 * Final behavior:
 * For a manifest, normalized name will be <componentId>-<version>
 * If a name is provided, normalized name will be <componentId>-<version>-<name>
 */
export default function normalizeName(manifest: IClientSideComponentManifest, name?: string): string;
/**
 * This is only used for components that have a failover path (so far, react and react-dom).
 * As the failover path is used when there is no component, they work via its name,
 * but as opposed to the 'path' dependencies, they are unique in SPFx, like a component.
 *
 * They return the name directly, prepended by the component base URL.
 */
export declare function normalizeFailoverPathName(name: string): string;

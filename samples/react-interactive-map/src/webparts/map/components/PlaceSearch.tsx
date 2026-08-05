import * as React from 'react';
import { SearchBox, Spinner, SpinnerSize, Icon } from '@fluentui/react';
import styles from './PlaceSearch.module.scss';

export interface IPlaceSearchResult {
  displayName: string;
  latitude: number;
  longitude: number;
  /** Nominatim bounding box [south, north, west, east] — used to frame the map to the place. */
  boundingBox?: [number, number, number, number];
}

export interface IPlaceSearchProps {
  onPlaceSelected(latitude: number, longitude: number, displayName: string, boundingBox?: [number, number, number, number]): void;
  placeholder?: string;
  nominatimUrl?: string;
  resultLimit?: number;
}

interface IPlaceSearchState {
  term: string;
  results: IPlaceSearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
}

interface INominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  boundingbox?: string[];
}

/**
 * An always-visible place search built on the Fluent SearchBox — the standard Microsoft 365
 * pattern (type to search, Enter to search, results appear below). Used above the map on the
 * live web part and in the start-location / marker-location dialogs. Geocoding is done with
 * OpenStreetMap Nominatim (no API key); requests are debounced to respect its usage policy.
 */
export default class PlaceSearch extends React.Component<IPlaceSearchProps, IPlaceSearchState> {

  public static defaultProps: Partial<IPlaceSearchProps> = {
    nominatimUrl: 'https://nominatim.openstreetmap.org/search',
    resultLimit: 5,
    placeholder: 'Search for a place (city, address, landmark)…'
  };

  public state: IPlaceSearchState = { term: '', results: [], isSearching: false, hasSearched: false };

  private debounceTimer: number | undefined = undefined;

  public render(): React.ReactElement<IPlaceSearchProps> {
    const { term, results, isSearching, hasSearched } = this.state;
    const showPanel = isSearching || results.length > 0 || (hasSearched && term.trim().length > 0);

    return (
      <div className={styles.placeSearch}>
        <SearchBox
          placeholder={this.props.placeholder}
          value={term}
          onChange={(_ev, newValue) => this.onTermChanged(newValue ?? '')}
          onSearch={() => this.search(term)}
          onClear={() => this.setState({ term: '', results: [], hasSearched: false })}
        />
        {showPanel &&
          <div className={styles.results}>
            {isSearching &&
              <div className={styles.status}>
                <Spinner size={SpinnerSize.small} />
                <span>Searching…</span>
              </div>
            }
            {!isSearching && results.length === 0 && hasSearched &&
              <div className={styles.status}>No matching places found</div>
            }
            {!isSearching && results.map((result, index) =>
              <button
                type="button"
                key={`place_${index}`}
                className={styles.resultItem}
                onClick={() => this.onResultClicked(result)}
              >
                <Icon iconName="POISolid" className={styles.resultIcon} />
                <span className={styles.resultText}>{result.displayName}</span>
              </button>
            )}
          </div>
        }
      </div>
    );
  }

  public componentWillUnmount(): void {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }
  }

  private onTermChanged(term: string): void {
    this.setState({ term });

    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }

    const trimmed = term.trim();
    if (trimmed.length < 3) {
      this.setState({ results: [], hasSearched: false });
      return;
    }

    // Debounce so we don't hammer Nominatim on every keystroke (its usage policy is ~1 req/s).
    this.debounceTimer = window.setTimeout(() => { this.search(trimmed).catch(() => undefined); }, 450);
  }

  private onResultClicked(result: IPlaceSearchResult): void {
    this.setState({ term: result.displayName, results: [], hasSearched: false });
    this.props.onPlaceSelected(result.latitude, result.longitude, result.displayName, result.boundingBox);
  }

  private parseBoundingBox(bbox?: string[]): [number, number, number, number] | undefined {
    if (!bbox || bbox.length !== 4) {
      return undefined;
    }
    // Nominatim order is [minLat, maxLat, minLon, maxLon] = [south, north, west, east].
    const nums = bbox.map(v => parseFloat(v));
    if (nums.some(n => isNaN(n))) {
      return undefined;
    }
    return [nums[0], nums[1], nums[2], nums[3]];
  }

  private async search(term: string): Promise<void> {
    const trimmed = (term ?? '').trim();
    if (trimmed.length === 0) {
      return;
    }

    this.setState({ isSearching: true, hasSearched: true });

    try {
      const url = `${this.props.nominatimUrl}?format=json&addressdetails=0&limit=${this.props.resultLimit}&q=${encodeURIComponent(trimmed)}`;
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) {
        this.setState({ results: [], isSearching: false });
        return;
      }
      const data: INominatimResult[] = await response.json();
      const results: IPlaceSearchResult[] = (data || []).map(d => ({
        displayName: d.display_name,
        latitude: parseFloat(d.lat),
        longitude: parseFloat(d.lon),
        boundingBox: this.parseBoundingBox(d.boundingbox)
      }));
      this.setState({ results, isSearching: false });
    } catch (error) {
      console.warn('Location search request failed:', error);
      this.setState({ results: [], isSearching: false });
    }
  }
}

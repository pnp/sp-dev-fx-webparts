import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@fluentui/react';
import styles from './StartFromPicker.module.scss';
import { OrgService, IPersonSuggestion } from '../services/OrgService';

export interface IStartFromPickerProps {
  service: OrgService;
  valueKey: string;        // current stored login/email
  valueLabel: string;      // current display label
  onChange: (key: string, label: string) => void;
}

const StartFromPicker: React.FC<IStartFromPickerProps> = (p) => {
  const [query, setQuery] = useState<string>(p.valueLabel || p.valueKey || '');
  const [suggestions, setSuggestions] = useState<IPersonSuggestion[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const timer = useRef<number | undefined>(undefined);
  const blurTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (timer.current) { window.clearTimeout(timer.current); }
    if (blurTimer.current) { window.clearTimeout(blurTimer.current); }
  }, []);

  const runSearch = useCallback((q: string): void => {
    setLoading(true);
    p.service.searchPeople(q)
      .then((r) => { setSuggestions(r); setOpen(true); setLoading(false); })
      .catch(() => { setSuggestions([]); setLoading(false); });
  }, [p.service]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setQuery(val);
    if (timer.current) { window.clearTimeout(timer.current); }
    if (!val.trim()) { setSuggestions([]); setOpen(false); p.onChange('', ''); return; }
    timer.current = window.setTimeout(() => runSearch(val), 300);
  };

  const pick = (s: IPersonSuggestion): void => {
    p.onChange(s.login, s.name);
    setQuery(s.name);
    setSuggestions([]);
    setOpen(false);
  };

  const clear = (): void => {
    setQuery('');
    setSuggestions([]);
    setOpen(false);
    p.onChange('', '');
  };

  const onBlur = (): void => {
    // delay so a mousedown on a suggestion registers first
    if (blurTimer.current) { window.clearTimeout(blurTimer.current); }
    blurTimer.current = window.setTimeout(() => {
      setOpen(false);
      const t = query.trim();
      if (t && t.indexOf('@') >= 0 && t !== (p.valueLabel || '')) { p.onChange(t, t); }
    }, 150);
  };

  return (
    <div className={styles.picker}>
      <div className={styles.inputRow}>
        <Icon iconName="Search" className={styles.searchIcon} aria-hidden="true" />
        <input
          type="text"
          className={styles.input}
          placeholder="Type a name or email (blank = you)"
          value={query}
          onChange={onInput}
          onFocus={() => { if (suggestions.length > 0) { setOpen(true); } }}
          onBlur={onBlur}
          aria-label="Start from person"
        />
        {query && (
          <button type="button" className={styles.clear} onMouseDown={(e) => { e.preventDefault(); clear(); }} aria-label="Clear" title="Clear">
            <Icon iconName="Cancel" />
          </button>
        )}
      </div>
      {open && (
        <ul className={styles.list} role="listbox">
          {loading && <li className={styles.note}>Searching...</li>}
          {!loading && suggestions.length === 0 && <li className={styles.note}>No matches</li>}
          {!loading && suggestions.map((s) => (
            <li key={s.login} role="option" aria-selected={false}>
              <button type="button" className={styles.option} onMouseDown={(e) => { e.preventDefault(); pick(s); }}>
                <span className={styles.optName}>{s.name}</span>
                {s.email && <span className={styles.optMail}>{s.email}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StartFromPicker;

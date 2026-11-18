import * as React from 'react';
import type { IOffboardingOptions, IOffboardingTarget } from '../models';

export type OffboardTimingMode = 'immediate' | 'scheduled';

export interface IOffboardDraft {
  target: IOffboardingTarget | null;
  options: IOffboardingOptions;
  timingMode: OffboardTimingMode;
  scheduledDate: string;
}

export interface IOffboardState {
  step: number;
  draft: IOffboardDraft;
}

export const OFFBOARD_STEP_COUNT: number = 4;

export const initialOffboardState: IOffboardState = {
  step: 0,
  draft: {
    target: null,
    options: {
      removeLicenses: true,
      removeFromGroups: true,
      mailboxAction: 'none',
      forwardingAddress: undefined,
      oneDriveAccessUpn: undefined
    },
    timingMode: 'immediate',
    scheduledDate: ''
  }
};

export type OffboardAction =
  | { type: 'setTarget'; target: IOffboardingTarget | null }
  | { type: 'setOptions'; options: Partial<IOffboardingOptions> }
  | { type: 'setTiming'; timingMode: OffboardTimingMode; scheduledDate?: string }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'goto'; step: number }
  | { type: 'reset' };

export function offboardReducer(state: IOffboardState, action: OffboardAction): IOffboardState {
  switch (action.type) {
    case 'setTarget':
      return { ...state, draft: { ...state.draft, target: action.target } };
    case 'setOptions':
      return {
        ...state,
        draft: { ...state.draft, options: { ...state.draft.options, ...action.options } }
      };
    case 'setTiming':
      return {
        ...state,
        draft: {
          ...state.draft,
          timingMode: action.timingMode,
          scheduledDate: action.scheduledDate ?? state.draft.scheduledDate
        }
      };
    case 'next':
      return { ...state, step: Math.min(state.step + 1, OFFBOARD_STEP_COUNT - 1) };
    case 'back':
      return { ...state, step: Math.max(state.step - 1, 0) };
    case 'goto':
      return { ...state, step: Math.min(Math.max(action.step, 0), OFFBOARD_STEP_COUNT - 1) };
    case 'reset':
      return { ...initialOffboardState };
    default:
      return state;
  }
}

export function isOffboardDirty(state: IOffboardState): boolean {
  return state.step > 0 || state.draft.target !== null;
}

interface IOffboardContextValue {
  state: IOffboardState;
  dispatch: React.Dispatch<OffboardAction>;
}

const OffboardContext: React.Context<IOffboardContextValue | undefined> = React.createContext<
  IOffboardContextValue | undefined
>(undefined);

export const OffboardProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(offboardReducer, initialOffboardState);
  const value: IOffboardContextValue = React.useMemo(() => ({ state, dispatch }), [state]);
  return <OffboardContext.Provider value={value}>{children}</OffboardContext.Provider>;
};

export function useOffboard(): IOffboardContextValue {
  const value: IOffboardContextValue | undefined = React.useContext(OffboardContext);
  if (!value) {
    throw new Error('useOffboard must be used inside an OffboardProvider');
  }
  return value;
}

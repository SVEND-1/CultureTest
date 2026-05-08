import { useEffect, useReducer, useCallback } from 'react';
import { fetchUserProfile } from '../../api/profileApi';
import type {ProfileState, UserProfileResponse} from '../../types/profile/profile.types';

// ── Reducer ───────────────────────────────────────────────────────
type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: UserProfileResponse }
  | { type: 'ERROR'; payload: string };

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

function profileReducer(state: ProfileState, action: Action): ProfileState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// ── Хук ──────────────────────────────────────────────────────────
export function useProfile() {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const loadProfile = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await fetchUserProfile();
      dispatch({ type: 'SUCCESS', payload: data });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Неизвестная ошибка';
      dispatch({ type: 'ERROR', payload: message });
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    ...state,
    refetch: loadProfile,
  };
}

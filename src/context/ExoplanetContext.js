import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: {
    preferences: {
      theme: 'dark',
      units: 'metric', // or 'imperial'
      defaultView: 'grid', // or 'list'
      autoSave: true
    },
    recentSearches: [],
    favoriteFilters: []
  },
  app: {
    isLoading: false,
    error: null,
    notifications: [],
    currentPage: 'habitability-analysis'
  },
  data: {
    cachedExoplanets: [],
    lastUpdated: null,
    totalCount: 0
  }
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  UPDATE_USER_PREFERENCES: 'UPDATE_USER_PREFERENCES',
  ADD_RECENT_SEARCH: 'ADD_RECENT_SEARCH',
  CLEAR_RECENT_SEARCHES: 'CLEAR_RECENT_SEARCHES',
  CACHE_EXOPLANETS: 'CACHE_EXOPLANETS',
  UPDATE_DATA_STATS: 'UPDATE_DATA_STATS'
};

// Reducer function
const exoplanetReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        app: {
          ...state.app,
          isLoading: action.payload
        }
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        app: {
          ...state.app,
          error: action.payload
        }
      };

    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        app: {
          ...state.app,
          notifications: [...state.app.notifications, {
            id: Date.now(),
            ...action.payload,
            timestamp: new Date().toISOString()
          }]
        }
      };

    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        app: {
          ...state.app,
          notifications: state.app.notifications.filter(
            notification => notification.id !== action.payload
          )
        }
      };

    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        app: {
          ...state.app,
          currentPage: action.payload
        }
      };

    case ActionTypes.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload
          }
        }
      };

    case ActionTypes.ADD_RECENT_SEARCH:
      const newSearch = {
        query: action.payload.query,
        filters: action.payload.filters,
        timestamp: new Date().toISOString(),
        results: action.payload.results || 0
      };

      // Keep only last 10 searches and avoid duplicates
      const filteredSearches = state.user.recentSearches
        .filter(search => search.query !== newSearch.query)
        .slice(0, 9);

      return {
        ...state,
        user: {
          ...state.user,
          recentSearches: [newSearch, ...filteredSearches]
        }
      };

    case ActionTypes.CLEAR_RECENT_SEARCHES:
      return {
        ...state,
        user: {
          ...state.user,
          recentSearches: []
        }
      };

    case ActionTypes.CACHE_EXOPLANETS:
      return {
        ...state,
        data: {
          ...state.data,
          cachedExoplanets: action.payload,
          lastUpdated: new Date().toISOString()
        }
      };

    case ActionTypes.UPDATE_DATA_STATS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Create context
const ExoplanetContext = createContext();

// Provider component
export const ExoplanetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exoplanetReducer, initialState);

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('exoplanet_preferences');
      const savedSearches = localStorage.getItem('exoplanet_recent_searches');

      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        dispatch({
          type: ActionTypes.UPDATE_USER_PREFERENCES,
          payload: preferences
        });
      }

      if (savedSearches) {
        const searches = JSON.parse(savedSearches);
        searches.forEach(search => {
          dispatch({
            type: ActionTypes.ADD_RECENT_SEARCH,
            payload: search
          });
        });
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('exoplanet_preferences', JSON.stringify(state.user.preferences));
  }, [state.user.preferences]);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('exoplanet_recent_searches', JSON.stringify(state.user.recentSearches));
  }, [state.user.recentSearches]);

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({
      type: ActionTypes.SET_LOADING,
      payload: loading
    }),

    setError: (error) => dispatch({
      type: ActionTypes.SET_ERROR,
      payload: error
    }),

    addNotification: (notification) => dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: notification
    }),

    removeNotification: (id) => dispatch({
      type: ActionTypes.REMOVE_NOTIFICATION,
      payload: id
    }),

    setCurrentPage: (page) => dispatch({
      type: ActionTypes.SET_CURRENT_PAGE,
      payload: page
    }),

    updatePreferences: (preferences) => dispatch({
      type: ActionTypes.UPDATE_USER_PREFERENCES,
      payload: preferences
    }),

    addRecentSearch: (searchData) => dispatch({
      type: ActionTypes.ADD_RECENT_SEARCH,
      payload: searchData
    }),

    clearRecentSearches: () => dispatch({
      type: ActionTypes.CLEAR_RECENT_SEARCHES
    }),

    cacheExoplanets: (exoplanets) => dispatch({
      type: ActionTypes.CACHE_EXOPLANETS,
      payload: exoplanets
    }),

    updateDataStats: (stats) => dispatch({
      type: ActionTypes.UPDATE_DATA_STATS,
      payload: stats
    }),

    // Utility functions
    showSuccess: (message) => {
      dispatch({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          type: 'success',
          message,
          duration: 3000
        }
      });
    },

    showError: (message) => {
      dispatch({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          type: 'error',
          message,
          duration: 5000
        }
      });
    },

    showWarning: (message) => {
      dispatch({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          type: 'warning',
          message,
          duration: 4000
        }
      });
    },

    showInfo: (message) => {
      dispatch({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          type: 'info',
          message,
          duration: 3000
        }
      });
    }
  };

  return (
    <ExoplanetContext.Provider value={{ state, actions }}>
      {children}
    </ExoplanetContext.Provider>
  );
};

// Hook to use the context
export const useExoplanet = () => {
  const context = useContext(ExoplanetContext);
  if (!context) {
    throw new Error('useExoplanet must be used within an ExoplanetProvider');
  }
  return context;
};

// Selectors for common state access patterns
export const selectors = {
  isLoading: (state) => state.app.isLoading,
  error: (state) => state.app.error,
  notifications: (state) => state.app.notifications,
  currentPage: (state) => state.app.currentPage,
  preferences: (state) => state.user.preferences,
  recentSearches: (state) => state.user.recentSearches,
  cachedExoplanets: (state) => state.data.cachedExoplanets,
  dataStats: (state) => ({
    totalCount: state.data.totalCount,
    lastUpdated: state.data.lastUpdated
  })
};

export default ExoplanetContext; 
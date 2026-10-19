import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";
import { useAuthContext } from "./Auth-Context";
import { ResourceKind, SavedResource } from "../interfaces/savedResource";
import {
  isResourceSaved,
  storageKeyForUser,
  toggleSavedList,
} from "../hooks/useSavedResources";

interface SavedResourcesContextProps {
  items: SavedResource[];
  isSaved: (id: string, kind: ResourceKind) => boolean;
  toggleSaved: (resource: Omit<SavedResource, "savedAt">) => void;
  removeSaved: (id: string, kind: ResourceKind) => void;
}

const SavedResourcesContext = createContext<SavedResourcesContextProps>({
  items: [],
  isSaved: () => false,
  toggleSaved: () => {},
  removeSaved: () => {},
});

const readSaved = (user: string | null): SavedResource[] => {
  try {
    const raw = localStorage.getItem(storageKeyForUser(user));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const SavedResourcesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const [items, setItems] = useState<SavedResource[]>([]);

  useEffect(() => {
    setItems(readSaved(user));
  }, [user]);

  const persist = useCallback(
    (next: SavedResource[]) => {
      setItems(next);
      localStorage.setItem(storageKeyForUser(user), JSON.stringify(next));
    },
    [user]
  );

  const isSaved = useCallback(
    (id: string, kind: ResourceKind) => isResourceSaved(items, id, kind),
    [items]
  );

  const toggleSaved = useCallback(
    (resource: Omit<SavedResource, "savedAt">) => {
      persist(toggleSavedList(items, resource));
    },
    [items, persist]
  );

  const removeSaved = useCallback(
    (id: string, kind: ResourceKind) => {
      persist(
        items.filter((item) => !(item.id === id && item.kind === kind))
      );
    },
    [items, persist]
  );

  const value = useMemo(
    () => ({ items, isSaved, toggleSaved, removeSaved }),
    [items, isSaved, toggleSaved, removeSaved]
  );

  return (
    <SavedResourcesContext.Provider value={value}>
      {children}
    </SavedResourcesContext.Provider>
  );
};

export const useSavedResources = () => useContext(SavedResourcesContext);

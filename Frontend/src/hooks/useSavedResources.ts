import { ResourceKind, SavedResource } from "../interfaces/savedResource";

export const storageKeyForUser = (user: string | null) =>
  `csp-saved-resources:${user ?? "guest"}`;

export const isResourceSaved = (
  items: SavedResource[],
  id: string,
  kind: ResourceKind
) => items.some((item) => item.id === id && item.kind === kind);

export const toggleSavedList = (
  items: SavedResource[],
  resource: Omit<SavedResource, "savedAt">
): SavedResource[] => {
  const alreadySaved = isResourceSaved(items, resource.id, resource.kind);
  if (alreadySaved) {
    return items.filter(
      (item) => !(item.id === resource.id && item.kind === resource.kind)
    );
  }
  return [{ ...resource, savedAt: new Date().toISOString() }, ...items];
};

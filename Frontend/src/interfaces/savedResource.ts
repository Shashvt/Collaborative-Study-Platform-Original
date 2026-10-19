export type ResourceKind = "notes" | "pyq";

export interface SavedResource {
  id: string;
  title: string;
  kind: ResourceKind;
  contentUrl: string;
  subject?: string;
  savedAt: string;
}

import { isResourceSaved, toggleSavedList } from "./useSavedResources";
import { SavedResource } from "../interfaces/savedResource";

const sample: SavedResource = {
  id: "n1",
  title: "OS notes",
  kind: "notes",
  contentUrl: "https://example.com/os.pdf",
  subject: "UCS503",
  savedAt: "2026-01-01T00:00:00.000Z",
};

test("toggleSavedList adds a resource that is not saved yet", () => {
  const next = toggleSavedList([], {
    id: sample.id,
    title: sample.title,
    kind: sample.kind,
    contentUrl: sample.contentUrl,
    subject: sample.subject,
  });

  expect(next).toHaveLength(1);
  expect(isResourceSaved(next, "n1", "notes")).toBe(true);
});

test("toggleSavedList removes a resource that is already saved", () => {
  const next = toggleSavedList([sample], {
    id: sample.id,
    title: sample.title,
    kind: sample.kind,
    contentUrl: sample.contentUrl,
  });

  expect(next).toHaveLength(0);
});

test("notes and pyqs with the same id are stored separately", () => {
  const next = toggleSavedList([sample], {
    id: "n1",
    title: "OS PYQ",
    kind: "pyq",
    contentUrl: "https://example.com/os-pyq.pdf",
  });

  expect(next).toHaveLength(2);
  expect(isResourceSaved(next, "n1", "pyq")).toBe(true);
  expect(isResourceSaved(next, "n1", "notes")).toBe(true);
});

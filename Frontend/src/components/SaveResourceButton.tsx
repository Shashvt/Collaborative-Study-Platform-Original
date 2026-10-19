import React, { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { ResourceKind } from "../interfaces/savedResource";
import { useSavedResources } from "../context/SavedResources-Context";

interface SaveResourceButtonProps {
  id: string;
  title: string;
  kind: ResourceKind;
  contentUrl: string;
  subject?: string;
}

const SaveResourceButton: React.FC<SaveResourceButtonProps> = ({
  id,
  title,
  kind,
  contentUrl,
  subject,
}) => {
  const { isSaved, toggleSaved } = useSavedResources();
  const saved = isSaved(id, kind);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggleSaved({ id, title, kind, contentUrl, subject });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save for later"}
      className="mt-3 text-sm text-blue-700 hover:text-blue-900"
    >
      <FontAwesomeIcon
        icon={saved ? faBookmarkSolid : faBookmarkRegular}
        className="mr-2"
      />
      {saved ? "Saved" : "Save"}
    </button>
  );
};

export default SaveResourceButton;

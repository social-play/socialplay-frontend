import { useState } from "react";
import { IUser } from "../interfaces";
interface IPageMembersProps {
  currentUser: IUser;
}

export const PageProfile = (props: IPageMembersProps) => {
  const { currentUser } = props;
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleEditBook = () => {
    setShowForm(true);
  };

  const handleCancelEditBook = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="userFullName">
        <span>
          {currentUser.firstName} {currentUser.lastName}
        </span>
      </div>
      <button type="button" onClick={handleEditBook}>
        Edit
      </button>
      {showForm && (
        <form>
          <input type="text" value={currentUser.firstName} />
          <input type="text" value={currentUser.lastName} />
          <button type="button" onClick={handleCancelEditBook}>
            Cancel
          </button>
        </form>
      )}
      <p>welcome to the Profile page</p>
    </>
  );
};

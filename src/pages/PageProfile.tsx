import { useState } from "react";
import { IUser } from "../interfaces";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

interface IPageMembersProps {
  currentUser: IUser;
}

export const PageProfile = (props: IPageMembersProps) => {
  const { currentUser } = props;
  const [showForm, setShowForm] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState({});
  const handleEditBook = () => {
    setShowForm(true);
  };

  const updateUserProfileData = async () => {
    try {
      await axios.patch(
        `${baseUrl}/userProfile/${currentUser._id}`,
        {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
        },
        { withCredentials: true }
      );
      currentUser.firstName = currentUser.firstName;
      currentUser.lastName = currentUser.lastName;
      setShowForm(false);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handleFormFieldsChange = (
    fieldName: string,
    currentUser: any,
    value: string
  ) => {
    currentUser[fieldName as keyof IUser] = value;
    setUserFormData({ ...userFormData });
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
          <input
            type="text"
            value={currentUser.firstName}
            onChange={(e) =>
              handleFormFieldsChange("firstName", currentUser, e.target.value)
            }
          />
          <input
            type="text"
            value={currentUser.lastName}
            onChange={(e) =>
              handleFormFieldsChange("lastName", currentUser, e.target.value)
            }
          />
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
          <button type="button" onClick={updateUserProfileData}>
            Submit
          </button>
        </form>
      )}
      <p>welcome to the Profile page</p>
    </>
  );
};

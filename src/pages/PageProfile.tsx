import { useState } from "react";
import { IUser } from "../interfaces";
import axios from "axios";
import { _initialUploadFile } from "../interfaces";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { BiEdit, BiRefresh } from "react-icons/bi";
import "../styles/pages/pageProfile.scss";

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
  const { uploadFile, handleSubmit, handleFileChange, imageSrc, refreshImage } =
    useContext(AppContext);

  // const [imageSrc, setImageSrc] = useState(
  //   `${baseUrl}/images/${currentUser._id}.png`
  // );

  const updateUserProfileData = async () => {
    try {
      await axios.patch(
        `${baseUrl}/userProfile/${currentUser._id}`,
        {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
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

  // const refreshImage = () => {
  //   // let extension;
  //   // if (imageSrc.endsWith(".png")) {
  //   //   extension = ".png";
  //   // } else if (imageSrc.endsWith(".jpg")) {
  //   //   extension = ".jpg";
  //   // }
  //   setImageSrc(`${baseUrl}/images/${currentUser._id}.png?${Math.random()}`);
  // };

  return (
    <div className="pageProfile">
      <div className="uploadImage">
        <div className="userImage mb-6">
          <img src={imageSrc} />
        </div>
        <button onClick={refreshImage} className="text-yellow-500">
          <BiRefresh />
        </button>
        <i className="text-sm text-yellow-500">
          click to see your picture after upload
        </i>
      </div>

      <div className="userDetails">
        <span>{currentUser.firstName}</span>
        <span>{currentUser.lastName}</span>
        <span>{currentUser.email}</span>
        <button type="button" onClick={handleEditBook} className="editIcon">
          <BiEdit />
        </button>

        {showForm && (
          <form onSubmit={(e) => handleSubmit(e, currentUser._id)}>
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

            <section>
              <input
                type="file"
                onChange={(e) => handleFileChange(e)}
                className="block w-full mb-5 text-l text-blue-900 border border-blue-300 rounded-lg  bg-blue-50 dark:text-blue-400 focus:outline-none dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400"
              />
              <p
                className="mt-1 text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                {/* SVG, PNG, JPG or GIF (MAX. 800x400px). */}
                PNG (MAX. 800x400px).
              </p>

              <div className="preview">
                {[".jpg", ".png"].filter((m) =>
                  uploadFile.file?.name.endsWith(m)
                ).length > 0 ? (
                  <img src={uploadFile.preview} width="100" height="100" />
                ) : (
                  <div className="previewFileName">{uploadFile.file?.name}</div>
                )}
              </div>
            </section>
            <div className="buttonArea">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={updateUserProfileData}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Done
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

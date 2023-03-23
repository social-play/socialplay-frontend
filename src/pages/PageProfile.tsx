import { IUser } from "../interfaces";
interface IPageMembersProps {
  currentUser: IUser;
}

export const PageProfile = (props: IPageMembersProps) => {
  const { currentUser } = props;
  return (
    <>
      <div className="userFullName">
        <span>
          {currentUser.firstName} {currentUser.lastName}
        </span>
      </div>
      <p>welcome to the Profile page</p>
    </>
  );
};

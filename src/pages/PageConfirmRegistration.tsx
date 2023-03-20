import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { IUser } from "../interfaces";

interface IPageConfirmRegistrationProps {
  baseUrl: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}
// enumeration
enum ConfirmStatus {
  unconfirmed,
  failed,
  succeeded,
}
export const PageConfirmRegistration = (
  props: IPageConfirmRegistrationProps
) => {
  const { baseUrl, setCurrentUser } = props;

  const [confirmStatus, setConfirmStatus] = useState<ConfirmStatus>(
    ConfirmStatus.unconfirmed
  );
  const { confirmationCode } = useParams();

  useEffect(() => {
    (async () => {
      const data = (
        await axios.post(
          `${baseUrl}/confirm-registration-code`,
          { confirmationCode },
          { withCredentials: true }
        )
      ).data;
      if (data.userWasConfirmed) {
        setConfirmStatus(ConfirmStatus.succeeded);
      } else {
        setConfirmStatus(ConfirmStatus.failed);
      }
    })();
  }, []);

  return (
    <>
      {confirmStatus === ConfirmStatus.succeeded && (
        <>
          <p>Thank you for confirming your email address.</p>
          <p>You are now a member of this site!</p>
          <p>
            Please log in to the site here: <NavLink to="/login">Login</NavLink>
          </p>
        </>
      )}
      {confirmStatus === ConfirmStatus.failed && (
        <>
          <p>Sorry, the confirmation code is not valid.</p>
          <p>
            Please <NavLink to="/register">register again</NavLink> to become a
            member.
          </p>
        </>
      )}
    </>
  );
};

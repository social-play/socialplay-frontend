import { useState } from "react";
import axios from "axios";
import { IUser } from "../interfaces";

interface IPageRegisterProps {
  baseUrl: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const initialFormValues = {
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  email: "",
  errors: [],
  birthDate: "",
  formMessage: "",
  //registrationSuccessful: false,
};
export const PageRegister = (props: IPageRegisterProps) => {
  const { baseUrl, setCurrentUser } = props;
  const [formValues, setFormValues] = useState(initialFormValues);
  const [registrationSuccessful, setRegistrationSuccessful] =
    useState<boolean>(false);
  const handleRegisterButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    (async () => {
      const data = (
        await axios.post(
          `${baseUrl}/register`,

          {
            //...formValues
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            userName: formValues.userName,
            password: formValues.password,
            email: formValues.email,
            birthDate: formValues.birthDate,
          },

          { withCredentials: true }
        )
      ).data;
      console.log("data", data);

      if (data.errors.length > 0) {
        console.log("errors", data.errors);
        console.log("errors erwischen");

        setFormValues({ ...formValues, errors: data.errors });
      } else {
        setFormValues({ ...formValues });

        setRegistrationSuccessful(true);
      }
    })();
  };

  return (
    <>
      {registrationSuccessful ? (
        <div className="registrationSuccessfulArea">
          <p>Thank you for registering!</p>
          <p>Please check your mail to confirm your email address.</p>
        </div>
      ) : (
        <>
          <form>
            <div className="column">
              <div className="firstName row">
                <label>First Name:</label>
                <input
                  type="text"
                  value={formValues.firstName}
                  autoFocus
                  onChange={(e) =>
                    setFormValues({ ...formValues, firstName: e.target.value })
                  }
                />
              </div>
              <div className="lastName row">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={formValues.lastName}
                  onChange={(e) =>
                    setFormValues({ ...formValues, lastName: e.target.value })
                  }
                />
              </div>
              <div className="userName row">
                <label>Username:</label>
                <input
                  type="text"
                  value={formValues.userName}
                  onChange={(e) =>
                    setFormValues({ ...formValues, userName: e.target.value })
                  }
                />
              </div>
              <div className="password row">
                <label>Password:</label>
                <input
                  type="text"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({ ...formValues, password: e.target.value })
                  }
                />
              </div>
              <div className="birthDate row">
                <label>Birth Date:</label>
                <input
                  type="text"
                  value={formValues.birthDate}
                  onChange={(e) =>
                    setFormValues({ ...formValues, birthDate: e.target.value })
                  }
                />
              </div>
              <div className="email row">
                <label>Email:</label>
                <input
                  type="text"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                />
              </div>
              <div className="buttonRow">
                <button onClick={(e) => handleRegisterButton(e)}>
                  Register
                </button>
                <div className="formMessage">{formValues.formMessage}</div>
              </div>
            </div>
          </form>
          {formValues.errors?.length > 0 && (
            <div className="errorArea">
              <ul>
                {formValues.errors.map((error, i) => {
                  return <li key={i}>{error}</li>;
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

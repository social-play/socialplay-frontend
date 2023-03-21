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
  isOver16: false,
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
            isOver16: formValues.isOver16,
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
              <div className="isOver16 row">
                <label>Over 16:</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() =>
                      setFormValues({ ...formValues, isOver16: true })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                </label>
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

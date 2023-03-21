import { useEffect, useState } from "react";
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
  capture: "",
};
export const PageRegister = (props: IPageRegisterProps) => {
  const { baseUrl, setCurrentUser } = props;
  const [formValues, setFormValues] = useState(initialFormValues);
  const [registrationSuccessful, setRegistrationSuccessful] =
    useState<boolean>(false);

  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const randomFirstNumber = Math.floor(Math.random() * 49) + 1;
    const randomSecondNumber = Math.floor(Math.random() * 49) + 1;
    setFirstNumber(randomFirstNumber);
    setSecondNumber(randomSecondNumber);
  }, []);

  const handleRegisterButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    (async () => {
      const data = (
        await axios.post(
          `${baseUrl}/register`,

          {
            ...formValues,
            // firstName: formValues.firstName,
            // lastName: formValues.lastName,
            // userName: formValues.userName,
            // password: formValues.password,
            // email: formValues.email,
            // isOver16: formValues.isOver16,
          },

          { withCredentials: true }
        )
      ).data;
      // console.log("data", data);

      if (data.errors.length > 0) {
        // console.log("errors", data.errors);
        // console.log("errors erwischen");

        setFormValues({ ...formValues, errors: data.errors });
      } else {
        setFormValues({ ...formValues });

        setRegistrationSuccessful(true);
      }
    })();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "capture") {
      const result: number = firstNumber + secondNumber;
      if (parseInt(value) === result) {
        setResult(parseInt(value));
      }

      setFormValues({ ...formValues, [name]: value });
    }
  };
  return (
    <div className="pageRegister">
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
                    setFormValues({
                      ...formValues,
                      firstName: e.target.value,
                    })
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
                  <div className="w-11 h-6 bg-red-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label>
              </div>
              <div className="buttonRow ">
                <button
                  onClick={(e) => handleRegisterButton(e)}
                  className="py-2 px-4 text-sm font-bold text-blue-200 active:outline-none bg-blue-900 rounded-lg  hover:bg-blue-400 hover:text-blue-700 active:z-10 active:ring-4 active:ring-blue-500 dark:active:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Register
                </button>

                <div className="capture">
                  <div className="numbers">
                    <span>{firstNumber}</span>+<span>{secondNumber}</span>
                  </div>

                  <input
                    value={formValues.capture}
                    type="text"
                    required
                    name="capture"
                    onChange={handleChange}
                  />
                </div>

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
    </div>
  );
};

import instance from ".";

export const authMe = async () => {
  const token = localStorage.getItem("token");
  if (!token)
    return {
      vslid: false,
    };
  try {
    const { data } = await instance.post(
      "/graphql",
      {
        query: `
        query AuthMe {
          authMe {
            valid
          }
        }
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token passed in Authorization header
        },
      },
    );
    return data.data.authMe;
  } catch (e) {
    return {
      valid: false,
    };
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await instance.post("/graphql", {
    query: `
      mutation Login($email: String!, $password: String!) {
        login(loginInput: { email: $email, password: $password }) {
          accessToken
        }
      }
    `,
    variables: {
      email,
      password,
    },
  });
  const { accessToken } = data.data.login;
  localStorage.setItem("token", accessToken);
  return accessToken;
};

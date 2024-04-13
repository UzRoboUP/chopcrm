export type User = {
  name: string;
  role: string;
  isAuth: boolean;
};

type ApiResponse = {
  data: { user: User };
  error?: { message: string };
};

export async function getCurrentUser(): Promise<User> {
  const { data, error = '' } = await fakeApi();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

const fakeApi = (): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        () =>
          resolve({
            data: { user: { name: 'John Doe', role: 'admin', isAuth: true } },
          }),
        1000,
      );
    } catch (error) {
      reject(error);
    }
  });
};

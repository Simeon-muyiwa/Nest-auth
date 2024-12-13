'use server'

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export const signInAction = async (email: string, password: string): Promise<SignInResponse> => {
  try {
    const response = await fetch("http://localhost:3001/authentication/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const data: SignInResponse = await response.json(); // Type the response as SignInResponse

    return data; // This now returns { accessToken: string, refreshToken: string }
  } catch (error: any) {
    console.error("Sign-in error: ", error);
    throw new Error(error.message || 'Something went wrong');
  }
};
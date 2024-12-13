'use server'

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
}

export const signUpAction = async (email: string, password: string): Promise<SignUpResponse> => {
  try {
    const response = await fetch("http://localhost:3001/authentication/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const data: SignUpResponse = await response.json(); // Type the response as SignUpResponse

    return data; // This now returns { accessToken: string, refreshToken: string }
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
};
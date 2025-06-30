// Minimal AuthService and AuthCredentials for LoginCompanyPage to work error-free

export type AuthCredentials = {
  email: string;
  password: string;
  account_type?: 'company' | 'user';
};

export type AuthResponse = {
  status: 'success' | 'error' | 'registered';
  data?: {
    token: string;
    user: { email: string };
  };
  message?: string;
  redirect?: string;
};

export class AuthService {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    // Dummy implementation: replace with real API call
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      return {
        status: 'success',
        data: {
          token: 'fake-jwt-token',
          user: { email: credentials.email },
        },
      };
    } else {
      return {
        status: 'error',
        message: 'Invalid credentials',
        redirect: '/auth/register/company',
      };
    }
  }
}

export class AuthApi {
  async sendLoginRequest(username: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (res.status === 401) {
      throw new Error("نام کاربری یا رمز عبور اشتباه است.")
    }
    return await res.json();
  }
}
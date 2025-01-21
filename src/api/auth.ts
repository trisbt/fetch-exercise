const BASE_URL = "https://frontend-take-home-service.fetch.com";

export const loginUser = async (name: string, email: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Login API error:", response.status, errorText);
        throw new Error(`Login failed: ${errorText}`);
    }
};

export const logoutUser = async () => {
  await fetch(`${BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
};

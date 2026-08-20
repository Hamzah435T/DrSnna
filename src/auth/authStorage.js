const AUTH_KEY = "auth";

export function saveAuth(authData) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

export function getAuth() {
    const auth = localStorage.getItem(AUTH_KEY);

    if (!auth) {
        return null;
    }

    return JSON.parse(auth);
}

export function getToken() {
    return getAuth()?.token || null;
}

export function getRole() {
    return getAuth()?.role || null;
}

export function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
}
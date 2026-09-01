const AUTH_KEY = "auth";

export function saveAuth(authData) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

export function getAuth() {
    const auth = sessionStorage.getItem(AUTH_KEY);

    if (!auth) {
        return null;
    }

    try {
        return JSON.parse(auth);
    } catch {
        return null;
    }
}

export function getToken() {
    return getAuth()?.token || null;
}

export function getRole() {
    return getAuth()?.role || null;
}

export function clearAuth() {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
}
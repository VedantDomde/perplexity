import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register({ email, username, password });
            return data?.success !== false;
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            dispatch(setError(message));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({ email, password });
            dispatch(setUser(data.user));
            return true;
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            dispatch(setError(message));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
            dispatch(setError(null));
            return true;
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Failed to fetch user data"));
            dispatch(setUser(null));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
    };
}
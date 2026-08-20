import {Form, useActionData, useNavigation, useSearchParams} from "react-router";

export default function Login() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();

    const registered = searchParams.get("registered");

    const isSubmitting = navigation.state === "submitting";

    return (
        <div>
            <h1>Login</h1>
            {registered === "true" && (
                <p>
                    Your account was created successfully, but we
                    couldn't log you in automatically. Please log in
                    manually.
                </p>
            )}

            <Form method="post">
                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        required
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        maxLength={20}
                    />
                </div>

                {actionData?.error && (
                    <p>{actionData.error}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </Form>
        </div>
    );
}
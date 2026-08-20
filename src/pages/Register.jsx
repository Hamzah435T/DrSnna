import { useState } from "react";
import { Form, useActionData } from "react-router";

export default function Register() {
    const [mode, setMode] = useState("PATIENT");

    const actionData = useActionData();

    return (
        <div>
            <h1>Register</h1>

            <div>
                <button
                    type="button"
                    onClick={() => setMode("PATIENT")}
                >
                    Patient
                </button>

                <button
                    type="button"
                    onClick={() => setMode("CLINIC")}
                >
                    Clinic
                </button>
            </div>

            {actionData?.error && (
                <p>{actionData.error}</p>
            )}

            <Form method="post">
                <input
                    type="hidden"
                    name="mode"
                    value={mode}
                />

                {mode === "PATIENT" && (
                    <>
                        <div>
                            <label>
                                Full name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                required
                            />
                        </div>
                    </>
                )}

                {mode === "CLINIC" && (
                    <>
                        <div>
                            <label>
                                Clinic name
                            </label>

                            <input
                                type="text"
                                name="clinicName"
                                required
                            />
                        </div>

                        <div>
                            <label>
                                Clinic license number
                            </label>

                            <input
                                type="text"
                                name="clinicLicenseNumber"
                                required
                            />
                        </div>
                    </>
                )}

                <div>
                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        required
                    />
                </div>

                <div>
                    <label>
                        City
                    </label>

                    <select
                        name="city"
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>
                            Select your city
                        </option>

                        <option value="AMMAN">Amman</option>
                        <option value="IRBID">Irbid</option>
                        <option value="ZARQA">Zarqa</option>
                        <option value="AQABA">Aqaba</option>
                    </select>
                </div>

                <div>
                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        maxLength={12}
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$"
                    />
                </div>

                <div>
                    <label>
                        Confirm password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        minLength={8}
                        maxLength={12}
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$"
                    />
                </div>

                <button type="submit">
                    Register
                </button>
            </Form>
        </div>
    );
}
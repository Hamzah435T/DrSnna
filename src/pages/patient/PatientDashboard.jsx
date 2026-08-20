import {Form} from "react-router";

export default function PatientDashboard() {
    return <div>
        <h1>Patient Dashboard</h1>
        <Form method="post" action={"/logout"}>
            <button type="submit">
                Logout
            </button>
        </Form>
    </div>;
}
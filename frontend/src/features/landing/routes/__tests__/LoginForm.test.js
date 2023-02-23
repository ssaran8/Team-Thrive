import {render, screen} from "@testing-library/react"
import { LoginForm } from "../../components/LoginForm"

describe("Test LoginForm Component", () =>
    test("render the login form with login button", async () => {
        render(<LoginForm setForm='Login' />);
        const buttonList= await screen.findAllByTestId("login-btn");
        expect(buttonList).toHaveLength(1);
    })
)
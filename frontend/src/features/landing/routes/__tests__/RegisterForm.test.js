import {render, screen} from "@testing-library/react"
import { RegisterForm } from "../../components/RegisterForm"

describe("Test RegisterForm Component", () =>
    test("render the register form with the sign up button", async () => {
        render(<RegisterForm setForm='Register' />);
        const buttonList= await screen.findAllByTestId("signup-btn");
        expect(buttonList).toHaveLength(1);
    })
)
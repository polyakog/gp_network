/* eslint-disable testing-library/await-async-query */
import ProfileStatus from "./ProfileStatus";
import { create } from "react-test-renderer";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="gp-test" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("gp-test");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="gp-test" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.type).toBe("span");
    });

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="gp-test" />);
        const root = component.root;
        expect(() => {
            root.findByType("textarea")
        }).toThrowError();
    });

    test("after creation <span> should contain correct status", () => {
        const component = create(<ProfileStatus status="gp-test" />);
        const root = component.root;
        let span = root.findByType("span")

        expect(span.children[0]).toBe("gp-test");
    });

    test("after double click <input> should be displayed instead of <span>", () => {
        const component = create(<ProfileStatus status="gp-test" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let textarea = root.findByType("textarea");
        expect(textarea.props.value).toBe("gp-test");
    });

    test("callback should be called for button Save", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="gp-test" updateUserStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.saveState();
        expect(mockCallback.mock.calls.length).toBe(1);
    });

});


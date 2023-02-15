/* eslint-disable testing-library/await-async-query */

import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";


describe('Paginator component tests', () => {
    test('page count is 11 but should be showed 10 only', () => {
        const component = create(<Paginator totalItemsCount={20} pageSize={1} currentPage={11} portionSize={10} />);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let spans = root.findAllByType("span")
        expect(spans.length).toBe(10);
    })
    test("if pages count is more then 10 and current page is 1 << (before) button should be disabled", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1} portionSize={10} />);
        const root = component.root
        let nextButton = root.findByProps({ name: 'before' });
        expect(nextButton.props.disabled).toBe(true);
    })
    test('if pages count is more then 10 and current page is 1 >> (next) button should be enabled', () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1} portionSize={10} />);
        const root = component.root
        let nextButton = root.findByProps({ name: 'next' });
        expect(nextButton.props.disabled).toBe(false);
    })


});


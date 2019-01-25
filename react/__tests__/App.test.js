/* eslint-env jest */
import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
describe("Hello React component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App classes={{}} />);
  });
  it("should be rendered", () => {
    expect(wrapper).toBeDefined();
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
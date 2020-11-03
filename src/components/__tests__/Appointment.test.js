import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import Appointment from "components/Appointment";

afterEach(cleanup);

describe('Appointment tests', () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it('doens\'t call the function', () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });
  it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
  });

});

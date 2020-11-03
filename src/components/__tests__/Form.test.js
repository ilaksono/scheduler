import React from "react";

import { render, cleanup, fireEvent, getByTestId } from "@testing-library/react";
import '@testing-library/jest-dom';

// import Appointment from "components/Appointment";
import Form from 'components/Appointment/Form.js';

afterEach(cleanup);

describe('Form tests', () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    {
      id: 2,
      name: "Pylvia Salmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  it("renders without crashing", () => {
    render(<Form />);
  });
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText, getByTestId } = render(<Form interviewers={interviewers} />);

    expect(getByPlaceholderText(/Enter Student Name/i)).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} setErrMsg={() => { }} />);
    const input = getByTestId('student-name-input');
    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it('shows student name cannot be blank with empty input', () => {
    const fn = jest.fn();
    const { getByPlaceholderText } = render(<Form setErrMsg={fn} interviewers={interviewers} />);
    const input = getByPlaceholderText(/Enter Student Name/i);
    fireEvent.change(input, { target: { value: '' } });

  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { queryByText, getByText } = render(<Form interviewers={interviewers} setErrMsg={() => { }} errMsg='student name cannot be blank' onSave={onSave} />);
    fireEvent.click(getByText(/Save/));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(queryByText(/student name cannot be blank/i)).toBeInTheDocument();
  });

  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn((a, b) => { });
    const name = 'Lydia Miller-Jones';
    const { getByTestId, queryByText } = render(<Form interviewers={interviewers} setErrMsg={() => { }} onSave={() => onSave(name, null)} />);
    const input = getByTestId('student-name-input');
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(queryByText(/Save/));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith(name, null);
  });

  it("submits the name entered by the user", () => {
    const onSave = jest.fn((a, b) => { });
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={() => onSave('Lydia Miller-Jones', null)} setErrMsg={() => { }} />
    );
    const input = getByPlaceholderText("Enter Student Name");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const err = { msg: '' };
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form setErrMsg={() => { }} errMsg={err.msg} interviewers={interviewers} onSave={onSave} />
    );
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it('empties name field when cancel is click', () => {
    const cancel = jest.fn();
    const { getByTestId, getByText } = render(<Form setErrMsg={() => { }} onCancel={cancel} interviewers={interviewers} />);
    const btn = getByText('Cancel');

    fireEvent.click(btn);
    expect(getByTestId('student-name-input').value).toBe('');
    expect(cancel).toHaveBeenCalledTimes(1);

  });

  it('does not submit form on form submit event', () => {
    const onSave = jest.fn();

    const {getByRole} = render(<Form setErrMsg={() => { }} onSave={onSave} interviewers={interviewers} />)
    const form = getByRole('form');
    fireEvent.submit(form);
    expect(onSave).not.toHaveBeenCalled();

  })

});

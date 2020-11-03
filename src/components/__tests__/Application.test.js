import React from "react";

import {
  getAllByTestId, getByText, fireEvent, render,
  cleanup, waitForElement, prettyDOM,
  getByAltText, queryByText, getByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe('Application tests', () => {
  it("defaults to monday and changes the schedule when a new day is selected", async () => {
    const { container } = render(<Application />);
    // console.log(prettyDOM(getByText('Monday')));
    await waitForElement(() => {
      // console.log(prettyDOM(container));
      return getByText(container, "Monday");
    })
      .then(() => {
        fireEvent.click(getByText(container, 'Tuesday'));
        expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
      });
  });
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => {
      fireEvent.click(getByText(container, 'Tuesday'));

      // console.log(prettyDOM(container));
      return getAllByTestId(container, /appointment/i)[1];
    })
      .then(async (appoint) => {
        // console.log(prettyDOM(appoint));
        fireEvent.click(getByTestId(appoint, /btn-add/i));
        fireEvent.change(getByTestId(appoint, /student-name-input/i), { target: { value: 'Test Name' } });
        fireEvent.click(getAllByTestId(appoint, /int-img/i)[0]);
        fireEvent.click(getByText(appoint, "Save"));
        // console.log(prettyDOM(appoint));

        expect(getByText(appoint, /Saving/i)).toBeInTheDocument();
        await waitForElement(() => appoint)
          .then(async (card) => {
            expect(getByText(card, /Test Name/i)).toBeInTheDocument();
            expect(getByText(card, /Mildred Nazir/i)).toBeInTheDocument();
            expect(getByAltText(card, /Edit/i)).toBeInTheDocument();
            expect(getByAltText(card, /Delete/i)).toBeInTheDocument();
            const day = getAllByTestId(container, "day").find(day =>
              queryByText(day, "Tuesday")
              );
            return expect(getByText(day, /No Spots Remaining/i)).toBeInTheDocument();
          });
      });
  });

});

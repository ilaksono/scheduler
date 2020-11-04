import React from "react";

import {
  getAllByTestId, getByText, fireEvent, render,
  cleanup, waitForElement, prettyDOM,
  getByAltText, queryByText, getByTestId, getByDisplayValue
} from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);
describe('Application tests', () => {
  xit("defaults to monday and changes the schedule when a new day is selected", async () => {
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
  xit("loads data, books an interview and reduces the spots remaining for Tuesday by 1", async () => {
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

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => {
      fireEvent.click(getByText(container, 'Monday'));
      return getAllByTestId(container, /appointment/i)[1];
    })
      .then(async (appointment) => {
        fireEvent.click(getByAltText(appointment, /delete/i));
        expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
        fireEvent.click(getByText(appointment, /confirm/i));
        await waitForElement(() => appointment)
          .then(card => {
            expect(getByAltText(card, /Add/i)).toBeInTheDocument();
            const day = getAllByTestId(container, "day").find(day =>
              queryByText(day, "Monday")
            );
            return expect(getByText(day, /2 Spots Remaining/i)).toBeInTheDocument();
          });
      });
  });
  xit("loads data, edits an interview and keeps the spots remaining for Tuesday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => {
      fireEvent.click(getByText(container, 'Tuesday'));
      return getAllByTestId(container, /appointment/i)[0];
    })
      .then(async (appointment) => {
        fireEvent.click(getByAltText(appointment, /edit/i));
        expect(getByDisplayValue(appointment, "Leopold Silvers")).toBeInTheDocument();
        fireEvent.change(getByTestId(appointment, /student-name-input/i), { target: { value: 'New Name' } });
        fireEvent.click(getByAltText(appointment, /mildred nazir/i));
        fireEvent.click(getByText(appointment, /save/i));
        expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
        await waitForElement(() => appointment)
          .then(card => {
            expect(getByText(card, 'New Name')).toBeInTheDocument();
            const day = getAllByTestId(container, "day").find(day =>
              queryByText(day, "Tuesday")
            );
            return expect(getByText(day, /No Spots Remaining/i)).toBeInTheDocument();
          });
      });
  });

  xit("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => {
      fireEvent.click(getByText(container, 'Tuesday'));
      return getAllByTestId(container, /appointment/i)[1];
    })
      .then(async (appoint) => {
        fireEvent.click(getByTestId(appoint, /btn-add/i));
        fireEvent.change(getByTestId(appoint, /student-name-input/i), { target: { value: 'Test Name' } });
        fireEvent.click(getAllByTestId(appoint, /int-img/i)[0]);
        fireEvent.click(getByText(appoint, "Save"));
        expect(getByText(appoint, /Saving/i)).toBeInTheDocument();
        await waitForElement(() => appoint)
          .then(async (card) => {
            return expect(getByText(card, /Error/i)).toBeInTheDocument();
          });
      });
  });

  xit("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => {
      fireEvent.click(getByText(container, 'Tuesday'));
      return getAllByTestId(container, /appointment/i)[0];
    })
      .then(async (appoint) => {
        fireEvent.click(getByAltText(appoint, /delete/i));
        fireEvent.click(getByText(appoint, /Confirm/i));
        expect(getByText(appoint, /Deleting/i)).toBeInTheDocument();
        await waitForElement(() => appoint)
          .then(async (card) => {
            return expect(getByText(card, /Error/i)).toBeInTheDocument();
          });
      });
  });

});

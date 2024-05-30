import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomePage from "../../pages/home";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import server from "../mocks/handler";
import { HttpResponse, http } from "msw";

describe("HomePage", () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" index element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

  test("Users should see homepage and component table successfully", async () => {
    renderComponent();

    expect(screen.getByTestId("spinner")).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });

    const image = screen.getByAltText("Leanne Graham");
    expect(image).toBeVisible();
  });

  test("Users can delete table row successfully", async () => {
    renderComponent();

    expect(screen.getByTestId("spinner")).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });

    const deleteButton = screen.getAllByRole("button", { name: "Delete" })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("No data")).toBeVisible();
    });
  });

  test("Users can edit table row successfully", async () => {
    renderComponent();

    expect(screen.getByTestId("spinner")).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });

    const editButton = screen.getAllByRole("button", { name: "Edit" })[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Edit User")).toBeVisible();
    });
  });

  test("Users failed to retrieve fetch table data", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users", () => {
        return HttpResponse.json({ status: 500 });
      })
    );

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch data. Please try again later.")
      ).toBeVisible();
    });
  });
});

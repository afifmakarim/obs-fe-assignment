import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import server from "../mocks/handler";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home";

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

  test("Users can see table data and add new data", async () => {
    renderComponent();

    expect(screen.getByTestId("spinner")).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });

    const addButton = screen.getByRole("button", { name: "Add User" });
    expect(addButton).toBeVisible();

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getAllByText("Add User")[1]).toBeVisible();
    });

    const nameInput = screen.getByLabelText("Name");
    const companyInput = screen.getByLabelText("Company");
    const addressInput = screen.getByLabelText("Address");
    const phoneInput = screen.getByLabelText("Phone");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(companyInput, { target: { value: "Google" } });
    fireEvent.change(addressInput, { target: { value: "Mountain View" } });
    fireEvent.change(phoneInput, { target: { value: "123456" } });

    const addButtonModal = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButtonModal);

    await waitFor(() => {
      expect(screen.getByText("User added successfully")).toBeVisible();
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
      expect(screen.getAllByText("Edit User")[0]).toBeVisible();
    });

    const nameInput = screen.getByLabelText("Name");
    const companyInput = screen.getByLabelText("Company");
    const addressInput = screen.getByLabelText("Address");
    const phoneInput = screen.getByLabelText("Phone");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(companyInput, { target: { value: "Google" } });
    fireEvent.change(addressInput, { target: { value: "Mountain View" } });
    fireEvent.change(phoneInput, { target: { value: "123456" } });

    const editButtonModal = screen.getAllByRole("button", { name: "Edit" })[1];
    fireEvent.click(editButtonModal);

    await waitFor(() => {
      expect(screen.getByText("User updated successfully")).toBeVisible();
    });
  });

  test("Users can edit table row and cancel the modal", async () => {
    renderComponent();

    expect(screen.getByTestId("spinner")).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });

    const editButton = screen.getAllByRole("button", { name: "Edit" })[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getAllByText("Edit User")[0]).toBeVisible();
    });

    const cancelButtonModal = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButtonModal);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });
  });

  test("Users can add new data and cancel the modal", async () => {
    renderComponent();

    expect(screen.getByTestId("spinner")).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });

    const addButton = screen.getByRole("button", { name: "Add User" });
    expect(addButton).toBeVisible();

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getAllByText("Add User")[1]).toBeVisible();
    });

    const cancelButtonModal = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButtonModal);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeVisible();
    });
  });
});

import { Button, Space, Spin, Table, notification } from "antd";
import type { TableProps } from "antd";
import { TableDataType, UsersDataResponseProps } from "../types/users";
import { useUsersStore } from "../store/users-store";
import { getUsers } from "../services/users";
import { Suspense, lazy, useEffect, useState } from "react";
import useModal from "../hooks/use-modal";

const UserModal = lazy(() => import("../components/user-modal"));

export default function HomePage() {
  const { data, setTableData, isLoading, setLoading, removeData } =
    useUsersStore();

  const [selectedItems, setSelectedItems] = useState<TableDataType>();
  const addUserModal = useModal();
  const editUserModal = useModal();

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = (await getUsers()) as UsersDataResponseProps[];
      const data = response.map((item, index) => ({
        key: index + 1,
        name: item.name,
        company: item.company.name,
        address: item.address.city,
        phone: item.phone,
      }));
      setTableData(data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch data. Please try again later.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditUser = (data: TableDataType) => {
    setSelectedItems(data);
    editUserModal.openModal();
  };

  const columns: TableProps<TableDataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      responsive: ["md"],
    },
    {
      title: "Photo",
      render: (_, { name, key }) => (
        <img
          className="rounded-md"
          width={50}
          src={`https://picsum.photos/id/${key}/100/100`}
          alt={name}
        />
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["lg"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            onClick={() => handleEditUser(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => removeData(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="grid my-14" data-testid="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Button
            type="primary"
            className="mb-4 ml-auto flex"
            onClick={addUserModal.openModal}
          >
            Add User
          </Button>
          <Table columns={columns} dataSource={data} bordered />
        </>
      )}
      <Suspense>
        <UserModal
          isOpen={addUserModal.isOpen}
          openModal={addUserModal.openModal}
          closeModal={addUserModal.closeModal}
        />
        <UserModal
          isOpen={editUserModal.isOpen}
          openModal={editUserModal.openModal}
          closeModal={editUserModal.closeModal}
          selectedItems={selectedItems}
        />
      </Suspense>
    </>
  );
}

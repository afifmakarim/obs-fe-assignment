import { Form, Input, Modal, notification } from "antd";

import { UserModalProps } from "./user-modal.interfaces";
import { useEffect } from "react";
import { useUsersStore } from "../../store/users-store";

export default function UserModal({
  isOpen,
  closeModal,
  selectedItems,
}: UserModalProps) {
  const [form] = Form.useForm();

  const { data, addData, editData } = useUsersStore();

  useEffect(() => {
    if (selectedItems) {
      form.setFieldsValue(selectedItems);
    }
  }, [selectedItems, form]);

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      addData({ key: data.length + 1, ...values });
      closeModal();
      form.resetFields();

      notification.success({
        message: "Success",
        description: "User added successfully",
        placement: "bottomRight",
      });
    });
  };

  const handleEditUser = () => {
    form.validateFields().then((values) => {
      editData({ key: selectedItems?.key, ...values });
      closeModal();

      notification.success({
        message: "Success",
        description: "User updated successfully",
        placement: "bottomRight",
      });
    });
  };

  const closeModalAndResetForm = () => {
    selectedItems ? form.setFieldsValue(selectedItems) : form.resetFields();
    closeModal();
  };

  const title = selectedItems ? "Edit User" : "Add User";
  const okText = selectedItems ? "Edit" : "Add";

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={closeModalAndResetForm}
      okText={okText}
      onOk={selectedItems ? handleEditUser : handleAddUser}
      maskClosable={false}
      centered
    >
      <Form name="basic" autoComplete="off" layout="vertical" form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name field!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: "Please input your company!" }]}
        >
          <Input placeholder="Company" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

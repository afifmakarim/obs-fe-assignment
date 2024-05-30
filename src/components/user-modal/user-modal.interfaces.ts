import { TableDataType } from "../../types/users";

export interface UserModalProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedItems?: TableDataType;
}

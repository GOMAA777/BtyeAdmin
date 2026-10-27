export interface PickerPropertyRow {
  id: string;
  name: string;
  code: string;
  district: string;
  city: string;
  unitsCount: number;
  active: boolean;
}

export interface PickerOwnerRow {
  id: string;
  name: string;
  code: string;
  initials: string;
  propertiesCount: number;
  phone: string;
  active: boolean;
}

export const pickerProperties: PickerPropertyRow[] = [];

export const pickerOwners: PickerOwnerRow[] = [];

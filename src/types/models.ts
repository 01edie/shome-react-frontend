export interface Boarder {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  bloodGroup: string;
  contactNumber: string;
  emergencyContact: string;
  guardianName: string;
  medicalCondition: string;
  specialNeeds: string;
  allergies: string;
  notes: string;
  active: true;
  roomNo: 4;
  joiningDate: string;
  leavingDate: string | null;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeRole: string;
  salary: string;
  contactNumber: string;
  notes: string;
  active: boolean;
  joiningDate: string;
  leavingDate: string | null;
}

export type ExpenseType =
  | "boarder_expense"
  | "employee_expense"
  | "internal_expense";

export interface ExpenseGridItem {
  id: string;
  transactionDate: string;
  transactionType: ExpenseType;
  expenseNameId: string;
  quantity: number;
  description: string;
  totalAmount: string;
  isAssignLater: boolean;
  userUnitAmount: number;
  boarderId: string | null;
  employeeId: string | null;
  targetMonth: string;
  notes: string;
  fromInventoryAssignment: boolean;
  expenseName: {
    expenseName: string;
    expenseClassId: string;
    unit: string;
    expenseClass: {
      className: string;
    };
  };
  boarder: {
    firstName: string;
    lastName: string;
  } | null;
  employee: {
    firstName: string;
    lastName: string;
  } | null;
}

export interface ExpenseNameGridItem {
  id: string;
  expenseName: string;
  expenseClassId: string;
  unit: string;
  transactionType: ExpenseType;
  isInventoryItem: true;
  expenseClass: {
    id: string;
    className: string;
    description: string;
  };
}

export interface ExpenseCore {
  transactionDate: Date;
  transactionType: ExpenseType;
  expenseNameId: number;
  quantity: number;
  description?: string;
  totalAmount: number;
  isAssignLater?: boolean;
  userUnitAmount: number;
  boarderId?: number;
  employeeId?: number;
  targetMonth?: string;
  notes?: string;
}

export interface InventoryAssignment {
  quantityToAssign: number;
  boarderId?: number;
  employeeId?: number;
}

// --- settings ---
export interface ExpenseNameCore {
  expenseName: string;
  expenseClassId: string;
  unit: string;
  transactionType: ExpenseType;
  isInventoryItem: boolean;
}
export interface ExpenseName extends ExpenseNameCore {
  id: string;
}

export interface ExpenseClassCore {
  className: string;
  description: string;
}
export interface ExpenseClass extends ExpenseClassCore {
  id: string;
}

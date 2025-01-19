export interface BoarderCore {
  firstName: string;
  lastName: string;
  dob: string;
  bloodGroup: string;
  contactNumber?: string;
  emergencyContact: string;
  guardianName: string;
  medicalCondition?: string ;
  specialNeeds?: string ;
  allergies?: string ;
  notes?: string;
  active: boolean;
  roomNo?: number;
  joiningDate: string;
  leavingDate?: string | null;
}

export interface Boarder extends BoarderCore {
  id: string;
}

export interface EmployeeCore {
  firstName: string;
  lastName: string;
  employeeRole?: string;
  salary: string;
  contactNumber: string;
  notes?: string;
  active: boolean;
  joiningDate: string;
  leavingDate?: string | null;
}

export interface Employee extends EmployeeCore {
  id: string;
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

export interface InventoryGridItem {
  id: string;
  expenseId: string;
  itemName: string;
  description: string;
  quantity: number;
  costPerUnit: number;
  inUse: null | boolean;
  stockingDate: string;
  unit: string;
  expense: {
    transactionType: ExpenseType;
  };
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

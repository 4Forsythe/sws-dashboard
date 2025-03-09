export interface IUpdateRowForm {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
}

export interface ICreateRowForm extends IUpdateRowForm {
  parentId: number | null;
}

export interface IRow extends IUpdateRowForm {
  id: number;
  total: number;

  /* Для отслеживания состояния редактирования */
  isEditing?: boolean;
}

export interface IRowResponse {
  current: IRow;
  changed: IRow[];
}

export interface IRecursiveRow extends IRow {
  child: IRecursiveRow[];
}

export type IRowsResponse = IRecursiveRow[];

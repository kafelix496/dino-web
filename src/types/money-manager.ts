export enum SectionType {
  INCOME = '0',
  EXPENSES = '1',
  SAVING = '2',
  INVESTING = '3'
}

export interface CashflowType {
  projectId: string
  section: SectionType
  title: string
  amount: number
  // MM-DD-YYYY
  date: string
  files: string[]
  status: boolean
  // MM-YYYY
  targetMonth: string
}

export interface CategoryType {
  projectId: string
  section: CategoryType
  title: string
  planned: number
  actual: number
  // MM-YYYY
  targetMonth: string
}

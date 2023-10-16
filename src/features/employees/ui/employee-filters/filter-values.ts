export enum Verify {
  Verifieds = 'verifieds',
  Unverifieds = 'unverifieds',
}

export enum Status {
  Active = 'active',
  Disactive = 'disactive',
  Trasheds = 'trasheds',
}

export const verifyValues = [
  {
    value: Verify.Verifieds,
    label: 'Верифицированные',
  },
  {
    value: Verify.Unverifieds,
    label: 'Неверифицированные',
  },
]

export const statusValues = [
  {
    value: Status.Active,
    label: 'Активные',
  },
  {
    value: Status.Disactive,
    label: 'Неактивные',
  },
  {
    value: Status.Trasheds,
    label: 'Удалённые',
  },
]

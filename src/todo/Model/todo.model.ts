export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}
export class TodoModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public date: Date = new Date(),
    public status: TodoStatusEnum,
  ) {}
}

/**
 * Our Category
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Category',
  tableName: 'categories',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    toDoItems: {
      target: 'ToDoItem',
      type: 'one-to-many',
      joinColumn: true,
      inverseSide: 'category',
    },
    users: {
      target: 'User',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
      inverseSide: 'category',
      nullable: false,
    },
  },
});

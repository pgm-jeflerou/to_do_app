/**
 * Our ToDoItem
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'ToDoItem',
  tableName: 'toDoItems',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    finished: {
      type: 'boolean',
    },
  },
  relations: {
    category: {
      target: 'Category',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
      inverseSide: 'toDoItem',
      onDelete: 'CASCADE',
    },
  },
});

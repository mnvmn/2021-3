import { createEventDefinition } from 'ts-bus';

export default {
  FILTERED_USERS: createEventDefinition()('FILTERED_USERS'),
  LOADED_DEPARTMENTS: createEventDefinition()('LOADED_DEPARTMENTS'),
};

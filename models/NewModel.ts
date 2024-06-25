import uuid from 'react-native-uuid';
import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

export const NewModel = types
  .model({
    id: types.optional(types.string, () => `new-${uuid.v4()}`),
    created_at: types.maybeNull(types.string),
    updated_at: types.maybeNull(types.string),
    created_by: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setId: (id: string) => {
      self.id = id;
    },

    setCreatedAt: (createdAt: string) => {
      self.created_at = createdAt;
    },

    setUpdatedAt: (updatedAt: string) => {
      self.updated_at = updatedAt;
    },

    setCreatedBy: (createdBy: string) => {
      self.created_by = createdBy;
    },
  }))
  .actions((self) => ({
    setFromSnapshot: (snapshot: NewModelSnapshotInType) => {
      self.setId(snapshot.id!);
      self.setCreatedAt(snapshot.created_at!);
      self.setUpdatedAt(snapshot.updated_at!);
      self.setCreatedBy(snapshot.created_by!);
    },
  }))
  .views((self) => ({
    get isNew() {
      return self.id.includes('new-');
    },
  }));

export interface NewModelType extends Instance<typeof NewModel> {}
export interface NewModelSnapshotInType extends SnapshotIn<typeof NewModel> {}
export interface NewModelSnapshotOutType extends SnapshotOut<typeof NewModel> {}

import { computed, onUnmounted, ref as vueRef, Ref, watch, reactive } from "vue"
import {
  ref as _ref,
  set as _set,
  update as _update,
  remove as _remove,
  onValue as _onValue,
  push as _push,
  child as _child,
  DatabaseReference,
} from "firebase/database"
import { db } from "../firebase"
import { Nullable } from "vitest"
import { Room } from "../modules/room/room.type"
import { User } from "../modules/user/user.type"
export type WithID = { id: string }

// TODO does not work?
export function twoWaySync<T>(
  ref: Ref<Nullable<T>>,
  dbRef: Ref<DatabaseReference>,
) {
  const unsub = computed(() =>
    _onValue(dbRef.value, snapshot => {
      // console.log("update db -> app", snapshot.val(), ref.value)

      ref.value = reactive(snapshot.val())
    }),
  )
  watch([ref, ref.value], () => {
    // console.log("update app -> db", ref.value, dbRef.value.key)
    _set(dbRef.value, ref.value)
  })
  watch(unsub, (_, oldUnsubFn) => {
    oldUnsubFn()
  })
  onUnmounted(() => {
    unsub.value()
  })
}

export type EntityManager<T extends WithID> = {
  ref: Ref<Nullable<T>>
  update: (updates: Partial<Omit<T, "id">>) => Promise<void>
  remove: () => Promise<void>
}
type FirebaseSchema = {
  rooms: Record<string, Room>
}
export type roomsPath = "rooms"
export type roomPath = `rooms/${string}`
export type tasksPath = `rooms/${string}/tasks`
export type taskPath = `rooms/${string}/tasks/${string}`
export type voterPath = `rooms/${string}/voters/`
export type votersPath = `rooms/${string}/voters/${string}`
export type entityPath =
  | roomsPath
  | roomPath
  | tasksPath
  | taskPath
  | voterPath
  | votersPath

/**
 *
 */
export const useEntity = <T>(pathRef: Ref<entityPath>) => {
  const obj: Ref<Nullable<T>> = vueRef()
  const dbRef = computed(() => _ref(db, pathRef.value))

  twoWaySync(obj, dbRef)

  function update(updates: Partial<Omit<T, "id">>) {
    return _update(dbRef.value, updates)
  }
  function remove() {
    return _remove(dbRef.value)
  }

  return { ref: obj, update, remove }
}

export const useCollection = <T extends WithID>(collectionName: string) => {
  const ref = vueRef<Record<string, T>>({})
  const dbRef = computed(() => _ref(db, `${collectionName}`))

  twoWaySync(ref, dbRef)

  function set(value: Record<T["id"], T>) {
    return _set(dbRef.value, value)
  }

  return { ref, set }
}

export const createEntity =
  <T extends { id?: string }>(path: string) =>
  async (value: Omit<T, "id">) => {
    const ref = await _push(_ref(db, `${path}/`))
    _set(ref, value)
    return { ...value, id: ref.key } as T
  }

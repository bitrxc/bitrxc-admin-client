
import { CommitOptions, Store } from "vuex";
import { Admin, Role, Room, Schedule, Token } from "../typings/model"

export type stateType = {
    userInfo: {
        userInfo: Admin,
        token: Token,
    },
    roomList: Array<Room>,
    roleList: Array<Role>,
    /** 存储时间段时将时间段数组重新构造为以数字为键的键值对（类数组对象）
     * {@link mutation.ts/saveBeginTimes}
     */
    beginTimes: Record<number,string>,
    endTimes: Record<number,string>,
}

type getterDef = {
    token(state: stateType): Token,
    username(state: stateType): Admin["username"],
    roomList(state: stateType): Array<Room>,
    roleList(state: stateType): Array<Role>,
    beginTimes(state: stateType): Record<number,string>,
    endTimes(state: stateType): Record<number,string>,
}

type getterType = {
    [k in keyof getterDef]?:ReturnType<getterDef[k]>
}

type mutationType = {
    saveUserInfo(state: stateType, userInfo: {
        userInfo: Admin,
        token: Token,
    }): void,
    saveRoomList(state: stateType, roomList: Array<Room>): void,
    saveBeginTimes(state: stateType, beginTimes: Array<Schedule>): void,
    saveEndTimes(state: stateType, endTimes: Array<Schedule>): void,
    saveRoleList(state: stateType, roleList: Array<Role>): void,
    clear(state: stateType): void
};

type LocalStoreDef = {
    state: stateType,
    getters: getterType,
    mutations: mutationType
}

type LocalCommit = {
    <F extends keyof mutationType>(type: F, payload: Parameters<mutationType[F]>[1], options?: CommitOptions): void;
    <F extends keyof mutationType>(payloadWithType: LocalPayload<F>, options?: CommitOptions): void;
};

type LocalPayload<F extends keyof mutationType> =
    { type: F } &
    Parameters<mutationType[F]>[2]

export type LocalStore = Omit<Omit<Store<stateType>, 'commit'>,'getters'> & { getters: getterType } & { commit: LocalCommit }
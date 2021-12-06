
import mutations from './mutations.js';
import { CommitOptions, Store } from "vuex";
import { Admin, Role, Room, Schedule, Token } from "../typings/model"

export type stateType = {
    userInfo: {
        userInfo: Admin,
        token: Token,
    },
    roomList: Array<Room>,
    roleList: Array<Role>,
    beginTimes: Array<Schedule>,
    endTimes: Array<Schedule>,
}

type getterDef = {
    token(state: stateType): Token,
    username(state: stateType): Admin["username"],
    roomList(state: stateType): Array<Room>,
    roleList(state: stateType): Array<Role>,
    beginTimes(state: stateType): Array<Schedule>,
    endTimes(state: stateType): Array<Schedule>,
}

type getterType = {
    [k in keyof getterDef]:ReturnType<getterDef[k]>
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
    <F extends keyof mutationType>(type: F, payload: Parameters<mutationType[F]>[2], options?: CommitOptions): void;
    <F extends keyof mutationType>(payloadWithType: LocalPayload<F>, options?: CommitOptions): void;
};

type LocalPayload<F extends keyof mutationType> =
    { type: F } &
    Parameters<mutationType[F]>[2]

export type LocalStore = Omit<Omit<Store<stateType>, 'commit'>,'getters'> & { getters: getterType } & { commit: LocalCommit }
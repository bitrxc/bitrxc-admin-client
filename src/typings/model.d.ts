/**
 * @fileoverview 这个文件记录了业务模型涉及到的对象类型
 * @todo 从后端 .java 文件自动生成该文件
 */
export type Room = {}

export type Admin = {
    username:string,
}

export type Role = {}

/** json web token 字符串 */
export type Token = string

export type Schedule = {
    begin,
    end,
}
/**
 * @fileoverview 这个文件记录了业务模型涉及到的对象类型
 * @todo 从后端 .java 文件自动生成该文件
 */
export type Room = {}

export type Admin = {
    id?:number,
    username:string,
    password:string,
    email:string,
    phone:string
}

export type Role = {
    id:number,
    roleName:string
}

/** json web token 字符串 */
export type Token = string

export type Schedule = {
    begin,
    end,
}

export type User = {
    username:string,
    checked:boolean,
}
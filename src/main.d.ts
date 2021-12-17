import { LocalStore } from "./store"
import { Router,RouteLocationNormalizedLoaded } from "vue-router";
import api from './api/index.js'
import { ElMessage } from 'element-plus'

/**
 * 定义全局可见的代码模块，由于jsdoc不支持模块混合写法，因此需要显式定义这一类型
 * 模块混合写法见`typings/index.d.ts`
 *  
 */
export type LocalComponentInstance = {
    $store:LocalStore,
    $router:Router,
    /** 当前页面的路径 */
    $route:RouteLocationNormalizedLoaded,
    $api:typeof api,
    $message:typeof ElMessage,
}
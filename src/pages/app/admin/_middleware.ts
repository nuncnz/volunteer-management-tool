import type {NextFetchEvent, NextRequest} from 'next/server'
import {UserScope} from "../../../models/user/UserScope";
import {scopedRoute} from "../../../util/ScopedRoute";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    return await scopedRoute(UserScope.ADMIN, req)

}
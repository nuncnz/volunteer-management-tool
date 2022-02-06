import type {NextFetchEvent, NextRequest} from 'next/server'
import {UserScope} from "../../../models/db/sub-types/UserScope";
import {scopedRoute} from "../../../utils/ScopedRoute";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    return await scopedRoute(UserScope.ADMIN, req)

}
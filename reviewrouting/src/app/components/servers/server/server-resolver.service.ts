/**
 * @fileoverview forward dynamic data through route
 */
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { ServerType } from "./server-type";

@Injectable()
export class ServerResolver implements Resolve<ServerType> {

  constructor(private serversService: ServersService) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): ServerType | Observable<ServerType> | Promise<ServerType> {
    let id = +route.params['id'];
    // use ! post expression to tell typescript getServer operation always returns non null result
    return this.serversService.getServer(id)!;
  }

}

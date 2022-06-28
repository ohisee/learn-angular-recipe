/**
 * @description interceptor
 */
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing request', req.url, req.headers);
    return next.handle(req).pipe(
      tap(event => {
        console.log('event ', event);
        if (event.type === HttpEventType.Response) {
          console.log('Incoming response, body data', event.body);
        }
      }));
  }
}

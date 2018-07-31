export interface RestfulOptions {
  baseUrl?: string,
  headers?: any
}

export function Restful( args: RestfulOptions ) {
  return (Target: any): any => {
    if (args.baseUrl) {
      Target.prototype.getBaseUrl = () => {
        return args.baseUrl;
      };
    }

    if (args.headers) {
      Target.prototype.getDefaultHeaders = () => {
        return args.headers;
      };
    }

    return Target;
  };
}

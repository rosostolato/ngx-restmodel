export function Restful( args: { baseUrl?: string, headers?: any } ) {
  return ( Target: any ): any => {
    if ( args.baseUrl ) {
      Target.prototype.getBaseUrl = () => {
        return args.baseUrl;
      };
    }
    if ( args.headers ) {
      Target.prototype.getDefaultHeaders = () => {
        return args.headers;
      };
    }

    return Target;
  };
}

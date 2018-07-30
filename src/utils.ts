export function uniquePrototype(object: any) {
  const protos = [];
  let proto = object.__proto__;

  while (proto) {
    protos.push(proto);
    proto = proto.__proto__;
  }
  const lastProto = protos.pop();
  proto = {};

  while (protos.length) {
    Object.assign(proto, protos.pop());
  }
  Object.setPrototypeOf(proto, lastProto);
  Object.setPrototypeOf(object, proto);
}

export function applyMixin(apply: any, base: any[]) {
  const baseProto = base
    .map(b => Object.getPrototypeOf(b))
    .reduce((a, b) => {
      Object.assign(a, b);
      return a;
    });

  Object.setPrototypeOf(apply, {
    ...Object.getPrototypeOf(apply),
    ...baseProto
  });
}

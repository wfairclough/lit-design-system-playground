import { LitElement } from "lit";

export function hostClass(className: string) {
  return <ElemClass extends LitElement>(proto: ElemClass, propertyName: string) => {
    // @ts-expect-error - update is a protected property
    const { update } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];

    // @ts-expect-error - update is a protected property
    proto.update = function (this: ElemClass, changedProps: Map<keyof ElemClass, ElemClass[keyof ElemClass]>) {
      watchedProperties.forEach(property => {
        const key = property as keyof ElemClass;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];

          if (oldValue !== newValue) {
            console.log({ className, oldValue, newValue });
            if (!!newValue) {
              this.classList.add(className);
            } else {
              this.classList.remove(className);
            }
          }
        }
      });

      update.call(this, changedProps);
    };
  };
}

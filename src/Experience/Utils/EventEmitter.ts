type Callback = (...args: any[]) => any;

interface Callbacks {
  [namespace: string]: {
    [event: string]: Callback[];
  };
}

export default class EventEmitter {
  private callbacks: Callbacks = { base: {} };

  on(_names: string, callback: Callback): this | false {
    if (!_names || typeof callback !== 'function') {
      console.warn('Invalid name or callback');
      return false;
    }

    const names = this.resolveNames(_names);

    names.forEach((_name) => {
      const { namespace, value } = this.resolveName(_name);

      if (!this.callbacks[namespace]) this.callbacks[namespace] = {};
      if (!this.callbacks[namespace][value]) this.callbacks[namespace][value] = [];

      this.callbacks[namespace][value].push(callback);
    });

    return this;
  }

  off(_names: string): this | false {
    if (!_names) {
      console.warn('Invalid name');
      return false;
    }

    const names = this.resolveNames(_names);

    names.forEach((_name) => {
      const { namespace, value } = this.resolveName(_name);

      if (namespace === 'base' && value === '') {
        delete this.callbacks[namespace];
        return;
      }

      if (this.callbacks[namespace]?.[value]) {
        delete this.callbacks[namespace][value];
        if (Object.keys(this.callbacks[namespace]).length === 0) {
          delete this.callbacks[namespace];
        }
      }
    });

    return this;
  }

  trigger(_name: string, _args: any[] = []): any {
    if (!_name) {
      console.warn('Invalid name');
      return false;
    }

    let finalResult: any;

    const names = this.resolveNames(_name);
    const { namespace, value } = this.resolveName(names[0]);

    const invoke = (cbArray: Callback[]) => {
      cbArray.forEach((cb) => {
        const result = cb(..._args);
        if (finalResult === undefined) finalResult = result;
      });
    };

    if (namespace === 'base') {
      for (const ns in this.callbacks) {
        if (this.callbacks[ns]?.[value]) {
          invoke(this.callbacks[ns][value]);
        }
      }
    } else {
      if (this.callbacks[namespace]?.[value]) {
        invoke(this.callbacks[namespace][value]);
      }
    }

    return finalResult;
  }

  private resolveNames(_names: string): string[] {
    return _names
      .replace(/[^a-zA-Z0-9 ,/.]/g, '')
      .replace(/[,/]+/g, ' ')
      .split(' ');
  }

  private resolveName(name: string) {
    const parts = name.split('.');
    return {
      original: name,
      value: parts[0],
      namespace: parts[1] || 'base',
    };
  }
}

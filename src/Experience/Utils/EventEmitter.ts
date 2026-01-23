export type Callback<T extends unknown[] = unknown[]> = (...args: T) => void;

interface Callbacks {
  [namespace: string]: {
    [event: string]: Callback[];
  };
}

export default class EventEmitter {
  private callbacks: Callbacks = { base: {} };

  /**
   * Subscribe to an event
   */
  public on<T extends unknown[] = unknown[]>(_names: string, callback: Callback<T>): this {
    if (!_names || typeof callback !== 'function') return this;

    const names = this.resolveNames(_names);

    names.forEach((_name) => {
      const { namespace, value } = this.resolveName(_name);

      if (!this.callbacks[namespace]) this.callbacks[namespace] = {};
      if (!this.callbacks[namespace][value]) this.callbacks[namespace][value] = [];

      this.callbacks[namespace][value].push(callback as Callback);
    });

    return this;
  }

  /**
   * Unsubscribe from an event
   */
  public off(_names: string): this {
    if (!_names) return this;

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

  /**
   * Trigger an event
   */
  public trigger<T extends unknown[] = unknown[]>(_name: string, ...args: T): void {
    if (!_name) return;

    const names = this.resolveNames(_name);
    const { namespace, value } = this.resolveName(names[0]);

    const invoke = (cbArray: Callback<T>[]) => {
      cbArray.forEach((cb) => cb(...args));
    };

    if (namespace === 'base') {
      for (const ns in this.callbacks) {
        if (this.callbacks[ns]?.[value]) {
          invoke(this.callbacks[ns][value] as Callback<T>[]);
        }
      }
    } else {
      if (this.callbacks[namespace]?.[value]) {
        invoke(this.callbacks[namespace][value] as Callback<T>[]);
      }
    }
  }

  /**
   * Clean & split names
   */
  private resolveNames(_names: string): string[] {
    return _names
      .replace(/[^a-zA-Z0-9 ,/.]/g, '')
      .replace(/[,/]+/g, ' ')
      .split(' ')
      .filter(Boolean);
  }

  /**
   * Separate event name from namespace
   */
  private resolveName(name: string) {
    const parts = name.split('.');
    return {
      original: name,
      value: parts[0],
      namespace: parts[1] || 'base',
    };
  }
}

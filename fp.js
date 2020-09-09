import R from 'ramda';

export class Random {
  constructor (fn) {
    this.$unsafePerformRandom = () => fn(Math.random());
  }

  static of (fn) {
    return new Random(fn);
  }

  map (fn) {
    return new Random(R.compose(fn, this.$unsafePerformRandom));
  }
}

export class Maybe {
  constructor (val) {
    this.$value = val;
  }

  get isNothing () {
    return this.$value === null || this.$value === undefined;
  }

  static of (x) {
    return new Maybe(x);
  }

  map (fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }
}
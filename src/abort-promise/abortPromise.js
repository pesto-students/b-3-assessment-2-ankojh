// const { reject } = require("lodash");
// import { extend } from "lodash";

const ABORTED_STATE = 'aborted'


class AbortError extends Error {
  //! do it right
  constructor(message) {
    super(message);
    this.message = message
  }
}


class AbortablePromise {

  _promise
  _promiseState
  _onAbortFunc
  _reject

  get isAborted() {
    return this._promiseState === ABORTED_STATE
  }

  constructor(executorFunc) {
    this._promise =  new Promise((resolve, reject)=>{
      this._reject = reject;
      executorFunc(resolve, reject, this._onAbort.bind(this));
    });
  }


  _onAbort(func){
    this._onAbortFunc = func;
  }

  abort(reason){
    //? no need to validate reason as reason can be anything
    this._promiseState = ABORTED_STATE;
    this._reject(new AbortError(reason));

    return new AbortablePromise(resolve=>{ //? chaining if you want to.
      if (typeof this._onAbortFunc === 'function'){
        resolve(this._onAbortFunc()) //? return value of onAbortFunc to pass on to the chain
      }
      else{
        resolve();
      }
    })
  }

  then(func){
    //! Does AbortablePromise.then() returns a normal Promise or a AbortablePromise?
    // return this._promise.then(func);
  
    return new AbortablePromise(resolve=>{
      resolve(this._promise.then(func));
    }) 
  }

  catch(func){
    return this._promise.then(null,func);
  }

  finally(func){
    return this._promise.then(func, func);
  }

  static resolve(value) {
    if(value instanceof Promise){
      return value;
    }
    return new AbortablePromise(resolve => resolve(value));
  }

  static reject(value) {
    //* does not check for promise in real 
    return new AbortablePromise((_, reject) => reject(value));
  }

  static doAbort(value) {  
     return this.reject(new AbortError(value));
  }
}

export { AbortablePromise };
const { reject } = require("lodash");
// import { extend } from "lodash";

const ABORTED_STATE = 'aborted'


class AbortError extends Error {
  //! do it right
  constructor(message) {
    super(message);
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
    this._promiseState = ABORTED_STATE;
    this._reject(new AbortError(reason));
  }

  then(func){
    //? Does AbortablePromise.then returns a promise or a AbortablePromise?
    return this._promise.then(func);
  
    // return new AbortablePromise(resolve=>{
    //   resolve(this._promise.then(func));
    // }) 
  }

  catch(func){
    return this._promise.then(null,func);
  }

  finally(func){
    return this._promise.then(func, func);
  }

  static Resolve(value) {
    //check for value === promise
    return new AbortablePromise(resolve => resolve(value));
  }

  static Reject(value) {
    //check for value === promise
    return new AbortablePromise((_, reject) => reject(value));
  }

  static Abort(value) {
    //check for value === promise
     this.Reject(new AbortError(value));
  }
}

// * Test Cases 



// async function main(){
//   try {
//     const p = new AbortablePromise((resolve, reject, onAbort) => { 
//         setTimeout(()=>{
//             // resolve('rs')
//             reject('rj');
//           }, 5000);
//         onAbort(() => { console.log('pp') })
//        });
//     p.abort('Reason is you');
//     p.catch(console.log)
//   }
//   catch (e) {
//     console.log('err', e);
//   }
// }


// main();

export { AbortablePromise };


// class AbortablePromise {
//   _promiseState = ABORTABLE_PROMISE_STATES.PENDING;
//   _result = null

//   get isAborted(){
//     return this._promiseState === ABORTABLE_PROMISE_STATES.ABORTED
//   }

//   constructor(func) {
//     func(this.onResolve, this.onReject, this.onAbort);
//   }

//   static Resolve(value) {
//     return new AbortablePromise(resolve=>resolve(value));
//   }


//   static Reject(value) {
//     return new AbortablePromise((_,reject) => reject(value));
//   }

//   static Abort(value) {//? Creates a promise that aborts instantly
//     return new AbortablePromise((_,_, abort) => abort(value));
//   }

//   _isPromiseStatePending(){
//     return this._promiseState === ABORTABLE_PROMISE_STATES.PENDING
//   } 

//   onFulfilled(value) {
//     if (this._isPromiseStatePending()) {
//       this._result = value;
//     }
//     this._state = ABORTABLE_PROMISE_STATES.FULFILLED;
//   }

//   //TODO: DRY
//   onReject(error) {
//     if (this._isPromiseStatePending()){
//       this._result = error
//     }
//     this._state = ABORTABLE_PROMISE_STATES.REJECTED;
//   }

//   //TODO: DRY
//   onAbort(reason) {
//     if(this._isPromiseStatePending()){
//       this._result = reason;
//     }
//     this._state = ABORTABLE_PROMISE_STATES.ABORTED;
//   }


//   then(onFulfilled, onRejected, onAborted) {
//     return new AbortablePromise((resolve, reject, onAbort)=>{
//       // if()
//     })
//   }

//   catch(onRejected) {
//     return this.then(null, onRejected);
//   } 

//   abort(onAborted) {
//     return this.then(null, null, onAborted)
//   }

//   finally(onFinally) {
//     return this.then(onFinally, onFinally, onFinally);
//   }

// }


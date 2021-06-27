export const AcctionTypes= {
    SET_IDHOCKY : 'SET_IDhOCKY'
}
export function saveIdHocky(action) {
    console.log({action});
    return {
      type: AcctionTypes.SET_IDHOCKY,
        payload : action
    };
  }

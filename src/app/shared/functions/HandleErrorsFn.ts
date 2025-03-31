
export function HandleErrorsFn(error:any):string {
    let err:string = 'Unexpected error, try again later';

    if( error.error && error.error.err ){
        const handleError = error.error.err

        if(typeof handleError === 'string'){
            err = handleError
        }else if( Array.isArray(handleError) ){
            handleError.forEach(e => err += (' ' + e));
        } else if(typeof handleError === 'object'){
            const keys = Object.keys(handleError);
            keys.forEach(k => err += (' - ' + handleError[k]));
        }
    }

    return err;
}
